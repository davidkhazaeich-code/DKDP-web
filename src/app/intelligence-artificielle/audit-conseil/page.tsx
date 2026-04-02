import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BrainCircuit,
  ChevronRight,
  CheckCircle2,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Database,
  Cpu,
  Layers,
  Clock,
  Bot,
  Workflow,
  Star,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FAQSection } from '@/components/sections/FAQSection'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Audit IA Genève · Identifiez vos 3 actions à fort ROI · DKDP',
  description: "Audit de votre potentiel d'automatisation par l'IA. On identifie les 3 actions à fort ROI pour votre entreprise. Sans engagement. Genève, Suisse romande.",
  alternates: { canonical: 'https://dkdp.ch/intelligence-artificielle/audit-conseil' },
}

const color  = '#D4D4D8'
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const green  = '#4ade80'
const violet = '#A78BFA'

// ── Inline visual component ──────────────────────────────────────────────────

function AuditScoreCard() {
  const rows = [
    { label: 'Qualification des leads', niveau: 'Elevé', gain: '12h/semaine', roi: 'x4.2', niveauColor: green },
    { label: 'Traitement des emails',   niveau: 'Moyen', gain: '5h/semaine',  roi: 'x2.8', niveauColor: '#FBBF24' },
    { label: 'Reporting mensuel',       niveau: 'Elevé', gain: '8h/semaine',  roi: 'x3.5', niveauColor: green },
  ]

  return (
    <div
      className="rounded-[20px] p-6 border w-full"
      style={{ background: 'rgba(212,212,216,0.04)', borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-white font-bold text-[15px]">Résultat de votre audit IA</p>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(74,222,128,0.12)', color: green, border: `1px solid rgba(74,222,128,0.25)` }}
        >
          Potentiel élevé
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 gap-2 mb-2 px-1">
        <p className="text-[9px] font-bold uppercase tracking-wider col-span-2" style={{ color: `${color}60` }}>Opportunité</p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-center" style={{ color: `${color}60` }}>Gain</p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-right" style={{ color: `${color}60` }}>ROI</p>
      </div>

      {/* Rows */}
      <div className="space-y-2 mb-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 items-center p-3 rounded-[10px]"
            style={{ background: 'rgba(212,212,216,0.05)', border: `1px solid ${border}` }}
          >
            <div className="col-span-2">
              <p className="text-white text-[12px] font-semibold leading-tight">{row.label}</p>
              <span
                className="text-[9px] font-bold uppercase tracking-wider"
                style={{ color: row.niveauColor }}
              >
                {row.niveau}
              </span>
            </div>
            <p className="text-[11px] text-center" style={{ color }}>{row.gain}</p>
            <p className="text-[12px] font-bold text-right" style={{ color: green }}>{row.roi}</p>
          </div>
        ))}
      </div>

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-[11px] font-semibold" style={{ color }}>Score d&apos;automatisabilité</p>
          <p className="text-[12px] font-bold" style={{ color: green }}>78/100</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(212,212,216,0.12)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: '78%', background: `linear-gradient(to right, ${green}, #22c55e)` }}
          />
        </div>
      </div>

      {/* Footer */}
      <p className="text-[9px] text-center mt-4" style={{ color: `${color}40` }}>
        Exemple de résultat d&apos;audit. Votre situation peut différer.
      </p>
    </div>
  )
}

// ── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "L'audit est-il vraiment sans engagement ?",
    answer:
      "Oui. L'audit coûte CHF 490 ou CHF 890 selon la formule, mais il n'y a aucune obligation de suite. Vous repartez avec un rapport complet que vous pouvez mettre en oeuvre seul, avec un autre prestataire, ou avec nous. Notre conviction : si le travail est de qualité, vous reviendrez. Beaucoup le font.",
  },
  {
    question: "Combien de temps dure la session d'audit ?",
    answer:
      "La session initiale de cadrage dure 60 minutes. Nous analysons ensuite vos processus en interne pendant 24 à 48h. Vous recevez votre rapport complet dans les 48 heures suivant la session, puis nous planifions une session de présentation de 45 minutes avec votre équipe.",
  },
  {
    question: "Dois-je préparer quelque chose avant l'audit ?",
    answer:
      "Pas de préparation complexe requise. Il est utile de lister vos 5 à 10 tâches les plus chronophages et d'avoir acces à un apercu de vos outils principaux (CRM, logiciels de gestion, boite email). Nous guidons la session : vous n'avez qu'à répondre à nos questions.",
  },
  {
    question: "Que se passe-t-il après l'audit ?",
    answer:
      "Vous recevez un rapport PDF complet avec 3 actions priorisées et leur ROI estimé. Si vous souhaitez aller plus loin, nous pouvons déployer les automatisations identifiées via nos services Agents IA, Automatisation métier ou Mise en place IA. Aucune obligation, vous choisissez votre rythme.",
  },
  {
    question: "Peut-on mettre en oeuvre les recommandations nous-memes ?",
    answer:
      "Tout à fait. Le rapport est rédigé pour etre actionnable en autonomie. Nous précisons les outils à utiliser, les étapes techniques et les ressources disponibles. Si vous préférez déléguer l'implémentation, nos équipes peuvent prendre en charge l'intégralité du déploiement.",
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function AuditConseilPage() {
  const schemaService = buildService({
    name: 'Audit et Conseil IA Genève',
    url: '/intelligence-artificielle/audit-conseil',
    description: "Audit de votre potentiel d'automatisation. On identifie les 3 actions à fort ROI dans votre entreprise. Sans engagement.",
  })

  const schemaFaq = buildFAQPage(FAQ_ITEMS)

  const schemaBreadcrumb = buildBreadcrumbList([
    { name: 'Accueil',                   url: 'https://dkdp.ch' },
    { name: 'Intelligence Artificielle', url: 'https://dkdp.ch/intelligence-artificielle' },
    { name: 'Audit et Conseil IA',       url: 'https://dkdp.ch/intelligence-artificielle/audit-conseil' },
  ])

  return (
    <main className="pt-14">
      <SchemaOrg schema={schemaService} />
      <SchemaOrg schema={schemaFaq} />
      <SchemaOrg schema={schemaBreadcrumb} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <InfiniteGrid
        accentRgb="212,212,216"
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <GradTag>Audit IA</GradTag>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(74,222,128,0.12)', color: green, border: `1px solid rgba(74,222,128,0.25)` }}
                  >
                    Sans engagement
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Découvrez exactement{' '}
                  <GradText as="span">où l&apos;IA peut vous aider.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8">
                  On identifie les 3 opportunités d&apos;automatisation à fort ROI dans votre entreprise. Résultats concrets en une session, rapport complet sous 48h.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Demander un audit IA
                  </LiquidMetalButton>
                  <p className="text-text-muted text-sm">Rapport complet en 48h</p>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-audit-conseil.webp"
                    alt="Audit IA et conseil pour PME en Suisse romande"
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
      </InfiniteGrid>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '1h',   label: 'Durée de la session d\'audit' },
              { value: '3',    label: 'Opportunités IA identifiées minimum' },
              { value: '48h',  label: 'Pour recevoir votre rapport complet' },
            ].map((s) => (
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

      {/* ── Subnav ── */}
      <div className="sticky top-14 z-30 border-b border-zinc-800 bg-[rgba(9,9,11,0.92)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between gap-2">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
              {[
                { label: 'Notre approche', href: '#approche' },
                { label: 'Ce que vous recevez', href: '#livrables' },
                { label: 'Processus', href: '#process' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'FAQ', href: '#faq' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold text-text-muted hover:text-white transition-colors duration-150 whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </nav>
            <Link
              href="/contact"
              className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80"
              style={{ background: 'rgba(212,212,216,0.10)', color: '#D4D4D8', border: '1px solid rgba(212,212,216,0.20)' }}
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Ce qu'on analyse ──────────────────────────────────────────────── */}
      <section id="approche" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: text */}
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Un audit structuré, pas une promesse vague.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-10">
                Avant de parler d&apos;IA, on comprend votre métier. Notre audit couvre quatre dimensions clés pour poser un diagnostic solide et vous donner des recommandations actionnables.
              </p>
              <div className="space-y-5">
                {[
                  {
                    Icon: Layers,
                    title: 'Cartographie de vos processus',
                    desc: 'Flux de travail, volumes traités, fréquences. On comprend comment votre entreprise fonctionne réellement.',
                  },
                  {
                    Icon: Cpu,
                    title: 'Analyse des outils en place',
                    desc: 'Stack actuel, intégrations possibles, compatibilité avec les solutions IA. Aucune reconstruction de votre infrastructure.',
                  },
                  {
                    Icon: Database,
                    title: 'Évaluation des données disponibles',
                    desc: 'Qualité, accessibilité, structure. Les données sont le carburant de l&apos;IA : on vérifie que le réservoir est là.',
                  },
                  {
                    Icon: BarChart3,
                    title: 'Calcul du potentiel ROI',
                    desc: 'Estimation concrète en heures économisées et en CHF. Pas de promesses floues : des chiffres basés sur votre situation.',
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 items-start">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={18} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-[15px] mb-1">{item.title}</p>
                        <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>

            {/* Right: AuditScoreCard */}
            <SectionReveal delay={0.15}>
              <AuditScoreCard />
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── Votre livrable ────────────────────────────────────────────────── */}
      <section id="livrables" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce que vous recevez</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Votre livrable complet.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                Pas un simple compte rendu. Un plan d&apos;action précis, prêt à être mis en oeuvre.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: FileText,
                num: '01',
                title: 'Rapport d\'audit complet',
                tag: 'PDF',
                items: [
                  'Cartographie de vos processus',
                  'Potentiel d\'automatisation par domaine',
                  'Recommandations priorisées',
                ],
              },
              {
                Icon: Target,
                num: '02',
                title: 'Plan d\'action sur 90 jours',
                tag: 'Stratégie',
                items: [
                  '3 quick wins priorisés',
                  'Estimation ROI pour chacun',
                  'Ordre de déploiement conseillé',
                ],
              },
              {
                Icon: Calendar,
                num: '03',
                title: 'Session de présentation',
                tag: '45 min',
                items: [
                  'Walkthrough du rapport avec votre équipe',
                  'Questions et réponses',
                  'Recommandation d\'outils',
                ],
              },
            ].map((d, i) => (
              <SectionReveal key={d.title} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${border}` }}
                    >
                      <d.Icon size={20} style={{ color }} />
                    </div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(212,212,216,0.08)', color: `${color}80`, border: `1px solid ${border}` }}
                    >
                      {d.tag}
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold mb-1"
                    style={{ color: `${color}50` }}
                  >
                    {d.num}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-4">{d.title}</h3>
                  <ul className="space-y-2.5 flex-1">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: green }} />
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Comment ça se passe</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                4 étapes, de l&apos;appel au rapport.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  n: '01',
                  Icon: Clock,
                  title: 'Entretien de cadrage',
                  duration: '30 min',
                  desc: 'On comprend votre métier, vos outils et vos objectifs. Pas de jargon : une vraie conversation sur ce qui vous ralentit.',
                },
                {
                  n: '02',
                  Icon: Layers,
                  title: 'Analyse et cartographie',
                  duration: '24-48h',
                  desc: 'On travaille en interne. Analyse de vos processus, identification des opportunités, calcul du potentiel de chaque automatisation.',
                },
                {
                  n: '03',
                  Icon: FileText,
                  title: 'Rapport et recommandations',
                  duration: 'Livraison',
                  desc: 'Document complet avec 3 actions priorisées, ROI estimé pour chacune et recommandations d\'outils concrètes.',
                },
                {
                  n: '04',
                  Icon: Calendar,
                  title: 'Session de présentation',
                  duration: '45 min',
                  desc: 'Walkthrough du rapport avec votre équipe. Questions, réponses et plan d\'action. Vous repartez avec un cap clair.',
                },
              ].map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div
                    className="relative flex flex-col gap-4 p-7 rounded-[16px] border h-full"
                    style={{ background: bg, borderColor: border }}
                  >
                    <span
                      className="absolute top-4 right-4 text-[11px] font-bold"
                      style={{ color: `${color}60` }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${border}` }}
                    >
                      <step.Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest"
                        style={{ color: green }}
                      >
                        {step.duration}
                      </span>
                      <h3 className="text-white font-bold text-lg mt-1">{step.title}</h3>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Un investissement, un plan concret.
              </h2>
              <p className="text-text-secondary mt-4 max-w-lg mx-auto text-[15px]">
                Offert pour les entreprises qui engagent DKDP pour la mise en place qui suit.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Standard */}
            <SectionReveal>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>Audit Standard</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-white">CHF 490</span>
                </div>
                <p className="text-text-muted text-sm mb-8">Idéal pour les PME souhaitant tester l&apos;IA sur un département précis</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Cartographie d\'un département',
                    '1 rapport d\'audit complet (PDF)',
                    '3 actions priorisées avec ROI',
                    'Session de présentation 45 min',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Choisir l&apos;audit standard
                </LiquidMetalButton>
              </div>
            </SectionReveal>

            {/* Complet */}
            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(212,212,216,0.04) 100%)',
                  borderColor: 'rgba(167,139,250,0.30)',
                  boxShadow: '0 0 40px rgba(167,139,250,0.07)',
                }}
              >
                {/* Popular badge */}
                <span
                  className="absolute top-5 right-5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommandé PME
                </span>

                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: violet }}>Audit Complet</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-white">CHF 890</span>
                </div>
                <p className="text-text-muted text-sm mb-8">Pour les entreprises prêtes à déployer l&apos;IA à l&apos;échelle de toute la structure</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Audit de toute l\'entreprise',
                    'Rapport multi-départements',
                    '2 sessions de présentation',
                    'Plan 90 jours détaillé',
                    'Recommandations d\'outils complètes',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: violet }} />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Choisir l&apos;audit complet
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <InfiniteGrid accentRgb="212,212,216" blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que nos clients ont découvert.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Sandra M.',
                role: 'Directrice, cabinet comptable',
                quote: "Je pensais que notre processus de traitement des factures était incontournable. L'audit a révélé qu'on pouvait automatiser 70% du flux en quelques semaines. Je n'aurais jamais identifié ça seule. Le rapport m'a donné un plan d'action concret, pas des généralités.",
                stars: 5,
              },
              {
                name: 'Thomas V.',
                role: 'Fondateur, e-commerce B2B',
                quote: "Ce qui m'a surpris, c'est la profondeur de l'analyse. En 48h, David avait cartographié nos processus mieux que nous ne l'avions jamais fait. Les 3 opportunités identifiées représentaient chacune un gain de temps réel et mesurable. On a commencé par la plus simple : ROI positif en 3 semaines.",
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-8"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-[15px] flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-white font-semibold text-[14px]">{t.name}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </InfiniteGrid>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <div id="faq" className="scroll-mt-[112px]">
        <FAQSection items={FAQ_ITEMS} title="Vos questions sur l'audit IA." />
      </div>

      {/* ── Bridge to other IA services ───────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-3">
                Après votre audit
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em]">
                Passez à la mise en oeuvre.
              </h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto text-[15px]">
                L&apos;audit pose le diagnostic. Ces trois services déploient les solutions identifiées.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: '/intelligence-artificielle/agents-ia',
                Icon: Bot,
                accent: violet,
                accentBg: 'rgba(167,139,250,0.10)',
                accentBorder: 'rgba(167,139,250,0.22)',
                label: 'Agents IA',
                title: 'Agents IA sur mesure',
                desc: 'Des agents qui automatisent vos tâches répétitives, répondent à vos clients et analysent vos données, 24h/24.',
              },
              {
                href: '/intelligence-artificielle/automatisation',
                Icon: Workflow,
                accent: '#60A5FA',
                accentBg: 'rgba(96,165,250,0.10)',
                accentBorder: 'rgba(96,165,250,0.22)',
                label: 'Automatisation',
                title: 'Automatisation métier',
                desc: 'Workflows sans code qui connectent vos outils CRM, email et ERP. Les tâches manuelles disparaissent.',
              },
              {
                href: '/intelligence-artificielle/mise-en-place',
                Icon: Cpu,
                accent: '#F472B6',
                accentBg: 'rgba(244,114,182,0.10)',
                accentBorder: 'rgba(244,114,182,0.22)',
                label: 'Mise en place',
                title: 'Mise en place IA',
                desc: 'Intégration de ChatGPT, Claude et LLMs dans votre stack existant. Sans tout reconstruire.',
              },
            ].map((link, i) => (
              <SectionReveal key={link.href} delay={i * 0.08}>
                <Link
                  href={link.href}
                  className="group flex flex-col h-full rounded-[16px] border p-7 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: link.accentBg, borderColor: link.accentBorder }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: `${link.accentBg}`, border: `1px solid ${link.accentBorder}` }}
                  >
                    <link.Icon size={20} style={{ color: link.accent }} />
                  </div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: link.accent }}
                  >
                    {link.label}
                  </p>
                  <h3 className="text-white font-bold text-lg mb-3">{link.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{link.desc}</p>
                  <span
                    className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
                    style={{ color: link.accent }}
                  >
                    En savoir plus <ChevronRight size={12} />
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAFinal ──────────────────────────────────────────────────────── */}
      <CTAFinal />

    </main>
  )
}
