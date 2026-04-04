import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sanitize } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { limit: 5, windowMs: 10 * 60 * 1000 })
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  const body = await req.json()
  const { email, _gotcha } = body

  if (_gotcha) return NextResponse.json({ ok: true })
  if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Email invalide' }, { status: 400 })

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
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
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
