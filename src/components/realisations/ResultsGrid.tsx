import type { RealisationResult } from '@/lib/realisations/types'

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

export function ResultsGrid({ results }: { results: RealisationResult[] }) {
  return (
    <section id="resultats" className="scroll-mt-[124px] border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Resultats
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-bg-card p-6">
              <span className="text-xs uppercase tracking-wide text-text-muted">
                {r.metric}
              </span>
              <p className="mt-2 text-3xl font-bold text-violet-300 md:text-4xl">{r.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{r.label}</p>
              {r.trend && <Sparkline values={r.trend} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
