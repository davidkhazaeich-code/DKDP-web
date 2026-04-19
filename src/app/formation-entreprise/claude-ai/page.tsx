import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, Clock, Users, Award, ChevronRight,
  BrainCircuit, Zap, FileText, Code2, Bot, Layers,
  MessageSquare, Eye, Database, Workflow, BarChart2,
  Shield, Target, Sparkles, BookOpen, Lightbulb,
  Briefcase, TrendingUp, ShoppingCart, UserCog, DollarSign, Scale,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))
const CircularTestimonialsLazy = dynamic(() => import('@/components/ui/circular-testimonials').then(m => m.CircularTestimonials))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const ROICalculatorFormation = dynamic(() => import('@/components/sections/ROICalculatorFormation').then(m => ({ default: m.ROICalculatorFormation })))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet, orange, chrome } from '@/lib/tokens'
import { ClaudeProductCard } from './_components/ClaudeProductCard'
import { AgendaRow } from './_components/AgendaRow'
import { CapabilityCard } from './_components/CapabilityCard'
import { UseCaseCard } from './_components/UseCaseCard'
import { LeadFormInlineClaudeAI } from './_components/LeadFormInlineClaudeAI'
import { GalleryFormationClaudeAI } from './_components/GalleryFormationClaudeAI'

export const metadata: Metadata = {
  title: 'Formation Claude IA Genève | Entreprise et Équipes | DKDP',
  description:
    'Formation Claude IA pour entreprises à Genève et en Suisse romande. Claude.ai, Projects collaboratifs, Claude Code. Programme sur mesure, 1 à 2 jours, présentiel ou distanciel.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/claude-ai' },
  openGraph: {
    images: [{ url: '/images/og/formation-claude-ai.png', width: 1376, height: 768, alt: 'Formation Claude IA Genève DKDP' }],
  },
}

/* ─────────────────────────────────────────────
   Design tokens (source : @/lib/tokens)
───────────────────────────────────────────── */
const V = violet.color, VB = violet.bg, VD = violet.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQ = [
  {
    question: 'Faut-il déjà connaître Claude pour suivre cette formation ?',
    answer:
      'Non. La formation est conçue pour tous les niveaux, du débutant complet au professionnel qui utilise déjà Claude de façon basique. Le programme s\'adapté au niveau du groupe lors du briefing préalable.',
  },
  {
    question: 'Quelle est la différence entre la formation Claude et la formation IA générale ?',
    answer:
      'La formation IA générale couvre ChatGPT, Claude, Copilot et les automatisations. Cette formation est une spécialisation exclusive sur Claude : on va beaucoup plus loin avec les Projects, la mémoire partagée, Extended Thinking, l\'analyse de documents longs, et Claude Code pour les profils techniques.',
  },
  {
    question: 'Claude Code est-il inclus dans la formation de base ?',
    answer:
      'Claude Code fait l\'objet d\'un module optionnel (demi-journée supplémentaire) réservé aux développeurs, DevOps et profils techniques. Pour une équipe mixte, on propose une journée générale le matin et le module Code l\'après-midi pour les profils tech.',
  },
  {
    question: 'La formation est-elle adaptée à notre secteur d\'activité ?',
    answer:
      'Oui. Avant chaque session, DKDP envoie un questionnaire pour identifier vos cas d\'usage métier. La formation utilise vos propres documents, processus et situations réelles comme matière première, pas des exemples génériques.',
  },
  {
    question: 'Claude respecte-t-il la confidentialité de nos données ?',
    answer:
      'Avec le plan Team ou Enterprise, Anthropic s\'engage à ne pas utiliser vos données pour entraîner ses modèles. Nous consacrons un module entier aux bonnes pratiques de confidentialité : quoi envoyer, quoi ne pas envoyer, et comment configurer votre workspace d\'équipe de façon sécurisée.',
  },
  {
    question: 'Peut-on former une équipe de 20 personnes en une seule session ?',
    answer:
      'Le format idéal est de 6 à 12 personnes par groupe. Pour 20 personnes, on organise deux sessions successives de la même journée, ou on forme 2-3 référents internes qui diffuseront ensuite (programme "Train the trainer").',
  },
  {
    question: 'Quels sont les tarifs de la formation Claude IA ?',
    answer:
      'La formation Claude IA est facturée à l\'heure selon la taille du groupe : CHF 200/h pour 1 personne, CHF 300/h pour 2 personnes. Pour les groupes de 3 à 10 personnes ainsi que les formules demi-journée et journée entière, le tarif est établi sur devis. Contactez-nous pour un chiffrage personnalisé.',
  },
  {
    question: 'Est-ce que Claude.ai est disponible en français ?',
    answer:
      'Oui. Claude comprend et répond en français avec une qualité excellente. Toute la formation est animée en français et les exercices pratiques utilisent des documents et communications en français.',
  },
]

/* ─────────────────────────────────────────────
   Formateurs
───────────────────────────────────────────── */
const FORMATEURS = [
  {
    name: 'Romane',
    designation: 'Experte IA, SEO/GEO et UX · Formatrice',
    quote:
      "Spécialiste en intelligence artificielle, SEO/GEO et UX, j'anime les sessions Claude.ai et Projects en alliant vision stratégique et pédagogie. Mon objectif : que chaque collaborateur reparte avec des outils qu'il maîtrise vraiment.",
    src: '/images/team/romane.png',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.05) 100%)',
    cardBorder: 'rgba(255,107,0,0.28)',
    imageScale: 1.38,
    imageOffsetX: 80,
  },
  {
    name: 'David Khazaei',
    designation: 'Formateur Claude Code · Fondateur DKDP',
    quote:
      "Développeur et consultant digital, j'utilise Claude Code au quotidien pour mes projets client. J'anime le module technique : navigation de codebase, tests automatisés, workflow GitHub et agents agentic.",
    src: '/images/team/david-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 100%)',
    cardBorder: 'rgba(124,58,237,0.3)',
    imageScale: 1,
  },
  {
    name: 'Ali Khazaei',
    designation: 'Formateur · Développement et Informatique',
    quote:
      "Développeur et formateur, j'interviens sur les modules informatique et développement web. Pédagogue avant tout, je m'assure que chaque participant repart avec des bases solides et des compétences immédiatement applicables.",
    src: '/images/team/ali-khazaei.png',
    cardBg: 'linear-gradient(160deg, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.04) 100%)',
    cardBorder: 'rgba(96,165,250,0.25)',
    imageScale: 1,
  },
  {
    name: 'Claude',
    designation: 'Formateur Indépendant · Programmation et Informatique',
    quote:
      "Formateur et développeur indépendant, j'interviens sur la partie technique des formations en programmation et en informatique. Praticien du terrain, je traduis les concepts complexes en compétences directement applicables.",
    src: '/images/team/claude-formation.png',
    cardBg: 'linear-gradient(160deg, rgba(212,212,216,0.15) 0%, rgba(212,212,216,0.04) 100%)',
    cardBorder: 'rgba(212,212,216,0.22)',
    imageScale: 1,
  },
]

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function FormationClaudeAIPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({
        name: 'Formation Claude IA en entreprise Genève',
        url: '/formation-entreprise/claude-ai',
        description: 'Formation spécialisée Claude AI pour équipes d\'entreprise à Genève. Claude.ai, Projects collaboratifs, Extended Thinking et Claude Code. Programme sur mesure.',
        duration: 'P2D',
        teaches: ['Claude.ai', 'Claude Projects', 'Claude Code', 'Prompt engineering', 'Automatisation'],
        prerequisites: 'Aucun prérequis technique',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation Claude IA', url: 'https://dkdp.ch/formation-entreprise/claude-ai' },
      ])} />

      {/* ══ 1. Hero ══ */}
      <HeroBg blob1="rgba(124,58,237,0.15)" blob2="rgba(167,139,250,0.06)" accentRgb="167,139,250">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-white transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <div className="flex items-center gap-1.5">
                <Image src="/images/partners/claude-logo.png" alt="Claude AI" width={16} height={16} className="rounded-[4px] opacity-90" />
                <span className="text-sm" style={{ color: OR }}>Formation Claude IA</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <GradTag>Formation · Claude IA · 1-2 jours</GradTag>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: OR, background: ORB, border: `1px solid ${ORD}` }}
                  >
                    Nouveau 2026
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  <GradText as="span">Formation Claude IA</GradText>{' '}
                  pour entreprises à Genève
                </h1>

                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  Claude AI d&apos;Anthropic est l&apos;outil le plus puissant pour les équipes professionnelles en 2026.
                  Documents longs, projets collaboratifs, raisonnement complexe, automatisation de code.
                  DKDP forme les PME et grandes entreprises de Suisse romande en profondeur sur chaque fonctionnalité qui compte.
                </p>

                <p className="text-text-muted text-base leading-relaxed mb-8">
                  Nous l&apos;utilisons nous-mêmes au quotidien, y compris pour développer ce site web.
                  Ce que nous vous apprenons, nous le pratiquons.
                </p>

                {/* Trust signals */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { label: '100% pratique', icon: Zap },
                    { label: 'Sur vos documents réels', icon: FileText },
                    { label: 'Toutes industries', icon: Users },
                    { label: 'Genève et Suisse romande', icon: Target },
                  ].map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                      style={{ background: ORB, border: `1px solid ${ORD}` }}
                    >
                      <Icon size={12} style={{ color: OR }} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton href="/contact?service=formation-claude" size="lg">
                    Demander un devis gratuit →
                  </LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme mis à jour : avril 2026</p>
              </div>

              {/* Right - visual */}
              <div className="relative flex flex-col gap-4">
                {/* Terminal Claude Code */}
                <div
                  className="rounded-[14px] p-5"
                  style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${VD}`, boxShadow: `0 0 40px rgba(124,58,237,0.15)` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <div className="flex items-center gap-1.5 ml-2">
                      <Image src="/images/partners/claude-logo.png" alt="Claude AI" width={18} height={18} className="rounded-[4px]" />
                      <span className="text-[11px] text-text-muted font-mono">claude · formation DKDP</span>
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-[12px]">
                    <p><span style={{ color: V }}>{'>'}</span> <span className="text-zinc-400">Analyse ce rapport de 80 pages et</span></p>
                    <p className="pl-4 text-zinc-400">identifie les 5 risques critiques</p>
                    <div className="h-px bg-zinc-800 my-2" />
                    <p style={{ color: '#4ade80' }}>Claude ● Extended Thinking activé...</p>
                    <p className="text-zinc-300">Analyse en cours (200k tokens) ●●●</p>
                    <div className="h-px bg-zinc-800 my-2" />
                    <p className="text-zinc-300">5 risques identifiés :</p>
                    <p className="text-zinc-400 pl-4">1. Exposition réglementaire (Art. 7)</p>
                    <p className="text-zinc-400 pl-4">2. Concentration fournisseur (35%)</p>
                    <p className="text-zinc-400 pl-4">3. ...</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: V }} />
                      <span style={{ color: V }}>Réponse générée en 4.2s</span>
                    </div>
                  </div>
                </div>
                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: '200k', l: 'tokens contexte', c: V },
                    { v: '1M', l: 'tokens Sonnet', c: CH },
                    { v: '5/5', l: 'avis DKDP', c: OR },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center py-3 rounded-[10px]"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <p className="text-xl font-bold" style={{ color: s.c }}>{s.v}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ══ 2. Stats ══ */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '2h30', l: 'Gagnées / jour / pers.', sub: 'Moyenne post-formation' },
              { v: '94%', l: 'Appliquent dès J+1', sub: 'Compétences utilisées' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note moyenne DKDP' },
              { v: '100%', l: 'Sur mesure', sub: 'Vos cas d\'usage réels' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: OR }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. Formulaire inline devis ══ */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <LeadFormInlineClaudeAI />
        </div>
      </section>

      {/* ══ 4. Subnav sticky ══ */}
      <ScrollSpyNav
        items={[
          { label: 'Pourquoi Claude', href: '#pourquoi' },
          { label: 'Produits', href: '#produits' },
          { label: 'Programme', href: '#programme' },
          { label: 'Compétences', href: '#competences' },
          { label: 'Métiers', href: '#métiers' },
          { label: 'Format', href: '#format' },
          { label: 'ROI', href: '#roi' },
          { label: 'Galerie', href: '#galerie' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Prendre contact', href: '/contact' }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ══ 5. Pourquoi Claude maintenant ══ */}
      <section id="pourquoi" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Contexte 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Pourquoi Claude est l&apos;outil IA<br />prioritaire pour les entreprises
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Pas tous les assistants IA ne se valent pour un usage professionnel exigeant.
                Claude se distingue sur les dimensions qui comptent en entreprise.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: FileText,
                title: 'Contexte de 200k à 1M tokens',
                desc: 'Analysez des rapports entiers, contrats, datasets, sans découper les documents. Là où ChatGPT s\'arrête, Claude continue.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: BrainCircuit,
                title: 'Extended Thinking',
                desc: 'Claude peut raisonner en profondeur sur des problèmes complexes avant de répondre, comme un consultant senior qui réfléchit avant de parler.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Shield,
                title: 'Confidentialité des données',
                desc: 'Plan Team et Enterprise : vos données ne servent pas à entraîner le modèle. Zéro rétention, conforme aux exigences suisses.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Layers,
                title: 'Projects collaboratifs',
                desc: 'Créez des espaces de travail partagés avec mémoire persistante, fichiers et instructions communes pour toute l\'équipe.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: Code2,
                title: 'Claude Code : agent de dev',
                desc: 'Un agent autonome qui lit votre codebase, écrit des tests, corrige des bugs et crée des PR GitHub, sans vous interrompre.',
                color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.22)',
              },
              {
                icon: Eye,
                title: 'Vision et analyse de documents',
                desc: 'Tableaux, graphiques, schémas, PDFs scannés : Claude extrait et interprète avec une précision que les autres modèles ne match pas.',
                color: CH, bg: CHB, border: CHD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} color={c.color} bg={c.bg} border={c.border} />
            ))}
          </div>

          {/* Comparatif simplifié */}
          <SectionReveal>
            <div
              className="rounded-[20px] p-6 md:p-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OR }}>Comparatif rapide</p>
              <p className="text-text-muted text-xs mb-6">Évaluation DKDP basée sur les versions 2026 (Claude Sonnet 4.6, GPT-4o, Microsoft Copilot)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-text-muted w-[40%]">Critère</th>
                      <th className="text-center py-3 px-4 text-xs font-bold" style={{ color: V }}>
                        <div className="inline-flex items-center gap-1.5">
                          <Image src="/images/partners/claude-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                          Claude
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-bold text-[#10b981]">
                        <div className="inline-flex items-center gap-1.5">
                          <Image src="/images/partners/chatgpt-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                          ChatGPT
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-bold text-[#3b82f6]">
                        <div className="inline-flex items-center gap-1.5">
                          <Image src="/images/partners/copilot-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                          Copilot
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        crit: 'Contexte long (documents entiers)',
                        sub: 'Haiku 200k · Sonnet/Opus 1M tokens',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 2, color: '#3b82f6' },
                      },
                      {
                        crit: 'Raisonnement et analyse complexe',
                        sub: 'Extended Thinking vs o3 vs GPT-4o',
                        claude: { n: 5, color: V },
                        gpt:    { n: 5, color: '#10b981' },
                        cop:    { n: 3, color: '#3b82f6' },
                      },
                      {
                        crit: 'Confidentialité et contrôle données',
                        sub: 'Plan Team/Enterprise : zéro rétention',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                      {
                        crit: 'Travail collaboratif (Projects)',
                        sub: 'Mémoire partagée, fichiers, instructions',
                        claude: { n: 5, color: V },
                        gpt:    { n: 3, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                      {
                        crit: 'Développement et code (agent)',
                        sub: 'Claude Code vs GitHub Copilot vs GPT Operator',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                      {
                        crit: 'Analyse de documents visuels (PDF, images)',
                        sub: 'Tableaux, graphiques, schémas scannés',
                        claude: { n: 5, color: V },
                        gpt:    { n: 4, color: '#10b981' },
                        cop:    { n: 3, color: '#3b82f6' },
                      },
                      {
                        crit: 'Intégration Microsoft 365',
                        sub: 'Word, Excel, Outlook, Teams natif',
                        claude: { n: 2, color: V },
                        gpt:    { n: 3, color: '#10b981' },
                        cop:    { n: 5, color: '#3b82f6' },
                      },
                      {
                        crit: 'Génération d\'images',
                        sub: 'DALL-E 3 vs Image Creator vs aucun natif',
                        claude: { n: 1, color: V },
                        gpt:    { n: 5, color: '#10b981' },
                        cop:    { n: 4, color: '#3b82f6' },
                      },
                    ].map((row, i) => {
                      const Stars = ({ n, color }: { n: number; color: string }) => (
                        <span className="inline-flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className="text-[13px] leading-none"
                              style={{ color: idx < n ? color : '#3f3f46' }}
                            >
                              ★
                            </span>
                          ))}
                          <span
                            className="ml-1.5 text-[10px] font-bold tabular-nums"
                            style={{ color: n >= 4 ? color : '#71717a' }}
                          >
                            {n}/5
                          </span>
                        </span>
                      )
                      return (
                        <tr key={row.crit} className={`border-b border-zinc-800/50 ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}>
                          <td className="py-3 px-4">
                            <p className="text-zinc-200 font-medium text-[13px] leading-snug">{row.crit}</p>
                            <p className="text-zinc-500 text-[10px] mt-0.5 leading-snug">{row.sub}</p>
                          </td>
                          <td className="py-3 px-4 text-center"><Stars n={row.claude.n} color={row.claude.color} /></td>
                          <td className="py-3 px-4 text-center"><Stars n={row.gpt.n} color={row.gpt.color} /></td>
                          <td className="py-3 px-4 text-center"><Stars n={row.cop.n} color={row.cop.color} /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-zinc-600 text-[11px] mt-5 text-right">
                Recommandation DKDP : Claude pour l&apos;analyse et la profondeur · ChatGPT pour la créativité et les images · Copilot si Microsoft 365 est votre stack
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 5. Produits Claude ══ */}
      <section id="produits" className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <Image src="/images/partners/claude-logo.png" alt="Claude AI" width={20} height={20} className="rounded-[5px]" />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: OR }}>
                  L&apos;écosystème Claude
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                3 outils, un seul programme de formation
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                La formation DKDP couvre l&apos;intégralité de l&apos;écosystème Claude,
                du collaborateur non-technique au développeur.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SectionReveal>
              <ClaudeProductCard
                title="Claude.ai"
                subtitle="L'interface web et mobile pour tous les collaborateurs. Conversations, analyse de documents, rédaction, recherche. La porte d'entrée vers Claude pour l'ensemble de votre équipe."
                color={V}
                bg={VB}
                border={VD}
                icon={MessageSquare}
                badge="Pour tous"
                features={[
                  'Prompting efficace et structuré',
                  'Analyse de PDFs, Excel, images',
                  'Rédaction professionnelle avancée',
                  'Synthèse de réunions et rapports',
                  'Traduction et adaptation de contenus',
                  'Recherche et veille automatisée',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ClaudeProductCard
                title="Claude Projects"
                subtitle="Les espaces de travail collaboratifs de Claude. Votre équipe partage une mémoire commune, des fichiers, des instructions et un contexte persistant. Le cerveau collectif de votre organisation."
                color={CH}
                bg={CHB}
                border={CHD}
                icon={Layers}
                badge="Pour les équipes"
                features={[
                  'Création et gestion de Projects partagés',
                  'Mémoire persistante et context documents',
                  'Instructions personnalisées par projet',
                  'Contrôle des accès et permissions',
                  'Base de connaissance d\'équipe',
                  'Synchronisation avec Google Drive',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ClaudeProductCard
                title="Claude Code"
                subtitle="L'agent de développement autonome d'Anthropic. Il lit votre codebase, écrit des tests, corrige des bugs, crée des PR et exécute des tâches complexes sur 14 heures sans intervention."
                color="#4ade80"
                bg="rgba(74,222,128,0.08)"
                border="rgba(74,222,128,0.22)"
                icon={Code2}
                badge="Pour les devs"
                features={[
                  'Installation et configuration CLI',
                  'Navigation et compréhension de codebase',
                  'Génération de tests automatisés',
                  'Correction de bugs et refactoring',
                  'Workflow GitHub/GitLab complet',
                  'Hooks, MCP et extensions',
                ]}
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 6. Programme ══ */}
      <section id="programme" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Programme détaillé
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Programme de formation Claude IA : une journée pour maîtriser l&apos;outil
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                7 heures de formation pratique, construites sur vos propres documents et cas d&apos;usage.
                Pas de slides génériques. Pas d&apos;exemples inventés.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jour 1 */}
            <SectionReveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: ORB, color: OR, border: `1px solid ${ORD}` }}
                  >
                    Journée 1 · Claude.ai + Projects
                  </div>
                  <span className="text-text-muted text-xs">Tous profils</span>
                </div>
                <div className="space-y-2">
                  <AgendaRow time="09:00" title="Comment Claude pense : architecture et limites réelles" dur="45 min" type="theory" />
                  <AgendaRow time="09:45" title="Prompting structuré : la méthode DKDP en 5 niveaux" dur="1h" type="practice" />
                  <AgendaRow time="10:45" title="Analyse de vos documents réels (contrats, rapports, données)" dur="1h" type="workshop" />
                  <AgendaRow time="11:45" title="Extended Thinking : activer le raisonnement profond" dur="30 min" type="practice" />
                  <AgendaRow time="12:15" title="Pause déjeuner" dur="1h" type="break" />
                  <AgendaRow time="13:15" title="Claude Projects : créer votre espace d'équipe en live" dur="1h30" type="workshop" />
                  <AgendaRow time="14:45" title="Mémoire, context et partage de fichiers d'équipe" dur="1h" type="practice" />
                  <AgendaRow time="15:45" title="Confidentialité, RGPD et bonnes pratiques d'entreprise" dur="30 min" type="theory" />
                  <AgendaRow time="16:15" title="Atelier : construire votre prompt library d'équipe" dur="30 min" type="workshop" />
                  <AgendaRow time="16:45" title="Questions / Réponses et roadmap d'adoption" dur="15 min" type="qa" />
                </div>
              </div>
            </SectionReveal>

            {/* Module Code */}
            <SectionReveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(74,222,128,0.10)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}
                  >
                    Module optionnel · Claude Code
                  </div>
                  <span className="text-text-muted text-xs">Profils techniques</span>
                </div>
                <div className="space-y-2">
                  <AgendaRow time="09:00" title="Architecture de Claude Code : agent vs assistant" dur="30 min" type="theory" />
                  <AgendaRow time="09:30" title="Installation, config et premier projet en live" dur="45 min" type="code" />
                  <AgendaRow time="10:15" title="Navigation de codebase : lire 50k lignes en 30 secondes" dur="1h" type="code" />
                  <AgendaRow time="11:15" title="Génération de tests automatisés sur votre stack" dur="1h" type="workshop" />
                  <AgendaRow time="12:15" title="Pause déjeuner" dur="1h" type="break" />
                  <AgendaRow time="13:15" title="Workflow GitHub complet : issue → code → PR automatique" dur="1h30" type="code" />
                  <AgendaRow time="14:45" title="Hooks, MCP et extensions : aller plus loin" dur="45 min" type="code" />
                  <AgendaRow time="15:30" title="Agents multi-tâches et délégation longue durée" dur="45 min" type="workshop" />
                  <AgendaRow time="16:15" title="Sécurité, secrets et bonnes pratiques agentic" dur="30 min" type="theory" />
                  <AgendaRow time="16:45" title="Questions, réponses et cas pratiques de votre équipe" dur="15 min" type="qa" />
                </div>

                <div
                  className="mt-5 p-4 rounded-[12px] text-sm"
                  style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.18)' }}
                >
                  <p className="text-[#4ade80] font-semibold text-xs uppercase tracking-wider mb-1">Note</p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Ce module est animé en demi-journée (5h) ou en journée complète selon le niveau de l&apos;équipe.
                    Prérequis : confort avec le terminal et Git. Pas de langage imposé.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Modules appris */}
          <SectionReveal>
            <div
              className="mt-12 p-6 md:p-8 rounded-[20px]"
              style={{ background: ORB, border: `1px solid ${ORD}` }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: OR }}>
                Compétences acquises à l&apos;issue de la formation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Prompting avancé multi-niveaux',
                  'Analyse de documents longs (200k+ tokens)',
                  'Extended Thinking pour problèmes complexes',
                  'Claude Projects et mémoire partagée',
                  'Prompt library personnalisée d\'équipe',
                  'Workflows de rédaction professionnelle',
                  'Synthèse et résumé de réunions',
                  'Extraction de données depuis PDF/Excel',
                  'Bonnes pratiques RGPD et confidentialité',
                  'Automatisations basiques sans code',
                  'Claude Code : agentic dev workflow',
                  'Intégrations API et MCP (profils tech)',
                ].map((m) => (
                  <div key={m} className="flex items-start gap-2 text-xs text-text-secondary">
                    <CheckCircle2 size={12} style={{ color: OR }} className="flex-shrink-0 mt-0.5" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 7. Compétences ══ */}
      <section id="competences" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Fonctionnalités couvertes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Les fonctionnalités Claude que vous apprendrez
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                La formation ne survole pas les fonctionnalités. Elle vous apprend
                à maîtriser chaque outil dans des situations professionnelles réelles.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BrainCircuit,
                title: 'Extended Thinking',
                desc: 'Activez le raisonnement profond de Claude pour les problèmes stratégiques. Claude réfléchit avant de répondre, avec transparence sur son raisonnement.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: FileText,
                title: 'Contexte long (200k-1M)',
                desc: 'Analysez des rapports de 300 pages, des bases de code entières, ou des datasets complets en une seule conversation.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Eye,
                title: 'Vision et analyse d\'images',
                desc: 'Tableaux, graphiques, schémas, captures d\'écran, PDFs scannés. Claude voit, comprend et explique chaque élément visuel.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Layers,
                title: 'Artifacts',
                desc: 'Créez des livrables isolés de la conversation : documents, code, visualisations, mini-apps interactives. Partagez en un clic.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Database,
                title: 'Projects et mémoire',
                desc: 'Persistez le contexte entre les sessions. Claude se souvient de votre entreprise, vos clients, vos processus, sans répéter les instructions.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Workflow,
                title: 'Computer Use',
                desc: 'Claude peut contrôler un navigateur ou un bureau pour automatiser des tâches répétitives sans une seule ligne de code.',
                color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.22)',
              },
              {
                icon: Bot,
                title: 'Claude Code : Agentic',
                desc: 'Délégez des tâches de développement sur 14 heures. Claude lit, code, teste et commit pendant que vous dormez.',
                color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.22)',
              },
              {
                icon: BarChart2,
                title: 'Analyse de données',
                desc: 'Interrogez vos données en langage naturel. Claude écrit du SQL, génère des graphiques, identifie des anomalies et rédige le commentaire.',
                color: OR, bg: ORB, border: ORD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. Cas d'usage par métier ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.06)"
        blob2="rgba(212,212,216,0.04)"
        accentRgb="167,139,250"
        className="border-b border-border"
      >
      <section id="métiers" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Par département
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Cas d&apos;usage Claude IA par département
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                La formation est personnalisée selon les fonctions de votre équipe.
                Voici les cas d&apos;usage les plus demandés par département.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <UseCaseCard
                dept="Direction"
                icon={Briefcase}
                color="#FF8C00"
                bg="rgba(255,107,0,0.07)"
                border="rgba(255,107,0,0.20)"
                cases={[
                  'Synthèse de rapports exécutifs',
                  'Analyse stratégique de marché',
                  'Préparation de board meetings',
                  'Rédaction de plans stratégiques',
                  'Évaluation de risques',
                ]}
              />
              <UseCaseCard
                dept="Marketing"
                icon={TrendingUp}
                color="#A78BFA"
                bg="rgba(124,58,237,0.08)"
                border="rgba(124,58,237,0.22)"
                cases={[
                  'Rédaction campagnes multi-formats',
                  'Analyse de concurrents',
                  'Briefs créatifs',
                  'A/B testing copywriting',
                  'SEO et contenu de blog',
                  'Personas et audience research',
                ]}
              />
              <UseCaseCard
                dept="Commercial"
                icon={ShoppingCart}
                color="#60a5fa"
                bg="rgba(96,165,250,0.08)"
                border="rgba(96,165,250,0.22)"
                cases={[
                  'Propositions commerciales',
                  'Analyse des objections clients',
                  'Compte-rendu de réunions',
                  'Recherche sur les prospects',
                  'Scripts et emails de prospection',
                ]}
              />
              <UseCaseCard
                dept="RH"
                icon={UserCog}
                color="#f472b6"
                bg="rgba(244,114,182,0.08)"
                border="rgba(244,114,182,0.22)"
                cases={[
                  'Fiches de poste',
                  'Résumé de candidatures',
                  'FAQ interne automatisée',
                  'Onboarding documentaire',
                  'Politiques et procédures',
                  'Analyse des feedbacks',
                ]}
              />
              <UseCaseCard
                dept="Finance"
                icon={DollarSign}
                color="#2dd4bf"
                bg="rgba(45,212,191,0.08)"
                border="rgba(45,212,191,0.22)"
                cases={[
                  'Analyse de rapports financiers',
                  'Extraction de données PDF',
                  'Commentaires de résultats',
                  'Analyse de contrats fournisseurs',
                  'Tableaux de bord commentés',
                ]}
              />
              <UseCaseCard
                dept="Juridique"
                icon={Scale}
                color="#fbbf24"
                bg="rgba(251,191,36,0.07)"
                border="rgba(251,191,36,0.22)"
                cases={[
                  'Résumé de contrats longs',
                  'Extraction de clauses clés',
                  'Comparaison de versions',
                  'Veille réglementaire',
                  'Rédaction de courriers',
                ]}
              />
              <UseCaseCard
                dept="Développeurs"
                icon={Code2}
                color="#4ade80"
                bg="rgba(74,222,128,0.07)"
                border="rgba(74,222,128,0.22)"
                cases={[
                  'Review de code automatisée',
                  'Génération de tests unitaires',
                  'Documentation de codebase',
                  'Debugging assisté',
                  'Migration de stack',
                  'Workflow GitHub/GitLab',
                ]}
              />
            </div>
          </SectionReveal>
        </div>
      </section>
      </HeroBg>

      {/* ══ 9. Formats ══ */}
      <section id="format" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Modalités
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Présentiel, distanciel ou hybride
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              {
                Icon: Users,
                title: 'En présentiel chez vous',
                desc: 'DKDP se déplace dans vos locaux à Genève ou en Suisse romande. Format idéal : travail sur vos propres machines, environnement réel.',
              },
              {
                Icon: Clock,
                title: 'En ligne (Zoom/Teams)',
                desc: 'Sessions interactives avec partage d\'écran, ateliers en sous-groupes. Aussi efficace que le présentiel avec les bons outils.',
              },
              {
                Icon: Award,
                title: 'Attestation individuelle',
                desc: 'Chaque participant reçoit une attestation nominative précisant les compétences et modules suivis.',
              },
            ].map(({ Icon, title, desc }) => (
              <SectionReveal key={title}>
                <div
                  className="flex flex-col gap-4 p-5 rounded-[14px] h-full"
                  style={{ background: ORB, border: `1px solid ${ORD}` }}
                >
                  <div
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${ORD}` }}
                  >
                    <Icon size={18} style={{ color: OR }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. ROI ══ */}
      <section id="roi" className="scroll-mt-[124px]">
        <ROICalculatorFormation />
      </section>

      {/* ══ 11. Galerie ══ */}
      <section id="galerie" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                En images
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                La formation Claude IA en pratique
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Des sessions concrètes, des équipes actives, des compétences immédiatement utilisables.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <GalleryFormationClaudeAI />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 12. Tarifs ══ */}
      <section id="tarifs" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Tarifs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Tarifs de la formation Claude IA
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">
                Le prix dépend du nombre de participants. Demi-journée (4h) ou journée entière (8h).
              </p>
            </div>
          </SectionReveal>

          <FormationPricing />

          <SectionReveal>
            <p className="text-center text-text-muted text-sm mt-8">
              Besoin d&apos;un programme sur 2 jours, d&apos;un format Train-the-Trainer ou d&apos;un suivi coaching ?{' '}
              <Link href="/contact" className="underline hover:text-white transition-colors" style={{ color: OR }}>
                Parlons-en
              </Link>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 11. Pourquoi DKDP ══ */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                  Pourquoi DKDP
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                  Nous formons sur ce que nous<br />
                  <GradText as="span">utilisons nous-mêmes.</GradText>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  Ce site web a été développé avec Claude Code. Notre SEO est analysé avec Claude.
                  Nos contenus sont assistés par Claude. Nous ne formons pas à partir d&apos;un manuel.
                  Nous formons à partir de notre pratique quotidienne.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Cette expérience de terrain nous permet d&apos;aller bien au-delà des tutoriels génériques :
                  nous savons ce qui fonctionne vraiment, ce qui ne fonctionne pas, et comment adapter
                  Claude à des contextes professionnels spécifiques. En savoir plus sur <Link href="/blog/claude-code-leak-utiliser-ia-comme-infrastructure" className="underline hover:text-white transition-colors">comment utiliser Claude comme infrastructure IA</Link>.
                </p>
                <div className="space-y-3">
                  {[
                    'David et Romane : deux praticiens qui l\'utilisent au quotidien',
                    'Exemples tirés de projets DKDP réels',
                    'Suivi post-formation par email pendant 30 jours',
                    'Programme mis à jour à chaque nouvelle version Claude',
                  ].map((p) => (
                    <div key={p} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Sparkles size={14} style={{ color: OR }} className="flex-shrink-0 mt-0.5" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '700+', l: 'Clients accompagnés', c: V },
                  { v: '10+', l: 'Ans d\'expérience', c: CH },
                  { v: '5/5', l: 'Note Google', c: OR },
                  { v: '100%', l: 'Sur mesure', c: V },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="text-center py-8 rounded-[16px]"
                    style={{ background: ORB, border: `1px solid ${ORD}` }}
                  >
                    <p className="text-4xl font-bold mb-2" style={{ color: s.c }}>{s.v}</p>
                    <p className="text-text-muted text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 12. Formateurs ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.08)"
        blob2="rgba(124,58,237,0.05)"
        accentRgb="167,139,250"
        className="border-b border-border"
      >
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-6">Vos formateurs</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white">
                  Formés par des praticiens, pas des théoriciens.
                </h2>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <CircularTestimonialsLazy
                items={FORMATEURS}
                autoplay={true}
                colors={{
                  name: '#ffffff',
                  designation: OR,
                  quote: '#9CA3AF',
                  arrowBackground: '#1E1E1E',
                  arrowForeground: '#ffffff',
                  arrowHoverBackground: '#FF6B00',
                }}
                fontSizes={{
                  name: '1.6rem',
                  designation: '0.75rem',
                  quote: '1rem',
                }}
              />
            </SectionReveal>
          </div>
        </section>
      </HeroBg>

      {/* ══ 15. Testimonials ══ */}
      <Testimonials accentRgb="167,139,250" />

      {/* ══ 16. FAQ ══ */}
      <section id="faq" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Questions fréquentes sur la formation Claude IA</h2>
              <p className="text-text-muted">Tout ce que vous devez savoir avant de réserver.</p>
            </div>
          </SectionReveal>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <SectionReveal key={item.question}>
                <details className="group rounded-[14px] border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-white text-sm font-semibold leading-snug">{item.question}</span>
                    <ChevronRight size={16} className="flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center mt-10">
              <p className="text-text-muted text-sm mb-4">Vous avez une question spécifique ?</p>
              <LiquidMetalButton href="/contact?service=formation-claude" size="md">
                Poser votre question →
              </LiquidMetalButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 14. CTA Final ══ */}
      <CTAFinal accentRgb="167,139,250" />
    </main>
  )
}
