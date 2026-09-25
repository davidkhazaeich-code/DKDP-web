'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Play } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/**
 * Visuel d'une carte d'etude : l'image (mockup, couverture) au repos et, au
 * survol a la souris, la video d'interaction de l'etude qui prend sa place.
 *
 * La video n'est creee qu'au premier survol (rien n'est telecharge avant),
 * muette et en boucle, et se met en pause quand la souris quitte la carte.
 * Au doigt ou avec `prefers-reduced-motion`, l'image reste seule : la pastille
 * « Vidéo » dit simplement que l'etude en contient une. Le survol est ecoute
 * sur la carte entiere (`[data-card]`), pas seulement sur l'image.
 */
type Props = {
  still: { src: string; alt: string }
  video?: { src: string; webm?: string; durationSec: number }
  className?: string
  /** Cellule large du hub en grand ecran : l'image entiere, ses bords fondus dans le fond sombre. */
  containOnLarge?: boolean
  eager?: boolean
  lang?: Locale
}

export function CardMedia({ still, video, className, containOnLarge = false, eager = false, lang = 'fr' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hovered = useRef(false)
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!video) return
    const node = ref.current
    const card = node?.closest<HTMLElement>('[data-card]') ?? node
    if (!card) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return

    const enter = () => {
      hovered.current = true
      setArmed(true)
      videoRef.current?.play().catch(() => {})
    }
    const leave = () => {
      hovered.current = false
      videoRef.current?.pause()
      setPlaying(false)
    }
    // Carte arrivee sous une souris immobile (defilement) : pas de pointerenter, le premier mouvement suffit.
    const move = () => {
      if (!hovered.current) enter()
    }
    card.addEventListener('pointerenter', enter)
    card.addEventListener('pointermove', move)
    card.addEventListener('pointerleave', leave)
    return () => {
      card.removeEventListener('pointerenter', enter)
      card.removeEventListener('pointermove', move)
      card.removeEventListener('pointerleave', leave)
    }
  }, [video])

  // Premier survol : la balise video vient d'etre montee, on la lance si la souris est encore la.
  useEffect(() => {
    if (armed && hovered.current) videoRef.current?.play().catch(() => {})
  }, [armed])

  return (
    <div ref={ref} className={clsx('relative overflow-hidden bg-[#0A0A0A]', className)}>
      {containOnLarge && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(60%_55%_at_35%_40%,rgba(124,58,237,0.22),transparent_70%)] lg:block"
        />
      )}
      <img
        src={still.src}
        alt={still.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={clsx(
          'absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]',
          containOnLarge &&
            'lg:object-contain lg:[mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]',
        )}
      />
      {video && armed && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={clsx(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            containOnLarge && 'lg:object-contain',
            playing ? 'opacity-100' : 'opacity-0',
          )}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.src} type="video/mp4" />
        </video>
      )}
      {video && (
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          <Play className="h-3 w-3" aria-hidden="true" />
          {lang === 'en' ? 'Video' : 'Vidéo'} {video.durationSec} s
        </span>
      )}
    </div>
  )
}
