export function ExcelSkillsComparison() {
  const before = [
    'SOMME basique uniquement',
    'Copier-coller manuel',
    'Mise en forme manuelle',
    'Filtres simples',
    'Tableaux statiques',
  ]
  const after = [
    'TCD et tableaux dynamiques',
    'RECHERCHEV, INDEX/EQUIV',
    'Mise en forme conditionnelle',
    'Graphiques dynamiques',
    'Power Query et macros',
    'Formules imbriquées',
  ]
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div
        className="flex flex-col gap-3 p-4 rounded-[12px]"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#f87171' }}>Avant formation</p>
        <div className="space-y-2">
          {before.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#f87171' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-col gap-3 p-4 rounded-[12px]"
        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>Après formation DKDP</p>
        <div className="space-y-2">
          {after.map((item) => (
            <div key={item} className="flex items-start gap-1.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#4ade80' }} />
              <span className="text-text-muted text-[11px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
