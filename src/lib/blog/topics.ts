import type { Article } from './types'
import { ARTICLES } from './index'

/**
 * Selections d'articles pour les sections "veille" et "actualite" des pages.
 *
 * Volontairement a part de index.ts, qui est le fichier d'assemblage du blog :
 * il bouge a chaque publication, donc y poser de la logique de page cree des
 * conflits entre la redaction et le developpement.
 */

/**
 * Les N articles les plus recents, tous sujets confondus.
 *
 * ARTICLES est ordonne a la main dans index.ts : on retrie sur dateISO pour ne
 * pas dependre de cet ordre, qu'une publication peut casser sans le vouloir.
 */
export function getLatestArticles(limit = 8): Article[] {
  return [...ARTICLES]
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, limit)
}

/**
 * Vocabulaire du sujet "Claude / Anthropic".
 * Un article n'a besoin de toucher QU'UN SEUL de ces mots (slug, titre ou tags)
 * pour rejoindre la section veille des pages formation Claude.
 * Elargir cette liste quand Anthropic sort un nom de produit ou de modele inedit.
 */
export const CLAUDE_TOPIC = [
  'claude',
  'anthropic',
  'opus',
  'sonnet',
  'haiku',
  'mcp',
  'agent ia',
  'agentic',
] as const

/** True si l'article touche au moins un des mots du sujet. */
function matchesTopic(article: Article, keywords: readonly string[]): boolean {
  const slug = article.slug.toLowerCase()
  const title = article.title.toLowerCase()
  const tags = article.tags.map((t) => t.toLowerCase())
  return keywords.some((raw) => {
    const k = raw.toLowerCase()
    return slug.includes(k) || title.includes(k) || tags.some((t) => t.includes(k))
  })
}

/**
 * Articles qui parlent d'un sujet, du plus recent au plus ancien.
 *
 * Rien n'est fige : la liste est recalculee a chaque rendu depuis ARTICLES, donc
 * publier un article qui touche un des mots-cles suffit a le faire apparaitre en
 * tete, sans toucher a la page ni au composant.
 *
 * Le tri est purement chronologique : c'est la fraicheur qui est promise au
 * visiteur, pas la pertinence.
 */
export function getArticlesByTopic(keywords: readonly string[], limit = 12): Article[] {
  return ARTICLES
    .filter((a) => matchesTopic(a, keywords))
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, limit)
}

/** Nombre total d'articles sur le sujet, cap d'affichage ignore. */
export function countArticlesByTopic(keywords: readonly string[]): number {
  return ARTICLES.filter((a) => matchesTopic(a, keywords)).length
}
