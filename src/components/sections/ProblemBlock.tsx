import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradText } from '@/components/ui/GradText'
import { GradTag } from '@/components/ui/GradTag'

const PROBLEMS = [
  {
    icon: '📉',
    title: 'Votre site existe mais ne génère aucun client',
    description:
      "Il est là, il tourne, mais il ne convertit pas. Pas de leads entrants, pas d'appels spontanés, un formulaire de contact qui dort.",
  },
  {
    icon: '🤖',
    title: "Vos concurrents utilisent l'IA et vous pas encore",
    description:
      "Pendant que vos équipes font les choses manuellement, d'autres automatisent, accélèrent et réduisent leurs coûts. L'écart se creuse.",
  },
  {
    icon: '⏳',
    title: 'Vos équipes perdent du temps sur des tâches répétitives',
    description:
      "Emails, rapports, saisies, tableaux. Des heures par semaine qui partent en fumée sur des tâches que la technologie fait en 5 minutes.",
  },
]

export function ProblemBlock() {
  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <GradTag className="mb-6">Le problème</GradTag>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-6">
              Ça vous ressemble ?
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Si vous vous reconnaissez dans au moins un de ces trois scénarios, vous êtes au bon endroit.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PROBLEMS.map((problem, i) => (
            <SectionReveal key={problem.title} delay={i * 0.15}>
              <div className="bg-bg-card border border-border rounded-[12px] p-8 hover-grad h-full flex flex-col">
                <div className="text-3xl mb-5" aria-hidden="true">{problem.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {problem.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <p className="text-center text-xl md:text-2xl font-semibold">
            On résout ces trois problèmes.{' '}
            <GradText as="span">C&apos;est notre travail depuis 10 ans.</GradText>
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
