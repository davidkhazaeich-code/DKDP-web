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

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return REALISATIONS
    .filter(r => r.meta.status !== 'private')
    .map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) return { title: 'Realisation introuvable' }
  return {
    title: `${r.client.name} : ${r.meta.title} | Realisations DKDP`,
    description: r.meta.excerpt,
    alternates: { canonical: `https://dkdp.ch/realisations/${r.slug}` },
    openGraph: {
      title: `${r.client.name} : ${r.meta.title}`,
      description: r.meta.excerpt,
      url: `https://dkdp.ch/realisations/${r.slug}`,
      images: [
        {
          url: `/images/realisations/${r.slug}/og.png`,
          width: 1200,
          height: 630,
          alt: r.meta.title,
        },
      ],
    },
    robots:
      r.meta.status === 'private' ? { index: false, follow: true } : undefined,
  }
}

export default async function RealisationDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) notFound()
  if (r.meta.status === 'archived') redirect('/realisations')

  const related = getRelated(slug, 3)

  return (
    <>
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch/' },
          { name: 'Realisations', url: 'https://dkdp.ch/realisations' },
          { name: r.client.name, url: `https://dkdp.ch/realisations/${r.slug}` },
        ])}
      />
      <SchemaOrg schema={buildRealisationPage({ realisation: r })} />

      <RealisationHeader r={r} />

      <div className="mx-auto mt-12 max-w-[1200px] px-6">
        <BrowserFrame
          src={r.hero.desktopFull}
          alt={`${r.client.name} : ${r.meta.title}`}
          browserUrl={r.hero.browserUrl}
          variant="hero"
          trigger="visible"
        />
      </div>

      <ProblemBlock problem={r.problem} />
      <ApproachBlock approach={r.approach} />
      {r.stack && <StackChips chips={r.stack} />}
      {r.results && <ResultsGrid results={r.results} />}
      {r.gallery && <GalleryGrid items={r.gallery} />}
      {r.testimonial && <TestimonialQuote t={r.testimonial} />}
      <RelatedRealisations items={related} />
      <CinematicCTA />
    </>
  )
}
