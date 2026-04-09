import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ChevronRight,
  MessageCircle,
  Clock,
  Users,
  CalendarCheck,
  Building2,
  Stethoscope,
  Home,
  ShoppingBag,
  Scale,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList, buildWebPageWithSpeakable } from '@/lib/schema'
import { chrome, violet } from '@/lib/tokens'

const CTAFinal = dynamic(() =>
  import('@/components/sections/CTAFinal').then((m) => ({ default: m.CTAFinal }))
)
const FAQSection = dynamic(() =>
  import('@/components/sections/FAQSection').then((m) => ({ default: m.FAQSection }))
)
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
)

export const metadata: Metadata = {
  title: 'Chatbot IA sur mesure pour entreprises a Geneve | DKDP',
  description:
    'DKDP concoit et deploie des chatbots IA sur mesure pour PME a Geneve et en Suisse romande. Repondez a vos clients 24h/24, qualifiez vos leads, automatisez la prise de rendez-vous. Des CHF 2\'900, deploye en 2 a 5 semaines.',
  alternates: { canonical: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia' },
  openGraph: {
    title: 'Chatbot IA sur mesure pour entreprises a Geneve | DKDP',
    description:
      'Chatbot IA concu pour votre metier : support client 24/7, qualification de leads, prise de rendez-vous automatique. Agence DKDP, Geneve.',
    url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'DKDP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatbot IA sur mesure pour entreprises a Geneve | DKDP',
    description:
      'Chatbot IA concu pour votre metier : support 24/7, leads qualifies, RDV automatiques. Des CHF 2\'900. Agence DKDP Geneve.',
  },
  keywords: [
    'chatbot IA Geneve',
    'chatbot entreprise Suisse',
    'assistant virtuel PME',
    'chatbot sur mesure',
    'automatisation service client',
    'chatbot IA suisse romande',
    'DKDP',
  ],
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const FAQ = [
  {
    question: 'Combien coute un chatbot IA sur mesure ?',
    answer:
      'Un chatbot essentiel demarre a CHF 2\'900. Les formules plus avancees avec connexion a vos outils metier se situent entre CHF 5\'500 et CHF 12\'000. DKDP fournit un devis fixe avant demarrage, sans surprises.',
  },
  {
    question: 'Combien de temps faut-il pour deployer un chatbot ?',
    answer:
      'Entre 2 et 5 semaines selon la complexite. Un chatbot qui repond aux questions frequentes peut etre operationnel en 2 semaines. Un assistant connecte a votre CRM ou systeme de reservation prend 4 a 5 semaines.',
  },
  {
    question: 'Est-ce que mes donnees restent confidentielles ?',
    answer:
      'Oui. DKDP heberge les chatbots sur des infrastructures europeennes conformes au RGPD. Vos donnees ne sont jamais utilisees pour entrainer des modeles tiers. On vous explique exactement ou vos donnees transitent avant le deploiement.',
  },
  {
    question: 'Est-ce que le chatbot peut se tromper ou inventer des reponses ?',
    answer:
      'Tout systeme IA a des limites. C\'est pourquoi DKDP configure chaque chatbot avec des garde-fous : il repond uniquement a partir de vos contenus valides, et transfere vers un humain quand la question depasse son perimetre. On teste rigoureusement avant la mise en ligne.',
  },
  {
    question: 'Qui maintient le chatbot apres la mise en ligne ?',
    answer:
      'DKDP propose un suivi mensuel inclus dans les formules Pro et Sur mesure. On analyse les conversations, on ajuste les reponses et on ajoute de nouveaux contenus selon vos retours. Vous n\'avez rien de technique a gerer.',
  },
  {
    question: 'Le chatbot peut-il etre connecte a mes outils existants ?',
    answer:
      'Oui. Calendriers de reservation (Cal.com, Calendly), CRM (HubSpot, Pipedrive), systemes de ticketing, bases de donnees internes. On s\'adapte a votre stack existant sans tout reconstruire.',
  },
  {
    question: 'Est-ce que le chatbot remplace mon equipe ?',
    answer:
      'Non, et ce n\'est pas l\'objectif. Le chatbot prend en charge les demandes repetitives et les horaires ou personne n\'est disponible. Votre equipe se concentre sur les echanges a forte valeur ajoutee. C\'est un outil, pas un remplacement.',
  },
]

const PROBLEMS = [
  {
    Icon: MessageCircle,
    problem: 'Les memes questions reviennent chaque jour',
    solution: 'Votre chatbot repond instantanement aux demandes courantes : horaires, tarifs, disponibilites, procedures. Votre equipe ne repete plus les memes reponses.',
    metric: '80%',
    metricLabel: 'des questions courantes traitees automatiquement',
  },
  {
    Icon: Clock,
    problem: 'Vous perdez des clients en dehors des heures de bureau',
    solution: 'Un prospect qui pose une question a 22h obtient une reponse immediate. Il ne va pas voir ailleurs. Le chatbot qualifie le lead et vous le transmet le lendemain matin, pret a etre contacte.',
    metric: '24/7',
    metricLabel: 'disponibilite sans cout supplementaire',
  },
  {
    Icon: Users,
    problem: 'L\'accueil de nouveaux clients prend trop de temps',
    solution: 'Le chatbot guide chaque nouveau client a travers vos etapes : documents a fournir, formulaires a remplir, rendez-vous a prendre. Votre onboarding devient fluide et autonome.',
    metric: '-60%',
    metricLabel: 'de temps passe sur l\'onboarding',
  },
  {
    Icon: CalendarCheck,
    problem: 'La prise de rendez-vous genere des allers-retours',
    solution: 'Le chatbot propose directement vos creneaux disponibles et confirme la reservation. Plus d\'emails de coordination, plus de "Quand etes-vous disponible ?".',
    metric: '3x',
    metricLabel: 'plus de rendez-vous pris hors heures',
  },
]

const STEPS = [
  {
    num: 1,
    title: 'Decouverte de votre metier',
    desc: 'On analyse vos interactions clients actuelles : quelles questions reviennent, quels processus prennent du temps, ou un chatbot aurait le plus d\'impact. Vous n\'avez rien a preparer.',
    duration: '1 a 2 jours',
  },
  {
    num: 2,
    title: 'Conception et redaction',
    desc: 'On definit la personnalite du chatbot, ses limites, ses reponses. On redige les contenus a partir de vos documents et de votre expertise. Vous validez avant toute implementation.',
    duration: '3 a 5 jours',
  },
  {
    num: 3,
    title: 'Developpement et tests',
    desc: 'On construit le chatbot, on le connecte a vos outils si necessaire, et on le teste avec des scenarios reels. Vous avez acces a une version de test pour valider.',
    duration: '1 a 3 semaines',
  },
  {
    num: 4,
    title: 'Deploiement et suivi',
    desc: 'Mise en ligne sur votre site ou vos canaux. On surveille les premieres conversations, on ajuste ce qui doit l\'etre, et on vous forme a la lecture des statistiques.',
    duration: '2 a 3 jours',
  },
]

const INDUSTRIES = [
  {
    Icon: Scale,
    title: 'Fiduciaires et cabinets juridiques',
    scenario: 'Vos clients demandent regulierement les documents necessaires pour une creation de societe, les delais de depot ou le statut de leur dossier. Le chatbot repond instantanement et envoie les formulaires adequats.',
    example: '"Quels documents faut-il pour creer une Sarl ?" → Reponse + lien vers le formulaire de demarrage',
  },
  {
    Icon: Stethoscope,
    title: 'Cabinets medicaux et dentaires',
    scenario: 'Les patients appellent pour prendre rendez-vous, verifier les horaires ou poser des questions pre-consultation. Le chatbot gere la prise de rendez-vous et les informations pratiques, meme le week-end.',
    example: '"Je voudrais un rendez-vous pour un detartrage" → Proposition de creneaux + confirmation automatique',
  },
  {
    Icon: Home,
    title: 'Agences immobilieres',
    scenario: 'Les prospects veulent des informations sur un bien, verifier les disponibilites ou planifier une visite. Le chatbot qualifie le lead (budget, quartier, surface) et propose un creneau au bon agent.',
    example: '"Avez-vous des 3 pieces aux Eaux-Vives ?" → Filtrage + presentation des biens + prise de rendez-vous',
  },
  {
    Icon: ShoppingBag,
    title: 'Commerces et e-commerce',
    scenario: 'Vos clients demandent les horaires, la disponibilite d\'un produit ou le suivi de leur commande. Le chatbot repond en temps reel et redirige vers l\'achat ou la reservation.',
    example: '"Est-ce que la robe en taille M est disponible ?" → Verification stock + lien direct vers le produit',
  },
  {
    Icon: Building2,
    title: 'PME de services (comptabilite, conseil, coaching)',
    scenario: 'Vos prospects hesitent et posent des questions avant de prendre contact. Le chatbot presente vos offres, repond aux objections courantes et propose un appel decouverte.',
    example: '"Quelle est la difference entre vos formules ?" → Comparatif clair + CTA vers un appel gratuit',
  },
]

const OFFERS = [
  {
    name: 'Essentiel',
    price: '2\'900',
    desc: 'Pour les entreprises qui veulent repondre aux questions frequentes sans mobiliser leur equipe.',
    features: [
      'Chatbot sur votre site web',
      'Jusqu\'a 50 questions-reponses configurees',
      'Design integre a votre charte graphique',
      'Transfert vers email si question complexe',
      '1 mois de suivi inclus',
    ],
    recommended: false,
  },
  {
    name: 'Pro',
    price: '5\'500',
    desc: 'Pour les entreprises qui veulent automatiser la prise de rendez-vous et qualifier leurs leads.',
    features: [
      'Tout ce qui est inclus dans Essentiel',
      'Connexion a votre calendrier de reservation',
      'Qualification de leads automatique',
      'Reponses basees sur vos documents internes',
      'Tableau de bord des conversations',
      '3 mois de suivi et ajustements inclus',
    ],
    recommended: true,
  },
  {
    name: 'Sur mesure',
    price: 'Sur devis',
    desc: 'Pour les entreprises avec des besoins specifiques : CRM, base de donnees, multi-canal, multi-langue.',
    features: [
      'Tout ce qui est inclus dans Pro',
      'Connecte a vos outils existants (CRM, ERP, ticketing)',
      'Deploiement multi-canal (site, WhatsApp, Instagram)',
      'Chatbot multilingue (FR, EN, DE)',
      'Logique metier avancee et workflows personnalises',
      'Suivi continu et evolution mensuelle',
    ],
    recommended: false,
  },
]

const color = chrome.color
const bg = chrome.bg
const bd = chrome.border

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function ChatbotIAPage() {
  return (
    <main className="pt-14">
      {/* ── Schema.org ── */}
      <SchemaOrg
        schema={buildService({
          name: 'Chatbot IA sur mesure pour entreprises a Geneve',
          url: '/intelligence-artificielle/chatbot-ia',
          description:
            'Conception, developpement et deploiement de chatbots IA sur mesure pour PME a Geneve et en Suisse romande. Support client 24/7, qualification de leads, prise de rendez-vous automatisee. Des CHF 2900.',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Intelligence Artificielle', url: 'https://dkdp.ch/intelligence-artificielle' },
          { name: 'Chatbot IA', url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia' },
        ])}
      />
      <SchemaOrg
        schema={buildWebPageWithSpeakable({
          name: 'Chatbot IA sur mesure pour entreprises a Geneve',
          url: '/intelligence-artificielle/chatbot-ia',
          description: 'DKDP concoit et deploie des chatbots IA sur mesure pour PME a Geneve. Support client 24/7, qualification de leads, prise de rendez-vous automatique. Des CHF 2900, deploye en 2 a 5 semaines.',
        })}
      />
      {/* Structured pricing for rich snippets */}
      <SchemaOrg
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Chatbot IA sur mesure',
          description: 'Chatbot IA concu et deploye pour votre entreprise. Support client 24/7, qualification de leads, prise de rendez-vous automatique.',
          brand: { '@type': 'Organization', name: 'DKDP' },
          url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
          offers: [
            {
              '@type': 'Offer',
              name: 'Chatbot Essentiel',
              price: '2900',
              priceCurrency: 'CHF',
              description: 'Chatbot FAQ pour site web, 50 questions-reponses, 1 mois de suivi',
              url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia#offres',
            },
            {
              '@type': 'Offer',
              name: 'Chatbot Pro',
              price: '5500',
              priceCurrency: 'CHF',
              description: 'Chatbot avec calendrier, qualification de leads, 3 mois de suivi',
              url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia#offres',
            },
            {
              '@type': 'Offer',
              name: 'Chatbot Sur mesure',
              price: '5500',
              priceCurrency: 'CHF',
              priceSpecification: { '@type': 'PriceSpecification', minPrice: '5500', priceCurrency: 'CHF', description: 'A partir de CHF 5500, sur devis' },
              description: 'Chatbot multi-canal, multilingue, connecte CRM/ERP, suivi continu',
              url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia#offres',
            },
          ],
        }}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(212,212,216,0.12)" blob2="rgba(212,212,216,0.06)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/intelligence-artificielle"
                className="text-text-muted text-sm hover:text-white transition-colors"
              >
                Intelligence Artificielle
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>
                Chatbot IA
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Chatbot IA sur mesure · Geneve</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Vos clients obtiennent des reponses.{' '}
                  <GradText as="span">Meme quand vous dormez.</GradText>
                </h1>
                <p data-speakable className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP concoit des chatbots IA sur mesure pour les PME a Geneve et en Suisse romande.
                  Pas un widget generique : un assistant intelligent concu pour votre metier, vos questions
                  et vos clients. Deploye sur votre site en 2 a 5 semaines, a partir de CHF 2&apos;900.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=chatbot-ia" size="lg">
                    Discuter de mon projet<span aria-hidden="true"> →</span>
                  </LiquidMetalButton>
                  <Link
                    href="#comment-ca-marche"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Comment ca marche ↓
                  </Link>
                </div>
              </div>

              {/* Chat mockup */}
              <div className="relative hidden lg:block">
                <div
                  className="relative w-full rounded-2xl p-6 space-y-4"
                  style={{
                    background: 'rgba(212,212,216,0.04)',
                    border: `1px solid ${bd}`,
                    boxShadow: '0 0 60px rgba(212,212,216,0.08)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4" style={{ borderBottom: `1px solid ${bd}` }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <MessageCircle size={14} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Assistant Votre Entreprise</p>
                      <p className="text-text-muted text-xs">En ligne</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  {/* Messages */}
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-white/[0.07] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[75%]">
                        <p className="text-sm text-white">
                          Bonjour, quels sont vos horaires cette semaine ?
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]"
                        style={{ background: bg, border: `1px solid ${bd}` }}
                      >
                        <p className="text-sm text-text-secondary">
                          Bonjour ! Nous sommes ouverts du lundi au vendredi de 9h a 18h.
                          Souhaitez-vous prendre rendez-vous ? Je peux vous proposer un creneau
                          directement.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-white/[0.07] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[75%]">
                        <p className="text-sm text-white">Oui, jeudi apres-midi si possible</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]"
                        style={{ background: bg, border: `1px solid ${bd}` }}
                      >
                        <p className="text-sm text-text-secondary">
                          Jeudi 14h ou 16h sont disponibles. Lequel vous convient ?
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(212,212,216,0.10)', color, border: `1px solid ${bd}` }}
                          >
                            Jeudi 14h
                          </span>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(212,212,216,0.10)', color, border: `1px solid ${bd}` }}
                          >
                            Jeudi 16h
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div
                    className="flex items-center gap-3 pt-3 mt-2"
                    style={{ borderTop: `1px solid ${bd}` }}
                  >
                    <div className="flex-1 bg-white/[0.04] rounded-full px-4 py-2.5">
                      <p className="text-text-muted text-sm">Ecrivez votre message...</p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: bg, border: `1px solid ${bd}` }}
                    >
                      <ArrowRight size={14} style={{ color }} />
                    </div>
                  </div>
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
              { v: '24/7', l: 'Disponibilite', sub: 'Sans cout supplementaire' },
              { v: '2-5 sem.', l: 'Delai de deploiement', sub: 'Cle en main' },
              { v: '80%', l: 'Questions automatisees', sub: 'Des le premier mois' },
              { v: 'CHF 2\'900', l: 'A partir de', sub: 'Devis fixe, sans surprise' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>
                    {s.v}
                  </p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
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
            <nav
              className="flex gap-1 overflow-x-auto py-3 scrollbar-none"
              aria-label="Navigation sections"
            >
              {[
                { label: 'Benefices', href: '#benefices' },
                { label: 'Processus', href: '#comment-ca-marche' },
                { label: 'Cas d\'usage', href: '#cas-usage' },
                { label: 'Offres', href: '#offres' },
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
              href="/contact?service=chatbot-ia"
              className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80"
              style={{
                background: 'rgba(212,212,216,0.12)',
                color,
                border: `1px solid rgba(212,212,216,0.25)`,
              }}
            >
              Discuter du projet
            </Link>
          </div>
        </div>
      </div>

      {/* ── Problemes / Benefices ── */}
      <section id="benefices" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Le probleme que vous connaissez</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Chaque question sans reponse est un client qui hesite, puis qui part.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROBLEMS.map((item, i) => (
              <SectionReveal key={item.problem} delay={i * 0.08}>
                <div
                  className="rounded-xl p-6 h-full"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <item.Icon size={18} style={{ color }} />
                    </div>
                    <p className="text-2xl font-bold" style={{ color }}>
                      {item.metric}
                    </p>
                    <p className="text-text-muted text-xs flex-1">{item.metricLabel}</p>
                  </div>
                  <p className="text-white font-semibold mb-2">{item.problem}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.solution}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Visual ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Impact mesurable</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                Le retour sur investissement se mesure des le premier mois.
              </h2>
              <p data-speakable className="text-text-secondary text-lg max-w-2xl mx-auto">
                Un chatbot IA bien concu ne remplace pas votre equipe. Il absorbe 80% des
                demandes repetitives pour que vos collaborateurs se concentrent sur les
                interactions a forte valeur ajoutee. Les PME genevoises qui deploient un
                chatbot DKDP constatent en moyenne 60% de reduction du temps d&apos;onboarding
                et une disponibilite client 24h/24 sans cout supplementaire.
              </p>
            </div>
          </SectionReveal>

          {/* Inline HTML bar chart: before/after */}
          <SectionReveal delay={0.1}>
            <div
              className="rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
              style={{ background: violet.bg, border: `1px solid ${violet.border}` }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-6"
                style={{ color: violet.color }}
              >
                Avant / Apres chatbot
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Questions repetitives traitees manuellement', before: 100, after: 20, unit: '%' },
                  { label: 'Temps de reponse moyen', before: 100, after: 12, unit: '', beforeLabel: '4h', afterLabel: '< 30 min' },
                  { label: 'Leads perdus hors horaires', before: 35, after: 5, unit: '%' },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-text-secondary text-sm mb-2">{row.label}</p>
                    <div className="space-y-1.5">
                      {/* Before bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted text-xs w-12 flex-shrink-0">Avant</span>
                        <div className="flex-1 h-4 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${row.before}%`,
                              background: 'rgba(239,68,68,0.4)',
                              minWidth: '8%',
                            }}
                          />
                        </div>
                        <span className="text-text-muted text-xs w-16 text-right flex-shrink-0">
                          {row.beforeLabel ?? `${row.before}${row.unit}`}
                        </span>
                      </div>
                      {/* After bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted text-xs w-12 flex-shrink-0">Apres</span>
                        <div className="flex-1 h-4 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${row.after}%`,
                              background: 'rgba(124,58,237,0.6)',
                              minWidth: '4%',
                            }}
                          />
                        </div>
                        <span className="text-xs w-16 text-right flex-shrink-0" style={{ color: violet.color }}>
                          {row.afterLabel ?? `${row.after}${row.unit}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Comment ca marche ── */}
      <section
        id="comment-ca-marche"
        className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre methode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Vous n&apos;avez rien de technique a faire.
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                De la decouverte de votre metier jusqu&apos;a la mise en ligne, DKDP gere
                l&apos;ensemble du projet depuis nos bureaux de Geneve. Vous validez a chaque
                etape, on execute. Delai moyen : 2 a 5 semaines.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <SectionReveal key={step.num} delay={i * 0.1}>
                <div className="relative h-full">
                  {/* Connector line (hidden on last) */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-6 h-px" style={{ background: bd }} />
                  )}
                  <div
                    className="rounded-xl p-6 h-full"
                    style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                      style={{ background: bg, color, border: `1px solid ${bd}` }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">{step.desc}</p>
                    <p className="text-text-muted text-xs" style={{ color }}>
                      {step.duration}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Inline timeline chart: typical project */}
          <SectionReveal delay={0.4}>
            <div
              className="mt-12 rounded-xl p-6"
              style={{ background: violet.bg, border: `1px solid ${violet.border}` }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-5"
                style={{ color: violet.color }}
              >
                Timeline type d&apos;un projet chatbot
              </p>
              <div className="flex flex-col sm:flex-row gap-0">
                {[
                  { label: 'Decouverte', weeks: 'Sem. 1', opacity: 0.3 },
                  { label: 'Conception', weeks: 'Sem. 1-2', opacity: 0.45 },
                  { label: 'Developpement', weeks: 'Sem. 2-4', opacity: 0.65 },
                  { label: 'Deploiement', weeks: 'Sem. 4-5', opacity: 0.85 },
                ].map((phase, i) => (
                  <div key={phase.label} className="flex-1 relative">
                    <div
                      className="h-2 sm:h-3"
                      style={{
                        background: `rgba(124,58,237,${phase.opacity})`,
                        borderRadius: i === 0 ? '6px 0 0 6px' : i === 3 ? '0 6px 6px 0' : '0',
                      }}
                    />
                    <div className="mt-2 sm:mt-3">
                      <p className="text-white text-xs font-semibold">{phase.label}</p>
                      <p className="text-text-muted text-[10px]">{phase.weeks}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-xs mt-4">
                Duree totale moyenne : 2 a 5 semaines selon la complexite. Vous validez a chaque etape.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Cas d'usage / Industries ── */}
      <section id="cas-usage" className="py-24 scroll-mt-[112px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Cas d&apos;usage concrets</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Un chatbot adapte a votre secteur, pas un template universel.
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                Chaque chatbot DKDP est concu pour un metier specifique : fiduciaires, cabinets
                medicaux, agences immobilieres, commerces et PME de services a Geneve. Voici
                comment il s&apos;integre concretement dans ces secteurs.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {INDUSTRIES.map((ind, i) => (
              <SectionReveal key={ind.title} delay={i * 0.06}>
                <div
                  className="rounded-xl p-6 grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-6 items-start"
                  style={{ background: 'rgba(212,212,216,0.03)', border: `1px solid ${bd}` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <ind.Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{ind.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{ind.scenario}</p>
                  </div>
                  <div
                    className="rounded-lg px-4 py-3"
                    style={{ background: 'rgba(212,212,216,0.05)', border: `1px solid rgba(212,212,216,0.10)` }}
                  >
                    <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                      Exemple de conversation
                    </p>
                    <p className="text-text-secondary text-sm italic leading-relaxed">
                      {ind.example}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres / Pricing ── */}
      <section
        id="offres"
        className="py-24 bg-bg-card border-y border-border scroll-mt-[112px]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Nos formules</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Un chatbot pour chaque niveau de besoin.
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                Devis fixe en CHF, sans surprise. Chaque formule inclut la conception, le
                developpement et le deploiement par notre equipe a Geneve. Paiement en 3 fois possible.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFERS.map((offer, i) => (
              <SectionReveal key={offer.name} delay={i * 0.1}>
                <div
                  className="rounded-xl p-6 h-full flex flex-col relative"
                  style={{
                    background: offer.recommended
                      ? 'rgba(212,212,216,0.07)'
                      : 'rgba(212,212,216,0.03)',
                    border: `1px solid ${offer.recommended ? 'rgba(212,212,216,0.30)' : bd}`,
                  }}
                >
                  {offer.recommended && (
                    <div
                      className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: color, color: '#09090B' }}
                    >
                      Recommande
                    </div>
                  )}
                  <h3 className="text-white text-xl font-bold mb-1">{offer.name}</h3>
                  <p className="mb-4">
                    <span className="text-3xl font-bold" style={{ color }}>
                      {offer.price.startsWith('Sur') ? '' : 'CHF '}
                      {offer.price}
                    </span>
                    {!offer.price.startsWith('Sur') && (
                      <span className="text-text-muted text-sm ml-1">HT</span>
                    )}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{offer.desc}</p>
                  <ul className="space-y-2.5 flex-1">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color }} />
                        <span className="text-text-secondary text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/contact?service=chatbot-ia"
                      className="block w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-150 hover:opacity-90"
                      style={{
                        background: offer.recommended ? color : 'transparent',
                        color: offer.recommended ? '#09090B' : color,
                        border: offer.recommended ? 'none' : `1px solid ${bd}`,
                      }}
                    >
                      {offer.price.startsWith('Sur') ? 'Demander un devis' : 'Choisir cette formule'}
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <p className="text-text-muted text-sm text-center mt-8">
              Tous les prix sont en CHF et hors TVA. Paiement en 3 fois possible. Devis
              personnalise sous 48h.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[112px]">
        <FAQSection items={FAQ} title="Questions sur nos chatbots IA" />
      </div>

      {/* ── CTA Final ── */}
      <CTAFinal />
    </main>
  )
}
