import type { CSSProperties } from 'react'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'

// 29/09/2026 : même récit animé que AutomationDiagram (kit dg-*, docs/claude/22-diagrammes-animes.md) :
// à gauche chaque étape se tape à la main, à droite tout arrive d'un coup et le flux parcourt
// les étapes, puis repasse toutes les 5 secondes. Au repos, rendu identique.
const MANUAL_STEP = 300 // ms entre deux étapes saisies à la main
const TYPE_SPEED = 16 // ms par caractère
const AUTO_START = 350
const RELAY_START = 950 // premier éclat du flux automatique
const RELAY_STEP = 110

export function WorkflowDiagram() {
  const beforeSteps = [
    'Email reçu',
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
  // 25/09/2026 : « 3h / tâche » contre « 4 min / tâche » retirés, aucune source (même correction
  // que src/app/intelligence-artificielle/_components/AutomationDiagram.tsx).
  const beforeNote = 'Ressaisie à chaque étape'
  const afterNote = 'Sans ressaisie'
  const manualEnd = 250 + beforeSteps.length * MANUAL_STEP
  return (
    <DiagramMotion
      className="grid grid-cols-2 gap-4 w-full"
      style={{ '--dg-loop-start': '4s', '--dg-loop': '5s', '--dg-accent': 'var(--green-text)' } as CSSProperties}
    >
      <div>
        <p className="dg-fade text-[10px] font-bold uppercase tracking-widest mb-3 text-center" style={{ ...dg(0, 150), color: 'var(--red-text)' }}>
          Avant
        </p>
        <div className="flex flex-col gap-2">
          {beforeSteps.map((s, i) => (
            <div
              key={i}
              className="dg-rise flex items-center gap-2 p-2 rounded-[6px]"
              style={{ ...dg(0, 250 + i * MANUAL_STEP), background: 'var(--red-bg)', border: '1px solid var(--red-border)' }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: 'var(--red-border)', color: 'var(--red-text)' }}
              >
                {i + 1}
              </span>
              <span className="dg-type text-text-muted text-[11px]" style={dg(0, 300 + i * MANUAL_STEP, { '--dg-steps': s.length, '--dg-dur': `${s.length * TYPE_SPEED}ms` })}>{s}</span>
            </div>
          ))}
          <p className="dg-pop text-[10px] text-center mt-2 font-semibold" style={{ ...dg(0, manualEnd + 150, { '--dg-origin': 'center top' }), color: 'var(--red-text)' }}>{beforeNote}</p>
        </div>
      </div>
      <div>
        <p
          className="dg-fade text-[10px] font-bold uppercase tracking-widest mb-3 text-center"
          style={{ ...dg(0, 150), color: 'var(--green-text)' }}
        >
          Après IA
        </p>
        <div className="flex flex-col gap-2">
          {afterSteps.map((s, i) => (
            <div
              key={i}
              className="dg-rise dg-light dg-beat relative flex items-center gap-2 p-2 rounded-[6px]"
              style={{
                ...dg(i, AUTO_START, { '--dg-step': '60ms', '--dg-light-at': `${RELAY_START + i * RELAY_STEP - (AUTO_START + i * 60)}ms`, '--dg-loop-at': `${i * RELAY_STEP}ms` }),
                background: 'var(--green-bg)',
                border: '1px solid var(--green-border)',
              }}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: 'var(--green-border)', color: 'var(--green-text)' }}
              >
                {i + 1}
              </span>
              <span className="text-text-secondary text-[11px]">{s}</span>
            </div>
          ))}
          <p
            className="dg-pop text-[10px] text-center mt-2 font-semibold"
            style={{ ...dg(0, RELAY_START + afterSteps.length * RELAY_STEP + 100, { '--dg-origin': 'center top' }), color: 'var(--green-text)' }}
          >
            {afterNote}
          </p>
        </div>
      </div>
    </DiagramMotion>
  )
}
