import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'
import { ARTICLES } from '@/lib/blog'
import { REALISATIONS } from '@/lib/realisations'

const BASE_URL = 'https://dkdp.ch'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
  }))

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
    }))

  return [...staticRoutes, ...blogRoutes, ...realisationRoutes]
}
