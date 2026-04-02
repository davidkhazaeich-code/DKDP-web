/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // Service Digital
      { source: '/creation-site-internet-geneve',             destination: '/agence-digitale/creation-site-web',     permanent: true },
      { source: '/referencement-naturel-seo',                 destination: '/agence-digitale/seo',                   permanent: true },
      { source: '/publicite-google-sea',                      destination: '/agence-digitale/publicite-sea',         permanent: true },
      { source: '/gestion-reseaux-sociaux-publicite',         destination: '/agence-digitale/reseaux-sociaux',       permanent: true },
      { source: '/creation-video-geneve',                     destination: '/agence-digitale/creation-video',        permanent: true },
      { source: '/consulting-strategie-marketing-geneve',     destination: '/agence-digitale/consulting-marketing',  permanent: true },
      { source: '/rgpd-gestion-des-cookies',                  destination: '/agence-digitale/rgpd-cookies',          permanent: true },

      // Intelligence Artificielle
      { source: '/intelligence-artificielle-agent-ia-et-automatisation', destination: '/intelligence-artificielle', permanent: true },

      // Formation
      { source: '/formation-ia-pour-entreprise-suisse-romande', destination: '/formation-entreprise/ia',            permanent: true },
      { source: '/formation-informatique-entreprise-geneve',    destination: '/formation-entreprise',               permanent: true },

      // Réalisations
      { source: '/nos-realisations',                          destination: '/realisations',                          permanent: true },
      { source: '/nos-realisations/:slug',                    destination: '/realisations',                          permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Strict referrer — passes origin for same-site, nothing for cross-site (good for analytics + privacy)
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable browser features not used by the site
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // HSTS — enforce HTTPS for 1 year (enable once SSL is confirmed stable)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Basic XSS protection for older browsers
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      // No caching on API routes
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
