import type { Realisation } from './types'

/**
 * Journée de formation IA pour un restaurant et un club d'une station
 * valaisanne, deux établissements du même groupe (étude anonyme).
 *
 * Sources : dossier de formation sur le Drive (brief, déroulé validé, deck de
 * 47 slides en version finale, pack participants), proposition signée et
 * learnings du dossier client. La journée a eu lieu le 18 juin 2026, de 9 h 30
 * à 15 h 30, sur place. Le pack a été livré le lendemain : 90 prompts comptés
 * dans la bibliothèque, 13 modèles de documents. Le nombre final de
 * participants n'a pas été reconfirmé après le 3 juin : « une dizaine », comme
 * le dossier. Aucune évaluation de la formation n'a été recueillie.
 *
 * Anonymat : ni nom des établissements ni de la station, ni altitude, ni
 * adresse, ni nom de participant ou de dirigeant, ni lien vers le quiz.
 * Les deux captures du support ont été relues : ni nom ni logo.
 */
const realisation: Realisation = {
  slug: 'formation-ia-restauration-station',
  client: {
    name: 'Restaurant et club de station',
    sector: 'Restauration saisonnière',
    location: 'Valais',
    anonymized: true,
  },
  meta: {
    title: 'Formation IA pour un restaurant et un club de station, en Valais',
    seoTitle: 'Formation IA pour la restauration en station | DKDP',
    seoDescription:
      "Un restaurant et un club en Valais se forment à l'IA en une journée sur place : méthode ARCT, Claude au quotidien et quatre ateliers par métier.",
    excerpt:
      "Un restaurant et un club d'une station valaisanne, qui appartiennent au même groupe, voulaient tenir la haute saison sans alourdir leurs équipes. Pendant une journée sur place, direction, marketing, administration, cuisine et gérance ont appris une méthode de prompt, réglé leur assistant, puis travaillé leurs propres cas en quatre ateliers.",
    dateISO: '2026-06-18',
    publishedISO: '2026-09-25',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['formation-ia'],
  sector: 'hotellerie-restauration',
  consent: {
    level: 'anonyme',
    note: 'Aucun accord écrit pour une étude nommée : ni nom, ni logo, ni lien, ni station, ni nom de participant.',
  },
  tags: ['Formation IA', 'Restauration', 'Méthode ARCT', 'Claude', 'Ateliers métier'],
  answer:
    "Un restaurant et un club d'une station valaisanne ont formé leurs équipes à l'IA pendant une journée sur place, en juin 2026. Le matin portait sur la méthode ARCT et sur Claude au quotidien, l'après-midi sur quatre ateliers métier. Le lendemain, DKDP a remis un pack de huit documents, dont une bibliothèque de 90 prompts rangés par poste.",
  facts: [
    { label: 'Pour qui', value: 'Un restaurant et un club du même groupe, en Valais' },
    { label: 'Format', value: 'Une journée sur place, de 9 h 30 à 15 h 30' },
    { label: 'Participants', value: 'Une dizaine, dont une personne à distance' },
    { label: 'Animation', value: 'Romane, formatrice IA de DKDP' },
    { label: 'Date', value: "Juin 2026, avant la saison d'hiver" },
  ],
  cover: {
    src: '/images/realisations/formation-ia-restauration-station/supports-mockup.webp',
    alt: "Deux slides du support de formation posées l'une sur l'autre : les instructions générales à rédiger avec Claude, puis les quatre réflexes d'un bon prompt",
    lead: true,
  },
  problem: {
    title: 'Tenir la haute saison sans alourdir les équipes',
    body: "Dans une station, l'activité se concentre sur quelques mois. Pendant cette période, chaque poste encaisse la charge : le marketing et l'événementiel reposent sur très peu de personnes, les réservations des habitués se traitent au cas par cas, et la comptabilité passe par une fiduciaire externe, que l'on ne sollicite pas pour chaque point de situation.\n\nLe groupe voulait donc que sa direction et ses managers s'approprient l'IA avant l'hiver. Les niveaux étaient très inégaux : une partie de la direction utilisait déjà un assistant, alors qu'une grande partie de l'équipe partait de zéro. Il fallait une journée qui embarque les débutants sans lasser les autres, et dont chacun reparte avec des usages qui fonctionnent sur ses propres tâches.",
    facts: [
      { label: 'Métier', value: 'Restauration, bar et club, activité saisonnière' },
      { label: 'Public', value: 'Direction, marketing, administration, cuisine, gérance' },
      { label: 'Départ', value: 'Niveaux très inégaux, beaucoup de débutants' },
    ],
  },
  approach: {
    title: "Une méthode le matin, les vrais cas l'après-midi",
    body: "La journée s'est déroulée sur place, dans la salle du restaurant, fermé pour l'occasion. Le matin, aucune séquence de théorie ne dépasse vingt-cinq minutes sans passage à la pratique : un vrai ou faux démonte d'abord les idées reçues, la méthode ARCT montre ensuite comment bien demander, puis chacun apprend à régler Claude comme un assistant qui connaît son poste. Un quiz en équipes clôt la matinée.\n\nL'après-midi, quatre groupes travaillent en même temps sur leurs propres cas : le marketing, la direction et les demandes VIP, la gérance du second établissement, la cuisine et les livraisons. Chaque groupe construit un livrable utilisable, puis le présente aux autres, pendant que l'animation passe d'un groupe à l'autre pour débloquer chaque atelier.",
    bullets: [
      "Un vrai ou faux sur cinq idées reçues pour expliquer comment fonctionne un modèle de langage",
      'La méthode ARCT : action, rôle, contexte, ton et format, avec des rôles du métier',
      'Claude au quotidien : instructions générales, Projects, fichiers de référence en Markdown, Skills et connecteurs',
      'Sans clavier : photographier un bon de livraison, dicter une réponse à un client',
      'Les workflows et les agents comme étape suivante, une fois le réflexe du prompt installé',
      'Un quiz de douze questions, en équipes, pour clore la matinée',
      "Quatre ateliers en parallèle sur les cas réels, puis une présentation croisée des projets",
    ],
  },
  training: {
    format: 'Une journée sur place, de 9 h 30 à 15 h 30, avec une personne à distance',
    audience: "Direction, marketing, administration, cuisine et gérance des deux établissements, du débutant à l'utilisateur régulier",
    sessions: [
      {
        title: "Comprendre l'IA",
        content:
          "Un vrai ou faux sur cinq idées reçues, le fonctionnement d'un modèle de langage et le panorama des outils : Claude, ChatGPT, Gemini et Copilot.",
      },
      {
        title: 'Bien demander',
        content:
          'La méthode ARCT, un prompt simple face à un prompt structuré, quatre réflexes, puis un premier prompt rédigé par chacun sur une mission de son poste.',
      },
      {
        title: 'Claude au quotidien',
        content:
          'Instructions générales, Projects et fichiers de référence, Skills et connecteurs, la photo et la dictée, puis les workflows et les agents comme étape suivante.',
      },
      {
        title: 'Ateliers métier',
        content:
          'Quatre groupes en parallèle : une semaine de contenu, des offres VIP prêtes à envoyer, des plannings et un bilan prévisionnel, des stocks et des bons de commande. Chaque groupe présente ensuite son projet.',
      },
    ],
    promptBeforeAfter: {
      before: 'Écris un post Insta.',
      after:
        "Agis comme community manager d'un restaurant de station. Rédige une légende Instagram pour annoncer la soirée du vendredi. Contexte : clientèle internationale, réservation conseillée. Ton festif et soigné, trois lignes, un appel à réserver et six hashtags.",
      comment:
        "Adapté de l'antisèche remise à l'équipe, sans le nom de l'établissement : le second prompt donne un rôle, une action précise et le contexte utile, puis le ton et le format attendus.",
    },
  },
  results: [
    {
      metric: 'Prompts',
      value: '90',
      label: 'rangés par poste dans la bibliothèque du pack remis le lendemain',
      source: 'Dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
    {
      metric: 'Modèles',
      value: '13',
      label: "documents à faire remplir par l'IA : offre VIP, fiche technique, bon de commande, planning, pré-bilan de saison",
      source: 'Dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
    {
      metric: 'Journée',
      value: '1 jour',
      label: "sur place, de 9 h 30 à 15 h 30, avec quatre ateliers métier l'après-midi",
      source: 'Déroulé de la journée, dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
      period: 'juin 2026',
    },
  ],
  lessons: [
    "Préparer le pack avant la journée, pas après. Le devis promettait une banque de prompts et des modèles par poste, et c'est la direction qui les a demandés le lendemain, pour les transmettre à toute l'équipe. Le pack est parti le jour même de sa demande, mais nous le préparerions pour qu'il soit remis en fin de formation.",
    "Relire le Markdown comme un livrable. Le mémo destiné à être déposé dans l'assistant contenait sept listes collées à un paragraphe sans ligne vide : elles s'affichaient avec des tirets bruts, et le rendu se dégradait aussi dans un Project. Depuis, la mise en forme du Markdown se vérifie avant chaque livraison de pack.",
    "Pas de simples observateurs. Trois personnes du second établissement devaient d'abord assister sans participer ; elles ont finalement pris part à toute la journée, avec leur propre atelier. Un observateur sans cas à traiter repart sans usage, et les échanges du groupe n'y gagnent rien.",
  ],
  faq: [
    {
      question: "Faut-il un abonnement payant pour que l'équipe utilise l'IA ?",
      answer:
        "Non, pas pour démarrer. Une version gratuite suffit pour la plupart des tâches, et nous avons conseillé un abonnement seulement aux postes qui traitent de longs documents ou beaucoup de contenu, comme l'administration et le marketing. Pour la direction, la cuisine et la salle, l'abonnement restait optionnel.",
    },
    {
      question: 'Que faire des données des clients et du personnel ?',
      answer:
        "On anonymise avant de partager : des initiales, des montants arrondis ou des données fictives suffisent pour la plupart des demandes. Ensuite, tout ce qui part vers un client, un fournisseur ou l'administration est relu par une personne, car l'IA propose et l'équipe valide.",
    },
    {
      question: "Comment l'équipe continue-t-elle après la journée ?",
      answer:
        "Chaque participant crée un Project dans Claude ou ChatGPT et y dépose le mémo de la formation : l'assistant répond alors aux questions sur la méthode et retrouve les prompts du pack. Un suivi à un mois, à distance ou sur place, était aussi proposé en option.",
    },
  ],
  gallery: [
    {
      src: '/images/realisations/formation-ia-restauration-station/support-1.webp',
      document: true,
      alt: 'Slide du support de formation : quatre réflexes, itérer, lui faire poser des questions, lui faire écrire ses prompts, réutiliser ses prompts',
      caption: 'Les quatre réflexes présentés après la méthode ARCT.',
    },
    {
      src: '/images/realisations/formation-ia-restauration-station/support-2.webp',
      document: true,
      alt: "Slide du support de formation : vos instructions générales, profil, tâches, méthode, format et confidentialité, à rédiger avec l'aide de Claude",
      caption: "Chacun rédige ses instructions générales sur place, avec l'aide de Claude.",
    },
  ],
  relatedArticles: [
    'formation-ia-entreprise-geneve-2026',
    'chatgpt-claude-copilot-lequel-choisir-pme-2026',
    'automatiser-taches-repetitives-ia-pme',
  ],
}

export default realisation
