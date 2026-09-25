'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ProjectCard } from './ProjectCard'
import { FilterBar, type FilterValue } from './FilterBar'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { DOMAINS, SECTORS } from '@/lib/realisations/taxonomy'
import type { Realisation, RealisationDomain, RealisationSector } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

type Props = { items: Realisation[]; lang?: Locale }

const DOMAIN_ORDER = Object.keys(DOMAINS) as RealisationDomain[]
const SECTOR_ORDER = Object.keys(SECTORS) as RealisationSector[]

export function RealisationsGrid({ items, lang = 'fr' }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const en = lang === 'en'
  const hub = en ? '/en/portfolio' : '/realisations'

  // Seuls les domaines et secteurs qui ont une etude figurent dans les filtres.
  const domains = useMemo(
    () => DOMAIN_ORDER.filter((d) => items.some((r) => r.domains.includes(d))),
    [items],
  )
  const sectors = useMemo(
    () => SECTOR_ORDER.filter((s) => items.some((r) => r.sector === s)),
    [items],
  )

  const rawDomain = params.get('domaine')
  const rawSector = params.get('secteur')
  const value: FilterValue = {
    domain: domains.includes(rawDomain as RealisationDomain) ? (rawDomain as RealisationDomain) : 'all',
    sector: sectors.includes(rawSector as RealisationSector) ? (rawSector as RealisationSector) : null,
  }

  const filtered = useMemo(
    () =>
      items.filter((r) => {
        if (value.domain !== 'all' && !r.domains.includes(value.domain)) return false
        if (value.sector && r.sector !== value.sector) return false
        return true
      }),
    [items, value.domain, value.sector],
  )

  function setFilter(next: FilterValue) {
    const sp = new URLSearchParams()
    if (next.domain !== 'all') sp.set('domaine', next.domain)
    if (next.sector) sp.set('secteur', next.sector)
    const qs = sp.toString()
    router.replace(`${hub}${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  return (
    <>
      <FilterBar domains={domains} sectors={sectors} value={value} onChange={setFilter} lang={lang} />

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg text-text-secondary">
              {en ? 'No project for this filter.' : 'Aucune réalisation pour ce filtre.'}
            </p>
            <button
              type="button"
              className="mt-4 rounded-full border border-border px-4 py-2 text-sm text-text hover:bg-[var(--surface-default)]"
              onClick={() => setFilter({ domain: 'all', sector: null })}
            >
              {en ? 'Reset filters' : 'Réinitialiser les filtres'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <SectionReveal key={r.slug} delay={Math.min(i, 7) * 0.05}>
                <ProjectCard realisation={r} lang={lang} />
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
