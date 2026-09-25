import { clsx } from 'clsx'
import { Maximize2 } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { RealisationGalleryItem } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Galerie d'une realisation. Des pages de document (rapport, support de
 * formation) s'affichent comme des feuilles posees, legerement inclinees,
 * qui se redressent au survol et s'ouvrent en grand dans un nouvel onglet ;
 * des captures d'ecran restent en grille simple.
 */
export function GalleryGrid({ items, lang = 'fr' }: { items: RealisationGalleryItem[]; lang?: Locale }) {
  const en = lang === 'en'
  const documents = items.length > 0 && items.every((g) => g.document)
  return (
    <section id="galerie" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {documents ? (en ? 'The deliverable, page by page' : 'Le livrable, page par page') : en ? 'Gallery' : 'Galerie'}
        </h2>

        {documents ? (
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14 lg:px-10">
            {items.map((g, i) => (
              <SectionReveal key={g.src} delay={i * 0.12}>
                <figure>
                  <a
                    href={g.src}
                    target="_blank"
                    rel="noopener"
                    className={clsx(
                      'group relative block overflow-hidden rounded-md bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] ring-1 ring-black/10',
                      'transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:rotate-0 focus-visible:rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
                      i % 2 === 0 ? 'md:-rotate-[1.4deg]' : 'md:rotate-[1.4deg]',
                    )}
                  >
                    <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
                    <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 className="h-3 w-3" aria-hidden="true" />
                      {en ? 'Open full size' : 'Ouvrir en grand'}
                    </span>
                  </a>
                  {g.caption && (
                    <figcaption className="mt-4 text-sm leading-[1.6] text-text-muted">{g.caption}</figcaption>
                  )}
                </figure>
              </SectionReveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map((g) => (
              <figure key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" className="rounded-xl border border-border" />
                {g.caption && <figcaption className="mt-3 text-sm italic text-text-muted">{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
