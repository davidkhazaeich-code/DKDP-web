'use client'

import { useEffect, useRef, useState } from 'react'
import type { RealisationVideo } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Courte video d'interaction (10 a 20 s, sans son) : ce qu'une capture ne
 * montre pas, un tunnel qui avance, une carte qui s'ouvre.
 *
 * Rien n'est telecharge avant que la video approche de l'ecran
 * (`preload="none"`), elle joue quand elle est visible a moitie et se met en
 * pause en sortant. Avec `prefers-reduced-motion`, pas de lecture automatique :
 * les controles natifs s'affichent et le visiteur decide. La transcription
 * texte sous la video dit ce qu'elle montre, pour Google et les lecteurs
 * d'ecran.
 */
export function ScreenVideo({ video, host, lang = 'fr' }: { video: RealisationVideo; host?: string; lang?: Locale }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)
  const en = lang === 'en'

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* lecture refusee par le navigateur : les controles restent disponibles */
          })
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-card-md)]">
        {host && (
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="ml-3 truncate font-mono text-[11px] text-text-muted">{host}</span>
          </div>
        )}
        <video
          ref={ref}
          muted
          playsInline
          loop
          preload="none"
          poster={video.poster}
          width={video.width}
          height={video.height}
          controls={reduced}
          aria-label={video.title}
          className="block h-auto w-full"
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3 text-sm leading-[1.6] text-text-muted">
        <span className="font-semibold text-text-secondary">{video.title}.</span> {video.description}
      </figcaption>
      {video.transcript && (
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer text-text-secondary transition-colors hover:text-text">
            {en ? 'What the video shows' : 'Ce que montre la vidéo'}
          </summary>
          <p className="mt-2 max-w-[80ch] leading-[1.6] text-text-secondary">{video.transcript}</p>
        </details>
      )}
    </figure>
  )
}
