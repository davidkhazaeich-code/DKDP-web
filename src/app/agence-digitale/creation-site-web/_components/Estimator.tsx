'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { EstimatorProvider, useEstimator } from './EstimatorContext'
import { EstimatorProgress } from './EstimatorProgress'
import { EstimatorTopBanner, StickyBottomBar } from './EstimatorCounter'
import { TrustBanner } from './ui/TrustBanner'
import { Step1Project } from './steps/Step1Project'
import { Step2Branding } from './steps/Step2Branding'
import { Step3Scope } from './steps/Step3Scope'
import { Step4Content } from './steps/Step4Content'
import { Step5Features } from './steps/Step5Features'
import { Step6Acquisition } from './steps/Step6Acquisition'
import { Step7Services } from './steps/Step7Services'
import { Step8Summary } from './steps/Step8Summary'

const STEP_TITLES: Record<number, string> = {
  1: 'Votre projet',
  2: 'Branding & stratégie',
  3: 'Envergure du site',
  4: 'Contenu',
  5: 'Fonctionnalités',
  6: 'Acquisition & marketing',
  7: 'Services complémentaires',
  8: 'Recevoir votre estimation',
}

const STEP_SUBTITLES: Record<number, string> = {
  1: 'Quelques questions pour cadrer votre besoin',
  2: 'Logo, identité et positionnement',
  3: 'Volume, langues et niveau de design',
  4: 'Rédaction et visuels',
  5: 'Ce que votre site doit pouvoir faire',
  6: 'SEO, publicité et automatisation',
  7: 'Maintenance, formation et options',
  8: 'Dernière étape : recevez votre devis détaillé',
}

function EstimatorInner() {
  const { state } = useEstimator()
  const { currentStep, direction } = state

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Project />
      case 2: return <Step2Branding />
      case 3: return <Step3Scope />
      case 4: return <Step4Content />
      case 5: return <Step5Features />
      case 6: return <Step6Acquisition />
      case 7: return <Step7Services />
      case 8: return <Step8Summary />
      default: return null
    }
  }

  return (
    <div className="max-w-[1100px] mx-auto px-3 sm:px-5 lg:px-6 pt-3 sm:pt-5 pb-24 sm:pb-28">

      {/* Trust banner — small top row */}
      <TrustBanner />

      {/* Desktop estimation summary banner (above wizard) */}
      <div className="hidden lg:block mt-5">
        <EstimatorTopBanner />
      </div>

      {/* Wizard card */}
      <div className="mt-4 sm:mt-5">
        <div className="relative rounded-2xl border border-white/[0.07] bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden">

          {/* Progress bar — tight padding */}
          <div className="px-3 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6 pb-3 sm:pb-4 border-b border-white/[0.05]">
            <EstimatorProgress />
          </div>

          {/* Step content with title header */}
          <div className="px-3 sm:px-5 lg:px-6 py-5 sm:py-6 lg:py-7">
            {/* Step title */}
            <div className="mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                {STEP_TITLES[currentStep]}
              </h2>
              {STEP_SUBTITLES[currentStep] && (
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  {STEP_SUBTITLES[currentStep]}
                </p>
              )}
            </div>

            {/* Animated step body */}
            <div className="min-h-[280px] sm:min-h-[380px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom nav bar — all breakpoints */}
      <StickyBottomBar />
    </div>
  )
}

export function Estimator() {
  return (
    <EstimatorProvider>
      <EstimatorInner />
    </EstimatorProvider>
  )
}
