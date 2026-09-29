import { violet } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgCount, dg } from '@/components/motion/dg'

// 29/09/2026 : les barres se remplissent position après position et la part de clics défile
// (kit dg-*). Sous 10 %, le chiffre ne défile pas : il apparaît avec sa ligne.
export function SEOFunnel() {
  const positions = [
    { pos: 'Position 1', pct: 28, color: '#A78BFA' },
    { pos: 'Position 2–3', pct: 15, color: '#8B5CF6' },
    { pos: 'Position 4–10', pct: 4, color: 'rgba(139,92,246,0.60)' },
    { pos: 'Page 2+', pct: 1, color: 'rgba(139,92,246,0.30)' },
  ]
  const step = { '--dg-step': '140ms' }
  return (
    <DiagramMotion className="space-y-3 w-full">
      <p className="dg-fade text-[11px] font-bold uppercase tracking-widest mb-4 text-center" style={{ ...dg(0, 150), color: violet.color }}>
        Part de clics par position Google
      </p>
      {positions.map((p, i) => (
        <div key={p.pos} className="dg-rise space-y-1" style={dg(i, 250, step)}>
          <div className="flex justify-between items-center">
            <span className="text-text text-sm font-semibold">{p.pos}</span>
            <span className="font-bold text-sm" style={{ color: violet.color }}>
              {p.pct >= 10 ? <DgCount to={p.pct} i={i} at={350} dur={1000} style={step as React.CSSProperties} /> : p.pct}% des clics
            </span>
          </div>
          <div className="h-2.5 rounded-full" style={{ background: violet.bg }}>
            <div className="dg-grow-x h-full rounded-full" style={{ ...dg(i, 350, { ...step, '--dg-dur': '1000ms' }), width: `${(p.pct / 28) * 100}%`, background: p.color }} />
          </div>
        </div>
      ))}
      <p className="dg-fade text-text-muted text-[10px] text-center mt-2" style={dg(0, 1000)}>Source : Advanced Web Ranking 2024</p>
    </DiagramMotion>
  )
}
