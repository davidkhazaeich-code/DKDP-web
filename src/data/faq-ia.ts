import { PRIX, chf } from '@/data/pricing'

export const FAQ_IA = [
  {
    question: "Qu'est-ce qu'un agent IA et comment ça fonctionne concrètement ?",
    answer:
      "Un agent IA est un programme qui utilise un grand modèle de langage (ChatGPT, Claude, Gemini) pour raisonner et agir de façon autonome. Il peut répondre à des emails, analyser des documents, déclencher des actions dans vos logiciels ou extraire des données. DKDP conçoit ces agents en les connectant à vos outils existants (CRM, ERP, Drive, Notion…).",
  },
  // 25/09/2026 : « ROI positif en moins de 3 mois » retiré, aucune source.
  // « CHF 1'500 à 4'000 » et « CHF 5'000 à 15'000 » remplacés par les
  // fourchettes de PRIX (celles de /tarifs et de la FAQ anglaise).
  {
    question: "Combien coûte l'intégration de l'IA dans une entreprise ?",
    answer:
      `Un audit et conseil IA coûte ${chf(PRIX.auditIaStandard)} en version standard et ${chf(PRIX.auditIaComplet)} en version complète, après un appel découverte gratuit de ${PRIX.discoveryCallMinutes} minutes. Ensuite, une automatisation métier coûte entre ${chf(PRIX.automatisationFrom)} et ${chf(PRIX.automatisationTo)}, un agent IA sur mesure entre ${chf(PRIX.agentFrom)} et ${chf(PRIX.agentTo)}, et l'intégration d'un LLM dans vos outils entre ${chf(PRIX.llmFrom)} et ${chf(PRIX.llmTo)}. Un projet plus large, avec plusieurs agents et plusieurs systèmes connectés, fait l'objet d'un devis sur mesure.`,
  },
  {
    question: "Est-ce que l'IA est sécurisée pour mes données confidentielles ?",
    answer:
      "C'est une priorité pour DKDP. On peut déployer des solutions sur hébergement local (sans envoi de données vers des serveurs tiers), utiliser des instances cloud privées, ou configurer des LLMs open-source comme Llama 4 pour les données les plus sensibles. Chaque projet IA inclut une analyse des risques de confidentialité.",
  },
  {
    question: "En combien de temps peut-on déployer une première solution IA ?",
    answer:
      "Un premier agent ou workflow automatisé simple peut être opérationnel en 1 à 3 semaines. Un projet plus complexe (intégration multi-systèmes, agent avec mémoire et historique) prend 4 à 8 semaines. On commence toujours par l'automatisation qui génère le plus d'économies de temps.",
  },
  // 25/09/2026 : « 8 à 10 heures par semaine par personne » retiré, aucune source.
  {
    question: "L'IA peut-elle remplacer des postes dans mon entreprise ?",
    answer:
      "L'IA n'est pas conçue pour remplacer vos collaborateurs, mais pour leur faire gagner du temps sur les tâches répétitives. Concrètement, elle prend en charge la saisie de données, la rédaction de rapports ou le tri des emails. Vos équipes se concentrent donc sur ce qui crée vraiment de la valeur.",
  },
  {
    question: "Faut-il avoir des compétences techniques pour utiliser l'IA ?",
    answer:
      "Non. DKDP livre des solutions clé en main, accessibles sans formation technique. Une session de prise en main est incluse dans chaque projet. Si vous souhaitez que vos équipes comprennent les outils en profondeur, on propose aussi des formations IA adaptées à tous les niveaux.",
  },
  {
    question: "Quels outils IA recommandez-vous pour une PME suisse ?",
    answer:
      "Pour la productivité quotidienne : ChatGPT Plus ou Claude Pro. Pour l'automatisation de workflows : Make (ex-Integromat) ou n8n. Pour les agents sur mesure : LangChain ou CrewAI. Pour l'hébergement local : Ollama avec Llama 4. DKDP sélectionne les outils en fonction de votre stack existant et de vos contraintes budgétaires.",
  },
  // 25/09/2026 : « en moyenne, ROI positif en moins de 3 mois » retiré, aucune source.
  {
    question: "Comment mesurer le retour sur investissement d'une solution IA ?",
    answer:
      "On mesure le ROI en trois dimensions : temps économisé par tâche, volume de traitement augmenté, et erreurs réduites. DKDP établit un baseline avant le déploiement et un suivi mensuel après. Le ROI se calcule donc sur vos propres chiffres, et non sur une moyenne.",
  },
  {
    question: "L'IA peut-elle s'intégrer à mes logiciels actuels (CRM, ERP…) ?",
    answer:
      "Oui. DKDP intègre des solutions IA dans la plupart des outils du marché : Salesforce, HubSpot, Pipedrive, SAP, Odoo, Notion, Airtable, Google Workspace, Microsoft 365 et bien d'autres. Si votre outil dispose d'une API ou d'un webhook, une intégration est possible.",
  },
]
