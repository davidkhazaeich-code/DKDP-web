'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import type { Locale } from '@/i18n/config'

const STAT_NUMBERS = [
  { end: 10, suffix: '+' },
  { end: 700, suffix: '+' },
  { end: 500, suffix: '+' },
  { end: 4.9, suffix: '/5' },
]

const CONTENT = {
  fr: {
    tag: 'Ils nous ont fait confiance',
    heading: '700+ clients et PME nous font confiance.',
    stats: [
      { label: "ans d'expérience", description: 'Dans le digital suisse romand' },
      { label: 'clients accompagnés', description: 'Entreprises et PME suisses' },
      { label: 'professionnels formés', description: 'En Suisse romande' },
      { label: 'note Google', description: 'Vérifiée et certifiée' },
    ],
  },
  en: {
    tag: 'They trusted us',
    heading: '700+ clients and SMEs trust us.',
    stats: [
      { label: 'years of experience', description: 'In Swiss digital' },
      { label: 'clients supported', description: 'Swiss companies and SMEs' },
      { label: 'professionals trained', description: 'Across French-speaking Switzerland' },
      { label: 'Google rating', description: 'Verified and certified' },
    ],
  },
} as const

const LOGO_GRID = [
  { name: 'SwissLife', file: 'swisslife.webp', width: 120, small: true },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp', width: 130 },
  { name: 'Howden', file: 'howden.avif', width: 100 },
  { name: 'OCAS', file: 'ocas.avif', width: 80 },
  { name: 'BURRI', file: 'burri.svg', width: 145, small: true, shrink: 0.8 },
  { name: 'WellWays', file: 'wellways.avif', width: 100 },
  { name: 'Strike', file: 'strike.avif', width: 80 },
  { name: 'Intown', file: 'intown.avif', width: 90 },
  { name: 'Eli Lilly', file: 'lilly.svg', width: 110 },
  { name: 'Enfants du Parc', file: 'enfants-du-parc.webp', width: 103, shrink: 0.62 },
  { name: 'Stop Suicide', file: 'stop-suicide.webp', width: 139, shrink: 0.66 },
  { name: 'Le Rouge Verbier', file: 'le-rouge-verbier.webp', width: 162, shrink: 0.66 },
  { name: 'Le Dahu', file: 'le-dahu.webp', width: 109, shrink: 0.64 },
  { name: 'World Economic Forum', file: 'world-economic-forum.webp', width: 115, shrink: 0.65 },
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
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-text" aria-label={`${end}${suffix}`}>
      {isDecimal ? count.toFixed(1) : count}{suffix}
    </span>
  )
}

export function ProofStack({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  return (
    <section aria-labelledby="proof-heading" className="py-14 sm:py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4">{t.tag}</GradTag>
            <h2 id="proof-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              {t.heading}
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {STAT_NUMBERS.map((stat, i) => (
            <SectionReveal key={t.stats[i].label}>
              <div className="text-center">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                <p className="text-text font-semibold mt-2 text-sm">{t.stats[i].label}</p>
                <p className="text-text-muted text-xs mt-1">{t.stats[i].description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            {LOGO_GRID.map((logo) => (
              <div
                key={logo.name}
                className="client-logo-tile opacity-40 hover:opacity-80 transition-all duration-300"
              >
                <Image
                  src={`/images/clients/${logo.file}`}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.small ? 42 : 84}
                  sizes={`${logo.width}px`}
                  className={`object-contain w-auto ${'shrink' in logo && logo.shrink ? '' : logo.small ? 'h-[42px]' : 'h-[84px]'}`}
                  style={'shrink' in logo && logo.shrink ? { height: `${(logo.small ? 42 : 84) * logo.shrink}px` } : undefined}
                />
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
