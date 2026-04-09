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
      'Programme autonome qui enchaine des actions sans intervention humaine : lire un email, extraire des données, mettre à jour un CRM et envoyer une confirmation. Se distingue d\'un chatbot par sa capacité à prendre des décisions sur plusieurs étapes. Réduit de 25 à 45 % les taches administratives répétitives.',
    link: '/intelligence-artificielle/agents-ia',
  },
  {
    term: 'API',
    category: 'Web',
    definition:
      'Interface qui permet à deux logiciels de communiquer. Votre CRM peut ainsi envoyer automatiquement des données à votre outil de facturation ou à votre newsletter. Fondement de toute intégration entre outils digitaux.',
  },
  {
    term: 'AEO',
    category: 'SEO',
    definition:
      'Answer Engine Optimization. Discipline visant à apparaitre dans les réponses générées par les IA (ChatGPT, Perplexity, Google AI Overviews) plutôt que dans les liens bleus classiques. Combine contenu structuré, Schema.org et FAQ pour que l\'IA cite votre site comme source.',
  },
  {
    term: 'Automatisation',
    category: 'IA',
    definition:
      'Remplacement de taches manuelles par des scripts ou des agents IA : relances automatiques, tri d\'emails, mise à jour CRM. Outils courants : Make, Zapier, n8n. Une PME de 15 personnes peut économiser plusieurs centaines d\'heures par an.',
    link: '/intelligence-artificielle',
  },
  // B
  {
    term: 'Backlink',
    category: 'SEO',
    definition:
      'Lien entrant provenant d\'un autre site vers le vôtre. Plus les sites référents sont fiables, plus l\'autorité de votre domaine augmente aux yeux de Google, ce qui améliore directement votre positionnement dans les résultats de recherche.',
  },
  {
    term: 'Bounce rate',
    category: 'Web',
    definition:
      'Taux de rebond. Pourcentage de visiteurs qui quittent un site sans interagir. Un taux élevé signale souvent un problème de pertinence, de temps de chargement ou d\'expérience utilisateur insuffisante.',
  },
  // C
  {
    term: 'CMS',
    category: 'Web',
    definition:
      'Content Management System. Logiciel permettant de gérer et mettre à jour un site sans coder. Les plus courants : WordPress, Sanity, Strapi. Adapté aux équipes non techniques qui ont besoin d\'autonomie sur le contenu.',
  },
  {
    term: 'CRM',
    category: 'General',
    definition:
      'Customer Relationship Management. Logiciel qui centralise contacts, ventes et historique client. Ex. : HubSpot, Salesforce, Pipedrive. Indispensable pour suivre les leads et piloter la relation commerciale au quotidien.',
  },
  {
    term: 'CTR',
    category: 'SEO',
    definition:
      'Click-Through Rate. Ratio entre les impressions et les clics sur un lien dans Google. Un bon CTR (3 à 5 %) signale un titre et une meta description attractifs qui incitent l\'internaute à visiter la page.',
  },
  {
    term: 'Claude',
    category: 'IA',
    definition:
      'Modèle de langage développé par Anthropic, concurrent de ChatGPT et Gemini. Reconnu pour sa précision, sa capacité à suivre des instructions complexes et sa fiabilité sur les taches professionnelles sensibles.',
  },
  {
    term: 'Conversion',
    category: 'Web',
    definition:
      'Action souhaitée accomplie par un visiteur : prise de contact, achat, inscription. Le taux de conversion mesure l\'efficacité d\'une page à transformer un visiteur en prospect ou en client actif.',
  },
  {
    term: 'Core Web Vitals',
    category: 'SEO',
    definition:
      'Métriques Google évaluant l\'expérience utilisateur : LCP (vitesse d\'affichage), INP (interactivité) et CLS (stabilité visuelle). Ces indicateurs influencent directement le classement d\'un site dans les résultats de recherche.',
  },
  {
    term: 'Crawl',
    category: 'SEO',
    definition:
      'Exploration automatique d\'un site par les robots de Google pour découvrir et indexer ses pages. Une structure claire et un sitemap à jour facilitent le crawl et améliorent la couverture d\'indexation.',
  },
  // D
  {
    term: 'DA',
    category: 'SEO',
    definition:
      'Domain Authority. Score de 0 à 100 (Moz) estimant la capacité d\'un domaine à se positionner sur Google, basé principalement sur la qualité et la quantité des backlinks reçus par le site.',
  },
  {
    term: 'DNS',
    category: 'Web',
    definition:
      'Domain Name System. Système qui traduit un nom de domaine (dkdp.ch) en adresse IP lisible par les serveurs. Un DNS bien configuré garantit la disponibilité, la sécurité et la rapidité de résolution du site.',
  },
  // E
  {
    term: 'E-E-A-T',
    category: 'SEO',
    definition:
      'Experience, Expertise, Authoritativeness, Trustworthiness. Cadre Google pour évaluer la fiabilité d\'un contenu. Se traduit concrètement par : biographies d\'auteurs, avis clients vérifiables, adresse physique et certifications affichées sur le site.',
  },
  {
    term: 'ERP',
    category: 'General',
    definition:
      'Enterprise Resource Planning. Logiciel de gestion intégrée couvrant comptabilité, stocks, RH et production. Ex. : SAP, Odoo. Centralise toutes les données de l\'entreprise dans un système unique et cohérent.',
  },
  // F
  {
    term: 'Fine-tuning',
    category: 'IA',
    definition:
      'Entraînement supplémentaire d\'un modèle IA sur des données propres à votre secteur ou entreprise. Améliore la précision du modèle sur vos taches spécifiques, par rapport à un LLM généraliste utilisé sans adaptation.',
  },
  // G
  {
    term: 'GEO',
    category: 'SEO',
    definition:
      'Generative Engine Optimization. Stratégie pour être cité comme source par les IA génératives (ChatGPT, Perplexity, Google AI Overviews). Nécessite contenu structuré en passages citables, statistiques sourcées et autorité d\'auteur (E-E-A-T).',
  },
  {
    term: 'GPT',
    category: 'IA',
    definition:
      'Generative Pre-trained Transformer. Architecture de réseau de neurones développée par OpenAI, à la base de ChatGPT et de nombreux modèles de langage modernes utilisés en entreprise.',
  },
  // H
  {
    term: 'Hallucination',
    category: 'IA',
    definition:
      'Phénomène où un LLM génère des informations fausses formulées avec assurance : statistiques fictives, citations inexistantes. Fréquence : 3 à 15 % selon le sujet. Se corrige avec RAG, vérification humaine ou périmètre de réponse limité.',
  },
  {
    term: 'Hébergement',
    category: 'Web',
    definition:
      'Service qui rend un site accessible sur internet en stockant ses fichiers sur un serveur. Ex. : Vercel, Infomaniak, OVH. Le choix de l\'hébergement impacte la vitesse, la sécurité et indirectement le SEO.',
  },
  // I
  {
    term: 'Indexation',
    category: 'SEO',
    definition:
      'Processus par lequel Google enregistre une page dans sa base de données après l\'avoir crawlée. Sans indexation, une page est totalement invisible dans les résultats de recherche, quels que soient son contenu et sa qualité.',
  },
  {
    term: 'IA générative',
    category: 'IA',
    definition:
      'Branche de l\'IA qui crée du contenu original : texte, images, code, audio. Principaux modèles en 2026 : ChatGPT, Claude, Gemini, Midjourney. Un collaborateur formé peut réduire jusqu\'à 60 % le temps consacré à la rédaction.',
    link: '/intelligence-artificielle',
  },
  // K
  {
    term: 'KPI',
    category: 'General',
    definition:
      'Key Performance Indicator. Indicateur clé de performance permettant de mesurer l\'atteinte d\'un objectif. Ex. : taux de conversion, nombre de leads, coût par acquisition. Outil central du pilotage digital.',
  },
  {
    term: 'Keyword',
    category: 'SEO',
    definition:
      'Mot-clé. Terme ou expression saisi par un internaute dans un moteur de recherche. Le choix et le ciblage des bons mots-clés constituent la base de toute stratégie SEO efficace.',
  },
  // L
  {
    term: 'Landing page',
    category: 'Web',
    definition:
      'Page d\'atterrissage conçue pour convertir un visiteur autour d\'une offre précise. Structurée pour limiter les distractions et maximiser le passage à l\'action : formulaire, réservation ou prise de contact.',
  },
  {
    term: 'LCP',
    category: 'SEO',
    definition:
      'Largest Contentful Paint. Temps d\'affichage du plus grand élément visible (image ou texte). Core Web Vital Google : un LCP inférieur à 2,5 secondes est considéré comme bon pour l\'expérience utilisateur.',
  },
  {
    term: 'LLM',
    category: 'IA',
    definition:
      'Large Language Model. Modèle de langage entraîné sur des milliards de textes, capable de résumer, traduire, rédiger et analyser. Ex. : Claude, GPT-4o, Gemini. Multiplie la productivité des équipes sur les taches textuelles.',
  },
  {
    term: 'LPD',
    category: 'General',
    definition:
      'Loi fédérale sur la Protection des Données. Équivalent suisse du RGPD européen, en vigueur depuis septembre 2023. Régule la collecte, le traitement et le stockage des données personnelles en Suisse.',
  },
  // M
  {
    term: 'Meta description',
    category: 'SEO',
    definition:
      'Courte description affichée sous le titre dans les résultats Google. N\'impacte pas directement le classement, mais une formulation claire et incitative améliore le taux de clic (CTR) vers la page.',
  },
  {
    term: 'Mot-clé longue traine',
    category: 'SEO',
    definition:
      'Expression de recherche spécifique et peu concurrentielle. Ex. : "formation Excel cabinet comptable Genève". Génère moins de trafic mais des visiteurs plus qualifiés et davantage prêts à convertir.',
  },
  // N
  {
    term: 'No-code',
    category: 'General',
    definition:
      'Développement sans écriture de code via des outils visuels : Make, Zapier, Bubble, Webflow. Permet à des non-développeurs de créer des automatisations, des formulaires et des interfaces simples en toute autonomie.',
  },
  // O
  {
    term: 'On-page SEO',
    category: 'SEO',
    definition:
      'Optimisation des éléments directement sur la page : balises title et Hn, maillage interne, vitesse de chargement, structure du contenu et présence des mots-clés cibles dans les zones stratégiques.',
  },
  // P
  {
    term: 'Prompt',
    category: 'IA',
    definition:
      'Instruction textuelle envoyée à un LLM. Un bon prompt précise le contexte, le format attendu et les contraintes. Le prompt engineering est une compétence clé : il améliore significativement la qualité et la précision des réponses obtenues.',
  },
  {
    term: 'PWA',
    category: 'Web',
    definition:
      'Progressive Web App. Application web installable sur l\'écran d\'accueil d\'un smartphone, fonctionnant comme une app native. Offre une expérience rapide, accessible hors ligne, sans passer par un store applicatif.',
  },
  // R
  {
    term: 'RAG',
    category: 'IA',
    definition:
      'Retrieval-Augmented Generation. Technique qui connecte un LLM à une base de données externe pour des réponses actualisées et vérifiables. Permet à vos collaborateurs d\'interroger vos documents internes via un chatbot. Réduit les hallucinations de 30 à 50 %.',
  },
  {
    term: 'Redirect 301',
    category: 'SEO',
    definition:
      'Redirection permanente d\'une URL vers une autre. Transfère l\'autorité SEO de l\'ancienne page vers la nouvelle. Indispensable lors d\'une refonte de site ou d\'un changement de structure d\'URL.',
  },
  {
    term: 'RGPD',
    category: 'General',
    definition:
      'Règlement Général sur la Protection des Données. Règlement européen encadrant la collecte et le traitement des données personnelles. S\'applique à toute entreprise traitant des données de résidents européens.',
  },
  {
    term: 'ROI',
    category: 'General',
    definition:
      'Return on Investment. Retour sur investissement. Mesure la rentabilité d\'une action par rapport à son coût. Formule : (gain - coût) / coût x 100. Indicateur clé pour arbitrer les dépenses digitales et marketing.',
  },
  // S
  {
    term: 'Schema.org',
    category: 'SEO',
    definition:
      'Vocabulaire de balisage structuré permettant aux moteurs de recherche et aux IA de mieux comprendre le contenu d\'une page. Améliore l\'affichage dans les SERP : rich snippets, FAQ, étoiles de notation.',
  },
  {
    term: 'SEA',
    category: 'SEO',
    definition:
      'Search Engine Advertising. Publicité dans les moteurs de recherche (Google Ads, Bing Ads). Génère du trafic immédiat mais payant, contrairement au SEO qui produit des résultats organiques durables sans coût au clic.',
  },
  {
    term: 'SEO',
    category: 'SEO',
    definition:
      'Search Engine Optimization. Ensemble de techniques visant à améliorer la visibilité organique d\'un site dans Google. Comprend le contenu, la technique, les backlinks et l\'expérience utilisateur.',
  },
  {
    term: 'SERP',
    category: 'SEO',
    definition:
      'Search Engine Results Page. Page de résultats d\'un moteur de recherche. Les 3 premiers résultats captent environ 54 % des clics organiques totaux. La position 1 reste l\'objectif SEO prioritaire.',
  },
  {
    term: 'SSL/TLS',
    category: 'Web',
    definition:
      'Protocole sécurisant les échanges entre navigateur et serveur (cadenas HTTPS). Obligatoire : sans SSL, Google affiche un avertissement de sécurité et pénalise le classement du site dans les résultats.',
  },
  // T
  {
    term: 'Token',
    category: 'IA',
    definition:
      'Unité de traitement d\'un LLM, correspondant à environ 3/4 d\'un mot en français. Les LLM facturent à la consommation de tokens. Un email de 300 mots représente environ 400 tokens en entrée.',
  },
  {
    term: 'Trafic organique',
    category: 'SEO',
    definition:
      'Visites générées par les résultats naturels et non payants d\'un moteur de recherche. Contrairement au trafic payant (SEA), il ne s\'arrête pas lorsqu\'un budget publicitaire est coupé.',
  },
  // U
  {
    term: 'UI',
    category: 'Web',
    definition:
      'User Interface. Interface utilisateur. L\'ensemble des éléments visuels avec lesquels l\'utilisateur interagit : boutons, menus, formulaires. Une bonne UI rend le parcours clair, intuitif et agréable à utiliser.',
  },
  {
    term: 'URL',
    category: 'Web',
    definition:
      'Uniform Resource Locator. Adresse unique d\'une page web. Une URL courte, descriptive et bien structurée améliore le SEO et aide les utilisateurs à comprendre le contenu avant même de cliquer.',
  },
  {
    term: 'UX',
    category: 'Web',
    definition:
      'User Experience. Expérience utilisateur. Qualité globale de l\'interaction avec un site ou un produit : fluidité, logique de navigation, accessibilité. Une bonne UX réduit le taux de rebond et augmente les conversions.',
  },
  // V
  {
    term: 'Vercel',
    category: 'Web',
    definition:
      'Plateforme de déploiement et d\'hébergement optimisée pour Next.js. Déploiement automatique à chaque commit GitHub, CDN mondial et analytics intégrés. Utilisée par DKDP pour tous ses projets clients.',
  },
  // W
  {
    term: 'Webhook',
    category: 'General',
    definition:
      'Mécanisme qui envoie automatiquement des données d\'une application à une autre en temps réel lors d\'un événement. Ex. : notifier Slack à chaque nouveau paiement Stripe ou lead entrant dans le CRM.',
  },
  {
    term: 'WordPress',
    category: 'Web',
    definition:
      'CMS open-source représentant environ 43 % des sites mondiaux. Très flexible grâce à ses extensions, mais nécessite une maintenance régulière pour garantir la sécurité et les performances.',
  },
  {
    term: 'Workflow',
    category: 'General',
    definition:
      'Enchaînement d\'étapes organisées pour accomplir un processus métier. Peut être automatisé avec des outils no-code (Make, Zapier) ou des agents IA, réduisant les erreurs et le temps de traitement.',
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
        className="sticky top-[66px] z-40 w-full border-b border-white/[0.06]"
        style={{
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
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
