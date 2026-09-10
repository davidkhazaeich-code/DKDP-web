import { violet, orange, chrome, green } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

type AgendaType = 'theory' | 'practice' | 'break' | 'workshop' | 'code' | 'qa'

const STYLES: Record<AgendaType, { bg: string; border: string; color: string }> = {
  theory:   { bg: chrome.bg,  border: chrome.border,  color: chrome.color  },
  practice: { bg: orange.bg,  border: orange.border,  color: orange.color  },
  break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280' },
  workshop: { bg: violet.bg,  border: violet.border,  color: violet.color  },
  code:     { bg: green.bg,   border: green.border,   color: green.color   },
  qa:       { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.22)', color: '#4ade80' },
}

/* Une seule implementation FR + EN (pattern des composants Figma), pas de copie
   par langue comme sur la page Claude. */
const LABELS: Record<Locale, Record<AgendaType, string>> = {
  fr: { theory: 'Théorie', practice: 'Pratique', break: 'Pause', workshop: 'Atelier', code: 'Code', qa: 'Q&R' },
  en: { theory: 'Theory',  practice: 'Practice', break: 'Break', workshop: 'Workshop', code: 'Code', qa: 'Q&A' },
}

export function AgendaRow({
  time,
  title,
  dur,
  type,
  lang = 'fr',
}: {
  time: string
  title: string
  dur: string
  type: AgendaType
  lang?: Locale
}) {
  const s = STYLES[type]
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-[8px]"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
    >
      <span className="text-[11px] font-bold w-11 flex-shrink-0" style={{ color: s.color }}>
        {time}
      </span>
      <span className="text-text text-[12px] font-medium flex-1">{title}</span>
      <span
        className="hidden sm:inline text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
      >
        {LABELS[lang][type]}
      </span>
      <span className="text-text-muted text-[10px] flex-shrink-0">{dur}</span>
    </div>
  )
}
