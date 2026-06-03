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
  ogImage = '/og-image.png',
  noIndex = false,
}: {
  title: string
  description: string
  /** EN path (e.g. "/en/digital-agency/web-design"). */
  enPath: string
  /** FR path (e.g. "/agence-digitale/creation-site-web"). */
  frPath: string
  imageAlt?: string
  /** Custom Open Graph / Twitter image path. Defaults to /og-image.png. */
  ogImage?: string
  /** When true, emits robots: { index: false, follow: false }. Use for legal pages. */
  noIndex?: boolean
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: { images: [ogImage] },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: { index: false, follow: false },
          },
        }
      : {}),
  }
}
