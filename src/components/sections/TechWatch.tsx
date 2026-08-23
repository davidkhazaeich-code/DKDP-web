import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { HeroBg } from '@/components/ui/HeroBg'
import { ArticleCarousel } from '@/components/sections/ArticleCarousel'
import { getLatestArticles } from '@/lib/blog/topics'
import { violet } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'
import type { Locale } from '@/i18n/config'

/** Nombre de cartes affichees dans le carrousel d'actualite. */
const MAX_CARTES = 8

const CONTENT = {
  fr: {
    tag: 'Veille technologique',
    heading: 'Nous testons les technologies avant de vous les recommander.',
    subtitle:
      "IA générative, frameworks web, outils d'automatisation : nous les mettons d'abord en production sur nos propres projets. Ce que nous en apprenons, nous l'écrivons noir sur blanc.",
    carouselLabel: 'Derniers articles du blog DKDP',
    linkPrefix: 'Toute notre veille est publiée sur',
    linkLabel: 'le blog DKDP',
    linkSuffix: '',
  },
  en: {
    tag: 'Technology watch',
    heading: 'We test new technology before we recommend it.',
    subtitle:
      'Generative AI, web frameworks, automation tools: we put them into production on our own projects first. What we learn from it, we write down.',
    carouselLabel: 'Latest articles from the DKDP blog',
    linkPrefix: 'All our coverage lives on',
    linkLabel: 'the DKDP blog',
    /* Les articles restent en francais (decision produit, cf. hub /en/blog) :
       on le dit ici pour qu'un visiteur anglophone ne clique pas en aveugle. */
    linkSuffix: ' Articles are published in French.',
  },
} as const

export function TechWatch({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang === 'en' ? 'en' : 'fr']

  // Recalcule a chaque rendu : publier un article suffit a rafraichir la section.
  const articles = getLatestArticles(MAX_CARTES)
  if (articles.length === 0) return null

  return (
    <HeroBg
      blob1="rgba(124,58,237,0.12)"
      blob2="rgba(255,107,0,0.08)"
      accentRgb="167,139,250"
    >
      <section aria-labelledby="techwatch-heading" className="py-14 sm:py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <GradTag className="mb-4 sm:mb-6">{t.tag}</GradTag>
              <h2
                id="techwatch-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-4 sm:mb-5"
              >
                {t.heading}
              </h2>
              <p className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <ArticleCarousel
              articles={articles}
              accentColor={violet.color}
              accentBorder={violet.border}
              lang={lang}
              label={t.carouselLabel}
            />
          </SectionReveal>

          <SectionReveal>
            <p className="text-text-muted text-sm mt-8 text-center">
              {t.linkPrefix}{' '}
              <Link
                href={localizedPath('/blog', lang)}
                className="underline hover:text-text transition-colors"
                style={{ color: violet.color }}
              >
                {t.linkLabel}
              </Link>
              .{t.linkSuffix}
            </p>
          </SectionReveal>
        </div>
      </section>
    </HeroBg>
  )
}
