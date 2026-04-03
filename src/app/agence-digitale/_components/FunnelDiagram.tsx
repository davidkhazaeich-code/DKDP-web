export function FunnelDiagram() {
  const steps = [
    { label: 'Trafic SEO & Ads', sub: 'Visibilité sur Google', w: '100%', color: '#A78BFA' },
    { label: 'Visiteurs qualifiés', sub: 'Site rapide et convaincant', w: '78%', color: '#9B7CF0' },
    { label: 'Leads entrants', sub: 'Formulaires et CTAs optimisés', w: '54%', color: '#8B65E3' },
    { label: 'Clients signés', sub: 'Pipeline commercial alimenté', w: '34%', color: '#7C3AED' },
  ]
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-white text-xs font-semibold">{s.label}</span>
            <span className="text-text-muted text-[10px]">{s.sub}</span>
          </div>
          <div className="h-9 rounded-[6px] flex items-center px-3" style={{ width: s.w, background: `${s.color}22`, border: `1px solid ${s.color}55` }}>
            <span className="text-[11px] font-bold" style={{ color: s.color }}>
              {['01', '02', '03', '04'][i]}
            </span>
          </div>
        </div>
      ))}
      <p className="text-text-muted text-[11px] text-center mt-3">Entonnoir de conversion digital DKDP</p>
    </div>
  )
}
