import { CheckCircle2, Users, MessageSquare, Database } from 'lucide-react'
import { chrome, violet, green } from '@/lib/tokens'

const color = chrome.color
const bg = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'

export function AgentTypesGrid() {
  const types = [
    {
      Icon: Users,
      label: 'Agent de qualification',
      accent: violet.color,
      accentBg: 'rgba(167,139,250,0.10)',
      accentBorder: 'rgba(167,139,250,0.22)',
      lines: [
        'Reçoit et analyse chaque lead entrant',
        'Pose les bonnes questions, classe dans le CRM',
        'Répond instantanément, 24h/24',
      ],
      tag: 'En production en 2 semaines',
    },
    {
      Icon: MessageSquare,
      label: 'Agent de support client',
      accent: green.color,
      accentBg: 'rgba(74,222,128,0.08)',
      accentBorder: 'rgba(74,222,128,0.20)',
      lines: [
        'Répond aux questions fréquentes sans délai',
        'Disponible 24h/24, 7j/7, sans surcharge',
        'Escalade les cas complexes vers un humain',
      ],
      tag: 'En production en 2 semaines',
    },
    {
      Icon: Database,
      label: "Agent d'analyse de données",
      accent: color,
      accentBg: bg,
      accentBorder: border,
      lines: [
        'Lit vos fichiers CSV, Excel ou base de données',
        'Produit des synthèses et rapports automatiques',
        'Alerte sur les anomalies ou tendances critiques',
      ],
      tag: 'En production en 2 semaines',
    },
  ]
  return (
    <div className="flex flex-col gap-4">
      {types.map((t) => (
        <div
          key={t.label}
          className="rounded-[14px] border p-5"
          style={{ background: t.accentBg, borderColor: t.accentBorder }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
              style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}` }}
            >
              <t.Icon size={16} style={{ color: t.accent }} />
            </div>
            <p className="text-white font-semibold text-sm">{t.label}</p>
          </div>
          <div className="flex flex-col gap-1.5 mb-3">
            {t.lines.map((line) => (
              <div key={line} className="flex items-start gap-2">
                <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: t.accent }} />
                <span className="text-text-secondary text-xs leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: t.accentBg, color: t.accent, border: `1px solid ${t.accentBorder}` }}
          >
            {t.tag}
          </span>
        </div>
      ))}
    </div>
  )
}
