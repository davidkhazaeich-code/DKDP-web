'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'

const chromeBd = 'rgba(212,212,216,0.16)'

export function NewsletterForm() {
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
        <p className="text-white font-semibold">C&apos;est noté !</p>
        <p className="text-zinc-400 text-sm">On vous enverra le prochain article.</p>
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
        placeholder="votre@email.ch"
        aria-label="Adresse email"
        className="flex-1 rounded-[10px] border px-4 py-3 text-sm bg-transparent text-white placeholder:text-zinc-500 outline-none focus:border-[rgba(167,139,250,0.50)] transition-colors"
        style={{ borderColor: chromeBd }}
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
        S&apos;abonner
      </button>

      {status === 'error' && (
        <p className="w-full text-red-400 text-xs text-center mt-1">
          Erreur. Écrivez-nous à dk@dkdp.ch
        </p>
      )}
    </form>
  )
}
