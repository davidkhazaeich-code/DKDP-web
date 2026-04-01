import Image from 'next/image'
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
    image: '/images/pillars/agence-digitale.webp',
    imageAlt: 'Bureau moderne avec moniteur affichant une interface web performante',
    accentBar: 'bg-violet',
    ctaColor: 'text-violet-light',
    bulletColor: 'bg-violet-light',
    cardStyle: {
      borderColor: 'rgba(124,58,237,0.15)',
      borderHoverColor: 'rgba(124,58,237,0.35)',
    },
  },
  {
    badge: 'IA',
    href: '/intelligence-artificielle',
    title: 'Intelligence Artificielle',
    description: "Automatisez ce qui vous ralentit. Déployez l'IA là où ça compte.",
    services: ['Agents IA sur mesure', 'Automatisation', 'ChatGPT / Claude', 'Audit IA gratuit'],
    cta: "Explorer l'IA",
    image: '/images/pillars/intelligence-artificielle.webp',
    imageAlt: 'Visualisation d\'un réseau neuronal violet dans un espace sombre futuriste',
    accentBar: 'bg-[#D4D4D8]',
    ctaColor: 'text-[#D4D4D8]',
    bulletColor: 'bg-[#A78BFA]',
    cardStyle: {
      borderColor: '#1C1C22',
      borderHoverColor: 'rgba(124,58,237,0.25)',
    },
  },
  {
    badge: 'Formation',
    href: '/formation-entreprise',
    title: 'Formation Entreprise',
    description: "Des équipes formées = une entreprise qui avance 2x plus vite.",
    services: ['Formation IA', 'Excel & bureautique', 'Cybersécurité', 'Sur mesure'],
    cta: 'Voir les formations',
    image: '/images/pillars/formation-entreprise.webp',
    imageAlt: 'Salle de formation professionnelle avec formateur et audience en éclairage violet',
    accentBar: 'bg-orange',
    ctaColor: 'text-orange-light',
    bulletColor: 'bg-orange',
    cardStyle: {
      borderColor: 'rgba(255,107,0,0.15)',
      borderHoverColor: 'rgba(255,107,0,0.35)',
    },
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
              <PillarCard pillar={pillar} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

type Pillar = (typeof PILLARS)[number]

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div
      className="pillar-card relative bg-bg rounded-[12px] overflow-hidden flex flex-col h-full hover:-translate-y-[2px] group"
      style={{
        border: '1px solid',
        '--border-idle': pillar.cardStyle.borderColor,
        '--border-hover': pillar.cardStyle.borderHoverColor,
      } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div className={`h-[3px] w-full ${pillar.accentBar} opacity-80`} />

      {/* Pillar image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg opacity-90" />
      </div>

      <div className="p-8 flex flex-col flex-1">
        <Badge className="mb-4 w-fit">{pillar.badge}</Badge>
        <h3 className="text-white text-xl font-bold mb-3">{pillar.title}</h3>
        <p className="text-text-secondary mb-6 leading-relaxed flex-1">{pillar.description}</p>
        <ul className="space-y-2 mb-8">
          {pillar.services.map((s) => (
            <li key={s} className="flex items-center gap-2.5 text-text-muted text-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${pillar.bulletColor} flex-shrink-0`} aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <Link
          href={pillar.href}
          className={`${pillar.ctaColor} text-sm font-semibold hover-grad-text transition-transform duration-[150ms] inline-flex items-center gap-1`}
        >
          {pillar.cta}<span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  )
}
