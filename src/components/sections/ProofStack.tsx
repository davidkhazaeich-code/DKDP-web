'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

const STATS = [
  { end: 10, suffix: '+', label: "ans d'expérience", description: 'Dans le digital suisse romand' },
  { end: 150, suffix: '+', label: 'entreprises', description: 'Accompagnées avec succès' },
  { end: 463, suffix: '+', label: 'élèves formés', description: 'Satisfaits à 96%' },
  { end: 4.9, suffix: '/5', label: 'note Google', description: 'Vérifiée et certifiée' },
]

const LOGO_GRID = [
  { name: 'SwissLife', file: 'swisslife.webp' },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp' },
  { name: 'Howden', file: 'howden.avif' },
  { name: 'OCAS', file: 'ocas.avif' },
  { name: 'Swiss Mutual Trust', file: 'swiss-mutual-trust.avif' },
  { name: 'WellWays', file: 'wellways.avif' },
  { name: 'Strike', file: 'strike.avif' },
  { name: 'Intown', file: 'intown.avif' },
]

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  const isDecimal = !Number.isInteger(end)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const fps = 60
    const totalFrames = (duration / 1000) * fps
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const value = Math.min(end * eased, end)
      setCount(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value))
      if (frame >= totalFrames) clearInterval(timer)
    }, 1000 / fps)
    return () => clearInterval(timer)
  }, [isInView, end, isDecimal])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold grad-text" aria-label={`${end}${suffix}`}>
      {isDecimal ? count.toFixed(1) : count}{suffix}
    </span>
  )
}

export function ProofStack() {
  return (
    <section aria-labelledby="proof-heading" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <GradTag className="mb-4">Ils nous ont fait confiance</GradTag>
            <h2 id="proof-heading" className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Des résultats, pas des promesses.
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {STATS.map((stat) => (
            <SectionReveal key={stat.label}>
              <div className="text-center">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                <p className="text-white font-semibold mt-2 text-sm">{stat.label}</p>
                <p className="text-text-muted text-xs mt-1">{stat.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            {LOGO_GRID.map((logo) => (
              <div
                key={logo.name}
                className="grayscale opacity-40 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={`/images/clients/${logo.file}`}
                  alt={logo.name}
                  width={110}
                  height={36}
                  className="object-contain h-7"
                />
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
