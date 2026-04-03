export function DesignToolCards() {
  const tools = [
    {
      name: 'Canva',
      level: 'Débutant',
      price: 'Gratuit / Pro',
      bestFor: 'Posts, présentations, flyers',
      curve: '1h pour démarrer',
      c: '#00C4CC',
      cbg: 'rgba(0,196,204,0.08)',
      cborder: 'rgba(0,196,204,0.22)',
    },
    {
      name: 'Figma',
      level: 'Intermédiaire',
      price: 'Gratuit / Pro',
      bestFor: 'Maquettes, UI, wireframes',
      curve: 'Quelques jours',
      c: '#F24E1E',
      cbg: 'rgba(242,78,30,0.08)',
      cborder: 'rgba(242,78,30,0.22)',
    },
    {
      name: 'Adobe Express',
      level: 'Intermédiaire',
      price: 'Abonnement Adobe',
      bestFor: 'Identité de marque, print',
      curve: 'Quelques semaines',
      c: '#FF0000',
      cbg: 'rgba(255,0,0,0.08)',
      cborder: 'rgba(255,0,0,0.22)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {tools.map((t) => (
        <div
          key={t.name}
          className="p-4 rounded-[12px] flex flex-col gap-3"
          style={{ background: t.cbg, border: `1px solid ${t.cborder}` }}
        >
          <div>
            <p className="text-white font-bold text-sm mb-1.5">{t.name}</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block"
              style={{ background: 'rgba(255,255,255,0.06)', color: t.c, border: `1px solid ${t.cborder}` }}
            >
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
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">Apprentissage</p>
              <p className="text-white text-[12px]">{t.curve}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
