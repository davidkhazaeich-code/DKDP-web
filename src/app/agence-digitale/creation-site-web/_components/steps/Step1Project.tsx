'use client'

import { PlusCircle, RefreshCw, Globe, ShoppingCart, Rocket, Code2 } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { OptionChip } from '../ui/OptionChip'
import { SectionLabel } from '../ui/SectionLabel'
import { SECTORS } from '@/lib/estimation/sectors'
import type { Sector } from '@/lib/estimation/types'

const T = {
  fr: {
    situation: 'Votre situation',
    newTitle: 'Nouveau site',
    newDesc: 'Créer votre premier site web',
    redesignTitle: 'Refonte',
    redesignDesc: 'Moderniser un site existant',
    projectType: 'Type de projet',
    vitrineTitle: 'Site vitrine',
    vitrineDesc: 'Présentation de votre activité',
    ecommerceTitle: 'E-commerce',
    ecommerceDesc: 'Boutique en ligne',
    landingTitle: 'Landing page',
    landingDesc: 'Page unique de conversion',
    webappTitle: 'Application web',
    webappDesc: 'Solution sur mesure',
    sector: "Secteur d'activité",
    from: 'dès',
  },
  en: {
    situation: 'Your situation',
    newTitle: 'New website',
    newDesc: 'Build your first website',
    redesignTitle: 'Redesign',
    redesignDesc: 'Modernise an existing site',
    projectType: 'Project type',
    vitrineTitle: 'Showcase site',
    vitrineDesc: 'Present your business',
    ecommerceTitle: 'E-commerce',
    ecommerceDesc: 'Online store',
    landingTitle: 'Landing page',
    landingDesc: 'Single conversion page',
    webappTitle: 'Web application',
    webappDesc: 'Custom solution',
    sector: 'Industry',
    from: 'from',
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

export function Step1Project() {
  const { state, dispatch, lang } = useEstimator()
  const t = T[lang]
  const sectorLabel = (s: { id: Sector; label: string }) =>
    lang === 'en' ? SECTOR_LABELS_EN[s.id] : s.label

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Situation */}
      <div>
        <SectionLabel required lang={lang}>{t.situation}</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.newTitle}
            description={t.newDesc}
            icon={<PlusCircle size={18} />}
            selected={state.situation === 'new'}
            onClick={() => dispatch({ type: 'SET_SITUATION', value: 'new' })}
          />
          <SelectionCard
            title={t.redesignTitle}
            description={t.redesignDesc}
            price="+CHF 300-800"
            icon={<RefreshCw size={18} />}
            selected={state.situation === 'redesign'}
            onClick={() => dispatch({ type: 'SET_SITUATION', value: 'redesign' })}
          />
        </div>
      </div>

      {/* Type de projet */}
      <div>
        <SectionLabel required lang={lang}>{t.projectType}</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.vitrineTitle}
            description={t.vitrineDesc}
            price={`${t.from} CHF 2'500`}
            icon={<Globe size={18} />}
            selected={state.siteType === 'vitrine'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'vitrine' })}
          />
          <SelectionCard
            title={t.ecommerceTitle}
            description={t.ecommerceDesc}
            price={`${t.from} CHF 5'000`}
            icon={<ShoppingCart size={18} />}
            selected={state.siteType === 'ecommerce'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'ecommerce' })}
          />
          <SelectionCard
            title={t.landingTitle}
            description={t.landingDesc}
            price={`${t.from} CHF 1'000`}
            icon={<Rocket size={18} />}
            selected={state.siteType === 'landing'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'landing' })}
          />
          <SelectionCard
            title={t.webappTitle}
            description={t.webappDesc}
            price={`${t.from} CHF 8'000`}
            icon={<Code2 size={18} />}
            selected={state.siteType === 'webapp'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'webapp' })}
          />
        </div>
      </div>

      {/* Secteur */}
      <div>
        <SectionLabel optional lang={lang}>{t.sector}</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <OptionChip
              key={sector.id}
              label={sectorLabel(sector)}
              selected={state.sector === sector.id}
              onClick={() => dispatch({ type: 'SET_SECTOR', value: sector.id })}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
