import type { Realisation } from './types'

/**
 * MKR Caucasian Camp : marque, site bilingue, candidature et back-office pour
 * des camps de lutte au Daghestan et de MMA en Tchetchenie.
 *
 * Client nomme. DKDP et MKR sont partenaires (confirme par David le
 * 29.09.2026) : la proposition de partenariat DKDP-2026-MKR-05 du 12.06.2026
 * porte la clause « DKDP se reserve le droit de mentionner le projet dans son
 * portfolio, sauf demande contraire ecrite ». La meme proposition engage les
 * deux parties a la confidentialite sur les donnees clients, les chiffres et
 * les orientations strategiques : aucun chiffre prive de MKR n'est publie ici
 * (Search Console, GA4, Google Ads, candidatures). Les resultats sont des
 * releves publics, dates, de la page de resultats Google et du plan du site.
 *
 * Visuels : captures du site en ligne du 29.09.2026 (traceurs coupes), videos
 * enregistrees sans envoi de formulaire, back-office capture sur son faux
 * backend local (`npm run admin:dev` du repo MKR, donnees fictives), email
 * rendu avec un candidat fictif. Aucune photo ni video du camp n'est presentee
 * ici comme une prise de vue de DKDP : le teaser documentaire est filme et
 * realise par Skudy, credite. Le film de presentation n'est montre qu'a
 * partir de la presentation du fondateur (aucune image d'athlete connu).
 */
const realisation: Realisation = {
  slug: 'mkr-caucasian-camp',
  client: {
    name: 'MKR Caucasian Camp',
    logo: '/images/realisations/mkr-caucasian-camp/logo-white.webp',
    sector: 'Camps de lutte et de MMA',
    location: 'Daghestan et Tchétchénie',
    country: null,
  },
  meta: {
    title: "Marque, site bilingue et plateforme d'inscription pour un camp de lutte et de MMA",
    titleAccent: "plateforme d'inscription",
    seoTitle: 'Marque et site bilingue sur mesure pour un camp sportif | DKDP',
    seoDescription:
      "Logo, charte, site Next.js en français et en anglais, candidature en ligne et back-office sur mesure pour un camp de lutte et de MMA au Caucase.",
    excerpt:
      "Pour MKR Caucasian Camp, qui organise des camps de lutte au Daghestan et de MMA en Tchétchénie, nous avons créé la marque, le site Next.js en français et en anglais, la candidature en ligne, le back-office qui suit chaque dossier jusqu'au départ, les emails, le film de présentation et les campagnes Google Ads.",
    dateISO: '2026-05-27',
    publishedISO: '2026-09-29',
    status: 'live',
  },
  domains: ['site-web', 'identite-visuelle', 'application', 'video', 'publicite', 'seo-geo'],
  sector: 'sport',
  consent: {
    level: 'nomme',
    evidence: {
      kind: 'clause-contrat',
      date: '2026-06-12',
      reference:
        "Proposition de partenariat DKDP-2026-MKR-05 du 12.06.2026, partenariat en vigueur (confirmé par David le 29.09.2026) : « DKDP se réserve le droit de mentionner le projet dans son portfolio, sauf demande contraire écrite ».",
    },
    note: 'Confidentialité réciproque sur les données clients, les chiffres et les orientations stratégiques (même proposition) : aucun chiffre privé de MKR publié, back-office montré sur des données fictives.',
  },
  tags: ['Identité visuelle', 'Next.js', 'Site bilingue', 'Candidature en ligne', 'Back-office sur mesure', 'Google Ads'],
  lead:
    'Nous avons tout construit, de la marque au film : le site en deux langues, la candidature en ligne, le back-office, les emails et la publicité Google.',
  answer:
    "MKR Caucasian Camp organise des camps de lutte au Daghestan et de MMA en Tchétchénie. Depuis avril 2026, nous avons tout construit : la marque, le site bilingue, l'inscription, le back-office, les emails, le film et la publicité Google. Au relevé du 29 septembre 2026, le site sortait 1er sur « camp lutte daghestan ».",
  facts: [
    { label: 'Secteur', value: 'Sport, camps de lutte et de MMA' },
    { label: 'Destinations', value: 'Daghestan et Tchétchénie' },
    { label: 'En ligne', value: 'Mai 2026, premier commit le 4 avril' },
    { label: 'Livré', value: 'Marque, site, inscriptions, back-office, emails, vidéo, publicité' },
    { label: 'Technologies', value: 'Next.js 16, Supabase, Resend, Vercel' },
  ],
  hero: {
    desktopFull: '/images/realisations/mkr-caucasian-camp/desktop.webp',
    mobileFull: '/images/realisations/mkr-caucasian-camp/mobile.webp',
    browserUrl: 'mkrcamp.com',
    desktopView: '/images/realisations/mkr-caucasian-camp/hero-desktop.webp',
    mobileView: '/images/realisations/mkr-caucasian-camp/hero-mobile.webp',
  },
  mockup: {
    src: '/images/realisations/mkr-caucasian-camp/presentation.webp',
    alt: "Site MKR Caucasian Camp sur ordinateur et téléphone : premier écran « Entraîne-toi au milieu des champions » et choix de l'inscription, vraies captures mises en scène dans une salle de lutte",
    focus: '74% 50%',
  },
  problem: {
    title: "Vendre un camp au bout du monde à des athlètes qui n'y sont jamais allés",
    body: "MKR Caucasian Camp emmène des lutteurs et des combattants de MMA s'entraîner dans les salles du Caucase, au Daghestan et en Tchétchénie. Son fondateur, Ruslan Mukhtarov, est tchétchène, né au Daghestan, et ancien membre de l'équipe olympique de France de lutte, passé par l'INSEP de 2012 à 2016 : il ouvre des portes que peu d'étrangers franchissent.\n\nAu départ, le projet n'avait ni marque, ni site, ni moyen de s'inscrire. Il fallait rassurer sur une destination qui inquiète, expliquer une logistique de visa et de transferts, parler aussi bien aux francophones qu'aux anglophones, puis transformer la curiosité en candidature, sans jamais promettre plus que ce que le camp tient.",
    facts: [
      { label: 'Public', value: 'Combattants adultes, familles, clubs' },
      { label: 'Langues', value: 'Français et anglais' },
      { label: 'Départ', value: 'Aucune marque, aucun site, aucun outil' },
    ],
  },
  approach: {
    title: "Une marque, un site et un outil d'inscription, conçus d'un seul tenant",
    body: `Tout part de la marque. Le M de MKR dessine une chaîne de sommets, et la charte, baptisée « Mineral Brutalism », pose le noir de la roche, l'orange du soleil sur un sommet et un rouge réservé aux actions. Le site Next.js 16 en découle, en français et en anglais, avec une page par discipline, par destination et par format de camp, des sessions calculées qui se renouvellent seules et une candidature qui adapte ses questions au format choisi.

Derrière, un back-office sur mesure suit chaque dossier, de la visio de sélection au départ : prochaine étape, contrat en PDF, paiement, relances et WhatsApp du candidat à portée de main. Les emails partent du domaine du camp, le suivi Google Ads remonte jusqu'à la candidature, et le film de présentation, dont nous avons écrit le script et briefé le monteur, ouvre la page d'accueil.`,
    bullets: [
      'Logo, charte « Mineral Brutalism », typographies Teko et Barlow, versions claire et sombre',
      'Site Next.js 16 en français et en anglais : 36 pages par langue, statiques, balises hreflang',
      "Sessions calculées : chacune sort des inscriptions le jour du départ, et la même saison de l'année suivante la remplace",
      'Candidature en cinq étapes pour quatre formats (session, sur mesure, famille, club), prix calculé en direct, visio de sélection réservée en ligne',
      'Back-office installable : à faire du jour, dossiers filtrables, prochaine étape, contrats PDF, paiements, sessions, partenaires',
      'Emails au candidat en deux langues avec le WhatsApp direct du fondateur, accusé de réception du formulaire de contact',
      'Film de présentation en français et en anglais, horizontal et vertical : script, brief du monteur, intégration au site',
      'Google Ads : quatre conversions, Consent Mode v2, chaque candidature rattachée à sa campagne',
      'SEO et GEO : données structurées, llms.txt en deux langues, huit articles de blog, guide du Caucase à télécharger',
      'Affiche A3 pour les salles partenaires, kit de lancement Instagram, couvertures du teaser documentaire',
    ],
  },
  flow: {
    title: 'De la première visite au départ du camp',
    intro: "Ce que devient une personne qui découvre le camp, jusqu'à son départ.",
    steps: [
      { label: 'Annonce ou recherche Google', detail: 'la campagne reste notée sur la candidature', kind: 'source' },
      { label: 'Site en français ou en anglais', detail: 'disciplines, destinations, sessions et prix', kind: 'outil' },
      { label: 'Candidature en cinq étapes', detail: 'questions adaptées au format choisi', kind: 'outil' },
      { label: 'Visio de sélection', detail: 'créneau réservé en ligne avec le fondateur', kind: 'controle' },
      { label: 'Contrat et virement', detail: 'contrat PDF généré depuis le back-office', kind: 'controle' },
      { label: 'Départ au Caucase', detail: 'rappels, email avant le départ, WhatsApp', kind: 'sortie' },
    ],
    note: 'Le paiement se fait par virement : il se note dans le back-office, qui passe alors le dossier en « Soldée ».',
  },
  videos: [
    {
      src: '/videos/realisations/mkr-caucasian-camp/tunnel-inscription.mp4',
      webm: '/videos/realisations/mkr-caucasian-camp/tunnel-inscription.webm',
      poster: '/images/realisations/mkr-caucasian-camp/tunnel-inscription-poster.webp',
      title: 'La candidature, sur le site en ligne',
      description: "Du choix du format à l'étape Identité, en 14 secondes, sans montage. L'envoi est bloqué : aucune candidature n'est partie.",
      durationSec: 14,
      uploadDate: '2026-09-29',
      width: 1280,
      height: 800,
      transcript:
        "Sur la page d'inscription, le visiteur choisit les sessions officielles, puis la session d'hiver 2027, la lutte au Daghestan et deux semaines. Le récapitulatif affiche aussitôt le camp, la session, la durée et le total estimé. À l'étape Identité, l'indicatif du pays du navigateur est déjà proposé, ici la Suisse, et le visiteur tape un prénom, un nom et une adresse email fictifs. La vidéo s'arrête avant l'envoi.",
    },
    {
      src: '/videos/realisations/mkr-caucasian-camp/film-salle-de-cinema.mp4',
      webm: '/videos/realisations/mkr-caucasian-camp/film-salle-de-cinema.webm',
      poster: '/images/realisations/mkr-caucasian-camp/film-salle-de-cinema-poster.webp',
      title: "Le film, lancé depuis l'accueil",
      description: "« Voir la vidéo de présentation » fait défiler la page jusqu'au film, puis la salle s'éteint autour de l'écran.",
      durationSec: 12,
      uploadDate: '2026-09-29',
      width: 1280,
      height: 800,
      transcript:
        "Depuis le premier écran, un clic sur « Voir la vidéo de présentation » fait défiler la page jusqu'à la section du film, qui démarre aussitôt pendant que tout s'assombrit autour de l'écran. Pour cet enregistrement sans le son, le film reprend à la présentation du fondateur : le logo sur un village du Daghestan, puis Ruslan Mukhtarov qui se présente, tchétchène né au Daghestan et ancien de l'équipe de France de lutte.",
    },
    {
      src: '/videos/realisations/mkr-caucasian-camp/accueil-defilement.mp4',
      webm: '/videos/realisations/mkr-caucasian-camp/accueil-defilement.webm',
      poster: '/images/realisations/mkr-caucasian-camp/accueil-defilement-poster.webp',
      title: "L'accueil, en défilant",
      description: 'Du premier écran au choix du format, avec les crêtes de montagne entre les sections.',
      durationSec: 12,
      uploadDate: '2026-09-29',
      width: 1280,
      height: 800,
      transcript:
        "Le premier écran fait défiler les prochaines sessions et leurs places restantes, sur une vidéo en fond. En descendant, on passe la section du film, les six prestations comprises sur place, puis le parcours en cinq étapes, de la candidature à l'immersion, jusqu'au choix du format. Une chaîne de montagnes dessinée fait la transition d'une section à l'autre.",
    },
  ],
  stack: [
    { label: 'Next.js 16', color: 'chrome' },
    { label: 'next-intl', color: 'teal' },
    { label: 'Supabase', color: 'green' },
    { label: 'Resend', color: 'blue' },
    { label: 'GSAP', color: 'amber' },
    { label: 'Vercel', color: 'violet' },
  ],
  results: [
    {
      metric: 'Google, « camp mma tchétchénie »',
      value: '1er',
      label: 'et aussi 2e, 3e et 5e : quatre des cinq premiers résultats sont des pages du site',
      source: 'Relevé manuel de la page de résultats google.ch, depuis Genève',
      sourceKind: 'publique',
      capturedAt: '2026-09-29',
      period: 'relevé unique',
    },
    {
      metric: 'Google, « camp lutte daghestan »',
      value: '1er',
      label: "avec la page de la destination, et 3e avec la page d'accueil",
      source: 'Relevé manuel de la page de résultats google.ch, depuis Genève',
      sourceKind: 'publique',
      capturedAt: '2026-09-29',
      period: 'relevé unique',
    },
    {
      metric: 'Google en anglais, « dagestan wrestling camp »',
      value: '2e',
      label: 'avec la version anglaise du site',
      source: 'Relevé manuel de la page de résultats google.ch en anglais, depuis Genève',
      sourceKind: 'publique',
      capturedAt: '2026-09-29',
      period: 'relevé unique',
    },
    {
      metric: 'Pages publiées',
      value: '72',
      label: '36 pages en français et leurs 36 versions anglaises, déclarées dans le plan du site',
      source: 'Plan du site mkrcamp.com (sitemap.xml)',
      sourceKind: 'publique',
      capturedAt: '2026-09-29',
      period: 'relevé unique',
    },
  ],
  lessons: [
    "Régénérer le site chaque heure, simplement pour faire basculer quatre sessions par an, réécrivait toutes les pages en continu et devenait le premier poste de la facture d'hébergement. Depuis le 23 septembre 2026, le site est statique, et une tâche planifiée ne le régénère que le jour où une session change.",
    "Un seul mot peut brider une campagne : les premières annonces promettaient de s'occuper du visa, et Google les a restreintes au titre de sa règle sur les documents officiels. Nous les avons réécrites sans ce mot, et nous relisons désormais chaque annonce avec cette règle en tête.",
    "Les fonctions serveur tournaient par défaut à Washington, alors que la base de données est à Francfort. En les rapprochant le 31 juillet 2026, nous avons fait passer une page du back-office de 205 à 118 millisecondes.",
    "Lors de nos tests, un email transactionnel illustré d'une grande photo tombait dans les indésirables chez Infomaniak, alors que la version légère arrivait en boîte de réception sur Gmail. Les emails du camp restent donc sobres, avec un seul bouton vert pour WhatsApp.",
  ],
  faq: [
    {
      question: 'Pourquoi un site bilingue pour un camp au Caucase ?',
      answer:
        "Parce que les participants viennent de France, de Suisse et de Belgique autant que du Royaume-Uni ou d'Amérique du Nord. Chaque page existe dans les deux langues avec sa propre adresse, et la candidature, les emails et le back-office suivent la langue du candidat.",
    },
    {
      question: 'Comment les sessions se mettent-elles à jour sans intervention ?',
      answer:
        "Quatre gabarits de saison calculent les dates. Une session sort des inscriptions le jour du départ, la même saison de l'année suivante la remplace, et une tâche planifiée régénère le site ce jour-là, sans saisie ni redéploiement.",
    },
    {
      question: "Que se passe-t-il quand quelqu'un candidate ?",
      answer:
        "Le candidat reçoit un email qui l'invite à réserver sa visio de sélection, avec le WhatsApp du fondateur. De son côté, le fondateur reçoit la candidature avec la session choisie dans l'objet, puis le back-office range le dossier dans la bonne file : visio à tenir, dossier à trancher, contrat à envoyer ou paiement attendu.",
    },
    {
      question: 'Pouvez-vous construire le même ensemble pour une autre activité ?',
      answer:
        "Oui. La marque, le site, l'inscription et l'outil de suivi se conçoivent ensemble pour un club, un stage, un séjour ou un événement sportif : nous partons de votre parcours d'inscription réel, puis nous construisons ce qui manque.",
    },
  ],
  showcase: {
    title: 'Les écrans qui portent le camp',
    intro:
      "Sept écrans, dans l'ordre où un athlète les rencontre : arriver, voir le film, choisir son format, candidater, parler au fondateur, comprendre où il va. Le dernier appartient au fondateur, qui suit chaque dossier depuis son back-office.",
  },
  highlights: [
    {
      eyebrow: 'Arriver',
      tag: 'UI',
      title: 'Un premier écran qui annonce le terrain',
      body: "Le premier écran pose la promesse en trois lignes, « Entraîne-toi au milieu des champions », sur une vidéo en fond. À droite, une carte fait défiler les prochaines sessions avec leurs places restantes et leur prix d'appel. Seuls deux boutons se disputent l'attention : postuler, ou voir le film.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/hero-desktop.webp',
        alt: "MKR Caucasian Camp, page d'accueil : titre « Entraîne-toi au milieu des champions », boutons « Postuler au camp » et « Voir la vidéo de présentation », carte de la session de février 2027 avec les places restantes",
        path: '/',
      },
      phone: {
        src: '/images/realisations/mkr-caucasian-camp/hero-mobile.webp',
        alt: "MKR Caucasian Camp sur mobile : le même titre, les deux boutons empilés et la bulle WhatsApp",
      },
      points: [
        'Chaque session affiche ses places restantes par discipline, lues en direct',
        "Le rouge ne sert qu'au bouton pour postuler, l'orange souligne le mot qui compte",
        'La bulle WhatsApp du fondateur accompagne toutes les pages du site',
      ],
    },
    {
      eyebrow: 'Voir avant de partir',
      tag: 'UX',
      title: 'Une salle de cinéma dans la page',
      body: "Le film de présentation occupe la deuxième section de l'accueil. Lancé depuis le premier écran, il fait défiler la page jusqu'à lui, puis la salle s'éteint autour de l'écran pendant la lecture. Sur téléphone, une version verticale prend le relais avec ses propres sous-titres, un bouton pour le son et un autre pour le plein écran.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/film-desktop.webp',
        alt: "MKR Caucasian Camp, film de présentation en lecture dans la page : le fondateur Ruslan Mukhtarov et un entraîneur, sous-titre « L'objectif, c'est de vous faire vivre une immersion réelle »",
        path: '/',
      },
      phone: {
        src: '/images/realisations/mkr-caucasian-camp/film-mobile.webp',
        alt: 'MKR Caucasian Camp sur mobile : la version verticale du film, avec les boutons du son et du plein écran',
      },
      points: [
        "Rien ne se télécharge avant le clic : le film ne ralentit pas l'affichage de la page",
        'La lecture se met en pause quand on quitte la section',
        'Deux langues et deux formats : français et anglais, horizontal et vertical',
      ],
    },
    {
      eyebrow: 'Choisir sa façon de venir',
      tag: 'UX',
      title: "Quatre formats, une seule porte d'entrée",
      body: "Avant la moindre question, la page d'inscription fait choisir un format : les sessions officielles, un camp sur mesure, le camp en famille ou un club. Chaque carte dit pour qui, à quelles dates et à partir de combien de personnes, puis le formulaire qui suit s'adapte au format retenu.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/inscription-choix-desktop.webp',
        alt: "MKR Caucasian Camp, page « Choisis ton inscription » : quatre cartes, sessions officielles, sur mesure, famille, club et groupe, avec dates, durée et nombre de personnes",
        path: '/inscription',
      },
      phone: {
        src: '/images/realisations/mkr-caucasian-camp/inscription-choix-mobile.webp',
        alt: "MKR Caucasian Camp sur mobile : le choix du format d'inscription, cartes empilées",
      },
    },
    {
      eyebrow: 'Candidater',
      tag: 'UX',
      title: 'Une candidature en cinq étapes, prix affiché en direct',
      body: "La candidature avance en cinq étapes : le camp, l'identité, l'expérience, la santé, puis la confirmation. Dès le premier choix, un récapitulatif affiche la discipline, la session, la durée et le total estimé, recalculé à chaque clic. Une fois la candidature envoyée, l'email de confirmation part aussitôt : il invite à réserver la visio de sélection et donne le WhatsApp du fondateur.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/inscription-camp-desktop.webp',
        alt: "MKR Caucasian Camp, étape 1 de la candidature « Quelle session, quelle discipline ? » : quatre sessions de l'automne 2026 à l'été 2027, puis le choix entre lutte et MMA",
        path: '/inscription',
      },
      phone: {
        src: '/images/realisations/mkr-caucasian-camp/email-confirmation-mobile.webp',
        alt: "L'email de confirmation reçu sur téléphone par un candidat fictif : « Réserve ta visio avec Ruslan », récapitulatif du camp et bouton de réservation",
      },
      steps: ['Le camp', 'Identité', 'Expérience', 'Santé', 'Confirmation'],
      points: [
        'Le niveau exigé pour le MMA en Tchétchénie est vérifié dans le formulaire',
        'Un champ caché et un délai minimal écartent les robots, sans captcha',
        "Chaque candidature garde la trace de la campagne qui l'a amenée",
      ],
    },
    {
      eyebrow: 'Parler au fondateur',
      tag: 'UX',
      title: 'Le fondateur à un geste, sur toutes les pages',
      body: "Un camp au Caucase soulève des questions qu'un formulaire ne règle pas. La bulle WhatsApp ouvre donc un panneau avec la photo de Ruslan Mukhtarov et un message d'accueil ; sur ordinateur, un QR code permet de poursuivre la conversation sur son téléphone. Le même bouton WhatsApp revient dans les emails envoyés aux candidats.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/whatsapp-desktop.webp',
        alt: "MKR Caucasian Camp, panneau WhatsApp ouvert sur l'accueil : photo et nom de Ruslan Mukhtarov, message d'accueil, QR code et bouton « Ouvrir WhatsApp »",
        path: '/',
      },
      phone: {
        src: '/images/realisations/mkr-caucasian-camp/whatsapp-mobile.webp',
        alt: 'MKR Caucasian Camp sur mobile : le panneau WhatsApp ouvert, sans QR code, avec le bouton vert',
      },
      points: [
        'Un numéro défini à un seul endroit du code, pour le site comme pour les emails',
        "Le QR code n'apparaît que sur ordinateur, où WhatsApp n'est pas toujours installé",
        "La bulle s'efface pendant la candidature, pour ne pas distraire le candidat",
      ],
    },
    {
      eyebrow: "Comprendre où l'on va",
      tag: 'Contenu',
      title: "Des pages qui répondent à l'inquiétude",
      body: "Partir au Daghestan ou en Tchétchénie inquiète, et la réponse ne tient pas dans un slogan. Chaque destination a donc sa page, avec des faits, les salles partenaires et l'accès depuis Istanbul, tandis qu'une page logistique détaille le visa, les transferts et le budget total. Le blog complète avec des guides, dont un sur la sécurité, mis à jour pour 2026.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/daghestan-desktop.webp',
        alt: "MKR Caucasian Camp, page destination Daghestan : « La terre qui forge les champions », faits sur la région et le camp de lutte",
        path: '/destinations/dagestan',
      },
      points: [
        'Une page par destination, avec des faits vérifiables et sa propre FAQ',
        'Le budget du voyage chiffré poste par poste sur la page logistique',
        'Un guide du Caucase à télécharger contre une adresse email',
      ],
    },
    {
      eyebrow: 'Côté coulisses',
      tag: 'Outil',
      title: "Un back-office qui dit quoi faire aujourd'hui",
      body: "Le fondateur n'a pas à chercher ses dossiers : l'accueil du back-office les range par action, qu'il s'agisse d'une visio à trancher, d'un paiement attendu ou d'un contrat à envoyer, avec les visios du jour et le prochain départ à côté. Chaque fiche affiche ensuite la prochaine étape et ses boutons, des raccourcis clavier et le WhatsApp du candidat. Les captures viennent du jeu de données fictives qui sert à tester l'outil.",
      image: {
        src: '/images/realisations/mkr-caucasian-camp/admin-a-faire-desktop.webp',
        alt: "Back-office MKR en thème sombre, données fictives : page « À faire » avec les visios passées à trancher, les paiements attendus et les contrats à envoyer, prochain départ et visios du jour à droite",
        path: '/admin',
      },
      phone: {
        src: '/images/realisations/mkr-caucasian-camp/admin-fiche-mobile.webp',
        alt: "Back-office MKR sur téléphone, données fictives : fiche d'un candidat avec la prochaine étape et ses boutons",
      },
      points: [
        'Contrat PDF généré et envoyé depuis la fiche, dans la langue du candidat',
        'Une vue par session, avec les places occupées par discipline',
        'Installable sur téléphone, en thème clair ou sombre',
      ],
    },
  ],
  direction: {
    intro:
      "Une identité créée de zéro et baptisée « Mineral Brutalism » : le noir de la roche domine, l'orange du soleil qui frappe un sommet signe la marque, et le rouge ne sert qu'à l'action. Le M de MKR dessine une chaîne de sommets, du rouge à l'orange, qui revient partout, du site au back-office.",
    logo: {
      src: '/images/realisations/mkr-caucasian-camp/logo-white.webp',
      alt: 'Logo MKR Caucasian Camp pour fond sombre : le M dessiné en sommets rouges et orange, les lettres KR et CAUCASIAN CAMP en blanc',
    },
    logoLight: {
      src: '/images/realisations/mkr-caucasian-camp/logo-dark.webp',
      alt: 'Logo MKR Caucasian Camp pour fond clair : les mêmes sommets rouges et orange, les lettres en gris anthracite',
    },
    tagline: '« Forgé dans le Caucase. »',
    theme: { tile: '#131313', accent: '#C84B31', lightTile: '#F2F0EC', taglineUppercase: true },
    palette: [
      { name: 'Roche', hex: '#131313', role: 'fond des pages' },
      { name: 'Gouffre', hex: '#0E0E0E', role: 'zones enfoncées' },
      { name: 'Strate', hex: '#1A1A18', role: 'cartes, surfaces' },
      { name: 'Arête', hex: '#2A2A2A', role: 'éléments actifs' },
      { name: 'Mountain Glow', hex: '#C84B31', role: 'signature, étiquettes, lueurs' },
      { name: 'Crimson', hex: '#C41E3A', role: 'actions décisives' },
      { name: 'Neige', hex: '#F8F8F8', role: 'texte' },
    ],
    ratio: [
      { label: 'surfaces sombres', hex: '#131313', share: 70 },
      { label: 'texte clair', hex: '#F8F8F8', share: 15 },
      { label: 'Mountain Glow', hex: '#C84B31', share: 10 },
      { label: 'Crimson', hex: '#C41E3A', share: 5 },
    ],
    type: [
      { role: 'titres, toujours en capitales', family: 'Teko', sample: 'Là où naissent les champions', uppercase: true },
      { role: 'texte courant', family: 'Barlow', sample: 'Camps de lutte au Daghestan et de MMA en Tchétchénie, de une à trois semaines.' },
      { role: 'étiquettes et métadonnées', family: 'Barlow Condensed', sample: 'Session · Hiver 2027 · 15 places', uppercase: true },
    ],
    principles: [
      { title: 'Des angles vifs', body: "Sur le site, boutons, cartes, champs et encadrés gardent des angles droits : chaque composant doit avoir l'air usiné dans l'acier." },
      { title: "L'orange signe, le rouge tranche", body: "L'orange porte l'identité : étiquettes, lueurs, chiffres clés. Le rouge ne sert qu'aux actions décisives, comme postuler, parce que si tout est rouge, plus rien n'est urgent." },
      { title: 'Des tons, pas des lignes', body: 'Les sections se distinguent par des glissements de noir, comme des strates de roche, plutôt que par des bordures tracées.' },
      { title: 'Une crête entre deux sections', body: "Une chaîne de montagnes dessinée fait la transition d'une section à l'autre : descendre la page revient à franchir des cols." },
      { title: 'Des titres qui frappent', body: "Teko, condensée et anguleuse, s'écrit toujours en capitales, avec un seul mot en orange quand il faut appuyer : « au milieu des champions »." },
      { title: 'Le même univers, du site aux outils', body: "Les emails, l'affiche des salles partenaires, les couvertures vidéo et le back-office reprennent le noir, l'orange et la même hiérarchie." },
    ],
  },
  touchpoints: {
    title: 'La marque, hors du site',
    intro:
      "Une identité ne vit pas que sur un site. Voici les supports livrés autour : l'imprimé pour les salles partenaires, le lancement sur Instagram, les couvertures du teaser documentaire, l'email reçu par chaque candidat et l'outil du fondateur.",
    items: [
      {
        src: '/images/realisations/mkr-caucasian-camp/affiche-a3-salles.webp',
        alt: "Affiche A3 MKR Caucasian Camp pour les salles partenaires : titre « Forgé dans le Caucase », 15 places en lutte et 15 en MMA, adresse mkrcamp.com et QR code",
        label: 'Affiche A3 pour les salles partenaires',
        kind: 'imprime',
        caption: 'Un titre, deux disciplines et un QR code qui mène à la candidature.',
        cols: 4,
        ratio: '3/4',
      },
      {
        src: '/images/realisations/mkr-caucasian-camp/teaser-couverture-reel.webp',
        alt: "Couverture verticale du teaser « Immersion au Daghestan » : un combattant frappe dans des pattes d'ours, titre en capitales et logo MKR",
        label: 'Couverture du teaser documentaire',
        kind: 'video',
        caption: 'Nous avons remplacé le logo de fin, tiré les versions verticales et composé les couvertures.',
        credit: 'Skudy (@skud.y), qui a filmé et réalisé le teaser',
        cols: 4,
        ratio: '3/4',
      },
      {
        src: '/images/realisations/mkr-caucasian-camp/email-confirmation-mobile.webp',
        alt: "Email de confirmation de candidature MKR sur téléphone, candidat fictif : photo du fondateur, « Réserve ta visio avec Ruslan », récapitulatif et bouton de réservation",
        label: "L'email reçu après la candidature",
        kind: 'email',
        caption: 'Rendu ici avec un candidat fictif.',
        cols: 4,
        ratio: '3/4',
        device: 'phone',
      },
      {
        src: '/images/realisations/mkr-caucasian-camp/instagram-lancement.webp',
        alt: "Quatre slides du carrousel Instagram de lancement : « Le site est en ligne », « Avant, il fallait un DM », « Choisis ton format » avec une capture du site, et la liste de ce qui est en ligne",
        label: 'Carrousel Instagram de lancement',
        kind: 'reseaux',
        caption: 'Neuf slides ont annoncé la mise en ligne, avec de vraies captures du site ; le kit de lancement compte une trentaine de publications.',
        cols: 12,
      },
      {
        src: '/images/realisations/mkr-caucasian-camp/teaser-miniature-youtube.webp',
        alt: "Miniature YouTube du teaser « Immersion au Daghestan » : deux combattants à l'entraînement, titre en capitales blanches",
        label: 'Miniature YouTube du teaser',
        kind: 'video',
        credit: 'Skudy (@skud.y)',
        cols: 6,
      },
      {
        src: '/images/realisations/mkr-caucasian-camp/admin-a-faire-clair-desktop.webp',
        alt: "Back-office MKR en thème clair, données fictives : page « À faire » avec les visios à trancher, les paiements attendus et les contrats à envoyer",
        label: 'Le back-office, en thème clair',
        kind: 'outil',
        caption: 'Le fondateur choisit le thème clair ou sombre. Données fictives du jeu de test.',
        cols: 6,
      },
    ],
  },
  seo: {
    intro:
      "Deux langues, une seule architecture : chaque page existe en français et en anglais, avec son adresse, ses balises hreflang et ses données structurées. Les moteurs génératifs disposent en plus d'un fichier llms.txt dans chacune des deux langues.",
    serp: {
      siteName: 'MKR Caucasian Camp',
      url: 'https://mkrcamp.com',
      title: 'Camp MMA Tchétchénie et Lutte Daghestan | MKR Caucasian',
      description:
        'Entraîne-toi là où naissent les champions. Lutte au Daghestan, MMA en Tchétchénie. 1 à 3 semaines au Caucase, 4 sessions par an, visa et hébergement inclus.',
      favicon: '/images/realisations/mkr-caucasian-camp/favicon.webp',
    },
    serpNote:
      "La requête en tête, la marque en fin de titre, et l'essentiel de l'offre dans l'extrait : les deux disciplines, la durée, le rythme des sessions et ce qui est inclus.",
    schemasNote:
      "Générées depuis les mêmes données que les pages : les sessions, les prix et les coordonnées n'existent qu'à un seul endroit du code.",
    intents: [
      { label: 'Lutte au Daghestan', path: '/programme/lutte' },
      { label: 'MMA en Tchétchénie', path: '/programme/mma' },
      { label: 'Sessions et prix', path: '/sessions' },
      { label: 'Camp en famille', path: '/familles' },
      { label: 'Clubs et groupes', path: '/clubs-groupes' },
      { label: 'Destination Daghestan', path: '/destinations/dagestan' },
      { label: 'Logistique et budget', path: '/logistique' },
      { label: 'Version anglaise', path: '/en' },
    ],
    schemas: ['SportsOrganization', 'SportsActivityLocation', 'Event', 'AggregateOffer', 'Person', 'FAQPage', 'BlogPosting', 'TouristDestination', 'DigitalDocument', 'BreadcrumbList', 'WebSite'],
    geo: [
      {
        title: 'Un llms.txt par langue',
        body: "llms.txt et llms-en.txt décrivent le camp, ses deux destinations, la règle d'entrée, les sessions et la grille de prix. Ils changent le jour où l'offre change, comme le site et les annonces.",
      },
      {
        title: 'Des faits plutôt que des superlatifs',
        body: "Les pages de destination alignent des faits vérifiables, médailles olympiques de la région, salles partenaires, accès depuis Istanbul, plutôt que des promesses : un moteur génératif reprend un fait, rarement un adjectif.",
      },
      {
        title: 'Le fondateur, décrit partout pareil',
        body: "Tchétchène, né au Daghestan, ancien de l'équipe olympique de France de lutte : la même description revient dans le JSON-LD Person, la page À propos, la FAQ et le llms.txt, pour que les moteurs relient le fondateur au camp.",
      },
    ],
  },
  relatedArticles: ['site-web-nextjs-vs-wordpress-webflow-2026', 'site-web-vitrine-convertit', 'seo-vs-google-ads-geneve'],
  liveUrl: 'https://mkrcamp.com',
}

export default realisation
