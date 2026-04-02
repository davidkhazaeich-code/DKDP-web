'use client'

import { useState, useRef, useEffect } from 'react'

type Category = 'IA' | 'SEO' | 'Web' | 'Formation' | 'General'

interface TermEntry {
  term: string
  category: Category
}

const CATEGORY_COLORS: Record<Category, string> = {
  IA:        '#C4B5FD',
  SEO:       '#D4D4D8',
  Web:       '#86efac',
  Formation: '#FDBA74',
  General:   '#9CA3AF',
}

function termId(term: string) {
  return 'term-' + term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function GlossaireSearch({ terms }: { terms: TermEntry[] }) {
  const [query, setQuery]   = useState('')
  const [open, setOpen]     = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef            = useRef<HTMLInputElement>(null)
  const containerRef        = useRef<HTMLDivElement>(null)

  const suggestions = query.trim().length >= 1
    ? terms.filter(t => normalize(t.term).includes(normalize(query))).slice(0, 8)
    : []

  const showDropdown = open && suggestions.length > 0

  function scrollToTerm(term: string) {
    const el = document.getElementById(termId(term))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.style.transition = 'box-shadow 0.3s ease'
      el.style.boxShadow  = '0 0 0 2px rgba(167,139,250,0.65)'
      setTimeout(() => { el.style.boxShadow = '' }, 1400)
    }
    setQuery(term)
    setOpen(false)
    setActive(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => Math.min(a + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (active >= 0) scrollToTerm(suggestions[active].term)
      else if (suggestions.length === 1) scrollToTerm(suggestions[0].term)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  // Close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* ── Input ── */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setActive(-1) }}
          onFocus={() => { if (query.trim().length >= 1) setOpen(true) }}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un terme..."
          aria-label="Rechercher un terme dans le glossaire"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          autoComplete="off"
          className="w-full rounded-[10px] px-4 py-3 pl-10 pr-9 text-sm text-white placeholder:text-text-muted outline-none transition-all"
          style={{
            background: 'rgba(212,212,216,0.06)',
            border: `1px solid ${showDropdown ? 'rgba(167,139,250,0.45)' : 'rgba(212,212,216,0.14)'}`,
            borderRadius: showDropdown ? '10px 10px 0 0' : '10px',
          }}
        />

        {/* Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        {/* Clear button */}
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full text-text-muted hover:text-white transition-colors"
            aria-label="Effacer la recherche"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-50 overflow-hidden rounded-b-[10px]"
          style={{
            background: '#111118',
            border: '1px solid rgba(167,139,250,0.45)',
            borderTop: 'none',
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={s.term}
              role="option"
              aria-selected={active === i}
              onMouseEnter={() => setActive(i)}
              onMouseDown={e => { e.preventDefault(); scrollToTerm(s.term) }}
              className="flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer transition-colors"
              style={{
                background: active === i ? 'rgba(167,139,250,0.10)' : 'transparent',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span className="text-sm text-white font-medium">{s.term}</span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                style={{ color: CATEGORY_COLORS[s.category] }}
              >
                {s.category}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {open && query.trim().length >= 1 && suggestions.length === 0 && (
        <div
          className="absolute left-0 right-0 z-50 px-4 py-3 rounded-b-[10px]"
          style={{
            background: '#111118',
            border: '1px solid rgba(167,139,250,0.45)',
            borderTop: 'none',
          }}
        >
          <p className="text-text-muted text-sm">Aucun terme trouvé pour &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  )
}
