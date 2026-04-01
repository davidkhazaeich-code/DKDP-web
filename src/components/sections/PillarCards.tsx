import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { Badge } from '@/components/ui/Badge'

const PILLARS = [
  {
    badge: 'Agence',
    href: '/agence-digitale',
    title: 'Agence Digitale',
    description:
      'Un site qui convertit, un SEO qui ramène des clients, une stratégie qui tient la route.',
    services: ['Site web sur mesure', 'Référencement SEO', 'Google Ads', 'Réseaux sociaux'],
    cta: "Découvrir l'agence",
  },
  {
    badge: 'IA',
    href: '/intelligence-artificielle',
    title: 'Intelligence Artificielle',
    description: "Automatisez ce qui vous ralentit. Déployez l'IA là où ça compte.",
    services: ['Agents IA sur mesure', 'Automatisation', 'ChatGPT / Claude', 'Audit IA gratuit'],
    cta: "Explorer l'IA",
  },
  {
    badge: 'Formation',
    href: '/formation-entreprise',
    title: 'Formation Entreprise',
    description: "Des équipes formées = une entreprise qui avance 2x plus vite.",
    services: ['Formation IA', 'Excel & bureautique', 'Cybersécurité', 'Sur mesure'],
    cta: 'Voir les formations',
  },
] as const

export function PillarCards() {
  return (
    <section aria-labelledby="pillars-heading" className="py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <GradTag className="mb-6">Nos 3 piliers</GradTag>
            <h2 id="pillars-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em]">
              Trois expertises, un seul interlocuteur.
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <SectionReveal key={pillar.href} delay={i * 0.15}>
              <div className="grad-border bg-bg rounded-[12px] p-8 flex flex-col h-full group hover:translate-y-[-2px] transition-transform duration-300">
                <Badge className="mb-4 w-fit">{pillar.badge}</Badge>
                <h3 className="text-white text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed flex-1">{pillar.description}</p>
                <ul className="space-y-2 mb-8">
                  {pillar.services.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-text-muted text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-light flex-shrink-0" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pillar.href}
                  className="text-violet-light text-sm font-semibold hover-grad-text transition-transform group-hover:translate-x-1 duration-[150ms] inline-flex items-center gap-1"
                >
                  {pillar.cta}<span aria-hidden="true"> →</span>
                </Link>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
