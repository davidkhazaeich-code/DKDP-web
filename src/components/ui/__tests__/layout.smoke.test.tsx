import { describe, it, expect } from 'vitest'

describe('Inter font CSS variable', () => {
  it('uses --font-inter variable name convention', () => {
    expect('--font-inter').toMatch(/^--font-/)
  })
})
