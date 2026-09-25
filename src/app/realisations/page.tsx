import type { Metadata } from 'next'
import { RealisationsHub } from '@/components/realisations/RealisationsHub'
import { REALISATIONS } from '@/lib/realisations'

export const metadata: Metadata = {
  title: 'Études de cas : sites web, IA et automatisation | DKDP',
  description:
    "Réalisations de DKDP à Genève : sites web, CRM sur mesure, automatisation IA et SEO local. Chaque chiffre cite sa source et sa date de relevé.",
  alternates: {
    canonical: 'https://dkdp.ch/realisations',
    languages: {
      'fr-CH': 'https://dkdp.ch/realisations',
      en: 'https://dkdp.ch/en/portfolio',
      'x-default': 'https://dkdp.ch/realisations',
    },
  },
  openGraph: {
    title: 'Réalisations DKDP',
    description: 'Sites web, applications et automatisations IA livrés en Suisse romande, preuves à l’appui.',
    url: 'https://dkdp.ch/realisations',
    images: [{ url: '/og-realisations.png', width: 1200, height: 630, alt: 'Réalisations DKDP' }],
  },
}

export default function RealisationsHubPage() {
  const items = REALISATIONS.filter(r => r.meta.status === 'live')
  return <RealisationsHub items={items} lang="fr" />
}
