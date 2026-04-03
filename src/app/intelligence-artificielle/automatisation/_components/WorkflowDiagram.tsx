import { chrome, green } from '@/lib/tokens'

const color = chrome.color
const greenColor = green.color

export function WorkflowDiagram() {
  const beforeSteps = [
    'Email recu',
    'Copier-coller les données',
    'Saisie CRM manuelle',
    'Relance manuelle',
    'Rapport Excel',
  ]
  const afterSteps = [
    'Trigger automatique',
    'Données extraites par IA',
    'CRM mis à jour',
    'Relance planifiée',
    'Rapport généré',
  ]
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3 text-center">
          Avant
        </p>
        <div className="flex flex-col gap-2">
          {beforeSteps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-[6px]"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)' }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.20)', color: '#f87171' }}
              >
                {i + 1}
              </span>
              <span className="text-text-muted text-[11px]">{s}</span>
            </div>
          ))}
          <p className="text-red-400 text-[10px] text-center mt-2 font-semibold">3h / tâche</p>
        </div>
      </div>
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center"
          style={{ color: greenColor }}
        >
          Après IA
        </p>
        <div className="flex flex-col gap-2">
          {afterSteps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-[6px]"
              style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.20)' }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: 'rgba(74,222,128,0.20)', color: greenColor }}
              >
                {i + 1}
              </span>
              <span className="text-[11px]" style={{ color }}>{s}</span>
            </div>
          ))}
          <p
            className="text-[10px] text-center mt-2 font-semibold"
            style={{ color: greenColor }}
          >
            4 min / tâche
          </p>
        </div>
      </div>
    </div>
  )
}
