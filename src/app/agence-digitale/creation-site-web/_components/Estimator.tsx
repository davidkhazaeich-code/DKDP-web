'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { GradText } from '@/components/ui/GradText'
import { EstimatorProvider, useEstimator } from './EstimatorContext'
import { EstimatorProgress } from './EstimatorProgress'
import { EstimatorCounter } from './EstimatorCounter'
import { EstimatorNav } from './EstimatorNav'
import { TrustBanner } from './ui/TrustBanner'
import { Step1Project } from './steps/Step1Project'
import { Step2Branding } from './steps/Step2Branding'
import { Step3Scope } from './steps/Step3Scope'
import { Step4Content } from './steps/Step4Content'
import { Step5Features } from './steps/Step5Features'
import { Step6Acquisition } from './steps/Step6Acquisition'
import { Step7Services } from './steps/Step7Services'
import { Step8Summary } from './steps/Step8Summary'

function EstimatorInner() {
  const { state, dispatch } = useEstimator()
  const { currentStep, direction } = state

  // Step validation logic
  const canGoBack = currentStep > 1
  const canSkip = [2, 4, 5, 6, 7].includes(currentStep)
  const canProceed = (() => {
    switch (currentStep) {
      case 1:
        return !!state.situation && !!state.siteType && !!state.sector
      case 3:
        return !!state.pages && !!state.languages && !!state.designLevel
      default:
        return true // optional steps always allow proceeding
    }
  })()
  const isLastStep = currentStep === 7

  // Step rendering
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Project />
      case 2:
        return <Step2Branding />
      case 3:
        return <Step3Scope />
      case 4:
        return <Step4Content />
      case 5:
        return <Step5Features />
      case 6:
        return <Step6Acquisition />
      case 7:
        return <Step7Services />
      case 8:
        return <Step8Summary />
      default:
        return null
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-20 lg:pb-0">
      {/* Title */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1.5 sm:mb-3">
          Estimez votre <GradText>projet web</GradText>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base hidden sm:block">
          Configurez votre projet en quelques etapes et recevez une estimation personnalisee
        </p>
      </div>

      <TrustBanner />

      <div className="mt-4 sm:mt-6 lg:mt-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
        {/* Left column - main wizard */}
        <div className="relative">
          {/* Frosted glass content panel */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-[#0A0A0A]/70 backdrop-blur-md p-3 sm:p-5 lg:p-6">
            <EstimatorProgress />

            <div className="mt-4 sm:mt-6 min-h-[300px] sm:min-h-[400px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            <EstimatorNav
              canGoBack={canGoBack}
              canSkip={canSkip}
              canProceed={canProceed}
              isLastStep={isLastStep}
            />
          </div>
        </div>

        {/* Right column - sticky counter (desktop) */}
        <div className="hidden lg:block">
          <EstimatorCounter />
        </div>
      </div>

      {/* Mobile bottom counter */}
      <div className="lg:hidden">
        <EstimatorCounter />
      </div>
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
