'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BrowserFrame } from './BrowserFrame'
import { PhoneFrame } from './PhoneFrame'

/**
 * Scene d'appareils en tete d'une etude de site : la page entiere dans un
 * cadre de navigateur (elle defile au survol, ou d'elle-meme au doigt quand
 * elle est visible) et le premier ecran mobile dans un telephone pose devant.
 *
 * Au defilement, le telephone remonte un peu plus vite que la page : une
 * profondeur legere, pilotee par Motion (pas d'ecouteur de scroll). Avec
 * `prefers-reduced-motion`, la scene reste immobile.
 */
export function DeviceStage({
  desktop,
  browserUrl,
  alt,
  phone,
}: {
  desktop: string
  browserUrl: string
  alt: string
  phone?: { src: string; alt: string }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [30, -60])
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.4, 1])

  return (
    <div ref={ref} className="relative isolate mx-auto mt-4 max-w-[1200px] px-6 md:mt-8">
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { opacity: glowOpacity }}
        className="pointer-events-none absolute inset-x-[8%] top-[12%] bottom-[-6%] -z-10 rounded-[40%] bg-[radial-gradient(closest-side,rgba(124,58,237,0.35),transparent)] blur-2xl"
      />
      <div className={phone ? 'relative pb-16 pr-[16%] sm:pr-[14%] md:pb-20' : 'relative'}>
        <BrowserFrame
          src={desktop}
          alt={alt}
          browserUrl={browserUrl}
          variant="stage"
          trigger="visible"
          priority
          className="shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]"
        />
        {phone && (
          <motion.div
            style={reduce ? undefined : { y: phoneY }}
            className="absolute bottom-0 right-0 w-[27%] max-w-[260px] sm:w-[25%]"
          >
            <PhoneFrame src={phone.src} alt={phone.alt} eager />
          </motion.div>
        )}
      </div>
    </div>
  )
}
