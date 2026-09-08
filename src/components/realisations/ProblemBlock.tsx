import type { RealisationProblem } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Le contexte d'une realisation, sur la grille du module (max-w-[1200px]) :
 * le titre et la fiche de faits en colonne gauche, collants en desktop, le
 * recit a droite en paragraphes. `body` accepte des sauts de paragraphe
 * (`\n\n`) : le premier paragraphe est compose en accroche, les suivants en
 * texte courant. Un body sans saut reste un seul paragraphe, comme avant.
 */
export function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function ProblemBlock({ problem, lang = 'fr' }: { problem: RealisationProblem; lang?: Locale }) {
  const paragraphs = splitParagraphs(problem.body)
  return (
    <section id="contexte" className="scroll-mt-[124px] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-[140px]">
              <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                {lang === 'en' ? 'The context' : 'Le contexte'}
              </h2>
              <h3 className="mt-3 text-xl leading-snug text-violet-300">{problem.title}</h3>

              {problem.facts && problem.facts.length > 0 && (
                <dl className="mt-8 divide-y divide-border border-y border-border">
                  {problem.facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[112px_1fr] gap-4 py-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted pt-0.5">
                        {f.label}
                      </dt>
                      <dd className="text-[15px] leading-[1.5] text-text">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-[19px] leading-[1.6] text-text md:text-[21px]'
                    : 'mt-5 text-[17px] leading-[1.7] text-text-secondary md:text-lg'
                }
              >
                {p}
              </p>
            ))}

            {problem.illustration && (
              <figure className="mt-12">
                <img
                  src={problem.illustration.src}
                  alt={problem.illustration.alt}
                  loading="lazy"
                  className="rounded-xl border border-border"
                />
                {problem.illustration.caption && (
                  <figcaption className="mt-3 text-sm italic text-text-muted">
                    {problem.illustration.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
