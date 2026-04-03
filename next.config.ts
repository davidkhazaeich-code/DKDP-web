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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
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
