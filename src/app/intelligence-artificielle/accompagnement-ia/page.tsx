import type { Metadata } from 'next'
import { AccompagnementIaPage } from './_components/AccompagnementIaPage'

/**
 * 01/10/2026 : page créée pour promouvoir l'accompagnement IA mensuel (offre PGN),
 * réécrite le même jour : outils IA branchés sur les processus, sur demande, sans prix.
 * Aucune page ne portait l'intention : /audit-conseil est un diagnostic ponctuel,
 * /mise-en-place une intégration technique de LLM, /formation-entreprise/ia une
 * formation. Mots-clés, SERP et Mode IA : DEV SPACE/clients Claude/DKDP/
 * seo-plan-2026-09/accompagnement-ia-2026-10-01/.
 */
export const metadata: Metadata = {
  title: 'Accompagnement IA entreprise Genève | Transformation IA | DKDP',
  description: 'Accompagnement IA des PME romandes : nous comprenons votre métier, construisons des outils IA reliés à vos logiciels et formons vos équipes.',
  alternates: {
    canonical: 'https://dkdp.ch/intelligence-artificielle/accompagnement-ia',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/accompagnement-ia',
      en: 'https://dkdp.ch/en/artificial-intelligence/ai-adoption',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/accompagnement-ia',
    },
  },
  openGraph: {
    images: [{ url: '/images/og/accompagnement-ia.png', width: 1376, height: 768, alt: 'Accompagnement IA des entreprises à Genève, DKDP' }],
  },
}

export default function Page() {
  return <AccompagnementIaPage lang="fr" />
}
