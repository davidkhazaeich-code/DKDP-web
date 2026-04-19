'use client'

import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react'
import { useEstimator } from './EstimatorContext'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { calculateEstimate } from '@/lib/estimation/pricing'

function formatCHF(n: number): string {
  return n.toLocaleString('fr-CH').replace(/\u202F/g, "\u00A0")
}

// ── Sticky bottom bar ─────────────────────────────────────────────────────────

export function StickyBottomBar() {
  const { state, dispatch } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, weeksMin, weeksMax } = estimate

  const canGoBack = currentStep > 1
  const canSkip = [2, 4, 5, 6, 7].includes(currentStep)
  const canProceed = (() => {
    switch (currentStep) {
      case 1:
        return !!state.situation && !!state.siteType
      case 3:
        return !!state.pages && !!state.languages && !!state.designLevel
      default:
        return true
    }
  })()
  const isLastStep = currentStep === 7
  const isStep8 = currentStep === 8

  const hasPrice = totalMin > 0

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(10,10,10,0.93)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Left: Back button (fixed width to keep center truly centered) */}
          <div className="w-[72px] sm:w-[84px] flex-shrink-0">
            {canGoBack && !isStep8 && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'PREV_STEP' })}
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-medium px-2 py-2 -ml-2 rounded-lg hover:bg-white/[0.04]"
                aria-label="Retour"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
            )}
          </div>

          {/* Center: Price + details (always shows step count as fallback) */}
          <div className="flex-1 text-center min-w-0 px-1">
            {hasPrice ? (
              <>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-white tabular-nums leading-tight">
                  CHF {formatCHF(totalMin)}
                  <span className="text-zinc-600 mx-1.5">–</span>
                  {formatCHF(totalMax)}
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                  {monthlyMin > 0 && (
                    <span className="text-violet-400 tabular-nums">
                      +{formatCHF(monthlyMin)}/mois
                    </span>
                  )}
                  {weeksMin > 0 && (
                    <span className="text-emerald-400 tabular-nums">
                      ~{weeksMin}-{weeksMax} semaines
                    </span>
                  )}
                  {!monthlyMin && !weeksMin && (
                    <span>Étape {currentStep}/8</span>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-zinc-500">
                <Calculator className="w-3.5 h-3.5" />
                <span>Étape {currentStep} sur 8</span>
              </div>
            )}
          </div>

          {/* Right: Skip + Next */}
          <div className="flex-shrink-0 flex items-center justify-end gap-2">
            {canSkip && !isStep8 && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'SKIP_STEP' })}
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-xs sm:text-sm font-medium px-3 py-2 sm:py-2.5 rounded-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
              >
                Passer
              </button>
            )}
            {!isStep8 && (
              <button
                type="button"
                disabled={!canProceed}
                onClick={() => { if (canProceed) dispatch({ type: 'NEXT_STEP' }) }}
                className={[
                  'flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 shrink-0',
                  canProceed
                    ? 'bg-violet-600 hover:bg-violet-500 text-white cursor-pointer shadow-[0_0_0_1px_rgba(139,92,246,0.3)]'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed',
                ].join(' ')}
              >
                <span className="whitespace-nowrap">
                  {isLastStep ? 'Recevoir l\'estimation' : 'Suivant'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Desktop top banner with live estimation ──────────────────────────────────

export function EstimatorTopBanner() {
  const { state } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, weeksMin, weeksMax } = estimate
  const dots = Array.from({ length: 8 }, (_, i) => i + 1)
  const hasPrice = totalMin > 0

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0A0A0A]/80 backdrop-blur-md px-5 py-4 flex items-center gap-5">

      {/* Label block */}
      <div className="flex-shrink-0 min-w-[140px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Estimation en direct
        </p>
        {hasPrice ? (
          <p className="text-lg font-bold text-white leading-tight tabular-nums mt-1">
            <AnimatedCounter value={totalMin} prefix="CHF" />
            <span className="text-zinc-600 mx-1.5">–</span>
            <AnimatedCounter value={totalMax} prefix="" />
          </p>
        ) : (
          <p className="text-sm text-zinc-500 mt-1">Calcul en cours...</p>
        )}
      </div>

      <div className="w-px self-stretch bg-white/[0.06]" />

      {/* Metrics */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {monthlyMin > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Récurrent</p>
            <p className="text-sm font-semibold text-violet-400 tabular-nums">
              +{formatCHF(monthlyMin)}/mois
            </p>
          </div>
        )}
        {weeksMin > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Délai</p>
            <p className="text-sm font-semibold text-emerald-400 tabular-nums">
              ~{weeksMin}–{weeksMax} semaines
            </p>
          </div>
        )}
      </div>

      {/* Flex spacer */}
      <div className="flex-1" />

      {/* Progress dots + step count */}
      <div className="flex items-center gap-3 flex-shrink-0 min-w-[180px] max-w-[280px]">
        <div className="flex gap-1 flex-1">
          {dots.map((dot) => (
            <div
              key={dot}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background: dot <= currentStep ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-500 whitespace-nowrap">
          <span className="text-zinc-300 font-semibold">{currentStep}</span>/8
        </p>
      </div>
    </div>
  )
}

// ── Legacy sidebar (kept for potential reuse) ────────────────────────────────

export function EstimatorCounter() {
  return <StickyBottomBar />
}
