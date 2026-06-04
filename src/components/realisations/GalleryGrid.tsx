import type { RealisationGalleryItem } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

export function GalleryGrid({ items, lang = 'fr' }: { items: RealisationGalleryItem[]; lang?: Locale }) {
  return (
    <section id="galerie" className="scroll-mt-[124px] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {lang === 'en' ? 'Gallery' : 'Galerie'}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((g, i) => (
            <figure key={i}>
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="rounded-xl border border-white/10"
              />
              {g.caption && (
                <figcaption className="mt-3 text-sm italic text-text-muted">
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
