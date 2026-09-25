import { ArrowDown, ArrowRight } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { RealisationTraining } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Bloc formation : le format, le public, les seances le long d'une frise, et
 * un prompt avant et apres qui montre en deux lignes ce que la formation
 * change.
 *
 * Mouvement (v3) : la frise se trace de gauche a droite, les seances entrent
 * l'une apres l'autre, puis le prompt « apres » arrive a cote du « avant ».
 * Tout est affiche d'emblee avec `prefers-reduced-motion`.
 */
export function TrainingBlock({ training, lang = 'fr' }: { training: RealisationTraining; lang?: Locale }) {
  const en = lang === 'en'
  const n = training.sessions.length
  return (
    <section id="formation" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'The training, session by session' : 'La formation, séance par séance'}
        </h2>
        <dl className="mt-6 grid max-w-[80ch] gap-3 text-[15px] sm:grid-cols-[auto_1fr] sm:gap-x-6">
          <dt className="text-text-muted">{en ? 'Format' : 'Format'}</dt>
          <dd className="text-text">{training.format}</dd>
          <dt className="text-text-muted">{en ? 'For' : 'Pour'}</dt>
          <dd className="text-text">{training.audience}</dd>
        </dl>

        <div className="relative mt-14">
          {/* Frise : un trait qui relie les seances, trace a l'entree dans l'ecran. */}
          <SectionReveal
            variant="wipe"
            className="absolute left-0 right-0 top-[15px] hidden h-px lg:block"
          >
            <div
              aria-hidden="true"
              className="h-px w-full bg-gradient-to-r from-[var(--violet-border)] via-[var(--violet)] to-[var(--violet-border)]"
            />
          </SectionReveal>
          <ol className={`relative grid grid-cols-1 gap-8 sm:grid-cols-2 ${n >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} lg:gap-6`}>
            {training.sessions.map((s, i) => (
              <li key={s.title}>
                <SectionReveal delay={0.15 + i * 0.14}>
                  <span
                    className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[12px] font-semibold"
                    style={{ background: 'var(--bg)', borderColor: 'var(--violet-border)', color: 'var(--violet-text)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-5 text-[17px] font-semibold leading-snug text-text">{s.title}</p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-text-secondary">{s.content}</p>
                </SectionReveal>
              </li>
            ))}
          </ol>
        </div>

        {training.promptBeforeAfter && (
          <div className="mt-16 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.35fr)]">
            <SectionReveal className="h-full">
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                  {en ? 'Prompt before' : 'Prompt avant'}
                </p>
                <p className="mt-3 font-mono text-[13px] leading-[1.6] text-text-secondary">{training.promptBeforeAfter.before}</p>
              </div>
            </SectionReveal>
            <span aria-hidden="true" className="flex items-center justify-center text-[var(--violet-text)]">
              <ArrowDown className="h-5 w-5 md:hidden" />
              <ArrowRight className="hidden h-5 w-5 md:block" />
            </span>
            <SectionReveal delay={0.2} className="h-full">
              <div
                className="h-full rounded-2xl border p-6 shadow-[0_30px_80px_-50px_rgba(124,58,237,0.7)]"
                style={{ background: 'var(--violet-bg)', borderColor: 'var(--violet-border)' }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--violet-text)]">
                  {en ? 'Prompt after' : 'Prompt après'}
                </p>
                <p className="mt-3 font-mono text-[13px] leading-[1.65] text-text">{training.promptBeforeAfter.after}</p>
              </div>
            </SectionReveal>
            <p className="text-sm leading-[1.6] text-text-muted md:col-span-3">{training.promptBeforeAfter.comment}</p>
          </div>
        )}
      </div>
    </section>
  )
}
