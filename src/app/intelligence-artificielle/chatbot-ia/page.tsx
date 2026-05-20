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
  ShieldCheck,
  Activity,
  Sparkles,
  Bell,
  Database,
  Mail,
  Phone,
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
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList, buildWebPageWithSpeakable } from '@/lib/schema'
import { chrome, violet } from '@/lib/tokens'
import { AppLogoMarquee, IA_LOGOS } from '@/components/ui/AppLogos'
const CTAFinal = dynamic(() =>
  import('@/components/sections/CTAFinal').then((m) => ({ default: m.CTAFinal }))
)
const LogoBanner = dynamic(() =>
  import('@/components/sections/LogoBanner').then((m) => ({ default: m.LogoBanner }))
)
const FAQSection = dynamic(() =>
  import('@/components/sections/FAQSection').then((m) => ({ default: m.FAQSection }))
)
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
)

export const metadata: Metadata = {
  title: 'Chatbot IA Genève & Suisse romande | Claude, GPT-5 | DKDP',
  description:
    'Création de chatbots IA pour PME Genève : support 24/7, qualification leads, prise RDV. Basés Claude (Anthropic), GPT-5. Intégration WhatsApp, site web, Messenger. Déploiement 2 semaines.',
  alternates: {
    canonical: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
    },
  },
  openGraph: {
    title: 'Chatbot IA Genève & Suisse romande | Claude, GPT-5 | DKDP',
    description:
      "Chatbot IA conçu pour votre métier : support client 24/7, qualification de leads, prise de rendez-vous automatique. Moteurs Claude Opus 4.7, GPT-5, Gemini 3. Agence DKDP, Genève.",
    url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
    type: 'website',
    locale: 'fr_CH',
    siteName: 'DKDP',
    images: [{ url: '/images/og/chatbot-ia.png', width: 1376, height: 768, alt: 'Chatbot IA sur mesure Genève propulsé par Claude et GPT-5, agence DKDP' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatbot IA Genève & Suisse romande | Claude, GPT-5 | DKDP',
    description:
      "Chatbot IA conçu pour votre métier : support 24/7, leads qualifiés, RDV automatiques. Dès CHF 2'900. Agence DKDP Genève.",
  },
  keywords: [
    'chatbot IA Genève',
    'chatbot entreprise Suisse',
    'chatbot Claude',
    'chatbot GPT-5',
    'chatbot WhatsApp PME',
    'chatbot souverain Suisse',
    'assistant virtuel PME',
    'chatbot sur mesure',
    'DKDP',
  ],
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const FAQ = [
  {
    question: 'Chatbot vs agent IA : quelle différence ?',
    answer:
      "Un chatbot répond à des questions dans une conversation, généralement sur votre site ou WhatsApp. Un agent IA va plus loin : il prend des décisions autonomes, exécute des actions dans vos outils (CRM, ERP, calendrier) et peut chaîner plusieurs tâches. Un chatbot qui déclenche un workflow Zapier devient de facto un agent. DKDP déploie les deux selon votre besoin, avec un continuum : on commence souvent par un chatbot Essentiel, on évolue vers un agent quand les cas d'usage s'étendent.",
  },
  {
    question: 'Claude ou GPT pour mon chatbot ?',
    answer:
      "Claude Opus 4.7 (Anthropic) pour les chatbots qui raisonnent sur de longs documents : contrats, FAQ techniques, bases juridiques, dossiers médicaux anonymisés. Meilleur choix si vos clients posent des questions complexes. GPT-5 (OpenAI) pour les chatbots multimodaux (photos, PDF, audio) : idéal pour le support technique ou médical avec pièces jointes. Gemini 3 (Google) si vous êtes déjà dans Google Workspace. Tous nos chatbots sont connectés à votre base documentaire privée (RAG) pour répondre avec vos propres contenus, jamais en hallucinant.",
  },
  {
    question: 'Peut-on utiliser une IA souveraine Suisse pour mon chatbot ?',
    answer:
      "Oui. Pour les secteurs régulés (fiduciaire, médical, juridique, banque privée, RH) on propose Infomaniak Euria (IA suisse hébergée à Genève et Winterthur) ou Swisscom Swiss AI Assistant. On peut aussi déployer Mistral Large 2 ou Llama 4 auto-hébergés sur un VPS Suisse. Les données ne quittent jamais le territoire. Un DPA est systématiquement signé. Coût légèrement supérieur (environ +15 à 25 %) mais conformité nLPD 2023 et secret professionnel garantis.",
  },
  {
    question: "Comment intégrer le chatbot sur WhatsApp ?",
    answer:
      "Via WhatsApp Business API (Twilio ou 360dialog). On demande un numéro business à votre nom, on le relie au chatbot et on obtient la validation Meta en 2 à 5 jours. Le chatbot répond alors automatiquement sur WhatsApp avec votre identité de marque, gère les escalades vers vos conseillers et synchronise les conversations dans votre CRM. Particulièrement efficace pour les agences immobilières, les cabinets médicaux et les boutiques e-commerce.",
  },
  {
    question: "Combien coûte un chatbot IA sur mesure ?",
    answer:
      "Un chatbot Essentiel démarre à CHF 2 900 (réponses aux questions fréquentes, site web, déploiement 2 semaines). Les formules avec connexion à vos outils métier (CRM, agenda, ERP) se situent entre CHF 5 500 et CHF 12 000. Pour des chatbots multi-canal avec RAG sur base documentaire volumineuse, chiffrage sur devis. Tarif fixe fourni avant démarrage, pas de surprises. Maintenance mensuelle en option dès CHF 250/mois.",
  },
  {
    question: 'Combien de temps faut-il pour déployer un chatbot ?',
    answer:
      "Entre 2 et 5 semaines selon la complexité. Un chatbot Essentiel qui répond aux questions fréquentes est opérationnel en 2 semaines. Un assistant connecté à votre CRM ou système de réservation (Cal.com, Calendly) prend 4 à 5 semaines. Un chatbot multi-canal (site + WhatsApp + Messenger) avec RAG sur documentation privée se déploie en 5 à 6 semaines.",
  },
  {
    question: 'Mes données clients sont-elles protégées ?',
    answer:
      "Oui. DKDP héberge les chatbots sur infrastructures européennes conformes RGPD ou sur serveur Suisse (Infomaniak) si vos contraintes nLPD l'exigent. Vos données ne sont jamais utilisées pour entraîner des modèles tiers (clause contractuelle explicite avec Anthropic, OpenAI, Google). On vous explique exactement où vos données transitent avant le déploiement. DPA systématiquement signé.",
  },
  {
    question: "Est-ce que le chatbot peut se tromper ou inventer des réponses ?",
    answer:
      "Tout système IA a des limites. C'est pourquoi DKDP configure chaque chatbot avec des garde-fous : il répond uniquement à partir de vos contenus validés (RAG avec seuil de confiance), et transfère vers un humain quand la question dépasse son périmètre. On teste rigoureusement avant la mise en ligne avec un corpus de 50 à 100 questions métier. Les hallucinations sont réduites à moins de 2 % sur les cas d'usage DKDP 2026.",
  },
  {
    question: 'Qui maintient le chatbot après la mise en ligne ?',
    answer:
      "DKDP propose un suivi mensuel inclus dans les formules Pro et Sur mesure (3 mois inclus). On analyse les conversations, on ajuste les réponses, on ajoute de nouveaux contenus selon vos retours. Vous n'avez rien de technique à gérer. Au-delà, la maintenance mensuelle continue dès CHF 250/mois (logs, monitoring, ajustements prompts, ajout de nouvelles FAQ).",
  },
  {
    question: 'Le chatbot peut-il être connecté à mes outils existants ?',
    answer:
      "Oui. Calendriers de réservation (Cal.com, Calendly), CRM (HubSpot, Pipedrive, Salesforce, Zoho), systèmes de ticketing (Zendesk, Intercom), ERP (Bexio, Abacus), bases de données internes, Google Workspace, Microsoft 365. On s'adapte à votre stack existant sans tout reconstruire, via API ou webhooks n8n/Make.",
  },
  {
    question: 'Comment je vois ce que mon chatbot fait au quotidien ?',
    answer:
      "Chaque chatbot DKDP est livré avec un tableau de bord privé accessible par token : nombre de conversations, taux de résolution automatique, durée moyenne, pic horaire et sujets dominants, mis à jour en continu. Chaque session est synthétisée automatiquement par Claude Haiku (intention, ton, urgence, prochaine étape). Les coordonnées laissées par les visiteurs (email, téléphone, demande) sont extraites automatiquement et envoyées dans votre CRM ou par email. Vous pouvez recevoir des alertes en temps réel sur les leads chauds ou les sujets sensibles. Aucune installation côté client, accès depuis un simple lien sécurisé.",
  },
  {
    question: 'Combien de temps les conversations sont-elles conservées ?',
    answer:
      "Par défaut, les conversations sont conservées 90 jours dans une base européenne ou suisse, puis purgées automatiquement. Cette durée est paramétrable (30, 60, 90 jours, ou jusqu'à 1 an pour les secteurs régulés). Les résumés IA et les leads captés peuvent être conservés plus longtemps de manière anonymisée pour piloter la performance dans la durée. Tout est conforme nLPD 2023 et RGPD, et un DPA est signé avant le déploiement.",
  },
  {
    question: 'Avec quelles plateformes et CMS le chatbot est-il compatible ?',
    answer:
      "Le chatbot s'intègre via un simple script à coller dans votre site, sans refonte. Compatible avec Webflow, WordPress, Shopify, Wix, Squarespace, HubSpot CMS, Framer, ainsi que les sites sur mesure (Next.js, Astro, Laravel, PHP). L'installation prend 15 minutes et DKDP s'occupe de l'intégration de bout en bout.",
  },
  {
    question: 'Est-ce que le chatbot remplace mon équipe ?',
    answer:
      "Non, et ce n'est pas l'objectif. Le chatbot prend en charge les demandes répétitives et les horaires où personne n'est disponible. Votre équipe se concentre sur les échanges à forte valeur ajoutée. C'est un outil, pas un remplacement. Sur les déploiements DKDP 2026, les équipes support libèrent en moyenne 40 à 60 % de leur temps sur les tickets de niveau 1.",
  },
]

const PROBLEMS = [
  {
    Icon: MessageCircle,
    problem: 'Les memes questions reviennent chaque jour',
    solution: 'Votre chatbot repond instantanement aux demandes courantes : horaires, tarifs, disponibilites, procedures. Votre équipe ne repete plus les memes reponses.',
    metric: '80%',
    metricLabel: 'des questions courantes traitees automatiquement',
  },
  {
    Icon: Clock,
    problem: 'Vous perdez des clients en dehors des heures de bureau',
    solution: 'Un prospect qui pose une question a 22h obtient une reponse immediate. Il ne va pas voir ailleurs. Le chatbot qualifie le lead et vous le transmet le lendemain matin, pret a etre contacte.',
    metric: '24/7',
    metricLabel: 'disponibilite sans coût supplementaire',
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
    problem: 'La prise de rendez-vous généré des allers-retours',
    solution: 'Le chatbot propose directement vos creneaux disponibles et confirme la reservation. Plus d\'emails de coordination, plus de "Quand etes-vous disponible ?".',
    metric: '3x',
    metricLabel: 'plus de rendez-vous pris hors heures',
  },
]

const STEPS = [
  {
    num: 1,
    title: 'Decouverte de votre métier',
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
    title: 'Développement et tests',
    desc: 'On construit le chatbot, on le connecte a vos outils si nécessaire, et on le teste avec des scenarios reels. Vous avez acces a une version de test pour valider.',
    duration: '1 a 3 semaines',
  },
  {
    num: 4,
    title: 'Déploiement et suivi',
    desc: 'Mise en ligne sur votre site ou vos canaux. On surveille les premieres conversations, on ajuste ce qui doit l\'etre, et on vous forme a la lecture des statistiques.',
    duration: '2 a 3 jours',
  },
]

const INDUSTRIES = [
  {
    Icon: Scale,
    title: 'Fiduciaires et cabinets juridiques',
    scenario: 'Vos clients demandent regulierement les documents nécessaires pour une création de société, les delais de depot ou le statut de leur dossier. Le chatbot repond instantanement et envoie les formulaires adequats.',
    example: '"Quels documents faut-il pour creer une Sarl ?" → Reponse + lien vers le formulaire de demarrage',
  },
  {
    Icon: Stethoscope,
    title: 'Cabinets medicaux et dentaires',
    scenario: 'Les patients appellent pour prendre rendez-vous, vérifier les horaires ou poser des questions pre-consultation. Le chatbot gère la prise de rendez-vous et les informations pratiques, même le week-end.',
    example: '"Je voudrais un rendez-vous pour un detartrage" → Proposition de creneaux + confirmation automatique',
  },
  {
    Icon: Home,
    title: 'Agences immobilieres',
    scenario: 'Les prospects veulent des informations sur un bien, vérifier les disponibilites ou planifier une visite. Le chatbot qualifie le lead (budget, quartier, surface) et propose un creneau au bon agent.',
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
    desc: 'Pour les entreprises qui veulent répondre aux questions fréquentes sans mobiliser leur équipe.',
    features: [
      'Chatbot sur votre site web',
      'Jusqu\'à 50 questions-réponses configurées',
      'Design intégré à votre charte graphique',
      'Transfert vers email si question complexe',
      'Tableau de bord d\'activité (conversations et statistiques)',
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
      'Connexion à votre calendrier de réservation',
      'Qualification de leads automatique avec extraction des contacts',
      'Base de connaissances sur mesure (FAQ, produits, procédures)',
      'Tableau de bord avancé : résumé IA par session, top intentions, leads captés',
      'Alertes email pour les leads chauds',
      '3 mois de suivi et ajustements inclus',
    ],
    recommended: true,
  },
  {
    name: 'Sur mesure',
    price: 'Sur devis',
    desc: 'Pour les entreprises avec des besoins spécifiques : CRM, base de données, multi-canal, multi-langue.',
    features: [
      'Tout ce qui est inclus dans Pro',
      'Connecté à vos outils existants (CRM, ERP, ticketing)',
      'Déploiement multi-canal sur devis (site, WhatsApp Business, Messenger)',
      'Chatbot multilingue (FR, EN, DE)',
      'Logique métier avancée et workflows personnalisés',
      'Tableau de bord sur mesure et exports automatisés',
      'Suivi continu et évolution mensuelle',
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
    <main>
      {/* ── Schema.org ── */}
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Chatbot IA sur mesure Genève & Suisse romande',
          url: '/intelligence-artificielle/chatbot-ia',
          description:
            "Conception et déploiement de chatbots IA sur mesure pour PME à Genève et en Suisse romande. Propulsés par Claude Opus 4.7 (Anthropic), GPT-5 (OpenAI) ou Gemini 3 (Google). Intégration WhatsApp Business, site web, Messenger. RAG sur base documentaire privée. Conforme nLPD 2023, hébergement Suisse disponible.",
          serviceType: 'Développement de chatbot IA sur mesure',
          priceFrom: 2900,
          priceSpecDescription: "À partir de CHF 2'900 pour un chatbot Essentiel déployé en 2 semaines",
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
          name: 'Chatbot IA sur mesure pour entreprises en Suisse romande',
          url: '/intelligence-artificielle/chatbot-ia',
          description: 'DKDP concoit et déploie des chatbots IA sur mesure pour PME à Genève. Support client 24/7, qualification de leads, prise de rendez-vous automatique. Des CHF 2900, déployé en 2 a 5 semaines.',
        })}
      />
      {/* Structured pricing for rich snippets */}
      <SchemaOrg
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Chatbot IA sur mesure',
          description: 'Chatbot IA concu et déployé pour votre entreprise. Support client 24/7, qualification de leads, prise de rendez-vous automatique.',
          image: 'https://dkdp.ch/images/og/chatbot-ia.png',
          brand: { '@type': 'Brand', name: 'DKDP' },
          category: 'Service de développement de chatbot IA',
          url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia',
          offers: [
            {
              '@type': 'Offer',
              name: 'Chatbot Essentiel',
              price: '2900',
              priceCurrency: 'CHF',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              description: 'Chatbot FAQ pour site web, 50 questions-reponses, 1 mois de suivi',
              url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia#offres',
              seller: { '@type': 'Organization', name: 'DKDP', url: 'https://dkdp.ch' },
              areaServed: { '@type': 'Country', name: 'Suisse' },
            },
            {
              '@type': 'Offer',
              name: 'Chatbot Pro',
              price: '5500',
              priceCurrency: 'CHF',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              description: 'Chatbot avec calendrier, qualification de leads, 3 mois de suivi',
              url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia#offres',
              seller: { '@type': 'Organization', name: 'DKDP', url: 'https://dkdp.ch' },
              areaServed: { '@type': 'Country', name: 'Suisse' },
            },
            {
              '@type': 'Offer',
              name: 'Chatbot Sur mesure',
              price: '8000',
              priceCurrency: 'CHF',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '8000',
                priceCurrency: 'CHF',
                description: 'A partir de CHF 8 000, sur devis',
              },
              description: 'Chatbot multi-canal, multilingue, connecte CRM/ERP, suivi continu. Sur devis.',
              url: 'https://dkdp.ch/intelligence-artificielle/chatbot-ia#offres',
              seller: { '@type': 'Organization', name: 'DKDP', url: 'https://dkdp.ch' },
              areaServed: { '@type': 'Country', name: 'Suisse' },
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
                className="text-text-muted text-sm hover:text-text transition-colors"
              >
                Intelligence Artificielle
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>
                Chatbot IA
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Chatbot IA sur mesure Genève & Suisse romande</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  Pas un chatbot générique. Un assistant qui <GradText as="span">connaît votre métier</GradText>.
                </p>
                <p data-speakable className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP concoit des chatbots IA sur mesure pour les PME à Genève et en Suisse romande.
                  Pas un widget générique : un assistant virtuel intelligent concu pour votre métier, vos questions
                  et vos clients. déployé sur votre site en 2 a 5 semaines, a partir de CHF 2&apos;900.
                </p>
                <HeroPills
                  accentRgb="212, 212, 216"
                  items={[
                    { label: 'POC en 2 à 3 sem', Icon: Clock },
                    { label: 'Données Suisse ou UE', Icon: ShieldCheck },
                    { label: 'WhatsApp ou Web', Icon: MessageCircle },
                  ]}
                />
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=chatbot-ia" size="lg">
                    Discuter de mon projet<span aria-hidden="true"> →</span>
                  </LiquidMetalButton>
                  <Link
                    href="#comment-ca-marche"
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    Comment ca marché ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Offre mise à jour : avril 2026</p>
              </div>

              {/* Chat mockup */}
              <div className="relative">
                <div className="mb-6 lg:mb-8" aria-label="Modeles IA qu'on integre dans vos chatbots">
                  <AppLogoMarquee
            logos={IA_LOGOS}
            durationSeconds={126}
            size="md"
          />
                </div>
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
                      <p className="text-text text-sm font-semibold">Assistant Votre Entreprise</p>
                      <p className="text-text-muted text-xs">En ligne</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  {/* Messages */}
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-white/[0.07] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[75%]">
                        <p className="text-sm text-text">
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
                        <p className="text-sm text-text">Oui, jeudi apres-midi si possible</p>
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
        </section>      </HeroBg>



      

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '24/7', l: 'Disponibilite', sub: 'Sans coût supplementaire' },
              { v: '2-5 sem.', l: 'Delai de déploiement', sub: 'Cle en main' },
              { v: '80%', l: 'Questions automatisées', sub: 'Des le premier mois' },
              { v: 'CHF 2\'900', l: 'A partir de', sub: 'Devis fixe, sans surprise' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-text">
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
      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Bénéfices', href: '#benefices' },
          { label: 'Modèle IA', href: '#modele-ia' },
          { label: 'Processus', href: '#comment-ca-marche' },
          { label: 'Pilotage', href: '#pilotage' },
          { label: "Cas d'usage", href: '#cas-usage' },
          { label: 'Offres', href: '#offres' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Discuter du projet', href: '/contact?service=chatbot-ia' }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.12)"
        accentBorder="rgba(212,212,216,0.25)"
      />

      {/* ── Problemes / Benefices ── */}
      <section id="benefices" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Le problème que vous connaissez</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Pourquoi un chatbot IA change tout pour votre site web
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
                  <p className="text-text font-semibold mb-2">{item.problem}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.solution}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modèle IA (GEO : entités LLM nommées) ── */}
      <section id="modele-ia" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Moteur IA</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                Quel modèle IA pour votre chatbot ?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                On choisit le moteur IA selon vos contraintes métier, budget et souveraineté des données. Tous nos chatbots fonctionnent en RAG sur votre base documentaire privée, jamais en hallucinant.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: 'Claude Opus 4.7',
                provider: 'Anthropic',
                accentColor: violet.color,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.22)',
                pitch: 'Raisonnement long, documents volumineux, analyses juridiques ou techniques.',
                useCase: 'Fiduciaire, juridique, support technique niveau 2',
              },
              {
                name: 'GPT-5',
                provider: 'OpenAI',
                accentColor: chrome.color,
                accentBg: 'rgba(212,212,216,0.06)',
                accentBorder: 'rgba(212,212,216,0.18)',
                pitch: 'Multimodal : texte, image, voix. Pièces jointes traitées nativement.',
                useCase: 'Support technique, médical avec pièces jointes, e-commerce',
              },
              {
                name: 'Gemini 3',
                provider: 'Google',
                accentColor: '#60a5fa',
                accentBg: 'rgba(96,165,250,0.06)',
                accentBorder: 'rgba(96,165,250,0.20)',
                pitch: 'Intégration native Google Workspace, Gmail, Drive, Docs.',
                useCase: 'Équipes déjà 100 % Google, onboarding RH',
              },
              {
                name: 'Infomaniak Euria',
                provider: 'IA souveraine Suisse',
                accentColor: '#4ade80',
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.20)',
                pitch: 'Hébergée 100 % en Suisse (Genève, Winterthur). nLPD 2023 par défaut.',
                useCase: 'Secteurs régulés : médical, juridique, banque privée, RH',
              },
            ].map((m, i) => (
              <SectionReveal key={m.name} delay={i * 0.08}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-6"
                  style={{ background: m.accentBg, borderColor: m.accentBorder }}
                >
                  <div className="mb-3">
                    <p className="text-text font-bold text-base">{m.name}</p>
                    <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: m.accentColor }}>
                      {m.provider}
                    </p>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{m.pitch}</p>
                  <div className="pt-3 border-t" style={{ borderColor: m.accentBorder }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: m.accentColor }}>
                      Idéal pour
                    </p>
                    <p className="text-text-muted text-xs leading-relaxed">{m.useCase}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-sm text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              On propose également <strong className="text-text">Mistral Large 2</strong> et <strong className="text-text">Llama 4</strong> auto-hébergés sur serveur Suisse quand la souveraineté est contractuelle. Pour comparer les modèles grand public, lisez notre guide{' '}
              <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-text transition-colors">
                ChatGPT, Claude ou Copilot pour votre PME
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── ROI Visual ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Impact mesurable</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                ROI d&apos;un chatbot intelligent : resultats des le premier mois
              </h2>
              <p data-speakable className="text-text-secondary text-lg max-w-2xl mx-auto">
                Un chatbot IA bien concu ne remplace pas votre équipe. Il absorbe 80% des
                demandes repetitives pour que vos collaborateurs se concentrent sur les
                interactions a forte valeur ajoutee. Les PME genevoises qui deploient un
                chatbot DKDP constatent en moyenne 60% de reduction du temps d&apos;onboarding
                et une disponibilite client 24h/24 sans coût supplementaire.
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

      {/* ── Comment ca marché ── */}
      <section
        id="comment-ca-marche"
        className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Notre methode</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Vous n&apos;avez rien de technique a faire.
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                De la decouverte de votre métier jusqu&apos;a la mise en ligne, DKDP gère
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
                    <h3 className="text-text font-semibold mb-2">{step.title}</h3>
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
                  { label: 'Développement', weeks: 'Sem. 2-4', opacity: 0.65 },
                  { label: 'Déploiement', weeks: 'Sem. 4-5', opacity: 0.85 },
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
                      <p className="text-text text-xs font-semibold">{phase.label}</p>
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

      {/* ── Pilotage & données : dashboard + extraction auto ── */}
      <section id="pilotage" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Pilotage et données</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Vous voyez tout ce que fait votre chatbot. <GradText as="span">En temps réel.</GradText>
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                Chaque conversation est journalisée, résumée par IA et indexée. Un tableau de bord
                privé vous donne accès aux statistiques d&apos;activité, aux leads captés et aux
                tendances détectées. Sans installation, sans manipulation technique.
              </p>
            </div>
          </SectionReveal>

          {/* 4 features cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                Icon: Activity,
                title: "Tableau de bord d'activité",
                desc: "Conversations actives, taux de résolution automatique, pic horaire, durée moyenne, sujets dominants. Mis à jour en continu.",
              },
              {
                Icon: Sparkles,
                title: 'Résumé IA par session',
                desc: 'Chaque échange est synthétisé par Claude Haiku : intention du visiteur, ton, niveau d\'urgence, prochaine étape recommandée.',
              },
              {
                Icon: Database,
                title: 'Extraction auto des contacts',
                desc: 'Email, téléphone, nom, demande, contexte : extraits sans formulaire, envoyés en temps réel dans votre CRM ou par email.',
              },
              {
                Icon: Bell,
                title: 'Alertes intelligentes',
                desc: 'Notification immédiate quand un lead chaud est qualifié, qu\'un sujet sensible apparaît ou qu\'un client VIP entre en conversation.',
              },
            ].map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.08}>
                <div
                  className="rounded-xl p-6 h-full"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: bg }}
                  >
                    <f.Icon size={18} style={{ color }} />
                  </div>
                  <h3 className="text-text font-semibold mb-2">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Mockup dashboard */}
          <SectionReveal delay={0.2}>
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(212,212,216,0.03)',
                border: `1px solid ${bd}`,
                boxShadow: '0 0 60px rgba(212,212,216,0.05)',
              }}
            >
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: `1px solid ${bd}` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: bg }}
                  >
                    <Activity size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm">Tableau de bord chatbot</p>
                    <p className="text-text-muted text-xs">7 derniers jours · accès privé</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-text-muted text-xs">Données en direct</span>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { v: '247', l: 'Conversations', sub: '+18% vs sem. -1' },
                  { v: '82%', l: 'Résolution auto', sub: 'sans intervention humaine' },
                  { v: '31', l: 'Leads qualifiés', sub: '12 transmis CRM' },
                  { v: '1m 24s', l: 'Durée moyenne', sub: 'par session' },
                ].map((k) => (
                  <div
                    key={k.l}
                    className="rounded-lg p-4"
                    style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                  >
                    <p className="text-2xl font-bold text-text mb-1">{k.v}</p>
                    <p className="text-text-secondary text-xs font-semibold">{k.l}</p>
                    <p className="text-text-muted text-[11px] mt-0.5">{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* 2-column body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top intentions */}
                <div
                  className="rounded-lg p-5"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color }}>
                    Top intentions détectées
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Demande de devis', pct: 38 },
                      { label: 'Prise de rendez-vous', pct: 27 },
                      { label: 'Question tarif', pct: 18 },
                      { label: 'Support produit', pct: 12 },
                      { label: 'Autres', pct: 5 },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-text-secondary text-xs">{row.label}</span>
                          <span className="text-text-muted text-xs">{row.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${row.pct}%`, background: chrome.color, opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent leads */}
                <div
                  className="rounded-lg p-5"
                  style={{ background: 'rgba(212,212,216,0.04)', border: `1px solid ${bd}` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color }}>
                    Leads captés récemment
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: 'Sophie B.', intent: 'Devis site e-commerce', via: Mail, meta: 'sophie.b@…' },
                      { name: 'Marc D.', intent: 'RDV consultation IA', via: Phone, meta: '+41 79 …' },
                      { name: 'Laura M.', intent: 'Tarif chatbot Pro', via: Mail, meta: 'laura.m@…' },
                      { name: 'Jean P.', intent: 'Audit SEO', via: Mail, meta: 'jean.p@…' },
                    ].map((lead) => (
                      <div
                        key={lead.name}
                        className="flex items-center gap-3 pb-3"
                        style={{ borderBottom: `1px solid rgba(212,212,216,0.06)` }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: bg }}
                        >
                          <lead.via size={13} style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-text text-sm font-medium truncate">{lead.name}</p>
                          <p className="text-text-muted text-xs truncate">{lead.intent}</p>
                        </div>
                        <span className="text-text-muted text-[11px] truncate hidden sm:inline-block max-w-[110px]">
                          {lead.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-text-muted text-xs text-center mt-6">
                Tableau de bord protégé par token, accès limité à votre équipe. Hébergement européen
                ou Suisse, conforme nLPD 2023 et RGPD. Conservation des conversations paramétrable
                (30, 60 ou 90 jours par défaut).
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Cas d'usage / Industries ── */}
      <section id="cas-usage" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Cas d&apos;usage concrets</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Chatbot IA par secteur : fiduciaire, medical, immobilier
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                Chaque chatbot DKDP est concu pour un métier spécifique : fiduciaires, cabinets
                medicaux, agences immobilieres, commerces et PME de services à Genève. Voici
                comment il s&apos;intégré concretement dans ces secteurs.
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
                    <h3 className="text-text font-semibold mb-2">{ind.title}</h3>
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
        className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Nos formules</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Tarifs chatbot IA entreprise : 3 formules
              </h2>
              <p data-speakable className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                Devis fixe en CHF, sans surprise. Chaque formule inclut la conception, le
                développement et le déploiement par notre équipe à Genève. Paiement en 3 fois possible.
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
                  <h3 className="text-text text-xl font-bold mb-1">{offer.name}</h3>
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
              personnalisé sous 48h.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Questions sur nos chatbots IA" />
      </div>

      {/* ── CTA Final ── */}
      <CTAFinal />
    </main>
  )
}
