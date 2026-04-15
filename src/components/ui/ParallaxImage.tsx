'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = Omit<ImageProps, 'fill' | 'className'> & {
  /** Extra classes on the outer container (must set height/aspect-ratio here) */
  className?: string
  /** Parallax travel as % of container height — default 12 */
  strength?: number
}

/**
 * Parallax image: the container clips, the inner image translates on scroll.
 * The image is pre-scaled (1 + strength*2/100) so edges never show.
 *
 * Usage:
 *   <ParallaxImage src="..." alt="..." className="aspect-video rounded-xl" />
 */
export function ParallaxImage({ className = '', strength = 12, ...imgProps }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Translate from +strength% to -strength% as the element scrolls past viewport
  const y = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `-${strength}%`])
  // Scale up enough so the shifted image never exposes a gap
  const scale = 1 + (strength * 2) / 100

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          {...imgProps}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  )
}
