'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DottedSurface } from '@/components/canvas/DottedSurface'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { GradTag } from '@/components/ui/GradTag'
import { staggerContainer, fadeUp } from '@/lib/animations'

const STATS = [
  { value: '10+', label: "ans d'expérience" },
  { value: '150+', label: 'entreprises accompagnées' },
  { value: '4.9/5', label: 'note Google' },
  { value: '463+', label: 'élèves formés' },
]

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Three.js background */}
      <DottedSurface className="absolute inset-0 z-0 opacity-40" />

      {/* Radial blobs */}
      <div className="blob-orange absolute -top-32 -left-32 w-[600px] h-[600px] opacity-25 pointer-events-none" />
      <div className="blob-violet absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-20 pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1200px] mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <GradTag>Agence Digitale à Genève</GradTag>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.03em] mb-6 max-w-[1100px] mx-auto"
        >
          Votre entreprise mérite un digital{' '}
          <GradText as="span">qui travaille pour vous.</GradText>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Agence digitale à Genève. On crée votre site, on déploie l&apos;IA dans vos équipes,
          on forme vos collaborateurs. Résultats mesurables, pas de blabla.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <LiquidMetalButton href="#nos-expertises" size="lg">
            Découvrez nos services →
          </LiquidMetalButton>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-full border border-[rgba(124,58,237,0.3)] text-white hover:border-violet transition-all duration-[150ms] hover:-translate-y-px"
          >
            Réserver un appel
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-orange">{value}</p>
              <p className="text-text-muted text-xs mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-5 h-8 rounded-full border-2 border-border flex items-start justify-center pt-1.5"
      >
        <div className="w-1 h-2 bg-text-muted rounded-full" />
      </motion.div>
    </section>
  )
}
