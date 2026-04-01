import type { Metadata } from 'next'

interface PageMetadataInput {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonical,
      type: 'website',
      locale: 'fr_CH',
      siteName: 'DKDP',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
    },
  }
}
