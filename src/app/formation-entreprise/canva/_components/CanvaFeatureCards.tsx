export function CanvaFeatureCards() {
  const features = [
    {
      name: 'Brand Kit',
      tag: 'Identité unifiée',
      bestFor: 'Logo, palette, polices, couleurs primaires et secondaires importés une fois pour toute',
      detail: 'Cohérence garantie sur 100% de vos visuels',
      c: '#00C4CC',
      cbg: 'rgba(0,196,204,0.08)',
      cborder: 'rgba(0,196,204,0.22)',
    },
    {
      name: 'Templates',
      tag: '250 000+ designs',
      bestFor: 'Posts Instagram, LinkedIn, présentations, flyers, brochures, newsletters',
      detail: 'Personnalisés en quelques clics avec votre Brand Kit',
      c: '#FF8C00',
      cbg: 'rgba(255,140,0,0.10)',
      cborder: 'rgba(255,140,0,0.22)',
    },
    {
      name: 'Magic Studio',
      tag: 'IA Canva',
      bestFor: 'Magic Resize, Magic Edit, Magic Write, suppression de fond',
      detail: 'Production 5x plus rapide grâce à l\'IA intégrée',
      c: '#A78BFA',
      cbg: 'rgba(167,139,250,0.10)',
      cborder: 'rgba(167,139,250,0.22)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {features.map((f) => (
        <div
          key={f.name}
          className="p-4 rounded-[12px] flex flex-col gap-3"
          style={{ background: f.cbg, border: `1px solid ${f.cborder}` }}
        >
          <div>
            <p className="text-text font-bold text-sm mb-1.5">{f.name}</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block"
              style={{ background: 'rgba(255,255,255,0.06)', color: f.c, border: `1px solid ${f.cborder}` }}
            >
              {f.tag}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Idéal pour</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: f.c }}>{f.bestFor}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Bénéfice</p>
              <p className="text-text text-[12px] leading-snug">{f.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
