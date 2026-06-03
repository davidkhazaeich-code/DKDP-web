import type { Metadata } from 'next'

/**
 * Helper to build a consistent Metadata object for every EN service page.
 * Generates canonical + hreflang alternates and a proper OpenGraph block.
 */
export function buildServiceMetadata({
  title,
  description,
  enPath,
  frPath,
  imageAlt = 'DKDP, digital agency in Geneva',
}: {
  title: string
  description: string
  /** EN path (e.g. "/en/digital-agency/web-design"). */
  enPath: string
  /** FR path (e.g. "/agence-digitale/creation-site-web"). */
  frPath: string
  imageAlt?: string
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `https://dkdp.ch${enPath}`,
      languages: {
        'fr-CH': `https://dkdp.ch${frPath}`,
        en: `https://dkdp.ch${enPath}`,
        'x-default': `https://dkdp.ch${frPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://dkdp.ch${enPath}`,
      locale: 'en_US',
      alternateLocale: ['fr_CH'],
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: { images: ['/og-image.png'] },
  }
}
