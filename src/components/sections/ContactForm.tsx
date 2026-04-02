'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Send, CheckCircle2, Loader2, ArrowRight, ArrowLeft, ChevronDown,
  Briefcase, MessageSquare, User, Mail, Phone, Building2, Compass,
} from 'lucide-react'

const SERVICES = [
  { value: '', label: 'Quel service vous intéresse ?' },
  { value: 'service-digital', label: 'Service Digital : Site web, SEO, Ads' },
  { value: 'formation', label: 'Formation Entreprise' },
  { value: 'intelligence-artificielle', label: 'Intelligence Artificielle' },
  { value: 'audit', label: 'Audit gratuit de mon digital' },
  { value: 'autre', label: 'Autre / Je ne sais pas encore' },
]

const SOURCES = [
  { value: 'google', label: 'Google' },
  { value: 'bouche-a-oreille', label: 'Bouche à oreille' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'reseaux-sociaux', label: 'Réseaux sociaux' },
  { value: 'intelligence-artificielle', label: 'Intelligence Artificielle' },
  { value: 'partenaire', label: 'Partenaire / Référent' },
  { value: 'autre', label: 'Autre' },
]

const VALID_SERVICES = new Set(SERVICES.map(s => s.value))

const input =
  'w-full bg-bg border border-border rounded-[8px] px-4 py-3 text-[13px] text-white ' +
  'placeholder:text-text-muted focus:outline-none focus:border-violet transition-colors duration-150'

const labelCls = 'flex items-center gap-1.5 text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2'

function ContactFormInner() {
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
      setError('Une erreur est survenue. Écrivez-nous directement à dk@dkdp.ch')
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: step === 1 ? '#fff' : step > 1 ? '#86efac' : '#6B7280' }}>
            Votre demande
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: step === 2 ? '#fff' : step > 2 ? '#86efac' : '#4B5563' }}>
            Vos coordonnées
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: step === 3 ? '#86efac' : '#374151' }}>
            Notre projet démarre
          </span>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <form onSubmit={handleStep1} className="space-y-4">
          <div>
            <label className={labelCls}>
              <Briefcase size={11} />
              Service <span className="text-violet-light">*</span>
            </label>
            <div className="relative max-w-[280px]">
              <select
                required
                value={service}
                onChange={e => setService(e.target.value)}
                className={`${input} appearance-none cursor-pointer pr-10`}
              >
                {SERVICES.map(s => (
                  <option key={s.value} value={s.value} disabled={s.value === ''} style={{ background: '#141414' }}>
                    {s.label}
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
              Message <span className="text-violet-light">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Décrivez votre projet en quelques lignes…"
              className={`${input} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black text-[13px] font-bold rounded-full hover:bg-gray-100 transition-colors duration-150"
          >
            Continuer <ArrowRight size={14} />
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <User size={11} />
                Prénom <span className="text-violet-light">*</span>
              </label>
              <input
                type="text" required placeholder="Prénom"
                value={firstName} onChange={e => setFirstName(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className={labelCls}>
                <User size={11} />
                Nom <span className="text-violet-light">*</span>
              </label>
              <input
                type="text" required placeholder="Nom"
                value={lastName} onChange={e => setLastName(e.target.value)}
                className={input}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <Mail size={11} />
                Email <span className="text-violet-light">*</span>
              </label>
              <input
                type="email" required placeholder="vous@entreprise.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className={labelCls}>
                <Phone size={11} />
                Téléphone
              </label>
              <input
                type="tel" placeholder="+41 79 000 00 00"
                value={phone} onChange={e => setPhone(e.target.value)}
                className={input}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>
              <Building2 size={11} />
              Entreprise
            </label>
            <input
              type="text" placeholder="Nom de votre entreprise"
              value={company} onChange={e => setCompany(e.target.value)}
              className={input}
            />
          </div>

          <div>
            <label className={labelCls}>
              <Compass size={11} />
              Comment avez-vous trouvé nos services ?
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {SOURCES.map(s => {
                const active = sources.includes(s.value)
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSources(prev =>
                      prev.includes(s.value) ? prev.filter(v => v !== s.value) : [...prev, s.value]
                    )}
                    className="group px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150"
                    style={{
                      background: active ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.05)',
                      color: active ? '#A78BFA' : '#6B7280',
                      border: active ? '1px solid rgba(124,58,237,0.50)' : '1px solid rgba(255,255,255,0.08)',
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
                        t.style.background = 'rgba(255,255,255,0.05)'
                        t.style.color = '#6B7280'
                        t.style.border = '1px solid rgba(255,255,255,0.08)'
                      }
                    }}
                  >
                    {s.label}
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
              className="flex items-center gap-1.5 px-4 py-3.5 text-[13px] font-semibold text-text-muted hover:text-white transition-colors duration-150 rounded-full border border-border hover:border-white/20"
            >
              <ArrowLeft size={14} /> Retour
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black text-[13px] font-bold rounded-full hover:bg-gray-100 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 size={15} className="animate-spin" />Envoi en cours…</>
                : <><Send size={14} />Envoyer mon message</>
              }
            </button>
          </div>

          <p className="text-text-muted text-[11px] text-center">
            Sans engagement · Réponse sous 24h · Confidentialité garantie
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
            <h3 className="text-xl font-bold text-white mb-2">Message envoyé !</h3>
            <p className="text-text-secondary text-sm">On vous recontacte sous 24h ouvrables.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  )
}
