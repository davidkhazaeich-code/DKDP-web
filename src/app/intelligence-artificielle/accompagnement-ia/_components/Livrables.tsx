import { CheckCircle2, FileText } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'
import { chrome, violet, green } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'
import { CONTENT } from './content'

const CH = chrome.color
const V = violet.color
const G = green.color

/**
 * Feuille de route des trois premiers mois : les colonnes se posent dans l'ordre,
 * la barre de progression traverse les trois mois, puis la bande « chaque mois »
 * ferme la séquence. Au repos (ou sans JS), tout est visible.
 */
export function Livrables({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]
  return (
    <section id="livrables" className="py-24 scroll-mt-[124px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="max-w-2xl mb-14">
            <GradTag className="mb-4">{t.livrablesTag}</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">{t.livrablesTitle}</h2>
            <p className="text-text-secondary mt-4 leading-relaxed">{t.livrablesIntro}</p>
          </div>
        </SectionReveal>

        <DiagramMotion className="relative">
          {/* Barre de progression des trois mois (desktop) */}
          <div aria-hidden="true" className="hidden md:block absolute left-0 right-0 top-[22px] h-px bg-white/10">
            <div
              className="dg-grow-x absolute inset-y-0 left-0 w-full"
              style={{ ...dg(0, 100, { '--dg-dur': '1500ms' }), background: 'linear-gradient(90deg, rgba(212,212,216,0.5), rgba(167,139,250,0.6), rgba(74,222,128,0.6))' }}
            />
          </div>

          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6" style={{ '--dg-step': '380ms' } as React.CSSProperties}>
            {t.months.map((m, i) => (
              <li key={m.label} className="dg-rise flex flex-col" style={dg(i, 200)}>
                <span
                  className="relative z-[1] inline-flex self-start items-center rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-widest mb-5"
                  style={{ background: 'var(--bg)', border: `1px solid ${i === 2 ? 'rgba(74,222,128,0.45)' : i === 1 ? 'rgba(167,139,250,0.4)' : 'rgba(212,212,216,0.3)'}`, color: i === 2 ? G : i === 1 ? V : CH }}
                >
                  {m.label}
                </span>
                <div className="flex-1 rounded-[16px] border border-border bg-bg-card p-6">
                  <h3 className="text-text font-bold text-lg leading-snug mb-4">{m.title}</h3>
                  <ul className="space-y-2.5">
                    {m.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: G }} aria-hidden="true" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="dg-rise mt-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-[16px] border p-5"
            style={{ ...dg(0, 1400), background: 'rgba(167,139,250,0.06)', borderColor: 'rgba(167,139,250,0.25)' }}
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px]" style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)' }}>
              <FileText size={20} style={{ color: V }} aria-hidden="true" />
            </span>
            <p className="text-sm text-text-secondary leading-relaxed">
              <span className="font-bold uppercase tracking-widest text-[11px] mr-2" style={{ color: V }}>{t.everyMonthLabel}</span>
              {t.everyMonth}
            </p>
          </div>
        </DiagramMotion>
      </div>
    </section>
  )
}
