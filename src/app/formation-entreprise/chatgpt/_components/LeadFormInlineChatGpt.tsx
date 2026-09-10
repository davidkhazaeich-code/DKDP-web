'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, Shield, Star } from 'lucide-react'
import { violet } from '@/lib/tokens'
import { trackLead } from '@/lib/analytics'
import type { Locale } from '@/i18n/config'

/* Meme formulaire que sur la page Claude (memes couleurs, meme API, meme
   tracking), en une seule implementation FR + EN. */
const COPY = {
  fr: {
    kicker: 'Devis gratuit · Sans engagement',
    title: 'Recevez votre programme ChatGPT sur mesure sous 48h',
    intro: 'Dites-nous la taille de votre équipe, votre abonnement ChatGPT et vos cas d\'usage. On vous prépare un programme adapté : ChatGPT Astra (GPT-6), ChatGPT Work, GPTs ou Codex.',
    bullets: [
      'Programme 100% adapté à votre secteur et vos outils',
      'Réponse sous 48h, devis détaillé inclus',
      'Sans engagement, sans relance commerciale',
    ],
    guaranteeTitle: 'Satisfaction garantie.',
    guarantee: 'Si votre équipe n\'applique aucune compétence ChatGPT dès J+1, on revient gratuitement.',
    proof: '4.9/5 · 500+ participants · Suisse romande',
    practical: 'pratique',
    successTitle: 'Message envoyé !',
    successText: 'Nous vous répondons sous 48h avec un programme ChatGPT personnalisé et un devis détaillé.',
    formTitle: 'Demander un devis gratuit',
    formSub: 'Réponse en moins de 48h ouvrés.',
    firstName: 'Prénom *',
    firstNamePlaceholder: 'Marie',
    email: 'Email professionnel *',
    emailPlaceholder: 'marie@votre-entreprise.ch',
    details: 'Précisions',
    optional: '(optionnel)',
    detailsPlaceholder: 'Taille de l\'équipe, abonnement ChatGPT actuel, niveau...',
    error: 'Une erreur est survenue. Contactez-nous directement à',
    sending: 'Envoi en cours...',
    submit: 'Recevoir mon devis gratuit',
    footer: 'Réponse sous 48h · Sans engagement · Données confidentielles',
    defaultMessage: 'Demande de devis formation ChatGPT (landing page)',
    service: 'Formation ChatGPT',
    source: 'Landing page /formation-entreprise/chatgpt',
    formLocation: 'formation_chatgpt_landing',
  },
  en: {
    kicker: 'Free quote · No commitment',
    title: 'Receive your tailored ChatGPT programme within 48h',
    intro: 'Tell us your team size, your ChatGPT plan and your use cases. We prepare a programme tailored to you: ChatGPT Astra (GPT-6), ChatGPT Work, GPTs or Codex.',
    bullets: [
      'Programme 100% tailored to your industry and tools',
      'Reply within 48h, detailed quote included',
      'No commitment, no sales follow-up',
    ],
    guaranteeTitle: 'Satisfaction guaranteed.',
    guarantee: 'If your team applies no ChatGPT skill from day 1, we come back for free.',
    proof: '4.9/5 · 500+ participants · French-speaking Switzerland',
    practical: 'hands-on',
    successTitle: 'Message sent!',
    successText: 'We reply within 48h with a personalised ChatGPT programme and a detailed quote.',
    formTitle: 'Request a free quote',
    formSub: 'Reply in less than 48 business hours.',
    firstName: 'First name *',
    firstNamePlaceholder: 'Mary',
    email: 'Work email *',
    emailPlaceholder: 'mary@your-company.ch',
    details: 'Details',
    optional: '(optional)',
    detailsPlaceholder: 'Team size, current ChatGPT plan, level...',
    error: 'An error occurred. Contact us directly at',
    sending: 'Sending...',
    submit: 'Receive my free quote',
    footer: 'Reply within 48h · No commitment · Data kept confidential',
    defaultMessage: 'ChatGPT training quote request (landing page)',
    service: 'ChatGPT Training',
    source: 'Landing page /en/corporate-training/chatgpt',
    formLocation: 'corporate_training_chatgpt_landing',
  },
} as const

export function LeadFormInlineChatGpt({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
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
          message: form.message || t.defaultMessage,
          service: t.service,
          source: t.source,
          _gotcha: honeypot,
        }),
      })

      if (res.ok) {
        setStatus('success')
        trackLead({
          form_type: 'devis_formation_chatgpt',
          form_location: t.formLocation,
          event_category: 'formation_chatgpt',
          event_label: 'inline_form',
          ...(lang === 'en' ? { locale: 'en' } : {}),
        })
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
          {t.kicker}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-3 leading-tight">
          {t.title}
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-7">
          {t.intro}
        </p>

        <div className="space-y-3 mb-8">
          {t.bullets.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <CheckCircle2 size={14} style={{ color: C }} className="flex-shrink-0" />
              <span className="text-text-secondary text-sm">{b}</span>
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
            <span className="text-text font-semibold">{t.guaranteeTitle}</span>{' '}
            {t.guarantee}
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
            <p className="text-[11px] text-text-muted">{t.proof}</p>
          </div>
          <div
            className="ml-auto text-center px-3 py-2 rounded-[8px]"
            style={{ background: 'var(--bg-card)', border: `1px solid ${CD}` }}
          >
            <p className="text-lg font-bold" style={{ color: C }}>100%</p>
            <p className="text-[9px] text-text-muted uppercase tracking-wide">{t.practical}</p>
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
              <h3 className="text-text font-bold text-xl mb-2">{t.successTitle}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t.successText}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-text font-bold text-lg mb-1">{t.formTitle}</h3>
            <p className="text-text-muted text-xs mb-4">{t.formSub}</p>

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

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                {t.firstName}
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                placeholder={t.firstNamePlaceholder}
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-text placeholder-text-muted bg-bg border border-border focus:outline-none transition-colors"
                style={{ '--tw-ring-color': C } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                {t.email}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t.emailPlaceholder}
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-text placeholder-text-muted bg-bg border border-border focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                {t.details}{' '}
                <span className="text-text-muted font-normal">{t.optional}</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={t.detailsPlaceholder}
                rows={3}
                className="w-full rounded-[10px] px-4 py-2.5 text-sm text-text placeholder-text-muted bg-bg border border-border focus:outline-none transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs" style={{ color: 'var(--red-text)' }}>
                {t.error}{' '}
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
                t.sending
              ) : (
                <>
                  {t.submit} <ArrowRight size={14} />
                </>
              )}
            </button>

            <p className="text-[11px] text-text-muted text-center">{t.footer}</p>
          </form>
        )}
      </div>
    </div>
  )
}
