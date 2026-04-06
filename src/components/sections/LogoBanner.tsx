import Image from 'next/image'

const LOGOS = [
  { name: 'SwissLife',               file: 'swisslife.webp',                width: 120, height: 40, small: true },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp',  width: 130, height: 40 },
  { name: 'Howden',                  file: 'howden.avif',                   width: 100, height: 40 },
  { name: 'OCAS',                    file: 'ocas.avif',                     width: 80,  height: 40 },
  { name: 'Swiss Mutual Trust',      file: 'swiss-mutual-trust.avif',       width: 130, height: 40 },
  { name: 'WellWays',                file: 'wellways.avif',                 width: 100, height: 40 },
  { name: 'Strike',                  file: 'strike.avif',                   width: 80,  height: 40 },
  { name: 'Intown',                  file: 'intown.avif',                   width: 90,  height: 40 },
  { name: 'IMRO',                    file: 'imro.avif',                     width: 80,  height: 40 },
  { name: 'AVS',                     file: 'avs.avif',                      width: 60,  height: 40 },
  { name: 'Concorde',                file: 'concorde.avif',                 width: 110, height: 40 },
  { name: 'Sketchiz',                file: 'sketchiz.avif',                 width: 100, height: 40 },
  { name: 'Swiss Medishop',          file: 'swiss-medishop.avif',           width: 120, height: 40 },
  { name: 'Polomarco',               file: 'polomarco.png',                 width: 100, height: 40, small: true },
]

interface LogoBannerProps {
  label?: string
}

export function LogoBanner({ label = 'Ils nous font confiance' }: LogoBannerProps) {
  return (
    <section className="py-10 sm:py-14 md:py-16 border-y border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 mb-6 sm:mb-8 text-center">
        <p className="text-text-muted text-xs uppercase tracking-[0.12em] font-semibold">
          {label}
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
              className="flex-shrink-0 grayscale opacity-40 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={`/images/clients/${logo.file}`}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                sizes={`${logo.width}px`}
                className={`object-contain w-auto ${logo.small ? 'h-[30px]' : 'h-[78px]'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
