import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  CheckCircle2,
  Database,
  FileSearch,
  MessageSquare,
  Code2,
  Newspaper,
  MailOpen,
  ShieldCheck,
  Layers,
  GitMerge,
  Zap,
  BarChart2,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import dynamic from 'next/dynamic'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const LLMStackDiagram = dynamic(() => import('./_components/LLMStackDiagram').then(m => m.LLMStackDiagram))

export const metadata: Metadata = {
  title: 'Mise en place IA Genève · Intégration ChatGPT Claude LLM · DKDP',
  description: "Intégration de ChatGPT, Claude et autres LLMs dans votre stack existant. Couche d'orchestration sur mesure, prompt engineering, connexion à vos données. Sans tout reconstruire.",
  alternates: { canonical: 'https://dkdp.ch/intelligence-artificielle/mise-en-place' },
}

// ── Design tokens ──────────────────────────────────────────────
const color  = chrome.color
const bg     = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'
const violet = violetToken.color
const green  = greenToken.color

// ── Inline FAQ accordion ───────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: 'Nos donnees sont-elles en securite avec un LLM externe ?',
    answer:
      'La securite des donnees est notre priorite. On travaille avec des accords de confidentialite stricts et on configure les API OpenAI/Anthropic en mode "no training" pour que vos donnees ne soient jamais utilisees pour entrainer les modeles. Pour les donnees tres sensibles, on propose une integration avec des modeles heberges localement (Mistral auto-heberge, LLaMA via Ollama) qui ne quittent jamais votre infrastructure.',
  },
  {
    question: 'Comment choisir le bon LLM pour notre projet ?',
    answer:
      'Le choix du LLM depend de votre cas d\'usage : GPT-4o excelle sur les taches complexes, multilingues et avec vision. Claude est optimal pour les longs documents, l\'analyse et le code. Mistral est le meilleur choix si la conformite RGPD europeenne et l\'auto-hebergement sont des contraintes fortes. On realise toujours un benchmark comparatif sur vos donnees reelles avant de valider le choix final.',
  },
  {
    question: 'Peut-on heberger le LLM sur nos propres serveurs ?',
    answer:
      'Oui. Pour les cas necessitant une confidentialite maximale ou une independance vis-a-vis des fournisseurs cloud, on deploie des modeles open-source (Mistral, LLaMA) sur votre infrastructure via Ollama ou vLLM. Les performances sont inferieures aux modeles propriétaires en frontal, mais largement suffisantes pour la plupart des cas metier.',
  },
  {
    question: 'Que se passe-t-il si OpenAI change son modele ou ses tarifs ?',
    answer:
      'C\'est un risque reel qu\'on anticipe. Notre couche d\'orchestration est construite avec une abstraction qui permet de changer de fournisseur LLM sans modifier votre code applicatif. On utilise des librairies comme LangChain ou LiteLLM qui gerent cette portabilite. En pratique, basculer de GPT-4o a Claude ne demande que quelques heures de configuration.',
  },
  {
    question: 'Quel est le cout des appels API LLM en production ?',
    answer:
      'Les couts varient selon le volume et le modele. A titre indicatif : GPT-4o coute environ $2.50 pour 1 million de tokens en entree. Pour un assistant interne traite 500 requetes par jour, le cout tourne autour de $30 a $80 par mois selon la longueur des echanges. On met en place un monitoring des couts et des optimisations (cache, compression de prompts) pour maitriser la facture en production.',
  },
]

// ── Page ───────────────────────────────────────────────────────
export default function MiseEnPlacePage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildService({
          name: 'Mise en place IA Geneve : Integration ChatGPT Claude LLM',
          url: '/intelligence-artificielle/mise-en-place',
          description:
            'Integration de ChatGPT, Claude et autres LLMs dans votre stack existant. Couche d\'orchestration sur mesure, prompt engineering, connexion a vos donnees. Sans tout reconstruire.',
        })}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
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
              <span className="text-sm" style={{ color }}>Mise en place IA</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Mise en place IA</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  L&apos;IA dans votre stack,{' '}
                  <GradText as="span">sans tout reconstruire.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  On integre ChatGPT, Claude et les meilleurs LLMs directement dans vos outils existants.
                  Votre base de code reste intacte. Vous gagnez les capacites de l&apos;IA en quelques semaines.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Planifier un appel
                  </LiquidMetalButton>
                  <Link
                    href="#llms"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Voir les LLMs supportes
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/services/dkdp-ia-mise-en-place.webp"
                    alt="Integration LLM et mise en place IA sur mesure a Geneve"
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

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: '3', label: 'LLMs supportes en production', sub: 'ChatGPT, Claude, Mistral' },
              { value: '4 sem.', label: 'Delai moyen d\'integration', sub: 'Du kickoff a la mise en prod' },
              { value: '0', label: 'Reconstruction de stack', sub: 'Votre code existant est preserve' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-white">{s.value}</p>
                  <p className="text-white text-sm font-semibold">{s.label}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
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
                { label: 'Pourquoi c\'est complexe', href: '#complexite' },
                { label: 'Modèles de langage', href: '#llms' },
                { label: 'Applications', href: '#applications' },
                { label: 'Notre méthode', href: '#methode' },
                { label: 'Tarifs', href: '#tarifs' },
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

      {/* ── Le probleme ───────────────────────────────────────── */}
      <section id="complexite" className="py-24 bg-bg-card border-b border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi c&apos;est complexe</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                L&apos;IA hors de la boite, ce n&apos;est pas suffisant.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                ChatGPT en mode generique ne connait pas vos procedures internes, vos clients, ni vos contraintes metier.
                Pour qu&apos;un LLM soit utile dans votre entreprise, il faut l&apos;ancrer dans votre contexte : vos donnees, vos outils, vos processus.
                C&apos;est precisement cette ingenierie que DKDP realise.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Connecter un LLM a votre stack sans une architecture solide produit des reponses inexactes, des problemes de confidentialite et des couts API incontroles.
                On construit la couche d&apos;orchestration qui rend l&apos;integration fiable et maintenable.
              </p>
              <div className="space-y-3">
                {[
                  'Acces a vos donnees proprietaires et documents internes',
                  'Maintien du contexte metier sur toute la conversation',
                  'Securite et confidentialite des donnees sensibles',
                  'Fiabilite en production : monitoring, alertes, fallbacks',
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
                <LLMStackDiagram />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── LLMs ──────────────────────────────────────────────── */}
      <section id="llms" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Modeles de langage</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Les LLMs que l&apos;on integre en production.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OpenAI GPT-4o */}
            <SectionReveal delay={0}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-7"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(16,163,127,0.15)', border: '1px solid rgba(16,163,127,0.30)', color: '#10a37f' }}
                  >
                    GPT
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-tight">OpenAI GPT-4o</p>
                    <p className="text-[11px] text-text-muted">OpenAI</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Le modele le plus polyvalent. Ideal pour les taches complexes, le multilingue et l&apos;analyse d&apos;images.
                  Meilleure performance globale sur les cas metier varies.
                </p>
                <div className="mt-auto space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color }}>Points forts</p>
                  {['Taches complexes et raisonnement', 'Multilingue natif (FR/DE/IT/EN)', 'Vision : analyse d\'images et PDFs', 'Ecosysteme plugins tres large'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: '#10a37f' }} />
                      <span className="text-text-muted text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Anthropic Claude */}
            <SectionReveal delay={0.08}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-7 relative"
                style={{
                  background: 'rgba(167,139,250,0.06)',
                  borderColor: 'rgba(167,139,250,0.28)',
                  boxShadow: '0 0 40px rgba(167,139,250,0.06)',
                }}
              >
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommande
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.30)', color: violet }}
                  >
                    CL
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-tight">Anthropic Claude</p>
                    <p className="text-[11px] text-text-muted">Anthropic</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Excellence sur les longs documents, l&apos;analyse approfondie et le code. Fenetre de contexte tres large.
                  Architecture constitutionnelle pour des reponses plus sures.
                </p>
                <div className="mt-auto space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>Points forts</p>
                  {['Documents longs (200k tokens)', 'Analyse de contrats et rapports', 'Generation et revue de code', 'Instructions complexes et nuancees'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: violet }} />
                      <span className="text-text-muted text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Mistral */}
            <SectionReveal delay={0.16}>
              <div
                className="flex flex-col h-full rounded-[16px] border p-7"
                style={{ background: bg, borderColor: border }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[9px] font-bold text-sm flex-shrink-0"
                    style={{ background: 'rgba(255,120,50,0.15)', border: '1px solid rgba(255,120,50,0.30)', color: '#ff7832' }}
                  >
                    MI
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-tight">Mistral</p>
                    <p className="text-[11px] text-text-muted">Mistral AI (France)</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Modele europeen, RGPD-friendly. Peut etre auto-heberge sur votre infrastructure pour une confidentialite maximale.
                  Excellent rapport performance / cout.
                </p>
                <div className="mt-auto space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color }}>Points forts</p>
                  {['Conforme RGPD europeen', 'Auto-hebergement possible', 'Couts inferieurs aux modeles US', 'Tres bon sur le francais et l\'allemand'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: '#ff7832' }} />
                      <span className="text-text-muted text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Cas d'usage ───────────────────────────────────────── */}
      <section id="applications" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Applications concretes</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qu&apos;on peut connecter pour vous.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                Icon: MessageSquare,
                title: 'Assistant interne',
                desc: 'Un chatbot qui repond sur vos docs, procedures internes et base de connaissance. Vos equipes trouvent l\'information en secondes, pas en minutes.',
                tag: 'Tres demande',
                tagColor: violet,
              },
              {
                Icon: MailOpen,
                title: 'Generation de contenu',
                desc: 'Emails, rapports, fiches produits generes depuis vos templates et donnees. Coherence de ton garantie, temps de production divise par 5.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: FileSearch,
                title: 'Analyse de documents',
                desc: 'Lecture automatique de PDFs, contrats, factures. Extraction de donnees cles et synthese structuree en quelques secondes par document.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: ShieldCheck,
                title: 'Support client augmente',
                desc: 'FAQ intelligente connectee a votre CRM et historique client. Resolution automatique des demandes courantes, escalade intelligente des cas complexes.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: Code2,
                title: 'Code et automatisation',
                desc: 'Generateur de scripts, aide aux developpeurs, revue de code automatisee. Productivite technique multipliee sans recruter.',
                tag: null,
                tagColor: '',
              },
              {
                Icon: Newspaper,
                title: 'Veille et synthese',
                desc: 'Resumes automatiques de news sectorielles, rapports de marche, alertes concurrentielles. Restez informe sans passer des heures a lire.',
                tag: null,
                tagColor: '',
              },
            ].map((uc, i) => (
              <SectionReveal key={uc.title} delay={i * 0.07}>
                <div
                  className="relative flex flex-col h-full rounded-[14px] border p-6"
                  style={{ background: bg, borderColor: border }}
                >
                  {uc.tag && (
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(167,139,250,0.15)', color: uc.tagColor, border: `1px solid rgba(167,139,250,0.30)` }}
                    >
                      {uc.tag}
                    </span>
                  )}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[9px] mb-4 flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <uc.Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{uc.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{uc.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────── */}
      <section id="methode" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre methode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                De l&apos;analyse a la mise en production en 4 etapes.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line chrome metal */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  Icon: Layers,
                  n: '01',
                  title: 'Audit technique',
                  desc: 'On analyse votre stack, vos donnees disponibles, vos contraintes de securite et vos cas d\'usage prioritaires. Livrable : feuille de route d\'integration.',
                },
                {
                  Icon: GitMerge,
                  n: '02',
                  title: 'Architecture',
                  desc: 'Choix du LLM adapte, design de la couche d\'orchestration, strategie de prompting et de gestion du contexte. Aucune ligne de code avant validation.',
                },
                {
                  Icon: Code2,
                  n: '03',
                  title: 'Developpement et tests',
                  desc: 'Integration API, gestion du contexte et de la memoire, tests de fiabilite sur vos donnees reelles. Iterations rapides jusqu\'a la qualite cible.',
                },
                {
                  Icon: BarChart2,
                  n: '04',
                  title: 'Deploiement et monitoring',
                  desc: 'Mise en production, alertes sur les erreurs et les couts API, tableau de bord de performance. Optimisation continue du prompt et du modele.',
                },
              ].map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div
                    className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full"
                  >
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

      {/* ── Pricing ───────────────────────────────────────────── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Deux formules d&apos;integration.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                Un appel de decouverte gratuit pour identifier la formule adaptee a votre projet.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Standard */}
            <SectionReveal delay={0}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                  Integration Standard
                </p>
                <p className="text-4xl font-bold text-white mb-1">
                  CHF 3&apos;500
                </p>
                <p className="text-text-muted text-sm mb-6">paiement unique</p>
                <div className="space-y-3 flex-1 mb-8">
                  {[
                    '1 LLM integre (GPT-4o, Claude ou Mistral)',
                    '1 cas d\'usage cible',
                    'Connexion a 1 source de donnees',
                    'Prompt engineering et tests',
                    'Livraison sous 3 semaines',
                    'Documentation technique',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton href="/contact?service=intelligence-artificielle" size="lg">
                  Demander un devis
                </LiquidMetalButton>
              </div>
            </SectionReveal>

            {/* Avancee */}
            <SectionReveal delay={0.1}>
              <div
                className="flex flex-col h-full rounded-[20px] border p-8 relative"
                style={{
                  background: 'rgba(167,139,250,0.06)',
                  borderColor: 'rgba(167,139,250,0.30)',
                  boxShadow: '0 0 50px rgba(167,139,250,0.08)',
                }}
              >
                <span
                  className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  Recommande
                </span>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: violet }}>
                  Integration Avancee
                </p>
                <p className="text-4xl font-bold text-white mb-1">
                  CHF 6&apos;500
                </p>
                <p className="text-text-muted text-sm mb-6">paiement unique</p>
                <div className="space-y-3 flex-1 mb-8">
                  {[
                    'Multi-LLM possible (routage intelligent)',
                    'Jusqu\'a 3 cas d\'usage',
                    'Sources multiples (CRM, docs, API)',
                    'RAG : retrieval-augmented generation',
                    'Livraison 5 a 6 semaines',
                    'Monitoring et alertes 3 mois inclus',
                    'Documentation et formation equipe',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: violet }} />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Planifier un appel
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ils nous font confiance</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qu&apos;ils disent de leur integration IA.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                quote:
                  'On avait peur de devoir tout reconstruire pour integrer l\'IA. DKDP a connecte Claude a notre base documentaire en 3 semaines. Nos equipes gagnent 2h par jour sur la recherche d\'information.',
                author: 'Responsable Operations',
                company: 'Cabinet de conseil, Geneve',
                initial: 'RC',
              },
              {
                quote:
                  'Le prompt engineering fait toute la difference. Avant nos tests internes donnaient des reponses generiques. Avec la couche d\'orchestration DKDP, le modele connait notre metier et nos clients. Les resultats sont sans commune mesure.',
                author: 'CTO',
                company: 'Scale-up SaaS B2B, Lausanne',
                initial: 'CT',
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-5" aria-label="5 etoiles">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="14" height="14" viewBox="0 0 14 14" fill="#A78BFA" aria-hidden="true">
                        <path d="M7 1l1.55 3.14L12 4.6l-2.5 2.44.59 3.44L7 8.77l-3.09 1.71.59-3.44L2 4.6l3.45-.46L7 1z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold flex-shrink-0"
                      style={{ background: 'rgba(167,139,250,0.15)', color: violet, border: `1px solid rgba(167,139,250,0.25)` }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t.author}</p>
                      <p className="text-text-muted text-xs">{t.company}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FAQSection items={FAQ_ITEMS} title="Vos questions sur l'intégration LLM." />

      {/* ── Bridge ────────────────────────────────────────────── */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Completer votre demarche IA
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SectionReveal delay={0.05}>
              <Link
                href="/intelligence-artificielle/agents-ia"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(167,139,250,0.07)', borderColor: 'rgba(167,139,250,0.22)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: violet }}>Agents IA</p>
                  <p className="text-white font-semibold">Agents IA sur mesure</p>
                  <p className="text-text-muted text-xs mt-1">Automatisez vos taches repetitives avec des agents intelligents.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: violet }} />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.10}>
              <Link
                href="/intelligence-artificielle/automatisation"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(212,212,216,0.05)', borderColor: 'rgba(212,212,216,0.15)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>Automatisation</p>
                  <p className="text-white font-semibold">Automatisation metier</p>
                  <p className="text-text-muted text-xs mt-1">Workflows sans code qui connectent vos outils existants.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color }} />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <Link
                href="/intelligence-artificielle/audit-conseil"
                className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: 'rgba(74,222,128,0.05)', borderColor: 'rgba(74,222,128,0.18)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: green }}>Audit conseil</p>
                  <p className="text-white font-semibold">Audit et conseil IA</p>
                  <p className="text-text-muted text-xs mt-1">Identifiez les 3 actions a fort ROI dans votre entreprise.</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: green }} />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────── */}
      <CTAFinal accentRgb="212,212,216" />
    </main>
  )
}
