import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
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
    default: 'DKDP · Agence Digitale à Genève · IA · Formation',
    template: '%s · DKDP',
  },
  description: 'Agence digitale à Genève. Création de sites, SEO, intelligence artificielle et formation entreprise. 150+ clients. Devis gratuit.',
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://dkdp.ch',
    siteName: 'DKDP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://dkdp.ch' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-bg text-white font-sans antialiased">
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
