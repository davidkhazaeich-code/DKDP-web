import { formatDateLong } from '@/lib/format'
import type { RealisationTestimonial } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Temoignage d'une etude de cas : citation mot pour mot, avec sa source et sa
 * date (un avis Google se verifie sur la fiche). Une citation traduite le dit.
 */
export function TestimonialQuote({ t, lang = 'fr' }: { t: RealisationTestimonial; lang?: Locale }) {
  const en = lang === 'en'
  const provenance = `${t.source}, ${formatDateLong(t.date, lang)}`
  return (
    <section id="temoignage" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <blockquote className="border-l-4 border-violet-400/60 pl-6" cite={t.url}>
          <p className="text-2xl italic leading-snug text-text md:text-3xl">
            {en ? `“${t.quote}”` : `« ${t.quote} »`}
          </p>
        </blockquote>
        <div className="mt-6 flex items-center gap-3">
          {t.avatar && <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full" />}
          <div>
            <p className="text-sm font-semibold text-text">{t.author}</p>
            <p className="text-xs text-text-muted">{t.role}</p>
            <p className="mt-1 text-xs text-text-muted">
              {t.url ? (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-text"
                >
                  {provenance}
                </a>
              ) : (
                provenance
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
