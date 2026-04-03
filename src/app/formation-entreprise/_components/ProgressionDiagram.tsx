export function ProgressionDiagram() {
  const levels = [
    { label: 'Niveau initial', sub: 'Avant la formation', pct: 20, color: '#6B7280' },
    { label: 'Fin de formation', sub: 'J+1', pct: 65, color: '#FF8C00' },
    { label: 'Après 30 jours', sub: 'Mise en pratique', pct: 80, color: '#FF6900' },
    { label: 'Autonomie totale', sub: 'Après 60 jours', pct: 95, color: '#FF4500' },
  ]
  return (
    <div className="w-full space-y-4">
      {levels.map((lvl, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-white text-xs font-semibold">{lvl.label}</span>
            <span className="text-text-muted text-[10px]">{lvl.sub}</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${lvl.pct}%`, background: `linear-gradient(90deg, ${lvl.color}88, ${lvl.color})` }}
            />
          </div>
          <p className="text-right text-[10px] font-bold mt-0.5" style={{ color: lvl.color }}>{lvl.pct}%</p>
        </div>
      ))}
      <p className="text-text-muted text-[11px] text-center pt-2">Progression moyenne observée sur 500+ participants</p>
    </div>
  )
}
