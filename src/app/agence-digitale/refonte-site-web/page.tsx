import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Smartphone,
  Gauge,
  Lock,
  Search,
  Wrench,
  Layers,
  Activity,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Clock,
  Star,
  Settings,
  Map,
  Code2,
  Zap,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { TrustLine } from '@/components/ui/TrustLine'
import { HeroPills } from '@/components/ui/HeroPills'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet } from '@/lib/tokens'
import { PRIX, chf } from '@/data/pricing'
import { AppLogoMarquee, DESIGN_WEB_LOGOS, IA_LOGOS } from '@/components/ui/AppLogos'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const SiteAuditBlock = dynamic(() => import('@/components/sections/SiteAuditBlock').then(m => ({ default: m.SiteAuditBlock })))

export const metadata: Metadata = {
  title: 'Refonte site web Genève & Suisse romande | Sans perte SEO | DKDP',
  // 25/09/2026 : « +240 % trafic en 6 mois en moyenne » retiré, aucune source. Remplacé par le prix (PRIX).
  description:
    // 25/09/2026 : ramenée sous 920 px (909 px, tools/check-serp-width.mjs).
    `Refonte de site web à Genève : design moderne, UX repensée, migration WordPress ou Next.js sans perte SEO. Dès ${chf(PRIX.refonteFrom)}, devis sous 48 h.`,
  alternates: {
    canonical: 'https://dkdp.ch/agence-digitale/refonte-site-web',
    languages: {
      'fr-CH': 'https://dkdp.ch/agence-digitale/refonte-site-web',
      en: 'https://dkdp.ch/en/digital-agency/website-redesign',
      'x-default': 'https://dkdp.ch/agence-digitale/refonte-site-web',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/agence-digitale/refonte-site-web',
    images: [
      {
        url: '/images/og/refonte-site-web.png',
        width: 1376,
        height: 768,
        alt: "Refonte de site web à Genève : migration moderne sans perte SEO par DKDP",
      },
    ],
  },
  keywords: [
    'refonte site web Genève',
    'refonte site internet Genève',
    'migration site web Suisse',
    'refonte WordPress Genève',
    'refonte Next.js Suisse romande',
    'refonte e-commerce Shopify',
    'migration site sans perte SEO',
    'DKDP',
  ],
}

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const V = violet.color
const VB = 'rgba(167,139,250,0.08)'
const VD = 'rgba(167,139,250,0.22)'

/* ── Data ──────────────────────────────────────────────────────────────────── */
const SYMPTOMS = [
  { Icon: Clock, title: 'Design obsolète', desc: "Votre site a plus de 4 ans sans refonte. Il renvoie une image datée, surtout face à vos concurrents récents." },
  // 25/09/2026 : « 65 à 78 % du trafic » et « la moitié de vos prospects » retirés, aucune source.
  { Icon: Smartphone, title: 'Pas mobile-friendly', desc: "Vos Core Web Vitals sont rouges sur mobile, alors qu'une grande partie de vos visiteurs arrive depuis un smartphone. Vous perdez donc des prospects à chaque visite." },
  { Icon: Activity, title: 'Zéro conversion', desc: "Du trafic mais pas de leads. CTA introuvables, formulaire à 12 champs, parcours cassé." },
  { Icon: Layers, title: 'Non responsive tablette', desc: "Le site casse sur iPad portrait (768 px). Les directeurs et clients B2B lisent depuis leur tablette." },
  { Icon: Lock, title: "Pas d'accès au back-office", desc: "L'ancien dev a disparu ou vous refuse l'accès. Impossible de modifier, de mettre à jour, de corriger une typo." },
  { Icon: Wrench, title: 'Impossible à modifier seul', desc: "Chaque changement de texte implique un devis. Vous évitez d'actualiser le site et il se fossilise." },
  { Icon: Gauge, title: 'Lenteurs et crashes', desc: "PageSpeed < 50 sur mobile. Le site rame, tombe pendant les pics, pénalisant SEO et UX." },
  { Icon: ShieldCheck, title: 'Non conforme nLPD et RGPD', desc: "Bannière cookies manquante, pas de registre des traitements, politique de confidentialité fantôme. Risque juridique." },
]

const APPROACH = [
  {
    Icon: Search,
    title: 'Audit SEO complet avant refonte',
    desc: "On analyse vos pages qui rankent, vos backlinks, vos mots-clés actifs. On identifie précisément ce qu'il faut préserver avant de toucher quoi que ce soit.",
  },
  {
    Icon: Map,
    title: 'Plan de redirections 301 systématique',
    desc: "Chaque ancienne URL est cartographiée et redirigée vers sa nouvelle équivalente. Aucun jus SEO perdu, aucun 404 dans Search Console.",
  },
  {
    Icon: Layers,
    title: 'Migration progressive, pas de coupure',
    desc: "Nouvelle version construite sur environnement de staging. Bascule nocturne le week-end. Plan de rollback prêt. Vos visiteurs ne voient jamais de page d'erreur.",
  },
  {
    Icon: TrendingUp,
    title: 'Préservation du jus SEO existant',
    desc: "On conserve les structures H1/H2, les URLs principales, les textes qui performent. On améliore ce qui ne marchait pas, on ne casse pas ce qui marchait.",
  },
  {
    Icon: Gauge,
    title: 'Core Web Vitals garantis au vert',
    desc: "LCP < 2,5 s, INP < 200 ms, CLS < 0,1 sur mobile et desktop. Testés sur iPhone 15, Samsung S24, iPad. Score Lighthouse ≥ 90 sur chaque page livrée.",
  },
]

const PROCESS_STEPS = [
  { n: '01', title: "Audit SEO du site existant", desc: "Pages qui rankent, mots-clés actifs, backlinks à préserver. Rapport détaillé en 48 h." },
  { n: '02', title: 'Benchmark concurrents Suisse romande', desc: "Analyse des 5 concurrents locaux qui vous battent sur Google et dans AI Overviews." },
  { n: '03', title: 'Wireframes et prototype Figma', desc: "Maquette des pages clés. Validation en visio avant tout développement." },
  { n: '04', title: 'Validation design client', desc: "2 cycles de révisions inclus. Pas de code tant que le design n'est pas validé écrit." },
  { n: '05', title: 'Développement en staging', desc: "Environnement de pré-production protégé par mot de passe. Vous testez en temps réel." },
  { n: '06', title: 'Migration contenu + 301', desc: "Transfert du contenu existant, plan de redirections 301 de chaque ancienne URL." },
  { n: '07', title: 'Tests Core Web Vitals + WCAG', desc: "Validation Lighthouse, axe DevTools, tests manuels mobile et clavier. Score ≥ 90." },
  { n: '08', title: 'Mise en ligne + monitoring 30 j', desc: "Bascule DNS, ping IndexNow, soumission Search Console. Suivi SEO post-lancement pendant 30 jours." },
]

const TECH_STACK = [
  { name: 'Next.js', cat: 'Applications modernes', desc: 'React 19, Server Components, performance native, idéal pour PME ambitieuses.' },
  { name: 'WordPress', cat: 'Refontes CMS préservé', desc: 'Thème custom sur mesure, ACF Pro, plugins audités. Pour les équipes déjà formées.' },
  { name: 'Shopify', cat: 'E-commerce', desc: 'Boutiques performantes, Hydrogen sur mesure, intégration Twint et PostFinance.' },
  { name: 'Sanity', cat: 'Headless CMS', desc: 'Back-office sur mesure, édition en temps réel, API GraphQL/GROQ.' },
  { name: 'Contentful', cat: 'Headless CMS', desc: 'Pour les équipes marketing internationales, workflows de validation.' },
  // 25/09/2026 : « LCP < 1 s » retiré, promesse de chargement sans source.
  { name: 'Astro', cat: 'Sites statiques performants', desc: 'Build SSG ultra-rapide. Idéal pour les sites vitrine SEO-critical.' },
  { name: 'Vercel', cat: 'Hébergement', desc: 'CDN global, preview deployments, intégration Next.js native. 99,99 % uptime.' },
  { name: 'Cloudflare', cat: 'CDN et sécurité', desc: 'Protection DDoS, WAF, cache edge. Pour les sites à trafic élevé ou sensibles.' },
]

// 25/09/2026 : les trois « cas anonymisés » (fiduciaire, e-commerce, PME
// industrielle) et leurs KPI (+240 %, -60 %, x3,2, +22 %, -85 %, +115 %) sont
// retirés, aucune source. La section « Résultats » est supprimée avec eux.
// Prix lus dans src/data/pricing (PRIX) : la refonte à « CHF 3 900 » contredisait
// PRIX.refonteFrom.
const FAQ_ITEMS = [
  {
    question: 'Combien coûte une refonte de site web à Genève ?',
    answer:
      `Une refonte de site vitrine (jusqu'à 10 pages) démarre à ${chf(PRIX.refonteFrom)}. Un site corporate (10 à 30 pages, multilingue) se situe entre CHF 7'500 et CHF 18'000. Une refonte e-commerce complète ou une migration technique sur mesure est chiffrée sur devis. Tous les projets incluent l'audit SEO pré-refonte, le plan de redirections 301, la formation back-office et 3 mois de support post-lancement. Devis fixe fourni avant démarrage, pas de surprises.`,
  },
  {
    question: 'Combien de temps pour une refonte complète ?',
    answer:
      "Une refonte de site vitrine est livrée en 5 à 8 semaines. Un site corporate multilingue prend 10 à 14 semaines. Une migration e-commerce complexe (Prestashop vers Shopify avec catalogue > 500 produits) se chiffre sur 12 à 16 semaines. Un planning avec jalons de validation écrite est partagé dès le brief.",
  },
  {
    question: 'Vais-je perdre mon référencement Google après la refonte ?',
    answer:
      "Non, si la refonte est faite correctement. DKDP commence par un audit SEO complet du site existant : pages qui rankent, backlinks, mots-clés actifs, Core Web Vitals. Chaque ancienne URL est cartographiée et redirigée en 301 vers sa nouvelle équivalente. Les structures H1/H2 qui performent sont préservées, puis le référencement est suivi pendant 30 jours après la mise en ligne.",
  },
  {
    question: 'Faut-il tout refaire ou peut-on migrer l\'existant ?',
    answer:
      "Ça dépend de l'état technique. Si votre WordPress est propre (thème récent, plugins à jour, pas de dette technique), on peut refondre le design sans changer le CMS. Si votre site est construit sur une techno obsolète (Flash, PHP 5, builder sans accès au code), une migration complète est nécessaire. DKDP évalue systématiquement dans l'audit initial, sans parti pris technologique.",
  },
  {
    question: 'Quelle différence entre refonte et création ?',
    answer:
      `Une création de site web part de zéro : nouveau domaine, aucun historique SEO, aucun contenu à préserver. Une refonte concerne un site existant avec un historique (backlinks, pages indexées, contenus rankés) qu'il faut préserver et améliorer. Les budgets diffèrent : une création démarre à ${chf(PRIX.siteFrom)}, une refonte à ${chf(PRIX.refonteFrom)} car elle inclut l'audit SEO et le plan de redirections. Pour un comparatif détaillé, lisez notre article refonte site web : quand et pourquoi.`,
  },
  {
    question: 'Peut-on garder notre nom de domaine et nos contenus ?',
    answer:
      "Oui, dans la grande majorité des cas. On garde le domaine (aucune migration DNS majeure), on récupère le contenu textuel via export ou scraping si nécessaire, on migre les médias (images, PDF, vidéos) vers le nouveau stockage. Les URLs principales sont conservées ou redirigées en 301. Si vous souhaitez changer de domaine, on gère la migration complète avec une stratégie SEO dédiée.",
  },
  {
    question: 'Le site sera-t-il modifiable par mon équipe ?',
    answer:
      "Obligatoirement. Chaque refonte DKDP est livrée avec un back-office adapté à votre équipe : Sanity ou Contentful (headless, modernes, pour équipes marketing), WordPress (pour équipes déjà formées), ou Notion (pour les plus petites structures). Une session de formation 1 h 30 est incluse, plus un guide vidéo. Les modifications courantes (textes, images, pages) se font sans nous recontacter.",
  },
  {
    question: 'Comment se passe la migration sans coupure de service ?',
    answer:
      "La nouvelle version est développée sur un environnement de staging protégé par mot de passe. Quand tout est validé, on bascule en production pendant une fenêtre de maintenance courte (15 à 30 min, généralement un samedi 23 h-01 h). Les visiteurs ne voient jamais de page d'erreur. Un plan de rollback est prêt en cas de problème. On monitore les 24 h suivantes.",
  },
  // 25/09/2026 : « LCP < 1 s » retiré, promesse de chargement sans source.
  {
    question: 'Refonte WordPress ou passage à Next.js ?',
    answer:
      "Dépend de vos besoins. WordPress reste pertinent si votre équipe est formée, si vous avez beaucoup de contributeurs, et si la performance extrême n'est pas critique. Next.js est supérieur pour : performance mobile, SEO technique, applications avec logique métier (dashboards, calculateurs, espaces clients), intégrations IA/agents. On ne force jamais une techno : on recommande celle qui sert vos objectifs.",
  },
  {
    question: 'La refonte est-elle conforme RGPD et nLPD Suisse ?',
    answer:
      "Oui, par défaut. Chaque refonte DKDP inclut : bannière cookies conforme (consent explicite, opt-in par catégorie), politique de confidentialité adaptée à la nLPD 2023 suisse et au RGPD européen, registre des traitements documenté, formulaires sécurisés avec mention légale, possibilité d'hébergement 100 % Suisse (Infomaniak Genève). Pour les secteurs régulés (fiduciaire, médical, juridique), on fournit aussi l'analyse d'impact PIA et le DPA avec les sous-traitants.",
  },
]

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function RefonteSiteWebPage() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Refonte de site web Genève & Suisse romande',
          url: '/agence-digitale/refonte-site-web',
          description:
            "Refonte de sites web obsolètes à Genève et en Suisse romande : design moderne, UX repensée, migration WordPress, Next.js, Shopify ou Astro sans perte de référencement SEO. Audit SEO pré-refonte, plan de redirections 301, Core Web Vitals garantis au vert. Conforme nLPD 2023 et RGPD.",
          serviceType: 'Refonte de site web',
          // 25/09/2026 : 3900 en dur remplacé par PRIX.refonteFrom.
          priceFrom: PRIX.refonteFrom,
          priceSpecDescription: `À partir de ${chf(PRIX.refonteFrom)} pour une refonte de site vitrine (10 pages), audit SEO inclus`,
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
          { name: 'Refonte de site web', url: 'https://dkdp.ch/agence-digitale/refonte-site-web' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)" accentRgb="167,139,250">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-text transition-colors">
                Agence Digitale
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color: V }}>
                Refonte de site web
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">
                  Refonte de site web Genève & Suisse romande
                </h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Votre site vous <GradText as="span">coûte des clients</GradText>. On le refait avec de vrais résultats.
                </p>
                {/* 25/09/2026 : « +240 % de trafic organique en 12 mois en moyenne sur les 14 refontes » retiré, aucune source. */}
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Refonte complète, migration sans perte SEO, design 2026, Core Web Vitals garantis au vert. Pour PME romandes qui veulent un site qui convertit vraiment.
                </p>
                <HeroPills
                  items={[
                    { label: 'Audit gratuit', Icon: Zap },
                    { label: 'Livraison 4 à 8 sem', Icon: Clock },
                    { label: 'SEO préservé', Icon: Search },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Audit gratuit de mon site
                  </LiquidMetalButton>
                  <Link
                    href="#symptomes"
                    className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
                  >
                    Symptômes d&apos;un site à refaire <ArrowRight size={13} />
                  </Link>
                </div>
                {/* 25/09/2026 : « CHF 3 900 » en dur contredisait PRIX.refonteFrom. */}
                <p className="text-text-muted text-xs mt-6">
                  Tarif fixe dès {chf(PRIX.refonteFrom)}. Audit SEO inclus. Devis en 48 h.
                </p>
              </div>

              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Stack pour la refonte de votre site">
                  <AppLogoMarquee
            logos={[...DESIGN_WEB_LOGOS, ...IA_LOGOS.slice(0, 4)]}
            durationSeconds={126}
            size="md"
          />
                </div>
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(167,139,250,0.18)' }}
                >
                  <Image
                    src="/images/og/refonte-site-web.png"
                    alt="Refonte de site web à Genève : split-screen avant/après design 2026 avec Core Web Vitals au vert par DKDP"
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
        </section>      </HeroBg>



      

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* 25/09/2026 : « +240 % » et « 0 % de perte SEO sur 14 refontes » retirés, aucune source. Remplacés par le prix (PRIX) et le délai de l'audit. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: chf(PRIX.refonteFrom), l: 'Refonte vitrine', sub: 'Prix de départ, audit SEO inclus' },
              { v: '48h', l: 'Audit SEO', sub: 'Rapport avant la refonte' },
              { v: '5-8 sem.', l: 'Délai vitrine', sub: 'Planning respecté' },
              { v: '≥ 90', l: 'Score Lighthouse', sub: 'Mobile et desktop' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: V }}>
                    {s.v}
                  </p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>


      <LogoBanner />
      {/* ── Estimation CTA (lead-gen haute intention) ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            href="/agence-digitale/creation-site-web/estimation"
            className="group relative block overflow-hidden rounded-[20px] border transition-all hover:-translate-y-0.5 duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.14) 0%, rgba(167,139,250,0.04) 100%)',
              borderColor: 'rgba(167,139,250,0.32)',
              boxShadow: '0 0 50px rgba(167,139,250,0.10)',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: V }}>
                  Budget et délai en 2 minutes
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-text mb-2">
                  Combien coûtera la refonte de votre site ?
                </h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl">
                  Estimateur en ligne gratuit. Tailles, technos, modules, délais. Réponse chiffrée immédiate, sans e-mail obligatoire.
                </p>
              </div>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm shrink-0 transition-transform group-hover:translate-x-1"
                style={{ background: 'var(--violet)', color: '#fff' }}
              >
                Obtenir mon estimation
                <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Symptômes', href: '#symptomes' },
          { label: 'Notre approche', href: '#approche' },
          { label: 'Refonte vs création', href: '#vs-creation' },
          { label: 'Stack technique', href: '#stack' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'Processus', href: '#processus' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Audit gratuit', href: '/agence-digitale/creation-site-web/audit-site' }}
        accentColor={V}
        accentBg="rgba(124,58,237,0.18)"
        accentBorder="rgba(124,58,237,0.30)"
      />

      {/* ── Symptômes ── */}
      <section id="symptomes" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Symptômes</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Votre site actuel a l&apos;un de ces symptômes ?
              </h2>
              {/* 25/09/2026 : « rentable dans les 12 mois » retiré, promesse sans source. */}
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                Si vous cochez plus de 3 cases, une refonte mérite d&apos;être étudiée sérieusement.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SYMPTOMS.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.05}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-6"
                  style={{ background: VB, borderColor: VD }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[8px] mb-4"
                    style={{ background: 'rgba(167,139,250,0.12)', border: `1px solid ${VD}` }}
                  >
                    <s.Icon size={18} style={{ color: V }} />
                  </div>
                  <h3 className="text-text font-semibold text-base mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approche ── */}
      <section id="approche" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre approche</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Une refonte qui préserve votre SEO et améliore tout le reste.
              </h2>
              {/* 25/09/2026 : « dans les 30 premiers jours » retiré, aucune source. */}
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                La différence entre une refonte réussie et une catastrophe SEO se joue dès le début du projet, bien avant la mise en ligne.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {APPROACH.map((a, i) => (
              <SectionReveal key={a.title} delay={i * 0.08}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-6"
                  style={{ background: VB, borderColor: VD }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[8px] mb-4"
                    style={{ background: 'rgba(167,139,250,0.12)', border: `1px solid ${VD}` }}
                  >
                    <a.Icon size={18} style={{ color: V }} />
                  </div>
                  <h3 className="text-text font-semibold text-base mb-2">{a.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{a.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Refonte vs Création ── */}
      <section id="vs-creation" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Refonte vs création</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Refonte ou création : quelle différence ?
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                Le choix n&apos;est pas symbolique. Il détermine votre budget, votre timing et votre stratégie SEO.
              </p>
            </div>
          </SectionReveal>

          {/* 25/09/2026 : budgets lus dans src/data/pricing (PRIX.siteFrom, PRIX.refonteFrom), plus en dur. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Création',
                tag: 'Nouveau projet',
                desc: 'Vous partez de zéro : nouveau domaine, aucun historique SEO, aucun contenu à préserver.',
                points: [
                  'Aucune contrainte historique',
                  `Budget : dès ${chf(PRIX.siteFrom)}`,
                  'Délai : 3 à 5 semaines (vitrine)',
                  'SEO à construire de A à Z',
                ],
                href: '/agence-digitale/creation-site-web',
                cta: 'Voir la création',
                accent: 'var(--surface-default)',
                accentBorder: 'var(--surface-border)',
                accentText: 'var(--text)',
              },
              {
                title: 'Refonte',
                tag: 'Site existant',
                desc: 'Votre site existe, il rank sur certains mots-clés, il a des backlinks. On préserve et on améliore.',
                points: [
                  'Audit SEO pré-refonte obligatoire',
                  `Budget : dès ${chf(PRIX.refonteFrom)} (vitrine)`,
                  'Délai : 5 à 8 semaines (vitrine)',
                  'Plan de redirections 301 systématique',
                ],
                href: '#tarifs',
                cta: 'Voir les tarifs refonte',
                accent: VB,
                accentBorder: VD,
                accentText: V,
                highlight: true,
              },
            ].map((card) => (
              <SectionReveal key={card.title}>
                <div
                  className="flex flex-col h-full rounded-[20px] border p-8 relative"
                  style={{
                    background: card.accent,
                    borderColor: card.accentBorder,
                    ...(card.highlight
                      ? { boxShadow: '0 0 50px rgba(167,139,250,0.10)' }
                      : {}),
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: card.accentText }}
                  >
                    {card.tag}
                  </p>
                  <h3 className="text-text font-bold text-2xl mb-3">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{card.desc}</p>
                  <div className="space-y-2 mb-7 flex-1">
                    {card.points.map((p) => (
                      <div key={p} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: card.accentText }} />
                        <span className="text-text-secondary text-sm">{p}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: card.accentText }}
                  >
                    {card.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack technique ── */}
      <section id="stack" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Stack technique</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Notre stack technique pour vos refontes.
              </h2>
              {/* 25/09/2026 : « Toutes testées sur 50+ projets » retiré, aucune source. */}
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                On choisit la techno selon vos besoins, pas selon nos préférences.
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH_STACK.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.05}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-5"
                  style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={16} style={{ color: V }} />
                    <p className="text-text font-semibold text-sm">{t.name}</p>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: V }}>
                    {t.cat}
                  </p>
                  <p className="text-text-muted text-xs leading-relaxed flex-1">{t.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 25/09/2026 : section « Résultats » (3 cas anonymisés, KPI sans source) supprimée. */}

      {/* ── Tarifs ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section id="tarifs" className="py-24 border-y border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14">
                <GradTag className="mb-4">Tarifs</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                  Tarifs refonte de site web.
                </h2>
                <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                  Prix fixes, audit SEO inclus, plan de redirections 301 systématique, 3 mois de support.
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  tier: 'Vitrine',
                  // 25/09/2026 : « CHF 3'900 » en dur remplacé par PRIX.refonteFrom.
                  price: chf(PRIX.refonteFrom),
                  volume: "jusqu'à 10 pages",
                  features: [
                    'Audit SEO pré-refonte',
                    'Design Figma sur mesure',
                    'Migration WordPress, Next.js ou Astro',
                    'Plan de redirections 301',
                    'Formation back-office (1 h 30)',
                    '3 mois de support inclus',
                  ],
                  highlight: false,
                },
                {
                  tier: 'Corporate',
                  price: "CHF 7'500",
                  volume: '10 à 30 pages, multilingue',
                  features: [
                    'Tout Vitrine, plus :',
                    'Multilingue FR/DE/EN/IT',
                    'Headless CMS (Sanity ou Contentful)',
                    'Intégrations API (CRM, Agenda, ERP)',
                    'Blog structuré SEO',
                    'Audit accessibilité WCAG 2.1 AA',
                  ],
                  highlight: true,
                  badge: 'Populaire',
                },
                {
                  tier: 'E-commerce / sur mesure',
                  price: 'Sur devis',
                  volume: '> 30 pages ou boutique complète',
                  features: [
                    'Refonte e-commerce (Shopify, Hydrogen)',
                    'Migration catalogue produits',
                    'Intégration Twint, Stripe, PostFinance',
                    'Espaces clients, dashboards sur mesure',
                    'Architecture microservices',
                    'Support étendu négocié',
                  ],
                  highlight: false,
                },
              ].map((t) => (
                <SectionReveal key={t.tier}>
                  <div
                    className="flex flex-col h-full rounded-[20px] border p-8 relative"
                    style={{
                      background: t.highlight ? 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 100%)' : VB,
                      borderColor: t.highlight ? 'rgba(167,139,250,0.35)' : VD,
                      boxShadow: t.highlight ? '0 0 50px rgba(167,139,250,0.10)' : 'none',
                    }}
                  >
                    {t.badge && (
                      <span
                        className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(167,139,250,0.18)', color: V, border: `1px solid ${VD}` }}
                      >
                        {t.badge}
                      </span>
                    )}
                    <div className="mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: V }}>
                        Refonte {t.tier}
                      </p>
                      <p className="text-3xl font-bold text-text mb-1">{t.price}</p>
                      <p className="text-text-muted text-xs">{t.volume}</p>
                    </div>
                    <div className="flex flex-col gap-2.5 flex-1 mb-8">
                      {t.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: V }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                      Discuter de ma refonte
                    </LiquidMetalButton>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Processus 8 étapes ── */}
      <section id="processus" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Processus</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Notre processus de refonte en 8 étapes.
              </h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm">
                De l&apos;audit SEO initial au monitoring post-lancement. Aucune étape négociable.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((s, i) => (
              <SectionReveal key={s.n} delay={i * 0.05}>
                <div
                  className="flex flex-col h-full rounded-[14px] border p-6 relative"
                  style={{ background: VB, borderColor: VD }}
                >
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold opacity-40"
                    style={{ color: V }}
                  >
                    {s.n}
                  </span>
                  <h3 className="text-text font-semibold text-base mb-2 pr-8">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <Testimonials accentRgb="167,139,250" />
      </section>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ_ITEMS} title="Questions fréquentes sur la refonte." />
      </div>

      {/* ── Bridge articles blog ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Approfondir la refonte
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: '/blog/refonte-site-web-quand-pourquoi',
                tag: 'Article support',
                title: '7 signaux qui disent qu\'il faut refondre',
                desc: "Le guide complet pour savoir si c'est le moment ou pas.",
              },
              {
                href: '/blog/core-web-vitals-2026-guide-complet',
                tag: 'Performance',
                title: 'Core Web Vitals 2026 : guide complet',
                desc: 'LCP, INP, CLS : ce que Google attend vraiment en 2026.',
              },
              {
                href: '/blog/cout-site-web-geneve-2026',
                tag: 'Budget',
                title: "Combien coûte un site à Genève",
                desc: 'Fourchettes détaillées par type de projet, 2026.',
              },
            ].map((a, i) => (
              <SectionReveal key={a.href} delay={i * 0.05}>
                <Link
                  href={a.href}
                  className="group flex flex-col gap-2 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200 h-full"
                  style={{ background: 'rgba(167,139,250,0.04)', borderColor: VD }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: V }}>
                    {a.tag}
                  </p>
                  <p className="text-text font-semibold text-sm">{a.title}</p>
                  <p className="text-text-muted text-xs leading-relaxed flex-1">{a.desc}</p>
                  <p className="text-xs font-medium inline-flex items-center gap-1 mt-2" style={{ color: V }}>
                    Lire l&apos;article
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead gen audit ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SiteAuditBlock />
        </div>
      </section>

      <CTAFinal accentRgb="167,139,250" />
    </main>
  )
}
