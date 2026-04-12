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
  'market-study': 'Etude de marche',
  'content-strategy': 'Strategie de contenu',
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

function tableRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 14px;background:#1e2a3d;font-weight:600;width:140px;border-radius:4px 0 0 4px;white-space:nowrap;color:#9ca3af;font-size:13px">${label}</td>
      <td style="padding:8px 14px;background:#1a2235;border-radius:0 4px 4px 0;color:#e4e4e7;font-size:14px">${value}</td>
    </tr>
    <tr><td colspan="2" style="height:3px"></td></tr>
  `
}

function sectionTitle(text: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:16px 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA">
        ${text}
      </td>
    </tr>
  `
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
      budget: contact.budget,
      timeline: contact.timeline,
      currentSiteUrl: contact.currentSiteUrl,
      productCount: contact.productCount,
      businessDescription: contact.businessDescription,
      launchDate: contact.launchDate,
      locationCount: contact.locationCount,
      appDescription: contact.appDescription,
    },
    isSubmitting: false,
    isSubmitted: false,
  }

  const serverPrice = calculateEstimate(stateForCalc)

  // ── Build email content ──

  const summaryRows = `
    ${sectionTitle('Projet')}
    ${tableRow('Situation', SITUATION_LABELS[data.situation] ?? data.situation)}
    ${tableRow('Type de site', SITE_TYPE_LABELS[data.siteType] ?? data.siteType)}
    ${tableRow('Secteur', SECTOR_LABELS[data.sector] ?? data.sector)}
    ${sectionTitle('Conception')}
    ${data.logo ? tableRow('Logo', LOGO_LABELS[data.logo] ?? data.logo) : ''}
    ${data.branding ? tableRow('Charte graphique', BRANDING_LABELS[data.branding] ?? data.branding) : ''}
    ${data.strategy.length > 0 ? tableRow('Strategie', data.strategy.map(s => STRATEGY_LABELS[s] ?? s).join(', ')) : ''}
    ${sectionTitle('Structure')}
    ${tableRow('Pages', data.pages === 'unsure' ? 'À définir' : data.pages)}
    ${tableRow('Langues', data.languages)}
    ${tableRow('Design', DESIGN_LABELS[data.designLevel] ?? data.designLevel)}
    ${sectionTitle('Contenu')}
    ${data.copywriting ? tableRow('Redaction', COPYWRITING_LABELS[data.copywriting] ?? data.copywriting) : ''}
    ${data.visuals ? tableRow('Visuels', VISUALS_LABELS[data.visuals] ?? data.visuals) : ''}
    ${data.features.length > 0 ? tableRow('Fonctionnalites', data.features.map(f => FEATURE_LABELS[f] ?? f).join('<br>')) : ''}
    ${data.seo.length > 0 ? tableRow('SEO', data.seo.map(s => SEO_LABELS[s] ?? s).join('<br>')) : ''}
    ${data.acquisition.length > 0 ? tableRow('Acquisition', data.acquisition.map(a => ACQUISITION_LABELS[a] ?? a).join('<br>')) : ''}
    ${data.automation.length > 0 ? tableRow('Automatisation', data.automation.map(a => AUTOMATION_LABELS[a] ?? a).join('<br>')) : ''}
    ${data.services.length > 0 ? tableRow('Services', data.services.map(s => SERVICE_LABELS[s] ?? s).join('<br>')) : ''}
  `

  const prospectEmailHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#1a1a2e;min-height:100%;padding:32px 16px">
      <div style="max-width:600px;margin:0 auto;background:#16213e;border-radius:16px;overflow:hidden;border:1px solid rgba(167,139,250,0.2)">

        <!-- Header -->
        <div style="padding:32px 32px 24px;border-bottom:1px solid rgba(167,139,250,0.15)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#A78BFA;margin-bottom:8px">DKDP.ch</div>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#e4e4e7">Votre estimation de projet</h1>
        </div>

        <!-- Body -->
        <div style="padding:28px 32px">

          <p style="margin:0 0 24px;color:#e4e4e7;font-size:15px;line-height:1.6">
            Merci ${sanitize(contact.firstName)},
          </p>
          <p style="margin:0 0 28px;color:#9ca3af;font-size:14px;line-height:1.6">
            Voici le recapitulatif de votre estimation :
          </p>

          <!-- Summary table -->
          <table style="width:100%;border-collapse:collapse">
            ${summaryRows}
          </table>

          <!-- Price block -->
          <div style="margin-top:28px;padding:20px 24px;background:#0f172a;border-radius:12px;border:1px solid rgba(167,139,250,0.3)">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:12px">Estimation indicative</div>
            <div style="color:#e4e4e7;font-size:22px;font-weight:700">
              CHF ${serverPrice.totalMin.toLocaleString('fr-CH')} &ndash; ${serverPrice.totalMax.toLocaleString('fr-CH')}
            </div>
            ${serverPrice.monthlyMin > 0 ? `
            <div style="color:#9ca3af;font-size:13px;margin-top:6px">
              + CHF ${serverPrice.monthlyMin.toLocaleString('fr-CH')}/mois (services recurrents)
            </div>` : ''}
            <div style="color:#9ca3af;font-size:13px;margin-top:6px">
              Delai estimatif : ${serverPrice.weeksMin}&ndash;${serverPrice.weeksMax} semaines
            </div>
          </div>

          <!-- CTA message -->
          <div style="margin-top:28px;padding:20px 24px;background:#1e2a3d;border-radius:12px;border-left:3px solid #A78BFA">
            <p style="margin:0;color:#e4e4e7;font-size:14px;line-height:1.7">
              Notre équipe vous contactera sous 48h pour discuter de votre projet en detail et affiner cette estimation selon vos besoins spécifiques.
            </p>
          </div>

          ${contact.message ? `
          <div style="margin-top:20px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA;margin-bottom:8px">Votre message</div>
            <div style="padding:14px;background:#1a2235;border-radius:8px;color:#9ca3af;font-size:13px;line-height:1.6">${sanitize(contact.message).replace(/\n/g, '<br>')}</div>
          </div>` : ''}

        </div>

        <!-- Footer -->
        <div style="padding:20px 32px;border-top:1px solid rgba(167,139,250,0.15);text-align:center">
          <p style="margin:0;color:#6b7280;font-size:12px">
            DKDP.ch &bull; Agence digitale a Geneve &bull;
            <a href="https://dkdp.ch" style="color:#A78BFA;text-decoration:none">dkdp.ch</a>
          </p>
        </div>

      </div>
    </div>
  `

  const internalEmailHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#1a1a2e;min-height:100%;padding:32px 16px">
      <div style="max-width:600px;margin:0 auto;background:#16213e;border-radius:16px;overflow:hidden;border:1px solid rgba(167,139,250,0.2)">

        <!-- Header -->
        <div style="padding:28px 32px 20px;border-bottom:1px solid rgba(167,139,250,0.15)">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#A78BFA;margin-bottom:6px">Estimation DKDP</div>
          <h1 style="margin:0;font-size:20px;font-weight:700;color:#e4e4e7">
            ${sanitize(SITE_TYPE_LABELS[data.siteType] ?? data.siteType)} &mdash; ${sanitize(contact.company)}
          </h1>
        </div>

        <div style="padding:24px 32px">

          <!-- Contact info -->
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA;margin-bottom:10px">Contact</div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${tableRow('Nom', sanitize(contact.firstName) + ' ' + sanitize(contact.lastName))}
            ${tableRow('Entreprise', sanitize(contact.company))}
            ${tableRow('Email', `<a href="mailto:${sanitize(contact.email)}" style="color:#A78BFA">${sanitize(contact.email)}</a>`)}
            ${tableRow('Telephone', sanitize(contact.phone))}
            ${contact.message ? tableRow('Message', sanitize(contact.message).replace(/\n/g, '<br>')) : ''}
            ${contact.budget ? tableRow('Budget indique', sanitize(contact.budget)) : ''}
            ${contact.timeline ? tableRow('Delai souhaite', sanitize(contact.timeline)) : ''}
            ${contact.currentSiteUrl ? tableRow('Site actuel', `<a href="${sanitize(contact.currentSiteUrl)}" style="color:#A78BFA">${sanitize(contact.currentSiteUrl)}</a>`) : ''}
            ${contact.businessDescription ? tableRow('Description', sanitize(contact.businessDescription).replace(/\n/g, '<br>')) : ''}
            ${contact.appDescription ? tableRow('Description app', sanitize(contact.appDescription).replace(/\n/g, '<br>')) : ''}
            ${contact.productCount ? tableRow('Nb produits', sanitize(contact.productCount)) : ''}
            ${contact.locationCount ? tableRow('Nb emplacements', sanitize(contact.locationCount)) : ''}
            ${contact.launchDate ? tableRow('Date lancement', sanitize(contact.launchDate)) : ''}
          </table>

          <!-- Selections -->
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#A78BFA;margin-bottom:10px">Selections</div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${summaryRows}
          </table>

          <!-- Server-calculated price -->
          <div style="margin-bottom:16px;padding:20px 24px;background:#0f172a;border-radius:12px;border:1px solid rgba(167,139,250,0.3)">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:12px">Prix calcule cote serveur</div>
            <div style="color:#e4e4e7;font-size:22px;font-weight:700">
              CHF ${serverPrice.totalMin.toLocaleString('fr-CH')} &ndash; ${serverPrice.totalMax.toLocaleString('fr-CH')}
            </div>
            ${serverPrice.monthlyMin > 0 ? `
            <div style="color:#9ca3af;font-size:13px;margin-top:6px">
              Mensuel : CHF ${serverPrice.monthlyMin.toLocaleString('fr-CH')}&ndash;${serverPrice.monthlyMax.toLocaleString('fr-CH')}/mois
            </div>` : ''}
            <div style="color:#9ca3af;font-size:13px;margin-top:6px">
              Delai : ${serverPrice.weeksMin}&ndash;${serverPrice.weeksMax} semaines
            </div>
          </div>

          <!-- Client-submitted price (for comparison) -->
          <div style="padding:16px 20px;background:#1a2235;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin-bottom:10px">Prix soumis par le client (comparaison)</div>
            <div style="color:#9ca3af;font-size:14px">
              Total : CHF ${data.estimatedTotal.min.toLocaleString('fr-CH')} &ndash; ${data.estimatedTotal.max.toLocaleString('fr-CH')}
            </div>
            ${data.estimatedMonthly.min > 0 ? `
            <div style="color:#9ca3af;font-size:13px;margin-top:4px">
              Mensuel : CHF ${data.estimatedMonthly.min.toLocaleString('fr-CH')}&ndash;${data.estimatedMonthly.max.toLocaleString('fr-CH')}/mois
            </div>` : ''}
            <div style="color:#9ca3af;font-size:13px;margin-top:4px">
              Delai : ${data.estimatedWeeks.min}&ndash;${data.estimatedWeeks.max} semaines
            </div>
          </div>

        </div>
      </div>
    </div>
  `

  const resend = new Resend(process.env.RESEND_API_KEY)

  // ── Send emails ──
  try {
    await Promise.all([
      resend.emails.send({
        from: 'DKDP.ch <estimation@dkdp.ch>',
        to: contact.email,
        subject: 'Votre estimation DKDP',
        html: prospectEmailHtml,
      }),
      resend.emails.send({
        from: 'Estimation DKDP <estimation@dkdp.ch>',
        to: 'dk@dkdp.ch',
        replyTo: `${sanitize(contact.firstName)} ${sanitize(contact.lastName)} <${sanitize(contact.email)}>`,
        subject: `[Estimation] ${sanitize(data.siteType)} - ${sanitize(contact.company)}`,
        html: internalEmailHtml,
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
          Secteur: {
            select: { name: data.sector },
          },
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
        },
      })
    }
  } catch (err) {
    // Non-fatal: log but do not fail the request
    console.error('[estimation] Notion error:', err)
  }

  return NextResponse.json({ success: true })
}
