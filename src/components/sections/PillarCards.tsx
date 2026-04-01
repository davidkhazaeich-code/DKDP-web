import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { Badge } from '@/components/ui/Badge'

// Agence Digitale — monitor with cursor and conversion arrow
function IllustrationAgence() {
  return (
    <svg width="56" height="48" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      {/* Monitor */}
      <rect x="6" y="4" width="38" height="28" rx="3" stroke="#FF6B00" strokeWidth="1.8" fill="rgba(255,107,0,0.06)" />
      <line x1="20" y1="32" x2="30" y2="32" stroke="#FF6B00" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="25" y1="32" x2="25" y2="38" stroke="#FF6B00" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="19" y1="38" x2="31" y2="38" stroke="#FF6B00" strokeWidth="1.6" strokeLinecap="round" />
      {/* Browser bar */}
      <line x1="6" y1="11" x2="44" y2="11" stroke="#FF6B00" strokeWidth="1.2" opacity="0.4" />
      <circle cx="11" cy="7.5" r="1.2" fill="#FF6B00" opacity="0.5" />
      <circle cx="15" cy="7.5" r="1.2" fill="#FF6B00" opacity="0.5" />
      {/* Cursor arrow */}
      <path d="M33 18 L38 28 L36 26.5 L37 31 L35.2 29.5 L34.2 34 L33 18Z"
        stroke="#FF8C40" strokeWidth="1.2" fill="rgba(255,140,64,0.2)" strokeLinejoin="round" />
      {/* Rising arrow inside screen */}
      <polyline points="14,26 19,20 24,23 30,16"
        stroke="#FF6B00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="27,16 30,16 30,19"
        stroke="#FF6B00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// Intelligence Artificielle — circuit brain / neural network
function IllustrationIA() {
  return (
    <svg width="56" height="48" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      {/* Brain outline */}
      <path
        d="M28 8 C20 8 14 13 14 20 C14 27 18 31 22 33 L22 38 L34 38 L34 33 C38 31 42 27 42 20 C42 13 36 8 28 8Z"
        stroke="#7C3AED" strokeWidth="1.7" fill="rgba(124,58,237,0.07)" strokeLinejoin="round"
      />
      {/* Neural nodes */}
      <circle cx="28" cy="16" r="2" fill="#A78BFA" />
      <circle cx="21" cy="22" r="2" fill="#A78BFA" />
      <circle cx="35" cy="22" r="2" fill="#A78BFA" />
      <circle cx="24" cy="30" r="2" fill="#A78BFA" />
      <circle cx="32" cy="30" r="2" fill="#A78BFA" />
      {/* Connections */}
      <line x1="28" y1="16" x2="21" y2="22" stroke="#A78BFA" strokeWidth="1" opacity="0.6" />
      <line x1="28" y1="16" x2="35" y2="22" stroke="#A78BFA" strokeWidth="1" opacity="0.6" />
      <line x1="21" y1="22" x2="24" y2="30" stroke="#A78BFA" strokeWidth="1" opacity="0.6" />
      <line x1="35" y1="22" x2="32" y2="30" stroke="#A78BFA" strokeWidth="1" opacity="0.6" />
      <line x1="21" y1="22" x2="35" y2="22" stroke="#A78BFA" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="30" x2="32" y2="30" stroke="#A78BFA" strokeWidth="1" opacity="0.4" />
      {/* Pulse rings */}
      <circle cx="28" cy="16" r="4.5" stroke="#7C3AED" strokeWidth="0.8" opacity="0.35" fill="none" />
    </svg>
  )
}

// Formation Entreprise — graduation cap with rising bar
function IllustrationFormation() {
  return (
    <svg width="56" height="48" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      {/* Graduation cap */}
      <polygon points="28,10 46,18 28,26 10,18"
        stroke="#A78BFA" strokeWidth="1.7" fill="rgba(124,58,237,0.08)" strokeLinejoin="round" />
      <path d="M20 22 L20 32 C20 36 24 39 28 39 C32 39 36 36 36 32 L36 22"
        stroke="#A78BFA" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* Tassel string */}
      <line x1="46" y1="18" x2="46" y2="28" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="46" cy="30" r="2" fill="#A78BFA" opacity="0.7" />
      {/* Rising bars below */}
      <rect x="11" y="34" width="4" height="8" rx="1" fill="#A78BFA" opacity="0.3" />
      <rect x="17" y="30" width="4" height="12" rx="1" fill="#A78BFA" opacity="0.5" />
      <rect x="23" y="26" width="4" height="16" rx="1" fill="#A78BFA" opacity="0.7" />
    </svg>
  )
}

const PILLARS = [
  {
    badge: 'Agence',
    href: '/agence-digitale',
    title: 'Agence Digitale',
    description:
      'Un site qui convertit, un SEO qui ramène des clients, une stratégie qui tient la route.',
    services: ['Site web sur mesure', 'Référencement SEO', 'Google Ads', 'Réseaux sociaux'],
    cta: "Découvrir l'agence",
    Illustration: IllustrationAgence,
    accentColor: 'bg-orange',
  },
  {
    badge: 'IA',
    href: '/intelligence-artificielle',
    title: 'Intelligence Artificielle',
    description: "Automatisez ce qui vous ralentit. Déployez l'IA là où ça compte.",
    services: ['Agents IA sur mesure', 'Automatisation', 'ChatGPT / Claude', 'Audit IA gratuit'],
    cta: "Explorer l'IA",
    Illustration: IllustrationIA,
    accentColor: 'bg-violet',
  },
  {
    badge: 'Formation',
    href: '/formation-entreprise',
    title: 'Formation Entreprise',
    description: "Des équipes formées = une entreprise qui avance 2x plus vite.",
    services: ['Formation IA', 'Excel & bureautique', 'Cybersécurité', 'Sur mesure'],
    cta: 'Voir les formations',
    Illustration: IllustrationFormation,
    accentColor: 'bg-violet-light',
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
              <div className="relative bg-bg rounded-[12px] border border-border overflow-hidden flex flex-col h-full hover:-translate-y-[2px] hover:border-border-violet transition-all duration-300">
                {/* Top accent line */}
                <div className={`h-[3px] w-full ${pillar.accentColor} opacity-80`} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Illustration */}
                  <div className="mb-5">
                    <pillar.Illustration />
                  </div>

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
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
