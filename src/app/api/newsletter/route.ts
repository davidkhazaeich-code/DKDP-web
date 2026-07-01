import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sanitize } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { scope: 'newsletter', limit: 5, windowMs: 10 * 60 * 1000 })
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  const body = await req.json()
  const { email, _gotcha } = body

  if (_gotcha) return NextResponse.json({ ok: true })
  if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Email invalide' }, { status: 400 })

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // ── 1. Notification interne ──
    await resend.emails.send({
      from: 'DKDP Blog <contact@dkdp.ch>',
      to: 'dk@dkdp.ch',
      replyTo: sanitize(email),
      subject: `[Blog] Nouvel abonné : ${sanitize(email)}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-bottom:4px">Nouvel abonné au blog</h2>
          <p style="color:#6b7280;margin-top:0">dkdp.ch/blog · formulaire newsletter</p>
          <p style="margin-top:16px">
            Email : <a href="mailto:${sanitize(email)}" style="color:#7c3aed">${sanitize(email)}</a>
          </p>
        </div>
      `,
    })

    // ── 2. Email de bienvenue à l'abonné (non bloquant) ──
    try {
      await resend.emails.send({
        from: 'David K. — DKDP <contact@dkdp.ch>',
        to: sanitize(email),
        replyTo: 'dk@dkdp.ch',
        subject: 'Bienvenue, votre inscription est confirmée - DKDP',
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
                Bienvenue
              </h2>
              <p style="margin:0 0 20px;color:#a1a1aa;line-height:1.65;font-size:15px">
                Votre inscription est confirmée. Vous recevrez nos articles sur l&apos;IA, le SEO et le web,
                pensés pour les PME de Suisse romande. Du concret, pas de spam.
              </p>

              <!-- CTA -->
              <div style="text-align:center;margin-bottom:28px">
                <a href="https://dkdp.ch/blog" style="display:inline-block;background:linear-gradient(135deg,#A78BFA,#C4B5FD);color:#000;font-weight:700;font-size:14px;padding:13px 28px;border-radius:8px;text-decoration:none">
                  Lire les derniers articles
                </a>
              </div>

              <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.65">
                Une question ou une idée d&apos;article ? Répondez directement à cet email ou écrivez-moi à
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
      // L'email de bienvenue ne doit pas faire échouer l'inscription : la notif interne est partie.
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
