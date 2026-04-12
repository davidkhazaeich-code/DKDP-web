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
  direction: 1 | -1

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

// ── API request ──

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
