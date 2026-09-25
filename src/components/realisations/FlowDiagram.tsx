import { SectionReveal } from '@/components/ui/SectionReveal'
import type { FlowStepKind, RealisationFlow } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Schema de flux d'une realisation : ce que devient une donnee, etape par
 * etape. Il rend visible un projet qui n'a pas d'ecran a capturer
 * (automatisation, CRM, chatbot). Liste ordonnee en HTML, pas en image : les
 * libelles restent lisibles par Google, par un moteur generatif et par un
 * lecteur d'ecran. En ligne sur desktop, en colonne sur mobile.
 *
 * Mouvement (v3) : les etapes entrent l'une apres l'autre, et une impulsion
 * parcourt chaque liaison dans le sens du flux. Avec `prefers-reduced-motion`,
 * tout est affiche d'emblee et l'impulsion disparait (globals.css).
 */
const KIND_LABEL: Record<Locale, Record<FlowStepKind, string>> = {
  fr: { source: 'Entrée', ia: 'IA', outil: 'Outil', controle: 'Règle', sortie: 'Sortie' },
  en: { source: 'Input', ia: 'AI', outil: 'Tool', controle: 'Rule', sortie: 'Output' },
}

function Connector({ index }: { index: number }) {
  return (
    <span aria-hidden="true" className="flow-link" style={{ '--flow-delay': `${index * 0.45}s` } as React.CSSProperties}>
      <span className="flow-pulse" />
    </span>
  )
}

export function FlowDiagram({ flow, lang = 'fr' }: { flow: RealisationFlow; lang?: Locale }) {
  const en = lang === 'en'
  const n = flow.steps.length
  return (
    <section id="flux" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[68ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
            {en ? 'How it flows' : 'Le flux'}
          </h2>
          <h3 className="mt-3 text-xl leading-snug text-[var(--violet-text)]">{flow.title}</h3>
          {flow.intro && <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary">{flow.intro}</p>}
        </div>

        <ol className="mt-12 flex flex-col md:flex-row md:items-stretch">
          {flow.steps.map((step, i) => {
            const isAi = step.kind === 'ia'
            const isOutput = step.kind === 'sortie'
            return (
              <li key={step.label} className="flex flex-col md:flex-1 md:flex-row md:items-center">
                <SectionReveal delay={i * 0.12} className="flex h-full flex-1">
                  <div
                    className="relative flex h-full flex-1 flex-col overflow-hidden rounded-2xl border p-5"
                    style={{
                      background: isAi || isOutput ? 'var(--violet-bg)' : 'var(--bg-card)',
                      borderColor: isAi || isOutput ? 'var(--violet-border)' : 'var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[11px] font-semibold"
                        style={{
                          background: 'var(--violet-bg)',
                          borderColor: 'var(--violet-border)',
                          color: 'var(--violet-text)',
                        }}
                      >
                        {i + 1}
                      </span>
                      {step.kind && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                          {KIND_LABEL[lang][step.kind]}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-[16px] font-semibold leading-snug text-text">{step.label}</p>
                    {step.detail && (
                      <p className="mt-1.5 text-[14px] leading-[1.5] text-text-secondary">{step.detail}</p>
                    )}
                  </div>
                </SectionReveal>
                {i < n - 1 && <Connector index={i} />}
              </li>
            )
          })}
        </ol>

        {flow.note && (
          <p className="mt-6 max-w-[80ch] text-sm leading-[1.6] text-text-muted">{flow.note}</p>
        )}
      </div>
    </section>
  )
}
