'use client'

import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { OptionChip } from '../ui/OptionChip'
import { SECTORS } from '@/lib/estimation/sectors'

export function Step1Project() {
  const { state, dispatch } = useEstimator()

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Section 1 - Votre situation */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Votre situation
        </p>
        <div className="grid grid-cols-2 gap-3">
          <SelectionCard
            title="Nouveau site"
            description="Creer votre premier site web"
            selected={state.situation === 'new'}
            onClick={() => dispatch({ type: 'SET_SITUATION', value: 'new' })}
          />
          <SelectionCard
            title="Refonte"
            description="Moderniser un site existant"
            price="+CHF 300-800"
            selected={state.situation === 'redesign'}
            onClick={() => dispatch({ type: 'SET_SITUATION', value: 'redesign' })}
          />
        </div>
      </div>

      {/* Section 2 - Type de projet */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Type de projet
        </p>
        <div className="grid grid-cols-2 gap-3">
          <SelectionCard
            title="Site vitrine"
            description="Presentation de votre activite"
            price="des CHF 2'500"
            selected={state.siteType === 'vitrine'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'vitrine' })}
          />
          <SelectionCard
            title="E-commerce"
            description="Boutique en ligne"
            price="des CHF 5'000"
            selected={state.siteType === 'ecommerce'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'ecommerce' })}
          />
          <SelectionCard
            title="Landing page"
            description="Page unique de conversion"
            price="des CHF 1'000"
            selected={state.siteType === 'landing'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'landing' })}
          />
          <SelectionCard
            title="Application web"
            description="Solution sur mesure"
            price="des CHF 8'000"
            selected={state.siteType === 'webapp'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'webapp' })}
          />
        </div>
      </div>

      {/* Section 3 - Secteur d'activite */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Secteur d&apos;activite
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <OptionChip
              key={sector.id}
              label={sector.label}
              selected={state.sector === sector.id}
              onClick={() => dispatch({ type: 'SET_SECTOR', value: sector.id })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
