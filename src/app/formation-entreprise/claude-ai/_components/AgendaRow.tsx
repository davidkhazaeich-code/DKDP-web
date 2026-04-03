import { violet, orange, chrome, green } from '@/lib/tokens'

type AgendaType = 'theory' | 'practice' | 'break' | 'workshop' | 'code' | 'qa'

const STYLES: Record<AgendaType, { bg: string; border: string; color: string; label: string }> = {
  theory:   { bg: chrome.bg,  border: chrome.border,  color: chrome.color,  label: 'Théorie'  },
  practice: { bg: orange.bg,  border: orange.border,  color: orange.color,  label: 'Pratique' },
  break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280', label: 'Pause' },
  workshop: { bg: violet.bg,  border: violet.border,  color: violet.color,  label: 'Atelier'  },
  code:     { bg: green.bg,   border: green.border,   color: green.color,   label: 'Code'     },
  qa:       { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.22)', color: '#4ade80',   label: 'Q&R'  },
}

export function AgendaRow({
  time,
  title,
  dur,
  type,
}: {
  time: string
  title: string
  dur: string
  type: AgendaType
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
      <span className="text-white text-[12px] font-medium flex-1">{title}</span>
      <span
        className="hidden sm:inline text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
        style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
      >
        {s.label}
      </span>
      <span className="text-text-muted text-[10px] flex-shrink-0">{dur}</span>
    </div>
  )
}
