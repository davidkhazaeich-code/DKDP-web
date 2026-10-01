'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { clsx } from 'clsx'
import { ArrowRight, Check } from 'lucide-react'
import type { Locale } from '@/i18n/config'

export type HubSlide = {
  src: string
  alt: string
  href: string
  client: string
  label: string
  /** Ce qui a ete mis en place, deux ou trois points courts (`teaser` de l'etude). */
  points: string[]
  /** Premier resultat de l'etude, deja source, avec sa date de releve mise en forme. */
  result?: { value: string; metric: string; date: string }
}

const INTERVAL_MS = 5200
/** Au toucher, les points s'affichent sous l'image : il faut le temps de les lire. */
const INTERVAL_TOUCH_MS = 7500

/**
 * Visuel du hub des realisations : les images de presentation des etudes,
 * l'une apres l'autre en fondu.
 *
 * Au survol (ou au focus clavier), un panneau monte du bas de l'image : ce qui a
 * ete mis en place en deux ou trois points, le premier resultat date et le lien
 * vers l'etude. Sans survol possible (ecran tactile), les memes informations
 * s'affichent sous l'image et la rotation ralentit. Le panneau sur l'image est
 * masque aux lecteurs d'ecran : le lien est decrit par le bloc sous l'image,
 * qui porte le meme texte.
 *
 * La rotation s'arrete au survol, au focus clavier et quand l'onglet est
 * masque ; avec `prefers-reduced-motion`, elle ne demarre pas et les pastilles
 * restent le seul moyen de changer d'image. Seules l'image affichee et la
 * suivante sont chargees : le reste attend son tour.
 *
 * `eager` (defaut) charge la premiere image en priorite : le hub l'a au-dessus
 * de la ligne de flottaison. L'accueil la place plus bas et passe `eager={false}`,
 * pour ne pas disputer la bande passante a l'image principale de la page.
 */
export function HubHeroVisual({ slides, lang = 'fr', eager = true }: { slides: HubSlide[]; lang?: Locale; eager?: boolean }) {
  const en = lang === 'en'
  const detailsId = useId()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [interval, setIntervalMs] = useState(INTERVAL_MS)
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1]))
  const paused = hovered || hidden || reduced

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touch = window.matchMedia('(hover: none)')
    setReduced(media.matches)
    setIntervalMs(touch.matches ? INTERVAL_TOUCH_MS : INTERVAL_MS)
    const onMedia = () => setReduced(media.matches)
    const onTouch = () => setIntervalMs(touch.matches ? INTERVAL_TOUCH_MS : INTERVAL_MS)
    const onVisibility = () => setHidden(document.hidden)
    media.addEventListener('change', onMedia)
    touch.addEventListener('change', onTouch)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      media.removeEventListener('change', onMedia)
      touch.removeEventListener('change', onTouch)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || slides.length < 2) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => window.clearTimeout(id)
  }, [index, paused, slides.length, interval])

  useEffect(() => {
    setMounted((prev) => {
      const next = (index + 1) % slides.length
      if (prev.has(index) && prev.has(next)) return prev
      return new Set([...prev, index, next])
    })
  }, [index, slides.length])

  if (slides.length === 0) return null
  const current = slides[index]
  const t = {
    built: en ? 'What we built' : 'Mis en place',
    read: en ? 'Read the case study' : "Lire l'étude",
    asOf: en ? 'as of' : 'au',
  }

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
        aria-label={`${t.read} : ${current.client}`}
        aria-describedby={detailsId}
      >
        {slides.map((s, i) =>
          mounted.has(i) ? (
            <img
              key={s.src}
              src={s.src}
              alt={i === index ? s.alt : ''}
              aria-hidden={i === index ? undefined : true}
              loading={eager && i === 0 ? 'eager' : 'lazy'}
              fetchPriority={eager && i === 0 ? 'high' : undefined}
              decoding="async"
              className={clsx(
                'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                i === index
                  ? 'scale-100 opacity-100 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]'
                  : 'scale-[1.04] opacity-0',
              )}
            />
          ) : null,
        )}

        {/* Panneau du survol : visible seulement la ou le survol existe (souris, pave tactile). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [@media(hover:none)]:hidden">
          <div className="absolute inset-x-0 bottom-0 top-[22%] bg-[linear-gradient(to_top,rgba(11,8,20,0.94)_0%,rgba(11,8,20,0.82)_42%,rgba(11,8,20,0)_100%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100" />
          <div
            key={current.href}
            className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 md:p-6"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#F4F1FB]/60">{t.built}</p>
            <ul className="mt-2.5 space-y-1.5">
              {current.points.map((p, i) => (
                <li
                  key={p}
                  style={{ ['--d' as string]: `${90 + i * 55}ms` }}
                  className="flex translate-y-1.5 items-start gap-2 text-[13.5px] leading-snug text-[#F4F1FB] opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition-delay:var(--d)] group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 md:text-sm"
                >
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#F4F1FB]/55" strokeWidth={2.5} aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-end justify-between gap-4 border-t border-white/[0.14] pt-3">
              {current.result ? (
                <p className="min-w-0 truncate text-xs text-[#F4F1FB]/70">
                  <span className="mr-1.5 text-[15px] font-semibold text-[#F4F1FB]">{current.result.value}</span>
                  {current.result.metric}
                  <span className="ml-1.5 text-[#F4F1FB]/45">
                    {t.asOf} {current.result.date}
                  </span>
                </p>
              ) : (
                <span />
              )}
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-violet-300">
                {t.read}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
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
                      style={paused ? undefined : { animationDuration: `${interval}ms` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Au toucher : les memes informations sous l'image. Sur ordinateur, ce bloc reste
          masque mais decrit le lien pour les lecteurs d'ecran (aria-describedby). */}
      <div id={detailsId} className="mt-3 hidden min-h-[7.25rem] [@media(hover:none)]:block">
        <m.div
          key={current.href}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="sr-only">{t.built} :</p>
          <ul className="space-y-1.5">
            {current.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm leading-snug text-text-secondary">
                <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-text-muted" strokeWidth={2.5} aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {current.result && (
            <p className="mt-2.5 text-xs text-text-muted">
              <span className="mr-1 text-sm font-semibold text-text">{current.result.value}</span>
              {current.result.metric}, {t.asOf} {current.result.date}
            </p>
          )}
        </m.div>
      </div>
    </div>
  )
}
