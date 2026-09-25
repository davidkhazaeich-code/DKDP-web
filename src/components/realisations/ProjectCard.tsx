import Link from 'next/link'
import { BrowserFrame } from './BrowserFrame'
import { domainLabel } from '@/lib/realisations/taxonomy'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

export type ProjectCardProps = {
  realisation: Realisation
  lang?: Locale
}

/**
 * Carte d'une realisation. Un projet web montre la capture de son site dans
 * un cadre de navigateur ; un projet sans site (automatisation, formation,
 * publicite) montre sa couverture, un visuel reel du projet.
 */
export function ProjectCard({ realisation: r, lang = 'fr' }: ProjectCardProps) {
  const featuredMetric = r.results?.[0]
  const initial = r.client.name.trim()[0]?.toUpperCase() ?? '?'
  const base = lang === 'en' ? '/en/portfolio' : '/realisations'

  return (
    <Link
      href={`${base}/${r.slug}`}
      className="group block rounded-2xl bg-bg-card transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      {r.hero ? (
        <BrowserFrame
          src={r.hero.desktopFull}
          alt={`${r.client.name} : ${r.meta.title}`}
          browserUrl={r.hero.browserUrl}
          variant="card"
          trigger="hover"
        />
      ) : r.cover ? (
        <div className="overflow-hidden rounded-t-2xl border-b border-border">
          <img
            src={r.cover.src}
            alt={r.cover.alt}
            loading="lazy"
            className="block aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          {r.client.logo && !r.client.anonymized ? (
            <img src={r.client.logo} alt={r.client.name} className="h-6 w-auto opacity-80" />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--violet-bg)] text-xs font-bold text-[var(--violet-text)]">
              {initial}
            </span>
          )}
          <span className="text-xs text-text-muted">
            {r.client.name} · {r.client.sector}
            {r.client.location ? ` · ${r.client.location}` : ''}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-text">{r.meta.title}</h3>

        <p className="line-clamp-2 text-sm text-text-secondary">{r.meta.excerpt}</p>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-text-muted">
            {domainLabel(r.domains[0], lang)}
          </span>
          {featuredMetric ? (
            <span className="text-right text-xs font-semibold text-[var(--violet-text)]">
              {featuredMetric.value} <span className="font-normal text-text-muted">{featuredMetric.metric}</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
