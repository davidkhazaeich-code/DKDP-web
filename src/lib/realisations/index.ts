import type { Realisation, RealisationCategory } from './types'

const ALL_REALISATIONS: Realisation[] = []

export const REALISATIONS: Realisation[] = ALL_REALISATIONS.sort(
  (a, b) => b.meta.dateISO.localeCompare(a.meta.dateISO)
)

export const FEATURED_SLUGS: string[] = []

export function getRealisation(slug: string): Realisation | null {
  return REALISATIONS.find(r => r.slug === slug) ?? null
}

/**
 * Retourne toutes les realisations dont la categorie correspond.
 *
 * Inclut les entrees `archived` et `private`. Les composants publics (page hub `/realisations`,
 * blocs cross-link sur les pages services) doivent filtrer sur `meta.status === 'live'`
 * apres l'appel.
 */
export function getByCategory(category: RealisationCategory): Realisation[] {
  return REALISATIONS.filter(r => r.category === category)
}

/**
 * Retourne toutes les realisations qui contiennent ce tag (recherche exacte, sensible a la casse).
 *
 * Inclut les entrees `archived` et `private`. Voir `getByCategory` pour le rappel sur le filtrage public.
 */
export function getByTag(tag: string): Realisation[] {
  return REALISATIONS.filter(r => r.tags.includes(tag))
}

/**
 * Retourne les realisations liees a `slug`, scorees par overlap de categorie (2 pts) et tags (1 pt par tag commun).
 * Exclut la realisation elle-meme et les entrees `archived` ou `private`.
 *
 * Peut retourner un tableau vide si aucune autre entree ne partage de score avec la realisation cible.
 * Les composants consommateurs (Bundle D : RelatedRealisations) doivent gerer ce cas en affichant rien
 * ou un fallback de leur choix.
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
      const sameCat = r.category === current.category ? 2 : 0
      const overlap = r.tags.filter(t => current.tags.includes(t)).length
      return { r, score: sameCat + overlap }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ r }) => r)
}

export type { Realisation, RealisationCategory } from './types'
