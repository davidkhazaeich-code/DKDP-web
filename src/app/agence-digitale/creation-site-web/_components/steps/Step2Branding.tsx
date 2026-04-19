'use client'

import {
  CheckCircle2, Palette, RefreshCw, Paintbrush,
  Target, BarChart3, FileText,
} from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { MultiSelectCard } from '../ui/MultiSelectCard'
import { SectionLabel } from '../ui/SectionLabel'

export function Step2Branding() {
  const { state, dispatch } = useEstimator()

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Logo */}
      <div>
        <SectionLabel optional>Logo</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title="J'ai déjà mon logo"
            description="Fourni en vectoriel ou haute définition"
            price="Inclus"
            priceColor="text-emerald-400"
            icon={<CheckCircle2 size={18} />}
            selected={state.logo === 'existing'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'existing' ? null : 'existing' })
            }
          />
          <SelectionCard
            title="Créer un logo"
            description="Design original à votre image"
            price="CHF 800-1'500"
            icon={<Palette size={18} />}
            selected={state.logo === 'create'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'create' ? null : 'create' })
            }
          />
          <SelectionCard
            title="Moderniser mon logo"
            description="Refresh visuel de l'existant"
            price="CHF 500-1'000"
            icon={<RefreshCw size={18} />}
            selected={state.logo === 'modernize'}
            onClick={() =>
              dispatch({ type: 'SET_LOGO', value: state.logo === 'modernize' ? null : 'modernize' })
            }
          />
        </div>
      </div>

      {/* Identite visuelle */}
      <div>
        <SectionLabel optional>Identité visuelle</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title="J'ai déjà ma charte"
            description="Couleurs, typographies, style défini"
            price="Inclus"
            priceColor="text-emerald-400"
            icon={<CheckCircle2 size={18} />}
            selected={state.branding === 'existing'}
            onClick={() =>
              dispatch({ type: 'SET_BRANDING', value: state.branding === 'existing' ? null : 'existing' })
            }
          />
          <SelectionCard
            title="Créer une identité"
            description="Palette, typo, charte complète"
            price="CHF 1'000-2'000"
            icon={<Paintbrush size={18} />}
            selected={state.branding === 'create'}
            onClick={() =>
              dispatch({ type: 'SET_BRANDING', value: state.branding === 'create' ? null : 'create' })
            }
          >
            <div className="flex flex-wrap gap-1.5">
              {['Palette couleurs', 'Typographie', 'Charte graphique', 'Signature email'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-md border border-violet-500/30 bg-violet-500/10 text-violet-300 font-medium"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </SelectionCard>
          <SelectionCard
            title="Moderniser mon branding"
            description="Refonte partielle de l'existant"
            price="CHF 600-1'200"
            icon={<RefreshCw size={18} />}
            selected={state.branding === 'modernize'}
            onClick={() =>
              dispatch({ type: 'SET_BRANDING', value: state.branding === 'modernize' ? null : 'modernize' })
            }
          />
        </div>
      </div>

      {/* Strategie marketing */}
      <div>
        <SectionLabel optional>Stratégie marketing</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <MultiSelectCard
            title="Positionnement"
            description="Définir votre proposition de valeur unique"
            price="CHF 800"
            icon={<Target size={18} />}
            selected={state.strategy.includes('positioning')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'positioning' })}
          />
          <MultiSelectCard
            title="Étude de marché"
            description="Analyse de la concurrence et opportunités"
            price="CHF 600"
            icon={<BarChart3 size={18} />}
            selected={state.strategy.includes('market-study')}
            onToggle={() => dispatch({ type: 'TOGGLE_STRATEGY', value: 'market-study' })}
          />
          <MultiSelectCard
            title="Stratégie de contenu"
            description="Planification éditoriale et mots-clés"
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
