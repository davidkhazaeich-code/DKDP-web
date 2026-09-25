import type { Realisation } from './types'

/**
 * SOS Relevage : l'application d'interventions (CRM terrain) derriere le site.
 *
 * Meme accord que l'etude du site (`interne`, societe de David et de son
 * associe) et meme regle : presentation neutre, aucun nom de personne, ni les
 * fondateurs ni le technicien.
 *
 * Sources, relevees le 2026-09-25 : historique git du depot
 * `site-sos-relevage-2026/web` sur origin/main (111 commits `[pro]` du
 * 30.07 au 21.09.2026 ; demandes du site dans le CRM depuis `727e0cb` du
 * 31.07 ; referentiel des 12 points `3c7f35a` du 21.08 ; contacts bexio
 * `8361a6b` du 10.09 ; rappel client `70fbf97` du 14.09 ; rapport par type
 * `d6f543c` du 15.09 ; photo par point `a3bae00` du 17.09 ; agenda Google
 * `117aa80` du 18.09 ; avis par SMS `ef19fd4` du 21.09), commentaires de
 * `lib/pro/checklist.ts` et `lib/pro/labels.ts`, page publique
 * /maintenance-pompes-relevage.
 *
 * Aucune capture du CRM : ses ecrans portent de vraies fiches. Les visuels
 * sont la page publique des 12 points et un rapport rempli avec des donnees
 * fictives (Regie Exemple SA, Rue de Test 8), mis en page avec le vrai gabarit.
 * Pas de volume d'activite (demandes, interventions) publie sans l'avis de David.
 */
const realisation: Realisation = {
  slug: 'sos-relevage-crm-interventions',
  client: {
    name: 'SOS Relevage',
    sector: 'Pompes de relevage',
    location: 'Genève',
  },
  meta: {
    title: "Un CRM terrain sur mesure, de la demande du site au rapport d'intervention",
    seoTitle: 'CRM terrain sur mesure pour une PME de maintenance | DKDP',
    seoDescription:
      "Application d'interventions sur mesure pour une PME genevoise : demandes du site, planning, checklist de 12 points, photos et rapport.",
    excerpt:
      "Une application installable sur le téléphone du technicien : chaque demande du site devient une intervention planifiée, contrôlée selon les 12 points publiés sur le site, documentée en photos et rendue en rapport, sans ressaisie.",
    dateISO: '2026-07-31',
    publishedISO: '2026-09-25',
    dateModifiedISO: '2026-09-25',
    status: 'live',
  },
  domains: ['application', 'automatisation'],
  sector: 'batiment',
  consent: {
    level: 'interne',
    note: 'Société de David Khazaei et de son associé : présentation neutre, sans nom de personne ni capture de fiche réelle.',
  },
  tags: ['CRM sur mesure', 'Application métier', 'PWA', 'Supabase', 'bexio', 'Google Agenda'],
  answer:
    "Pour SOS Relevage, spécialiste genevois des pompes de relevage, nous avons développé une application d'interventions sur mesure. Chaque demande du site devient une intervention planifiée, contrôlée sur place selon les 12 points publiés sur le site, documentée en photos et rendue en rapport. Un test empêche le site de promettre un point que le rapport ne couvre pas.",
  facts: [
    { label: 'Pour', value: 'SOS Relevage, pompes de relevage, Genève' },
    { label: 'Utilisée par', value: 'Le technicien sur le terrain et le bureau' },
    { label: 'En service', value: 'Depuis le 31 juillet 2026' },
    { label: 'Reliée à', value: 'Site, Google Agenda, bexio, registre fédéral des bâtiments' },
    { label: 'Technologies', value: 'Next.js 15, Supabase à Zurich, Vercel' },
  ],
  cover: {
    src: '/images/realisations/sos-relevage-crm-interventions/rapport-mockup.webp',
    alt: "Deux pages d'un rapport d'intervention SOS Relevage remplies avec des données fictives : problème signalé, conclusion, points contrôlés, recommandations par priorité",
    lead: true,
  },
  problem: {
    title: 'Le rapport promis sur le site devait exister sur le terrain',
    body: "Le site de SOS Relevage promet une visite en douze points de contrôle et un rapport photo remis sous 48 heures. Sans outil, cette promesse repose sur un carnet, des photos perdues dans la galerie du téléphone et un rapport réécrit le soir au bureau.\n\nIl fallait un outil qui reçoive les demandes du site sans ressaisie, planifie les interventions, guide le technicien point par point, range chaque photo au bon endroit et produise un rapport qui rende compte exactement de ce que le site annonce.",
    facts: [
      { label: 'Utilisateurs', value: 'Un technicien sur le terrain, le bureau' },
      { label: 'Départ', value: 'Demandes du site reçues dans Notion' },
      { label: 'Contrainte', value: 'Rendre compte des 12 points publiés' },
    ],
  },
  approach: {
    title: 'Une application installable, branchée sur les données du site',
    body: `Une application web installable sur le téléphone, servie sur un sous-domaine privé et jamais indexée, construite avec Next.js et une base Supabase hébergée à Zurich. Elle partage ses données avec le site : une demande arrive avec l'adresse officielle, l'accès au local et le sujet choisi, puis se convertit en intervention en un geste.

Sur place, le technicien suit la checklist des douze points publiés, avec trois états possibles, une mesure d'isolement consignée à chaque visite et une photo par point. Le rapport s'adapte au type d'intervention : un audit n'a pas les sections d'un dépannage.`,
    bullets: [
      'Application web installable, sur un sous-domaine privé non indexé, avec une barre de navigation pour le pouce',
      "Demandes du site reçues avec l'adresse officielle et l'accès au local, triées « À traiter » et « Traitées »",
      "7 types d'intervention, de l'audit au changement complet, et 4 statuts, de planifiée à facturée",
      'Checklist des 12 points publiés, versionnée : une nouvelle liste ne réécrit jamais les rapports passés',
      "Photos avant, après, par point de contrôle et d'état, rangées par station et par pompe",
      "Rapport par type d'intervention : chaque section y est attendue, possible ou absente",
      'Agenda Google partagé, confirmation et rappel du rendez-vous au client',
      'Client créé dans le CRM = contact bexio complet, prêt pour la facturation',
      "Demande d'avis Google préparée par SMS à la fin d'une intervention",
    ],
  },
  flow: {
    title: "D'une demande à un rapport, dans le même outil",
    intro: "Le trajet d'une demande envoyée depuis le site, jusqu'au suivi du client.",
    steps: [
      { label: 'Demande du site', detail: "adresse officielle, accès au local, sujet", kind: 'source' },
      { label: 'Intervention planifiée', detail: 'agenda Google partagé, confirmation au client', kind: 'outil' },
      { label: 'Checklist sur place', detail: "12 points, 3 états, mesure d'isolement", kind: 'controle' },
      { label: 'Photos par point', detail: "avant, après, contrôle, état de l'installation", kind: 'outil' },
      { label: 'Rapport et suivi', detail: "rapport par type, contact bexio, demande d'avis", kind: 'sortie' },
    ],
    note: "Le rapport remis au client est encore mis en page hors de l'application, à partir de ses données.",
  },
  showcase: {
    title: 'La promesse publiée, la preuve rendue',
    intro:
      "Le site annonce douze points de contrôle, regroupés en six familles. L'application reprend les mêmes codes et les mêmes intitulés, et un test du code échoue au moindre écart : le site ne peut pas promettre ce que le rapport ne couvre pas.",
  },
  highlights: [
    {
      eyebrow: 'Promettre',
      tag: 'Contenu',
      title: 'Douze points publiés, les mêmes dans la checklist',
      body: "La page entretien du site détaille la visite annuelle en douze points, de M.01 à M.12, regroupés par famille technique. Ce sont exactement ceux que le technicien coche sur place : la liste que la régie a lue avant de signer est celle dont le rapport rend compte.",
      image: {
        src: '/images/realisations/sos-relevage-crm-interventions/points-controle-desktop.webp',
        alt: "SOS Relevage, page entretien : les douze points de contrôle M.01 à M.12 en six familles, niveau, électrique, mécanique, cuve, alarme et rapport",
        host: 'sos-relevage.ch',
        path: '/maintenance-pompes-relevage',
      },
      phone: {
        src: '/images/realisations/sos-relevage-crm-interventions/points-controle-mobile.webp',
        alt: 'La même liste des points de contrôle sur mobile, famille par famille',
      },
      points: [
        "Six familles, dans l'ordre de la visite",
        'Trois états seulement : OK, à surveiller, non conforme',
        "Une mesure d'isolement consignée à chaque visite, pour voir venir l'usure",
      ],
    },
  ],
  gallery: [
    {
      src: '/images/realisations/sos-relevage-crm-interventions/rapport-page-1.webp',
      document: true,
      alt: "Rapport d'intervention SOS Relevage, page 1, données fictives : demande, conclusion, actions réalisées et points contrôlés d'un dépannage sur deux pompes",
      caption: "Page 1 d'un rapport de dépannage, remplie avec des données fictives.",
    },
    {
      src: '/images/realisations/sos-relevage-crm-interventions/rapport-page-2.webp',
      document: true,
      alt: "Rapport d'intervention SOS Relevage, page 2, données fictives : point d'attention, matériel provisoire, recommandations par priorité et suite à donner",
      caption: 'Page 2 : le point à corriger, le matériel laissé sur place et les recommandations par priorité.',
    },
  ],
  stack: [
    { label: 'Next.js 15', color: 'chrome' },
    { label: 'Supabase', color: 'green' },
    { label: 'Google Agenda', color: 'blue' },
    { label: 'bexio', color: 'teal' },
  ],
  results: [
    {
      metric: 'Points de contrôle',
      value: '12',
      label: "publiés sur le site, repris à l'identique dans la checklist du rapport",
      source: 'Page entretien de sos-relevage.ch',
      sourceKind: 'publique',
      capturedAt: '2026-09-25',
    },
    {
      metric: "Types d'intervention",
      value: '7',
      label: "chacun avec son modèle de rapport, de l'audit au changement complet",
      source: "Code de l'application",
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
    },
    {
      metric: 'Évolutions',
      value: '111',
      label: "modifications de l'application en moins de huit semaines, au rythme des retours du terrain",
      source: 'Historique git du projet',
      sourceKind: 'dkdp',
      capturedAt: '2026-09-25',
      period: 'du 30 juillet au 21 septembre 2026',
    },
  ],
  lessons: [
    "Trancher la checklist avant d'écrire le rapport. Le 2 août 2026, trois listes incompatibles coexistaient : les 12 points publiés sur le site, 6 contrôles dans le cahier des charges et 8 points sur la page d'audit. Les 12 points publiés ont gagné, parce que c'est la liste que la régie a lue avant de signer.",
    "Parler la langue du terrain. La dernière famille de la checklist s'appelait « Livrable » : le technicien l'a lue « livrage ». C'était du jargon de chef de projet, elle s'appelle « Rapport » depuis le 11 septembre 2026.",
    "Une saisie perdue sur le terrain ne se refait pas. Un simple lien vers l'appareil photo aurait fait perdre les cases déjà cochées : depuis le 17 septembre 2026, le bouton « Photo » d'un point enregistre la checklist avant d'ouvrir la prise de vue.",
  ],
  faq: [
    {
      question: "Pourquoi une application sur mesure plutôt qu'un logiciel d'interventions du marché ?",
      answer:
        "Parce que le site et l'outil partagent les mêmes données : la demande arrive avec l'adresse, l'accès au local et le sujet, et les douze points promis sur le site sont ceux que le rapport couvre. Un logiciel générique aurait obligé à recopier les demandes et ne connaîtrait pas la promesse du site.",
    },
    {
      question: 'Le technicien doit-il installer une application ?',
      answer:
        "Non. C'est une application web qui s'installe depuis le navigateur, sans magasin d'applications, et s'ouvre ensuite comme une application. Elle vit sur un sous-domaine privé, protégé par une connexion et exclu des moteurs de recherche.",
    },
    {
      question: "Les SMS partent-ils de l'application ?",
      answer:
        "Non. Le rappel de rendez-vous et la demande d'avis ouvrent Messages sur le téléphone du technicien, avec le numéro et le texte prêts. Le client répond à une personne, et il n'y a pas de fournisseur de SMS à payer. Les confirmations par email partent de l'adresse de contact de l'entreprise.",
    },
    {
      question: 'Où sont stockées les données et les photos ?',
      answer:
        "Dans une base Supabase hébergée à Zurich, avec les photos. L'application est servie par Vercel, avec les fonctions en Europe.",
    },
    {
      question: 'Le même outil peut-il servir à une autre entreprise de maintenance ?',
      answer:
        "Sa structure oui : demandes, planning, checklist versionnée, photos par point et rapport par type. La checklist, les types d'intervention et le modèle de rapport, eux, sont propres au métier et se réécrivent pour chaque entreprise.",
    },
  ],
  relatedArticles: ['no-code-low-code-pme-suisse', 'automatiser-taches-repetitives-pme', 'protection-donnees-ia-nlpd-pme-suisse'],
}

export default realisation
