'use client'

import { useState } from 'react'
import { Globe, Mail, Search, CheckCircle2, Loader2 } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'

const color  = '#A78BFA'
const bg     = 'rgba(124,58,237,0.08)'
const border = 'rgba(124,58,237,0.18)'

const INCLUDES = [
  'Performance & temps de chargement (Core Web Vitals)',
  'SEO on-page et structure technique',
  'Compatibilité mobile et accessibilité',
  'Sécurité HTTPS et redirections',
  '3 recommandations prioritaires personnalisées',
]

export function SiteAuditBlock() {
  const [url, setUrl]     = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]   = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const gotcha = (form.elements.namedItem('_gotcha') as HTMLInputElement)?.value
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, _gotcha: gotcha }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Une erreur est survenue. Réessayez ou écrivez-nous à dk@dkdp.ch')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'w-full bg-bg border border-border rounded-[8px] py-3 text-[13px] text-white ' +
    'placeholder:text-text-muted focus:outline-none focus:border-violet transition-colors duration-150'

  return (
    <InfiniteGrid accentRgb="124,58,237" blob1="rgba(124,58,237,0.10)" blob2="rgba(124,58,237,0.05)">
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="rounded-[24px] border overflow-hidden"
              style={{ background: 'rgba(12,8,18,0.7)', borderColor: border }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* ── Left: what you get ── */}
                <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r" style={{ borderColor: border }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color }}>
                    Audit gratuit
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                    On analyse votre site,<br />vous recevez le rapport.
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-8">
                    Donnez-nous l&apos;URL de votre site et votre email. On fait tourner l&apos;audit complet et on vous envoie les résultats, sans engagement.
                  </p>
                  <div className="space-y-3">
                    {INCLUDES.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                        <span className="text-text-secondary text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right: form ── */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {sent ? (
                    <div className="flex flex-col items-center justify-center text-center gap-5 py-8">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <CheckCircle2 size={32} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Demande reçue !</h3>
                        <p className="text-text-secondary text-sm">
                          On analyse votre site et vous envoyons le rapport sous 24–48h ouvrables.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Honeypot */}
                      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
                          URL de votre site <span style={{ color }}>*</span>
                        </label>
                        <div className="relative">
                          <Globe
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                          />
                          <input
                            type="url"
                            required
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            placeholder="https://votresite.ch"
                            className={`${inputCls} pl-9 pr-4`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em] mb-2">
                          Votre email <span style={{ color }}>*</span>
                        </label>
                        <div className="relative">
                          <Mail
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                          />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="vous@entreprise.com"
                            className={`${inputCls} pl-9 pr-4`}
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-red-400 text-[12px]">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-[13px] font-bold rounded-full transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: loading ? bg : color,
                          color: loading ? color : '#0A0A0A',
                          border: loading ? `1px solid ${border}` : 'none',
                        }}
                      >
                        {loading
                          ? <><Loader2 size={15} className="animate-spin" />Envoi en cours…</>
                          : <><Search size={14} />Recevoir mon audit gratuit</>
                        }
                      </button>

                      <p className="text-text-muted text-[11px] text-center">
                        Gratuit · Sans engagement · Résultats sous 24–48h
                      </p>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </InfiniteGrid>
  )
}
