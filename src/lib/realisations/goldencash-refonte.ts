import type { Realisation } from './types'

/**
 * Golden Cash : refonte Astro d'un acheteur d'or genevois.
 *
 * Révision du 2026-09-25 : description de l'API alignée sur le code en
 * production (`server/_lib/gold-fetch.php` : GoldAPI par défaut, XMLCharts en
 * secours, EUR/CHF lu sur Yahoo Finance avec deux replis depuis le 28.04), le
 * « Lighthouse 100/100 » retiré faute de mesure, la durée tirée de
 * l'historique git (13.04 au 25.04.2026). Le témoignage est l'avis Google
 * publié le 24.04.2026 sur la fiche DKDP.
 *
 * ⚠️ Accord écrit à obtenir avant le 31.10.2026 : sans lui, le test de preuve
 * échoue. Les chiffres privés du client (Search Console, GA4) ne s'affichent
 * qu'avec cet accord (niveau `nomme-chiffres`).
 */
const realisation: Realisation = {
  slug: 'goldencash-refonte',
  client: {
    name: 'Golden Cash',
    sector: "Rachat d'or et de métaux précieux",
    location: 'Genève',
  },
  meta: {
    title: "Refonte d'un site de rachat d'or à Genève, avec les cours en temps réel",
    seoTitle: "Site de rachat d'or à Genève, cours en temps réel | DKDP",
    seoDescription:
      "Refonte Astro d'un acheteur d'or genevois : cours des métaux mis à jour toutes les 10 secondes, API avec secours, en ligne en 12 jours.",
    excerpt:
      "Refonte Astro d'un acheteur d'or genevois : l'estimateur de rachat et les cours se mettent à jour toutes les 10 secondes, depuis une API qui garde une source de secours. Mise en production 12 jours après le premier commit.",
    dateISO: '2026-04-15',
    publishedISO: '2026-04-26',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['site-web', 'seo-geo'],
  sector: 'metaux-precieux',
  consent: {
    level: 'nomme',
    evidence: {
      kind: 'a-confirmer',
      date: '2026-09-25',
      reference: "Étude publiée le 26.04.2026. Accord écrit à demander à la co-gérante (liste d'accords du 25.09.2026).",
      deadline: '2026-10-31',
    },
  },
  tags: ['Refonte', 'Astro', 'API temps réel', 'Tableau de bord', 'SEO local'],
  answer:
    "Golden Cash, acheteur d'or à Genève, nous a confié la refonte de son site en avril 2026. Le nouveau site Astro affiche un estimateur de rachat et des cours mis à jour toutes les 10 secondes, depuis une API qui garde une source de secours. Il est passé en production 12 jours après le premier commit.",
  facts: [
    { label: 'Secteur', value: "Rachat d'or et de métaux précieux" },
    { label: 'Lieu', value: 'Genève, Eaux-Vives' },
    { label: 'Mise en ligne', value: '25 avril 2026' },
    { label: 'Livré', value: 'Refonte du site, API des cours, référencement' },
    { label: 'Technologies', value: 'Astro 5, API PHP, Infomaniak' },
  ],
  hero: {
    desktopFull: '/images/realisations/goldencash-refonte/desktop.webp',
    mobileFull: '/images/realisations/goldencash-refonte/mobile.webp',
    browserUrl: 'goldencash.ch',
  },
  problem: {
    title: 'Des cours à confirmer par téléphone avant chaque vente',
    body: "L'ancien site de Golden Cash n'affichait pas les cours des métaux précieux en temps réel : un client qui voulait connaître le prix de son or devait appeler avant de se déplacer. L'interface d'administration n'était pas sécurisée correctement, et des bugs occasionnels touchaient l'affichage public.\n\nPour un métier où la confiance se joue sur l'exactitude du prix, le site devait montrer un cours juste à tout moment, et laisser l'équipe reprendre la main en quelques secondes si une source de cours tombait.",
    facts: [
      { label: 'Public', value: "Particuliers et professionnels qui vendent de l'or" },
      { label: 'Enjeu', value: 'Un prix affiché exact, sans appel préalable' },
      { label: 'Départ', value: 'Ancien site WordPress' },
    ],
  },
  approach: {
    title: 'Un site statique rapide, une API des cours qui ne tombe pas',
    body: `Refonte complète sur Astro 5 en génération statique, pour la vitesse et la simplicité du déploiement chez Infomaniak par GitHub Actions. Côté serveur, une API PHP interroge GoldAPI par défaut et garde XMLCharts en secours. Un cache de 10 secondes limite les appels payants, et le taux EUR/CHF est lu en direct sur Yahoo Finance, avec deux sources de repli.

L'estimateur public calcule le rachat selon le poids et le carat, et un tableau de bord sécurisé par jeton permet à l'équipe de choisir la source des cours, d'ajuster ses marges et de corriger un cours à la main.`,
    bullets: [
      'Astro 5 en génération statique, déploiement Infomaniak par GitHub Actions',
      'Estimateur de rachat : poids et carat, prix mis à jour toutes les 10 secondes',
      'Bandeau des cours sur tout le site, rafraîchi toutes les 10 secondes',
      'API PHP : GoldAPI par défaut, XMLCharts en secours, cache de 10 secondes',
      'Taux EUR/CHF lu en direct, avec deux replis et un contrôle de vraisemblance',
      'Tableau de bord sécurisé : source des cours, marges, correction manuelle',
    ],
  },
  stack: [
    { label: 'Astro 5', color: 'orange' },
    { label: 'Tailwind 4', color: 'teal' },
    { label: 'API PHP', color: 'violet' },
    { label: 'GitHub Actions', color: 'chrome' },
  ],
  results: [
    {
      metric: 'Mise en production',
      value: '12 jours',
      label: 'entre le premier commit et la mise en ligne',
      source: 'Historique git du projet',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
      period: 'du 13 au 25 avril 2026',
    },
    {
      metric: 'Cours affichés',
      value: '10 s',
      label: "entre deux mises à jour de l'estimateur et du bandeau des cours",
      source: 'Code du site en production',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
    {
      metric: 'Sources de cours',
      value: '2',
      label: 'GoldAPI par défaut, XMLCharts en secours, au choix depuis le tableau de bord',
      source: 'Code du site en production',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
  ],
  lessons: [
    "Une source de cours se choisit sur sa fiabilité avant son prix : deux jours après la mise en ligne, le site est passé à GoldAPI par défaut, en gardant XMLCharts en secours.",
    "Un taux de change déduit de deux cours de l'or dérivait de 0,3 à 1 % par rapport au marché. Depuis le 28 avril 2026, le taux EUR/CHF est lu en direct, avec deux replis.",
    "La politique de sécurité du site bloquait la mesure des conversions sans aucun message d'erreur. Depuis le 20 juin 2026, nous vérifions chaque balise dans le site en production, pas seulement dans l'aperçu.",
  ],
  testimonial: {
    quote:
      "Je recommande vivement DKDP Agence digitale pour la qualité de son travail. David a pris en charge mon projet avec beaucoup de professionnalisme et a parfaitement compris mon cahier des charges dès le départ, avec une grande réactivité à chaque étape. J'ai particulièrement apprécié son écoute, sa disponibilité et le soin apporté aux détails. Une collaboration efficace et agréable.",
    author: 'Sandrine',
    role: 'Co-gérante, Golden Cash Genève',
    source: 'Avis Google',
    date: '2026-04-24',
    url: 'https://maps.google.com/?cid=11506632638193894279',
  },
  faq: [
    {
      question: "D'où viennent les cours affichés sur le site ?",
      answer:
        "D'une API qui interroge GoldAPI par défaut et peut basculer sur XMLCharts depuis le tableau de bord. Le taux EUR/CHF est lu en direct sur Yahoo Finance, avec deux replis, et un cache de 10 secondes limite les appels payants.",
    },
    {
      question: 'Combien de temps a pris la refonte ?',
      answer:
        "Douze jours séparent le premier commit, le 13 avril 2026, de la mise en production, le 25 avril 2026. Les ajustements de contenu et de mesure ont suivi dans les semaines d'après.",
    },
    {
      question: 'Où le site est-il hébergé ?',
      answer: 'Chez Infomaniak, en Suisse, avec un déploiement automatique par GitHub Actions à chaque modification.',
    },
  ],
  relatedArticles: ['refonte-site-web-quand-pourquoi', 'site-web-nextjs-vs-wordpress-webflow-2026', 'core-web-vitals-2026-guide-complet'],
  liveUrl: 'https://goldencash.ch',
}

export default realisation
