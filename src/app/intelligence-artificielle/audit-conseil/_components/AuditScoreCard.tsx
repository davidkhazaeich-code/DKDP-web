import { chrome, green } from '@/lib/tokens'

const color = chrome.color
const border = 'rgba(212,212,216,0.15)'
const greenColor = green.color

export function AuditScoreCard() {
  const rows = [
    { label: 'Qualification des leads', niveau: 'Elevé', gain: '12h/semaine', roi: 'x4.2', niveauColor: greenColor },
    { label: 'Traitement des emails',   niveau: 'Moyen', gain: '5h/semaine',  roi: 'x2.8', niveauColor: '#FBBF24' },
    { label: 'Reporting mensuel',       niveau: 'Elevé', gain: '8h/semaine',  roi: 'x3.5', niveauColor: greenColor },
  ]

  return (
    <div
      className="rounded-[20px] p-6 border w-full"
      style={{ background: 'rgba(212,212,216,0.04)', borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-white font-bold text-[15px]">Résultat de votre audit IA</p>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(74,222,128,0.12)', color: greenColor, border: `1px solid rgba(74,222,128,0.25)` }}
        >
          Potentiel élevé
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 gap-2 mb-2 px-1">
        <p className="text-[9px] font-bold uppercase tracking-wider col-span-2" style={{ color: `${color}60` }}>Opportunité</p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-center" style={{ color: `${color}60` }}>Gain</p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-right" style={{ color: `${color}60` }}>ROI</p>
      </div>

      {/* Rows */}
      <div className="space-y-2 mb-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 items-center p-3 rounded-[10px]"
            style={{ background: 'rgba(212,212,216,0.05)', border: `1px solid ${border}` }}
          >
            <div className="col-span-2">
              <p className="text-white text-[12px] font-semibold leading-tight">{row.label}</p>
              <span
                className="text-[9px] font-bold uppercase tracking-wider"
                style={{ color: row.niveauColor }}
              >
                {row.niveau}
              </span>
            </div>
            <p className="text-[11px] text-center" style={{ color }}>{row.gain}</p>
            <p className="text-[12px] font-bold text-right" style={{ color: greenColor }}>{row.roi}</p>
          </div>
        ))}
      </div>

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-[11px] font-semibold" style={{ color }}>Score d&apos;automatisabilité</p>
          <p className="text-[12px] font-bold" style={{ color: greenColor }}>78/100</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(212,212,216,0.12)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: '78%', background: `linear-gradient(to right, ${greenColor}, #22c55e)` }}
          />
        </div>
      </div>

      {/* Footer */}
      <p className="text-[9px] text-center mt-4" style={{ color: `${color}40` }}>
        Exemple de résultat d&apos;audit. Votre situation peut différer.
      </p>
    </div>
  )
}
