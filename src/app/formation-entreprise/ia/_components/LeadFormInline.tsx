'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, Shield, Star } from 'lucide-react'
import { orange } from '@/lib/tokens'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function LeadFormInline() {
  const [form, setForm] = useState({ firstName: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const O = orange.color
  const OB = orange.bg
  const OD = orange.border

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
          message: form.message || 'Demande de devis formation IA (landing page)',
          service: 'Formation IA',
          source: 'Landing page /formation-entreprise/ia',
          _gotcha: honeypot,
        }),
      })

      if (res.ok) {
        setStatus('success')
        window.gtag?.('event', 'generate_lead', {
          event_category: 'formation_ia',
          event_label: 'inline_form',
          value: 1,
        })
        window.dataLayer?.push({ event: 'generate_lead', form_type: 'devis_formation_ia' })
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
      style={{ borderColor: OD }}
    >
      {/* ── Left : value prop ── */}
      <div className="p-8 md:p-10" style={{ background: OB }}>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
          Devis gratuit · Sans engagement
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          Recevez votre programme sur mesure sous 48h
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-7">
          Dites-nous en quoi consiste votre équipe et on vous prépare un programme adapté à vos
          vrais cas d&apos;usage : ChatGPT, Claude, Copilot ou les trois.
        </p>

        <div className="space-y-3 mb-8">
          {[
            'Programme 100% adapté à votre secteur',
            'Réponse sous 48h, devis détaillé inclus',
            'Sans engagement, sans relance commerciale',
          ].map((t) => (
            <div key={t} className="flex items-center gap-3">
              <CheckCircle2 size={14} style={{ color: O }} className="flex-shrink-0" />
              <span className="text-text-secondary text-sm">{t}</span>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div
          className="rounded-[12px] p-4 flex items-start gap-3"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${OD}` }}
        >
          <Shield size={15} style={{ color: O }} className="flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-text-secondary leading-relaxed">
            <span className="text-white font-semibold">Satisfaction garantie.</span>{' '}
            Si votre équipe n&apos;applique aucune compétence dès J+1, on revient gratuitement.
          </p>
        </div>

        {/* Social proof */}
        <div
          className="flex items-center gap-5 mt-6 pt-5 border-t"
          style={{ borderColor: OD }}
        >
          <div>
            <div className="flex gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={11} fill={O} style={{ color: O }} />
              ))}
            </div>
            <p className="text-[11px] text-text-muted">4.9/5 · 500+ participants · Suisse romande</p>
          </div>
          <div
            className="ml-auto text-center px-3 py-2 rounded-[8px]"
            style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${OD}` }}
          >
            <p className="text-lg font-bold" style={{ color: O }}>91%</p>
            <p className="text-[9px] text-text-muted uppercase tracking-wide">opérationnels J+1</p>
          </div>
        </div>
      </div>

      {/* ── Right : form ── */}
      <div className="p-8 md:p-10 bg-bg-card">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}
            >
              <CheckCircle2 size={24} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Message envoyé !</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Nous vous répondons sous 48h avec un programme personnalisé et un devis détaillé.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-white font-bold text-lg mb-1">Demander un devis gratuit</h3>
            <p className="text-text-muted text-xs mb-4">Réponse en moins de 48h ouvrés.</p>

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

            {/* Prénom */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                Prénom *
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                placeholder="Marie"
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-white placeholder-text-muted bg-bg border border-border focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                Email professionnel *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="marie@votre-entreprise.ch"
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-white placeholder-text-muted bg-bg border border-border focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                Précisions{' '}
                <span className="text-text-muted font-normal">(optionnel)</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Taille de l'équipe, secteur, outils utilisés..."
                rows={3}
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-white placeholder-text-muted bg-bg border border-border focus:border-orange-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs">
                Une erreur est survenue. Contactez-nous directement à{' '}
                <a href="mailto:dk@dkdp.ch" className="underline">
                  dk@dkdp.ch
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-[10px] font-semibold text-sm text-black transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #FF8C00, #FFB347)' }}
            >
              {status === 'loading' ? (
                'Envoi en cours...'
              ) : (
                <>
                  Recevoir mon devis gratuit <ArrowRight size={14} />
                </>
              )}
            </button>

            <p className="text-[11px] text-text-muted text-center">
              Réponse sous 48h · Sans engagement · Données confidentielles
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
