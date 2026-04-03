'use client'

import { createContext, useContext } from 'react'
import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'

const RevealDisabledCtx = createContext(false)

export function RevealDisabledProvider({ children }: { children: React.ReactNode }) {
  return <RevealDisabledCtx.Provider value={true}>{children}</RevealDisabledCtx.Provider>
}

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  variant?: Variants
  delay?: number
  threshold?: number
}

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function SectionReveal({
  children,
  className,
  variant = FADE_UP,
  delay = 0,
  threshold = 0.15,
}: SectionRevealProps) {
  const disabled = useContext(RevealDisabledCtx)

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: {
            // @ts-expect-error — spread transition with delay override
            ...variant.visible?.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </m.div>
  )
}
