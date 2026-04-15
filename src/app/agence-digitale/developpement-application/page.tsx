import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ChevronRight, ShieldCheck, Code2, Users, RefreshCw } from 'lucide-react'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import { HeroVisual } from './_components/HeroVisual'
import { AppTypesSection } from './_components/AppTypesSection'
import { TechStack } from './_components/TechStack'
import { AppGallery } from './_components/AppGallery'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  title: 'Développement Application Genève | iOS, Android, Web App | DKDP',
  description:
    'Développement d\'applications mobiles et web pour PME à Genève. iOS, Android, React Native, Web App sur mesure. Du cahier des charges au lancement, devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/developpement-application' },
  openGraph: {
    images: [{ url: '/images/og/developpement-application.webp', width: 1376, height: 768, alt: 'Développement application Genève DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Combien coûte le développement d\'une application mobile à Genève ?',
    answer:
      'Une application mobile simple (React Native, fonctionnalités essentielles) démarre autour de CHF 15\'000. Une app native iOS ou Android avec backend complet se situe entre CHF 25\'000 et CHF 60\'000. Une web app ou PWA est souvent moins coûteuse, entre CHF 8\'000 et CHF 20\'000. Chaque projet reçoit un devis fixe avant démarrage.',
  },
  {
    question: 'Combien de temps faut-il pour développer une application ?',
    answer:
      'Une PWA ou web app simple peut être livrée en 8 à 12 semaines. Une app mobile complète avec backend prend généralement 4 à 6 mois. Les délais dépendent du périmètre fonctionnel, validé et chiffré au départ dans le cahier des charges.',
  },
  {
    question: 'Quelle technologie choisir entre native (Swift/Kotlin) et React Native ?',
    answer:
      'React Native couvre 90% des besoins avec un seul code pour iOS et Android — c\'est le choix le plus efficace pour la plupart des projets PME. Le natif est pertinent si votre app requiert des performances graphiques élevées, un accès profond au hardware, ou des fonctionnalités très spécifiques à une plateforme. On vous conseille objectivement selon votre cas.',
  },
  {
    question: 'Est-ce que je garde la propriété du code livré ?',
    answer:
      'Oui, intégralement. Le code source vous appartient à la livraison finale. Pas de dépendance à DKDP pour faire évoluer votre app par la suite — vous êtes libres de le confier à qui vous voulez.',
  },
  {
    question: 'Est-ce que DKDP s\'occupe de la publication sur l\'App Store et Google Play ?',
    answer:
      'Oui. La préparation des fichiers, la configuration des comptes développeurs (ou la création si vous n\'en avez pas encore), les captures d\'écran, les descriptions et la soumission aux stores sont inclus dans le livrable final.',
  },
]

type AccentKey = 'violet' | 'chrome' | 'orange' | 'green'

const STEPS: {
  num: number
  title: string
  week: string
  duration: string
  accent: AccentKey
  desc: string
  deliverables: string
  icon: string
}[] = [
  {
    num: 1,
    title: 'Découverte & cadrage',
    week: 'Semaine 1-2',
    duration: '1 à 2 sem.',
    accent: 'violet',
    icon: 'search',
    desc: 'Analyse des besoins métier, définition du périmètre fonctionnel, personas utilisateurs, choix de plateforme. On clarifie l\'objectif avant de toucher à Figma.',
    deliverables: 'Cahier des charges, devis fixe, planning',
  },
  {
    num: 2,
    title: 'Design UX/UI',
    week: 'Semaine 2-5',
    duration: '2 à 3 sem.',
    accent: 'chrome',
    icon: 'pen',
    desc: 'Wireframes, maquettes Figma desktop et mobile, prototype cliquable. Vous validez l\'interface complète avant qu\'une seule ligne de code ne soit écrite.',
    deliverables: 'Maquettes Figma, prototype interactif',
  },
  {
    num: 3,
    title: 'Développement',
    week: 'Semaine 4-14',
    duration: '4 à 10 sem.',
    accent: 'orange',
    icon: 'code',
    desc: 'Sprints courts avec démos régulières. Accès à un environnement de test en continu sur vos appareils. L\'avancement est visible à chaque étape, pas seulement à la fin.',
    deliverables: 'Env. de test, démos sprint, code source',
  },
  {
    num: 4,
    title: 'Tests & QA',
    week: 'Semaine 13-15',
    duration: '1 à 2 sem.',
    accent: 'green',
    icon: 'check',
    desc: 'Tests fonctionnels, de performance et de sécurité sur iOS, Android et navigateurs. Les corrections sont intégrées avant mise en production.',
    deliverables: 'Rapport de tests, correctifs validés',
  },
  {
    num: 5,
    title: 'Lancement & suivi',
    week: 'Mise en production',
    duration: 'Continu',
    accent: 'violet',
    icon: 'rocket',
    desc: 'Déploiement, publication App Store et Google Play, formation de votre équipe, documentation technique. Support inclus 30 jours après le lancement.',
    deliverables: 'Publication stores, documentation, support 30j',
  },
]

const WHY = [
  {
    Icon: Users,
    title: 'Un seul interlocuteur',
    desc: 'De la maquette au store : design, développement, déploiement. Pas de sous-traitance, pas de perte d\'information entre équipes.',
  },
  {
    Icon: Code2,
    title: 'Code livré, sans dépendance',
    desc: 'Le code source vous appartient à la livraison. Vous pouvez le confier à n\'importe quel développeur par la suite.',
  },
  {
    Icon: ShieldCheck,
    title: 'Suivi post-lancement inclus',
    desc: '30 jours de support après le lancement pour corriger tout bug ou aider votre équipe à prendre en main l\'application.',
  },
  {
    Icon: RefreshCw,
    title: 'Compatible avec vos autres outils',
    desc: 'Intégration native avec vos systèmes existants : CRM, ERP, APIs tierces, outils d\'automatisation DKDP.',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function DeveloppementApplicationPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({
        name: 'Développement d\'application à Genève',
        url: '/agence-digitale/developpement-application',
        description: 'Développement d\'applications mobiles iOS, Android et web app sur mesure pour PME à Genève. React Native, Next.js, Supabase.',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Développement d\'application', url: 'https://dkdp.ch/agence-digitale/developpement-application' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Agence digitale
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Développement d&apos;application</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Apps Mobile et Web · Genève et Suisse romande</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Votre application sur mesure,{' '}
                  <GradText as="span">de l&apos;idée au lancement.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  iOS, Android, web app ou PWA : DKDP développe des applications métier robustes pour les PME qui veulent digitaliser leurs opérations ou créer une nouvelle expérience client. Un seul interlocuteur, de la maquette au store.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact" size="lg">Discuter de votre projet →</LiquidMetalButton>
                  <Link href="#types" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir les types d&apos;apps ↓
                  </Link>
                </div>
              </div>
              <HeroVisual />
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '30+', l: 'Applications livrées', sub: 'Mobile, web et PWA' },
              { v: '3 plateformes', l: 'iOS · Android · Web', sub: 'Un seul interlocuteur' },
              { v: '4.9/5', l: 'Satisfaction client', sub: 'Note vérifiée' },
              { v: '8 ans', l: "D'expertise dev", sub: 'En Suisse romande' },
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
      <ScrollSpyNav
        items={[
          { label: 'Types d\'apps', href: '#types' },
          { label: 'Processus', href: '#process' },
          { label: 'Stack', href: '#stack' },
          { label: 'Réalisations', href: '#galerie' },
          { label: 'Pourquoi DKDP', href: '#pourquoi' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Discuter de votre projet', href: '/contact' }}
        accentColor="#A78BFA"
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Types d'apps ── */}
      <section id="types" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;on développe</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Toutes les apps, un seul interlocuteur.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                iOS, Android, web app ou PWA. On choisit la technologie selon vos besoins réels, pas par habitude.
              </p>
            </div>
          </SectionReveal>
          <AppTypesSection />
        </div>
      </section>

      {/* ── Pourquoi une app métier ? ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Le besoin réel</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Quand Excel ne suffit plus.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Une PME qui gère ses interventions sur papier, ses commandes par email ou ses clients dans un tableur perd du temps chaque jour. Ce n&apos;est pas visible dans les bilans, mais c&apos;est mesurable en heures perdues, en erreurs et en croissance bloquée.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Une application métier bien conçue automatise les tâches répétitives, centralise les données et offre à vos équipes et à vos clients une expérience à la hauteur de votre activité. Couplée à nos solutions d&apos;{' '}
                <Link href="/intelligence-artificielle/automatisation" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color }}>automatisation IA</Link>
                {' '}ou d&apos;{' '}
                <Link href="/intelligence-artificielle/agents-ia" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color }}>agents IA</Link>
                , votre application gagne en intelligence sans alourdir vos équipes.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="flex flex-col gap-4">

                {/* Marquee */}
                <div className="relative overflow-hidden rounded-[12px] border border-border bg-bg-card py-3">
                  {/* fade edges */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-bg-card to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-bg-card to-transparent" />
                  <div className="flex w-max animate-marquee gap-0">
                    {[
                      'Gestion interventions terrain iOS/Android',
                      'Portail client sécurisé',
                      'Outil de commande en ligne',
                      'Dashboard temps réel équipes',
                      'App e-commerce mobile',
                      'Gestion RH ou logistique',
                      'MVP pour valider une idée',
                      'Gestion interventions terrain iOS/Android',
                      'Portail client sécurisé',
                      'Outil de commande en ligne',
                      'Dashboard temps réel équipes',
                      'App e-commerce mobile',
                      'Gestion RH ou logistique',
                      'MVP pour valider une idée',
                    ].map((item, i) => (
                      <span key={i} className="flex items-center gap-3 px-5 whitespace-nowrap text-[13px] text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-[16px] border border-border aspect-[4/3]">
                  <Image
                    src="/images/apps/dkdp-besoin-app-metier-entreprise.webp"
                    alt="Professionnel utilisant une application métier sur mesure développée par DKDP Genève"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Processus ── */}
      <HeroBg blob1="rgba(124,58,237,0.12)" blob2="rgba(124,58,237,0.06)">
        <section id="process" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-4">Notre méthode</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Du cahier des charges au store, sans mauvaise surprise.
                </h2>
                <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm">
                  Chaque étape a des livrables concrets. Vous savez toujours où en est votre projet.
                </p>
              </div>
            </SectionReveal>
            <ProcessTimeline steps={STEPS} />
          </div>
        </section>
      </HeroBg>

      {/* ── Stack technique ── */}
      <section id="stack" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Stack technique</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des technos choisies pour durer.
              </h2>
              <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm">
                Chaque choix technologique est justifié par les objectifs du projet. Pas de frameworks à la mode qui seront obsolètes dans deux ans.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <TechStack />
          </SectionReveal>
        </div>
      </section>

      {/* ── Galerie apps ── */}
      <section id="galerie" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Interfaces réalisées</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des apps pensées pour l&apos;usage réel.
              </h2>
              <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm">
                CRM mobile, SaaS web, gestion terrain, e-commerce, PWA : chaque projet a sa logique, son usage, ses contraintes métier.
              </p>
            </div>
          </SectionReveal>
          <AppGallery />
        </div>
      </section>

      {/* ── Pourquoi DKDP ── */}
      <section id="pourquoi" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pourquoi DKDP</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qui change concrètement.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY.map((w, i) => (
              <SectionReveal key={w.title} delay={i * 0.09}>
                <div
                  className="flex gap-5 p-7 bg-bg-card border border-border rounded-[16px] h-full hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <w.Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{w.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm">{w.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <CTAFinal accentRgb="124,58,237" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 border-t border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">FAQ</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Questions fréquentes.
              </h2>
            </div>
          </SectionReveal>
          <FAQSection items={FAQ} />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />
    </main>
  )
}
