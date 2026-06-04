'use client'

import { useState, FormEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Pencil, CheckCircle, Loader2, Download,
  User, Building2, Mail, Phone, Link,
  Calendar, Code2, MessageSquare,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { calculateEstimate } from '@/lib/estimation/pricing'
import { SECTORS } from '@/lib/estimation/sectors'
import type { EstimationRequest, Sector } from '@/lib/estimation/types'
import type { Locale } from '@/i18n/config'

// ── Label maps (FR / EN) ──

const LABELS = {
  fr: {
    situation: { new: 'Nouveau site', redesign: 'Refonte' } as Record<string, string>,
    siteType: {
      vitrine: 'Site vitrine',
      ecommerce: 'E-commerce',
      landing: 'Landing page',
      webapp: 'Application web',
    } as Record<string, string>,
    logo: {
      existing: 'Logo existant',
      create: 'Création de logo',
      modernize: 'Modernisation du logo',
    } as Record<string, string>,
    branding: {
      existing: 'Charte existante',
      create: 'Création identité visuelle',
      modernize: 'Modernisation identité',
    } as Record<string, string>,
    strategy: {
      positioning: 'Positionnement',
      'market-study': 'Étude de marché',
      'content-strategy': 'Stratégie de contenu',
    } as Record<string, string>,
    designLevel: {
      template: 'Template adapté',
      custom: 'Sur mesure',
      premium: 'Premium',
    } as Record<string, string>,
    copywriting: {
      provided: 'Contenu fourni',
      basic: 'Rédaction basique',
      professional: 'Rédaction professionnelle',
    } as Record<string, string>,
    visuals: {
      provided: 'Visuels fournis',
      stock: "Banque d'images",
      ai: 'Génération IA',
      shooting: 'Shooting professionnel',
    } as Record<string, string>,
    feature: {
      'blog-setup': 'Création de blog',
      'blog-management': 'Gestion de blog',
      form: 'Formulaire',
      booking: 'Réservations',
      members: 'Espace membres',
      chatbot: 'Chatbot IA',
      payment: 'Paiement en ligne',
      newsletter: 'Newsletter',
      gallery: 'Galerie',
      'extra-pages': 'Pages supplémentaires',
    } as Record<string, string>,
    seo: {
      'advanced-oneshot': 'SEO avancé',
      monthly: 'SEO mensuel',
    } as Record<string, string>,
    acquisition: {
      sea: 'Google Ads',
      social: 'Réseaux sociaux',
      funnel: 'Funnel de conversion',
    } as Record<string, string>,
    automation: {
      crm: 'CRM',
      'email-marketing': 'Email marketing',
      workflows: 'Workflows automatisés',
      dashboard: 'Dashboard analytics',
    } as Record<string, string>,
    service: {
      maintenance: 'Maintenance',
      training: 'Formation',
      rgpd: 'Conformité RGPD',
      video: 'Production vidéo',
      rush: 'Livraison express (+30%)',
    } as Record<string, string>,
    pages: {
      '1-5': '1-5 pages',
      '6-10': '6-10 pages',
      '11-20': '11-20 pages',
      '20+': '20+ pages',
      unsure: 'À définir ensemble',
    } as Record<string, string>,
    languages: {
      '1': '1 langue',
      '2': '2 langues',
      '3+': '3+ langues',
    } as Record<string, string>,
  },
  en: {
    situation: { new: 'New website', redesign: 'Redesign' } as Record<string, string>,
    siteType: {
      vitrine: 'Showcase site',
      ecommerce: 'E-commerce',
      landing: 'Landing page',
      webapp: 'Web application',
    } as Record<string, string>,
    logo: {
      existing: 'Existing logo',
      create: 'Logo creation',
      modernize: 'Logo modernisation',
    } as Record<string, string>,
    branding: {
      existing: 'Existing brand guidelines',
      create: 'Visual identity creation',
      modernize: 'Identity modernisation',
    } as Record<string, string>,
    strategy: {
      positioning: 'Positioning',
      'market-study': 'Market research',
      'content-strategy': 'Content strategy',
    } as Record<string, string>,
    designLevel: {
      template: 'Adapted template',
      custom: 'Custom',
      premium: 'Premium',
    } as Record<string, string>,
    copywriting: {
      provided: 'Content provided',
      basic: 'Basic copywriting',
      professional: 'Professional copywriting',
    } as Record<string, string>,
    visuals: {
      provided: 'Visuals provided',
      stock: 'Stock images',
      ai: 'AI generation',
      shooting: 'Professional photo shoot',
    } as Record<string, string>,
    feature: {
      'blog-setup': 'Blog setup',
      'blog-management': 'Blog management',
      form: 'Form',
      booking: 'Bookings',
      members: 'Member area',
      chatbot: 'AI chatbot',
      payment: 'Online payment',
      newsletter: 'Newsletter',
      gallery: 'Gallery',
      'extra-pages': 'Additional pages',
    } as Record<string, string>,
    seo: {
      'advanced-oneshot': 'Advanced SEO',
      monthly: 'Monthly SEO',
    } as Record<string, string>,
    acquisition: {
      sea: 'Google Ads',
      social: 'Social media',
      funnel: 'Conversion funnel',
    } as Record<string, string>,
    automation: {
      crm: 'CRM',
      'email-marketing': 'Email marketing',
      workflows: 'Automated workflows',
      dashboard: 'Analytics dashboard',
    } as Record<string, string>,
    service: {
      maintenance: 'Maintenance',
      training: 'Training',
      rgpd: 'GDPR compliance',
      video: 'Video production',
      rush: 'Express delivery (+30%)',
    } as Record<string, string>,
    pages: {
      '1-5': '1-5 pages',
      '6-10': '6-10 pages',
      '11-20': '11-20 pages',
      '20+': '20+ pages',
      unsure: 'To define together',
    } as Record<string, string>,
    languages: {
      '1': '1 language',
      '2': '2 languages',
      '3+': '3+ languages',
    } as Record<string, string>,
  },
} as const

const SECTOR_LABELS_EN: Record<Sector, string> = {
  restaurant: 'Restaurant / Hotel',
  health: 'Health / Medical',
  legal: 'Legal / Accounting',
  'real-estate': 'Real estate',
  retail: 'Retail',
  services: 'Services / Consulting',
  tech: 'Tech / SaaS',
  artisan: 'Trades / Construction',
  training: 'Training / Coaching',
  other: 'Other',
}

// ── UI text (FR / EN) ──

const UI_T = {
  fr: {
    catProjet: 'Projet',
    catBranding: 'Branding',
    catEnvergure: 'Envergure',
    catContenu: 'Contenu',
    catFonctionnalites: 'Fonctionnalités',
    catAcquisition: 'Acquisition',
    catServices: 'Services',
    oneTimeInvestment: 'Investissement unique',
    recurringCosts: 'Coûts récurrents',
    perMonth: '/mois',
    estimatedDelay: 'Délai estimé',
    weeks: 'semaines',
    indicativeNote: 'Estimation indicative. Devis personnalisé sous 48h.',
    successTitle: (name: string) => `Merci, ${name} !`,
    successYou: 'vous',
    successMessage: 'Votre estimation a été envoyée avec succès. Vous recevrez un devis détaillé sous 48h.',
    downloadPdf: 'Télécharger le PDF',
    requiredFields: 'Champs obligatoires',
    optional: '(optionnel)',
    firstName: 'Prénom',
    firstNamePlaceholder: 'Marie',
    lastName: 'Nom',
    lastNamePlaceholder: 'Dupont',
    company: 'Entreprise',
    companyPlaceholder: 'Mon Entreprise SA',
    email: 'Email',
    emailPlaceholder: 'marie@entreprise.ch',
    phone: 'Téléphone',
    phonePlaceholder: '+41 79 000 00 00',
    currentSiteUrl: 'URL du site actuel',
    currentSiteUrlPlaceholder: 'https://www.votresite.ch',
    launchDate: 'Date de lancement souhaitée',
    selectMonth: 'Sélectionnez un mois...',
    appDescription: 'Description des fonctionnalités',
    appDescriptionPlaceholder: "Décrivez les fonctionnalités principales de votre application...",
    message: 'Message (optionnel)',
    messagePlaceholder: 'Informations complémentaires, questions...',
    serverError: (status: number) => `Erreur serveur (${status})`,
    genericError: 'Une erreur est survenue. Veuillez réessayer.',
    submitting: 'Envoi en cours...',
    submit: 'Recevoir mon estimation détaillée',
    monthLocale: 'fr-CH',
  },
  en: {
    catProjet: 'Project',
    catBranding: 'Branding',
    catEnvergure: 'Scope',
    catContenu: 'Content',
    catFonctionnalites: 'Features',
    catAcquisition: 'Acquisition',
    catServices: 'Services',
    oneTimeInvestment: 'One-time investment',
    recurringCosts: 'Recurring costs',
    perMonth: '/month',
    estimatedDelay: 'Estimated timeline',
    weeks: 'weeks',
    indicativeNote: 'Indicative estimate. Personalised quote within 48h.',
    successTitle: (name: string) => `Thank you, ${name}!`,
    successYou: 'there',
    successMessage: 'Your estimate has been sent successfully. You will receive a detailed quote within 48h.',
    downloadPdf: 'Download the PDF',
    requiredFields: 'Required fields',
    optional: '(optional)',
    firstName: 'First name',
    firstNamePlaceholder: 'Marie',
    lastName: 'Last name',
    lastNamePlaceholder: 'Smith',
    company: 'Company',
    companyPlaceholder: 'My Company Ltd',
    email: 'Email',
    emailPlaceholder: 'marie@company.ch',
    phone: 'Phone',
    phonePlaceholder: '+41 79 000 00 00',
    currentSiteUrl: 'Current website URL',
    currentSiteUrlPlaceholder: 'https://www.yoursite.ch',
    launchDate: 'Preferred launch date',
    selectMonth: 'Select a month...',
    appDescription: 'Description of features',
    appDescriptionPlaceholder: 'Describe the main features of your application...',
    message: 'Message (optional)',
    messagePlaceholder: 'Additional information, questions...',
    serverError: (status: number) => `Server error (${status})`,
    genericError: 'An error occurred. Please try again.',
    submitting: 'Sending...',
    submit: 'Get my detailed estimate',
    monthLocale: 'en-GB',
  },
} as const

// ── Helpers ──

/** Returns true for items that cost 0 (included) */
function isIncluded(price: string): boolean {
  return price === 'Inclus' || price === 'Included'
}

function formatCHF(min: number, max: number): string {
  const fmt = (n: number) =>
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "'")
  if (min === max) return `CHF ${fmt(min)}`
  return `CHF ${fmt(min)}-${fmt(max)}`
}

// ── Sub-components ──

interface LineItem {
  label: string
  price: string
}

interface CategoryBlockProps {
  title: string
  step: number
  items: LineItem[]
}

function CategoryBlock({ title, step, items }: CategoryBlockProps) {
  const { dispatch } = useEstimator()

  if (items.length === 0) return null

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_STEP', step })}
        className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary cursor-pointer hover:text-violet-500 transition-colors"
      >
        <Pencil size={12} className="opacity-70" />
        {title}
      </button>
      <div className="space-y-1 rounded-xl border border-border bg-[var(--surface-subtle)] px-4 py-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-secondary">{item.label}</span>
            <span
              className={[
                'text-sm font-medium whitespace-nowrap',
                isIncluded(item.price) ? 'text-emerald-500' : 'text-text',
              ].join(' ')}
            >
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Input components ──

function InputField({
  label,
  id,
  required = false,
  optional = false,
  optionalLabel = '(optionnel)',
  icon,
  children,
}: {
  label: string
  id: string
  required?: boolean
  optional?: boolean
  optionalLabel?: string
  icon?: ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-text-secondary mb-1 flex items-center gap-1.5">
        {icon && <span className="text-text-muted">{icon}</span>}
        {label}
        {required && <span className="text-violet-500 ml-1">*</span>}
        {optional && <span className="text-text-muted ml-1 font-normal text-xs">{optionalLabel}</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-[color:var(--border)] bg-[var(--surface-default)] px-4 py-3 text-text placeholder:text-text-muted focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30'

// ── Main component ──

export function Step8Summary() {
  const { state, dispatch, lang } = useEstimator()
  const L = LABELS[lang]
  const ui = UI_T[lang]
  const includedLabel = lang === 'en' ? 'Included' : 'Inclus'
  const perMonthSuffix = lang === 'en' ? '/month' : '/mois'
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [pdfData, setPdfData] = useState<{ base64: string; filename: string } | null>(null)
  const estimate = calculateEstimate(state)

  // ── Build recap items ──

  const getSectorLabel = (id: string | null): string => {
    if (!id) return ''
    if (lang === 'en' && (id as Sector) in SECTOR_LABELS_EN) return SECTOR_LABELS_EN[id as Sector]
    return SECTORS.find((s) => s.id === id)?.label ?? id
  }

  // Category 1: Projet
  const projetItems: LineItem[] = []
  if (state.situation) {
    projetItems.push({ label: L.situation[state.situation] ?? state.situation, price: includedLabel })
  }
  if (state.siteType) {
    projetItems.push({ label: L.siteType[state.siteType] ?? state.siteType, price: includedLabel })
  }
  if (state.sector) {
    projetItems.push({ label: getSectorLabel(state.sector), price: includedLabel })
  }

  // Category 2: Branding
  const brandingItems: LineItem[] = []
  if (state.logo) {
    const price =
      state.logo === 'existing'
        ? includedLabel
        : state.logo === 'create'
        ? 'CHF 800-1\'500'
        : 'CHF 500-1\'000'
    brandingItems.push({ label: L.logo[state.logo] ?? state.logo, price })
  }
  if (state.branding) {
    const price =
      state.branding === 'existing'
        ? includedLabel
        : state.branding === 'create'
        ? 'CHF 1\'000-2\'000'
        : 'CHF 600-1\'200'
    brandingItems.push({ label: L.branding[state.branding] ?? state.branding, price })
  }
  for (const s of state.strategy) {
    const stratPrices: Record<string, string> = {
      positioning: 'CHF 800',
      'market-study': 'CHF 600',
      'content-strategy': 'CHF 1\'200',
    }
    brandingItems.push({
      label: L.strategy[s] ?? s,
      price: stratPrices[s] ?? '',
    })
  }

  // Category 3: Envergure
  const envergureItems: LineItem[] = []
  if (state.pages) {
    envergureItems.push({ label: L.pages[state.pages] ?? state.pages, price: includedLabel })
  }
  if (state.languages) {
    envergureItems.push({ label: L.languages[state.languages] ?? state.languages, price: includedLabel })
  }
  if (state.designLevel) {
    envergureItems.push({
      label: L.designLevel[state.designLevel] ?? state.designLevel,
      price: includedLabel,
    })
  }

  // Category 4: Contenu
  const contenuItems: LineItem[] = []
  if (state.copywriting) {
    const copyPrices: Record<string, string> = {
      provided: includedLabel,
      basic: 'CHF 80/page',
      professional: 'CHF 200/page',
    }
    contenuItems.push({
      label: L.copywriting[state.copywriting] ?? state.copywriting,
      price: copyPrices[state.copywriting] ?? '',
    })
  }
  if (state.visuals) {
    const visPrices: Record<string, string> = {
      provided: includedLabel,
      stock: 'CHF 300-600',
      ai: 'CHF 400-800',
      shooting: 'CHF 800-2\'500',
    }
    contenuItems.push({
      label: L.visuals[state.visuals] ?? state.visuals,
      price: visPrices[state.visuals] ?? '',
    })
  }

  // Category 5: Fonctionnalités
  const featuresItems: LineItem[] = []
  const featurePricesDisplay: Record<string, string> = {
    'blog-setup': 'CHF 800',
    'blog-management': `CHF 300${perMonthSuffix}`,
    form: 'CHF 400',
    booking: 'CHF 1\'200',
    members: 'CHF 2\'000',
    chatbot: 'CHF 1\'500',
    payment: 'CHF 1\'800',
    newsletter: 'CHF 300',
    gallery: 'CHF 500',
    'extra-pages': 'CHF 200',
  }
  for (const f of state.features) {
    featuresItems.push({
      label: L.feature[f] ?? f,
      price: featurePricesDisplay[f] ?? '',
    })
  }

  // Category 6: Acquisition
  const acquisitionItems: LineItem[] = []
  if (state.seo.length > 0) {
    const seoPricesDisplay: Record<string, string> = {
      'advanced-oneshot': 'CHF 1\'500',
      monthly: `CHF 600${perMonthSuffix}`,
    }
    for (const s of state.seo) {
      acquisitionItems.push({
        label: L.seo[s] ?? s,
        price: seoPricesDisplay[s] ?? '',
      })
    }
  }
  for (const a of state.acquisition) {
    const acqPricesDisplay: Record<string, string> = {
      sea: `CHF 400${perMonthSuffix}`,
      social: `CHF 600${perMonthSuffix}`,
      funnel: 'CHF 2\'000-4\'000',
    }
    acquisitionItems.push({
      label: L.acquisition[a] ?? a,
      price: acqPricesDisplay[a] ?? '',
    })
  }
  for (const a of state.automation) {
    const autoPricesDisplay: Record<string, string> = {
      crm: 'CHF 800-1\'500',
      'email-marketing': 'CHF 1\'200-2\'500',
      workflows: 'CHF 500-2\'000',
      dashboard: 'CHF 600-1\'200',
    }
    acquisitionItems.push({
      label: L.automation[a] ?? a,
      price: autoPricesDisplay[a] ?? '',
    })
  }

  // Category 7: Services
  const servicesItems: LineItem[] = []
  const servicePricesDisplay: Record<string, string> = {
    maintenance: `CHF 150${perMonthSuffix}`,
    training: 'CHF 200',
    rgpd: 'CHF 500',
    video: 'CHF 1\'500-4\'000',
    rush: '+30%',
  }
  for (const s of state.services) {
    servicesItems.push({
      label: L.service[s] ?? s,
      price: servicePricesDisplay[s] ?? '',
    })
  }

  // ── Contact field helper ──
  const setField = (field: keyof typeof state.contact) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    dispatch({ type: 'SET_CONTACT_FIELD', field, value: e.target.value })
  }

  // ── Form submit ──
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!state.situation || !state.siteType) return

    dispatch({ type: 'SET_SUBMITTING', value: true })

    const payload: EstimationRequest = {
      situation: state.situation,
      siteType: state.siteType,
      sector: state.sector,
      logo: state.logo,
      branding: state.branding,
      strategy: state.strategy,
      pages: state.pages ?? '1-5',
      languages: state.languages ?? '1',
      designLevel: state.designLevel ?? 'template',
      copywriting: state.copywriting,
      visuals: state.visuals,
      features: state.features,
      seo: state.seo,
      acquisition: state.acquisition,
      automation: state.automation,
      services: state.services,
      contact: state.contact,
      estimatedTotal: { min: estimate.totalMin, max: estimate.totalMax },
      estimatedMonthly: { min: estimate.monthlyMin, max: estimate.monthlyMax },
      estimatedWeeks: { min: estimate.weeksMin, max: estimate.weeksMax },
    }

    try {
      const res = await fetch('/api/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(ui.serverError(res.status))
      }

      const result = await res.json()
      if (result.pdf) {
        setPdfData({ base64: result.pdf, filename: result.pdfFilename })
      }
      dispatch({ type: 'SET_SUBMITTED' })
    } catch (err) {
      dispatch({ type: 'SET_SUBMITTING', value: false })
      setErrorMessage(
        err instanceof Error ? err.message : ui.genericError
      )
    }
  }

  // ── Success state ──
  if (state.isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="flex flex-col items-center justify-center gap-6 py-12 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-text">
            {lang === 'en' ? (
              <>Thank you, {state.contact.firstName || ui.successYou}!</>
            ) : (
              <>Merci, {state.contact.firstName || ui.successYou}&nbsp;!</>
            )}
          </h3>
          <p className="text-text-secondary max-w-sm leading-relaxed">
            {ui.successMessage}
          </p>
        </div>
        {pdfData && (
          <button
            type="button"
            onClick={() => {
              const link = document.createElement('a')
              link.href = `data:application/pdf;base64,${pdfData.base64}`
              link.download = pdfData.filename
              link.click()
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            <Download size={18} />
            {ui.downloadPdf}
          </button>
        )}
      </motion.div>
    )
  }

  // Recap + totals sidebar content (reused in both layouts)
  const recapContent = (
    <div className="space-y-4">
      {/* Totals block at the top */}
      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5 space-y-3">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted mb-1.5">
            {ui.oneTimeInvestment}
          </p>
          <p className="text-2xl lg:text-xl xl:text-2xl font-bold text-text leading-tight tabular-nums">
            <AnimatedCounter value={estimate.totalMin} prefix="CHF" />
            {estimate.totalMin !== estimate.totalMax && (
              <>
                {' '}&ndash;{' '}
                <AnimatedCounter value={estimate.totalMax} prefix="" />
              </>
            )}
          </p>
        </div>
        {estimate.monthlyMin > 0 && (
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted mb-1">
              {ui.recurringCosts}
            </p>
            <p className="text-base font-semibold text-violet-500 tabular-nums">
              +{formatCHF(estimate.monthlyMin, estimate.monthlyMax)} {ui.perMonth}
            </p>
          </div>
        )}
        {estimate.weeksMin > 0 && (
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-text-muted mb-1">
              {ui.estimatedDelay}
            </p>
            <p className="text-base font-semibold text-emerald-500 tabular-nums">
              ~{estimate.weeksMin}
              {estimate.weeksMin !== estimate.weeksMax && `-${estimate.weeksMax}`}{' '}
              {ui.weeks}
            </p>
          </div>
        )}
        <p className="text-xs text-text-muted border-t border-violet-500/10 pt-3 leading-relaxed">
          {ui.indicativeNote}
        </p>
      </div>

      {/* Selections by category */}
      <CategoryBlock title={ui.catProjet} step={1} items={projetItems} />
      <CategoryBlock title={ui.catBranding} step={2} items={brandingItems} />
      <CategoryBlock title={ui.catEnvergure} step={3} items={envergureItems} />
      <CategoryBlock title={ui.catContenu} step={4} items={contenuItems} />
      <CategoryBlock title={ui.catFonctionnalites} step={5} items={featuresItems} />
      <CategoryBlock title={ui.catAcquisition} step={6} items={acquisitionItems} />
      <CategoryBlock title={ui.catServices} step={7} items={servicesItems} />
    </div>
  )

  return (
    <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
      {/* ── Left: form (desktop) / stacked (mobile) ── */}
      <div className="space-y-8">
        {/* Recap visible only on mobile/tablet */}
        <div className="lg:hidden">
          {recapContent}
        </div>

        {/* ── Contact form ── */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <p className="text-xs text-text-muted">
          <span className="text-violet-500">*</span> {ui.requiredFields}
        </p>
        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute -left-[9999px] -top-[9999px] opacity-0"
          autoComplete="off"
        />

        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <InputField label={ui.firstName} id="firstName" required icon={<User size={14} />}>
            <input
              id="firstName"
              type="text"
              required
              placeholder={ui.firstNamePlaceholder}
              value={state.contact.firstName}
              onChange={setField('firstName')}
              className={inputClass}
            />
          </InputField>
          <InputField label={ui.lastName} id="lastName" required icon={<User size={14} />}>
            <input
              id="lastName"
              type="text"
              required
              placeholder={ui.lastNamePlaceholder}
              value={state.contact.lastName}
              onChange={setField('lastName')}
              className={inputClass}
            />
          </InputField>
        </div>

        {/* Company */}
        <InputField label={ui.company} id="company" optional optionalLabel={ui.optional} icon={<Building2 size={14} />}>
          <input
            id="company"
            type="text"
            placeholder={ui.companyPlaceholder}
            value={state.contact.company}
            onChange={setField('company')}
            className={inputClass}
          />
        </InputField>

        {/* Email */}
        <InputField label={ui.email} id="email" required icon={<Mail size={14} />}>
          <input
            id="email"
            type="email"
            required
            placeholder={ui.emailPlaceholder}
            value={state.contact.email}
            onChange={setField('email')}
            className={inputClass}
          />
        </InputField>

        {/* Phone */}
        <InputField label={ui.phone} id="phone" optional optionalLabel={ui.optional} icon={<Phone size={14} />}>
          <input
            id="phone"
            type="tel"
            placeholder={ui.phonePlaceholder}
            value={state.contact.phone}
            onChange={setField('phone')}
            className={inputClass}
          />
        </InputField>

        {/* Dynamic: redesign → current URL */}
        {state.situation === 'redesign' && (
          <InputField label={ui.currentSiteUrl} id="currentSiteUrl" optional optionalLabel={ui.optional} icon={<Link size={14} />}>
            <input
              id="currentSiteUrl"
              type="url"
              placeholder={ui.currentSiteUrlPlaceholder}
              value={state.contact.currentSiteUrl}
              onChange={setField('currentSiteUrl')}
              className={inputClass}
            />
          </InputField>
        )}

        {/* Dynamic: rush → launch date (month selector, 12 months from now) */}
        {state.services.includes('rush') && (
          <InputField label={ui.launchDate} id="launchDate" optional optionalLabel={ui.optional} icon={<Calendar size={14} />}>
            <select
              id="launchDate"
              value={state.contact.launchDate}
              onChange={setField('launchDate')}
              className={inputClass}
            >
              <option value="" className="bg-bg-card text-text">{ui.selectMonth}</option>
              {Array.from({ length: 12 }, (_, i) => {
                const d = new Date()
                d.setMonth(d.getMonth() + i + 1)
                const label = d.toLocaleDateString(ui.monthLocale, { month: 'long', year: 'numeric' })
                const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
                return (
                  <option key={value} value={value} className="bg-bg-card text-text">
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </option>
                )
              })}
            </select>
          </InputField>
        )}

        {/* Dynamic: webapp → app description */}
        {state.siteType === 'webapp' && (
          <InputField label={ui.appDescription} id="appDescription" optional optionalLabel={ui.optional} icon={<Code2 size={14} />}>
            <textarea
              id="appDescription"
              rows={4}
              placeholder={ui.appDescriptionPlaceholder}
              value={state.contact.appDescription}
              onChange={setField('appDescription')}
              className={inputClass}
            />
          </InputField>
        )}

        {/* Message */}
        <InputField label={ui.message} id="message" icon={<MessageSquare size={14} />}>
          <textarea
            id="message"
            rows={4}
            placeholder={ui.messagePlaceholder}
            value={state.contact.message}
            onChange={setField('message')}
            className={inputClass}
          />
        </InputField>

        {/* Error message */}
        {errorMessage && (
          <p className="text-sm text-red-400 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            {errorMessage}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={state.isSubmitting}
          className={[
            'w-full bg-violet-600 hover:bg-violet-500 text-white py-4 rounded-xl font-semibold text-lg transition-all',
            state.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
        >
          {state.isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" />
              {ui.submitting}
            </span>
          ) : (
            ui.submit
          )}
        </button>
      </form>
      </div>

      {/* ── Right: sticky recap (desktop only) ── */}
      <div className="hidden lg:block">
        <div className="sticky top-[140px]">
          {recapContent}
        </div>
      </div>
    </div>
  )
}
