'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { Watermark } from '@/components/ui/Watermark'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'

export function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <HeroBg>
      <section ref={sectionRef} aria-labelledby="cta-heading" className="py-16 md:py-[130px] lg:py-[200px] relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <Watermark />
        </div>

        <motion.div
          style={{ y }}
          className="relative z-10 max-w-[1200px] mx-auto px-6 text-center"
        >
          <SectionReveal>
            <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
              Parlons de{' '}
              <GradText as="span">votre projet</GradText>
            </h2>

            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              15 minutes, c&apos;est gratuit, et on vous dit honnêtement si on peut vous aider - et comment.
            </p>

            <div className="flex justify-center mb-10">
              <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                Réservez votre appel gratuit<span aria-hidden="true"> →</span>
              </LiquidMetalButton>
            </div>

            <div className="grid grid-cols-2 gap-px max-w-sm mx-auto mb-12 border border-border rounded-full overflow-hidden">
              <a
                href="tel:+41799407969"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm text-text-muted hover:text-white hover:bg-bg-card transition-all duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2.5C2 2.5 3 1 4.5 1c.5 0 1 .5 1.5 1.5S7 4 7 4s-.5.5-1 1c.5 1 1.5 2 2.5 2.5.5-.5 1-1 1-1s1 .5 2 1 1.5 1 1.5 1.5C13 10.5 12 12 12 12c-4 1-9.5-4.5-10-9.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                +41 79 940 79 69
              </a>
              <a
                href="mailto:dk@dkdp.ch"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm text-text-muted hover:text-white hover:bg-bg-card transition-all duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                dk@dkdp.ch
              </a>
            </div>

            <p className="text-text-muted text-sm">
              Sans engagement · Réponse sous 24h · Eaux-Vives, Genève ou en visio
            </p>
          </SectionReveal>
        </motion.div>
      </section>
    </HeroBg>
  )
}
