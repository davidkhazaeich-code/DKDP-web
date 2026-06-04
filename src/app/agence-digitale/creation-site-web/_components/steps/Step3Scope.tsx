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

const PAGE_OPTIONS_FR: { value: PageRange; label: string; hint: string }[] = [
  { value: '1-5', label: '1-5 pages', hint: 'Accueil, services, à propos, contact' },
  { value: '6-10', label: '6-10 pages', hint: 'Services détaillés, portfolio, blog, FAQ' },
  { value: '11-20', label: '11-20 pages', hint: 'Multi-services, études de cas, blog actif' },
  { value: '20+', label: '20+ pages', hint: 'Catalogue produits, portail, contenu riche' },
  { value: 'unsure', label: 'Je ne sais pas encore', hint: 'On évaluera ensemble lors du devis' },
]

const PAGE_OPTIONS_EN: { value: PageRange; label: string; hint: string }[] = [
  { value: '1-5', label: '1-5 pages', hint: 'Home, services, about, contact' },
  { value: '6-10', label: '6-10 pages', hint: 'Detailed services, portfolio, blog, FAQ' },
  { value: '11-20', label: '11-20 pages', hint: 'Multi-service, case studies, active blog' },
  { value: '20+', label: '20+ pages', hint: 'Product catalogue, portal, rich content' },
  { value: 'unsure', label: 'I am not sure yet', hint: 'We will assess it together during the quote' },
]

const LANGUAGE_OPTIONS_FR: { value: LanguageOption; label: string; mult: string }[] = [
  { value: '1', label: '1 langue', mult: 'x1.0' },
  { value: '2', label: '2 langues', mult: 'x1.3' },
  { value: '3+', label: '3+ langues', mult: 'x1.5' },
]

const LANGUAGE_OPTIONS_EN: { value: LanguageOption; label: string; mult: string }[] = [
  { value: '1', label: '1 language', mult: 'x1.0' },
  { value: '2', label: '2 languages', mult: 'x1.3' },
  { value: '3+', label: '3+ languages', mult: 'x1.5' },
]

const T = {
  fr: {
    pagesLabel: 'Nombre de pages',
    languages: 'Langues',
    designLevel: 'Niveau de design',
    templateTitle: 'Template adapté',
    templateDesc: 'Base professionnelle personnalisée',
    customTitle: 'Sur mesure',
    customDesc: 'Design unique à votre image',
    premiumTitle: 'Premium',
    premiumDesc: 'Design haut de gamme, animations avancées',
    subtotal: 'Sous-total provisoire',
    selectPrompt: "Sélectionnez les options ci-dessus pour voir l'estimation en temps réel.",
  },
  en: {
    pagesLabel: 'Number of pages',
    languages: 'Languages',
    designLevel: 'Design level',
    templateTitle: 'Adapted template',
    templateDesc: 'Customised professional base',
    customTitle: 'Custom',
    customDesc: 'Unique design tailored to you',
    premiumTitle: 'Premium',
    premiumDesc: 'High-end design, advanced animations',
    subtotal: 'Provisional subtotal',
    selectPrompt: 'Select the options above to see the estimate in real time.',
  },
} as const

export function Step3Scope() {
  const { state, dispatch, lang } = useEstimator()
  const t = T[lang]
  const PAGE_OPTIONS = lang === 'en' ? PAGE_OPTIONS_EN : PAGE_OPTIONS_FR
  const LANGUAGE_OPTIONS = lang === 'en' ? LANGUAGE_OPTIONS_EN : LANGUAGE_OPTIONS_FR

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
        <SectionLabel required lang={lang}>{t.pagesLabel}</SectionLabel>
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
                    : 'border-border bg-[var(--surface-subtle)] hover:border-border-strong hover:bg-[var(--surface-default)]',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {isUnsure && <HelpCircle size={14} className="text-text-muted flex-shrink-0" />}
                      <span className={[
                        'text-sm font-semibold leading-snug',
                        isUnsure ? 'text-text-secondary' : 'text-text',
                      ].join(' ')}>
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{opt.hint}</p>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    {!isUnsure && (
                      <span className="text-xs text-text-muted font-medium whitespace-nowrap tabular-nums">
                        x{PAGE_MULTIPLIERS[opt.value]}
                      </span>
                    )}
                    <span
                      className={[
                        'flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200',
                        isSelected
                          ? 'bg-violet-500 border border-violet-400 opacity-100 scale-100'
                          : 'border border-[color:var(--surface-border)] opacity-0 scale-75',
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
        <SectionLabel required lang={lang}>{t.languages}</SectionLabel>
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
                    : 'border-border bg-[var(--surface-subtle)] hover:border-border-strong hover:bg-[var(--surface-default)]',
                ].join(' ')}
              >
                <span className={['text-sm font-semibold', isSelected ? 'text-violet-500' : 'text-text'].join(' ')}>
                  {opt.label}
                </span>
                <span className="text-[10px] sm:text-xs text-text-muted font-medium tabular-nums">
                  {opt.mult}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Niveau de design */}
      <div>
        <SectionLabel required lang={lang}>{t.designLevel}</SectionLabel>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          <SelectionCard
            title={t.templateTitle}
            description={t.templateDesc}
            price="x1.0"
            icon={<LayoutTemplate size={18} />}
            selected={state.designLevel === 'template'}
            onClick={() => dispatch({ type: 'SET_DESIGN_LEVEL', value: 'template' })}
          />
          <SelectionCard
            title={t.customTitle}
            description={t.customDesc}
            price="x1.4"
            icon={<Paintbrush size={18} />}
            selected={state.designLevel === 'custom'}
            onClick={() => dispatch({ type: 'SET_DESIGN_LEVEL', value: 'custom' })}
          />
          <SelectionCard
            title={t.premiumTitle}
            description={t.premiumDesc}
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
          : 'border-border bg-[var(--surface-subtle)]',
      ].join(' ')}>
        {previewResult ? (
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs uppercase tracking-wider font-semibold text-text-muted">
              {t.subtotal}
            </p>
            <p className="text-lg font-bold text-text tabular-nums">
              CHF {formatChf(previewResult.resultMin)}
              <span className="text-text-muted mx-1.5">–</span>
              {formatChf(previewResult.resultMax)}
            </p>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-text-muted text-center leading-relaxed">
            {t.selectPrompt}
          </p>
        )}
      </div>

    </div>
  )
}
