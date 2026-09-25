'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'

export type HubSlide = {
  src: string
  alt: string
  href: string
  client: string
  label: string
}

const INTERVAL_MS = 5200

/**
 * Visuel du hub des realisations : les mises en scene des etudes (vraies
 * captures dans des appareils, vrais livrables), l'une apres l'autre en fondu.
 *
 * La rotation s'arrete au survol, au focus clavier et quand l'onglet est
 * masque ; avec `prefers-reduced-motion`, elle ne demarre pas et les pastilles
 * restent le seul moyen de changer d'image. Seules l'image affichee et la
 * suivante sont chargees : le reste attend son tour.
 */
export function HubHeroVisual({ slides, lang = 'fr' }: { slides: HubSlide[]; lang?: Locale }) {
  const en = lang === 'en'
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1]))
  const paused = hovered || hidden || reduced

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onMedia = () => setReduced(media.matches)
    const onVisibility = () => setHidden(document.hidden)
    media.addEventListener('change', onMedia)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      media.removeEventListener('change', onMedia)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || slides.length < 2) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, slides.length])

  useEffect(() => {
    setMounted((prev) => {
      const next = (index + 1) % slides.length
      if (prev.has(index) && prev.has(next)) return prev
      return new Set([...prev, index, next])
    })
  }, [index, slides.length])

  if (slides.length === 0) return null
  const current = slides[index]

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[6%] top-[8%] bottom-[-8%] -z-10 rounded-[40%] bg-[radial-gradient(closest-side,rgba(124,58,237,0.45),transparent)] blur-2xl"
      />
      <Link
        href={current.href}
        className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        aria-label={`${en ? 'Read the case study' : "Lire l'étude"} : ${current.client}`}
      >
        {slides.map((s, i) =>
          mounted.has(i) ? (
            <img
              key={s.src}
              src={s.src}
              alt={i === index ? s.alt : ''}
              aria-hidden={i === index ? undefined : true}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
              decoding="async"
              className={clsx(
                'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                i === index ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
              )}
            />
          ) : null,
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {en ? 'Read' : 'Lire'}
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0" aria-live="polite">
          <p className="truncate text-sm font-semibold text-text">{current.client}</p>
          <p className="truncate text-xs text-text-muted">{current.label}</p>
        </div>
        {slides.length > 1 && (
          <div className="flex shrink-0 items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${en ? 'Show' : 'Afficher'} ${s.client}`}
                aria-pressed={i === index}
                className="relative flex h-6 w-7 items-center"
              >
                <span className="relative block h-1 w-full overflow-hidden rounded-full bg-[var(--border-strong)]">
                  {i === index && (
                    <span
                      key={`${index}-${paused ? 'p' : 'r'}`}
                      data-paused={paused ? 'true' : undefined}
                      className={clsx(
                        'absolute inset-0 rounded-full bg-[var(--violet-text)]',
                        paused ? '' : 'hub-progress',
                      )}
                      style={paused ? undefined : { animationDuration: `${INTERVAL_MS}ms` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
