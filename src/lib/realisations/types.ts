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
  /** Sauts de paragraphe autorises (`\n\n`), le premier paragraphe est compose en accroche. */
  body: string
  /** Fiche courte en colonne gauche : metier, public, territoire, point de depart. */
  facts?: { label: string; value: string }[]
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

/** Une section phare : capture d'ecran, vue mobile optionnelle, texte, et le
 *  parcours en etapes quand la section est un tunnel. */
export interface RealisationHighlight {
  /** Le moment du parcours visiteur, ex. « Arriver », « Demander ». */
  eyebrow: string
  /** Angle du bloc : UX, UI, Contenu, SEO, GEO... */
  tag: string
  title: string
  body: string
  image: { src: string; alt: string; path?: string }
  phone?: { src: string; alt: string }
  steps?: string[]
  points?: string[]
}

/** Direction visuelle : logo, palette, typographie, principes. */
export interface RealisationDirection {
  intro?: string
  logo?: { src: string; alt: string }
  tagline?: string
  palette: { name: string; hex: string; role: string }[]
  type: { role: string; family: string; sample: string; mono?: boolean }[]
  principles: { title: string; body: string }[]
}

/** Direction SEO et GEO : apercu de resultat Google, pages par intention,
 *  donnees structurees, choix pour les moteurs generatifs. */
export interface RealisationSeo {
  intro?: string
  serp: { siteName: string; url: string; title: string; description: string; favicon?: string }
  intents: { label: string; path: string }[]
  schemas: string[]
  geo: { title: string; body: string }[]
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
  highlights?: RealisationHighlight[]
  direction?: RealisationDirection
  seo?: RealisationSeo
  liveUrl?: string
}
