import type {
  SiteType,
  PageRange,
  LanguageOption,
  DesignLevel,
  LogoOption,
  BrandingOption,
  StrategyOption,
  CopywritingOption,
  VisualsOption,
  FeatureId,
  SeoOption,
  AcquisitionOption,
  AutomationOption,
  ServiceOption,
  EstimationState,
  PriceEstimate,
} from './types'

// ── Base prices ──

export const BASE_PRICES: Record<SiteType, { min: number; max: number }> = {
  vitrine: { min: 2500, max: 4000 },
  ecommerce: { min: 5000, max: 8000 },
  landing: { min: 1000, max: 2000 },
  webapp: { min: 8000, max: 15000 },
}

export const REDESIGN_SURCHARGE = { min: 300, max: 800 }

// ── Multipliers ──

export const PAGE_MULTIPLIERS: Record<PageRange, number> = {
  '1-5': 1,
  '6-10': 1.3,
  '11-20': 1.6,
  '20+': 2,
  unsure: 1,
}

export const LANG_MULTIPLIERS: Record<LanguageOption, number> = {
  '1': 1,
  '2': 1.3,
  '3+': 1.5,
}

export const DESIGN_MULTIPLIERS: Record<DesignLevel, number> = {
  template: 1,
  custom: 1.4,
  premium: 1.7,
}

export const PAGE_MIDPOINTS: Record<PageRange, number> = {
  '1-5': 3,
  '6-10': 8,
  '11-20': 15,
  '20+': 25,
  unsure: 3,
}

// ── Logo & Branding prices ──

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

// ── Strategy prices ──

export const STRATEGY_PRICES: Record<StrategyOption, number> = {
  positioning: 800,
  'market-study': 600,
  'content-strategy': 1200,
}

// ── Copywriting prices (per page) ──

export const COPYWRITING_PRICES: Record<CopywritingOption, number> = {
  provided: 0,
  basic: 80,
  professional: 200,
}

// ── Visuals prices ──

export const VISUALS_PRICES: Record<VisualsOption, { min: number; max: number }> = {
  provided: { min: 0, max: 0 },
  stock: { min: 300, max: 600 },
  ai: { min: 400, max: 800 },
  shooting: { min: 800, max: 2500 },
}

// ── Feature prices ──

export const FEATURE_PRICES: Record<FeatureId, { min: number; max: number; monthly: number }> = {
  'blog-setup': { min: 800, max: 800, monthly: 0 },
  'blog-management': { min: 0, max: 0, monthly: 300 },
  form: { min: 400, max: 400, monthly: 0 },
  booking: { min: 1200, max: 1200, monthly: 0 },
  members: { min: 2000, max: 2000, monthly: 0 },
  chatbot: { min: 1500, max: 1500, monthly: 0 },
  payment: { min: 1800, max: 1800, monthly: 0 },
  newsletter: { min: 300, max: 300, monthly: 0 },
  gallery: { min: 500, max: 500, monthly: 0 },
  'extra-pages': { min: 200, max: 200, monthly: 0 },
}

// ── SEO prices ──

export const SEO_PRICES: Record<SeoOption, { min: number; max: number; monthly: number }> = {
  'advanced-oneshot': { min: 1500, max: 1500, monthly: 0 },
  monthly: { min: 0, max: 0, monthly: 600 },
}

// ── Acquisition prices ──

export const ACQUISITION_PRICES: Record<AcquisitionOption, { min: number; max: number; monthly: number }> = {
  sea: { min: 0, max: 0, monthly: 400 },
  social: { min: 0, max: 0, monthly: 600 },
  funnel: { min: 2000, max: 4000, monthly: 0 },
}

// ── Automation prices ──

export const AUTOMATION_PRICES: Record<AutomationOption, { min: number; max: number }> = {
  crm: { min: 800, max: 1500 },
  'email-marketing': { min: 1200, max: 2500 },
  workflows: { min: 500, max: 2000 },
  dashboard: { min: 600, max: 1200 },
}

// ── Services prices ──

export const SERVICE_PRICES: Record<ServiceOption, { min: number; max: number; monthly: number }> = {
  maintenance: { min: 0, max: 0, monthly: 150 },
  training: { min: 200, max: 200, monthly: 0 },
  rgpd: { min: 500, max: 500, monthly: 0 },
  video: { min: 1500, max: 4000, monthly: 0 },
  rush: { min: 0, max: 0, monthly: 0 }, // +30% handled separately
}

// ── Delay bases (weeks [min, max]) ──

export const DELAY_BASE: Record<SiteType, [number, number]> = {
  vitrine: [3, 5],
  ecommerce: [6, 10],
  landing: [1, 2],
  webapp: [8, 14],
}

// ── Main calculation function ──

export function calculateEstimate(state: EstimationState): PriceEstimate {
  const { siteType } = state

  // Need at least siteType to start calculating
  if (!siteType) {
    return {
      totalMin: 0,
      totalMax: 0,
      monthlyMin: 0,
      monthlyMax: 0,
      weeksMin: 0,
      weeksMax: 0,
    }
  }

  // Use defaults for fields not yet selected
  const pages = state.pages ?? '1-5'
  const languages = state.languages ?? '1'
  const designLevel = state.designLevel ?? 'template'

  // ── 1. Base price ──
  const base = BASE_PRICES[siteType]
  let uniqueMin = base.min
  let uniqueMax = base.max

  // ── 2. Additive multiplier ──
  const pagesMult = PAGE_MULTIPLIERS[pages]
  const langMult = LANG_MULTIPLIERS[languages]
  const designMult = DESIGN_MULTIPLIERS[designLevel]
  const totalMultiplier = 1 + (pagesMult - 1) + (langMult - 1) + (designMult - 1)

  uniqueMin = Math.round(uniqueMin * totalMultiplier)
  uniqueMax = Math.round(uniqueMax * totalMultiplier)

  // ── 3. Redesign surcharge ──
  if (state.situation === 'redesign') {
    uniqueMin += REDESIGN_SURCHARGE.min
    uniqueMax += REDESIGN_SURCHARGE.max
  }

  // ── 4. Logo ──
  if (state.logo) {
    const lp = LOGO_PRICES[state.logo]
    uniqueMin += lp.min
    uniqueMax += lp.max
  }

  // ── 5. Branding ──
  if (state.branding) {
    const bp = BRANDING_PRICES[state.branding]
    uniqueMin += bp.min
    uniqueMax += bp.max
  }

  // ── 6. Strategy ──
  for (const s of state.strategy) {
    const sp = STRATEGY_PRICES[s]
    uniqueMin += sp
    uniqueMax += sp
  }

  // ── 7. Copywriting (per page using midpoint) ──
  if (state.copywriting) {
    const rate = COPYWRITING_PRICES[state.copywriting]
    const midpoint = PAGE_MIDPOINTS[pages]
    const copyTotal = rate * midpoint
    uniqueMin += copyTotal
    uniqueMax += copyTotal
  }

  // ── 8. Visuals ──
  if (state.visuals) {
    const vp = VISUALS_PRICES[state.visuals]
    uniqueMin += vp.min
    uniqueMax += vp.max
  }

  // ── 9. Features ──
  let monthlyMin = 0
  let monthlyMax = 0

  for (const f of state.features) {
    const fp = FEATURE_PRICES[f]
    uniqueMin += fp.min
    uniqueMax += fp.max
    monthlyMin += fp.monthly
    monthlyMax += fp.monthly
  }

  // ── 10. SEO ──
  for (const s of state.seo) {
    const sp = SEO_PRICES[s]
    uniqueMin += sp.min
    uniqueMax += sp.max
    monthlyMin += sp.monthly
    monthlyMax += sp.monthly
  }

  // ── 11. Acquisition ──
  for (const a of state.acquisition) {
    const ap = ACQUISITION_PRICES[a]
    uniqueMin += ap.min
    uniqueMax += ap.max
    monthlyMin += ap.monthly
    monthlyMax += ap.monthly
  }

  // ── 12. Automation ──
  for (const a of state.automation) {
    const ap = AUTOMATION_PRICES[a]
    uniqueMin += ap.min
    uniqueMax += ap.max
  }

  // ── 13. Services (except rush) ──
  for (const s of state.services) {
    if (s === 'rush') continue
    const sp = SERVICE_PRICES[s]
    uniqueMin += sp.min
    uniqueMax += sp.max
    monthlyMin += sp.monthly
    monthlyMax += sp.monthly
  }

  // ── 14. Rush: +30% on total unique ──
  if (state.services.includes('rush')) {
    uniqueMin = Math.round(uniqueMin * 1.3)
    uniqueMax = Math.round(uniqueMax * 1.3)
  }

  // ── 15. Delay calculation ──
  const [baseWeeksMin, baseWeeksMax] = DELAY_BASE[siteType]
  let weeksMin = baseWeeksMin
  let weeksMax = baseWeeksMax

  if (state.branding === 'create') {
    weeksMin += 2
    weeksMax += 3
  }
  if (state.logo === 'create') {
    weeksMin += 1
    weeksMax += 2
  }
  if (pages === '20+') {
    weeksMin += 2
    weeksMax += 2
  }
  if (designLevel === 'premium') {
    weeksMin += 2
    weeksMax += 2
  }

  if (state.services.includes('rush')) {
    weeksMin = Math.round(weeksMin * 0.6)
    weeksMax = Math.round(weeksMax * 0.6)
  }

  return {
    totalMin: uniqueMin,
    totalMax: uniqueMax,
    monthlyMin,
    monthlyMax,
    weeksMin,
    weeksMax,
  }
}
