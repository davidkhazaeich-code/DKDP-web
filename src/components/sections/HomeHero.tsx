import Link from 'next/link'
import { GraduationCap, Sparkles } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradText } from '@/components/ui/GradText'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { HomeHeroBackground } from './HomeHeroBackground'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'

// 25/09/2026 : l'accueil met en avant la formation IA puis les services IA
// (demande David). Le site et le SEO restent présentés plus bas, dans
// AllServices, mais ne portent plus le hero.
const CONTENT = {
  fr: {
    h1a: "Formez vos équipes à l'IA,",
    h1b: 'puis mettez-la au travail.',
    subtitle:
      'Nous formons vos collaborateurs à Claude, ChatGPT et Copilot sur leurs vrais dossiers, puis nous construisons avec eux les agents IA qui prennent le relais des tâches répétitives. Notre équipe intervient depuis Genève dans toute la Suisse romande.',
    ctaTraining: 'Découvrir les formations IA',
    ctaAi: 'Voir nos solutions IA',
    popularLabel: 'Les plus demandées :',
    popular: [
      { label: 'Formation Claude', href: '/formation-entreprise/claude-ai' },
      { label: 'Formation ChatGPT', href: '/formation-entreprise/chatgpt' },
      { label: 'Audit IA', href: '/intelligence-artificielle/audit-conseil' },
    ],
  },
  en: {
    h1a: 'Train your teams on AI,',
    h1b: 'then put it to work.',
    subtitle:
      'We train your staff on Claude, ChatGPT and Copilot using their real work, then build with them the AI agents that take over repetitive tasks. Our team works from Geneva across French-speaking Switzerland.',
    ctaTraining: 'Explore our AI training',
    ctaAi: 'See our AI solutions',
    popularLabel: 'Most requested:',
    popular: [
      { label: 'Claude training', href: '/formation-entreprise/claude-ai' },
      { label: 'ChatGPT training', href: '/formation-entreprise/chatgpt' },
      { label: 'AI audit', href: '/intelligence-artificielle/audit-conseil' },
    ],
  },
} as const

export function HomeHero({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  const lp = (fr: string) => localizedPath(fr, lang)
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <LiquidMetalButton href={lp('/formation-entreprise/ia')} size="lg">
            <GraduationCap size={16} aria-hidden="true" />
            {t.ctaTraining}
          </LiquidMetalButton>
          <Link
            href={lp('/intelligence-artificielle')}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
          >
            <Sparkles size={15} aria-hidden="true" />
            {t.ctaAi}
          </Link>
        </div>
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-text-muted">
          {t.popularLabel}{' '}
          {t.popular.map((item, i) => (
            <span key={item.href}>
              {i > 0 && <span aria-hidden="true" className="opacity-40"> · </span>}
              <Link href={lp(item.href)} className="underline underline-offset-4 decoration-border hover:text-text transition-colors">
                {item.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
