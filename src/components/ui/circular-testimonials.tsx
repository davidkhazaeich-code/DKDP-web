'use client'

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react'
import Image from 'next/image'
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
  linkedin?: string
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
  const dragStartX   = useRef<number | null>(null)
  const count        = useMemo(() => items.length, [items])
  const active       = useMemo(() => items[activeIndex], [activeIndex, items])

  const DRAG_THRESHOLD = 50

  function onDragStart(x: number) {
    dragStartX.current = x
  }

  function onDragEnd(x: number) {
    if (dragStartX.current === null) return
    const delta = x - dragStartX.current
    if (delta < -DRAG_THRESHOLD) handleNext()
    else if (delta > DRAG_THRESHOLD) handlePrev()
    dragStartX.current = null
  }

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
    <div
      className="w-full max-w-4xl mx-auto select-none"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseUp={(e) => onDragEnd(e.clientX)}
      onMouseLeave={() => { dragStartX.current = null }}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
    >
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
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                priority={i === 0}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  transform: `translateX(${item.imageOffsetX ?? 0}px) scale(${item.imageScale ?? 1})`,
                  transformOrigin: 'bottom center',
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

              {/* LinkedIn */}
              {active.linkedin && (
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
                  style={{
                    background: 'rgba(10,102,194,0.15)',
                    border: '1px solid rgba(10,102,194,0.30)',
                    color: '#60a5fa',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
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
