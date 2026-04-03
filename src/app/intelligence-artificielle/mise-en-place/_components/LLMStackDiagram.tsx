import { Database, Zap, Server, Cpu, ArrowDown } from 'lucide-react'
import { chrome, violet } from '@/lib/tokens'

const color = chrome.color

export function LLMStackDiagram() {
  const violetColor = violet.color

  const layers = [
    {
      label: 'Votre interface',
      sublabel: 'Site web, app, back-office',
      icon: <Server size={15} style={{ color: '#ffffff' }} />,
      bg: 'rgba(255,255,255,0.07)',
      border: 'rgba(255,255,255,0.18)',
      textColor: '#ffffff',
    },
    {
      label: 'Couche orchestration DKDP',
      sublabel: 'Prompt engineering, memory, tools',
      icon: <Cpu size={15} style={{ color: violetColor }} />,
      bg: 'rgba(167,139,250,0.12)',
      border: 'rgba(167,139,250,0.30)',
      textColor: violetColor,
    },
    {
      label: 'LLM : ChatGPT / Claude / Mistral',
      sublabel: 'Modele de langage en production',
      icon: <Zap size={15} style={{ color: color }} />,
      bg: 'rgba(212,212,216,0.08)',
      border: 'rgba(212,212,216,0.22)',
      textColor: color,
    },
    {
      label: 'Vos donnees',
      sublabel: 'CRM, docs, base de donnees',
      icon: <Database size={15} style={{ color: '#6b7280' }} />,
      bg: 'rgba(107,114,128,0.10)',
      border: 'rgba(107,114,128,0.22)',
      textColor: '#9ca3af',
    },
  ]

  return (
    <div className="flex flex-col gap-0 w-full">
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
        Architecture d&apos;integration IA
      </p>
      {layers.map((layer, i) => (
        <div key={layer.label}>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[10px]"
            style={{ background: layer.bg, border: `1px solid ${layer.border}` }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-[6px] flex-shrink-0"
              style={{ background: layer.bg, border: `1px solid ${layer.border}` }}
            >
              {layer.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight" style={{ color: layer.textColor }}>
                {layer.label}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">{layer.sublabel}</p>
            </div>
          </div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowDown size={14} className="text-text-muted opacity-40" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
