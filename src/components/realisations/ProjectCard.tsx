import Link from 'next/link'
import { clsx } from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { BrowserFrame } from './BrowserFrame'
import { CardMedia } from './CardMedia'
import { domainLabel } from '@/lib/realisations/taxonomy'
import { studyVisual } from '@/lib/realisations/visual'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

export type ProjectCardProps = {
  realisation: Realisation
  lang?: Locale
  /** `wide` : image et texte cote a cote en grand ecran (cellule large du hub). */
  size?: 'default' | 'wide'
}

/**
 * Carte d'une realisation (v3, 2026-09-25). Le visuel est la composition
 * d'appareils, la couverture ou, a defaut, la capture du site dans un cadre
 * de navigateur qui defile au survol. Une etude qui a une video la joue au
 * survol a la souris (CardMedia). Un seul lien par carte : la carte entiere.
 */
export function ProjectCard({ realisation: r, lang = 'fr', size = 'default' }: ProjectCardProps) {
  const featuredMetric = r.results?.[0]
  const initial = r.client.name.trim()[0]?.toUpperCase() ?? '?'
  const base = lang === 'en' ? '/en/portfolio' : '/realisations'
  const visual = studyVisual(r)
  const video = r.videos?.[0]
  const wide = size === 'wide'

  return (
    <Link
      href={`${base}/${r.slug}`}
      data-card
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition duration-300 ease-out',
        'hover:-translate-y-1 hover:border-[var(--violet-border)] hover:shadow-[0_28px_70px_-36px_rgba(124,58,237,0.55)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
        wide && 'lg:flex-row',
      )}
    >
      <div className={clsx('relative shrink-0', wide && 'lg:w-[56%]')}>
        {visual ? (
          <CardMedia
            still={visual}
            video={video ? { src: video.src, webm: video.webm, durationSec: video.durationSec } : undefined}
            className={clsx('aspect-[16/10] w-full', wide && 'lg:aspect-auto lg:h-full lg:min-h-[340px]')}
            containOnLarge={wide}
            lang={lang}
          />
        ) : r.hero ? (
          <BrowserFrame
            src={r.hero.desktopFull}
            alt={`${r.client.name} : ${r.meta.title}`}
            browserUrl={r.hero.browserUrl}
            variant="card"
            trigger="hover"
            className="rounded-none border-0 border-b border-border"
          />
        ) : null}
      </div>

      <div className={clsx('flex min-w-0 flex-1 flex-col gap-3 p-5 md:p-6', wide && 'lg:justify-center lg:p-8')}>
        <div className="flex min-w-0 items-center gap-3">
          {r.client.logo && !r.client.anonymized ? (
            <img src={r.client.logo} alt="" className="client-logo-tile h-6 w-auto max-w-[72px] shrink-0 object-contain" />
          ) : (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--violet-bg)] text-xs font-bold text-[var(--violet-text)]">
              {initial}
            </span>
          )}
          <span className="min-w-0 truncate text-xs text-text-muted">
            {r.client.name} · {r.client.sector}
            {r.client.location ? ` · ${r.client.location}` : ''}
          </span>
        </div>

        <h3
          className={clsx(
            'font-semibold tracking-tight text-text',
            wide ? 'line-clamp-3 text-xl md:text-2xl lg:text-[22px] lg:leading-[1.25]' : 'line-clamp-2 text-lg',
          )}
        >
          {r.meta.title}
        </h3>

        <p className={clsx('text-sm leading-[1.6] text-text-secondary', wide ? 'line-clamp-3' : 'line-clamp-2')}>
          {r.meta.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-text-muted">
            {domainLabel(r.domains[0], lang)}
          </span>
          {featuredMetric ? (
            <span className="min-w-0 truncate text-right text-xs font-semibold text-[var(--violet-text)]">
              {featuredMetric.value} <span className="font-normal text-text-muted">{featuredMetric.metric}</span>
            </span>
          ) : (
            <ArrowUpRight
              className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--violet-text)]"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </Link>
  )
}
