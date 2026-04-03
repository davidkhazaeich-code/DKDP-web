'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ParallaxOrangeBlobs() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-left blob */}
      <motion.div
        style={{ y: y1, background: 'radial-gradient(circle, rgba(255,140,0,0.22) 0%, transparent 70%)' }}
        className="absolute w-[520px] h-[520px] rounded-full blur-[80px] -top-24 -left-24"
      />
      {/* Right-center blob */}
      <motion.div
        style={{ y: y2, background: 'radial-gradient(circle, rgba(255,107,0,0.14) 0%, transparent 70%)' }}
        className="absolute w-[380px] h-[380px] rounded-full blur-[60px] top-1/3 -right-16"
      />
      {/* Bottom-center blob */}
      <motion.div
        style={{ y: y3, background: 'radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%)' }}
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] bottom-0 left-1/2 -translate-x-1/2"
      />
    </div>
  )
}
