'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Info } from 'lucide-react'
import { violet, orange } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Maquette animée d'une conversation qui se termine par une carte sponsorisée.
 *
 * Interface volontairement générique : aucun logo OpenAI ou ChatGPT, aucune
 * reproduction au pixel. Ce qu'elle illustre vient de la fiche du 10.09.2026 :
 * la carte s'affiche sous la fin de la réponse, étiquetée, séparée, avec nom
 * de l'annonceur, favicon, titre, texte, image et lien. Le studio de yoga est
 * une entreprise fictive.
 *
 * Séquence en boucle (phase 0 à 6), figée sur l'état final si l'utilisateur
 * préfère réduire les animations.
 */

const V = violet.color
const VB = violet.bg
const VD = violet.border

type Copy = {
  window: string
  plan: string
  user: string
  intro: string
  bullets: string[]
  sponsored: string
  advertiser: string
  title: string
  text: string
  why: string
  chipTop: string
  chipBottom: string
  caption: string
}

const COPY: Record<Locale, Copy> = {
  fr: {
    window: 'Conversation',
    plan: 'Forfait Free',
    user: 'Je cherche un cours de yoga le soir à Genève, plutôt vers les Eaux-Vives.',
    intro: 'Pour un cours du soir, trois critères comptent :',
    bullets: [
      'Un studio à moins de dix minutes de chez vous, sinon vous n\'irez pas',
      'Un premier cours d\'essai pour tester le prof et le niveau',
      'Des horaires après 18h30 en semaine',
    ],
    sponsored: 'Sponsorisé',
    advertiser: 'Studio Ancre · Eaux-Vives',
    title: 'Yoga du soir dès 18h45, séance d\'essai offerte',
    text: 'À cinq minutes de la gare des Eaux-Vives. Petits groupes, tapis fournis, réservation en ligne.',
    why: 'Pourquoi cette annonce ?',
    chipTop: 'Sous la réponse, séparée et étiquetée',
    chipBottom: 'La conversation n\'est jamais transmise à l\'annonceur',
    caption: 'Maquette illustrative, interface générique. Studio Ancre est une entreprise fictive.',
  },
  en: {
    window: 'Conversation',
    plan: 'Free plan',
    user: 'I\'m looking for an evening yoga class in Geneva, ideally around Eaux-Vives.',
    intro: 'For an evening class, three things matter:',
    bullets: [
      'A studio less than ten minutes from home, or you won\'t go',
      'A trial class to test the teacher and the level',
      'Weekday sessions after 6:30 pm',
    ],
    sponsored: 'Sponsored',
    advertiser: 'Studio Ancre · Eaux-Vives',
    title: 'Evening yoga from 6:45 pm, free trial class',
    text: 'Five minutes from Eaux-Vives station. Small groups, mats provided, online booking.',
    why: 'Why this ad?',
    chipTop: 'Below the answer, separate and labelled',
    chipBottom: 'The conversation is never shared with the advertiser',
    caption: 'Illustrative mock-up, generic interface. Studio Ancre is a fictitious business.',
  },
}

/** Instants (ms) où chaque phase démarre ; la boucle repart après la dernière. */
const TIMELINE = [0, 900, 1800, 2500, 3100, 3700, 4600]
const LOOP_MS = 11000
const FINAL_PHASE = TIMELINE.length - 1

function useSequence(active: boolean) {
  const [phase, setPhase] = useState(active ? 0 : FINAL_PHASE)
  useEffect(() => {
    if (!active) return
    let timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setPhase(0)
      timers = TIMELINE.slice(1).map((t, i) => setTimeout(() => setPhase(i + 1), t))
      timers.push(setTimeout(run, LOOP_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [active])
  return phase
}

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
}

export function ChatMockHero({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  const reduced = useReducedMotion()
  const phase = useSequence(!reduced)

  return (
    <div className="relative">
      <div
        className="rounded-[16px] overflow-hidden"
        // Fond opaque dans les deux thèmes : la maquette reste un « appareil sombre » en mode clair (cf. BrowserFrame).
        style={{ background: '#0E0E10', border: `1px solid ${VD}`, boxShadow: '0 0 60px rgba(124,58,237,0.16)' }}
      >
        {/* Barre de fenêtre générique */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
            </span>
            <span className="text-[10px] text-white/45 font-mono">{t.window}</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white/60" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {t.plan}
          </span>
        </div>

        <div className="p-4 md:p-5 min-h-[380px] flex flex-col gap-3" aria-live="off">
          {/* Message utilisateur */}
          <AnimatePresence>
            {phase >= 0 && (
              <m.div key="user" {...fade} className="self-end max-w-[85%]">
                <p className="text-[13px] leading-relaxed text-white rounded-[14px] rounded-br-[4px] px-3.5 py-2.5" style={{ background: 'rgba(124,58,237,0.28)', border: `1px solid ${VD}` }}>
                  {t.user}
                </p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Indicateur de frappe */}
          <AnimatePresence>
            {phase === 1 && (
              <m.div key="typing" {...fade} className="flex items-center gap-1 px-1 h-5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <m.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </m.div>
            )}
          </AnimatePresence>

          {/* Réponse */}
          <div className="max-w-[92%] space-y-2">
            <AnimatePresence>
              {phase >= 2 && (
                <m.p key="intro" {...fade} className="text-[13px] leading-relaxed text-white/85">
                  {t.intro}
                </m.p>
              )}
            </AnimatePresence>
            <ul className="space-y-1.5 list-none m-0 p-0">
              <AnimatePresence>
                {t.bullets.map((b, i) =>
                  phase >= 3 + i ? (
                    <m.li key={b} {...fade} className="flex gap-2 text-[12.5px] leading-relaxed text-white/75">
                      <span className="mt-[7px] h-1 w-1 rounded-full bg-white/40 flex-shrink-0" aria-hidden="true" />
                      <span>{b}</span>
                    </m.li>
                  ) : null,
                )}
              </AnimatePresence>
            </ul>
          </div>

          {/* Carte sponsorisée, séparée de la réponse */}
          <div className="mt-auto pt-3">
            <AnimatePresence>
              {phase >= FINAL_PHASE && (
                <m.div key="ad" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
                  <div className="h-px w-full bg-white/8 mb-3" aria-hidden="true" />
                  <div className="rounded-[12px] p-3" style={{ background: VB, border: `1px solid ${VD}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: V }}>{t.sponsored}</span>
                      <span className="text-white/25 text-[10px]" aria-hidden="true">·</span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/60">
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] font-bold text-black" style={{ background: V }} aria-hidden="true">S</span>
                        {t.advertiser}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div
                        className="h-14 w-14 rounded-[8px] flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${V} 0%, rgba(124,58,237,0.35) 60%, ${orange.color} 140%)` }}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-white leading-snug">{t.title}</p>
                        <p className="text-[11.5px] text-white/65 leading-relaxed mt-1">{t.text}</p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0" style={{ background: V }} aria-hidden="true">
                        <ArrowUpRight size={14} className="text-black" />
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-[10px] text-white/40 mt-2">
                      <Info size={10} aria-hidden="true" /> {t.why}
                    </p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Repères flottants (desktop) */}
      <div className="absolute -right-3 top-6 rotate-1 hidden lg:block">
        <p
          className="text-[10px] font-semibold text-white/80 rounded-lg px-3 py-2 max-w-[200px] leading-snug"
          style={{ background: 'rgba(0,0,0,0.9)', border: `1px solid ${VD}`, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          {t.chipTop}
        </p>
      </div>
      <div className="absolute -left-4 bottom-14 -rotate-2 hidden lg:block">
        <p
          className="text-[10px] font-semibold text-white/80 rounded-lg px-3 py-2 max-w-[210px] leading-snug"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        >
          {t.chipBottom}
        </p>
      </div>

      <p className="text-text-muted text-[10px] mt-3 text-center">{t.caption}</p>
    </div>
  )
}
