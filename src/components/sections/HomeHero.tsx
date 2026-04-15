'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'

// Three.js — desktop uniquement, chargé en idle après LCP
const ParticleWaves = dynamic(
  () => import('@/components/canvas/ParticleWaves').then((m) => ({ default: m.ParticleWaves })),
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

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-14 pb-16 md:pb-0">

      {/* ── Grille CSS mobile uniquement ── */}
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRID_SVG,
          backgroundSize: '60px 60px',
          animation: 'gridScrollUp 2s linear infinite',
          zIndex: 1,
        }}
      />

      {/* ── Desktop uniquement : Three.js particle waves ── */}
      {isDesktop === true && (
        <ParticleWaves className="absolute inset-0 z-[2] opacity-60" />
      )}

      {/* ── Contenu — toujours dans le HTML SSR, jamais conditionnel ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 text-center">
        <div className="mb-5 sm:mb-8 flex flex-col items-center gap-4">
          <TrustBadge variant="light" />
        </div>
        <h1 className="text-[clamp(1.75rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-6 max-w-[1100px] mx-auto">
          L&apos;agence digitale genevoise
          <br />
          <GradText as="span">qui vous fait sortir du lot.</GradText>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-[860px] mx-auto">
          On crée votre site, on optimise votre SEO, on déploie l&apos;IA dans vos équipes
          et on forme vos collaborateurs. Résultats mesurables, pas de blabla.
        </p>
        <div className="flex justify-center">
          <LiquidMetalButton href="#nos-expertises" size="lg">
            Découvrez nos services →
          </LiquidMetalButton>
        </div>
      </div>
    </section>
  )
}
