import Link from 'next/link'
import { BrowserFrame } from './BrowserFrame'
import type { Realisation } from '@/lib/realisations/types'

export type ProjectCardProps = {
  realisation: Realisation
}

export function ProjectCard({ realisation: r }: ProjectCardProps) {
  const featuredMetric = r.results?.[0]
  const initial = r.client.name.trim()[0]?.toUpperCase() ?? '?'

  return (
    <Link
      href={`/realisations/${r.slug}`}
      className="group block rounded-2xl bg-bg-card transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <BrowserFrame
        src={r.hero.desktopFull}
        alt={`${r.client.name} : ${r.meta.title}`}
        browserUrl={r.hero.browserUrl}
        variant="card"
        trigger="hover"
      />

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          {r.client.logo && !r.client.anonymized ? (
            <img
              src={r.client.logo}
              alt={r.client.name}
              className="h-6 w-auto opacity-80"
            />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15 text-xs font-bold text-violet-300">
              {initial}
            </span>
          )}
          <span className="text-xs text-text-muted">
            {r.client.name} · {r.client.sector}
            {r.client.location ? ` · ${r.client.location}` : ''}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-text-primary">
          {r.meta.title}
        </h3>

        <p className="line-clamp-1 text-sm text-text-secondary">{r.meta.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {r.tags.slice(0, 3).map(t => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          {featuredMetric ? (
            <span className="text-xs font-semibold text-violet-300">
              {featuredMetric.value}
            </span>
          ) : !r.liveUrl ? (
            <span className="text-[10px] uppercase tracking-wide text-text-muted">
              Captures uniquement
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
