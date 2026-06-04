import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RealisationsGrid } from '@/components/realisations/RealisationsGrid'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { LogoBanner } from '@/components/sections/LogoBanner'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildRealisationsCollection } from '@/lib/schema'
import { REALISATIONS } from '@/lib/realisations'
import { localizeRealisation } from '@/lib/realisations/en'

export const metadata: Metadata = {
  title: 'Portfolio DKDP: our websites and AI projects | Geneva',
  description:
    'DKDP client case studies: websites, redesigns, AI chatbots, automations. Swiss SMEs, measured results, screenshots and feedback.',
  alternates: {
    canonical: 'https://dkdp.ch/en/portfolio',
    languages: {
      'fr-CH': 'https://dkdp.ch/realisations',
      en: 'https://dkdp.ch/en/portfolio',
      'x-default': 'https://dkdp.ch/realisations',
    },
  },
  openGraph: {
    title: 'Portfolio DKDP',
    description: 'Websites and AI projects delivered for Swiss SMEs.',
    url: 'https://dkdp.ch/en/portfolio',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/og-realisations.png', width: 1200, height: 630, alt: 'DKDP portfolio' }],
  },
}

export default function PortfolioHubPageEN() {
  const liveItems = REALISATIONS.filter(r => r.meta.status === 'live').map(r => localizeRealisation(r, 'en'))
  const sectorsCount = new Set(liveItems.map(r => r.client.sector)).size

  return (
    <>
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Home', url: 'https://dkdp.ch/en' },
        { name: 'Portfolio', url: 'https://dkdp.ch/en/portfolio' },
      ])} />
      <SchemaOrg schema={buildRealisationsCollection({ items: liveItems })} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <GradTag>Portfolio</GradTag>
          <h1 className="mt-6 text-4xl tracking-[-0.02em] text-text md:text-5xl lg:text-6xl">
            <GradText as="span">Client case studies</GradText>
          </h1>
          <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">
            Websites delivered and AI systems deployed for Swiss SMEs. Each project documents the
            initial context, the chosen approach and the measured results.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-text-muted">
            <span><b style={{ color: 'var(--violet)' }}>{liveItems.length}</b> projects</span>
            <span><b style={{ color: 'var(--violet)' }}>{sectorsCount}</b> sectors</span>
            <span><b style={{ color: 'var(--violet)' }}>5</b> years</span>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 text-center text-text-muted">Loading...</div>}>
        <RealisationsGrid items={liveItems} lang="en" />
      </Suspense>

      <LogoBanner lang="en" />
      <CTAFinal lang="en" />
    </>
  )
}
