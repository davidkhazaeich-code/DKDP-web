import { formatDateShort } from '@/lib/format'
import type { RealisationResult } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const w = 80
  const h = 24
  const stepX = w / (values.length - 1)
  const path = values
    .map(
      (v, i) =>
        `${i === 0 ? 'M' : 'L'}${(i * stepX).toFixed(1)},${(
          h - ((v - min) / range) * h
        ).toFixed(1)}`,
    )
    .join(' ')
  return (
    <svg width={w} height={h} className="mt-2 text-violet-400" aria-hidden="true">
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Resultats d'une realisation. Chaque chiffre porte sa source, sa date de
 * releve et, quand elle compte, la fenetre mesuree : un chiffre sans
 * provenance ne s'affiche pas (regle verifiee par proof.ts).
 */
export function ResultsGrid({ results, lang = 'fr' }: { results: RealisationResult[]; lang?: Locale }) {
  const en = lang === 'en'
  return (
    <section id="resultats" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'Results' : 'Résultats'}
        </h2>
        <p className="mt-3 max-w-[68ch] text-[17px] leading-[1.7] text-text-secondary">
          {en
            ? 'Each figure shows where it comes from and when it was measured.'
            : "Chaque chiffre dit d'où il vient et quand il a été relevé."}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-border bg-bg-card p-6">
              <span className="text-xs uppercase tracking-wide text-text-muted">{r.metric}</span>
              <p className="mt-2 text-3xl font-bold text-[var(--violet-text)] md:text-4xl">{r.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{r.label}</p>
              {r.trend && <Sparkline values={r.trend} />}
              <p className="mt-auto pt-5 text-xs leading-[1.5] text-text-muted">
                {r.source}, {en ? 'retrieved on' : 'relevé du'} {formatDateShort(r.capturedAt)}
                {r.period ? ` · ${r.period}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
