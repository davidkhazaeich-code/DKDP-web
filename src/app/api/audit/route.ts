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
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
