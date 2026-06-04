'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import type { Locale } from '@/i18n/config'

const COPY = {
  fr: { successTitle: "C'est noté !", successText: 'On vous enverra le prochain article.', placeholder: 'votre@email.ch', emailAria: 'Adresse email', subscribe: "S'abonner", error: 'Erreur. Écrivez-nous à dk@dkdp.ch' },
  en: { successTitle: 'Done!', successText: 'We will send you the next article.', placeholder: 'you@email.com', emailAria: 'Email address', subscribe: 'Subscribe', error: 'Error. Write to us at dk@dkdp.ch' },
} as const

export function NewsletterForm({ lang = 'fr' }: { lang?: Locale } = {}) {
  const c = COPY[lang]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)' }}
        >
          <CheckCircle2 size={24} style={{ color: '#86efac' }} />
        </div>
        <p className="text-text font-semibold">{c.successTitle}</p>
        <p className="text-text-secondary text-sm">{c.successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={c.placeholder}
        aria-label={c.emailAria}
        className="flex-1 rounded-[10px] border border-[color:var(--border)] px-4 py-3 text-sm bg-transparent text-text placeholder:text-text-muted outline-none focus:border-[rgba(167,139,250,0.50)] transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #D4D4D8, #A78BFA)' }}
      >
        {status === 'loading'
          ? <Loader2 size={15} className="animate-spin" />
          : <Send size={14} />
        }
        {c.subscribe}
      </button>

      {status === 'error' && (
        <p className="w-full text-red-500 text-xs text-center mt-1">
          {c.error}
        </p>
      )}
    </form>
  )
}
