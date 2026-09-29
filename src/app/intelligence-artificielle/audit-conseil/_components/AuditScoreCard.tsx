import { chrome, green } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgCount, dg } from '@/components/motion/dg'

const color = chrome.color
const border = 'rgba(212,212,216,0.15)'
const greenColor = green.color

// 29/09/2026 : le résultat s'écrit comme un rapport qui sort : verdict, opportunités ligne après
// ligne avec leur ROI, puis le score qui défile pendant que sa barre se remplit (kit dg-*,
// docs/claude/22-diagrammes-animes.md). Au repos, rendu identique.
export function AuditScoreCard() {
  const rows = [
    { label: 'Qualification des leads', niveau: 'Elevé', gain: '12h/semaine', roi: 'élevé', niveauColor: greenColor },
    { label: 'Traitement des emails',   niveau: 'Moyen', gain: '5h/semaine',  roi: 'x2.8', niveauColor: '#FBBF24' },
    { label: 'Reporting mensuel',       niveau: 'Elevé', gain: '8h/semaine',  roi: 'x3.5', niveauColor: greenColor },
  ]

  return (
    <DiagramMotion
      className="rounded-[20px] p-6 border w-full"
      style={{ background: 'rgba(212,212,216,0.04)', borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)', '--dg-step': '140ms' } as React.CSSProperties}
    >
      {/* Header */}
      {/* 25/09/2026 : libellé « Exemple » ajouté en tête, les gains et ROI affichés sont illustratifs. */}
      <p className="dg-fade text-text-muted text-[9px] font-bold uppercase tracking-widest mb-1.5" style={dg(0, 150)}>Exemple</p>
      <div className="flex items-center justify-between mb-5">
        <p className="dg-fade text-text font-bold text-[15px]" style={dg(0, 150)}>Résultat de votre audit IA</p>
        <span
          className="dg-pop text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ ...dg(0, 300, { '--dg-origin': 'right center' }), background: 'rgba(74,222,128,0.12)', color: greenColor, border: `1px solid rgba(74,222,128,0.25)` }}
        >
          Potentiel élevé
        </span>
      </div>

      {/* Column headers */}
      <div className="dg-fade grid grid-cols-4 gap-2 mb-2 px-1" style={dg(0, 350)}>
        <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider col-span-2">Opportunité</p>
        <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider text-center">Gain</p>
        <p className="text-text-muted text-[9px] font-bold uppercase tracking-wider text-right">ROI</p>
      </div>

      {/* Rows */}
      <div className="space-y-2 mb-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="dg-slide grid grid-cols-4 gap-2 items-center p-3 rounded-[10px]"
            style={{ ...dg(i, 420), background: 'rgba(212,212,216,0.05)', border: `1px solid ${border}` }}
          >
            <div className="col-span-2">
              <p className="text-text text-[12px] font-semibold leading-tight">{row.label}</p>
              <span
                className="text-[9px] font-bold uppercase tracking-wider"
                style={{ color: row.niveauColor }}
              >
                {row.niveau}
              </span>
            </div>
            <p className="text-[11px] text-center" style={{ color }}>{row.gain}</p>
            <p className="dg-pop text-[12px] font-bold text-right" style={{ ...dg(i, 650, { '--dg-origin': 'right center' }), color: greenColor }}>{row.roi}</p>
          </div>
        ))}
      </div>

      {/* Score bar : le bloc (libellé et rail) arrive à son tour, puis le score défile pendant que la barre se remplit. */}
      <div className="dg-fade mb-3" style={dg(0, 850)}>
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-[11px] font-semibold" style={{ color }}>Score d&apos;automatisabilité</p>
          <p className="text-[12px] font-bold" style={{ color: greenColor }}><DgCount to={78} at={900} dur={1200} />/100</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(212,212,216,0.12)' }}>
          <div
            className="dg-wipe h-full rounded-full"
            style={{ ...dg(0, 900, { '--dg-dur': '1200ms' }), width: '78%', background: `linear-gradient(to right, ${greenColor}, #22c55e)` }}
          />
        </div>
      </div>

      {/* Footer */}
      <p className="dg-fade text-text-muted text-[9px] text-center mt-4" style={dg(0, 1300)}>
        Exemple de résultat d&apos;audit. Votre situation peut différer.
      </p>
    </DiagramMotion>
  )
}
