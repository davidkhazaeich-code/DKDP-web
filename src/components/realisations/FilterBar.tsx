'use client'
import { clsx } from 'clsx'
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
  lang?: Locale
}

/**
 * Filtres du hub des realisations : un onglet par domaine de service
 * (seulement ceux qui ont une etude en ligne, jamais un filtre vide) et une
 * pastille par secteur, pour qu'un prospect retrouve vite un projet de son
 * metier ou de sa prestation.
 */
export function FilterBar({ domains, sectors, value, onChange, lang = 'fr' }: FilterBarProps) {
  const hasFilters = value.domain !== 'all' || value.sector !== null
  const en = lang === 'en'
  const tabs: { key: FilterValue['domain']; label: string }[] = [
    { key: 'all', label: en ? 'All' : 'Tous' },
    ...domains.map((d) => ({ key: d, label: domainLabel(d, lang) })),
  ]

  return (
    <div
      className="sticky top-[66px] z-30 -mx-6 border-b border-border px-6 py-3 backdrop-blur-2xl"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={en ? 'Service' : 'Prestation'}>
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={value.domain === t.key}
              onClick={() => onChange({ domain: t.key, sector: value.sector })}
              className={clsx(
                'rounded-full px-3 py-1.5 text-sm font-medium transition',
                value.domain === t.key
                  ? 'bg-[var(--violet-bg)] text-[var(--violet-text)]'
                  : 'text-text-secondary hover:bg-[var(--surface-default)] hover:text-text',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={value.sector === s}
              onClick={() => onChange({ domain: value.domain, sector: value.sector === s ? null : s })}
              className={clsx(
                'rounded-full border px-2.5 py-1 text-xs transition',
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
              className="rounded-full px-2.5 py-1 text-xs text-text-muted underline-offset-2 hover:text-text hover:underline"
            >
              {en ? 'Reset' : 'Réinitialiser'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
