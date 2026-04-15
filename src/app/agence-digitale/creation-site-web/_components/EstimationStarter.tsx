'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { Estimator } from './Estimator'

export function EstimationStarter() {
  const [started, setStarted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Body scroll lock (Lenis-compatible : stop wheel propagation + body overflow)
  useEffect(() => {
    if (!started) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'

    // Empêche Lenis (window listener) de recevoir les wheel events depuis l'overlay
    const el = overlayRef.current
    if (!el) return
    const stopWheel = (e: WheelEvent) => e.stopPropagation()
    el.addEventListener('wheel', stopWheel, { passive: false, capture: true })
    return () => {
      el.removeEventListener('wheel', stopWheel, { capture: true } as EventListenerOptions)
    }
  }, [started])

  // Nettoyage au démontage
  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <LiquidMetalButton onClick={() => setStarted(true)} size="lg">
        Démarrer le simulateur &nbsp;<ArrowRight size={15} style={{ display: 'inline', verticalAlign: 'middle' }} />
      </LiquidMetalButton>

      <AnimatePresence>
        {started && (
          // Opacity-only : évite transform qui casse les enfants `position:fixed` (StickyBottomBar)
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-50 bg-[#09090B] overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Fond grille cohérent avec la page */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/60 via-transparent to-[#09090B]" />
            </div>

            {/* Bouton fermer — sticky dans le scroll de l'overlay */}
            <div
              className="sticky top-0 z-10 flex justify-end px-4 pt-4 pb-2"
              style={{ background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <button
                onClick={() => setStarted(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-zinc-400 border border-zinc-800 bg-zinc-900/60 hover:text-white hover:border-zinc-600 transition-all duration-200"
              >
                <X size={15} />
                Fermer
              </button>
            </div>

            {/* Estimateur plein écran */}
            <div className="relative z-10 pb-24">
              <Estimator />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
