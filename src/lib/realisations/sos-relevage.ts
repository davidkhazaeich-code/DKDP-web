import type { Realisation } from './types'

/**
 * SOS Relevage : site de service local sur Next.js, relié à un CRM terrain.
 *
 * Présentation volontairement neutre : « un site que nous avons réalisé »,
 * sans le mot client et sans nom de personne. Les fondateurs de la société
 * ne sont pas nommés publiquement sur sos-relevage.ch, et cette page ne doit
 * pas les nommer non plus (arbitrage du 2026-09-01). Les chiffres viennent de
 * la Search Console du 2026-09-08 et du code du site, pas d'une estimation.
 */
const realisation: Realisation = {
  slug: 'sos-relevage',
  client: {
    name: 'SOS Relevage',
    sector: 'Pompes de relevage',
    location: 'Genève',
  },
  meta: {
    title: 'Site de service local avec tunnel de demande et CRM terrain',
    excerpt:
      "Site Next.js 15 pour un spécialiste des pompes de relevage à Genève : parcours de demande en quatre étapes reliés à un CRM d'interventions sur mesure, référencement local et contenu écrit pour être cité par les moteurs génératifs.",
    dateISO: '2026-08-24',
    status: 'live',
  },
  category: 'site-web',
  tags: ['Site vitrine', 'Next.js', 'SEO local', 'CRM sur mesure', 'GEO'],
  hero: {
    desktopFull: '/images/realisations/sos-relevage/desktop.webp',
    mobileFull: '/images/realisations/sos-relevage/mobile.webp',
    browserUrl: 'sos-relevage.ch',
  },
  problem: {
    title: "Un métier qu'on ne cherche que le jour où la cave prend l'eau",
    body: "SOS Relevage est une entreprise genevoise qui ne fait qu'une chose : l'entretien, le dépannage et le remplacement des pompes de relevage d'eaux usées, pour les régies, les copropriétés et les particuliers. Le site devait naître en même temps que l'activité, sans historique, sans avis ni références à montrer, sur un marché où personne ne cherche un prestataire avant la panne. Il fallait donc être trouvé sur des requêtes très locales, inspirer confiance à une régie qui compare, et transformer une visite pressée en demande complète, avec l'adresse et l'accès au local, sans rappel téléphonique pour redemander l'essentiel.",
  },
  approach: {
    title: "Un site de service qui alimente directement l'outil du terrain",
    body: `Next.js 15 en App Router, contenu versionné dans le code sans CMS, hébergement Vercel avec les fonctions en Europe et la base de données à Zurich. Le cœur du site est un tunnel de demande en quatre étapes, situation, demandeur, bâtiment, contact, préréglé par le bouton d'origine : chaque envoi crée une fiche dans un CRM d'interventions développé sur mesure, avec planification, rapport de chantier photo, checklist d'entretien et agenda partagé. Côté référencement, une page par intention (dépannage, entretien, remplacement, contrat pour les régies, urgence inondation, qui appeler), une FAQ en JSON-LD, un fichier llms.txt régénéré à chaque build et des réponses écrites pour être reprises telles quelles par les moteurs génératifs. Le tout sur une identité visuelle créée pour la marque, du logo à la vague signature.`,
    bullets: [
      'Next.js 15, React 19, Tailwind 4, déploiement Vercel, contenu versionné dans le code',
      'Tunnel de demande en 4 étapes, préréglé par le bouton, validé côté client et côté serveur',
      "CRM d'interventions sur mesure : planification, rapport photo, checklist 12 points, agenda ICS",
      'Recherche d’adresse sur le registre fédéral des bâtiments, sans dépendance à Google',
      'JSON-LD LocalBusiness, Service et FAQPage, llms.txt et llms-full.txt générés au build',
      "Douze guides de blog et des pages par intention pour le référencement local",
      'Identité visuelle et logo créés pour la marque, astreinte 24h/24 annoncée sur tout le site',
    ],
  },
  stack: [
    { label: 'Next.js 15', color: 'chrome' },
    { label: 'Tailwind 4', color: 'teal' },
    { label: 'Supabase', color: 'green' },
    { label: 'Vercel', color: 'violet' },
  ],
  results: [
    { metric: 'Search Console', value: '22 pages', label: 'indexées six semaines après la mise en ligne' },
    { metric: 'Position moyenne', value: '10,4', label: 'sur les requêtes pompes de relevage à Genève' },
    { metric: 'Demandes', value: '5 formulaires', label: 'reliés au CRM terrain, adresse et accès compris' },
  ],
  gallery: [
    {
      src: '/images/realisations/sos-relevage/section-1.webp',
      alt: "Site SOS Relevage : section des huit signaux d'alerte d'une pompe de relevage, classés urgence, à planifier ou préventif, avec le bouton Décrire ma panne",
      caption: 'Huit signaux classés par urgence, et un seul bouton pour décrire la panne',
    },
    {
      src: '/images/realisations/sos-relevage/section-2.webp',
      alt: "Site SOS Relevage : engagements de l'entreprise et en-tête de la section d'audit gratuit",
      caption: "Les engagements, puis l'audit gratuit qui sert de porte d'entrée",
    },
    {
      src: '/images/realisations/sos-relevage/section-3.webp',
      alt: 'Site SOS Relevage : bandeau des conditions de l’audit gratuit et pied de page avec la tagline, les garanties et les derniers guides',
      caption: 'Pied de page : garanties écrites et derniers guides du blog',
    },
    {
      src: '/images/realisations/sos-relevage/mobile-section-1.webp',
      alt: "Site SOS Relevage sur mobile : composants d'une station de relevage, boutons de prestations et section Du formulaire à l'intervention",
      caption: 'Sur mobile, le parcours reste lisible d’un pouce',
    },
  ],
  liveUrl: 'https://sos-relevage.ch',
}

export default realisation
