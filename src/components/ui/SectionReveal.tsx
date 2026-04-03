'use client'

/**
 * SectionReveal — singleton IntersectionObserver + CSS transitions.
 * Replaces framer-motion to eliminate its scripting cost per page.
 *
 * Key design decisions:
 * - ONE shared IO for all instances (503 instances → 1 observe() call per elem)
 *   Creating 503 IOs causes layout thrashing (each forces style recalc).
 * - Hidden state applied via useEffect, not in JSX.
 *   503 inline-style reconciliations during hydration was causing 3300ms TBT.
 * - Same visual result: fadeUp (opacity 0→1, translateY 32→0) on scroll.
 */

import { createContext, useContext, useEffect, useRef } from 'react'
import type { Variants } from 'framer-motion' // type-only — not bundled at runtime

const RevealDisabledCtx = createContext(false)

export function RevealDisabledProvider({ children }: { children: React.ReactNode }) {
  return <RevealDisabledCtx.Provider value={true}>{children}</RevealDisabledCtx.Provider>
}

// ── Singleton IntersectionObserver ──────────────────────────────────────────
// One shared observer for the whole app. Browser batches all threshold checks
// together, making it O(1) instead of O(n) where n = number of elements.
let singletonIO: IntersectionObserver | null = null
const revealCallbacks = new WeakMap<Element, () => void>()

function getSingletonIO(): IntersectionObserver {
  if (!singletonIO) {
    singletonIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealCallbacks.get(entry.target)?.()
            singletonIO!.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    )
  }
  return singletonIO
}
// ────────────────────────────────────────────────────────────────────────────

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  /** Kept for API compatibility — not used at runtime */
  variant?: Variants
  /** Seconds of delay before the reveal transition starts */
  delay?: number
  /** Kept for API compatibility — threshold is fixed to 0.1 on the singleton */
  threshold?: number
}

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const disabled = useContext(RevealDisabledCtx)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Apply hidden state AFTER mount (not in render/SSR):
    // → SSR + hydration see no inline style → no 503-style reconciliation overhead
    // → After mount, elements below fold stay hidden; in-viewport ones reveal immediately
    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    el.style.transition = [
      `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    ].join(', ')

    const io = getSingletonIO()
    revealCallbacks.set(el, () => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    io.observe(el)

    return () => {
      revealCallbacks.delete(el)
      io.unobserve(el)
    }
  }, [delay])

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
