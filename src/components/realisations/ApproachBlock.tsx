import type { RealisationApproach } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'
import { splitParagraphs } from './ProblemBlock'

/**
 * L'approche, sur la meme grille que le contexte : titre a gauche, recit a
 * droite en paragraphes, puis les points livres en grille de deux colonnes
 * (une coche par point) au lieu d'une liste a puces de sept lignes.
 */
function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-[3px] h-4 w-4 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="7" opacity="0.35" />
      <path d="M5 8.2l2 2 4-4.4" />
    </svg>
  )
}

export function ApproachBlock({ approach, lang = 'fr' }: { approach: RealisationApproach; lang?: Locale }) {
  const paragraphs = splitParagraphs(approach.body)
  const en = lang === 'en'
  return (
    <section id="approche" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-[140px]">
              <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
                {en ? 'Our approach' : 'Notre approche'}
              </h2>
              <h3 className="mt-3 text-xl leading-snug text-violet-300">{approach.title}</h3>
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

            {approach.bullets && approach.bullets.length > 0 && (
              <div className="mt-10">
                <h4 className="text-xs uppercase tracking-wide text-text-muted">
                  {en ? 'What was delivered' : 'Ce qui a été livré'}
                </h4>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {approach.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 rounded-xl border border-border bg-bg-card p-4 text-[15px] leading-[1.55] text-text-secondary"
                    >
                      <span className="text-violet-400">
                        <Check />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {approach.diagramHtml && (
              <div className="mt-12" dangerouslySetInnerHTML={{ __html: approach.diagramHtml }} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
