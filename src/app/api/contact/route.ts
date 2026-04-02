import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { sanitize } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
  // ── Rate limit: 5 submissions per IP per 10 minutes ──
  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { limit: 5, windowMs: 10 * 60 * 1000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const { firstName, lastName, email, phone, company, service, message, source, _gotcha } = body

  // ── Honeypot check ──
  if (_gotcha) {
    // Bot filled the hidden field — silently accept (don't reveal detection)
    return NextResponse.json({ ok: true })
  }

  // ── Required fields ──
  if (!firstName || !email || !service || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'DKDP Contact <contact@dkdp.ch>',
      to: 'dk@dkdp.ch',
      replyTo: `${sanitize(firstName)} ${sanitize(lastName ?? '')} <${sanitize(email)}>`,
      subject: `[Contact] ${sanitize(service)} — ${sanitize(firstName)} ${sanitize(lastName ?? '')}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin-bottom:4px">Nouveau message de contact</h2>
          <p style="color:#6b7280;margin-top:0">dkdp.ch — formulaire de contact</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr>
              <td style="padding:9px 14px;background:#f5f5f5;font-weight:600;width:110px;border-radius:4px 0 0 4px;white-space:nowrap">Nom</td>
              <td style="padding:9px 14px;background:#fafafa;border-radius:0 4px 4px 0">${sanitize(firstName)} ${sanitize(lastName ?? '')}</td>
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

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
