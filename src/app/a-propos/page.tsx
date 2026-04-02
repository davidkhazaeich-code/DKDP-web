import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Wrench,
  BarChart2,
  GraduationCap,
  ChevronRight,
  Globe,
  Brain,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import Image from 'next/image'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'À propos · David Khazaei · DKDP Genève',
  description:
    "DKDP est une service digital genevoise fondée par David Khazaei. Spécialiste en intelligence artificielle, formation entreprise et web pour les PME de Suisse romande.",
  alternates: { canonical: 'https://dkdp.ch/a-propos' },
}

// ── Design tokens ────────────────────────────────────────────────
const chrome    = '#D4D4D8'
const chromeBg  = 'rgba(212,212,216,0.06)'
const chromeBd  = 'rgba(212,212,216,0.14)'
const violet    = '#A78BFA'
const violetBg  = 'rgba(124,58,237,0.08)'
const violetBd  = 'rgba(124,58,237,0.18)'
const orange    = '#FF8C00'
const orangeBg  = 'rgba(255,140,0,0.08)'
const orangeBd  = 'rgba(255,140,0,0.20)'

// ── Data ─────────────────────────────────────────────────────────
const VALUES = [
  {
    Icon: Wrench,
    title: 'Pragmatique avant tout',
    desc: "On ne déploie pas l'IA pour le prestige. On identifie ce qui crée de la valeur réelle pour votre activité et on exécute.",
  },
  {
    Icon: BarChart2,
    title: 'Résultats mesurables',
    desc: "Chaque projet démarre par une question simple : quel est le ROI attendu ? On ne livre pas une solution si on ne peut pas en mesurer l'impact.",
  },
  {
    Icon: GraduationCap,
    title: 'Transmission du savoir',
    desc: "Former vos équipes fait partie de chaque mission. Vous devez comprendre et maîtriser ce qu'on déploie pour vous.",
  },
]

const STATS = [
  { value: '50+', label: 'Entreprises accompagnées' },
  { value: '3',   label: "Piliers d'expertise" },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '2019', label: 'Année de création' },
]

const PILLARS = [
  {
    Icon: Globe,
    title: 'Service Digital',
    desc: 'Sites web, SEO, Google Ads, réseaux sociaux. Une présence digitale cohérente qui génère de vrais résultats.',
    href: '/agence-digitale',
    color: violet,
    bg: violetBg,
    bd: violetBd,
  },
  {
    Icon: BookOpen,
    title: 'Formation Entreprise',
    desc: 'Sessions sur mesure, en présentiel ou en visio. On forme vos équipes aux outils digitaux et à l\'IA.',
    href: '/formation-entreprise',
    color: orange,
    bg: orangeBg,
    bd: orangeBd,
  },
  {
    Icon: Brain,
    title: 'Intelligence Artificielle',
    desc: 'Agents IA, automatisation de processus, intégration LLM. 10 heures économisées par semaine en moyenne.',
    href: '/intelligence-artificielle',
    color: chrome,
    bg: chromeBg,
    bd: chromeBd,
  },
]

const SKILLS = [
  'IA et Automatisation',
  'Stratégie digitale',
  'Formation entreprise',
  'Google Ads',
  'SEO',
  'Web',
]

const REASONS = [
  {
    title: 'Spécialiste Suisse romande',
    desc: "On connaît le marché local, les contraintes légales suisses, et on parle vos langues.",
  },
  {
    title: 'Approche ROI-first',
    desc: "Chaque action est justifiée par un retour sur investissement estimé avant de démarrer.",
  },
  {
    title: 'Accompagnement complet',
    desc: "De l'audit initial à la formation de vos équipes, on couvre tout le cycle.",
  },
  {
    title: 'Transparence totale',
    desc: "Pas de jargon, pas de surprise. Des rapports clairs, des prix fixes, des délais tenus.",
  },
]

// ── Page ─────────────────────────────────────────────────────────
export default function AProposPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildLocalBusiness()} />

      {/* ── Hero ── */}
      <InfiniteGrid
        accentRgb="212,212,216"
        blob1="rgba(212,212,216,0.08)"
        blob2="rgba(124,58,237,0.07)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <div>
                <GradTag className="mb-6">À propos</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Derrière DKDP,{' '}
                  <br />
                  <GradText as="span">une vision claire.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  L'IA et le digital ne sont pas réservés aux grandes entreprises.
                  DKDP aide les PME de Suisse romande à passer à l'action avec des
                  résultats concrets et mesurables.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Discutons de votre projet
                  </LiquidMetalButton>
                  <Link
                    href="#histoire"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Notre histoire ↓
                  </Link>
                </div>
              </div>

              {/* Right: portrait */}
              <div className="hidden lg:flex items-end justify-center">
                <div
                  className="relative w-[340px] h-[400px] rounded-2xl overflow-hidden flex items-end justify-center"
                  style={{
                    background: chromeBg,
                    border: `1px solid ${chromeBd}`,
                    boxShadow: `0 0 60px rgba(212,212,216,0.08)`,
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
                  />
                  <Image
                    src="/images/team/david-khazaei.png"
                    alt="David Khazaei, fondateur DKDP Genève"
                    width={280}
                    height={380}
                    className="relative z-10 w-auto object-contain object-bottom"
                    style={{ maxHeight: '380px' }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                  <div
                    className="absolute bottom-5 left-5 right-5 rounded-[10px] px-4 py-3 z-20"
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
                  >
                    <p className="text-white text-sm font-semibold">David Khazaei</p>
                    <p className="text-text-muted text-xs mt-0.5">Fondateur · DKDP Genève</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </InfiniteGrid>

      {/* ── Approche / 3 valeurs ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Trois principes qui guident chaque projet.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: chromeBg, border: `1px solid ${chromeBd}` }}
                  >
                    <v.Icon size={22} style={{ color: chrome }} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{v.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Histoire ── */}
      <section id="histoire" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: story */}
            <div>
              <SectionReveal>
                <GradTag className="mb-5">Notre histoire</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-8">
                  DKDP est né d'un constat simple.
                </h2>
              </SectionReveal>

              <div className="flex flex-col gap-5">
                <SectionReveal delay={0.05}>
                  <p className="text-text-secondary leading-relaxed">
                    Après plusieurs années à accompagner des grandes organisations dans leur
                    transformation digitale, David a réalisé que les PME étaient systématiquement
                    laissées pour compte. Trop petites pour les grands cabinets de conseil, trop
                    complexes pour les agences web classiques.
                  </p>
                </SectionReveal>
                <SectionReveal delay={0.10}>
                  <p className="text-text-secondary leading-relaxed">
                    En 2019, il fonde DKDP à Genève avec un positionnement clair : apporter aux PME
                    de Suisse romande le niveau d'expertise et d'exigence habituellement réservé aux
                    grandes entreprises. Pas de jargon inutile, pas de solutions toutes faites.
                    Des résultats concrets, mesurables, et des clients qui comprennent ce qu'on fait
                    pour eux.
                  </p>
                </SectionReveal>
                <SectionReveal delay={0.15}>
                  <p className="text-text-secondary leading-relaxed">
                    Aujourd'hui, DKDP couvre trois piliers complémentaires : l'service digital pour
                    la visibilité en ligne, la formation entreprise pour monter les équipes en
                    compétence, et l'intelligence artificielle pour automatiser et accélérer les
                    processus métier. Trois expertises, un seul interlocuteur.
                  </p>
                </SectionReveal>
              </div>
            </div>

            {/* Right: stats 2x2 */}
            <div className="grid grid-cols-2 gap-5 lg:mt-16">
              {STATS.map((s, i) => (
                <SectionReveal key={s.label} delay={i * 0.08}>
                  <div
                    className="flex flex-col gap-2 p-6 rounded-[16px] border text-center"
                    style={{ background: chromeBg, borderColor: chromeBd }}
                  >
                    <p
                      className="text-[2.4rem] font-bold leading-none"
                      style={{ color: chrome }}
                    >
                      {s.value}
                    </p>
                    <p className="text-text-muted text-sm leading-snug">{s.label}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trois piliers ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu'on fait</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl mx-auto">
                Trois expertises, une seule équipe.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <SectionReveal key={p.href} delay={i * 0.1}>
                <Link
                  href={p.href}
                  className="group flex flex-col gap-5 p-7 rounded-[16px] border h-full transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: p.bg, borderColor: p.bd }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: p.bg, border: `1px solid ${p.bd}` }}
                  >
                    <p.Icon size={22} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                    style={{ color: p.color }}
                  >
                    Découvrir <ChevronRight size={12} />
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── David ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: portrait */}
            <SectionReveal>
              <div
                className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[4/5] rounded-2xl overflow-hidden flex items-end justify-center"
                style={{
                  background: chromeBg,
                  border: `1px solid ${chromeBd}`,
                  boxShadow: `0 0 60px rgba(212,212,216,0.06)`,
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.14) 0%, transparent 70%)' }}
                />
                <Image
                  src="/images/team/david-khazaei.png"
                  alt="David Khazaei, fondateur DKDP Genève"
                  width={320}
                  height={420}
                  className="relative z-10 w-auto object-contain object-bottom"
                  style={{ maxHeight: '90%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                <div
                  className="absolute bottom-5 left-5 right-5 rounded-[10px] px-4 py-3 z-20"
                  style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
                >
                  <p className="text-white text-sm font-semibold">David Khazaei</p>
                  <p className="text-text-muted text-xs mt-0.5">Fondateur · DKDP Genève</p>
                </div>
              </div>
            </SectionReveal>

            {/* Right: bio */}
            <div>
              <SectionReveal>
                <GradTag className="mb-5">Fondateur</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                  David Khazaei
                </h2>
              </SectionReveal>

              <SectionReveal delay={0.05}>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Expert en stratégie digitale et intelligence artificielle, David accompagne
                  les PME suisses depuis plus de six ans. Basé dans les Eaux-Vives à Genève,
                  il croit fermement que la technologie doit servir les gens, pas l'inverse.
                </p>
              </SectionReveal>
              <SectionReveal delay={0.08}>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Sa conviction : les outils les plus puissants ne valent rien sans adoption
                  réelle. C'est pourquoi formation et accompagnement sont au coeur de chaque
                  mission DKDP.
                </p>
              </SectionReveal>

              {/* Skills */}
              <SectionReveal delay={0.12}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="text-[12px] font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: chromeBg,
                        border: `1px solid ${chromeBd}`,
                        color: chrome,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionReveal>

              {/* Contact */}
              <SectionReveal delay={0.15}>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:dk@dkdp.ch"
                    className="inline-flex items-center gap-2.5 text-sm text-text-muted hover:text-white transition-colors"
                  >
                    <Mail size={15} style={{ color: chrome }} />
                    dk@dkdp.ch
                  </a>
                  <a
                    href="tel:+41799407969"
                    className="inline-flex items-center gap-2.5 text-sm text-text-muted hover:text-white transition-colors"
                  >
                    <Phone size={15} style={{ color: chrome }} />
                    +41 79 940 79 69
                  </a>
                  <span className="inline-flex items-center gap-2.5 text-sm text-text-muted">
                    <MapPin size={15} style={{ color: chrome }} />
                    36 Rue du 31 Décembre, Eaux-Vives, 1207 Genève
                  </span>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pourquoi DKDP ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pourquoi DKDP</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Ce qui nous différencie concrètement.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REASONS.map((r, i) => (
              <SectionReveal key={r.title} delay={i * 0.08}>
                <div
                  className="flex gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <CheckCircle2
                    size={22}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: chrome }}
                  />
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{r.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal />
    </main>
  )
}
