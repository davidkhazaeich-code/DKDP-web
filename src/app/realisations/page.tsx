import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RealisationsGrid } from '@/components/realisations/RealisationsGrid'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildRealisationsCollection } from '@/lib/schema'
import { REALISATIONS } from '@/lib/realisations'

export const metadata: Metadata = {
  title: 'Realisations DKDP : nos sites web et projets IA livres | Geneve',
  description:
    "Etudes de cas client DKDP : sites web, refontes, chatbots IA, automatisations. PME suisses, resultats mesures, captures et retours d'experience.",
  alternates: { canonical: 'https://dkdp.ch/realisations' },
  openGraph: {
    title: 'Realisations DKDP',
    description: 'Sites web et projets IA livres pour PME suisses.',
    url: 'https://dkdp.ch/realisations',
    images: [{ url: '/og-realisations.png', width: 1200, height: 630, alt: 'Realisations DKDP' }],
  },
}

export default function RealisationsHubPage() {
  const liveItems = REALISATIONS.filter(r => r.meta.status === 'live')
  const sectorsCount = new Set(liveItems.map(r => r.client.sector)).size

  return (
    <>
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch/' },
        { name: 'Realisations', url: 'https://dkdp.ch/realisations' },
      ])} />
      <SchemaOrg schema={buildRealisationsCollection({ items: liveItems })} />

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <GradTag>Realisations</GradTag>
          <h1 className="mt-6 text-4xl tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
            <GradText as="span">Etudes de cas client</GradText>
          </h1>
          <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">
            Sites livres et systemes IA deployes pour des PME suisses. Chaque
            realisation documente le contexte initial, l&apos;approche retenue et les
            resultats mesures.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-text-muted">
            <span><b className="text-violet-300">{liveItems.length}</b> projets</span>
            <span><b className="text-violet-300">{sectorsCount}</b> secteurs</span>
            <span><b className="text-violet-300">5</b> annees</span>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-12 text-center text-text-muted">Chargement...</div>}>
        <RealisationsGrid items={liveItems} />
      </Suspense>

      <CTAFinal />
    </>
  )
}
