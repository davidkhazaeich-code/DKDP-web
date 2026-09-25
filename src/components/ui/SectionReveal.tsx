'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

const RevealDisabledCtx = createContext(false)

export function RevealDisabledProvider({ children }: { children: React.ReactNode }) {
  return <RevealDisabledCtx.Provider value={true}>{children}</RevealDisabledCtx.Provider>
}

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  /** `rise` (defaut) : fondu en montant. `wipe` : balayage de gauche a droite (courbes, traces). */
  variant?: 'rise' | 'wipe'
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
  variant = 'rise',
}: SectionRevealProps) {
  const disabled = useContext(RevealDisabledCtx)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (disabled) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [disabled, threshold])

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  // Balayage : le clip-path vit sur un enfant. Un element entierement rogne par
  // son propre clip-path n'est jamais « visible » pour IntersectionObserver.
  if (variant === 'wipe') {
    return (
      <div
        ref={ref}
        className={`wipe-on-view${className ? ` ${className}` : ''}`}
        style={delay ? ({ '--wipe-delay': `${delay * 1000}ms` } as React.CSSProperties) : undefined}
      >
        <div className="wipe-inner h-full w-full">{children}</div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll${className ? ` ${className}` : ''}`}
      style={delay ? { animationDelay: `${delay * 1000}ms` } : undefined}
    >
      {children}
    </div>
  )
}
