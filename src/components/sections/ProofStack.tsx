'use client'

import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import type { Locale } from '@/i18n/config'

/**
 * Titre puis logos clients, sans rangee de chiffres : les 4 chiffres (2019,
 * 5,0/5, 2 realisations, 48 h) poses le 21/09/2026 (plan SEO, D16) ont ete
 * retires de l'accueil le 29/09/2026, a la demande de David.
 */
const CONTENT = {
  fr: {
    tag: 'Ils nous ont fait confiance',
    heading: 'Des PME de toute la Suisse romande nous font confiance.',
  },
  en: {
    tag: 'They trusted us',
    heading: 'SMBs across French-speaking Switzerland trust us.',
  },
} as const

const LOGO_GRID = [
  { name: 'SwissLife', file: 'swisslife.webp', width: 120, small: true },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp', width: 130 },
  { name: 'Howden', file: 'howden.avif', width: 100 },
  { name: 'OCAS', file: 'ocas.avif', width: 80 },
  { name: 'BURRI', file: 'burri.svg', width: 145, small: true, shrink: 0.56 }, // 26.09.2026 : -30 % (0.8 x 0.7), demande David
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
