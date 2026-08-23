import { describe, it, expect } from 'vitest'
import { ARTICLES } from '../index'
import { CLAUDE_TOPIC, getArticlesByTopic, countArticlesByTopic } from '../topics'

/**
 * Ces tests protegent la section "Veille et actualite" des pages
 * /formation-entreprise/claude-ai et /en/corporate-training/claude-ai.
 * Elle se remplit toute seule depuis le blog : si le filtre casse, la page
 * continue de s'afficher sans rien signaler. D'ou ces garde-fous.
 */

describe('getArticlesByTopic', () => {
  it('remonte au moins un article pour le sujet Claude', () => {
    expect(getArticlesByTopic(CLAUDE_TOPIC).length).toBeGreaterThan(0)
  })

  it('trie du plus recent au plus ancien', () => {
    const dates = getArticlesByTopic(CLAUDE_TOPIC).map((a) => a.dateISO)
    expect([...dates].sort((x, y) => y.localeCompare(x))).toEqual(dates)
  })

  it('respecte le cap d affichage', () => {
    expect(getArticlesByTopic(CLAUDE_TOPIC, 3)).toHaveLength(3)
  })

  it('ne rend jamais deux fois le meme article', () => {
    const slugs = getArticlesByTopic(CLAUDE_TOPIC).map((a) => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('matche sur le slug, le titre ou les tags, sans tenir compte de la casse', () => {
    const found = getArticlesByTopic(['CLAUDE'])
    for (const a of found) {
      const hay = `${a.slug} ${a.title} ${a.tags.join(' ')}`.toLowerCase()
      expect(hay).toContain('claude')
    }
  })

  it('rend un tableau vide sur un sujet inconnu, sans planter', () => {
    expect(getArticlesByTopic(['sujet-qui-nexiste-pas-du-tout'])).toEqual([])
    expect(getArticlesByTopic([])).toEqual([])
  })

  /**
   * Le coeur de la promesse faite au visiteur : "nous suivons l'actualite".
   * Tout article dont le slug ou le titre parle de Claude DOIT rejoindre la
   * section. S'il en manque un, c'est que le vocabulaire de CLAUDE_TOPIC a pris
   * du retard sur le blog : ajouter le mot manquant plutot que d'ajuster le test.
   */
  it('n oublie aucun article dont le slug ou le titre parle de Claude', () => {
    const attendus = ARTICLES.filter(
      (a) => a.slug.includes('claude') || a.title.toLowerCase().includes('claude'),
    ).map((a) => a.slug)

    const rendus = getArticlesByTopic(CLAUDE_TOPIC, ARTICLES.length).map((a) => a.slug)
    const oublies = attendus.filter((s) => !rendus.includes(s))

    expect(oublies).toEqual([])
  })
})

describe('countArticlesByTopic', () => {
  it('compte le total reel et ignore le cap d affichage', () => {
    const total = countArticlesByTopic(CLAUDE_TOPIC)
    expect(total).toBe(getArticlesByTopic(CLAUDE_TOPIC, ARTICLES.length).length)
    expect(total).toBeGreaterThanOrEqual(getArticlesByTopic(CLAUDE_TOPIC, 3).length)
  })
})
