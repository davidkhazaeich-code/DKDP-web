import Link from 'next/link'
import { ProjectCard } from './ProjectCard'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { REALISATIONS, hubOrder } from '@/lib/realisations'
import { hasEnglish, localizeRealisation } from '@/lib/realisations/en'
import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Bande « Réalisations » de la page blog (2026-10-01, demande de David) : les
 * études à la une, entre l'article mis en avant et les catégories, sous la
 * même étiquette en pastille que les catégories. Ancre `#realisations`, reliée
 * au filtre collant du haut de page. En anglais, seules les études traduites.
 */
export function BlogRealisations({ lang = 'fr', limit = 3 }: { lang?: Locale; limit?: number }) {
  const en = lang === 'en'
  const items = hubOrder(
    REALISATIONS.filter((r) => r.meta.status === 'live' && (!en || hasEnglish(r.slug))).map((r) =>
      localizeRealisation(r, lang),
    ),
  ).slice(0, limit)
  if (items.length === 0) return null

  return (
    <section className="pb-24 scroll-mt-[120px]" id="realisations" aria-labelledby="blog-realisations-title">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionReveal>
          <div className="mb-4 flex items-center gap-3">
            <h2
              id="blog-realisations-title"
              className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: violet.bg, color: violet.color, border: `1px solid ${violet.border}` }}
            >
              {en ? 'Case studies' : 'Réalisations'}
            </h2>
            <div className="h-px flex-1" style={{ background: violet.border }} />
            <Link
              href={en ? '/en/portfolio' : '/realisations'}
              className="shrink-0 text-[13px] font-medium text-text-secondary transition-colors hover:text-text"
            >
              {en ? 'All case studies' : 'Toutes les réalisations'} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mb-8 max-w-[68ch] text-[15px] leading-[1.7] text-text-secondary">
            {en
              ? 'The projects behind our articles, told with their proof: what was delivered, dated figures, and what we would do differently.'
              : 'Les projets qui nourrissent nos articles, racontés avec leurs preuves : ce qui a été livré, des chiffres datés, et ce que nous referions autrement.'}
          </p>
        </SectionReveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <SectionReveal key={r.slug} delay={i * 0.08} className="h-full">
              <ProjectCard realisation={r} lang={lang} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
