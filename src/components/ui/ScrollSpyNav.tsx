'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface NavItem {
  label: string
  href: string
}

export interface ScrollSpyNavCTA {
  label: string
  href: string
}

interface ScrollSpyNavProps {
  items: NavItem[]
  cta?: ScrollSpyNavCTA
  /** Accent color hex, e.g. '#FF8C00' */
  accentColor: string
  /** Accent bg rgba, e.g. 'rgba(255,107,0,0.12)' */
  accentBg: string
  /** Accent border rgba, e.g. 'rgba(255,107,0,0.25)' */
  accentBorder: string
}

export function ScrollSpyNav({ items, cta, accentColor, accentBg, accentBorder }: ScrollSpyNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Only anchor items (href starts with #) participate in scroll spy
  const anchorItems = items.filter((item) => item.href.startsWith('#'))

  useEffect(() => {
    const ids = anchorItems.map((item) => item.href.slice(1))
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    // Track which sections are visible and pick the topmost one
    const visibleSections = new Map<string, IntersectionObserverEntry>()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry)
          } else {
            visibleSections.delete(entry.target.id)
          }
        }

        // Pick the section closest to the top of the viewport
        if (visibleSections.size > 0) {
          let closest: string | null = null
          let closestTop = Infinity
          for (const [id, entry] of visibleSections) {
            const top = Math.abs(entry.boundingClientRect.top)
            if (top < closestTop) {
              closestTop = top
              closest = id
            }
          }
          if (closest) setActiveId(closest)
        }
      },
      {
        rootMargin: '-130px 0px -40% 0px',
        threshold: 0,
      },
    )

    for (const el of elements) {
      observerRef.current.observe(el)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [anchorItems.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sticky top-[66px] z-30 px-6 pt-1.5">
      <div className="max-w-[1200px] mx-auto rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-2xl px-5">
        <div className="flex items-center justify-between gap-2">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Navigation sections">
            {items.map(({ label, href }) => {
              const isAnchor = href.startsWith('#')
              const isActive = isAnchor && activeId === href.slice(1)

              return (
                <a
                  key={href}
                  href={href}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive ? '' : 'text-text-muted hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          color: accentColor,
                          background: accentBg,
                          border: `1px solid ${accentBorder}`,
                        }
                      : {
                          border: '1px solid transparent',
                        }
                  }
                >
                  {label}
                </a>
              )
            })}
          </nav>
          {cta && (
            <Link
              href={cta.href}
              className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80"
              style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
