import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { HomeHeroBackground } from './HomeHeroBackground'

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-14 pb-16 md:pb-0">
      <HomeHeroBackground />

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
