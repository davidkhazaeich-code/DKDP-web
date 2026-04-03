import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { GlossaireSearch } from '@/components/sections/GlossaireSearch'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import type { Category, Term } from './_types'

const CTAFinal     = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LetterSection = dynamic(() => import('./_components/LetterSection').then(m => m.LetterSection))

export const metadata: Metadata = {
  title: 'Glossaire Digital et IA · Définitions pour PME · DKDP',
  description: 'Lexique complet du web, du SEO et de l\'intelligence artificielle. 65 termes expliqués simplement pour les PME en Suisse romande.',
  alternates: { canonical: 'https://dkdp.ch/glossaire' },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TERMS: Term[] = [
  // A
  {
    term: 'Agent IA',
    category: 'IA',
    definition:
      'Programme autonome capable de percevoir son environnement, prendre des décisions et exécuter des actions pour atteindre un objectif défini. Un agent IA se distingue d\'un simple chatbot par sa capacité à enchainer plusieurs étapes sans intervention humaine : lire un email, extraire les données, mettre à jour un CRM et envoyer une confirmation, le tout automatiquement. En entreprise, les agents IA les plus courants gèrent le tri d\'emails, la qualification de leads, la rédaction de comptes rendus et la veille concurrentielle. Selon McKinsey (2024), les entreprises utilisant des agents IA réduisent de 25 à 45 % le temps consacré aux taches administratives répétitives. En Suisse romande, une PME de 10 personnes peut économiser jusqu\'à 15 heures par semaine en déployant un agent IA sur ses processus internes. DKDP conçoit des agents IA sur mesure adaptés aux workflows spécifiques de chaque entreprise genevoise.',
    link: '/intelligence-artificielle/agents-ia',
  },
  {
    term: 'API',
    category: 'Web',
    definition:
      'Interface de programmation permettant à deux logiciels de communiquer entre eux. Ex. : votre CRM qui parle à votre outil de facturation via une API.',
  },
  {
    term: 'AEO',
    category: 'SEO',
    definition:
      'Answer Engine Optimization. Discipline du marketing digital qui consiste à optimiser le contenu d\'un site pour apparaitre directement dans les réponses générées par les moteurs de réponse IA tels que ChatGPT, Perplexity, Google AI Overviews et Bing Copilot. L\'AEO se distingue du SEO classique par son objectif : au lieu de positionner un lien dans une liste de résultats, on cherche à ce que l\'IA cite le contenu comme source fiable dans sa réponse. Les techniques AEO incluent la structuration du contenu en blocs de réponse directe, l\'ajout de données structurées (Schema.org), la présence de FAQ avec des réponses complètes, et le renforcement de l\'autorité de l\'auteur. Pour une entreprise genevoise, être citée dans une réponse IA génère un trafic qualifié sans coût publicitaire récurrent. DKDP combine SEO et AEO dans ses stratégies de visibilité pour couvrir à la fois Google et les moteurs IA.',
  },
  {
    term: 'Automatisation',
    category: 'IA',
    definition:
      'Remplacement de tâches manuelles répétitives par des scripts, des workflows automatisés ou des agents IA pour gagner en efficacité et réduire les erreurs humaines. L\'automatisation en entreprise couvre un large spectre : de la simple règle "si un email arrive de X, le transférer à Y" jusqu\'aux workflows complexes enchainant CRM, facturation, relances et reporting. Les outils les plus utilisés en Suisse romande incluent Make (ex-Integromat), Zapier et n8n pour le no-code, ainsi que des agents IA sur mesure pour les processus métier spécifiques. Selon une étude McKinsey (2023), environ 30 % des taches effectuées dans 60 % des métiers pourraient être automatisées avec les technologies actuelles. Pour une PME genevoise de 15 collaborateurs, l\'automatisation des taches administratives peut représenter une économie de 1 000 à 2 000 heures par an. DKDP analyse les processus internes de ses clients et conçoit des solutions d\'automatisation adaptées à leur budget et leur maturité digitale.',
    link: '/intelligence-artificielle',
  },
  // B
  {
    term: 'Backlink',
    category: 'SEO',
    definition:
      'Lien provenant d\'un autre site vers le vôtre. Un indicateur clé de l\'autorité d\'un domaine aux yeux de Google.',
  },
  {
    term: 'Bounce rate',
    category: 'Web',
    definition:
      'Taux de rebond. Pourcentage de visiteurs qui quittent un site sans interagir. Un taux elevé indique souvent un problème de pertinence ou d\'expérience.',
  },
  // C
  {
    term: 'CMS',
    category: 'Web',
    definition:
      'Content Management System. Logiciel de gestion de contenu (WordPress, Sanity, Strapi) permettant de mettre à jour un site sans coder.',
  },
  {
    term: 'CRM',
    category: 'General',
    definition:
      'Customer Relationship Management. Logiciel de gestion de la relation client (HubSpot, Salesforce, Pipedrive).',
  },
  {
    term: 'CTR',
    category: 'SEO',
    definition:
      'Click-Through Rate. Taux de clic. Ratio entre les impressions et les clics sur un lien dans les résultats de recherche.',
  },
  {
    term: 'Claude',
    category: 'IA',
    definition:
      'Modèle de langage développé par Anthropic, concurrent de ChatGPT. Reconnu pour sa précision et sa gestion des instructions complexes.',
  },
  {
    term: 'Conversion',
    category: 'Web',
    definition:
      'Action souhaitée accomplie par un visiteur : achat, prise de contact, inscription. Le taux de conversion mesure l\'efficacité d\'une page.',
  },
  {
    term: 'Core Web Vitals',
    category: 'SEO',
    definition:
      'Ensemble de métriques Google mesurant l\'expérience utilisateur : vitesse d\'affichage (LCP), interactivité (INP) et stabilité visuelle (CLS).',
  },
  {
    term: 'Crawl',
    category: 'SEO',
    definition:
      'Exploration automatique d\'un site par les robots de Google pour indexer ses pages.',
  },
  // D
  {
    term: 'DA',
    category: 'SEO',
    definition:
      'Domain Authority. Score de 0 à 100 (Moz) estimant la capacité d\'un domaine à se positionner sur Google.',
  },
  {
    term: 'DNS',
    category: 'Web',
    definition:
      'Domain Name System. Système qui traduit un nom de domaine (ex. dkdp.ch) en adresse IP.',
  },
  // E
  {
    term: 'E-E-A-T',
    category: 'SEO',
    definition:
      'Experience, Expertise, Authoritativeness, Trustworthiness (Expérience, Expertise, Autorité, Fiabilité). Cadre d\'évaluation utilisé par les Quality Raters de Google pour juger la fiabilité et la pertinence d\'un contenu web. Depuis la mise à jour de septembre 2025, le E-E-A-T pèse encore plus dans le classement des sites traitant de sujets YMYL (Your Money Your Life), c\'est-à-dire la santé, la finance et les services professionnels. Concrètement, Google vérifie si l\'auteur a une expérience réelle du sujet, si le site démontre une expertise vérifiable, si d\'autres sources fiables le citent (autorité), et si les informations sont exactes et transparentes (fiabilité). Pour une PME à Genève, le E-E-A-T se traduit par des éléments concrets : page équipe avec photos et biographies, avis clients vérifiables, adresse physique, certifications et témoignages. DKDP intègre les signaux E-E-A-T dans chaque site qu\'elle conçoit pour ses clients suisses.',
  },
  {
    term: 'ERP',
    category: 'General',
    definition:
      'Enterprise Resource Planning. Logiciel de gestion intégrée couvrant comptabilité, stocks, RH et production.',
  },
  // F
  {
    term: 'Fine-tuning',
    category: 'IA',
    definition:
      'Processus d\'entraînement supplémentaire d\'un modèle IA sur des données spécifiques pour l\'adapter à un usage particulier.',
  },
  // G
  {
    term: 'GEO',
    category: 'SEO',
    definition:
      'Generative Engine Optimization. Stratégie d\'optimisation de contenu visant à être cité comme source de référence par les moteurs de recherche génératifs tels que Google AI Overviews, ChatGPT, Perplexity et Bing Copilot. Contrairement au SEO classique qui cible les liens bleus, le GEO cible les réponses générées par l\'IA. Les facteurs clés incluent la structure du contenu en passages citables de 134 à 167 mots, l\'intégration de statistiques sourcées, la présence de schémas FAQ en JSON-LD, et l\'autorité perçue de l\'auteur (E-E-A-T). Selon une étude de Georgia Tech (2024), les contenus contenant des citations vérifiables ont 40 % plus de chances d\'être cités par un LLM. Pour une PME genevoise, apparaitre dans une réponse IA pour "agence digitale Genève" équivaut à un positionnement organique permanent. DKDP intègre le GEO dans toutes ses stratégies SEO.',
  },
  {
    term: 'GPT',
    category: 'IA',
    definition:
      'Generative Pre-trained Transformer. Architecture de réseau de neurones à la base de ChatGPT et de nombreux LLM modernes.',
  },
  // H
  {
    term: 'Hallucination',
    category: 'IA',
    definition:
      'Phénomène où un LLM génère des informations factuellement fausses mais formulées avec une grande assurance, ce qui les rend difficiles à détecter sans vérification. Les hallucinations surviennent parce que les modèles de langage prédisent le mot suivant le plus probable, sans véritable compréhension factuelle. Exemples courants : citations juridiques inventées, statistiques fictives, ou noms d\'entreprises inexistants. Selon une étude de l\'Université de Stanford (2024), les LLM hallucinent dans 3 à 15 % de leurs réponses selon la complexité du sujet. Pour une PME qui utilise l\'IA dans ses communications ou son service client, ce risque nécessite la mise en place de garde-fous : relecture humaine systématique, connexion à une base de données vérifiée (RAG), ou limitation du périmètre de réponse de l\'IA. DKDP accompagne les entreprises genevoises dans le déploiement d\'agents IA avec des mécanismes de vérification intégrés pour minimiser les hallucinations.',
  },
  {
    term: 'Hébergement',
    category: 'Web',
    definition:
      'Service qui rend un site accessible sur internet en stockant ses fichiers sur un serveur. Ex. : Vercel, OVH, Infomaniak.',
  },
  // I
  {
    term: 'Indexation',
    category: 'SEO',
    definition:
      'Processus par lequel Google enregistre une page dans sa base de données après l\'avoir crawlée.',
  },
  {
    term: 'IA générative',
    category: 'IA',
    definition:
      'Branche de l\'intelligence artificielle capable de créer du contenu original : texte, images, code, audio et vidéo. Les modèles d\'IA générative les plus connus en 2026 sont ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google) et Midjourney pour les images. Contrairement à l\'IA analytique qui classe ou prédit, l\'IA générative produit quelque chose de nouveau à partir d\'un prompt. En entreprise, ses applications les plus courantes incluent la rédaction de contenus marketing, la génération de visuels, l\'assistance au code, la traduction automatique et la synthèse de documents. Selon le World Economic Forum (2024), 75 % des entreprises prévoient d\'adopter l\'IA générative avant 2027. Pour les PME suisses, l\'IA générative représente un levier de productivité majeur : un collaborateur formé peut réduire de 60 % le temps consacré à la rédaction et à la recherche. DKDP forme les équipes des entreprises genevoises à l\'utilisation concrète de l\'IA générative dans leur quotidien professionnel.',
    link: '/intelligence-artificielle',
  },
  // K
  {
    term: 'KPI',
    category: 'General',
    definition:
      'Key Performance Indicator. Indicateur clé de performance permettant de mesurer l\'atteinte d\'un objectif.',
  },
  {
    term: 'Keyword',
    category: 'SEO',
    definition:
      'Mot-clé. Terme ou expression saisi par un internaute dans un moteur de recherche.',
  },
  // L
  {
    term: 'Landing page',
    category: 'Web',
    definition:
      'Page d\'atterrissage optimisée pour convertir un visiteur en lead ou en client autour d\'une offre précise.',
  },
  {
    term: 'LCP',
    category: 'SEO',
    definition:
      'Largest Contentful Paint. Temps d\'affichage du plus grand élément visible. Core Web Vital de Google.',
  },
  {
    term: 'LLM',
    category: 'IA',
    definition:
      'Large Language Model (modèle de langage de grande taille). Réseau de neurones entrainé sur des milliards de textes, capable de comprendre, résumer, traduire et générer du contenu en langage naturel. Les LLM les plus utilisés en 2026 sont GPT-4o (OpenAI), Claude (Anthropic) et Gemini (Google). Pour les entreprises, un LLM peut automatiser la rédaction d\'emails, l\'analyse de documents juridiques, la traduction, le service client et la synthèse de rapports. Un LLM ne remplace pas un expert humain mais multiplie sa productivité : une tache de synthèse de 45 minutes peut être réduite à 3 minutes avec un prompt bien construit. Les PME suisses qui adoptent les LLM constatent un gain moyen de 12 heures par collaborateur et par semaine sur les taches administratives, d\'après les retours clients de DKDP. DKDP propose des formations et un accompagnement pour intégrer les LLM dans les processus métier des entreprises genevoises.',
  },
  {
    term: 'LPD',
    category: 'General',
    definition:
      'Loi fédérale sur la Protection des Données. Equivalent suisse du RGPD européen, en vigueur depuis septembre 2023.',
  },
  // M
  {
    term: 'Meta description',
    category: 'SEO',
    definition:
      'Courte description d\'une page affichée sous le titre dans les résultats Google. Impact sur le CTR mais pas directement sur le classement.',
  },
  {
    term: 'Mot-clé longue traine',
    category: 'SEO',
    definition:
      'Expression de recherche spécifique et moins concurrentielle. Ex. : "formation Excel pour cabinet comptable Genève".',
  },
  // N
  {
    term: 'No-code',
    category: 'General',
    definition:
      'Approche de développement sans écriture de code, via des outils visuels comme Make, Zapier ou Bubble.',
  },
  // O
  {
    term: 'On-page SEO',
    category: 'SEO',
    definition:
      'Optimisation des éléments directement sur la page : balises title, Hn, maillage interne, vitesse, contenu.',
  },
  // P
  {
    term: 'Prompt',
    category: 'IA',
    definition:
      'Instruction textuelle donnée à un modèle d\'IA (LLM) pour obtenir une réponse ou déclencher une action. La qualité et la précision du prompt déterminent directement la qualité du résultat. Un bon prompt inclut le contexte, le format de sortie souhaité, le ton et les contraintes. Le "prompt engineering" est devenu une compétence professionnelle recherchée : savoir formuler des instructions claires pour un LLM peut multiplier par cinq la pertinence des résultats obtenus. En entreprise, les usages les plus courants incluent la rédaction assistée, l\'extraction de données à partir de documents, la traduction et la synthèse de réunions. Un collaborateur formé au prompt engineering gagne en moyenne 30 à 60 minutes par jour sur ses taches de rédaction et de recherche. Les formations DKDP enseignent le prompt engineering appliqué aux outils utilisés en Suisse romande (Claude, ChatGPT, Copilot) avec des cas pratiques adaptés à chaque métier.',
  },
  {
    term: 'PWA',
    category: 'Web',
    definition:
      'Progressive Web App. Application web qui se comporte comme une app mobile, installable sur l\'écran d\'accueil.',
  },
  // R
  {
    term: 'RAG',
    category: 'IA',
    definition:
      'Retrieval-Augmented Generation. Technique d\'intelligence artificielle qui connecte un LLM (comme Claude ou GPT) à une base de connaissances externe pour enrichir ses réponses avec des informations actualisées et vérifiables. Sans RAG, un LLM ne connait que ses données d\'entrainement, souvent datées de plusieurs mois. Avec RAG, il consulte en temps réel des documents internes, des bases de données ou des pages web avant de formuler sa réponse, ce qui réduit considérablement les hallucinations. Application concrète pour une PME genevoise : un RAG connecté à votre documentation interne permet à vos collaborateurs d\'obtenir des réponses précises sur vos procédures, tarifs et historique client via un simple chatbot interne. Selon une étude NVIDIA (2024), le RAG réduit les erreurs factuelles des LLM de 30 à 50 %. DKDP déploie des solutions RAG pour les entreprises romandes qui souhaitent exploiter l\'IA sur leurs données propriétaires.',
  },
  {
    term: 'Redirect 301',
    category: 'SEO',
    definition:
      'Redirection permanente d\'une URL vers une autre. Transfère l\'autorité SEO de l\'ancienne URL vers la nouvelle.',
  },
  {
    term: 'RGPD',
    category: 'General',
    definition:
      'Règlement Général sur la Protection des Données. Règlement européen encadrant la collecte et le traitement des données personnelles.',
  },
  {
    term: 'ROI',
    category: 'General',
    definition:
      'Return on Investment. Retour sur investissement. Mesure la rentabilité d\'une action par rapport à son coût.',
  },
  // S
  {
    term: 'Schema.org',
    category: 'SEO',
    definition:
      'Vocabulaire standard de balisage structuré permettant aux moteurs de recherche et aux IA de mieux comprendre le contenu d\'une page.',
  },
  {
    term: 'SEA',
    category: 'SEO',
    definition:
      'Search Engine Advertising. Publicité dans les moteurs de recherche (Google Ads, Bing Ads).',
  },
  {
    term: 'SEO',
    category: 'SEO',
    definition:
      'Search Engine Optimization. Ensemble de techniques visant à améliorer le positionnement organique d\'un site dans les résultats de recherche.',
  },
  {
    term: 'SERP',
    category: 'SEO',
    definition:
      'Search Engine Results Page. Page de résultats d\'un moteur de recherche.',
  },
  {
    term: 'SSL/TLS',
    category: 'Web',
    definition:
      'Protocole de sécurisation des échanges entre un navigateur et un serveur. Un site sans SSL (HTTPS) est pénalisé par Google.',
  },
  // T
  {
    term: 'Token',
    category: 'IA',
    definition:
      'Unité de traitement d\'un LLM. Environ 3/4 d\'un mot en français. Les LLMs facturent souvent à la consommation de tokens.',
  },
  {
    term: 'Trafic organique',
    category: 'SEO',
    definition:
      'Visites provenant des résultats naturels (non payants) d\'un moteur de recherche.',
  },
  // U
  {
    term: 'UI',
    category: 'Web',
    definition:
      'User Interface. Interface utilisateur. Ce que l\'utilisateur voit et avec quoi il interagit.',
  },
  {
    term: 'URL',
    category: 'Web',
    definition:
      'Uniform Resource Locator. Adresse unique d\'une page web. Une URL bien structurée améliore le SEO.',
  },
  {
    term: 'UX',
    category: 'Web',
    definition:
      'User Experience. Expérience utilisateur. Qualité globale de l\'interaction d\'un utilisateur avec un produit ou un site.',
  },
  // V
  {
    term: 'Vercel',
    category: 'Web',
    definition:
      'Plateforme d\'hébergement et de déploiement, optimisée pour Next.js. Utilisée par DKDP pour ses projets clients.',
  },
  // W
  {
    term: 'Webhook',
    category: 'General',
    definition:
      'Mécanisme permettant à une application d\'envoyer des données automatiquement à une autre en temps réel lors d\'un événement.',
  },
  {
    term: 'WordPress',
    category: 'Web',
    definition:
      'CMS open-source représentant environ 43% des sites web mondiaux. Flexible mais nécessite une maintenance régulière.',
  },
  {
    term: 'Workflow',
    category: 'General',
    definition:
      'Ensemble d\'étapes et de tâches organisées pour accomplir un processus métier. Peut être automatisé avec des outils no-code ou des agents IA.',
    link: '/intelligence-artificielle',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getFirstLetter(term: string): string {
  return term[0].toUpperCase()
}

function groupByLetter(terms: Term[]): Map<string, Term[]> {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, 'fr'))
  const map = new Map<string, Term[]>()
  for (const t of sorted) {
    const letter = getFirstLetter(t.term)
    if (!map.has(letter)) map.set(letter, [])
    map.get(letter)!.push(t)
  }
  return map
}

const ALL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

// ---------------------------------------------------------------------------
// Schema data (first 18 terms as FAQ)
// ---------------------------------------------------------------------------

const FAQ_TERMS = TERMS.slice(0, 18)

const faqItems = FAQ_TERMS.map((t) => ({
  question: `Qu\'est-ce que ${t.term.startsWith('E-') || t.term.startsWith('IA') ? 'l\'' : /^[AEIOUÂÊÎÔÛÄËÏÖÜ]/i.test(t.term) ? 'l\'' : 'le '} ${t.term} ?`,
  answer: t.definition,
}))

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GlossairePage() {
  const grouped = groupByLetter(TERMS)
  const presentLetters = new Set(grouped.keys())

  return (
    <>
      {/* Schema.org */}
      <SchemaOrg schema={buildFAQPage(faqItems)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Glossaire', url: 'https://dkdp.ch/glossaire' },
        ])}
      />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <HeroBg
        blob1="rgba(124,58,237,0.10)"
        blob2="rgba(212,212,216,0.07)"
        className="min-h-[520px] flex items-center justify-center py-24 px-4"
      >
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <SectionReveal>
            <GradTag className="mb-2">Glossaire</GradTag>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Le lexique du{' '}
              <GradText as="span" className="grad-text">
                digital et de l&apos;IA.
              </GradText>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.14}>
            <p className="text-text-secondary text-lg max-w-xl">
              Toutes les définitions clés du web, du SEO et de l&apos;intelligence artificielle expliquées simplement pour les PME suisses.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.18}>
            <p className="text-sm font-medium" style={{ color: '#D4D4D8' }}>
              65 termes · 5 catégories · Mis à jour en 2026
            </p>
          </SectionReveal>
        </div>
      </HeroBg>

      {/* ------------------------------------------------------------------ */}
      {/* STICKY SEARCH + ALPHABETIC NAV                                      */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="sticky top-14 z-40 w-full border-b border-border"
        style={{
          background: 'rgba(14,14,14,0.90)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4">

          {/* ── Desktop (md+): search + separator + letters in one row ── */}
          <div className="hidden md:flex items-center gap-3 py-2">
            <div className="w-56 flex-shrink-0">
              <GlossaireSearch terms={TERMS.map(t => ({ term: t.term, category: t.category }))} />
            </div>
            <div className="h-5 w-px flex-shrink-0" style={{ background: 'rgba(212,212,216,0.18)' }} />
            <nav aria-label="Navigation alphabétique" className="flex flex-wrap gap-1 items-center">
              {ALL_LETTERS.map((letter) => {
                const isPresent = presentLetters.has(letter)
                return isPresent ? (
                  <a
                    key={letter}
                    href={`#lettre-${letter}`}
                    className="flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold text-white transition-colors duration-150"
                    style={{
                      background: 'rgba(167,139,250,0.10)',
                      border: '1px solid rgba(167,139,250,0.25)',
                    }}
                    aria-label={`Aller à la lettre ${letter}`}
                  >
                    {letter}
                  </a>
                ) : (
                  <span
                    key={letter}
                    className="flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold text-text-muted cursor-default select-none"
                    style={{
                      background: 'rgba(212,212,216,0.04)',
                      border: '1px solid rgba(212,212,216,0.08)',
                    }}
                    aria-hidden="true"
                  >
                    {letter}
                  </span>
                )
              })}
            </nav>
          </div>

          {/* ── Mobile (< md): search on top, letters below ── */}
          <div className="md:hidden flex flex-col gap-2 py-2">
            <GlossaireSearch terms={TERMS.map(t => ({ term: t.term, category: t.category }))} />
            <nav aria-label="Navigation alphabétique" className="flex flex-wrap gap-1 items-center justify-center pb-1">
              {ALL_LETTERS.map((letter) => {
                const isPresent = presentLetters.has(letter)
                return isPresent ? (
                  <a
                    key={letter}
                    href={`#lettre-${letter}`}
                    className="flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold text-white transition-colors duration-150"
                    style={{
                      background: 'rgba(167,139,250,0.10)',
                      border: '1px solid rgba(167,139,250,0.25)',
                    }}
                    aria-label={`Aller à la lettre ${letter}`}
                  >
                    {letter}
                  </a>
                ) : (
                  <span
                    key={letter}
                    className="flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold text-text-muted cursor-default select-none"
                    style={{
                      background: 'rgba(212,212,216,0.04)',
                      border: '1px solid rgba(212,212,216,0.08)',
                    }}
                    aria-hidden="true"
                  >
                    {letter}
                  </span>
                )
              })}
            </nav>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* GLOSSARY BODY                                                       */}
      {/* ------------------------------------------------------------------ */}
      <main className="max-w-[1200px] mx-auto px-4 py-16 flex flex-col gap-16">
        {Array.from(grouped.entries()).map(([letter, terms]) => (
          <LetterSection key={letter} letter={letter} terms={terms} />
        ))}
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* CTA INTERMÉDIAIRE                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4">
        <SectionReveal>
          <div
            className="max-w-2xl mx-auto rounded-[20px] p-10 text-center flex flex-col items-center gap-6"
            style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.20)',
            }}
          >
            <GradTag>Audit gratuit</GradTag>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Votre site est-il{' '}
              <GradText as="span" className="grad-text--ia">
                optimisé pour 2026 ?
              </GradText>
            </h2>
            <p className="text-text-secondary max-w-md">
              Connaitre le vocabulaire, c&apos;est bien. Mettre en pratique pour votre PME, c&apos;est mieux. Réservez un audit gratuit de 30 minutes avec DKDP.
            </p>
            <LiquidMetalButton calLink="david-khazaei/planifier-un-appel">
              Réserver mon audit gratuit
            </LiquidMetalButton>
          </div>
        </SectionReveal>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA FINAL                                                          */}
      {/* ------------------------------------------------------------------ */}
      <CTAFinal />
    </>
  )
}
