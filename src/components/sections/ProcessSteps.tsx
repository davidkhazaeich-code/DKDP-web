import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

function IconChat() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M4 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8l-5 4V6Z"
        stroke="#A78BFA"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="9" y1="10" x2="19" y2="10" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="9" y1="14" x2="15" y2="14" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="#A78BFA" strokeWidth="1.6" fill="none" />
      <line x1="17.5" y1="17.5" x2="24" y2="24" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="12" x2="15" y2="12" stroke="#A78BFA" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="12" y1="9" x2="12" y2="15" stroke="#A78BFA" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="18" height="22" rx="2" stroke="#A78BFA" strokeWidth="1.6" fill="none" />
      <path d="M10 5a2 2 0 0 1 4 0" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <line x1="9" y1="13" x2="19" y2="13" stroke="#A78BFA" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9" y1="17" x2="19" y2="17" stroke="#A78BFA" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9" y1="21" x2="14" y2="21" stroke="#A78BFA" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconLightning() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M16 3 L8 16 h6 L12 25 L22 12 h-6 Z"
        stroke="#FF6B00"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="rgba(255,107,0,0.12)"
      />
    </svg>
  )
}

function IconTrendUp() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polyline
        points="3,22 9,14 15,18 24,7"
        stroke="#FF6B00"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="19,7 24,7 24,12"
        stroke="#FF6B00"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="3" y1="25" x2="25" y2="25" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

const STEPS = [
  {
    number: '01',
    Icon: IconChat,
    title: 'Premier échange',
    description:
      '15 minutes gratuites pour comprendre votre situation. On vous dit honnêtement si on peut vous aider et comment.',
  },
  {
    number: '02',
    Icon: IconSearch,
    title: 'Diagnostic',
    description:
      'Analyse de votre présence digitale, de vos concurrents, de vos objectifs. Un diagnostic complet, sans bullshit.',
  },
  {
    number: '03',
    Icon: IconClipboard,
    title: 'Proposition',
    description:
      "Un plan d'action concret avec les livrables, les délais et les prix. Pas de surprise, pas de mauvaise surprise.",
  },
  {
    number: '04',
    Icon: IconLightning,
    title: 'Réalisation',
    description:
      "On exécute. Points hebdomadaires, accès en temps réel à l'avancement. Vous restez maître du projet.",
  },
  {
    number: '05',
    Icon: IconTrendUp,
    title: 'Résultats & Suivi',
    description:
      "Livraison, formation à l'outil si nécessaire, et suivi des performances. On reste là même après.",
  },
] as const

export function ProcessSteps() {
  return (
    <section aria-labelledby="process-heading" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <GradTag className="mb-6">Notre méthode</GradTag>
            <h2 id="process-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-4">
              Comment ça marche
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              5 étapes claires, un processus éprouvé sur 150+ projets.
            </p>
          </div>
        </SectionReveal>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-4">
            {STEPS.map((step, i) => (
              <SectionReveal key={step.number} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-bg-card border border-border flex items-center justify-center relative z-10">
                      <step.Icon />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 z-20 text-[10px] font-bold text-violet-light bg-bg border border-border rounded-full w-6 h-6 flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{step.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
