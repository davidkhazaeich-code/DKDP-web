import type { Realisation } from './types'

/**
 * cours-informatique.ch : refonte WordPress vers Astro de l'école de cours
 * d'informatique fondée par David à Genève.
 *
 * Accord `interne` : c'est la marque de David, présentée comme telle sur le
 * site lui-même (llms.txt : « école fondée par David Khazaei ») et depuis
 * dkdp.ch/formation-particuliers. La règle « jamais cours-informatique.ch en
 * exemple » ne valait que tant que la production servait WordPress : le site
 * Astro est en production depuis le 01.09.2026.
 *
 * Relevés du 2026-10-01 : historique git de site-v2 (premier commit le
 * 28.03.2026, 396 commits avant la bascule), plan du site en ligne (88 URL,
 * 51 en français et 37 en anglais), .htaccess (88 redirections 301),
 * Lighthouse 12 mobile en local (médiane de trois mesures). Relevé de la page
 * de résultats et du Mode IA de Google du 28.09.2026 (rapport
 * `clients Claude/cours-informatique/seo/SEO-GEO-SEA-2026-09-28.md`).
 *
 * Les clics Search Console ont baissé après la bascule (Suisse : 65 sur les
 * 28 jours d'avant, 47 sur les 28 jours d'après) : ils ne sont pas affichés
 * comme un résultat, et la perte de la page IA est racontée dans les leçons.
 */
const realisation: Realisation = {
  slug: 'cours-informatique-refonte',
  client: {
    name: 'cours-informatique.ch',
    sector: "Cours d'informatique pour particuliers",
    location: 'Genève',
  },
  meta: {
    title: "Refonte WordPress vers Astro d'une école d'informatique pour seniors à Genève",
    titleAccent: 'WordPress vers Astro',
    seoTitle: 'Refonte WordPress vers Astro, école à Genève | DKDP',
    seoDescription:
      "Refonte Astro d'une école d'informatique genevoise : parcours pour seniors, estimateur de prix, 88 redirections, 1er sur Google au relevé.",
    excerpt:
      "Refonte complète de cours-informatique.ch, de WordPress à Astro : un parcours pensé pour les seniors et les débutants, un estimateur de prix en quatre questions, 88 redirections et une page par quartier. 1er sur Google pour « cours informatique genève » au relevé du 28 septembre 2026.",
    dateISO: '2026-09-01',
    publishedISO: '2026-10-01',
    status: 'live',
  },
  domains: ['site-web', 'seo-geo'],
  sector: 'informatique',
  consent: {
    level: 'interne',
    note: "École de cours d'informatique fondée par David Khazaei, présentée comme telle sur son propre site.",
  },
  tags: ['Refonte', 'Astro', 'Migration WordPress', 'UX seniors', 'SEO local', 'GEO'],
  lead:
    "Un site écrit pour celui qui n'ose pas toucher à son ordinateur : un bouton pour appeler, un estimateur de prix en quatre questions, une page par quartier.",
  teaser: [
    'Parcours pensé pour les seniors et les débutants',
    'Estimateur de prix en quatre questions',
    '88 redirections et une page par quartier',
  ],
  answer:
    "Cours-informatique.ch, l'école de cours d'informatique fondée par David Khazaei à Genève, est passée de WordPress à Astro le 1er septembre 2026. Le nouveau site s'adresse d'abord aux seniors et aux débutants : un bouton pour appeler, un estimateur de prix, une page par quartier. Au relevé du 28 septembre 2026, il sortait 1er sur « cours informatique genève ».",
  facts: [
    { label: 'Secteur', value: "Cours d'informatique pour particuliers" },
    { label: 'Lieu', value: 'Genève, Eaux-Vives' },
    { label: 'Mise en ligne', value: '1er septembre 2026' },
    { label: 'Livré', value: 'Refonte, migration, référencement, version anglaise' },
    { label: 'Technologies', value: 'Astro 6, Infomaniak, GitHub Actions' },
  ],
  hero: {
    desktopFull: '/images/realisations/cours-informatique-refonte/desktop.webp',
    mobileFull: '/images/realisations/cours-informatique-refonte/mobile.webp',
    browserUrl: 'cours-informatique.ch',
    desktopView: '/images/realisations/cours-informatique-refonte/hero-desktop.webp',
    mobileView: '/images/realisations/cours-informatique-refonte/hero-mobile.webp',
  },
  mockup: {
    src: '/images/realisations/cours-informatique-refonte/presentation.webp',
    alt: "Site cours-informatique.ch sur ordinateur et téléphone : accueil « Cours d'informatique à Genève pour débutant et senior » et résultat de l'estimateur, 6 à 12 heures pour 840 à 1 680 CHF, vraies captures mises en scène sur une table de salle à manger, avec des lunettes de lecture et une tasse de thé",
    focus: '70% 50%',
  },
  problem: {
    title: "Un public qui hésite à toucher à l'ordinateur, un site devenu lourd à faire évoluer",
    body: "Cours-informatique.ch donne des cours individuels à Genève depuis 2014, à domicile ou dans ses locaux des Eaux-Vives. Son public est d'abord celui qui hésite : des seniors, des débutants, des personnes qui n'osent plus demander de l'aide à leurs proches. Pour eux, un site doit dire en une phrase à qui il s'adresse, et offrir un seul geste évident pour appeler.\n\nL'ancien site WordPress, construit avec Elementor, avait grandi page après page et pesait trop lourd pour ce public. Il était aussi fragile : le 23 août 2026, une mise à jour de WordPress l'a rendu indisponible. La refonte devait transmettre douze ans de référencement au nouveau site, sur une base plus simple à faire évoluer.",
    facts: [
      { label: 'Public', value: 'Seniors, débutants, professionnels' },
      { label: 'Territoire', value: 'Canton de Genève, à domicile' },
      { label: 'Départ', value: 'Site WordPress et Elementor' },
    ],
  },
  approach: {
    title: 'Un site statique, un seul bouton par écran, chaque ancienne adresse redirigée',
    body: `Le site est reconstruit sur Astro 6 en génération statique, sans CMS ni framework CSS : des pages HTML légères, servies par Infomaniak en Suisse et publiées par GitHub Actions à chaque modification. Le parcours est écrit pour un débutant : un titre qui nomme le public, un bouton bleu qui affiche le numéro de téléphone, le bleu réservé à ce qui se clique, un menu plein écran sans accordéon sur mobile, un estimateur de prix en quatre questions et un catalogue filtrable par profil.

Côté référencement, chaque adresse de l'ancien site garde sa place : 88 redirections 301, un code 410 pour les pages d'archives et de test, une page par quartier de Genève reliée à ses trois voisins les plus proches, une version anglaise, des données structurées pour l'école, les cours et les questions fréquentes, et un fichier llms.txt pour les moteurs génératifs.`,
    bullets: [
      'Astro 6 en génération statique, CSS sur mesure, contenu versionné dans le code',
      'Hébergement Infomaniak en Suisse, publication par GitHub Actions en une minute et demie',
      'Un bouton bleu par écran, le numéro de téléphone écrit en clair, WhatsApp en second',
      'Menu plein écran sous 1024 pixels, sans accordéon ni sous-menu caché',
      'Estimateur en quatre questions : cours conseillé, heures et budget',
      'Catalogue filtrable par profil, recherche qui tolère les accents oubliés et les fautes de frappe',
      '88 redirections 301 depuis les adresses WordPress, pages d’archives et de test en 410',
      '14 pages de quartier, chacune reliée aux trois quartiers les plus proches',
      'Version anglaise de 37 pages, JSON-LD LocalBusiness, Course, FAQPage et VideoObject, llms.txt',
      'Demandes mesurées par le site lui-même : formulaire, appel, WhatsApp',
    ],
  },
  videos: [
    {
      src: '/videos/realisations/cours-informatique-refonte/estimateur.mp4',
      webm: '/videos/realisations/cours-informatique-refonte/estimateur.webm',
      poster: '/images/realisations/cours-informatique-refonte/estimateur-poster.webp',
      title: "L'estimateur de prix, sur le site en ligne",
      description: 'Quatre réponses, puis le cours conseillé, la durée et le budget, en 10 secondes, sans montage.',
      durationSec: 10,
      uploadDate: '2026-10-01',
      width: 1280,
      height: 800,
      transcript:
        "Sur la page d'accueil, le visiteur ouvre l'estimation de prix gratuite et répond à quatre questions : senior ou débutant complet, maîtriser son ordinateur, je pars de zéro, 6 à 12 heures. Le résultat conseille le cours d'ordinateur Mac et PC, propose la cybersécurité pour aller plus loin, et estime 6 à 12 heures, soit 840 à 1 680 CHF. Deux boutons suivent : réserver par téléphone ou écrire sur WhatsApp.",
    },
  ],
  stack: [
    { label: 'Astro 6', color: 'orange' },
    { label: 'CSS sur mesure', color: 'teal' },
    { label: 'Infomaniak', color: 'violet' },
    { label: 'GitHub Actions', color: 'chrome' },
  ],
  results: [
    {
      metric: 'Google',
      value: '1er',
      label: 'en résultats naturels sur « cours informatique genève » et « cours informatique à domicile »',
      source: 'Relevé manuel de la page de résultats, depuis Genève',
      sourceKind: 'publique',
      capturedAt: '2026-09-28',
      period: 'relevé unique',
    },
    {
      metric: 'Mode IA de Google',
      value: '5 sur 6',
      label: 'réponses qui citent le site, avec les tarifs exacts',
      source: 'Relevé manuel de six questions dans le Mode IA de Google',
      sourceKind: 'publique',
      capturedAt: '2026-09-28',
      period: 'relevé unique',
    },
    {
      metric: 'Performance mobile',
      value: '99',
      label: "sur 100 dans Lighthouse, premier affichage complet en 2,1 s, aucun décalage de mise en page",
      source: 'Lighthouse 12, mobile, médiane de trois mesures',
      sourceKind: 'dkdp',
      capturedAt: '2026-10-01',
      period: "page d'accueil",
    },
    {
      metric: 'Pages en ligne',
      value: '88',
      label: 'en français et en anglais, dont 16 pages de cours et 14 pages de quartier en français',
      source: 'Plan du site en ligne',
      sourceKind: 'publique',
      capturedAt: '2026-10-01',
    },
  ],
  lessons: [
    "À la bascule, la mesure des demandes s'est arrêtée sans bruit : le gestionnaire de balises écoutait encore les boutons de l'ancien thème WordPress. Pendant trois semaines, aucun appel ni formulaire n'a été compté. Depuis le 21 septembre 2026, le site envoie lui-même ses événements, et nous testons la mesure le jour même de la bascule.",
    "La page sur l'intelligence artificielle a perdu des clics en changeant d'adresse, malgré une redirection 301 propre : l'ancienne URL tournait en position 8 à 9, la nouvelle en position 9 à 10. Sur une prochaine migration, nous garderons l'adresse des pages qui ramènent déjà des clics.",
    "Le script de mesure, 353 Ko, partait au chargement en même temps que l'image principale : sur mobile, le premier affichage complet prenait 4,8 secondes. Chargé après la page, il l'a ramené à 2,78 secondes le 11 septembre 2026. Nous mesurons maintenant chaque script tiers avant la mise en ligne.",
  ],
  faq: [
    {
      question: 'Pourquoi passer de WordPress à Astro pour un site de cours ?',
      answer:
        "Parce que le site n'a pas besoin d'un back-office : il présente des cours, des tarifs et des quartiers qui changent peu. Astro génère des pages HTML statiques, légères, sans base de données à maintenir. Au relevé du 1er octobre 2026, Lighthouse donne 99 sur 100 sur mobile, avec un premier affichage complet en 2,1 secondes.",
    },
    {
      question: 'Comment garder son référencement pendant une refonte ?',
      answer:
        "En redirigeant chaque ancienne adresse vers la page qui répond à la même question : 88 redirections 301 pour cours-informatique.ch, et un code 410 pour les pages d'archives et de test. Le jour de la bascule, il faut aussi vérifier la mesure des demandes : c'est ce qui nous a manqué ici.",
    },
    {
      question: 'Un site peut-il vraiment être pensé pour les seniors ?',
      answer:
        "Oui, par des choix simples : un seul bouton d'action par écran, le numéro de téléphone écrit en toutes lettres, des textes courts, aucun menu caché derrière un accordéon, et un estimateur qui donne le prix sans demander d'adresse email.",
    },
    {
      question: 'Où le site est-il hébergé ?',
      answer: 'Chez Infomaniak, en Suisse. Chaque modification est publiée par GitHub Actions en une minute et demie environ.',
    },
  ],
  showcase: {
    title: 'Les écrans qui portent le site',
    intro: "Cinq écrans, dans l'ordre où un débutant les rencontre. Chacun répond à une question précise : à qui s'adresse ce site, quel cours choisir, combien ça coûte, où cliquer, est-ce qu'on vient chez moi.",
  },
  highlights: [
    {
      eyebrow: 'Arriver',
      tag: 'UI',
      title: 'Un titre qui nomme le public, un bouton qui affiche le numéro',
      body: "Le premier écran parle à une seule personne : celle qui débute. Le titre nomme le public en orange, la phrase dit ce qui va se passer, le formateur s'installe à côté de vous, et le seul bouton bleu affiche le numéro de téléphone en toutes lettres. Sur mobile, la photo passe au-dessus du titre et le bouton d'appel tient toute la largeur.",
      image: {
        src: '/images/realisations/cours-informatique-refonte/hero-desktop.webp',
        alt: "cours-informatique.ch, page d'accueil : titre « Cours d'informatique à Genève pour débutant et senior », note Google 4,9 sur 5, bouton bleu « Prendre rendez-vous au 078 238 20 71 » et trois photos de cours",
        path: '/',
      },
      phone: {
        src: '/images/realisations/cours-informatique-refonte/hero-mobile.webp',
        alt: "cours-informatique.ch sur mobile : photo de cours en haut, titre, note Google et bouton d'appel sur toute la largeur",
      },
      points: [
        "Le bleu ne sert qu'à ce qui se clique, jamais à décorer",
        "La note Google et le nombre d'avis avant le bouton",
        'WhatsApp toujours à portée, en bouton flottant',
      ],
    },
    {
      eyebrow: 'Choisir',
      tag: 'UX',
      title: "Un catalogue qu'on filtre par profil, pas par logiciel",
      body: "Un débutant ne cherche pas « Microsoft 365 », il cherche à ranger ses photos. Le catalogue se filtre d'abord par profil, débutant et senior, professionnel, IA et tech, créatif, puis par une recherche qui comprend les accents oubliés, les fautes de frappe et le vocabulaire courant. Les recherches les plus fréquentes sont proposées en un clic.",
      image: {
        src: '/images/realisations/cours-informatique-refonte/catalogue-desktop.webp',
        alt: "cours-informatique.ch, catalogue « Choisissez votre cours » : filtres par profil avec le nombre de cours, champ de recherche, recherches fréquentes Excel, ChatGPT, iPhone, Photos, Canva et premières cartes de cours",
        path: '/cours/',
      },
      phone: {
        src: '/images/realisations/cours-informatique-refonte/catalogue-mobile.webp',
        alt: 'cours-informatique.ch sur mobile : les filtres du catalogue, la recherche et le tri, puis la première carte de cours',
      },
      points: [
        'Quatre profils, le nombre de cours affiché sur chaque filtre',
        'Recherche reprise le 2 septembre 2026, testée sur 41 requêtes réalistes',
        'Excel, ChatGPT, iPhone, Photos : les recherches fréquentes en raccourcis',
      ],
    },
    {
      eyebrow: 'Estimer',
      tag: 'UX',
      title: "Le budget en quatre questions, avant même d'appeler",
      body: "La question qu'un débutant n'ose pas poser au téléphone, c'est le prix. L'estimateur la pose à sa place : situation, envie, niveau, durée souhaitée. Il répond par un cours conseillé, un second pour aller plus loin, une fourchette d'heures et un budget calculé sur les vrais tarifs, puis propose d'appeler ou d'écrire sur WhatsApp.",
      image: {
        src: '/images/realisations/cours-informatique-refonte/estimateur-desktop.webp',
        alt: "cours-informatique.ch, résultat de l'estimateur : cours d'ordinateur Mac et PC conseillé, cybersécurité pour aller plus loin, estimation de 6 à 12 heures pour 840 à 1 680 CHF, boutons téléphone et WhatsApp",
        path: '/',
      },
      phone: {
        src: '/images/realisations/cours-informatique-refonte/estimateur-mobile.webp',
        alt: "cours-informatique.ch sur mobile : le même résultat de l'estimateur, cours conseillés, durée et budget",
      },
      steps: ['Situation', 'Envie', 'Niveau', 'Durée'],
      points: [
        "Budget calculé sur la grille publique : 140, 150 ou 200 CHF de l'heure",
        "Aucune adresse email demandée pour voir le résultat",
        'Réservation par téléphone ou WhatsApp, depuis le résultat',
      ],
    },
    {
      eyebrow: 'Naviguer',
      tag: 'UX',
      title: 'Un menu plein écran, sans accordéon à déplier',
      body: "Sur ordinateur, le menu des cours s'ouvre en quatre colonnes par profil, chaque cours avec les logos des outils qu'on y apprend. Sous 1024 pixels, il devient un écran entier : les horaires en haut, les raccourcis en tuiles, tous les cours visibles en faisant défiler, et les boutons d'appel et WhatsApp fixés en bas. Aucun sous-menu caché à deviner.",
      image: {
        src: '/images/realisations/cours-informatique-refonte/mega-desktop.webp',
        alt: "cours-informatique.ch, menu « Nos cours individuels » ouvert : quatre colonnes, débutants et seniors, professionnels, IA et tech, créatif et réseaux, avec les logos des outils",
        path: '/',
      },
      phone: {
        src: '/images/realisations/cours-informatique-refonte/menu-mobile.webp',
        alt: "cours-informatique.ch sur mobile : menu plein écran avec les horaires, quatre raccourcis en tuiles, la liste des cours et les boutons d'appel et WhatsApp en bas",
      },
      points: [
        'Aucun accordéon : tout se voit en faisant défiler',
        "Les horaires d'ouverture avant les liens",
        "Appeler et WhatsApp restent en bas de l'écran",
      ],
    },
    {
      eyebrow: 'Être trouvé',
      tag: 'SEO',
      title: 'Une page par quartier, reliée à ses voisins',
      body: "Le formateur se déplace dans tout le canton, mais on cherche un cours près de chez soi. Chaque quartier a sa page : le temps de trajet depuis le bureau, les lignes de tram et de bus, les repères du quartier sur une vue aérienne de swisstopo et le prix du déplacement. En bas, les trois quartiers les plus proches, calculés à partir des coordonnées, relient les pages entre elles.",
      image: {
        src: '/images/realisations/cours-informatique-refonte/quartier-voisins-desktop.webp',
        alt: 'cours-informatique.ch, page Eaux-Vives : vue aérienne swisstopo avec le repère du bureau, temps de trajet, lignes de tram et de bus, repères du quartier, puis les quartiers voisins Champel, Pâquis et Plainpalais',
        path: '/cours-informatique-eaux-vives/',
      },
      phone: {
        src: '/images/realisations/cours-informatique-refonte/quartier-mobile.webp',
        alt: "cours-informatique.ch sur mobile : la page des Eaux-Vives, photo de cours, titre « Cours d'informatique pour débutant aux Eaux-Vives » et bouton d'appel",
      },
      points: [
        '14 quartiers en français, autant en anglais',
        "Une vue aérienne swisstopo plutôt qu'une carte Google",
        'Trois liens « quartiers voisins » par page, calculés par distance',
      ],
    },
  ],
  direction: {
    intro:
      "La charte de la marque, resserrée pour la refonte et mesurée dans le code du site : un orange chaleureux qui porte les titres, des fonds pêche qui laissent respirer, un bleu réservé à l'action. Les titres sont composés en RuckSack Bold, une police ronde et épaisse, dans des pastilles orange.",
    logo: { src: '/images/realisations/cours-informatique-refonte/logo-blanc.webp', alt: 'Logo cours-informatique.ch sur fond orange : la mascotte, un ordinateur portable à lunettes qui salue, et le nom du site en blanc' },
    logoLight: { src: '/images/realisations/cours-informatique-refonte/logo.webp', alt: 'Logo cours-informatique.ch sur fond clair : la mascotte et le nom du site, le « .ch » en orange' },
    tagline: '« L’informatique en toute simplicité »',
    theme: { tile: '#E56001', accent: '#FFE8D4', lightTile: '#FFF3E8', logoWidth: 300 },
    palette: [
      { name: 'Orange', hex: '#E56001', role: 'pastilles de titre, accents, fonds de section' },
      { name: 'Pêche', hex: '#FFF3E8', role: 'fonds qui respirent' },
      { name: 'Pêche soutenu', hex: '#FFE8D4', role: 'cartes, encarts, bulles' },
      { name: 'Bleu action', hex: '#1A70E0', role: 'boutons et liens, rien d’autre' },
      { name: 'Vert sauge', hex: '#6B9E7D', role: 'coches et badges, en signal' },
      { name: 'Charbon', hex: '#1E1E1E', role: 'titres et texte' },
      { name: 'Bleu mascotte', hex: '#5BA8D9', role: "l'écran de la mascotte" },
    ],
    type: [
      { role: 'texte courant, boutons, formulaires', family: 'Roboto', sample: "Votre formateur s'installe à côté de vous et vous explique chaque étape." },
      { role: 'notes manuscrites, bulles de la mascotte', family: 'Caveat', sample: 'On commence toujours par un café et un sourire.' },
    ],
    principles: [
      { title: "Le bleu, c'est ce qui se clique", body: "Le bleu est réservé aux boutons et aux liens. Un senior qui voit du bleu sait qu'il peut appuyer, et ne cherche jamais l'action dans une décoration." },
      { title: 'Des fonds qui respirent', body: "Entre le blanc et l'orange, des fonds pêche et des grilles de cahier adoucissent la lecture des longues pages." },
      { title: 'Le vert sauge en signal seulement', body: 'Coches, badges, petites icônes, jamais un fond de section : le signal reste lisible parce qu’il reste rare.' },
      { title: 'Des titres en pastille', body: "Chaque section s'ouvre sur un titre blanc posé dans une pastille orange : l'œil retrouve le début d'un bloc sans effort." },
      { title: 'Une mascotte qui guide', body: "L'ordinateur à lunettes salue, pointe, réfléchit : il annonce une étape ou une question, il ne remplit jamais un vide." },
      { title: 'Le numéro en toutes lettres', body: "Le téléphone reste le premier canal de ce public : le numéro est écrit sur le bouton, jamais caché derrière un « Contactez-nous »." },
    ],
  },
  seo: {
    intro:
      "Le référencement de cours-informatique.ch avait douze ans d'historique. La refonte devait le transmettre au nouveau site, puis l'élargir : une page par intention, une page par quartier, et des réponses écrites pour être reprises par les moteurs génératifs.",
    serp: {
      siteName: 'Cours-Informatique.ch',
      url: 'https://cours-informatique.ch',
      title: "Cours d'informatique à Genève pour débutant et senior",
      description:
        "Cours d'informatique individuels à Genève, chez vous ou aux Eaux-Vives. Dès 140 CHF/h, sans engagement. 4,9/5 sur 86 avis. 078 238 20 71.",
      favicon: '/images/realisations/cours-informatique-refonte/mascotte.webp',
    },
    serpNote:
      "Le titre nomme le public, la description donne le tarif, la note et le numéro : tout ce qu'un débutant veut savoir avant de cliquer. Les deux sont mesurés en pixels, comme Google les affiche.",
    intents: [
      { label: 'Cours individuels', path: '/cours/' },
      { label: 'Seniors', path: '/cours-informatique-seniors-geneve/' },
      { label: 'Intelligence artificielle', path: '/cours/intelligence-artificielle/' },
      { label: 'Excel', path: '/cours/excel/' },
      { label: 'Quartiers', path: '/cours-informatique-eaux-vives/' },
      { label: 'Cours en groupe', path: '/cours-en-groupe/' },
      { label: 'Entreprises', path: '/cours-entreprise/' },
      { label: 'Dépannage', path: '/depannage-informatique-domicile-geneve/' },
    ],
    schemas: ['LocalBusiness', 'Course', 'CourseInstance', 'FAQPage', 'VideoObject', 'BreadcrumbList', 'BlogPosting', 'WebSite'],
    geo: [
      {
        title: 'Des tarifs écrits en clair',
        body: "140, 150 et 200 CHF de l'heure, écrits sur les pages, dans les questions fréquentes et dans le llms.txt. Au relevé du 28 septembre 2026, le Mode IA de Google citait le site dans cinq réponses sur six, tarifs exacts compris.",
      },
      {
        title: 'Une vraie réponse, même quand elle ne vend pas',
        body: "« Existe-t-il des cours d'informatique gratuits à Genève ? » reçoit une réponse sur l'accueil : les permanences numériques gratuites de la Ville d'abord, puis ce qu'un cours individuel apporte en plus.",
      },
      {
        title: 'Aucun chiffre sans source',
        body: "Les compteurs de clients et les badges « certifié » sans source ont été retirés le 21 septembre 2026, du site comme du llms.txt : un moteur qui croise ses sources cite ce qu'il peut vérifier.",
      },
    ],
  },
  relatedArticles: ['refonte-site-web-quand-pourquoi', 'seo-local-geneve-2026', 'core-web-vitals-2026-guide-complet'],
  liveUrl: 'https://cours-informatique.ch',
}

export default realisation
