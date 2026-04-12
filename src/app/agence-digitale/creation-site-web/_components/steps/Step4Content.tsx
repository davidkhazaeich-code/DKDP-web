'use client'

import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { PAGE_MIDPOINTS } from '@/lib/estimation/pricing'

function formatChf(value: number): string {
  return value.toLocaleString('de-CH').replace(/,/g, "'")
}

export function Step4Content() {
  const { state, dispatch } = useEstimator()

  // Calculate copywriting prices based on page count (default to midpoint of '1-5' = 3)
  const midpoint = state.pages ? PAGE_MIDPOINTS[state.pages] : PAGE_MIDPOINTS['1-5']
  const basicPrice = 80 * midpoint
  const professionalPrice = 200 * midpoint

  return (
    <div className="space-y-8">
      {/* Section 1 - Redaction & copywriting */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Redaction &amp; copywriting
        </p>
        <div className="grid grid-cols-1 gap-3">
          <SelectionCard
            title="Je fournis le contenu"
            price="Inclus"
            priceColor="text-emerald-400"
            selected={state.copywriting === 'provided'}
            onClick={() =>
              dispatch({
                type: 'SET_COPYWRITING',
                value: state.copywriting === 'provided' ? null : 'provided',
              })
            }
          />
          <SelectionCard
            title="Redaction basique"
            description="Mise en forme et optimisation"
            price={`CHF ${formatChf(basicPrice)}`}
            selected={state.copywriting === 'basic'}
            onClick={() =>
              dispatch({
                type: 'SET_COPYWRITING',
                value: state.copywriting === 'basic' ? null : 'basic',
              })
            }
          />
          <SelectionCard
            title="Redaction professionnelle"
            description="Copywriting SEO avance"
            price={`CHF ${formatChf(professionalPrice)}`}
            selected={state.copywriting === 'professional'}
            onClick={() =>
              dispatch({
                type: 'SET_COPYWRITING',
                value: state.copywriting === 'professional' ? null : 'professional',
              })
            }
          />
        </div>
      </div>

      {/* Section 2 - Photos & visuels */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Photos &amp; visuels
        </p>
        <div className="grid grid-cols-1 gap-3">
          <SelectionCard
            title="Je fournis les visuels"
            price="Inclus"
            priceColor="text-emerald-400"
            selected={state.visuals === 'provided'}
            onClick={() =>
              dispatch({
                type: 'SET_VISUALS',
                value: state.visuals === 'provided' ? null : 'provided',
              })
            }
          />
          <SelectionCard
            title="Banque d'images"
            description="Photos HD professionnelles"
            price="CHF 300-600"
            selected={state.visuals === 'stock'}
            onClick={() =>
              dispatch({
                type: 'SET_VISUALS',
                value: state.visuals === 'stock' ? null : 'stock',
              })
            }
          />
          <SelectionCard
            title="Generation IA"
            description="Visuels crees par intelligence artificielle"
            price="CHF 400-800"
            selected={state.visuals === 'ai'}
            onClick={() =>
              dispatch({
                type: 'SET_VISUALS',
                value: state.visuals === 'ai' ? null : 'ai',
              })
            }
          />
          <SelectionCard
            title="Shooting professionnel"
            description="Seance photo sur site"
            price="CHF 800-2'500"
            selected={state.visuals === 'shooting'}
            onClick={() =>
              dispatch({
                type: 'SET_VISUALS',
                value: state.visuals === 'shooting' ? null : 'shooting',
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
