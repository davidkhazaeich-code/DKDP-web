import Image from 'next/image'
import type { Locale } from '@/i18n/config'

const LOGOS = [
  { name: 'SwissLife',               file: 'swisslife.webp',                width: 120, height: 40, small: true },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp',  width: 130, height: 40 },
  { name: 'Howden',                  file: 'howden.avif',                   width: 100, height: 40 },
  { name: 'BURRI',                   file: 'burri.svg',                     width: 130, height: 40, small: true, shrink: 0.48 },
  { name: 'OCAS',                    file: 'ocas.avif',                     width: 80,  height: 40 },
  { name: 'Swiss Mutual Trust',      file: 'swiss-mutual-trust.avif',       width: 130, height: 40 },
  { name: 'WellWays',                file: 'wellways.avif',                 width: 100, height: 40 },
  { name: 'Servette FC',             file: 'servette-fc.svg',               width: 80,  height: 80 },
  { name: 'Strike',                  file: 'strike.avif',                   width: 80,  height: 40 },
  { name: 'Intown',                  file: 'intown.avif',                   width: 90,  height: 40 },
  { name: 'Eli Lilly',               file: 'lilly.svg',                     width: 145, height: 40, small: true },
  { name: 'IMRO',                    file: 'imro.avif',                     width: 80,  height: 40 },
  { name: 'AVS',                     file: 'avs.avif',                      width: 60,  height: 40 },
  { name: 'Concorde',                file: 'concorde.avif',                 width: 110, height: 40 },
  { name: 'Sketchiz',                file: 'sketchiz.avif',                 width: 100, height: 40 },
  { name: 'Swiss Medishop',          file: 'swiss-medishop.avif',           width: 120, height: 40 },
  { name: 'Polomarco',               file: 'polomarco.png',                 width: 100, height: 40, small: true },
  { name: 'Genève Sports',           file: 'geneve-sports.svg',             width: 160, height: 40, small: true, shrink: 0.63 },
  { name: 'Enfants du Parc',         file: 'enfants-du-parc.webp',          width: 49,  height: 40 },
  { name: 'Stop Suicide',            file: 'stop-suicide.webp',             width: 66,  height: 40 },
  { name: 'Le Rouge Verbier',        file: 'le-rouge-verbier.webp',         width: 77,  height: 40 },
  { name: 'Le Dahu',                 file: 'le-dahu.webp',                  width: 52,  height: 40 },
  { name: 'World Economic Forum',    file: 'world-economic-forum.webp',     width: 55,  height: 40 },
]

interface LogoBannerProps {
  label?: string
  lang?: Locale
}

export function LogoBanner({ label, lang = 'fr' }: LogoBannerProps) {
  const resolvedLabel = label ?? (lang === 'en' ? 'Trusted by' : 'Ils nous font confiance')
  return (
    <section className="py-10 sm:py-14 md:py-16 border-y border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 mb-6 sm:mb-8 text-center">
        <p className="text-text-muted text-xs uppercase tracking-[0.12em] font-semibold">
          {resolvedLabel}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling strip — duplicated ×4, loop resets at -25% (exact, no float) */}
        <div className="logo-scroll items-center gap-16">
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 client-logo-tile opacity-40 hover:opacity-80 transition-all duration-300"
            >
              <Image
                src={`/images/clients/${logo.file}`}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                sizes={`${logo.width}px`}
                className={`object-contain w-auto ${'shrink' in logo && logo.shrink ? '' : logo.small ? 'h-[30px]' : 'h-[78px]'}`}
                style={'shrink' in logo && logo.shrink ? { height: `${(logo.small ? 30 : 78) * logo.shrink}px` } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
