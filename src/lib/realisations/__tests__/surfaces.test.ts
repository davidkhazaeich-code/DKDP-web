import { describe, expect, it } from 'vitest'
import { REALISATIONS, realisationsForArticle } from '../index'
import { hasEnglish } from '../en'
import { navRealisations } from '../nav'
import { realisationSlides } from '../slides'

/**
 * Les endroits où les réalisations apparaissent hors du hub (2026-10-01) :
 * méga menu À propos, accueil, blog. Ils doivent rester d'accord avec les
 * données : compte exact, dernière étude publiée, études traduites en anglais.
 */
const live = REALISATIONS.filter((r) => r.meta.status === 'live')

describe('méga menu À propos', () => {
  const nav = navRealisations()

  it('compte les études en ligne, et seulement les traduites en anglais', () => {
    expect(nav.fr.count).toBe(live.length)
    expect(nav.en.count).toBe(live.filter((r) => hasEnglish(r.slug)).length)
  })

  it('montre trois images de présentation qui existent dans les études', () => {
    const srcs = new Set(live.map((r) => r.mockup?.src))
    expect(nav.fr.thumbs).toHaveLength(3)
    for (const t of nav.fr.thumbs) expect(srcs.has(t.src)).toBe(true)
  })

  it('annonce la dernière étude publiée, avec un lien dans la bonne langue', () => {
    const newest = [...live].sort((a, b) =>
      (b.meta.publishedISO ?? b.meta.dateISO).localeCompare(a.meta.publishedISO ?? a.meta.dateISO),
    )[0]
    expect(nav.fr.latest?.href).toBe(`/realisations/${newest.slug}`)
    expect(nav.en.latest?.href.startsWith('/en/portfolio/')).toBe(true)
  })
})

describe('visuel tournant (hub et accueil)', () => {
  it('une diapositive par étude illustrée, lien et points de survol compris', () => {
    const slides = realisationSlides(live, 'fr', 50)
    expect(slides.length).toBe(live.filter((r) => r.mockup || r.cover || r.hero?.desktopView).length)
    for (const s of slides) {
      expect(s.href.startsWith('/realisations/')).toBe(true)
      expect(s.points.length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('articles du blog', () => {
  it('relie un article aux études qui le citent, la plus récente d’abord', () => {
    const items = realisationsForArticle('refonte-site-web-quand-pourquoi', 5)
    expect(items.length).toBeGreaterThan(0)
    for (const r of items) expect(r.relatedArticles).toContain('refonte-site-web-quand-pourquoi')
    const dates = items.map((r) => r.meta.publishedISO ?? r.meta.dateISO)
    expect([...dates].sort().reverse()).toEqual(dates)
  })

  it('ne rend rien pour un article qu’aucune étude ne cite', () => {
    expect(realisationsForArticle('article-qui-n-existe-pas')).toEqual([])
  })
})
