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

  return (
    <div className="flex justify-between items-center py-6">
      {/* Left: Back button */}
      <div className="min-w-[80px]">
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
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150 font-medium text-sm"
          >
            Pas pour l&apos;instant
          </button>
        )}
      </div>

      {/* Right: Next button */}
      <div className="min-w-[80px] flex justify-end">
        <button
          type="button"
          disabled={!canProceed}
          onClick={() => {
            if (canProceed) {
              dispatch({ type: 'NEXT_STEP' })
            }
          }}
          className={[
            'flex items-center gap-1.5 px-6 py-3 rounded-xl font-medium text-sm text-white',
            'bg-violet-600 hover:bg-violet-500 transition-colors duration-150',
            !canProceed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
        >
          {isLastStep ? 'Voir mon estimation' : 'Continuer'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
