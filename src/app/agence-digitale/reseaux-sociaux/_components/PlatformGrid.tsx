export function PlatformGrid() {
  const platforms = [
    {
      name: 'Instagram',
      color: '#E1306C',
      bg: 'rgba(225,48,108,0.10)',
      border: 'rgba(225,48,108,0.25)',
      useCase: 'Lifestyle, e-commerce, B2C',
      metric: '4.7% engagement moyen',
    },
    {
      name: 'LinkedIn',
      color: '#0A66C2',
      bg: 'rgba(10,102,194,0.10)',
      border: 'rgba(10,102,194,0.25)',
      useCase: 'B2B, recrutement, thought leadership',
      metric: '+320% portée organique',
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      bg: 'rgba(24,119,242,0.10)',
      border: 'rgba(24,119,242,0.25)',
      useCase: 'Communauté locale, 35-55 ans',
      metric: 'Ads CPM -40% vs Google',
    },
    {
      name: 'TikTok',
      color: '#FF0050',
      bg: 'rgba(255,0,80,0.08)',
      border: 'rgba(255,0,80,0.22)',
      useCase: 'Viralité, 18-35 ans, discovery',
      metric: '8.5% taux de complétion',
    },
    {
      name: 'YouTube',
      color: '#FF0000',
      bg: 'rgba(255,0,0,0.08)',
      border: 'rgba(255,0,0,0.22)',
      useCase: 'SEO vidéo, tutoriels, brand film',
      metric: '2e moteur de recherche mondial',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {platforms.map((p) => (
        <div
          key={p.name}
          className="p-4 rounded-[12px]"
          style={{ background: p.bg, border: `1px solid ${p.border}` }}
        >
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: p.color }}>
            {p.name}
          </p>
          <p className="text-white text-[12px] font-semibold leading-snug mb-1">{p.useCase}</p>
          <p className="text-text-muted text-[11px]">{p.metric}</p>
        </div>
      ))}
    </div>
  )
}
