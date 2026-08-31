import { describe, it, expect } from 'vitest'
import { ROUTES, REDIRECTS } from '@/lib/routes'
import { FR_TO_EN } from '@/i18n/slugs'

/**
 * Garde-fous sur la source de vérité SEO.
 *
 * Motivation concrète : en renommant /formation-entreprise/web-design en
 * /formation-entreprise/figma le 2026-08-31, un remplacement global a réécrit
 * la SOURCE des deux redirections en même temps que leur destination. Les
 * entrées sont devenues `/figma → /figma`. Le build passait, les tests
 * passaient, et la page serait partie en production en boucle de redirection
 * infinie, donc totalement inaccessible.
 *
 * Ces tests coûtent quelques millisecondes et ferment cette classe de bug.
 */

describe('REDIRECTS', () => {
  it('ne redirige jamais une URL vers elle-même', () => {
    const loops = REDIRECTS.filter((r) => r.source === r.destination)
    expect(loops, `Boucle(s) de redirection : ${loops.map((r) => r.source).join(', ')}`).toEqual([])
  })

  it('ne redirige jamais vers une URL qui est elle-même une source de redirection', () => {
    const sources = new Set(REDIRECTS.map((r) => r.source))
    const chained = REDIRECTS.filter((r) => sources.has(r.destination))
    expect(
      chained,
      `Redirection en chaîne (deux sauts) : ${chained.map((r) => `${r.source} → ${r.destination}`).join(', ')}`,
    ).toEqual([])
  })

  it('ne déclare pas comme source une URL encore servie dans ROUTES', () => {
    const served = new Set(ROUTES.map((r) => r.url))
    const shadowed = REDIRECTS.filter((r) => served.has(r.source))
    expect(
      shadowed,
      `URL à la fois servie et redirigée : ${shadowed.map((r) => r.source).join(', ')}`,
    ).toEqual([])
  })

  it('pointe vers une destination interne connue', () => {
    const served = new Set(ROUTES.map((r) => r.url))
    const orphans = REDIRECTS.filter((r) => {
      // Les destinations EN et les routes dynamiques (:slug) ne sont pas dans ROUTES.
      if (r.destination.startsWith('/en/')) return false
      if (r.destination.includes(':')) return false
      return !served.has(r.destination)
    })
    expect(
      orphans,
      `Redirection vers une page absente de ROUTES : ${orphans.map((r) => r.destination).join(', ')}`,
    ).toEqual([])
  })
})

describe('ROUTES', () => {
  it('ne contient pas de doublon', () => {
    const seen = new Set<string>()
    const dupes: string[] = []
    for (const r of ROUTES) {
      if (seen.has(r.url)) dupes.push(r.url)
      seen.add(r.url)
    }
    expect(dupes, `URL en double : ${dupes.join(', ')}`).toEqual([])
  })

  it('déclare une priorité valide', () => {
    const invalid = ROUTES.filter((r) => r.priority < 0 || r.priority > 1)
    expect(invalid.map((r) => r.url)).toEqual([])
  })

  it('déclare un lastModified au format ISO quand il est présent', () => {
    const malformed = ROUTES.filter((r) => r.lastModified !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(r.lastModified))
    expect(malformed.map((r) => r.url)).toEqual([])
  })
})

describe('Miroir FR / EN', () => {
  it('ne mappe que des pages FR réellement servies', () => {
    const served = new Set(ROUTES.map((r) => r.url))
    const orphans = Object.keys(FR_TO_EN).filter((fr) => fr !== '/' && !served.has(fr))
    expect(
      orphans,
      `Slug EN déclaré pour une page FR absente de ROUTES : ${orphans.join(', ')}`,
    ).toEqual([])
  })

  it('expose la page Figma dans les deux langues', () => {
    expect(ROUTES.some((r) => r.url === '/formation-entreprise/figma')).toBe(true)
    expect(FR_TO_EN['/formation-entreprise/figma']).toBe('/corporate-training/figma')
  })

  it('redirige les anciennes URL web design vers la page Figma', () => {
    const fr = REDIRECTS.find((r) => r.source === '/formation-entreprise/web-design')
    const en = REDIRECTS.find((r) => r.source === '/en/corporate-training/web-design')
    expect(fr?.destination).toBe('/formation-entreprise/figma')
    expect(fr?.permanent).toBe(true)
    expect(en?.destination).toBe('/en/corporate-training/figma')
    expect(en?.permanent).toBe(true)
  })
})
