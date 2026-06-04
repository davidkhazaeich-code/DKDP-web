'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, Shield, Star } from 'lucide-react'
import { violet } from '@/lib/tokens'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function LeadFormInlineClaudeAIEN() {
  const [form, setForm] = useState({ firstName: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const C = violet.color
  const CB = violet.bg
  const CD = violet.border

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          message: form.message || 'Claude AI training quote request (landing page)',
          service: 'Claude AI Training',
          source: 'Landing page /en/corporate-training/claude-ai',
          _gotcha: honeypot,
        }),
      })

      if (res.ok) {
        setStatus('success')
        window.gtag?.('event', 'generate_lead', {
          event_category: 'formation_claude_ai',
          event_label: 'inline_form',
          value: 1,
        })
        window.dataLayer?.push({ event: 'generate_lead', form_type: 'devis_formation_claude_ai' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden rounded-[20px] border"
      style={{ borderColor: CD }}
    >
      {/* Left : value prop */}
      <div className="p-8 md:p-10" style={{ background: CB }}>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: C }}>
          Free quote · No commitment
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-3 leading-tight">
          Receive your tailored Claude AI programme within 48h
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-7">
          Tell us your team size and your use cases. We prepare a programme tailored to you:
          Claude.ai, collaborative Projects, Extended Thinking or Claude Code.
        </p>

        <div className="space-y-3 mb-8">
          {[
            'Programme 100% tailored to your industry and tools',
            'Reply within 48h, detailed quote included',
            'No commitment, no sales follow-up',
          ].map((t) => (
            <div key={t} className="flex items-center gap-3">
              <CheckCircle2 size={14} style={{ color: C }} className="flex-shrink-0" />
              <span className="text-text-secondary text-sm">{t}</span>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div
          className="rounded-[12px] p-4 flex items-start gap-3"
          style={{ background: 'var(--bg-card)', border: `1px solid ${CD}` }}
        >
          <Shield size={15} style={{ color: C }} className="flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-text-secondary leading-relaxed">
            <span className="text-text font-semibold">Satisfaction guaranteed.</span>{' '}
            If your team applies no Claude skill from day 1, we come back for free.
          </p>
        </div>

        {/* Social proof */}
        <div
          className="flex items-center gap-5 mt-6 pt-5 border-t"
          style={{ borderColor: CD }}
        >
          <div>
            <div className="flex gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={11} fill={C} style={{ color: C }} />
              ))}
            </div>
            <p className="text-[11px] text-text-muted">4.9/5 · 500+ participants · French-speaking Switzerland</p>
          </div>
          <div
            className="ml-auto text-center px-3 py-2 rounded-[8px]"
            style={{ background: 'var(--bg-card)', border: `1px solid ${CD}` }}
          >
            <p className="text-lg font-bold" style={{ color: C }}>100%</p>
            <p className="text-[9px] text-text-muted uppercase tracking-wide">hands-on</p>
          </div>
        </div>
      </div>

      {/* Right : form */}
      <div className="p-8 md:p-10 bg-bg-card">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)' }}
            >
              <CheckCircle2 size={24} style={{ color: 'var(--green-text)' }} />
            </div>
            <div>
              <h3 className="text-text font-bold text-xl mb-2">Message sent!</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                We reply within 48h with a personalised Claude AI programme and a detailed quote.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-text font-bold text-lg mb-1">Request a free quote</h3>
            <p className="text-text-muted text-xs mb-4">Reply in less than 48 business hours.</p>

            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
            />

            {/* First name */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                First name *
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                placeholder="Mary"
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-text placeholder-text-muted bg-bg border border-border focus:outline-none transition-colors"
                style={{ '--tw-ring-color': C } as React.CSSProperties}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                Work email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="mary@your-company.ch"
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-text placeholder-text-muted bg-bg border border-border focus:outline-none transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                Details{' '}
                <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Team size, department, current level..."
                rows={3}
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-text placeholder-text-muted bg-bg border border-border focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs" style={{ color: 'var(--red-text)' }}>
                An error occurred. Contact us directly at{' '}
                <a href="mailto:dk@dkdp.ch" className="underline">
                  dk@dkdp.ch
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-[10px] font-semibold text-sm text-white transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}
            >
              {status === 'loading' ? (
                'Sending...'
              ) : (
                <>
                  Receive my free quote <ArrowRight size={14} />
                </>
              )}
            </button>

            <p className="text-[11px] text-text-muted text-center">
              Reply within 48h · No commitment · Data kept confidential
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
