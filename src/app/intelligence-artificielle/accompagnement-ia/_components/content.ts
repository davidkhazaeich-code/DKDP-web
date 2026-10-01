/**
 * Contenu de la page Accompagnement IA (FR) et de son miroir EN (AI adoption).
 *
 * Créée le 01/10/2026 pour promouvoir l'offre que DKDP met en place au Groupe PGN.
 * Réécrite le même jour à la demande de David : l'offre n'est PAS « choisir
 * ChatGPT, Claude ou Copilot, rédiger une charte, distribuer des prompts ». C'est
 * comprendre le métier, puis construire des outils IA branchés sur les flux de
 * l'entreprise (messagerie, logiciel métier, intranet), les tester dans une équipe
 * pilote, les déployer et former les équipes à ces outils, sans prompt à écrire.
 * Source : `DEV SPACE/clients Claude/PGN/claude-project/09-projet-ia.md`.
 * Étude de mots-clés, SERP et Mode IA :
 * `DEV SPACE/clients Claude/DKDP/seo-plan-2026-09/accompagnement-ia-2026-10-01/`.
 *
 * Règles : aucun prix, l'accompagnement est sur demande (décision de David du
 * 01/10/2026) ; aucun résultat chiffré sans source (test `chiffres-non-sources`) ;
 * jamais d'adresse email (test `aucun-email-public`). Les réponses de FAQ font 40
 * à 60 mots et nomment DKDP dans leur première phrase quand la question commence
 * par « qui » ou « quelles agences » (GEO, workflow recherche-mots-cles).
 */
import type { Locale } from '@/i18n/config'

export const FR_PATH = '/intelligence-artificielle/accompagnement-ia'

export const CONTENT = {
  fr: {
    crumbHub: 'Intelligence Artificielle',
    crumbPage: 'Accompagnement IA',
    h1: 'Accompagnement IA en entreprise, Genève et Suisse romande',
    headline: ['Votre transformation digitale passe par l’IA, ', 'une tâche à la fois', '.'],
    lead:
      'DKDP accompagne les PME de Suisse romande dans leur transformation digitale et IA. Nous commençons par comprendre votre métier, puis nous construisons les outils qui font le travail répétitif à votre place, branchés sur votre messagerie, votre logiciel métier et votre intranet. Chaque outil passe par une équipe pilote avant d’être déployé, et vos équipes s’en servent sans écrire de prompt.',
    pills: ['Votre métier compris d’abord', 'Branché sur vos logiciels', 'Aucun prompt à écrire'],
    cta: 'Planifier un appel',
    ctaSecondary: 'Voir la méthode',
    stats: [
      { v: 'Pilote', l: 'Une équipe d’abord', sub: 'puis toutes les autres' },
      { v: 'Mensuel', l: 'Compte rendu écrit', sub: 'validé par la direction' },
      { v: '5,0/5', l: 'Note Google', sub: '22 avis sur la fiche DKDP' },
      { v: '2019', l: 'Agence fondée à Genève', sub: 'aux Eaux-Vives' },
    ],
    nav: [
      { label: 'Pour qui', href: '#pour-qui' },
      { label: 'Méthode', href: '#methode' },
      { label: 'Livrables', href: '#livrables' },
      { label: 'Outils', href: '#cas-usage' },
      { label: 'Vos logiciels', href: '#outils' },
      { label: 'FAQ', href: '#faq' },
    ],
    navCta: 'Prendre contact',

    constatTag: 'Le constat',
    constatTitle: 'Le temps se perd dans les tâches que personne ne voit.',
    constatP1:
      'Chaque matin, quelqu’un ouvre les emails un par un, ressaisit un CV dans un formulaire ou recopie ses notes d’appel dans le logiciel. Ces tâches ne demandent aucune décision, mais elles prennent le temps qu’il faudrait passer avec les clients.',
    constatP2:
      'Un abonnement à ChatGPT ou à Copilot ne règle pas ce problème : il faut savoir quoi lui demander, et il ne travaille pas dans votre logiciel métier. L’accompagnement construit donc les outils qui font ces tâches à votre place, là où elles se passent.',
    pourQuiTitle: 'Cet accompagnement vous convient si :',
    pourQui: [
      'Vous dirigez une PME de Suisse romande, sur un ou plusieurs sites.',
      'Vos équipes traitent chaque jour beaucoup d’emails, de documents et d’appels.',
      'Vous travaillez avec une messagerie, un logiciel métier ou un intranet que vous voulez garder.',
      'La direction attend des étapes et des livrables, pas un volume de jours.',
      'Une partie de vos équipes est peu à l’aise avec le numérique, et rien ne doit lui demander plus d’effort.',
    ],

    methodeTag: 'Notre méthode',
    methodeTitle: 'Comprendre, montrer, construire, déployer.',
    methodeIntro:
      'La direction décide de chaque étape. Nous ne passons à la suivante qu’après sa validation, et nous choisissons avec elle l’équipe pilote.',
    steps: [
      {
        title: 'Comprendre votre métier',
        desc: 'Nous passons du temps avec la direction et dans une équipe pour voir comment le travail se fait vraiment. Ensuite seulement, nous vous disons par où nous commencerions.',
      },
      {
        title: 'Montrer avant de construire',
        desc: 'La direction voit chaque outil fonctionner sur des données fictives calquées sur votre quotidien, puis elle apprend à s’en servir. Elle décide alors de ce qui part en construction.',
      },
      {
        title: 'Construire avec une équipe pilote',
        desc: 'Nous branchons l’outil sur votre messagerie, votre logiciel ou votre intranet, puis l’équipe pilote s’en sert au quotidien. Rien ne part sans validation humaine, et nous ajustons d’après ses retours.',
      },
      {
        title: 'Déployer et former',
        desc: 'Une fois l’outil fiable, nous l’étendons aux autres équipes et nous les formons à cet outil précis. Chaque trimestre, un nouvel outil arrive avec sa formation.',
      },
    ],

    livrablesTag: 'Livrables',
    livrablesTitle: 'Ce que vous recevez, mois par mois.',
    livrablesIntro:
      'Les trois premiers mois suivent une feuille de route datée. Ensuite, l’accompagnement continue au mois, avec un nouvel outil chaque trimestre et les mêmes comptes rendus.',
    months: [
      {
        label: 'Mois 1',
        title: 'Le terrain est compris et le premier outil choisi.',
        items: ['Visite de la direction et d’une équipe', 'Tâches à automatiser, par priorité', 'Démonstration du premier outil'],
      },
      {
        label: 'Mois 2',
        title: 'Le premier outil tourne dans l’équipe pilote.',
        items: ['Outil branché sur vos logiciels', 'Garde-fous : rien ne part sans validation', 'Retours de l’équipe pilote corrigés'],
      },
      {
        label: 'Mois 3',
        title: 'L’outil se déploie et le suivant se prépare.',
        items: ['Outil étendu aux autres équipes', 'Équipes formées à cet outil', 'Deuxième outil en construction'],
      },
    ],
    everyMonthLabel: 'Chaque mois',
    everyMonth: 'Un compte rendu écrit de ce qui a été livré, et un point avec la direction avant l’étape suivante.',

    casTag: 'Les outils',
    casTitle: 'Les outils que nous construisons en premier.',
    casIntro:
      'Nous commençons par les tâches qui reviennent chaque jour, parce que tout le monde les connaît et que le temps gagné s’y voit vite.',
    cas: [
      { title: 'Le tri automatique des emails', desc: 'Le matin et le soir, l’outil classe la boîte de réception (à rappeler, à traiter, à archiver), prépare les réponses courantes en brouillon et envoie une synthèse. Personne n’envoie rien sans relire.' },
      { title: 'Du CV ou du document à la fiche', desc: 'Un CV, même manuscrit, une facture ou un contrat devient une fiche dans votre format, prête à entrer dans votre logiciel ou votre intranet.' },
      { title: 'La dictée après un appel', desc: 'Quelques phrases dictées après un appel ou une visite deviennent un compte rendu propre, rangé dans la fiche du client, au même modèle pour toute l’équipe.' },
      { title: 'Offres et argumentaires', desc: 'Les offres, les relances et les argumentaires partent de votre méthode et de vos modèles, dans le ton de votre maison.' },
      { title: 'Un assistant sur vos procédures', desc: 'Vos équipes posent leurs questions à un assistant qui répond à partir de vos documents internes, sources à l’appui.' },
      { title: 'La synthèse pour la direction', desc: 'Chaque matin ou chaque semaine, la direction reçoit une synthèse de ce qui demande son attention.' },
    ],
    casMore: 'Ces outils reposent sur nos',
    casMoreAgents: 'agents IA',
    casMoreAnd: 'et nos',
    casMoreAuto: 'automatisations',
    casMoreEnd: ', construits ici au rythme de vos équipes.',

    outilsTag: 'Vos logiciels',
    outilsTitle: 'Branché sur ce que vous avez déjà.',
    outilsIntro:
      'Nous ne remplaçons pas vos logiciels. Nous construisons à côté et nous nous branchons dessus, pour que vos équipes restent dans les écrans qu’elles connaissent.',
    outils: [
      { name: 'Votre messagerie', fit: 'Outlook, Microsoft 365 ou Gmail : l’outil lit et classe dans la boîte que vos équipes utilisent déjà.', note: 'Accès limité aux boîtes concernées, réglé avec votre responsable informatique.' },
      { name: 'Votre logiciel métier', fit: 'ERP, CRM ou logiciel de branche : nous passons par ce qu’il permet, que ce soit une API, un import ou un export.', note: 'Avant de construire, nous vérifions avec vous ce que l’éditeur prépare, pour que vous ne payiez pas deux fois.' },
      { name: 'Votre intranet et vos documents', fit: 'Fiches, procédures et modèles nourrissent l’outil, qui répond et remplit dans votre format.', note: 'Le modèle d’IA (Claude, ChatGPT ou Mistral) se choisit selon la tâche et vos contraintes de données.' },
    ],
    outilsData:
      'Vos données restent dans le giron de l’entreprise : offres professionnelles sans entraînement des modèles sur vos données, accès de chaque outil limités au strict nécessaire, et données fictives pendant les démonstrations.',

    equipeTag: 'Qui intervient',
    equipeTitle: 'Deux interlocuteurs, qui connaissent votre dossier.',
    equipeP:
      'Romane, formatrice IA, anime les démonstrations et forme la direction puis les équipes aux outils livrés. David Khazaei, fondateur de DKDP, cadre l’accompagnement avec la direction et construit les outils. D’un mois à l’autre, vous parlez donc aux mêmes personnes.',
    photoAlt: 'Romane, formatrice IA chez DKDP, anime une formation pour l’équipe d’une entreprise dans ses locaux à Genève',
    photoCaption: 'Formation d’une équipe dans ses locaux, animée par Romane.',
    team: [
      { name: 'Romane', role: 'Formatrice IA', src: '/images/team/romane.png' },
      { name: 'David Khazaei', role: 'Fondateur, construit les outils', src: '/images/team/david-khazaei.png' },
    ],

    bridgeTitle: 'Pas encore prêt pour un accompagnement ?',
    bridges: [
      { tag: 'Audit IA', title: 'Commencer par un diagnostic', desc: 'Un plan d’action priorisé, avant d’engager quoi que ce soit.', href: '/intelligence-artificielle/audit-conseil' },
      { tag: 'Formation IA', title: 'Former une équipe en une journée', desc: 'ChatGPT, Claude et Copilot sur vos cas réels.', href: '/formation-entreprise/ia' },
      { tag: 'Agents IA', title: 'Construire un seul outil', desc: 'Un agent relié à vos logiciels, livré en projet.', href: '/intelligence-artificielle/agents-ia' },
    ],

    faqTitle: 'Vos questions sur l’accompagnement IA.',
    schemaName: 'Accompagnement IA en entreprise, Suisse romande',
    schemaDesc:
      'Accompagnement de la transformation IA des PME : compréhension du métier, outils IA construits sur mesure et branchés sur la messagerie, le logiciel métier et l’intranet, test avec une équipe pilote, déploiement et formation des équipes.',
    schemaType: 'Accompagnement IA en entreprise',
    breadcrumbHome: 'Accueil',

    visual: {
      header: 'Tri du matin · Exemple',
      auto: 'Automatique',
      check: 'À valider',
      rows: [
        { from: 'Demande de devis, régie immobilière', tag: 'À rappeler', tone: 'green' },
        { from: 'Candidature spontanée, CV joint', tag: 'Fiche créée', tone: 'chrome' },
        { from: 'Question sur un délai de livraison', tag: 'Brouillon prêt', tone: 'violet' },
        { from: 'Facture fournisseur', tag: 'Classée', tone: 'chrome' },
        { from: 'Lettre d’information', tag: 'Archivée', tone: 'muted' },
      ],
      report: 'Synthèse du matin',
      reportSub: 'Envoyée à 7h00, rien ne part sans validation',
      mini: [
        { v: 'Messagerie', l: 'Branché sur' },
        { v: 'Pilote', l: 'Une équipe d’abord' },
        { v: 'Sans prompt', l: 'Pour vos équipes' },
      ],
    },
  },

  en: {
    crumbHub: 'Artificial Intelligence',
    crumbPage: 'AI adoption',
    h1: 'AI adoption support for businesses in Geneva and French-speaking Switzerland',
    headline: ['Your digital transformation runs on AI, ', 'one task at a time', '.'],
    lead:
      'DKDP supports SMEs in French-speaking Switzerland through their digital and AI transformation. We start by understanding your business, then we build the tools that do the repetitive work for you, connected to your email, your business software and your intranet. Each tool goes through a pilot team before it is rolled out, and your staff use it without writing a single prompt.',
    pills: ['Your business understood first', 'Connected to your software', 'No prompts to write'],
    cta: 'Book a call',
    ctaSecondary: 'See the method',
    stats: [
      { v: 'Pilot', l: 'One team first', sub: 'then all the others' },
      { v: 'Monthly', l: 'Written report', sub: 'approved by leadership' },
      { v: '5.0/5', l: 'Google rating', sub: '22 reviews on DKDP’s profile' },
      { v: '2019', l: 'Agency founded in Geneva', sub: 'in Eaux-Vives' },
    ],
    nav: [
      { label: 'Who it’s for', href: '#pour-qui' },
      { label: 'Method', href: '#methode' },
      { label: 'Deliverables', href: '#livrables' },
      { label: 'Tools', href: '#cas-usage' },
      { label: 'Your software', href: '#outils' },
      { label: 'FAQ', href: '#faq' },
    ],
    navCta: 'Contact us',

    constatTag: 'The situation',
    constatTitle: 'Time gets lost in the tasks nobody sees.',
    constatP1:
      'Every morning, someone opens emails one by one, retypes a CV into a form or copies call notes into the software. These tasks require no decision, yet they take the time that should go to clients.',
    constatP2:
      'A ChatGPT or Copilot subscription does not solve this: you have to know what to ask, and it does not work inside your business software. Ongoing support therefore builds the tools that do these tasks for you, where they happen.',
    pourQuiTitle: 'This support is right for you if:',
    pourQui: [
      'You run an SME in French-speaking Switzerland, on one or several sites.',
      'Your teams handle many emails, documents and calls every day.',
      'You work with email, business software or an intranet that you want to keep.',
      'Leadership expects steps and deliverables, not a number of days.',
      'Some of your staff are not comfortable with digital tools, and nothing should ask more effort of them.',
    ],

    methodeTag: 'Our method',
    methodeTitle: 'Understand, show, build, roll out.',
    methodeIntro: 'Leadership decides on each step. We only move on once it is approved, and we choose the pilot team together.',
    steps: [
      { title: 'Understand your business', desc: 'We spend time with leadership and inside one team to see how the work is really done. Only then do we tell you where we would start.' },
      { title: 'Show before building', desc: 'Leadership sees each tool working on fictional data modelled on your daily work, then learns to use it. It then decides what goes into production.' },
      { title: 'Build with a pilot team', desc: 'We connect the tool to your email, software or intranet, and the pilot team uses it every day. Nothing is sent without human approval, and we adjust based on feedback.' },
      { title: 'Roll out and train', desc: 'Once the tool is reliable, we extend it to the other teams and train them on that specific tool. Each quarter, a new tool arrives with its training.' },
    ],

    livrablesTag: 'Deliverables',
    livrablesTitle: 'What you receive, month by month.',
    livrablesIntro: 'The first three months follow a dated roadmap. After that, the support continues monthly, with a new tool each quarter and the same reports.',
    months: [
      { label: 'Month 1', title: 'The ground is understood and the first tool chosen.', items: ['Visit with leadership and one team', 'Tasks to automate, by priority', 'Demonstration of the first tool'] },
      { label: 'Month 2', title: 'The first tool runs in the pilot team.', items: ['Tool connected to your software', 'Safeguards: nothing sent without approval', 'Pilot team feedback addressed'] },
      { label: 'Month 3', title: 'The tool rolls out and the next one is prepared.', items: ['Tool extended to the other teams', 'Teams trained on this tool', 'Second tool under construction'] },
    ],
    everyMonthLabel: 'Every month',
    everyMonth: 'A written report of what was delivered, and a meeting with leadership before the next step.',

    casTag: 'The tools',
    casTitle: 'The tools we build first.',
    casIntro: 'We start with tasks that come back every day, because everyone knows them and the time saved shows quickly.',
    cas: [
      { title: 'Automatic email sorting', desc: 'Morning and evening, the tool sorts the inbox (call back, handle, archive), drafts the routine replies and sends a summary. Nobody sends anything without reading it.' },
      { title: 'From CV or document to record', desc: 'A CV, even handwritten, an invoice or a contract becomes a record in your format, ready to go into your software or intranet.' },
      { title: 'Dictation after a call', desc: 'A few sentences dictated after a call or a visit become a clean report, filed in the client record, in the same format for the whole team.' },
      { title: 'Proposals and sales arguments', desc: 'Proposals, follow-ups and sales arguments start from your method and your templates, in your company’s tone.' },
      { title: 'An assistant for your procedures', desc: 'Your teams ask an assistant that answers from your internal documents, with sources.' },
      { title: 'A summary for leadership', desc: 'Every morning or every week, leadership receives a summary of what needs its attention.' },
    ],
    casMore: 'These tools rely on our',
    casMoreAgents: 'AI agents',
    casMoreAnd: 'and',
    casMoreAuto: 'automations',
    casMoreEnd: ', built here at your teams’ pace.',

    outilsTag: 'Your software',
    outilsTitle: 'Connected to what you already have.',
    outilsIntro: 'We do not replace your software. We build alongside it and connect to it, so your teams stay on the screens they know.',
    outils: [
      { name: 'Your email', fit: 'Outlook, Microsoft 365 or Gmail: the tool reads and sorts in the mailbox your teams already use.', note: 'Access limited to the mailboxes concerned, set up with your IT contact.' },
      { name: 'Your business software', fit: 'ERP, CRM or industry software: we go through what it allows, whether an API, an import or an export.', note: 'Before building, we check with you what the vendor is preparing, so you never pay twice.' },
      { name: 'Your intranet and documents', fit: 'Records, procedures and templates feed the tool, which answers and fills in your format.', note: 'The AI model (Claude, ChatGPT or Mistral) is chosen for the task and your data constraints.' },
    ],
    outilsData: 'Your data stays within the company: business plans with no model training on your data, each tool’s access limited to what it needs, and fictional data during demonstrations.',

    equipeTag: 'Who you work with',
    equipeTitle: 'Two people who know your file.',
    equipeP:
      'Romane, AI trainer, runs the demonstrations and trains leadership, then the teams, on the tools delivered. David Khazaei, founder of DKDP, steers the engagement with leadership and builds the tools. From one month to the next, you talk to the same people.',
    photoAlt: 'Romane, AI trainer at DKDP, leads a training session for a company team on its premises in Geneva',
    photoCaption: 'Training a team on its own premises, led by Romane.',
    team: [
      { name: 'Romane', role: 'AI trainer', src: '/images/team/romane.png' },
      { name: 'David Khazaei', role: 'Founder, builds the tools', src: '/images/team/david-khazaei.png' },
    ],

    bridgeTitle: 'Not ready for ongoing support yet?',
    bridges: [
      { tag: 'AI audit', title: 'Start with a diagnosis', desc: 'A prioritised action plan, before committing to anything.', href: '/intelligence-artificielle/audit-conseil' },
      { tag: 'AI training', title: 'Train a team in one day', desc: 'ChatGPT, Claude and Copilot on your real cases.', href: '/formation-entreprise/ia' },
      { tag: 'AI agents', title: 'Build a single tool', desc: 'An agent connected to your software, delivered as a project.', href: '/intelligence-artificielle/agents-ia' },
    ],

    faqTitle: 'Your questions about AI adoption support.',
    schemaName: 'AI adoption consulting for businesses, French-speaking Switzerland',
    schemaDesc:
      'Support for SMEs bringing AI into their processes: understanding the business, custom AI tools connected to email, business software and intranet, pilot team testing, roll-out and team training.',
    schemaType: 'AI adoption consulting',
    breadcrumbHome: 'Home',

    visual: {
      header: 'Morning sort · Example',
      auto: 'Automatic',
      check: 'To approve',
      rows: [
        { from: 'Quote request, property manager', tag: 'Call back', tone: 'green' },
        { from: 'Unsolicited application, CV attached', tag: 'Record created', tone: 'chrome' },
        { from: 'Question about a delivery date', tag: 'Draft ready', tone: 'violet' },
        { from: 'Supplier invoice', tag: 'Filed', tone: 'chrome' },
        { from: 'Newsletter', tag: 'Archived', tone: 'muted' },
      ],
      report: 'Morning summary',
      reportSub: 'Sent at 7:00, nothing goes out without approval',
      mini: [
        { v: 'Email', l: 'Connected to' },
        { v: 'Pilot', l: 'One team first' },
        { v: 'No prompts', l: 'For your teams' },
      ],
    },
  },
}

export type PageContent = (typeof CONTENT)['fr']

/** FAQ : chaque réponse fait 40 à 60 mots et répond comme la question est tapée. */
export const FAQ: Record<Locale, { question: string; answer: string }[]> = {
  fr: [
    {
      question: 'Quelles agences proposent un accompagnement en IA à Genève ?',
      answer:
        'DKDP, agence genevoise fondée en 2019, accompagne les PME de Genève et de Suisse romande dans leur transformation digitale et IA. L’agence commence par comprendre le métier, puis elle construit des outils branchés sur la messagerie, le logiciel métier ou l’intranet, les teste avec une équipe pilote et forme ensuite toutes les équipes.',
    },
    {
      question: 'Qui peut former la direction puis accompagner les équipes chaque mois ?',
      answer:
        'DKDP propose ce format. Romane, formatrice IA, montre d’abord à la direction les outils sur des données fictives tirées de son quotidien et la forme à s’en servir. Ensuite, DKDP revient chaque mois pour construire les outils, les tester, former les équipes et rendre compte à la direction, qui valide chaque étape.',
    },
    {
      question: 'Combien coûte un accompagnement IA pour une entreprise en Suisse ?',
      answer:
        'Le prix dépend du périmètre : nombre de jours par mois, outils à construire et équipes à former. DKDP le chiffre sur demande, après un premier échange avec la direction, sous forme d’étapes datées et de livrables. Les licences des outils IA restent à la charge de l’entreprise.',
    },
    {
      question: 'Comment intégrer l’IA dans une entreprise ?',
      answer:
        'Commencez par une tâche qui revient chaque jour et que personne n’aime faire, comme le tri des emails. Faites construire un outil qui s’en charge dans votre messagerie ou votre logiciel, testez-le avec une équipe pilote, puis étendez-le et formez les équipes. Un abonnement à un chatbot seul ne suffit pas.',
    },
    {
      question: 'Nos équipes doivent-elles savoir écrire des prompts ?',
      answer:
        'Non. Les outils que DKDP construit s’utilisent depuis les écrans que vos équipes connaissent déjà : un dossier de la messagerie, un bouton dans un formulaire, une dictée. Les consignes données à l’IA sont écrites une fois par DKDP, testées avec l’équipe pilote, puis tenues à jour.',
    },
    {
      question: 'Quelle différence entre une formation IA et un accompagnement IA ?',
      answer:
        'Une formation apprend à se servir de l’IA en une demi-journée ou une journée. L’accompagnement, lui, construit les outils qui font le travail dans vos processus, les teste avec une équipe pilote, puis forme chaque équipe à ces outils. Chez DKDP, ces formations font partie de l’accompagnement.',
    },
    {
      question: 'Et si notre logiciel métier prépare déjà sa propre IA ?',
      answer:
        'DKDP vérifie avec vous ce que l’éditeur propose ou prépare avant de construire quoi que ce soit, pour que vous ne payiez pas deux fois. L’accompagnement se concentre alors sur ce que le logiciel ne fera pas, et il se branche sur ce que le logiciel permet : une API, un import ou un export.',
    },
    {
      question: 'Nos données restent-elles confidentielles ?',
      answer:
        'Oui. DKDP utilise des offres professionnelles dont l’éditeur s’engage à ne pas entraîner ses modèles sur vos données, limite les accès de chaque outil au strict nécessaire et travaille sur des données fictives pendant les démonstrations. Les règles d’usage suivent la nLPD, et les données restent dans le giron de l’entreprise.',
    },
  ],
  en: [
    {
      question: 'Which agencies offer AI adoption support in Geneva?',
      answer:
        'DKDP, a Geneva agency founded in 2019, supports SMEs in Geneva and French-speaking Switzerland through their digital and AI transformation. The agency first understands the business, then builds tools connected to email, business software or the intranet, tests them with a pilot team and then trains every team.',
    },
    {
      question: 'Who can train leadership and then support teams every month?',
      answer:
        'DKDP offers this format. Romane, AI trainer, first shows leadership the tools on fictional data drawn from its daily work and trains it to use them. DKDP then comes back every month to build the tools, test them, train the teams and report to leadership, which approves each step.',
    },
    {
      question: 'How much does AI adoption support cost for a company in Switzerland?',
      answer:
        'The price depends on the scope: days per month, tools to build and teams to train. DKDP quotes it on request, after a first conversation with leadership, as dated steps and deliverables. AI tool licences remain at the company’s expense.',
    },
    {
      question: 'How do you bring AI into a company?',
      answer:
        'Start with one task that comes back every day and that nobody enjoys, such as sorting emails. Have a tool built that handles it inside your email or software, test it with a pilot team, then extend it and train the teams. A chatbot subscription alone is not enough.',
    },
    {
      question: 'Do our teams need to know how to write prompts?',
      answer:
        'No. The tools DKDP builds are used from the screens your teams already know: an email folder, a button in a form, a dictation. The instructions given to the AI are written once by DKDP, tested with the pilot team, then kept up to date.',
    },
    {
      question: 'What is the difference between AI training and AI adoption support?',
      answer:
        'Training teaches people to use AI in half a day or a day. Adoption support builds the tools that do the work inside your processes, tests them with a pilot team, then trains each team on those tools. At DKDP, this training is part of the support.',
    },
    {
      question: 'What if our business software is already preparing its own AI?',
      answer:
        'DKDP checks with you what the vendor offers or is preparing before building anything, so you never pay twice. The support then focuses on what the software will not do, and connects to what the software allows: an API, an import or an export.',
    },
    {
      question: 'Does our data stay confidential?',
      answer:
        'Yes. DKDP uses business plans whose vendor commits not to train its models on your data, limits each tool’s access to what it needs and works on fictional data during demonstrations. Usage rules follow Swiss data protection law, and the data stays within the company.',
    },
  ],
}
