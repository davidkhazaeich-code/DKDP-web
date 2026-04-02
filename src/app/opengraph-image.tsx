import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DKDP · Service Digital à Genève · IA · Formation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fond dégradé violet */}
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-120px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Fond dégradé orange */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Badge agence */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.30)',
            borderRadius: '6px',
            padding: '6px 14px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#A78BFA', fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Agence Digitale · Genève · Suisse
          </span>
        </div>

        {/* Titre principal */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '800',
            color: '#ffffff',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          DKDP
        </div>

        {/* Sous-titre */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: '400',
            color: '#9CA3AF',
            lineHeight: '1.4',
            maxWidth: '700px',
            marginBottom: '48px',
          }}
        >
          Service Digital · IA · Formation
        </div>

        {/* Pills piliers */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'Site web & SEO', color: '#A78BFA', bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.30)' },
            { label: 'Intelligence Artificielle', color: '#D4D4D8', bg: 'rgba(212,212,216,0.08)', border: 'rgba(212,212,216,0.20)' },
            { label: 'Formation Entreprise', color: '#FF8C00', bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.25)' },
          ].map((pill) => (
            <div
              key={pill.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: pill.bg,
                border: `1px solid ${pill.border}`,
                borderRadius: '100px',
                padding: '8px 20px',
                color: pill.color,
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              {pill.label}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#4B5563',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          dkdp.ch
        </div>
      </div>
    ),
    { ...size }
  )
}
