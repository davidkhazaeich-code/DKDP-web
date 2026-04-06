import type { Metadata } from 'next'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildBreadcrumbList } from '@/lib/schema'
import { PROJECTS, PORTFOLIO_SECTORS, type SectorKey } from '@/lib/portfolio'
import { violet } from '@/lib/tokens'
import { ProjectCard } from './_components/ProjectCard'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))

export const metadata: Metadata = {
  title: 'Realisations · Sites web crees par DKDP · Portfolio',
  description:
    'Decouvrez nos realisations : sites web modernes pour restaurants, hotels, cabinets medicaux, avocats, commerces et startups en Suisse romande.',
  alternates: { canonical: 'https://dkdp.ch/realisations' },
}

const V = violet.color
const VB = violet.bg
const VD = violet.border

const SECTOR_ORDER: SectorKey[] = ['restauration', 'sante', 'juridique', 'artisanat', 'tech']

export default function RealisationsPage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildService({
          name: 'Portfolio DKDP',
          url: '/realisations',
          description: 'Sites web crees par DKDP pour PME en Suisse romande.',
        })}
      />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Realisations', url: 'https://dkdp.ch/realisations' },
        ])}
      />

      {/* ══ 1. Hero ══ */}
      <HeroBg
        blob1="rgba(124,58,237,0.12)"
        blob2="rgba(45,212,191,0.07)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <GradTag className="mb-6">Realisations</GradTag>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                Des sites web qui{' '}
                <GradText as="span" className="grad-text">font la difference.</GradText>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
                Chaque projet est unique. Decouvrez comment nous transformons la vision de nos clients
                en experiences digitales remarquables.
              </p>
              <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                Discuter de votre projet
              </LiquidMetalButton>
              <p className="mt-8 text-zinc-500 text-sm">
                {PROJECTS.length} projets · {SECTOR_ORDER.length} secteurs · Suisse romande
              </p>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ══ 2. Filtres secteurs ══ */}
      <div className="sticky top-14 z-30 border-b border-zinc-800 bg-[rgba(9,9,11,0.92)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Filtres secteurs">
            <a
              href="#projets"
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={{ background: VB, color: V, border: `1px solid ${VD}` }}
            >
              Tous
            </a>
            {SECTOR_ORDER.map(key => {
              const s = PORTFOLIO_SECTORS[key]
              return (
                <a
                  key={key}
                  href={`#sector-${key}`}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
                  style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                >
                  {s.label}
                </a>
              )
            })}
          </nav>
        </div>
      </div>

      {/* ══ 3. Grille projets par secteur ══ */}
      <section className="py-24 scroll-mt-[120px]" id="projets">
        <div className="max-w-[1200px] mx-auto px-6">
          {SECTOR_ORDER.map(key => {
            const sectorProjects = PROJECTS.filter(p => p.sector === key)
            if (sectorProjects.length === 0) return null
            const s = PORTFOLIO_SECTORS[key]
            return (
              <div key={key} id={`sector-${key}`} className="scroll-mt-[120px] mb-16 last:mb-0">
                <SectionReveal>
                  <div className="flex items-center gap-3 mb-8">
                    <span
                      className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                    >
                      {s.label}
                    </span>
                    <div className="flex-1 h-px" style={{ background: s.border }} />
                  </div>
                </SectionReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sectorProjects.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} delay={i * 0.08} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ══ 4. CTA Final ══ */}
      <CTAFinal />
    </main>
  )
}
