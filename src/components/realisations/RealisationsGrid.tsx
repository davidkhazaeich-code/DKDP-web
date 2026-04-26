'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ProjectCard } from './ProjectCard'
import { FilterBar, type FilterValue } from './FilterBar'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { Realisation } from '@/lib/realisations/types'

type Props = { items: Realisation[] }

export function RealisationsGrid({ items }: Props) {
  const router = useRouter()
  const params = useSearchParams()

  const category = (params.get('cat') ?? 'all') as FilterValue['category']
  const tag = params.get('tag')

  const availableTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of items) for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t]) => t)
  }, [items])

  const filtered = useMemo(() => {
    return items.filter(r => {
      if (category !== 'all' && r.category !== category) return false
      if (tag && !r.tags.includes(tag)) return false
      return true
    })
  }, [items, category, tag])

  function setFilter(next: FilterValue) {
    const sp = new URLSearchParams()
    if (next.category !== 'all') sp.set('cat', next.category)
    if (next.tag) sp.set('tag', next.tag)
    const qs = sp.toString()
    router.replace(`/realisations${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  return (
    <>
      <FilterBar
        category={category}
        activeTag={tag}
        availableTags={availableTags}
        onChange={setFilter}
      />

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg text-text-secondary">
              Aucune realisation pour ce filtre.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:bg-white/5"
              onClick={() => setFilter({ category: 'all', tag: null })}
            >
              Reinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <SectionReveal key={r.slug} delay={Math.min(i, 7) * 0.05}>
                <ProjectCard realisation={r} />
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
