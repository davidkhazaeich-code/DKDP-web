import type { Metadata } from 'next'
/* Composant bilingue partagé avec la page FR (prop `lang`), comme la formation ChatGPT. */
import { AccompagnementIaPage } from '@/app/intelligence-artificielle/accompagnement-ia/_components/AccompagnementIaPage'

/**
 * 01/10/2026 : miroir EN de /intelligence-artificielle/accompagnement-ia.
 * « ai consulting » : 140 recherches par mois en Suisse en anglais, enchère haute
 * 23,86 CHF (Keyword Planner, 01.10.2026).
 */
export const metadata: Metadata = {
  title: 'AI Adoption Consulting Geneva | Monthly AI Support | DKDP',
  description: 'AI adoption support for Swiss SMEs: we learn your business, build AI tools connected to your software and train your teams. On request.',
  alternates: {
    canonical: 'https://dkdp.ch/en/artificial-intelligence/ai-adoption',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/accompagnement-ia',
      en: 'https://dkdp.ch/en/artificial-intelligence/ai-adoption',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/accompagnement-ia',
    },
  },
  openGraph: {
    images: [{ url: '/images/og/accompagnement-ia.png', width: 1376, height: 768, alt: 'AI adoption support for businesses in Geneva, DKDP' }],
  },
}

export default function Page() {
  return <AccompagnementIaPage lang="en" />
}
