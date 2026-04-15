'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

const STATS = [
  { end: 10, suffix: '+', label: "ans d'expérience", description: 'Dans le digital suisse romand' },
  { end: 700, suffix: '+', label: 'clients accompagnés', description: 'Entreprises et PME suisses' },
  { end: 500, suffix: '+', label: 'professionnels formés', description: 'En Suisse romande' },
  { end: 4.9, suffix: '/5', label: 'note Google', description: 'Vérifiée et certifiée' },
]

const LOGO_GRID = [
  { name: 'SwissLife', file: 'swisslife.webp', width: 120, small: true },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp', width: 130 },
  { name: 'Howden', file: 'howden.avif', width: 100 },
  { name: 'OCAS', file: 'ocas.avif', width: 80 },
  { name: 'Swiss Mutual Trust', file: 'swiss-mutual-trust.avif', width: 130 },
  { name: 'WellWays', file: 'wellways.avif', width: 100 },
  { name: 'Strike', file: 'strike.avif', width: 80 },
  { name: 'Intown', file: 'intown.avif', width: 90 },
]

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const isDecimal = !Number.isInteger(end)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          io.disconnect()
          const duration = 1500
          const fps = 60
          const totalFrames = (duration / 1000) * fps
          let frame = 0
          const timer = setInterval(() => {
            frame++
            const progress = frame / totalFrames
            const eased = 1 - Math.pow(1 - progress, 3)
            const value = Math.min(end * eased, end)
            setCount(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value))
            if (frame >= totalFrames) clearInterval(timer)
          }, 1000 / fps)
        }
      },
      { rootMargin: '-50px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, isDecimal])

  return (
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" aria-label={`${end}${suffix}`}>
      {isDecimal ? count.toFixed(1) : count}{suffix}
    </span>
  )
}

export function ProofStack() {
  return (
    <section aria-labelledby="proof-heading" className="py-14 sm:py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4">Ils nous ont fait confiance</GradTag>
            <h2 id="proof-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              700+ clients et PME nous font confiance.
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
                  width={logo.width}
                  height={logo.small ? 42 : 84}
                  sizes={`${logo.width}px`}
                  className={`object-contain w-auto ${logo.small ? 'h-[42px]' : 'h-[84px]'}`}
                />
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
