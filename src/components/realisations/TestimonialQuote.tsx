import type { RealisationTestimonial } from '@/lib/realisations/types'

export function TestimonialQuote({ t }: { t: RealisationTestimonial }) {
  return (
    <section id="temoignage" className="scroll-mt-[124px] border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <blockquote className="border-l-4 border-violet-400/60 pl-6">
          <p className="text-2xl italic leading-snug text-white md:text-3xl">
            « {t.quote} »
          </p>
        </blockquote>
        <div className="mt-6 flex items-center gap-3">
          {t.avatar && (
            <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full" />
          )}
          <div>
            <p className="text-sm font-semibold text-white">{t.author}</p>
            <p className="text-xs text-text-muted">{t.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
