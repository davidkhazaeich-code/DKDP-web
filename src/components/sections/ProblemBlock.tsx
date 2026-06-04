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

const PROBLEM_ICONS = [IconDeclining, IconAI, IconHourglass]

const CONTENT = {
  fr: {
    tag: 'Le problème',
    heading: 'Ça vous ressemble ?',
    subtitle: 'Si vous vous reconnaissez dans au moins un de ces trois scénarios, vous êtes au bon endroit.',
    problems: [
      { title: 'Votre site existe mais ne génère aucun client', description: "Il est là, il tourne, mais il ne convertit pas. Pas de leads entrants, pas d'appels spontanés, un formulaire de contact qui dort." },
      { title: "Vos concurrents utilisent l'IA et vous pas encore", description: "Pendant que vos équipes font les choses manuellement, d'autres automatisent, accélèrent et réduisent leurs coûts. L'écart se creuse." },
      { title: 'Vos équipes perdent du temps sur des tâches répétitives', description: "Emails, rapports, saisies, tableaux. Des heures par semaine qui partent en fumée sur des tâches que la technologie fait en 5 minutes." },
    ],
    closing: 'On résout ces trois problèmes.',
    closingAccent: "C'est notre travail depuis 10 ans.",
  },
  en: {
    tag: 'The problem',
    heading: 'Sound familiar?',
    subtitle: 'If you recognise yourself in at least one of these three scenarios, you are in the right place.',
    problems: [
      { title: 'Your website exists but brings in no clients', description: "It is there, it runs, but it does not convert. No inbound leads, no spontaneous calls, a contact form gathering dust." },
      { title: 'Your competitors use AI and you do not yet', description: "While your teams do things manually, others automate, accelerate and cut their costs. The gap keeps widening." },
      { title: 'Your teams waste time on repetitive tasks', description: "Emails, reports, data entry, spreadsheets. Hours every week going up in smoke on tasks technology handles in 5 minutes." },
    ],
    closing: 'We solve these three problems.',
    closingAccent: "It has been our job for 10 years.",
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
