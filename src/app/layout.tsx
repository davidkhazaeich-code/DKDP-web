import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CalProvider } from '@/components/providers/CalProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBadge } from '@/components/ui/StickyBadge'
import { MobileRDV } from '@/components/ui/MobileRDV'
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
    default: 'DKDP · Agence Digitale Genève · Sites web, IA & Formation',
    template: '%s',
  },
  description: 'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise. 700+ clients accompagnés en Suisse romande. Devis gratuit.',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://dkdp.ch',
    siteName: 'DKDP',
  },
  twitter: {
    card: 'summary_large_image',
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
          <MobileRDV />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
