'use client'

import { useState, FormEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Pencil, CheckCircle, Loader2,
  User, Building2, Mail, Phone, Link,
  Calendar, Code2, MessageSquare,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { calculateEstimate } from '@/lib/estimation/pricing'
import { SECTORS } from '@/lib/estimation/sectors'
import type { EstimationRequest } from '@/lib/estimation/types'

// ── Label maps ──

const SITUATION_LABELS: Record<string, string> = {
  new: 'Nouveau site',
  redesign: 'Refonte',
}

const SITE_TYPE_LABELS: Record<string, string> = {
  vitrine: 'Site vitrine',
  ecommerce: 'E-commerce',
  landing: 'Landing page',
  webapp: 'Application web',
}

const LOGO_LABELS: Record<string, string> = {
  existing: 'Logo existant',
  create: 'Création de logo',
  modernize: 'Modernisation du logo',
}

const BRANDING_LABELS: Record<string, string> = {
  existing: 'Charte existante',
  create: 'Création identité visuelle',
  modernize: 'Modernisation identité',
}

const STRATEGY_LABELS: Record<string, string> = {
  positioning: 'Positionnement',
  'market-study': 'Étude de marché',
  'content-strategy': 'Stratégie de contenu',
}

const DESIGN_LEVEL_LABELS: Record<string, string> = {
  template: 'Template adapté',
  custom: 'Sur mesure',
  premium: 'Premium',
}

const COPYWRITING_LABELS: Record<string, string> = {
  provided: 'Contenu fourni',
  basic: 'Rédaction basique',
  professional: 'Rédaction professionnelle',
}

const VISUALS_LABELS: Record<string, string> = {
  provided: 'Visuels fournis',
  stock: "Banque d'images",
  ai: 'Génération IA',
  shooting: 'Shooting professionnel',
}

const FEATURE_LABELS: Record<string, string> = {
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
}

const SEO_LABELS: Record<string, string> = {
  'advanced-oneshot': 'SEO avancé',
  monthly: 'SEO mensuel',
}

const ACQUISITION_LABELS: Record<string, string> = {
  sea: 'Google Ads',
  social: 'Réseaux sociaux',
  funnel: 'Funnel de conversion',
}

const AUTOMATION_LABELS: Record<string, string> = {
  crm: 'CRM',
  'email-marketing': 'Email marketing',
  workflows: 'Workflows automatisés',
  dashboard: 'Dashboard analytics',
}

const SERVICE_LABELS: Record<string, string> = {
  maintenance: 'Maintenance',
  training: 'Formation',
  rgpd: 'Conformité RGPD',
  video: 'Production vidéo',
  rush: 'Livraison express (+30%)',
}

// ── Helpers ──

/** Returns true for items that cost 0 (included) */
function isIncluded(price: string): boolean {
  return price === 'Inclus'
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
        className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300 cursor-pointer hover:text-violet-400 transition-colors"
      >
        <Pencil size={12} className="opacity-70" />
        {title}
      </button>
      <div className="space-y-1 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-400">{item.label}</span>
            <span
              className={[
                'text-sm font-medium whitespace-nowrap',
                isIncluded(item.price) ? 'text-emerald-400' : 'text-zinc-300',
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
  icon,
  children,
}: {
  label: string
  id: string
  required?: boolean
  optional?: boolean
  icon?: ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
        {icon && <span className="text-zinc-500">{icon}</span>}
        {label}
        {required && <span className="text-violet-400 ml-1">*</span>}
        {optional && <span className="text-zinc-600 ml-1 font-normal text-xs">(optionnel)</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30'

// ── Main component ──

export function Step8Summary() {
  const { state, dispatch } = useEstimator()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const estimate = calculateEstimate(state)

  // ── Build recap items ──

  const getSectorLabel = (id: string | null): string => {
    if (!id) return ''
    return SECTORS.find((s) => s.id === id)?.label ?? id
  }

  // Category 1: Projet
  const projetItems: LineItem[] = []
  if (state.situation) {
    projetItems.push({ label: SITUATION_LABELS[state.situation] ?? state.situation, price: 'Inclus' })
  }
  if (state.siteType) {
    projetItems.push({ label: SITE_TYPE_LABELS[state.siteType] ?? state.siteType, price: 'Inclus' })
  }
  if (state.sector) {
    projetItems.push({ label: getSectorLabel(state.sector), price: 'Inclus' })
  }

  // Category 2: Branding
  const brandingItems: LineItem[] = []
  if (state.logo) {
    const price =
      state.logo === 'existing'
        ? 'Inclus'
        : state.logo === 'create'
        ? 'CHF 800-1\'500'
        : 'CHF 500-1\'000'
    brandingItems.push({ label: LOGO_LABELS[state.logo] ?? state.logo, price })
  }
  if (state.branding) {
    const price =
      state.branding === 'existing'
        ? 'Inclus'
        : state.branding === 'create'
        ? 'CHF 1\'000-2\'000'
        : 'CHF 600-1\'200'
    brandingItems.push({ label: BRANDING_LABELS[state.branding] ?? state.branding, price })
  }
  for (const s of state.strategy) {
    const stratPrices: Record<string, string> = {
      positioning: 'CHF 800',
      'market-study': 'CHF 600',
      'content-strategy': 'CHF 1\'200',
    }
    brandingItems.push({
      label: STRATEGY_LABELS[s] ?? s,
      price: stratPrices[s] ?? '',
    })
  }

  // Category 3: Envergure
  const envergureItems: LineItem[] = []
  if (state.pages) {
    const pagesLabel: Record<string, string> = {
      '1-5': '1-5 pages',
      '6-10': '6-10 pages',
      '11-20': '11-20 pages',
      '20+': '20+ pages',
      unsure: 'À définir ensemble',
    }
    envergureItems.push({ label: pagesLabel[state.pages] ?? state.pages, price: 'Inclus' })
  }
  if (state.languages) {
    const langLabel: Record<string, string> = {
      '1': '1 langue',
      '2': '2 langues',
      '3+': '3+ langues',
    }
    envergureItems.push({ label: langLabel[state.languages] ?? state.languages, price: 'Inclus' })
  }
  if (state.designLevel) {
    envergureItems.push({
      label: DESIGN_LEVEL_LABELS[state.designLevel] ?? state.designLevel,
      price: 'Inclus',
    })
  }

  // Category 4: Contenu
  const contenuItems: LineItem[] = []
  if (state.copywriting) {
    const copyPrices: Record<string, string> = {
      provided: 'Inclus',
      basic: 'CHF 80/page',
      professional: 'CHF 200/page',
    }
    contenuItems.push({
      label: COPYWRITING_LABELS[state.copywriting] ?? state.copywriting,
      price: copyPrices[state.copywriting] ?? '',
    })
  }
  if (state.visuals) {
    const visPrices: Record<string, string> = {
      provided: 'Inclus',
      stock: 'CHF 300-600',
      ai: 'CHF 400-800',
      shooting: 'CHF 800-2\'500',
    }
    contenuItems.push({
      label: VISUALS_LABELS[state.visuals] ?? state.visuals,
      price: visPrices[state.visuals] ?? '',
    })
  }

  // Category 5: Fonctionnalités
  const featuresItems: LineItem[] = []
  const featurePricesDisplay: Record<string, string> = {
    'blog-setup': 'CHF 800',
    'blog-management': 'CHF 300/mois',
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
      label: FEATURE_LABELS[f] ?? f,
      price: featurePricesDisplay[f] ?? '',
    })
  }

  // Category 6: Acquisition
  const acquisitionItems: LineItem[] = []
  if (state.seo.length > 0) {
    const seoPricesDisplay: Record<string, string> = {
      'advanced-oneshot': 'CHF 1\'500',
      monthly: 'CHF 600/mois',
    }
    for (const s of state.seo) {
      acquisitionItems.push({
        label: SEO_LABELS[s] ?? s,
        price: seoPricesDisplay[s] ?? '',
      })
    }
  }
  for (const a of state.acquisition) {
    const acqPricesDisplay: Record<string, string> = {
      sea: 'CHF 400/mois',
      social: 'CHF 600/mois',
      funnel: 'CHF 2\'000-4\'000',
    }
    acquisitionItems.push({
      label: ACQUISITION_LABELS[a] ?? a,
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
      label: AUTOMATION_LABELS[a] ?? a,
      price: autoPricesDisplay[a] ?? '',
    })
  }

  // Category 7: Services
  const servicesItems: LineItem[] = []
  const servicePricesDisplay: Record<string, string> = {
    maintenance: 'CHF 150/mois',
    training: 'CHF 200',
    rgpd: 'CHF 500',
    video: 'CHF 1\'500-4\'000',
    rush: '+30%',
  }
  for (const s of state.services) {
    servicesItems.push({
      label: SERVICE_LABELS[s] ?? s,
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
        throw new Error(`Erreur serveur (${res.status})`)
      }

      dispatch({ type: 'SET_SUBMITTED' })
    } catch (err) {
      dispatch({ type: 'SET_SUBMITTING', value: false })
      setErrorMessage(
        err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
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
          <CheckCircle size={40} className="text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            Merci, {state.contact.firstName || 'vous'}&nbsp;!
          </h3>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            Votre estimation a été envoyée avec succès. Vous recevrez un devis détaillé sous 48h.
          </p>
        </div>
      </motion.div>
    )
  }

  // Recap + totals sidebar content (reused in both layouts)
  const recapContent = (
    <div className="space-y-4">
      <CategoryBlock title="Projet" step={1} items={projetItems} />
      <CategoryBlock title="Branding" step={2} items={brandingItems} />
      <CategoryBlock title="Envergure" step={3} items={envergureItems} />
      <CategoryBlock title="Contenu" step={4} items={contenuItems} />
      <CategoryBlock title="Fonctionnalités" step={5} items={featuresItems} />
      <CategoryBlock title="Acquisition" step={6} items={acquisitionItems} />
      <CategoryBlock title="Services" step={7} items={servicesItems} />

      {/* Totals */}
      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5 space-y-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-1">
            Investissement unique
          </p>
          <p className="text-2xl lg:text-xl font-bold text-white">
            <AnimatedCounter value={estimate.totalMin} prefix="CHF" />
            {estimate.totalMin !== estimate.totalMax && (
              <>
                {' '}&ndash;{' '}
                <AnimatedCounter value={estimate.totalMax} prefix="CHF" />
              </>
            )}
          </p>
        </div>
        {estimate.monthlyMin > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-1">
              Coûts récurrents
            </p>
            <p className="text-base font-semibold text-violet-400">
              +{formatCHF(estimate.monthlyMin, estimate.monthlyMax)} /mois
            </p>
          </div>
        )}
        {estimate.weeksMin > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-1">
              Délai estimé
            </p>
            <p className="text-base font-semibold text-emerald-400">
              ~{estimate.weeksMin}
              {estimate.weeksMin !== estimate.weeksMax && `-${estimate.weeksMax}`}{' '}
              semaines
            </p>
          </div>
        )}
        <p className="text-xs text-zinc-500 border-t border-white/5 pt-3">
          Estimation indicative. Devis personnalisé sous 48h.
        </p>
      </div>
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
        <p className="text-xs text-zinc-500">
          <span className="text-violet-400">*</span> Champs obligatoires
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
          <InputField label="Prénom" id="firstName" required icon={<User size={14} />}>
            <input
              id="firstName"
              type="text"
              required
              placeholder="Marie"
              value={state.contact.firstName}
              onChange={setField('firstName')}
              className={inputClass}
            />
          </InputField>
          <InputField label="Nom" id="lastName" required icon={<User size={14} />}>
            <input
              id="lastName"
              type="text"
              required
              placeholder="Dupont"
              value={state.contact.lastName}
              onChange={setField('lastName')}
              className={inputClass}
            />
          </InputField>
        </div>

        {/* Company */}
        <InputField label="Entreprise" id="company" optional icon={<Building2 size={14} />}>
          <input
            id="company"
            type="text"
            placeholder="Mon Entreprise SA"
            value={state.contact.company}
            onChange={setField('company')}
            className={inputClass}
          />
        </InputField>

        {/* Email */}
        <InputField label="Email" id="email" required icon={<Mail size={14} />}>
          <input
            id="email"
            type="email"
            required
            placeholder="marie@entreprise.ch"
            value={state.contact.email}
            onChange={setField('email')}
            className={inputClass}
          />
        </InputField>

        {/* Phone */}
        <InputField label="Téléphone" id="phone" optional icon={<Phone size={14} />}>
          <input
            id="phone"
            type="tel"
            placeholder="+41 79 000 00 00"
            value={state.contact.phone}
            onChange={setField('phone')}
            className={inputClass}
          />
        </InputField>

        {/* Dynamic: redesign → current URL */}
        {state.situation === 'redesign' && (
          <InputField label="URL du site actuel" id="currentSiteUrl" optional icon={<Link size={14} />}>
            <input
              id="currentSiteUrl"
              type="url"
              placeholder="https://www.votresite.ch"
              value={state.contact.currentSiteUrl}
              onChange={setField('currentSiteUrl')}
              className={inputClass}
            />
          </InputField>
        )}

        {/* Dynamic: rush → launch date */}
        {state.services.includes('rush') && (
          <InputField label="Date de lancement souhaitée" id="launchDate" optional icon={<Calendar size={14} />}>
            <input
              id="launchDate"
              type="date"
              value={state.contact.launchDate}
              onChange={setField('launchDate')}
              className={inputClass}
            />
          </InputField>
        )}

        {/* Dynamic: webapp → app description */}
        {state.siteType === 'webapp' && (
          <InputField label="Description des fonctionnalités" id="appDescription" optional icon={<Code2 size={14} />}>
            <textarea
              id="appDescription"
              rows={4}
              placeholder="Décrivez les fonctionnalités principales de votre application..."
              value={state.contact.appDescription}
              onChange={setField('appDescription')}
              className={inputClass}
            />
          </InputField>
        )}

        {/* Message */}
        <InputField label="Message (optionnel)" id="message" icon={<MessageSquare size={14} />}>
          <textarea
            id="message"
            rows={4}
            placeholder="Informations complémentaires, questions..."
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
              Envoi en cours...
            </span>
          ) : (
            'Recevoir mon estimation détaillée'
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
