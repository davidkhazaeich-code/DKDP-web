import Link from 'next/link'
import { violet } from '@/lib/tokens'
import { studyVisual } from '@/lib/realisations/visual'
import type { Realisation } from '@/lib/realisations/types'

/**
 * Fin d'article : les études de cas qui citent cet article (`relatedArticles`),
 * pour passer du conseil au projet réel (2026-10-01). Le lien inverse existe
 * déjà dans chaque étude (« Pour aller plus loin »). Rien ne s'affiche quand
 * aucune étude en ligne ne cite l'article.
 */
export function RelatedCaseStudies({ items }: { items: Realisation[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-16" aria-labelledby="related-case-studies">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: violet.color }}>
        Étude de cas
      </p>
      <h2 id="related-case-studies" className="mb-6 text-xl font-black text-white">
        Vu sur un vrai projet
      </h2>
      <div className="space-y-4">
        {items.map((r) => {
          const visual = studyVisual(r)
          const result = r.results?.[0]
          return (
            <Link
              key={r.slug}
              href={`/realisations/${r.slug}`}
              className="group flex flex-col gap-4 rounded-[16px] border border-zinc-800 bg-zinc-900/60 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-600 sm:flex-row sm:items-center"
            >
              {visual && (
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-[10px] sm:w-[210px]">
                  <img
                    src={visual.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="min-w-0 px-1 pb-1 sm:py-1 sm:pr-3">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">{r.client.name}</p>
                <p className="mt-1 text-[15px] font-bold leading-snug text-white">{r.meta.title}</p>
                {result && (
                  <p className="mt-2 text-xs text-zinc-400">
                    <span className="mr-1 text-sm font-semibold text-white">{result.value}</span>
                    {result.metric}
                  </p>
                )}
                <span className="mt-3 inline-block text-xs font-semibold transition-opacity group-hover:opacity-70" style={{ color: violet.color }}>
                  Lire l&apos;étude de cas &rarr;
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
