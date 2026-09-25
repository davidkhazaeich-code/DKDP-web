import type { Locale } from '@/i18n/config'

/**
 * « Ce que nous referions autrement » : deux ou trois lecons vecues, dites
 * franchement. C'est le premier E d'E-E-A-T, l'experience : ce qu'un projet
 * a appris et qu'aucun guide generique ne peut ecrire.
 */
export function LessonsBlock({ lessons, lang = 'fr' }: { lessons: string[]; lang?: Locale }) {
  if (lessons.length === 0) return null
  const en = lang === 'en'
  return (
    <section id="lecons" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
            {en ? 'What we would do differently' : 'Ce que nous referions autrement'}
          </h2>
          <p className="mt-3 text-[17px] leading-[1.7] text-text-secondary">
            {en
              ? 'What this project taught us, and what we now apply to the next ones.'
              : 'Ce que ce projet nous a appris, et que nous appliquons aux suivants.'}
          </p>
        </div>
        <ol className="grid gap-4 md:col-span-7 lg:col-span-7 lg:col-start-6">
          {lessons.map((lesson, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-border bg-bg-card p-5">
              <span className="font-mono text-[13px] font-semibold text-[var(--violet-text)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[16px] leading-[1.65] text-text-secondary">{lesson}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
