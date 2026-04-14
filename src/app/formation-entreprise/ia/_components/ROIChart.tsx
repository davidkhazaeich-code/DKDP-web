const ROLES = [
  { role: 'Assistante direction', hours: 3.0, pct: 100 },
  { role: 'Manager', hours: 2.0, pct: 67 },
  { role: 'Communication', hours: 2.0, pct: 67 },
  { role: 'Équipe RH', hours: 2.0, pct: 67 },
  { role: 'Comptable', hours: 1.5, pct: 50 },
  { role: 'Commercial', hours: 1.5, pct: 50 },
]

export function ROIChart() {
  return (
    <div
      style={{
        margin: '2.5rem 0',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(255,140,0,0.18)',
        background: 'rgba(255,140,0,0.04)',
      }}
    >
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#FF8C00',
          marginBottom: '1.25rem',
        }}
      >
        Temps gagné par poste · par jour · après 1 jour de formation IA
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {ROLES.map(({ role, hours, pct }) => (
          <div key={role} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 52px', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#9CA3AF', textAlign: 'right', whiteSpace: 'nowrap' }}>
              {role}
            </span>
            <div
              style={{
                height: '20px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #FF8C00, #FFB347)',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF8C00', textAlign: 'left' }}>
              {hours}h/j
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,140,0,0.15)',
        }}
      >
        {[
          { v: '91%', l: 'opérationnels dès J+1' },
          { v: '4.9/5', l: 'satisfaction moyenne' },
          { v: '500+', l: 'participants formés' },
        ].map(({ v, l }) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF8C00' }}>{v}</div>
            <div style={{ fontSize: '0.65rem', color: '#71717a', marginTop: '2px' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
