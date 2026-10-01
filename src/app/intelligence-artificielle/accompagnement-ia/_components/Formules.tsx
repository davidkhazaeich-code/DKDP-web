import { CheckCircle2, Check, CalendarCheck } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { chrome, violet } from '@/lib/tokens'
import { ACCOMPAGNEMENT_IA_FORMULES, chf, prixAccompagnementIa } from '@/data/pricing'
import { localizedPath } from '@/i18n/slugs'
import type { Locale } from '@/i18n/config'
import { CONTENT } from './content'

const CH = chrome.color
const V = violet.color

/** Trois formules mensuelles, prix calculés depuis `PRIX` (jamais en dur). */
export function Formules({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]
  const contact = `${localizedPath('/contact', lang)}?service=intelligence-artificielle`
  return (
    <section id="formules" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-14">
            <GradTag className="mb-4">{t.formulesTag}</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">{t.formulesTitle}</h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">{t.formulesIntro}</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.formules.map((f, i) => {
            const jours = ACCOMPAGNEMENT_IA_FORMULES[f.key]
            const mise = f.recommended
            return (
              <SectionReveal key={f.key} delay={i * 0.08}>
                <div
                  className="relative flex flex-col h-full rounded-[20px] border p-7"
                  style={{
                    background: mise ? 'rgba(167,139,250,0.06)' : 'rgba(212,212,216,0.04)',
                    borderColor: mise ? 'rgba(167,139,250,0.35)' : 'rgba(212,212,216,0.15)',
                    boxShadow: mise ? '0 0 50px rgba(167,139,250,0.08)' : undefined,
                  }}
                >
                  {mise && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(167,139,250,0.15)', color: V, border: '1px solid rgba(167,139,250,0.30)' }}
                    >
                      {t.recommended}
                    </span>
                  )}
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: mise ? V : CH }}>{f.name}</p>
                  <p className="text-text-secondary text-sm leading-relaxed min-h-[44px]">{f.pitch}</p>
                  <p className="mt-5 text-4xl font-bold text-text tracking-[-0.02em]">{chf(prixAccompagnementIa(f.key))}</p>
                  <p className="text-text-muted text-sm">{t.perMonth}</p>
                  <p className="text-text-muted text-xs mt-1">
                    {t.insteadOf} {chf(prixAccompagnementIa(f.key, false))}
                    {' · '}
                    {t.daysPerMonth(jours)}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-6 mb-3" style={{ color: mise ? V : CH }}>{t.included}</p>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {f.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: mise ? V : CH }} aria-hidden="true" />
                        <span className="text-text-secondary text-sm">{it}</span>
                      </li>
                    ))}
                  </ul>
                  {mise ? (
                    <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="md">
                      <span className="inline-flex items-center gap-2"><CalendarCheck size={15} aria-hidden="true" />{t.ctaCardPrimary}</span>
                    </LiquidMetalButton>
                  ) : (
                    <LiquidMetalButton href={contact} size="md">
                      {t.ctaCardSecondary}
                    </LiquidMetalButton>
                  )}
                </div>
              </SectionReveal>
            )
          })}
        </div>

        <SectionReveal delay={0.2}>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl mx-auto border-t border-border pt-8">
            {t.conditions.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: V }} aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  )
}
