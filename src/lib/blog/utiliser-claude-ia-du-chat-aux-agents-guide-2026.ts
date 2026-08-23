import type { Article } from './types'

const article: Article = {
  slug: 'utiliser-claude-ia-du-chat-aux-agents-guide-2026',
  category: 'ia',
  title: 'Utiliser Claude mieux que la plupart des gens : du chat basique aux agents',
  excerpt:
    'La majorité des utilisateurs n\'ont jamais ouvert les réglages de Claude, ne savent pas ce qu\'est un projet et n\'ont jamais délégué une tâche complète. L\'écart est réel, et il se comble en une après-midi. Voici la progression entière, du choix du modèle jusqu\'aux agents à qui on confie du vrai travail.',
  date: '23 août 2026',
  dateISO: '2026-08-23',
  readTime: '12 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/utiliser-claude-ia-guide-hero.webp',
    alt: 'Utiliser Claude IA en 2026 : professionnelle dans un bureau genevois qui délègue une tâche à un agent Claude et suit son avancement à l\'écran',
  },
  images: [
    {
      src: '/images/blog/utiliser-claude-progression-chat-agents.webp',
      alt: 'Utiliser Claude IA : la progression complète en sept étapes, du chat au modèle et effort, connecteurs, projets, skills, Cowork et Claude Code',
      caption:
        'Les sept marches, dans l\'ordre. Chacune s\'appuie sur la précédente, et aucune ne demande de savoir coder avant la septième.',
    },
    {
      src: '/images/blog/utiliser-claude-skills-allers-retours.webp',
      alt: 'Skills Claude : le coût d\'une tâche répétée passe d\'une douzaine d\'allers-retours à un seul appel une fois le processus empaqueté',
      caption:
        'La première fois, vous itérez. Ensuite, le même livrable tient en un appel. C\'est tout l\'intérêt d\'empaqueter un processus.',
    },
  ],
  tags: ['Claude', 'Claude Cowork', 'Claude Code', 'Projects', 'Skills', 'Connecteurs', 'IA', 'Productivité', 'PME', 'Genève', '2026'],
  seoTitle: 'Utiliser Claude IA : du chat aux agents, le guide 2026',
  seoDescription:
    'Modèle, effort, connecteurs, projets, skills, Cowork et Claude Code : la progression complète pour utiliser Claude sérieusement. Guide pratique DKDP 2026.',
  faq: [
    {
      question: 'Faut-il savoir coder pour utiliser Claude sérieusement ?',
      answer:
        'Non, sauf à la toute dernière étape, et encore. Le choix du modèle, les connecteurs, les projets, les skills et Cowork ne demandent aucune compétence technique : ce sont des réglages et du texte. Claude Code exige un minimum d\'aise avec un terminal, mais des profils non techniques y construisent des outils métier tous les jours.',
    },
    {
      question: 'Quelle différence entre un projet et un simple chat ?',
      answer:
        'Un chat oublie tout dès que vous en ouvrez un autre. Un projet garde une mémoire, des fichiers de référence et des instructions permanentes, et ne mélange rien avec vos autres sujets. C\'est ce cloisonnement qui évite de réexpliquer votre contexte à chaque conversation.',
    },
    {
      question: 'Faut-il toujours prendre le modèle le plus puissant ?',
      answer:
        'Non, et c\'est l\'erreur la plus fréquente. Sonnet couvre l\'essentiel du travail quotidien, Opus se justifie sur les tâches longues et multi-étapes, et le cran au-dessus se réserve aux blocages réels. Un modèle surdimensionné consomme vos quotas sans améliorer la réponse, et un niveau d\'effort trop élevé peut même la dégrader.',
    },
    {
      question: 'Quand créer un skill plutôt que de refaire le travail à la main ?',
      answer:
        'À la troisième fois. En dessous, le processus n\'est pas encore stable et vous figeriez une méthode approximative. Faites le travail une dernière fois jusqu\'au résultat exact que vous voulez, puis demandez à Claude d\'empaqueter cette conversation.',
    },
    {
      question: 'Cowork et Claude Code, c\'est la même chose ?',
      answer:
        'Non. Cowork est un assistant à qui vous confiez du travail de bureau : recherche, analyse de fichiers, rapports, production de contenu. Claude Code est un développeur qui écrit des applications, des sites et des automatisations. Les deux fonctionnent par objectif et par plan, mais leurs livrables n\'ont rien à voir.',
    },
    {
      question: 'Ces outils sont-ils compatibles avec la protection des données d\'une PME suisse ?',
      answer:
        'Oui, à condition de cadrer les accès avant de brancher quoi que ce soit. Le sujet n\'est pas l\'outil en lui-même, mais ce que vous lui ouvrez : une messagerie contenant des dossiers clients ou des documents RH mérite une décision explicite, pas un clic distrait dans les connecteurs. C\'est le premier point qu\'on traite en accompagnement.',
    },
  ],
  content: `La plupart des gens utilisent Claude comme un moteur de réponses. Chat vide, question, copier-coller, on ferme l'onglet. Ça fonctionne, et c'est exactement pour cette raison que l'essentiel leur échappe. Ce qui change la donne ne se trouve pas dans la fenêtre de conversation, mais dans des réglages que personne n'ouvre jamais.

Chez DKDP, on installe ces outils chez des PME romandes toutes les semaines, et le constat ne varie pas : l'écart entre un utilisateur moyen et quelqu'un qui produit vraiment ne tient pas à la formulation de ses prompts. Il tient à sept réglages, dont six ne demandent aucune compétence technique. Voici la progression entière, du choix du modèle jusqu'aux agents à qui on délègue une tâche complète.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1rem">À RETENIR</div>
<div style="font-size:0.88rem;color:#e4e4e7;line-height:1.85">
<div style="margin-bottom:0.6rem">Le niveau d'un utilisateur se lit dans ses réglages, pas dans ses prompts.</div>
<div style="margin-bottom:0.6rem">Le bon modèle et le bon niveau d'effort valent plus que n'importe quelle formule magique. Monter les curseurs par principe dégrade souvent la réponse.</div>
<div style="margin-bottom:0.6rem">Un projet est un espace cloisonné avec sa mémoire, ses fichiers et ses instructions. C'est le changement d'organisation qui rapporte le plus vite.</div>
<div style="margin-bottom:0.6rem">Un skill fige un processus déjà validé. On fait le travail d'abord, on l'empaquette ensuite.</div>
<div>Cowork et Claude Code ne sont plus des conversations : on y fixe un objectif et on récupère un livrable.</div>
</div>
</div>

___IMG:utiliser-claude-progression-chat-agents.webp___

## Le vrai écart ne se joue plus sur le prompt

Le prompt engineering comme discipline a largement fondu. Les modèles de 2026 comprennent l'intention, tolèrent une formulation approximative et posent des questions quand quelque chose manque. Passer une heure à ciseler une phrase ne rapporte plus grand-chose.

Ce qui a pris sa place, c'est la qualité du contexte fourni en amont et la manière dont l'outil est configuré autour de vous. Un utilisateur qui a réglé son modèle, branché ses sources et cloisonné ses projets obtient de meilleurs résultats avec un prompt bâclé qu'un utilisateur méticuleux dans un chat vide. Toute la progression qui suit vise ce déplacement.

## Étape 0 : ne perdez pas votre mémoire en changeant d'outil

Si vous arrivez de ChatGPT, de Gemini ou de Copilot, vous avez plusieurs mois de contexte accumulé ailleurs. C'est souvent la seule raison qui retient les gens de changer d'outil, et Anthropic a prévu une passerelle exactement pour ça.

Dans les réglages, à la section mémoire, Claude vous fournit un prompt à copier. Vous le collez dans votre ancienne IA, elle recrache tout ce qu'elle sait de vous dans un bloc unique, vous ramenez ce bloc dans Claude et vous l'ajoutez à la mémoire. Comptez cinq minutes.

Une précision utile : cet import est une photographie, pas une synchronisation. Ce que vous direz ensuite à l'autre outil ne remontera jamais tout seul. Profitez-en pour vérifier au passage que la recherche dans vos conversations passées et la génération de mémoire depuis l'historique sont bien activées, sinon Claude repart de zéro à chaque échange.

## Étape 1 : le bon modèle et le bon niveau d'effort

C'est le réglage le plus ennuyeux, et celui qui coûte le plus cher quand on se trompe. Choisir un modèle trop lourd brûle vos quotas sans améliorer le résultat, et choisir trop léger vous fait refaire le travail.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.16);background:rgba(212,212,216,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1.25rem">LE BON MODÈLE POUR LA BONNE TÂCHE</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:220px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.85rem;color:#D4D4D8;font-weight:700;margin-bottom:0.5rem">Haiku</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Le plus rapide et le moins cher. En pratique, l'écart de qualité avec Sonnet justifie presque toujours de monter d'un cran.</div>
</div>
<div style="flex:1;min-width:220px;padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.16)">
<div style="font-size:0.85rem;color:#A78BFA;font-weight:700;margin-bottom:0.5rem">Sonnet</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Le cheval de trait quotidien. Rapide, raisonnement solide, à l'aise sur la rédaction et les tâches courantes.</div>
</div>
<div style="flex:1;min-width:220px;padding:1.25rem;border-radius:12px;background:rgba(255,140,0,0.06);border:1px solid rgba(255,140,0,0.18)">
<div style="font-size:0.85rem;color:#FF8C00;font-weight:700;margin-bottom:0.5rem">Opus</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Les tâches longues et multi-étapes, avec vérification au fil de l'eau. Le réglage par défaut dès qu'on entre dans Cowork ou dans Code.</div>
</div>
<div style="flex:1;min-width:220px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:700;margin-bottom:0.5rem">Fable</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Un cran au-dessus, très gourmand en jetons. À sortir quand Opus bloque, jamais comme réglage permanent.</div>
</div>
</div>
</div>

Le second curseur est le niveau d'effort, autrement dit le temps de réflexion que vous accordez au modèle avant qu'il réponde. Contre-intuitif mais vérifiable au quotidien : plus de réflexion ne donne pas automatiquement une meilleure réponse.

| Niveau d'effort | Ce qu'il sert vraiment |
|---|---|
| Medium | Le quotidien : rédaction, synthèse, reformulation, questions ponctuelles |
| High | Le code et l'analyse, dès qu'un raisonnement doit tenir sur plusieurs étapes |
| Extra high | Les sessions agentiques et les tâches longues où l'IA doit se relire elle-même |

Pousser une tâche simple en effort maximal rallonge l'attente, surcomplique la réponse et finit par la dégrader. Le réflexe sain consiste à monter le curseur quand vous sentez que le résultat plafonne, pas par principe. Si la question du bon outil se pose encore chez vous, on l'a traitée en détail dans notre comparatif [ChatGPT, Claude ou Copilot pour une PME](/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026).

## Étape 2 : deux réflexes de prompt qui remplacent tout le reste

Il reste malgré tout deux habitudes qui font l'écart, et elles ne relèvent pas de la formulation.

**Donnez du contexte, en vrac.** Claude ne connaît ni votre entreprise, ni votre produit, ni votre marché, ni l'historique du dossier. Videz tout ce qui pourrait servir dans la conversation, sans mise en forme, sans plan, sans nettoyage. Le modèle trie très bien. Et quand vous ne savez pas quel contexte serait utile, ce qui arrive constamment, retournez la question : demandez à Claude de vous interroger jusqu'à ce qu'il ait ce dont il a besoin. Un entretien de cinq minutes vaut mieux qu'un prompt de trois pages écrit à l'aveugle.

**Ne croyez pas la première réponse.** L'IA a un problème de forme : elle sonne juste même quand elle a tort, et elle valide volontiers une idée médiocre parce que vous l'avez proposée. La parade consiste à organiser la contradiction plutôt qu'à espérer qu'elle vienne toute seule. Demandez les angles morts, les failles de votre raisonnement, les failles du sien, ce qui manque. Une méthode qui marche particulièrement bien en contexte business : faire jouer au modèle plusieurs conseillers aux intérêts divergents sur la même décision, puis lire ce sur quoi ils ne sont pas d'accord.

> Partez du principe qu'il se trompe. Vous serez agréablement surpris plus souvent que l'inverse.

## Étape 3 : les connecteurs, deux usages qu'on confond

Les connecteurs se trouvent dans les réglages de personnalisation, et la liste couvre déjà la plupart des outils que vous utilisez. On les branche pour deux raisons très différentes.

Le premier usage, c'est le contexte à moindre effort. Votre messagerie donne à Claude votre façon d'écrire, vos clients en cours et vos dossiers ouverts. L'agenda lui donne votre semaine. L'espace de fichiers lui donne vos documents. Un outil de comptes rendus lui donne ce qui s'est réellement dit en réunion. Vous cessez de réexpliquer votre contexte parce qu'il y accède.

Le second usage est moins évident : combler ce que Claude ne sait pas faire nativement. Il n'a pas de générateur d'images intégré, alors on branche un service tiers et il produit des visuels. Le principe vaut pour à peu près n'importe quelle API, et c'est là qu'on quitte l'assistant généraliste pour construire un poste de travail sur mesure.

Un mot de prudence, parce qu'on travaille avec des PME suisses et que la question revient à chaque installation : ouvrir un connecteur, c'est ouvrir un accès à des données réelles. Avant de brancher une messagerie qui contient des dossiers clients, il faut savoir ce qui part, où ça part et qui d'autre y a accès dans l'entreprise. Ce cadrage prend une heure et évite des conversations pénibles six mois plus tard.

## Étape 4 : arrêtez de travailler dans des chats vides

C'est probablement le changement d'organisation qui rapporte le plus vite. Un projet est un espace de travail cloisonné, avec sa propre mémoire, son historique, ses fichiers et ses instructions permanentes.

L'important, c'est le cloisonnement. Un projet se souvient de tout ce qui s'y passe et de rien de ce qui se passe ailleurs. Ça ressemble à une contrainte, c'est en réalité la fonctionnalité principale : quand vous travaillez sur votre activité, vous ne voulez pas que Claude ressorte des références à votre santé, à votre famille ou au side project du week-end.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.25rem">CHAT VIDE CONTRE PROJET CONFIGURÉ</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:250px;padding:1.25rem;border-radius:12px;background:rgba(252,165,165,0.05);border:1px solid rgba(252,165,165,0.16)">
<div style="font-size:0.9rem;color:#fca5a5;font-weight:700;margin-bottom:0.75rem">Dans un chat vide</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.7">Vous réexpliquez qui vous êtes. Vous réuploadez les mêmes fichiers. Vous redonnez le ton attendu. Vous corrigez les mêmes travers. Et vous recommencez demain matin.</div>
</div>
<div style="flex:1;min-width:250px;padding:1.25rem;border-radius:12px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.16)">
<div style="font-size:0.9rem;color:#4ade80;font-weight:700;margin-bottom:0.75rem">Dans un projet configuré</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.7">Le contexte est déjà là. Les documents de référence aussi. Le ton est écrit une fois pour toutes. Vous ouvrez et vous entrez directement dans le sujet.</div>
</div>
</div>
</div>

Deux façons de découper. Soit de gros blocs, du genre perso, pro et créatif. Soit un projet par sujet, ce qui devient nettement plus efficace dès que vous menez plusieurs chantiers en parallèle. Les questions ponctuelles, elles, restent hors projet : inutile de polluer un espace pour demander une conversion d'unités.

Dans chaque projet, deux zones à remplir. Les instructions personnalisées portent le contexte permanent, le processus à suivre, le ton et les exigences de format. Les fichiers du projet portent la matière : charte, guide de style, procédures internes, historique commercial, documentation technique, exemples de travaux à imiter. Un projet correctement configuré, c'est un collaborateur qui a lu tout le manuel interne avant son premier jour. La logique est la même que celle du fichier de mode d'emploi qu'on décrit dans notre guide sur [configurer Claude Code et lui donner une mémoire](/blog/configurer-claude-code-claude-md-memoire).

## Étape 5 : les skills, pour ne plus refaire le même aller-retour

Un skill est une recette de processus. Claude la suit et produit le même type de résultat à chaque appel, sans que vous ayez à réexpliquer la méthode.

La façon de s'y prendre est contre-intuitive : ne rédigez pas le skill à l'avance. Faites d'abord le travail normalement, en itérant, en poussant, en corrigeant jusqu'au résultat exact que vous vouliez. Puis demandez à Claude d'empaqueter ce processus. Il relit la conversation et fabrique la recette lui-même, avec vos critères de qualité dedans, y compris ceux que vous n'auriez pas su formuler.

___IMG:utiliser-claude-skills-allers-retours.webp___

Un exemple qu'on a monté chez un client cette année : analyser les ventes de la semaine, en déduire une offre spéciale week-end, rédiger la publication, générer le visuel via le connecteur d'images, et livrer l'offre, la légende et l'image dans une seule réponse prête à publier. La première fois, une douzaine d'échanges. Ensuite, un appel de skill.

Sur la structure, retenez surtout une règle : mieux vaut des skills étroits et combinables que des monstres taillés sur mesure. Un skill court se relit, se corrige et se réutilise dans un autre contexte. Un skill monolithique devient intouchable au bout de trois mois. Claude déclenche ces recettes tout seul selon ce que vous demandez, et vous pouvez aussi les appeler explicitement.

## Étape 6 : Cowork, l'assistant à qui on délègue

Le chat est un partenaire de réflexion. Cowork est autre chose, et le changement mental compte plus que la fonctionnalité : vous ne conversez plus, vous fixez un objectif et un point d'arrivée.

Concrètement, Claude réfléchit, produit un plan, établit une liste de tâches, puis la déroule point par point en cochant au fur et à mesure, aussi longtemps qu'il le faut. Il délègue souvent des sous-agents en parallèle sur différentes branches de la liste. Il dispose de son propre ordinateur, ce qui lui permet de construire quelque chose au fil de la session au lieu de repartir de zéro à chaque étape.

Le type de travail qui convient : recherche multi-étapes, nettoyage et analyse de gros volumes de fichiers, rédaction de rapports, tableaux de bord, planification de projet, chaînes de production de contenu. En résumé, ce que vous confieriez à un assistant.

| Critère | Cowork sur le web | Cowork sur le bureau |
|---|---|---|
| La machine de travail | Un ordinateur dans le cloud | Votre propre ordinateur |
| Les fichiers | Ce que vous déposez, ou un dossier branché via connecteur | Un dossier local que vous lui assignez |
| Si vous fermez le portable | La tâche continue | La tâche s'arrête |
| Le point fort | Les traitements longs et les exécutions planifiées | Ranger, produire et livrer directement chez vous |

La fonction la plus sous-estimée reste la planification. Vous pouvez programmer une exécution récurrente et retrouver le travail fait au réveil : le skill de l'offre du week-end lancé chaque vendredi matin, et vous vous levez avec l'offre et les publications prêtes. Un compromis que l'on recommande souvent : rester sur le cloud et pointer un dossier partagé via connecteur, en y déposant les fichiers d'entrée et en laissant l'agent y écrire ses livrables. Vous gardez la continuité du cloud et la visibilité du local.

## Étape 7 : Claude Code, l'ingénieur

Si Cowork est votre assistant, Code est votre développeur. Applications internes, sites, automatisations, extensions de navigateur, petits outils métier. Vous décrivez en français ce que vous voulez, il écrit le code.

Le point qui surprend : vous n'avez pas besoin de savoir coder. On voit régulièrement des profils non techniques construire des outils qu'ils utilisent ensuite tous les jours, y compris des extensions pour leur logiciel métier. Ce qu'il faut, c'est savoir décrire précisément un besoin et accepter de tester.

Deux conseils de démarrage. Travaillez depuis l'application de bureau plutôt que depuis le web, où il faut passer par un dépôt de code : sur le bureau, vous assignez un dossier et vous envoyez votre demande. Et activez le mode plan avant de lancer quoi que ce soit, pour que Claude construise un plan détaillé que vous validez avant la première ligne écrite. Pour les réflexes du quotidien, on a rassemblé [dix astuces pour maîtriser Claude Code](/blog/maitriser-claude-code-10-astuces).

## Ce que ce genre de guide ne dit jamais

Trois réserves, parce qu'aucun tutoriel ne les mentionne et qu'on les rencontre à chaque déploiement.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,140,0,0.18);background:rgba(255,140,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.25rem">TROIS PIÈGES À CONNAÎTRE</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#FF8C00;font-weight:700;margin-bottom:0.5rem">01 &nbsp; Le cloisonnement a un coût</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Multiplier les projets, c'est multiplier les endroits où maintenir des instructions. Au bout d'un moment vous ne savez plus lequel contient quoi. Commencez avec trois ou quatre, pas quinze.</div>
</div>
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#FF8C00;font-weight:700;margin-bottom:0.5rem">02 &nbsp; Les skills auto-générés sont fragiles</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Empaqueter une conversation capture le processus, mais aussi ses hypothèses implicites, y compris celles qui n'étaient valables que ce jour-là. Relisez la recette avant de la rejouer en aveugle.</div>
</div>
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#FF8C00;font-weight:700;margin-bottom:0.5rem">03 &nbsp; Le planifié finit par ne plus être lu</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Un agent qui publie chaque vendredi sans supervision sortira tôt ou tard quelque chose de faux ou de hors sujet. La planification est excellente pour préparer, risquée pour publier.</div>
</div>
</div>
</div>

Et pendant qu'on y est : l'idée de faire « mieux que 99 % des gens » est un titre, pas une mesure. Ce qui est vrai, c'est que la majorité des utilisateurs n'ont jamais ouvert les réglages, ne savent pas ce qu'est un projet et n'ont jamais délégué une tâche complète. L'écart existe, il est large, et il se comble en une après-midi bien employée.

## Par où commencer cette semaine

Inutile de tout monter d'un coup, l'ordre compte plus que la vitesse.

- **Aujourd'hui, en vingt minutes.** Importez votre mémoire depuis votre ancien outil, vérifiez votre modèle par défaut et redescendez le niveau d'effort à medium. Vous verrez déjà la différence sur la vitesse.
- **Cette semaine.** Créez trois projets maximum, sur vos trois sujets réels. Remplissez les instructions et déposez les cinq documents que vous réexpliquez le plus souvent.
- **Le mois prochain.** Repérez la tâche que vous avez refaite trois fois à l'identique, faites-la une dernière fois proprement, et demandez à Claude de l'empaqueter en skill. C'est votre première brique d'automatisation.

## Questions fréquentes

### Faut-il savoir coder pour utiliser Claude sérieusement ?

Non, sauf à la toute dernière étape, et encore. Le choix du modèle, les connecteurs, les projets, les skills et Cowork ne demandent aucune compétence technique : ce sont des réglages et du texte. Claude Code exige un minimum d'aise avec un terminal, mais des profils non techniques y construisent des outils métier tous les jours.

### Quelle différence entre un projet et un simple chat ?

Un chat oublie tout dès que vous en ouvrez un autre. Un projet garde une mémoire, des fichiers de référence et des instructions permanentes, et ne mélange rien avec vos autres sujets. C'est ce cloisonnement qui évite de réexpliquer votre contexte à chaque conversation.

### Faut-il toujours prendre le modèle le plus puissant ?

Non, et c'est l'erreur la plus fréquente. Sonnet couvre l'essentiel du travail quotidien, Opus se justifie sur les tâches longues et multi-étapes, et le cran au-dessus se réserve aux blocages réels. Un modèle surdimensionné consomme vos quotas sans améliorer la réponse, et un niveau d'effort trop élevé peut même la dégrader.

### Quand créer un skill plutôt que de refaire le travail à la main ?

À la troisième fois. En dessous, le processus n'est pas encore stable et vous figeriez une méthode approximative. Faites le travail une dernière fois jusqu'au résultat exact que vous voulez, puis demandez à Claude d'empaqueter cette conversation.

### Cowork et Claude Code, c'est la même chose ?

Non. Cowork est un assistant à qui vous confiez du travail de bureau : recherche, analyse de fichiers, rapports, production de contenu. Claude Code est un développeur qui écrit des applications, des sites et des automatisations. Les deux fonctionnent par objectif et par plan, mais leurs livrables n'ont rien à voir.

### Ces outils sont-ils compatibles avec la protection des données d'une PME suisse ?

Oui, à condition de cadrer les accès avant de brancher quoi que ce soit. Le sujet n'est pas l'outil en lui-même, mais ce que vous lui ouvrez : une messagerie contenant des dossiers clients ou des documents RH mérite une décision explicite, pas un clic distrait dans les connecteurs. C'est le premier point qu'on traite en accompagnement.

## En bref

La progression tient en une ligne : un chat réglé sur le bon modèle et le bon effort, puis les connecteurs, puis les projets, puis les skills, puis Cowork pour déléguer, puis Code pour construire. Chaque marche s'appuie sur la précédente, et aucune ne demande de talent particulier. Elles demandent une après-midi, et surtout de ne pas les prendre dans le désordre.

Si vous voulez monter tout ça proprement sur votre activité, avec vos vrais dossiers plutôt que des exemples de démonstration, c'est exactement le programme de notre [formation Claude IA](/formation-entreprise/claude-ai). On peut aussi en [parler de vive voix](/contact) et regarder ensemble ce que ça donnerait chez vous.`,
}

export default article
