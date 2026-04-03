'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'

// Three.js — desktop uniquement, chargé en idle après LCP
const DottedSurface = dynamic(
  () => import('@/components/canvas/DottedSurface').then((m) => ({ default: m.DottedSurface })),
  { ssr: false, loading: () => null }
)

// SVG grid identique à InfiniteGrid — inliné pour éviter une requête réseau
const GRID_SVG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255%2C255%2C255%2C0.10)' stroke-width='1'/%3E%3C/svg%3E\")"

export function HomeHero() {
  // null = SSR/hydratation, true = desktop ≥768px, false = mobile
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
  }, [])

  const scrollIndicator = (
    <div
      aria-hidden="true"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
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
    </div>
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">

      {/* ── Mobile : grille CSS pure (aucun JS, aucun framer-motion) ── */}
      {isDesktop === false && (
        <>
          {/* Grille animée — compositor only, zéro TBT */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: GRID_SVG,
              backgroundSize: '60px 60px',
              animation: 'gridScrollUp 2s linear infinite',
              zIndex: 1,
            }}
          />
          {/* Blobs mobiles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              top: '-5%', left: '0%',
              width: '38%', height: '50%',
              background: 'rgba(124,58,237,0.12)',
              borderRadius: '50%',
              filter: 'blur(70px)',
              animation: 'blobFloat 8s ease-in-out infinite',
              zIndex: 0,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              bottom: '-5%', right: '0%',
              width: '35%', height: '45%',
              background: 'rgba(255,107,0,0.09)',
              borderRadius: '50%',
              filter: 'blur(70px)',
              animation: 'blobFloat 10s ease-in-out infinite reverse',
              zIndex: 0,
            }}
          />
        </>
      )}

      {/* ── Desktop : Three.js dots + blobs ── */}
      {isDesktop === true && (
        <>
          <DottedSurface className="absolute inset-0 z-0 opacity-60" />
          <div className="blob-orange absolute -top-32 -left-32 w-[600px] h-[600px] opacity-25 pointer-events-none" />
          <div className="blob-violet absolute -bottom-32 -right-32 w-[600px] h-[600px] opacity-20 pointer-events-none" />
        </>
      )}

      {/* ── Contenu — toujours dans le HTML SSR, jamais conditionnel ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <div className="mb-8 flex flex-col items-center gap-4">
          <TrustBadge variant="light" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.03em] mb-6 max-w-[1100px] mx-auto">
          L&apos;agence digitale genevoise
          <br />
          <GradText as="span">qui fait ce qu&apos;elle dit.</GradText>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-[860px] mx-auto">
          On crée votre site, on optimise votre SEO, on déploie l&apos;IA dans vos équipes
          et on forme vos collaborateurs. Résultats mesurables, pas de blabla.
        </p>
        <div className="flex justify-center">
          <LiquidMetalButton href="#nos-expertises" size="lg" shaderDelay={800}>
            Découvrez nos services →
          </LiquidMetalButton>
        </div>
      </div>

      {scrollIndicator}
    </section>
  )
}
