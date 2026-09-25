import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { domainLabel } from '@/lib/realisations/taxonomy'
import { studyVisual } from '@/lib/realisations/visual'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Fin d'une etude de cas : l'etude la plus proche en grand (« Étude
 * suivante », une invitation a continuer plutot qu'une grille de plus), puis
 * les autres etudes liees en cartes. L'ordre vient de `getRelated` : domaine
 * principal, secteur et tags communs.
 */
function NextStudy({ r, lang }: { r: Realisation; lang: Locale }) {
  const en = lang === 'en'
  const base = en ? '/en/portfolio' : '/realisations'
  const visual = studyVisual(r)
  return (
    <Link
      href={`${base}/${r.slug}`}
      className="group mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-bg-card transition duration-300 hover:border-[var(--violet-border)] hover:shadow-[0_40px_100px_-50px_rgba(124,58,237,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 md:grid-cols-12"
    >
      {visual && (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A] md:col-span-7 md:aspect-auto md:min-h-[360px]">
          <img
            src={visual.src}
            alt={visual.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-4 p-7 md:col-span-5 md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--violet-text)]">
          {en ? 'Next case study' : 'Étude suivante'} · {domainLabel(r.domains[0], lang)}
        </p>
        <p className="text-xs text-text-muted">
          {r.client.name}
          {r.client.location ? ` · ${r.client.location}` : ''}
        </p>
        <h3 className="text-2xl font-semibold leading-[1.2] tracking-tight text-text md:text-[28px]">{r.meta.title}</h3>
        <p className="line-clamp-3 text-[15px] leading-[1.65] text-text-secondary">{r.meta.excerpt}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-text">
          {en ? 'Read the case study' : "Lire l'étude"}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}

export function RelatedRealisations({ items, lang = 'fr' }: { items: Realisation[]; lang?: Locale }) {
  if (items.length === 0) return null
  const [next, ...others] = items
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {lang === 'en' ? 'Keep reading' : 'Continuer la lecture'}
        </h2>
        <NextStudy r={next} lang={lang} />
        {others.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {others.map((r) => (
              <ProjectCard key={r.slug} realisation={r} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
