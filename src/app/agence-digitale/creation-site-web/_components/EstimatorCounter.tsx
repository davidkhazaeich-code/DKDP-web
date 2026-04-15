'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEstimator } from './EstimatorContext'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { calculateEstimate } from '@/lib/estimation/pricing'

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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(10,10,10,0.92)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 lg:py-3 gap-2 sm:gap-4">
        {/* Left: back button */}
        <div className="w-16 sm:w-20 flex-shrink-0">
          {canGoBack && !isStep8 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              className="flex items-center gap-0.5 sm:gap-1 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Retour
            </button>
          )}
        </div>

        {/* Center: price + details */}
        <div className="flex-1 text-center min-w-0">
          <p className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
            CHF {totalMin.toLocaleString('fr-CH')}
            {totalMax > 0 ? ` - ${totalMax.toLocaleString('fr-CH')}` : ''}
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-zinc-500">
            {monthlyMin > 0 && (
              <span className="text-violet-400">+{monthlyMin.toLocaleString('fr-CH')}/mo</span>
            )}
            {weeksMin > 0 && (
              <span className="text-emerald-400">~{weeksMin}-{weeksMax} sem.</span>
            )}
            {monthlyMin === 0 && weeksMin === 0 && (
              <span>Étape {currentStep}/8</span>
            )}
          </div>
        </div>

        {/* Right: skip + continue */}
        <div className="flex-shrink-0 flex items-center justify-end gap-2 sm:gap-3">
          {canSkip && !isStep8 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'SKIP_STEP' })}
              className="text-zinc-400 hover:text-zinc-200 transition-colors text-[10px] sm:text-xs lg:text-sm font-medium border border-white/10 rounded-lg px-3 py-1.5 sm:py-2 hover:border-white/20"
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
                'flex items-center gap-1 sm:gap-1.5 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200',
                canProceed
                  ? 'bg-violet-600 hover:bg-violet-500 text-white cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed',
              ].join(' ')}
            >
              {isLastStep ? 'Recevoir mon estimation' : 'Suivant'}
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Top banner (desktop) ──────────────────────────────────────────────────────

export function EstimatorTopBanner() {
  const { state } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, weeksMin, weeksMax } = estimate
  const dots = Array.from({ length: 8 }, (_, i) => i + 1)

  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A]/70 backdrop-blur-md px-6 py-4 flex items-center gap-5 mb-6"
    >
      {/* Label */}
      <div className="flex-shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Votre estimation
        </p>
      </div>

      <div className="w-px self-stretch bg-white/[0.06]" />

      {/* Price */}
      <div className="flex-shrink-0">
        <p className="text-xl font-bold text-white leading-none tabular-nums">
          <AnimatedCounter value={totalMin} prefix="CHF" />
          <span className="text-zinc-600 mx-2">–</span>
          <AnimatedCounter value={totalMax} prefix="" />
        </p>
        {monthlyMin > 0 && (
          <p className="text-xs mt-1" style={{ color: '#A78BFA' }}>
            +CHF {monthlyMin.toLocaleString('fr-CH')}/mois
          </p>
        )}
      </div>

      <div className="w-px self-stretch bg-white/[0.06]" />

      {/* Step progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 flex-1">
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
          <p className="text-xs text-zinc-500 flex-shrink-0">
            Étape <span className="text-zinc-300 font-medium">{currentStep}</span>/8
          </p>
        </div>
      </div>

      {/* Weeks (conditional) */}
      {weeksMin > 0 && (
        <>
          <div className="w-px self-stretch bg-white/[0.06]" />
          <div className="flex-shrink-0">
            <p className="text-sm font-medium text-emerald-400">
              ~{weeksMin}–{weeksMax} sem.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

// ── Legacy sidebar (kept for reference, replaced by EstimatorTopBanner) ──────

export function EstimatorCounter() {
  const { state } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, monthlyMax, weeksMin, weeksMax } = estimate

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
          <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
            Votre estimation
          </p>
          <div>
            <p className="text-2xl font-bold text-white leading-tight">
              <AnimatedCounter value={totalMin} prefix="CHF" />
              {' - '}
              <AnimatedCounter value={totalMax} prefix="" />
            </p>
          </div>
          {monthlyMin > 0 && (
            <p className="text-sm font-medium" style={{ color: '#A78BFA' }}>
              +CHF {monthlyMin.toLocaleString('fr-CH')}{' '}
              {monthlyMax !== monthlyMin
                ? `- ${monthlyMax.toLocaleString('fr-CH')} `
                : ''}
              /mois
            </p>
          )}
          <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-500">
              Étape <span className="text-zinc-300 font-medium">{currentStep}</span> / 8
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
          {weeksMin > 0 && (
            <p className="text-sm text-emerald-400 font-medium">
              ~{weeksMin}-{weeksMax} semaines
            </p>
          )}
        </div>
      </div>

      {/* ── Sticky bottom bar (all breakpoints) ── */}
      <StickyBottomBar />
    </>
  )
}
