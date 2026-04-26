import Link from 'next/link'
import { ProjectCard } from './ProjectCard'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { REALISATIONS, FEATURED_SLUGS } from '@/lib/realisations'
import type { Realisation } from '@/lib/realisations'

export function FeaturedRealisations() {
  // If FEATURED_SLUGS is set, use it. Otherwise, fall back to top 3 most recent live items.
  const items = FEATURED_SLUGS.length > 0
    ? FEATURED_SLUGS
        .map(slug => REALISATIONS.find(r => r.slug === slug))
        .filter((r): r is Realisation => r !== undefined && r.meta.status === 'live')
        .slice(0, 6)
    : REALISATIONS
        .filter(r => r.meta.status === 'live')
        .slice(0, 3)

  if (items.length === 0) return null

  return (
    <section className="border-y border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <GradTag>Realisations</GradTag>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Etudes de cas recentes
            </h2>
          </div>
          <Link
            href="/realisations"
            className="hidden text-sm text-text-secondary hover:text-text-primary md:inline"
          >
            Voir toutes les realisations &rarr;
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <SectionReveal key={r.slug} delay={Math.min(i, 5) * 0.05}>
              <ProjectCard realisation={r} />
            </SectionReveal>
          ))}
        </div>

        <Link
          href="/realisations"
          className="mt-8 block text-center text-sm text-text-secondary hover:text-text-primary md:hidden"
        >
          Voir toutes les realisations &rarr;
        </Link>
      </div>
    </section>
  )
}
