'use client'

/**
 * LazyMotion wrapper — loads framer-motion animation features asynchronously.
 *
 * Why: framer-motion's full animation runtime (~18 KB) loads after the critical
 * rendering path, reducing TBT. Components use `m.div` (6 KB) instead of
 * `motion.div` (full bundle) in the initial chunk.
 *
 * Features load within ~100ms of mount — invisible to users since animations
 * are below the fold by the time they're needed.
 */
import { LazyMotion } from 'framer-motion'

const loadFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
