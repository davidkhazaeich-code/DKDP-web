import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'
import { ARTICLES } from '@/lib/blog'
import { REALISATIONS } from '@/lib/realisations'
import { FR_TO_EN } from '@/i18n/slugs'

const BASE_URL = 'https://dkdp.ch'

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
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    }
  })

  // EN routes : on n'inclut que les pages avec un equivalent traduit.
  const enRoutes: MetadataRoute.Sitemap = Object.entries(FR_TO_EN).map(([frPath, enPath]) => {
    const matchingFrRoute = ROUTES.find((r) => r.url === frPath)
    return {
      url: enPath === '/' ? `${BASE_URL}/en` : `${BASE_URL}/en${enPath}`,
      lastModified: new Date(),
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
    lastModified: new Date(a.dateISO),
  }))

  const realisationRoutes: MetadataRoute.Sitemap = REALISATIONS
    .filter((r) => r.meta.status === 'live')
    .map((r) => ({
      url: `${BASE_URL}/realisations/${r.slug}`,
      lastModified: new Date(r.meta.dateISO),
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
  const enRealisationRoutes: MetadataRoute.Sitemap = REALISATIONS
    .filter((r) => r.meta.status === 'live')
    .map((r) => ({
      url: `${BASE_URL}/en/portfolio/${r.slug}`,
      lastModified: new Date(r.meta.dateISO),
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
