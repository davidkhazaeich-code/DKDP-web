'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEstimator } from './EstimatorContext'

const STEPS = [
  { label: 'Projet', optional: false },
  { label: 'Branding', optional: true },
  { label: 'Envergure', optional: false },
  { label: 'Contenu', optional: true },
  { label: 'Fonctions', optional: true },
  { label: 'Acquisition', optional: true },
  { label: 'Services', optional: true },
  { label: 'Devis', optional: false },
]

export function EstimatorProgress() {
  const { state, dispatch } = useEstimator()
  const { currentStep } = state

  // currentStep is 1-indexed
  const currentIndex = currentStep - 1

  return (
    <div className="w-full">
      {/* Desktop: segments with labels */}
      <div className="hidden sm:flex items-center gap-0 w-full">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isFuture = index > currentIndex

          return (
            <div key={step.label} className="flex-1 flex flex-col items-center gap-1.5">
              {/* Segment bar + connector */}
              <div className="flex items-center w-full">
                {/* Left connector line */}
                {index > 0 && (
                  <div
                    className="h-[2px] flex-1"
                    style={{
                      background:
                        isCompleted
                          ? 'rgba(16,185,129,0.6)'
                          : isActive
                            ? 'rgba(124,58,237,0.6)'
                            : 'rgba(255,255,255,0.08)',
                    }}
                  />
                )}

                {/* Step dot / icon */}
                <button
                  type="button"
                  disabled={isFuture}
                  onClick={() => {
                    if (isCompleted) {
                      dispatch({ type: 'SET_STEP', step: index + 1 })
                    }
                  }}
                  className={[
                    'relative flex items-center justify-center rounded-full transition-all duration-200',
                    'w-7 h-7 shrink-0 text-xs font-semibold',
                    isCompleted
                      ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-500'
                      : isActive
                        ? 'bg-violet-600 text-white cursor-default'
                        : 'bg-zinc-800 text-zinc-500 cursor-default',
                  ].join(' ')}
                  aria-label={`${step.label} (etape ${index + 1})`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : isActive ? (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-violet-500/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ) : null}

                  {!isCompleted && (
                    <span className="relative z-10">{index + 1}</span>
                  )}
                </button>

                {/* Right connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className="h-[2px] flex-1"
                    style={{
                      background:
                        isCompleted
                          ? 'rgba(16,185,129,0.6)'
                          : 'rgba(255,255,255,0.08)',
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <div className="flex flex-col items-center">
                <span
                  className={[
                    'text-[10px] font-medium text-center leading-tight',
                    isCompleted ? 'text-emerald-400' : isActive ? 'text-violet-300' : 'text-zinc-600',
                  ].join(' ')}
                >
                  {step.label}
                </span>
                {step.optional && !isCompleted && (
                  <span className="text-[8px] text-zinc-600 mt-0.5">optionnel</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: dots only */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 py-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex

          return (
            <button
              key={step.label}
              type="button"
              disabled={index > currentIndex}
              onClick={() => {
                if (isCompleted) {
                  dispatch({ type: 'SET_STEP', step: index + 1 })
                }
              }}
              aria-label={`${step.label} (etape ${index + 1})`}
              className="relative flex items-center justify-center"
            >
              {isCompleted ? (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-1.5 h-1.5 text-white" strokeWidth={3} />
                </span>
              ) : isActive ? (
                <span className="relative w-3 h-3 flex items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-violet-500/30"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-violet-500" />
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
              )}
            </button>
          )
        })}
      </div>

      {/* Fill animation bar (decorative, under the dots on mobile) */}
      <div className="hidden sm:block mt-0 h-0" aria-hidden />
    </div>
  )
}
