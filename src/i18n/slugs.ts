/**
 * Slug mapping FR <-> EN.
 *
 * Cle = path FR canonique (sans prefix locale).
 * Valeur = path EN (sera prefixe par /en au runtime).
 *
 * Regles :
 * - Toujours commencer par /.
 * - Pas de slash final.
 * - Garder la meme arborescence : ce qui est sous /agence-digitale en FR
 *   reste sous /digital-agency en EN.
 *
 * Les pages exclues de la traduction (blog, glossaire, villes, realisations)
 * ne sont PAS listees ici. Le switcher de langue cache simplement le bouton
 * EN quand la page courante n'a pas d'equivalent.
 */

import type { Locale } from './config'

/** Pages traduites : mapping FR -> EN. */
export const FR_TO_EN: Record<string, string> = {
  // Hub
  '/': '/',
  '/agence-digitale': '/digital-agency',
  '/intelligence-artificielle': '/artificial-intelligence',
  '/formation-entreprise': '/corporate-training',

  // Agence digitale - services
  '/agence-digitale/creation-site-web': '/digital-agency/web-design',
  '/agence-digitale/refonte-site-web': '/digital-agency/website-redesign',
  '/agence-digitale/developpement-application': '/digital-agency/app-development',
  '/agence-digitale/seo': '/digital-agency/seo',
  '/agence-digitale/publicite-sea': '/digital-agency/google-ads',
  '/agence-digitale/reseaux-sociaux': '/digital-agency/social-media',
  '/agence-digitale/creation-video': '/digital-agency/video-production',
  '/agence-digitale/consulting-marketing': '/digital-agency/marketing-consulting',
  '/agence-digitale/rgpd-cookies': '/digital-agency/gdpr-cookies',

  // Agence digitale - lead gen
  '/agence-digitale/seo/audit-seo': '/digital-agency/seo/seo-audit',
  '/agence-digitale/creation-site-web/audit-site': '/digital-agency/web-design/site-audit',
  '/agence-digitale/creation-site-web/estimation': '/digital-agency/web-design/quote',

  // Intelligence artificielle
  '/intelligence-artificielle/agents-ia': '/artificial-intelligence/ai-agents',
  '/intelligence-artificielle/automatisation': '/artificial-intelligence/automation',
  '/intelligence-artificielle/audit-conseil': '/artificial-intelligence/audit-consulting',
  '/intelligence-artificielle/mise-en-place': '/artificial-intelligence/implementation',
  '/intelligence-artificielle/chatbot-ia': '/artificial-intelligence/ai-chatbot',

  // Formation entreprise
  '/formation-entreprise/claude-ai': '/corporate-training/claude-ai',
  '/formation-entreprise/ia': '/corporate-training/ai',
  '/formation-entreprise/bureautique': '/corporate-training/office-tools',
  '/formation-entreprise/canva': '/corporate-training/canva',
  '/formation-entreprise/web-design': '/corporate-training/web-design',
  '/formation-entreprise/cybersecurite': '/corporate-training/cybersecurity',
  '/formation-entreprise/reseaux-sociaux': '/corporate-training/social-media',
  '/formation-entreprise/informatique': '/corporate-training/it-skills',
  '/formation-entreprise/montage-video': '/corporate-training/video-editing',

  // Formation particuliers
  '/formation-particuliers': '/individual-training',

  // Agence & Contact
  '/contact': '/contact',
  '/tarifs': '/pricing',
  '/a-propos': '/about',

  // Utilitaires / Legales
  '/plan-du-site': '/sitemap',
  '/mentions-legales': '/legal-notice',
  '/politique-de-confidentialite': '/privacy-policy',
  '/conditions-generales-de-vente': '/terms-of-service',
}

/** Reverse mapping EN -> FR, derive automatiquement. */
export const EN_TO_FR: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN).map(([fr, en]) => [en, fr])
)

/** Liste des pages traduites en EN (paths FR canoniques). */
export const TRANSLATED_PAGES = Object.keys(FR_TO_EN)

/**
 * Convertit un path FR (sans prefix) vers un path complet dans la locale demandee.
 * - FR : retourne le path tel quel.
 * - EN : prefixe par /en et utilise le slug traduit si dispo, sinon laisse tel quel.
 */
export function localizedPath(frPath: string, locale: Locale): string {
  if (locale === 'fr') return frPath
  const translated = FR_TO_EN[frPath]
  if (translated === undefined) return `/en${frPath}`
  if (translated === '/') return '/en'
  return `/en${translated}`
}

/**
 * Retire le prefix /en d'un path et retourne le path FR equivalent.
 * Si le path EN n'a pas de mapping connu, retire juste le prefix.
 */
export function stripLocale(path: string): string {
  if (path === '/en') return '/'
  if (!path.startsWith('/en/')) return path
  const enPath = path.slice(3) // retire /en, garde le /
  const reverse = EN_TO_FR[enPath]
  return reverse ?? enPath
}

/** True si la page FR a une version EN traduite. */
export function hasTranslation(frPath: string): boolean {
  return frPath in FR_TO_EN
}
