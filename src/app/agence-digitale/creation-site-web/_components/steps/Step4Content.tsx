'use client'

import { Upload, FileText, PenTool, Image as ImageIcon, Sparkles, Camera } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { SectionLabel } from '../ui/SectionLabel'
import { PAGE_MIDPOINTS } from '@/lib/estimation/pricing'

function formatChf(value: number): string {
  return value.toLocaleString('de-CH').replace(/,/g, "'")
}

export function Step4Content() {
  const { state, dispatch } = useEstimator()

  const midpoint = state.pages ? PAGE_MIDPOINTS[state.pages] : PAGE_MIDPOINTS['1-5']
  const basicPrice = 80 * midpoint
  const professionalPrice = 200 * midpoint

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Redaction */}
      <div>
        <SectionLabel optional>Rédaction &amp; copywriting</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title="Je fournis le contenu"
            description="Textes déjà prêts ou en cours de rédaction"
            price="Inclus"
            priceColor="text-emerald-400"
            icon={<Upload size={18} />}
            selected={state.copywriting === 'provided'}
            onClick={() =>
              dispatch({ type: 'SET_COPYWRITING', value: state.copywriting === 'provided' ? null : 'provided' })
            }
          />
          <SelectionCard
            title="Rédaction basique"
            description="Mise en forme et optimisation de vos textes"
            price={`CHF ${formatChf(basicPrice)}`}
            icon={<FileText size={18} />}
            selected={state.copywriting === 'basic'}
            onClick={() =>
              dispatch({ type: 'SET_COPYWRITING', value: state.copywriting === 'basic' ? null : 'basic' })
            }
          />
          <SelectionCard
            title="Rédaction professionnelle"
            description="Copywriting SEO avancé, ton et structuré"
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
        <SectionLabel optional>Photos &amp; visuels</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <SelectionCard
            title="Je fournis les visuels"
            description="Photos et images déjà disponibles"
            price="Inclus"
            priceColor="text-emerald-400"
            icon={<Upload size={18} />}
            selected={state.visuals === 'provided'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'provided' ? null : 'provided' })
            }
          />
          <SelectionCard
            title="Banque d'images"
            description="Photos HD professionnelles"
            price="CHF 300-600"
            icon={<ImageIcon size={18} />}
            selected={state.visuals === 'stock'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'stock' ? null : 'stock' })
            }
          />
          <SelectionCard
            title="Génération IA"
            description="Visuels créés par intelligence artificielle"
            price="CHF 400-800"
            icon={<Sparkles size={18} />}
            selected={state.visuals === 'ai'}
            onClick={() =>
              dispatch({ type: 'SET_VISUALS', value: state.visuals === 'ai' ? null : 'ai' })
            }
          />
          <SelectionCard
            title="Shooting professionnel"
            description="Séance photo sur site"
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
