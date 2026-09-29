import type { CSSProperties } from 'react'
import { Database, Zap, Server, Cpu, ArrowDown } from 'lucide-react'
import { chrome, violet } from '@/lib/tokens'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { DgTip, dg } from '@/components/motion/dg'

const color = chrome.color

// 29/09/2026 : la pile se monte couche après couche, puis une question la traverse de
// l'interface jusqu'à vos données, et repasse toutes les 6 secondes (kit dg-*,
// docs/claude/22-diagrammes-animes.md). Chaque couche a son infobulle (survol, focus, toucher),
// qui reprend ce que la page dit de l'intégration. Au repos, rendu identique.
const LAYER_START = 250
const LAYER_STEP = 220
const RELAY_START = 1350
const RELAY_STEP = 180

export function LLMStackDiagram() {
  const violetColor = violet.color

  const layers = [
    {
      label: 'Votre interface',
      sublabel: 'Site web, app, back-office',
      tip: 'Là où la question est posée : votre site, votre application ou votre back-office.',
      icon: <Server size={15} style={{ color: 'var(--text)' }} />,
      bg: 'var(--surface-default)',
      border: 'var(--surface-border)',
      textColor: 'var(--text)',
    },
    {
      label: 'Couche orchestration DKDP',
      sublabel: 'Prompt engineering, memory, tools',
      tip: 'Consignes, mémoire de la conversation et outils : la couche qui ancre le modèle dans votre contexte métier.',
      icon: <Cpu size={15} style={{ color: violetColor }} />,
      bg: 'rgba(167,139,250,0.12)',
      border: 'rgba(167,139,250,0.30)',
      textColor: violetColor,
    },
    {
      label: 'LLM : GPT-6 Astra / Claude / Mistral',
      sublabel: 'Modèle de langage en production',
      tip: 'Le modèle de langage qui rédige la réponse, à partir des consignes et des données transmises par l\'orchestration.',
      icon: <Zap size={15} style={{ color: color }} />,
      bg: 'rgba(212,212,216,0.08)',
      border: 'rgba(212,212,216,0.22)',
      textColor: color,
    },
    {
      label: 'Vos données',
      sublabel: 'CRM, docs, base de données',
      tip: 'Vos documents internes, votre CRM et vos bases : ce que le modèle consulte pour répondre sur votre métier.',
      icon: <Database size={15} style={{ color: 'var(--text-secondary)' }} />,
      bg: 'var(--surface-default)',
      border: 'var(--surface-border)',
      textColor: 'var(--text-secondary)',
    },
  ]

  return (
    <DiagramMotion
      className="flex flex-col gap-0 w-full"
      style={{ '--dg-loop-start': '4.2s', '--dg-loop': '6s', '--dg-accent': violetColor } as CSSProperties}
    >
      <p className="dg-fade text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ ...dg(0, 150), color }}>
        Architecture d&apos;intégration IA
      </p>
      {layers.map((layer, i) => {
        const at = LAYER_START + i * LAYER_STEP
        const tipId = `llm-stack-tip-${i}`
        return (
          <div key={layer.label}>
            <div
              className="dg-rise dg-light dg-beat dg-tip-host flex items-center gap-3 px-4 py-3 rounded-[10px] cursor-help"
              tabIndex={0}
              aria-describedby={tipId}
              style={{
                ...dg(0, at, { '--dg-light-at': `${RELAY_START + i * RELAY_STEP - at}ms`, '--dg-loop-at': `${i * RELAY_STEP}ms` }),
                background: layer.bg,
                border: `1px solid ${layer.border}`,
              }}
            >
              <div
                className="dg-pop flex h-7 w-7 items-center justify-center rounded-[6px] flex-shrink-0"
                style={{ ...dg(0, at + 80), background: layer.bg, border: `1px solid ${layer.border}` }}
              >
                {layer.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight" style={{ color: layer.textColor }}>
                  {layer.label}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">{layer.sublabel}</p>
              </div>
              <DgTip id={tipId}>{layer.tip}</DgTip>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-1" aria-hidden="true">
                <span className="dg-rise flex" style={dg(0, at + 150, { '--dg-y': '-6px' })}>
                  <ArrowDown size={14} className="text-text-muted opacity-40" />
                </span>
              </div>
            )}
          </div>
        )
      })}
    </DiagramMotion>
  )
}
