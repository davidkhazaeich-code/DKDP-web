'use client'

import { useRef } from 'react'
import {
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
  motion,
} from 'framer-motion'

// SVG grid as data URI — CSS background so backgroundPosition actually scrolls it
const BASE_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.12)' stroke-width='1'/%3E%3C/svg%3E")`
const HOVER_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(167%2C139%2C250%2C0.7)' stroke-width='1'/%3E%3C/svg%3E")`

interface InfiniteGridProps {
  children?: React.ReactNode
  className?: string
}

export function InfiniteGrid({ children, className = '' }: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for the radial mask
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  // Infinite scroll — increments every frame, wraps at 60 (grid tile size)
  const scrollOffset = useMotionValue(0)
  useAnimationFrame((_, delta) => {
    scrollOffset.set((scrollOffset.get() + delta * 0.03) % 60)
  })

  const bgPos = useTransform(scrollOffset, (v) => `0px ${v}px`)

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
      {/* Ambient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '0%',
            width: '38%',
            height: '50%',
            background: 'rgba(124,58,237,0.12)',
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
            background: 'rgba(255,107,0,0.09)',
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Base grid — always visible, scrolls upward */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: BASE_GRID,
          backgroundPosition: bgPos,
          zIndex: 1,
        }}
      />

      {/* Hover-revealed grid — same scroll, masked to cursor radius */}
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
