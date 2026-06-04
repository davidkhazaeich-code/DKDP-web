'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { Estimator } from './Estimator'
import type { Locale } from '@/i18n/config'

const T = {
  fr: { start: 'Démarrer le simulateur', close: 'Fermer' },
  en: { start: 'Start the simulator', close: 'Close' },
} as const

export function EstimationStarter({ lang = 'fr' }: { lang?: Locale }) {
  const t = T[lang]
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
        {t.start} &nbsp;<ArrowRight size={15} style={{ display: 'inline', verticalAlign: 'middle' }} />
      </LiquidMetalButton>

      <AnimatePresence>
        {started && (
          // Opacity-only : évite transform qui casse les enfants `position:fixed` (StickyBottomBar)
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
            style={{ background: 'var(--bg)' }}
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
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 60%, transparent), transparent, var(--bg))' }}
              />
            </div>

            {/* Bouton fermer — sticky dans le scroll de l'overlay */}
            <div
              className="sticky top-0 z-10 flex justify-end px-4 pt-4 pb-2"
              style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <button
                onClick={() => setStarted(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-text-secondary border border-border bg-bg-card/60 hover:text-text hover:border-border-strong transition-all duration-200"
              >
                <X size={15} />
                {t.close}
              </button>
            </div>

            {/* Estimateur plein écran */}
            <div className="relative z-10 pb-24">
              <Estimator lang={lang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
