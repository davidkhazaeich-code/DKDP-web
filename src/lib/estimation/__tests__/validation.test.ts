import { describe, it, expect } from 'vitest'
import { estimationRequestSchema } from '../validation'

const validContact = {
  firstName: 'David',
  lastName: 'Khazaei',
  company: 'DKDP',
  email: 'david@dkdp.ch',
  phone: '+41 79 000 00 00',
  message: '',
  budget: '',
  timeline: '',
  currentSiteUrl: '',
  productCount: '',
  businessDescription: '',
  launchDate: '',
  locationCount: '',
  appDescription: '',
}

const validMinimalRequest = {
  situation: 'new' as const,
  siteType: 'vitrine' as const,
  sector: 'services' as const,
  logo: null,
  branding: null,
  strategy: [],
  pages: '1-5' as const,
  languages: '1' as const,
  designLevel: 'template' as const,
  copywriting: null,
  visuals: null,
  features: [],
  seo: [],
  acquisition: [],
  automation: [],
  services: [],
  contact: validContact,
  estimatedTotal: { min: 2500, max: 4000 },
  estimatedMonthly: { min: 0, max: 0 },
  estimatedWeeks: { min: 3, max: 5 },
}

describe('estimationRequestSchema', () => {
  // Test 1: Valid minimal request passes
  it('accepts a valid minimal request', () => {
    const result = estimationRequestSchema.safeParse(validMinimalRequest)
    expect(result.success).toBe(true)
  })

  // Test 2: Invalid siteType rejected
  it('rejects an invalid siteType', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      siteType: 'blog',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const fields = result.error.issues.map(i => i.path[0])
      expect(fields).toContain('siteType')
    }
  })

  it('rejects an invalid sector', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      sector: 'unknown-sector',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid situation', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      situation: 'update',
    })
    expect(result.success).toBe(false)
  })

  // Test 3: Missing email rejected
  it('rejects when email is missing', () => {
    const { email: _email, ...contactWithoutEmail } = validContact
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      contact: contactWithoutEmail,
    })
    expect(result.success).toBe(false)
  })

  it('rejects when email is invalid', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      contact: { ...validContact, email: 'not-an-email' },
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailIssue = result.error.issues.find(i => i.path.includes('email'))
      expect(emailIssue).toBeDefined()
    }
  })

  it('rejects when firstName is missing', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      contact: { ...validContact, firstName: '' },
    })
    expect(result.success).toBe(false)
  })

  // Test 4: Full request with all options passes
  it('accepts a full request with all options', () => {
    const fullRequest = {
      situation: 'redesign' as const,
      siteType: 'ecommerce' as const,
      sector: 'retail' as const,
      logo: 'create' as const,
      branding: 'modernize' as const,
      strategy: ['positioning', 'content-strategy'] as const,
      pages: '11-20' as const,
      languages: '3+' as const,
      designLevel: 'premium' as const,
      copywriting: 'professional' as const,
      visuals: 'shooting' as const,
      features: ['payment', 'members', 'newsletter', 'gallery'] as const,
      seo: ['advanced-oneshot', 'monthly'] as const,
      acquisition: ['sea', 'social', 'funnel'] as const,
      automation: ['crm', 'email-marketing', 'workflows', 'dashboard'] as const,
      services: ['maintenance', 'training', 'rgpd', 'video', 'rush'] as const,
      contact: { ...validContact, currentSiteUrl: 'https://example.com' },
      estimatedTotal: { min: 50000, max: 80000 },
      estimatedMonthly: { min: 1500, max: 1500 },
      estimatedWeeks: { min: 12, max: 20 },
    }
    const result = estimationRequestSchema.safeParse(fullRequest)
    expect(result.success).toBe(true)
  })

  it('accepts null logo and branding', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      logo: null,
      branding: null,
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid feature id', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      features: ['invalid-feature'],
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid pages value', () => {
    const result = estimationRequestSchema.safeParse({
      ...validMinimalRequest,
      pages: '0-5',
    })
    expect(result.success).toBe(false)
  })
})
