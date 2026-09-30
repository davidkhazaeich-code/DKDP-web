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

describe('dates sans Intl', () => {
  it('formatMonthYear', async () => {
    const { formatMonthYear } = await import('../format')
    expect(formatMonthYear('2026-08-24')).toBe('août 2026')
    expect(formatMonthYear('2026-04-15', 'en')).toBe('April 2026')
  })
  it('formatDateLong', async () => {
    const { formatDateLong } = await import('../format')
    expect(formatDateLong('2026-09-01')).toBe('1er septembre 2026')
    expect(formatDateLong('2026-09-20')).toBe('20 septembre 2026')
    expect(formatDateLong('2026-09-20', 'en')).toBe('20 September 2026')
  })
  it('formatDateShort', async () => {
    const { formatDateShort } = await import('../format')
    expect(formatDateShort('2026-09-05')).toBe('05.09.2026')
  })
})

describe('isoDateTimeZurich', () => {
  it('rend la date a midi avec le decalage de Geneve, ete comme hiver', async () => {
    const { isoDateTimeZurich } = await import('../format')
    expect(isoDateTimeZurich('2026-09-29')).toBe('2026-09-29T12:00:00+02:00')
    expect(isoDateTimeZurich('2026-12-01')).toBe('2026-12-01T12:00:00+01:00')
    expect(isoDateTimeZurich('2026-01-15')).toBe('2026-01-15T12:00:00+01:00')
  })

  it("bascule le dernier dimanche de mars et le dernier dimanche d'octobre", async () => {
    const { isoDateTimeZurich } = await import('../format')
    // 2026 : 29 mars et 25 octobre. 2027 : 28 mars et 31 octobre.
    expect(isoDateTimeZurich('2026-03-28')).toBe('2026-03-28T12:00:00+01:00')
    expect(isoDateTimeZurich('2026-03-29')).toBe('2026-03-29T12:00:00+02:00')
    expect(isoDateTimeZurich('2026-10-24')).toBe('2026-10-24T12:00:00+02:00')
    expect(isoDateTimeZurich('2026-10-25')).toBe('2026-10-25T12:00:00+01:00')
    expect(isoDateTimeZurich('2027-03-27')).toBe('2027-03-27T12:00:00+01:00')
    expect(isoDateTimeZurich('2027-03-28')).toBe('2027-03-28T12:00:00+02:00')
    expect(isoDateTimeZurich('2027-10-30')).toBe('2027-10-30T12:00:00+02:00')
    expect(isoDateTimeZurich('2027-10-31')).toBe('2027-10-31T12:00:00+01:00')
  })

  it('ne depend pas du fuseau du serveur : le build Vercel tourne en UTC', async () => {
    const { isoDateTimeZurich } = await import('../format')
    const previous = process.env.TZ
    process.env.TZ = 'UTC'
    try {
      expect(isoDateTimeZurich('2026-09-29')).toBe('2026-09-29T12:00:00+02:00')
    } finally {
      if (previous === undefined) delete process.env.TZ
      else process.env.TZ = previous
    }
  })
})
