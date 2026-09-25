// 25/09/2026 : graphique « temps gagné par poste et par jour » et « 100 % opérationnels
// dès J+1 » retirés, aucune source. Composant importé nulle part à cette date.
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
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
        }}
      >
        {[
          { v: '3 h ou 6 h', l: 'demi-journée ou journée' },
          { v: '5,0/5', l: 'note Google, 22 avis' },
          { v: '1 à 10', l: 'personnes par session' },
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
