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
  Mail,
  CheckCircle2,
} from 'lucide-react'
import Image from 'next/image'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildPerson } from '@/lib/schema'
import { violet, orange, chrome } from '@/lib/tokens'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const CircularTestimonials = dynamic(() => import('@/components/ui/circular-testimonials').then(m => m.CircularTestimonials))

export const metadata: Metadata = {
  title: 'À propos · David Khazaei · DKDP Genève',
  description:
    "DKDP est une service digital genevoise fondée par David Khazaei. Spécialiste en intelligence artificielle, formation entreprise et web pour les PME de Suisse romande.",
  alternates: { canonical: 'https://dkdp.ch/a-propos' },
}

// ── Design tokens (aliases) ───────────────────────────────────────
const chromeColor = chrome.color
const chromeBg    = chrome.bg
const chromeBd    = chrome.border
const violetColor = violet.color
const violetBg    = violet.bg
const violetBd    = violet.border
const orangeColor = orange.color
const orangeBg    = orange.bg
const orangeBd    = orange.border

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
  { value: '700+', label: 'Clients accompagnés' },
  { value: '3',   label: "Piliers d'expertise" },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '2015', label: 'Actif depuis' },
]

const PILLARS = [
  {
    Icon: Globe,
    title: 'Service Digital',
    desc: 'Sites web, SEO, Google Ads, réseaux sociaux. Une présence digitale cohérente qui génère de vrais résultats.',
    href: '/agence-digitale',
    color: violetColor,
    bg: violetBg,
    bd: violetBd,
  },
  {
    Icon: BookOpen,
    title: 'Formation Entreprise',
    desc: 'Sessions sur mesure, en présentiel ou en visio. On forme vos équipes aux outils digitaux et à l\'IA.',
    href: '/formation-entreprise',
    color: orangeColor,
    bg: orangeBg,
    bd: orangeBd,
  },
  {
    Icon: Brain,
    title: 'Intelligence Artificielle',
    desc: 'Agents IA, automatisation de processus, intégration LLM. 10 heures économisées par semaine en moyenne.',
    href: '/intelligence-artificielle',
    color: chromeColor,
    bg: chromeBg,
    bd: chromeBd,
  },
]

const EQUIPE = [
  {
    name: 'David Khazaei',
    role: 'Fondateur · Développeur & Consultant Digital',
    bio: "Expert en stratégie digitale et intelligence artificielle, David accompagne les PME suisses depuis plus de dix ans. Basé dans les Eaux-Vives à Genève, il croit que la technologie doit servir les gens, pas l'inverse.",
    src: '/images/team/david-khazaei.png',
    color: violetColor,
    border: violetBd,
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.05) 100%)',
    skills: ['IA & Automatisation', 'Stratégie digitale', 'Développement web', 'SEO', 'Google Ads'],
    email: 'dk@dkdp.ch',
    linkedin: 'https://www.linkedin.com/in/davidkhazaei/',
    imageScale: 0.9,
  },
  {
    name: 'Romane',
    role: 'Experte IA, SEO/GEO & UX · Formatrice',
    bio: "Spécialiste en intelligence artificielle, référencement SEO/GEO et expérience utilisateur, Romane allie expertise technique et pédagogie pour former les équipes et optimiser la présence digitale de nos clients.",
    src: '/images/team/romane.png',
    color: orangeColor,
    border: 'rgba(255,107,0,0.28)',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.04) 100%)',
    skills: ['Intelligence artificielle', 'SEO & GEO', 'UX Design', 'Formation'],
    email: 'rd@dkdp.ch',
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
    imageScale: 1.19,
    imageOffsetX: 15,
  },
  {
    name: 'Ali Khazaei',
    role: 'Formateur · Développeur & Informatique',
    bio: "Développeur et formateur passionné, Ali intervient sur les modules informatique et développement web. Pédagogue avant tout, il s'assure que chaque participant repart avec des bases solides.",
    src: '/images/team/ali-khazaei.png',
    color: '#60a5fa',
    border: 'rgba(96,165,250,0.25)',
    cardBg: 'linear-gradient(160deg, rgba(96,165,250,0.16) 0%, rgba(96,165,250,0.04) 100%)',
    skills: ['Développement web', 'Python', 'Informatique', 'Bureautique', 'Formation'],
    email: null,
    linkedin: null,
  },
  {
    name: 'Claude',
    role: 'Collaborateur Indépendant · Développeur & Formateur',
    bio: "Développeur et formateur indépendant, Claude apporte son expertise technique en programmation et informatique aux projets DKDP. Il anime les formations techniques pour les profils IT.",
    src: '/images/team/claude-formation.png',
    color: chromeColor,
    border: chromeBd,
    cardBg: 'linear-gradient(160deg, rgba(212,212,216,0.12) 0%, rgba(212,212,216,0.03) 100%)',
    skills: ['Développement web', 'Python', 'Informatique', 'Cybersécurité'],
    email: null,
    linkedin: null,
  },
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
    <main>
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg schema={buildPerson()} />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.08)"
        blob2="rgba(124,58,237,0.07)"
        accentRgb="156,163,175"
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

              {/* Right: Logo DKDP */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  {/* Glow backdrop */}
                  <div
                    className="absolute inset-0 rounded-[28px] blur-3xl scale-125 opacity-60"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.30) 0%, rgba(212,212,216,0.06) 60%, transparent 100%)' }}
                  />
                  {/* Logo card */}
                  <div
                    className="relative w-[380px] h-[280px] rounded-[28px] flex flex-col items-center justify-center gap-7 overflow-hidden"
                    style={{
                      background: 'linear-gradient(140deg, rgba(124,58,237,0.14) 0%, rgba(9,9,11,0.80) 50%, rgba(212,212,216,0.06) 100%)',
                      border: '1px solid rgba(124,58,237,0.28)',
                      boxShadow: '0 0 80px rgba(124,58,237,0.14), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Subtle grid */}
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.06) 39px,rgba(255,255,255,0.06) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.06) 39px,rgba(255,255,255,0.06) 40px)',
                      }}
                    />
                    <Image
                      src="/images/logo/dkdp_blanc-croped.png"
                      alt="DKDP Genève"
                      width={220}
                      height={80}
                      className="relative z-10 h-auto opacity-95"
                      style={{ width: '210px' }}
                      priority
                    />
                    {/* Pillar tags */}
                    <div className="relative z-10 flex gap-2">
                      {[
                        { label: 'Service Digital', color: violetColor, bg: violetBg, border: violetBd },
                        { label: 'Formation', color: orangeColor, bg: orangeBg, border: orangeBd },
                        { label: 'IA', color: chromeColor, bg: chromeBg, border: chromeBd },
                      ].map((p) => (
                        <span
                          key={p.label}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                          style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}
                        >
                          {p.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Floating stat : clients */}
                  <div
                    className="absolute -top-5 -right-8 px-4 py-2.5 rounded-[14px] text-center"
                    style={{ background: 'rgba(9,9,11,0.88)', border: `1px solid ${violetBd}`, backdropFilter: 'blur(12px)' }}
                  >
                    <p className="font-bold text-xl leading-none" style={{ color: violetColor }}>700+</p>
                    <p className="text-text-muted text-[10px] mt-0.5">Clients</p>
                  </div>

                  {/* Floating stat : expérience */}
                  <div
                    className="absolute -bottom-5 -left-8 px-4 py-2.5 rounded-[14px] text-center"
                    style={{ background: 'rgba(9,9,11,0.88)', border: `1px solid ${orangeBd}`, backdropFilter: 'blur(12px)' }}
                  >
                    <p className="font-bold text-xl leading-none" style={{ color: orangeColor }}>10+</p>
                    <p className="text-text-muted text-[10px] mt-0.5">Ans d&apos;expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      <LogoBanner label="700+ clients accompagnés" />

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
                    <v.Icon size={22} style={{ color: chromeColor }} />
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
                    Actif depuis 2015, il fonde DKDP officiellement à Genève en 2019 avec un positionnement clair : apporter aux PME
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
                      style={{ color: chromeColor }}
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

      {/* ── Équipe ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.06)"
        blob2="rgba(255,107,0,0.04)"
        accentRgb="156,163,175"
        className="border-b border-border"
      >
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-6">L&apos;équipe</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Quatre experts, une seule vision.
                </h2>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EQUIPE.map((member, i) => (
                <SectionReveal key={member.name} delay={i * 0.1}>
                  <div
                    className="flex flex-col rounded-[20px] overflow-hidden h-full"
                    style={{ background: member.cardBg, border: `1px solid ${member.border}` }}
                  >
                    {/* Portrait */}
                    <div
                      className="relative h-64 flex items-end justify-center overflow-hidden"
                      style={{ background: 'rgba(0,0,0,0.25)' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${member.color}22 0%, transparent 70%)` }}
                      />
                      <Image
                        src={member.src}
                        alt={member.name}
                        fill
                        className="relative z-10 object-contain object-bottom"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        style={('imageScale' in member || 'imageOffsetX' in member) ? {
                          transform: `translateX(${(member as { imageOffsetX?: number }).imageOffsetX ?? 0}px) scale(${(member as { imageScale?: number }).imageScale ?? 1})`,
                          transformOrigin: 'bottom center',
                        } : undefined}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-col gap-4 p-6 flex-1">
                      <div>
                        <p className="text-white font-bold text-lg leading-tight">{member.name}</p>
                        <p className="text-[11px] font-semibold mt-1 uppercase tracking-wider" style={{ color: member.color }}>{member.role}</p>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(0,0,0,0.30)', border: `1px solid ${member.border}`, color: member.color }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Liens */}
                      {(member.email || member.linkedin) && (
                        <div
                          className="mt-auto pt-4 border-t flex flex-wrap gap-3"
                          style={{ borderColor: member.border }}
                        >
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors"
                            >
                              <Mail size={12} style={{ color: member.color }} />
                              {member.email}
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: member.color }}>
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              LinkedIn
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </HeroBg>

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
                    style={{ color: chromeColor }}
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
      <CTAFinal accentRgb="156,163,175" />
    </main>
  )
}
