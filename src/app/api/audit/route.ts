import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sanitize } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  // ── Rate limit: 3 audit requests per IP per 10 minutes ──
  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { scope: 'audit', limit: 3, windowMs: 10 * 60 * 1000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const { url, email, _gotcha } = body

  // ── Honeypot check ──
  if (_gotcha) {
    return NextResponse.json({ ok: true })
  }

  if (!url || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // ── Email format ──
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // ── URL validation (block javascript: and non-http schemes) ──
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error()
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // ── 1. Notification interne ──
    await resend.emails.send({
      from: 'DKDP Audit <audit@dkdp.ch>',
      to: 'dk@dkdp.ch',
      replyTo: sanitize(email),
      subject: `[Audit Gratuit] ${sanitize(url)}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-bottom:4px">Nouvelle demande d&apos;audit</h2>
          <p style="color:#6b7280;margin-top:0">Soumis via le formulaire du site</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr>
              <td style="padding:10px 14px;background:#f5f5f5;font-weight:600;width:100px;border-radius:4px 0 0 4px">URL</td>
              <td style="padding:10px 14px;background:#fafafa;border-radius:0 4px 4px 0">
                <a href="${sanitize(url)}" style="color:#7c3aed">${sanitize(url)}</a>
              </td>
            </tr>
            <tr><td colspan="2" style="height:6px"></td></tr>
            <tr>
              <td style="padding:10px 14px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Email</td>
              <td style="padding:10px 14px;background:#fafafa;border-radius:0 4px 4px 0">
                <a href="mailto:${sanitize(email)}" style="color:#7c3aed">${sanitize(email)}</a>
              </td>
            </tr>
          </table>
        </div>
      `,
    })

    // ── 2. Accusé de réception au demandeur (non bloquant) ──
    try {
      await resend.emails.send({
        from: 'David K. — DKDP <contact@dkdp.ch>',
        to: sanitize(email),
        replyTo: 'dk@dkdp.ch',
        subject: 'Votre audit gratuit est en préparation - DKDP',
        html: `
          <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#09090b;color:#e4e4e7;border-radius:12px;overflow:hidden">
            <!-- Header -->
            <div style="background:#111113;padding:28px 32px;border-bottom:1px solid #27272a">
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.01em">DKDP</p>
              <p style="margin:4px 0 0;font-size:12px;color:#71717a">Agence IA et web · Genève · Suisse romande</p>
            </div>

            <!-- Body -->
            <div style="padding:32px">
              <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#ffffff">
                Votre demande est bien reçue
              </h2>
              <p style="margin:0 0 20px;color:#a1a1aa;line-height:1.65;font-size:15px">
                Merci, nous avons bien reçu votre demande d&apos;audit gratuit pour
                <strong style="color:#A78BFA;word-break:break-all">${sanitize(url)}</strong>.
                Je l&apos;analyse personnellement et je vous reviens sous 48h ouvrés.
              </p>

              <!-- Ce qui se passe ensuite -->
              <div style="margin-bottom:28px">
                <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:0.06em">Ce qui se passe maintenant</p>
                <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start">
                  <div style="min-width:24px;height:24px;border-radius:50%;background:#A78BFA;color:#000;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1">1</div>
                  <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.55">J&apos;analyse votre site : SEO, performance, expérience utilisateur et visibilité sur les moteurs IA.</p>
                </div>
                <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start">
                  <div style="min-width:24px;height:24px;border-radius:50%;background:#A78BFA;color:#000;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1">2</div>
                  <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.55">Je vous envoie un rapport d&apos;audit clair avec les priorités concrètes à corriger.</p>
                </div>
                <div style="display:flex;gap:12px;align-items:flex-start">
                  <div style="min-width:24px;height:24px;border-radius:50%;background:#A78BFA;color:#000;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1">3</div>
                  <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.55">On échange 20 min pour prioriser ensemble les actions à fort impact si vous le souhaitez.</p>
                </div>
              </div>

              <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.65">
                Une question entre temps ? Répondez directement à cet email ou écrivez-moi à
                <a href="mailto:dk@dkdp.ch" style="color:#A78BFA;text-decoration:none"> dk@dkdp.ch</a>.
              </p>
            </div>

            <!-- Footer -->
            <div style="padding:20px 32px;border-top:1px solid #27272a;background:#111113">
              <p style="margin:0;font-size:13px;color:#ffffff;font-weight:600">David K.</p>
              <p style="margin:2px 0 0;font-size:12px;color:#71717a">Fondateur DKDP · Genève</p>
              <p style="margin:12px 0 0;font-size:11px;color:#52525b">
                DKDP Sàrl · Genève, Suisse ·
                <a href="https://dkdp.ch" style="color:#52525b">dkdp.ch</a>
              </p>
            </div>
          </div>
        `,
      })
    } catch {
      // L'accusé de réception ne doit pas faire échouer la requête : la notif interne est partie.
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
