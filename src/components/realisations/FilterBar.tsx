'use client'
import { clsx } from 'clsx'

export type FilterValue = {
  category: 'all' | 'site-web' | 'projet-ia' | 'site-web-ia'
  tag: string | null
}

export type FilterBarProps = {
  category: FilterValue['category']
  activeTag: string | null
  availableTags: string[]
  onChange: (next: FilterValue) => void
}

const CATEGORY_TABS: { key: FilterValue['category']; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'site-web', label: 'Sites web' },
  { key: 'projet-ia', label: 'Projets IA' },
  { key: 'site-web-ia', label: 'Sites + IA' },
]

export function FilterBar({
  category,
  activeTag,
  availableTags,
  onChange,
}: FilterBarProps) {
  const hasFilters = category !== 'all' || activeTag !== null

  return (
    <div className="sticky top-[66px] z-30 -mx-6 border-b border-border px-6 py-3 backdrop-blur-2xl" style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2">
        <div className="flex gap-1.5" role="tablist">
          {CATEGORY_TABS.map(t => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={category === t.key}
              onClick={() => onChange({ category: t.key, tag: activeTag })}
              className={clsx(
                'rounded-full px-3 py-1.5 text-sm font-medium transition',
                category === t.key
                  ? 'bg-[var(--violet-bg)] text-[var(--violet-text)]'
                  : 'text-text-secondary hover:bg-[var(--surface-default)] hover:text-text',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          {availableTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                onChange({ category, tag: activeTag === tag ? null : tag })
              }
              className={clsx(
                'rounded-full border px-2.5 py-1 text-xs uppercase tracking-wide transition',
                activeTag === tag
                  ? 'border-[var(--violet-border)] bg-[var(--violet-bg)] text-[var(--violet-text)]'
                  : 'border-border text-text-muted hover:border-border-strong hover:text-text-secondary',
              )}
            >
              {tag}
            </button>
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={() => onChange({ category: 'all', tag: null })}
              className="rounded-full px-2.5 py-1 text-xs text-text-muted underline-offset-2 hover:text-text hover:underline"
            >
              Reinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
