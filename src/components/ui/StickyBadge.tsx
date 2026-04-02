'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrustBadge } from './TrustBadge'

export function StickyBadge() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const target = document.getElementById('problem-section')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else if (entry.boundingClientRect.top > 0) {
          // section left viewport from the top = user scrolled back up above it
          setVisible(false)
        }
        // if top < 0: section left viewport from the bottom = user scrolled past it → keep visible
      },
      { threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-badge"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed bottom-6 left-6 z-30 drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))' }}
        >
          <h2 className="sr-only">Service Digital · Service 100% Suisse</h2>
          <TrustBadge variant="dark" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
