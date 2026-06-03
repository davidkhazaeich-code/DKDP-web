import type { Locale } from './config'
import fr from '@/dictionaries/fr.json'
import en from '@/dictionaries/en.json'

/**
 * Dictionnaires partages serveur + client.
 *
 * Le JSON reste petit (< 10kb), Next.js le bundle dans un chunk dedie.
 * Permet aux Client Components (Header) de lire dict via usePathname
 * sans avoir a router une prop depuis le Server Component parent.
 */
const dictionaries = { fr, en } as const

export type Dictionary = typeof fr

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary
}
