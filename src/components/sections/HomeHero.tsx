'use client'

import dynamic from 'next/dynamic'
import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'

// Lazy-load Three.js canvas — defer après hydration pour ne pas bloquer LCP
const DottedSurface = dynamic(
  () => import('@/components/canvas/DottedSurface').then((m) => ({ default: m.DottedSurface })),
  { ssr: false, loading: () => null }
)

export function HomeHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Three.js background — lazy-loadé après hydration */}
      <DottedSurface className="absolute inset-0 z-0 opacity-60" />

      {/* Radial blobs */}
      <div className="blob-orange absolute -top-32 -left-32 w-[600px] h-[600px] opacity-25 pointer-events-none" />
      <div className="blob-violet absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-20 pointer-events-none" />

      {/* Content — parallax scroll uniquement, pas d'initial hidden */}
      <motion.div
        style={{ y }}
        className="relative z-10 max-w-[1200px] mx-auto px-6 text-center"
      >
        <div className="hero-title mb-8 flex flex-col items-center gap-4">
          <TrustBadge variant="light" />
        </div>

        {/* H1 en CSS animation — visible immédiatement (LCP non bloqué par JS) */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.03em] mb-6 max-w-[1100px] mx-auto">
          L&apos;agence digitale genevoise
          <br />
          <GradText as="span">qui fait ce qu&apos;elle dit.</GradText>
        </h1>

        <p className="hero-subtitle text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-[860px] mx-auto">
          On crée votre site, on optimise votre SEO, on déploie l&apos;IA dans vos équipes
          et on forme vos collaborateurs. Résultats mesurables, pas de blabla.
        </p>

        <div className="hero-cta flex justify-center">
          <LiquidMetalButton href="#nos-expertises" size="lg" shaderDelay={800}>
            Découvrez nos services →
          </LiquidMetalButton>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-muted">
          Défiler
        </span>
        <div className="flex flex-col items-center -space-y-3">
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0 }}
          >
            <ChevronDown size={20} className="text-text-secondary" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.18 }}
          >
            <ChevronDown size={20} className="text-text-muted" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
