import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Database,
  Mail,
  LayoutGrid,
  Receipt,
  ShoppingCart,
  BarChart2,
  Zap,
  GitMerge,
  Users,
  MapPin,
  Bot,
  BrainCircuit,
  GraduationCap,
  Star,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import dynamic from 'next/dynamic'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const WorkflowDiagram = dynamic(() => import('./_components/WorkflowDiagram').then(m => m.WorkflowDiagram))

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Automatisation Métier IA Genève · Workflows sans code · DKDP',
  description:
    'Connectez votre CRM, email et ERP avec des workflows IA sans code. Zéro saisie manuelle, zéro friction. Livraison en 2 semaines. PME Genève et Suisse romande.',
  alternates: { canonical: 'https://dkdp.ch/intelligence-artificielle/automatisation' },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const violet = violetToken.color
const green  = greenToken.color

// ─── Data ─────────────────────────────────────────────────────────────────────
const TOOL_CATEGORIES = [
  {
    Icon: Database,
    title: 'CRM',
    tools: 'HubSpot, Salesforce, Pipedrive',
  },
  {
    Icon: Mail,
    title: 'Email et communication',
    tools: 'Gmail, Outlook, Slack',
  },
  {
    Icon: LayoutGrid,
    title: 'Gestion de projet',
    tools: 'Notion, Asana, Monday.com',
  },
  {
    Icon: Receipt,
    title: 'Facturation et ERP',
    tools: 'Abacus, Bexio, SAP',
  },
  {
    Icon: ShoppingCart,
    title: 'E-commerce',
    tools: 'WooCommerce, Shopify',
  },
  {
    Icon: BarChart2,
    title: 'Données et rapports',
    tools: 'Google Sheets, Excel, Power BI',
  },
]

const PROCESS_STEPS = [
  {
    Icon: MapPin,
    n: '01',
    title: 'Cartographie',
    desc: "On identifie vos processus manuels et leur coût réel en temps. Workshop d'1 heure avec votre équipe : résultat concret, liste priorisée.",
  },
  {
    Icon: Zap,
    n: '02',
    title: 'Prototype',
    desc: 'Premier workflow automatisé livré en 2 semaines. Testable en conditions réelles, modifiable avant validation finale.',
  },
  {
    Icon: GitMerge,
    n: '03',
    title: 'Intégration',
    desc: 'Connexion à vos outils existants. Zéro rupture dans vos processus actuels, zéro reconstruction de votre stack.',
  },
  {
    Icon: Users,
    n: '04',
    title: 'Formation et autonomie',
    desc: 'Vos équipes prennent le pilotage. On assure le suivi pendant 3 mois pour optimiser et ajuster selon vos retours.',
  },
]

const FAQ = [
  {
    question: 'Faut-il des compétences techniques pour utiliser les workflows ?',
    answer:
      "Non. Les workflows sont conçus pour être pilotés par vos équipes sans aucune compétence en développement. On vous forme pour que vous puissiez les consulter, les déclencher manuellement si besoin, et comprendre ce qui se passe. Toute modification technique reste de notre côté.",
  },
  {
    question: 'Quels outils pouvez-vous connecter ?',
    answer:
      "On connecte la quasi-totalité des outils cloud du marché : CRM (HubSpot, Salesforce, Pipedrive), email (Gmail, Outlook), gestion de projet (Notion, Asana, Monday), facturation (Abacus, Bexio), e-commerce (Shopify, WooCommerce), et reporting (Google Sheets, Power BI). Si votre outil dispose d'une API, on peut l'intégrer.",
  },
  {
    question: "Que se passe-t-il si un outil change ou met à jour son API ?",
    answer:
      "C'est inclus dans le suivi post-livraison. Pendant les 3 premiers mois, toute interruption liée à un changement d'API ou de configuration est prise en charge sans frais supplémentaires. Au-delà, on propose une maintenance mensuelle pour garantir la continuité de vos automatisations.",
  },
  {
    question: 'Peut-on automatiser des processus métier complexes ?',
    answer:
      "Oui. Les workflows no-code modernes gèrent des logiques conditionnelles avancées, des branchements multiples, des appels à des modèles IA pour la prise de décision, et des intégrations en temps réel. On a automatisé des processus de qualification de leads sur 12 critères, des pipelines de facturation multi-devises, et des onboardings clients complets.",
  },
  {
    question: "Quelle différence avec un développeur qui code une intégration ?",
    answer:
      "Une intégration codée est plus rigide et plus coûteuse à maintenir. Si votre CRM change de version ou si vous adoptez un nouvel outil, refactoriser du code prend du temps et de l'argent. Les workflows no-code sont modulaires, visuellement lisibles, et modifiables en quelques minutes. Ils conviennent à 95% des besoins d'automatisation des PME.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Avant, mon assistante passait deux heures chaque matin à saisir les commandes dans notre ERP. Aujourd'hui, c'est instantané et sans erreur. On a récupéré 40 heures par mois sur une seule tâche.",
    author: 'Responsable opérations, société de distribution',
    location: 'Genève',
  },
  {
    quote:
      "Le workflow de relance automatique a transformé notre taux de recouvrement. On ne perd plus de factures dans les boites email. DKDP a tout mis en place en trois semaines, sans toucher à notre Bexio.",
    author: 'Directeur financier, PME industrielle',
    location: 'Vaud',
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AutomationPage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildService({
          name: 'Automatisation métier IA Genève',
          url: '/intelligence-artificielle/automatisation',
          description:
            'Workflows sans code qui connectent votre CRM, email et ERP pour éliminer les tâches manuelles répétitives.',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Intelligence Artificielle', url: 'https://dkdp.ch/intelligence-artificielle' },
          { name: 'Automatisation métier', url: 'https://dkdp.ch/intelligence-artificielle/automatisation' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.09)"
        blob2="rgba(124,58,237,0.08)"
        accentRgb="212,212,216"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/intelligence-artificielle"
                className="text-text-muted text-sm hover:text-white transition-colors"
              >
                Intelligence Artificielle
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Automatisation métier</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Automatisation IA</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Vos outils parlent enfin{' '}
                  <GradText as="span">entre eux.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Workflows sans code qui connectent votre CRM, vos emails et votre ERP. Fini la saisie manuelle, les relances oubliées et les données perdues entre les outils. Zéro friction, zéro ligne de code.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Planifier un appel gratuit
                  </LiquidMetalButton>
                  <Link
                    href="#comment-ca-marche"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Comment ca marche <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-automatisation.webp"
                    alt="Automatisation métier IA pour PME en Suisse romande"
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

      {/* ── Stats bar ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '70%', label: 'Tâches répétitives automatisables en moyenne' },
              { value: '2 sem.', label: 'Pour un premier workflow en production' },
              { value: '0 ligne', label: 'De code nécessaire pour vos équipes' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.value}</p>
                  <p className="text-text-muted text-sm">{s.label}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subnav ── */}
      <div className="sticky top-[66px] z-30 px-6 pt-1.5">
        <div className="max-w-[1200px] mx-auto rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-2xl px-5">
          <div className="flex items-center justify-between gap-2">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
              {[
                { label: 'Pourquoi automatiser', href: '#pourquoi' },
                { label: 'Outils & intégrations', href: '#outils' },
                { label: 'Processus', href: '#comment-ca-marche' },
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

      {/* ── Pourquoi automatiser ── */}
      <section id="pourquoi" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi automatiser</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Chaque minute perdue sur du copier-coller est une minute de moins pour votre vrai travail.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Les PME perdent en moyenne 5 heures par semaine et par collaborateur sur des tâches de transfert de données entre outils. Ce n&apos;est pas un problème d&apos;organisation : c&apos;est un problème de connexion entre systèmes.
              </p>
              <div className="space-y-3">
                {[
                  'Saisie manuelle entre outils non connectés',
                  'Relances clients et fournisseurs oubliées',
                  'Erreurs humaines coûteuses lors des transferts de données',
                  'Reporting manuel qui prend des heures chaque semaine',
                ].map((pain, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{pain}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center"
                  style={{ color }}
                >
                  Avant vs Après automatisation
                </p>
                <WorkflowDiagram />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Outils connectés ── */}
      <section id="outils" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Outils connectés</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Vos outils actuels restent en place.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                On connecte ce que vous avez déjà. Pas besoin de changer d&apos;outil, pas de migration, pas de formation complète. Vos équipes continuent de travailler comme avant, sans les frictions.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOL_CATEGORIES.map((cat, i) => (
              <SectionReveal key={cat.title} delay={i * 0.08}>
                <div
                  className="flex flex-col gap-4 p-6 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                    style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${border}` }}
                  >
                    <cat.Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">{cat.title}</h3>
                    <p className="text-text-muted text-sm">{cat.tools}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="comment-ca-marche" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                De l&apos;idée au workflow en production.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line, desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />

            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, i) => (
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

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des forfaits clairs, sans surprise.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Chaque projet est cadré et validé avant démarrage. Vous savez exactement ce que vous obtenez et quand.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                label: 'Starter',
                price: "CHF 1'500",
                sub: 'Paiement unique',
                highlight: false,
                features: [
                  '1 workflow automatisé',
                  '2 outils connectés',
                  'Livraison en 2 semaines',
                  '1 mois de suivi post-livraison',
                  'Formation utilisation incluse',
                ],
                cta: 'Démarrer avec Starter',
              },
              {
                label: 'Business',
                price: "CHF 3'500",
                sub: 'Le plus complet',
                highlight: true,
                features: [
                  "Jusqu'à 5 workflows",
                  'Outils connectés illimités',
                  'Livraison en 4 semaines',
                  '3 mois de suivi post-livraison',
                  'Formation équipe complète',
                  'Rapport de performance mensuel',
                ],
                cta: 'Démarrer avec Business',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? violet : border,
                    boxShadow: offer.highlight ? '0 0 40px rgba(124,58,237,0.15)' : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: violet }}
                    />
                  )}
                  <div
                    className="p-7 flex flex-col flex-1"
                    style={{ background: offer.highlight ? 'rgba(124,58,237,0.08)' : 'transparent' }}
                  >
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{
                          background: 'rgba(124,58,237,0.15)',
                          color: violet,
                          border: '1px solid rgba(124,58,237,0.30)',
                        }}
                      >
                        Le plus complet
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p
                      className="text-2xl font-bold mb-1"
                      style={{ color: offer.highlight ? violet : color }}
                    >
                      {offer.price}
                    </p>
                    <p className="text-text-muted text-xs mb-6">{offer.sub}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={14}
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: offer.highlight ? violet : color }}
                          />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact?service=intelligence-artificielle"
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? violet : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${offer.highlight ? 'transparent' : border}`,
                      }}
                    >
                      {offer.cta} <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que disent nos clients.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <blockquote className="text-text-secondary leading-relaxed text-sm flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection
          items={FAQ}
          title="Vos questions sur l'automatisation métier"
        />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Aller plus loin avec l&apos;IA
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/intelligence-artificielle/agents-ia"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: border }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <Bot size={18} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color }}
                    >
                      Service IA
                    </p>
                    <p className="text-white font-semibold text-sm">Agents IA sur mesure</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Des agents qui pensent et agissent pour vous.
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Link
                href="/intelligence-artificielle/audit-conseil"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: border }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <BrainCircuit size={18} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color }}
                    >
                      Service IA
                    </p>
                    <p className="text-white font-semibold text-sm">Audit et Conseil IA</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Identifiez vos 3 actions à fort ROI.
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Link
                href="/formation-entreprise/ia"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{
                  background: 'rgba(255,107,0,0.06)',
                  borderColor: 'rgba(255,107,0,0.22)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] flex-shrink-0"
                    style={{
                      background: 'rgba(255,107,0,0.10)',
                      border: '1px solid rgba(255,107,0,0.22)',
                    }}
                  >
                    <GraduationCap size={18} style={{ color: '#FF8C00' }} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: '#FF8C00' }}
                    >
                      Formation
                    </p>
                    <p className="text-white font-semibold text-sm">Formation IA en entreprise</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Vos équipes autonomes en une journée.
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: '#FF8C00' }}
                />
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
