/**
 * Contenu de la page Accompagnement IA (FR) et de son miroir EN (AI adoption).
 *
 * Créée le 01/10/2026 pour promouvoir l'offre vendue au Groupe PGN : formation
 * de la direction, puis accompagnement mensuel par jours-intervenant, avec des
 * livrables datés. Étude de mots-clés, SERP et Mode IA qui justifient la page :
 * `DEV SPACE/clients Claude/DKDP/seo-plan-2026-09/accompagnement-ia-2026-10-01/`.
 *
 * Règles : aucun prix sur cette page, l'accompagnement est sur demande
 * (décision de David du 01/10/2026), aucun résultat chiffré sans source (test `chiffres-non-sources`), jamais
 * d'adresse email (test `aucun-email-public`). Les réponses de FAQ font 40 à
 * 60 mots et nomment DKDP dans leur première phrase quand la question commence
 * par « qui » ou « quelles agences » (GEO, workflow recherche-mots-cles).
 */
import type { Locale } from '@/i18n/config'

export const FR_PATH = '/intelligence-artificielle/accompagnement-ia'

export const CONTENT = {
  fr: {
    crumbHub: 'Intelligence Artificielle',
    crumbPage: 'Accompagnement IA',
    h1: 'Accompagnement IA en entreprise, Genève et Suisse romande',
    headline: ['Votre entreprise passe à l’IA, ', 'un mois après l’autre', '.'],
    lead:
      'DKDP accompagne les PME de Suisse romande dans leur transformation IA. Nous formons d’abord la direction, puis nous choisissons et paramétrons avec vous l’outil qui convient (ChatGPT, Claude ou Copilot) avant de le déployer équipe par équipe. Chaque mois, un compte rendu écrit liste ce qui a été livré, et la direction valide l’étape suivante.',
    pills: ['Livrables datés chaque mois', 'Formations des équipes comprises', 'La direction valide chaque étape'],
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
      { label: 'Cas d’usage', href: '#cas-usage' },
      { label: 'FAQ', href: '#faq' },
    ],
    navCta: 'Prendre contact',

    constatTag: 'Le constat',
    constatTitle: 'Vos équipes utilisent déjà l’IA. Il leur manque un cadre.',
    constatP1:
      'Souvent, quelques collaborateurs se servent de ChatGPT sur un compte personnel, les autres n’osent pas, et personne ne sait ce qui sort de l’entreprise. Une formation d’une journée lance le mouvement ; sans suite, les anciennes habitudes reviennent pourtant vite.',
    constatP2:
      'L’accompagnement installe l’IA dans le travail de tous les jours. Nous partons de vos tâches réelles, nous mettons l’outil en place avec des garde-fous, puis nous revenons chaque mois jusqu’à ce que l’usage tienne seul.',
    pourQuiTitle: 'Cet accompagnement vous convient si :',
    pourQui: [
      'Vous dirigez une PME de Suisse romande, sur un ou plusieurs sites.',
      'Vos équipes passent une bonne partie de la journée sur des emails, des documents et des comptes rendus.',
      'Vous travaillez déjà avec Microsoft 365 ou Google Workspace, et avec un logiciel métier.',
      'La direction attend des étapes et des livrables, pas un volume de jours.',
      'Une partie de vos équipes est peu à l’aise avec le numérique, et rien ne doit lui demander plus d’effort.',
    ],

    methodeTag: 'Notre méthode',
    methodeTitle: 'Quatre étapes, de la direction aux équipes.',
    methodeIntro:
      'La direction décide de chaque étape. Nous ne passons à la suivante qu’après sa validation, et nous choisissons avec elle les équipes où nous intervenons.',
    steps: [
      {
        title: 'Former la direction',
        desc: 'Une demi-journée sur vos cas réels. Nous montrons l’IA sur des données fictives calquées sur votre quotidien, puis chacun pratique sur une tâche de sa semaine.',
      },
      {
        title: 'Choisir et paramétrer l’outil',
        desc: 'Nous retenons l’outil qui s’accorde à vos logiciels. Ensuite, nous ouvrons les comptes, réglons les droits et rédigeons avec vous la charte d’utilisation.',
      },
      {
        title: 'Tester sur une équipe pilote',
        desc: 'Un premier usage part en test dans une équipe, par exemple le tri des emails du matin. Rien ne part sans validation humaine, et nous ajustons d’après les retours.',
      },
      {
        title: 'Étendre et former',
        desc: 'Une fois l’usage stable, nous l’étendons aux autres équipes et nous les formons. Chaque trimestre, un nouvel usage arrive avec sa formation.',
      },
    ],

    livrablesTag: 'Livrables',
    livrablesTitle: 'Ce que vous recevez, mois par mois.',
    livrablesIntro:
      'Les trois premiers mois suivent une feuille de route datée. Ensuite, l’accompagnement continue au mois, avec les mêmes comptes rendus.',
    months: [
      {
        label: 'Mois 1',
        title: 'L’outil est choisi, paramétré et sécurisé.',
        items: ['Comptes ouverts et droits réglés', 'Charte d’utilisation et garde-fous', 'Bibliothèque de prompts de la direction'],
      },
      {
        label: 'Mois 2',
        title: 'Un premier usage tourne en test.',
        items: ['Usage choisi avec la direction', 'Modèles de réponses et de documents', 'Retours de l’équipe pilote corrigés'],
      },
      {
        label: 'Mois 3',
        title: 'L’usage passe en routine et s’étend.',
        items: ['Usage étendu aux autres équipes', 'Équipes formées, par groupes', 'Deuxième usage en préparation'],
      },
    ],
    everyMonthLabel: 'Chaque mois',
    everyMonth: 'Un compte rendu écrit de ce qui a été livré, et un point avec la direction avant l’étape suivante.',

    casTag: 'Cas d’usage',
    casTitle: 'Les premiers usages que nous mettons en place.',
    casIntro:
      'Nous commençons par les tâches qui reviennent chaque jour, parce que tout le monde les connaît et que le gain s’y voit vite.',
    cas: [
      { title: 'Le tri des emails du matin', desc: 'L’IA classe la boîte de réception (à rappeler, à traiter, à archiver) et prépare les réponses courantes en brouillon. Personne n’envoie rien sans relire.' },
      { title: 'Du document à la fiche', desc: 'Un CV, une facture ou un contrat devient une fiche dans votre format, prête à coller dans votre logiciel métier.' },
      { title: 'La dictée après un appel', desc: 'Quelques phrases dictées après un appel ou une visite deviennent un compte rendu propre, rangé au bon endroit.' },
      { title: 'Offres et argumentaires', desc: 'Les offres, les relances et les argumentaires partent de vos modèles, dans le ton de votre maison.' },
      { title: 'Un assistant sur vos procédures', desc: 'Vos équipes posent leurs questions à un assistant qui répond à partir de vos documents internes, sources à l’appui.' },
      { title: 'La synthèse pour la direction', desc: 'Chaque matin ou chaque semaine, la direction reçoit une synthèse de ce qui demande son attention.' },
    ],
    casMore: 'Un outil doit se brancher sur vos logiciels ? Nos',
    casMoreAgents: 'agents IA',
    casMoreAnd: 'et nos',
    casMoreAuto: 'automatisations',
    casMoreEnd: 'prennent alors le relais dans la formule Complet.',

    outilsTag: 'Les outils',
    outilsTitle: 'ChatGPT, Claude ou Copilot : le bon outil pour vos équipes.',
    outilsIntro:
      'Aucun outil ne gagne partout. Nous choisissons avec vous d’après vos logiciels, vos tâches et vos contraintes de données, puis nous paramétrons l’outil retenu.',
    outils: [
      { name: 'Microsoft 365 Copilot', fit: 'Pour les équipes qui travaillent dans Outlook, Teams, Word et Excel.', note: 'Propulsé par GPT-6 Astra, il lit vos emails et vos fichiers dans les droits de chacun.' },
      { name: 'ChatGPT', fit: 'Pour un assistant polyvalent, la voix et les premiers agents.', note: 'ChatGPT Astra (GPT-6) dans une offre entreprise, avec des espaces partagés par équipe.' },
      { name: 'Claude', fit: 'Pour les longs documents, l’analyse et la rédaction soignée.', note: 'Claude Fable 5.1, avec des projets qui gardent le contexte de chaque dossier.' },
    ],
    outilsData:
      'Avec une offre professionnelle, l’éditeur s’engage à ne pas entraîner ses modèles sur vos données. Nous ajoutons une charte qui dit ce que chacun peut confier à l’outil.',


    equipeTag: 'Qui intervient',
    equipeTitle: 'Deux interlocuteurs, qui connaissent votre dossier.',
    equipeP:
      'Romane, formatrice IA, anime les formations de la direction et des équipes. David Khazaei, fondateur de DKDP, cadre l’accompagnement avec la direction et construit les outils sur mesure. D’un mois à l’autre, vous parlez donc aux mêmes personnes.',
    photoAlt: 'Romane, formatrice IA chez DKDP, anime une formation pour l’équipe d’une entreprise dans ses locaux à Genève',
    photoCaption: 'Formation d’une équipe dans ses locaux, animée par Romane.',
    team: [
      { name: 'Romane', role: 'Formatrice IA', src: '/images/team/romane.png' },
      { name: 'David Khazaei', role: 'Fondateur, cadre l’accompagnement', src: '/images/team/david-khazaei.png' },
    ],

    bridgeTitle: 'Pas encore prêt pour un accompagnement ?',
    bridges: [
      { tag: 'Audit IA', title: 'Commencer par un diagnostic', desc: 'Un plan d’action priorisé, avant d’engager quoi que ce soit.', href: '/intelligence-artificielle/audit-conseil' },
      { tag: 'Formation IA', title: 'Former une équipe en une journée', desc: 'ChatGPT, Claude et Copilot sur vos cas réels.', href: '/formation-entreprise/ia' },
      { tag: 'Agents IA', title: 'Construire un outil sur mesure', desc: 'Un agent relié à vos logiciels, livré en projet.', href: '/intelligence-artificielle/agents-ia' },
    ],

    faqTitle: 'Vos questions sur l’accompagnement IA.',
    schemaName: 'Accompagnement IA en entreprise, Suisse romande',
    schemaDesc:
      'Accompagnement mensuel de la transformation IA des PME : formation de la direction, paramétrage de ChatGPT, Claude ou Copilot, test sur une équipe pilote, formation des équipes et livrables datés.',
    schemaType: 'Accompagnement IA en entreprise',
    breadcrumbHome: 'Accueil',

    visual: {
      header: 'Feuille de route · Exemple',
      done: 'Livré',
      validated: 'Validé',
      rows: [
        { m: 'Mois 1', t: 'Outil paramétré', items: ['Comptes et droits', 'Charte d’utilisation', 'Direction formée'] },
        { m: 'Mois 2', t: 'Usage en test', items: ['Équipe pilote', 'Tri des emails', 'Retours corrigés'] },
        { m: 'Mois 3', t: 'Usage en routine', items: ['Toutes les équipes', 'Formations', 'Deuxième usage'] },
      ],
      report: 'Compte rendu du mois',
      reportSub: 'Envoyé à la direction',
      mini: [
        { v: 'Pilote', l: 'Une équipe d’abord' },
        { v: 'Mensuel', l: 'Compte rendu' },
        { v: 'Compris', l: 'Formations' },
      ],
    },
  },

  en: {
    crumbHub: 'Artificial Intelligence',
    crumbPage: 'AI adoption',
    h1: 'AI adoption support for businesses in Geneva and French-speaking Switzerland',
    headline: ['Your company adopts AI, ', 'one month at a time', '.'],
    lead:
      'DKDP helps SMEs in French-speaking Switzerland adopt AI. We first train the leadership team, then we choose and configure the right tool with you (ChatGPT, Claude or Copilot) before rolling it out team by team. Every month, a written report lists what was delivered, and leadership approves the next step.',
    pills: ['Dated deliverables every month', 'Team training included', 'Leadership approves each step'],
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
      { label: 'Use cases', href: '#cas-usage' },
      { label: 'FAQ', href: '#faq' },
    ],
    navCta: 'Contact us',

    constatTag: 'The situation',
    constatTitle: 'Your teams already use AI. What they lack is a framework.',
    constatP1:
      'Often, a few employees use ChatGPT on a personal account, the others don’t dare, and nobody knows what leaves the company. A one-day training gets things moving; without follow-up, however, old habits come back quickly.',
    constatP2:
      'Ongoing support builds AI into everyday work. We start from your real tasks, we set up the tool with safeguards, and we come back every month until the new habits hold on their own.',
    pourQuiTitle: 'This support is right for you if:',
    pourQui: [
      'You run an SME in French-speaking Switzerland, on one or several sites.',
      'Your teams spend a large part of the day on emails, documents and reports.',
      'You already work with Microsoft 365 or Google Workspace, and with business software.',
      'Leadership expects steps and deliverables, not a number of days.',
      'Some of your staff are not comfortable with digital tools, and nothing should ask more effort of them.',
    ],

    methodeTag: 'Our method',
    methodeTitle: 'Four steps, from leadership to every team.',
    methodeIntro:
      'Leadership decides on each step. We only move on once it is approved, and we choose together which teams we work with.',
    steps: [
      { title: 'Train the leadership team', desc: 'Half a day on your real cases. We show AI on fictional data modelled on your daily work, then everyone practises on a task from their week.' },
      { title: 'Choose and configure the tool', desc: 'We pick the tool that fits your software. Then we open the accounts, set permissions and write the usage policy with you.' },
      { title: 'Test with a pilot team', desc: 'A first use case goes into testing with one team, for instance sorting the morning emails. Nothing is sent without human approval, and we adjust based on feedback.' },
      { title: 'Extend and train', desc: 'Once the use case is stable, we extend it to the other teams and train them. Each quarter, a new use case arrives with its training.' },
    ],

    livrablesTag: 'Deliverables',
    livrablesTitle: 'What you receive, month by month.',
    livrablesIntro: 'The first three months follow a dated roadmap. After that, the support continues monthly, with the same reports.',
    months: [
      { label: 'Month 1', title: 'The tool is chosen, configured and secured.', items: ['Accounts opened and permissions set', 'Usage policy and safeguards', 'Leadership prompt library'] },
      { label: 'Month 2', title: 'A first use case runs in testing.', items: ['Use case chosen with leadership', 'Reply and document templates', 'Pilot team feedback addressed'] },
      { label: 'Month 3', title: 'The use case becomes routine and spreads.', items: ['Extended to the other teams', 'Teams trained, in groups', 'Second use case in preparation'] },
    ],
    everyMonthLabel: 'Every month',
    everyMonth: 'A written report of what was delivered, and a meeting with leadership before the next step.',

    casTag: 'Use cases',
    casTitle: 'The first use cases we put in place.',
    casIntro: 'We start with tasks that come back every day, because everyone knows them and the gain shows quickly.',
    cas: [
      { title: 'Sorting the morning emails', desc: 'AI sorts the inbox (call back, handle, archive) and drafts the routine replies. Nobody sends anything without reading it.' },
      { title: 'From document to record', desc: 'A CV, an invoice or a contract becomes a record in your format, ready to paste into your business software.' },
      { title: 'Dictation after a call', desc: 'A few sentences dictated after a call or a visit become a clean report, filed in the right place.' },
      { title: 'Proposals and sales arguments', desc: 'Proposals, follow-ups and sales arguments start from your templates, in your company’s tone.' },
      { title: 'An assistant for your procedures', desc: 'Your teams ask an assistant that answers from your internal documents, with sources.' },
      { title: 'A summary for leadership', desc: 'Every morning or every week, leadership receives a summary of what needs its attention.' },
    ],
    casMore: 'A tool needs to connect to your software? Our',
    casMoreAgents: 'AI agents',
    casMoreAnd: 'and',
    casMoreAuto: 'automations',
    casMoreEnd: 'take over in the Complete plan.',

    outilsTag: 'The tools',
    outilsTitle: 'ChatGPT, Claude or Copilot: the right tool for your teams.',
    outilsIntro: 'No tool wins everywhere. We choose with you based on your software, your tasks and your data constraints, then we configure the chosen tool.',
    outils: [
      { name: 'Microsoft 365 Copilot', fit: 'For teams who work in Outlook, Teams, Word and Excel.', note: 'Powered by GPT-6 Astra, it reads your emails and files within each person’s permissions.' },
      { name: 'ChatGPT', fit: 'For a versatile assistant, voice and first agents.', note: 'ChatGPT Astra (GPT-6) on a business plan, with shared team workspaces.' },
      { name: 'Claude', fit: 'For long documents, analysis and careful writing.', note: 'Claude Fable 5.1, with projects that keep the context of each file.' },
    ],
    outilsData: 'On a business plan, the vendor commits not to train its models on your data. We add a policy stating what everyone may entrust to the tool.',


    equipeTag: 'Who you work with',
    equipeTitle: 'Two people who know your file.',
    equipeP:
      'Romane, AI trainer, leads the leadership and team training sessions. David Khazaei, founder of DKDP, steers the engagement with leadership and builds the custom tools. From one month to the next, you talk to the same people.',
    photoAlt: 'Romane, AI trainer at DKDP, leads a training session for a company team on its premises in Geneva',
    photoCaption: 'Training a team on its own premises, led by Romane.',
    team: [
      { name: 'Romane', role: 'AI trainer', src: '/images/team/romane.png' },
      { name: 'David Khazaei', role: 'Founder, steers the engagement', src: '/images/team/david-khazaei.png' },
    ],

    bridgeTitle: 'Not ready for ongoing support yet?',
    bridges: [
      { tag: 'AI audit', title: 'Start with a diagnosis', desc: 'A prioritised action plan, before committing to anything.', href: '/intelligence-artificielle/audit-conseil' },
      { tag: 'AI training', title: 'Train a team in one day', desc: 'ChatGPT, Claude and Copilot on your real cases.', href: '/formation-entreprise/ia' },
      { tag: 'AI agents', title: 'Build a custom tool', desc: 'An agent connected to your software, delivered as a project.', href: '/intelligence-artificielle/agents-ia' },
    ],

    faqTitle: 'Your questions about AI adoption support.',
    schemaName: 'AI adoption consulting for businesses, French-speaking Switzerland',
    schemaDesc:
      'Monthly support for SMEs adopting AI: leadership training, ChatGPT, Claude or Copilot configuration, pilot team testing, team training and dated deliverables.',
    schemaType: 'AI adoption consulting',
    breadcrumbHome: 'Home',

    visual: {
      header: 'Roadmap · Example',
      done: 'Delivered',
      validated: 'Approved',
      rows: [
        { m: 'Month 1', t: 'Tool configured', items: ['Accounts and permissions', 'Usage policy', 'Leadership trained'] },
        { m: 'Month 2', t: 'Use case in testing', items: ['Pilot team', 'Email sorting', 'Feedback addressed'] },
        { m: 'Month 3', t: 'Use case in routine', items: ['All teams', 'Training', 'Second use case'] },
      ],
      report: 'Monthly report',
      reportSub: 'Sent to leadership',
      mini: [
        { v: 'Pilot', l: 'One team first' },
        { v: 'Monthly', l: 'Report' },
        { v: 'Included', l: 'Training' },
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
        'DKDP, agence genevoise fondée en 2019, accompagne les PME de Genève et de Suisse romande dans leur passage à l’IA. L’accompagnement commence par la formation de la direction, se poursuit par le paramétrage de ChatGPT, Claude ou Copilot et un test sur une équipe pilote, puis s’étend à toutes les équipes, avec un compte rendu écrit chaque mois.',
    },
    {
      question: 'Qui peut former la direction puis accompagner les équipes chaque mois ?',
      answer:
        'DKDP propose exactement ce format. Romane, formatrice IA, forme d’abord la direction sur ses cas réels pendant une demi-journée. Ensuite, DKDP revient chaque mois, selon un volume de jours fixé avec la direction, pour mettre en place les usages, former les équipes et rendre compte, la direction validant chaque étape.',
    },
    {
      question: 'Combien coûte un accompagnement IA pour une entreprise en Suisse ?',
      answer:
        'Le prix dépend du périmètre : nombre de jours par mois, équipes à former et outils à construire. DKDP le chiffre sur demande, après un premier échange avec la direction, sous forme d’étapes datées et de livrables. Les licences des outils IA restent à la charge de l’entreprise.',
    },
    {
      question: 'Comment intégrer l’IA dans une entreprise ?',
      answer:
        'Commencez par la direction, puis par une seule tâche qui revient chaque jour, comme le tri des emails. Choisissez ensuite un outil professionnel, posez une charte d’utilisation et testez sur une équipe pilote avant d’étendre. Enfin, formez chaque équipe et revenez chaque mois, car un usage ne tient que s’il est suivi.',
    },
    {
      question: 'Quelle est la meilleure IA pour les entreprises ?',
      answer:
        'Aucune ne gagne partout. Microsoft 365 Copilot convient aux équipes qui travaillent dans Outlook, Teams et Excel. ChatGPT reste l’assistant le plus polyvalent, tandis que Claude excelle sur les longs documents et la rédaction. DKDP choisit avec vous d’après vos logiciels, vos tâches et vos contraintes de données, puis paramètre l’outil retenu.',
    },
    {
      question: 'Quelle différence entre une formation IA et un accompagnement IA ?',
      answer:
        'Une formation transmet une méthode en une demi-journée ou une journée. L’accompagnement, lui, met l’IA en place dans votre travail réel : outil paramétré, charte, usages testés puis étendus, équipes formées au fil des mois. Chez DKDP, les formations des équipes sont d’ailleurs comprises dans les jours de l’accompagnement.',
    },
    {
      question: 'Combien de temps faut-il pour que les équipes utilisent l’IA au quotidien ?',
      answer:
        'Comptez trois mois pour un premier usage en routine. Le premier mois installe l’outil et forme la direction, le deuxième teste un usage sur une équipe pilote, et le troisième l’étend en formant les équipes. Ensuite, l’accompagnement continue au mois, avec un nouvel usage chaque trimestre.',
    },
    {
      question: 'Nos données restent-elles confidentielles ?',
      answer:
        'Oui, grâce à deux règles posées dès le premier mois. Vos équipes utilisent une offre professionnelle, dont l’éditeur s’engage à ne pas entraîner ses modèles sur vos données, et une charte précise ce qui peut être confié à l’outil, selon la nLPD. Pendant les formations, nous travaillons en outre sur des données fictives.',
    },
  ],
  en: [
    {
      question: 'Which agencies offer AI adoption support in Geneva?',
      answer:
        'DKDP, a Geneva agency founded in 2019, helps SMEs in Geneva and French-speaking Switzerland adopt AI. The engagement starts with leadership training, continues with configuring ChatGPT, Claude or Copilot and testing it with a pilot team, then extends to every team, with a written report each month.',
    },
    {
      question: 'Who can train leadership and then support teams every month?',
      answer:
        'DKDP offers exactly this format. Romane, AI trainer, first trains the leadership team on its real cases for half a day. DKDP then comes back every month, for a number of days agreed with leadership, to set up use cases, train the teams and report, with leadership approving each step.',
    },
    {
      question: 'How much does AI adoption support cost for a company in Switzerland?',
      answer:
        'The price depends on the scope: days per month, teams to train and tools to build. DKDP quotes it on request, after a first conversation with leadership, as dated steps and deliverables. AI tool licences remain at the company’s expense.',
    },
    {
      question: 'How do you bring AI into a company?',
      answer:
        'Start with leadership, then with one task that comes back every day, such as sorting emails. Next, choose a business-grade tool, set a usage policy and test with a pilot team before extending. Finally, train each team and come back every month, because a habit only holds when it is followed up.',
    },
    {
      question: 'What is the best AI for businesses?',
      answer:
        'None wins everywhere. Microsoft 365 Copilot suits teams who work in Outlook, Teams and Excel. ChatGPT remains the most versatile assistant, while Claude excels at long documents and writing. DKDP chooses with you based on your software, your tasks and your data constraints, then configures the chosen tool.',
    },
    {
      question: 'What is the difference between AI training and AI adoption support?',
      answer:
        'Training teaches a method in half a day or a day. Adoption support, by contrast, puts AI into your real work: configured tool, usage policy, use cases tested then extended, teams trained over the months. At DKDP, team training is included in the support days.',
    },
    {
      question: 'How long until teams use AI every day?',
      answer:
        'Allow three months for a first use case to become routine. The first month sets up the tool and trains leadership, the second tests a use case with a pilot team, and the third extends it while training the teams. After that, the support continues monthly, with a new use case each quarter.',
    },
    {
      question: 'Does our data stay confidential?',
      answer:
        'Yes, thanks to two rules set in the first month. Your teams use a business plan, whose vendor commits not to train its models on your data, and a policy states what may be entrusted to the tool, in line with Swiss data protection law. During training, we also work on fictional data.',
    },
  ],
}
