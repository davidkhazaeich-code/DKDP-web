export type CategoryKey = 'ia' | 'seo' | 'formation' | 'outils'

export interface BlogImage {
  src: string
  alt: string
  caption?: string
}

export interface Article {
  slug: string
  category: CategoryKey
  title: string
  excerpt: string
  date: string
  dateISO: string
  readTime: string
  author: string
  heroImage: BlogImage
  images: BlogImage[]
  content: string
  tags: string[]
  seoTitle: string
  seoDescription: string
}

export const BLOG_CATEGORIES: Record<CategoryKey, { label: string; color: string; bg: string; border: string }> = {
  ia: {
    label: 'Intelligence Artificielle',
    color: '#D4D4D8',
    bg: 'rgba(212,212,216,0.08)',
    border: 'rgba(212,212,216,0.16)',
  },
  seo: {
    label: 'SEO & Visibilité',
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.20)',
  },
  formation: {
    label: 'Formation',
    color: '#FF8C00',
    bg: 'rgba(255,107,0,0.08)',
    border: 'rgba(255,107,0,0.18)',
  },
  outils: {
    label: 'Outils & Productivité',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.08)',
    border: 'rgba(74,222,128,0.18)',
  },
}
