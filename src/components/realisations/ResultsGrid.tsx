import { clsx } from 'clsx'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CountUp } from './CountUp'
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

function Provenance({ r, lang }: { r: RealisationResult; lang: Locale }) {
  return (
    <p className="mt-4 text-xs leading-[1.5] text-text-muted">
      {r.source}, {lang === 'en' ? 'retrieved on' : 'relevé du'} {formatDateShort(r.capturedAt)}
      {r.period ? ` · ${r.period}` : ''}
    </p>
  )
}

/**
 * Resultats d'une realisation (v3). Le premier chiffre est mis en avant, les
 * suivants se lisent en liste a cote : une hierarchie, pas trois cartes
 * identiques. Chaque chiffre porte sa source, sa date de releve et, quand
 * elle compte, la fenetre mesuree (regle verifiee par proof.ts), et defile
 * jusqu'a sa valeur en entrant a l'ecran (CountUp, valeur finale au rendu
 * serveur).
 */
export function ResultsGrid({ results, lang = 'fr' }: { results: RealisationResult[]; lang?: Locale }) {
  const en = lang === 'en'
  const [lead, ...rest] = results
  if (!lead) return null
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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <SectionReveal className={rest.length > 0 ? 'lg:col-span-6' : 'lg:col-span-12'}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-[var(--violet-border)] bg-[var(--violet-bg)] p-8 md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.35),transparent)]"
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.14em] text-[var(--violet-text)]">
                {lead.metric}
              </p>
              <p className="relative mt-4 text-6xl font-semibold tabular-nums tracking-[-0.03em] text-text md:text-7xl">
                <CountUp value={lead.value} />
              </p>
              <p className="relative mt-3 max-w-[42ch] text-lg leading-[1.5] text-text-secondary">{lead.label}</p>
              {lead.trend && <Sparkline values={lead.trend} />}
              <Provenance r={lead} lang={lang} />
            </div>
          </SectionReveal>

          {rest.length > 0 && (
            <ul className="divide-y divide-border border-y border-border lg:col-span-6">
              {rest.map((res, i) => (
                <li key={`${res.metric}-${i}`}>
                  <SectionReveal delay={(i + 1) * 0.1} className="py-7">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                      <span
                        className={clsx(
                          'font-semibold tabular-nums tracking-[-0.02em] text-[var(--violet-text)]',
                          res.value.length > 8 ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl',
                        )}
                      >
                        <CountUp value={res.value} />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">{res.metric}</span>
                    </div>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">{res.label}</p>
                    {res.trend && <Sparkline values={res.trend} />}
                    <Provenance r={res} lang={lang} />
                  </SectionReveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
