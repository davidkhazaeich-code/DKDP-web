import { orange } from '@/lib/tokens'

const color = orange.color

export function ThreatLevelChart() {
  const threats = [
    { name: 'Phishing / hameçonnage', pct: 92, level: 'CRITIQUE' },
    { name: 'Ingénierie sociale', pct: 88, level: 'CRITIQUE' },
    { name: 'Mots de passe faibles', pct: 82, level: 'ÉLEVÉ' },
    { name: 'Ransomware', pct: 78, level: 'ÉLEVÉ' },
    { name: 'Logiciels non à jour', pct: 55, level: 'MOYEN' },
  ]
  return (
    <div className="space-y-4 w-full">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
        Menaces actuelles : PME suisses
      </p>
      {threats.map((t) => (
        <div key={t.name} className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-medium">{t.name}</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: t.pct >= 85 ? 'rgba(239,68,68,0.15)' : t.pct >= 70 ? 'rgba(251,146,60,0.15)' : 'rgba(234,179,8,0.15)',
                color: t.pct >= 85 ? '#f87171' : t.pct >= 70 ? '#fb923c' : '#fbbf24',
              }}
            >
              {t.level}
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: 'rgba(255,107,0,0.10)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${t.pct}%`,
                background: t.pct >= 85
                  ? 'linear-gradient(90deg, rgba(239,68,68,0.60), #ef4444)'
                  : t.pct >= 70
                  ? 'linear-gradient(90deg, rgba(251,146,60,0.60), #fb923c)'
                  : 'linear-gradient(90deg, rgba(234,179,8,0.60), #fbbf24)',
              }}
            />
          </div>
          <p className="text-text-muted text-[10px]">{t.pct}% des PME concernées</p>
        </div>
      ))}
    </div>
  )
}
