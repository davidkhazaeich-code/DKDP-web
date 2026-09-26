import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { HomeHeroBackground } from './HomeHeroBackground'
import type { Locale } from '@/i18n/config'

const CONTENT = {
  fr: {
    h1a: "L'agence digitale genevoise",
    h1b: 'qui vous fait sortir du lot.',
    subtitle: "On crée votre site, on optimise votre SEO, on déploie l'IA dans vos équipes et on forme vos collaborateurs. Résultats mesurables, pas de blabla.",
    cta: 'Découvrez nos services',
  },
  en: {
    h1a: 'The Geneva digital agency',
    h1b: 'that makes you stand out.',
    subtitle: 'We build your website, optimise your SEO, deploy AI across your teams and train your staff. Measurable results, no fluff.',
    cta: 'Discover our services',
  },
} as const

export function HomeHero({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-14 pb-16 md:pb-0">
      <HomeHeroBackground />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 text-center">
        <div className="mb-5 sm:mb-8 flex flex-col items-center gap-4">
          <TrustBadge variant="light" lang={lang} />
        </div>
        <h1 className="text-[clamp(1.75rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-6 max-w-[1100px] mx-auto">
          {t.h1a}
          <br />
          <GradText as="span">{t.h1b}</GradText>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-[860px] mx-auto">
          {t.subtitle}
        </p>
        <div className="flex justify-center">
          <LiquidMetalButton href="#nos-expertises" size="lg">
            {t.cta} →
          </LiquidMetalButton>
        </div>
      </div>
    </section>
  )
}
