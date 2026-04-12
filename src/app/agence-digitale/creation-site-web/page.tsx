import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { CheckCircle2, Zap, Search, Settings, ChevronRight, TrendingUp, BarChart2, ShieldCheck, Star, Globe2, Clock } from 'lucide-react'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { PerformanceComparison } from './_components/PerformanceComparison'
import { TechStack } from './_components/TechStack'
import { HeroVisual } from './_components/HeroVisual'
import { violet } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const SiteAuditBlock = dynamic(() => import('@/components/sections/SiteAuditBlock').then(m => ({ default: m.SiteAuditBlock })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  title: 'Création de Site Web à Genève · Sur mesure & performant · DKDP',
  description:
    'Création de sites web professionnels à Genève. Site vitrine, e-commerce ou sur mesure. Rapide, SEO-ready, livré en 3 à 5 semaines. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/creation-site-web' },
}


const FAQ = [
  {
    question: 'Combien coûte la création d\'un site web professionnel à Genève ?',
    answer:
      'Un site vitrine professionnel démarre à CHF 2\'500. Un site avec espace membre, blog ou boutique en ligne se situe entre CHF 5\'000 et CHF 12\'000. DKDP fournit un devis fixe avant démarrage, sans surprises.',
  },
  {
    question: 'En combien de temps mon site web sera-t-il livré ?',
    answer:
      'Un site vitrine est livré en 3 à 5 semaines. Un projet plus complexe (e-commerce, portail, intégrations API) prend 6 à 12 semaines. Un planning avec jalons de validation est partagé dès le démarrage.',
  },
  {
    question: 'Puis-je modifier le contenu de mon site moi-même après livraison ?',
    answer:
      'Oui. Tous les sites DKDP sont livrés avec une interface d\'administration simple (Sanity, Wordpress ou Notion selon le projet). Une session de formation à la prise en main est incluse dans le prix.',
  },
  {
    question: 'Quelles technologies utilisez-vous pour créer les sites web ?',
    answer:
      'DKDP travaille principalement avec Next.js, Astro et Wordpress selon les besoins. Les sites sont hébergés sur Vercel ou Infomaniak. Chaque choix technologique est justifié par les objectifs du projet, pas par une préférence par défaut.',
  },
  {
    question: 'Est-ce que mon site sera optimisé pour le référencement Google ?',
    answer:
      'Oui. Chaque site livré par DKDP intègre les fondamentaux SEO : structure sémantique HTML, balises titre et méta optimisées, images compressées, performance Core Web Vitals, et balisage Schema.org. Le SEO avancé (contenu, backlinks) fait l\'objet d\'une prestation séparée.',
  },
  {
    question: 'Mon site sera-t-il adapté aux mobiles ?',
    answer:
      'Obligatoirement. DKDP conçoit en "mobile first" : le design est d\'abord optimisé pour smartphone, puis adapté tablette et desktop. Plus de 65% du trafic web vient des mobiles. C\'est non négociable.',
  },
  {
    question: 'Que se passe-t-il si je ne suis pas satisfait du design ?',
    answer:
      'Le processus inclut une phase de maquette validée avant tout développement. Deux cycles de révisions sont inclus. Si un désaccord persiste, on en discute : DKDP ne livre jamais un site sans accord explicite du client.',
  },
  {
    question: 'Est-ce que je peux suivre l\'avancement du projet ?',
    answer:
      'Oui. Vous avez accès à un lien de prévisualisation dès la phase de développement et recevez des points d\'avancement réguliers par email ou visio.',
  },
  {
    question: 'Que se passe-t-il si je veux changer quelque chose en cours de route ?',
    answer:
      'On distingue les ajustements (inclus) des nouvelles fonctionnalités (devis complémentaire). Tout est défini clairement dans le contrat dès le départ.',
  },
  {
    question: 'Proposez-vous un accompagnement après la mise en ligne ?',
    answer:
      'Oui. On propose des forfaits de maintenance, d\'évolution et de SEO mensuel. Vous n\'êtes jamais seuls une fois le site livré.',
  },
]

const BENEFITS = [
  {
    Icon: Zap,
    title: 'Rapide et performant',
    value: '< 1.5s',
    desc: 'Temps de chargement optimisé pour un score Core Web Vitals au vert et une expérience utilisateur fluide sur tous les appareils.',
  },
  {
    Icon: Search,
    title: 'SEO-ready dès le départ',
    value: 'Top 3',
    desc: 'Structure sémantique, balises, Schema.org, performance : les bases SEO sont intégrées au développement, pas ajoutées après.',
  },
  {
    Icon: Settings,
    title: 'Géré en autonomie',
    value: '100%',
    desc: 'Interface d\'administration intuitive pour modifier vos textes, images et pages sans toucher au code. Formation incluse.',
  },
]

type AccentKey = 'violet' | 'chrome' | 'orange' | 'green'

const ACCENT_MAP: Record<AccentKey, { color: string; bg: string; bd: string }> = {
  violet: { color: '#A78BFA', bg: 'rgba(124,58,237,0.10)', bd: 'rgba(124,58,237,0.20)' },
  chrome: { color: '#D4D4D8', bg: 'rgba(212,212,216,0.06)', bd: 'rgba(212,212,216,0.14)' },
  orange: { color: '#FF8C00', bg: 'rgba(255,107,0,0.08)', bd: 'rgba(255,107,0,0.18)' },
  green:  { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', bd: 'rgba(74,222,128,0.20)' },
}

const STEPS: { num: number; title: string; week: string; duration: string; accent: AccentKey; desc: string; deliverables: string; icon: string }[] = [
  {
    num: 1, title: 'Audit & découverte', week: 'Semaine 1', duration: '1 à 2 jours', accent: 'violet',
    desc: 'On commence par comprendre votre activité, votre cible, vos objectifs et vos contraintes. Analyse de l\'existant, benchmark concurrentiel, identification des opportunités digitales.',
    deliverables: 'Brief complet, rapport d\'audit (si site existant), proposition stratégique', icon: 'search',
  },
  {
    num: 2, title: 'Proposition & devis', week: 'Semaine 1-2', duration: '2 à 5 jours', accent: 'chrome',
    desc: 'On vous remet une proposition détaillée : périmètre exact, calendrier, technologies recommandées, budget transparent. Pas de surprise.',
    deliverables: 'Devis détaillé, plan de projet, technologies choisies', icon: 'doc',
  },
  {
    num: 3, title: 'Design & maquettes', week: 'Semaine 2-4', duration: '5 à 10 jours', accent: 'violet',
    desc: 'Wireframes, maquettes desktop et mobile. Chaque décision UI est justifiée. Vous validez avant qu\'une seule ligne de code soit écrite.',
    deliverables: 'Maquettes Figma, charte graphique, prototype interactif', icon: 'pen',
  },
  {
    num: 4, title: 'Développement', week: 'Semaine 3-8', duration: '2 à 6 semaines', accent: 'orange',
    desc: 'Intégration en Next.js ou Astro, optimisation performances, SEO technique, accessibilité. Vous avez accès à un lien de prévisualisation à chaque étape clé.',
    deliverables: 'Site complet, code source, tests et optimisations', icon: 'code',
  },
  {
    num: 5, title: 'Recettes & ajustements', week: 'Semaine 7-9', duration: '3 à 7 jours', accent: 'green',
    desc: 'On teste ensemble chaque fonctionnalité. Vous soumettez vos retours, on intègre les ajustements. Zéro frustration : on ne livre pas un produit que vous n\'avez pas validé.',
    deliverables: 'Procès-verbal de recette, liste des correctifs, version finale validée', icon: 'check',
  },
  {
    num: 6, title: 'Mise en ligne & suivi', week: 'Semaine 9-10', duration: '1 à 2 jours', accent: 'violet',
    desc: 'Déploiement, configuration DNS, vérifications SEO post-lancement, rapport de démarrage. Et après ? On reste disponibles pour les évolutions.',
    deliverables: 'Site en ligne, guide de prise en main, rapport de lancement', icon: 'rocket',
  },
]

const color = violet.color
const bg = violet.bg
const border = violet.border

export default function CreationSiteWebPage() {
  return (
    <main>
      <SchemaOrg schema={buildService({ name: 'Création de site web à Genève', url: '/agence-digitale/creation-site-web', description: 'Création de sites web professionnels sur mesure pour PME à Genève. Site vitrine, e-commerce, Next.js, Astro, WordPress.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Création de site web', url: 'https://dkdp.ch/agence-digitale/creation-site-web' },
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
              <span className="text-sm" style={{ color }}>Création de site web</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Site web sur mesure · Genève</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Votre site web à Genève,{' '}
                  <GradText as="span">conçu pour convertir.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP crée des sites web professionnels à Genève : vitrine, e-commerce ou sur mesure. Chaque projet est pensé pour être rapide, visible sur Google et facile à gérer en autonomie. Les tarifs démarrent à CHF 2&apos;500, avec un devis fixe et sans surprise.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=service-digital" size="lg">Devis gratuit →</LiquidMetalButton>
                  <Link href="#process" className="text-sm text-text-muted hover:text-white transition-colors">
                    Notre méthode ↓
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
              { v: '100+', l: 'Sites livrés', sub: 'En Suisse romande' },
              { v: '10+ ans', l: "D'expérience", sub: 'Dans le digital genevois' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note client vérifiée' },
              { v: '< 1.5s', l: 'Vitesse moyenne', sub: 'Score PageSpeed 90+' },
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
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Processus', href: '#process' },
                { label: 'Estimation', href: '/agence-digitale/creation-site-web/estimation' },
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
              href="/contact?service=service-digital"
              className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80"
              style={{ background: 'rgba(124,58,237,0.18)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.30)' }}
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Ce qu'on fait ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Un site qui travaille pour vous, pas juste un site.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Un site web beau mais lent, mal référencé ou difficile à mettre à jour ne rapporte rien. DKDP conçoit des sites qui combinent design soigné, performance technique et fondamentaux SEO, pour que votre investissement soit rentable dès le premier mois.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Chaque projet démarre par un brief approfondi. On comprend votre marché, vos clients et vos objectifs avant d&apos;ouvrir Figma. Le résultat est un site pensé pour votre audience, pas pour impressionner des designers.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {[
                  'Site vitrine professionnel (1 à 20 pages)',
                  'Boutique e-commerce Shopify ou WooCommerce',
                  'Application web sur mesure (Next.js)',
                  'Landing page de conversion (campagne Ads)',
                  'Site multilingue (FR / EN / DE)',
                  'Refonte complète d\'un site existant',
                  'Intégration CRM, formulaire, paiement en ligne',
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

      {/* ── Pourquoi ça rate ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Votre site coûte des clients sans que vous le sachiez.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Un site lent, mal adapté au mobile ou mal structuré pour Google perd des visiteurs chaque heure. Ce n&apos;est pas visible dans votre comptabilité, mais c&apos;est mesurable : Google PageSpeed, Core Web Vitals et taux de rebond ne mentent pas.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Clock, title: '53% des visiteurs quittent un site qui met plus de 3 secondes à charger', sub: 'Source : Google / Think with Google' },
                  { Icon: TrendingUp, title: '70% du trafic web vient des mobiles. Un site non adapté perd 7 visiteurs sur 10', sub: 'Source : Statista 2024' },
                  { Icon: Search, title: 'Les 3 premiers résultats Google captent 75% des clics. En dessous : invisible', sub: 'Source : Advanced Web Ranking' },
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
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Comparaison de performances
                </p>
                <PerformanceComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Métriques Core Web Vitals réelles. Le score PageSpeed impacte directement le classement Google.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bénéfices ── */}
      <section className="py-24">
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
                Des tarifs clairs, un devis fixe.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Pas de surprise en cours de projet. Chaque devis est détaillé et validé avant que quoi que ce soit ne démarre.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Site vitrine',
                price: 'dès CHF 2\'500',
                duration: '3 à 5 semaines',
                features: [
                  'Design sur mesure (Figma)',
                  'Jusqu\'à 10 pages',
                  'SEO technique intégré',
                  'Responsive mobile / tablette',
                  'Interface d\'administration',
                  'Formation incluse',
                ],
                cta: 'Demander un devis',
                highlight: false,
              },
              {
                label: 'E-commerce',
                price: 'dès CHF 5\'000',
                duration: '5 à 8 semaines',
                features: [
                  'Boutique Shopify ou WooCommerce',
                  'Catalogue produits illimité',
                  'Paiement en ligne sécurisé',
                  'Gestion des stocks',
                  'Emails transactionnels',
                  'Optimisation conversion',
                ],
                cta: 'Demander un devis',
                highlight: true,
              },
              {
                label: 'Sur mesure / App',
                price: 'Sur devis',
                duration: '6 à 12 semaines',
                features: [
                  'Application web Next.js',
                  'Intégrations API / CRM',
                  'Espace membre ou portail',
                  'Site multilingue',
                  'Performance maximale',
                  'Architecture scalable',
                ],
                cta: 'Discutons de votre projet',
                highlight: false,
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

      {/* ── Stack techno ── */}
      <section className="py-14 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-6">
              Technologies maîtrisées
            </p>
            <TechStack />
            <p className="text-center text-text-muted text-[11px] mt-6 max-w-lg mx-auto">
              Chaque technologie est choisie selon les objectifs du projet, pas par habitude. On explique nos choix avant de coder.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Process ── */}
      <HeroBg blob1="rgba(124,58,237,0.12)" blob2="rgba(124,58,237,0.06)">
        <section id="process" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-4">Le processus</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  6 étapes, zéro improvisation.
                </h2>
              </div>
            </SectionReveal>

            <ProcessTimeline steps={STEPS} />
          </div>
        </section>
      </HeroBg>

      {/* ── Réalisations ── */}
      <section id="realisations" className="py-24 scroll-mt-[124px]">
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
                type: 'Refonte site vitrine',
                image: '/images/services/dkdp-agence-création-web.webp',
                results: ['+340% trafic organique', '15 leads qualifiés / mois', 'Livré en 4 semaines'],
                tech: 'Next.js · Sanity · Vercel',
              },
              {
                client: 'Boutique lifestyle Genève',
                type: 'E-commerce Shopify',
                image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
                results: ['+220% chiffre d\'affaires online', 'Taux de conversion x2.8', 'Mobile-first complet'],
                tech: 'Shopify · Liquid · Klaviyo',
              },
              {
                client: 'Clinique spécialisée',
                type: 'Site vitrine + CRM',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['0 à 80 patients / mois via web', 'Score PageSpeed 98/100', 'Multilingue FR / EN'],
                tech: 'Astro · HubSpot · Infomaniak',
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
                  { Icon: ShieldCheck, title: 'Devis fixe', desc: 'Le prix convenu au départ est le prix final. Aucun supplément sans validation écrite de votre part.' },
                  { Icon: Clock, title: 'Délais respectés', desc: 'Un planning avec jalons est partagé dès le démarrage. Les retards sont communiqués en avance, jamais après.' },
                  { Icon: BarChart2, title: '2 révisions incluses', desc: 'Deux cycles de retours sur le design et le contenu sont intégrés dans chaque projet, sans surcoût.' },
                  { Icon: Globe2, title: 'Support 3 mois', desc: 'Après livraison, DKDP reste disponible 3 mois pour corriger tout bug ou aider à la prise en main.' },
                ].map((g, i) => (
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

      {/* ── Audit gratuit ── */}
      <SiteAuditBlock />

      {/* ── Témoignages ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur la création de site web" />
      </div>

      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/seo"
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
                  <Search size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-white font-bold text-lg leading-tight">Référencement SEO</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Votre site est livré SEO-ready. Pour dominer Google sur vos mots-clés cibles, une stratégie de contenu et de netlinking est nécessaire.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir le SEO <ChevronRight size={12} />
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
