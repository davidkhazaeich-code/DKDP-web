'use client'

import {
  CheckCircle2, Palette, RefreshCw, Paintbrush,
  Target, BarChart3, FileText,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { MultiSelectCard } from '../ui/MultiSelectCard'

export function Step2Branding() {
  const { state, dispatch } = useEstimator()

  return (
    <div className="space-y-8">
      {/* Section 1 - Logo */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Logo
        </p>
        <div className="grid grid-cols-1 gap-3">
          <SelectionCard
            title="J'ai deja mon logo"
            price="Inclus"
            priceColor="text-emerald-400"
            icon={<CheckCircle2 size={18} />}
            selected={state.logo === 'existing'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'existing' ? null : 'existing' })
            }
          />
          <SelectionCard
            title="Creer un logo"
            price="CHF 800-1'500"
            icon={<Palette size={18} />}
            selected={state.logo === 'create'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'create' ? null : 'create' })
            }
          />
          <SelectionCard
            title="Moderniser mon logo"
            price="CHF 500-1'000"
            icon={<RefreshCw size={18} />}
            selected={state.logo === 'modernize'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'modernize' ? null : 'modernize' })
            }
          />
        </div>
      </div>

      {/* Section 2 - Identite visuelle */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Identite visuelle
        </p>
        <div className="grid grid-cols-1 gap-3">
          <SelectionCard
            title="J'ai deja ma charte"
            price="Inclus"
            priceColor="text-emerald-400"
            icon={<CheckCircle2 size={18} />}
            selected={state.branding === 'existing'}
            onClick={() =>
              dispatch({
                type: 'SET_BRANDING',
                value: state.branding === 'existing' ? null : 'existing',
              })
            }
          />
          <SelectionCard
            title="Creer une identite"
            price="CHF 1'000-2'000"
            icon={<Paintbrush size={18} />}
            selected={state.branding === 'create'}
            onClick={() =>
              dispatch({
                type: 'SET_BRANDING',
                value: state.branding === 'create' ? null : 'create',
              })
            }
          >
            <div className="flex flex-wrap gap-2">
              {['Palette couleurs', 'Typographie', 'Charte graphique', 'Signature email'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded border border-violet-500/20 bg-violet-500/10 text-violet-300"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </SelectionCard>
          <SelectionCard
            title="Moderniser mon branding"
            price="CHF 600-1'200"
            icon={<RefreshCw size={18} />}
            selected={state.branding === 'modernize'}
            onClick={() =>
              dispatch({
                type: 'SET_BRANDING',
                value: state.branding === 'modernize' ? null : 'modernize',
              })
            }
          />
        </div>
      </div>

      {/* Section 3 - Strategie marketing */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Strategie marketing
        </p>
        <div className="grid grid-cols-1 gap-3">
          <MultiSelectCard
            title="Positionnement"
            description="Definir votre proposition de valeur unique"
            price="CHF 800"
            icon={<Target size={18} />}
            selected={state.strategy.includes('positioning')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'positioning' })}
          />
          <MultiSelectCard
            title="Etude de marche"
            description="Analyse de la concurrence et opportunites"
            price="CHF 600"
            icon={<BarChart3 size={18} />}
            selected={state.strategy.includes('market-study')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'market-study' })}
          />
          <MultiSelectCard
            title="Strategie de contenu"
            description="Planification editoriale et mots-cles"
            price="CHF 1'200"
            icon={<FileText size={18} />}
            selected={state.strategy.includes('content-strategy')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'content-strategy' })}
          />
        </div>
      </div>
    </div>
  )
}
