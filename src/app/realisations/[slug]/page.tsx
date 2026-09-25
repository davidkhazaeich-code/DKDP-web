import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { CaseStudyPage } from '@/components/realisations/CaseStudyPage'
import { REALISATIONS, getRealisation, getRelated } from '@/lib/realisations'
import { hasEnglish } from '@/lib/realisations/en'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return REALISATIONS
    .filter(r => r.meta.status !== 'private')
    .map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) return { title: 'Réalisation introuvable' }
  const url = `https://dkdp.ch/realisations/${r.slug}`
  return {
    title: r.meta.seoTitle ?? `${r.meta.title} | Réalisation DKDP`,
    description: r.meta.seoDescription ?? r.meta.excerpt,
    alternates: {
      canonical: url,
      languages: {
        'fr-CH': url,
        ...(hasEnglish(r.slug) ? { en: `https://dkdp.ch/en/portfolio/${r.slug}` } : {}),
        'x-default': url,
      },
    },
    openGraph: {
      type: 'article',
      title: r.meta.title,
      description: r.meta.seoDescription ?? r.meta.excerpt,
      url,
      publishedTime: r.meta.publishedISO ?? r.meta.dateISO,
      modifiedTime: r.meta.dateModifiedISO ?? r.meta.publishedISO ?? r.meta.dateISO,
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

  // Toujours des liens vers d'autres etudes : a defaut d'etude proche, les plus recentes.
  const close = getRelated(slug, 3)
  const related = close.length > 0
    ? close
    : REALISATIONS.filter(x => x.slug !== slug && x.meta.status === 'live').slice(0, 3)

  return <CaseStudyPage r={r} related={related} lang="fr" />
}
