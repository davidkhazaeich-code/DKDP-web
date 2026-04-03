'use client'

/**
 * SectionReveal — CSS + native IntersectionObserver.
 * Replaces framer-motion to eliminate its scripting cost (~350-500ms per page).
 * Same visual result: fadeUp (opacity 0→1, translateY 32→0) on scroll.
 */

import { createContext, useContext, useEffect, useRef } from 'react'
import type { Variants } from 'framer-motion' // type-only, never imported at runtime

const RevealDisabledCtx = createContext(false)

export function RevealDisabledProvider({ children }: { children: React.ReactNode }) {
  return <RevealDisabledCtx.Provider value={true}>{children}</RevealDisabledCtx.Provider>
}

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  /** Kept for API compatibility — not used (all reveals use fadeUp) */
  variant?: Variants
  /** Seconds of delay before the reveal transition starts */
  delay?: number
  /** IntersectionObserver threshold (0–1) */
  threshold?: number
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: SectionRevealProps) {
  const disabled = useContext(RevealDisabledCtx)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'none'
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
