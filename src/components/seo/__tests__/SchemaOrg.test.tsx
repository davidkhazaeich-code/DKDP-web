// src/components/seo/__tests__/SchemaOrg.test.tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SchemaOrg } from '../SchemaOrg'
import { buildLocalBusiness, buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'

describe('SchemaOrg', () => {
  it('renders script tag with type application/ld+json', () => {
    const { container } = render(<SchemaOrg schema={buildLocalBusiness()} />)
    expect(container.querySelector('script[type="application/ld+json"]')).not.toBeNull()
  })

  it('JSON content is valid', () => {
    const { container } = render(<SchemaOrg schema={buildLocalBusiness()} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(() => JSON.parse(script!.textContent!)).not.toThrow()
  })
})

describe('buildLocalBusiness', () => {
  it('returns @type LocalBusiness', () => {
    expect(buildLocalBusiness()['@type']).toBe('LocalBusiness')
  })

  it('includes Genève address', () => {
    expect(buildLocalBusiness().address.addressLocality).toBe('Genève')
  })

  it('includes aggregateRating 4.9', () => {
    expect(buildLocalBusiness().aggregateRating.ratingValue).toBe('4.9')
  })

  it('includes telephone', () => {
    expect(buildLocalBusiness().telephone).toBe('+41799407969')
  })
})

describe('buildService', () => {
  it('returns @type Service', () => {
    expect(buildService({ name: 'Création de site web', url: '/agence-digitale/creation-site-web' })['@type']).toBe('Service')
  })

  it('includes areaServed Genève', () => {
    const s = buildService({ name: 'SEO', url: '/agence-digitale/seo' })
    expect(s.areaServed.name).toContain('Genève')
  })
})

describe('buildFAQPage', () => {
  it('returns @type FAQPage', () => {
    const faq = buildFAQPage([{ question: 'Q?', answer: 'A.' }])
    expect(faq['@type']).toBe('FAQPage')
  })

  it('includes all questions', () => {
    const faq = buildFAQPage([
      { question: 'Q1?', answer: 'A1.' },
      { question: 'Q2?', answer: 'A2.' },
    ])
    expect(faq.mainEntity).toHaveLength(2)
  })
})

describe('buildBreadcrumbList', () => {
  it('returns @type BreadcrumbList', () => {
    const bc = buildBreadcrumbList([{ name: 'Accueil', url: 'https://dkdp.ch' }])
    expect(bc['@type']).toBe('BreadcrumbList')
  })
})
