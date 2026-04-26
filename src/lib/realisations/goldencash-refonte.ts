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
    body: `Refonte complete sur Astro 5 en SSG pour la performance et la simplicite de deploiement. Cote backend, une API PHP joue le role de proxy hybride entre deux sources de cours metaux precieux : XMLCharts en source primaire et FXCM en fallback automatique. Le cache de 10 secondes limite les appels payants tout en garantissant des tarifs fraichement valides. L'estimateur public calcule le rachat en temps reel selon le poids et le carat, et un dashboard admin securise par JWT permet a l'equipe Golden Cash de basculer entre les sources d'API, ajuster les marges, surcharger les taux EUR/CHF ou figer manuellement les prix en quelques secondes.`,
    bullets: [
      'Astro 5 SSG, deploiement Infomaniak, Lighthouse 100/100',
      'Estimateur live : poids et carat vers prix temps reel, refresh 30s',
      'Table DTI auto-refresh 10s pour les transactions DTI directes',
      'API PHP avec fallback automatique XMLCharts vers FXCM',
      'Dashboard admin securise par JWT 8h, bascule API en 1 clic',
      'Surcharge manuelle des taux EUR/CHF, USD/CHF, USD/EUR',
      "Mode override pour figer les prix en cas d'indisponibilite des deux APIs",
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
      src: '/images/realisations/goldencash-refonte/estimation-form.webp',
      alt: `Formulaire de l'estimateur Golden Cash : poids et carat`,
      caption: `Estimateur public : le client saisit poids et carat, le prix est calcule en temps reel a partir des cours du jour.`,
    },
    {
      src: '/images/realisations/goldencash-refonte/estimation-fullpage.webp',
      alt: `Page complete de l'estimateur Golden Cash avec resultats par carat`,
      caption: `Resultat de l'estimation : prix CHF et EUR par carat, decomposition complete et toggle de devise.`,
    },
    {
      src: '/images/realisations/goldencash-refonte/dti-rates-table.webp',
      alt: 'Table DTI Golden Cash : tarifs metaux precieux temps reel',
      caption: 'Table DTI auto-refresh toutes les 10 secondes, source XMLCharts ou FXCM affichee, utilisee par le systeme de facturation.',
    },
    {
      src: '/images/realisations/goldencash-refonte/admin-login.webp',
      alt: 'Page de login du dashboard admin Golden Cash, design dark gold',
      caption: `Dashboard admin securise par JWT 8h : bascule des sources d'API, ajustement des marges, surcharge des taux.`,
    },
    {
      src: '/images/realisations/goldencash-refonte/mobile-section-1.webp',
      alt: 'Vue mobile Golden Cash',
      caption: 'Adaptation responsive iOS, mobile-first avec barre CTA fixe en bas.',
    },
  ],
  liveUrl: 'https://goldencash.ch',
}

export default realisation
