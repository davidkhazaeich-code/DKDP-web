import type { RealisationFaqItem } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Questions frequentes d'une etude de cas. Reponses dans le HTML servi
 * (`<details>` natifs, aucun JavaScript) : le JSON-LD FAQPage de la page
 * reprend exactement ce texte, jamais une version differente.
 */
export function CaseStudyFAQ({ items, lang = 'fr' }: { items: RealisationFaqItem[]; lang?: Locale }) {
  if (items.length === 0) return null
  const en = lang === 'en'
  return (
    <section id="questions" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[900px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'Questions about this project' : 'Questions sur ce projet'}
        </h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-semibold leading-snug text-text">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 text-lg leading-none text-text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[72ch] text-[16px] leading-[1.7] text-text-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
