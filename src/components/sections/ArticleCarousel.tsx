'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BLOG_CATEGORIES, type Article } from '@/lib/blog'
import type { Locale } from '@/i18n/config'

const CATEGORY_LABEL_EN: Record<string, string> = {
  ia: 'Artificial Intelligence',
  seo: 'SEO and Visibility',
  formation: 'Training',
  outils: 'Tools and Productivity',
}

const COPY = {
  fr: {
    prev: 'Articles précédents',
    next: 'Articles suivants',
    region: "Carrousel d'articles de blog",
    swipe: 'Faites glisser pour parcourir',
    read: 'Lire',
    readTime: 'de lecture',
  },
  en: {
    prev: 'Previous articles',
    next: 'Next articles',
    region: 'Blog article carousel',
    swipe: 'Swipe to browse',
    read: 'Read',
    readTime: 'read',
  },
} as const

interface ArticleCarouselProps {
  articles: Article[]
  /** Accent hex, ex. '#FF8C00' */
  accentColor: string
  /** Accent border rgba, ex. 'rgba(255,107,0,0.25)' */
  accentBorder: string
  lang?: Locale
  /** aria-label du carrousel, sinon libelle par defaut */
  label?: string
}

export function ArticleCarousel({
  articles,
  accentColor,
  accentBorder,
  lang = 'fr',
  label,
}: ArticleCarouselProps) {
  const t = COPY[lang === 'en' ? 'en' : 'fr']
  const trackRef = useRef<HTMLDivElement | null>(null)
  /** Cible du defilement programmatique en cours, sinon null.
      Sans elle, deux clics rapides sur la fleche n'avancent que d'une carte :
      scrollBy repart de la position animee, pas de la destination. */
  const pendingRef = useRef<number | null>(null)

  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)
  const [progress, setProgress] = useState(0)
  const [thumb, setThumb] = useState(1)

  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const x = el.scrollLeft
    if (pendingRef.current !== null && Math.abs(x - pendingRef.current) <= 2) {
      pendingRef.current = null
    }
    setAtStart(x <= 2)
    setAtEnd(x >= max - 2)
    setProgress(max > 0 ? Math.min(1, Math.max(0, x / max)) : 0)
    setThumb(el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    sync()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [sync])

  const step = useCallback((dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('[data-card]')
    // Largeur d'une carte + gap, lue sur le DOM pour rester juste a tous les breakpoints
    const delta =
      cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : el.clientWidth * 0.9
    const max = el.scrollWidth - el.clientWidth
    const base = pendingRef.current ?? el.scrollLeft
    const target = Math.min(max, Math.max(0, base + dir * delta))
    pendingRef.current = target
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: target, behavior: reduced ? 'auto' : 'smooth' })
  }, [])

  /** Un geste manuel (swipe, molette, drag) reprend la main sur la cible en cours. */
  const releasePending = useCallback(() => {
    pendingRef.current = null
  }, [])

  if (articles.length === 0) return null

  const scrollable = !(atStart && atEnd)
  const fadeL = atStart ? '0px' : '40px'
  const fadeR = atEnd ? '0px' : '40px'
  const mask = `linear-gradient(to right, transparent 0, #000 ${fadeL}, #000 calc(100% - ${fadeR}), transparent 100%)`

  const ArrowBtn = ({ dir, disabled }: { dir: -1 | 1; disabled: boolean }) => (
    <button
      type="button"
      onClick={() => step(dir)}
      disabled={disabled}
      aria-label={dir === -1 ? t.prev : t.next}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-default enabled:hover:-translate-y-0.5"
      style={{
        color: disabled ? 'var(--text-muted)' : accentColor,
        border: `1px solid ${disabled ? 'var(--border)' : accentBorder}`,
        background: 'var(--bg-card)',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  )

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label ?? t.region}
      className="relative"
    >
      {/* Piste scrollable : swipe natif au doigt, trackpad et molette horizontale */}
      <div
        ref={trackRef}
        onScroll={sync}
        onPointerDown={releasePending}
        onWheel={releasePending}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory pb-1"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {articles.map((a) => {
          const cat = BLOG_CATEGORIES[a.category]
          const catLabel =
            lang === 'en' ? (CATEGORY_LABEL_EN[a.category] ?? cat.label) : cat.label
          // Bordure au token de theme et non cat.border : les teintes de categorie
          // disparaissent sur fond creme. La couleur de categorie reste portee
          // par la pastille, posee sur l'image.
          return (
            <Link
              key={a.slug}
              data-card
              href={`/blog/${a.slug}`}
              className="group snap-start flex-shrink-0 w-[268px] sm:w-[300px] lg:w-[324px] flex flex-col rounded-[16px] border border-border overflow-hidden bg-bg-card transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                <Image
                  src={a.heroImage.src}
                  alt={a.heroImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 268px, (max-width: 1024px) 300px, 324px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span
                  className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(10,10,10,0.84)',
                    color: cat.color,
                    border: `1px solid ${cat.border}`,
                  }}
                >
                  {catLabel}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 gap-2.5">
                <p className="text-text-muted text-xs">
                  {a.date} · {a.readTime} {t.readTime}
                </p>
                <h3 className="text-text font-semibold text-[15px] leading-snug line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3">
                  {a.excerpt}
                </p>
                {/* Couleur de texte du theme, pas cat.color : le chrome #D4D4D8
                    de la categorie IA devient illisible sur fond clair. */}
                <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold text-text">
                  {t.read}
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Barre de progression + fleches */}
      {scrollable && (
        <div className="flex items-center gap-4 mt-6">
          <div
            className="relative h-[3px] flex-1 rounded-full overflow-hidden"
            style={{ background: 'var(--surface-border)' }}
            aria-hidden="true"
          >
            <div
              className="absolute top-0 bottom-0 rounded-full transition-[left] duration-150 ease-out"
              style={{
                width: `${thumb * 100}%`,
                left: `${progress * (100 - thumb * 100)}%`,
                background: accentColor,
              }}
            />
          </div>
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <ArrowBtn dir={-1} disabled={atStart} />
            <ArrowBtn dir={1} disabled={atEnd} />
          </div>
          <span className="md:hidden text-text-muted text-[11px] flex-shrink-0">{t.swipe}</span>
        </div>
      )}
    </div>
  )
}
