/**
 * Source unique des prix publics de dkdp.ch (21/09/2026, plan SEO, action D13).
 *
 * Avant ce fichier, la meme prestation avait trois prix selon la page : SEO a
 * 500, 600 ou 650 par mois, site a 2'500 ou 3'500, formation a 150 ou 200 de
 * l'heure, audit IA a 500 ou 490. Google et les assistants IA citaient l'un ou
 * l'autre. Les valeurs ci-dessous sont celles de /tarifs, sauf le site (2'500,
 * le plancher du simulateur de /creation-site-web, qui produit les vrais devis).
 *
 * Regle : un montant public s'ecrit `PRIX.x` ou `chf(PRIX.x)`, jamais en dur
 * dans une page. Le test `src/lib/__tests__/prix-coherents.test.ts` refuse les
 * anciennes valeurs contradictoires. Le catalogue interne de devis vit dans
 * `DEV SPACE/services/`, il n'est pas public et peut differer (fourchettes).
 */
import { formatSwissChf } from '@/lib/format'

export const PRIX = {
  /** Creation de site web : « a partir de ». */
  siteFrom: 2500,
  /** Refonte de site : « a partir de ». */
  refonteFrom: 3500,
  /** SEO : accompagnement mensuel, sans engagement. */
  seoMonthly: 600,
  /** SEO : audit + mise en place, prestation unique. */
  seoAuditOnce: 1500,
  /** SEO : offre autorite, marches competitifs. */
  seoAuthorityMonthly: 1200,
  /** Google Ads : frais de gestion « a partir de », budget media en sus. */
  adsManagementFrom: 400,
  /** Google Ads : budget media minimum recommande. */
  adsBudgetMin: 500,
  /** ChatGPT Ads : pilote de 30 jours, puis gestion mensuelle. */
  chatgptAdsPilot: 1200,
  chatgptAdsMonthly: 450,
  /** Reseaux sociaux : forfait « a partir de ». */
  socialFrom: 450,
  /** Consulting marketing, de l'heure. */
  consultingHourly: 180,
  /** Formation entreprise : tarif horaire, 1 puis 2 personnes ; groupes sur devis. */
  formationHourly1: 200,
  formationHourly2: 300,
  /** Audit IA : standard puis complet. L'appel decouverte de 30 min reste gratuit. */
  auditIaStandard: 490,
  auditIaComplet: 890,
  automatisationFrom: 1500,
  automatisationTo: 3500,
  agentFrom: 2500,
  agentTo: 4900,
  llmFrom: 3500,
  llmTo: 6500,
  /**
   * Chatbot IA (25/09/2026, grille confirmee par David) : formules Essentiel et
   * Pro, sur mesure « a partir de », puis maintenance mensuelle une fois le
   * suivi inclus termine. FR et EN affichaient deja ces montants, mais en dur.
   */
  chatbotEssentiel: 2900,
  chatbotPro: 5500,
  chatbotSurMesureFrom: 8000,
  /** Haut de la fourchette des formules connectees (CRM, agenda, ERP), citee en FAQ. */
  chatbotConnecteTo: 12000,
  chatbotMaintenanceMonthly: 250,
  /**
   * Option « Chatbot IA » du simulateur de /creation-site-web : un module
   * ajoute a un site que DKDP construit, d'ou un prix plus bas que l'Essentiel.
   */
  chatbotOptionSite: 1500,
  /** Duree de l'appel decouverte gratuit, en minutes. */
  discoveryCallMinutes: 30,
  /**
   * Particuliers : dkdp.ch renvoie vers cours-informatique.ch et affiche SA
   * grille (140 de base, 150 a but professionnel, 200 pour l'IA). Jamais un
   * autre chiffre ici : les deux sites doivent dire la meme chose.
   */
  particuliersHourly: 140,
  particuliersProHourly: 150,
  particuliersIaHourly: 200,
} as const

/** « CHF 2'500 », apostrophe suisse, pour un texte visible. */
export function chf(n: number): string {
  return formatSwissChf(n)
}

/** « CHF 600/mois ». */
export function chfMois(n: number): string {
  return `${chf(n)}/mois`
}

/** « CHF 200/h ». */
export function chfHeure(n: number): string {
  return `${chf(n)}/h`
}

export const COURS_INFO_URL = 'https://cours-informatique.ch'
