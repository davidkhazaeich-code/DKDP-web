'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEstimator } from './EstimatorContext'

interface EstimatorNavProps {
  canGoBack: boolean
  canSkip: boolean
  canProceed: boolean
  isLastStep: boolean
}

export function EstimatorNav({
  canGoBack,
  canSkip,
  canProceed,
  isLastStep,
}: EstimatorNavProps) {
  const { state, dispatch } = useEstimator()
  const { currentStep } = state

  // Step 8 has its own submit button
  if (currentStep === 8) return null

  const navContent = (
    <>
      {/* Left: Back button */}
      <div className="min-w-[60px] lg:min-w-[80px]">
        {canGoBack && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors duration-150 font-medium text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour
          </button>
        )}
      </div>

      {/* Center: Skip button */}
      <div className="flex-1 flex justify-center">
        {canSkip && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'SKIP_STEP' })}
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150 font-medium text-xs lg:text-sm"
          >
            Passer
          </button>
        )}
      </div>

      {/* Right: Next button */}
      <div className="min-w-[60px] lg:min-w-[80px] flex justify-end">
        <button
          type="button"
          disabled={!canProceed}
          onClick={() => {
            if (canProceed) {
              dispatch({ type: 'NEXT_STEP' })
            }
          }}
          className={[
            'flex items-center gap-1.5 px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-medium text-sm text-white',
            'bg-violet-600 hover:bg-violet-500 transition-colors duration-150',
            !canProceed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
        >
          {isLastStep ? 'Voir mon estimation' : 'Continuer'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop: inline nav */}
      <div className="hidden lg:flex justify-between items-center py-6">
        {navContent}
      </div>

      {/* Mobile/Tablet: fixed bottom bar, above the counter */}
      <div
        className="lg:hidden fixed left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          bottom: '52px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10,10,10,0.92)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {navContent}
      </div>
    </>
  )
}
