import type { Realisation } from './types'

/**
 * Liens vers les sites livres (2026-10-01, demande de David) : une etude de cas
 * renvoie au site en ligne, dans un nouvel onglet, la ou le lecteur a envie de
 * le voir en vrai (hero, fiche projet, page entiere, chaque section phare).
 *
 * Jamais pour une etude anonyme, jamais vers un espace prive (back-office,
 * application, connexion) meme quand sa capture illustre l'etude.
 */

/** Chemins qui ne sont jamais publics : back-office, application, espace client, connexion. */
const PRIVATE_PATH = /^\/(admin|pro|app|dashboard|login|connexion|compte|account)(\/|$)/i

/** Le domaine nu d'une URL, pour l'afficher : « goldencash.ch ». */
export function siteHost(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}

/** Le site livre d'une etude, ou `null` (pas de site public, ou client anonyme). */
export function studyLiveUrl(r: Pick<Realisation, 'liveUrl' | 'client'>): string | null {
  return r.liveUrl && !r.client.anonymized ? r.liveUrl : null
}

/** L'URL publique d'une page d'un site livre, ou `null` pour un espace prive. */
export function publicPageUrl(host: string | undefined, path: string | undefined): string | null {
  if (!host) return null
  const p = path && path.startsWith('/') ? path : '/'
  if (PRIVATE_PATH.test(p)) return null
  return `https://${siteHost(host)}${p}`
}
