import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Bot, Workflow, BrainCircuit, Cpu, ChevronRight, Clock, TrendingUp, ShieldCheck, GraduationCap, CheckCircle2, Layers, GitMerge, Zap, MessageCircle } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const ROICalculator = dynamic(() => import('@/components/sections/ROICalculator').then(m => ({ default: m.ROICalculator })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const AutomationDiagram = dynamic(() => import('./_components/AutomationDiagram').then(m => ({ default: m.AutomationDiagram })))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildBreadcrumbList, buildFAQPage } from '@/lib/schema'
import { FAQ_IA } from '@/data/faq-ia'
import { chrome } from '@/lib/tokens'

export const metadata: Metadata = {
  title: 'Agence IA Genève | Intelligence Artificielle pour PME | DKDP',
  description: 'Agence IA à Genève pour PME et entreprises. Agents IA sur mesure, automatisation des processus, audit et conseil. 700+ entreprises accompagnées en Suisse romande. Audit gratuit.',
  alternates: { canonical: 'https://dkdp.ch/intelligence-artificielle' },
  openGraph: {
    images: [{ url: '/images/og/intelligence-artificielle.png', width: 1376, height: 768, alt: 'Intelligence artificielle pour PME Genève DKDP' }],
  },
}

const SERVICES = [
  {
    Icon: Bot, title: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia',
    description: "Des agents intelligents qui automatisent vos tâches répétitives, répondent à vos clients ou analysent vos données. Conçus pour votre métier.",
    badge: 'Populaire',
    image: '/images/services/dkdp-ia-agents-ia.webp',
  },
  {
    Icon: Workflow, title: 'Automatisation métier', href: '/intelligence-artificielle/automatisation',
    description: 'Workflows sans code qui connectent vos outils (CRM, email, ERP) et éliminent les tâches manuelles. Zéro friction.',
    badge: null,
    image: '/images/services/dkdp-ia-automatisation.webp',
  },
  {
    Icon: BrainCircuit, title: 'Audit & Conseil IA', href: '/intelligence-artificielle/audit-conseil',
    description: "Audit de votre potentiel d'automatisation. On identifie les 3 actions à fort ROI dans votre entreprise.",
    badge: 'Best seller',
    image: '/images/services/dkdp-ia-audit-conseil.webp',
  },
  {
    Icon: Cpu, title: 'Mise en place IA', href: '/intelligence-artificielle/mise-en-place',
    description: "Intégration de ChatGPT, Claude et autres LLMs dans votre stack existant. Sans tout reconstruire.",
    badge: null,
    image: '/images/services/dkdp-ia-mise-en-place.webp',
  },
  {
    Icon: MessageCircle, title: 'Chatbot IA sur mesure', href: '/intelligence-artificielle/chatbot-ia',
    description: "Un assistant 24/7 conçu pour votre métier. Répondez à vos clients, qualifiez vos leads et prenez des rendez-vous automatiquement.",
    badge: 'Nouveau',
    image: '/images/services/dkdp-ia-agents-ia.webp',
  },
]

const STATS = [
  { value: '700+', label: 'Clients accompagnés' },
  { value: '10h', label: 'Économisées / semaine en moyenne' },
  { value: '3 mois', label: 'Pour un ROI positif' },
]

const BENEFITS = [
  {
    Icon: Clock, title: 'Gagnez du temps réel',
    desc: "L'IA prend en charge les tâches à faible valeur ajoutée. Vos équipes se concentrent sur ce qui compte vraiment.",
  },
  {
    Icon: TrendingUp, title: 'Croissance sans recrutement',
    desc: "Scaler votre activité sans multiplier les coûts humains. Un agent IA travaille 24h/24, 7j/7, sans erreur de fatigue.",
  },
  {
    Icon: ShieldCheck, title: 'Déploiement sécurisé',
    desc: 'On s\'assure que vos données restent confidentielles. Hébergement local ou cloud privé selon vos contraintes.',
  },
]

const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const badgeColors: Record<string, { background: string; color: string; border: string }> = {
  'Best seller': { background: 'rgba(10,10,10,0.84)', color: '#86efac', border: '1px solid rgba(74,222,128,0.68)' },
  'Populaire':   { background: 'rgba(10,10,10,0.84)', color: '#C4B5FD', border: '1px solid rgba(124,58,237,0.65)' },
  'Gratuit':     { background: 'rgba(10,10,10,0.84)', color: '#86efac', border: '1px solid rgba(74,222,128,0.60)' },
  'Nouveau':     { background: 'rgba(10,10,10,0.84)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.60)' },
}

export default function IntelligenceArtificiellePage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Intelligence Artificielle pour PME Genève', url: '/intelligence-artificielle', description: 'Agents IA sur mesure, automatisation des processus et conseil IA pour PME en Suisse romande.' })} />
      <SchemaOrg schema={buildBreadcrumbList([{ name: 'Accueil', url: '/' }, { name: 'Intelligence Artificielle', url: '/intelligence-artificielle' }])} />
      <SchemaOrg schema={buildFAQPage(FAQ_IA)} />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
        accentRgb="212,212,216"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Intelligence Artificielle</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Intelligence artificielle pour{' '}
                  <GradText as="span">PME à Genève.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  PME en Suisse romande : automatisez ce qui vous ralentit. Déployez l&apos;IA là où ça compte vraiment. On s&apos;occupe de tout, de l&apos;audit à la mise en production.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/intelligence-artificielle/audit-conseil" size="lg">
                    Demander un audit IA →
                  </LiquidMetalButton>
                  <Link href="#services" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir nos solutions ↓
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}>
                  <Image
                    src="/images/pillars/intelligence-artificielle.webp"
                    alt="Intelligence artificielle pour PME en Suisse romande"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {STATS.map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-white">{s.value}</p>
                  <p className="text-text-muted text-sm">{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contexte IA ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pourquoi les PME suisses adoptent l&apos;IA en 2026.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                En 2026, les PME qui n&apos;intègrent pas l&apos;IA dans leurs processus prennent du retard. Pas parce que c&apos;est une mode : parce que leurs concurrents répondent plus vite, produisent plus avec moins, et capturent les mêmes clients à moindre coût.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP identifie les 3 processus dans votre entreprise qui se prêtent le mieux à l&apos;automatisation par l&apos;IA. En moins d&apos;une heure, vous savez exactement où agir en premier.
              </p>
              <div className="space-y-3">
                {[
                  'Réduction du temps de traitement : 85% en moyenne',
                  'Coût opérationnel divisé par 3 sur les processus automatisés',
                  'Délai de mise en place : 2 à 6 semaines selon la complexité',
                  'Aucun recrutement supplémentaire nécessaire',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Avant vs Après automatisation IA
                </p>
                <AutomationDiagram />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section id="services" className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-14">
              <GradTag className="mb-4">Nos solutions</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Nos services d&apos;intelligence artificielle.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <SectionReveal key={s.href} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full bg-bg rounded-[14px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 relative"
                  style={{
                    borderColor: s.badge === 'Best seller' ? 'rgba(34,197,94,0.38)' : s.badge ? 'rgba(167,139,250,0.32)' : border,
                    boxShadow: s.badge ? '0 0 28px rgba(34,197,94,0.06)' : undefined,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    {s.badge && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={badgeColors[s.badge]}
                      >
                        {s.badge}
                      </span>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[7px] flex-shrink-0 mb-3"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <s.Icon size={16} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold text-[16px] mb-2">{s.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">{s.description}</p>
                    <span
                      className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                      style={{ color }}
                    >
                      En savoir plus <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          {/* ── Bridge Formation IA ── */}
          <SectionReveal delay={0.35}>
            <Link
              href="/formation-entreprise/ia"
              className="group mt-5 flex items-center justify-between gap-6 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.10) 0%, rgba(255,107,0,0.03) 100%)',
                borderColor: 'rgba(255,107,0,0.22)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.25)' }}
                >
                  <GraduationCap size={20} style={{ color: '#FF8C00' }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#FF8C00' }}>
                    Passez à l&apos;action
                  </p>
                  <p className="text-white font-semibold">
                    Formation IA pour vos équipes
                  </p>
                  <p className="text-text-muted text-[12.5px] mt-0.5">
                    Vos collaborateurs maîtrisent ChatGPT, Claude et Copilot en une journée.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                style={{ color: '#FF8C00' }}
              >
                Voir le programme <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>

        </div>
      </section>
      </HeroBg>

      {/* ── Benefits ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}>
                <Image
                  src="/images/services/dkdp-ia-audit-conseil.webp"
                  alt="Audit IA et conseil pour PME suisses"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
              </div>
            </SectionReveal>
            <div>
              <SectionReveal>
                <div className="mb-10">
                  <GradTag className="mb-4">Pourquoi l&apos;IA maintenant</GradTag>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                    Les bénéfices concrets de l&apos;IA pour votre entreprise.
                  </h2>
                </div>
              </SectionReveal>
              <div className="flex flex-col gap-6">
                {BENEFITS.map((b, i) => (
                  <SectionReveal key={b.title} delay={i * 0.1}>
                    <div className="flex gap-5 p-6 bg-bg-card border border-border rounded-[14px]">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <b.Icon size={22} style={{ color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculateur ROI ── */}
      <ROICalculator />

      {/* ── Méthode IA ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Notre méthode : de l&apos;audit IA à la production en 4 étapes.
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            {/* Ligne directrice horizontale - chrome métal */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />
          <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: Layers,
                n: '01',
                title: 'Audit des processus',
                desc: 'On cartographie vos flux de travail actuels et identifie les 3 processus à plus fort ROI d\'automatisation. Durée : 1 à 2 heures avec votre équipe.',
              },
              {
                Icon: GitMerge,
                n: '02',
                title: 'Prototype fonctionnel',
                desc: 'Un premier agent IA ou workflow automatisé opérationnel en moins de 2 semaines. Vous le testez en conditions réelles avant de valider.',
              },
              {
                Icon: Zap,
                n: '03',
                title: 'Déploiement et intégration',
                desc: 'Connexion à vos outils existants (CRM, email, ERP, Notion). Zéro friction, zéro reconstruction de votre stack technologique.',
              },
              {
                Icon: TrendingUp,
                n: '04',
                title: 'Formation et suivi',
                desc: 'Vos équipes apprennent à utiliser et ajuster les automatisations. Suivi mensuel pendant 3 mois pour optimiser les performances.',
              },
            ].map((step, i) => (
              <SectionReveal key={step.n} delay={i * 0.1}>
                <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold"
                    style={{ color: `${color}60` }}
                  >
                    {step.n}
                  </span>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <step.Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ── ROI ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">ROI mesurable</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Résultats clients : ROI mesurable de nos projets IA.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 items-stretch">
            {[
              { v: '85%', l: 'Réduction temps de traitement', sub: 'Sur les processus automatisés' },
              { v: '10h', l: 'Gagnées par semaine', sub: 'Par collaborateur en moyenne' },
              { v: '3 sem.', l: 'Premier prototype livré', sub: 'En conditions réelles' },
              { v: 'x3.1', l: 'ROI moyen à 6 mois', sub: 'Calculé sur les projets livrés' },
            ].map((kpi, i) => (
              <SectionReveal key={kpi.l} delay={i * 0.08} className="h-full">
                <div className="flex flex-col justify-center text-center h-full p-6 rounded-[14px] border" style={{ background: bg, borderColor: border }}>
                  <p className="text-3xl md:text-4xl font-bold mb-2 leading-none" style={{ color }}>{kpi.v}</p>
                  <p className="text-white text-sm font-semibold leading-snug">{kpi.l}</p>
                  <p className="text-text-muted text-xs mt-1 leading-snug">{kpi.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                sector: 'Agence immobilière',
                challenge: 'Qualification manuelle de 120 leads entrants par semaine',
                solution: 'Agent IA de pré-qualification connecté au CRM',
                result: '90% de leads qualifiés sans intervention humaine. 18h libérées par semaine.',
              },
              {
                sector: 'Cabinet RH',
                challenge: 'Traitement des CV et tri des candidatures en 3 jours ouvrés',
                solution: 'Pipeline IA : extraction, scoring, résumé et transmission automatiques',
                result: 'Délai réduit à 4 heures. Qualité de sélection améliorée de 40%.',
              },
              {
                sector: 'E-commerce B2B',
                challenge: 'Service client traité manuellement, 200 emails par jour',
                solution: 'Chatbot IA et routage intelligent des demandes complexes',
                result: '75% des demandes résolues sans agent humain. CSAT +22 points.',
              },
            ].map((c, i) => (
              <SectionReveal key={c.sector} delay={i * 0.1}>
                <div className="flex flex-col h-full rounded-[16px] border border-border p-6 bg-bg-card">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>
                    {c.sector}
                  </p>
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-text-muted text-xs font-semibold mb-1">Problème</p>
                      <p className="text-text-secondary text-sm">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-semibold mb-1">Solution déployée</p>
                      <p className="text-text-secondary text-sm">{c.solution}</p>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-white text-sm font-semibold">{c.result}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <LogoBanner label="Entreprises qui nous font confiance" />
      <Testimonials accentRgb="212,212,216" />

      {/* ── FAQ ── */}
      <FAQSection items={FAQ_IA} title="Vos questions sur l'intelligence artificielle" />

      {/* ── Ponts ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Compléter votre démarche IA
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/formation-entreprise/ia"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(255,107,0,0.07)', borderColor: 'rgba(255,107,0,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8C00' }}>Formation IA</p>
                  <p className="text-white font-semibold">Formez vos équipes en une journée</p>
                  <p className="text-text-muted text-xs mt-1">ChatGPT, Claude, Copilot. Vos collaborateurs autonomes dès demain.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#FF8C00' }} />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Link
                href="/agence-digitale"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#A78BFA' }}>Service Digital</p>
                  <p className="text-white font-semibold">Votre site et votre SEO optimisés</p>
                  <p className="text-text-muted text-xs mt-1">Création de sites, SEO, Google Ads. Présence digitale mesurable.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[#A78BFA] transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="212,212,216" />

    </main>
  )
}
