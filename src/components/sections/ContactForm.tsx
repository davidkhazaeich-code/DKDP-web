'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Send, CheckCircle2, Loader2, ArrowRight, ArrowLeft, ChevronDown,
  Briefcase, MessageSquare, User, Mail, Phone, Building2, Compass,
} from 'lucide-react'
import type { Locale } from '@/i18n/config'

const SERVICE_VALUES = ['', 'service-digital', 'formation', 'intelligence-artificielle', 'audit', 'autre']
const SOURCE_VALUES = ['google', 'bouche-a-oreille', 'linkedin', 'reseaux-sociaux', 'intelligence-artificielle', 'partenaire', 'autre']

const VALID_SERVICES = new Set(SERVICE_VALUES)

const CONTENT = {
  fr: {
    services: ['Quel service vous intéresse ?', 'Service Digital : Site web, SEO, Ads', 'Formation Entreprise', 'Intelligence Artificielle', 'Audit gratuit de mon digital', 'Autre / Je ne sais pas encore'],
    sources: ['Google', 'Bouche à oreille', 'LinkedIn', 'Réseaux sociaux', 'Intelligence Artificielle', 'Partenaire / Référent', 'Autre'],
    step1: 'Votre demande', step2: 'Vos coordonnées', step3: 'Notre projet démarre',
    serviceLabel: 'Service', messageLabel: 'Message', continue: 'Continuer',
    messagePlaceholder: 'Décrivez votre projet en quelques lignes…',
    firstName: 'Prénom', lastName: 'Nom', email: 'Email', phone: 'Téléphone', company: 'Entreprise',
    emailPlaceholder: 'vous@entreprise.com', phonePlaceholder: '+41 79 000 00 00', companyPlaceholder: 'Nom de votre entreprise',
    howFound: 'Comment avez-vous trouvé nos services ?',
    back: 'Retour', sending: 'Envoi en cours…', send: 'Envoyer mon message',
    disclaimer: 'Sans engagement · Réponse sous 24h · Confidentialité garantie',
    error: 'Une erreur est survenue. Écrivez-nous directement à dk@dkdp.ch',
    successTitle: 'Message envoyé !', successText: 'On vous recontacte sous 24h ouvrables.',
  },
  en: {
    services: ['Which service interests you?', 'Digital Service: website, SEO, Ads', 'Corporate Training', 'Artificial Intelligence', 'Free audit of my digital presence', 'Other / Not sure yet'],
    sources: ['Google', 'Word of mouth', 'LinkedIn', 'Social media', 'Artificial Intelligence', 'Partner / Referral', 'Other'],
    step1: 'Your request', step2: 'Your details', step3: 'Our project begins',
    serviceLabel: 'Service', messageLabel: 'Message', continue: 'Continue',
    messagePlaceholder: 'Describe your project in a few lines…',
    firstName: 'First name', lastName: 'Last name', email: 'Email', phone: 'Phone', company: 'Company',
    emailPlaceholder: 'you@company.com', phonePlaceholder: '+41 79 000 00 00', companyPlaceholder: 'Your company name',
    howFound: 'How did you find our services?',
    back: 'Back', sending: 'Sending…', send: 'Send my message',
    disclaimer: 'No commitment · Reply within 24h · Confidentiality guaranteed',
    error: 'Something went wrong. Write to us directly at dk@dkdp.ch',
    successTitle: 'Message sent!', successText: 'We will get back to you within 24 working hours.',
  },
} as const

const input =
  'w-full bg-bg border border-border rounded-[8px] px-4 py-3 text-[13px] text-text ' +
  'placeholder:text-text-muted focus:outline-none focus:border-violet transition-colors duration-150'

const labelCls = 'flex items-center gap-1.5 text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2'

function ContactFormInner({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]
  const searchParams = useSearchParams()
  const raw = searchParams.get('service') ?? ''
  const preselected = VALID_SERVICES.has(raw) ? raw : ''

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 1 fields
  const [service, setService] = useState(preselected)
  const [message, setMessage] = useState('')

  // Step 2 fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [company, setCompany]     = useState('')
  const [sources, setSources]     = useState<string[]>([])

  function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    setStep(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, company, service, message, source: sources.join(', ') }),
      })
      if (!res.ok) throw new Error()
      setStep(3)
    } catch {
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
            style={{
              background: step === 1 ? 'rgba(124,58,237,1)' : step > 1 ? 'rgba(74,222,128,0.25)' : 'rgba(124,58,237,0.25)',
              color: step === 1 ? '#fff' : step > 1 ? '#86efac' : '#A78BFA',
            }}
          >
            {step > 1 ? <CheckCircle2 size={13} /> : '1'}
          </div>
          <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: step === 1 ? '#fff' : step > 1 ? '#86efac' : '#6B7280' }}>
            {t.step1}
          </span>
        </div>

        <div className="w-8 h-px bg-border" />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
            style={{
              background: step === 2 ? 'rgba(124,58,237,1)' : step > 2 ? 'rgba(74,222,128,0.25)' : 'rgba(124,58,237,0.10)',
              color: step === 2 ? '#fff' : step > 2 ? '#86efac' : '#4B5563',
              border: step >= 2 ? 'none' : '1px solid rgba(124,58,237,0.20)',
            }}
          >
            {step > 2 ? <CheckCircle2 size={13} /> : '2'}
          </div>
          <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: step === 2 ? '#fff' : step > 2 ? '#86efac' : '#4B5563' }}>
            {t.step2}
          </span>
        </div>

        <div className="w-8 h-px bg-border" />

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
            style={{
              background: step === 3 ? 'rgba(74,222,128,1)' : 'rgba(74,222,128,0.08)',
              color: step === 3 ? '#000' : '#374151',
              border: step === 3 ? 'none' : '1px solid rgba(74,222,128,0.15)',
            }}
          >
            {step === 3 ? <CheckCircle2 size={13} /> : '3'}
          </div>
          <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: step === 3 ? '#86efac' : '#374151' }}>
            {t.step3}
          </span>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <form onSubmit={handleStep1} className="space-y-4">
          <div>
            <label className={labelCls}>
              <Briefcase size={11} />
              {t.serviceLabel} <span className="text-violet-light">*</span>
            </label>
            <div className="relative w-full sm:max-w-[280px]">
              <select
                required
                value={service}
                onChange={e => setService(e.target.value)}
                className={`${input} appearance-none cursor-pointer pr-10`}
              >
                {SERVICE_VALUES.map((value, i) => (
                  <option key={value} value={value} disabled={value === ''} style={{ background: '#141414' }}>
                    {t.services[i]}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>
              <MessageSquare size={11} />
              {t.messageLabel} <span className="text-violet-light">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={t.messagePlaceholder}
              className={`${input} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black text-[13px] font-bold rounded-full hover:bg-gray-100 transition-colors duration-150"
          >
            {t.continue} <ArrowRight size={14} />
          </button>
        </form>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <User size={11} />
                {t.firstName} <span className="text-violet-light">*</span>
              </label>
              <input
                type="text" required placeholder={t.firstName}
                value={firstName} onChange={e => setFirstName(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className={labelCls}>
                <User size={11} />
                {t.lastName} <span className="text-violet-light">*</span>
              </label>
              <input
                type="text" required placeholder={t.lastName}
                value={lastName} onChange={e => setLastName(e.target.value)}
                className={input}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <Mail size={11} />
                {t.email} <span className="text-violet-light">*</span>
              </label>
              <input
                type="email" required placeholder={t.emailPlaceholder}
                value={email} onChange={e => setEmail(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className={labelCls}>
                <Phone size={11} />
                {t.phone}
              </label>
              <input
                type="tel" placeholder={t.phonePlaceholder}
                value={phone} onChange={e => setPhone(e.target.value)}
                className={input}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>
              <Building2 size={11} />
              {t.company}
            </label>
            <input
              type="text" placeholder={t.companyPlaceholder}
              value={company} onChange={e => setCompany(e.target.value)}
              className={input}
            />
          </div>

          <div>
            <label className={labelCls}>
              <Compass size={11} />
              {t.howFound}
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {SOURCE_VALUES.map((value, i) => {
                const active = sources.includes(value)
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSources(prev =>
                      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
                    )}
                    className="group px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150"
                    style={{
                      background: active ? 'rgba(124,58,237,0.25)' : 'var(--surface-default)',
                      color: active ? '#A78BFA' : 'var(--text-muted)',
                      border: active ? '1px solid rgba(124,58,237,0.50)' : '1px solid var(--surface-border)',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        const t = e.currentTarget
                        t.style.background = 'rgba(124,58,237,0.10)'
                        t.style.color = '#A78BFA'
                        t.style.border = '1px solid rgba(124,58,237,0.25)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        const t = e.currentTarget
                        t.style.background = 'var(--surface-default)'
                        t.style.color = 'var(--text-muted)'
                        t.style.border = '1px solid var(--surface-border)'
                      }
                    }}
                  >
                    {t.sources[i]}
                  </button>
                )
              })}
            </div>
          </div>

          {error && <p className="text-red-400 text-[12px]">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-3.5 text-[13px] font-semibold text-text-muted hover:text-text transition-colors duration-150 rounded-full border border-border hover:border-border-strong"
            >
              <ArrowLeft size={14} /> {t.back}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black text-[13px] font-bold rounded-full hover:bg-gray-100 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 size={15} className="animate-spin" />{t.sending}</>
                : <><Send size={14} />{t.send}</>
              }
            </button>
          </div>

          <p className="text-text-muted text-[11px] text-center">
            {t.disclaimer}
          </p>
        </form>
      )}

      {/* Step 3 — success */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center text-center gap-5 py-16">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)' }}>
            <CheckCircle2 size={32} style={{ color: '#86efac' }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text mb-2">{t.successTitle}</h3>
            <p className="text-text-secondary text-sm">{t.successText}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function ContactForm({ lang = 'fr' }: { lang?: Locale } = {}) {
  return (
    <Suspense fallback={null}>
      <ContactFormInner lang={lang} />
    </Suspense>
  )
}
