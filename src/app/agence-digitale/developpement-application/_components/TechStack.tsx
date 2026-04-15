const CATEGORIES = [
  {
    label: 'Mobile',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    accent: '#A78BFA',
    accentBg: 'rgba(124,58,237,0.10)',
    accentBorder: 'rgba(124,58,237,0.25)',
    techs: [
      { name: 'React Native', dot: '#61DBFB' },
      { name: 'Swift (iOS)', dot: '#FA7343' },
      { name: 'Kotlin (Android)', dot: '#A97BFF' },
      { name: 'Expo', dot: '#ffffff' },
    ],
  },
  {
    label: 'Web & Backend',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    accent: '#60a5fa',
    accentBg: 'rgba(96,165,250,0.10)',
    accentBorder: 'rgba(96,165,250,0.25)',
    techs: [
      { name: 'Next.js', dot: '#ffffff' },
      { name: 'Node.js', dot: '#6CC24A' },
      { name: 'TypeScript', dot: '#3178C6' },
      { name: 'Tailwind CSS', dot: '#38BDF8' },
    ],
  },
  {
    label: 'Base de données & Auth',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.10)',
    accentBorder: 'rgba(74,222,128,0.25)',
    techs: [
      { name: 'PostgreSQL', dot: '#336791' },
      { name: 'Supabase', dot: '#3ECF8E' },
      { name: 'Prisma', dot: '#5A67D8' },
      { name: 'Firebase', dot: '#FFCA28' },
    ],
  },
  {
    label: 'Design & Déploiement',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.10)',
    accentBorder: 'rgba(251,191,36,0.25)',
    techs: [
      { name: 'Figma', dot: '#F24E1E' },
      { name: 'Vercel', dot: '#D4D4D8' },
      { name: 'AWS', dot: '#FF9900' },
      { name: 'App Store / Play', dot: '#A78BFA' },
    ],
  },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-[16px] overflow-hidden">
      {CATEGORIES.map((cat) => (
        <div
          key={cat.label}
          className="bg-[#0D0D0D] p-6 flex flex-col gap-5"
        >
          {/* Category header */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0"
              style={{ background: cat.accentBg, border: `1px solid ${cat.accentBorder}`, color: cat.accent }}
            >
              {cat.icon}
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: cat.accent }}
            >
              {cat.label}
            </span>
          </div>

          {/* Tech list */}
          <div className="grid grid-cols-2 gap-2">
            {cat.techs.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-150"
              >
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: t.dot }}
                />
                <span className="text-[13px] font-medium text-text-secondary truncate">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
