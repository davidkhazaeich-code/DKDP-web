'use client'

import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import type { Locale } from '@/i18n/config'

/**
 * Chiffres de preuve, rendus tels quels cote serveur (21/09/2026, plan SEO,
 * D16). Avant : 10+ ans, 700+ clients, 500+ formes, 4,9/5 animes de 0 par un
 * compteur, sans source. Ceux-ci sont verifiables : fiche Google (5,0 sur 22),
 * page A propos (fondation 2019), /realisations (2 etudes de cas).
 */
const CONTENT = {
  fr: {
    tag: 'Ils nous ont fait confiance',
    heading: 'Des PME de toute la Suisse romande nous font confiance.',
    stats: [
      { value: '2019', label: 'agence fondée à Genève', description: 'Aux Eaux-Vives, rue du 31-Décembre' },
      { value: '5,0/5', label: 'note Google', description: '22 avis sur la fiche DKDP' },
      { value: '2', label: 'réalisations publiées', description: 'Golden Cash, SOS Relevage' },
      { value: '48 h', label: 'pour un devis', description: 'Après un premier appel gratuit' },
    ],
  },
  en: {
    tag: 'They trusted us',
    heading: 'SMBs across French-speaking Switzerland trust us.',
    stats: [
      { value: '2019', label: 'founded in Geneva', description: 'Eaux-Vives, rue du 31-Décembre' },
      { value: '5.0/5', label: 'Google rating', description: '22 reviews on the DKDP listing' },
      { value: '2', label: 'published case studies', description: 'Golden Cash, SOS Relevage' },
      { value: '48 h', label: 'to get a quote', description: 'After a free first call' },
    ],
  },
} as const

const LOGO_GRID = [
  { name: 'SwissLife', file: 'swisslife.webp', width: 120, small: true },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp', width: 130 },
  { name: 'Howden', file: 'howden.avif', width: 100 },
  { name: 'OCAS', file: 'ocas.avif', width: 80 },
  { name: 'BURRI', file: 'burri.svg', width: 145, small: true, shrink: 0.8 },
  { name: 'WellWays', file: 'wellways.avif', width: 100 },
  { name: 'Strike', file: 'strike.avif', width: 80 },
  { name: 'Intown', file: 'intown.avif', width: 90 },
  { name: 'Eli Lilly', file: 'lilly.svg', width: 110, shrink: 0.5 },
  { name: 'Enfants du Parc', file: 'enfants-du-parc.webp', width: 103, shrink: 0.62 },
  { name: 'Stop Suicide', file: 'stop-suicide.webp', width: 139, shrink: 0.66 },
  { name: 'Le Rouge Verbier', file: 'le-rouge-verbier.webp', width: 162, shrink: 0.66 },
  { name: 'Le Dahu', file: 'le-dahu.webp', width: 109, shrink: 0.64 },
  { name: 'World Economic Forum', file: 'world-economic-forum.webp', width: 115, shrink: 0.65 },
]

export function ProofStack({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  return (
    <section aria-labelledby="proof-heading" className="py-14 sm:py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4">{t.tag}</GradTag>
            <h2 id="proof-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              {t.heading}
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {t.stats.map((stat) => (
            <SectionReveal key={stat.label}>
              <div className="text-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-text">{stat.value}</span>
                <p className="text-text font-semibold mt-2 text-sm">{stat.label}</p>
                <p className="text-text-muted text-xs mt-1">{stat.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            {LOGO_GRID.map((logo) => (
              <div
                key={logo.name}
                className="client-logo-tile opacity-40 hover:opacity-80 transition-all duration-300"
              >
                <Image
                  src={`/images/clients/${logo.file}`}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.small ? 42 : 84}
                  sizes={`${logo.width}px`}
                  className={`object-contain w-auto ${'shrink' in logo && logo.shrink ? '' : logo.small ? 'h-[42px]' : 'h-[84px]'}`}
                  style={'shrink' in logo && logo.shrink ? { height: `${(logo.small ? 42 : 84) * logo.shrink}px` } : undefined}
                />
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
