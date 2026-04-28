import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Layers, PenTool, Layout, Globe2, TrendingUp, BarChart2, Zap, Code2 } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const FormationTrainer = dynamic(() => import('@/components/sections/FormationTrainer').then(m => ({ default: m.FormationTrainer })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { AppLogoMarquee, DESIGN_WEB_LOGOS } from '@/components/ui/AppLogos'
import { FigmaFeatureCards } from './_components/FigmaFeatureCards'

export const metadata: Metadata = {
  title: 'Formation Web Design et Figma à Genève | UI/UX, Wireframes, Prototypes | DKDP',
  description:
    'Formation Web Design et Figma pour PME et entreprises à Genève et en Suisse romande. UI/UX, wireframes, maquettes, design system, prototypes interactifs. Concevez votre site avant de le développer. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/web-design' },
  openGraph: {
    images: [{ url: '/images/og/formation-web-design.png', width: 1376, height: 768, alt: 'Formation Web Design et Figma entreprise Genève DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Faut-il être designer pour suivre la formation Web Design ?',
    answer:
      "Non. La formation est conçue pour des profils non-designers : product managers, fondateurs, marketers techniques, développeurs front, entrepreneurs. On part des fondamentaux UI/UX (grille, hiérarchie, typographie, accessibilité) et on construit progressivement vos premières maquettes Figma. Aucune compétence en illustration ou en graphisme n'est requise.",
  },
  {
    question: "Pourquoi choisir Figma plutôt qu'un autre outil de design ?",
    answer:
      "Figma est devenu le standard mondial du web design en 2026 : 4 millions de designers actifs, utilisé par 90% des startups tech et la quasi-totalité des grandes PME suisses. Avantages clés : collaboration temps réel comme Google Docs, plan gratuit suffisant pour démarrer, communauté massive de templates et plugins, et un Dev Mode intégré qui simplifie le handoff vers le développement.",
  },
  {
    question: "Qu'est-ce que l'Auto Layout dans Figma et pourquoi c'est important ?",
    answer:
      "Auto Layout est le système de mise en page responsive de Figma. Plutôt que d'aligner manuellement chaque élément, vous définissez des règles (espacement, alignement, padding) et Figma adapte automatiquement vos frames quand le contenu change. Résultat : des maquettes mobile, tablet et desktop construites en parallèle, sans dupliquer le travail. C'est l'une des compétences clés de la formation.",
  },
  {
    question: "Qu'est-ce qu'un design system et pourquoi en construire un ?",
    answer:
      "Un design system regroupe les composants réutilisables de votre interface (boutons, cards, formulaires, typographie, couleurs) avec leurs variants et leurs règles d'usage. Une modification du composant principal se propage automatiquement partout. Bénéfices : cohérence garantie, évolutions rapides, onboarding facilité pour les nouveaux membres. La formation inclut un module dédié sur la création d'un design system minimal mais robuste.",
  },
  {
    question: 'La formation couvre-t-elle les prototypes interactifs ?',
    answer:
      "Oui. Un module entier est dédié au prototypage Figma : transitions entre écrans, animations simples, hover states, scroll effects, formulaires fonctionnels. Vous repartez avec un prototype cliquable de votre projet, prêt à présenter à vos parties prenantes ou à tester avec vos utilisateurs avant le développement.",
  },
  {
    question: "Le handoff vers les développeurs est-il couvert ?",
    answer:
      "Oui. La formation couvre le Dev Mode de Figma (anciennement Inspect) : récupération automatique des couleurs, espacements, polices, exports d'assets et code CSS prêt à copier. Vos maquettes deviennent directement exploitables par votre équipe technique ou votre agence web, sans aller-retour sur les détails.",
  },
  {
    question: 'Combien de temps dure la formation Web Design ?',
    answer:
      "Une demi-journée (4h) pour les fondamentaux : principes UI/UX, premiers wireframes, prise en main de Figma. Une journée complète (8h) pour aller plus loin : Auto Layout, design system, prototypes, handoff dev. Les équipes produit et marketing optent généralement pour la journée complète.",
  },
  {
    question: 'La formation peut-elle se dérouler dans nos locaux ?',
    answer:
      "Oui. DKDP intervient à Genève et dans toute la Suisse romande sur site (vos locaux), dans nos espaces de formation, ou en visio selon votre préférence. Pour les équipes produit qui doivent ensuite collaborer sur Figma, la formation sur site est souvent la plus efficace.",
  },
]

const MODULES = [
  'Principes UI/UX 2026 : grille, hiérarchie, typographie, accessibilité, contraste',
  'Wireframes basse fidélité : architecture mobile-first et flux utilisateur',
  'Découverte de Figma : interface, frames, pages, projets, collaboration',
  "Auto Layout : maquettes responsive sans répéter le travail",
  'Design system : tokens de couleurs, typographie, espacement et grille',
  'Composants réutilisables et variants (boutons, cards, formulaires)',
  'Maquettes haute fidélité : pages site web, app mobile, dashboard',
  'Prototypes interactifs : flux, transitions, hover states, scroll',
  "Collaboration en équipe : libraries partagées, commentaires, validation",
  'Dev Mode : handoff propre vers les développeurs ou votre agence web',
  'Tendances UI 2026 : glassmorphism, dark mode, motion design',
  "Plugins Figma essentiels : Iconify, Unsplash, Content Reel, Figma to Code",
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'Bases UI/UX',
    desc: "Fondamentaux qui distinguent une interface professionnelle d'un design amateur. Hiérarchie, contraste, accessibilité, mobile-first.",
  },
  {
    Icon: PenTool,
    title: 'Wireframes',
    desc: 'Construction de votre architecture écran par écran en basse fidélité. Validation des flux avant tout investissement visuel.',
  },
  {
    Icon: Layout,
    title: 'Maquettes Figma',
    desc: "Auto Layout, composants, design system. Vos pages haute fidélité responsives, prêtes à être présentées en interne ou en client.",
  },
  {
    Icon: Code2,
    title: 'Prototype et handoff',
    desc: 'Prototype cliquable testable en interne, et Dev Mode configuré pour un handoff propre vers vos développeurs.',
  },
]

export default function FormationWebDesignPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Formation Web Design et Figma Entreprise Genève', url: '/formation-entreprise/web-design', description: "Formation Web Design et Figma pour équipes produit, marketing et fondateurs à Genève et en Suisse romande. UI/UX, wireframes, maquettes, design system, prototypes. Concevez votre site avant de le développer.", duration: 'P1D', teaches: ['Figma', 'UI/UX Design', 'Wireframes', 'Auto Layout', 'Design System', 'Prototypes interactifs', 'Dev Mode'], prerequisites: 'Aucun prérequis technique', priceFrom: 200, ratingValue: '4.9', ratingCount: 500 })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation Web Design', url: 'https://dkdp.ch/formation-entreprise/web-design' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-white transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Formation Web Design</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Formation Web Design et Figma à Genève</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-white mb-6">
                  Concevez votre site avant de le <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>développer</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes produit, marketing et fondateurs au web design moderne et à Figma à Genève et en Suisse romande. UI/UX, wireframes, maquettes, design system, prototypes : pilotez vos projets web sans dépendre d&apos;une agence pour chaque écran.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% pratique', Icon: Zap },
                    { label: 'Sur vos projets', Icon: Layout },
                    { label: 'Tous secteurs', Icon: Users },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=formation" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme mis à jour : avril 2026</p>
              </div>
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Outils design et web qu'on enseigne">
                  <AppLogoMarquee
            logos={DESIGN_WEB_LOGOS}
            durationSeconds={108}
            size="md"
          />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-web-design.webp"
                    alt="Formation Figma et web design en entreprise à Genève : maquettes responsives et design system"
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
        </section>      </HeroBg>



      

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '4M+', l: 'Designers Figma', sub: 'Standard mondial du web design' },
              { v: '90%', l: 'Startups', sub: 'Utilisent Figma pour leur produit' },
              { v: '70%', l: 'Temps gagné', sub: 'Sur les itérations maquettes' },
              { v: '1 journée', l: 'Pour wireframer', sub: 'Votre premier projet web' },
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


      <LogoBanner />
      <ScrollSpyNav
        items={[
          { label: 'Programme', href: '#programme' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Intro definition ── */}
      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            DKDP forme les PME, startups et entreprises de Genève et de Suisse romande aux fondamentaux du web design moderne avec Figma. Vos collaborateurs apprennent à concevoir des interfaces, à itérer sur les maquettes et à collaborer proprement avec leurs développeurs ou leur agence. Formation pratique sur vos vrais projets, en une journée.
          </p>
        </div>
      </section>

      {/* ── Pourquoi maintenant ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pourquoi former vos équipes au web design et à Figma
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Lancer un projet web sans maquette claire, c&apos;est s&apos;exposer aux allers-retours coûteux avec votre agence. Demander à un développeur de deviner l&apos;UX, c&apos;est obtenir un produit qui marche techniquement mais qui n&apos;atteint pas vos utilisateurs. Et expliquer une vision verbalement, c&apos;est garantir 30% de retravail.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Avec Figma maîtrisé, vos équipes produit et marketing conçoivent leurs propres maquettes, testent les flux avec des prototypes cliquables, et fournissent à leurs développeurs un cahier des charges visuel précis. Le résultat est mesurable : moins de retravail, des projets plus rapides, des produits qui convertissent.
              </p>
              <div className="space-y-3">
                {[
                  "Figma est utilisé par 4 millions de designers dans le monde et plus de 90% des startups tech",
                  "Une maquette validée en amont réduit les coûts de développement de 30 à 40% en moyenne",
                  "Le Dev Mode de Figma divise par 3 le temps de handoff entre design et développement",
                  "Un design system minimal accélère les itérations futures de votre produit de 50%",
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Les 3 piliers Figma de la formation
                </p>
                <FigmaFeatureCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Chaque pilier est appliqué directement sur un cas concret de votre projet.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Programme complet de la formation Web Design
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation démarre par les fondamentaux UI/UX (45 minutes) puis bascule directement dans Figma. Chaque participant construit ses propres wireframes, ses premières maquettes haute fidélité et un prototype cliquable, sur un projet réel apporté par votre équipe.
              </p>
              <p className="text-text-secondary leading-relaxed">
                À la fin de la session, vous repartez avec une bibliothèque Figma initiée pour votre entreprise (couleurs, typographie, composants), un projet documenté et un Dev Mode configuré, prêt à être transmis à vos développeurs.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {MODULES.map((item) => (
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

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profils</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Pour qui est la formation Web Design en entreprise
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Product managers et chefs de produit',
              'Fondateurs et CEOs de startups',
              'Marketers techniques et growth',
              'Développeurs front qui montent en design',
              'UX writers et content designers',
              'Équipes produit interne',
              'Designers en transition vers Figma',
              'Entrepreneurs solos qui pilotent leur app',
            ].map((role, i) => (
              <SectionReveal key={role} delay={i * 0.07}>
                <div
                  className="flex items-center justify-center text-center p-4 rounded-[12px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-white font-medium text-sm">{role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Déroulement ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Déroulement de la formation Web Design
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)',
              }}
            />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div
                      className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <s.Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FormationTrainer accentColor='#FF8C00' />

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Retours après la formation Web Design
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "La partie Auto Layout a été une révélation. Je peux maintenant maquetter une page mobile, tablet et desktop en parallèle, sans dupliquer le travail. Mes itérations vont 3 fois plus vite.",
                name: 'Julien K., Fondateur',
                company: 'Startup tech, Genève',
                stars: 5,
              },
              {
                quote: "On a formé toute notre équipe produit à Figma et au design system. Notre cahier des charges visuel est devenu beaucoup plus précis : 40% de retravail en moins avec notre agence de développement.",
                name: 'Sophie B., Product Manager',
                company: 'Scale-up SaaS, Lausanne',
                stars: 5,
              },
              {
                quote: "Le Dev Mode m'a fait gagner un temps fou. Je récupère directement les couleurs, les espacements et le code CSS sans poser une seule question au designer. Le handoff est devenu fluide.",
                name: 'Marc D., Lead Developer',
                company: 'PME industrielle, Vaud',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Tarifs de la formation Web Design
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Le prix dépend du nombre de participants. Demi-journée (4h) ou journée entière (8h), sur site ou en visio.
              </p>
            </div>
          </SectionReveal>
          <FormationPricing />
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur la formation Web Design et Figma" />
      </section>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/creation-site-web"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: border,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Globe2 size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Aller plus loin</p>
                  <p className="text-white font-bold text-lg leading-tight">Vous avez la maquette. On la développe.</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vos équipes savent maintenant concevoir leurs interfaces dans Figma. Pour transformer ces maquettes en site web performant et SEO-friendly, découvrez notre service de création de site web.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir le service <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
