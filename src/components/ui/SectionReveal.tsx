'use client'

import { motion, Variants } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  variant?: Variants
  delay?: number
  threshold?: number
}

export function SectionReveal({
  children,
  className,
  variant = fadeUp,
  delay = 0,
  threshold = 0.15,
}: SectionRevealProps) {
  return (
    <motion.div
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
    </motion.div>
  )
}
