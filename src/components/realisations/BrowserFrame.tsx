'use client'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

export type BrowserFrameProps = {
  src: string
  alt: string
  browserUrl: string
  variant?: 'card' | 'hero'
  trigger?: 'hover' | 'visible'
  scrollDuration?: number
  className?: string
}

const MAX_URL = 32

function truncateUrl(url: string): string {
  if (url.length <= MAX_URL) return url
  const head = url.slice(0, 18)
  const tail = url.slice(-10)
  return `${head}...${tail}`
}

export function BrowserFrame({
  src,
  alt,
  browserUrl,
  variant = 'card',
  trigger = 'hover',
  scrollDuration,
  className,
}: BrowserFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldAutoscroll, setShouldAutoscroll] = useState(false)

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

  const aspectClass =
    variant === 'hero'
      ? 'aspect-[4/5] md:aspect-[16/9]'
      : 'aspect-[16/10]'

  return (
    <div
      ref={ref}
      data-browser-frame
      data-autoscroll={shouldAutoscroll ? 'true' : undefined}
      className={clsx(
        'group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0E0E10]',
        aspectClass,
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
          className="ml-2 flex-1 truncate rounded-md bg-[#0E0E10]/60 px-3 py-1 text-[11px] font-mono text-white/60"
        >
          {/* Lock icon as text to avoid SVG complexity in this component */}
          {'🔒'} {truncateUrl(browserUrl)}
        </div>
      </div>

      {/* Viewport
          The translating container receives [data-browser-scroll].
          Animation is driven by CSS in globals.css via:
            [data-browser-frame]:hover [data-browser-scroll]     → desktop hover
            [data-browser-frame][data-autoscroll="true"] [...]   → mobile IO (coarse pointer + trigger="visible")
          Known: translateY endpoint uses 100vh as proxy for frame height.
          Overshoot guard: images shorter than 100vh will not over-scroll
          because the image never fills more than the frame; images taller
          than the frame will scroll correctly on desktop and approximately
          on mobile (acceptable imprecision, refineable via ResizeObserver). */}
      <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
        {src ? (
          <div
            data-browser-scroll
            className="absolute inset-x-0 top-0"
            style={{ '--scroll-duration': `${scrollDuration ?? 12}s` } as React.CSSProperties}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
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
