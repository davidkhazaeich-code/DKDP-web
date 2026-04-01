import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = 'https://dkdp.ch'
  const now = new Date()

  const pages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/agence-digitale', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/intelligence-artificielle', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/formation-entreprise', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/tarifs', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/realisations', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/a-propos', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
  ]

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
