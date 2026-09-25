'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Chiffre qui defile de zero a sa valeur quand il entre a l'ecran.
 *
 * Le rendu serveur porte la valeur finale : sans JavaScript, pour Google et
 * pour un lecteur d'ecran, le chiffre est juste. La valeur est celle de
 * l'etude (« 1'802 », « 26 % », « 12 jours ») : seul le nombre defile, le
 * texte autour reste. Rien ne defile sous 10 (un 3 qui compte jusqu'a 3
 * n'apporte rien), ni avec `prefers-reduced-motion`, ni pour un chiffre deja
 * visible au chargement : il ne retombe jamais a zero sous les yeux du lecteur.
 */
const NUMBER = /^(\D*?)(\d{1,3}(?:['’]\d{3})+|\d+)(?:,(\d+))?([\s\S]*)$/

export function CountUp({
  value,
  className,
  duration = 1600,
}: {
  value: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    setDisplay(value)
    const el = ref.current
    const match = NUMBER.exec(value)
    if (!el || !match) return
    const [, prefix, intPart, decPart = '', suffix] = match
    const target = Number(`${intPart.replace(/['’]/g, '')}${decPart ? `.${decPart}` : ''}`)
    if (!Number.isFinite(target) || target < 10) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    const separator = intPart.includes('’') ? '’' : "'"
    const grouped = /['’]/.test(intPart)
    const format = (n: number) => {
      const [int, dec] = n.toFixed(decPart.length).split('.')
      const digits = grouped ? int.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : int
      return `${prefix}${digits}${dec ? `,${dec}` : ''}${suffix}`
    }

    setDisplay(format(0))
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setDisplay(p < 1 ? format(target * (1 - (1 - p) ** 3)) : value)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
