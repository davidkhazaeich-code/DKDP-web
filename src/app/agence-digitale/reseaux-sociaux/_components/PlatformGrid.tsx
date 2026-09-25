// 25/09/2026 : « 4.7% engagement moyen », « +320% portée organique », « Ads CPM
// -40% vs Google », « 8.5% taux de complétion », « 2e moteur de recherche
// mondial » et les tranches d'âge (35-55, 18-35 ans) retirés, aucune source.
// Chaque carte donne désormais les formats travaillés sur la plateforme.
export function PlatformGrid() {
  const platforms = [
    {
      name: 'Instagram',
      color: '#E1306C',
      bg: 'rgba(225,48,108,0.10)',
      border: 'rgba(225,48,108,0.25)',
      useCase: 'Lifestyle, e-commerce, B2C',
      formats: 'Reels, carrousels et Stories',
    },
    {
      name: 'LinkedIn',
      color: '#0A66C2',
      bg: 'rgba(10,102,194,0.10)',
      border: 'rgba(10,102,194,0.25)',
      useCase: 'B2B, recrutement, thought leadership',
      formats: 'Posts experts et carrousels',
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      bg: 'rgba(24,119,242,0.10)',
      border: 'rgba(24,119,242,0.25)',
      useCase: 'Communauté locale, événements',
      formats: 'Groupes, événements et Meta Ads',
    },
    {
      name: 'TikTok',
      color: '#FF0050',
      bg: 'rgba(255,0,80,0.08)',
      border: 'rgba(255,0,80,0.22)',
      useCase: 'Viralité, public jeune, discovery',
      formats: 'Vidéos courtes et tendances',
    },
    {
      name: 'YouTube',
      color: '#FF0000',
      bg: 'rgba(255,0,0,0.08)',
      border: 'rgba(255,0,0,0.22)',
      useCase: 'SEO vidéo, tutoriels, brand film',
      formats: 'Vidéos longues et Shorts',
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
          <p className="text-text text-[12px] font-semibold leading-snug mb-1">{p.useCase}</p>
          <p className="text-text-muted text-[11px]">{p.formats}</p>
        </div>
      ))}
    </div>
  )
}
