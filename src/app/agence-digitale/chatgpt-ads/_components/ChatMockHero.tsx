'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Info } from 'lucide-react'
import { violet, orange } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Maquette animée d'une conversation qui se termine par une carte sponsorisée,
 * déclinée en cinq scénarios qui tournent (demande de David du 10.09.2026 :
 * Pilates, pizzeria, deux autres B2C, un B2B). Les onglets sont de vrais
 * boutons avec des libellés en clair : c'est du texte indexable qui nomme les
 * secteurs et les quartiers, pas seulement une animation.
 *
 * Interface volontairement générique : aucun logo OpenAI ou ChatGPT, aucune
 * reproduction au pixel. Ce qu'elle illustre vient de la fiche du 10.09.2026 :
 * la carte s'affiche sous la fin de la réponse, étiquetée, séparée, avec nom
 * de l'annonceur, favicon, titre, texte, image et lien. Toutes les entreprises
 * sont fictives.
 *
 * Séquence par scénario (phase 0 à 6), puis passage au suivant. Figée sur
 * l'état final si l'utilisateur préfère réduire les animations ; les onglets
 * restent utilisables.
 */

const V = violet.color
const VB = violet.bg
const VD = violet.border

type Scenario = {
  id: string
  tab: string
  kind: 'B2C' | 'B2B'
  user: string
  intro: string
  bullets: string[]
  advertiser: string
  initial: string
  title: string
  text: string
}

type Copy = {
  window: string
  plan: string
  sponsored: string
  why: string
  chipTop: string
  chipBottom: string
  caption: string
  tablist: string
}

const SCENARIOS: Record<Locale, Scenario[]> = {
  fr: [
    {
      id: 'pilates',
      tab: 'Studio de Pilates',
      kind: 'B2C',
      user: 'Je cherche un cours de Pilates le soir à Genève, plutôt vers les Eaux-Vives.',
      intro: 'Pour un cours du soir, trois critères comptent :',
      bullets: [
        'Un studio à moins de dix minutes de chez vous, sinon vous n\'irez pas',
        'Un premier cours d\'essai pour tester le prof et le niveau',
        'Des horaires après 18h30 en semaine',
      ],
      advertiser: 'Studio Ancre · Eaux-Vives',
      initial: 'S',
      title: 'Pilates du soir dès 18h45, séance d\'essai offerte',
      text: 'À cinq minutes de la gare des Eaux-Vives. Petits groupes de huit, reformer et tapis, réservation en ligne.',
    },
    {
      id: 'pizzeria',
      tab: 'Pizzeria',
      kind: 'B2C',
      user: 'On est six ce soir vers Plainpalais, une bonne pizzeria qui prend les réservations ?',
      intro: 'Pour une table de six un soir de semaine, regardez :',
      bullets: [
        'Si la réservation se fait en ligne, pour ne pas appeler pendant le coup de feu',
        'Une pâte à fermentation longue, qui se digère mieux',
        'Un four à bois, le signe d\'une vraie cuisson',
      ],
      advertiser: 'Fornello · Plainpalais',
      initial: 'F',
      title: 'Table pour six ce soir, pâte au levain 48 h',
      text: 'Four à bois, réservation en ligne en trente secondes, à trois minutes de la place du Cirque.',
    },
    {
      id: 'concept-store',
      tab: 'Concept store',
      kind: 'B2C',
      user: 'Une idée de cadeau pour ma sœur, budget 80 francs, livré à Lausanne avant samedi ?',
      intro: 'Avec ce budget et ce délai, trois pistes :',
      bullets: [
        'Un objet fait en Suisse romande, plus personnel qu\'un bon d\'achat',
        'Une boutique qui livre en 24 h, pour tenir samedi',
        'Un emballage cadeau compris, ça évite une course de plus',
      ],
      advertiser: 'Atelier Marelle · concept store genevois',
      initial: 'M',
      title: 'Cadeaux de créateurs romands dès 45 francs, livrés en 24 h',
      text: 'Céramique, papeterie, bijoux d\'ateliers genevois. Emballage cadeau offert, livraison dans toute la Suisse romande.',
    },
    {
      id: 'langues',
      tab: 'École de langues',
      kind: 'B2C',
      user: 'Je dois passer un entretien en anglais dans un mois, des cours du soir à Lausanne ?',
      intro: 'Pour progresser en un mois, cherchez :',
      bullets: [
        'Des cours axés sur l\'oral, pas sur la grammaire',
        'De petits groupes ou des séances individuelles',
        'Un test de niveau gratuit avant de vous engager',
      ],
      advertiser: 'Lingua Léman · Lausanne-Flon',
      initial: 'L',
      title: 'Anglais professionnel en 4 semaines, test de niveau offert',
      text: 'Cours du soir au Flon, simulations d\'entretien, groupes de six maximum. Première séance sans engagement.',
    },
    {
      id: 'nettoyage',
      tab: 'Nettoyage de bureaux',
      kind: 'B2B',
      user: 'Je cherche une entreprise de nettoyage pour nos bureaux à Carouge, 300 m², trois passages par semaine.',
      intro: 'Pour des locaux professionnels, vérifiez :',
      bullets: [
        'Un devis établi après une visite, pas au téléphone',
        'Des passages tôt le matin ou le soir, hors présence des équipes',
        'Une équipe stable, la même personne chaque semaine',
      ],
      advertiser: 'Propreté Rhône · Genève',
      initial: 'P',
      title: 'Nettoyage de bureaux à Carouge, devis après visite sous 48 h',
      text: 'Passages avant 7h ou après 18h, équipe fixe, produits certifiés. Contrats mensuels sans engagement.',
    },
  ],
  en: [
    {
      id: 'pilates',
      tab: 'Pilates studio',
      kind: 'B2C',
      user: 'I\'m looking for an evening Pilates class in Geneva, ideally around Eaux-Vives.',
      intro: 'For an evening class, three things matter:',
      bullets: [
        'A studio less than ten minutes from home, or you won\'t go',
        'A trial class to test the teacher and the level',
        'Weekday sessions after 6:30 pm',
      ],
      advertiser: 'Studio Ancre · Eaux-Vives',
      initial: 'S',
      title: 'Evening Pilates from 6:45 pm, free trial class',
      text: 'Five minutes from Eaux-Vives station. Groups of eight, reformer and mat, online booking.',
    },
    {
      id: 'pizzeria',
      tab: 'Pizzeria',
      kind: 'B2C',
      user: 'Six of us tonight near Plainpalais, a good pizzeria that takes bookings?',
      intro: 'For a table of six on a weeknight, look for:',
      bullets: [
        'Online booking, so you don\'t call during the rush',
        'A long-fermented dough, easier to digest',
        'A wood-fired oven, the sign of a proper bake',
      ],
      advertiser: 'Fornello · Plainpalais',
      initial: 'F',
      title: 'Table for six tonight, 48-hour sourdough base',
      text: 'Wood-fired oven, online booking in thirty seconds, three minutes from Place du Cirque.',
    },
    {
      id: 'concept-store',
      tab: 'Concept store',
      kind: 'B2C',
      user: 'A gift idea for my sister, 80 francs budget, delivered to Lausanne before Saturday?',
      intro: 'With that budget and deadline, three options:',
      bullets: [
        'Something made in French-speaking Switzerland, more personal than a voucher',
        'A shop that delivers within 24 hours, to make Saturday',
        'Gift wrapping included, one less errand',
      ],
      advertiser: 'Atelier Marelle · Geneva concept store',
      initial: 'M',
      title: 'Gifts by Swiss-French makers from 45 francs, delivered in 24 h',
      text: 'Ceramics, stationery, jewellery from Geneva workshops. Free gift wrapping, delivery across French-speaking Switzerland.',
    },
    {
      id: 'langues',
      tab: 'Language school',
      kind: 'B2C',
      user: 'I have a job interview in English in a month, any evening classes in Lausanne?',
      intro: 'To improve in a month, look for:',
      bullets: [
        'Classes built around speaking, not grammar',
        'Small groups or one-to-one sessions',
        'A free level test before you commit',
      ],
      advertiser: 'Lingua Léman · Lausanne-Flon',
      initial: 'L',
      title: 'Business English in 4 weeks, free level test',
      text: 'Evening classes at the Flon, mock interviews, groups of six at most. First session without commitment.',
    },
    {
      id: 'nettoyage',
      tab: 'Office cleaning',
      kind: 'B2B',
      user: 'I need a cleaning company for our offices in Carouge, 300 m², three visits a week.',
      intro: 'For business premises, check:',
      bullets: [
        'A quote made after a site visit, not over the phone',
        'Early-morning or evening visits, when the team is out',
        'A stable crew, the same person every week',
      ],
      advertiser: 'Propreté Rhône · Geneva',
      initial: 'P',
      title: 'Office cleaning in Carouge, quote within 48 h after a visit',
      text: 'Visits before 7 am or after 6 pm, fixed crew, certified products. Monthly contracts, no lock-in.',
    },
  ],
}

const COPY: Record<Locale, Copy> = {
  fr: {
    window: 'Conversation',
    plan: 'Forfait Free',
    sponsored: 'Sponsorisé',
    why: 'Pourquoi cette annonce ?',
    chipTop: 'Sous la réponse, séparée et étiquetée',
    chipBottom: 'La conversation n\'est jamais transmise à l\'annonceur',
    caption: 'Maquette illustrative, interface générique. Les entreprises citées sont fictives.',
    tablist: 'Exemples de cartes sponsorisées par secteur',
  },
  en: {
    window: 'Conversation',
    plan: 'Free plan',
    sponsored: 'Sponsored',
    why: 'Why this ad?',
    chipTop: 'Below the answer, separate and labelled',
    chipBottom: 'The conversation is never shared with the advertiser',
    caption: 'Illustrative mock-up, generic interface. All businesses shown are fictitious.',
    tablist: 'Examples of sponsored cards by industry',
  },
}

/** Instants (ms) où chaque phase démarre ; le scénario suivant part après SCENARIO_MS. */
const TIMELINE = [0, 900, 1800, 2500, 3100, 3700, 4600]
const SCENARIO_MS = 9800
const FINAL_PHASE = TIMELINE.length - 1

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
}

export function ChatMockHero({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  const scenarios = SCENARIOS[lang]
  const reduced = useReducedMotion() === true
  // Scénario actif et phase dans un seul état : la phase ne change que dans
  // les minuteurs ou au clic, jamais de setState synchrone dans l'effet.
  const [state, setState] = useState({ active: 0, phase: 0 })
  const count = scenarios.length
  const active = state.active
  const phase = reduced ? FINAL_PHASE : state.phase
  const s = scenarios[active]
  const setActive = (i: number) => setState({ active: i, phase: 0 })

  useEffect(() => {
    if (reduced) return
    const timers = TIMELINE.slice(1).map((ms, i) =>
      setTimeout(() => setState((prev) => ({ ...prev, phase: i + 1 })), ms),
    )
    timers.push(setTimeout(() => setState((prev) => ({ active: (prev.active + 1) % count, phase: 0 })), SCENARIO_MS))
    return () => timers.forEach(clearTimeout)
  }, [active, reduced, count])

  return (
    <div className="relative">
      {/* Onglets : un par scénario, vrais boutons et vrai texte */}
      <div
        role="tablist"
        aria-label={t.tablist}
        className="flex gap-1.5 mb-3 overflow-x-auto pb-1 -mx-1 px-1 lg:flex-wrap lg:overflow-visible"
        style={{ scrollbarWidth: 'none' }}
      >
        {scenarios.map((sc, i) => {
          const isActive = i === active
          return (
            <button
              key={sc.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`chat-mock-${sc.id}`}
              onClick={() => setActive(i)}
              className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors"
              style={{
                background: isActive ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? 'rgba(124,58,237,0.5)' : 'var(--border)'}`,
                color: isActive ? V : 'var(--text-secondary)',
              }}
            >
              {sc.tab}
              <span
                className="text-[9px] font-bold tracking-wide rounded px-1 py-px"
                style={{
                  color: sc.kind === 'B2B' ? orange.color : isActive ? V : 'var(--text-muted)',
                  background: sc.kind === 'B2B' ? orange.bg : 'transparent',
                }}
              >
                {sc.kind}
              </span>
            </button>
          )
        })}
      </div>

      <div
        id={`chat-mock-${s.id}`}
        role="tabpanel"
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

        <div className="p-4 md:p-5 min-h-[400px] flex flex-col gap-3" aria-live="off">
          {/* Message utilisateur */}
          <AnimatePresence mode="wait">
            {phase >= 0 && (
              <m.div key={`${s.id}-user`} {...fade} className="self-end max-w-[85%]">
                <p className="text-[13px] leading-relaxed text-white rounded-[14px] rounded-br-[4px] px-3.5 py-2.5" style={{ background: 'rgba(124,58,237,0.28)', border: `1px solid ${VD}` }}>
                  {s.user}
                </p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Indicateur de frappe */}
          <AnimatePresence>
            {phase === 1 && (
              <m.div key={`${s.id}-typing`} {...fade} className="flex items-center gap-1 px-1 h-5" aria-hidden="true">
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
                <m.p key={`${s.id}-intro`} {...fade} className="text-[13px] leading-relaxed text-white/85">
                  {s.intro}
                </m.p>
              )}
            </AnimatePresence>
            <ul className="space-y-1.5 list-none m-0 p-0">
              <AnimatePresence>
                {s.bullets.map((b, i) =>
                  phase >= 3 + i ? (
                    <m.li key={`${s.id}-b${i}`} {...fade} className="flex gap-2 text-[12.5px] leading-relaxed text-white/75">
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
                <m.div key={`${s.id}-ad`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
                  <div className="h-px w-full bg-white/8 mb-3" aria-hidden="true" />
                  <div className="rounded-[12px] p-3" style={{ background: VB, border: `1px solid ${VD}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: V }}>{t.sponsored}</span>
                      <span className="text-white/25 text-[10px]" aria-hidden="true">·</span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/60">
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] font-bold text-black" style={{ background: V }} aria-hidden="true">{s.initial}</span>
                        {s.advertiser}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div
                        className="h-14 w-14 rounded-[8px] flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${V} 0%, rgba(124,58,237,0.35) 60%, ${orange.color} 140%)` }}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-white leading-snug">{s.title}</p>
                        <p className="text-[11.5px] text-white/65 leading-relaxed mt-1">{s.text}</p>
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
      <div className="absolute -right-3 top-16 rotate-1 hidden lg:block">
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
