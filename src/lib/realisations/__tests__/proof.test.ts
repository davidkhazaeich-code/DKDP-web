import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { proofIssues, todayISO } from '../proof'
import { REALISATIONS } from '../index'
import { EN_CONTENT, hasEnglish, localizeRealisation } from '../en'
import { ARTICLES } from '@/lib/blog'
import type { Realisation } from '../types'

/** Une etude minimale conforme, que chaque cas ci-dessous abime d'une seule facon. */
function base(): Realisation {
  return {
    slug: 'exemple-conforme',
    client: { name: 'Exemple', sector: 'Test', location: 'Genève' },
    meta: { title: 'Titre par intention', excerpt: 'Résumé.', dateISO: '2026-09-01', status: 'live' },
    domains: ['site-web'],
    sector: 'commerce',
    consent: { level: 'nomme', evidence: { kind: 'accord-ecrit', date: '2026-09-01', reference: 'email du 01.09' } },
    tags: ['Test'],
    cover: { src: '/images/x.webp', alt: 'x' },
    problem: { title: 'Problème', body: 'Contexte.' },
    approach: { title: 'Approche', body: 'Récit.' },
  }
}

const ids = (r: Realisation, today = '2026-09-25') => proofIssues(r, today).map((i) => i.rule)

describe('proofIssues : une etude conforme ne remonte rien', () => {
  it('etude de base', () => {
    expect(proofIssues(base(), '2026-09-25')).toEqual([])
  })
})

describe('accord client', () => {
  it('un client nomme sans preuve d accord est refuse', () => {
    const r = base()
    r.consent = { level: 'nomme' }
    expect(ids(r)).toContain('consent-evidence')
  })

  it('interne et anonyme n ont pas besoin de preuve', () => {
    const r = base()
    r.consent = { level: 'interne' }
    expect(ids(r)).toEqual([])
    const a = base()
    a.consent = { level: 'anonyme' }
    a.client = { ...a.client, anonymized: true }
    expect(ids(a)).toEqual([])
  })

  it('un accord a confirmer exige une date limite', () => {
    const r = base()
    r.consent = { level: 'nomme', evidence: { kind: 'a-confirmer', date: '2026-09-25', reference: 'demande' } }
    expect(ids(r)).toContain('consent-deadline')
  })

  it('un accord a confirmer echoue apres sa date limite', () => {
    const r = base()
    r.consent = {
      level: 'nomme',
      evidence: { kind: 'a-confirmer', date: '2026-09-25', reference: 'demande', deadline: '2026-10-31' },
    }
    expect(ids(r, '2026-10-31')).toEqual([])
    expect(ids(r, '2026-11-01')).toContain('consent-expired')
  })

  it('les chiffres du client exigent un accord ecrit, pas une clause ni une demande en cours', () => {
    const r = base()
    r.consent = { level: 'nomme-chiffres', evidence: { kind: 'clause-contrat', date: '2026-04-01', reference: 'contrat' } }
    expect(ids(r)).toContain('consent-numbers')
  })

  it('une etude anonyme ne montre ni lien, ni logo, et se declare anonymisee', () => {
    const r = base()
    r.consent = { level: 'anonyme' }
    r.liveUrl = 'https://exemple.ch'
    r.client = { ...r.client, logo: '/logo.png' }
    const rules = ids(r)
    expect(rules).toContain('anonyme-lien')
    expect(rules).toContain('anonyme-logo')
    expect(rules).toContain('anonyme-flag')
  })
})

describe('chiffres sources et dates', () => {
  it('un chiffre prive du client est refuse sans accord pour les chiffres', () => {
    const r = base()
    r.results = [
      { metric: 'Search Console', value: '10', label: 'clics', source: 'Search Console', sourceKind: 'client', capturedAt: '2026-09-20' },
    ]
    expect(ids(r)).toContain('result-client-data')
    r.consent = { level: 'nomme-chiffres', evidence: { kind: 'accord-ecrit', date: '2026-09-01', reference: 'email' } }
    expect(ids(r)).toEqual([])
  })

  it('un chiffre public ou de DKDP passe avec un simple accord de nommer', () => {
    const r = base()
    r.results = [
      { metric: 'Mise en ligne', value: '12 jours', label: 'du premier commit à la production', source: 'historique git', sourceKind: 'dkdp', capturedAt: '2026-09-25' },
      { metric: 'Pack local', value: '1er', label: 'sur une requête', source: 'relevé manuel', sourceKind: 'publique', capturedAt: '2026-09-20' },
    ]
    expect(ids(r)).toEqual([])
  })

  it('un releve date dans le futur ou mal forme est refuse', () => {
    const r = base()
    r.results = [
      { metric: 'X', value: '1', label: 'y', source: 'Search Console', sourceKind: 'publique', capturedAt: '2026-12-01' },
      { metric: 'X', value: '1', label: 'y', source: 'Search Console', sourceKind: 'publique', capturedAt: '25.09.2026' },
    ]
    expect(ids(r).filter((x) => x === 'result-date')).toHaveLength(2)
  })

  it('une courbe de donnees privees suit la meme regle que les chiffres', () => {
    const r = base()
    r.dataStories = [
      {
        id: 'gsc',
        title: 'Impressions',
        unit: 'impressions',
        series: [
          { date: '2026-09-01', value: 1 },
          { date: '2026-09-02', value: 2 },
        ],
        source: 'Search Console',
        sourceKind: 'client',
        capturedAt: '2026-09-25',
        period: 'deux jours',
      },
    ]
    expect(ids(r)).toContain('datastory-client-data')
  })

  it('une courbe non triee par date est refusee', () => {
    const r = base()
    r.consent = { level: 'interne' }
    r.dataStories = [
      {
        id: 'gsc',
        title: 'Impressions',
        unit: 'impressions',
        series: [
          { date: '2026-09-02', value: 1 },
          { date: '2026-09-01', value: 2 },
        ],
        source: 'Search Console',
        sourceKind: 'client',
        capturedAt: '2026-09-25',
        period: 'deux jours',
      },
    ]
    expect(ids(r)).toContain('datastory-order')
  })

  it('un temoignage sans source ni date est refuse', () => {
    const r = base()
    r.testimonial = { quote: 'Bien.', author: 'A', role: 'B', source: '', date: '' }
    expect(ids(r)).toContain('testimonial-source')
  })
})

describe('forme', () => {
  it('une etude en ligne a un visuel : capture de site ou couverture', () => {
    const r = base()
    delete r.cover
    expect(ids(r)).toContain('visual')
  })

  it('la reponse directe tient en 60 mots', () => {
    const r = base()
    r.answer = Array.from({ length: 61 }, () => 'mot').join(' ')
    expect(ids(r)).toContain('answer-length')
  })

  it('la description SEO tient en 160 caracteres', () => {
    const r = base()
    r.meta = { ...r.meta, seoDescription: 'x'.repeat(161) }
    expect(ids(r)).toContain('seo-description')
  })

  it('aucun tiret cadratin, dans aucun champ', () => {
    const r = base()
    r.approach = { title: 'Approche', body: 'Un récit \u2014 avec un tiret cadratin.' }
    expect(ids(r)).toContain('em-dash')
  })

  it('au moins un domaine, sans doublon', () => {
    const r = base()
    r.domains = []
    expect(ids(r)).toContain('domains')
    r.domains = ['site-web', 'site-web']
    expect(ids(r)).toContain('domains')
  })
})

describe('les realisations du site respectent les regles de preuve', () => {
  const today = todayISO()

  it.each(REALISATIONS.map((r) => [r.slug, r] as const))('%s', (_slug, r) => {
    expect(proofIssues(r, today)).toEqual([])
  })

  it.each(
    REALISATIONS.filter((r) => hasEnglish(r.slug)).map((r) => [r.slug, localizeRealisation(r, 'en')] as const),
  )('%s (version anglaise)', (_slug, r) => {
    expect(proofIssues(r, today)).toEqual([])
  })

  it('chaque image, video et affiche cites existent dans public/', () => {
    const missing: string[] = []
    for (const r of REALISATIONS) {
      const paths = [
        r.hero?.desktopFull,
        r.hero?.mobileFull,
        r.cover?.src,
        ...(r.highlights ?? []).flatMap((h) => [h.image.src, h.phone?.src]),
        ...(r.videos ?? []).flatMap((v) => [v.src, v.webm, v.poster]),
        ...(r.beforeAfter ?? []).flatMap((b) => [b.before.src, b.after.src]),
        ...(r.gallery ?? []).map((g) => g.src),
        r.direction?.logo?.src,
      ].filter((p): p is string => Boolean(p))
      for (const p of paths) {
        if (!existsSync(join(process.cwd(), 'public', p))) missing.push(`${r.slug} : ${p}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('chaque article lie existe sur le blog', () => {
    const slugs = new Set(ARTICLES.map((a) => a.slug))
    const unknown = REALISATIONS.flatMap((r) => (r.relatedArticles ?? []).filter((s) => !slugs.has(s)).map((s) => `${r.slug} : ${s}`))
    expect(unknown).toEqual([])
  })

  it('le llms.txt cite chaque etude en ligne', () => {
    const llms = readFileSync(join(process.cwd(), 'public', 'llms.txt'), 'utf8')
    const absent = REALISATIONS.filter((r) => r.meta.status === 'live')
      .map((r) => `https://dkdp.ch/realisations/${r.slug}`)
      .filter((url) => !llms.includes(url))
    expect(absent).toEqual([])
  })

  it('les traductions anglaises visent une etude existante', () => {
    const slugs = new Set(REALISATIONS.map((r) => r.slug))
    expect(Object.keys(EN_CONTENT).filter((s) => !slugs.has(s))).toEqual([])
  })
})
