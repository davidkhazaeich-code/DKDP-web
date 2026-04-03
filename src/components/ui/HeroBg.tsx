/**
 * HeroBg — Server Component, pure CSS.
 * Visual equivalent of InfiniteGrid without any JS/framer-motion.
 * Use this for hero sections (above the fold) to avoid blocking LCP.
 *
 * Props match InfiniteGrid so the switch is a drop-in replacement.
 */

import type { ReactNode } from 'react'

interface HeroBgProps {
  children?: ReactNode
  className?: string
  /** CSS color for top-left ambient blob (default: violet) */
  blob1?: string
  /** CSS color for bottom-right ambient blob (default: orange) */
  blob2?: string
}

// Same SVG as InfiniteGrid's BASE_GRID — inlined to avoid a network request
const GRID_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.10)' stroke-width='1'/%3E%3C/svg%3E\")"

export function HeroBg({
  children,
  className = '',
  blob1 = 'rgba(124,58,237,0.12)',
  blob2 = 'rgba(255,107,0,0.09)',
}: HeroBgProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Scrolling grid — compositor-only, 0 TBT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRID_BG,
          backgroundSize: '60px 60px',
          animation: 'gridScrollUp 2s linear infinite',
          zIndex: 1,
        }}
      />

      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '-5%',
          left: '0%',
          width: '38%',
          height: '50%',
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
          bottom: '-5%',
          right: '0%',
          width: '35%',
          height: '45%',
          background: blob2,
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'blobFloat 10s ease-in-out infinite reverse',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
