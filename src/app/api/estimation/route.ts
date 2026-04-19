// Required env vars:
// RESEND_API_KEY       - Resend API key for sending emails
// NOTION_API_KEY       - Notion intégration token
// NOTION_ESTIMATION_DB_ID - Notion database ID for storing estimations

import { Resend } from 'resend'
import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sanitize } from '@/lib/sanitize'
import { estimationRequestSchema } from '@/lib/estimation/validation'
import { calculateEstimate } from '@/lib/estimation/pricing'
import { generateEstimationPdf } from '@/lib/estimation/generate-pdf'
import type { EstimationState } from '@/lib/estimation/types'

// ── Label maps for readable email output ──

const SITE_TYPE_LABELS: Record<string, string> = {
  vitrine: 'Site vitrine',
  ecommerce: 'E-commerce',
  landing: 'Landing page',
  webapp: 'Application web',
}

const SITUATION_LABELS: Record<string, string> = {
  new: 'Nouveau projet',
  redesign: 'Refonte',
}

const SECTOR_LABELS: Record<string, string> = {
  restaurant: 'Restaurant / Restauration',
  health: 'Sante / Bien-etre',
  legal: 'Juridique / Avocat',
  'real-estate': 'Immobilier',
  retail: 'Commerce / Retail',
  services: 'Services B2B',
  tech: 'Tech / SaaS',
  artisan: 'Artisan / Metier',
  training: 'Formation / Coaching',
  other: 'Autre',
}

const DESIGN_LABELS: Record<string, string> = {
  template: 'Template adapté',
  custom: 'Design sur mesure',
  premium: 'Design premium',
}

const LOGO_LABELS: Record<string, string> = {
  existing: 'Logo existant',
  create: 'Création logo',
  modernize: 'Modernisation logo',
}

const BRANDING_LABELS: Record<string, string> = {
  existing: 'Charte existante',
  create: 'Création charte',
  modernize: 'Modernisation charte',
}

const STRATEGY_LABELS: Record<string, string> = {
  positioning: 'Positionnement stratégique',
  'market-study': 'Etude de marché',
  'content-strategy': 'stratégie de contenu',
}

const COPYWRITING_LABELS: Record<string, string> = {
  provided: 'Textes fournis',
  basic: 'Redaction de base',
  professional: 'Redaction professionnelle',
}

const VISUALS_LABELS: Record<string, string> = {
  provided: 'Visuels fournis',
  stock: 'Photos stock',
  ai: 'Visuels IA',
  shooting: 'Shooting photo',
}

const FEATURE_LABELS: Record<string, string> = {
  'blog-setup': 'Blog (mise en place)',
  'blog-management': 'Gestion blog (mensuel)',
  form: 'Formulaire de contact',
  booking: 'Système de reservation',
  members: 'Espace membres',
  chatbot: 'Chatbot IA',
  payment: 'Paiement en ligne',
  newsletter: 'Newsletter',
  gallery: 'Galerie photos',
  'extra-pages': 'Pages supplementaires',
}

const SEO_LABELS: Record<string, string> = {
  'advanced-oneshot': 'SEO avance (one-shot)',
  monthly: 'SEO mensuel',
}

const ACQUISITION_LABELS: Record<string, string> = {
  sea: 'Google Ads (mensuel)',
  social: 'Social Ads (mensuel)',
  funnel: 'Funnel de conversion',
}

const AUTOMATION_LABELS: Record<string, string> = {
  crm: 'CRM',
  'email-marketing': 'Email marketing',
  workflows: 'Automatisations',
  dashboard: 'Dashboard',
}

const SERVICE_LABELS: Record<string, string> = {
  maintenance: 'Maintenance (mensuel)',
  training: 'Formation',
  rgpd: 'Mise en conformite RGPD',
  video: 'Production video',
  rush: 'Mode urgence (+30%)',
}

// ── Email HTML builder helpers ──

// Dark theme helpers (internal email)
function darkTableRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 14px;background:#1e2a3d;font-weight:600;width:140px;border-radius:4px 0 0 4px;white-space:nowrap;color:#9ca3af;font-size:13px">${label}</td>
      <td style="padding:8px 14px;background:#1a2235;border-radius:0 4px 4px 0;color:#e4e4e7;font-size:14px">${value}</td>
    </tr>
    <tr><td colspan="2" style="height:3px"></td></tr>
  `
}

function darkSectionTitle(text: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:16px 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA">
        ${text}
      </td>
    </tr>
  `
}

// Light theme helpers (prospect email)
function lightTableRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 14px;font-weight:600;width:140px;white-space:nowrap;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6">${label}</td>
      <td style="padding:8px 14px;color:#1a1a1a;font-size:14px;border-bottom:1px solid #f3f4f6">${value}</td>
    </tr>
  `
}

function lightSectionTitle(text: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:18px 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7c3aed">
        ${text}
      </td>
    </tr>
  `
}

function formatNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

/** Format "2026-05" → "Mai 2026" */
function formatLaunchDate(val: string): string {
  if (!val) return ''
  const [year, month] = val.split('-')
  if (!year || !month) return val
  const d = new Date(Number(year), Number(month) - 1)
  const label = d.toLocaleDateString('fr-CH', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export async function POST(req: NextRequest) {
  // ── Rate limit: 3 submissions per IP per 15 minutes ──
  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { limit: 3, windowMs: 15 * 60 * 1000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()

  // ── Honeypot check ──
  if (body._gotcha) {
    return NextResponse.json({ success: true })
  }

  // ── Validate with Zod schema ──
  const parsed = estimationRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data
  const { contact } = data

  // ── Recalculate price server-side ──
  const stateForCalc: EstimationState = {
    currentStep: 0,
    direction: 1,
    situation: data.situation,
    siteType: data.siteType,
    sector: data.sector,
    logo: data.logo,
    branding: data.branding,
    strategy: data.strategy,
    pages: data.pages,
    languages: data.languages,
    designLevel: data.designLevel,
    copywriting: data.copywriting,
    visuals: data.visuals,
    features: data.features,
    seo: data.seo,
    acquisition: data.acquisition,
    automation: data.automation,
    services: data.services,
    contact: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      currentSiteUrl: contact.currentSiteUrl,
      launchDate: contact.launchDate,
      appDescription: contact.appDescription,
    },
    isSubmitting: false,
    isSubmitted: false,
  }

  const serverPrice = calculateEstimate(stateForCalc)

  // ── Build selection rows for emails + PDF ──

  const selectionItems: { label: string; value: string }[] = [
    { label: 'Situation', value: SITUATION_LABELS[data.situation] ?? data.situation },
    { label: 'Type de site', value: SITE_TYPE_LABELS[data.siteType] ?? data.siteType },
    { label: 'Secteur', value: data.sector ? (SECTOR_LABELS[data.sector] ?? data.sector) : '' },
    { label: 'Logo', value: data.logo ? (LOGO_LABELS[data.logo] ?? data.logo) : '' },
    { label: 'Charte graphique', value: data.branding ? (BRANDING_LABELS[data.branding] ?? data.branding) : '' },
    { label: 'stratégie', value: data.strategy.map(s => STRATEGY_LABELS[s] ?? s).join(', ') },
    { label: 'Pages', value: data.pages === 'unsure' ? 'A definir' : data.pages },
    { label: 'Langues', value: data.languages },
    { label: 'Design', value: DESIGN_LABELS[data.designLevel] ?? data.designLevel },
    { label: 'Redaction', value: data.copywriting ? (COPYWRITING_LABELS[data.copywriting] ?? data.copywriting) : '' },
    { label: 'Visuels', value: data.visuals ? (VISUALS_LABELS[data.visuals] ?? data.visuals) : '' },
    { label: 'Fonctionnalites', value: data.features.map(f => FEATURE_LABELS[f] ?? f).join(', ') },
    { label: 'SEO', value: data.seo.map(s => SEO_LABELS[s] ?? s).join(', ') },
    { label: 'Acquisition', value: data.acquisition.map(a => ACQUISITION_LABELS[a] ?? a).join(', ') },
    { label: 'Automatisation', value: data.automation.map(a => AUTOMATION_LABELS[a] ?? a).join(', ') },
    { label: 'Services', value: data.services.map(s => SERVICE_LABELS[s] ?? s).join(', ') },
  ]

  // ── Generate PDF ──

  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })
  const pdfBuffer = generateEstimationPdf({
    contact: { firstName: contact.firstName, lastName: contact.lastName, company: contact.company, email: contact.email, phone: contact.phone },
    selections: selectionItems,
    price: serverPrice,
    siteType: SITE_TYPE_LABELS[data.siteType] ?? data.siteType,
    date: dateStr,
  })
  const pdfBase64 = pdfBuffer.toString('base64')

  // ── Build prospect email (white background) ──

  const prospectRows = selectionItems
    .filter(s => s.value)
    .map(s => lightTableRow(s.label, sanitize(s.value)))
    .join('')

  const prospectEmailHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;min-height:100%;padding:32px 16px">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">

        <!-- Header -->
        <div style="padding:32px 32px 24px;border-bottom:1px solid #e5e7eb">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#7c3aed;margin-bottom:8px">DKDP.ch</div>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#1a1a1a">Votre estimation de projet</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#6b7280">${dateStr}</p>
        </div>

        <!-- Body -->
        <div style="padding:28px 32px">

          <p style="margin:0 0 24px;color:#1a1a1a;font-size:15px;line-height:1.6">
            Bonjour ${sanitize(contact.firstName)},
          </p>
          <p style="margin:0 0 28px;color:#6b7280;font-size:14px;line-height:1.6">
            Merci pour votre demande. Voici le recapitulatif de votre estimation :
          </p>

          <!-- Summary table -->
          <table style="width:100%;border-collapse:collapse">
            ${prospectRows}
          </table>

          <!-- Price block -->
          <div style="margin-top:28px;padding:20px 24px;background:#faf5ff;border-radius:12px;border:1px solid #e9d5ff">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7c3aed;margin-bottom:12px">Estimation budgetaire</div>
            <div style="color:#1a1a1a;font-size:22px;font-weight:700">
              CHF ${formatNum(serverPrice.totalMin)} - ${formatNum(serverPrice.totalMax)}
            </div>
            ${serverPrice.monthlyMin > 0 ? `
            <div style="color:#6b7280;font-size:13px;margin-top:6px">
              + CHF ${formatNum(serverPrice.monthlyMin)}/mois (services recurrents)
            </div>` : ''}
            <div style="color:#6b7280;font-size:13px;margin-top:6px">
              Delai estime : ~${serverPrice.weeksMin}-${serverPrice.weeksMax} semaines
            </div>
          </div>

          <!-- CTA message -->
          <div style="margin-top:28px;padding:20px 24px;background:#f9fafb;border-radius:12px;border-left:3px solid #7c3aed">
            <p style="margin:0;color:#374151;font-size:14px;line-height:1.7">
              Notre équipe vous contactera sous <strong>48h</strong> pour discuter de votre projet et affiner cette estimation. Vous trouverez egalement le recapitulatif en piece jointe (PDF).
            </p>
          </div>

          ${contact.message ? `
          <div style="margin-top:20px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7c3aed;margin-bottom:8px">Votre message</div>
            <div style="padding:14px;background:#f9fafb;border-radius:8px;color:#374151;font-size:13px;line-height:1.6">${sanitize(contact.message).replace(/\n/g, '<br>')}</div>
          </div>` : ''}

        </div>

        <!-- Footer -->
        <div style="padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center">
          <p style="margin:0;color:#9ca3af;font-size:12px">
            DKDP.ch &bull; Agence digitale à Genève &bull;
            <a href="https://dkdp.ch" style="color:#7c3aed;text-decoration:none">dkdp.ch</a>
          </p>
        </div>

      </div>
    </div>
  `

  // ── Build internal email (dark theme, kept as-is) ──

  const darkSummaryRows = selectionItems
    .filter(s => s.value)
    .map(s => darkTableRow(s.label, sanitize(s.value)))
    .join('')

  const internalEmailHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#1a1a2e;min-height:100%;padding:32px 16px">
      <div style="max-width:600px;margin:0 auto;background:#16213e;border-radius:16px;overflow:hidden;border:1px solid rgba(167,139,250,0.2)">

        <!-- Header -->
        <div style="padding:28px 32px 20px;border-bottom:1px solid rgba(167,139,250,0.15)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#A78BFA;margin-bottom:6px">Estimation DKDP</div>
          <h1 style="margin:0;font-size:20px;font-weight:700;color:#e4e4e7">
            ${sanitize(SITE_TYPE_LABELS[data.siteType] ?? data.siteType)} - ${sanitize(contact.company || contact.firstName)}
          </h1>
        </div>

        <div style="padding:24px 32px">

          <!-- Contact info -->
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA;margin-bottom:10px">Contact</div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${darkTableRow('Nom', sanitize(contact.firstName) + ' ' + sanitize(contact.lastName))}
            ${darkTableRow('Entreprise', sanitize(contact.company))}
            ${darkTableRow('Email', `<a href="mailto:${sanitize(contact.email)}" style="color:#A78BFA">${sanitize(contact.email)}</a>`)}
            ${darkTableRow('Telephone', sanitize(contact.phone))}
            ${contact.message ? darkTableRow('Message', sanitize(contact.message).replace(/\n/g, '<br>')) : ''}
            ${contact.currentSiteUrl ? darkTableRow('Site actuel', `<a href="${sanitize(contact.currentSiteUrl)}" style="color:#A78BFA">${sanitize(contact.currentSiteUrl)}</a>`) : ''}
            ${contact.appDescription ? darkTableRow('Description app', sanitize(contact.appDescription).replace(/\n/g, '<br>')) : ''}
            ${contact.launchDate ? darkTableRow('Date lancement', sanitize(formatLaunchDate(contact.launchDate))) : ''}
          </table>

          <!-- Selections -->
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA;margin-bottom:10px">Selections</div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${darkSummaryRows}
          </table>

          <!-- Server-calculated price -->
          <div style="margin-bottom:16px;padding:20px 24px;background:#0f172a;border-radius:12px;border:1px solid rgba(167,139,250,0.3)">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:12px">Prix calcule serveur</div>
            <div style="color:#e4e4e7;font-size:22px;font-weight:700">
              CHF ${formatNum(serverPrice.totalMin)} - ${formatNum(serverPrice.totalMax)}
            </div>
            ${serverPrice.monthlyMin > 0 ? `
            <div style="color:#9ca3af;font-size:13px;margin-top:6px">
              Mensuel : CHF ${formatNum(serverPrice.monthlyMin)}-${formatNum(serverPrice.monthlyMax)}/mois
            </div>` : ''}
            <div style="color:#9ca3af;font-size:13px;margin-top:6px">
              Delai : ${serverPrice.weeksMin}-${serverPrice.weeksMax} semaines
            </div>
          </div>

        </div>
      </div>
    </div>
  `

  const resend = new Resend(process.env.RESEND_API_KEY)

  // ── Send emails (with PDF attachment for prospect) ──
  const pdfFilename = `estimation-dkdp-${data.siteType}-${now.toISOString().slice(0, 10)}.pdf`

  try {
    await Promise.all([
      resend.emails.send({
        from: 'DKDP.ch <estimation@dkdp.ch>',
        to: contact.email,
        subject: 'Votre estimation de projet - DKDP.ch',
        html: prospectEmailHtml,
        attachments: [
          { filename: pdfFilename, content: pdfBase64, contentType: 'application/pdf' },
        ],
      }),
      resend.emails.send({
        from: 'Estimation DKDP <estimation@dkdp.ch>',
        to: 'dk@dkdp.ch',
        replyTo: `${sanitize(contact.firstName)} ${sanitize(contact.lastName)} <${sanitize(contact.email)}>`,
        subject: `[Estimation] ${sanitize(data.siteType)} - ${sanitize(contact.company || contact.firstName)}`,
        html: internalEmailHtml,
        attachments: [
          { filename: pdfFilename, content: pdfBase64, contentType: 'application/pdf' },
        ],
      }),
    ])
  } catch (err) {
    console.error('[estimation] Email send error:', err)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }

  // ── Store in Notion ──
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })
    const dbId = process.env.NOTION_ESTIMATION_DB_ID

    if (notion && dbId) {
      const selectionsJson = JSON.stringify({
        situation: data.situation,
        siteType: data.siteType,
        sector: data.sector,
        logo: data.logo,
        branding: data.branding,
        strategy: data.strategy,
        pages: data.pages,
        languages: data.languages,
        designLevel: data.designLevel,
        copywriting: data.copywriting,
        visuals: data.visuals,
        features: data.features,
        seo: data.seo,
        acquisition: data.acquisition,
        automation: data.automation,
        services: data.services,
      }).slice(0, 2000)

      await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
          Nom: {
            title: [{ text: { content: `${contact.firstName} ${contact.lastName}` } }],
          },
          Entreprise: {
            rich_text: [{ text: { content: contact.company } }],
          },
          Email: {
            email: contact.email,
          },
          Telephone: {
            phone_number: contact.phone || null,
          },
          Type: {
            select: { name: data.siteType },
          },
          ...(data.sector ? { Secteur: { select: { name: data.sector } } } : {}),
          'Prix min': {
            number: serverPrice.totalMin,
          },
          'Prix max': {
            number: serverPrice.totalMax,
          },
          Mensuel: {
            number: serverPrice.monthlyMin ?? 0,
          },
          'Delai min': {
            number: serverPrice.weeksMin,
          },
          'Delai max': {
            number: serverPrice.weeksMax,
          },
          Selections: {
            rich_text: [{ text: { content: selectionsJson } }],
          },
          Message: {
            rich_text: [{ text: { content: contact.message.slice(0, 2000) } }],
          },
          ...(contact.launchDate ? { Lancement: { rich_text: [{ text: { content: formatLaunchDate(contact.launchDate) } }] } } : {}),
        },
      })
    }
  } catch (err) {
    // Non-fatal: log but do not fail the request
    console.error('[estimation] Notion error:', err)
  }

  return NextResponse.json({ success: true, pdf: pdfBase64, pdfFilename })
}
