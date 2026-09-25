import type { Realisation } from './types'

/**
 * Automatisation des dépenses Bexio de DKDP (projet interne, accord `interne`).
 *
 * Sources : workflow n8n `ZWplET3ypCsDUUnU` lu par l'API le 2026-09-25 (créé
 * le 2026-04-10, 28 nœuds dont 2 notes, soit 26 étapes actives) et la memory
 * `reference_bexio_expenses_automation_dkdp` (défauts établis le 2026-09-03,
 * relecture des 727 dépenses et nouveaux comptes le 2026-09-22). Aucun montant
 * n'est publié.
 *
 * ⚠️ Les nœuds Google Drive qui suivent la création de la dépense n'ont
 * toujours pas de gestion d'erreur au 25.09 : ne pas écrire que les doublons
 * sont impossibles tant que ce n'est pas corrigé.
 */
const realisation: Realisation = {
  slug: 'automatisation-depenses-bexio-n8n',
  client: {
    name: 'DKDP',
    sector: 'Agence digitale, comptabilité interne',
    location: 'Genève',
  },
  meta: {
    title: "Automatiser la saisie des dépenses dans Bexio avec n8n et l'IA",
    seoTitle: 'Automatiser les dépenses Bexio avec n8n et l’IA | DKDP',
    seoDescription:
      'Comment DKDP automatise la saisie de ses dépenses Bexio avec n8n et Claude : flux de 26 étapes, 31 catégories comptables et leçons tirées.',
    excerpt:
      "Chaque justificatif déposé dans un dossier Google Drive devient une dépense Bexio classée, nommée, archivée et validée, sans ressaisie. Un flux n8n de 26 étapes, en production chez DKDP depuis avril 2026.",
    dateISO: '2026-04-10',
    publishedISO: '2026-09-25',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['automatisation'],
  sector: 'agence-digitale',
  consent: { level: 'interne', note: 'Comptabilité de DKDP : aucun montant publié.' },
  tags: ['n8n', 'Bexio', 'Claude', 'Comptabilité', 'Google Drive'],
  answer:
    "Chez DKDP, chaque justificatif déposé dans un dossier Google Drive devient une dépense Bexio classée, nommée, archivée et validée, sans ressaisie. Le flux n8n tourne toutes les cinq minutes depuis avril 2026. En septembre, une relecture de 727 dépenses a montré qu'un seul compte en portait 26 % : le classement compte désormais 31 catégories.",
  facts: [
    { label: 'Pour qui', value: 'DKDP, comptabilité interne' },
    { label: 'Outils', value: 'n8n auto-hébergé, Claude, Bexio, Google Drive' },
    { label: 'En service', value: 'Depuis le 10 avril 2026' },
    { label: 'Fréquence', value: 'Toutes les 5 minutes' },
    { label: 'Montants', value: 'Aucun publié sur cette page' },
  ],
  cover: {
    src: '/images/realisations/automatisation-depenses-bexio-n8n/cover.webp',
    alt: "Schéma du flux : justificatif déposé dans Google Drive, lecture par Claude, compte comptable, dépense créée dans Bexio, archive rangée par mois",
  },
  problem: {
    title: 'Une saisie courte, mais répétée des centaines de fois',
    body: "Saisir une dépense dans Bexio est une tâche courte : le fournisseur, la date, le montant, la devise, le bon compte, le justificatif à joindre, le fichier à renommer et à ranger. Répétée des centaines de fois, c'est aussi la tâche qu'on repousse, puis qu'on expédie en fin de trimestre.\n\nL'objectif était simple à dire : déposer une photo ou un PDF dans un dossier, et ne plus y penser. La dépense devait arriver dans Bexio complète, rangée sur le bon compte, avec son justificatif archivé sous un nom lisible.",
    facts: [
      { label: 'Départ', value: 'Saisie à la main dans Bexio' },
      { label: 'Justificatifs', value: 'Photos de tickets, PDF de factures, toutes devises' },
      { label: 'TVA', value: 'Taux de la dette fiscale nette' },
    ],
  },
  approach: {
    title: "Un flux n8n qui lit, classe, enregistre et range",
    body: `Toutes les cinq minutes, n8n relève un dossier Google Drive. Chaque nouveau justificatif est lu par Claude, qui rend un JSON : fournisseur, date, montants, devise, description et une catégorie parmi 31. Un nœud de code associe la catégorie à un compte du plan comptable, puis la dépense est créée dans Bexio par son API, avec le justificatif joint, et validée.

Le fichier est ensuite renommé sur le modèle date, fournisseur, montant, et rangé dans un dossier par année et par mois. Un justificatif illisible part dans un dossier d'erreurs au lieu de disparaître.`,
    bullets: [
      'Dossier Google Drive relevé toutes les 5 minutes',
      'Lecture du justificatif par Claude : fournisseur, date, montants, devise, catégorie',
      "31 catégories associées aux comptes du plan comptable Bexio, avec 9 règles d'arbitrage",
      'Conversion des devises étrangères par un service public de taux de change',
      'Dépense créée dans Bexio avec son justificatif, puis validée',
      'Fichier renommé AAAA-MM-JJ_Fournisseur_CHF-montant et rangé par année et par mois',
      "Justificatifs illisibles isolés dans un dossier d'erreurs",
    ],
  },
  flow: {
    title: "Le trajet d'un justificatif",
    intro: 'Un flux n8n de 26 étapes, déclenché toutes les cinq minutes.',
    steps: [
      { label: 'Justificatif déposé', detail: 'dossier Google Drive « _Inbox »', kind: 'source' },
      { label: 'Lecture par Claude', detail: 'fournisseur, date, montants, devise, catégorie', kind: 'ia' },
      { label: 'Compte comptable', detail: '31 catégories vers le plan Bexio', kind: 'controle' },
      { label: 'Dépense Bexio', detail: 'créée avec son justificatif, puis validée', kind: 'outil' },
      { label: 'Archive', detail: 'fichier renommé, rangé par année et par mois', kind: 'sortie' },
    ],
    note: "Un justificatif que Claude ne sait pas lire part dans le dossier « _Erreurs » : rien n'est perdu.",
  },
  stack: [
    { label: 'n8n', color: 'pink' },
    { label: 'Claude', color: 'chrome' },
    { label: 'Bexio', color: 'green' },
    { label: 'Google Drive', color: 'blue' },
  ],
  results: [
    {
      metric: 'Dépenses relues',
      value: '727',
      label: 'dans Bexio, avant de revoir le classement',
      source: 'Relevé interne Bexio',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-22',
    },
    {
      metric: 'Compte fourre-tout',
      value: '26 %',
      label: 'des dépenses rangées dans un seul compte, les frais de représentation',
      source: 'Relevé interne Bexio',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-22',
      period: 'avant la révision du 22 septembre 2026',
    },
    {
      metric: 'Catégories',
      value: '31',
      label: 'reconnues par la lecture des justificatifs, contre 27 auparavant',
      source: 'Workflow n8n en production',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-22',
    },
  ],
  lessons: [
    "Mesurer avant de reclasser. Sur 727 dépenses, le compte des frais de représentation en portait 192, en mêlant des repas d'affaires et des provisions de bureau. Quatre comptes plus précis ont été créés le 22 septembre 2026, puis intégrés au flux.",
    "Vérifier la version publiée, pas le brouillon. L'étape de validation n'existait que dans une version jamais publiée du flux : jusqu'au 3 septembre 2026, les dépenses attendaient d'être validées à la main.",
    "Poser une gestion d'erreur sur chaque étape qui suit une écriture. Un échec de Google Drive après la création d'une dépense suffit à la faire recréer au passage suivant : un même justificatif a ainsi produit 35 copies.",
  ],
  faq: [
    {
      question: 'Faut-il changer de logiciel comptable ?',
      answer:
        "Non. Le flux écrit dans Bexio par son API officielle et range les justificatifs dans Google Drive. Les deux outils restent ceux de l'entreprise, et la comptabilité se consulte comme avant.",
    },
    {
      question: 'Que devient la TVA ?',
      answer:
        "DKDP est au taux de la dette fiscale nette : aucun impôt préalable n'est enregistré, et le flux n'en poste pas. Une entreprise à la méthode effective doit ajouter le taux de TVA à chaque dépense, ce que l'API de Bexio sait recevoir.",
    },
    {
      question: 'Où passent les justificatifs ?',
      answer:
        "Ils sont lus par l'API d'Anthropic, qui fait tourner Claude, puis joints à la dépense dans Bexio et archivés dans Google Drive. Pour des pièces sensibles, la lecture peut être confiée à un autre modèle : c'est une étape du flux, pas son fondement.",
    },
    {
      question: 'Le même flux peut-il servir à une autre entreprise ?',
      answer:
        "Oui, en refaisant la correspondance entre catégories et comptes : les identifiants de compte dans Bexio sont propres à chaque société, seuls les numéros du plan comptable se reprennent tels quels.",
    },
  ],
  relatedArticles: ['automatiser-taches-repetitives-ia-pme', 'agents-ia-sur-mesure-cas-usage-2026', 'no-code-low-code-pme-suisse'],
}

export default realisation
