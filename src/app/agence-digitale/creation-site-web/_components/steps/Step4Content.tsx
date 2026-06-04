'use client'

import { Upload, FileText, PenTool, Image as ImageIcon, Sparkles, Camera } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { SectionLabel } from '../ui/SectionLabel'
import { PAGE_MIDPOINTS } from '@/lib/estimation/pricing'

function formatChf(value: number): string {
  return value.toLocaleString('de-CH').replace(/,/g, "'")
}

const T = {
  fr: {
    copySection: 'Rédaction & copywriting',
    included: 'Inclus',
    providedTitle: 'Je fournis le contenu',
    providedDesc: 'Textes déjà prêts ou en cours de rédaction',
    basicTitle: 'Rédaction basique',
    basicDesc: 'Mise en forme et optimisation de vos textes',
    proTitle: 'Rédaction professionnelle',
    proDesc: 'Copywriting SEO avancé, ton et structuré',
    visualsSection: 'Photos & visuels',
    visProvidedTitle: 'Je fournis les visuels',
    visProvidedDesc: 'Photos et images déjà disponibles',
    stockTitle: "Banque d'images",
    stockDesc: 'Photos HD professionnelles',
    aiTitle: 'Génération IA',
    aiDesc: 'Visuels créés par intelligence artificielle',
    shootingTitle: 'Shooting professionnel',
    shootingDesc: 'Séance photo sur site',
  },
  en: {
    copySection: 'Copywriting and content',
    included: 'Included',
    providedTitle: 'I provide the content',
    providedDesc: 'Text already ready or being written',
    basicTitle: 'Basic copywriting',
    basicDesc: 'Formatting and optimisation of your text',
    proTitle: 'Professional copywriting',
    proDesc: 'Advanced SEO copywriting, tone and structure',
    visualsSection: 'Photos and visuals',
    visProvidedTitle: 'I provide the visuals',
    visProvidedDesc: 'Photos and images already available',
    stockTitle: 'Stock images',
    stockDesc: 'Professional HD photos',
    aiTitle: 'AI generation',
    aiDesc: 'Visuals created with artificial intelligence',
    shootingTitle: 'Professional photo shoot',
    shootingDesc: 'On-site photo session',
  },
} as const

export function Step4Content() {
  const { state, dispatch, lang } = useEstimator()
  const t = T[lang]

  const midpoint = state.pages ? PAGE_MIDPOINTS[state.pages] : PAGE_MIDPOINTS['1-5']
  const basicPrice = 80 * midpoint
  const professionalPrice = 200 * midpoint

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Redaction */}
      <div>
        <SectionLabel optional lang={lang}>{t.copySection}</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.providedTitle}
            description={t.providedDesc}
            price={t.included}
            priceColor="text-emerald-400"
            icon={<Upload size={18} />}
            selected={state.copywriting === 'provided'}
            onClick={() =>
              dispatch({ type: 'SET_COPYWRITING', value: state.copywriting === 'provided' ? null : 'provided' })
            }
          />
          <SelectionCard
            title={t.basicTitle}
            description={t.basicDesc}
            price={`CHF ${formatChf(basicPrice)}`}
            icon={<FileText size={18} />}
            selected={state.copywriting === 'basic'}
            onClick={() =>
              dispatch({ type: 'SET_COPYWRITING', value: state.copywriting === 'basic' ? null : 'basic' })
            }
          />
          <SelectionCard
            title={t.proTitle}
            description={t.proDesc}
            price={`CHF ${formatChf(professionalPrice)}`}
            icon={<PenTool size={18} />}
            selected={state.copywriting === 'professional'}
            onClick={() =>
              dispatch({ type: 'SET_COPYWRITING', value: state.copywriting === 'professional' ? null : 'professional' })
            }
          />
        </div>
      </div>

      {/* Visuels */}
      <div>
        <SectionLabel optional lang={lang}>{t.visualsSection}</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.visProvidedTitle}
            description={t.visProvidedDesc}
            price={t.included}
            priceColor="text-emerald-400"
            icon={<Upload size={18} />}
            selected={state.visuals === 'provided'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'provided' ? null : 'provided' })
            }
          />
          <SelectionCard
            title={t.stockTitle}
            description={t.stockDesc}
            price="CHF 300-600"
            icon={<ImageIcon size={18} />}
            selected={state.visuals === 'stock'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'stock' ? null : 'stock' })
            }
          />
          <SelectionCard
            title={t.aiTitle}
            description={t.aiDesc}
            price="CHF 400-800"
            icon={<Sparkles size={18} />}
            selected={state.visuals === 'ai'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'ai' ? null : 'ai' })
            }
          />
          <SelectionCard
            title={t.shootingTitle}
            description={t.shootingDesc}
            price="CHF 800-2'500"
            icon={<Camera size={18} />}
            selected={state.visuals === 'shooting'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'shooting' ? null : 'shooting' })
            }
          />
        </div>
      </div>

    </div>
  )
}
