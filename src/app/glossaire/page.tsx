import type { Metadata } from 'next'
import { GlossaireSearch } from '@/components/sections/GlossaireSearch'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import type { Category, Term } from './_types'
import { LetterSection } from './_components/LetterSection'

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
      'Programme autonome qui peut percevoir son environnement, prendre des décisions et agir pour accomplir un objectif. Les agents IA de DKDP automatisent des workflows entiers sans intervention humaine.',
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
      'Answer Engine Optimization. Optimisation de contenu pour apparaitre dans les réponses des IA comme ChatGPT ou Perplexity.',
  },
  {
    term: 'Automatisation',
    category: 'IA',
    definition:
      'Remplacement de tâches manuelles répétitives par des scripts, des workflows ou des agents IA pour gagner en efficacité.',
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
      'Experience, Expertise, Authoritativeness, Trustworthiness. Critères de qualite utilisés par Google pour évaluer la fiabilité d\'un contenu.',
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
      'Generative Engine Optimization. Optimisation pour être cité par les IA generatives comme sources de référence.',
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
      'Phénomène où un LLM génère des informations fausses mais présentées avec confiance. Risque à connaitre avant tout déploiement IA.',
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
      'IA capable de créer du contenu nouveau : texte, image, code, audio. ChatGPT, Claude et Midjourney en sont des exemples.',
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
      'Large Language Model. Modèle de langage de grande taille (GPT-4, Claude, Mistral) capable de comprendre et générer du texte.',
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
      'Instruction textuelle donnée à un LLM pour obtenir une réponse. La qualité du prompt détermine en grande partie la qualité de la réponse.',
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
      'Retrieval-Augmented Generation. Technique qui connecte un LLM à une base de données externe pour répondre avec des informations actualisées.',
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
      <InfiniteGrid
        accentRgb="212,212,216"
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
      </InfiniteGrid>

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
