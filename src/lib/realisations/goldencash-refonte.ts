import type { Realisation } from './types'

const realisation: Realisation = {
  slug: 'goldencash-refonte',
  client: {
    name: 'Golden Cash',
    sector: 'Metaux precieux',
    location: 'Geneve',
  },
  meta: {
    title: 'Refonte Astro avec tarifs DTI temps reel',
    excerpt:
      'Site vitrine Astro SSG avec API hybride XMLCharts plus FXCM, dashboard admin securise et tarifs metaux precieux rafraichis toutes les 10 secondes.',
    dateISO: '2026-04-15',
    status: 'live',
  },
  category: 'site-web',
  tags: ['Refonte', 'Astro', 'API live', 'Dashboard admin', 'SEO local'],
  hero: {
    desktopFull: '/images/realisations/goldencash-refonte/desktop.webp',
    mobileFull: '/images/realisations/goldencash-refonte/mobile.webp',
    browserUrl: 'goldencash.ch',
  },
  problem: {
    title: 'Un systeme vieillissant et peu fiable',
    body: "L'ancien systeme de Golden Cash souffrait de plusieurs limitations. Le rafraichissement des prix des metaux precieux n'etait pas en temps reel, ce qui forcait les clients a appeler pour confirmer un tarif avant chaque transaction. L'interface d'administration n'etait pas securisee correctement, et des bugs occasionnels affectaient l'affichage public. Pour une activite ou la confiance et la reactivite sur les cours sont essentielles, ces failles freinaient la conversion en ligne.",
  },
  approach: {
    title: 'Astro SSG plus API hybride avec dashboard securise',
    body: "Refonte complete sur Astro 5 en SSG pour la performance et la simplicite de deploiement. Cote backend, une API PHP joue le role de proxy hybride entre deux sources de cours metaux precieux : XMLCharts en source primaire et FXCM en fallback automatique. Le cache de 10 secondes limite les appels payants tout en garantissant des tarifs fraichement valides. Un dashboard admin securise permet a l'equipe Golden Cash de basculer manuellement entre les sources d'API en cas de probleme externe.",
    bullets: [
      'Astro 5 SSG pour la performance, deploiement Infomaniak',
      'API PHP avec fallback automatique XMLCharts vers FXCM',
      'Cache 10 secondes, EUR/CHF rafraichi toutes les 15 secondes',
      'Dashboard admin securise pour bascule manuelle des sources',
      'Documentation technique complete (5 fichiers MD : SETUP, ARCHITECTURE, API, FRONTEND, ADMIN)',
    ],
  },
  stack: [
    { label: 'Astro 5', color: 'orange' },
    { label: 'Tailwind 4', color: 'teal' },
    { label: 'PHP API', color: 'violet' },
    { label: 'GitHub Actions', color: 'chrome' },
  ],
  results: [
    { metric: 'Lighthouse', value: '100/100', label: 'Performance mobile' },
    { metric: 'Latence', value: '< 10s', label: 'Bascule API XMLCharts vers FXCM' },
    { metric: 'Delai', value: '< 6 sem.', label: 'Brief a mise en production' },
  ],
  testimonial: {
    quote:
      "Je recommande vivement DKDP Agence digitale pour la qualite de son travail. David a pris en charge mon projet avec beaucoup de professionnalisme et a parfaitement compris mon cahier des charges des le depart, avec une grande reactivite a chaque etape. J'ai particulierement apprecie son ecoute, sa disponibilite et le soin apporte aux details. Une collaboration efficace et agreable.",
    author: 'Sandrine',
    role: 'Co-gerante, Golden Cash Geneve',
  },
  gallery: [
    {
      src: '/images/realisations/goldencash-refonte/section-1.webp',
      alt: 'Catalogue metaux precieux Golden Cash avec tarifs live',
      caption: 'Catalogue avec tarifs DTI live, rafraichis toutes les 10 secondes',
    },
    {
      src: '/images/realisations/goldencash-refonte/section-2.webp',
      alt: 'Section milieu de page Golden Cash',
      caption: 'Presentation services et conversion EUR/CHF live',
    },
    {
      src: '/images/realisations/goldencash-refonte/mobile-section-1.webp',
      alt: 'Vue mobile Golden Cash',
      caption: 'Adaptation responsive iOS pour usage en mobilite',
    },
  ],
  liveUrl: 'https://goldencash.ch',
}

export default realisation
