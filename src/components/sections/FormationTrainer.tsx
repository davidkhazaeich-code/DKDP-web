import Image from 'next/image'
import Link from 'next/link'
import { Star, Quote, BadgeCheck } from 'lucide-react'

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'

const TRAINERS = [
  {
    name: 'David K.',
    role: 'Fondateur DKDP, formateur principal',
    bio: 'Plus de 10 ans à accompagner les entreprises suisses dans leur transformation digitale. 700+ clients formés, de la PME aux grandes équipes.',
    image: '/images/team/david-khazaei.png',
    initials: 'DK',
    skills: ['IA et automatisation', 'Stratégie digitale', 'Développement web'],
    highlight: '700+ clients',
    linkedin: 'https://www.linkedin.com/in/davidkhazaei/',
  },
  {
    name: 'Romane D.',
    role: 'Experte IA, SEO et UX, formatrice',
    bio: 'Spécialiste en intelligence artificielle et UX design. Combine expertise technique et pédagogie pour rendre chaque concept accessible.',
    image: '/images/team/romane.png',
    initials: 'RD',
    skills: ['Intelligence artificielle', 'SEO et GEO', 'UX Design'],
    highlight: 'IA et SEO',
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
  },
  {
    name: 'Ali K.',
    role: 'Formateur développement et informatique',
    bio: 'Développeur et formateur passionné. Approche structurée et concrète pour que chaque participant reparte avec des bases solides.',
    image: '/images/team/ali-khazaei.png',
    initials: 'AK',
    skills: ['Développement web', 'Python', 'Bureautique'],
    highlight: 'Dev et IT',
    linkedin: null,
  },
]

const REVIEWS = [
  {
    quote: 'Très bon formateur, patient et très pédagogue. J\'ai enfin compris comment exploiter les outils numériques au quotidien.',
    name: 'M. D.',
    context: 'Formation informatique',
  },
  {
    quote: 'Formation Excel très complète. La formatrice a su adapter le cours à mes besoins professionnels. Je recommande vivement.',
    name: 'J.-P. L.',
    context: 'Formation bureautique',
  },
  {
    quote: 'Formateur à l\'écoute, contenu adapté à notre équipe. On a gagné un temps fou dès la semaine suivante.',
    name: 'S. B.',
    context: 'Formation IA en entreprise',
  },
  {
    quote: 'Excellente pédagogie, exercices concrets sur nos propres outils. Toute l\'équipe a progressé en une journée.',
    name: 'F. R.',
    context: 'Formation cybersécurité',
  },
]

export function FormationTrainer({ accentColor = '#FF8C00' }: { accentColor?: string }) {
  const rgb = hexToRgb(accentColor)

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none opacity-30 blur-[120px]"
        style={{ background: `radial-gradient(circle, rgba(${rgb},0.15) 0%, transparent 70%)` }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-12 md:mb-16">
            <GradTag className="mb-4">Vos formateurs</GradTag>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em]">
              Formés par des praticiens,{' '}
              <GradText as="span">pas des théoriciens.</GradText>
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Nos formateurs utilisent chaque jour les outils qu&apos;ils enseignent.
              Plus de 500 professionnels formés en Suisse romande depuis 2015.
            </p>
          </div>
        </SectionReveal>

        {/* ── Trainers ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 md:mb-20">
          {TRAINERS.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.08}>
              <div
                className="group relative flex flex-col h-full rounded-[20px] border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  background: `rgba(${rgb},0.04)`,
                  borderColor: `rgba(${rgb},0.14)`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 40px rgba(${rgb},0.08), inset 0 1px 0 rgba(${rgb},0.10)` }}
                />

                {/* Portrait image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    height: '300px',
                    background: `linear-gradient(180deg, rgba(${rgb},0.10) 0%, rgba(${rgb},0.03) 100%)`,
                  }}
                >
                  <Image
                    src={t.image}
                    alt={`${t.name}, formateur DKDP`}
                    fill
                    sizes="(max-width: 640px) 100vw, 380px"
                    priority={i === 0}
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                    }}
                  />
                  {/* Highlight chip */}
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap backdrop-blur-sm"
                    style={{
                      background: `rgba(${rgb},0.20)`,
                      color: accentColor,
                      border: `1px solid rgba(${rgb},0.30)`,
                    }}
                  >
                    {t.highlight}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Name + badges */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-white font-bold text-lg leading-tight">{t.name}</p>
                    <BadgeCheck size={16} style={{ color: accentColor }} className="flex-shrink-0" />
                    {t.linkedin && (
                      <Link
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-0.5 text-text-muted hover:text-[#0A66C2] transition-colors"
                        aria-label={`LinkedIn de ${t.name}`}
                      >
                        <LinkedinIcon size={14} />
                      </Link>
                    )}
                  </div>
                  <p className="text-text-muted text-[13px] mb-4 leading-snug">{t.role}</p>

                  {/* Bio */}
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{t.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: `rgba(${rgb},0.10)` }}>
                    {t.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-medium px-2.5 py-[3px] rounded-md bg-white/[0.04] text-text-secondary border border-white/[0.06]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* ── Avis Google ── */}
        <SectionReveal delay={0.15}>
          <div
            className="rounded-[20px] border p-6 sm:p-8 md:p-10"
            style={{
              background: `linear-gradient(135deg, rgba(${rgb},0.06) 0%, rgba(${rgb},0.02) 100%)`,
              borderColor: `rgba(${rgb},0.16)`,
            }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill={accentColor} color={accentColor} />
                  ))}
                </div>
                <span className="text-white font-bold text-lg">4.9/5</span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <p className="text-text-muted text-sm">
                Satisfaction moyenne sur <span className="text-text-secondary font-medium">500+ participants</span> formés
              </p>
            </div>

            {/* Reviews grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="relative rounded-[14px] p-5 border bg-white/[0.02] backdrop-blur-sm"
                  style={{ borderColor: `rgba(${rgb},0.10)` }}
                >
                  <Quote
                    size={28}
                    className="absolute top-4 right-4 opacity-[0.07]"
                    style={{ color: accentColor }}
                  />
                  <p className="text-white/90 text-sm leading-relaxed mb-3">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: `rgba(${rgb},0.15)`, color: accentColor }}
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs font-semibold">{r.name}</p>
                      <p className="text-text-muted text-[11px]">{r.context}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={10} fill={accentColor} color={accentColor} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`
}
