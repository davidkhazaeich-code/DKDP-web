import Link from 'next/link'
import { ProjectCard } from './ProjectCard'
import { GradTag } from '@/components/ui/GradTag'
import { REALISATIONS } from '@/lib/realisations'
import type { RealisationCategory } from '@/lib/realisations/types'

type Props = {
  category: RealisationCategory
  tag?: string
  title: string
  limit?: number
}

export function RealisationsForCategory({
  category,
  tag,
  title,
  limit = 3,
}: Props) {
  const items = REALISATIONS
    .filter(r => r.meta.status === 'live')
    .filter(r => r.category === category || r.category === 'site-web-ia')
    .filter(r => !tag || r.tags.includes(tag))
    .slice(0, limit)

  if (items.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <GradTag>Realisations recentes</GradTag>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(r => <ProjectCard key={r.slug} realisation={r} />)}
        </div>
        <div className="mt-8">
          <Link href="/realisations" className="text-sm text-text-secondary hover:text-text-primary">
            Voir toutes les realisations &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
