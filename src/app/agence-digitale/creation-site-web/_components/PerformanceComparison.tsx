import { green } from '@/lib/tokens'

export function PerformanceComparison({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = lang === 'en'
    ? {
        badSite: 'Unoptimised site', dkdpSite: 'DKDP site',
        lcp: 'LCP (load)', mobile: 'Mobile score', bounce: 'Bounce rate',
        badFooter: 'Clients lost every day', goodFooter: 'Visitors converted',
      }
    : {
        badSite: 'Site non optimisé', dkdpSite: 'Site DKDP',
        lcp: 'LCP (chargement)', mobile: 'Score mobile', bounce: 'Taux de rebond',
        badFooter: 'Clients perdus chaque jour', goodFooter: 'Visiteurs convertis',
      }
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">{t.badSite}</p>
        <div className="space-y-2">
          {[
            { label: t.lcp, val: '6.2s' },
            { label: t.mobile, val: '34/100' },
            { label: t.bounce, val: '78%' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-red-400 text-[11px] font-bold">{m.val}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full mt-4 bg-red-500/40" />
        <p className="text-red-400 text-[10px] text-center mt-2 font-semibold">{t.badFooter}</p>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: green.bg, border: `1px solid ${green.border}` }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: green.color }}>{t.dkdpSite}</p>
        <div className="space-y-2">
          {[
            { label: t.lcp, val: '< 1.2s' },
            { label: t.mobile, val: '97/100' },
            { label: t.bounce, val: '< 35%' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-[11px] font-bold" style={{ color: green.color }}>{m.val}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full mt-4" style={{ background: 'linear-gradient(90deg, #22c55e55, #4ade80)' }} />
        <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: green.color }}>{t.goodFooter}</p>
      </div>
    </div>
  )
}
