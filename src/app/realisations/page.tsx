import type { Metadata } from 'next'
import Link from 'next/link'
import {
  TrendingUp,
  Bot,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Quote,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Réalisations · Projets clients · DKDP Genève',
  description:
    'Découvrez les projets livrés par DKDP pour des PME en Suisse romande. Refonte de sites, agents IA, formations entreprise. Résultats mesurables, délais tenus.',
  alternates: { canonical: 'https://dkdp.ch/realisations' },
  openGraph: {
    title: 'Réalisations · Projets clients · DKDP Genève',
    description:
      'Sites web, IA et formations pour PME à Genève. 50+ projets livrés en Suisse romande.',
    url: 'https://dkdp.ch/realisations',
  },
}

// ── Design tokens ────────────────────────────────────────────────────────────
const chrome   = '#D4D4D8'
const chromeBg = 'rgba(212,212,216,0.06)'
const chromeBd = 'rgba(212,212,216,0.14)'
const violet   = '#A78BFA'
const violetBg = 'rgba(124,58,237,0.08)'
const violetBd = 'rgba(124,58,237,0.20)'
const orange   = '#FF8C00'
const orangeBg = 'rgba(255,107,0,0.08)'
const orangeBd = 'rgba(255,107,0,0.18)'
const green    = '#4ade80'

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURED = [
  {
    pillar: 'Service Digital',
    pillarColor: violet,
    pillarBg: violetBg,
    pillarBd: violetBd,
    Icon: TrendingUp,
    client: 'Cabinet comptable',
    location: 'Genève',
    service: 'Refonte site web et SEO local',
    challenge:
      'Site vieillissant, invisible sur Google, zéro lead entrant. Le cabinet perdait des clients face à des concurrents mieux positionnés en ligne.',
    solution:
      'Nouveau site Next.js orienté conversion, stratégie SEO locale sur les mots-clés métier, campagnes Google Ads ciblées par quartier genevois.',
    results: [
      { value: '+340%', label: 'de trafic organique en 6 mois' },
      { value: '12 mots-clés', label: 'positionnés en page 1 Google' },
      { value: '18 leads/mois', label: 'qualifiés (vs 2 avant la refonte)' },
    ],
  },
  {
    pillar: 'Intelligence Artificielle',
    pillarColor: chrome,
    pillarBg: chromeBg,
    pillarBd: chromeBd,
    Icon: Bot,
    client: 'PME immobilière',
    location: 'Lausanne',
    service: 'Agent IA de qualification des leads',
    challenge:
      '120 leads entrants par semaine, qualification manuelle chronophage, délai de réponse de 3 jours. Des opportunités perdues chaque semaine.',
    solution:
      'Agent IA connecté au CRM, qualification automatique selon critères budget et localisation, scoring dynamique, relances planifiées sans intervention humaine.',
    results: [
      { value: '90%', label: 'des leads qualifiés sans intervention humaine' },
      { value: '4 minutes', label: 'délai de réponse moyen (vs 3 jours avant)' },
      { value: '18h/semaine', label: 'libérées pour l\'équipe commerciale' },
    ],
  },
  {
    pillar: 'Formation',
    pillarColor: orange,
    pillarBg: orangeBg,
    pillarBd: orangeBd,
    Icon: GraduationCap,
    client: 'Cabinet RH',
    location: 'Genève',
    service: 'Formation IA pour 2 équipes, 16 personnes',
    challenge:
      'Équipes qui n\'utilisaient pas l\'IA, freins psychologiques face à l\'outil, perte de temps quotidienne sur des tâches répétitives à faible valeur ajoutée.',
    solution:
      '2 journées de formation IA en présentiel, outils sélectionnés et personnalisés pour le secteur RH, exercices pratiques sur leurs cas réels dès le premier jour.',
    results: [
      { value: '100%', label: 'des participants utilisent l\'IA au quotidien' },
      { value: '5h/semaine', label: 'gagnées par collaborateur' },
      { value: '3 semaines', label: 'pour atteindre le ROI de la formation' },
    ],
  },
]

const SMALL_PROJECTS = [
  {
    sector: 'E-commerce B2B',
    service: 'Automatisation du support client',
    result: '75% des tickets résolus automatiquement',
    pillar: 'IA',
    pillarColor: chrome,
    pillarBg: chromeBg,
    pillarBd: chromeBd,
  },
  {
    sector: 'Studio architecture',
    service: 'Identité visuelle et site vitrine',
    result: 'Demandes de projets multipliées par 3',
    pillar: 'Agence',
    pillarColor: violet,
    pillarBg: violetBg,
    pillarBd: violetBd,
  },
  {
    sector: 'Restaurant gastronomique',
    service: 'Google Ads et SEO local',
    result: '+120% de réservations en ligne en 4 mois',
    pillar: 'Agence',
    pillarColor: violet,
    pillarBg: violetBg,
    pillarBd: violetBd,
  },
  {
    sector: 'Clinique dentaire',
    service: 'Formation bureautique et outils IA, 12 personnes',
    result: '3h par semaine gagnées par assistante',
    pillar: 'Formation',
    pillarColor: orange,
    pillarBg: orangeBg,
    pillarBd: orangeBd,
  },
  {
    sector: 'Startup fintech',
    service: 'Intégration Claude API, rapports automatisés',
    result: 'Rapport généré en 4 min (vs 2h manuellement)',
    pillar: 'IA',
    pillarColor: chrome,
    pillarBg: chromeBg,
    pillarBd: chromeBd,
  },
  {
    sector: 'Agence événementielle',
    service: 'Formation réseaux sociaux et stratégie de contenu',
    result: 'Abonnés multipliés par 3 en 4 mois',
    pillar: 'Formation',
    pillarColor: orange,
    pillarBg: orangeBg,
    pillarBd: orangeBd,
  },
]

const GLOBAL_STATS = [
  { value: '50+', label: 'Projets livrés' },
  { value: 'CHF 2M+', label: 'De valeur créée pour nos clients (estimée)' },
  { value: '3 semaines', label: 'Délai moyen pour un premier résultat mesurable' },
  { value: '98%', label: 'De clients qui recommandent DKDP' },
]

const TESTIMONIALS = [
  {
    quote:
      'DKDP a transformé notre présence en ligne en quelques mois. On est passé de zéro lead entrant à un pipeline solide. David connaît le marché genevois et sait comment parler à nos clients.',
    author: 'Nicolas B.',
    role: 'Directeur, cabinet de conseil RH, Genève',
    pillarColor: violet,
  },
  {
    quote:
      'La formation IA était exactement ce qu\'il nous fallait. Pas de jargon, des cas pratiques concrets pour notre secteur. En deux jours, mon équipe a changé sa façon de travailler. Le ROI était là en moins d\'un mois.',
    author: 'Sophie M.',
    role: 'Responsable opérations, PME industrielle, Lausanne',
    pillarColor: orange,
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RealisationsPage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildService({
          name: 'Réalisations DKDP Genève',
          url: '/realisations',
          description:
            'Projets livrés par DKDP pour des PME en Suisse romande. Sites web, agents IA, formations entreprise.',
        })}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <InfiniteGrid
        accentRgb="212,212,216"
        blob1="rgba(212,212,216,0.08)"
        blob2="rgba(124,58,237,0.06)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <SectionReveal>
              <GradTag className="mb-6">Réalisations</GradTag>
              <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                Ce que nous{' '}
                <GradText as="span">avons construit.</GradText>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                Projets livrés pour des PME en Suisse romande. Résultats mesurables, délais tenus.
              </p>
            </SectionReveal>

            {/* Hero stats */}
            <SectionReveal delay={0.1}>
              <div className="inline-grid grid-cols-3 gap-px rounded-[14px] overflow-hidden border"
                style={{ borderColor: chromeBd, background: chromeBd }}>
                {[
                  { value: '50+', label: 'Projets livrés' },
                  { value: '3 piliers', label: 'Agence, IA, Formation' },
                  { value: '98%', label: 'Satisfaction client' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center justify-center px-8 py-5"
                    style={{ background: '#0A0A0A' }}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                    <p className="text-text-muted text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      </InfiniteGrid>

      {/* ── Tous les projets ──────────────────────────────────────────────── */}
      <section className="py-4 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p
              className="text-[10px] font-bold uppercase tracking-widest text-center py-4"
              style={{ color: chrome }}
            >
              Tous les projets
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Featured case studies ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-14">
              <GradTag className="mb-4">Études de cas</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Trois projets, trois approches, des résultats concrets.
              </h2>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-8">
            {FEATURED.map((project, i) => (
              <SectionReveal key={project.client} delay={i * 0.1}>
                <article
                  className="rounded-[20px] border overflow-hidden"
                  style={{
                    background: project.pillarBg,
                    borderColor: project.pillarBd,
                    boxShadow: `0 0 50px ${project.pillarBg}`,
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 pt-8 pb-6 border-b"
                    style={{ borderColor: project.pillarBd }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{
                          background: `${project.pillarColor}18`,
                          border: `1px solid ${project.pillarColor}44`,
                        }}
                      >
                        <project.Icon size={20} style={{ color: project.pillarColor }} />
                      </div>
                      <div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: project.pillarColor }}
                        >
                          {project.pillar}
                        </span>
                        <p className="text-white font-semibold text-sm mt-0.5">{project.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{project.client}</p>
                      <p className="text-text-muted text-xs">{project.location}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Left: challenge + solution */}
                    <div className="flex flex-col gap-6">
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-widest mb-2"
                          style={{ color: project.pillarColor }}
                        >
                          Le défi
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-widest mb-2"
                          style={{ color: project.pillarColor }}
                        >
                          Notre approche
                        </p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Right: results */}
                    <div className="flex flex-col justify-center gap-4">
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: project.pillarColor }}
                      >
                        Résultats obtenus
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                        {project.results.map((r) => (
                          <div
                            key={r.value}
                            className="flex flex-col gap-1 rounded-[12px] p-4 border"
                            style={{
                              background: `${project.pillarColor}0a`,
                              borderColor: `${project.pillarColor}28`,
                            }}
                          >
                            <p
                              className="text-2xl font-bold leading-none"
                              style={{ color: green }}
                            >
                              {r.value}
                            </p>
                            <p className="text-text-muted text-xs leading-snug">{r.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── More projects grid ────────────────────────────────────────────── */}
      <section className="py-20 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <GradTag className="mb-4">Autres réalisations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Un aperçu de nos derniers projets.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SMALL_PROJECTS.map((project, i) => (
              <SectionReveal key={`${project.sector}-${i}`} delay={i * 0.07}>
                <article
                  className="flex flex-col gap-4 rounded-[16px] border p-6 h-full"
                  style={{
                    background: project.pillarBg,
                    borderColor: project.pillarBd,
                  }}
                >
                  {/* Pillar badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{
                        color: project.pillarColor,
                        borderColor: project.pillarBd,
                        background: `${project.pillarColor}12`,
                      }}
                    >
                      {project.pillar}
                    </span>
                  </div>

                  {/* Sector */}
                  <div>
                    <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">Secteur</p>
                    <p className="text-white font-bold text-sm">{project.sector}</p>
                  </div>

                  {/* Service */}
                  <div>
                    <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">Prestation</p>
                    <p className="text-text-secondary text-sm">{project.service}</p>
                  </div>

                  {/* Result */}
                  <div
                    className="flex items-start gap-2 mt-auto pt-4 border-t"
                    style={{ borderColor: project.pillarBd }}
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: green }}
                    />
                    <p className="text-sm font-semibold" style={{ color: green }}>
                      {project.result}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global stats ─────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">En chiffres</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que ces projets représentent.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-[20px] overflow-hidden border"
            style={{ borderColor: chromeBd, background: chromeBd }}>
            {GLOBAL_STATS.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.08}>
                <div
                  className="flex flex-col items-center justify-center text-center px-8 py-10"
                  style={{ background: '#0A0A0A' }}
                >
                  <p
                    className="text-4xl md:text-5xl font-bold mb-3 leading-none"
                    style={{ color: chrome }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed max-w-[160px]">
                    {stat.label}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qu&apos;ils en disent.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <blockquote
                  className="flex flex-col gap-6 rounded-[20px] border p-8 h-full"
                  style={{
                    background: chromeBg,
                    borderColor: chromeBd,
                  }}
                >
                  <Quote
                    size={28}
                    aria-hidden="true"
                    style={{ color: t.pillarColor, opacity: 0.7 }}
                  />
                  <p className="text-text-secondary leading-relaxed text-sm flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="text-white font-bold text-sm">{t.author}</p>
                    <p className="text-text-muted text-xs mt-1">{t.role}</p>
                  </footer>
                </blockquote>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bridge to contact ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="rounded-[24px] border p-10 md:p-14 text-center"
              style={{
                background: chromeBg,
                borderColor: chromeBd,
                boxShadow: '0 0 60px rgba(212,212,216,0.04)',
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-6"
                style={{ color: chrome }}
              >
                Votre projet
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                Votre projet ressemble à l&apos;un d&apos;eux&nbsp;?
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Parlons-en. 15 minutes suffisent pour savoir si on peut vous aider et comment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Réservez votre appel gratuit<span aria-hidden="true"> →</span>
                </LiquidMetalButton>
                <Link
                  href="/contact"
                  className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:text-white"
                  style={{ color: chrome }}
                >
                  Nous écrire <ChevronRight size={14} />
                </Link>
              </div>
              <p className="text-text-muted text-xs mt-8">
                Sans engagement · Réponse sous 24h · Eaux-Vives, Genève ou en visio
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────────────────── */}
      <CTAFinal />
    </main>
  )
}
