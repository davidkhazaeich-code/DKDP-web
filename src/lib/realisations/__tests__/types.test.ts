import { describe, it, expect } from 'vitest'
import { SLUG_REGEX } from '../types'

describe('SLUG_REGEX', () => {
  it('accepts valid kebab slugs with at least two parts', () => {
    expect(SLUG_REGEX.test('goldencash-refonte')).toBe(true)
    expect(SLUG_REGEX.test('cours-informatique-creation')).toBe(true)
    expect(SLUG_REGEX.test('mkr-camp-brand-site')).toBe(true)
  })

  it('rejects single-segment, accents, uppercase, or trailing dash', () => {
    expect(SLUG_REGEX.test('goldencash')).toBe(false)
    expect(SLUG_REGEX.test('GoldenCash-refonte')).toBe(false)
    expect(SLUG_REGEX.test('refonte-goldencash-')).toBe(false)
    expect(SLUG_REGEX.test('cafe-latte')).toBe(true)
    expect(SLUG_REGEX.test('café-latté')).toBe(false)
  })
})
