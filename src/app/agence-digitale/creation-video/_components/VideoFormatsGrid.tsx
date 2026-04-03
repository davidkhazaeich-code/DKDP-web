export function VideoFormatsGrid() {
  const formats = [
    {
      type: 'Clip Social / Reel',
      duration: '15 – 90 sec',
      ratio: '9:16 ou 1:1',
      use: 'Réseaux sociaux',
      platforms: ['Instagram', 'TikTok', 'LinkedIn'],
      c: '#A78BFA',
      cbg: 'rgba(124,58,237,0.10)',
      cborder: 'rgba(124,58,237,0.22)',
      tagbg: 'rgba(124,58,237,0.18)',
    },
    {
      type: 'Témoignage / Interview',
      duration: '1 – 3 min',
      ratio: '16:9',
      use: 'Site web & LinkedIn',
      platforms: ['Homepage', 'LinkedIn', 'YouTube'],
      c: '#4ade80',
      cbg: 'rgba(74,222,128,0.08)',
      cborder: 'rgba(74,222,128,0.22)',
      tagbg: 'rgba(74,222,128,0.14)',
    },
    {
      type: 'Brand Film',
      duration: '2 – 5 min',
      ratio: 'Cinématographique',
      use: 'Identité de marque',
      platforms: ['Événements', 'Site', 'Ads'],
      c: '#60a5fa',
      cbg: 'rgba(96,165,250,0.08)',
      cborder: 'rgba(96,165,250,0.22)',
      tagbg: 'rgba(96,165,250,0.14)',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {formats.map((f) => (
        <div
          key={f.type}
          className="p-5 rounded-[14px] flex flex-col gap-4"
          style={{ background: f.cbg, border: `1px solid ${f.cborder}` }}
        >
          {/* Header */}
          <p className="text-[15px] font-bold" style={{ color: f.c }}>{f.type}</p>

          {/* Meta rows */}
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'Durée', value: f.duration },
              { label: 'Format', value: f.ratio },
              { label: 'Usage', value: f.use },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wider text-text-muted">{label}</span>
                <span className="text-[13px] font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Platform tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {f.platforms.map((p) => (
              <span
                key={p}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: f.tagbg, color: f.c }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
