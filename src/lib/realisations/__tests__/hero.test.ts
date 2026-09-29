import { describe, it, expect } from 'vitest'
import { heroProof, heroVisual, splitTitle } from '../hero'
import { REALISATIONS } from '../index'
import { localizeRealisation, hasEnglish } from '../en'
import type { Realisation } from '../types'

function base(): Realisation {
  return {
    slug: 'exemple-hero',
    client: { name: 'Exemple', sector: 'Test', location: 'Genève' },
    meta: { title: 'Titre', excerpt: 'Résumé.', dateISO: '2026-09-01', status: 'live' },
    domains: ['site-web'],
    sector: 'commerce',
    consent: { level: 'interne' },
    tags: [],
    cover: { src: '/images/cover.webp', alt: 'couverture' },
    problem: { title: 'Problème', body: 'Contexte.' },
    approach: { title: 'Approche', body: 'Récit.' },
  }
}

describe('splitTitle', () => {
  it('coupe le titre autour des mots en degrade', () => {
    expect(splitTitle('Site et CRM pour une PME', 'CRM')).toEqual({ before: 'Site et ', accent: 'CRM', after: ' pour une PME' })
  })

  it('garde le titre uni sans accent, ou avec un accent absent du titre', () => {
    expect(splitTitle('Site et CRM', undefined)).toBeNull()
    expect(splitTitle('Site et CRM', '')).toBeNull()
    expect(splitTitle('Site et CRM', 'Application')).toBeNull()
  })
})

describe('heroVisual', () => {
  it('un site montre ses appareils, premier ecran d abord', () => {
    const r = base()
    r.hero = { desktopFull: '/full.webp', desktopView: '/view.webp', mobileView: '/phone.webp', browserUrl: 'exemple.ch' }
    expect(heroVisual(r)).toEqual({ kind: 'devices', desktop: '/view.webp', phone: '/phone.webp', browserUrl: 'exemple.ch' })
  })

  it('un livrable pose ses deux premieres pages de la galerie', () => {
    const r = base()
    r.heroStack = 'slides'
    r.gallery = [
      { src: '/photo.webp', alt: 'photo' },
      { src: '/slide-1.webp', alt: 'slide 1', document: true },
      { src: '/slide-2.webp', alt: 'slide 2', document: true },
      { src: '/slide-3.webp', alt: 'slide 3', document: true },
    ]
    expect(heroVisual(r)).toEqual({
      kind: 'stack',
      format: 'slides',
      images: [
        { src: '/slide-1.webp', alt: 'slide 1' },
        { src: '/slide-2.webp', alt: 'slide 2' },
      ],
    })
  })

  it('sans site ni pages : le flux, puis le programme, puis la couverture', () => {
    const r = base()
    r.training = { format: 'f', audience: 'a', sessions: [{ title: 'S1', content: 'c' }] }
    expect(heroVisual(r)?.kind).toBe('training')
    r.flow = { title: 'Flux', steps: [{ label: 'A' }, { label: 'B' }] }
    expect(heroVisual(r)?.kind).toBe('flow')
    delete r.flow
    delete r.training
    expect(heroVisual(r)).toEqual({ kind: 'cover', src: '/images/cover.webp', alt: 'couverture' })
  })

  it('une pile incomplete passe la main au visuel suivant', () => {
    const r = base()
    r.heroStack = 'pages'
    r.gallery = [{ src: '/page-1.webp', alt: 'page 1', document: true }]
    expect(heroVisual(r)?.kind).toBe('cover')
  })
})

describe('heroProof', () => {
  it('reprend le premier resultat, avec sa date de releve', () => {
    const r = base()
    r.results = [
      { metric: 'Pack local Google', value: '1er', label: 'sur une requête', source: 'relevé manuel', sourceKind: 'publique', capturedAt: '2026-09-20' },
      { metric: 'Autre', value: '2', label: 'x', source: 'git', sourceKind: 'dkdp', capturedAt: '2026-09-21' },
    ]
    expect(heroProof(r)).toEqual({ value: '1er', metric: 'Pack local Google', capturedAt: '2026-09-20' })
  })

  it('rien sans resultat', () => {
    expect(heroProof(base())).toBeNull()
  })
})

describe('les etudes du site ont un hero complet', () => {
  it.each(REALISATIONS.map((r) => [r.slug, r] as const))('%s : visuel, accroche et mots en degrade', (_slug, r) => {
    expect(heroVisual(r)).not.toBeNull()
    expect(r.lead).toBeTruthy()
    expect(splitTitle(r.meta.title, r.meta.titleAccent)).not.toBeNull()
    expect(heroProof(r)).toEqual(r.results?.length ? expect.objectContaining({ value: r.results[0].value }) : null)
  })

  it.each(REALISATIONS.filter((r) => hasEnglish(r.slug)).map((r) => [r.slug, localizeRealisation(r, 'en')] as const))(
    '%s (version anglaise) : mots en degrade trouves dans le titre anglais',
    (_slug, r) => {
      expect(splitTitle(r.meta.title, r.meta.titleAccent)).not.toBeNull()
    },
  )
})
