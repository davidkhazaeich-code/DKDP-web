import Link from 'next/link'
import { ProjectCard } from './ProjectCard'
import { GradTag } from '@/components/ui/GradTag'
import { liveForDomain } from '@/lib/realisations'
import { hasEnglish, localizeRealisation } from '@/lib/realisations/en'
import type { RealisationDomain } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

type Props = {
  domain: RealisationDomain | RealisationDomain[]
  title: string
  intro?: string
  limit?: number
  lang?: Locale
  id?: string
}

/**
 * Bloc preuve d'une page service : les etudes de cas du meme domaine. Ne rend
 * rien tant qu'aucune etude en ligne ne couvre le domaine, pour qu'une page
 * service puisse l'accueillir avant que sa premiere etude existe. En anglais,
 * seules les etudes traduites s'affichent.
 */
export function RealisationsForDomain({ domain, title, intro, limit = 3, lang = 'fr', id = 'realisations' }: Props) {
  const en = lang === 'en'
  const items = liveForDomain(domain, { limit, slugs: en ? hasEnglish : undefined }).map((r) =>
    localizeRealisation(r, lang),
  )
  if (items.length === 0) return null

  return (
    <section id={id} className="scroll-mt-[124px] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <GradTag>{en ? 'Case studies' : 'Réalisations'}</GradTag>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text md:text-3xl">{title}</h2>
        {intro && <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.7] text-text-secondary">{intro}</p>}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <ProjectCard key={r.slug} realisation={r} lang={lang} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={en ? '/en/portfolio' : '/realisations'}
            className="text-sm text-text-secondary transition-colors hover:text-text"
          >
            {en ? 'See all case studies' : 'Voir toutes les réalisations'} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
