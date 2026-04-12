'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEstimator } from './EstimatorContext'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { calculateEstimate } from '@/lib/estimation/pricing'

export function EstimatorCounter() {
  const { state } = useEstimator()
  const { currentStep } = state
  const estimate = calculateEstimate(state)
  const { totalMin, totalMax, monthlyMin, monthlyMax, weeksMin, weeksMax } = estimate

  const [expanded, setExpanded] = useState(false)

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

      {/* ── Mobile: fixed bottom bar ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10,10,10,0.90)',
          borderTop: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {/* Collapsed row */}
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label="Voir les details de l'estimation"
        >
          <span className="text-sm font-semibold text-white">
            CHF {totalMin.toLocaleString('fr-CH')}{' '}
            {totalMax > 0 ? `- ${totalMax.toLocaleString('fr-CH')}` : ''}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            Etape {currentStep}/8
            <span
              className="ml-2 inline-block transition-transform duration-200"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▲
            </span>
          </span>
        </button>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="px-4 pb-4 flex flex-col gap-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {monthlyMin > 0 && (
                  <p className="text-xs font-medium pt-3" style={{ color: '#A78BFA' }}>
                    +CHF {monthlyMin.toLocaleString('fr-CH')}
                    {monthlyMax !== monthlyMin
                      ? ` - ${monthlyMax.toLocaleString('fr-CH')}`
                      : ''}{' '}
                    /mois
                  </p>
                )}
                {weeksMin > 0 && (
                  <p className="text-xs text-emerald-400 font-medium">
                    ~{weeksMin}-{weeksMax} semaines
                  </p>
                )}
                {monthlyMin === 0 && weeksMin === 0 && (
                  <p className="text-xs text-zinc-500 pt-3">
                    Continuez pour affiner votre estimation.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
