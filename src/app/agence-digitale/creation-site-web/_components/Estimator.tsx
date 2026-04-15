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
    <div className="max-w-[1200px] mx-auto px-4 pt-4 sm:pt-6 pb-20">

      {/* ── Estimation banner (desktop only, above wizard) ── */}
      <div className="hidden lg:block">
        <EstimatorTopBanner />
      </div>

      <TrustBanner />

      {/* ── Wizard — full width on all breakpoints ── */}
      <div className="mt-4 sm:mt-6 lg:mt-6">
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
        </div>
      </div>

      {/* ── Navigation bar — all breakpoints ── */}
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
