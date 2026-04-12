'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
}

function formatSwiss(n: number): string {
  // Swiss number format: apostrophe as thousands separator
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

export function AnimatedCounter({ value, prefix = 'CHF', suffix }: AnimatedCounterProps) {
  const prevValueRef = useRef<number>(value)
  const [displayed, setDisplayed] = useState<number>(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = prevValueRef.current
    const to = value
    if (from === to) return

    const duration = 300
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased

      setDisplayed(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayed(to)
        prevValueRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [value])

  return (
    <span>
      {prefix && <>{prefix} </>}
      {formatSwiss(displayed)}
      {suffix}
    </span>
  )
}
