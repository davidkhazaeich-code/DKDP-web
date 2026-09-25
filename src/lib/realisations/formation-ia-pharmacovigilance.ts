import type { Realisation } from './types'

/**
 * Formation IA d'une équipe pharmacovigilance, qualité et affaires
 * réglementaires d'un laboratoire pharmaceutique international, en Suisse
 * (étude anonyme).
 *
 * Sources : dossier de formation sur le Drive (brief, plan des slides, support
 * remis de 47 slides, récapitulatif, bibliothèque de 19 prompts comptés dans le
 * fichier, tutoriel, email de suivi). La matinée a eu lieu le 30 avril 2026, de
 * 9 h à 13 h. Aucune évaluation de la formation n'a été recueillie : aucun gain
 * ni aucune satisfaction ne sont publiés.
 *
 * Anonymat : ni nom du laboratoire, ni site, ni lieu de la séance, ni nom ou
 * fonction des participants, ni nom des outils internes, ni produit fictif des
 * exercices. Les deux captures du support ont été prises avec le bandeau du
 * logo client masqué, et relues avant d'être gardées.
 */
const realisation: Realisation = {
  slug: 'formation-ia-pharmacovigilance',
  client: {
    name: 'Laboratoire pharmaceutique international',
    sector: 'Pharmacovigilance et qualité',
    location: 'Suisse',
    anonymized: true,
  },
  meta: {
    title: 'Formation IA pour une équipe de pharmacovigilance en Suisse',
    seoTitle: 'Formation IA pour une équipe pharma en Suisse | DKDP',
    seoDescription:
      "Une équipe de pharmacovigilance et qualité s'est formée à l'IA en une demi-journée : la confidentialité d'abord, puis la méthode et des cas fictifs.",
    excerpt:
      "L'équipe pharmacovigilance, qualité et affaires réglementaires d'un laboratoire pharmaceutique international, en Suisse, débutait avec l'IA générative. En une demi-journée, elle a posé les règles de confidentialité avant le premier prompt, appris une méthode en quatre piliers, puis pratiqué sur trois dossiers fictifs de son métier.",
    dateISO: '2026-04-30',
    publishedISO: '2026-09-25',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['formation-ia'],
  sector: 'sante',
  consent: {
    level: 'anonyme',
    note: "Aucun accord écrit pour une étude nommée : ni nom, ni logo, ni lien, ni nom de participant ou d'outil interne.",
  },
  tags: ['Formation IA', 'Pharmacovigilance', 'Confidentialité', 'Prompting', 'Données de santé'],
  answer:
    "L'équipe pharmacovigilance, qualité et affaires réglementaires d'un laboratoire pharmaceutique international, en Suisse, a suivi une demi-journée de formation IA en avril 2026. La confidentialité passait avant le prompting, et les exercices portaient sur trois dossiers fictifs du métier. Chacun est reparti avec le support bilingue de 47 slides, un récapitulatif et 19 prompts.",
  facts: [
    { label: 'Pour qui', value: 'Laboratoire pharmaceutique international, en Suisse' },
    { label: 'Équipe', value: 'Pharmacovigilance, qualité, affaires réglementaires' },
    { label: 'Format', value: 'Une demi-journée de 4 heures, en présentiel, avril 2026' },
    { label: 'Participants', value: '6, débutants en IA générative' },
    { label: 'Animation', value: 'Romane, formatrice IA de DKDP' },
  ],
  cover: {
    src: '/images/realisations/formation-ia-pharmacovigilance/supports-mockup.webp',
    alt: "Deux slides du support de formation posées l'une sur l'autre : les trois règles de confidentialité, puis un prompt de pharmacovigilance décomposé élément par élément",
    lead: true,
  },
  problem: {
    title: "Des experts de la réglementation qui débutaient avec l'IA",
    body: "L'équipe traite les effets indésirables, les plaintes qualité et les échanges avec les autorités de santé. Ses membres connaissent leur réglementation dans le détail, mais ils débutaient avec l'IA générative, alors que des assistants étaient déjà disponibles dans leur environnement de travail.\n\nLeur première inquiétude portait sur les données. Dans un métier où chaque document peut être audité, et où un narratif de cas touche à la santé d'un patient, une erreur de manipulation devient vite un incident de conformité. La formation devait donc répondre à cette question avant de montrer quoi que ce soit, puis faire pratiquer l'équipe sans exposer une seule donnée réelle.",
    facts: [
      { label: 'Métier', value: 'Pharmacovigilance, plaintes qualité, affaires réglementaires' },
      { label: 'Contrainte', value: 'Aucune donnée réelle pendant la séance' },
      { label: 'Langues', value: 'Français et anglais' },
    ],
  },
  approach: {
    title: "La confidentialité d'abord, puis une méthode, puis la pratique",
    body: "Nous avons repris notre support de base en retirant tous ses exemples génériques. Chaque cas est devenu un cas du métier : un narratif d'effet indésirable, une plainte produit, un fichier de suivi Excel, une procédure qualité, une réunion avec l'autorité. La confidentialité passe avant le prompting, parce que c'était le premier frein de l'équipe, et le support se lit en français comme en anglais.\n\nPour la pratique, DKDP a rédigé trois dossiers entièrement fictifs : une guideline réglementaire, un fichier de plaintes et un signalement arrivé en vrac. Chaque exercice existe en deux niveaux, pour que les plus à l'aise aillent plus loin sans laisser les autres derrière. La matinée se termine ensuite par un engagement individuel : un outil, une tâche, dès la semaine suivante. Romane, formatrice IA de DKDP, anime la séance.",
    bullets: [
      "Outils internes et outils publics : ce qui peut aller où, avec l'image du consultant tenu au secret face à l'inconnu rencontré au café",
      'Trois règles : aucune donnée identifiante, aucun copier-coller depuis les bases internes, toujours anonymiser',
      "Une relecture par une personne qualifiée, et la trace de l'usage de l'IA dans les livrables",
      'Quatre piliers de prompt : action, rôle, contexte, ton et format, avec des rôles du métier',
      'Un quiz de 8 questions sur téléphone, en pause active après la méthode',
      'Trois exercices sur dossiers fictifs, chacun en deux niveaux, puis un exercice de groupe',
      'Les workflows et les agents comme étape suivante, avec six critères pour repérer une tâche à automatiser',
    ],
  },
  training: {
    format: 'Une demi-journée de 4 heures en présentiel, pause comprise, en avril 2026',
    audience: "6 membres d'une équipe pharmacovigilance, qualité et affaires réglementaires, débutants en IA",
    sessions: [
      {
        title: "Comprendre l'IA",
        content:
          "Ce qu'est un modèle de langage, pourquoi il peut inventer avec aplomb, et le panorama des assistants, internes comme grand public.",
      },
      {
        title: 'Confidentialité',
        content:
          'Avant le moindre prompt, les outils internes face aux outils publics, trois règles de saisie, puis la relecture qualifiée et la traçabilité en environnement GxP.',
      },
      {
        title: 'Prompting',
        content:
          "Action, rôle, contexte, ton et format sur des cas du métier, un quiz de 8 questions, puis les workflows et les agents comme étape suivante.",
      },
      {
        title: 'Pratique et engagement',
        content:
          "Une guideline à synthétiser, un fichier de plaintes à analyser et un signalement à structurer, tous fictifs, puis un plan d'intégration présenté en groupe et un engagement individuel.",
      },
    ],
    promptBeforeAfter: {
      before: "Résume ce rapport d'effet indésirable.",
      after:
        "Tu es spécialiste en pharmacovigilance. Résume le rapport d'effet indésirable ci-dessous en compte rendu structuré au format CIOMS : données démographiques anonymisées, médicament suspect, description et chronologie, issue, évaluation de la causalité. Anglais médical formel, 250 mots au plus. Signale entre crochets chaque information manquante au lieu de la supposer.",
      comment:
        "Adapté de l'exemple montré en séance, sur un rapport fictif : la seconde consigne fixe le rôle, le format attendu et la longueur, et elle demande de signaler les manques plutôt que de les combler.",
    },
  },
  results: [
    {
      metric: 'Bibliothèque',
      value: '19 prompts',
      label: 'rangés par métier : pharmacovigilance, qualité, affaires réglementaires, données, communication interne',
      source: 'Dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
    {
      metric: 'Support',
      value: '47 slides',
      label: "bilingues, français et anglais, remises avec un récapitulatif à déposer dans l'assistant interne",
      source: 'Dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
    {
      metric: 'Durée',
      value: '4 h',
      label: 'une demi-journée en présentiel, avec la confidentialité traitée avant le premier prompt',
      source: 'Programme de la formation, dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
      period: 'avril 2026',
    },
  ],
  lessons: [
    "Traiter la confidentialité avant la méthode. Tant que la question des données n'est pas réglée, elle occupe les esprits pendant tout le reste de la séance. Nous avons donc placé cette partie juste après la présentation de l'IA, avant la pause et avant le premier prompt.",
    "Remplacer chaque exemple générique par un cas du métier, et le préparer en amont. Notre trame de base parlait de voyage et de création d'images ; devant des experts de la réglementation, ces exemples ont cédé la place à des narratifs de cas, des plaintes produit et des procédures qualité. Pour pratiquer sans donnée réelle, il a aussi fallu écrire trois dossiers fictifs complets, un travail de préparation à prévoir dès le devis.",
    "Prévoir le bilinguisme dans le support, pas à l'oral. Le brief prévoyait un oral en français et des slides en anglais ; le support final passe d'une langue à l'autre d'une touche, pour que chacun suive dans sa langue de travail sans traduction improvisée.",
  ],
  faq: [
    {
      question: 'Peut-on former une équipe de pharmacovigilance sans utiliser de données réelles ?',
      answer:
        "Oui. Tous les exercices de cette matinée portaient sur des documents fictifs rédigés par DKDP : une guideline, un fichier de plaintes et un signalement. Ils reproduisent les situations du métier, mais ils ne demandent aucune donnée de patient ni aucun numéro de cas.",
    },
    {
      question: "Quels outils d'IA une équipe réglementée peut-elle utiliser ?",
      answer:
        "Ceux que l'entreprise a validés et déployés en interne : ce sont eux qui servent aux données du métier. Les assistants grand public restent réservés aux données neutres, sur un appareil personnel, avec l'usage des conversations pour l'entraînement désactivé.",
    },
    {
      question: 'Une demi-journée suffit-elle pour démarrer ?',
      answer:
        "Elle suffit pour poser les règles et la méthode, mais les réflexes s'installent ensuite, par la pratique. C'est pourquoi l'équipe repart avec un récapitulatif à déposer dans son assistant interne, une bibliothèque de prompts par métier et un engagement pour la semaine suivante. Un atelier de suivi de deux heures était aussi proposé quelques semaines plus tard.",
    },
  ],
  gallery: [
    {
      src: '/images/realisations/formation-ia-pharmacovigilance/support-1.webp',
      document: true,
      alt: 'Slide du support de formation : « Avant de taper quoi que ce soit, trois règles essentielles », aucune donnée identifiante, aucun copier-coller interne, toujours anonymiser, puis un réglage de quinze secondes',
      caption: "La partie confidentialité, présentée avant le prompting : trois règles, puis un réglage à faire tout de suite dans son outil personnel.",
    },
    {
      src: '/images/realisations/formation-ia-pharmacovigilance/support-2.webp',
      document: true,
      alt: 'Slide du support de formation : un prompt de pharmacovigilance décomposé en rôle, action, format, contexte et ton',
      caption: 'Un prompt complet, élément par élément, sur un exemple de pharmacovigilance.',
    },
  ],
  relatedArticles: [
    'protection-donnees-ia-nlpd-pme-suisse',
    'chatgpt-claude-copilot-lequel-choisir-pme-2026',
    'formation-ia-collaborateurs-roi',
  ],
}

export default realisation
