import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { CaseStudyPage } from '@/components/realisations/CaseStudyPage'
import { REALISATIONS, getRealisation, getRelated } from '@/lib/realisations'
import { hasEnglish, localizeRealisation } from '@/lib/realisations/en'

type Params = Promise<{ slug: string }>

/** Only translated case studies get an English page (en.ts). */
export async function generateStaticParams() {
  return REALISATIONS
    .filter(r => r.meta.status !== 'private' && hasEnglish(r.slug))
    .map(r => ({ slug: r.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const base = getRealisation(slug)
  if (!base || !hasEnglish(slug)) return { title: 'Case study not found' }
  const r = localizeRealisation(base, 'en')
  const url = `https://dkdp.ch/en/portfolio/${r.slug}`
  return {
    title: r.meta.seoTitle ?? `${r.meta.title} | DKDP Portfolio`,
    description: r.meta.seoDescription ?? r.meta.excerpt,
    alternates: {
      canonical: url,
      languages: {
        'fr-CH': `https://dkdp.ch/realisations/${r.slug}`,
        en: url,
        'x-default': `https://dkdp.ch/realisations/${r.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: r.meta.title,
      description: r.meta.seoDescription ?? r.meta.excerpt,
      url,
      locale: 'en_US',
      alternateLocale: ['fr_CH'],
      publishedTime: r.meta.publishedISO ?? r.meta.dateISO,
      modifiedTime: r.meta.dateModifiedISO ?? r.meta.publishedISO ?? r.meta.dateISO,
      images: [{ url: `/images/realisations/${r.slug}/og.png`, width: 1200, height: 630, alt: r.meta.title }],
    },
    robots: r.meta.status === 'private' ? { index: false, follow: true } : undefined,
  }
}

export default async function PortfolioDetailPageEN({ params }: { params: Params }) {
  const { slug } = await params
  const base = getRealisation(slug)
  if (!base || !hasEnglish(slug)) notFound()
  if (base.meta.status === 'archived') redirect('/en/portfolio')

  const r = localizeRealisation(base, 'en')
  const close = getRelated(slug, 3).filter(x => hasEnglish(x.slug))
  const pool = close.length > 0
    ? close
    : REALISATIONS.filter(x => x.slug !== slug && x.meta.status === 'live' && hasEnglish(x.slug)).slice(0, 3)
  const related = pool.map(x => localizeRealisation(x, 'en'))

  return <CaseStudyPage r={r} related={related} lang="en" />
}
