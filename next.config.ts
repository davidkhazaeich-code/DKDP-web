import type { NextConfig } from 'next'
import { REDIRECTS } from './src/lib/routes'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    optimizeCss: true,
  },

  async redirects() {
    // Source de vérité : src/lib/routes.ts → REDIRECTS
    // Pour ajouter ou modifier une redirection, éditer ce tableau.
    return REDIRECTS.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }))
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // microphone=(self) : autorisé sur la meme origine pour la dictee
          // vocale du chatbot, bloque en iframe tiers. camera et geolocation
          // restent bloques partout, on ne les utilise pas.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // CSP : Google Tag Manager + GA4 + Google Ads autorises (gtm.js, gtag/js,
          // collecte g/collect, remarketing/conversions doubleclick). Sans ces
          // domaines, les scripts GA sont bloques et AUCUN evenement n'atteint GA4.
          // Idem pour OpenAI Ads : le SDK vient de bzrcdn.openai.com (script-src)
          // et poste ses conversions sur bzr.openai.com/v1/sdk/events (connect-src).
          // Oublier l'un des deux = pixel silencieusement mort.
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://cal.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://bzrcdn.openai.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https://app.cal.com https://cal.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.doubleclick.net https://www.google.com https://bzr.openai.com https://bzrcdn.openai.com; frame-src https://app.cal.com https://www.google.com https://maps.google.com https://*.doubleclick.net https://www.googletagmanager.com; object-src 'none'; base-uri 'self'" },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
}

export default nextConfig
