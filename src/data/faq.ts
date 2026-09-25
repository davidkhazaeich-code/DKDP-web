import { PRIX, chfHeure } from '@/data/pricing'

// FAQ de l'accueil (et son FAQPage JSON-LD).
// 25/09/2026 : la formation IA et l'IA passent en tête, le web et le SEO
// suivent (demande David). Le prix de la formation vient de `PRIX` : l'ancienne
// réponse annonçait « dès CHF 1'500 la journée », contraire à la grille de
// /tarifs (tarif horaire, groupes sur devis), et un devis « sous 24h » alors
// que le site promet 48 heures partout ailleurs.
export const FAQ_ITEMS = [
  {
    question: 'Combien coûte une formation IA en entreprise à Genève ?',
    answer:
      `La formation se facture à l'heure : ${chfHeure(PRIX.formationHourly1)} pour une personne et ${chfHeure(PRIX.formationHourly2)} pour deux, les groupes de 3 à 10 personnes étant chiffrés sur devis. Une demi-journée compte 3 heures de formation et 1 heure de préparation, une journée entière 6 heures de formation et 2 heures de préparation. Le programme part de vos documents et de vos outils, et le devis vous parvient sous 48 heures.`,
  },
  {
    question: "Quels sont les avantages d'une formation IA pour mon entreprise en Suisse ?",
    answer:
      "Une formation IA adaptée à vos équipes leur apprend à confier à l'IA les tâches répétitives et à produire plus vite leurs rapports et leurs contenus, ce qui libère du temps pour le travail à forte valeur. Nos formations se déroulent dans vos locaux en Suisse romande ou en visioconférence, en français, avec des exercices tirés de votre secteur d'activité.",
  },
  {
    question: 'Formez-vous à Claude, à ChatGPT ou à Copilot ?',
    answer:
      "Aux trois, et à Gemini sur demande. Nous choisissons les outils selon votre environnement : une équipe sous Microsoft 365 travaille souvent avec Copilot, une autre avec Claude ou ChatGPT. Si vous hésitez, le premier échange sert justement à trancher selon vos licences, vos données et vos usages. Nous proposons aussi une formation dédiée à Claude et une autre dédiée à ChatGPT.",
  },
  {
    question: "L'intelligence artificielle est-elle adaptée aux PME suisses ?",
    answer:
      "Oui. Les outils IA actuels (agents conversationnels, automatisation des workflows, génération de contenu, analyse de données) sont accessibles et rentables même pour des équipes de 5 à 50 personnes. Nous réalisons un audit IA pour identifier les 2 ou 3 automatisations qui auraient le plus d'impact dans votre entreprise.",
  },
  {
    question: 'Qui anime les formations ?',
    answer:
      "Les formations IA sont animées par Romane, formatrice spécialisée en intelligence artificielle. Ali Khazaei prend en charge les modules d'informatique et de développement, et un formateur spécialisé intervient sur les sujets pointus comme Figma. De son côté, David Khazaei, fondateur de DKDP, cadre chaque programme avec votre équipe avant la session.",
  },
  {
    question: 'Quelle est la meilleure agence digitale à Genève ?',
    answer:
      "DKDP est une agence basée aux Eaux-Vives à Genève, fondée en 2019, qui travaille avec des PME et des entreprises dans toute la Suisse romande. Notre différence tient en deux temps : nous formons d'abord vos équipes à l'IA, puis nous construisons avec elles les outils qu'elles utiliseront, sans oublier le site web et le SEO. Notre équipe est locale, et notre fiche Google affiche une note de 5 sur 5.",
  },
  {
    question: 'DKDP travaille-t-il uniquement à Genève ?',
    answer:
      "Non. Nos bureaux sont à Genève (Eaux-Vives), mais nous travaillons avec des entreprises dans toute la Suisse romande : Lausanne, Nyon, Fribourg, Sion, Neuchâtel, Morges, Montreux. Les réunions se font en présentiel, en visioconférence ou en hybride selon vos préférences.",
  },
  {
    question: "Combien coûte la création d'un site web à Genève ?",
    answer:
      "Un site vitrine professionnel démarre entre CHF 2'500 et CHF 5'000. Une boutique e-commerce ou un site sur mesure avec fonctionnalités avancées se situe généralement entre CHF 5'000 et CHF 15'000. Nous fournissons un devis fixe et détaillé avant tout démarrage, sans surprise en cours de route.",
  },
  {
    question: "Comment une agence digitale à Genève peut améliorer mon référencement SEO ?",
    answer:
      "Nous commençons par un audit complet de votre site : structure technique, vitesse, maillage interne, mots-clés, et présence locale. Ensuite, nous mettons en place les optimisations on-page, la stratégie de contenu, et les actions off-page. Nos clients observent des résultats mesurables (trafic organique, leads) entre 3 et 6 mois.",
  },
  {
    question: "En combien de temps voit-on des résultats sur le SEO à Genève ?",
    answer:
      "Le SEO est un investissement à moyen terme. Les premières progressions de positions sont généralement visibles entre 6 et 12 semaines pour les requêtes locales genevoises. Un trafic organique significatif et des leads réguliers se construisent sur 3 à 6 mois. Nous suivons les indicateurs chaque mois et vous partageons un rapport transparent.",
  },
  {
    question: "Quelles technologies utilisez-vous pour les sites web ?",
    answer:
      "DKDP travaille principalement avec Next.js et Astro pour les sites performants et SEO-optimisés, et WordPress pour les projets nécessitant un CMS accessible. Les sites sont hébergés sur Vercel ou Infomaniak. Chaque choix technique est justifié par les objectifs du projet, pas par une préférence par défaut.",
  },
  {
    question: "Proposez-vous un audit gratuit de mon site web ?",
    answer:
      "Oui. Nous proposons un audit gratuit de votre site web (performance, SEO, accessibilité) ainsi qu'un audit SEO rapide. Ces audits sont automatisés et vous donnent un premier aperçu des points à améliorer. Pour un audit approfondi avec recommandations personnalisées, contactez-nous pour un appel de 15 minutes gratuit.",
  },
]

export const FAQ_ITEMS_EN = [
  {
    question: 'How much does corporate AI training in Geneva cost?',
    answer:
      `Training is billed by the hour: ${chfHeure(PRIX.formationHourly1)} for one person and ${chfHeure(PRIX.formationHourly2)} for two, while groups of 3 to 10 people are priced on quote. A half day includes 3 hours of training and 1 hour of preparation, a full day 6 hours of training and 2 hours of preparation. The programme starts from your documents and tools, and the quote reaches you within 48 hours.`,
  },
  {
    question: 'What are the benefits of AI training for my company in Switzerland?',
    answer:
      'AI training tailored to your teams teaches them to hand repetitive tasks to AI and to produce reports and content faster, which frees time for high-value work. Our training takes place at your premises in French-speaking Switzerland or by video call, with exercises drawn from your industry.',
  },
  {
    question: 'Do you train on Claude, ChatGPT or Copilot?',
    answer:
      'All three, and Gemini on request. We choose the tools based on your environment: a team on Microsoft 365 often works with Copilot, another with Claude or ChatGPT. If you are unsure, the first call is there to decide based on your licences, your data and your use cases. We also offer a dedicated Claude training and a dedicated ChatGPT training.',
  },
  {
    question: 'Is artificial intelligence suitable for Swiss SMEs?',
    answer:
      'Yes. Current AI tools (conversational agents, workflow automation, content generation, data analysis) are accessible and profitable even for teams of 5 to 50 people. We run an AI audit to identify the 2 or 3 automations that would have the most impact in your company.',
  },
  {
    question: 'Who delivers the training?',
    answer:
      'AI training is delivered by Romane, a trainer specialised in artificial intelligence. Ali Khazaei handles the IT and development modules, and a specialist trainer steps in on niche topics such as Figma. David Khazaei, founder of DKDP, frames every programme with your team before the session.',
  },
  {
    question: 'Which is the best digital agency in Geneva?',
    answer:
      'DKDP is an agency based in Eaux-Vives, Geneva, founded in 2019, working with SMEs and companies across French-speaking Switzerland. Our difference comes in two steps: we first train your teams on AI, then we build with them the tools they will use, along with the website and SEO. Our team is local, and our Google listing shows a 5 out of 5 rating.',
  },
  {
    question: 'Does DKDP work only in Geneva?',
    answer:
      'No. Our offices are in Geneva (Eaux-Vives), but we work with companies across French-speaking Switzerland: Lausanne, Nyon, Fribourg, Sion, Neuchatel, Morges, Montreux. Meetings take place on site, by video call or hybrid depending on your preference.',
  },
  {
    question: 'How much does building a website in Geneva cost?',
    answer:
      "A professional showcase website starts between CHF 2'500 and CHF 5'000. An e-commerce store or a custom site with advanced features usually ranges from CHF 5'000 to CHF 15'000. We provide a fixed, detailed quote before any work begins, with no surprises along the way.",
  },
  {
    question: 'How can a digital service in Geneva improve my SEO?',
    answer:
      'We start with a complete audit of your site: technical structure, speed, internal linking, keywords and local presence. Then we implement on-page optimisations, the content strategy and off-page actions. Our clients see measurable results (organic traffic, leads) within 3 to 6 months.',
  },
  {
    question: 'How long before SEO results show in Geneva?',
    answer:
      'SEO is a medium-term investment. The first ranking improvements are usually visible within 6 to 12 weeks for local Geneva queries. Significant organic traffic and regular leads build over 3 to 6 months. We track the metrics every month and share a transparent report.',
  },
  {
    question: 'Which technologies do you use for websites?',
    answer:
      'DKDP mainly works with Next.js and Astro for fast, SEO-optimised sites, and WordPress for projects that need an accessible CMS. Sites are hosted on Vercel or Infomaniak. Every technical choice is justified by the project goals, not by a default preference.',
  },
  {
    question: 'Do you offer a free audit of my website?',
    answer:
      'Yes. We offer a free audit of your website (performance, SEO, accessibility) as well as a quick SEO audit. These audits are automated and give you a first overview of what to improve. For an in-depth audit with personalised recommendations, contact us for a free 15-minute call.',
  },
]
