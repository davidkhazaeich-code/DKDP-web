import type { Realisation, RealisationDomain, RealisationSector } from './types'
import goldencash from './goldencash-refonte'
import sosRelevage from './sos-relevage'
import automatisationBexio from './automatisation-depenses-bexio-n8n'

const ALL_REALISATIONS: Realisation[] = [goldencash, sosRelevage, automatisationBexio]

export const REALISATIONS: Realisation[] = ALL_REALISATIONS.sort(
  (a, b) => b.meta.dateISO.localeCompare(a.meta.dateISO)
)

export const FEATURED_SLUGS: string[] = []

export function getRealisation(slug: string): Realisation | null {
  return REALISATIONS.find(r => r.slug === slug) ?? null
}

/**
 * Retourne toutes les realisations qui couvrent ce domaine, principal ou non.
 *
 * Inclut les entrees `archived` et `private`. Les composants publics (page hub `/realisations`,
 * blocs preuve sur les pages services) doivent filtrer sur `meta.status === 'live'`
 * apres l'appel, ou passer par `liveForDomain`.
 */
export function getByDomain(domain: RealisationDomain): Realisation[] {
  return REALISATIONS.filter(r => r.domains.includes(domain))
}

/** Realisations en ligne d'un secteur. */
export function getBySector(sector: RealisationSector): Realisation[] {
  return REALISATIONS.filter(r => r.sector === sector && r.meta.status === 'live')
}

/**
 * Realisations en ligne pour le bloc preuve d'une page service : celles dont
 * le domaine principal correspond passent devant, puis celles qui couvrent le
 * domaine en second. `withImage` ecarte les etudes sans capture de site, pour
 * les blocs qui affichent une capture de navigateur.
 */
export function liveForDomain(
  domains: RealisationDomain | RealisationDomain[],
  opts: { limit?: number; withImage?: boolean; slugs?: (slug: string) => boolean } = {},
): Realisation[] {
  const wanted = Array.isArray(domains) ? domains : [domains]
  const { limit = 3, withImage = false, slugs } = opts
  return REALISATIONS
    .filter(r => r.meta.status === 'live')
    .filter(r => r.domains.some(d => wanted.includes(d)))
    .filter(r => !withImage || Boolean(r.hero))
    .filter(r => !slugs || slugs(r.slug))
    .map((r, i) => ({ r, i, primary: wanted.includes(r.domains[0]) ? 0 : 1 }))
    .sort((a, b) => a.primary - b.primary || a.i - b.i)
    .slice(0, limit)
    .map(({ r }) => r)
}

/**
 * Retourne toutes les realisations qui contiennent ce tag (recherche exacte, sensible a la casse).
 *
 * Inclut les entrees `archived` et `private`. Voir `getByDomain` pour le rappel sur le filtrage public.
 */
export function getByTag(tag: string): Realisation[] {
  return REALISATIONS.filter(r => r.tags.includes(tag))
}

/**
 * Retourne les realisations liees a `slug`, scorees par domaine principal commun (2 pts),
 * autre domaine commun (1 pt par domaine), meme secteur (2 pts) et tags communs (1 pt par tag).
 * Exclut la realisation elle-meme et les entrees `archived` ou `private`.
 *
 * Peut retourner un tableau vide si aucune autre entree ne partage de score avec la realisation cible.
 *
 * @param slug Slug de la realisation source
 * @param limit Nombre max de resultats, defaut 3
 * @returns Tableau ordonne par score desc, peut etre vide
 */
export function getRelated(slug: string, limit = 3): Realisation[] {
  const current = getRealisation(slug)
  if (!current) return []
  return REALISATIONS
    .filter(r => r.slug !== slug && r.meta.status === 'live')
    .map(r => {
      const samePrimary = r.domains[0] === current.domains[0] ? 2 : 0
      const sharedDomains = r.domains.filter(d => current.domains.includes(d)).length
      const sameSector = r.sector === current.sector ? 2 : 0
      const overlap = r.tags.filter(t => current.tags.includes(t)).length
      return { r, score: samePrimary + sharedDomains + sameSector + overlap }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ r }) => r)
}

export type { Realisation, RealisationDomain, RealisationSector } from './types'
