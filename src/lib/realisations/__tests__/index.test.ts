import { describe, it, expect } from 'vitest'
import {
  REALISATIONS,
  getRealisation,
  getByCategory,
  getByTag,
  getRelated,
} from '../index'
import { SLUG_REGEX } from '../types'

describe('REALISATIONS integrity', () => {
  it('every slug matches SLUG_REGEX', () => {
    for (const r of REALISATIONS) {
      expect(SLUG_REGEX.test(r.slug)).toBe(true)
    }
  })

  it('every dateISO parses to a valid Date', () => {
    for (const r of REALISATIONS) {
      const d = new Date(r.meta.dateISO)
      expect(Number.isNaN(d.getTime())).toBe(false)
    }
  })

  it('every liveUrl when present is https', () => {
    for (const r of REALISATIONS) {
      if (r.liveUrl) {
        expect(r.liveUrl.startsWith('https://')).toBe(true)
      }
    }
  })

  it('slugs are unique', () => {
    const slugs = REALISATIONS.map(r => r.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('helpers', () => {
  it('getRealisation returns null for unknown slug', () => {
    expect(getRealisation('does-not-exist')).toBeNull()
  })

  it('getByCategory returns only matching items', () => {
    const items = getByCategory('site-web')
    expect(items.every(r => r.category === 'site-web')).toBe(true)
  })

  it('getByTag returns only items containing tag', () => {
    const items = getByTag('Refonte')
    expect(items.every(r => r.tags.includes('Refonte'))).toBe(true)
  })

  it('getRelated excludes self and private/archived', () => {
    if (REALISATIONS.length === 0) return
    const slug = REALISATIONS[0].slug
    const related = getRelated(slug, 5)
    expect(related.find(r => r.slug === slug)).toBeUndefined()
    expect(related.every(r => r.meta.status === 'live')).toBe(true)
  })
})
