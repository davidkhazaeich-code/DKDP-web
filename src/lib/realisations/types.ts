/**
 * Source de verite des realisations DKDP.
 * Pattern aligne sur src/lib/blog/types.ts
 *
 * v2 (2026-09-25) : une realisation couvre n'importe quel domaine (site,
 * application, IA, automatisation, formation, publicite...), porte un secteur
 * normalise, un niveau d'accord client et des resultats dont chacun a une
 * source et une date. Les regles de preuve sont verifiees par `proof.ts` et
 * par son test : une etude en ligne qui les enfreint fait echouer la suite.
 */

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)+$/

/** Domaines de service, alignes sur les pages service du site (taxonomy.ts). */
export type RealisationDomain =
  | 'site-web'
  | 'application'
  | 'e-commerce'
  | 'seo-geo'
  | 'publicite'
  | 'chatbot-ia'
  | 'automatisation'
  | 'formation-ia'
  | 'identite-visuelle'
  | 'video'

/** Secteurs normalises pour les filtres du hub (libelles dans taxonomy.ts). */
export type RealisationSector =
  | 'batiment'
  | 'metaux-precieux'
  | 'agence-digitale'
  | 'immobilier'
  | 'finance'
  | 'sante'
  | 'sport'
  | 'industrie'
  | 'hotellerie-restauration'
  | 'evenementiel'
  | 'architecture'
  | 'secteur-public'
  | 'informatique'
  | 'commerce'

export type RealisationStatus = 'live' | 'archived' | 'private'
export type StackColor =
  | 'violet' | 'orange' | 'chrome' | 'green'
  | 'blue' | 'pink' | 'teal' | 'amber'

/**
 * Niveau d'accord du client :
 * - `interne` : projet de DKDP ou d'une societe de David, aucun tiers a solliciter ;
 * - `nomme-chiffres` : accord ecrit pour nommer le client ET publier ses chiffres ;
 * - `nomme` : le client est nomme, sans ses donnees privees ;
 * - `anonyme` : ni nom, ni logo, ni lien vers le site du client.
 */
export type ConsentLevel = 'interne' | 'nomme-chiffres' | 'nomme' | 'anonyme'

/**
 * `a-confirmer` : etude deja publiee dont l'accord ecrit est demande. Elle
 * porte une date limite ; passee cette date, le test de preuve echoue et
 * oblige a trancher (accord recu, anonymisation ou retrait).
 */
export type ConsentEvidenceKind = 'accord-ecrit' | 'clause-contrat' | 'a-confirmer'

export interface RealisationConsent {
  level: ConsentLevel
  evidence?: {
    kind: ConsentEvidenceKind
    /** Date de l'accord, ou de la demande pour `a-confirmer` (YYYY-MM-DD). */
    date: string
    /** Ou retrouver la preuve : email, contrat, note. Jamais affiche. */
    reference: string
    /** Obligatoire pour `a-confirmer` (YYYY-MM-DD). */
    deadline?: string
  }
  note?: string
}

/**
 * D'ou vient un chiffre :
 * - `client` : donnees privees du client (Search Console, GA4, Ads, CRM) ;
 *   publiables seulement en `interne` ou `nomme-chiffres` avec accord ecrit ;
 * - `dkdp` : donnees de DKDP sur son propre travail (git, livrables, comptes internes) ;
 * - `publique` : verifiable par n'importe qui (page de resultats, site en ligne, avis public).
 */
export type ResultSourceKind = 'client' | 'dkdp' | 'publique'

export interface RealisationClient {
  name: string
  logo?: string
  /** Libelle affiche du metier, plus precis que le secteur normalise. */
  sector: string
  location?: string
  anonymized?: boolean
}

export interface RealisationMeta {
  /** Titre par intention de recherche, sert de H1. */
  title: string
  excerpt: string
  /** Date de livraison ou de mise en service du projet. */
  dateISO: string
  status: RealisationStatus
  /** Date de publication de l'etude sur dkdp.ch (defaut : dateISO). */
  publishedISO?: string
  /** Revision de fond seulement (nouveaux chiffres, nouveau bloc). */
  dateModifiedISO?: string
  /** Balise title si le H1 depasse la largeur mesuree (tools/check-serp-width.mjs). */
  seoTitle?: string
  /** Meta description, 155 caracteres au plus ; l'excerpt, plus long, sert aux cartes. */
  seoDescription?: string
}

export interface RealisationHero {
  /** Page entiere, defilee dans le cadre de navigateur au survol. */
  desktopFull: string
  mobileFull?: string
  browserUrl: string
  /** Premier ecran a la taille de l'ecran (1440x900), pour les compositions. */
  desktopView?: string
  /** Premier ecran mobile (390x844 en 2x), pose dans le cadre de telephone. */
  mobileView?: string
}

/** Composition ordinateur et telephone rendue a partir des vraies captures
 *  (tools/realisations/render-mockup.mjs) : visuel du hub et des cartes. */
export interface RealisationMockup {
  src: string
  alt: string
}

/** Visuel de carte et d'apercu social pour un projet sans site a capturer. */
export interface RealisationCover {
  src: string
  alt: string
  /** Vrai : la couverture est aussi le visuel principal de la page (mockup,
   *  document), et le schema de flux passe apres l'approche. Faux ou absent :
   *  la couverture ne sert qu'aux cartes et a l'apercu social. */
  lead?: boolean
}

export interface RealisationProblem {
  title: string
  /** Sauts de paragraphe autorises (`\n\n`), le premier paragraphe est compose en accroche. */
  body: string
  /** Fiche courte en colonne gauche : metier, public, territoire, point de depart. */
  facts?: { label: string; value: string }[]
  illustration?: { src: string; alt: string; caption?: string }
}

export interface RealisationApproach {
  title: string
  body: string
  bullets?: string[]
  diagramHtml?: string
}

export interface RealisationStackChip {
  label: string
  color: StackColor
}

export interface RealisationResult {
  metric: string
  value: string
  label: string
  /** Nommee telle quelle : « Search Console », « historique git du projet »... */
  source: string
  sourceKind: ResultSourceKind
  /** Date du releve (YYYY-MM-DD). */
  capturedAt: string
  /** Fenetre mesuree, en toutes lettres : « 28 jours, du 27.08 au 23.09.2026 ». */
  period?: string
  trend?: number[]
}

export interface RealisationTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
  /** Ou la citation a ete publiee : « Avis Google », « email du 12.10.2026 »... */
  source: string
  /** YYYY-MM-DD */
  date: string
  url?: string
  /** Vrai quand la citation est traduite (overlay anglais d'un avis en francais). */
  translated?: boolean
}

export interface RealisationGalleryItem {
  src: string
  alt: string
  caption?: string
  /** Page de document (rapport, support) : affichee comme une feuille, ouvrable en grand. */
  document?: boolean
}

/** Une section phare : capture d'ecran, vue mobile optionnelle, texte, et le
 *  parcours en etapes quand la section est un tunnel. */
export interface RealisationHighlight {
  /** Le moment du parcours visiteur, ex. « Arriver », « Demander ». */
  eyebrow: string
  /** Angle du bloc : UX, UI, Contenu, SEO, GEO... */
  tag: string
  title: string
  body: string
  /** `host` remplace le domaine de `hero.browserUrl` dans la barre d'adresse
   *  (etude sans capture principale, ou section prise sur un autre site). */
  image: { src: string; alt: string; path?: string; host?: string }
  phone?: { src: string; alt: string }
  steps?: string[]
  points?: string[]
}

/** Titre et intro du bloc des sections phares, quand le texte par defaut
 *  (le parcours d'un visiteur sur un site) ne decrit pas l'etude. */
export interface RealisationShowcase {
  title: string
  intro: string
}

/** Direction visuelle : logo, palette, typographie, principes. */
export interface RealisationDirection {
  intro?: string
  logo?: { src: string; alt: string }
  tagline?: string
  palette: { name: string; hex: string; role: string }[]
  type: { role: string; family: string; sample: string; mono?: boolean }[]
  principles: { title: string; body: string }[]
}

/** Direction SEO et GEO : apercu de resultat Google, pages par intention,
 *  donnees structurees, choix pour les moteurs generatifs. */
export interface RealisationSeo {
  intro?: string
  serp: { siteName: string; url: string; title: string; description: string; favicon?: string }
  intents: { label: string; path: string }[]
  schemas: string[]
  geo: { title: string; body: string }[]
}

/** Schema de flux : rend visible un projet sans ecran (automatisation, CRM, chatbot). */
export type FlowStepKind = 'source' | 'ia' | 'outil' | 'sortie' | 'controle'

export interface RealisationFlow {
  title: string
  intro?: string
  steps: { label: string; detail?: string; kind?: FlowStepKind }[]
  note?: string
}

/** Courte video d'interaction, sans son, chargee a l'ecran seulement. */
export interface RealisationVideo {
  /** MP4 H.264, sert de source de repli et d'URL VideoObject. */
  src: string
  webm?: string
  poster: string
  title: string
  description: string
  durationSec: number
  /** YYYY-MM-DD */
  uploadDate: string
  width: number
  height: number
  /** Ce que montre la video, en texte : lisible par Google et par un lecteur d'ecran. */
  transcript?: string
}

export interface RealisationBeforeAfter {
  before: { src: string; alt: string; label: string }
  after: { src: string; alt: string; label: string }
  caption?: string
}

/** Courbe datee : une serie reelle, rendue en SVG statique avec son tableau. */
export interface RealisationDataStory {
  id: string
  title: string
  /** Unite au pluriel, en minuscules : « impressions », « clics ». */
  unit: string
  series: { date: string; value: number }[]
  annotations?: { date: string; label: string }[]
  source: string
  sourceKind: ResultSourceKind
  /** Date du releve (YYYY-MM-DD). */
  capturedAt: string
  /** Fenetre et agregation, en toutes lettres. */
  period: string
  caption?: string
}

/** Conversation rejouee : un echange reel avec un assistant, anonymise. */
export interface RealisationConversation {
  title: string
  intro?: string
  turns: { role: 'visiteur' | 'assistant'; text: string }[]
  note?: string
}

/** Formation : format, public, seances, un prompt avant et apres. */
export interface RealisationTraining {
  format: string
  audience: string
  sessions: { title: string; content: string }[]
  promptBeforeAfter?: { before: string; after: string; comment: string }
}

export interface RealisationFaqItem {
  question: string
  answer: string
}

export interface Realisation {
  slug: string
  client: RealisationClient
  meta: RealisationMeta
  /** Le premier domaine est le domaine principal (etiquette, page service liee). */
  domains: RealisationDomain[]
  sector: RealisationSector
  consent: RealisationConsent
  /** Auteur de l'etude, affiche en signature et dans le JSON-LD. Defaut : david. */
  author?: 'david' | 'romane'
  tags: string[]
  /** Reponse directe en tete de page, 60 mots au plus : qui, quoi, quel resultat. */
  answer?: string
  /** Fiche projet affichee sous la reponse directe. */
  facts?: { label: string; value: string }[]
  hero?: RealisationHero
  mockup?: RealisationMockup
  cover?: RealisationCover
  problem: RealisationProblem
  approach: RealisationApproach
  flow?: RealisationFlow
  videos?: RealisationVideo[]
  beforeAfter?: RealisationBeforeAfter[]
  dataStories?: RealisationDataStory[]
  conversation?: RealisationConversation
  training?: RealisationTraining
  stack?: RealisationStackChip[]
  results?: RealisationResult[]
  /** « Ce que nous referions autrement » : deux ou trois lecons vecues. */
  lessons?: string[]
  testimonial?: RealisationTestimonial
  faq?: RealisationFaqItem[]
  gallery?: RealisationGalleryItem[]
  highlights?: RealisationHighlight[]
  showcase?: RealisationShowcase
  direction?: RealisationDirection
  seo?: RealisationSeo
  /** Slugs d'articles du blog tires du projet ou utiles au meme lecteur. */
  relatedArticles?: string[]
  liveUrl?: string
}
