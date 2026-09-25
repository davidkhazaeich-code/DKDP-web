import type { Realisation } from './types'
import { SOS_GSC_DAILY, rollingSum } from './data/sos-relevage-gsc'

/**
 * SOS Relevage : site de service local sur Next.js, relié à un CRM terrain.
 *
 * Présentation volontairement neutre : « un site que nous avons réalisé »,
 * sans le mot client et sans nom de personne. Les fondateurs de la société
 * ne sont pas nommés publiquement sur sos-relevage.ch, et cette page ne doit
 * pas les nommer non plus (arbitrage du 2026-09-01). Accord `interne` : c'est
 * la société de David et de son associé, aucun tiers à solliciter.
 *
 * Révision du 2026-09-25 : chiffres relevés dans Search Console le jour même,
 * relevé manuel de la page de résultats du 2026-09-20 (README du client),
 * règles des formulaires et du bouton rouge mises à jour (10.09 et 24.09).
 */
const realisation: Realisation = {
  slug: 'sos-relevage',
  client: {
    name: 'SOS Relevage',
    sector: 'Pompes de relevage',
    location: 'Genève',
  },
  meta: {
    title: "Site de service local et CRM d'interventions pour une PME du bâtiment à Genève",
    seoTitle: 'Site et CRM pour une PME du bâtiment à Genève | DKDP',
    seoDescription:
      "Site Next.js et CRM d'interventions sur mesure pour une PME genevoise du bâtiment : tunnel de demande, SEO local et chiffres sourcés.",
    excerpt:
      "Site Next.js 15 pour un spécialiste des pompes de relevage à Genève : un tunnel de demande en quatre étapes alimente un CRM d'interventions sur mesure, avec un référencement local et des réponses écrites pour être citées par les moteurs génératifs.",
    dateISO: '2026-08-24',
    publishedISO: '2026-09-08',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['site-web', 'application', 'seo-geo', 'identite-visuelle'],
  sector: 'batiment',
  consent: {
    level: 'interne',
    note: 'Société de David Khazaei et de son associé : présentation neutre, sans nom de personne.',
  },
  tags: ['Site vitrine', 'Next.js', 'SEO local', 'CRM sur mesure', 'GEO'],
  answer:
    "SOS Relevage, spécialiste genevois des pompes de relevage, a lancé son activité le 24 août 2026 avec un site que nous avons réalisé : un tunnel de demande en quatre étapes alimente un CRM d'interventions sur mesure. Au relevé du 20 septembre 2026, le site sortait 1er du pack local sur « pompe de relevage genève ».",
  facts: [
    { label: 'Secteur', value: 'Bâtiment, pompes de relevage' },
    { label: 'Lieu', value: 'Canton de Genève' },
    { label: 'Lancement', value: '24 août 2026' },
    { label: 'Livré', value: 'Site, CRM, référencement, identité visuelle' },
    { label: 'Technologies', value: 'Next.js 15, Supabase, Vercel' },
  ],
  hero: {
    desktopFull: '/images/realisations/sos-relevage/desktop.webp',
    mobileFull: '/images/realisations/sos-relevage/mobile.webp',
    browserUrl: 'sos-relevage.ch',
    desktopView: '/images/realisations/sos-relevage/hero-desktop.webp',
    mobileView: '/images/realisations/sos-relevage/hero-mobile.webp',
  },
  mockup: {
    src: '/images/realisations/sos-relevage/mockup-hero.webp',
    alt: "Le site SOS Relevage sur un ordinateur portable et sur un téléphone : page d'accueil avec le curseur avant et après sur un local technique",
  },
  problem: {
    title: "Un métier qu'on ne cherche que le jour où la cave prend l'eau",
    body: "SOS Relevage est une entreprise genevoise qui ne fait qu'une chose : l'entretien, le dépannage et le remplacement des pompes de relevage d'eaux usées, pour les régies, les copropriétés et les particuliers. Le site devait naître en même temps que l'activité, sans historique, sans avis ni références à montrer, sur un marché où personne ne cherche un prestataire avant la panne.\n\nIl fallait donc être trouvé sur des requêtes très locales, inspirer confiance à une régie qui compare, et transformer une visite pressée en demande complète, avec l'adresse et l'accès au local, sans rappel téléphonique pour redemander l'essentiel.",
    facts: [
      { label: 'Public', value: 'Régies, copropriétés, particuliers' },
      { label: 'Territoire', value: 'Canton de Genève' },
      { label: 'Départ', value: 'Activité nouvelle, sans avis ni référence' },
    ],
  },
  approach: {
    title: "Un site de service qui alimente directement l'outil du terrain",
    body: `Next.js 15 en App Router, contenu versionné dans le code sans CMS, hébergement Vercel avec les fonctions en Europe et la base de données à Zurich. Le cœur du site est un tunnel de demande en quatre étapes, situation, demandeur, bâtiment, contact, préréglé par le bouton d'origine : chaque envoi crée une fiche dans un CRM d'interventions développé sur mesure, avec planification, agenda synchronisé, rappels de rendez-vous et rapport d'intervention photographié.

Côté référencement, une page par intention (dépannage, entretien, remplacement, contrat pour les régies, urgence inondation, qui appeler), une FAQ en JSON-LD, un fichier llms.txt et des réponses écrites pour être reprises telles quelles par les moteurs génératifs. Le tout sur une identité visuelle créée pour la marque, du logo à la vague signature.`,
    bullets: [
      'Next.js 15, React 19, Tailwind 4, déploiement Vercel, contenu versionné dans le code',
      'Tunnel de demande en 4 étapes, préréglé par le bouton, validé côté client et côté serveur',
      'Prénom, nom, email et téléphone demandés sur les cinq formulaires, comme la fiche contact de bexio',
      "CRM d'interventions sur mesure : planification, agenda synchronisé avec Google, rappels par email et SMS, rapport par type d'intervention avec photos",
      "Recherche d'adresse sur le registre fédéral des bâtiments, sans dépendance à Google",
      'JSON-LD LocalBusiness, Service et FAQPage, llms.txt et llms-full.txt générés au build',
      'Onze guides de blog et des pages par intention pour le référencement local',
      'Identité visuelle et logo créés pour la marque, astreinte 24h/24 annoncée sur tout le site',
    ],
  },
  flow: {
    title: 'De la demande au rapport, sans ressaisie',
    intro: "Ce que devient une demande envoyée depuis le site, jusqu'au rapport remis au client.",
    steps: [
      { label: 'Bouton du site', detail: 'il préremplit le sujet de la demande', kind: 'source' },
      { label: 'Tunnel en 4 étapes', detail: 'sujet, demandeur, bâtiment, coordonnées', kind: 'outil' },
      { label: 'Fiche dans le CRM', detail: "adresse et accès au local compris", kind: 'outil' },
      { label: 'Intervention planifiée', detail: 'agenda Google, rappel par email et SMS', kind: 'controle' },
      { label: "Rapport d'intervention", detail: 'photos par point de contrôle', kind: 'sortie' },
    ],
    note: 'Le rapport client en PDF est encore assemblé hors du CRM, à partir de ses données.',
  },
  videos: [
    {
      src: '/videos/realisations/sos-relevage/tunnel-demande.mp4',
      webm: '/videos/realisations/sos-relevage/tunnel-demande.webm',
      poster: '/images/realisations/sos-relevage/tunnel-demande-poster.webp',
      title: 'Le tunnel de demande, sur le site en ligne',
      description: "Du bouton « Faire une demande » à l'étape des coordonnées, en 14 secondes, sans montage.",
      durationSec: 14,
      uploadDate: '2026-09-25',
      width: 1280,
      height: 800,
      transcript:
        "Depuis la page d'accueil, un clic sur « Faire une demande » ouvre le tunnel en quatre étapes. Le visiteur choisit le sujet (contrôle et entretien), puis son profil (régie, syndic, gérance). À l'étape de l'adresse, il tape les premières lettres et choisit l'adresse officielle proposée par le registre fédéral des bâtiments. La dernière étape demande ses coordonnées. La vidéo s'arrête avant l'envoi.",
    },
  ],
  dataStories: [
    {
      id: 'impressions-google',
      title: 'Impressions Google, en 7 jours glissants',
      unit: 'impressions',
      series: rollingSum(SOS_GSC_DAILY.map((d) => ({ date: d.date, value: d.impressions })), 7),
      annotations: [
        { date: '2026-08-24', label: "Lancement de l'activité" },
        { date: '2026-09-08', label: "Marque dans le titre de l'accueil" },
      ],
      source: 'Search Console',
      sourceKind: 'client',
      capturedAt: '2026-09-25',
      period: 'Du 25 juillet au 23 septembre 2026, chaque point additionne les 7 jours précédents',
      caption:
        "Search Console anonymise plus de la moitié des requêtes de ce site : la courbe compte toutes les impressions, y compris celles dont la requête est cachée.",
    },
  ],
  stack: [
    { label: 'Next.js 15', color: 'chrome' },
    { label: 'Tailwind 4', color: 'teal' },
    { label: 'Supabase', color: 'green' },
    { label: 'Vercel', color: 'violet' },
  ],
  results: [
    {
      metric: 'Pack local Google',
      value: '1er',
      label: 'sur « pompe de relevage genève », et 3e en résultats naturels',
      source: 'Relevé manuel de la page de résultats, depuis Genève',
      sourceKind: 'publique',
      capturedAt: '2026-09-20',
      period: 'relevé unique',
    },
    {
      metric: 'Impressions Google',
      value: "1'802",
      label: 'et 44 clics depuis les premières impressions',
      source: 'Search Console',
      sourceKind: 'client',
      capturedAt: '2026-09-25',
      period: 'du 25 juillet au 23 septembre 2026',
    },
    {
      metric: 'Position moyenne',
      value: '5,0',
      label: "de la page d'accueil, toutes requêtes confondues",
      source: 'Search Console',
      sourceKind: 'client',
      capturedAt: '2026-09-25',
      period: '28 jours, du 27 août au 23 septembre 2026',
    },
  ],
  lessons: [
    "Search Console cache une grande part des requêtes d'un site local : 57 % des impressions de SOS Relevage étaient anonymisées au relevé du 20 septembre. Avant de conclure qu'une requête ne sort pas, nous relevons la page de résultats nous-mêmes, depuis Genève.",
    "Retirer la marque du titre de l'accueil était une erreur : pendant six semaines, Google n'a jamais montré le site sur « sos relevage ». Le nom est revenu en tête du titre le 8 septembre 2026.",
    "Pour un dépannage, le téléphone compte autant que le site : jusqu'au 24 septembre 2026, la fiche Google était la seule des trois du pack local sans numéro.",
  ],
  faq: [
    {
      question: "Pourquoi un CRM sur mesure plutôt qu'un logiciel du marché ?",
      answer:
        "Parce que le site et l'outil du terrain partagent les mêmes données : chaque demande arrive avec l'adresse, l'accès au local et le type d'intervention, et devient une intervention planifiée sans ressaisie. Un logiciel générique aurait obligé à recopier ces informations d'un outil à l'autre.",
    },
    {
      question: 'Le site peut-il être cité par les moteurs de réponse comme ChatGPT ?',
      answer:
        "Chaque page de service s'ouvre sur une réponse de 40 à 60 mots qui nomme l'entreprise, et un fichier llms.txt décrit le site pour les moteurs génératifs. Rien ne garantit une citation, mais ces passages sont écrits pour être repris tels quels.",
    },
    {
      question: 'Où sont hébergées les données des demandes ?',
      answer:
        'Le site est servi par Vercel, avec les fonctions en Europe, et la base de données du CRM est hébergée à Zurich.',
    },
  ],
  highlights: [
    {
      eyebrow: 'Arriver',
      tag: 'UI',
      title: 'Un curseur avant et après, en guise de promesse',
      body: "Le premier écran ne décrit pas le métier, il le montre : le même local technique inondé à gauche, remis en service à droite, et le technicien posé par-dessus. Le curseur suit la souris sans clic et repart de lui-même quand on le lâche. Un titre, une phrase, un bouton rouge pour faire une demande et, en second, la ligne d'urgence.",
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
        "Le rouge porte l'action principale : la demande, ou l'appel quand c'est urgent",
        'Le curseur avant et après réagit au survol, pas seulement au glissement',
      ],
    },
    {
      eyebrow: 'Se reconnaître',
      tag: 'UX',
      title: "Huit signaux pour se diagnostiquer avant d'appeler",
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
        'Prénom, nom, email et téléphone demandés à chaque fois, pour une fiche complète',
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
      { name: 'Bleu SOS', hex: '#186092', role: 'liens, actions secondaires' },
      { name: 'Bleu technique', hex: '#0d4b7b', role: 'survols, profondeur' },
      { name: 'Bleu clair', hex: '#46b0d6', role: 'accents, eau claire' },
      { name: 'Marron eau', hex: '#5f3716', role: 'eaux usées, avant' },
      { name: 'Marron boue', hex: '#97713e', role: 'transition' },
      { name: 'Rouge action', hex: '#a8332a', role: "l'action principale de l'écran" },
    ],
    type: [
      { role: 'titres et texte courant, variable de 200 à 900', family: 'Hubot Sans', sample: 'Spécialiste des pompes de relevage à Genève.' },
      { role: 'étiquettes, numéros de section, pied de page', family: 'JetBrains Mono', sample: '04 · Identification · 8 signaux', mono: true },
    ],
    principles: [
      { title: 'Un seul rouge par écran', body: "Le rouge porte l'action principale : faire une demande en temps normal, appeler quand c'est urgent. Tout le reste est bleu, ce qui rend l'action attendue impossible à manquer." },
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
  relatedArticles: ['seo-local-geneve-2026', 'creer-site-web-pme-suisse-romande', 'site-web-nextjs-vs-wordpress-webflow-2026'],
  liveUrl: 'https://sos-relevage.ch',
}

export default realisation
