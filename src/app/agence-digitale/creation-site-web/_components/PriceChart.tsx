'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Data ─────────────────────────────────────────────────────────────────────

const MAX_VAL = 30000

const SITE_TYPES = [
  {
    label: 'Site vitrine',
    sub: 'Présentation, portfolio',
    min: 2500,
    max: 5000,
    weeks: '2 – 4 sem.',
    plus: false,
  },
  {
    label: 'Site CMS / Blog',
    sub: 'Contenu éditable, blog',
    min: 4500,
    max: 8000,
    weeks: '3 – 6 sem.',
    plus: false,
  },
  {
    label: 'E-commerce',
    sub: 'Boutique en ligne',
    min: 6000,
    max: 15000,
    weeks: '4 – 8 sem.',
    plus: false,
  },
  {
    label: 'Application web',
    sub: 'Espace client, sur mesure',
    min: 10000,
    max: 30000,
    weeks: '6 – 16 sem.',
    plus: true,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000) return `${(n / 1000).toLocaleString('fr-CH', { maximumFractionDigits: 1 })}k`
  return n.toString()
}

// ── Bar ───────────────────────────────────────────────────────────────────────

function PriceBar({
  item,
  index,
  inView,
}: {
  item: (typeof SITE_TYPES)[0]
  index: number
  inView: boolean
}) {
  const maxPct = (item.max / MAX_VAL) * 100
  const minRelPct = (item.min / item.max) * 100

  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Label */}
      <div className="sm:w-40 flex-shrink-0 sm:text-right">
        <p className="text-sm font-semibold text-white leading-tight">{item.label}</p>
        <p className="text-[11px] text-zinc-500 mt-0.5">{item.sub}</p>
      </div>

      {/* Track */}
      <div className="flex-1 relative">
        {/* Tick marks */}
        <div className="absolute inset-0 flex" aria-hidden="true">
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 w-px bg-zinc-700/40"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>

        {/* Bar background */}
        <div className="relative h-3 rounded-full bg-zinc-800/70 overflow-hidden">
          {/* Animated range bar */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(
                to right,
                #A78BFA 0%,
                #A78BFA ${minRelPct}%,
                rgba(124,58,237,0.28) ${minRelPct}%,
                rgba(124,58,237,0.28) 100%
              )`,
              boxShadow: '0 0 12px rgba(167,139,250,0.35)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: inView ? `${maxPct}%` : '0%' }}
            transition={{
              duration: 1.0,
              delay: index * 0.13,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      </div>

      {/* Price + delay */}
      <div className="sm:w-36 flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
        <p className="text-sm font-bold text-white font-mono tracking-tight leading-tight">
          CHF {fmt(item.min)} – {item.plus ? `${fmt(item.max)}+` : fmt(item.max)}
        </p>
        <p className="text-[11px] text-emerald-400/80 sm:mt-0.5">{item.weeks}</p>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export function PriceChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[860px] mx-auto rounded-[20px] overflow-hidden"
      style={{
        border: '1px solid rgba(124,58,237,0.18)',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Violet glow background */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative px-6 py-7 sm:px-8 sm:py-8">
        {/* Header */}
        <motion.div
          className="mb-6 sm:mb-7"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: '#A78BFA' }}
            >
              Tarifs indicatifs
            </span>
            {/* Live dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: '#A78BFA' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: '#A78BFA' }}
              />
            </span>
          </div>
          <p className="text-white font-bold text-lg sm:text-xl leading-tight">
            Fourchette de prix selon le type de site
          </p>
          <p className="text-zinc-500 text-sm mt-1">
            Tarifs DKDP Genève · Next.js / Astro · Prix en CHF
          </p>
        </motion.div>

        {/* Bars */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {SITE_TYPES.map((type, i) => (
            <PriceBar key={type.label} item={type} index={i} inView={inView} />
          ))}
        </div>

        {/* Legend + note */}
        <motion.div
          className="mt-6 pt-5 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-1.5 rounded-full" style={{ background: '#A78BFA' }} />
              Prix de base
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-1.5 rounded-full"
                style={{ background: 'rgba(124,58,237,0.35)' }}
              />
              Fourchette haute
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400/70" />
              Délai estimé
            </span>
          </div>
          <p className="text-[11px] text-zinc-600">
            Estimation indicative · Devis détaillé sous 48h
          </p>
        </motion.div>
      </div>
    </div>
  )
}
