# Estimateur Site Web - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-step wizard estimator on `/agence-digitale/creation-site-web` that lets prospects configure their web project and receive a price estimate, sent via Resend email + stored in Notion.

**Architecture:** Client-side wizard (`useReducer` + Context) with 8 steps, a floating price counter, Framer Motion transitions. Server-side API route validates, recalculates price, sends emails via Resend, stores in Notion. All pricing logic is shared between client and server via `src/lib/estimation/pricing.ts`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, Resend, @notionhq/client (to install), Zod, Vitest.

**Spec:** `docs/superpowers/specs/2026-04-12-estimateur-site-web-design.md`

**Project root:** `/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp`

---

## File Structure

```
src/lib/estimation/
  types.ts              # All TypeScript types (EstimationState, EstimationRequest, step options)
  pricing.ts            # Price constants + calculateEstimate() pure function
  validation.ts         # Zod schema for API validation
  sectors.ts            # Sector list + feature pre-suggestions mapping

src/app/agence-digitale/creation-site-web/
  _components/
    Estimator.tsx              # Main orchestrator (grid layout, step rendering)
    EstimatorContext.tsx        # useReducer, context provider, actions
    EstimatorProgress.tsx       # Top progress bar (8 segments)
    EstimatorCounter.tsx        # Floating price counter (sidebar desktop / bottom bar mobile)
    EstimatorNav.tsx            # Next / Back / Skip buttons
    steps/
      Step1Project.tsx
      Step2Branding.tsx
      Step3Scope.tsx
      Step4Content.tsx
      Step5Features.tsx
      Step6Acquisition.tsx
      Step7Services.tsx
      Step8Summary.tsx
    ui/
      SelectionCard.tsx         # Single-select card with hover/active states
      MultiSelectCard.tsx       # Toggle card for multi-select
      OptionChip.tsx            # Small pill button (pages, languages, sectors)
      CollapsibleSection.tsx    # Expandable section with chevron (step 6)
      AnimatedCounter.tsx       # Number counter with easing animation
      TrustBanner.tsx           # Trust signals bar

src/app/api/estimation/
  route.ts                      # POST handler (validate, email, Notion)

src/lib/estimation/__tests__/
  pricing.test.ts               # Unit tests for price calculation
  validation.test.ts            # Unit tests for Zod schema
```

---

## Task 1: Install @notionhq/client + types/validation foundation

**Files:**
- Create: `src/lib/estimation/types.ts`
- Create: `src/lib/estimation/validation.ts`

- [ ] **Step 1: Install Notion SDK**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp"
npm install @notionhq/client
```

- [ ] **Step 2: Create types.ts with all TypeScript types**

Create `src/lib/estimation/types.ts` with:

```typescript
// ── Step option types ──

export type Situation = 'new' | 'redesign'
export type SiteType = 'vitrine' | 'ecommerce' | 'landing' | 'webapp'
export type Sector =
  | 'restaurant' | 'health' | 'legal' | 'real-estate' | 'retail'
  | 'services' | 'tech' | 'artisan' | 'training' | 'other'

export type LogoOption = 'existing' | 'create' | 'modernize'
export type BrandingOption = 'existing' | 'create' | 'modernize'
export type StrategyOption = 'positioning' | 'market-study' | 'content-strategy'

export type PageRange = '1-5' | '6-10' | '11-20' | '20+'
export type LanguageOption = '1' | '2' | '3+'
export type DesignLevel = 'template' | 'custom' | 'premium'

export type CopywritingOption = 'provided' | 'basic' | 'professional'
export type VisualsOption = 'provided' | 'stock' | 'ai' | 'shooting'

export type FeatureId =
  | 'blog-setup' | 'blog-management' | 'form' | 'booking'
  | 'members' | 'chatbot' | 'payment' | 'newsletter'
  | 'gallery' | 'extra-pages'

export type SeoOption = 'advanced-oneshot' | 'monthly'
export type AcquisitionOption = 'sea' | 'social' | 'funnel'
export type AutomationOption = 'crm' | 'email-marketing' | 'workflows' | 'dashboard'
export type ServiceOption = 'maintenance' | 'training' | 'rgpd' | 'video' | 'rush'

// ── Wizard state ──

export interface EstimationState {
  currentStep: number
  direction: 1 | -1 // for animation direction

  // Step 1
  situation: Situation | null
  siteType: SiteType | null
  sector: Sector | null

  // Step 2
  logo: LogoOption | null
  branding: BrandingOption | null
  strategy: StrategyOption[]

  // Step 3
  pages: PageRange | null
  languages: LanguageOption | null
  designLevel: DesignLevel | null

  // Step 4
  copywriting: CopywritingOption | null
  visuals: VisualsOption | null

  // Step 5
  features: FeatureId[]

  // Step 6
  seo: SeoOption[]
  acquisition: AcquisitionOption[]
  automation: AutomationOption[]

  // Step 7
  services: ServiceOption[]

  // Step 8
  contact: ContactInfo
  isSubmitting: boolean
  isSubmitted: boolean
}

export interface ContactInfo {
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  message: string
  budget: string
  timeline: string
  // Dynamic fields
  currentSiteUrl: string
  productCount: string
  businessDescription: string
  launchDate: string
  locationCount: string
  appDescription: string
}

// ── Price result ──

export interface PriceEstimate {
  totalMin: number
  totalMax: number
  monthlyMin: number
  monthlyMax: number
  weeksMin: number
  weeksMax: number
}

// ── API request (sent to server) ──

export interface EstimationRequest {
  situation: Situation
  siteType: SiteType
  sector: Sector
  logo: LogoOption | null
  branding: BrandingOption | null
  strategy: StrategyOption[]
  pages: PageRange
  languages: LanguageOption
  designLevel: DesignLevel
  copywriting: CopywritingOption | null
  visuals: VisualsOption | null
  features: FeatureId[]
  seo: SeoOption[]
  acquisition: AcquisitionOption[]
  automation: AutomationOption[]
  services: ServiceOption[]
  contact: ContactInfo
  estimatedTotal: { min: number; max: number }
  estimatedMonthly: { min: number; max: number }
  estimatedWeeks: { min: number; max: number }
}

// ── Reducer actions ──

export type EstimationAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_SITUATION'; value: Situation }
  | { type: 'SET_SITE_TYPE'; value: SiteType }
  | { type: 'SET_SECTOR'; value: Sector }
  | { type: 'SET_LOGO'; value: LogoOption | null }
  | { type: 'SET_BRANDING'; value: BrandingOption | null }
  | { type: 'TOGGLE_STRATEGY'; value: StrategyOption }
  | { type: 'SET_PAGES'; value: PageRange }
  | { type: 'SET_LANGUAGES'; value: LanguageOption }
  | { type: 'SET_DESIGN_LEVEL'; value: DesignLevel }
  | { type: 'SET_COPYWRITING'; value: CopywritingOption | null }
  | { type: 'SET_VISUALS'; value: VisualsOption | null }
  | { type: 'TOGGLE_FEATURE'; value: FeatureId }
  | { type: 'TOGGLE_SEO'; value: SeoOption }
  | { type: 'TOGGLE_ACQUISITION'; value: AcquisitionOption }
  | { type: 'TOGGLE_AUTOMATION'; value: AutomationOption }
  | { type: 'TOGGLE_SERVICE'; value: ServiceOption }
  | { type: 'SET_CONTACT_FIELD'; field: keyof ContactInfo; value: string }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'SET_SUBMITTED' }
  | { type: 'SKIP_STEP' }
```

- [ ] **Step 3: Create validation.ts with Zod schema**

Create `src/lib/estimation/validation.ts` with:

```typescript
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  company: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(5).max(30),
  message: z.string().max(2000).optional().default(''),
  budget: z.string().max(50).optional().default(''),
  timeline: z.string().max(50).optional().default(''),
  currentSiteUrl: z.string().url().max(500).optional().or(z.literal('')).default(''),
  productCount: z.string().max(20).optional().default(''),
  businessDescription: z.string().max(1000).optional().default(''),
  launchDate: z.string().max(20).optional().default(''),
  locationCount: z.string().max(10).optional().default(''),
  appDescription: z.string().max(2000).optional().default(''),
})

export const estimationRequestSchema = z.object({
  situation: z.enum(['new', 'redesign']),
  siteType: z.enum(['vitrine', 'ecommerce', 'landing', 'webapp']),
  sector: z.enum([
    'restaurant', 'health', 'legal', 'real-estate', 'retail',
    'services', 'tech', 'artisan', 'training', 'other',
  ]),
  logo: z.enum(['existing', 'create', 'modernize']).nullable(),
  branding: z.enum(['existing', 'create', 'modernize']).nullable(),
  strategy: z.array(z.enum(['positioning', 'market-study', 'content-strategy'])),
  pages: z.enum(['1-5', '6-10', '11-20', '20+']),
  languages: z.enum(['1', '2', '3+']),
  designLevel: z.enum(['template', 'custom', 'premium']),
  copywriting: z.enum(['provided', 'basic', 'professional']).nullable(),
  visuals: z.enum(['provided', 'stock', 'ai', 'shooting']).nullable(),
  features: z.array(z.enum([
    'blog-setup', 'blog-management', 'form', 'booking',
    'members', 'chatbot', 'payment', 'newsletter', 'gallery', 'extra-pages',
  ])),
  seo: z.array(z.enum(['advanced-oneshot', 'monthly'])),
  acquisition: z.array(z.enum(['sea', 'social', 'funnel'])),
  automation: z.array(z.enum(['crm', 'email-marketing', 'workflows', 'dashboard'])),
  services: z.array(z.enum(['maintenance', 'training', 'rgpd', 'video', 'rush'])),
  contact: contactSchema,
  estimatedTotal: z.object({ min: z.number(), max: z.number() }),
  estimatedMonthly: z.object({ min: z.number(), max: z.number() }),
  estimatedWeeks: z.object({ min: z.number(), max: z.number() }),
})
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/estimation/types.ts src/lib/estimation/validation.ts package.json package-lock.json
git commit -m "feat(estimation): add types, Zod validation, install @notionhq/client"
```

---

## Task 2: Pricing engine + tests

**Files:**
- Create: `src/lib/estimation/pricing.ts`
- Create: `src/lib/estimation/sectors.ts`
- Create: `src/lib/estimation/__tests__/pricing.test.ts`
- Create: `src/lib/estimation/__tests__/validation.test.ts`

- [ ] **Step 1: Create sectors.ts**

Create `src/lib/estimation/sectors.ts` with:

```typescript
import type { Sector, FeatureId } from './types'

export const SECTORS: { id: Sector; label: string }[] = [
  { id: 'restaurant', label: 'Restaurant / Hôtel' },
  { id: 'health', label: 'Santé / Médical' },
  { id: 'legal', label: 'Juridique / Fiduciaire' },
  { id: 'real-estate', label: 'Immobilier' },
  { id: 'retail', label: 'Commerce / Retail' },
  { id: 'services', label: 'Services / Consulting' },
  { id: 'tech', label: 'Tech / SaaS' },
  { id: 'artisan', label: 'Artisan / BTP' },
  { id: 'training', label: 'Formation / Coaching' },
  { id: 'other', label: 'Autre' },
]

export const SECTOR_SUGGESTIONS: Partial<Record<Sector, FeatureId[]>> = {
  restaurant: ['booking', 'gallery'],
  health: ['form', 'booking'],
  retail: ['payment', 'newsletter'],
  services: ['blog-setup', 'newsletter'],
  tech: ['members', 'chatbot'],
  training: ['booking', 'members'],
}
```

- [ ] **Step 2: Create pricing.ts with all constants and calculation function**

Create `src/lib/estimation/pricing.ts` with:

```typescript
import type {
  EstimationState, PriceEstimate, SiteType, PageRange,
  LanguageOption, DesignLevel, LogoOption, BrandingOption,
  StrategyOption, CopywritingOption, VisualsOption, FeatureId,
  SeoOption, AcquisitionOption, AutomationOption, ServiceOption,
} from './types'

// ── Base prices ──

export const BASE_PRICES: Record<SiteType, { min: number; max: number }> = {
  vitrine: { min: 2500, max: 4000 },
  ecommerce: { min: 5000, max: 8000 },
  landing: { min: 1000, max: 2000 },
  webapp: { min: 8000, max: 15000 },
}

export const REDESIGN_SURCHARGE = { min: 300, max: 800 }

// ── Multiplicateurs (additifs) ──

export const PAGE_MULTIPLIERS: Record<PageRange, number> = {
  '1-5': 1, '6-10': 1.3, '11-20': 1.6, '20+': 2,
}
export const LANG_MULTIPLIERS: Record<LanguageOption, number> = {
  '1': 1, '2': 1.3, '3+': 1.5,
}
export const DESIGN_MULTIPLIERS: Record<DesignLevel, number> = {
  template: 1, custom: 1.4, premium: 1.7,
}

export const PAGE_MIDPOINTS: Record<PageRange, number> = {
  '1-5': 3, '6-10': 8, '11-20': 15, '20+': 25,
}

// ── Fixed prices (min, max) ──

export const LOGO_PRICES: Record<LogoOption, { min: number; max: number }> = {
  existing: { min: 0, max: 0 },
  create: { min: 800, max: 1500 },
  modernize: { min: 500, max: 1000 },
}

export const BRANDING_PRICES: Record<BrandingOption, { min: number; max: number }> = {
  existing: { min: 0, max: 0 },
  create: { min: 1000, max: 2000 },
  modernize: { min: 600, max: 1200 },
}

export const STRATEGY_PRICES: Record<StrategyOption, { min: number; max: number }> = {
  positioning: { min: 800, max: 800 },
  'market-study': { min: 600, max: 600 },
  'content-strategy': { min: 1200, max: 1200 },
}

export const COPYWRITING_PRICES: Record<CopywritingOption, { perPage: number }> = {
  provided: { perPage: 0 },
  basic: { perPage: 80 },
  professional: { perPage: 200 },
}

export const VISUALS_PRICES: Record<VisualsOption, { min: number; max: number }> = {
  provided: { min: 0, max: 0 },
  stock: { min: 300, max: 600 },
  ai: { min: 400, max: 800 },
  shooting: { min: 800, max: 2500 },
}

export const FEATURE_PRICES: Record<FeatureId, { min: number; max: number; monthly?: { min: number; max: number } }> = {
  'blog-setup': { min: 800, max: 800 },
  'blog-management': { min: 0, max: 0, monthly: { min: 300, max: 300 } },
  form: { min: 400, max: 400 },
  booking: { min: 1200, max: 1200 },
  members: { min: 2000, max: 2000 },
  chatbot: { min: 1500, max: 1500 },
  payment: { min: 1800, max: 1800 },
  newsletter: { min: 300, max: 300 },
  gallery: { min: 500, max: 500 },
  'extra-pages': { min: 200, max: 200 },
}

export const SEO_PRICES: Record<SeoOption, { min: number; max: number; monthly?: { min: number; max: number } }> = {
  'advanced-oneshot': { min: 1500, max: 1500 },
  monthly: { min: 0, max: 0, monthly: { min: 600, max: 600 } },
}

export const ACQUISITION_PRICES: Record<AcquisitionOption, { min: number; max: number; monthly?: { min: number; max: number } }> = {
  sea: { min: 0, max: 0, monthly: { min: 400, max: 400 } },
  social: { min: 0, max: 0, monthly: { min: 600, max: 600 } },
  funnel: { min: 2000, max: 4000 },
}

export const AUTOMATION_PRICES: Record<AutomationOption, { min: number; max: number }> = {
  crm: { min: 800, max: 1500 },
  'email-marketing': { min: 1200, max: 2500 },
  workflows: { min: 500, max: 2000 },
  dashboard: { min: 600, max: 1200 },
}

export const SERVICE_PRICES: Record<ServiceOption, { min: number; max: number; monthly?: { min: number; max: number } }> = {
  maintenance: { min: 0, max: 0, monthly: { min: 150, max: 150 } },
  training: { min: 200, max: 200 },
  rgpd: { min: 500, max: 500 },
  video: { min: 1500, max: 4000 },
  rush: { min: 0, max: 0 }, // handled as multiplier
}

// ── Delay constants (weeks) ──

export const BASE_DELAYS: Record<SiteType, { min: number; max: number }> = {
  vitrine: { min: 3, max: 5 },
  ecommerce: { min: 6, max: 10 },
  landing: { min: 1, max: 2 },
  webapp: { min: 8, max: 14 },
}

// ── Main calculation ──

export function calculateEstimate(state: EstimationState): PriceEstimate {
  if (!state.siteType || !state.pages || !state.languages || !state.designLevel) {
    return { totalMin: 0, totalMax: 0, monthlyMin: 0, monthlyMax: 0, weeksMin: 0, weeksMax: 0 }
  }

  const base = BASE_PRICES[state.siteType]

  // Additive multipliers
  const pageMult = PAGE_MULTIPLIERS[state.pages]
  const langMult = LANG_MULTIPLIERS[state.languages]
  const designMult = DESIGN_MULTIPLIERS[state.designLevel]
  const totalMult = 1 + (pageMult - 1) + (langMult - 1) + (designMult - 1)

  let totalMin = base.min * totalMult
  let totalMax = base.max * totalMult
  let monthlyMin = 0
  let monthlyMax = 0

  // Redesign surcharge
  if (state.situation === 'redesign') {
    totalMin += REDESIGN_SURCHARGE.min
    totalMax += REDESIGN_SURCHARGE.max
  }

  // Logo
  if (state.logo && state.logo !== 'existing') {
    const lp = LOGO_PRICES[state.logo]
    totalMin += lp.min
    totalMax += lp.max
  }

  // Branding
  if (state.branding && state.branding !== 'existing') {
    const bp = BRANDING_PRICES[state.branding]
    totalMin += bp.min
    totalMax += bp.max
  }

  // Strategy
  for (const s of state.strategy) {
    totalMin += STRATEGY_PRICES[s].min
    totalMax += STRATEGY_PRICES[s].max
  }

  // Copywriting
  if (state.copywriting && state.copywriting !== 'provided') {
    const midpoint = PAGE_MIDPOINTS[state.pages]
    const perPage = COPYWRITING_PRICES[state.copywriting].perPage
    totalMin += perPage * midpoint
    totalMax += perPage * midpoint
  }

  // Visuals
  if (state.visuals && state.visuals !== 'provided') {
    const vp = VISUALS_PRICES[state.visuals]
    totalMin += vp.min
    totalMax += vp.max
  }

  // Features
  for (const f of state.features) {
    const fp = FEATURE_PRICES[f]
    totalMin += fp.min
    totalMax += fp.max
    if (fp.monthly) {
      monthlyMin += fp.monthly.min
      monthlyMax += fp.monthly.max
    }
  }

  // SEO
  for (const s of state.seo) {
    const sp = SEO_PRICES[s]
    totalMin += sp.min
    totalMax += sp.max
    if (sp.monthly) {
      monthlyMin += sp.monthly.min
      monthlyMax += sp.monthly.max
    }
  }

  // Acquisition
  for (const a of state.acquisition) {
    const ap = ACQUISITION_PRICES[a]
    totalMin += ap.min
    totalMax += ap.max
    if (ap.monthly) {
      monthlyMin += ap.monthly.min
      monthlyMax += ap.monthly.max
    }
  }

  // Automation
  for (const a of state.automation) {
    totalMin += AUTOMATION_PRICES[a].min
    totalMax += AUTOMATION_PRICES[a].max
  }

  // Services
  for (const s of state.services) {
    if (s === 'rush') continue // handled below
    const sp = SERVICE_PRICES[s]
    totalMin += sp.min
    totalMax += sp.max
    if (sp.monthly) {
      monthlyMin += sp.monthly.min
      monthlyMax += sp.monthly.max
    }
  }

  // Rush: +30% on total unique
  if (state.services.includes('rush')) {
    totalMin = Math.round(totalMin * 1.3)
    totalMax = Math.round(totalMax * 1.3)
  }

  // Delay
  let weeksMin = BASE_DELAYS[state.siteType].min
  let weeksMax = BASE_DELAYS[state.siteType].max
  if (state.branding === 'create') { weeksMin += 2; weeksMax += 3 }
  if (state.logo === 'create') { weeksMin += 1; weeksMax += 2 }
  if (state.pages === '20+') { weeksMin += 2; weeksMax += 2 }
  if (state.designLevel === 'premium') { weeksMin += 2; weeksMax += 2 }
  if (state.services.includes('rush')) {
    weeksMin = Math.round(weeksMin * 0.6)
    weeksMax = Math.round(weeksMax * 0.6)
  }

  return {
    totalMin: Math.round(totalMin),
    totalMax: Math.round(totalMax),
    monthlyMin,
    monthlyMax,
    weeksMin,
    weeksMax,
  }
}
```

- [ ] **Step 3: Write pricing tests**

Create `src/lib/estimation/__tests__/pricing.test.ts` with:

```typescript
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
      firstName: '', lastName: '', company: '', email: '', phone: '',
      message: '', budget: '', timeline: '', currentSiteUrl: '',
      productCount: '', businessDescription: '', launchDate: '',
      locationCount: '', appDescription: '',
    },
    isSubmitting: false,
    isSubmitted: false,
    ...overrides,
  }
}

describe('calculateEstimate', () => {
  it('returns base price for minimal vitrine', () => {
    const result = calculateEstimate(makeState())
    expect(result.totalMin).toBe(2500)
    expect(result.totalMax).toBe(4000)
    expect(result.monthlyMin).toBe(0)
    expect(result.monthlyMax).toBe(0)
  })

  it('returns zeros when required fields are missing', () => {
    const result = calculateEstimate(makeState({ siteType: null }))
    expect(result.totalMin).toBe(0)
  })

  it('applies additive multipliers correctly', () => {
    // vitrine 2500 * (1 + 0.3 + 0.3 + 0.4) = 2500 * 2.0 = 5000
    const result = calculateEstimate(makeState({
      pages: '6-10', languages: '2', designLevel: 'custom',
    }))
    expect(result.totalMin).toBe(5000)
    expect(result.totalMax).toBe(8000)
  })

  it('adds redesign surcharge', () => {
    const result = calculateEstimate(makeState({ situation: 'redesign' }))
    expect(result.totalMin).toBe(2500 + 300)
    expect(result.totalMax).toBe(4000 + 800)
  })

  it('adds logo + branding prices', () => {
    const result = calculateEstimate(makeState({
      logo: 'create', branding: 'create',
    }))
    expect(result.totalMin).toBe(2500 + 800 + 1000)
    expect(result.totalMax).toBe(4000 + 1500 + 2000)
  })

  it('calculates copywriting based on page midpoint', () => {
    // 6-10 pages midpoint = 8, professional = 200/page, 8*200 = 1600
    const result = calculateEstimate(makeState({
      pages: '6-10', copywriting: 'professional',
    }))
    // base * 1.3 + copywriting: 2500*1.3 + 1600 = 3250 + 1600 = 4850
    expect(result.totalMin).toBe(4850)
  })

  it('separates monthly costs', () => {
    const result = calculateEstimate(makeState({
      features: ['blog-management'],
      services: ['maintenance'],
      seo: ['monthly'],
    }))
    expect(result.monthlyMin).toBe(300 + 150 + 600)
    expect(result.monthlyMax).toBe(300 + 150 + 600)
  })

  it('applies rush multiplier on total unique', () => {
    const result = calculateEstimate(makeState({
      services: ['rush'],
    }))
    expect(result.totalMin).toBe(Math.round(2500 * 1.3))
    expect(result.totalMax).toBe(Math.round(4000 * 1.3))
  })

  it('calculates delay with branding and rush', () => {
    const result = calculateEstimate(makeState({
      branding: 'create', logo: 'create', services: ['rush'],
    }))
    // vitrine base [3,5] + branding [2,3] + logo [1,2] = [6,10] * 0.6 = [4,6]
    expect(result.weeksMin).toBe(4)
    expect(result.weeksMax).toBe(6)
  })

  it('handles ecommerce with all options', () => {
    const result = calculateEstimate(makeState({
      siteType: 'ecommerce',
      situation: 'redesign',
      pages: '11-20',
      languages: '2',
      designLevel: 'premium',
      features: ['payment', 'newsletter'],
    }))
    // base: 5000 * (1 + 0.6 + 0.3 + 0.7) = 5000 * 2.6 = 13000
    // + redesign 300 + payment 1800 + newsletter 300 = 15400
    expect(result.totalMin).toBe(15400)
  })
})
```

- [ ] **Step 4: Write validation tests**

Create `src/lib/estimation/__tests__/validation.test.ts` with:

```typescript
import { describe, it, expect } from 'vitest'
import { estimationRequestSchema } from '../validation'

const validRequest = {
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
    firstName: 'Jean',
    lastName: 'Dupont',
    company: 'Dupont SA',
    email: 'jean@dupont.ch',
    phone: '+41 22 123 45 67',
  },
  estimatedTotal: { min: 2500, max: 4000 },
  estimatedMonthly: { min: 0, max: 0 },
  estimatedWeeks: { min: 3, max: 5 },
}

describe('estimationRequestSchema', () => {
  it('validates a correct minimal request', () => {
    const result = estimationRequestSchema.safeParse(validRequest)
    expect(result.success).toBe(true)
  })

  it('rejects invalid siteType', () => {
    const result = estimationRequestSchema.safeParse({ ...validRequest, siteType: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('rejects missing email', () => {
    const result = estimationRequestSchema.safeParse({
      ...validRequest,
      contact: { ...validRequest.contact, email: '' },
    })
    expect(result.success).toBe(false)
  })

  it('accepts full request with all options', () => {
    const result = estimationRequestSchema.safeParse({
      ...validRequest,
      situation: 'redesign',
      logo: 'create',
      branding: 'modernize',
      strategy: ['positioning', 'market-study'],
      features: ['blog-setup', 'chatbot', 'payment'],
      seo: ['advanced-oneshot', 'monthly'],
      acquisition: ['sea'],
      automation: ['crm', 'workflows'],
      services: ['maintenance', 'rush'],
      contact: {
        ...validRequest.contact,
        currentSiteUrl: 'https://old-site.ch',
        budget: '10-20k',
      },
    })
    expect(result.success).toBe(true)
  })
})
```

- [ ] **Step 5: Run tests**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp"
npx vitest run src/lib/estimation/__tests__/ --reporter=verbose
```

Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/estimation/
git commit -m "feat(estimation): pricing engine, sectors, tests"
```

---

## Task 3: Estimator context + reducer

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/EstimatorContext.tsx`

- [ ] **Step 1: Create EstimatorContext.tsx**

Create the file with `useReducer`, context provider, initial state, and the reducer function that handles all `EstimationAction` types. Export `useEstimator()` hook. The reducer handles:

- `SET_STEP` / `NEXT_STEP` / `PREV_STEP` / `SKIP_STEP`: navigation with direction tracking
- All `SET_*` actions: update the corresponding field
- All `TOGGLE_*` actions: add/remove from arrays
- `SET_CONTACT_FIELD`: update nested contact object
- `SET_SUBMITTING` / `SET_SUBMITTED`: submission state

Key implementation details:
- `NEXT_STEP`: sets `direction: 1`, increments `currentStep` (max 8)
- `PREV_STEP`: sets `direction: -1`, decrements `currentStep` (min 1)
- `SKIP_STEP`: same as `NEXT_STEP` but clears optional selections for the current step
- `TOGGLE_*`: if value exists in array, remove it; otherwise add it

- [ ] **Step 2: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/EstimatorContext.tsx
git commit -m "feat(estimation): reducer context and useEstimator hook"
```

---

## Task 4: Shared UI components

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/ui/SelectionCard.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/ui/MultiSelectCard.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/ui/OptionChip.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/ui/CollapsibleSection.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/ui/AnimatedCounter.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/ui/TrustBanner.tsx`

- [ ] **Step 1: Create SelectionCard.tsx**

Props: `title: string`, `description: string`, `price: string`, `priceColor?: string`, `selected: boolean`, `onClick: () => void`, `expandedContent?: ReactNode`. Uses `motion.div` for hover (translateY -2px, border glow) and selection (scale pulse 1.02→1, checkmark). When `expandedContent` is provided, uses `AnimatePresence` + `motion.div` with `layout` for expand/collapse.

Use tokens: `import { violet } from '@/lib/tokens'`. Border on select: `violet.border` at full opacity. Background: `violet.bg`.

- [ ] **Step 2: Create MultiSelectCard.tsx**

Same as `SelectionCard` but toggle behavior: clicking toggles `selected` state. No scale pulse, just border + background + checkmark. Props: `title`, `description?`, `price`, `priceLabel?` (for "/mois"), `selected`, `onToggle`, `recommended?: boolean` (shows "Recommande" badge).

- [ ] **Step 3: Create OptionChip.tsx**

Small pill button. Props: `label: string`, `selected: boolean`, `onClick: () => void`. Tailwind: `px-4 py-2 rounded-lg border text-sm transition-all`. Selected: violet border + violet text. Unselected: `border-white/10 text-zinc-400`.

- [ ] **Step 4: Create CollapsibleSection.tsx**

Props: `title: string`, `defaultOpen?: boolean`, `selectedCount?: number`, `children: ReactNode`. Header row with title + chevron icon (rotates on open). Badge with count when `selectedCount > 0`. `AnimatePresence` for content. Uses `motion.div` with `initial/animate/exit` for height animation.

- [ ] **Step 5: Create AnimatedCounter.tsx**

Props: `value: number`, `prefix?: string` (default "CHF"), `suffix?: string`. Uses `useEffect` + `requestAnimationFrame` to animate from previous value to new value over 300ms with ease-out. Displays formatted number with Swiss formatting (apostrophe as thousand separator: `2'500`).

- [ ] **Step 6: Create TrustBanner.tsx**

3 trust signals in a flex row: `Clock` icon + "Devis gratuit sous 48h", `ShieldCheck` icon + "Prix fixes, sans surprises", `Star` icon + "+120 projets livres". Small text, `text-zinc-500`, `gap-6`, centered. Import icons from `lucide-react`.

- [ ] **Step 7: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/ui/
git commit -m "feat(estimation): shared UI components (cards, chips, counter, trust)"
```

---

## Task 5: Progress bar + counter + navigation

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/EstimatorProgress.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/EstimatorCounter.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/EstimatorNav.tsx`

- [ ] **Step 1: Create EstimatorProgress.tsx**

Horizontal bar with 8 segments. Each segment: clickable if `index < currentStep` (go back), active if `index === currentStep`, future if `index > currentStep`. Completed segments show a check icon. Fill animation with `motion.div` width transition. Step labels: "Projet", "Branding", "Envergure", "Contenu", "Fonctions", "Acquisition", "Services", "Devis". On mobile (`sm:hidden`), show only dots (no labels).

- [ ] **Step 2: Create EstimatorCounter.tsx**

Desktop (`hidden lg:block`): sticky sidebar (`sticky top-[140px]`), card with violet border, shows:
- "Votre estimation" label
- `AnimatedCounter` for total unique (large font, min-max with dash)
- `AnimatedCounter` for monthly (smaller, violet, only if > 0)
- Step indicator "3 / 8"

Mobile (`lg:hidden`): fixed bottom bar (`fixed bottom-0 left-0 right-0 z-40`), compact row with total + step. Tap expands to show monthly detail. `backdrop-blur-xl bg-[#0A0A0A]/90`.

- [ ] **Step 3: Create EstimatorNav.tsx**

Props: `canGoBack: boolean`, `canSkip: boolean`, `canProceed: boolean`, `isLastStep: boolean`. Renders:
- Back button (left, ghost style, hidden on step 1)
- "Pas pour l'instant" (ghost, left-aligned, only when `canSkip`)
- Next button (right, violet filled, "Continuer" or "Voir mon estimation" on last content step)

On step 8 this is not shown (the summary has its own submit button).

- [ ] **Step 4: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/EstimatorProgress.tsx
git add src/app/agence-digitale/creation-site-web/_components/EstimatorCounter.tsx
git add src/app/agence-digitale/creation-site-web/_components/EstimatorNav.tsx
git commit -m "feat(estimation): progress bar, price counter, navigation"
```

---

## Task 6: Steps 1-4 (project, branding, scope, content)

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step1Project.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step2Branding.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step3Scope.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step4Content.tsx`

- [ ] **Step 1: Create Step1Project.tsx**

3 sections on one screen:
1. "Situation actuelle" - 2 `SelectionCard`s (new / redesign)
2. "Type de site" - 4 `SelectionCard`s in 2-col grid, each with description + "des CHF X" price
3. "Secteur d'activite" - `OptionChip` flex-wrap grid with all sectors from `SECTORS`

Uses `useEstimator()` to dispatch actions. Step is valid (can proceed) when all 3 are selected.

- [ ] **Step 2: Create Step2Branding.tsx**

3 sections, all optional (skip button visible):
1. "Logo" - 3 `SelectionCard`s with expandable detail (livrables as tags). "J'ai deja mon logo" card has no expand.
2. "Identite visuelle" - 3 `SelectionCard`s, same pattern. "Branding a creer" expand shows 4 sub-cards (palette, typo, charte, signature email).
3. "Strategie marketing" - 3 `MultiSelectCard`s

- [ ] **Step 3: Create Step3Scope.tsx**

3 sections:
1. "Nombre de pages" - 4 `OptionChip`s
2. "Langues" - 3 `OptionChip`s with labels showing multiplier
3. "Niveau de design" - 3 `SelectionCard`s with multiplier display. Below: example calculation box updating in real-time: "Site vitrine (CHF 2'500) x Sur mesure (x1.4) = **CHF 3'500**"

All required.

- [ ] **Step 4: Create Step4Content.tsx**

2 sections, both optional (skip):
1. "Redaction & copywriting" - 3 `SelectionCard`s, price auto-calculated with page midpoint shown in description
2. "Photos & visuels" - 4 `SelectionCard`s

- [ ] **Step 5: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/steps/Step1Project.tsx
git add src/app/agence-digitale/creation-site-web/_components/steps/Step2Branding.tsx
git add src/app/agence-digitale/creation-site-web/_components/steps/Step3Scope.tsx
git add src/app/agence-digitale/creation-site-web/_components/steps/Step4Content.tsx
git commit -m "feat(estimation): steps 1-4 (project, branding, scope, content)"
```

---

## Task 7: Steps 5-7 (features, acquisition, services)

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step5Features.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step6Acquisition.tsx`
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step7Services.tsx`

- [ ] **Step 1: Create Step5Features.tsx**

Grid of `MultiSelectCard`s (2 cols on desktop). Import `SECTOR_SUGGESTIONS` from sectors.ts. Cards whose `FeatureId` is in the sector's suggestions array get `recommended={true}` and start pre-selected. Each card shows the feature name, short description, and price. Blog management shows "/mois" price label. "Pages supplementaires" card includes a small number input (default 0).

- [ ] **Step 2: Create Step6Acquisition.tsx**

3 `CollapsibleSection`s:
1. "SEO" - `defaultOpen={true}`. First item "SEO technique de base" as a static green "Toujours inclus" row (not clickable). Then 2 `MultiSelectCard`s.
2. "Acquisition" - 3 `MultiSelectCard`s.
3. "Automatisation & CRM" - 4 `MultiSelectCard`s.

Badge count on each section title. Whole step is optional (skip).

- [ ] **Step 3: Create Step7Services.tsx**

List of `MultiSelectCard`s (single column). Maintenance description includes "modifications mineures du site incluses". Rush card has orange styling (`border-orange-500/20 bg-orange-500/5`) and warning text "Applique +30% sur le total". Whole step is optional (skip).

- [ ] **Step 4: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/steps/Step5Features.tsx
git add src/app/agence-digitale/creation-site-web/_components/steps/Step6Acquisition.tsx
git add src/app/agence-digitale/creation-site-web/_components/steps/Step7Services.tsx
git commit -m "feat(estimation): steps 5-7 (features, acquisition, services)"
```

---

## Task 8: Step 8 (summary + adaptive form)

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/steps/Step8Summary.tsx`

- [ ] **Step 1: Create Step8Summary.tsx**

Two main sections:

**Recap section:** Groups selections by category (Projet, Branding, Design, Contenu, Fonctionnalites, Acquisition, Services). Each category header is clickable (dispatches `SET_STEP` to go back). Each line item shows selection label + price. "Inclus" items in green. Empty categories hidden.

**Totals block:** Violet-bordered card:
- "Investissement unique" large: `AnimatedCounter` for min-max
- "Couts recurrents" (if > 0): violet, smaller
- "Delai estime": green
- Note: "Estimation indicative. Devis personnalise sous 48h."

**Form section:** Controlled inputs with Tailwind styling matching site (dark bg, zinc borders, focus:violet).

Fixed fields: firstName, lastName, company, email, phone, message (textarea).

Dynamic fields (conditionally rendered):
- `state.situation === 'redesign'` → URL du site actuel (input url)
- `state.siteType === 'ecommerce'` → Nombre de produits (select: 1-50 / 51-200 / 201-1000 / 1000+)
- `state.branding === 'create'` → Description activite (textarea)
- `state.services.includes('rush')` → Date de lancement (input date)
- `state.sector === 'restaurant'` → Nombre d'etablissements (input number)
- `state.siteType === 'webapp'` → Description fonctionnalites (textarea)

Optional always-visible: Budget (select), Delai souhaite (select).

Honeypot: hidden `_gotcha` field.

Submit button: violet filled, "Recevoir mon estimation detaillee". Loading state with spinner. Success state replaces form with confirmation message + checkmark.

On submit: POST to `/api/estimation` with full state + calculated prices. Uses `fetch`.

- [ ] **Step 2: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/steps/Step8Summary.tsx
git commit -m "feat(estimation): step 8 summary with adaptive form"
```

---

## Task 9: Main Estimator orchestrator

**Files:**
- Create: `src/app/agence-digitale/creation-site-web/_components/Estimator.tsx`

- [ ] **Step 1: Create Estimator.tsx**

`'use client'` component. Wraps everything in `EstimatorProvider`.

Layout: `max-w-[1200px] mx-auto` with `lg:grid lg:grid-cols-[1fr_320px] lg:gap-8`.

Left column:
- Section title: `<h2>` "Estimez votre projet web" with `GradText`
- `TrustBanner`
- `EstimatorProgress`
- `AnimatePresence mode="wait"` wrapping the current step component (keyed by step number)
- `EstimatorNav`

Right column (desktop only):
- `EstimatorCounter`

Bottom (mobile only):
- `EstimatorCounter` (bottom bar variant)

Step transitions use `motion.div` with `initial={{ opacity: 0, x: direction * 50 }}`, `animate={{ opacity: 1, x: 0 }}`, `exit={{ opacity: 0, x: direction * -50 }}`.

Step rendering: switch on `currentStep` (1-8) returning the corresponding Step component.

Nav logic:
- `canGoBack`: `currentStep > 1`
- `canSkip`: steps 2, 4, 5, 6, 7
- `canProceed`: step-specific validation (step 1 needs all 3 fields, step 3 needs all 3 fields, others always true)
- `isLastStep`: `currentStep === 7` (step 8 has its own submit)

- [ ] **Step 2: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/_components/Estimator.tsx
git commit -m "feat(estimation): main estimator orchestrator with transitions"
```

---

## Task 10: API route (Resend + Notion)

**Files:**
- Create: `src/app/api/estimation/route.ts`

- [ ] **Step 1: Create the API route**

Follow the pattern from `src/app/api/contact/route.ts`:
- Rate limit: 3 per IP per 15 min (stricter than contact since it creates Notion entries)
- Honeypot check (`_gotcha`)
- Parse + validate with `estimationRequestSchema`
- Recalculate price server-side using `calculateEstimate()` (reconstruct state from request)
- Send confirmation email to prospect (Resend, from `estimation@dkdp.ch`, subject: "Votre estimation DKDP")
- Send notification email to David (Resend, from `estimation@dkdp.ch`, to `dk@dkdp.ch`, subject includes type + company name)
- Create Notion page (database ID from `process.env.NOTION_ESTIMATION_DB_ID`)

Notion page properties: Nom, Entreprise, Email, Tel, Type de site, Secteur, Prix min, Prix max, Mensuel, Delai, Selections (JSON string in rich text), Date (created_time).

Email templates: inline HTML tables matching the pattern from contact route. Prospect email includes a summary of their selections + price estimate. David email includes all raw data.

- [ ] **Step 2: Add env vars to .env.example (not .env itself)**

Add comments in the route.ts file documenting required env vars:
- `RESEND_API_KEY` (already exists)
- `NOTION_API_KEY` (new)
- `NOTION_ESTIMATION_DB_ID` (new)

- [ ] **Step 3: Commit**

```bash
git add src/app/api/estimation/route.ts
git commit -m "feat(estimation): API route with Resend emails + Notion storage"
```

---

## Task 11: Integration on page + routes.ts

**Files:**
- Modify: `src/app/agence-digitale/creation-site-web/page.tsx`
- Modify: `src/lib/routes.ts` (if subnav links are defined there)

- [ ] **Step 1: Add dynamic import + section to page.tsx**

In the page file, add:
- `const Estimator = dynamic(() => import('./_components/Estimator').then(m => ({ default: m.Estimator })), { ssr: false })`
- Insert `<section id="estimation" className="scroll-mt-[124px]"><Estimator /></section>` between the ProcessTimeline/process section and the Testimonials section.

Find the exact insertion point by reading the current page structure.

- [ ] **Step 2: Add subnav link if applicable**

Check if the page has a subnav component. If yes, add an "Estimation" link pointing to `#estimation`.

- [ ] **Step 3: Run build to verify no errors**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp"
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/agence-digitale/creation-site-web/page.tsx
git commit -m "feat(estimation): integrate estimator on creation-site-web page"
```

---

## Task 12: Visual QA + responsive testing

**Files:** No new files. This task is manual testing via `npm run dev`.

- [ ] **Step 1: Start dev server and test desktop flow**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp"
npm run dev
```

Open `http://localhost:3000/agence-digitale/creation-site-web#estimation`. Walk through all 8 steps. Verify:
- Progress bar updates correctly
- Counter animates on selection changes
- Back/skip navigation works
- Step transitions animate correctly
- Summary shows correct totals
- Form submission works (check console for API errors)

- [ ] **Step 2: Test mobile responsive**

Use browser dev tools at 375px width. Verify:
- Bottom bar counter visible and functional
- Cards stack in single column
- Progress bar shows dots
- All steps are usable on mobile
- No horizontal overflow

- [ ] **Step 3: Fix any visual issues found**

Address any layout, spacing, animation, or responsive bugs discovered.

- [ ] **Step 4: Run full test suite**

```bash
npx vitest run --reporter=verbose
```

Expected: All tests pass (existing + new).

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix(estimation): visual QA fixes and responsive adjustments"
```

---

## Summary

| Task | Description | Files |
|------|------------|-------|
| 1 | Types + validation + Notion SDK | `types.ts`, `validation.ts` |
| 2 | Pricing engine + sectors + tests | `pricing.ts`, `sectors.ts`, tests |
| 3 | Context + reducer | `EstimatorContext.tsx` |
| 4 | Shared UI components | 6 components in `ui/` |
| 5 | Progress + counter + nav | 3 layout components |
| 6 | Steps 1-4 | 4 step components |
| 7 | Steps 5-7 | 3 step components |
| 8 | Step 8 (summary + form) | 1 step component |
| 9 | Main orchestrator | `Estimator.tsx` |
| 10 | API route | `route.ts` |
| 11 | Page integration | `page.tsx` modification |
| 12 | Visual QA | Testing + fixes |
