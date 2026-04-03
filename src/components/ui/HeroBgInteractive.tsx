'use client'

/**
 * HeroBgInteractive — Client Component.
 * Same as HeroBg (CSS-only grid + blobs) but adds the cursor-tracking
 * illumination effect from InfiniteGrid, without framer-motion.
 *
 * Implementation: two grid layers sharing the same CSS scroll animation.
 * The hover layer is masked with a radial-gradient that tracks the cursor
 * via CSS custom properties (--mx, --my). No rAF, no continuous work —
 * just an onMouseMove handler that sets CSS variables.
 */

import { useRef } from 'react'

// Base grid — white 10%
const BASE_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.10)' stroke-width='1'/%3E%3C/svg%3E\")"

function buildHoverGrid(rgb: string) {
  const encoded = encodeURIComponent(`rgba(${rgb},0.70)`)
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='${encoded}' stroke-width='1'/%3E%3C/svg%3E")`
}

interface HeroBgInteractiveProps {
  children?: React.ReactNode
  className?: string
  /** CSS color for top-left ambient blob */
  blob1?: string
  /** CSS color for bottom-right ambient blob */
  blob2?: string
  /** RGB triplet for the cursor-reveal accent grid, e.g. "167,139,250" */
  accentRgb?: string
}

export function HeroBgInteractive({
  children,
  className = '',
  blob1 = 'rgba(124,58,237,0.12)',
  blob2 = 'rgba(255,107,0,0.09)',
  accentRgb = '167,139,250',
}: HeroBgInteractiveProps) {
  const ref = useRef<HTMLDivElement>(null)
  const HOVER_GRID = buildHoverGrid(accentRgb)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '-9999px')
    el.style.setProperty('--my', '-9999px')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ '--mx': '-9999px', '--my': '-9999px' } as React.CSSProperties}
    >
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '-5%', left: '0%',
          width: '38%', height: '50%',
          background: blob1,
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'blobFloat 8s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: '-5%', right: '0%',
          width: '35%', height: '45%',
          background: blob2,
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'blobFloat 10s ease-in-out infinite reverse',
          zIndex: 0,
        }}
      />

      {/* Base grid — scrolls up, always visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: BASE_GRID,
          backgroundSize: '60px 60px',
          animation: 'gridScrollUp 2s linear infinite',
          zIndex: 1,
        }}
      />

      {/* Hover grid — same scroll, masked to cursor radius */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: HOVER_GRID,
          backgroundSize: '60px 60px',
          animation: 'gridScrollUp 2s linear infinite',
          maskImage: 'radial-gradient(450px circle at var(--mx) var(--my), black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(450px circle at var(--mx) var(--my), black 0%, transparent 80%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
