export function DayAgenda() {
  const slots: { time: string; title: string; dur: string; type: 'theory' | 'practice' | 'break' | 'workshop' | 'qa' }[] = [
    { time: '09:00', title: 'Introduction: how AI really works', dur: '30 min', type: 'theory' },
    { time: '09:30', title: 'Effective prompting: advanced techniques', dur: '1h30', type: 'practice' },
    { time: '11:00', title: "ChatGPT and Claude: your team's real use cases", dur: '1h', type: 'practice' },
    { time: '12:00', title: 'Lunch break', dur: '1h', type: 'break' },
    { time: '13:00', title: 'Microsoft Copilot in Word, Excel, Outlook', dur: '1h30', type: 'practice' },
    { time: '14:30', title: 'Simple automations with Make / Zapier', dur: '1h', type: 'practice' },
    { time: '15:30', title: 'Security, GDPR and the limits of AI tools', dur: '30 min', type: 'theory' },
    { time: '16:00', title: 'Workshop: build your personal prompt templates', dur: '45 min', type: 'workshop' },
    { time: '16:45', title: 'Q&A and individual roadmap', dur: '15 min', type: 'qa' },
  ]
  const typeStyle = {
    theory:   { bg: 'rgba(212,212,216,0.08)', border: 'rgba(212,212,216,0.22)', color: '#D4D4D8', label: 'Theory' },
    practice: { bg: 'rgba(255,107,0,0.10)',   border: 'rgba(255,107,0,0.28)',   color: '#FF8C00', label: 'Practice' },
    break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280', label: 'Break' },
    workshop: { bg: 'rgba(124,58,237,0.10)',  border: 'rgba(124,58,237,0.28)',  color: '#A78BFA', label: 'Workshop' },
    qa:       { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.22)',   color: '#4ade80', label: 'Q&A' },
  }
  return (
    <div className="space-y-2">
      {slots.map((s, i) => {
        const ts = typeStyle[s.type]
        return (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-[8px]"
            style={{ background: ts.bg, border: `1px solid ${ts.border}` }}
          >
            <span className="text-[11px] font-bold w-11 flex-shrink-0" style={{ color: ts.color }}>{s.time}</span>
            <span className="text-text text-[12px] font-medium flex-1">{s.title}</span>
            <span
              className="hidden sm:inline text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}
            >
              {ts.label}
            </span>
            <span className="text-text-muted text-[10px] flex-shrink-0">{s.dur}</span>
          </div>
        )
      })}
    </div>
  )
}
