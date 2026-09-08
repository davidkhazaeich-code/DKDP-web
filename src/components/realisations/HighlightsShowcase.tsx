import { clsx } from 'clsx'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ScreenFrame } from './ScreenFrame'
import { PhoneFrame } from './PhoneFrame'
import type { RealisationHighlight } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Les sections phare d'une realisation, dans l'ordre ou un visiteur les
 * rencontre. Une rangee par section : la capture d'ecran d'un cote (avec la
 * vue mobile posee dessus quand elle existe), le texte de l'autre, en
 * alternance. La numerotation porte une information reelle, c'est le
 * parcours du visiteur, pas une decoration.
 *
 * Largeur : le conteneur `max-w-[1200px] px-6` du module, jamais plus. Le
 * telephone deborde du cadre desktop mais reste dans sa colonne grace au
 * padding du wrapper.
 */
function Stepper({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-y-3">
      {steps.map((label, i) => (
        <li key={label} className="flex items-center">
          <span className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] font-semibold"
              style={{
                background: 'var(--violet-bg)',
                borderColor: 'var(--violet-border)',
                color: 'var(--violet-text)',
              }}
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium text-text">{label}</span>
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="mx-3 h-px w-5 bg-border-strong/70" />
          )}
        </li>
      ))}
    </ol>
  )
}

export function HighlightsShowcase({
  items,
  host,
  lang = 'fr',
}: {
  items: RealisationHighlight[]
  host?: string
  lang?: Locale
}) {
  const t =
    lang === 'en'
      ? {
          h2: 'The sections that carry the site',
          intro: `${items.length} screens, in the order a visitor meets them. Each one answers a moment: arriving, recognising the problem, asking for help, coping with an emergency, knowing who to call.`,
        }
      : {
          h2: 'Les sections qui portent le site',
          intro: `${items.length} écrans, dans l'ordre où un visiteur les rencontre. Chacun répond à un moment précis : arriver, se reconnaître, demander, faire face à l'urgence, savoir qui appeler.`,
        }

  return (
    <section id="sections" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[68ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">{t.h2}</h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary md:text-lg">{t.intro}</p>
        </div>

        <ol className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {items.map((h, i) => {
            const flip = i % 2 === 1
            return (
              <li key={h.title}>
                <SectionReveal>
                  <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
                    <div className={clsx('md:col-span-7', flip && 'md:order-2')}>
                      <div className={clsx('relative', h.phone && 'pb-10 pr-8 sm:pr-12')}>
                        <ScreenFrame
                          src={h.image.src}
                          alt={h.image.alt}
                          host={host}
                          path={h.image.path}
                          eager={i === 0}
                        />
                        {h.phone && (
                          <PhoneFrame
                            src={h.phone.src}
                            alt={h.phone.alt}
                            className="absolute -bottom-1 right-0 w-[36%] max-w-[190px] sm:w-[32%]"
                          />
                        )}
                      </div>
                    </div>

                    <div className={clsx('md:col-span-5', flip && 'md:order-1')}>
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-text-muted">
                        <span className="font-mono text-[11px]">{String(i + 1).padStart(2, '0')}</span>
                        <span>{h.eyebrow}</span>
                        <span
                          className="rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold tracking-[0.08em]"
                          style={{
                            background: 'var(--violet-bg)',
                            borderColor: 'var(--violet-border)',
                            color: 'var(--violet-text)',
                          }}
                        >
                          {h.tag}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text md:text-[28px] md:leading-[1.2]">
                        {h.title}
                      </h3>
                      <p className="mt-4 text-[16px] leading-[1.7] text-text-secondary md:text-[17px]">{h.body}</p>
                      {h.steps && h.steps.length > 0 && <Stepper steps={h.steps} />}
                      {h.points && h.points.length > 0 && (
                        <ul className="mt-6 space-y-2.5">
                          {h.points.map((p) => (
                            <li key={p} className="flex gap-3 text-[15px] leading-[1.6] text-text-secondary">
                              <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
