import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { orange } from '@/lib/tokens'

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const PRINCIPALS = [
  {
    name: 'David K.',
    role: 'Fondateur DKDP, formateur principal IA',
    bio: "Plus de 10 ans à accompagner des entreprises suisses dans leur transformation digitale. Formateur sur ChatGPT, Claude, Copilot et les automatisations IA. 700+ clients formés, de la PME familiale aux équipes internationales.",
    image: '/images/team/david-portrait.png',
    skills: ['ChatGPT et Claude', 'Automatisation IA', 'Stratégie digitale'],
    linkedin: 'https://www.linkedin.com/in/davidkhazaei/',
    stat: '700+ clients formés',
  },
  {
    name: 'Romane D.',
    role: 'Experte IA, SEO et UX, formatrice',
    bio: "Spécialiste en intelligence artificielle appliquée et UX design. Combine expertise technique et pédagogie naturelle pour rendre chaque concept immédiatement applicable dans le quotidien professionnel.",
    image: '/images/team/romane-portrait.png',
    skills: ['Intelligence artificielle', 'SEO et GEO', 'Outils créatifs IA'],
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
    stat: 'IA et SEO',
  },
]

const SUPPORT = {
  name: 'Ali K.',
  role: 'Formateur développement et IT',
  bio: 'Développeur et formateur passionné. Approche structurée et concrète pour que chaque participant reparte avec des bases solides et pratiques.',
  image: '/images/team/ali-khazaei.png',
  skills: ['Développement web', 'Python', 'Bureautique avancée'],
  linkedin: null,
}

const color = orange.color
const border = orange.border

export function FormateursSection() {
  return (
    <section id="formateurs" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-14">
            <GradTag className="mb-4">Vos formateurs</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Formés par des praticiens, pas des théoriciens.
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Nos formateurs utilisent chaque jour les outils qu&apos;ils enseignent.
              Plus de 500 professionnels formés en Suisse romande depuis 2015.
            </p>
          </div>
        </SectionReveal>

        {/* David + Romane — cartes principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {PRINCIPALS.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.1}>
              <div
                className="group relative flex flex-col rounded-[20px] border overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 50px rgba(255,107,0,0.07), inset 0 1px 0 rgba(255,107,0,0.08)` }}
                />

                {/* Portrait photo */}
                <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ aspectRatio: '3/4', maxHeight: '420px' }}>
                  <Image
                    src={t.image}
                    alt={`${t.name}, formateur DKDP`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

                  {/* Stat badge floated in photo */}
                  <div
                    className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,107,0,0.18)', color, border: `1px solid rgba(255,107,0,0.30)`, backdropFilter: 'blur(8px)' }}
                  >
                    {t.stat}
                  </div>
                </div>

                {/* Content */}
                <div className="relative flex flex-col flex-1 p-6">
                  {/* Name + badge + LinkedIn */}
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-lg leading-tight">{t.name}</h3>
                      <BadgeCheck size={16} style={{ color }} className="flex-shrink-0" />
                    </div>
                    {t.linkedin && (
                      <Link
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-[#0A66C2] transition-colors flex-shrink-0 mt-0.5"
                        aria-label={`LinkedIn de ${t.name}`}
                      >
                        <LinkedinIcon size={16} />
                      </Link>
                    )}
                  </div>

                  <p className="text-sm mb-4" style={{ color }}>{t.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">{t.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {t.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md"
                        style={{ background: 'rgba(255,255,255,0.04)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.07)' }}
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

        {/* Ali — carte compacte horizontale */}
        <SectionReveal delay={0.2}>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6 rounded-[16px] border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
          >
            {/* Avatar */}
            <div
              className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden flex-shrink-0"
              style={{ background: '#e8e2da', border: `2px solid ${border}` }}
            >
              <Image
                src={SUPPORT.image}
                alt={`${SUPPORT.name}, formateur DKDP`}
                fill
                className="object-cover object-top"
                sizes="72px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white font-bold">{SUPPORT.name}</p>
                <BadgeCheck size={14} style={{ color }} />
              </div>
              <p className="text-xs mb-2" style={{ color }}>{SUPPORT.role}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{SUPPORT.bio}</p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5 shrink-0">
              {SUPPORT.skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
