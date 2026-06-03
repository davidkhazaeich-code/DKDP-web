export function AutomationDiagram({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const manualSteps = lang === 'en'
    ? ['Email received', 'Manual entry', 'Spreadsheet transfer', 'Verification', 'PDF report']
    : ['Réception email', 'Saisie manuelle', 'Transfert tableur', 'Vérification', 'Rapport PDF']
  const autoSteps = lang === 'en'
    ? ['Auto trigger', 'AI agent analysis', 'CRM updated', 'Auto validation', 'Instant report']
    : ['Déclencheur auto', 'Agent IA analyse', 'CRM mis à jour', 'Validation auto', 'Rapport instantané']
  const beforeLabel = lang === 'en' ? 'Before' : 'Avant'
  const afterLabel = lang === 'en' ? 'After AI' : 'Après IA'
  const perTask = lang === 'en' ? '/ task' : '/ tâche'
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center" style={{ color: 'var(--red-text)' }}>{beforeLabel}</p>
        <div className="flex flex-col gap-2">
          {manualSteps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-[6px]" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)' }}>
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0" style={{ background: 'var(--red-border)', color: 'var(--red-text)' }}>{i + 1}</span>
              <span className="text-text-muted text-[11px]">{s}</span>
            </div>
          ))}
          <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: 'var(--red-text)' }}>3h {perTask}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center" style={{ color: 'var(--green-text)' }}>{afterLabel}</p>
        <div className="flex flex-col gap-2">
          {autoSteps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-[6px]" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)' }}>
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0" style={{ background: 'var(--green-border)', color: 'var(--green-text)' }}>{i + 1}</span>
              <span className="text-text-secondary text-[11px]">{s}</span>
            </div>
          ))}
          <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: 'var(--green-text)' }}>4 min {perTask}</p>
        </div>
      </div>
    </div>
  )
}
