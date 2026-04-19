'use client'

import { LayoutTemplate, Paintbrush, Crown, HelpCircle, Check } from 'lucide-react'
import { useEstimator } from '../EstimatorContext'
import { SelectionCard } from '../ui/SelectionCard'
import { SectionLabel } from '../ui/SectionLabel'
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
  { value: '1-5', label: '1-5 pages', hint: 'Accueil, services, à propos, contact' },
  { value: '6-10', label: '6-10 pages', hint: 'Services détaillés, portfolio, blog, FAQ' },
  { value: '11-20', label: '11-20 pages', hint: 'Multi-services, études de cas, blog actif' },
  { value: '20+', label: '20+ pages', hint: 'Catalogue produits, portail, contenu riche' },
  { value: 'unsure', label: 'Je ne sais pas encore', hint: 'On évaluera ensemble lors du devis' },
]

const LANGUAGE_OPTIONS: { value: LanguageOption; label: string; mult: string }[] = [
  { value: '1', label: '1 langue', mult: 'x1.0' },
  { value: '2', label: '2 langues', mult: 'x1.3' },
  { value: '3+', label: '3+ langues', mult: 'x1.5' },
]

export function Step3Scope() {
  const { state, dispatch } = useEstimator()

  const showPreview =
    state.siteType !== null &&
    state.pages !== null &&
    state.languages !== null &&
    state.designLevel !== null

  const previewResult = (() => {
    if (!showPreview || !state.siteType || !state.pages || !state.languages || !state.designLevel) return null
    const base = BASE_PRICES[state.siteType]
    const pagesMult = PAGE_MULTIPLIERS[state.pages]
    const langMult = LANG_MULTIPLIERS[state.languages]
    const designMult = DESIGN_MULTIPLIERS[state.designLevel]
    const totalMultiplier = 1 + (pagesMult - 1) + (langMult - 1) + (designMult - 1)
    return {
      resultMin: Math.round(base.min * totalMultiplier),
      resultMax: Math.round(base.max * totalMultiplier),
    }
  })()

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* Nombre de pages */}
      <div>
        <SectionLabel required>Nombre de pages</SectionLabel>
        <div className="grid grid-cols-1 gap-2">
          {PAGE_OPTIONS.map((opt) => {
            const isSelected = state.pages === opt.value
            const isUnsure = opt.value === 'unsure'
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => dispatch({ type: 'SET_PAGES', value: opt.value })}
                className={[
                  'group w-full text-left rounded-xl px-4 py-3 transition-all duration-200 border cursor-pointer min-h-[60px] flex items-center',
                  isSelected
                    ? 'border-violet-500/60 bg-violet-500/[0.08] shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {isUnsure && <HelpCircle size={14} className="text-zinc-500 flex-shrink-0" />}
                      <span className={[
                        'text-sm font-semibold leading-snug',
                        isUnsure ? 'text-zinc-300' : 'text-zinc-100',
                      ].join(' ')}>
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{opt.hint}</p>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    {!isUnsure && (
                      <span className="text-xs text-zinc-500 font-medium whitespace-nowrap tabular-nums">
                        x{PAGE_MULTIPLIERS[opt.value]}
                      </span>
                    )}
                    <span
                      className={[
                        'flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200',
                        isSelected
                          ? 'bg-violet-500 border border-violet-400 opacity-100 scale-100'
                          : 'border border-white/15 opacity-0 scale-75',
                      ].join(' ')}
                    >
                      {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Langues */}
      <div>
        <SectionLabel required>Langues</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = state.languages === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => dispatch({ type: 'SET_LANGUAGES', value: opt.value })}
                className={[
                  'w-full rounded-xl px-3 py-3 transition-all duration-200 border cursor-pointer text-center',
                  'min-h-[60px] flex flex-col items-center justify-center gap-0.5',
                  isSelected
                    ? 'border-violet-500/60 bg-violet-500/[0.08] shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                ].join(' ')}
              >
                <span className={['text-sm font-semibold', isSelected ? 'text-violet-200' : 'text-zinc-100'].join(' ')}>
                  {opt.label}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 font-medium tabular-nums">
                  {opt.mult}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Niveau de design */}
      <div>
        <SectionLabel required>Niveau de design</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
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
      </div>

      {/* Live preview */}
      <div className={[
        'rounded-xl p-4 border transition-colors',
        previewResult
          ? 'border-violet-500/20 bg-violet-500/[0.04]'
          : 'border-white/10 bg-white/[0.02]',
      ].join(' ')}>
        {previewResult ? (
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
              Sous-total provisoire
            </p>
            <p className="text-lg font-bold text-white tabular-nums">
              CHF {formatChf(previewResult.resultMin)}
              <span className="text-zinc-600 mx-1.5">–</span>
              {formatChf(previewResult.resultMax)}
            </p>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-zinc-500 text-center leading-relaxed">
            Sélectionnez les options ci-dessus pour voir l&apos;estimation en temps réel.
          </p>
        )}
      </div>

    </div>
  )
}
