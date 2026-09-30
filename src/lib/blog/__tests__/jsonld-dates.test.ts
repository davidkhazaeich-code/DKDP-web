import { describe, it, expect } from 'vitest'
import { ARTICLES } from '../index'
import { buildArticle } from '@/lib/schema'
import type { Article } from '../types'

/**
 * Rich Results Test du 30.09.2026 sur un article du blog
 * (/blog/team-building-ia-journee-cohesion-equipe) : « Valeur de date et heure
 * incorrecte » et « Il manque le fuseau horaire » pour datePublished et
 * dateModified du BlogPosting. Google attend un DateTime ISO 8601 complet,
 * heure et decalage compris, pas la date seule de l'article. Meme defaut que
 * celui des etudes de cas (src/lib/realisations/__tests__/jsonld.test.ts).
 */
const ISO_DATETIME_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
const GENEVA_OFFSETS = ['+01:00', '+02:00']

/** Les dates passees au builder, comme dans src/app/blog/[slug]/page.tsx. */
function blogPosting(a: Article) {
  return buildArticle({
    headline: a.title,
    description: a.seoDescription,
    url: `/blog/${a.slug}`,
    datePublished: a.dateISO,
    dateModified: a.dateModifiedISO ?? a.dateISO,
  })
}

describe('BlogPosting.datePublished et dateModified', () => {
  it('le blog porte des articles, sinon ces tests ne prouvent rien', () => {
    expect(ARTICLES.length).toBeGreaterThan(0)
  })

  it("sont des dates-heures ISO 8601 avec le decalage de Geneve, au jour de l'article", () => {
    for (const a of ARTICLES) {
      const posting = blogPosting(a)
      const days = { datePublished: a.dateISO, dateModified: a.dateModifiedISO ?? a.dateISO }
      for (const [field, day] of Object.entries(days)) {
        const value = posting[field as keyof typeof days]
        expect(value, `${a.slug}, ${field}`).toMatch(ISO_DATETIME_WITH_OFFSET)
        expect(Number.isNaN(Date.parse(value)), `${a.slug}, ${field}`).toBe(false)
        expect(value.slice(0, 10), `${a.slug}, ${field}`).toBe(day)
        expect(GENEVA_OFFSETS, `${a.slug}, ${field}`).toContain(value.slice(19))
      }
    }
  })

  it('tombent a midi heure de Geneve, ete comme hiver, meme sur un serveur en UTC (Vercel)', () => {
    const previous = process.env.TZ
    process.env.TZ = 'UTC'
    try {
      const posting = buildArticle({
        headline: 'Test',
        description: 'Desc',
        url: '/blog/test',
        datePublished: '2026-01-15',
        dateModified: '2026-09-16',
      })
      expect(posting.datePublished).toBe('2026-01-15T12:00:00+01:00')
      expect(posting.dateModified).toBe('2026-09-16T12:00:00+02:00')
    } finally {
      if (previous === undefined) delete process.env.TZ
      else process.env.TZ = previous
    }
  })
})
