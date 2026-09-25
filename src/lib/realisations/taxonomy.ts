import type { RealisationDomain, RealisationSector } from './types'
import type { Locale } from '@/i18n/config'

/**
 * Domaines et secteurs des realisations, avec leurs libelles FR et EN.
 *
 * Chaque domaine pointe vers la page service qui vend la prestation : c'est le
 * lien « money page » pose sur chaque etude de cas, et le filtre utilise par
 * les blocs preuve des pages service. `null` = pas encore de page dediee.
 */
export const DOMAINS: Record<
  RealisationDomain,
  { fr: string; en: string; service: { fr: string; en: string } | null }
> = {
  'site-web': {
    fr: 'Site web',
    en: 'Website',
    service: { fr: '/agence-digitale/creation-site-web', en: '/en/digital-agency/web-design' },
  },
  application: {
    fr: 'Application métier',
    en: 'Business application',
    service: { fr: '/agence-digitale/developpement-application', en: '/en/digital-agency/app-development' },
  },
  'e-commerce': { fr: 'E-commerce', en: 'E-commerce', service: null },
  'seo-geo': {
    fr: 'SEO et GEO',
    en: 'SEO and GEO',
    service: { fr: '/agence-digitale/seo', en: '/en/digital-agency/seo' },
  },
  publicite: {
    fr: 'Publicité en ligne',
    en: 'Online advertising',
    service: { fr: '/agence-digitale/publicite-sea', en: '/en/digital-agency/google-ads' },
  },
  'chatbot-ia': {
    fr: 'Chatbot IA',
    en: 'AI chatbot',
    service: { fr: '/intelligence-artificielle/chatbot-ia', en: '/en/artificial-intelligence/ai-chatbot' },
  },
  automatisation: {
    fr: 'Automatisation IA',
    en: 'AI automation',
    service: { fr: '/intelligence-artificielle/automatisation', en: '/en/artificial-intelligence/automation' },
  },
  'formation-ia': {
    fr: 'Formation IA',
    en: 'AI training',
    service: { fr: '/formation-entreprise/ia', en: '/en/corporate-training/ai' },
  },
  'identite-visuelle': { fr: 'Identité visuelle', en: 'Visual identity', service: null },
  video: {
    fr: 'Vidéo',
    en: 'Video',
    service: { fr: '/agence-digitale/creation-video', en: '/en/digital-agency/video-production' },
  },
}

export const SECTORS: Record<RealisationSector, { fr: string; en: string }> = {
  batiment: { fr: 'Bâtiment', en: 'Building services' },
  'metaux-precieux': { fr: 'Métaux précieux', en: 'Precious metals' },
  'agence-digitale': { fr: 'Agence digitale (projet interne)', en: 'Digital agency (in-house project)' },
  immobilier: { fr: 'Immobilier', en: 'Real estate' },
  finance: { fr: 'Finance et gestion de fortune', en: 'Finance and wealth management' },
  sante: { fr: 'Santé', en: 'Healthcare' },
  sport: { fr: 'Sport', en: 'Sport' },
  industrie: { fr: 'Industrie', en: 'Industry' },
  'hotellerie-restauration': { fr: 'Hôtellerie et restauration', en: 'Hospitality' },
  evenementiel: { fr: 'Événementiel', en: 'Events' },
  architecture: { fr: 'Architecture', en: 'Architecture' },
  'secteur-public': { fr: 'Secteur public', en: 'Public sector' },
  informatique: { fr: 'Informatique', en: 'IT services' },
  commerce: { fr: 'Commerce', en: 'Retail' },
}

/** Domaines vendus par le pilier Agence digitale (hub /agence-digitale). */
export const AGENCY_DOMAINS: RealisationDomain[] = [
  'site-web',
  'application',
  'e-commerce',
  'seo-geo',
  'publicite',
  'identite-visuelle',
  'video',
]

export function domainLabel(domain: RealisationDomain, lang: Locale = 'fr'): string {
  return DOMAINS[domain][lang]
}

export function sectorLabel(sector: RealisationSector, lang: Locale = 'fr'): string {
  return SECTORS[sector][lang]
}

/** Page service du domaine, ou null si la prestation n'a pas encore de page. */
export function domainServicePath(domain: RealisationDomain, lang: Locale = 'fr'): string | null {
  return DOMAINS[domain].service?.[lang] ?? null
}
