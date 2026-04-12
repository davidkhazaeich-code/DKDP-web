'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEstimator } from './EstimatorContext'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { calculateEstimate } from '@/lib/estimation/pricing'

function MobileBottomBar() {
  const { state, dispatch } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, weeksMin, weeksMax } = estimate

  const canGoBack = currentStep > 1
  const canSkip = [2, 4, 5, 6, 7].includes(currentStep)
  const canProceed = (() => {
    switch (currentStep) {
      case 1:
        return !!state.situation && !!state.siteType && !!state.sector
      case 3:
        return !!state.pages && !!state.languages && !!state.designLevel
      default:
        return true
    }
  })()
  const isLastStep = currentStep === 7
  const isStep8 = currentStep === 8

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(10,10,10,0.92)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      {/* Main row: back + price + continue */}
      <div className="flex items-center justify-between px-3 py-2.5 gap-2">
        {/* Left: back button */}
        <div className="w-16 flex-shrink-0">
          {canGoBack && !isStep8 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="flex items-center gap-0.5 text-zinc-400 hover:text-white transition-colors text-xs font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Retour
            </button>
          )}
        </div>

        {/* Center: price + details */}
        <div className="flex-1 text-center min-w-0">
          <p className="text-sm font-bold text-white truncate">
            CHF {totalMin.toLocaleString('fr-CH')}
            {totalMax > 0 ? ` - ${totalMax.toLocaleString('fr-CH')}` : ''}
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
            {monthlyMin > 0 && (
              <span className="text-violet-400">+{monthlyMin.toLocaleString('fr-CH')}/mo</span>
            )}
            {weeksMin > 0 && (
              <span className="text-emerald-400">~{weeksMin}-{weeksMax} sem.</span>
            )}
            {monthlyMin === 0 && weeksMin === 0 && (
              <span>Etape {currentStep}/8</span>
            )}
          </div>
        </div>

        {/* Right: continue / skip */}
        <div className="w-28 flex-shrink-0 flex items-center justify-end gap-2">
          {canSkip && !isStep8 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'SKIP_STEP' })}
              className="text-zinc-500 hover:text-zinc-300 transition-colors text-[10px] font-medium"
            >
              Passer
            </button>
          )}
          {!isStep8 && (
            <button
              type="button"
              disabled={!canProceed}
              onClick={() => {
                if (canProceed) dispatch({ type: 'NEXT_STEP' })
              }}
              className={[
                'flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-200',
                canProceed
                  ? 'bg-violet-600 hover:bg-violet-500 text-white'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed',
              ].join(' ')}
            >
              {isLastStep ? 'Estimer' : 'Suivant'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function EstimatorCounter() {
  const { state } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, monthlyMax, weeksMin, weeksMax } = estimate

  // Dots for step indicator
  const dots = Array.from({ length: 8 }, (_, i) => i + 1)

  return (
    <>
      {/* ── Desktop: sticky sidebar card ── */}
      <div className="hidden lg:block sticky top-[140px]">
        <div
          className="rounded-2xl border p-6 flex flex-col gap-4"
          style={{
            borderColor: 'rgba(124,58,237,0.20)',
            background: '#0A0A0A',
          }}
        >
          {/* Label */}
          <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
            Votre estimation
          </p>

          {/* Total price */}
          <div>
            <p className="text-2xl font-bold text-white leading-tight">
              <AnimatedCounter value={totalMin} prefix="CHF" />
              {' - '}
              <AnimatedCounter value={totalMax} prefix="" />
            </p>
          </div>

          {/* Monthly if applicable */}
          {monthlyMin > 0 && (
            <p className="text-sm font-medium" style={{ color: '#A78BFA' }}>
              +CHF {monthlyMin.toLocaleString('fr-CH')}{' '}
              {monthlyMax !== monthlyMin
                ? `- ${monthlyMax.toLocaleString('fr-CH')} `
                : ''}
              /mois
            </p>
          )}

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />

          {/* Step indicator */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-500">
              Etape <span className="text-zinc-300 font-medium">{currentStep}</span> / 8
            </p>
            <div className="flex gap-1">
              {dots.map((dot) => (
                <div
                  key={dot}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    background:
                      dot <= currentStep
                        ? 'rgba(124,58,237,0.7)'
                        : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Delay */}
          {weeksMin > 0 && (
            <p className="text-sm text-emerald-400 font-medium">
              ~{weeksMin}-{weeksMax} semaines
            </p>
          )}
        </div>
      </div>

      {/* ── Mobile: fixed bottom bar (price + nav merged) ── */}
      <MobileBottomBar />
    </>
  )
}
