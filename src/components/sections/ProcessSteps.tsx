import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

const STEPS = [
  {
    number: '01',
    icon: '💬',
    title: 'Premier échange',
    description:
      '15 minutes gratuites pour comprendre votre situation. On vous dit honnêtement si on peut vous aider et comment.',
  },
  {
    number: '02',
    icon: '🔍',
    title: 'Diagnostic',
    description:
      'Analyse de votre présence digitale, de vos concurrents, de vos objectifs. Un diagnostic complet, sans bullshit.',
  },
  {
    number: '03',
    icon: '📋',
    title: 'Proposition',
    description:
      "Un plan d'action concret avec les livrables, les délais et les prix. Pas de surprise, pas de mauvaise surprise.",
  },
  {
    number: '04',
    icon: '⚡',
    title: 'Réalisation',
    description:
      "On exécute. Points hebdomadaires, accès en temps réel à l'avancement. Vous restez maître du projet.",
  },
  {
    number: '05',
    icon: '📈',
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
                    <div className="w-20 h-20 rounded-full bg-bg-card border border-border flex items-center justify-center text-2xl relative z-10">
                      <span aria-hidden="true">{step.icon}</span>
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold text-violet-light bg-bg border border-border rounded-full w-6 h-6 flex items-center justify-center">
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
