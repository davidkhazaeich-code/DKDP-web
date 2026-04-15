export function TechStack() {
  const CATEGORIES = [
    {
      label: 'Mobile',
      techs: [
        { name: 'React Native', c: '#61DBFB', bg: 'rgba(97,219,251,0.08)', b: 'rgba(97,219,251,0.25)' },
        { name: 'Swift (iOS)', c: '#FA7343', bg: 'rgba(250,115,67,0.08)', b: 'rgba(250,115,67,0.25)' },
        { name: 'Kotlin (Android)', c: '#A97BFF', bg: 'rgba(169,123,255,0.08)', b: 'rgba(169,123,255,0.25)' },
        { name: 'Expo', c: '#ffffff', bg: 'rgba(255,255,255,0.05)', b: 'rgba(255,255,255,0.12)' },
      ],
    },
    {
      label: 'Web & Backend',
      techs: [
        { name: 'Next.js', c: '#ffffff', bg: 'rgba(255,255,255,0.05)', b: 'rgba(255,255,255,0.12)' },
        { name: 'Node.js', c: '#6CC24A', bg: 'rgba(108,194,74,0.08)', b: 'rgba(108,194,74,0.25)' },
        { name: 'TypeScript', c: '#3178C6', bg: 'rgba(49,120,198,0.10)', b: 'rgba(49,120,198,0.28)' },
        { name: 'Tailwind CSS', c: '#38BDF8', bg: 'rgba(56,189,248,0.08)', b: 'rgba(56,189,248,0.25)' },
      ],
    },
    {
      label: 'Base de données & Auth',
      techs: [
        { name: 'PostgreSQL', c: '#336791', bg: 'rgba(51,103,145,0.10)', b: 'rgba(51,103,145,0.28)' },
        { name: 'Supabase', c: '#3ECF8E', bg: 'rgba(62,207,142,0.08)', b: 'rgba(62,207,142,0.25)' },
        { name: 'Prisma', c: '#5A67D8', bg: 'rgba(90,103,216,0.10)', b: 'rgba(90,103,216,0.28)' },
        { name: 'Firebase', c: '#FFCA28', bg: 'rgba(255,202,40,0.07)', b: 'rgba(255,202,40,0.22)' },
      ],
    },
    {
      label: 'Design & Déploiement',
      techs: [
        { name: 'Figma', c: '#F24E1E', bg: 'rgba(242,78,30,0.08)', b: 'rgba(242,78,30,0.28)' },
        { name: 'Vercel', c: '#D4D4D8', bg: 'rgba(212,212,216,0.06)', b: 'rgba(212,212,216,0.18)' },
        { name: 'AWS', c: '#FF9900', bg: 'rgba(255,153,0,0.08)', b: 'rgba(255,153,0,0.22)' },
        { name: 'App Store / Play', c: '#A78BFA', bg: 'rgba(124,58,237,0.08)', b: 'rgba(124,58,237,0.22)' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">{cat.label}</p>
          <div className="flex flex-wrap gap-2">
            {cat.techs.map((t) => (
              <span
                key={t.name}
                className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold"
                style={{ background: t.bg, border: `1px solid ${t.b}`, color: t.c }}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
