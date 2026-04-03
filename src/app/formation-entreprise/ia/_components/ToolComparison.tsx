export function ToolComparison() {
  const tools = [
    {
      name: 'ChatGPT',
      maker: 'OpenAI',
      strengths: ['Polyvalent et créatif', "Génération d'images", 'Plugins et GPTs', 'Navigation web'],
      color: '#10b981',
      cardBg: 'rgba(16,185,129,0.08)',
      cardBorder: 'rgba(16,185,129,0.25)',
    },
    {
      name: 'Claude',
      maker: 'Anthropic',
      strengths: ['Documents très longs', 'Données sensibles', 'Rédaction précise', 'Analyse de PDF'],
      color: '#A78BFA',
      cardBg: 'rgba(124,58,237,0.08)',
      cardBorder: 'rgba(124,58,237,0.25)',
    },
    {
      name: 'Copilot',
      maker: 'Microsoft',
      strengths: ['Intégré Office 365', 'Word et PowerPoint', 'Excel et Outlook', 'Teams et OneNote'],
      color: '#3b82f6',
      cardBg: 'rgba(59,130,246,0.08)',
      cardBorder: 'rgba(59,130,246,0.25)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {tools.map((t) => (
        <div
          key={t.name}
          className="flex flex-col gap-3 p-4 rounded-[12px]"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div>
            <p className="text-white font-bold text-sm">{t.name}</p>
            <p className="text-[10px] font-semibold" style={{ color: t.color }}>{t.maker}</p>
          </div>
          <div className="space-y-1.5">
            {t.strengths.map((s) => (
              <div key={s} className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.color }} />
                <span className="text-text-muted text-[11px] leading-snug">{s}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
