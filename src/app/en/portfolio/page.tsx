import type { Metadata } from 'next'
import { RealisationsHub } from '@/components/realisations/RealisationsHub'
import { REALISATIONS } from '@/lib/realisations'
import { hasEnglish, localizeRealisation } from '@/lib/realisations/en'

export const metadata: Metadata = {
  title: 'Case studies: websites, AI and automation | DKDP',
  description:
    'DKDP case studies from Geneva: websites, custom CRM, AI automation and local SEO. Every figure shows its source and its date.',
  alternates: {
    canonical: 'https://dkdp.ch/en/portfolio',
    languages: {
      'fr-CH': 'https://dkdp.ch/realisations',
      en: 'https://dkdp.ch/en/portfolio',
      'x-default': 'https://dkdp.ch/realisations',
    },
  },
  openGraph: {
    title: 'DKDP portfolio',
    description: 'Websites, business applications and AI automation delivered in French-speaking Switzerland, with the proof.',
    url: 'https://dkdp.ch/en/portfolio',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/og-realisations.png', width: 1200, height: 630, alt: 'DKDP portfolio' }],
  },
}

/** English hub: only case studies that have an English translation. */
export default function PortfolioHubPageEN() {
  const items = REALISATIONS
    .filter(r => r.meta.status === 'live' && hasEnglish(r.slug))
    .map(r => localizeRealisation(r, 'en'))
  return <RealisationsHub items={items} lang="en" />
}
