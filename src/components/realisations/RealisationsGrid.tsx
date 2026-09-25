'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { clsx } from 'clsx'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { FilterBar, type FilterValue } from './FilterBar'
import { bentoLayout } from '@/lib/realisations/bento'
import { DOMAINS, SECTORS } from '@/lib/realisations/taxonomy'
import type { Realisation, RealisationDomain, RealisationSector } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

type Props = { items: Realisation[]; lang?: Locale }

const DOMAIN_ORDER = Object.keys(DOMAINS) as RealisationDomain[]
const SECTOR_ORDER = Object.keys(SECTORS) as RealisationSector[]

/** Classes statiques (Tailwind ne lit pas les classes calculees). */
const LG_SPAN = { wide: 'lg:col-span-4', narrow: 'lg:col-span-2', half: 'lg:col-span-3', full: 'lg:col-span-6' } as const

/**
 * Grille du hub (v3) : un bento de six colonnes dont chaque rangee est pleine,
 * quel que soit le nombre d'etudes filtrees (`bentoLayout`). Les grandes
 * cellules posent l'image a cote du texte. Au changement de filtre, les cartes
 * qui restent glissent a leur nouvelle place et les autres s'effacent (Motion,
 * `layout`) ; tout change d'un coup si le visiteur reduit les animations.
 */
export function RealisationsGrid({ items, lang = 'fr' }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const reduce = useReducedMotion()
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
  const counts = useMemo(() => {
    const out: Partial<Record<RealisationDomain | 'all', number>> = { all: items.length }
    for (const d of domains) out[d] = items.filter((r) => r.domains.includes(d)).length
    return out
  }, [items, domains])

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
  const layout = useMemo(() => bentoLayout(filtered.length), [filtered.length])

  function setFilter(next: FilterValue) {
    const sp = new URLSearchParams()
    if (next.domain !== 'all') sp.set('domaine', next.domain)
    if (next.sector) sp.set('secteur', next.sector)
    const qs = sp.toString()
    router.replace(`${hub}${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  // Le conteneur borne la barre collante a la grille : elle ne suit pas le lecteur plus bas.
  return (
    <div className="relative">
      <FilterBar
        domains={domains}
        sectors={sectors}
        value={value}
        onChange={setFilter}
        counts={counts}
        lang={lang}
      />

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
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
          <LayoutGroup>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((r, i) => {
                  const cell = layout[i]
                  const big = cell.lg === 'wide' || cell.lg === 'full'
                  return (
                    <motion.li
                      key={r.slug}
                      layout={reduce ? false : 'position'}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.97 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={clsx(LG_SPAN[cell.lg], cell.mdFull ? 'md:col-span-2' : 'md:col-span-1')}
                    >
                      <ProjectCard realisation={r} lang={lang} size={big ? 'wide' : 'default'} />
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
          </LayoutGroup>
        )}
      </div>
    </div>
  )
}
