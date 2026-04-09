import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { CheckCircle2, ChevronRight, ShieldCheck, BarChart2, Clock, Globe2, TrendingUp, Search, Star } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { SEOFunnel } from './_components/SEOFunnel'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  title: 'Référencement SEO & GEO à Genève · Google + IA · DKDP',
  description:
    'Agence SEO à Genève. Audit complet, stratégie de contenu et GEO pour dominer Google et les IA (ChatGPT, Perplexity, Google AI Overviews). Premiers résultats en 6 à 12 semaines.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/seo' },
}

const color = violet.color
const bg = violet.bg
const border = violet.border

const FAQ = [
  {
    question: 'Combien coûte le référencement SEO à Genève ?',
    answer:
      'Un accompagnement SEO chez DKDP démarre à CHF 500/mois pour un site vitrine local. Un projet SEO ambitieux (e-commerce, marché suisse romand) se situe entre CHF 1\'000 et CHF 2\'500/mois. On commence toujours par un audit gratuit pour calibrer les efforts nécessaires.',
  },
  {
    question: 'En combien de temps voit-on des résultats en SEO à Genève ?',
    answer:
      'Les premières progressions de positions sont visibles entre 6 et 12 semaines pour les requêtes locales genevoises. Un trafic organique significatif et des leads réguliers se construisent sur 3 à 6 mois. DKDP partage un rapport mensuel transparent avec les indicateurs clés.',
  },
  {
    question: 'Quelle est la différence entre le SEO on-page et off-page ?',
    answer:
      'Le SEO on-page couvre tout ce qui est sur votre site : structure des pages, balises, contenu, vitesse de chargement, maillage interne. Le SEO off-page concerne l\'autorité de votre domaine : backlinks, mentions de la marque, présence locale. DKDP travaille sur les deux dimensions.',
  },
  {
    question: 'Faut-il créer du contenu régulièrement pour le SEO ?',
    answer:
      'Oui, le contenu est un pilier central du SEO. DKDP définit une stratégie de contenu basée sur les intentions de recherche de vos clients cibles. On peut rédiger les contenus pour vous ou vous fournir un brief détaillé si vous préférez le faire en interne.',
  },
  {
    question: 'Que comprend un audit SEO chez DKDP ?',
    answer:
      'L\'audit SEO couvre : crawl technique du site (erreurs, redirections, temps de chargement), analyse des balises et de la structure, audit du contenu existant, analyse du profil de backlinks, et analyse de la concurrence sur vos mots-clés cibles. Le rapport est remis avec des priorités claires.',
  },
  {
    question: 'Le SEO local est-il différent du SEO classique ?',
    answer:
      'Le SEO local cible les recherches géolocalisées comme "service digital Genève" ou "plombier 1207". Il inclut l\'optimisation de votre fiche Google Business Profile, les citations NAP cohérentes sur les annuaires, et du contenu centré sur votre zone géographique. Idéal pour les PME genevoises.',
  },
  {
    question: 'Google Ads et SEO, doit-on choisir ?',
    answer:
      'Non. Google Ads apporte du trafic immédiat pendant que le SEO construit votre autorité sur le long terme. Les deux sont complémentaires : Ads vous donne de la visibilité dès demain, le SEO réduit progressivement votre dépendance aux campagnes payantes. DKDP gère les deux si besoin.',
  },
  {
    question: 'Qu\'est-ce que le GEO (Generative Engine Optimization) ?',
    answer:
      'Le GEO (Generative Engine Optimization) est l\'optimisation de votre contenu pour apparaître dans les réponses générées par les IA : ChatGPT, Perplexity, Google AI Overviews et Bing Copilot. Ces moteurs citent des sources fiables pour répondre aux questions de vos prospects. Si votre site n\'est pas structuré pour être citable, vous êtes absent là où une part croissante des décisions se forme. Le GEO s\'appuie sur le balisage E-E-A-T, les données structurées Schema.org, le contenu en format question-réponse et l\'autorité du domaine. DKDP intègre le GEO à chaque mission SEO.',
  },
]

const BENEFITS = [
  {
    Icon: TrendingUp,
    value: '+340%',
    title: 'Trafic qui capitalise',
    desc: 'Contrairement aux Ads, le trafic SEO ne s\'arrête pas quand vous coupez le budget. Il croît et capitalise avec le temps.',
  },
  {
    Icon: Search,
    value: 'CHF 0/clic',
    title: 'Visiteurs gratuits',
    desc: 'Une fois positionné, chaque visiteur ne vous coûte rien. Le SEO est l\'investissement le plus rentable à long terme.',
  },
  {
    Icon: Globe2,
    value: '95%',
    title: 'Dans le top 5 Google',
    desc: '95% de nos clients atteignent le top 5 Google sur leurs mots-clés stratégiques en 6 à 12 mois.',
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Audit technique',
    desc: 'Analyse complète : vitesse, indexation, erreurs, balises, maillage interne. Rapport de priorités livré sous 48h.',
  },
  {
    step: '02',
    title: 'Mots-clés',
    desc: 'Identification des requêtes à fort potentiel et intention d\'achat. Mapping des pages cibles par mot-clé.',
  },
  {
    step: '03',
    title: 'On-page',
    desc: 'Réécriture des titres, métas, H1-H3. Structure sémantique, cocon thématique, maillage interne optimisé.',
  },
  {
    step: '04',
    title: 'Contenu & links',
    desc: 'Production d\'articles optimisés et acquisition de backlinks sur sites d\'autorité suisses et francophones.',
  },
  {
    step: '05',
    title: 'Suivi & rapport',
    desc: 'Monitoring hebdomadaire des positions, rapport mensuel avec trafic, conversions et recommandations.',
  },
]

export default function SEOPage() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildService({ name: 'Référencement SEO Genève', url: '/agence-digitale/seo', description: 'Stratégie SEO complète pour PME à Genève. Audit technique, contenu et backlinks pour dominer les résultats Google.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Référencement SEO', url: 'https://dkdp.ch/agence-digitale/seo' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Référencement SEO</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">SEO · Genève &amp; Suisse romande</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Référencement SEO à Genève : dominez les{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #A78BFA, #C4B5FD)' }}>mots-clés de votre marché.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP construit votre autorité organique sur Google avec une stratégie SEO complète : technique, contenu et netlinking. Résultats durables, sans frais par clic.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Audit SEO gratuit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-white transition-colors">
                    Notre méthode ↓
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                  <Image
                    src="/images/services/dkdp-agence-seo.webp"
                    alt="Référencement SEO à Genève par DKDP"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '+340%', l: 'Trafic organique', sub: 'Gain moyen à 12 mois' },
              { v: 'Top 5', l: 'Mots-clés cibles', sub: '95% de nos clients' },
              { v: 'CHF 0', l: 'Par clic', sub: 'Contrairement aux Ads' },
              { v: '6 mois', l: 'Pour des résultats', sub: 'Durée moyenne constatée' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
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
                { label: 'Notre approche', href: '#approche' },
                { label: 'Résultats', href: '#resultats' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Processus', href: '#process' },
                { label: 'Réalisations', href: '#realisations' },
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
              style={{ background: 'rgba(124,58,237,0.18)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.30)' }}
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Notre approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Le SEO qui génère des leads, pas juste du trafic.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Le SEO ne se limite pas à quelques balises bien remplies. DKDP combine audit technique rigoureux, contenu optimisé pour les intentions de recherche de vos clients, et acquisition progressive d&apos;autorité. Le résultat : un trafic qualifié qui croît mois après mois.
              </p>
              <p className="text-text-secondary leading-relaxed">
                On travaille essentiellement sur le marché genevois et suisse romand, ce qui nous donne une connaissance précise des requêtes locales, des comportements de recherche et de la concurrence en ligne dans votre secteur.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Audit SEO technique complet (erreurs, indexation, vitesse)',
                  'Recherche de mots-clés à intention d\'achat',
                  'Optimisation on-page (titres, métas, H1-H3, structure)',
                  'Création de contenu SEO (articles, pages de service)',
                  'Netlinking (backlinks de qualité sur sites d\'autorité)',
                  'SEO local Google Business Profile',
                  'Core Web Vitals et performance technique',
                  'GEO : visibilité dans ChatGPT, Perplexity et AI Overviews',
                  'Suivi mensuel des positions et du trafic',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── GEO - Visibilité IA ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                GEO · Nouveau en 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Votre site doit aussi apparaître dans les IA.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                ChatGPT, Perplexity, Google AI Overviews et Copilot répondent directement aux questions de vos prospects, sans clic Google. Si votre contenu n&apos;est pas citable par ces IA, vous êtes absent là où une part croissante des décisions d&apos;achat se forme.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Le <span className="text-white font-semibold">GEO (Generative Engine Optimization)</span>, aussi appelé AEO (Answer Engine Optimization), optimise votre contenu pour être cité comme source de référence. DKDP intègre cette dimension à chaque mission SEO.
              </p>
              <div className="space-y-3">
                {[
                  'Optimisation E-E-A-T pour être reconnu comme source fiable',
                  'Balisage Schema.org : FAQ, Organization, Article',
                  'Contenu en format question-réponse extractible par les IA',
                  'Passages texte ciblés pour Google AI Overviews & Snippets',
                  'Suivi des mentions de votre marque dans les réponses IA',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Moteurs IA ciblés
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { name: 'ChatGPT', maker: 'OpenAI', c: '#10b981', cbg: 'rgba(16,185,129,0.08)', cbd: 'rgba(16,185,129,0.22)', note: '~60% des requêtes IA' },
                    { name: 'Perplexity', maker: 'AI Search', c: '#22d3ee', cbg: 'rgba(34,211,238,0.08)', cbd: 'rgba(34,211,238,0.22)', note: '+300%/an de croissance' },
                    { name: 'AI Overviews', maker: 'Google', c: '#A78BFA', cbg: 'rgba(124,58,237,0.08)', cbd: 'rgba(124,58,237,0.22)', note: 'Résultats Google n°1' },
                    { name: 'Copilot', maker: 'Microsoft', c: '#60a5fa', cbg: 'rgba(96,165,250,0.08)', cbd: 'rgba(96,165,250,0.22)', note: 'Intégré Bing & Edge' },
                  ].map((p) => (
                    <div key={p.name} className="p-3.5 rounded-[10px] border" style={{ background: p.cbg, borderColor: p.cbd }}>
                      <p className="text-white font-bold text-sm">{p.name}</p>
                      <p className="text-[10px] font-semibold mb-1" style={{ color: p.c }}>{p.maker}</p>
                      <p className="text-text-muted text-[10px]">{p.note}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4" style={{ borderColor: border }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center" style={{ color }}>
                    Signaux GEO optimisés
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['E-E-A-T', 'Schema.org', 'FAQ markup', 'Passages texte', 'Autorité domaine', 'Citations sources'].map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(124,58,237,0.12)', color, border: `1px solid ${border}` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Insight / Problème ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Être en page 2 Google, c&apos;est être invisible.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La position que vous occupez sur Google détermine directement combien de visiteurs vous recevez. La différence entre la position 1 et la page 2 n&apos;est pas de 50% : c&apos;est de 97%. Les clics ne se distribuent pas, ils se concentrent.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: TrendingUp, title: '28% des clics vont au premier résultat Google. Le deuxième en reçoit 15%.', sub: 'Source : Advanced Web Ranking 2024' },
                  { Icon: Search, title: '75% des utilisateurs ne regardent jamais la deuxième page de résultats.', sub: 'Source : HubSpot Research' },
                  { Icon: Clock, title: 'Le SEO prend 6 mois à construire. Chaque mois sans stratégie est un mois perdu.', sub: 'Constat DKDP sur +50 projets' },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="text-text-muted text-[11px] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <SEOFunnel />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section id="resultats" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Résultats</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que vous gagnez concrètement.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <b.Icon size={22} style={{ color }} />
                  </div>
                  <div className="text-3xl font-bold" style={{ color }}>{b.value}</div>
                  <h3 className="text-white font-bold text-lg">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des tarifs clairs, un engagement transparent.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Chaque prestation est détaillée et validée avant démarrage. Pas de mauvaises surprises en cours de mission.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Audit SEO',
                price: "CHF 1'500",
                duration: 'Prestation unique',
                highlight: false,
                features: [
                  'Audit technique complet',
                  'Analyse des mots-clés',
                  'Rapport de priorités',
                  'Roadmap 6 mois',
                  'Présentation des résultats',
                  'Accès Search Console inclus',
                ],
                cta: 'Demander un audit',
              },
              {
                label: 'SEO Mensuel',
                price: 'CHF 650/mois',
                duration: 'Le plus demandé',
                highlight: true,
                features: [
                  'Audit initial inclus',
                  '2 articles SEO/mois',
                  'Optimisation on-page continue',
                  'Netlinking mensuel (4 liens)',
                  'Suivi positions hebdo',
                  'Rapport mensuel + recommandations',
                ],
                cta: 'Démarrer le SEO',
              },
              {
                label: 'SEO Autorité',
                price: "CHF 1'200/mois",
                duration: 'Marchés compétitifs',
                highlight: false,
                features: [
                  'Tout SEO Mensuel',
                  '4 articles SEO/mois',
                  'Netlinking intensif (8 liens/mois)',
                  'SEO local multi-établissements',
                  'Stratégie cocon sémantique',
                  'Réunion mensuelle de suivi',
                ],
                cta: 'Dominer son marché',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? `0 0 40px rgba(124,58,237,0.15)` : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        Le plus demandé
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color }}>{offer.price}</p>
                    <p className="text-text-muted text-xs mb-6">{offer.duration}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact?service=service-digital"
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? color : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${border}`,
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
      </HeroBg>

      {/* ── Process ── */}
      <section id="process" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Méthode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Comment on construit votre visibilité.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <SectionReveal key={p.step} delay={i * 0.08}>
                <div className="flex flex-col gap-3 p-5 bg-bg rounded-[14px] border border-border h-full">
                  <div className="text-[11px] font-bold tracking-widest" style={{ color }}>{p.step}</div>
                  <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'On était en page 3 sur tous nos mots-clés. Six mois après, on est top 3 sur 8 requêtes stratégiques. Notre téléphone ne s\'arrête plus.',
                author: 'Directrice, cabinet d\'avocats',
                location: 'Genève',
              },
              {
                quote: 'DKDP a d\'abord corrigé les erreurs techniques de notre site, puis construit une stratégie de contenu. Le trafic a triplé en 10 mois.',
                author: 'Responsable marketing, PME industrielle',
                location: 'Vaud',
              },
              {
                quote: 'Le SEO local a tout changé. Avant, personne ne nous trouvait. Maintenant, 60% de nos nouveaux patients viennent de Google.',
                author: 'Fondatrice, clinique esthétique',
                location: 'Genève',
              },
            ].map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} fill={color} style={{ color }} />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author}</p>
                    <p className="text-text-muted text-xs">{t.location}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      </HeroBg>

      {/* ── Réalisations + Garanties ── */}
      <section id="realisations" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Réalisations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des résultats, pas des promesses.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'Cabinet de conseil B2B',
                type: 'Référencement local',
                image: '/images/services/dkdp-agence-seo.webp',
                results: ['+340% trafic organique en 12 mois', '15 mots-clés top 1 Google Genève', '0 budget Ads nécessaire'],
                tech: 'SEO · Content · Google Business',
              },
              {
                client: 'PME e-commerce',
                type: 'SEO national',
                image: '/images/services/dkdp-agence-creation-web.webp',
                results: ['Page 1 sur 42 mots-clés cibles', 'Trafic x4.2 en 18 mois', 'CA online +280%'],
                tech: 'SEO · Blog · Netlinking',
              },
              {
                client: 'Clinique spécialisée',
                type: 'SEO local + contenu',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ["Fiche GBP : 800 → 4'200 vues/mois", '"médecin Genève" : position 2', 'Prise de RDV +120%'],
                tech: 'SEO Local · GBP · Contenu médical',
              },
            ].map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color, border: `1px solid ${border}` }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ background: bg }}>
                    <p className="text-white font-bold mb-4">{r.client}</p>
                    <div className="space-y-2 flex-1">
                      {r.results.map((res) => (
                        <div key={res} className="flex items-center gap-2">
                          <Star size={11} style={{ color }} className="flex-shrink-0" />
                          <span className="text-white text-sm font-semibold">{res}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-[11px] mt-4 font-mono">{r.tech}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Garanties */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'Résultats mesurables', desc: 'Rapport mensuel de positions, trafic et conversions. Les progrès sont chiffrés, pas racontés.' },
                  { Icon: TrendingUp, title: 'SEO white-hat', desc: 'Pas de techniques black-hat. Chaque action respecte les guidelines Google et construit une autorité durable.' },
                  { Icon: Clock, title: 'Premiers signaux en 30j', desc: 'Les corrections techniques et premières optimisations sont visibles dans Search Console dans les 4 premières semaines.' },
                  { Icon: Globe2, title: 'Vos données restent vôtres', desc: 'Vous gardez la main sur Search Console, Analytics et GBP. DKDP travaille sur vos plateformes, jamais en silo.' },
                ].map((g) => (
                  <div key={g.title} className="text-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px] mx-auto mb-4"
                      style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${border}` }}
                    >
                      <g.Icon size={22} style={{ color }} />
                    </div>
                    <p className="text-white font-bold text-sm mb-2">{g.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur le référencement SEO" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/publicite-sea"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                borderColor: 'rgba(124,58,237,0.28)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <BarChart2 size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-white font-bold text-lg leading-tight">Publicité Google Ads</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Le SEO prend du temps. Pour générer des leads immédiatement pendant que votre référencement monte en puissance, découvrez la publicité Google Ads.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir Google Ads <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="text-center pb-2">
        <Link href="/a-propos" className="text-text-muted hover:text-white text-sm transition-colors mt-3 block">
          En savoir plus sur l&apos;agence et David Khazaei
        </Link>
      </div>
      <CTAFinal />
    </main>
  )
}
