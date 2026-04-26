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
    <div className="sticky top-[66px] z-30 -mx-6 border-b border-white/5 bg-[#0A0A0A]/85 px-6 py-3 backdrop-blur-2xl">
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
                  ? 'bg-violet-500/20 text-violet-200'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
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
                  ? 'border-violet-400/50 bg-violet-500/10 text-violet-200'
                  : 'border-white/10 text-text-muted hover:border-white/20 hover:text-text-secondary',
              )}
            >
              {tag}
            </button>
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={() => onChange({ category: 'all', tag: null })}
              className="rounded-full px-2.5 py-1 text-xs text-text-muted underline-offset-2 hover:text-text-primary hover:underline"
            >
              Reinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
