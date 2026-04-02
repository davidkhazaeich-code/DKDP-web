import { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/blog-data'

const BASE = 'https://dkdp.ch'

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

function entry(url: string, priority: number, changeFrequency: ChangeFreq) {
  return {
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [

    // ─── Hub ─────────────────────────────────────────────────────────────────
    entry('/',                          1.00, 'weekly'),
    entry('/agence-digitale',           0.90, 'weekly'),
    entry('/intelligence-artificielle', 0.90, 'weekly'),
    entry('/formation-entreprise',      0.90, 'weekly'),

    // ─── Service Digital ─────────────────────────────────────────────────────
    entry('/agence-digitale/creation-site-web',            0.85, 'monthly'),
    entry('/agence-digitale/seo',                          0.85, 'monthly'),
    entry('/agence-digitale/publicite-sea',                0.80, 'monthly'),
    entry('/agence-digitale/reseaux-sociaux',              0.75, 'monthly'),
    entry('/agence-digitale/creation-video',               0.75, 'monthly'),
    entry('/agence-digitale/consulting-marketing',         0.75, 'monthly'),
    entry('/agence-digitale/rgpd-cookies',                 0.60, 'monthly'),

    // ─── Audits gratuits (lead gen haute valeur) ──────────────────────────────
    entry('/agence-digitale/creation-site-web/audit-site', 0.85, 'monthly'),
    entry('/agence-digitale/seo/audit-seo',                0.85, 'monthly'),

    // ─── Intelligence Artificielle ────────────────────────────────────────────
    entry('/intelligence-artificielle/audit-conseil',      0.85, 'monthly'),
    entry('/intelligence-artificielle/agents-ia',          0.80, 'monthly'),
    entry('/intelligence-artificielle/automatisation',     0.80, 'monthly'),
    entry('/intelligence-artificielle/mise-en-place',      0.75, 'monthly'),

    // ─── Formation Entreprise ─────────────────────────────────────────────────
    entry('/formation-entreprise/ia',                      0.85, 'monthly'),
    entry('/formation-entreprise/cybersecurite',           0.75, 'monthly'),
    entry('/formation-entreprise/bureautique',             0.75, 'monthly'),
    entry('/formation-entreprise/reseaux-sociaux',         0.70, 'monthly'),
    entry('/formation-entreprise/web-design',              0.70, 'monthly'),
    entry('/formation-entreprise/montage-video',           0.70, 'monthly'),
    entry('/formation-entreprise/informatique',            0.70, 'monthly'),
    entry('/formation-particuliers',                       0.75, 'monthly'),

    // ─── Contenu & ressources ─────────────────────────────────────────────────
    entry('/blog',              0.80, 'weekly'),
    entry('/glossaire',         0.70, 'monthly'),
    entry('/realisations',      0.75, 'monthly'),

    // ─── Agence ───────────────────────────────────────────────────────────────
    entry('/tarifs',    0.80, 'monthly'),
    entry('/contact',   0.80, 'monthly'),
    entry('/a-propos',  0.65, 'monthly'),

    // ─── Articles de blog ─────────────────────────────────────────────────────
    ...ARTICLES.map((a) =>
      entry(`/blog/${a.slug}`, 0.65, 'monthly')
    ),

    // ─── Utilitaires (pages légales noindex exclues du sitemap) ──────────────
    entry('/plan-du-site', 0.40, 'monthly'),

  ]
}
