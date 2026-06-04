import { CheckCircle2 } from 'lucide-react'

export function SocialBeforeAfter() {
  const before = ['Irregular and spontaneous posts', 'Inconsistent visuals', 'Random hashtags', 'No defined strategy', 'Low engagement']
  const after = ['30-day content calendar', 'Consistent Canva visual identity', 'Targeted hashtags by niche', 'Storytelling and call-to-action', '+180% average engagement']
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--red-text)' }}>Before training</p>
        <div className="space-y-2">
          {before.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--red-text)' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--green-text)' }}>After DKDP training</p>
        <div className="space-y-2">
          {after.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--green-text)' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
