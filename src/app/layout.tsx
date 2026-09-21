import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CalProvider } from '@/components/providers/CalProvider'
import { ConversionTracker } from '@/components/providers/ConversionTracker'
import { OpenAiPageView } from '@/components/providers/OpenAiPageView'
import { WebVitals } from '@/components/providers/WebVitals'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { LazyChatWidget } from '@/components/ui/LazyChatWidget'
import { OPENAI_PIXEL_ID } from '@/lib/openai-ads'

/** Seul hote ou la mesure (GA4, pixel OpenAI) est active. */
const TRACKING_HOST = 'dkdp.ch'
import { getServerLocale } from '@/i18n/server'
import { htmlLangs, ogLocales } from '@/i18n/config'
import './globals.css'
import { ENTITY } from '@/lib/entity'

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
  description: 'DKDP, agence digitale aux Eaux-Vives à Genève : sites web, SEO, automatisation IA et formation entreprise pour PME romandes. Devis sous 48 h.',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    alternateLocale: ['en_US'],
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
  themeColor: '#0A0A0A',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale()
  const htmlLang = htmlLangs[locale]
  const ogLocale = ogLocales[locale]

  return (
    <html lang={htmlLang} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC theme init, must run synchronously before any paint */}
        <script
          id="dkdp-theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('dkdp-theme');var d=document.documentElement;if(t==='light'){d.setAttribute('data-theme','light');d.style.colorScheme='light';}else{d.setAttribute('data-theme','dark');d.style.colorScheme='dark';}}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}})();`,
          }}
        />
        {/* GARDE D'HOTE (21/09/2026, plan SEO, action X04) : pixel OpenAI, GTM et
            gtag ne se chargent que sur dkdp.ch. Localhost, les previews Vercel et
            tout miroir gardent des stubs muets (`oaiq`, `gtag`, `dataLayer`), donc
            le code applicatif ne change pas et rien ne part vers GA4, Ads ou
            OpenAI. GA4 comptait 19 sessions « localhost » sur l'ete 2026. */}
        {/* Pixel de mesure OpenAI (ChatGPT Ads).
            Inline et synchrone comme le recommande OpenAI : le stub `oaiq` doit
            exister avant tout code React, sinon les conversions declenchees tot
            sont perdues. Le SDK lui-meme est charge en async, il ne bloque pas
            le rendu. Mapping des evenements : lib/openai-ads.ts */}
        <script
          id="openai-pixel"
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u){if(w.oaiq)return;if(w.location.hostname!=="${TRACKING_HOST}"){w.oaiq=function(){};return}var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}"${process.env.NODE_ENV === 'production' ? '' : ',debug:true'}});`,
          }}
        />
        {/* GTM-NDMXZL8 retire le 21/09/2026 (plan SEO, action D21) : le conteneur
            ne portait que 7 balises en pause et une conversion RDV sur un
            selecteur Webflow inexistant ici, deja envoyee par analytics.ts.
            149 Ko de JS tiers en moins, aucune mesure perdue (audit API dans
            seo-plan-2026-09/AUDIT-GTM-PORTEFEUILLE-2026-09-21.md). */}
        {/* Stub gtag, inline et synchrone : analytics.ts appelle
            `window.gtag?.()` des le premier rendu (conversions, vues de page
            OpenAI), la file dataLayer doit donc exister avant React. La
            bibliotheque gtag.js elle-meme se charge apres `load` (script
            gtag-lib en bas de page) et rejoue la file. */}
        <script
          id="gtag-stub"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-SCXF5R826D');`,
          }}
        />
        <link rel="dns-prefetch" href="https://app.cal.com" />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Information" />
        <meta name="ai-content-declarations" content="This site contains original content by DKDP, a digital agency in Geneva, Switzerland." />
        <meta name="citation_title" content="DKDP - Agence Digitale Genève" />
        <meta name="citation_author" content="DKDP" />
        <meta name="citation_language" content={locale} />
        <meta name="citation_geo_region" content="CH-GE" />
        <meta name="geo.region" content="CH-GE" />
        <meta name="geo.placename" content="Genève" />
        <meta name="geo.position" content={`${ENTITY.geo.latitude};${ENTITY.geo.longitude}`} />
        <meta name="ICBM" content={`${ENTITY.geo.latitude},${ENTITY.geo.longitude}`} />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* og:locale override based on detected locale */}
        <meta property="og:locale" content={ogLocale} />
      </head>
      <body
        className="font-sans antialiased"
        style={{ background: 'var(--bg)', color: 'var(--text)' }}
      >
        <MotionProvider>
          <ThemeProvider>
            <SmoothScrollProvider>
              <CalProvider />
              <ConversionTracker />
              <OpenAiPageView />
              <WebVitals />
              <Header />
              {children}
              <FooterWrapper />
              <LazyChatWidget />
            </SmoothScrollProvider>
          </ThemeProvider>
        </MotionProvider>
        <Analytics />
        {/* Google tag (gtag.js), charge apres `load` (lazyOnload, action D21 :
            il partait en priorite haute avant les chunks Next). Garde d'hote :
            hors dkdp.ch, le stub du head garde la file mais aucune bibliotheque
            n'est chargee, donc rien ne part. Les appels faits avant ce moment
            (page_view, conversions) attendent dans dataLayer et sont rejoues. */}
        <Script id="gtag-lib" strategy="lazyOnload">
          {`
            (function(){
              if (window.location.hostname !== '${TRACKING_HOST}') return;
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-SCXF5R826D';
              document.head.appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
