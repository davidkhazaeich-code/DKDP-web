export function DayAgenda() {
  const slots: { time: string; title: string; dur: string; type: 'theory' | 'practice' | 'break' | 'workshop' | 'qa' }[] = [
    { time: '09:00', title: "Introduction : comment fonctionne vraiment l'IA", dur: '30 min', type: 'theory' },
    { time: '09:30', title: 'Prompting efficace : techniques avancées', dur: '1h30', type: 'practice' },
    { time: '11:00', title: "ChatGPT et Claude : cas d'usage réels de votre équipe", dur: '1h', type: 'practice' },
    { time: '12:00', title: 'Pause déjeuner', dur: '1h', type: 'break' },
    { time: '13:00', title: 'Microsoft Copilot dans Word, Excel, Outlook', dur: '1h30', type: 'practice' },
    { time: '14:30', title: 'Automatisations simples avec Make / Zapier', dur: '1h', type: 'practice' },
    { time: '15:30', title: 'Sécurité, RGPD et limites des outils IA', dur: '30 min', type: 'theory' },
    { time: '16:00', title: 'Atelier : construire vos templates de prompts personnels', dur: '45 min', type: 'workshop' },
    { time: '16:45', title: 'Questions / Réponses et roadmap individuelle', dur: '15 min', type: 'qa' },
  ]
  const typeStyle = {
    theory:   { bg: 'rgba(212,212,216,0.08)', border: 'rgba(212,212,216,0.22)', color: '#D4D4D8', label: 'Théorie' },
    practice: { bg: 'rgba(255,107,0,0.10)',   border: 'rgba(255,107,0,0.28)',   color: '#FF8C00', label: 'Pratique' },
    break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280', label: 'Pause' },
    workshop: { bg: 'rgba(124,58,237,0.10)',  border: 'rgba(124,58,237,0.28)',  color: '#A78BFA', label: 'Atelier' },
    qa:       { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.22)',   color: '#4ade80', label: 'Q&R' },
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
            <span className="text-white text-[12px] font-medium flex-1">{s.title}</span>
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
