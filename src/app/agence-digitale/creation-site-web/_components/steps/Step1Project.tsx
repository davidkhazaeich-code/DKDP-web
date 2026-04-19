'use client'

import { PlusCircle, RefreshCw, Globe, ShoppingCart, Rocket, Code2 } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { OptionChip } from '../ui/OptionChip'
import { SectionLabel } from '../ui/SectionLabel'
import { SECTORS } from '@/lib/estimation/sectors'

export function Step1Project() {
  const { state, dispatch } = useEstimator()

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Situation */}
      <div>
        <SectionLabel required>Votre situation</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <SelectionCard
            title="Nouveau site"
            description="Créer votre premier site web"
            icon={<PlusCircle size={18} />}
            selected={state.situation === 'new'}
            onClick={() => dispatch({ type: 'SET_SITUATION', value: 'new' })}
          />
          <SelectionCard
            title="Refonte"
            description="Moderniser un site existant"
            price="+CHF 300-800"
            icon={<RefreshCw size={18} />}
            selected={state.situation === 'redesign'}
            onClick={() => dispatch({ type: 'SET_SITUATION', value: 'redesign' })}
          />
        </div>
      </div>

      {/* Type de projet */}
      <div>
        <SectionLabel required>Type de projet</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <SelectionCard
            title="Site vitrine"
            description="Présentation de votre activité"
            price="dès CHF 2'500"
            icon={<Globe size={18} />}
            selected={state.siteType === 'vitrine'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'vitrine' })}
          />
          <SelectionCard
            title="E-commerce"
            description="Boutique en ligne"
            price="dès CHF 5'000"
            icon={<ShoppingCart size={18} />}
            selected={state.siteType === 'ecommerce'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'ecommerce' })}
          />
          <SelectionCard
            title="Landing page"
            description="Page unique de conversion"
            price="dès CHF 1'000"
            icon={<Rocket size={18} />}
            selected={state.siteType === 'landing'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'landing' })}
          />
          <SelectionCard
            title="Application web"
            description="Solution sur mesure"
            price="dès CHF 8'000"
            icon={<Code2 size={18} />}
            selected={state.siteType === 'webapp'}
            onClick={() => dispatch({ type: 'SET_SITE_TYPE', value: 'webapp' })}
          />
        </div>
      </div>

      {/* Secteur */}
      <div>
        <SectionLabel optional>Secteur d&apos;activité</SectionLabel>
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
