import { describe, it, expect } from 'vitest'
import { formatSwissInt, formatSwissChf } from '../format'

describe('formatSwissInt', () => {
  it('groupe les milliers avec une apostrophe', () => {
    expect(formatSwissInt(1050)).toBe("1'050")
    expect(formatSwissInt(1234567)).toBe("1'234'567")
  })

  it('laisse les nombres a trois chiffres intacts', () => {
    expect(formatSwissInt(0)).toBe('0')
    expect(formatSwissInt(999)).toBe('999')
  })

  it('gere le signe negatif', () => {
    expect(formatSwissInt(-2500)).toBe("-2'500")
  })

  it('arrondit avant de grouper', () => {
    expect(formatSwissInt(1049.6)).toBe("1'050")
  })

  it("ne depend pas d'ICU : aucune espace insecable dans la sortie", () => {
    // fr-CH rend U+202F sur ICU recent et U+0027 sur le runtime de Vercel.
    // Cet ecart cassait l'hydratation React (#418) sur les pages a calculateur ROI.
    const out = formatSwissInt(1050)
    expect(out).not.toContain(' ')
    expect(out).not.toContain(' ')
    expect(out).not.toContain('’')
  })
})

describe('formatSwissChf', () => {
  it('prefixe le montant', () => {
    expect(formatSwissChf(5000)).toBe("CHF 5'000")
  })
})
