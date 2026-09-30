import { describe, it, expect } from 'vitest'
import { REALISATIONS } from '../index'
import { localizeRealisation } from '../en'
import { buildRealisationArticle } from '../jsonld'
import type { Realisation } from '../types'
import type { Locale } from '@/i18n/config'

/**
 * Search Console, 30.09.2026 : chaque video des etudes MKR, SOS Relevage et
 * Golden Cash portait « Valeur de date et heure incorrecte pour "uploadDate" »
 * et « Il manque le fuseau horaire ». Google attend un DateTime ISO 8601
 * complet, heure et decalage compris, pas la date seule de la fiche.
 */
const ISO_DATETIME_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/

function uploadDates(r: Realisation, lang: Locale): string[] {
  const article = buildRealisationArticle({ realisation: localizeRealisation(r, lang), lang })
  const videos = (article.video ?? []) as { uploadDate: string }[]
  return videos.map((v) => v.uploadDate)
}

const WITH_VIDEOS = REALISATIONS.filter((r) => (r.videos ?? []).length > 0)

describe('VideoObject.uploadDate', () => {
  it('au moins une etude porte des videos, sinon ces tests ne prouvent rien', () => {
    expect(WITH_VIDEOS.length).toBeGreaterThan(0)
  })

  it.each<Locale>(['fr', 'en'])('est une date-heure ISO 8601 avec fuseau, au jour de la fiche (%s)', (lang) => {
    for (const r of WITH_VIDEOS) {
      const videos = r.videos ?? []
      const dates = uploadDates(r, lang)
      expect(dates).toHaveLength(videos.length)
      dates.forEach((d, i) => {
        expect(d, `${r.slug}, video ${i + 1}`).toMatch(ISO_DATETIME_WITH_OFFSET)
        expect(Number.isNaN(Date.parse(d))).toBe(false)
        expect(d.slice(0, 10)).toBe(videos[i].uploadDate)
      })
    }
  })

  it('tombe a midi, heure de Geneve, ete comme hiver', () => {
    const base = WITH_VIDEOS[0]
    const withDate = (uploadDate: string): Realisation => ({
      ...base,
      videos: [{ ...(base.videos ?? [])[0], uploadDate }],
    })
    expect(uploadDates(withDate('2026-09-29'), 'fr')).toEqual(['2026-09-29T12:00:00+02:00'])
    expect(uploadDates(withDate('2026-12-01'), 'fr')).toEqual(['2026-12-01T12:00:00+01:00'])
  })
})
