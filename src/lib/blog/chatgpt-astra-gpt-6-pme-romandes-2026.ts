import type { Article } from './types'

const article: Article = {
  slug: 'chatgpt-astra-gpt-6-pme-romandes-2026',
  category: 'ia',
  title: 'ChatGPT Astra (GPT-6) : ce qui change vraiment pour les PME romandes',
  excerpt:
    "OpenAI a sorti ChatGPT Astra (GPT-6) le 3 septembre 2026 : un modèle qui pilote un ordinateur, remplit des formulaires et livre des documents finis. Voici ce qu'il change pour une PME romande, où il est vraiment disponible selon l'abonnement, et ce qu'on ne lui confie jamais.",
  date: '10 septembre 2026',
  dateISO: '2026-09-10',
  readTime: '8 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/chatgpt-astra-gpt-6-hero.webp',
    alt: "ChatGPT Astra GPT-6 : poste de travail d'une PME à Genève où l'IA agit seule à l'écran, curseur en mouvement et documents qui se remplissent, 2026",
  },
  images: [
    {
      src: '/images/blog/chatgpt-astra-trois-surfaces-chat-work-codex.webp',
      alt: 'ChatGPT Astra GPT-6 : les trois surfaces de ChatGPT, Chat, Work et Codex, et où le modèle est disponible pour une PME romande en 2026',
      caption:
        "Trois surfaces pour un seul abonnement : Chat pour converser, Work pour confier une mission longue, Codex pour développer. Selon le forfait, Astra n'est pas dans les trois.",
    },
  ],
  tags: ['ChatGPT Astra', 'GPT-6', 'OpenAI', 'ChatGPT Work', 'IA', 'PME', 'Genève', '2026'],
  seoTitle: 'ChatGPT Astra (GPT-6) : ce qui change pour les PME romandes',
  seoDescription:
    "ChatGPT Astra (GPT-6) est sorti le 3 septembre 2026. Ce qui change pour une PME romande : un modèle qui agit, où il est disponible selon le forfait, et la nLPD.",
  faq: [
    {
      question: 'ChatGPT Astra est-il inclus dans ChatGPT Plus ?',
      answer:
        "En partie. Sur Plus, Astra est disponible dans ChatGPT Work et dans Codex, mais la conversation classique reste sur GPT-5.6 Sol. OpenAI n'a pas annoncé de date pour l'arrivée d'Astra dans le chat de Plus.",
    },
    {
      question: 'Quelle est la différence entre GPT-6 Astra et GPT-5.6 Sol ?',
      answer:
        "Astra est conçu pour agir : piloter un ordinateur, remplir des formulaires, produire des documents finis. Il offre un contexte de 1'050'000 tokens et un taux d'hallucination mesuré par OpenAI à 4,2 % contre 12,2 % pour Sol. Pour rédiger et résumer, Sol reste suffisant dans la plupart des cas.",
    },
    {
      question: 'Faut-il passer sur ChatGPT Pro pour utiliser Astra ?',
      answer:
        "Non, sauf si vous voulez Astra dans la conversation classique. Pro le propose sous le nom GPT-6 Pro, avec un plafond de 50 ou 200 messages par semaine selon le palier. Pour les missions longues, Plus donne déjà accès à Astra dans Work.",
    },
    {
      question: 'Peut-on utiliser ChatGPT Astra avec des données clients en Suisse ?',
      answer:
        'Seulement dans un cadre maîtrisé : compte Business ou Enterprise, entraînement désactivé, aucune donnée sensible au sens de la nLPD ni dossier couvert par le secret professionnel, et une vérification préalable du lieu où les données sont traitées et conservées.',
    },
    {
      question: 'Astra remplace-t-il Claude dans les recommandations DKDP ?',
      answer:
        "Non. Claude reste notre recommandation pour l'analyse, la profondeur et la confidentialité. ChatGPT Astra est le bon choix pour automatiser un poste de travail, pour les missions longues avec Work et pour les images. Copilot s'impose si votre entreprise travaille dans Microsoft 365.",
    },
  ],
  content: `## Ce qui est sorti, en trois lignes

OpenAI a présenté ChatGPT Astra (GPT-6) le 3 septembre 2026, d'abord en aperçu limité (programme de cybersécurité Daybreak), puis l'a ouvert aux abonnés payants le 4 septembre. Les comptes Plus l'ont reçu entre le 6 et le 8 septembre. Au 10 septembre, le déploiement reste échelonné : deux comptes identiques peuvent le voir à des jours différents.

Astra remplace GPT-5.6 Sol comme modèle phare d'OpenAI. Pour situer : la famille GPT-5.6 est sortie le 9 juillet 2026 en trois tailles, Luna, Terra et Sol, du moins au plus capable. Luna équipe les comptes gratuits et Go depuis août.

OpenAI le présente comme son modèle le plus intelligent et le plus aligné à ce jour. C'est un positionnement, pas une mesure.

## Ce qu'Astra change concrètement

### Agir plutôt que répondre

Astra est conçu pour exécuter, pas seulement pour rédiger. Il pilote un ordinateur et un navigateur, clique, remplit des champs, lit ce qui apparaît à l'écran et enchaîne des étapes seul jusqu'à livrer un document fini. Sur OSWorld 2.0, un test de pilotage d'ordinateur, OpenAI annonce 72,6 % contre 65,7 % pour Sol, avec 47 % de temps en moins par tâche.

Deux chiffres méritent votre attention. Un contexte de 1'050'000 tokens : Astra lit d'un coup un dossier entier, contrats, échanges et annexes compris, sans découpage. Et un taux d'hallucination mesuré par OpenAI à 4,2 %, contre 12,2 % pour Sol. Ces scores viennent d'OpenAI et n'ont pas été répliqués de façon indépendante. Ils décrivent une tendance, pas une garantie sur vos propres documents.

Entrées texte et image, sortie texte, pas d'audio ni de vidéo en natif. Ses connaissances s'arrêtent au 30 avril 2026.

### Les nouveautés produit

Côté usage, quatre changements. Les appels d'outils sont asynchrones : le modèle continue de travailler pendant qu'une recherche ou un script s'exécute. Le « mid-turn steering » permet de corriger la consigne en cours d'exécution, sans tout relancer. L'effort de raisonnement se règle en pleine conversation, rapide pour trier, approfondi pour analyser. Et dans Codex, l'outil de développement, Astra garde des notes d'une fenêtre de contexte à l'autre au lieu de tout résumer, avec un historique qui reste consultable.

Dernier point : Astra est le premier modèle classé « Critical » en cybersécurité dans le Preparedness Framework d'OpenAI. La version publique est bridée et refuse certaines demandes liées à la sécurité informatique. Sa sortie a été retardée pour ajouter des garde-fous après l'incident Hugging Face de juillet 2026.

## Le piège de l'abonnement

C'est le point que la plupart des articles ratent. ChatGPT n'est plus une seule interface mais trois surfaces. Chat, la conversation classique. Work, sorti le 9 juillet 2026, un agent pour les missions longues : il rassemble le contexte dans vos applications connectées, avance seul pendant des heures et livre un tableur, une présentation, un document ou une application web. Codex, pour le développement logiciel. Astra n'est pas disponible partout, et l'endroit dépend de votre forfait.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.15);background:rgba(212,212,216,0.03)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1.2rem">Où Astra est disponible, par forfait (septembre 2026)</div>
<div style="overflow-x:auto">
<div style="display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:0.5rem;min-width:540px;align-items:stretch">
<div></div>
<div style="text-align:center;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#e4e4e7;padding:0.4rem 0">Chat</div>
<div style="text-align:center;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#e4e4e7;padding:0.4rem 0">Work</div>
<div style="text-align:center;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#e4e4e7;padding:0.4rem 0">Codex</div>
<div style="display:flex;flex-direction:column;justify-content:center;gap:0.15rem;padding:0.6rem 0.5rem"><span style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Free et Go</span><span style="font-size:0.68rem;color:#71717a">0 et 8 USD par mois</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(212,212,216,0.06);border:1px solid rgba(212,212,216,0.15);font-size:0.78rem;font-weight:600;color:#D4D4D8;text-align:center">GPT-5.6 Luna</div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);font-size:0.85rem;font-weight:700;color:#fca5a5;text-align:center">non</div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);font-size:0.85rem;font-weight:700;color:#fca5a5;text-align:center">non</div>
<div style="display:flex;flex-direction:column;justify-content:center;gap:0.15rem;padding:0.6rem 0.5rem"><span style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Plus</span><span style="font-size:0.68rem;color:#71717a">CHF 20 par mois</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(212,212,216,0.06);border:1px solid rgba(212,212,216,0.15);font-size:0.78rem;font-weight:600;color:#D4D4D8;text-align:center">GPT-5.6 Sol<span style="font-size:0.65rem;font-weight:500;color:#71717a;line-height:1.3">fenêtres d'usage de 5 h</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui</div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui</div>
<div style="display:flex;flex-direction:column;justify-content:center;gap:0.15rem;padding:0.6rem 0.5rem"><span style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Pro</span><span style="font-size:0.68rem;color:#71717a">100 ou 200 USD par mois</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui<span style="font-size:0.65rem;font-weight:500;color:#71717a;line-height:1.3">GPT-6 Pro, 50 ou 200 messages par semaine</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui</div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui</div>
<div style="display:flex;flex-direction:column;justify-content:center;gap:0.15rem;padding:0.6rem 0.5rem"><span style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Business et Enterprise</span><span style="font-size:0.68rem;color:#71717a">dès 20 USD par siège, Enterprise sur devis</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui<span style="font-size:0.65rem;font-weight:500;color:#71717a;line-height:1.3">GPT-6 Pro dans le chat</span></div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui</div>
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;padding:0.75rem 0.5rem;border-radius:10px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);font-size:0.85rem;font-weight:700;color:#4ade80;text-align:center">oui</div>
</div>
</div>
<div style="margin-top:1.1rem;font-size:0.7rem;color:#71717a;line-height:1.55">Astra est compris dans les forfaits. Les crédits supplémentaires s'achètent à part et n'ouvrent pas le chat sur les forfaits qui ne l'ont pas. Sur Enterprise, Astra est désactivé par défaut et l'administrateur l'active. Déploiement encore échelonné au 10 septembre 2026.</div>
</div>

Sur Plus (CHF 20 par mois), Astra n'est présent que dans Work et Codex. La conversation classique reste sur GPT-5.6 Sol, avec des fenêtres d'usage de 5 heures, et OpenAI n'a pas dit quand cela changerait. Pour l'avoir dans le chat, il faut Pro, à 100 ou 200 USD par mois, sous le nom « GPT-6 Pro », avec un plafond de 50 ou 200 messages par semaine. Business et Enterprise l'ont sur les trois surfaces.

Avant de passer votre équipe sur Pro, une question simple : avez-vous besoin d'Astra dans la conversation, ou dans les missions ? Pour rédiger, résumer et reformuler, Sol suffit le plus souvent. Pour confier une mission de plusieurs heures à Work, Plus donne déjà Astra. Le savoir évite de payer Pro pour rien.

___IMG:chatgpt-astra-trois-surfaces-chat-work-codex.webp___

## Trois usages concrets pour une PME

### Mettre à jour un CRM depuis les e-mails

Une PME de services reçoit ses demandes par e-mail, les recopie dans son CRM, puis met à jour le statut après chaque échange. Avec Work, on pourrait décrire le résultat attendu, un contact créé avec ses champs remplis et une note de suivi, et laisser l'agent lire la boîte connectée, ouvrir le CRM et saisir. Le garde-fou : l'agent propose, une personne valide avant l'enregistrement, et il n'a pas les droits de suppression.

### Préparer une offre à partir d'un appel d'offres

Un bureau d'ingénieurs répond à un appel d'offres public. Le cahier des charges fait des dizaines de pages, les références internes dorment dans plusieurs dossiers. Le contexte d'un million de tokens permettrait de tout charger d'un coup et de demander une première structure d'offre qui suit le plan imposé, avec la référence qui correspond à chaque exigence. Le garde-fou : les prix, les engagements contractuels et les CV restent écrits par vous, et aucun document reçu d'un tiers sous accord de confidentialité n'entre dans l'outil.

### Analyser un export comptable

Une fiduciaire ou un responsable financier exporte un grand livre en CSV. Astra pourrait produire un tableau de synthèse par centre de coûts, signaler les écarts par rapport au budget et rédiger une note courte pour le comité. Le garde-fou : anonymiser les tiers avant l'export, relire chaque total contre la source, et traiter le résultat comme un brouillon d'analyse, jamais comme une pièce comptable.

Dans les trois cas, Astra accélère la préparation et la décision reste humaine. D'autres scénarios cadrés dans nos [cas d'usage d'agents IA sur mesure](/blog/agents-ia-sur-mesure-cas-usage-2026).

## Données, nLPD et ce qu'on ne met jamais dans ChatGPT

Un modèle qui agit sur votre ordinateur voit ce que vous voyez. La question des données devient plus concrète qu'avec un simple chat.

Quatre règles. Un compte professionnel d'abord, Business ou Enterprise, jamais un compte personnel partagé entre collègues. Ensuite, vérifier le réglage qui autorise l'utilisation de vos conversations pour l'entraînement des modèles, et le désactiver. Puis exclure sans exception les données de tiers inutiles à la tâche, les dossiers couverts par le secret professionnel (médical, juridique, fiduciaire) et les données sensibles au sens de la nLPD. Enfin, l'hébergement : vérifiez dans votre contrat où les données sont traitées et conservées, et inscrivez-le dans votre registre des traitements.

Le contexte d'un million de tokens ne change pas la loi. Il rend seulement plus facile de verser un dossier entier dans un outil sans y penser. La marche à suivre complète est dans notre guide [protection des données et IA sous la nLPD](/blog/protection-donnees-ia-nlpd-pme-suisse).

## Astra face à Claude Fable 5.1 et Gemini 3.8

Astra n'arrive pas seul. Anthropic a sorti Claude Fable 5.1 le 1er septembre 2026, son modèle le plus capable largement disponible. Google a ouvert Gemini 3.8 Flash à tous le 2 septembre.

Sur les chiffres publiés, OpenAI affirme battre Claude Fable 5 sur ses propres tests. Sur AutomationBench, Astra fait 41,4 % contre 31,4 % pour Fable 5.1, mais Fable reprend l'avantage sur certains tests scientifiques. En codage, Astra et Claude Opus 5 sont au coude à coude, 74,1 % contre 73,7 % sur DeepSWE. Gemini 3.8 accepte l'audio et la vidéo en natif, ce qu'Astra ne fait pas, et sa version Flash coûte plus de treize fois moins cher par token. Côté API, GPT-6 Astra et Claude Fable 5.1 affichent le même tarif, 10 USD par million de tokens en entrée et 50 en sortie.

Notre position n'a pas bougé. Claude reste notre recommandation pour l'analyse, la profondeur et la confidentialité. ChatGPT Astra prend l'avantage pour automatiser un poste de travail, pour les missions longues avec Work et pour les images. Copilot s'impose si Microsoft 365 est votre stack : GPT-6 Astra y est disponible depuis le 4 septembre. La méthode que nous enseignons, structurer une demande, un contexte, une base de connaissances et des garde-fous, se transfère à l'outil que vous choisirez ensuite. Notre [comparatif ChatGPT, Claude, Copilot](/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026) détaille les critères.

## Ce que ça change pour la formation

Nos formations couvrent ChatGPT Astra, Claude et Copilot à égalité de traitement. Trois ajouts au programme : où Astra est disponible selon l'abonnement, pour que personne ne paie Pro par erreur ; une mission réelle confiée à Work sur un cas de votre entreprise, du brief à la relecture ; et les garde-fous, ce qu'on donne à l'agent, ce qu'on vérifie, ce qu'on ne lui confie jamais.

Le détail est sur la page [formation ChatGPT](/formation-entreprise/chatgpt), à côté de la [formation IA en entreprise](/formation-entreprise/ia) et de la [formation Claude IA](/formation-entreprise/claude-ai). Si vous hésitez sur le point d'entrée pour votre équipe, un appel de 30 minutes suffit à le fixer.

## Questions fréquentes

**ChatGPT Astra est-il inclus dans ChatGPT Plus ?**
En partie. Sur Plus, Astra est disponible dans ChatGPT Work et dans Codex, mais la conversation classique reste sur GPT-5.6 Sol. OpenAI n'a pas annoncé de date pour l'arrivée d'Astra dans le chat de Plus.

**Quelle est la différence entre GPT-6 Astra et GPT-5.6 Sol ?**
Astra est conçu pour agir : piloter un ordinateur, remplir des formulaires, produire des documents finis. Il offre un contexte de 1'050'000 tokens et un taux d'hallucination mesuré par OpenAI à 4,2 % contre 12,2 % pour Sol. Pour rédiger et résumer, Sol reste suffisant dans la plupart des cas.

**Faut-il passer sur ChatGPT Pro pour utiliser Astra ?**
Non, sauf si vous voulez Astra dans la conversation classique. Pro le propose sous le nom GPT-6 Pro, avec un plafond de 50 ou 200 messages par semaine selon le palier. Pour les missions longues, Plus donne déjà accès à Astra dans Work.

**Peut-on utiliser ChatGPT Astra avec des données clients en Suisse ?**
Seulement dans un cadre maîtrisé : compte Business ou Enterprise, entraînement désactivé, aucune donnée sensible au sens de la nLPD ni dossier couvert par le secret professionnel, et une vérification préalable du lieu où les données sont traitées et conservées.

**Astra remplace-t-il Claude dans les recommandations DKDP ?**
Non. Claude reste notre recommandation pour l'analyse, la profondeur et la confidentialité. ChatGPT Astra est le bon choix pour automatiser un poste de travail, pour les missions longues avec Work et pour les images. Copilot s'impose si votre entreprise travaille dans Microsoft 365.

## Sources

Sources consultées le 10 septembre 2026.

- [OpenAI, « GPT-6 Astra: A new generation of intelligence »](https://openai.com/index/gpt-6-astra/)
- [CNBC, 3 septembre 2026](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html)
- [TechCrunch, 3 septembre 2026](https://techcrunch.com/2026/09/03/openai-launches-astra-its-powerful-and-controversial-new-model/)
- [9to5Mac, 4 septembre 2026](https://9to5mac.com/2026/09/04/openai-releasing-major-upgrade-to-chatgpt-and-codex-with-gpt-6-astra-details-here/)
- [Clubic, GPT-6 Astra débarque sur ChatGPT Plus](https://www.clubic.com/actualite-628729-wip-gpt-6-astra-debarque-sur-chatgpt-plus-le-modele-qu-openai-avait-juge-trop-risque.html)
- [Notebookcheck, GPT-6 Astra sur Plus, dans Work et Codex seulement](https://www.notebookcheck.net/GPT-6-Astra-is-on-ChatGPT-Plus-but-only-in-Work-and-Codex.1391574.0.html)
- [Microsoft, GPT-6 Astra dans Microsoft Copilot](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-openai-gpt-6-astra-in-microsoft-copilot/4552808/replies/4553814)
- [Anthropic, Claude Fable 5 et Claude Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)
- [Google, notes de version de l'API Gemini](https://ai.google.dev/gemini-api/docs/changelog)
- [lokan.fr, comparatif GPT-6 Astra, Claude et Gemini](https://lokan.fr/2026/09/05/gpt-6-astra-chatgpt-work-comparatif/)`,
}

export default article
