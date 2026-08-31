import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'
import { ARTICLES } from '@/lib/blog'
import { REALISATIONS } from '@/lib/realisations'
import { FR_TO_EN } from '@/i18n/slugs'

const BASE_URL = 'https://dkdp.ch'

/**
 * Date de dernière révision éditoriale du socle de pages, au format 'YYYY-MM-DD'.
 *
 * Elle correspond à la refonte des pages services et à la mise en miroir EN du
 * 3 juin 2026. Une page qui reçoit ensuite une vraie passe de contenu porte sa
 * propre date via le champ `lastModified` de `ROUTES` (lib/routes.ts).
 *
 * ⚠️ Ne PAS remplacer par `new Date()`. Le sitemap posait avant la date du build
 * sur les 51 routes plus leurs miroirs EN : chaque déploiement annonçait à Google
 * que l'intégralité du site venait d'être réécrite, y compris les mentions légales.
 * `lastmod` est le seul champ du sitemap que Google déclare encore lire, et un
 * `lastmod` qui ment à chaque passage finit par être ignoré.
 *
 * À bumper lors d'une refonte transversale, pas à chaque déploiement.
 */
const CONTENT_LAST_MODIFIED = '2026-06-03'

/** Date de la page, ou celle du socle si la route n'en déclare pas. */
function routeDate(url: string): string {
  return ROUTES.find((r) => r.url === url)?.lastModified ?? CONTENT_LAST_MODIFIED
}

/** Article le plus récent : c'est lui qui date la page de listing /blog. */
const LATEST_ARTICLE_DATE = ARTICLES.reduce<string>(
  (latest, a) => (a.dateISO > latest ? a.dateISO : latest),
  CONTENT_LAST_MODIFIED,
)

const LIVE_REALISATIONS = REALISATIONS.filter((r) => r.meta.status === 'live')

/** Réalisation la plus récente : elle date la page de listing /realisations. */
const LATEST_REALISATION_DATE = LIVE_REALISATIONS.reduce<string>(
  (latest, r) => (r.meta.dateISO > latest ? r.meta.dateISO : latest),
  CONTENT_LAST_MODIFIED,
)

/** Les pages de listing suivent leur contenu, sans intervention manuelle. */
const LISTING_DATES: Record<string, string> = {
  '/blog': LATEST_ARTICLE_DATE,
  '/realisations': LATEST_REALISATION_DATE,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => {
    const enSlug = FR_TO_EN[route.url]
    const alternates =
      enSlug !== undefined
        ? {
            languages: {
              'fr-CH': `${BASE_URL}${route.url}`,
              en: enSlug === '/' ? `${BASE_URL}/en` : `${BASE_URL}/en${enSlug}`,
            },
          }
        : undefined

    return {
      url: `${BASE_URL}${route.url}`,
      lastModified: LISTING_DATES[route.url] ?? route.lastModified ?? CONTENT_LAST_MODIFIED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    }
  })

  // EN routes : on n'inclut que les pages avec un equivalent traduit.
  // La version EN est un miroir 1:1 : elle hérite de la date de la page FR
  // plutôt que d'en inventer une.
  const enRoutes: MetadataRoute.Sitemap = Object.entries(FR_TO_EN).map(([frPath, enPath]) => {
    const matchingFrRoute = ROUTES.find((r) => r.url === frPath)
    return {
      url: enPath === '/' ? `${BASE_URL}/en` : `${BASE_URL}/en${enPath}`,
      lastModified: LISTING_DATES[frPath] ?? routeDate(frPath),
      changeFrequency: matchingFrRoute?.changeFrequency,
      priority: matchingFrRoute ? matchingFrRoute.priority * 0.95 : 0.5,
      alternates: {
        languages: {
          'fr-CH': `${BASE_URL}${frPath}`,
          en: enPath === '/' ? `${BASE_URL}/en` : `${BASE_URL}/en${enPath}`,
        },
      },
    }
  })

  const blogRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.dateISO,
  }))

  const realisationRoutes: MetadataRoute.Sitemap = LIVE_REALISATIONS.map((r) => ({
    url: `${BASE_URL}/realisations/${r.slug}`,
    lastModified: r.meta.dateISO,
    changeFrequency: 'monthly' as const,
    priority: 0.70,
    alternates: {
      languages: {
        'fr-CH': `${BASE_URL}/realisations/${r.slug}`,
        en: `${BASE_URL}/en/portfolio/${r.slug}`,
      },
    },
  }))

  // EN realisation detail pages (content shared, EN chrome + localized text).
  const enRealisationRoutes: MetadataRoute.Sitemap = LIVE_REALISATIONS.map((r) => ({
    url: `${BASE_URL}/en/portfolio/${r.slug}`,
    lastModified: r.meta.dateISO,
    changeFrequency: 'monthly' as const,
    priority: 0.66,
    alternates: {
      languages: {
        'fr-CH': `${BASE_URL}/realisations/${r.slug}`,
        en: `${BASE_URL}/en/portfolio/${r.slug}`,
      },
    },
  }))

  return [...staticRoutes, ...enRoutes, ...blogRoutes, ...realisationRoutes, ...enRealisationRoutes]
}
