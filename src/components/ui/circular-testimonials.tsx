'use client'

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface CircularItem {
  quote: string
  name: string
  designation: string
  src: string
  cardBg?: string
  cardBorder?: string
  imageScale?: number
  imageOffsetX?: number
}

interface CircularTestimonialsProps {
  items: CircularItem[]
  autoplay?: boolean
  colors?: {
    name?: string
    designation?: string
    quote?: string
    arrowBackground?: string
    arrowForeground?: string
    arrowHoverBackground?: string
  }
  fontSizes?: {
    name?: string
    designation?: string
    quote?: string
  }
}

function calculateGap(width: number) {
  const minWidth = 300
  const maxWidth = 600
  const minGap = 40
  const maxGap = 70
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return maxGap
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

export function CircularTestimonials({
  items,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) {
  const colorName        = colors.name               ?? '#ffffff'
  const colorDesignation = colors.designation        ?? '#A78BFA'
  const colorQuote       = colors.quote              ?? '#9CA3AF'
  const colorArrowBg     = colors.arrowBackground    ?? '#1E1E1E'
  const colorArrowFg     = colors.arrowForeground    ?? '#ffffff'
  const colorArrowHover  = colors.arrowHoverBackground ?? '#7C3AED'
  const fsName           = fontSizes.name            ?? '1.5rem'
  const fsDesignation    = fontSizes.designation     ?? '0.875rem'
  const fsQuote          = fontSizes.quote           ?? '1rem'

  const [activeIndex, setActiveIndex]   = useState(0)
  const [hoverPrev, setHoverPrev]       = useState(false)
  const [hoverNext, setHoverNext]       = useState(false)
  const [containerWidth, setContainerWidth] = useState(400)

  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef  = useRef<NodeJS.Timeout | null>(null)
  const count        = useMemo(() => items.length, [items])
  const active       = useMemo(() => items[activeIndex], [activeIndex, items])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth))
    ro.observe(el)
    setContainerWidth(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex(p => (p + 1) % count)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [count])

  const handlePrev = useCallback(() => {
    setActiveIndex(p => (p - 1 + count) % count)
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }, [count])

  useEffect(() => {
    if (!autoplay) return
    autoplayRef.current = setInterval(() => setActiveIndex(p => (p + 1) % count), 5000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [autoplay, count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePrev, handleNext])

  function getCardStyle(index: number): React.CSSProperties {
    const gap        = calculateGap(containerWidth)
    const maxStickUp = gap * 0.75
    const isActive   = index === activeIndex
    const isLeft     = (activeIndex - 1 + count) % count === index
    const isRight    = (activeIndex + 1) % count === index

    const base: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      borderRadius: '1rem',
      overflow: 'hidden',
    }

    if (isActive) return {
      ...base,
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
      boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
    }
    if (isLeft) return {
      ...base,
      zIndex: 2, opacity: 0.75, pointerEvents: 'auto',
      transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(14deg)`,
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    }
    if (isRight) return {
      ...base,
      zIndex: 2, opacity: 0.75, pointerEvents: 'auto',
      transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(-14deg)`,
      transition: 'all 0.75s cubic-bezier(.4,2,.3,1)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    }
    return { ...base, zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.75s cubic-bezier(.4,2,.3,1)' }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Photo cards */}
        <div
          ref={containerRef}
          className="relative w-full h-[380px] md:h-[440px]"
          style={{ perspective: '1000px' }}
        >
          {items.map((item, i) => (
            <div
              key={item.src}
              style={{
                ...getCardStyle(i),
                background: item.cardBg ?? 'rgba(255,255,255,0.04)',
                border: `1px solid ${item.cardBorder ?? 'rgba(255,255,255,0.08)'}`,
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.name}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: `translateX(calc(-50% + ${item.imageOffsetX ?? 0}px)) scale(${item.imageScale ?? 1})`,
                  transformOrigin: 'bottom center',
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <p
                className="font-bold mb-1 tracking-tight"
                style={{ color: colorName, fontSize: fsName }}
              >
                {active.name}
              </p>
              <p
                className="mb-6 font-semibold uppercase tracking-[0.1em]"
                style={{ color: colorDesignation, fontSize: fsDesignation }}
              >
                {active.designation}
              </p>
              <p className="leading-relaxed" style={{ color: colorQuote, fontSize: fsQuote }}>
                {active.quote.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut', delay: 0.02 * i }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="flex gap-4 mt-10">
            <button
              type="button"
              aria-label="Précédent"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 border-0 cursor-pointer"
              style={{ backgroundColor: hoverPrev ? colorArrowHover : colorArrowBg }}
            >
              <ArrowLeft size={18} color={colorArrowFg} />
            </button>
            <button
              type="button"
              aria-label="Suivant"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 border-0 cursor-pointer"
              style={{ backgroundColor: hoverNext ? colorArrowHover : colorArrowBg }}
            >
              <ArrowRight size={18} color={colorArrowFg} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
