export function VideoToolCards() {
  const tools = [
    {
      name: 'CapCut',
      level: 'Débutant – Intermédiaire',
      price: 'Gratuit',
      bestFor: 'Reels, TikTok, Stories',
      platforms: 'Mobile + Desktop',
      c: '#FF0050',
      cbg: 'rgba(255,0,80,0.08)',
      cborder: 'rgba(255,0,80,0.22)',
    },
    {
      name: 'DaVinci Resolve',
      level: 'Intermédiaire – Avancé',
      price: 'Gratuit',
      bestFor: 'Montage pro, étalonnage',
      platforms: 'Desktop',
      c: '#4ade80',
      cbg: 'rgba(74,222,128,0.08)',
      cborder: 'rgba(74,222,128,0.22)',
    },
    {
      name: 'Adobe Premiere',
      level: 'Professionnel',
      price: 'Abonnement Adobe',
      bestFor: 'Projets complexes',
      platforms: 'Desktop',
      c: '#9999FF',
      cbg: 'rgba(153,153,255,0.08)',
      cborder: 'rgba(153,153,255,0.22)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {tools.map((t) => (
        <div key={t.name} className="p-4 rounded-[12px] flex flex-col gap-3" style={{ background: t.cbg, border: `1px solid ${t.cborder}` }}>
          <div>
            <p className="text-white font-bold text-sm mb-1.5">{t.name}</p>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.06)', color: t.c, border: `1px solid ${t.cborder}` }}>
              {t.level}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Prix</p>
              <p className="text-white text-[12px] font-semibold">{t.price}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Idéal pour</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: t.c }}>{t.bestFor}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Plateforme</p>
              <p className="text-white text-[12px]">{t.platforms}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
