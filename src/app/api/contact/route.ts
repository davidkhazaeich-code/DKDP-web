import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sanitize } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  // ── Rate limit: 5 submissions per IP per 10 minutes ──
  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { scope: 'contact', limit: 5, windowMs: 10 * 60 * 1000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const { firstName, lastName, email, phone, company, service, message, source, _gotcha } = body

  // ── Honeypot check ──
  if (_gotcha) {
    // Bot filled the hidden field - silently accept (don't reveal detection)
    return NextResponse.json({ ok: true })
  }

  // ── Required fields ──
  if (!firstName || !email || !service || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // ── Email format ──
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const fullName = `${sanitize(firstName)}${lastName ? ' ' + sanitize(lastName) : ''}`

  try {
    // ── 1. Notification interne ──
    await resend.emails.send({
      from: 'DKDP Contact <contact@dkdp.ch>',
      to: 'dk@dkdp.ch',
      replyTo: `${fullName} <${sanitize(email)}>`,
      subject: `[Contact] ${sanitize(service)} - ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-bottom:4px">Nouveau message de contact</h2>
          <p style="color:#6b7280;margin-top:0">dkdp.ch - formulaire de contact</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;width:110px;border-radius:4px 0 0 4px;white-space:nowrap">Nom</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">${fullName}</td>
            </tr>
            <tr><td colspan="2" style="height:4px"></td></tr>
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Email</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">
                <a href="mailto:${sanitize(email)}" style="color:#7c3aed">${sanitize(email)}</a>
              </td>
            </tr>
            ${phone ? `
            <tr><td colspan="2" style="height:4px"></td></tr>
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Tél.</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">${sanitize(phone)}</td>
            </tr>` : ''}
            ${company ? `
            <tr><td colspan="2" style="height:4px"></td></tr>
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Entreprise</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">${sanitize(company)}</td>
            </tr>` : ''}
            <tr><td colspan="2" style="height:4px"></td></tr>
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Service</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">${sanitize(service)}</td>
            </tr>
            ${source ? `
            <tr><td colspan="2" style="height:4px"></td></tr>
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px;white-space:nowrap">Via</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">${sanitize(source)}</td>
            </tr>` : ''}
            <tr><td colspan="2" style="height:12px"></td></tr>
            <tr>
              <td colspan="2" style="padding:14px;background:#fafafa;border-radius:4px;line-height:1.6">${sanitize(message).replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
      `,
    })

    // ── 2. Confirmation à l'expéditeur ──
    await resend.emails.send({
      from: 'David K. — DKDP <contact@dkdp.ch>',
      to: sanitize(email),
      replyTo: 'dk@dkdp.ch',
      subject: `Votre demande a bien été reçue, ${sanitize(firstName)}`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#09090b;color:#e4e4e7;border-radius:12px;overflow:hidden">
          <!-- Header -->
          <div style="background:#111113;padding:28px 32px;border-bottom:1px solid #27272a">
            <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.01em">DKDP</p>
            <p style="margin:4px 0 0;font-size:12px;color:#71717a">Formation IA · Genève · Suisse romande</p>
          </div>

          <!-- Body -->
          <div style="padding:32px">
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#ffffff">
              Bonjour ${sanitize(firstName)},
            </h2>
            <p style="margin:0 0 20px;color:#a1a1aa;line-height:1.65;font-size:15px">
              Nous avons bien reçu votre demande concernant <strong style="color:#FF8C00">${sanitize(service)}</strong>.
              Je vous reviens personnellement sous 48h ouvrés avec un programme adapté à vos besoins.
            </p>

            <!-- Récap message -->
            ${message && message !== 'Demande de devis formation IA (landing page)' ? `
            <div style="background:#18181b;border:1px solid #27272a;border-radius:8px;padding:16px 20px;margin-bottom:24px">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#71717a">Votre message</p>
              <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.6">${sanitize(message).replace(/\n/g, '<br>')}</p>
            </div>` : ''}

            <!-- Ce qui se passe ensuite -->
            <div style="margin-bottom:28px">
              <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:0.06em">Ce qui se passe maintenant</p>
              <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start">
                <div style="min-width:24px;height:24px;border-radius:50%;background:#FF8C00;color:#000;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1">1</div>
                <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.55">J'analyse votre demande et prépare un programme sur mesure pour votre équipe.</p>
              </div>
              <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start">
                <div style="min-width:24px;height:24px;border-radius:50%;background:#FF8C00;color:#000;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1">2</div>
                <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.55">Je vous envoie un devis détaillé avec le programme, le format et le tarif sous 48h.</p>
              </div>
              <div style="display:flex;gap:12px;align-items:flex-start">
                <div style="min-width:24px;height:24px;border-radius:50%;background:#FF8C00;color:#000;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1">3</div>
                <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.55">On planifie un appel de 20 min pour ajuster les détails si nécessaire.</p>
              </div>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:28px">
              <a href="https://dkdp.ch/formation-entreprise/ia" style="display:inline-block;background:linear-gradient(135deg,#FF8C00,#FFB347);color:#000;font-weight:700;font-size:14px;padding:13px 28px;border-radius:8px;text-decoration:none">
                Voir le programme complet
              </a>
            </div>

            <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.65">
              Une question urgente ? Répondez directement à cet email ou écrivez-moi à
              <a href="mailto:dk@dkdp.ch" style="color:#FF8C00;text-decoration:none"> dk@dkdp.ch</a>.
            </p>
          </div>

          <!-- Footer -->
          <div style="padding:20px 32px;border-top:1px solid #27272a;background:#111113">
            <p style="margin:0;font-size:13px;color:#ffffff;font-weight:600">David K.</p>
            <p style="margin:2px 0 0;font-size:12px;color:#71717a">Fondateur DKDP · Formateur IA · Genève</p>
            <p style="margin:12px 0 0;font-size:11px;color:#52525b">
              DKDP Sàrl · Genève, Suisse ·
              <a href="https://dkdp.ch" style="color:#52525b">dkdp.ch</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
