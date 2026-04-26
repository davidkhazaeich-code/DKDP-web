import type { Realisation, RealisationCategory } from './types'

export const REALISATIONS: Realisation[] = []

export const FEATURED_SLUGS: string[] = []

export function getRealisation(slug: string): Realisation | null {
  return REALISATIONS.find(r => r.slug === slug) ?? null
}

export function getByCategory(category: RealisationCategory): Realisation[] {
  return REALISATIONS.filter(r => r.category === category)
}

export function getByTag(tag: string): Realisation[] {
  return REALISATIONS.filter(r => r.tags.includes(tag))
}

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
