import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DKDP · Service Digital à Genève · IA · Formation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const LOGO_SRC = 'data:image/png;base64,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'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090B',
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Violet blob bottom-left */}
        <div style={{ position: 'absolute', bottom: -160, left: -160, width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)' }} />

        {/* Orange blob top-right */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.32) 0%, transparent 70%)' }} />

        {/* Chrome blob center */}
        <div style={{ position: 'absolute', top: 180, right: 200, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,212,216,0.12) 0%, transparent 70%)' }} />

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', flex: 1, position: 'relative', zIndex: 10 }}>

          {/* Logo */}
          <img src={LOGO_SRC} width="260" height="51" style={{ objectFit: 'contain', objectPosition: 'left center' }} />

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.40)', borderRadius: '100px', padding: '6px 18px', width: 'fit-content', marginBottom: '28px' }}>
              <span style={{ color: '#A78BFA', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Agence Digitale · Genève</span>
            </div>

            {/* Headline */}
            <div style={{ fontSize: '68px', fontWeight: 800, color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '18px' }}>
              Sites web, IA<br />& Formation
            </div>

            {/* Subtitle */}
            <div style={{ fontSize: '22px', fontWeight: 400, color: '#9CA3AF', lineHeight: 1.4, marginBottom: '40px' }}>
              Pour les PME de Suisse romande
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', borderRadius: '100px', padding: '8px 20px' }}>
                <span style={{ color: '#A78BFA', fontSize: '15px', fontWeight: 600 }}>Site web & SEO</span>
              </div>
              <div style={{ display: 'flex', background: 'rgba(212,212,216,0.08)', border: '1px solid rgba(212,212,216,0.22)', borderRadius: '100px', padding: '8px 20px' }}>
                <span style={{ color: '#D4D4D8', fontSize: '15px', fontWeight: 600 }}>Intelligence Artificielle</span>
              </div>
              <div style={{ display: 'flex', background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.30)', borderRadius: '100px', padding: '8px 20px' }}>
                <span style={{ color: '#FF8C00', fontSize: '15px', fontWeight: 600 }}>Formation Entreprise</span>
              </div>
            </div>
          </div>

          {/* URL */}
          <div style={{ fontSize: '17px', fontWeight: 500, color: '#52525B' }}>dkdp.ch</div>
        </div>

        {/* Right column: stats */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', padding: '64px 72px 64px 0', width: '320px', position: 'relative', zIndex: 10 }}>
          {[
            { value: '700+', label: 'Clients accompagnés', color: '#A78BFA' },
            { value: '10+', label: "Ans d\u2019exp\u00e9rience", color: '#FF8C00' },
            { value: '98%', label: 'Clients satisfaits', color: '#D4D4D8' },
          ].map((stat) => (
            <div key={stat.value} style={{ display: 'flex', flexDirection: 'column', padding: '24px 28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' }}>
              <span style={{ fontSize: '44px', fontWeight: 800, color: stat.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{stat.value}</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280', marginTop: '6px' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
