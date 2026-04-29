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
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTheme } from '@/components/providers/ThemeProvider'

// Default (homepage) colours
const DEFAULT_ACCENT_RGB = '167,139,250'   // violet
const DEFAULT_BLOB1      = 'rgba(124,58,237,0.12)'
const DEFAULT_BLOB2      = 'rgba(255,107,0,0.09)'

function buildGrid(strokeRgba: string, strokeWidth: number = 1) {
  const encoded = encodeURIComponent(strokeRgba)
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='${encoded}' stroke-width='${strokeWidth}'/%3E%3C/svg%3E")`
}

/**
 * In light mode, the heavy 70px blur diffuses brand color across many pixels so
 * the original alphas (designed for dark) read invisible on cream. Bump alpha by
 * ~2x for any rgba/rgb input string. Pass-through for non-rgba strings.
 */
function bumpAlphaForLight(color: string, multiplier: number = 2.2): string {
  const rgbaMatch = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/)
  if (!rgbaMatch) return color
  const [, r, g, b, a = '1'] = rgbaMatch
  const bumped = Math.min(1, parseFloat(a) * multiplier)
  return `rgba(${r}, ${g}, ${b}, ${bumped.toFixed(3)})`
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
  const colors = useThemeColors()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const blob1Adjusted = isLight ? bumpAlphaForLight(blob1) : blob1
  const blob2Adjusted = isLight ? bumpAlphaForLight(blob2) : blob2
  // Delay the rAF loop by 500ms so LCP can paint before the animation thread starts
  const activeRef = useRef(false)
  const mouseThrottleRef = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => { activeRef.current = true }, 500)
    return () => clearTimeout(t)
  }, [])

  // Light mode base: 1.5px stroke + 14% alpha pour un BG ultra-discret.
  // Light mode hover: 3.5px brand color full alpha pour un coloriage cursor très voyant.
  // Dark mode: 1px stroke + 0.80 alpha comme avant.
  const baseStrokeWidth  = theme === 'light' ? 1.5 : 1
  const hoverStrokeWidth = theme === 'light' ? 3.5 : 1
  const hoverAlpha       = theme === 'light' ? 1.0  : 0.80
  const BASE_GRID  = buildGrid(colors.gridLine, baseStrokeWidth)
  const HOVER_GRID = buildGrid(`rgba(${accentRgb},${hoverAlpha})`, hoverStrokeWidth)

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

  const radialMaskRadius = isLight ? 600 : 450
  const radialMask = useMotionTemplate`radial-gradient(${radialMaskRadius}px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (mouseThrottleRef.current) return
    mouseThrottleRef.current = true
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    requestAnimationFrame(() => {
      mouseX.set(x)
      mouseY.set(y)
      mouseThrottleRef.current = false
    })
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
            background: blob1Adjusted,
            borderRadius: '50%',
            filter: 'blur(70px)',
            animation: 'blobFloat 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            right: '0%',
            width: '35%',
            height: '45%',
            background: blob2Adjusted,
            borderRadius: '50%',
            filter: 'blur(70px)',
            animation: 'blobFloat 10s ease-in-out infinite reverse',
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
