import { violet } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgCount, dg } from '@/components/motion/dg'

// 29/09/2026 : pilier après pilier, la barre de départ se remplit, puis la barre d'objectif se
// dévoile pendant que sa valeur défile, et l'écart en points apparaît en dernier (kit dg-*,
// docs/claude/22-diagrammes-animes.md). Au repos, rendu identique.
export function MarketingAuditScore() {
  const pillars = [
    { label: 'Acquisition', before: 25, after: 78 },
    { label: 'Conversion', before: 20, after: 72 },
    { label: 'Fidélisation', before: 30, after: 85 },
    { label: 'Branding', before: 35, after: 80 },
    { label: 'Analytics', before: 15, after: 90 },
  ]
  return (
    <DiagramMotion className="space-y-4" style={{ '--dg-step': '120ms' } as React.CSSProperties}>
      {/* 25/09/2026 : « Score moyen PME sans accompagnement » et « Objectif 6 mois DKDP » retirés,
          aucune source. Les valeurs ci-dessous illustrent un tableau de bord, elles ne mesurent rien. */}
      <div className="dg-fade flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2" style={dg(0, 150)}>
        <span style={{ color: 'rgba(239,68,68,0.85)' }}>Score de départ</span>
        <span style={{ color: violet.color }}>Objectif fixé ensemble</span>
      </div>
      {pillars.map((p, i) => (
        <div key={p.label} className="space-y-1.5">
          <div className="dg-rise flex justify-between items-center" style={dg(i, 200)}>
            <span className="text-text text-xs font-semibold">{p.label}</span>
            <span className="dg-pop text-[11px] font-bold" style={{ ...dg(i, 900, { '--dg-origin': 'right center' }), color: violet.color }}>+{p.after - p.before}pts</span>
          </div>
          <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div
              className="dg-grow-x absolute left-0 top-0 h-full rounded-full"
              style={{ ...dg(i, 300, { '--dg-dur': '700ms' }), width: `${p.before}%`, background: 'rgba(239,68,68,0.55)' }}
            />
          </div>
          <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            {/* Dégradé : balayage, un étirement le déformerait. */}
            <div
              className="dg-wipe absolute left-0 top-0 h-full rounded-full"
              style={{ ...dg(i, 500, { '--dg-dur': '1000ms' }), width: `${p.after}%`, background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-text-muted">
            <span className="dg-fade" style={dg(i, 300)}>{p.before}%</span>
            <span className="dg-fade" style={{ ...dg(i, 500), color: violet.color }}><DgCount to={p.after} i={i} at={500} dur={1000} />%</span>
          </div>
        </div>
      ))}
    </DiagramMotion>
  )
}
