/**
 * Source de verite des realisations DKDP.
 * Pattern aligne sur src/lib/blog/types.ts
 */

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)+$/

export type RealisationCategory = 'site-web' | 'projet-ia' | 'site-web-ia'
export type RealisationStatus = 'live' | 'archived' | 'private'
export type StackColor =
  | 'violet' | 'orange' | 'chrome' | 'green'
  | 'blue' | 'pink' | 'teal' | 'amber'

export interface RealisationClient {
  name: string
  logo?: string
  sector: string
  location?: string
  anonymized?: boolean
}

export interface RealisationMeta {
  title: string
  excerpt: string
  dateISO: string
  status: RealisationStatus
}

export interface RealisationHero {
  desktopFull: string
  mobileFull?: string
  browserUrl: string
}

export interface RealisationProblem {
  title: string
  body: string
  illustration?: { src: string; alt: string; caption?: string }
}

export interface RealisationApproach {
  title: string
  body: string
  bullets?: string[]
  diagramHtml?: string
}

export interface RealisationStackChip {
  label: string
  color: StackColor
}

export interface RealisationResult {
  metric: string
  value: string
  label: string
  trend?: number[]
}

export interface RealisationTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface RealisationGalleryItem {
  src: string
  alt: string
  caption?: string
}

export interface Realisation {
  slug: string
  client: RealisationClient
  meta: RealisationMeta
  category: RealisationCategory
  tags: string[]
  hero: RealisationHero
  problem: RealisationProblem
  approach: RealisationApproach
  stack?: RealisationStackChip[]
  results?: RealisationResult[]
  testimonial?: RealisationTestimonial
  gallery?: RealisationGalleryItem[]
  liveUrl?: string
}
