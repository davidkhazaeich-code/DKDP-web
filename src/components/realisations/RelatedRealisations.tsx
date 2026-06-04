import { ProjectCard } from './ProjectCard'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

export function RelatedRealisations({ items, lang = 'fr' }: { items: Realisation[]; lang?: Locale }) {
  if (items.length === 0) return null
  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {lang === 'en' ? 'Related work' : 'Realisations liees'}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(r => (
            <ProjectCard key={r.slug} realisation={r} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
