import { describe, it, expect } from 'vitest'
import { publicPageUrl, siteHost, studyLiveUrl } from '../links'
import { REALISATIONS } from '../index'

describe('liens vers les sites livres', () => {
  it('construit l URL publique d une page', () => {
    expect(publicPageUrl('sos-relevage.ch', '/urgence-inondation-geneve')).toBe('https://sos-relevage.ch/urgence-inondation-geneve')
    expect(publicPageUrl('https://mkrcamp.com/', '/inscription')).toBe('https://mkrcamp.com/inscription')
    expect(publicPageUrl('goldencash.ch', undefined)).toBe('https://goldencash.ch/')
    expect(publicPageUrl(undefined, '/')).toBeNull()
  })

  it('ne lie jamais un espace prive', () => {
    for (const p of ['/admin', '/admin/dossiers', '/pro/leads', '/app', '/login', '/compte']) {
      expect(publicPageUrl('exemple.ch', p)).toBeNull()
    }
    expect(publicPageUrl('exemple.ch', '/administration-de-biens')).toBe('https://exemple.ch/administration-de-biens')
  })

  it('affiche le domaine nu', () => {
    expect(siteHost('https://goldencash.ch')).toBe('goldencash.ch')
    expect(siteHost('https://mkrcamp.com/')).toBe('mkrcamp.com')
  })

  it('une etude anonyme ne renvoie jamais vers le site du client', () => {
    expect(studyLiveUrl({ liveUrl: 'https://x.ch', client: { name: 'X', sector: 's', anonymized: true } })).toBeNull()
    expect(studyLiveUrl({ liveUrl: 'https://x.ch', client: { name: 'X', sector: 's' } })).toBe('https://x.ch')
  })

  it('aucune section phare publiee ne pointe vers un back-office', () => {
    const links = REALISATIONS.filter((r) => r.meta.status === 'live' && !r.client.anonymized).flatMap((r) =>
      (r.highlights ?? []).map((h) => publicPageUrl(h.image.host ?? r.hero?.browserUrl, h.image.path)),
    )
    expect(links.some((u) => u && /\/admin(\/|$)/.test(u))).toBe(false)
    expect(links.filter(Boolean).every((u) => u!.startsWith('https://'))).toBe(true)
  })
})
