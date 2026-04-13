'use client'

import { LayoutTemplate, Paintbrush, Crown, HelpCircle } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { OptionChip } from '../ui/OptionChip'
import {
  BASE_PRICES,
  PAGE_MULTIPLIERS,
  LANG_MULTIPLIERS,
  DESIGN_MULTIPLIERS,
} from '@/lib/estimation/pricing'
import type { PageRange, LanguageOption } from '@/lib/estimation/types'

function formatChf(value: number): string {
  return value.toLocaleString('de-CH').replace(/,/g, "'")
}

const PAGE_OPTIONS: { value: PageRange; label: string; hint: string }[] = [
  {
    value: '1-5',
    label: '1-5 pages',
    hint: 'Accueil, services, à propos, contact',
  },
  {
    value: '6-10',
    label: '6-10 pages',
    hint: 'Services détaillés, portfolio, blog, FAQ',
  },
  {
    value: '11-20',
    label: '11-20 pages',
    hint: 'Multi-services, études de cas, blog actif',
  },
  {
    value: '20+',
    label: '20+ pages',
    hint: 'Catalogue produits, portail, contenu riche',
  },
  {
    value: 'unsure',
    label: 'Je ne sais pas encore',
    hint: 'On évaluera ensemble lors du devis',
  },
]

const LANGUAGE_OPTIONS: { value: LanguageOption; label: string }[] = [
  { value: '1', label: '1 langue' },
  { value: '2', label: '2 langues (x1.3)' },
  { value: '3+', label: '3+ langues (x1.5)' },
]

export function Step3Scope() {
  const { state, dispatch } = useEstimator()

  // Real-time calculation preview
  const showPreview =
    state.siteType !== null &&
    state.pages !== null &&
    state.languages !== null &&
    state.designLevel !== null

  const previewResult = (() => {
    if (!showPreview || !state.siteType || !state.pages || !state.languages || !state.designLevel) {
      return null
    }

    const base = BASE_PRICES[state.siteType]
    const pagesMult = PAGE_MULTIPLIERS[state.pages]
    const langMult = LANG_MULTIPLIERS[state.languages]
    const designMult = DESIGN_MULTIPLIERS[state.designLevel]
    const totalMultiplier = 1 + (pagesMult - 1) + (langMult - 1) + (designMult - 1)

    const resultMin = Math.round(base.min * totalMultiplier)
    const resultMax = Math.round(base.max * totalMultiplier)

    const siteTypeLabel: Record<string, string> = {
      vitrine: 'vitrine',
      ecommerce: 'e-commerce',
      landing: 'landing page',
      webapp: 'application web',
    }

    return {
      type: siteTypeLabel[state.siteType] ?? state.siteType,
      base: `CHF ${formatChf(base.min)}-${formatChf(base.max)}`,
      mult: totalMultiplier.toFixed(2),
      resultMin,
      resultMax,
    }
  })()

  return (
    <div className="space-y-8">
      {/* Section 1 - Nombre de pages */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Nombre de pages <span className="text-red-400">*</span>
        </p>
        <div className="grid grid-cols-1 gap-2">
          {PAGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => dispatch({ type: 'SET_PAGES', value: opt.value })}
              className={[
                'w-full text-left rounded-xl px-4 py-3 transition-all duration-200 border',
                state.pages === opt.value
                  ? 'border-violet-500/50 bg-violet-500/10'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className={[
                    'text-sm font-medium',
                    opt.value === 'unsure' ? 'text-zinc-400' : 'text-zinc-100',
                  ].join(' ')}>
                    {opt.value === 'unsure' && <HelpCircle size={14} className="inline mr-1.5 -mt-0.5 text-zinc-500" />}
                    {opt.label}
                  </span>
                  <p className="text-xs text-zinc-500 mt-0.5">{opt.hint}</p>
                </div>
                {opt.value !== 'unsure' && (
                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                    x{PAGE_MULTIPLIERS[opt.value]}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section 2 - Langues */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Langues <span className="text-red-400">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((opt) => (
            <OptionChip
              key={opt.value}
              label={opt.label}
              selected={state.languages === opt.value}
              onClick={() => dispatch({ type: 'SET_LANGUAGES', value: opt.value })}
            />
          ))}
        </div>
      </div>

      {/* Section 3 - Niveau de design */}
      <div>
        <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
          Niveau de design <span className="text-red-400">*</span>
        </p>
        <div className="grid grid-cols-1 gap-3">
          <SelectionCard
            title="Template adapté"
            description="Base professionnelle personnalisée"
            price="x1.0"
            icon={<LayoutTemplate size={18} />}
            selected={state.designLevel === 'template'}
            onClick={() => dispatch({ type: 'SET_DESIGN_LEVEL', value: 'template' })}
          />
          <SelectionCard
            title="Sur mesure"
            description="Design unique à votre image"
            price="x1.4"
            icon={<Paintbrush size={18} />}
            selected={state.designLevel === 'custom'}
            onClick={() => dispatch({ type: 'SET_DESIGN_LEVEL', value: 'custom' })}
          />
          <SelectionCard
            title="Premium"
            description="Design haut de gamme, animations avancées"
            price="x1.7"
            icon={<Crown size={18} />}
            selected={state.designLevel === 'premium'}
            onClick={() => dispatch({ type: 'SET_DESIGN_LEVEL', value: 'premium' })}
          />
        </div>

        {/* Real-time calculation preview */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 mt-4">
          {previewResult ? (
            <p className="text-sm text-zinc-400 leading-relaxed">
              Site{' '}
              <span className="text-zinc-200 font-medium">{previewResult.type}</span>
              {' '}({previewResult.base}) x Multiplicateur ({previewResult.mult}) ={' '}
              <span className="text-zinc-100 font-semibold">
                CHF {formatChf(previewResult.resultMin)}-{formatChf(previewResult.resultMax)}
              </span>
            </p>
          ) : (
            <p className="text-sm text-zinc-500">
              Sélectionnez le type de site, les pages, les langues et le design pour voir
              l&apos;estimation.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
