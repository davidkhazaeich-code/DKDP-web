import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Bot,
  Users,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Wrench,
  Rocket,
  TrendingUp,
  Star,
  MessageSquare,
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
const AgentTypesGrid = dynamic(() => import('./_components/AgentTypesGrid').then(m => m.AgentTypesGrid))

export const metadata: Metadata = {
  title: 'Agents IA sur mesure pour entreprises à Genève | DKDP',
  description: "Développement d'agents IA sur mesure pour PME à Genève et en Suisse romande. Automatisation, support client, analyse de données. Opérationnel en 2 semaines.",
  alternates: { canonical: 'https://dkdp.ch/intelligence-artificielle/agents-ia' },
  openGraph: {
    images: [{ url: '/images/og/agents-ia.png', width: 1376, height: 768, alt: 'Agents IA sur mesure entreprise Genève DKDP' }],
  },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const violet = violetToken.color
const green  = greenToken.color

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre un agent IA et un simple chatbot ?",
    answer:
      "Un chatbot répond à des mots-clés prédéfinis selon un arbre de décision fixe. Un agent IA perçoit le contexte de chaque interaction, prend des décisions autonomes basées sur vos règles métier, s'intègre à vos outils (CRM, email, bases de données) et execute des actions concrètes sans intervention humaine. C'est la différence entre un formulaire intelligent et un collaborateur autonome.",
  },
  {
    question: "En quelles langues l'agent peut-il communiquer ?",
    answer:
      "Les agents DKDP fonctionnent nativement en français, anglais, allemand et italien. Pour des marchés spécifiques, d'autres langues peuvent être intégrées selon votre contexte. L'agent détecte automatiquement la langue de l'interlocuteur et répond dans la même langue.",
  },
  {
    question: "Comment mes données sont-elles protégées ?",
    answer:
      "La sécurité des données est une priorité absolue. Selon vos contraintes, on déploie l'agent sur votre infrastructure (cloud privé ou on-premise) ou via des providers conformes RGPD et aux lois suisses sur la protection des données. Vos données ne servent jamais à entraîner des modèles tiers. Un accord de confidentialité est systématiquement signé.",
  },
  {
    question: "Qui maintient l'agent une fois déployé ?",
    answer:
      "DKDP assure un suivi de 3 mois post-déploiement inclus dans chaque projet. Durant cette période, on surveille les performances, on ajuste les comportements et on traite les cas limites identifiés. Au-delà, une maintenance mensuelle peut être mise en place. Vos équipes recoivent aussi une formation pour gérer les ajustements courants de manière autonome.",
  },
  {
    question: "Que se passe-t-il si l'agent commet une erreur ?",
    answer:
      "Chaque agent est concu avec un seuil de confiance. En dessous de ce seuil, il escalade automatiquement vers un humain plutot que de répondre de facon incorrecte. Les erreurs sont loggées et analysées lors du suivi mensuel. Dans les premières semaines, on recommande une validation humaine sur un sous-ensemble des interactions pour calibrer le comportement.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AgentsIAPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildService({
          name: 'Agents IA sur mesure Genève',
          url: '/intelligence-artificielle/agents-ia',
          description:
            'Des agents IA sur mesure qui automatisent vos tâches répétitives, répondent à vos clients et analysent vos données. Déployés en 2 semaines pour votre métier.',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Intelligence Artificielle', url: 'https://dkdp.ch/intelligence-artificielle' },
          { name: 'Agents IA', url: 'https://dkdp.ch/intelligence-artificielle/agents-ia' },
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
              <Link href="/intelligence-artificielle" className="text-text-muted text-sm hover:text-white transition-colors">
                Intelligence Artificielle
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Agents IA</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Agents IA</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Agents IA sur mesure{' '}
                  <GradText as="span">pour votre entreprise à Genève.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Vos tâches répétitives automatisées, vos clients répondus, vos données analysées.
                  Concu pour les PME en Suisse romande, opérationnel en 2 semaines.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Planifier un appel
                  </LiquidMetalButton>
                  <Link
                    href="#types-agents"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Voir les agents →
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offre mise à jour : avril 2026</p>
              </div>

              <div className="relative">
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-agents-ia.webp"
                    alt="Agents IA sur mesure pour PME en Suisse romande"
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
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '24/7', label: 'Disponibilité de l\'agent, sans congés ni erreurs de fatigue' },
              { value: '90%', label: 'Des requêtes traitées sans intervention humaine' },
              { value: '2 sem.', label: 'Pour un premier agent opérationnel' },
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
      <div className="sticky top-[66px] z-30 px-6 pt-1.5">
        <div className="max-w-[1200px] mx-auto rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-2xl px-5">
          <div className="flex items-center justify-between gap-2">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
              {[
                { label: 'Comment ça fonctionne', href: '#fonctionnement' },
                { label: 'Types d\'agents', href: '#types-agents' },
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

      {/* ── Comment ca fonctionne ── */}
      <section id="fonctionnement" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Comment ca fonctionne</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Agent IA vs chatbot : pourquoi les entreprises passent aux agents intelligents.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Un chatbot suit un script fixe et répond par mots-clés. Un vrai agent IA perçoit le contexte
                complet de chaque situation, prend des décisions autonomes et execute des actions concrètes
                dans vos outils. La différence est fondamentale pour vos résultats.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Comprend le contexte, pas juste des mots-clés',
                  'Prend des décisions basées sur vos règles métier',
                  'S\'intègre à vos outils existants : CRM, email, API',
                  'Apprend de chaque interaction pour s\'améliorer',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
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
                  Trois types d&apos;agents deployés chez nos clients
                </p>
                <AgentTypesGrid />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Types d'agents ── */}
      <section id="types-agents" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Nos agents</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl mx-auto">
                Nos agents IA pour entreprises : qualification, support et analyse.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Users,
                title: 'Agent de qualification commerciale',
                accent: violet,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.20)',
                pourQui: 'Pour les équipes sales et les PME avec des leads entrants',
                capabilities: [
                  'Traite plus de 100 leads par jour sans effort humain',
                  'Pose les questions de qualification selon votre script',
                  'Classe et enrichit votre CRM automatiquement',
                ],
                roi: '15h libérées par semaine en moyenne',
              },
              {
                Icon: MessageSquare,
                title: 'Agent de support client',
                accent: green,
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.18)',
                pourQui: 'Pour les e-commerces, SaaS et services avec forte volumétrie',
                capabilities: [
                  'Réduit le volume de tickets de 70% en moyenne',
                  'Disponible 24h/24, répond en moins de 3 secondes',
                  'Escalade les cas complexes avec le contexte complet',
                ],
                roi: 'CSAT client +25 points en 3 mois',
              },
              {
                Icon: BarChart3,
                title: "Agent d'analyse et reporting",
                accent: color,
                accentBg: bg,
                accentBorder: border,
                pourQui: 'Pour les managers et directions qui pilotent par les données',
                capabilities: [
                  'Lit vos fichiers, bases de données et tableaux de bord',
                  'Produit des rapports lisibles et actionnables',
                  'Alerte sur les anomalies ou tendances critiques',
                ],
                roi: '3h de reporting hebdomadaire éliminées',
              },
            ].map((agent, i) => (
              <SectionReveal key={agent.title} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: agent.accentBg, borderColor: agent.accentBorder }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: agent.accentBg, border: `1px solid ${agent.accentBorder}` }}
                  >
                    <agent.Icon size={22} style={{ color: agent.accent }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{agent.title}</h3>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: agent.accent }}>
                    Pour qui : {agent.pourQui}
                  </p>
                  <div className="flex flex-col gap-2 flex-1 mb-5">
                    {agent.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: agent.accent }} />
                        <span className="text-text-secondary text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: agent.accentBorder }}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: agent.accent }}>
                      ROI estimé
                    </p>
                    <p className="text-white text-sm font-semibold">{agent.roi}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Processus ── */}
      <section id="comment-ca-marche" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre processus</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Développement de votre agent IA en 4 étapes.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  Icon: Wrench,
                  n: '01',
                  title: 'Définition du périmètre',
                  desc: "On identifie ensemble le cas d'usage prioritaire, les données d'entrée et de sortie, et les règles métier qui guident les décisions de l'agent.",
                },
                {
                  Icon: Bot,
                  n: '02',
                  title: 'Construction et entraînement',
                  desc: 'Prompt engineering, connexion à vos outils existants, tests itératifs avec vos vraies données. L\'agent apprend votre contexte.',
                },
                {
                  Icon: Rocket,
                  n: '03',
                  title: 'Déploiement progressif',
                  desc: 'Mise en production sur un sous-ensemble réel, validation humaine en parallèle. On ajuste avant de passer à 100% du volume.',
                },
                {
                  Icon: TrendingUp,
                  n: '04',
                  title: 'Optimisation continue',
                  desc: 'Monitoring des performances, ajustements ciblés et rapport mensuel pendant 3 mois. Votre agent s\'améliore dans le temps.',
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
                Tarifs des agents IA pour PME.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Starter */}
            <SectionReveal delay={0.05}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                    Agent Starter
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-white">CHF 2&apos;500</span>
                  </div>
                  <p className="text-text-muted text-xs">Tarif fixe, projet clé en main</p>
                </div>
                <div className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    '1 agent sur mesure',
                    '1 canal : email ou chat',
                    'Livraison en 2 semaines',
                    '1 mois de suivi post-déploiement',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Démarrer avec Starter
                </LiquidMetalButton>
              </div>
            </SectionReveal>

            {/* Pro */}
            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 100%)',
                  borderColor: 'rgba(167,139,250,0.30)',
                  boxShadow: '0 0 50px rgba(167,139,250,0.08)',
                }}
              >
                <span
                  className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommandé
                </span>
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>
                    Agent Pro
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-white">CHF 4&apos;900</span>
                  </div>
                  <p className="text-text-muted text-xs">Tarif fixe, projet clé en main</p>
                </div>
                <div className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    "Jusqu'à 3 agents sur mesure",
                    'Multi-canal : email, chat, WhatsApp',
                    'Intégrations CRM et outils métier',
                    'Livraison en 4 semaines',
                    '3 mois de suivi et reporting mensuel',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: violet }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Démarrer avec Pro
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Temoignages ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Témoignages clients : agents IA déployés à Genève.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionReveal delay={0.05}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={color} style={{ color }} />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                  &ldquo;On recevait entre 80 et 120 demandes de devis par semaine. Mon équipe passait
                  deux jours complets à les trier et qualifier. Aujourd&apos;hui l&apos;agent filtre,
                  répond et classe dans le CRM en moins d&apos;une minute. On a libéré 18 heures
                  par semaine sur une tâche qui n&apos;avait aucune valeur ajoutée.&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">Marc-Antoine V.</p>
                  <p className="text-text-muted text-xs">Directeur commercial, agence immobilière, Genève</p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={color} style={{ color }} />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                  &ldquo;Notre support client était sous pression : 200 emails par jour, trois personnes
                  débordées. DKDP a déployé un agent en deux semaines. Aujourd&apos;hui 70% des
                  demandes sont résolues automatiquement. Nos équipes traitent uniquement les cas
                  vraiment complexes. Le score de satisfaction a augmenté de 22 points.&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">Sophie B.</p>
                  <p className="text-text-muted text-xs">Head of Customer Success, SaaS B2B, Lausanne</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ_ITEMS} title="Vos questions sur les agents IA." />
      </div>

      {/* ── Autres services ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Compléter votre démarche IA
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/intelligence-artificielle/automatisation"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.04)', borderColor: border }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>
                    Automatisation métier
                  </p>
                  <p className="text-white font-semibold text-sm">Connectez vos outils sans coder</p>
                  <p className="text-text-muted text-xs mt-1">
                    Workflows automatisés entre CRM, email, ERP et vos apps.
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Link
                href="/intelligence-artificielle/audit-conseil"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(74,222,128,0.05)', borderColor: 'rgba(74,222,128,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: green }}>
                    Audit et Conseil IA
                  </p>
                  <p className="text-white font-semibold text-sm">Identifiez vos 3 priorités IA</p>
                  <p className="text-text-muted text-xs mt-1">
                    Audit de potentiel, ROI estimé, plan d&apos;action. Sans engagement.
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: green }}
                />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Link
                href="/formation-entreprise/ia"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(255,107,0,0.06)', borderColor: 'rgba(255,107,0,0.20)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FF8C00' }}>
                    Formation IA
                  </p>
                  <p className="text-white font-semibold text-sm">Formez vos équipes en une journée</p>
                  <p className="text-text-muted text-xs mt-1">
                    ChatGPT, Claude, Copilot. Autonomes dès le lendemain.
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: '#FF8C00' }}
                />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <CTAFinal accentRgb="212,212,216" />
    </main>
  )
}
