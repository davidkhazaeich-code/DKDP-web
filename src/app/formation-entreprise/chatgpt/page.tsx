import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, Clock, Users, Award, ChevronRight,
  BrainCircuit, Zap, FileText, Code2, Layers,
  MessageSquare, Database, Shield, ShieldCheck,
  Sparkles, BookOpen, SlidersHorizontal, Wand2, Target,
  MousePointerClick, Building2, Headphones,
  Briefcase, TrendingUp, ShoppingCart, UserCog, DollarSign,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))
const CircularTestimonialsLazy = dynamic(() => import('@/components/ui/circular-testimonials').then(m => m.CircularTestimonials))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const ROICalculatorFormation = dynamic(() => import('@/components/sections/ROICalculatorFormation').then(m => ({ default: m.ROICalculatorFormation })))
const ArticleCarousel = dynamic(() => import('@/components/sections/ArticleCarousel').then(m => ({ default: m.ArticleCarousel })))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { getArticlesByTopic, countArticlesByTopic, CHATGPT_TOPIC } from '@/lib/blog/topics'
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet, orange, chrome, green, blue, pink, teal } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
import { ChatGptProductCard } from './_components/ChatGptProductCard'
import { AgendaRow } from './_components/AgendaRow'
import { CapabilityCard } from './_components/CapabilityCard'
import { UseCaseCard } from './_components/UseCaseCard'
import { AstraAvailability } from './_components/AstraAvailability'
import { ToolComparison } from './_components/ToolComparison'
import { AstraHeroCard } from './_components/AstraHeroCard'
import { LeadFormInlineChatGpt } from './_components/LeadFormInlineChatGpt'
import { GalleryFormationChatGpt } from './_components/GalleryFormationChatGpt'

export const metadata: Metadata = {
  title: 'Formation ChatGPT Astra Genève & Suisse romande | DKDP',
  description:
    'Formation ChatGPT Astra (GPT-6) pour entreprises à Genève et en Suisse romande. ChatGPT Work, GPTs, Codex et nLPD sur vos vrais cas. Une journée sur mesure.',
  alternates: {
    canonical: 'https://dkdp.ch/formation-entreprise/chatgpt',
    languages: {
      'fr-CH': 'https://dkdp.ch/formation-entreprise/chatgpt',
      en: 'https://dkdp.ch/en/corporate-training/chatgpt',
      'x-default': 'https://dkdp.ch/formation-entreprise/chatgpt',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/formation-entreprise/chatgpt',
    images: [{ url: '/images/og/formation-chatgpt.png', width: 1376, height: 768, alt: 'Formation ChatGPT Astra Genève DKDP' }],
  },
  twitter: {
    images: ['/images/og/formation-chatgpt.png'],
  },
}

/* ─────────────────────────────────────────────
   Design tokens (source : @/lib/tokens)
───────────────────────────────────────────── */
const V = violet.color, VB = violet.bg, VD = violet.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border
const GR = green.color, GRB = green.bg, GRD = green.border

/** Nombre de cartes affichees dans le carrousel de veille. */
const VEILLE_MAX_CARTES = 12

/* ─────────────────────────────────────────────
   FAQ
   Les `links` ne font pas partie du schema FAQPage : ils sont rendus sous la
   reponse pour le maillage interne (formation IA, formation Claude).
───────────────────────────────────────────── */
const FAQ: { question: string; answer: string; links?: { label: string; href: string }[] }[] = [
  {
    question: 'La formation couvre-t-elle ChatGPT Astra (GPT-6) ?',
    answer:
      'Oui. Le programme a été mis à jour pour ChatGPT Astra (GPT-6), présenté le 3 septembre 2026 et ouvert aux abonnés payants dès le 4 septembre. On y apprend ce qu\'Astra change concrètement : un modèle qui agit, dans un navigateur, dans des formulaires, jusqu\'au document fini, au lieu de seulement répondre, ChatGPT Work pour les missions longues et Codex pour le code. Le déploiement étant encore échelonné au 10 septembre, on vérifie en début de session ce que chaque compte voit réellement.',
  },
  {
    question: 'Faut-il un abonnement Plus ou Pro pour suivre la formation ?',
    answer:
      'Un compte ChatGPT suffit pour la méthode, mais Astra n\'est pas au même endroit selon l\'abonnement : absent de Free et Go (GPT-5.6 Luna), réservé à ChatGPT Work et Codex sur Plus (le chat reste sur GPT-5.6 Sol), disponible dans le chat sur Pro sous le nom GPT-6 Pro avec un plafond hebdomadaire de messages, et partout sur Business et Enterprise. C\'est la première chose qu\'on règle en formation, pour ne pas payer Pro à quelqu\'un à qui Sol suffit.',
  },
  {
    question: 'Quelle différence avec la formation IA générale et la formation Claude ?',
    answer:
      'La formation IA générale compare ChatGPT Astra, Claude et Copilot et choisit l\'outil selon votre stack. La formation Claude est la spécialisation sur Claude, notre recommandation pour l\'analyse, la profondeur et la confidentialité. Cette formation est la spécialisation ChatGPT : Astra, ChatGPT Work, les GPTs et Codex, sur vos vrais cas. Si vous hésitez, on tranche ensemble lors du briefing préalable.',
    links: [
      { label: 'Formation IA générale', href: '/formation-entreprise/ia' },
      { label: 'Formation Claude IA', href: '/formation-entreprise/claude-ai' },
    ],
  },
  {
    question: 'Que change Astra par rapport à GPT-5.6 Sol ?',
    answer:
      'Astra remplace GPT-5.6 Sol comme modèle phare d\'OpenAI. Il pilote un ordinateur et un navigateur, enchaîne des étapes seul et produit des documents finis, avec un contexte de 1 million de tokens. OpenAI le donne près de 2x plus rapide que Sol en pilotage d\'ordinateur et mesure un taux d\'hallucination de 4,2 % contre 12,2 % pour Sol. Ces scores viennent d\'OpenAI et n\'ont pas été répliqués de façon indépendante : en formation, on les vérifie sur vos propres tâches.',
  },
  {
    question: 'Nos données sont-elles protégées avec ChatGPT ?',
    answer:
      'Avec ChatGPT Business et Enterprise, vos conversations ne servent pas à entraîner les modèles et l\'administrateur contrôle les réglages de l\'espace. Le module données et nLPD de la journée fixe ce qui n\'entre jamais dans ChatGPT (données de clients, de patients ou de collaborateurs, secrets d\'affaires), les réglages à vérifier sur chaque compte et la marche à suivre pour une PME soumise à la nLPD.',
  },
  {
    question: 'Nous utilisons Copilot dans Microsoft 365, est-ce la même chose ?',
    answer:
      'Pas tout à fait. Copilot est propulsé par GPT-6 Astra depuis le 4 septembre 2026 et l\'ancre dans vos fichiers, réunions et conversations Microsoft 365 avec Work IQ, dans le respect des permissions existantes. Si Microsoft 365 est votre stack, c\'est souvent le bon choix, et notre formation IA générale le couvre. ChatGPT reste l\'outil quand vous voulez ChatGPT Work, les GPTs et Codex, ou une IA indépendante de votre suite bureautique.',
    links: [{ label: 'Formation IA générale, avec Copilot', href: '/formation-entreprise/ia' }],
  },
  {
    question: 'Combien de temps dure la formation et où se déroule-t-elle ?',
    answer:
      'Une journée, en présentiel dans vos locaux à Genève ou en Suisse romande, ou à distance sur Zoom ou Teams. Le format idéal est de 6 à 12 personnes par groupe. Pour une équipe plus large, on organise deux sessions successives ou on forme des référents internes qui diffusent ensuite.',
  },
  {
    question: 'Les participants reçoivent-ils une attestation ?',
    answer:
      'Oui. Chaque participant reçoit une attestation individuelle nominative qui précise les modules suivis et les compétences travaillées, utile pour le dossier RH ou la cartographie des compétences.',
  },
]

/* ─────────────────────────────────────────────
   Formateurs : memes personnes et meme composant que la page Claude, textes
   adaptes pour ne pas annoncer des sessions Claude sur une page ChatGPT.
───────────────────────────────────────────── */
const FORMATEURS = [
  {
    name: 'Romane',
    designation: 'Experte IA, SEO/GEO et UX · Formatrice',
    quote:
      "Spécialiste en intelligence artificielle, SEO/GEO et UX, j'anime les sessions ChatGPT, Claude et Copilot en alliant vision stratégique et pédagogie. Mon objectif : que chaque collaborateur reparte avec des outils qu'il maîtrise vraiment.",
    src: '/images/team/romane.png',
    cardBg: 'linear-gradient(160deg, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.05) 100%)',
    cardBorder: 'rgba(255,107,0,0.28)',
    imageScale: 1,
  },
  {
    name: 'David Khazaei',
    designation: 'Formateur automatisation et agents · Fondateur DKDP',
    quote:
      "Développeur et consultant digital, j'utilise les agents IA au quotidien pour mes projets client. J'anime la partie technique : Codex, missions confiées à ChatGPT Work et automatisation d'un poste de travail.",
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
export default function FormationChatGptPage() {
  /* Veille ChatGPT et OpenAI, recalculee a chaque rendu depuis le blog.
     Tout article touchant un mot de CHATGPT_TOPIC (slug, titre ou tags) remonte
     ici de lui-meme, le plus recent en tete. Rien a editer sur cette page quand
     un article sort. Le compteur affiche le total reel, pas le cap d'affichage. */
  const chatgptArticles = getArticlesByTopic(CHATGPT_TOPIC, VEILLE_MAX_CARTES)
  const chatgptArticlesTotal = countArticlesByTopic(CHATGPT_TOPIC)
  const dernierePublication = chatgptArticles[0]?.date ?? null

  return (
    <main>
      <SchemaOrg schema={buildCourse({
        name: 'Formation ChatGPT Astra Entreprise Suisse romande',
        url: '/formation-entreprise/chatgpt',
        description: 'Formation spécialisée ChatGPT pour équipes d\'entreprise à Genève et en Suisse romande. ChatGPT Astra (GPT-6), ChatGPT Work, GPTs, Codex, données et nLPD. Programme sur mesure d\'une journée.',
        duration: 'P1D',
        teaches: ['ChatGPT Astra (GPT-6)', 'ChatGPT Work', 'GPTs personnalisés', 'Codex', 'Prompt engineering', 'Protection des données et nLPD'],
        prerequisites: 'Aucun prérequis technique',
        priceFrom: 200,
        ratingValue: '4.9',
        ratingCount: 500,
        image: 'https://dkdp.ch/images/og/formation-chatgpt.png',
      })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Formation ChatGPT', url: 'https://dkdp.ch/formation-entreprise/chatgpt' },
      ])} />

      {/* ══ 1. Hero ══ */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(74,222,128,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-text transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <div className="flex items-center gap-1.5">
                <Image src="/images/partners/chatgpt-logo.png" alt="ChatGPT" width={16} height={16} className="rounded-[4px] opacity-90" />
                <span className="text-sm" style={{ color: OR }}>Formation ChatGPT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h1 className="grad-tag inline-block text-xs md:text-sm">Formation ChatGPT Genève & Suisse romande</h1>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: OR, background: ORB, border: `1px solid ${ORD}` }}
                  >
                    Nouveau · septembre 2026
                  </span>
                </div>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  ChatGPT Astra en entreprise : vos équipes passent de la conversation à <GradText as="span">l&apos;action</GradText>.
                </p>

                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  ChatGPT Astra (GPT-6), sorti le 3 septembre 2026, ne se contente plus de répondre : il pilote un navigateur,
                  remplit des formulaires et livre des documents finis. Avec ChatGPT Work pour les missions longues et Codex
                  pour le code, DKDP forme vos équipes à Genève et en Suisse romande sur vos vrais dossiers, pas sur des démonstrations.
                </p>

                <p className="text-text-muted text-base leading-relaxed mb-8">
                  Où Astra est vraiment disponible selon votre abonnement, ce qu&apos;on lui confie et ce qu&apos;on ne lui confie jamais :
                  c&apos;est la première chose qu&apos;on règle en formation.
                </p>

                {/* Trust signals */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { label: '100% pratique', icon: Zap },
                    { label: 'Sur vos documents réels', icon: FileText },
                    { label: 'Toutes industries', icon: Users },
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
                  <LiquidMetalButton href="/contact?service=formation" size="lg">
                    Demander un devis gratuit →
                  </LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-text transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme mis à jour : septembre 2026</p>
              </div>

              {/* Right - visual */}
              <div className="relative flex flex-col gap-4">
                <div className="mb-2 lg:mb-4" aria-label="L'ecosysteme IA autour de ChatGPT">
                  <AppLogoMarquee
                    logos={IA_LOGOS}
                    durationSeconds={135}
                    size="md"
                  />
                </div>
                <AstraHeroCard />
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
              { v: '500+', l: 'Personnes formées', sub: 'En Suisse romande' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note moyenne DKDP' },
              { v: '100%', l: 'Sur mesure', sub: 'Vos cas d\'usage réels' },
              { v: '30 j', l: 'Suivi par email', sub: 'Après la formation' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: OR }}>{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner />

      {/* ══ 3. Formulaire inline devis ══ */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <LeadFormInlineChatGpt />
        </div>
      </section>

      {/* ══ 4. Subnav sticky ══ */}
      <ScrollSpyNav
        items={[
          { label: 'Astra', href: '#astra' },
          { label: 'Abonnements', href: '#abonnements' },
          { label: 'Galerie', href: '#galerie' },
          { label: 'Produits', href: '#produits' },
          { label: 'Programme', href: '#programme' },
          { label: 'Compétences', href: '#competences' },
          { label: 'Métiers', href: '#metiers' },
          { label: 'Format', href: '#format' },
          { label: 'ROI', href: '#roi' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'Articles', href: '#articles' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Prendre contact', href: '/contact' }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ══ 5. Ce qui change avec Astra ══ */}
      <section id="astra" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Contexte septembre 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Ce qui change avec ChatGPT Astra (GPT-6)
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Présenté le 3 septembre 2026, Astra remplace GPT-5.6 Sol comme modèle phare d&apos;OpenAI.
                Six changements qui comptent pour une équipe, puis ce qu&apos;ils valent face à Claude et Copilot.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: MousePointerClick,
                title: 'Astra agit, il ne répond plus seulement',
                desc: 'Il pilote un ordinateur et un navigateur, clique, remplit des champs, lit ce qui apparaît à l\'écran, enchaîne des étapes seul et produit des documents finis. OpenAI le donne près de 2x plus rapide que GPT-5.6 Sol en pilotage d\'ordinateur.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: FileText,
                title: 'Un contexte d\'un million de tokens',
                desc: '1\'050\'000 tokens en entrée et 128\'000 en sortie : des rapports, des contrats ou des dossiers entiers dans une seule conversation. Texte et image en entrée, connaissances arrêtées au 30 avril 2026, pas d\'audio ni de vidéo en natif.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Target,
                title: 'Trois fois moins d\'hallucinations',
                desc: 'OpenAI mesure un taux d\'hallucination de 4,2 % contre 12,2 % pour Sol. Le chiffre vient d\'OpenAI et n\'a pas été répliqué de façon indépendante : en formation, on le confronte à vos propres documents.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Layers,
                title: 'ChatGPT Work pour les missions longues',
                desc: 'Sorti le 9 juillet 2026. On lui donne un résultat attendu, il rassemble le contexte dans les applications et fichiers connectés, découpe le travail et avance seul pendant des heures, y compris quand on n\'est plus devant l\'écran.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: Code2,
                title: 'Codex pour le code, avec de la mémoire',
                desc: 'Dans Codex, Astra garde des notes d\'une fenêtre de contexte à l\'autre au lieu de tout résumer, et l\'historique reste consultable. Appels d\'outils asynchrones, consigne modifiable en cours d\'exécution, effort de raisonnement ajustable.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: Shield,
                title: 'Des garde-fous, et des refus',
                desc: 'Premier modèle classé « Critical » en cybersécurité dans le Preparedness Framework d\'OpenAI : la version publique est bridée et refuse certaines demandes. Ce qu\'on lui confie, et surtout les données qu\'on protège, se décide avant la première demande.',
                color: OR, bg: ORB, border: ORD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} color={c.color} bg={c.bg} border={c.border} />
            ))}
          </div>

          {/* Comparatif rapide, meme format que la page Claude */}
          <SectionReveal>
            <ToolComparison />
          </SectionReveal>

          <SectionReveal>
            <p className="text-text-muted text-sm mt-8 max-w-3xl">
              Vous hésitez entre les outils ? Notre{' '}
              <Link href="/formation-entreprise/ia" className="underline hover:text-text transition-colors">formation IA générale</Link>{' '}
              les compare sur votre stack, et notre{' '}
              <Link href="/formation-entreprise/claude-ai" className="underline hover:text-text transition-colors">formation Claude IA</Link>{' '}
              approfondit l&apos;outil que nous recommandons pour l&apos;analyse. Pour lire notre raisonnement complet :{' '}
              <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">ChatGPT, Claude, Copilot : lequel choisir pour votre PME</Link>.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 6. Où Astra est disponible ══ */}
      <section id="abonnements" className="py-24 border-b border-border scroll-mt-[124px] bg-bg-card">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Abonnements
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Où Astra est disponible, forfait par forfait
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                C&apos;est le point que tout le monde rate, et la première chose qu&apos;on règle en formation :
                selon l&apos;abonnement, Astra est dans le chat, seulement dans Work et Codex, ou absent.
                Savoir quand GPT-5.6 Sol suffit évite de payer Pro pour rien.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <AstraAvailability />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 7. Galerie ══ */}
      <section id="galerie" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                En images
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                La formation ChatGPT en pratique
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Des sessions réelles animées chez nos clients en Suisse romande, sur leurs propres cas d&apos;usage.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <GalleryFormationChatGpt />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 8. Produits ChatGPT ══ */}
      <section id="produits" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <Image src="/images/partners/chatgpt-logo.png" alt="ChatGPT" width={20} height={20} className="rounded-[5px]" />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: OR }}>
                  L&apos;écosystème ChatGPT
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Six surfaces, un seul programme de formation
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Chat, Work et Codex sont les trois surfaces de ChatGPT. On y ajoute les GPTs, les offres Business et Enterprise,
                et Copilot pour les équipes qui vivent dans Microsoft 365.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionReveal>
              <ChatGptProductCard
                title="ChatGPT (Chat)"
                subtitle="La conversation classique, sur ordinateur et mobile. Analyse de documents, rédaction, recherche, images. La porte d'entrée pour l'ensemble de votre équipe."
                color={GR}
                bg={GRB}
                border={GRD}
                icon={MessageSquare}
                badge="Pour tous"
                features={[
                  'Sélecteur de modèles : Astra, Sol ou Luna selon le forfait',
                  'Effort de raisonnement ajustable en pleine conversation',
                  'Images avec GPT Image',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="ChatGPT Work"
                subtitle="L'agent pour les missions longues. On lui donne un résultat attendu, il rassemble le contexte, découpe le travail et avance seul pendant des heures."
                color={V}
                bg={VB}
                border={VD}
                icon={Layers}
                badge="Missions longues"
                features={[
                  'Sorti le 9 juillet 2026',
                  'Livre des tableurs, présentations, documents et applications web',
                  'Inclus dans Plus, Pro, Business et Enterprise, avec Astra',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="Codex"
                subtitle="La surface de développement logiciel de ChatGPT, avec GPT-6 Astra. Pour les profils qui écrivent du code ou automatisent leur poste de travail."
                color={GR}
                bg={GRB}
                border={GRD}
                icon={Code2}
                badge="Profils techniques"
                features={[
                  'Notes conservées d\'une fenêtre de contexte à l\'autre',
                  'Historique consultable au lieu d\'un résumé',
                  'Astra dès le forfait Plus',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="GPTs personnalisés"
                subtitle="Un assistant configuré une fois pour une tâche qui revient : relecture de devis, réponse à un type de demande, mise en forme d'un rapport."
                color={CH}
                bg={CHB}
                border={CHD}
                icon={Database}
                badge="Tâches récurrentes"
                features={[
                  'Instructions et fichiers de référence pour une tâche précise',
                  'Partage à l\'équipe dans le même espace',
                  'Construits en formation sur vos propres cas',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="ChatGPT Business et Enterprise"
                subtitle="Les offres d'équipe. Astra dans le chat, Work et Codex, un espace administré, et vos données qui ne servent pas à entraîner les modèles."
                color={OR}
                bg={ORB}
                border={ORD}
                icon={Building2}
                badge="Pour les équipes"
                features={[
                  'Business Standard 20 à 25 USD par siège, Premium 100 à 125, Enterprise sur devis',
                  'Pas d\'entraînement sur vos conversations',
                  'Astra désactivé par défaut côté Enterprise, l\'administrateur l\'active',
                ]}
              />
            </SectionReveal>
            <SectionReveal>
              <ChatGptProductCard
                title="Microsoft Copilot"
                subtitle="GPT-6 Astra dans Microsoft 365 depuis le 4 septembre 2026. Le même modèle, ancré dans vos fichiers, réunions et conversations par Work IQ, dans le respect des permissions existantes."
                color="#3b82f6"
                bg="rgba(59,130,246,0.08)"
                border="rgba(59,130,246,0.22)"
                icon={Sparkles}
                badge="Si Microsoft 365"
                features={[
                  'Copilot Cowork et Copilot Studio',
                  'Disponible aussi dans GitHub Copilot, Microsoft Foundry et Azure',
                  'Couvert en détail dans notre formation IA générale',
                ]}
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ 9. Programme ══ */}
      <section id="programme" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Programme détaillé
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Programme de formation ChatGPT : une journée pour passer à l&apos;action
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                7 heures de formation pratique, construites sur vos propres documents et cas d&apos;usage.
                Pas de slides génériques. Pas d&apos;exemples inventés.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <div className="relative w-full aspect-[21/9] rounded-[16px] overflow-hidden mb-14">
              <Image
                src="/images/gallery/formation-ia-entreprise-geneve-salle-reunion-bande.webp"
                alt="Formation ChatGPT Genève : session DKDP en salle de réunion avec une équipe de collaborateurs sur leurs propres cas d'usage"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Journée */}
            <SectionReveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: ORB, color: OR, border: `1px solid ${ORD}` }}
                  >
                    Journée · ChatGPT Astra, Work et GPTs
                  </div>
                  <span className="text-text-muted text-xs">Tous profils</span>
                </div>
                <div className="space-y-2">
                  <AgendaRow time="09:00" title="Fondamentaux et modèles : Astra, Sol, Luna, lequel répond quand" dur="45 min" type="theory" />
                  <AgendaRow time="09:45" title="L'art de la demande : rôle, contexte, format, itération, sur vos vrais documents" dur="1h15" type="practice" />
                  <AgendaRow time="11:00" title="ChatGPT Work sur une mission réelle de l'équipe" dur="1h15" type="workshop" />
                  <AgendaRow time="12:15" title="Pause déjeuner" dur="1h" type="break" />
                  <AgendaRow time="13:15" title="GPTs et Projects pour les tâches qui reviennent" dur="1h30" type="workshop" />
                  <AgendaRow time="14:45" title="Données et nLPD : ce qui n'entre jamais dans ChatGPT, réglages, Business et Enterprise" dur="45 min" type="theory" />
                  <AgendaRow time="15:30" title="Plan d'action et bibliothèque de demandes de l'équipe" dur="1h" type="workshop" />
                  <AgendaRow time="16:30" title="Questions, réponses et suite" dur="30 min" type="qa" />
                </div>
              </div>
            </SectionReveal>

            {/* Colonne droite : photo + notes */}
            <SectionReveal>
              <div>
                <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-5">
                  <Image
                    src="/images/gallery/formation-ia-entreprise-geneve-atelier-anime.webp"
                    alt="Formation ChatGPT Genève : formatrice DKDP animant un atelier pratique devant un petit groupe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div
                  className="p-4 rounded-[12px] text-sm mb-4"
                  style={{ background: ORB, border: `1px solid ${ORD}` }}
                >
                  <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: OR }}>Prérequis</p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Un compte ChatGPT par participant, sur l&apos;abonnement que vous avez déjà. Le forfait est vérifié
                    au briefing préalable : c&apos;est là qu&apos;on voit si Astra est dans votre chat, seulement dans Work et Codex, ou absent.
                    Aucun prérequis technique.
                  </p>
                </div>

                <div
                  className="p-4 rounded-[12px] text-sm"
                  style={{ background: GRB, border: `1px solid ${GRD}` }}
                >
                  <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: GR }}>Profils techniques</p>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Codex est présenté dans le bloc fondamentaux et approfondi sur demande pour les développeurs de l&apos;équipe,
                    dans le même format d&apos;une journée. Pas de langage imposé.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Compétences acquises */}
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
                  'Demande structurée : rôle, contexte, format, itération',
                  'Choisir Astra, Sol ou Luna selon la tâche',
                  'Analyse de documents longs, jusqu\'à 1 million de tokens',
                  'ChatGPT Work : confier et relire une mission longue',
                  'GPTs et Projects pour les tâches qui reviennent',
                  'Bibliothèque de demandes partagée par l\'équipe',
                  'Rédaction professionnelle et synthèse de réunions',
                  'Extraction de données depuis PDF et tableurs',
                  'Images avec GPT Image pour la communication',
                  'Réglages de confidentialité et nLPD',
                  'Ce qu\'on ne confie jamais à ChatGPT',
                  'Codex : les bases pour les profils techniques',
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

      {/* ══ 10. Compétences ══ */}
      <section id="competences" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Fonctionnalités couvertes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Les fonctionnalités ChatGPT que vous apprendrez
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
                title: 'L\'art de la demande',
                desc: 'Rôle, contexte, format, itération : la méthode DKDP pour obtenir du premier coup un résultat utilisable, et la corriger en deux échanges quand il ne l\'est pas.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: SlidersHorizontal,
                title: 'Sélecteur de modèles',
                desc: 'Astra, Sol ou Luna : lequel répond selon votre forfait, lequel choisir selon la tâche, et comment ajuster l\'effort de raisonnement en pleine conversation.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Layers,
                title: 'ChatGPT Work',
                desc: 'Formuler un résultat attendu, connecter les bons fichiers, laisser Work avancer seul, puis relire et corriger le livrable : tableur, présentation, document ou application web.',
                color: V, bg: VB, border: VD,
              },
              {
                icon: FileText,
                title: 'Analyse de documents',
                desc: 'Contrats, rapports, tableurs, PDF scannés : jusqu\'à 1 million de tokens dans une seule conversation, sans découper les documents.',
                color: CH, bg: CHB, border: CHD,
              },
              {
                icon: Database,
                title: 'GPTs et Projects',
                desc: 'Un assistant configuré une fois, avec ses instructions et ses fichiers de référence, pour chaque tâche qui revient. Partagé à l\'équipe.',
                color: OR, bg: ORB, border: ORD,
              },
              {
                icon: Wand2,
                title: 'Images avec GPT Image',
                desc: 'Visuels, variations et mises en situation pour la communication et les présentations, avec les limites à connaître avant de publier.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: Code2,
                title: 'Codex',
                desc: 'Pour les profils techniques : confier une tâche de code à Astra, garder des notes d\'une fenêtre de contexte à l\'autre, relire ce qu\'il a produit.',
                color: GR, bg: GRB, border: GRD,
              },
              {
                icon: ShieldCheck,
                title: 'Données et nLPD',
                desc: 'Les réglages à vérifier sur chaque compte, ce que changent Business et Enterprise, et la liste de ce qui n\'entre jamais dans ChatGPT.',
                color: OR, bg: ORB, border: ORD,
              },
            ].map((c) => (
              <CapabilityCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. Cas d'usage par métier ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.06)"
        blob2="rgba(212,212,216,0.04)"
        accentRgb="255,140,0"
        className="border-b border-border"
      >
      <section id="metiers" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Par département
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Cas d&apos;usage ChatGPT par département
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                La formation est personnalisée selon les fonctions de votre équipe.
                Voici les tâches les plus demandées par département.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <UseCaseCard
                dept="Direction"
                icon={Briefcase}
                color={OR}
                bg={ORB}
                border={ORD}
                cases={[
                  'Synthèse de rapports et de dossiers',
                  'Préparation de séances de direction',
                  'Relecture de plans et de budgets',
                  'Veille sectorielle structurée',
                  'Notes de décision',
                ]}
              />
              <UseCaseCard
                dept="Marketing"
                icon={TrendingUp}
                color={V}
                bg={VB}
                border={VD}
                cases={[
                  'Campagnes multi-formats',
                  'Visuels avec GPT Image',
                  'Briefs créatifs',
                  'Pages et articles SEO',
                  'Analyse de concurrents',
                ]}
              />
              <UseCaseCard
                dept="RH"
                icon={UserCog}
                color={pink.color}
                bg={pink.bg}
                border={pink.border}
                cases={[
                  'Fiches de poste',
                  'Tri et résumé de candidatures',
                  'FAQ interne avec un GPT',
                  'Documents d\'onboarding',
                  'Procédures et règlements',
                ]}
              />
              <UseCaseCard
                dept="Finance et administration"
                icon={DollarSign}
                color={teal.color}
                bg={teal.bg}
                border={teal.border}
                cases={[
                  'Extraction de données de factures et de PDF',
                  'Contrôles préparés avec ChatGPT Work',
                  'Commentaires de résultats',
                  'Courriers et relances',
                  'Tableaux de bord commentés',
                ]}
              />
              <UseCaseCard
                dept="Vente"
                icon={ShoppingCart}
                color={blue.color}
                bg={blue.bg}
                border={blue.border}
                cases={[
                  'Propositions commerciales',
                  'Recherche sur les prospects',
                  'Réponses aux objections',
                  'Comptes rendus de rendez-vous',
                  'Emails de relance',
                ]}
              />
              <UseCaseCard
                dept="Service client"
                icon={Headphones}
                color={CH}
                bg={CHB}
                border={CHD}
                cases={[
                  'Réponses types depuis votre base',
                  'Tri et priorisation des demandes',
                  'Résumé d\'historiques clients',
                  'Traduction des échanges',
                  'Modèles de réponse par canal',
                ]}
              />
            </div>
          </SectionReveal>
        </div>
      </section>
      </HeroBg>

      {/* ══ 12. Formats ══ */}
      <section id="format" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Modalités
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
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
                    <p className="text-text font-semibold text-sm mb-1">{title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 13. ROI ══ */}
      <section id="roi" className="scroll-mt-[124px]">
        <ROICalculatorFormation />
      </section>

      {/* ══ 14. Tarifs ══ */}
      <section id="tarifs" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                Tarifs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                Tarifs de la formation ChatGPT
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
              <Link href="/contact" className="underline hover:text-text transition-colors" style={{ color: OR }}>
                Parlons-en
              </Link>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 15. Pourquoi DKDP ══ */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                  Pourquoi DKDP
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-6">
                  Nous formons sur ce que nous<br />
                  <GradText as="span">pratiquons nous-mêmes.</GradText>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  Nous utilisons les assistants IA au quotidien, y compris pour développer ce site.
                  Notre programme ChatGPT repose sur la même méthode que nos formations IA et Claude :
                  structurer une demande, un contexte, une base de connaissances et des garde-fous.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Cette méthode se transfère à tout outil que vous choisirez ensuite, ChatGPT, Claude ou Copilot.
                  C&apos;est aussi pour cela que nous traitons les trois à égalité et que nous disons franchement où chacun est le plus fort,
                  comme dans notre <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">comparatif ChatGPT, Claude, Copilot pour les PME</Link>.
                  Toutes nos formations sont sur la page <Link href="/formation-entreprise" className="underline hover:text-text transition-colors">Formation entreprise</Link>.
                </p>
                <div className="space-y-3">
                  {[
                    'Romane et David : deux praticiens de l\'IA au quotidien',
                    'Exemples tirés de projets DKDP réels',
                    'Suivi post-formation par email pendant 30 jours',
                    'Programme mis à jour à chaque nouvelle version de ChatGPT',
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
              <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-4">
                <Image
                  src="/images/gallery/formation-ia-entreprise-geneve-panorama-outils.webp"
                  alt="Formation ChatGPT Genève : formatrice DKDP présentant le panorama des outils IA, ChatGPT, Claude et Copilot, à une équipe en entreprise"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '700+', l: 'Clients accompagnés', c: V },
                  { v: '10+', l: 'Ans d\'expérience', c: CH },
                  { v: '4.9/5', l: 'Note Google', c: OR },
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

      {/* ══ 16. Veille et articles ══ */}
      {chatgptArticles.length > 0 && (
        <section id="articles" className="py-24 border-b border-border scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: OR }}>
                  Veille ChatGPT et OpenAI
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                  Nous suivons l&apos;actualité d&apos;OpenAI, et nous l&apos;écrivons
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Nouveaux modèles, surfaces qui arrivent, limites rencontrées sur le terrain :
                  nous publions ce que nous en tirons dans notre pratique quotidienne. Ces articles sont écrits
                  par l&apos;équipe qui anime les formations, et le programme est mis à jour dans la foulée.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                    style={{ background: ORB, border: `1px solid ${ORD}` }}
                  >
                    <BookOpen size={12} style={{ color: OR }} />
                    {chatgptArticlesTotal} articles consacrés à ChatGPT et OpenAI
                  </div>
                  {dernierePublication && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-text-secondary"
                      style={{ background: ORB, border: `1px solid ${ORD}` }}
                    >
                      <Clock size={12} style={{ color: OR }} />
                      Dernière publication : {dernierePublication}
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <ArticleCarousel
                articles={chatgptArticles}
                accentColor={OR}
                accentBorder={ORD}
                label="Articles DKDP sur ChatGPT et OpenAI"
              />
            </SectionReveal>

            <SectionReveal>
              <p className="text-text-muted text-sm mt-8">
                Toute notre veille IA, SEO et formation est publiée sur{' '}
                <Link href="/blog" className="underline hover:text-text transition-colors" style={{ color: OR }}>
                  le blog DKDP
                </Link>
                .
              </p>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* ══ 17. Formateurs ══ */}
      <HeroBg
        blob1="rgba(255,107,0,0.08)"
        blob2="rgba(124,58,237,0.05)"
        accentRgb="255,140,0"
        className="border-b border-border"
      >
        <section className="py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-16">
                <GradTag className="mb-6">Vos formateurs</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-text">
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

      {/* ══ 18. Testimonials ══ */}
      <Testimonials accentRgb="255,140,0" />

      {/* ══ 19. FAQ ══ */}
      <section id="faq" className="py-24 border-b border-border scroll-mt-[124px]">
        <div className="max-w-[900px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text mb-3">Questions fréquentes sur la formation ChatGPT</h2>
              <p className="text-text-muted">Tout ce que vous devez savoir avant de réserver.</p>
            </div>
          </SectionReveal>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <SectionReveal key={item.question}>
                <details className="group rounded-[14px] border border-border bg-bg-card overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-text text-sm font-semibold leading-snug">{item.question}</span>
                    <ChevronRight size={16} className="flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
                    {item.links && (
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        {item.links.map((l) => (
                          <Link key={l.href} href={l.href} className="underline hover:text-text transition-colors" style={{ color: OR }}>
                            {l.label} →
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center mt-10">
              <p className="text-text-muted text-sm mb-4">Vous avez une question spécifique ?</p>
              <LiquidMetalButton href="/contact?service=formation" size="md">
                Poser votre question →
              </LiquidMetalButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 20. CTA Final ══ */}
      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
