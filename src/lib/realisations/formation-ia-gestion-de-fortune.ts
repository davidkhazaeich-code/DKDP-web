import type { Realisation } from './types'

/**
 * Formation IA d'un gérant de fortune indépendant à Genève (étude anonyme).
 *
 * Sources : dossier client (README, programme signé le 16 juillet 2026, emails
 * de confirmation), agenda des séances (quatre séances de 1 h 30 du 25 août au
 * 2 septembre 2026, la dernière « avec David ») et brief de cadrage. Le contenu
 * des séances reprend le programme signé : aucun récapitulatif de séance n'est
 * rangé dans le dossier. Aucune évaluation de la formation n'a été recueillie,
 * donc aucun gain ni aucune satisfaction ne sont publiés.
 *
 * Anonymat : ni nom, ni régulateur cité, ni effectif, ni actifs sous gestion,
 * ni adresse, ni nom ou intitulé exact des participants.
 */
const realisation: Realisation = {
  slug: 'formation-ia-gestion-de-fortune',
  client: {
    name: 'Gérant de fortune indépendant',
    sector: 'Gestion de fortune',
    location: 'Genève',
    anonymized: true,
  },
  meta: {
    title: 'Formation IA pour une gestion de fortune à Genève',
    seoTitle: 'Formation IA pour un gérant de fortune à Genève | DKDP',
    seoDescription:
      "Un gérant de fortune à Genève fait former deux référents à Claude en quatre séances, la gouvernance des données d'abord. Programme et leçons.",
    excerpt:
      "Un gérant de fortune indépendant, à Genève, voulait diffuser l'IA dans ses équipes sans exposer de données clients. Deux référents internes ont d'abord suivi quatre séances de 1 h 30 dans leurs locaux : le cadre de gouvernance en premier, puis le prompting, les cas métier et l'automatisation.",
    dateISO: '2026-09-02',
    publishedISO: '2026-09-25',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['formation-ia'],
  sector: 'finance',
  consent: {
    level: 'anonyme',
    note: 'Aucun accord écrit pour une étude nommée : ni nom, ni logo, ni lien, ni nom de participant.',
  },
  tags: ['Formation Claude', 'Gouvernance des données', 'Gestion de fortune', 'Référent IA', 'Prompting'],
  answer:
    "Un gérant de fortune indépendant, à Genève, a fait former deux référents internes avant d'ouvrir l'IA à ses équipes. Les quatre séances de 1 h 30, fin août et début septembre 2026, ont commencé par le cadre de gouvernance des données, puis couvert le prompting avec Claude, les cas métier et les premières automatisations.",
  facts: [
    { label: 'Pour qui', value: 'Gérant de fortune indépendant et régulé, Genève' },
    { label: 'Format', value: '4 séances de 1 h 30, dans les locaux du client' },
    { label: 'Participants', value: 'Deux référents internes, profils informatique et risques' },
    { label: 'Animation', value: 'Romane, formatrice IA de DKDP' },
    { label: 'Dates', value: 'Fin août et début septembre 2026' },
  ],
  cover: {
    src: '/images/realisations/formation-ia-gestion-de-fortune/cover.webp',
    alt: 'Schéma du programme en quatre séances : cadre de confiance, prompting, cas métier, puis automatisation et rôle de relais interne',
  },
  problem: {
    title: "Ouvrir l'IA aux équipes sans exposer un seul dossier client",
    body: "Chez un gérant de fortune, la première question que soulève l'IA n'est pas technique. Elle porte sur les données : quelles informations peut-on confier à un assistant, avec quel paramétrage, et qui fixe la règle ? Tant que cette règle n'est pas écrite, un assistant IA reste un risque plutôt qu'un outil.\n\nLa direction voulait donc un relais interne avant tout déploiement. Le responsable informatique devait maîtriser Claude sans être développeur, puis diffuser les bons usages dans les départements, de la gestion à la conformité. Aucun cas d'usage précis n'était encore arrêté, si bien que l'automatisation restait un horizon plutôt qu'un cahier des charges.",
    facts: [
      { label: 'Métier', value: 'Gestion de fortune indépendante, gérant régulé' },
      { label: 'Demande', value: 'Former un relais interne, puis diffuser' },
      { label: 'Départ', value: "Profil non développeur, aucun cas d'usage arrêté" },
    ],
  },
  approach: {
    title: "Former les référents d'abord, en commençant par la gouvernance",
    body: "Plutôt qu'une session collective, nous avons proposé un programme de référent : quatre séances de 1 h 30 en présentiel, dans les locaux du client, du niveau débutant au niveau intermédiaire. Un second participant, au profil risques, a rejoint le responsable informatique, ce qui tourne la séance sur les cas métier vers la conformité et la gestion des risques.\n\nLa première séance ne commence pas par les prompts. Elle fixe d'abord le cadre : ce qui peut être confié à Claude, ce qui ne l'est jamais, et quel paramétrage retenir selon l'offre utilisée. Ensuite, le programme demande aux participants d'apporter deux ou trois tâches qui leur prennent du temps, avec un document pour chacune, afin que les séances partent de leur travail réel. La dernière séance prépare enfin leur rôle de relais, avec une feuille de route département par département. Romane, formatrice IA de DKDP, anime les quatre séances.",
    bullets: [
      "Le cadre de gouvernance en première séance : ce qui peut être confié à l'IA, et ce qui ne l'est jamais",
      "Le paramétrage de Claude selon l'offre retenue, individuelle, équipe ou entreprise",
      'Des gabarits réutilisables, construits sur les tâches récurrentes des participants',
      'Des cas métier : documents longs, notes de marché, lecture assistée de textes réglementaires',
      "Une décision qui reste humaine : l'assistant prépare, la personne relit et tranche",
      'Des Projets Claude, de premières automatisations simples et une feuille de route par département',
      'Un engagement de confidentialité : DKDP ne conserve aucun document interne après la formation',
    ],
  },
  training: {
    format: '4 séances de 1 h 30 en présentiel, soit 6 heures, fin août et début septembre 2026',
    audience: 'Deux référents internes, profils informatique et risques, du niveau débutant au niveau intermédiaire',
    sessions: [
      {
        title: 'Cadre de confiance',
        content:
          "Ce que Claude sait faire et ses limites, puis la règle d'abord : quelles données lui confier, lesquelles jamais, et quel paramétrage retenir dans un métier régulé.",
      },
      {
        title: 'Prompting et méthode',
        content:
          'Rédiger des instructions claires, donner le bon contexte et itérer, puis transformer les tâches récurrentes en gabarits réutilisables.',
      },
      {
        title: 'Cas métier',
        content:
          "Synthèse de documents longs et de notes de marché, lecture assistée de textes réglementaires et aide aux listes de contrôle, avec une décision qui reste humaine.",
      },
      {
        title: 'Automatisation et relais',
        content:
          'Projets Claude et premières automatisations simples, diffusion du cadre auprès des équipes, puis feuille de route département par département.',
      },
    ],
    promptBeforeAfter: {
      before: 'Résume ce rapport de marché.',
      after:
        "Tu es analyste dans une société de gestion de fortune. Résume la note de marché publique ci-jointe pour préparer un commentaire de gestion : trois messages clés, les risques cités par l'auteur et ses hypothèses. Sépare les faits de l'opinion de l'auteur et indique la page de chaque chiffre. Ton sobre, 200 mots au plus. N'ajoute aucune donnée absente du document.",
      comment:
        "Un exemple type, sur un document public : la seconde consigne fixe l'usage, sépare les faits des opinions et fait citer la page de chaque chiffre, que la relecture peut ainsi vérifier.",
    },
  },
  results: [
    {
      metric: 'Séances',
      value: '4 × 1 h 30',
      label: 'en présentiel dans les locaux du client, soit 6 heures de formation',
      source: 'Programme signé et agenda des séances, dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
      period: 'fin août et début septembre 2026',
    },
    {
      metric: 'Référents formés',
      value: '2',
      label: 'profils informatique et risques, formés avant toute diffusion aux équipes',
      source: 'Dossier de formation DKDP',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
  ],
  lessons: [
    "Fixer l'intervalle entre les séances dès le devis. Le programme prévoyait une séance par semaine, pour laisser le temps de pratiquer entre deux rendez-vous. Les agendas ont finalement resserré les quatre séances sur neuf jours, avec deux à quatre jours seulement entre deux séances : pour un prochain programme de référent, nous fixerions cet intervalle avant de choisir les dates.",
    "Mettre le suivi dans le programme, pas en option. La séance de suivi à un mois était proposée à part. Sans elle, nous n'avons pas encore de retour structuré sur les usages qui se sont installés après la dernière séance, et c'est pourtant ce retour qui dit si les référents diffusent. Nous l'intégrerions au programme de base.",
  ],
  faq: [
    {
      question: "Peut-on former une équipe de gestion à l'IA sans exposer de données clients ?",
      answer:
        "Oui, à condition de poser la règle avant l'outil. Dans ce programme, la première séance définit ce qui peut être confié à l'assistant et ce qui ne l'est jamais, avant le moindre exercice. De notre côté, un engagement de confidentialité couvre les documents utilisés en séance, et DKDP n'en conserve aucun après la formation.",
    },
    {
      question: 'Quelle offre de Claude choisir pour un usage professionnel ?',
      answer:
        "Cela dépend de ce que l'on confie à l'assistant. Les offres de Claude pour les équipes et les entreprises ajoutent une administration centralisée et des conditions d'utilisation des données adaptées à un usage professionnel, ce qu'un compte personnel n'offre pas. Pour cette raison, le choix se prépare dès la première séance, avec le responsable informatique, avant d'ouvrir l'outil aux équipes.",
    },
    {
      question: "Pourquoi former deux référents plutôt que toute l'équipe ?",
      answer:
        "Parce que le cadre d'usage se pose une fois, par des personnes de la maison. Les référents apprennent l'outil, gardent la main sur la règle et diffusent ensuite les usages, département par département. La formation des équipes vient dans un second temps, sur une base déjà posée, et elle se chiffre à part.",
    },
  ],
  relatedArticles: [
    'formation-ia-entreprise-geneve-2026',
    'protection-donnees-ia-nlpd-pme-suisse',
    'utiliser-claude-ia-du-chat-aux-agents-guide-2026',
  ],
}

export default realisation
