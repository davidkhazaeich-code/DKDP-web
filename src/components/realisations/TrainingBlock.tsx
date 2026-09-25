import type { RealisationTraining } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Bloc formation : le format, le public, les seances une par une, et un
 * prompt avant et apres qui montre en deux lignes ce que la formation change.
 */
export function TrainingBlock({ training, lang = 'fr' }: { training: RealisationTraining; lang?: Locale }) {
  const en = lang === 'en'
  return (
    <section id="formation" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          {en ? 'The training, session by session' : 'La formation, séance par séance'}
        </h2>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
          <div className="flex gap-2">
            <dt className="text-text-muted">{en ? 'Format' : 'Format'} :</dt>
            <dd className="text-text">{training.format}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-text-muted">{en ? 'For' : 'Pour'} :</dt>
            <dd className="text-text">{training.audience}</dd>
          </div>
        </dl>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {training.sessions.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-bg-card p-5">
              <span className="font-mono text-[11px] font-semibold text-[var(--violet-text)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-2 text-[16px] font-semibold leading-snug text-text">{s.title}</p>
              <p className="mt-2 text-[14px] leading-[1.55] text-text-secondary">{s.content}</p>
            </li>
          ))}
        </ol>

        {training.promptBeforeAfter && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-bg-card p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {en ? 'Prompt before' : 'Prompt avant'}
              </p>
              <p className="mt-3 font-mono text-[13px] leading-[1.6] text-text-secondary">{training.promptBeforeAfter.before}</p>
            </div>
            <div className="rounded-2xl border p-5" style={{ background: 'var(--violet-bg)', borderColor: 'var(--violet-border)' }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--violet-text)]">
                {en ? 'Prompt after' : 'Prompt après'}
              </p>
              <p className="mt-3 font-mono text-[13px] leading-[1.6] text-text">{training.promptBeforeAfter.after}</p>
            </div>
            <p className="text-sm leading-[1.6] text-text-muted md:col-span-2">{training.promptBeforeAfter.comment}</p>
          </div>
        )}
      </div>
    </section>
  )
}
