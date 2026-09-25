import Link from 'next/link'
import { BrainCircuit, MessageSquare, Clock, MapPin, Wallet, FileCheck, ChevronRight, Send } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { ClaudeIcon } from '@/components/icons/ClaudeIcon'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { orange } from '@/lib/tokens'
import { PRIX, chfHeure } from '@/data/pricing'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'

/**
 * Accueil : les formations IA visibles sans clic (25/09/2026, demande David :
 * « mettre en avant les formations et tout ce qui touche à l'IA »).
 *
 * Avant, les formations n'apparaissaient qu'après un clic sur le pilier
 * « Formation » d'AllServices. Chaque fait écrit ici se vérifie sur la page
 * visée (formats 3 h / 6 h, déplacement dans vos locaux, attestation) et les
 * prix viennent de `PRIX`, jamais en dur. Aucun chiffre de gain de temps :
 * le plan SEO du 21/09 n'admet aucun chiffre non sourcé.
 */

const OR = orange.color
const ORB = orange.bg
const ORD = orange.border

const CARD_META = [
  { href: '/formation-entreprise/ia', Icon: BrainCircuit },
  { href: '/formation-entreprise/claude-ai', Icon: ClaudeIcon },
  { href: '/formation-entreprise/chatgpt', Icon: MessageSquare },
] as const

const FACT_ICONS = [Clock, MapPin, Wallet, FileCheck] as const

const BRIDGE_HREFS = [
  '/intelligence-artificielle/audit-conseil',
  '/intelligence-artificielle/agents-ia',
  '/intelligence-artificielle/automatisation',
  '/intelligence-artificielle/chatbot-ia',
] as const

const CONTENT = {
  fr: {
    tag: 'Formations IA',
    headingA: "Vos équipes apprennent l'IA",
    headingB: 'sur leurs propres dossiers.',
    intro:
      "Chaque programme part de vos documents, de vos outils et de vos cas réels. Vos collaborateurs repartent donc avec leurs propres prompts, des assistants prêts à l'emploi et une méthode qu'ils réutilisent au quotidien.",
    cards: [
      {
        title: 'Formation IA entreprise',
        desc: "Le socle commun pour toute l'équipe : formuler une demande claire, travailler sur ses documents et fixer les règles de confidentialité.",
        points: ['ChatGPT Astra, Claude ou Copilot selon vos licences', 'Cas pratiques tirés de votre métier', 'Bonnes pratiques de confidentialité (nLPD)'],
      },
      {
        title: 'Formation Claude IA',
        desc: "Claude.ai et les Projects partagés, pour les équipes qui veulent aller plus loin qu'une simple conversation.",
        points: ["Espace d'équipe construit en séance", 'Analyse de documents longs', 'Claude Code en module optionnel'],
      },
      {
        title: 'Formation ChatGPT',
        desc: 'ChatGPT Astra, ChatGPT Work et les GPTs, avec des exercices sur les tâches qui reviennent chaque semaine.',
        points: ['GPTs et Projects pour vos tâches récurrentes', 'Travail en équipe dans ChatGPT Work', 'Codex pour les profils techniques'],
      },
    ],
    seeProgramme: 'Voir le programme',
    facts: [
      'Demi-journée de 3 h ou journée de 6 h',
      'Dans vos locaux en Suisse romande ou en visio',
      `Dès ${chfHeure(PRIX.formationHourly1)} pour une personne, groupes sur devis`,
      'Attestation individuelle pour chaque participant',
    ],
    cta: 'Demander un programme',
    allTrainings: 'Voir toutes les formations',
    bridgeTitle: 'Et après la formation ?',
    bridgeText:
      "Nous pouvons ensuite construire avec vous les outils qui s'appuient sur ce que l'équipe a appris, en commençant par un audit qui chiffre les priorités.",
    bridgeLinks: ['Audit et conseil IA', 'Agents IA sur mesure', 'Automatisation', 'Chatbot IA'],
  },
  en: {
    tag: 'AI training',
    headingA: 'Your teams learn AI',
    headingB: 'on their own work.',
    intro:
      'Every programme starts from your documents, your tools and your real cases. Your staff therefore leave with their own prompts, ready-to-use assistants and a method they reuse every day.',
    cards: [
      {
        title: 'Corporate AI training',
        desc: 'The shared foundation for the whole team: write a clear request, work on your own documents and set the confidentiality rules.',
        points: ['ChatGPT Astra, Claude or Copilot, based on your licences', 'Hands-on cases from your line of work', 'Confidentiality best practices (Swiss FADP)'],
      },
      {
        title: 'Claude AI training',
        desc: 'Claude.ai and shared Projects, for teams who want to go further than a simple chat.',
        points: ['A team workspace built during the session', 'Analysis of long documents', 'Claude Code as an optional module'],
      },
      {
        title: 'ChatGPT training',
        desc: 'ChatGPT Astra, ChatGPT Work and GPTs, with exercises on the tasks that come back every week.',
        points: ['GPTs and Projects for recurring tasks', 'Teamwork in ChatGPT Work', 'Codex for technical profiles'],
      },
    ],
    seeProgramme: 'See the programme',
    facts: [
      'Half day of 3 h or full day of 6 h',
      'At your premises in French-speaking Switzerland or by video',
      `From ${chfHeure(PRIX.formationHourly1)} for one person, groups on quote`,
      'Individual certificate of attendance for each participant',
    ],
    cta: 'Request a programme',
    allTrainings: 'See all training courses',
    bridgeTitle: 'And after the training?',
    bridgeText:
      'We can then build with you the tools that rely on what the team has learned, starting with an audit that prices the priorities.',
    bridgeLinks: ['AI audit and consulting', 'Custom AI agents', 'Automation', 'AI chatbot'],
  },
} as const

export function FormationSpotlight({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  const lp = (fr: string) => localizedPath(fr, lang)

  return (
    <section id="formations-ia" aria-labelledby="formations-ia-heading" className="py-14 sm:py-20 md:py-24 border-t border-border scroll-mt-[124px]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-14">
            <GradTag className="mb-4 sm:mb-6">{t.tag}</GradTag>
            <h2 id="formations-ia-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-4 sm:mb-6">
              {t.headingA}
              <br className="hidden sm:block" />{' '}
              <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>{t.headingB}</GradText>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.intro}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {t.cards.map((card, i) => {
            const { href, Icon } = CARD_META[i]
            return (
              <SectionReveal key={href} delay={i * 0.1} className="h-full">
                <Link
                  href={lp(href)}
                  className="group flex flex-col h-full rounded-[14px] border border-border bg-bg-card/80 p-5 sm:p-7 transition-all duration-200 hover:-translate-y-[2px] hover:border-[var(--orange-border)]"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: ORB, border: `1px solid ${ORD}` }}
                  >
                    <Icon size={18} style={{ color: OR }} />
                  </div>
                  <h3 className="text-text font-semibold text-lg leading-snug mb-2">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{card.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: OR }} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-text-secondary transition-colors group-hover:text-text">
                    {t.seeProgramme}
                    <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </SectionReveal>
            )
          })}
        </div>

        <SectionReveal>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
            {t.facts.map((fact, i) => {
              const Icon = FACT_ICONS[i]
              return (
                <li key={fact} className="flex items-center gap-3 rounded-[12px] border border-border px-4 py-3 text-sm text-text-secondary">
                  <Icon size={16} className="flex-shrink-0" style={{ color: OR }} aria-hidden="true" />
                  {fact}
                </li>
              )
            })}
          </ul>
        </SectionReveal>

        <SectionReveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-14">
            <LiquidMetalButton href={lp('/contact')} size="lg" shaderDelay={1500}>
              <Send size={15} aria-hidden="true" />
              {t.cta}
            </LiquidMetalButton>
            <Link href={lp('/formation-entreprise')} className="text-sm font-medium text-text-secondary hover:text-text transition-colors">
              {t.allTrainings}
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="rounded-[14px] border border-border bg-bg-card/60 p-5 sm:p-7 md:flex md:items-center md:justify-between md:gap-8">
            <div className="md:max-w-[560px] mb-4 md:mb-0">
              <p className="text-text font-semibold mb-1">{t.bridgeTitle}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{t.bridgeText}</p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {BRIDGE_HREFS.map((href, i) => (
                <li key={href}>
                  <Link href={lp(href)} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors">
                    {t.bridgeLinks[i]}
                    <ChevronRight size={13} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
