'use client'

import { useEffect, useRef } from 'react'

interface SectionRevealCssProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  /** Re-run on each entry (default: false, like Framer Motion `once: true`) */
  repeat?: boolean
}

export function SectionRevealCss({
  children,
  className,
  delay = 0,
  threshold = 0.15,
  repeat = false,
}: SectionRevealCssProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
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
            if (!repeat) io.unobserve(el)
          } else if (repeat) {
            el.classList.remove('is-visible')
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, repeat])

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
