'use client'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Lock } from 'lucide-react'

export type BrowserFrameProps = {
  src: string
  alt: string
  browserUrl: string
  /** `card` 16:10, `hero` 4:5 puis 16:9, `stage` 16:10 a toutes les tailles (scene d'appareils). */
  variant?: 'card' | 'hero' | 'stage'
  trigger?: 'hover' | 'visible'
  scrollDuration?: number
  /** Image du premier ecran de la page : chargee tout de suite, en priorite. */
  priority?: boolean
  className?: string
}

const MAX_URL = 32

function truncateUrl(url: string): string {
  if (url.length <= MAX_URL) return url
  const head = url.slice(0, 18)
  const tail = url.slice(-10)
  return `${head}...${tail}`
}

const ASPECT: Record<NonNullable<BrowserFrameProps['variant']>, string> = {
  card: 'aspect-[16/10]',
  hero: 'aspect-[4/5] md:aspect-[16/9]',
  stage: 'aspect-[16/10]',
}

export function BrowserFrame({
  src,
  alt,
  browserUrl,
  variant = 'card',
  trigger = 'hover',
  scrollDuration,
  priority = false,
  className,
}: BrowserFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [shouldAutoscroll, setShouldAutoscroll] = useState(false)
  const [frameHeight, setFrameHeight] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (!isCoarse || trigger !== 'visible') return

    const node = ref.current
    if (!node) return

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            setShouldAutoscroll(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.6 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [trigger])

  // Hauteur reelle de la zone d'affichage : le defilement s'arrete pile sur le
  // bas de la page, au lieu de viser la hauteur de la fenetre (100vh).
  useEffect(() => {
    const node = viewportRef.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setFrameHeight(Math.round(entry.contentRect.height))
    })
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-browser-frame
      data-autoscroll={shouldAutoscroll ? 'true' : undefined}
      className={clsx(
        'group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0E0E10]',
        ASPECT[variant],
        className,
      )}
    >
      {/* Chrome bar */}
      <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-[#1B1B1F] px-3">
        <div className="flex gap-1.5">
          <span data-browser-dot className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span data-browser-dot className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span data-browser-dot className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div
          data-testid="browser-url"
          className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-[#0E0E10]/60 px-3 py-1 font-mono text-[11px] text-white/60"
        >
          <Lock className="h-3 w-3 shrink-0 text-white/45" aria-hidden="true" />
          <span className="truncate">{truncateUrl(browserUrl)}</span>
        </div>
      </div>

      {/* Viewport
          Le conteneur qui se translate porte [data-browser-scroll]. L'animation
          vit dans globals.css :
            [data-browser-frame]:hover [data-browser-scroll]     → survol desktop
            [data-browser-frame][data-autoscroll="true"] [...]   → mobile (IO, trigger="visible")
          --frame-h (mesuree ci-dessus) arrete le defilement sur le bas de la page. */}
      <div ref={viewportRef} className="relative h-[calc(100%-2.25rem)] overflow-hidden">
        {src ? (
          <div
            data-browser-scroll
            className="absolute inset-x-0 top-0"
            style={
              {
                '--scroll-duration': `${scrollDuration ?? 12}s`,
                ...(frameHeight ? { '--frame-h': `${frameHeight}px` } : {}),
              } as React.CSSProperties
            }
          >
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              decoding="async"
              className="block w-full select-none"
            />
          </div>
        ) : (
          <FallbackPlaceholder label={alt} />
        )}
      </div>
    </div>
  )
}

function FallbackPlaceholder({ label }: { label: string }) {
  const initial = label.trim()[0]?.toUpperCase() ?? '?'
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1029] to-[#0A0A0F]">
      <span className="text-6xl font-bold text-violet-300/60">{initial}</span>
      <span className="mt-2 text-xs text-white/40">Capture indisponible</span>
    </div>
  )
}
