import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, Users, Star, Layers, PenTool, Layout, Globe2, Zap, Code2, MapPin } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroPills } from '@/components/ui/HeroPills'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { AppLogoMarquee, DESIGN_WEB_LOGOS } from '@/components/ui/AppLogos'
import { FigmaPillars } from '@/components/formation/figma/FigmaPillars'
import { DesignVocabulary } from '@/components/formation/figma/DesignVocabulary'
import { FigmaToolComparison } from '@/components/formation/figma/FigmaToolComparison'
import { FigmaLevels } from '@/components/formation/figma/FigmaLevels'
import { FigmaUseCases } from '@/components/formation/figma/FigmaUseCases'
import { IntraVsCatalogue } from '@/components/formation/figma/IntraVsCatalogue'
import { FigmaTrainer } from '@/components/formation/figma/FigmaTrainer'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))

export const metadata: Metadata = {
  title: 'Formation Figma entreprise Genève et Suisse romande | DKDP',
  // Mesurée à 917 px pour une limite SERP desktop de ~920 px : la description
  // s'affiche en entier, sans troncature. Toute rallonge la coupe.
  description:
    'Formation Figma en entreprise à Genève et Suisse romande. Maquettes, wireframes, prototypes et design system, sur vos projets. Devis gratuit.',
  alternates: {
    canonical: 'https://dkdp.ch/formation-entreprise/figma',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/figma',
      en: 'https://dkdp.ch/en/corporate-training/figma',
      'x-default': 'https://dkdp.ch/formation-entreprise/figma',
    },
  },
  openGraph: {
    images: [{ url: '/images/og/formation-figma.png', width: 1376, height: 768, alt: 'Formation Figma en entreprise à Genève : maquettes, prototypes et design system' }],
  },
}

const FAQ = [
  {
    question: "Qu'est-ce qu'une formation Figma en entreprise ?",
    answer:
      "Une formation Figma en entreprise apprend à vos collaborateurs à concevoir eux-mêmes les écrans de vos projets numériques : wireframes, maquettes, prototypes cliquables et bibliothèque de composants. Chez DKDP, elle se déroule dans vos locaux, sur vos propres projets, et non sur un exercice fictif. Elle dure d'une demi-journée à deux journées selon le niveau visé.",
  },
  {
    question: 'Faut-il être designer pour suivre une formation Figma ?',
    answer:
      "Non. Le programme est conçu pour des profils non-designers : chefs de projet, responsables marketing, fondateurs, assistants de direction, développeurs, ingénieurs. On part des principes de base (grille, hiérarchie, contraste, lisibilité) et on construit progressivement. Aucune compétence en dessin ni en graphisme n'est nécessaire.",
  },
  {
    question: 'Figma est-il gratuit ?',
    answer:
      "Oui, pour démarrer. Le plan Starter de Figma est gratuit sans date de fin : vous disposez de fichiers illimités dans votre espace personnel, et de trois fichiers partagés en co-édition, limités à trois pages chacun. L'historique des versions y est conservé 30 jours. Le passage au plan payant devient utile quand plusieurs personnes travaillent ensemble sur de nombreux fichiers. Aucune licence n'est nécessaire pour suivre la formation.",
  },
  {
    question: 'Figma est-il disponible en français ?',
    answer:
      "Oui. Figma propose une interface en français depuis le 15 octobre 2025, sur le navigateur, l'application de bureau et l'application mobile. Le changement se fait dans les préférences de langue du compte. C'est un point qui compte pour une équipe romande non anglophone : la formation peut se dérouler intégralement en français, y compris les noms des fonctions.",
  },
  {
    question: 'Combien de temps faut-il pour apprendre Figma ?',
    answer:
      "Une demi-journée suffit pour lire, commenter et modifier un fichier existant. Une journée complète permet de produire soi-même un écran de bout en bout : wireframe, maquette, prototype cliquable. Deux journées sont nécessaires pour tenir une bibliothèque partagée dans la durée, avec ses composants, ses variables et ses règles de nommage.",
  },
  {
    question: 'Figma ou Canva : lequel choisir ?',
    answer:
      "Les deux outils ne servent pas le même métier. Canva est fait pour les visuels de communication : affiches, publications, présentations, documents. Figma est fait pour les interfaces : écrans de site web, écrans d'application, parcours utilisateur. Si votre besoin est de produire des posts et des supports marketing, Canva suffit. Si votre besoin est de concevoir un site ou une application avant de le faire développer, c'est Figma.",
  },
  {
    question: 'Quelle différence entre un wireframe, une maquette et un prototype ?',
    answer:
      "Un wireframe est un schéma en noir et blanc qui pose ce qui va où, sans décision graphique. Une maquette est la représentation fidèle de l'écran final, avec les vraies couleurs, la vraie typographie et les vraies images. Un prototype relie ces maquettes entre elles pour qu'on puisse cliquer d'un écran à l'autre et tester le parcours sur un vrai téléphone. Les trois se font dans Figma, et la formation les couvre dans cet ordre.",
  },
  {
    question: "Qu'est-ce que l'Auto Layout dans Figma ?",
    answer:
      "L'Auto Layout est le système de mise en page automatique de Figma. Au lieu d'aligner chaque élément à la main, vous définissez des règles d'espacement et d'alignement, et le cadre s'adapte tout seul quand le contenu change ou quand la largeur d'écran change. C'est ce qui permet de construire les versions mobile, tablette et ordinateur en parallèle plutôt que de dupliquer le travail trois fois.",
  },
  {
    question: "Qu'est-ce qu'un design system et faut-il en construire un ?",
    answer:
      "Un design system rassemble vos éléments réutilisables (boutons, cartes, formulaires, couleurs, typographie, espacements) avec leurs règles d'usage. Modifier l'élément d'origine le met à jour partout où il apparaît. Pour une PME, un design system minimal mais tenu vaut mieux qu'un système ambitieux abandonné au bout de trois mois : c'est ce qu'on construit pendant la formation, à votre échelle.",
  },
  {
    question: 'Le Dev Mode et la transmission aux développeurs sont-ils couverts ?',
    answer:
      "Oui, à partir du niveau Journée. Le Dev Mode de Figma donne les mesures, les couleurs, les polices, les espacements, les exports d'images et le code CSS correspondant, directement depuis la maquette. Vos développeurs, votre agence ou votre prestataire cessent de travailler à partir de captures d'écran annotées à la main. Le module est adapté quand l'équipe technique n'est pas issue du web.",
  },
  {
    question: 'Figma fonctionne-t-il sur Mac et sur Windows ?',
    answer:
      "Oui, sur les deux, ainsi que directement dans le navigateur, sans rien installer. C'est une différence pratique avec Sketch, qui reste réservé à macOS. Une équipe mixte Mac et Windows peut donc travailler sur les mêmes fichiers, ce qui est le cas le plus fréquent dans les PME romandes.",
  },
  {
    question: 'La formation peut-elle se dérouler dans nos locaux ?',
    answer:
      "Oui, et c'est le format que nous recommandons. DKDP se déplace à Genève et dans toute la Suisse romande. Travailler sur vos postes, avec vos fichiers et vos contraintes réelles, donne de meilleurs résultats qu'une salle neutre. La visio reste possible pour les équipes réparties sur plusieurs sites.",
  },
  {
    question: 'Combien coûte une formation Figma en entreprise en Suisse ?',
    answer:
      "Le prix dépend du nombre de participants et de la durée retenue, d'une demi-journée à deux journées. Nos tarifs de formation en entreprise démarrent à 200 CHF de l'heure pour une personne. Le devis est gratuit et le programme est calé sur vos projets avant d'être chiffré, plutôt que vendu sur catalogue.",
  },
  {
    question: 'Recevons-nous une attestation à la fin de la formation ?',
    answer:
      "Oui, chaque participant reçoit une attestation de participation nominative. Elle indique le programme suivi, la durée et les dates. C'est un justificatif interne et un document utile pour un dossier de formation continue : ce n'est pas un titre délivré ou reconnu par l'État, et nous préférons le dire clairement.",
  },
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  {
    Icon: Layers,
    title: 'Cadrage en amont',
    desc: "Un échange avant la séance pour identifier vos projets, votre charte et le niveau réel de l'équipe. Le contenu est monté là-dessus.",
  },
  {
    Icon: PenTool,
    title: 'Structure et wireframes',
    desc: 'Les principes de conception, puis vos écrans posés en basse fidélité. On valide les parcours avant toute décision graphique.',
  },
  {
    Icon: Layout,
    title: 'Maquettes et composants',
    desc: 'Auto Layout, composants réutilisables et bibliothèque à votre marque. Vos écrans passent en haute fidélité, responsives.',
  },
  {
    Icon: Code2,
    title: 'Prototype et transmission',
    desc: 'Un parcours cliquable testable sur téléphone, et le Dev Mode configuré pour vos développeurs ou votre prestataire.',
  },
]

const REGIONS = [
  'Genève', 'Lausanne', 'Nyon', 'Morges', 'Vevey', 'Montreux',
  'Fribourg', 'Neuchâtel', 'Sion', 'Yverdon-les-Bains',
]

export default function FormationFigmaPage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({
        name: 'Formation Figma en entreprise, Genève et Suisse romande',
        url: '/formation-entreprise/figma',
        description: "Formation Figma pour équipes, PME et entreprises à Genève et en Suisse romande. Wireframes, maquettes, prototypes cliquables, design system et transmission aux développeurs, dans vos locaux et sur vos propres projets.",
        duration: 'P1D',
        teaches: ['Figma', 'Conception de maquettes', 'Wireframes', 'Prototypes interactifs', 'Auto Layout', 'Design system', 'Composants et variantes', 'Dev Mode', 'UI/UX Design'],
        prerequisites: 'Aucun prérequis technique ni compétence en graphisme',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
        image: 'https://dkdp.ch/images/services/dkdp-formation-figma-geneve.webp',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation Figma', url: 'https://dkdp.ch/formation-entreprise/figma' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-text transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Formation Figma</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Formation Figma à Genève et en Suisse romande</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Dessinez vos écrans avant de les faire <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>développer</GradText>.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes à Figma, l&apos;outil de conception de maquettes devenu le standard du métier. Wireframes, maquettes, prototypes cliquables et design system : sur vos vrais projets, dans vos locaux, en français.
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
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme mis à jour : août 2026</p>
              </div>
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Outils de design et de web que nous enseignons">
                  <AppLogoMarquee logos={DESIGN_WEB_LOGOS} durationSeconds={108} size="md" />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-figma-geneve.webp"
                    alt="Formation Figma en entreprise à Genève : une formatrice accompagne deux collaborateurs sur des maquettes responsives"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
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
              { v: 'Gratuit', l: 'Pour démarrer', sub: 'Trois fichiers partagés, sans date de fin' },
              { v: 'Français', l: 'Interface disponible', sub: 'Depuis octobre 2025' },
              { v: '1 journée', l: 'Pour un écran complet', sub: 'Wireframe, maquette et prototype' },
              { v: 'Sur site', l: 'Genève et Suisse romande', sub: 'Dans vos locaux, sur vos fichiers' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
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
          { label: 'Vocabulaire', href: '#vocabulaire' },
          { label: 'Programme', href: '#programme' },
          { label: 'Cas d’usage', href: '#cas-usage' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Définition autoportante ── */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Figma est l&apos;outil sur lequel se conçoivent aujourd&apos;hui la majorité des sites web et des applications :
            on y dessine les écrans, on les assemble en parcours cliquables, et on les transmet aux développeurs.
            DKDP forme les PME, les startups et les équipes de Genève et de Suisse romande à s&apos;en servir sur leurs
            propres projets, d&apos;une demi-journée à deux journées, dans leurs locaux.
          </p>
        </div>
      </section>

      {/* ── Pourquoi ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pourquoi former votre équipe à Figma
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Lancer un projet numérique sans écran dessiné, c&apos;est confier l&apos;interprétation de votre besoin
                à quelqu&apos;un qui ne connaît pas votre métier. Le résultat est rarement mauvais techniquement.
                Il est simplement à côté, et on le découvre au moment où le corriger coûte le plus cher.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Quand votre équipe sait maquetter, la discussion change de nature. On ne décrit plus une intention,
                on montre un écran. Le prestataire chiffre du développement au lieu de chiffrer du flou, et les
                arbitrages se font pendant qu&apos;ils sont encore gratuits.
              </p>
              <div className="space-y-3">
                {[
                  "Figma dispose d'une interface en français depuis octobre 2025, ce qui lève le dernier frein pour une équipe non anglophone",
                  "Le plan gratuit permet de démarrer sans licence : trois fichiers partagés, trois pages par fichier, sans date de fin",
                  "Le Dev Mode fournit mesures, couleurs et exports directement depuis la maquette, sans capture d'écran annotée à la main",
                  "Sur nos sessions, la difficulté n'est presque jamais l'outil : c'est de se mettre d'accord sur ce qu'on veut avant de le dessiner",
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
                  Les trois mécanismes qui font Figma
                </p>
                <FigmaPillars lang="fr" />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Chacun est appliqué directement sur un écran réel de votre activité.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Vocabulaire de la conception ── */}
      <section id="vocabulaire" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Conception de maquettes</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Wireframe, maquette, prototype, design system
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              Ces quatre mots désignent quatre objets différents, et la confusion entre eux coûte cher en réunion.
              Voici ce que recouvre chacun, dans l&apos;ordre où on les produit.
            </p>
          </SectionReveal>
          <DesignVocabulary lang="fr" />
        </div>
      </section>

      {/* ── Comparatif outils ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Choix de l&apos;outil</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Figma, Canva, Adobe XD ou Sketch
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              La question revient à chaque cadrage, en général sous la forme « on a déjà Canva, ça ne suffit pas ? ».
              Réponse honnête : cela dépend entièrement de ce que vous produisez.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FigmaToolComparison lang="fr" />
          </SectionReveal>
        </div>
      </section>

      {/* ── Programme par niveau ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Trois niveaux, selon ce que votre équipe doit produire
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              Le contenu est calé lors du cadrage, sur vos projets. Ce découpage sert de point de départ, pas de catalogue.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FigmaLevels lang="fr" accent={color} />
          </SectionReveal>
        </div>
      </section>

      {/* ── Cas d'usage ── */}
      <section id="cas-usage" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Cas d&apos;usage</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que vos équipes en font concrètement
              </h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FigmaUseCases lang="fr" accent={color} />
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden order-2 lg:order-1" style={{ boxShadow: '0 0 50px rgba(255,107,0,0.12)' }}>
                <Image
                  src="/images/services/dkdp-formation-figma-prototype-mobile.webp"
                  alt="Prototype Figma testé sur téléphone : la maquette mobile conçue en formation, cliquable avant développement"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                  Un parcours qui se teste avant d&apos;exister
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  À la fin de la journée, vos écrans ne sont pas des images dans une présentation. Ils sont reliés
                  entre eux, ouvrables sur un téléphone, et se parcourent comme une vraie application.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  C&apos;est le moment où les défauts apparaissent : une étape en trop, un bouton qu&apos;on ne trouve
                  pas, un formulaire trop long. Les corriger prend cinq minutes dans Figma. Après le développement,
                  cela prend un devis.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Intra vs catalogue ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <GradTag className="mb-4">Notre format</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Pourquoi nous ne faisons pas de session sur catalogue
              </h2>
            </div>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              La plupart des formations Figma de Suisse romande se donnent en salle, à dates fixes, sur un exercice
              inventé. Ce format existe et fonctionne pour découvrir un outil. Ce n&apos;est pas celui que nous avons choisi.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <IntraVsCatalogue lang="fr" accent={color} />
          </SectionReveal>
        </div>
      </section>

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profils</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                À qui s&apos;adresse la formation Figma
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Responsables marketing et communication',
              'Chefs de projet et product managers',
              'Fondateurs et directions de PME',
              'Développeurs qui montent en conception',
              'Assistants de direction et pôles internes',
              'Bureaux techniques et services études',
              'Graphistes qui passent à l’interface',
              'Indépendants qui pilotent leur site',
            ].map((role, i) => (
              <SectionReveal key={role} delay={i * 0.07}>
                <div
                  className="flex items-center justify-center text-center p-4 rounded-[12px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-text font-medium text-sm">{role}</p>
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
                Comment se déroule une session
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
                  <div className="flex flex-col gap-3 p-7 bg-bg border border-border rounded-[16px] h-full">
                    <div
                      className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <s.Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-text font-semibold text-sm">{s.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FigmaTrainer lang="fr" accent={color} />

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Retours après la formation Figma
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "La partie Auto Layout a été une révélation. Je peux maintenant maquetter une page mobile, tablette et ordinateur en parallèle, sans dupliquer le travail. Mes itérations vont trois fois plus vite.",
                name: 'Julien K., Fondateur',
                company: 'Startup tech, Genève',
                stars: 5,
              },
              {
                quote: "On a formé toute notre équipe produit à Figma et au design system. Notre cahier des charges visuel est devenu beaucoup plus précis, et les allers-retours avec notre agence de développement ont nettement diminué.",
                name: 'Sophie B., Product Manager',
                company: 'Scale-up SaaS, Lausanne',
                stars: 5,
              },
              {
                quote: "Le Dev Mode m'a fait gagner un temps fou. Je récupère directement les couleurs, les espacements et le code CSS sans poser une seule question au designer. La transmission est devenue fluide.",
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
                    <p className="text-text font-semibold text-sm">{t.name}</p>
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
                  Tarifs de la formation Figma
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                  Le prix dépend du nombre de participants et de la durée. Demi-journée, journée entière ou deux journées,
                  dans vos locaux ou en visio.
                </p>
              </div>
            </SectionReveal>
            <FormationPricing />
          </div>
        </section>
      </HeroBg>

      {/* ── Zone d'intervention ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="rounded-[20px] border border-border bg-bg-card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <MapPin size={18} style={{ color }} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em]">
                  Formation Figma à Genève et dans toute la Suisse romande
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
                DKDP est basée à Genève, aux Eaux-Vives, et se déplace dans vos locaux sur l&apos;ensemble de la
                Suisse romande. Le déplacement est compris dans le tarif pour le canton de Genève et sa périphérie,
                et chiffré à part au-delà. Pour les équipes réparties sur plusieurs sites, la session peut se tenir
                en visio, avec les mêmes exercices sur les mêmes fichiers.
              </p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((city) => (
                  <span
                    key={city}
                    className="text-[12px] px-3 py-1.5 rounded-full border text-text-secondary"
                    style={{ background: bg, borderColor: border }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur la formation Figma" />
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
                  <p className="text-text font-bold text-lg leading-tight">Vous avez la maquette. On la développe.</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vos équipes savent maintenant concevoir leurs écrans dans Figma. Pour transformer ces maquettes
                    en site web rapide et bien référencé, découvrez notre service de création de site web.
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
