'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let animId: number

    function raf(time: number) {
      lenis.raf(time)
      animId = requestAnimationFrame(raf)
    }

    // Defer rAF loop by 800ms so it doesn't compete with LCP paint
    const timer = setTimeout(() => {
      animId = requestAnimationFrame(raf)
    }, 800)

    // Intercept anchor link clicks so Lenis handles the scroll (desktop + mobile)
    function onAnchorClick(e: MouseEvent | TouchEvent) {
      const target = (e.target as Element).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el || !lenisRef.current) return
      e.preventDefault()
      lenisRef.current.scrollTo(el, { offset: -80 })
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animId)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // On page change: jump to top instantly, no smooth animation
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
