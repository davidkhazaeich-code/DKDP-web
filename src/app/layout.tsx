import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CalProvider } from '@/components/providers/CalProvider'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { Header } from '@/components/layout/Header'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { LazyChatWidget } from '@/components/ui/LazyChatWidget'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dkdp.ch'),
  title: {
    default: 'DKDP · Agence Digitale Genève · Sites web, IA & Formation',
    template: '%s',
  },
  description: 'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise. 700+ clients accompagnés en Suisse romande. Devis gratuit.',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://dkdp.ch',
    siteName: 'DKDP',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP Agence Digitale Genève' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'msapplication-TileColor': '#0a0a0a',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NDMXZL8');`}
        </Script>
        <link rel="dns-prefetch" href="https://app.cal.com" />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Information" />
        <meta name="ai-content-declarations" content="This site contains original content by DKDP, a digital agency in Geneva, Switzerland." />
        <meta name="citation_title" content="DKDP - Agence Digitale Genève" />
        <meta name="citation_author" content="DKDP" />
        <meta name="citation_language" content="fr" />
        <meta name="citation_geo_region" content="CH-GE" />
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        <meta name="geo.position" content="46.20440;6.14320" />
        <meta name="ICBM" content="46.20440,6.14320" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-bg text-white font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDMXZL8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <MotionProvider>
        <SmoothScrollProvider>
          <CalProvider />
          <Header />
          {children}
          <FooterWrapper />
          <LazyChatWidget />
        </SmoothScrollProvider>
        </MotionProvider>
        <Analytics />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SCXF5R826D"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SCXF5R826D');
          `}
        </Script>
      </body>
    </html>
  )
}
