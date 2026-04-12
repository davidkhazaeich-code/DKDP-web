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
  const currentIndex = currentStep - 1
  const currentStepData = STEPS[currentIndex]

  return (
    <div className="w-full space-y-0">
      {/* ── Mobile: text indicator + progress bar ── */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-violet-400">
              {currentStep}/8
            </span>
            <span className="text-sm font-medium text-zinc-200">
              {currentStepData?.label}
            </span>
            {currentStepData?.optional && (
              <span className="text-[10px] text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">
                optionnel
              </span>
            )}
          </div>
        </div>
        {/* Thin progress bar */}
        <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-violet-600"
            initial={false}
            animate={{ width: `${(currentStep / 8) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ── Tablet: compact stepper ── */}
      <div className="hidden sm:flex lg:hidden items-center gap-0 w-full">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isFuture = index > currentIndex

          return (
            <div key={step.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    className="h-[2px] flex-1 transition-colors duration-300"
                    style={{
                      background: isCompleted
                        ? 'rgba(16,185,129,0.6)'
                        : isActive
                          ? 'rgba(124,58,237,0.4)'
                          : 'rgba(255,255,255,0.06)',
                    }}
                  />
                )}
                <button
                  type="button"
                  disabled={isFuture}
                  onClick={() => {
                    if (isCompleted) dispatch({ type: 'SET_STEP', step: index + 1 })
                  }}
                  className={[
                    'relative flex items-center justify-center rounded-full transition-all duration-200',
                    'w-6 h-6 shrink-0 text-[10px] font-semibold',
                    isCompleted
                      ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-500'
                      : isActive
                        ? 'bg-violet-600 text-white cursor-default'
                        : 'bg-zinc-800 text-zinc-500 cursor-default',
                  ].join(' ')}
                  aria-label={`${step.label} (étape ${index + 1})`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  ) : isActive ? (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-violet-500/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ) : null}
                  {!isCompleted && <span className="relative z-10">{index + 1}</span>}
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className="h-[2px] flex-1 transition-colors duration-300"
                    style={{
                      background: isCompleted
                        ? 'rgba(16,185,129,0.6)'
                        : 'rgba(255,255,255,0.06)',
                    }}
                  />
                )}
              </div>
              {/* Label row - fixed height for alignment */}
              <div className="h-6 flex flex-col items-center justify-start">
                <span
                  className={[
                    'text-[9px] font-medium leading-tight',
                    isCompleted ? 'text-emerald-400' : isActive ? 'text-violet-300' : 'text-zinc-600',
                  ].join(' ')}
                >
                  {step.label}
                </span>
                {step.optional && !isCompleted && (
                  <span className="text-[7px] text-zinc-600 leading-tight mt-px">optionnel</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Desktop: full stepper with labels ── */}
      <div className="hidden lg:flex items-center gap-0 w-full">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isFuture = index > currentIndex

          return (
            <div key={step.label} className="flex-1 flex flex-col items-center gap-2">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    className="h-[2px] flex-1 transition-colors duration-300"
                    style={{
                      background: isCompleted
                        ? 'rgba(16,185,129,0.6)'
                        : isActive
                          ? 'rgba(124,58,237,0.5)'
                          : 'rgba(255,255,255,0.06)',
                    }}
                  />
                )}
                <button
                  type="button"
                  disabled={isFuture}
                  onClick={() => {
                    if (isCompleted) dispatch({ type: 'SET_STEP', step: index + 1 })
                  }}
                  className={[
                    'relative flex items-center justify-center rounded-full transition-all duration-200',
                    'w-8 h-8 shrink-0 text-xs font-semibold',
                    isCompleted
                      ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-500'
                      : isActive
                        ? 'bg-violet-600 text-white cursor-default'
                        : 'bg-zinc-800 text-zinc-500 cursor-default',
                  ].join(' ')}
                  aria-label={`${step.label} (étape ${index + 1})`}
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
                  {!isCompleted && <span className="relative z-10">{index + 1}</span>}
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className="h-[2px] flex-1 transition-colors duration-300"
                    style={{
                      background: isCompleted
                        ? 'rgba(16,185,129,0.6)'
                        : 'rgba(255,255,255,0.06)',
                    }}
                  />
                )}
              </div>
              {/* Label row - fixed height for alignment */}
              <div className="h-7 flex flex-col items-center justify-start">
                <span
                  className={[
                    'text-[11px] font-medium leading-tight',
                    isCompleted ? 'text-emerald-400' : isActive ? 'text-violet-300' : 'text-zinc-600',
                  ].join(' ')}
                >
                  {step.label}
                </span>
                {step.optional && !isCompleted && (
                  <span className="text-[9px] text-zinc-600 leading-tight mt-0.5">optionnel</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
