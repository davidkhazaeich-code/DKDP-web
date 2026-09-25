import type { Locale } from '@/i18n/config'

/**
 * Auteurs des etudes de cas : signature visible et `author` du JSON-LD.
 * Memes photos et memes profils LinkedIn que la page A propos.
 */
export const AUTHORS = {
  david: {
    name: 'David Khazaei',
    role: { fr: 'Fondateur de DKDP', en: 'Founder of DKDP' },
    photo: '/images/team/david-khazaei.png',
    linkedin: 'https://www.linkedin.com/in/davidkhazaei/',
  },
  romane: {
    // Prénom seul, comme sur la page À propos.
    name: 'Romane',
    role: { fr: 'Formatrice IA chez DKDP', en: 'AI trainer at DKDP' },
    photo: '/images/team/romane.png',
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
  },
} as const

export type AuthorKey = keyof typeof AUTHORS

export function aboutPath(lang: Locale): string {
  return lang === 'en' ? '/en/about' : '/a-propos'
}
