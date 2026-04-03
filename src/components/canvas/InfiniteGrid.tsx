'use client'

import { useRef, useEffect } from 'react'
import {
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
  useScroll,
  motion,
} from 'framer-motion'

// Default (homepage) colours
const DEFAULT_ACCENT_RGB = '167,139,250'   // violet
const DEFAULT_BLOB1      = 'rgba(124,58,237,0.12)'
const DEFAULT_BLOB2      = 'rgba(255,107,0,0.09)'

function buildGrid(strokeRgba: string) {
  const encoded = encodeURIComponent(strokeRgba)
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='${encoded}' stroke-width='1'/%3E%3C/svg%3E")`
}

interface InfiniteGridProps {
  children?: React.ReactNode
  className?: string
  /** RGB triplet of the cursor-reveal accent, e.g. "167,139,250" for violet */
  accentRgb?: string
  /** CSS color for top-left ambient blob */
  blob1?: string
  /** CSS color for bottom-right ambient blob */
  blob2?: string
}

export function InfiniteGrid({
  children,
  className = '',
  accentRgb = DEFAULT_ACCENT_RGB,
  blob1     = DEFAULT_BLOB1,
  blob2     = DEFAULT_BLOB2,
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Delay the rAF loop by 500ms so LCP can paint before the animation thread starts
  const activeRef = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => { activeRef.current = true }, 500)
    return () => clearTimeout(t)
  }, [])

  const BASE_GRID  = buildGrid('rgba(255,255,255,0.10)')
  const HOVER_GRID = buildGrid(`rgba(${accentRgb},0.70)`)

  // Mouse position for the radial mask
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  // Infinite scroll - increments every frame, wraps at 60 (grid tile size)
  const scrollOffset = useMotionValue(0)
  useAnimationFrame((_, delta) => {
    if (!activeRef.current) return
    scrollOffset.set((scrollOffset.get() + delta * 0.03) % 60)
  })

  const bgPos = useTransform(scrollOffset, (v) => `0px ${v}px`)

  // Parallax on blobs — subtle depth as section scrolls through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const blobY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const radialMask = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    mouseX.set(-9999)
    mouseY.set(-9999)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient blobs — parallax drift */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ y: blobY, zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '0%',
            width: '38%',
            height: '50%',
            background: blob1,
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            right: '0%',
            width: '35%',
            height: '45%',
            background: blob2,
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      {/* Base grid - always visible, scrolls upward */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: BASE_GRID,
          backgroundPosition: bgPos,
          zIndex: 1,
        }}
      />

      {/* Hover-revealed grid - same scroll, masked to cursor radius */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: HOVER_GRID,
          backgroundPosition: bgPos,
          maskImage: radialMask,
          WebkitMaskImage: radialMask,
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
