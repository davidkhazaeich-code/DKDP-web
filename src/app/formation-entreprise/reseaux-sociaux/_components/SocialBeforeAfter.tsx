import { CheckCircle2 } from 'lucide-react'

export function SocialBeforeAfter() {
  const before = ['Posts irréguliers et spontanés', 'Visuels incohérents', 'Hashtags aléatoires', 'Aucune stratégie définie', 'Faible engagement']
  const after = ['Calendrier éditorial 30 jours', 'Identité visuelle Canva cohérente', 'Hashtags ciblés par niche', 'Storytelling et call-to-action', "+180% d'engagement moyen"]
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Avant formation</p>
        <div className="space-y-2">
          {before.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.22)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: '#4ade80' }}>Après formation DKDP</p>
        <div className="space-y-2">
          {after.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
