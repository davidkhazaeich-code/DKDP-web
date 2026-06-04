export function FigmaFeatureCards() {
  const features = [
    {
      name: 'Auto Layout',
      tag: 'Responsive without code',
      bestFor: 'Frames that adapt automatically to content and screen sizes',
      detail: 'Mobile, tablet and desktop mockups in parallel',
      c: '#F24E1E',
      cbg: 'rgba(242,78,30,0.08)',
      cborder: 'rgba(242,78,30,0.22)',
    },
    {
      name: 'Components',
      tag: 'Design system',
      bestFor: 'Buttons, cards and forms reused across every page with variants',
      detail: 'One change, propagated everywhere',
      c: '#A78BFA',
      cbg: 'rgba(167,139,250,0.10)',
      cborder: 'rgba(167,139,250,0.22)',
    },
    {
      name: 'Prototypes',
      tag: 'Interactive flows',
      bestFor: 'Click from screen to screen to validate the experience before development',
      detail: 'Client demos, user testing, product validation',
      c: '#0ACF83',
      cbg: 'rgba(10,207,131,0.08)',
      cborder: 'rgba(10,207,131,0.22)',
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
              style={{ background: 'var(--bg-card)', color: f.c, border: `1px solid ${f.cborder}` }}
            >
              {f.tag}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Ideal for</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: f.c }}>{f.bestFor}</p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Benefit</p>
              <p className="text-text text-[12px] leading-snug">{f.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
