import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradText } from '@/components/ui/GradText'
import { GradTag } from '@/components/ui/GradTag'
import { HeroBg } from '@/components/ui/HeroBg'
import type { Locale } from '@/i18n/config'

function IconDeclining() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="rgba(255,107,0,0.10)" />
      <polyline
        points="5,10 11,16 17,12 27,22"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="22,22 27,22 27,17"
        stroke="#FF6B00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function IconAI() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="rgba(124,58,237,0.10)" />
      <circle cx="16" cy="14" r="7" stroke="#A78BFA" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="7" r="1.5" fill="#A78BFA" />
      <circle cx="23" cy="14" r="1.5" fill="#A78BFA" />
      <circle cx="9" cy="14" r="1.5" fill="#A78BFA" />
      <circle cx="16" cy="21" r="1.5" fill="#A78BFA" />
      <line x1="16" y1="10" x2="16" y2="18" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="14" x2="20" y2="14" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="21" x2="16" y2="27" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="27" x2="20" y2="27" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconHourglass() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="rgba(255,107,0,0.08)" />
      <path
        d="M9 5h14M9 27h14M10 5 L16 15 L22 5M10 27 L16 17 L22 27"
        stroke="#FF8C40"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="16" y1="15" x2="16" y2="17" stroke="#FF8C40" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5 24 Q16 22 20.5 24" stroke="#FF8C40" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// 25/09/2026 : trois problèmes IA et formation (l'accueil met la formation IA
// en avant). « Depuis 10 ans » retiré : DKDP est fondée en 2019 et le plan SEO
// du 21/09 n'admet aucun chiffre non sourcé.
const PROBLEM_ICONS = [IconAI, IconDeclining, IconHourglass]

const CONTENT = {
  fr: {
    tag: 'Le problème',
    heading: 'Ça vous ressemble ?',
    subtitle: 'Si vous vous reconnaissez dans au moins un de ces trois scénarios, vous êtes au bon endroit.',
    problems: [
      { title: "Vos équipes ont accès à l'IA, mais personne ne leur a appris à s'en servir", description: "Chacun teste ChatGPT dans son coin, les résultats déçoivent et l'outil finit par dormir. Sans méthode commune ni règles claires sur les données, l'IA reste un gadget." },
      { title: 'Vos concurrents automatisent, vous pas encore', description: "Pendant que vos équipes font tout à la main, d'autres confient déjà leurs relances, leurs rapports et leurs premières réponses clients à des agents IA. L'écart se creuse." },
      { title: 'Des heures partent chaque semaine dans des tâches répétitives', description: "Les emails, les rapports, les saisies et les tableaux occupent vos meilleurs éléments, alors qu'un assistant bien configuré en prend une grande partie en charge." },
    ],
    closing: "Nous commençons par former vos équipes,",
    closingAccent: 'puis nous outillons leur travail.',
  },
  en: {
    tag: 'The problem',
    heading: 'Sound familiar?',
    subtitle: 'If you recognise yourself in at least one of these three scenarios, you are in the right place.',
    problems: [
      { title: 'Your teams have AI tools, but nobody showed them how to use them', description: 'Everyone tries ChatGPT on their own, the results disappoint and the tool ends up unused. Without a shared method and clear rules on data, AI stays a gadget.' },
      { title: 'Your competitors automate, you do not yet', description: 'While your teams do everything by hand, others already hand their follow-ups, reports and first customer replies to AI agents. The gap keeps widening.' },
      { title: 'Hours go into repetitive tasks every week', description: 'Emails, reports, data entry and spreadsheets tie up your best people, while a well-configured assistant can take over a large part of that work.' },
    ],
    closing: 'We start by training your teams,',
    closingAccent: 'then we equip their work.',
  },
} as const

export function ProblemBlock({ lang = 'fr' }: { lang?: Locale } = {}) {
  const t = CONTENT[lang]
  return (
    <HeroBg>
      <section id="problem-section" aria-labelledby="problem-heading" className="py-14 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-10 sm:mb-16">
              <GradTag className="mb-4 sm:mb-6">{t.tag}</GradTag>
              <h2 id="problem-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-4 sm:mb-6">
                {t.heading}
              </h2>
              <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
            {PROBLEM_ICONS.map((Icon, i) => (
              <SectionReveal key={t.problems[i].title} delay={i * 0.15}>
                <div className="bg-bg-card/80 backdrop-blur-sm border border-border rounded-[12px] p-5 sm:p-8 hover-grad h-full flex flex-col">
                  <div className="mb-5">
                    <Icon />
                  </div>
                  <h3 className="text-text font-semibold text-lg mb-3 leading-snug">
                    {t.problems[i].title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    {t.problems[i].description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-center text-xl md:text-2xl font-semibold">
              {t.closing}{' '}
              <GradText as="span">{t.closingAccent}</GradText>
            </p>
          </SectionReveal>
        </div>
      </section>
    </HeroBg>
  )
}
