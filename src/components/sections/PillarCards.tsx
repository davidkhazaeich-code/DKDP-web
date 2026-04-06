import Image from 'next/image'
import Link from 'next/link'
import { Monitor, GraduationCap, Sparkles } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { Badge } from '@/components/ui/Badge'

const PILLARS = [
  {
    icon: Monitor,
    badge: 'Agence',
    badgeVariant: 'violet' as const,
    href: '/agence-digitale',
    title: 'Service Digital',
    description: 'Un site qui convertit, un SEO qui ramène des clients, une stratégie qui tient la route.',
    services: ['Site web sur mesure', 'Référencement SEO', 'Google Ads', 'Réseaux sociaux'],
    cta: "Découvrir l'agence",
    image: '/images/pillars/agence-digitale.webp',
    imageAlt: 'Bureau moderne avec moniteur affichant une interface web performante',
    accentBar: 'bg-violet',
    accentColor: '#A78BFA',
    ctaColor: 'text-violet-light',
    bulletColor: 'bg-violet-light',
    ctaDelay: '0s',
    cardStyle: { borderColor: 'rgba(124,58,237,0.15)', borderHoverColor: 'rgba(124,58,237,0.35)' },
  },
  {
    icon: GraduationCap,
    badge: 'Formation',
    badgeVariant: 'orange' as const,
    href: '/formation-entreprise',
    title: 'Formation Entreprise',
    description: "Formez vos équipes sur l'IA et le digital : elles gagnent en autonomie et en vitesse d'exécution.",
    services: ['Formation IA', 'Excel & bureautique', 'Cybersécurité', 'Sur mesure'],
    cta: 'Voir les formations',
    image: '/images/pillars/formation-entreprise.webp',
    imageAlt: 'Salle de formation professionnelle avec formateur et audience',
    accentBar: 'bg-orange',
    accentColor: '#FF6B00',
    ctaColor: 'text-orange-light',
    bulletColor: 'bg-orange',
    ctaDelay: '0.3s',
    cardStyle: { borderColor: 'rgba(255,107,0,0.15)', borderHoverColor: 'rgba(255,107,0,0.35)' },
  },
  {
    icon: Sparkles,
    badge: 'IA',
    badgeVariant: 'chrome' as const,
    href: '/intelligence-artificielle',
    title: 'Intelligence Artificielle',
    description: "Automatisez ce qui vous ralentit. Déployez l'IA là où ça compte.",
    services: ['Agents IA sur mesure', 'Automatisation', 'ChatGPT / Claude', 'Audit & Conseil IA'],
    cta: "Explorer l'IA",
    image: '/images/pillars/intelligence-artificielle.webp',
    imageAlt: "Réseau neuronal violet dans un espace sombre futuriste",
    accentBar: 'bg-[#D4D4D8]',
    accentColor: '#D4D4D8',
    ctaColor: 'text-[#D4D4D8]',
    bulletColor: 'bg-[#D4D4D8]',
    ctaDelay: '0.6s',
    cardStyle: { borderColor: 'rgba(212,212,216,0.15)', borderHoverColor: 'rgba(212,212,216,0.35)' },
  },
] as const

export function PillarCards() {
  return (
    <section id="nos-expertises" aria-labelledby="pillars-heading" className="py-14 sm:py-20 md:py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4 sm:mb-6">Nos 3 piliers</GradTag>
            <h2 id="pillars-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em]">
              Création de sites web, SEO et formation IA à Genève. Un seul interlocuteur.
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
        border: `1px solid ${pillar.cardStyle.borderColor}`,
        '--border-hover': pillar.cardStyle.borderHoverColor,
      } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div className={`h-[3px] w-full ${pillar.accentBar} opacity-80`} />

      {/* Pillar image - clickable */}
      <Link href={pillar.href} className="relative w-full aspect-[16/9] overflow-hidden block" tabIndex={-1} aria-hidden="true">
        <Image
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg opacity-90" />
      </Link>

      <div className="p-5 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
            style={{ background: `${pillar.accentColor}18`, border: `1px solid ${pillar.accentColor}35` }}
          >
            <pillar.icon size={16} style={{ color: pillar.accentColor }} />
          </div>
          <Badge variant={pillar.badgeVariant} className="w-fit">{pillar.badge}</Badge>
        </div>
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
          className={`pillar-cta ${pillar.ctaColor} text-sm font-semibold inline-flex items-center gap-1 w-fit`}
          style={{ '--cta-color': pillar.accentColor, animationDelay: pillar.ctaDelay } as React.CSSProperties}
        >
          {pillar.cta}<span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  )
}
