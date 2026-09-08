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
  highlights: [
    {
      eyebrow: 'Arriver',
      tag: 'UI',
      title: 'Un curseur avant et après, en guise de promesse',
      body: "Le premier écran ne décrit pas le métier, il le montre : le même local technique inondé à gauche, remis en service à droite, et le technicien posé par-dessus. Le curseur suit la souris sans clic et repart de lui-même quand on le lâche. Un titre, une phrase, un bouton rouge réservé à l'urgence, un bouton bleu pour tout le reste.",
      image: {
        src: '/images/realisations/sos-relevage/hero-desktop.webp',
        alt: "SOS Relevage, page d'accueil : titre « Spécialiste des pompes de relevage à Genève », curseur avant et après sur un local technique inondé puis remis en service, technicien au premier plan",
        path: '/',
      },
      phone: {
        src: '/images/realisations/sos-relevage/hero-mobile.webp',
        alt: "SOS Relevage sur mobile : le même premier écran, titre et boutons empilés, barre d'appel en bas",
      },
      points: [
        "Bande d'astreinte 24h/24 au-dessus du menu, visible avant tout le reste",
        "Un seul rouge par écran : celui de l'urgence",
        'Le curseur avant et après réagit au survol, pas seulement au glissement',
      ],
    },
    {
      eyebrow: 'Se reconnaître',
      tag: 'UX',
      title: 'Huit signaux pour se diagnostiquer avant d’appeler',
      body: "Quelqu'un dont la cave prend l'eau ne sait pas toujours qu'il a une pompe de relevage. Huit symptômes classés urgence, à planifier ou préventif, une image qui change avec le signal survolé, et sur mobile un panneau collant piloté par le défilement : on descend la liste, l'image suit sans un geste de plus.",
      image: {
        src: '/images/realisations/sos-relevage/section-1.webp',
        alt: "SOS Relevage, section « Votre pompe vous pose problème ? » : huit signaux classés urgence, à planifier ou préventif, photo d'une pompe Flygt et bouton Décrire ma panne",
        path: '/',
      },
      phone: {
        src: '/images/realisations/sos-relevage/symptomes-mobile.webp',
        alt: "SOS Relevage sur mobile : la section des huit signaux avec l'image collante qui suit le défilement",
      },
      points: [
        "Sur mobile, le défilement pilote l'image : aucune interaction à apprendre",
        'Chaque signal ouvre directement la bonne demande',
        "Un bloc « quelle pompe ai-je ? » pour celui qui n'en est pas sûr",
      ],
    },
    {
      eyebrow: 'Demander',
      tag: 'UX',
      title: 'Une demande en quatre étapes, préréglée par le bouton',
      body: "Tous les boutons du site ouvrent le même tunnel : le sujet, qui vous êtes, le bâtiment, vos coordonnées. Le bouton d'origine préremplit ce qu'il sait déjà, l'adresse est cherchée dans le registre fédéral des bâtiments, et l'accès au local est demandé tout de suite. Chaque envoi crée une fiche dans le CRM terrain, sans rappel pour redemander l'essentiel.",
      image: {
        src: '/images/realisations/sos-relevage/tunnel-desktop.webp',
        alt: "SOS Relevage, tunnel de demande ouvert sur la page d'accueil : étape « Quel sujet ? » avec quatre tuiles, dépannage urgent, dépannage, contrôle et entretien, chantier",
        path: '/',
      },
      phone: {
        src: '/images/realisations/sos-relevage/tunnel-mobile.webp',
        alt: 'SOS Relevage sur mobile : le tunnel de demande en plein écran, quatre sujets empilés',
      },
      steps: ['Sujet', 'Vous', 'Adresse', 'Contact'],
      points: [
        'Quatre sujets : dépannage urgent, dépannage, contrôle et entretien, chantier',
        'Les mêmes règles de validation côté client et côté serveur',
        'Le dépannage urgent exige un téléphone, le chantier exige un email',
      ],
    },
    {
      eyebrow: 'Quand ça déborde',
      tag: 'Contenu',
      title: "Une page d'urgence qui dit aussi quand ce n'est pas nous",
      body: "Six gestes dans l'ordre, quatre origines d'eau à reconnaître avant d'appeler, qui appeler et dans quel ordre, avec les pompiers devant tout le monde. La page écrit noir sur blanc ce que l'entreprise ne fait pas : elle rétablit l'évacuation, elle ne sèche pas le bâtiment. C'est ce qui la rend citable plutôt que promotionnelle.",
      image: {
        src: '/images/realisations/sos-relevage/urgence-gestes-desktop.webp',
        alt: "SOS Relevage, page urgence inondation : « La sécurité d'abord, les dégâts ensuite », six gestes numérotés dans une grille",
        path: '/urgence-inondation-geneve',
      },
      points: [
        'Une réponse directe en tête de page, reprise telle quelle par les moteurs',
        'Le 118 en lien téléphonique, jamais en concurrence avec le formulaire',
        'Un article compagnon minute par minute sur le blog',
      ],
    },
    {
      eyebrow: 'Savoir qui appeler',
      tag: 'SEO',
      title: 'Une page pivot qui compare quatre métiers',
      body: "Spécialiste du relevage, plombier, entreprise de canalisations, électricien : pour chacun, ce qu'il traite et ce qu'il ne traite pas. La page répond aux questions en « qui » que la Search Console remontait sans un clic, puis se termine par les textes de loi et les services officiels cités à la source.",
      image: {
        src: '/images/realisations/sos-relevage/qui-appeler-desktop.webp',
        alt: "SOS Relevage, page « Qui appeler » : « Chacun son bout de l'installation », deux cartes comparant le spécialiste pompes de relevage et le plombier généraliste, ce qu'il traite et ce qu'il ne traite pas",
        path: '/qui-appeler-pompe-relevage-geneve',
      },
      points: [
        "Quatre cartes, deux listes chacune : ce qu'il traite, ce qu'il ne traite pas",
        'Textes de référence liés : LEaux, OIBT, OCEau, le 118',
        'FAQ « qui » reprise dans les données structurées',
      ],
    },
  ],
  direction: {
    intro: "Une identité créée pour la marque : deux bleus pour l'eau claire et la technique, deux bruns pour l'eau usée, et une flèche qui remonte. Le passage du marron au bleu raconte le métier en une image, sur le logo comme dans les dégradés du site.",
    logo: { src: '/images/realisations/sos-relevage/logo-transparent.webp', alt: 'Logo SOS Relevage : lettres SOS avec une vague et une flèche qui remonte, du marron vers le bleu' },
    tagline: '« Pompes de relevage. Un seul métier. »',
    palette: [
      { name: 'Bleu nuit', hex: '#09365f', role: 'titres, pied de page' },
      { name: 'Bleu SOS', hex: '#186092', role: 'actions, liens' },
      { name: 'Bleu technique', hex: '#0d4b7b', role: 'survols, profondeur' },
      { name: 'Bleu clair', hex: '#46b0d6', role: 'accents, eau claire' },
      { name: 'Marron eau', hex: '#5f3716', role: 'eaux usées, avant' },
      { name: 'Marron boue', hex: '#97713e', role: 'transition' },
      { name: 'Rouge urgence', hex: '#a8332a', role: "un seul par écran, l'urgence" },
    ],
    type: [
      { role: 'titres et texte courant, variable de 200 à 900', family: 'Hubot Sans', sample: 'Spécialiste des pompes de relevage à Genève.' },
      { role: 'étiquettes, numéros de section, pied de page', family: 'JetBrains Mono', sample: '04 · Identification · 8 signaux', mono: true },
    ],
    principles: [
      { title: 'Un seul rouge par écran', body: "Le rouge est réservé à l'urgence. Toutes les autres actions sont bleues, ce qui rend le bouton d'urgence impossible à manquer." },
      { title: 'Jamais de titre en capitales', body: 'Les capitales vivent dans les boutons et les petites étiquettes mono. Les titres restent en casse normale, plus lisibles et moins criards.' },
      { title: 'Un dégradé, une direction', body: 'Le marron devient bleu de gauche à droite ou de bas en haut, jamais en sens inverse : le sens du relevage.' },
      { title: 'Rien de décoratif', body: "Pas de bande animée ni d'illustration abstraite. Un local technique, une pompe, un technicien, à hauteur d'œil." },
      { title: 'Des pages qui se lisent comme un dossier', body: "01, 02, 03 en étiquettes mono devant chaque section : une structure que l'œil retrouve d'une page à l'autre." },
      { title: 'Le pouce avant la souris', body: "Barre d'appel qui s'efface pendant la lecture et revient quand on remonte, tunnel plein écran, cibles de 44 pixels." },
    ],
  },
  seo: {
    intro: "Le référencement n'est pas une couche posée à la fin. Chaque page répond à une intention de recherche précise, chaque réponse est écrite pour être reprise telle quelle, et les données structurées sont générées depuis le contenu, jamais en double.",
    serp: {
      siteName: 'SOS Relevage',
      url: 'https://sos-relevage.ch',
      title: 'SOS Relevage - Dépannage & Entretien de pompes à Genève',
      description: "Pompe de relevage en panne à Genève ? Contrôle, entretien et dépannage pour éviter l'inondation. Urgence 24h/24, audit gratuit.",
      favicon: '/images/realisations/sos-relevage/logo-color.webp',
    },
    intents: [
      { label: 'Dépannage', path: '/depannage-pompe-relevage-geneve' },
      { label: 'Entretien', path: '/maintenance-pompes-relevage' },
      { label: 'Remplacement', path: '/remplacement-pompes' },
      { label: 'Contrat régies', path: '/contrat-entretien-regies' },
      { label: 'Urgence inondation', path: '/urgence-inondation-geneve' },
      { label: 'Qui appeler', path: '/qui-appeler-pompe-relevage-geneve' },
      { label: 'Communes desservies', path: '/zones-geneve' },
      { label: 'Guides', path: '/blog' },
    ],
    schemas: ['LocalBusiness', 'Plumber', 'Service', 'FAQPage', 'Article', 'VideoObject', 'BreadcrumbList', 'WebSite'],
    geo: [
      { title: 'Des réponses écrites pour être citées', body: "Sur chaque page de service, un titre formulé comme la question (« qui peut remplacer une pompe de relevage à Genève ? ») suivi d'une réponse de 40 à 60 mots qui nomme l'entreprise et se comprend hors de la page." },
      { title: 'Le hors-périmètre écrit', body: "La page urgence dit ce que l'entreprise ne fait pas. Un moteur génératif qui lit « on rétablit l'évacuation, on ne sèche pas le bâtiment » ne la présente pas comme une entreprise d'assainissement après sinistre." },
      { title: 'llms.txt et sources liées', body: 'Un fichier llms.txt écrit à la main, un llms-full.txt généré à chaque build depuis les données du site, et les textes de loi cités avec leur lien : LEaux, OIBT, OCEau, SIG, le 118.' },
    ],
  },
  liveUrl: 'https://sos-relevage.ch',
}

export default realisation
