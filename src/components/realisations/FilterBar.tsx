'use client'
import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { domainLabel, sectorLabel } from '@/lib/realisations/taxonomy'
import type { RealisationDomain, RealisationSector } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

export type FilterValue = {
  domain: RealisationDomain | 'all'
  sector: RealisationSector | null
}

export type FilterBarProps = {
  /** Domaines presents dans les etudes en ligne, dans l'ordre de la taxonomie. */
  domains: RealisationDomain[]
  /** Secteurs presents dans les etudes en ligne. */
  sectors: RealisationSector[]
  value: FilterValue
  onChange: (v: FilterValue) => void
  /** Nombre d'etudes par onglet, affiche a cote du libelle (hors du nom accessible). */
  counts?: Partial<Record<RealisationDomain | 'all', number>>
  lang?: Locale
}

/**
 * Filtres du hub des realisations : un onglet par domaine de service
 * (seulement ceux qui ont une etude en ligne, jamais un filtre vide) et une
 * pastille par secteur, pour qu'un prospect retrouve vite un projet de son
 * metier ou de sa prestation. La pastille de l'onglet actif glisse d'un
 * onglet a l'autre (Motion, `layoutId`), sans glissement si le visiteur
 * reduit les animations.
 */
export function FilterBar({ domains, sectors, value, onChange, counts, lang = 'fr' }: FilterBarProps) {
  const reduce = useReducedMotion()
  const hasFilters = value.domain !== 'all' || value.sector !== null
  const en = lang === 'en'
  const tabs: { key: FilterValue['domain']; label: string }[] = [
    { key: 'all', label: en ? 'All' : 'Tous' },
    ...domains.map((d) => ({ key: d, label: domainLabel(d, lang) })),
  ]

  return (
    <div
      className="sticky top-[66px] z-30 border-b border-border py-3 backdrop-blur-2xl"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}
    >
      {/* Mobile : deux rangees qui defilent a l'horizontale, la barre reste basse. */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 md:flex-row md:flex-wrap md:items-center">
        <div
          className="-mx-6 flex gap-1 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={en ? 'Service' : 'Prestation'}
        >
          {tabs.map((t) => {
            const active = value.domain === t.key
            const count = counts?.[t.key]
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onChange({ domain: t.key, sector: value.sector })}
                className={clsx(
                  'relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  active ? 'text-[var(--violet-text)]' : 'text-text-secondary hover:bg-[var(--surface-default)] hover:text-text',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="realisations-domain-pill"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-full border border-[var(--violet-border)] bg-[var(--violet-bg)]"
                  />
                )}
                <span className="relative">{t.label}</span>
                {count !== undefined && (
                  <span aria-hidden="true" className="relative ml-1.5 text-[11px] tabular-nums text-text-muted">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="-mx-6 flex items-center gap-1.5 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:ml-auto md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={value.sector === s}
              onClick={() => onChange({ domain: value.domain, sector: value.sector === s ? null : s })}
              className={clsx(
                'shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs transition',
                value.sector === s
                  ? 'border-[var(--violet-border)] bg-[var(--violet-bg)] text-[var(--violet-text)]'
                  : 'border-border text-text-muted hover:border-border-strong hover:text-text-secondary',
              )}
            >
              {sectorLabel(s, lang)}
            </button>
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={() => onChange({ domain: 'all', sector: null })}
              className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs text-text-muted underline-offset-2 hover:text-text hover:underline"
            >
              {en ? 'Reset' : 'Réinitialiser'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
