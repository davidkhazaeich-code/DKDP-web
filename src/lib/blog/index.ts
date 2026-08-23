export type { CategoryKey, BlogImage, Article } from './types'
export { BLOG_CATEGORIES } from './types'

import type { Article } from './types'

import a01 from './chatgpt-claude-copilot-lequel-choisir-pme-2026'
import a02 from './seo-local-geneve-2026'
import a03 from './automatiser-taches-repetitives-pme'
import a04 from './core-web-vitals-2026-guide-complet'
import a05 from './formation-ia-collaborateurs-roi'
import a06 from './site-web-vitrine-convertit'
import a07 from './no-code-low-code-pme-suisse'
import a08 from './cybersecurite-pme-erreurs-courantes'
import a09 from './audit-digital-360-avant-de-se-lancer'
import a10 from './cout-site-web-geneve-2026'
import a11 from './choisir-agence-digitale-geneve'
import a12 from './seo-vs-google-ads-geneve'
import a13 from './refonte-site-web-quand-pourquoi'
import a14 from './formation-ia-entreprise-geneve-2026'
import a15 from './automatiser-taches-repetitives-ia-pme'
import a16 from './creer-site-web-pme-suisse-romande'
import a17 from './ia-ou-consultant-humain-pme'
import a18 from './claude-code-leak-utiliser-ia-comme-infrastructure'
import a19 from './claude-gestion-tokens-optimiser-ia-agence-geneve'
import a20 from './claude-mythos-cybersecurite-ia-2026'
import a21 from './limite-session-claude-gerer-fenetre-contexte'
import a22 from './gpt-5-5-vs-claude-opus-4-7-tests-pratiques-2026'
import a23 from './claude-tpe-pme-romandes'
import a24 from './claude-code-usage-interactif-vs-programmatique'
import a25 from './maitriser-claude-code-10-astuces'
import a26 from './site-web-nextjs-vs-wordpress-webflow-2026'
import a27 from './configurer-claude-code-claude-md-memoire'
import a28 from './deepseek-open-source-donnees-pme'
import a29 from './utiliser-claude-ia-du-chat-aux-agents-guide-2026'

export const FEATURED_SLUG = 'utiliser-claude-ia-du-chat-aux-agents-guide-2026'

export const ARTICLES: Article[] = [
  a29, a28, a27, a26, a25, a24, a23, a22, a21, a01, a02, a03, a04, a05, a06, a07, a08, a09, a10,
  a11, a12, a13, a14, a15, a16, a17, a18, a19, a20,
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const article = getArticle(slug)
  if (!article) return ARTICLES.slice(0, count)
  return ARTICLES.filter((a) => a.slug !== slug)
    .sort((a) => (a.category === article.category ? -1 : 1))
    .slice(0, count)
}
