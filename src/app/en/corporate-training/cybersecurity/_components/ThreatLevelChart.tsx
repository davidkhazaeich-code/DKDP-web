import { orange } from '@/lib/tokens'

const color = orange.color

// 25/09/2026 : unsourced "% of SMEs affected" figures (92, 88, 82, 78, 55) removed. The gauge
// now shows the threat level on three steps, not a proportion. Mirror of the FR component.
const LEVELS = {
  critical: { label: 'CRITICAL', filled: 3, badge: 'rgba(239,68,68,0.15)', text: '#f87171', bar: '#ef4444' },
  high: { label: 'HIGH', filled: 2, badge: 'rgba(251,146,60,0.15)', text: '#fb923c', bar: '#fb923c' },
  medium: { label: 'MEDIUM', filled: 1, badge: 'rgba(234,179,8,0.15)', text: '#fbbf24', bar: '#fbbf24' },
} as const

export function ThreatLevelChart() {
  const threats: { name: string; level: keyof typeof LEVELS }[] = [
    { name: 'Phishing', level: 'critical' },
    { name: 'Social engineering', level: 'critical' },
    { name: 'Weak passwords', level: 'high' },
    { name: 'Ransomware', level: 'high' },
    { name: 'Outdated software', level: 'medium' },
  ]
  return (
    <div className="space-y-4 w-full">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
        Current threats: Swiss SMEs
      </p>
      {threats.map((t) => {
        const lv = LEVELS[t.level]
        return (
          <div key={t.name} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-text text-sm font-medium">{t.name}</span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: lv.badge, color: lv.text }}
              >
                {lv.label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-2 rounded-full"
                  style={{ background: n <= lv.filled ? lv.bar : 'rgba(255,107,0,0.10)' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
