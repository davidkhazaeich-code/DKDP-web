export function FigmaFeatureCards() {
  const features = [
    {
      name: 'Auto Layout',
      tag: 'Responsive sans code',
      bestFor: 'Frames qui s\'adaptent automatiquement au contenu et aux tailles d\'écran',
      detail: 'Des maquettes mobile, tablet et desktop en parallèle',
      c: '#F24E1E',
      cbg: 'rgba(242,78,30,0.08)',
      cborder: 'rgba(242,78,30,0.22)',
    },
    {
      name: 'Composants',
      tag: 'Design system',
      bestFor: 'Boutons, cards, formulaires réutilisés sur toutes les pages avec variants',
      detail: 'Une modification, propagée partout',
      c: '#A78BFA',
      cbg: 'rgba(167,139,250,0.10)',
      cborder: 'rgba(167,139,250,0.22)',
    },
    {
      name: 'Prototypes',
      tag: 'Flux interactifs',
      bestFor: 'Cliquez d\'écran en écran pour valider l\'expérience avant le développement',
      detail: 'Démos client, tests utilisateurs, validation produit',
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
            <p className="text-white font-bold text-sm mb-1.5">{f.name}</p>
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
              <p className="text-white text-[12px] leading-snug">{f.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
