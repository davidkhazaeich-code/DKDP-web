import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CalProvider } from '@/components/providers/CalProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBadge } from '@/components/ui/StickyBadge'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dkdp.ch'),
  title: {
    default: 'DKDP · Service Digital à Genève · IA · Formation',
    template: '%s',
  },
  description: 'Service digital à Genève. Création de sites, SEO, intelligence artificielle et formation entreprise. 150+ clients. Devis gratuit.',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://dkdp.ch',
    siteName: 'DKDP',
    images: [{ url: 'https://dkdp.ch/opengraph-image', width: 1200, height: 630, alt: 'DKDP, Service Digital Genève' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://dkdp.ch/opengraph-image'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://dkdp.ch' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-bg text-white font-sans antialiased">
        <SmoothScrollProvider>
          <CalProvider />
          <Header />
          {children}
          <Footer />
          <StickyBadge />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
