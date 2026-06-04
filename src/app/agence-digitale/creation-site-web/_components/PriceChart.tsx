'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale } from '@/i18n/config'

// ── Data ─────────────────────────────────────────────────────────────────────

const MAX_VAL = 30000

const SITE_TYPE_VALUES = [
  { min: 2500, max: 5000, plus: false },
  { min: 4500, max: 8000, plus: false },
  { min: 6000, max: 15000, plus: false },
  { min: 10000, max: 30000, plus: true },
]

const CONTENT = {
  fr: {
    tag: 'Tarifs indicatifs',
    heading: 'Fourchette de prix selon le type de site',
    sub: 'Tarifs DKDP Genève · Next.js / Astro · Prix en CHF',
    basePrice: 'Prix de base',
    upperRange: 'Fourchette haute',
    estimatedDelay: 'Délai estimé',
    note: 'Estimation indicative · Devis détaillé sous 48h',
    types: [
      { label: 'Site vitrine', sub: 'Présentation, portfolio', weeks: '2 – 4 sem.' },
      { label: 'Site CMS / Blog', sub: 'Contenu éditable, blog', weeks: '3 – 6 sem.' },
      { label: 'E-commerce', sub: 'Boutique en ligne', weeks: '4 – 8 sem.' },
      { label: 'Application web', sub: 'Espace client, sur mesure', weeks: '6 – 16 sem.' },
    ],
  },
  en: {
    tag: 'Indicative pricing',
    heading: 'Price range by site type',
    sub: 'DKDP Geneva rates · Next.js / Astro · Prices in CHF',
    basePrice: 'Base price',
    upperRange: 'Upper range',
    estimatedDelay: 'Estimated timeline',
    note: 'Indicative estimate · Detailed quote within 48h',
    types: [
      { label: 'Showcase site', sub: 'Presentation, portfolio', weeks: '2 – 4 wks' },
      { label: 'CMS / Blog site', sub: 'Editable content, blog', weeks: '3 – 6 wks' },
      { label: 'E-commerce', sub: 'Online store', weeks: '4 – 8 wks' },
      { label: 'Web application', sub: 'Client area, custom', weeks: '6 – 16 wks' },
    ],
  },
} as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number, lang: Locale) {
  if (n >= 1000) return `${(n / 1000).toLocaleString(lang === 'en' ? 'en-GB' : 'fr-CH', { maximumFractionDigits: 1 })}k`
  return n.toString()
}

// ── Bar ───────────────────────────────────────────────────────────────────────

function PriceBar({
  item,
  label,
  sub,
  weeks,
  lang,
  index,
  inView,
}: {
  item: (typeof SITE_TYPE_VALUES)[0]
  label: string
  sub: string
  weeks: string
  lang: Locale
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
        <p className="text-sm font-semibold text-text leading-tight">{label}</p>
        <p className="text-[11px] text-text-muted mt-0.5">{sub}</p>
      </div>

      {/* Track */}
      <div className="flex-1 relative">
        {/* Tick marks */}
        <div className="absolute inset-0 flex" aria-hidden="true">
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 w-px bg-[var(--border-strong)]"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>

        {/* Bar background */}
        <div className="relative h-3 rounded-full bg-[var(--surface-default)] overflow-hidden">
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
        <p className="text-sm font-bold text-text font-mono tracking-tight leading-tight">
          CHF {fmt(item.min, lang)} – {item.plus ? `${fmt(item.max, lang)}+` : fmt(item.max, lang)}
        </p>
        <p className="text-[11px] text-emerald-500 sm:mt-0.5">{weeks}</p>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export function PriceChart({ lang = 'fr' }: { lang?: Locale } = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t = CONTENT[lang]

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[860px] mx-auto rounded-[20px] overflow-hidden bg-bg-card"
      style={{
        border: '1px solid rgba(124,58,237,0.30)',
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
              {t.tag}
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
          <p className="text-text font-bold text-lg sm:text-xl leading-tight">
            {t.heading}
          </p>
          <p className="text-text-muted text-sm mt-1">
            {t.sub}
          </p>
        </motion.div>

        {/* Bars */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {SITE_TYPE_VALUES.map((type, i) => (
            <PriceBar
              key={t.types[i].label}
              item={type}
              label={t.types[i].label}
              sub={t.types[i].sub}
              weeks={t.types[i].weeks}
              lang={lang}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Legend + note */}
        <motion.div
          className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-1.5 rounded-full" style={{ background: '#A78BFA' }} />
              {t.basePrice}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-1.5 rounded-full"
                style={{ background: 'rgba(124,58,237,0.35)' }}
              />
              {t.upperRange}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/70" />
              {t.estimatedDelay}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {t.note}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
