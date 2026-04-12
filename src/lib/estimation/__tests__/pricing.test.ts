import { describe, it, expect } from 'vitest'
import { calculateEstimate } from '../pricing'
import type { EstimationState } from '../types'

function makeState(overrides: Partial<EstimationState> = {}): EstimationState {
  return {
    currentStep: 1,
    direction: 1,
    situation: 'new',
    siteType: 'vitrine',
    sector: 'services',
    logo: null,
    branding: null,
    strategy: [],
    pages: '1-5',
    languages: '1',
    designLevel: 'template',
    copywriting: null,
    visuals: null,
    features: [],
    seo: [],
    acquisition: [],
    automation: [],
    services: [],
    contact: {
      firstName: 'David',
      lastName: 'Test',
      company: 'DKDP',
      email: 'test@dkdp.ch',
      phone: '+41 00 000 00 00',
      message: '',
      budget: '',
      timeline: '',
      currentSiteUrl: '',
      productCount: '',
      businessDescription: '',
      launchDate: '',
      locationCount: '',
      appDescription: '',
    },
    isSubmitting: false,
    isSubmitted: false,
    ...overrides,
  }
}

describe('calculateEstimate', () => {
  // Test 1: Base price for minimal vitrine
  it('returns base price range for minimal vitrine', () => {
    const result = calculateEstimate(makeState())
    expect(result.totalMin).toBe(2500)
    expect(result.totalMax).toBe(4000)
    expect(result.monthlyMin).toBe(0)
    expect(result.monthlyMax).toBe(0)
  })

  // Test 2: Returns zeros when required fields missing
  it('returns zeros when siteType is null', () => {
    const result = calculateEstimate(makeState({ siteType: null }))
    expect(result.totalMin).toBe(0)
    expect(result.totalMax).toBe(0)
    expect(result.monthlyMin).toBe(0)
    expect(result.monthlyMax).toBe(0)
    expect(result.weeksMin).toBe(0)
    expect(result.weeksMax).toBe(0)
  })

  it('returns zeros when pages is null', () => {
    const result = calculateEstimate(makeState({ pages: null }))
    expect(result.totalMin).toBe(0)
    expect(result.totalMax).toBe(0)
  })

  it('returns zeros when languages is null', () => {
    const result = calculateEstimate(makeState({ languages: null }))
    expect(result.totalMin).toBe(0)
    expect(result.totalMax).toBe(0)
  })

  it('returns zeros when designLevel is null', () => {
    const result = calculateEstimate(makeState({ designLevel: null }))
    expect(result.totalMin).toBe(0)
    expect(result.totalMax).toBe(0)
  })

  // Test 3: Additive multipliers vitrine + 6-10 pages + 2 lang + custom
  // multiplier = 1 + (1.3-1) + (1.3-1) + (1.4-1) = 1 + 0.3 + 0.3 + 0.4 = 2.0
  // min: 2500 * 2.0 = 5000, max: 4000 * 2.0 = 8000
  it('applies additive multipliers correctly for vitrine + 6-10 + 2 lang + custom', () => {
    const result = calculateEstimate(makeState({
      siteType: 'vitrine',
      pages: '6-10',
      languages: '2',
      designLevel: 'custom',
    }))
    expect(result.totalMin).toBe(5000)
    expect(result.totalMax).toBe(8000)
  })

  // Test 4: Redesign surcharge adds 300-800
  it('adds redesign surcharge correctly', () => {
    const base = calculateEstimate(makeState({ situation: 'new' }))
    const redesign = calculateEstimate(makeState({ situation: 'redesign' }))
    expect(redesign.totalMin - base.totalMin).toBe(300)
    expect(redesign.totalMax - base.totalMax).toBe(800)
  })

  // Test 5: Logo + branding prices add correctly
  it('adds logo create price (800-1500)', () => {
    const base = calculateEstimate(makeState())
    const withLogo = calculateEstimate(makeState({ logo: 'create' }))
    expect(withLogo.totalMin - base.totalMin).toBe(800)
    expect(withLogo.totalMax - base.totalMax).toBe(1500)
  })

  it('adds branding create price (1000-2000)', () => {
    const base = calculateEstimate(makeState())
    const withBranding = calculateEstimate(makeState({ branding: 'create' }))
    expect(withBranding.totalMin - base.totalMin).toBe(1000)
    expect(withBranding.totalMax - base.totalMax).toBe(2000)
  })

  it('adds logo modernize price (500-1000)', () => {
    const base = calculateEstimate(makeState())
    const withLogo = calculateEstimate(makeState({ logo: 'modernize' }))
    expect(withLogo.totalMin - base.totalMin).toBe(500)
    expect(withLogo.totalMax - base.totalMax).toBe(1000)
  })

  // Test 6: Copywriting uses page midpoint (6-10 pages + professional = 8*200 = 1600 added)
  it('adds copywriting using page midpoint: 6-10 pages + professional = 8*200 = 1600', () => {
    const base = calculateEstimate(makeState({ pages: '6-10', languages: '1', designLevel: 'template' }))
    const withCopy = calculateEstimate(makeState({ pages: '6-10', languages: '1', designLevel: 'template', copywriting: 'professional' }))
    // base with 6-10 + template + 1 lang: multiplier = 1 + 0.3 + 0 + 0 = 1.3
    // 2500*1.3 = 3250, 4000*1.3 = 5200
    // with professional: +1600 each
    expect(withCopy.totalMin - base.totalMin).toBe(1600)
    expect(withCopy.totalMax - base.totalMax).toBe(1600)
  })

  it('adds basic copywriting: 1-5 pages midpoint 3 * 80 = 240', () => {
    const base = calculateEstimate(makeState({ pages: '1-5' }))
    const withCopy = calculateEstimate(makeState({ pages: '1-5', copywriting: 'basic' }))
    expect(withCopy.totalMin - base.totalMin).toBe(240)
    expect(withCopy.totalMax - base.totalMax).toBe(240)
  })

  // Test 7: Monthly costs separated (blog-management + maintenance + seo monthly)
  it('separates monthly costs correctly', () => {
    const result = calculateEstimate(makeState({
      features: ['blog-management'],  // 300/mo
      seo: ['monthly'],               // 600/mo
      services: ['maintenance'],      // 150/mo
    }))
    expect(result.monthlyMin).toBe(1050)
    expect(result.monthlyMax).toBe(1050)
    // blog-management has 0 unique cost
    // seo monthly has 0 unique cost
    // maintenance has 0 unique cost
    // so total unique = base vitrine
    expect(result.totalMin).toBe(2500)
    expect(result.totalMax).toBe(4000)
  })

  // Test 8: Rush multiplier +30% on total unique
  it('applies rush +30% to total unique cost', () => {
    const base = calculateEstimate(makeState({ logo: 'create' }))
    // base: 2500 + 800 = 3300 min, 4000 + 1500 = 5500 max
    const withRush = calculateEstimate(makeState({ logo: 'create', services: ['rush'] }))
    expect(withRush.totalMin).toBe(Math.round(base.totalMin * 1.3))
    expect(withRush.totalMax).toBe(Math.round(base.totalMax * 1.3))
  })

  it('rush does not affect monthly costs', () => {
    const base = calculateEstimate(makeState({ features: ['blog-management'], services: [] }))
    const withRush = calculateEstimate(makeState({ features: ['blog-management'], services: ['rush'] }))
    expect(withRush.monthlyMin).toBe(base.monthlyMin)
    expect(withRush.monthlyMax).toBe(base.monthlyMax)
  })

  // Test 9: Delay with branding + logo + rush
  it('calculates base delay for vitrine', () => {
    const result = calculateEstimate(makeState({ siteType: 'vitrine' }))
    expect(result.weeksMin).toBe(3)
    expect(result.weeksMax).toBe(5)
  })

  it('adds delay for branding create (+2-3 weeks) and logo create (+1-2 weeks)', () => {
    const result = calculateEstimate(makeState({
      siteType: 'vitrine',
      branding: 'create',
      logo: 'create',
    }))
    // vitrine [3,5] + branding [+2,+3] + logo [+1,+2] = [6,10]
    expect(result.weeksMin).toBe(6)
    expect(result.weeksMax).toBe(10)
  })

  it('applies rush to delay: delay * 0.6', () => {
    const result = calculateEstimate(makeState({
      siteType: 'vitrine',
      branding: 'create',
      logo: 'create',
      services: ['rush'],
    }))
    // [6,10] * 0.6 = [3.6→4, 6]
    expect(result.weeksMin).toBe(Math.round(6 * 0.6))
    expect(result.weeksMax).toBe(Math.round(10 * 0.6))
  })

  it('adds +2 weeks for 20+ pages and premium design', () => {
    const result = calculateEstimate(makeState({
      siteType: 'vitrine',
      pages: '20+',
      designLevel: 'premium',
    }))
    // vitrine [3,5] + 20+ [+2,+2] + premium [+2,+2] = [7, 9]
    expect(result.weeksMin).toBe(7)
    expect(result.weeksMax).toBe(9)
  })

  // Test 10: Ecommerce with multiple options
  it('calculates ecommerce with multiple options', () => {
    const result = calculateEstimate(makeState({
      siteType: 'ecommerce',
      pages: '11-20',
      languages: '2',
      designLevel: 'custom',
      logo: 'create',
      branding: 'create',
      features: ['payment', 'members', 'newsletter'],
      seo: ['advanced-oneshot'],
      automation: ['crm'],
      services: ['maintenance'],
    }))
    // Base ecommerce: min=5000, max=8000
    // Multiplier: 1 + (1.6-1) + (1.3-1) + (1.4-1) = 1 + 0.6 + 0.3 + 0.4 = 2.3
    // After mult: min=11500, max=18400
    // Logo create: +800/+1500 → min=12300, max=19900
    // Branding create: +1000/+2000 → min=13300, max=21900
    // payment=1800, members=2000, newsletter=300 → +4100 → min=17400, max=26000
    // seo advanced-oneshot=1500 → min=18900, max=27500
    // crm: +800/+1500 → min=19700, max=29000
    // maintenance: 0 unique, +150/mo
    expect(result.totalMin).toBe(19700)
    expect(result.totalMax).toBe(29000)
    expect(result.monthlyMin).toBe(150)
    expect(result.monthlyMax).toBe(150)
    // Delay: ecommerce [6,10] + branding create [+2,+3] + logo create [+1,+2] = [9,15]
    expect(result.weeksMin).toBe(9)
    expect(result.weeksMax).toBe(15)
  })
})
