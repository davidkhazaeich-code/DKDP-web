import { REALISATIONS, hubOrder } from './index'
import { hasEnglish, localizeRealisation } from './en'
import { studyVisual } from './visual'
import type { Realisation } from './types'
import type { Locale } from '@/i18n/config'

/**
 * Ce que le méga menu « À propos » montre des réalisations (2026-10-01) : le
 * nombre d'études, trois images de présentation (les études à la une) et la
 * dernière étude publiée. Calculé côté serveur dans le layout et passé au
 * Header (composant client) : le menu ne charge jamais toutes les études.
 */
export type NavRealisationsLocale = {
  count: number
  hubHref: string
  thumbs: { src: string; alt: string }[]
  latest: { href: string; client: string; title: string } | null
}

export type NavRealisations = Record<Locale, NavRealisationsLocale>

const THUMBS = 3

function forLocale(lang: Locale): NavRealisationsLocale {
  const en = lang === 'en'
  const base = en ? '/en/portfolio' : '/realisations'
  const live: Realisation[] = REALISATIONS.filter((r) => r.meta.status === 'live' && (!en || hasEnglish(r.slug))).map(
    (r) => localizeRealisation(r, lang),
  )
  const thumbs = hubOrder(live)
    .map((r) => studyVisual(r))
    .filter((v): v is NonNullable<typeof v> => v !== null)
    .slice(0, THUMBS)
    .map(({ src, alt }) => ({ src, alt }))
  const newest = [...live].sort((a, b) =>
    (b.meta.publishedISO ?? b.meta.dateISO).localeCompare(a.meta.publishedISO ?? a.meta.dateISO),
  )[0]
  return {
    count: live.length,
    hubHref: base,
    thumbs,
    latest: newest ? { href: `${base}/${newest.slug}`, client: newest.client.name, title: newest.meta.title } : null,
  }
}

export function navRealisations(): NavRealisations {
  return { fr: forLocale('fr'), en: forLocale('en') }
}
