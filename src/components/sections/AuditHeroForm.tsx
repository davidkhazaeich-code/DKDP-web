'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

export function AuditHeroForm({ buttonLabel = 'Recevoir mon audit gratuit' }: { buttonLabel?: string }) {
  const [url, setUrl]     = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)' }}
        >
          <CheckCircle2 size={28} style={{ color: '#A78BFA' }} />
        </div>
        <div>
          <p className="text-white font-bold text-lg mb-1">Demande reçue !</p>
          <p className="text-zinc-400 text-sm">On analyse votre site et vous envoyons le rapport sous 48h ouvrées.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* URL */}
      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-semibold text-white mb-2">
          URL de votre site web
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 1.5C8 1.5 6 4.5 6 8s2 6.5 2 6.5M8 1.5C8 1.5 10 4.5 10 8s-2 6.5-2 6.5M1.5 8h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2.2 5.5h11.6M2.2 10.5h11.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="url"
            id="url"
            required
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://votre-site.ch"
            className="w-full rounded-[12px] border border-[rgba(212,212,216,0.14)] focus:border-[#A78BFA] px-4 py-4 pl-12 text-white text-base placeholder:text-zinc-500 outline-none transition-colors"
            style={{ background: 'rgba(212,212,216,0.04)' }}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Votre adresse email
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="vous@entreprise.ch"
          className="w-full rounded-[12px] border border-[rgba(212,212,216,0.14)] focus:border-[#A78BFA] px-4 py-4 text-white text-base placeholder:text-zinc-500 outline-none transition-colors"
          style={{ background: 'rgba(212,212,216,0.04)' }}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm mb-4 text-center">
          Une erreur est survenue. Réessayez ou écrivez à dk@dkdp.ch
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-[12px] text-base font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)' }}
      >
        {status === 'loading'
          ? <><Loader2 size={16} className="animate-spin" />Envoi en cours…</>
          : <>{buttonLabel} &rarr;</>
        }
      </button>

      <p className="text-center text-xs text-zinc-500 mt-4">
        Gratuit · Sans engagement · Résultats sous 48h · Données confidentielles
      </p>
    </form>
  )
}
