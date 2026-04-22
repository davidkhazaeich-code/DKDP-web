/**
 * DKDP — Source de vérité SEO
 *
 * RÈGLE : Toute modification d'URL sur ce site DOIT passer par ce fichier.
 * - Nouvelle page ajoutée → ajouter dans ROUTES
 * - Page supprimée → retirer de ROUTES, ajouter une entrée dans REDIRECTS
 * - URL changée → mettre à jour dans ROUTES, ajouter l'ancienne URL dans REDIRECTS
 *
 * Le sitemap (app/sitemap.ts) et les redirections (next.config.ts)
 * se génèrent automatiquement depuis ce fichier.
 */

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type Route = {
  /** URL relative depuis la racine, ex: '/agence-digitale' */
  url: string
  /** Priorité pour les robots de recherche, entre 0.0 et 1.0 */
  priority: number
  /** Fréquence de mise à jour estimée */
  changeFrequency: ChangeFrequency
}

export type Redirect = {
  /** Ancienne URL (source) */
  source: string
  /** Nouvelle URL (destination) */
  destination: string
  /** true = 301 permanent, false = 302 temporaire */
  permanent: boolean
}

export const ROUTES: Route[] = [

  // ─── Hub ──────────────────────────────────────────────────────────────────
  { url: '/',                          priority: 1.00, changeFrequency: 'weekly'  },
  { url: '/agence-digitale',           priority: 0.90, changeFrequency: 'monthly' },
  { url: '/intelligence-artificielle', priority: 0.90, changeFrequency: 'monthly' },
  { url: '/formation-entreprise',      priority: 0.90, changeFrequency: 'monthly' },

  // ─── Agence Digitale — Services ───────────────────────────────────────────
  { url: '/agence-digitale/creation-site-web',              priority: 0.85, changeFrequency: 'monthly' },
  { url: '/agence-digitale/refonte-site-web',               priority: 0.85, changeFrequency: 'monthly' },
  { url: '/agence-digitale/developpement-application',      priority: 0.85, changeFrequency: 'monthly' },
  { url: '/agence-digitale/seo',                  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/agence-digitale/publicite-sea',        priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/reseaux-sociaux',      priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/creation-video',       priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/consulting-marketing', priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/rgpd-cookies',         priority: 0.70, changeFrequency: 'monthly' },

  // ─── Agence Digitale — Audits & outils (lead gen haute valeur) ─────────────
  { url: '/agence-digitale/seo/audit-seo',                  priority: 0.75, changeFrequency: 'monthly' },
  { url: '/agence-digitale/creation-site-web/audit-site',   priority: 0.75, changeFrequency: 'monthly' },
  { url: '/agence-digitale/creation-site-web/estimation',   priority: 0.80, changeFrequency: 'monthly' },

  // ─── Pages Ville (SEO local) ───────────────────────────────────────────────
  { url: '/agence-digitale/geneve',    priority: 0.85, changeFrequency: 'monthly' },
  { url: '/agence-digitale/lausanne',  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/agence-digitale/nyon',      priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/fribourg',  priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/sion',      priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/neuchatel', priority: 0.80, changeFrequency: 'monthly' },
  { url: '/agence-digitale/morges',    priority: 0.75, changeFrequency: 'monthly' },
  { url: '/agence-digitale/montreux',  priority: 0.75, changeFrequency: 'monthly' },

  // ─── Intelligence Artificielle ────────────────────────────────────────────
  { url: '/intelligence-artificielle/agents-ia',    priority: 0.85, changeFrequency: 'monthly' },
  { url: '/intelligence-artificielle/automatisation', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/intelligence-artificielle/audit-conseil', priority: 0.80, changeFrequency: 'monthly' },
  { url: '/intelligence-artificielle/mise-en-place', priority: 0.80, changeFrequency: 'monthly' },
  { url: '/intelligence-artificielle/chatbot-ia',   priority: 0.85, changeFrequency: 'monthly' },
  { url: '/intelligence-artificielle/geneve',       priority: 0.85, changeFrequency: 'monthly' },

  // ─── Formation Entreprise ─────────────────────────────────────────────────
  { url: '/formation-entreprise/claude-ai',       priority: 0.85, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/ia',              priority: 0.85, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/bureautique',     priority: 0.80, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/web-design',      priority: 0.75, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/cybersecurite',   priority: 0.75, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/reseaux-sociaux', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/informatique',    priority: 0.75, changeFrequency: 'monthly' },
  { url: '/formation-entreprise/montage-video',   priority: 0.75, changeFrequency: 'monthly' },

  // ─── Formation Particuliers ───────────────────────────────────────────────
  { url: '/formation-particuliers', priority: 0.80, changeFrequency: 'monthly' },

  // ─── Agence & Contact ─────────────────────────────────────────────────────
  { url: '/contact',   priority: 0.70, changeFrequency: 'monthly' },
  { url: '/tarifs',    priority: 0.80, changeFrequency: 'monthly' },
  { url: '/a-propos',  priority: 0.70, changeFrequency: 'monthly' },

  // ─── Contenu & Ressources ─────────────────────────────────────────────────
  { url: '/blog',      priority: 0.75, changeFrequency: 'weekly'  },
  { url: '/glossaire', priority: 0.70, changeFrequency: 'weekly'  },

  // ─── Utilitaires / Légales ────────────────────────────────────────────────
  { url: '/plan-du-site',                    priority: 0.30, changeFrequency: 'yearly' },
  { url: '/mentions-legales',                priority: 0.20, changeFrequency: 'yearly' },
  { url: '/politique-de-confidentialite',    priority: 0.20, changeFrequency: 'yearly' },
  { url: '/conditions-generales-de-vente',   priority: 0.20, changeFrequency: 'yearly' },

]

/**
 * Redirections 301/302
 * Ajouter ici quand une URL change ou qu'une page est supprimée.
 * Ces redirections sont automatiquement appliquées via next.config.ts.
 *
 * Historique — redirections migrées depuis l'ancienne structuré d'URL :
 */
export const REDIRECTS: Redirect[] = [

  // ─── Service Digital — ancien site ────────────────────────────────────────
  { source: '/creation-site-internet-geneve',          destination: '/agence-digitale/creation-site-web',    permanent: true },
  { source: '/referencement-naturel-seo',              destination: '/agence-digitale/seo',                  permanent: true },
  { source: '/référencement-naturel-seo',              destination: '/agence-digitale/seo',                  permanent: true },
  { source: '/publicite-google-sea',                   destination: '/agence-digitale/publicite-sea',        permanent: true },
  { source: '/gestion-reseaux-sociaux-publicite',      destination: '/agence-digitale/reseaux-sociaux',      permanent: true },
  { source: '/creation-video-geneve',                  destination: '/agence-digitale/creation-video',       permanent: true },
  { source: '/consulting-strategie-marketing-geneve',  destination: '/agence-digitale/consulting-marketing', permanent: true },
  { source: '/consulting-stratégie-marketing-geneve',  destination: '/agence-digitale/consulting-marketing', permanent: true },
  { source: '/rgpd-gestion-des-cookies',               destination: '/agence-digitale/rgpd-cookies',         permanent: true },

  // ─── Intelligence Artificielle — ancien site ──────────────────────────────
  { source: '/intelligence-artificielle-agent-ia-et-automatisation', destination: '/intelligence-artificielle', permanent: true },

  // ─── Formation — ancien site ──────────────────────────────────────────────
  { source: '/formation-ia-pour-entreprise-suisse-romande', destination: '/formation-entreprise/ia',  permanent: true },
  { source: '/formation-informatique-entreprise-geneve',    destination: '/formation-entreprise',     permanent: true },

  // ─── Réalisations — ancien site ───────────────────────────────────────────
  { source: '/nos-realisations',         destination: '/', permanent: true },
  { source: '/nos-realisations/:slug',   destination: '/', permanent: true },

  // ─── Correction bug URL accentuée (2026-04-21) ─────────────────────────────
  // L'URL avec accent avait été indexée dans le site par erreur ; le routing
  // Next.js n'a jamais matché cette variante, donc 404. Redirect conservatoire
  // au cas où Google aurait indexé l'ancienne forme.
  { source: '/agence-digitale/développement-application', destination: '/agence-digitale/developpement-application', permanent: true },

]
