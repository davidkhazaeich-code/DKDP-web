import Link from 'next/link'
import { Globe, GraduationCap, BrainCircuit, ChevronRight } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

const FEATURED = [
  {
    Icon: Globe,
    pillar: 'Service Digital',
    title: 'Création de site internet',
    desc: 'Un site rapide, moderne et optimisé pour convertir vos visiteurs en clients. De la landing page au site e-commerce.',
    href: '/agence-digitale/creation-site-web',
    cta: 'En savoir plus',
    badge: null,
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.22)',
    glow: 'rgba(124,58,237,0.10)',
  },
  {
    Icon: GraduationCap,
    pillar: 'Formation Entreprise',
    title: 'Formation IA en entreprise',
    desc: 'ChatGPT, Claude, Copilot : vos équipes maîtrisent les outils IA en une journée et gagnent 2h par jour.',
    href: '/formation-entreprise/ia',
    cta: 'Voir le programme',
    badge: null,
    color: '#FF8C00',
    bg: 'rgba(255,107,0,0.08)',
    border: 'rgba(255,107,0,0.22)',
    glow: 'rgba(255,107,0,0.08)',
  },
  {
    Icon: BrainCircuit,
    pillar: 'Intelligence Artificielle',
    title: 'Audit & Conseil IA',
    desc: "Identifiez les 3 actions à fort ROI pour automatiser votre entreprise. Rapport complet sous 48h.",
    href: '/intelligence-artificielle/audit-conseil',
    cta: 'Audit IA',
    badge: 'Best seller',
    color: '#D4D4D8',
    bg: 'rgba(212,212,216,0.06)',
    border: 'rgba(212,212,216,0.18)',
    glow: 'rgba(212,212,216,0.06)',
  },
]

export function FeaturedServices() {
  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-14">
            <GradTag className="mb-4">Services phares</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Nos 3 services les plus demandés.
            </h2>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED.map((s, i) => (
            <SectionReveal key={s.href} delay={i * 0.1}>
              <Link
                href={s.href}
                className="group flex flex-col h-full rounded-[16px] p-7 border transition-all hover:-translate-y-0.5 duration-200 relative overflow-hidden"
                style={{
                  background: s.bg,
                  borderColor: s.border,
                  boxShadow: `0 0 40px ${s.glow}`,
                }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: s.color }} />

                {/* Pillar tag + optional badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                  >
                    {s.pillar}
                  </span>
                  {s.badge && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)' }}
                    >
                      {s.badge}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] mb-5"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <s.Icon size={22} style={{ color: s.color }} />
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">{s.desc}</p>

                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                  style={{ color: s.color }}
                >
                  {s.cta} <ChevronRight size={13} />
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
