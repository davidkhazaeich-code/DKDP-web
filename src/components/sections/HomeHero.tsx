'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DottedSurface } from '@/components/canvas/DottedSurface'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function HomeHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Three.js background */}
      <DottedSurface className="absolute inset-0 z-0 opacity-60" />

      {/* Radial blobs */}
      <div className="blob-orange absolute -top-32 -left-32 w-[600px] h-[600px] opacity-25 pointer-events-none" />
      <div className="blob-violet absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-20 pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ y }}
        className="relative z-10 max-w-[1200px] mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} className="mb-8 flex flex-col items-center gap-4">
          <TrustBadge variant="light" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.03em] mb-6 max-w-[1100px] mx-auto"
        >
          L&apos;agence digitale genevoise
          <br />
          <GradText as="span">qui fait ce qu&apos;elle dit.</GradText>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-[860px] mx-auto"
        >
          On crée votre site, on optimise votre SEO, on déploie l&apos;IA dans vos équipes
          et on forme vos collaborateurs. Résultats mesurables, pas de blabla.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex justify-center"
        >
          <LiquidMetalButton href="#nos-expertises" size="lg">
            Découvrez nos services →
          </LiquidMetalButton>
        </motion.div>


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
