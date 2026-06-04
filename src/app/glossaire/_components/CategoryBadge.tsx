import type { Category } from '../_types'
import type { Locale } from '@/i18n/config'

const CATEGORY_STYLES: Record<Category, { color: string; border: string; label: string; labelEn: string }> = {
  IA:        { color: '#C4B5FD', border: 'rgba(124,58,237,0.65)',   label: 'IA', labelEn: 'AI' },
  SEO:       { color: '#D4D4D8', border: 'rgba(212,212,216,0.50)',  label: 'SEO', labelEn: 'SEO' },
  Web:       { color: '#86efac', border: 'rgba(74,222,128,0.55)',   label: 'Web', labelEn: 'Web' },
  Formation: { color: '#FDBA74', border: 'rgba(255,107,0,0.55)',    label: 'Formation', labelEn: 'Training' },
  General:   { color: '#9CA3AF', border: 'rgba(156,163,175,0.45)', label: 'Général', labelEn: 'General' },
}

export function CategoryBadge({ category, lang = 'fr' }: { category: Category; lang?: Locale }) {
  const { color, border, label, labelEn } = CATEGORY_STYLES[category]
  const display = lang === 'en' ? labelEn : label
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{
        color,
        border: `1px solid ${border}`,
        background: 'var(--surface-default)',
      }}
    >
      {display}
    </span>
  )
}
