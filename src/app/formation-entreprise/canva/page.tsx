import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Clock, Users, Award, Star, Layers, Wand2, Palette, Share2, Sparkles, Globe2, Zap, FileText } from 'lucide-react'
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
import { AppLogoMarquee, DESIGN_WEB_LOGOS, SOCIAL_LOGOS } from '@/components/ui/AppLogos'
import { CanvaFeatureCards } from './_components/CanvaFeatureCards'

export const metadata: Metadata = {
  title: 'Formation Canva en Entreprise à Genève | Brand Kit, Templates, Magic Studio | DKDP',
  description:
    'Formation Canva pour PME et entreprises à Genève et en Suisse romande. Brand Kit, templates, posts sociaux, présentations, IA Magic Studio. Vos équipes créent des visuels professionnels en une journée. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/canva' },
  openGraph: {
    images: [{ url: '/images/og/formation-canva.png', width: 1376, height: 768, alt: 'Formation Canva entreprise Genève DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Faut-il être graphiste pour suivre la formation Canva ?',
    answer:
      "Non. La formation Canva DKDP est conçue pour des non-graphistes. On part des bases du design (typographie, couleurs, hiérarchie visuelle) et on construit ensemble vos premiers visuels. La majorité des participants n'ont jamais ouvert Canva avant la formation et repartent autonomes le soir même.",
  },
  {
    question: 'Quelle différence entre Canva gratuit et Canva Pro ?',
    answer:
      "La version gratuite couvre déjà 80% des besoins d'une PME. Canva Pro (CHF 15/mois par utilisateur ou CHF 30/mois en équipe) débloque le Brand Kit complet (logo, palette, polices d'entreprise), la suppression d'arrière-plan, le redimensionnement automatique (Magic Resize), et plus de 100 millions de templates et photos premium. DKDP vous aide à choisir la formule réellement utile selon vos besoins.",
  },
  {
    question: "Qu'est-ce que le Brand Kit Canva et pourquoi le configurer ?",
    answer:
      "Le Brand Kit centralise l'identité visuelle de votre entreprise dans Canva : logo, palette de couleurs, polices officielles, dégradés, photos. Une fois configuré, chaque membre de l'équipe accède aux mêmes éléments depuis n'importe quel template. Résultat : vos visuels restent cohérents quelle que soit la personne qui les crée. Configurer le Brand Kit est le premier vrai gain de temps.",
  },
  {
    question: 'Quels formats peut-on créer avec Canva ?',
    answer:
      "Posts réseaux sociaux (Instagram, LinkedIn, Facebook, TikTok, X), Stories et Reels animés, présentations professionnelles, flyers et affiches imprimables, brochures, newsletters, bannières web, cartes de visite, signatures email, vidéos courtes, documents internes, organigrammes. Plus de 100 formats préformatés sont accessibles dès le démarrage.",
  },
  {
    question: 'Comment fonctionne Magic Studio (IA de Canva) ?',
    answer:
      "Magic Studio regroupe les fonctionnalités d'IA intégrées à Canva : Magic Write génère du texte, Magic Edit modifie une image avec une instruction écrite, Magic Resize adapte un visuel à plusieurs formats en un clic, Magic Eraser supprime un objet d'une photo, Background Remover détoure un sujet. Ces outils accélèrent la production de 3 à 5 fois selon les usages. La formation couvre les 5 outils principaux.",
  },
  {
    question: "L'équipe peut-elle travailler à plusieurs sur un même design ?",
    answer:
      "Oui. Canva intègre une collaboration en temps réel similaire à Google Docs : commentaires, suggestions, partage de templates internes, espaces de marque communs. La formation inclut un module sur l'organisation d'un workflow d'équipe pour éviter la duplication et garantir la cohérence visuelle.",
  },
  {
    question: 'Combien de temps dure la formation Canva ?',
    answer:
      "Une demi-journée (4h) pour les bases : interface, premiers visuels, Brand Kit. Une journée complète (8h) pour aller plus loin : Magic Studio, workflow d'équipe, présentations avancées, vidéos. La majorité des PME optent pour la journée complète, qui rentabilise le plus rapidement.",
  },
  {
    question: 'La formation peut-elle se dérouler dans nos locaux ?',
    answer:
      "Oui. DKDP intervient à Genève et dans toute la Suisse romande sur site (vos locaux), dans nos espaces de formation, ou en visio selon votre préférence. La formation sur site est souvent privilégiée pour faciliter la participation de l'équipe complète.",
  },
]

const MODULES = [
  'Découverte de Canva : interface, dashboards, projets et dossiers',
  "Brand Kit complet : logo, palette de couleurs, polices d'entreprise",
  'Bibliothèque de templates : 250 000+ designs prêts à personnaliser',
  'Posts réseaux sociaux : Instagram, LinkedIn, Facebook, TikTok',
  'Stories et Reels animés en quelques minutes',
  'Présentations professionnelles : alternative à PowerPoint',
  'Flyers, brochures et affiches imprimables',
  'Newsletters et signatures email harmonisées',
  'Magic Studio : Magic Write, Magic Resize, Magic Edit, Background Remover',
  'Cohérence visuelle multi-supports et règles de marque',
  'Canva Pro vs gratuit : choisir la formule adaptée',
  "Workflow d'équipe : templates partagés, commentaires, validation",
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'Bases du design',
    desc: "Théorie essentielle en 45 min : couleurs, typographie, hiérarchie. Ce qui distingue un visuel pro d'un visuel amateur dans Canva.",
  },
  {
    Icon: Palette,
    title: 'Brand Kit configuré',
    desc: "Import de votre logo, palette officielle, polices d'entreprise. Vos templates aux couleurs de votre marque, prêts à l'emploi.",
  },
  {
    Icon: Share2,
    title: 'Templates en pratique',
    desc: 'Création de vos 5 templates prioritaires : posts, stories, présentations, flyers. Production fluide pour votre quotidien.',
  },
  {
    Icon: Wand2,
    title: 'Magic Studio et IA',
    desc: "Maîtrise des outils IA de Canva pour produire 5x plus vite. Workflow d'équipe configuré et prêt à scaler.",
  },
]

export default function FormationCanvaPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Formation Canva Entreprise Genève', url: '/formation-entreprise/canva', description: 'Formation Canva pour équipes de PME et entreprises à Genève et en Suisse romande. Brand Kit, templates, posts sociaux, présentations, IA Magic Studio. Devenez autonome sur Canva en une journée.', duration: 'P1D', teaches: ['Canva', 'Brand Kit', 'Magic Studio IA', 'Templates', 'Réseaux sociaux', 'Présentations'], prerequisites: 'Aucun prérequis technique', priceFrom: 200, ratingValue: '4.9', ratingCount: 500 })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation Canva', url: 'https://dkdp.ch/formation-entreprise/canva' },
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
              <span className="text-sm" style={{ color }}>Formation Canva</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Formation Canva à Genève</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-white mb-6">
                  Créez vos visuels en 5 minutes. <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>Aux couleurs de votre marque</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes de PME et entreprises à Canva à Genève et en Suisse romande. Posts, présentations, flyers, brochures : vos collaborateurs créent des visuels professionnels sans agence, dès le lendemain de la formation.
                </p>
                <HeroPills
                  accentRgb="255, 140, 0"
                  items={[
                    { label: '100% pratique', Icon: Zap },
                    { label: 'Sur vos visuels réels', Icon: FileText },
                    { label: 'Toutes industries', Icon: Users },
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
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-canva.webp"
                    alt="Formation Canva en entreprise à Genève : Brand Kit et templates personnalisés"
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
        {/* ── Marquee outils integre au hero ── */}
        <div className="pt-4 pb-12" aria-label="Outils design et social qu'on enseigne">
          <AppLogoMarquee
            logos={[...DESIGN_WEB_LOGOS, ...SOCIAL_LOGOS]}
            durationSeconds={80}
            size="md"
            eyebrow="Outils design et social qu'on enseigne"
          />
        </div>

      </HeroBg>



      
      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '250M+', l: 'Utilisateurs', sub: 'Canva dans le monde' },
              { v: '5 min', l: 'Par visuel', sub: 'Avec Brand Kit configuré' },
              { v: '80%', l: 'Temps gagné', sub: 'Sur la production graphique' },
              { v: '1 journée', l: 'Pour devenir autonome', sub: 'Sans aucun prérequis' },
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
            DKDP forme les PME et entreprises de Genève et de Suisse romande à Canva, l&apos;outil de création graphique le plus utilisé au monde. Vos collaborateurs apprennent à produire des supports de communication professionnels (posts sociaux, présentations, flyers, brochures) sans aucune compétence technique préalable. Formation pratique en une journée.
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
                Pourquoi former vos équipes à Canva en 2026
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Attendre une agence pour un post Instagram. Payer un graphiste freelance pour un flyer. Relancer trois fois pour une présentation client. Ces frictions ralentissent vos équipes commerciales et marketing, et grignotent un budget que vous pourriez investir ailleurs.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Avec un Brand Kit bien configuré et les bons templates, vos collaborateurs créent des visuels cohérents et professionnels en autonomie complète. En une journée de formation, l&apos;autonomie devient une réalité durable.
              </p>
              <div className="space-y-3">
                {[
                  "Les PME suisses dépensent en moyenne CHF 4 000/an en création graphique externalisée",
                  "Canva est utilisé par plus de 250 millions de personnes dans le monde, dont 95% des Fortune 500",
                  "Un Brand Kit bien configuré réduit le temps de production visuelle de 70%",
                  "Magic Studio (IA Canva) accélère encore la production de 3 à 5 fois selon les usages",
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
                  Les 3 piliers de la formation
                </p>
                <CanvaFeatureCards />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Chaque pilier est couvert avec des cas pratiques sur vos vrais supports.
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
                Programme complet de la formation Canva
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La formation commence par les principes fondamentaux du design (45 minutes, pas plus) puis bascule directement dans Canva. Chaque participant crée ses premiers visuels pendant la session, aux couleurs de son entreprise, sur les formats qu&apos;il utilisera vraiment dès le lendemain.
              </p>
              <p className="text-text-secondary leading-relaxed">
                À la fin de la session, vous disposez d&apos;un Brand Kit opérationnel et d&apos;un kit de templates prêts à l&apos;emploi. Plus besoin de repartir de zéro à chaque publication : vos templates font le travail, votre équipe gagne du temps.
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
                Pour qui est la formation Canva en entreprise
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Équipes communication et marketing',
              'Community managers',
              'Assistantes de direction',
              'Responsables RH (annonces, livret accueil)',
              'Commerciaux (présentations clients)',
              'Indépendants et entrepreneurs solos',
              'Gérants de PME sans graphiste',
              'Toute personne qui crée des supports visuels',
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
                Déroulement de la formation Canva
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
                Retours après la formation Canva
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Avant la formation, je payais une graphiste freelance pour chaque post Instagram. Maintenant je crée mes visuels en 5 minutes avec mes templates Canva. Rentabilisé en deux semaines.",
                name: 'Nathalie F., Fondatrice',
                company: 'Boutique artisanale, Genève',
                stars: 5,
              },
              {
                quote: "On a formé toute notre équipe communication à Canva, avec un Brand Kit unifié. La cohérence visuelle de notre marque s'est améliorée du jour au lendemain. Fini les visuels disparates entre collègues.",
                name: 'Thomas L., Responsable marketing',
                company: 'PME 40 personnes, Vaud',
                stars: 5,
              },
              {
                quote: "Magic Studio a été une vraie révélation. Je redimensionne un visuel pour 5 réseaux sociaux en un clic, je supprime un fond en 2 secondes. Ce qui me prenait 30 minutes prend désormais 2 minutes.",
                name: 'Sarah M., Community manager',
                company: 'Agence événementielle, Genève',
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
                Tarifs de la formation Canva
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
        <FAQSection items={FAQ} title="Vos questions sur la formation Canva" />
      </section>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/formation-entreprise/reseaux-sociaux"
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
                  <p className="text-white font-bold text-lg leading-tight">Diffuser vos visuels Canva sur les bons réseaux</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vous créez de beaux visuels avec Canva. Pour les diffuser efficacement sur les bonnes plateformes et bâtir votre audience, découvrez notre formation réseaux sociaux.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir la formation <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <LogoBanner />
      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
