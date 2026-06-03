import type { Metadata } from 'next'

/**
 * EN locale layout: forces EN metadata defaults so every page under /en/
 * inherits the correct title template, description, Open Graph locale and
 * hreflang block, even if a page omits its own override. Without this, the
 * FR root layout's title.default and openGraph.locale ('fr_CH') would leak
 * onto EN pages with partial metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://dkdp.ch'),
  title: {
    default: 'DKDP · Digital Agency Geneva · Web, AI and Training',
    template: '%s',
  },
  description:
    'Geneva-based digital agency specialised in web design, SEO, artificial intelligence and corporate training. 700+ clients across French-speaking Switzerland. Free quote in 24 hours.',
  alternates: {
    canonical: 'https://dkdp.ch/en',
    languages: {
      'fr-CH': 'https://dkdp.ch/',
      en: 'https://dkdp.ch/en',
      'x-default': 'https://dkdp.ch/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    url: 'https://dkdp.ch/en',
    siteName: 'DKDP',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP, digital agency in Geneva' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
