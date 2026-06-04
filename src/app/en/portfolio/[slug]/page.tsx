import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BrowserFrame } from '@/components/realisations/BrowserFrame'
import { RealisationHeader } from '@/components/realisations/RealisationHeader'
import { ProblemBlock } from '@/components/realisations/ProblemBlock'
import { ApproachBlock } from '@/components/realisations/ApproachBlock'
import { StackChips } from '@/components/realisations/StackChips'
import { ResultsGrid } from '@/components/realisations/ResultsGrid'
import { GalleryGrid } from '@/components/realisations/GalleryGrid'
import { TestimonialQuote } from '@/components/realisations/TestimonialQuote'
import { RelatedRealisations } from '@/components/realisations/RelatedRealisations'
import { CinematicCTA } from '@/components/realisations/CinematicCTA'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildRealisationPage } from '@/lib/schema'
import { REALISATIONS, getRealisation, getRelated } from '@/lib/realisations'
import { localizeRealisation } from '@/lib/realisations/en'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return REALISATIONS
    .filter(r => r.meta.status !== 'private')
    .map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const base = getRealisation(slug)
  if (!base) return { title: 'Case study not found' }
  const r = localizeRealisation(base, 'en')
  return {
    title: `${r.client.name}: ${r.meta.title} | DKDP Portfolio`,
    description: r.meta.excerpt,
    alternates: {
      canonical: `https://dkdp.ch/en/portfolio/${r.slug}`,
      languages: {
        'fr-CH': `https://dkdp.ch/realisations/${r.slug}`,
        en: `https://dkdp.ch/en/portfolio/${r.slug}`,
        'x-default': `https://dkdp.ch/realisations/${r.slug}`,
      },
    },
    openGraph: {
      title: `${r.client.name}: ${r.meta.title}`,
      description: r.meta.excerpt,
      url: `https://dkdp.ch/en/portfolio/${r.slug}`,
      locale: 'en_US',
      alternateLocale: ['fr_CH'],
      images: [{ url: `/images/realisations/${r.slug}/og.png`, width: 1200, height: 630, alt: r.meta.title }],
    },
    robots: r.meta.status === 'private' ? { index: false, follow: true } : undefined,
  }
}

export default async function PortfolioDetailPageEN({ params }: { params: Params }) {
  const { slug } = await params
  const base = getRealisation(slug)
  if (!base) notFound()
  if (base.meta.status === 'archived') redirect('/en/portfolio')

  const r = localizeRealisation(base, 'en')
  const related = getRelated(slug, 3).map(x => localizeRealisation(x, 'en'))

  return (
    <>
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: 'https://dkdp.ch/en' },
          { name: 'Portfolio', url: 'https://dkdp.ch/en/portfolio' },
          { name: r.client.name, url: `https://dkdp.ch/en/portfolio/${r.slug}` },
        ])}
      />
      <SchemaOrg schema={buildRealisationPage({ realisation: r })} />

      <RealisationHeader r={r} lang="en" />

      <div className="mx-auto mt-12 max-w-[1200px] px-6">
        <BrowserFrame
          src={r.hero.desktopFull}
          alt={`${r.client.name}: ${r.meta.title}`}
          browserUrl={r.hero.browserUrl}
          variant="hero"
          trigger="visible"
        />
      </div>

      <ProblemBlock problem={r.problem} lang="en" />
      <ApproachBlock approach={r.approach} lang="en" />
      {r.stack && <StackChips chips={r.stack} />}
      {r.results && <ResultsGrid results={r.results} lang="en" />}
      {r.gallery && <GalleryGrid items={r.gallery} lang="en" />}
      {r.testimonial && <TestimonialQuote t={r.testimonial} />}
      <RelatedRealisations items={related} lang="en" />
      <CinematicCTA lang="en" />
    </>
  )
}
