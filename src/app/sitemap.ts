import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'
import { ARTICLES } from '@/lib/blog-data'

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

  return [...staticRoutes, ...blogRoutes]
}
