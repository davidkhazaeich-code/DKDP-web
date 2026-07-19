import type { Article } from './types'

const article: Article = {
  slug: 'configurer-claude-code-claude-md-memoire',
  category: 'ia',
  title: 'Configurer Claude Code : donner un mode d\'emploi et une mémoire à votre IA',
  excerpt:
    'Les IA génératives n\'ont pas de mémoire native : chaque conversation repart de zéro. Claude Code corrige ce défaut si on le configure. Le fichier CLAUDE.md lui sert de mode d\'emploi permanent, une base de connaissance lui sert de mémoire. Voici comment monter ce cerveau, et pourquoi ça compte plus que la formulation de vos prompts.',
  date: '19 juillet 2026',
  dateISO: '2026-07-19',
  readTime: '9 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/configurer-claude-code-hero.webp',
    alt: 'Configurer Claude Code : le fichier CLAUDE.md et une base de connaissance qui donnent une mémoire à l\'IA, poste de travail d\'une agence à Genève en 2026',
  },
  images: [
    {
      src: '/images/blog/configurer-claude-code-contexte-cerveau.webp',
      alt: 'Configurer Claude Code : le contexte fourni à l\'IA compte plus que la formulation du prompt, schéma du cerveau de travail CLAUDE.md et mémoire',
      caption:
        'Le contexte que vous fournissez en amont pèse plus lourd que la manière de tourner une phrase. C\'est tout l\'objet du réglage de Claude Code.',
    },
    {
      src: '/images/blog/configurer-claude-code-memoire-cumulative.webp',
      alt: 'Configurer Claude Code : l\'effet cumulatif de la base de connaissance entre le jour 1 et le jour 100, un actif qui grossit avec le temps',
      caption:
        'Au jour 1, quelques notes. Au jour 100, une IA qui connaît vos process, vos clients et votre historique. La valeur se construit dans la durée.',
    },
  ],
  tags: ['Claude Code', 'CLAUDE.md', 'Configuration', 'Mémoire IA', 'Context engineering', 'Base de connaissance', 'IA', 'Productivité', 'Genève', '2026'],
  seoTitle: 'Configurer Claude Code : CLAUDE.md et mémoire, guide 2026',
  seoDescription:
    'Configurer Claude Code avec le fichier CLAUDE.md et une base de connaissance : donner un mode d\'emploi et une mémoire à votre IA. Guide pratique DKDP.',
  content: `Vous ouvrez une nouvelle conversation avec une IA, et vous recommencez tout. Qui vous êtes, ce que fait votre entreprise, comment vous voulez qu'elle réponde, le contexte de votre projet. À chaque fois. C'est le défaut de fond des IA génératives : elles n'ont pas de mémoire native. Un modèle de langage prédit le mot suivant, rien de plus. La mémoire qu'on leur prête dans un chat est une couche ajoutée, fragile et vite saturée.

Claude Code répond à ce problème précis, à condition de le configurer. Bien réglé, il ne repart pas de zéro. Il lit un mode d'emploi au démarrage, il garde une mémoire de travail structurée, et il devient un collaborateur qui connaît votre contexte au lieu d'un assistant amnésique. Voici comment monter ce cerveau, étape par étape, et pourquoi ce réglage compte davantage que la façon de tourner vos prompts.

## Pourquoi une IA sans mémoire vous coûte du temps

Le symptôme est banal : vous répétez le même contexte dix fois par jour. Le coût est réel. Chaque prompt doit réembarquer toutes les informations utiles, sinon la réponse tombe à côté. Résultat, vous rédigez des instructions à rallonge, l'IA en oublie une partie, et vous corrigez. Multiplié par le nombre de conversations dans une semaine, ça devient une taxe permanente sur votre productivité.

Il y a un déplacement plus profond derrière tout ça. En 2026, les modèles sont devenus assez bons pour que la qualité d'une réponse dépende moins de la formulation du prompt que du contexte fourni en amont. C'est ce qu'on appelle le context engineering : soigner l'information qu'on donne à l'IA plutôt que fignoler la phrase qu'on lui adresse. Un bon réglage de Claude Code, c'est exactement ça, rendu permanent.

___IMG:configurer-claude-code-contexte-cerveau.webp___

Le principe se résume en une image : on donne à l'IA un cerveau en deux moitiés. Un mode d'emploi qu'elle lit à chaque démarrage, et une mémoire où elle range et retrouve vos informations. Aucune des deux n'est du code. Ce sont des fichiers texte, lisibles et modifiables par vous.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.25rem">LES DEUX MOITIÉS DU CERVEAU</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:240px;padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.15)">
<div style="font-size:0.9rem;color:#A78BFA;font-weight:700;margin-bottom:0.75rem">Le mode d'emploi : CLAUDE.md</div>
<div style="font-size:0.82rem;color:#e4e4e7;line-height:1.6">Un fichier texte lu à chaque démarrage. Qui vous êtes, vos règles, vos conventions, ce qu'il faut éviter. L'IA sait comment travailler avant même votre première question.</div>
</div>
<div style="flex:1;min-width:240px;padding:1.25rem;border-radius:12px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15)">
<div style="font-size:0.9rem;color:#4ade80;font-weight:700;margin-bottom:0.75rem">La mémoire : la base de connaissance</div>
<div style="font-size:0.82rem;color:#e4e4e7;line-height:1.6">Des dossiers où l'IA range, indexe et retrouve vos informations. Elle ne charge que ce dont elle a besoin, et l'ensemble grossit au fil des semaines.</div>
</div>
</div>
</div>

## Le fichier CLAUDE.md : le mode d'emploi permanent

Le \\\`CLAUDE.md\\\` est un simple fichier au format Markdown, du texte structuré, pas du code. Claude Code le lit automatiquement en entrant dans un projet, et il agit comme un prompt système permanent. Vous y écrivez ce que vous auriez sinon répété à chaque conversation : votre contexte, vos objectifs, la manière dont vous voulez que l'IA réponde, vos préférences et ce qu'elle doit éviter. Pour un projet technique, on y ajoute les commandes pour lancer, tester et construire le projet, plus les conventions de nommage et les contraintes à ne jamais franchir.

Vous n'écrivez pas ce fichier à la main depuis une page blanche. La commande \\\`/init\\\` en génère une première version en analysant votre projet. Le vrai travail commence après : la version générée est presque toujours trop longue. Le geste contre-intuitif, c'est de la couper de moitié, puis de remonter tout en haut vos commandes exactes et vos règles les plus importantes.

Car un fichier long ne rend pas l'IA plus performante. C'est l'inverse. Passé environ 200 lignes, les instructions commencent à se diluer et à se contredire, et le modèle ne sait plus quelle règle prime. Un \\\`CLAUDE.md\\\` efficace tient souvent en 80 à 120 lignes denses. Quatre règles simples le gardent utile :

- **Rester court.** Sous 200 lignes. Chaque ligne est chargée en contexte à chaque requête, elle doit mériter sa place.
- **Bannir le vague.** "Code proprement" ne veut rien dire pour un modèle. "N'utilise jamais de librairie externe pour une fonction faisable en dix lignes" est actionnable.
- **Donner des exemples concrets.** Une règle illustrée est suivie. Une règle abstraite est interprétée, donc trahie.
- **La règle des deux fois.** Toute consigne que vous donnez deux fois dans vos conversations mérite d'entrer dans le fichier. C'est le signal le plus fiable.

Le fichier vit à deux endroits complémentaires. À la racine d'un projet, il porte les règles propres à ce projet. Dans \\\`~/.claude/CLAUDE.md\\\`, il porte vos préférences valables partout, sur votre machine. Claude Code remonte l'arborescence et lit les deux, du plus général au plus précis. Pour aller plus loin sur les commandes et les réflexes au quotidien, on a détaillé [dix astuces pour maîtriser Claude Code](/blog/maitriser-claude-code-10-astuces).

## Quatre principes qui évitent que l'IA parte dans le mur

Le contenu des règles compte autant que leur forme. Quatre principes reviennent chez ceux qui utilisent ces outils sérieusement. Ils tiennent en partie aux observations d'Andrej Karpathy, cofondateur d'OpenAI et ancien directeur de l'IA chez Tesla, qui a rejoint Anthropic en mai 2026 pour travailler sur Claude. Inscrits dans votre \\\`CLAUDE.md\\\`, ils redressent la plupart des dérapages.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.16);background:rgba(212,212,216,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1.25rem">QUATRE RÈGLES À INSCRIRE DANS LE FICHIER</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#A78BFA;font-weight:700;margin-bottom:0.5rem">01 &nbsp; Réfléchir avant d'agir</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Poser la bonne question plutôt que deviner. Un modèle qui suppose part souvent dans la mauvaise direction et brûle des jetons pour rien.</div>
</div>
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#4ade80;font-weight:700;margin-bottom:0.5rem">02 &nbsp; Rester chirurgical</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Ne modifier que ce qui est demandé. Un bouton à changer ne doit pas entraîner la refonte de toute la page.</div>
</div>
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#FF8C00;font-weight:700;margin-bottom:0.5rem">03 &nbsp; La simplicité d'abord</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Cent cinquante lignes plutôt que trois cents. Le code simple se maintient, se relit et coûte moins cher à faire tourner.</div>
</div>
<div style="flex:1;min-width:230px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.8rem;color:#D4D4D8;font-weight:700;margin-bottom:0.5rem">04 &nbsp; Viser l'objectif</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Garder le but final en tête, pas seulement la liste des sous-tâches. Sinon l'IA exécute parfaitement le mauvais découpage.</div>
</div>
</div>
</div>

Ces quatre règles ont un point commun : elles obligent l'IA à ralentir au bon moment. C'est souvent la vitesse mal placée qui produit du travail à refaire.

## La mémoire : une base de connaissance qui s'indexe toute seule

Le fichier donne le mode d'emploi. La base de connaissance donne la mémoire. C'est un système de dossiers sur votre machine, inspiré d'une méthode simple : vous capturez sans friction, l'IA organise, et personne ne perd de temps à ranger.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(74,222,128,0.18);background:rgba(74,222,128,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#4ade80;margin-bottom:1.25rem">COMMENT LA BASE DE CONNAISSANCE S'ORGANISE</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:200px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.75rem;color:#71717a;font-weight:700;margin-bottom:0.4rem">ÉTAPE 1</div>
<div style="font-size:0.9rem;color:#e4e4e7;font-weight:700;margin-bottom:0.6rem">Le brut</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Vous déposez tout en vrac : notes, PDF, captures, chartes, listes, process. Aucun rangement de votre part. L'objectif est de capturer sans effort.</div>
</div>
<div style="flex:1;min-width:200px;padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.16)">
<div style="font-size:0.75rem;color:#71717a;font-weight:700;margin-bottom:0.4rem">ÉTAPE 2</div>
<div style="font-size:0.9rem;color:#A78BFA;font-weight:700;margin-bottom:0.6rem">L'index</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">L'IA lit le brut, crée un index et une page par sujet en reliant les sources entre elles. C'est cet index léger qu'elle charge en priorité, pas tous les documents.</div>
</div>
<div style="flex:1;min-width:200px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:0.75rem;color:#71717a;font-weight:700;margin-bottom:0.4rem">ÉTAPE 3</div>
<div style="font-size:0.9rem;color:#e4e4e7;font-weight:700;margin-bottom:0.6rem">Les livrables</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Tout ce que l'IA produit se range ici : documents, pages, réponses structurées. Elle s'y réfère pour rester cohérente avec ce qu'elle a déjà fait.</div>
</div>
</div>
</div>

Le point clé, c'est l'indexation. L'IA ne charge pas des centaines de documents à chaque conversation, ce qui saturerait sa fenêtre de contexte. Elle charge un index léger, repère les ressources utiles à la tâche du moment, puis va chercher uniquement celles-là. C'est ce qui rend le système tenable même avec des centaines de fichiers. La gestion de cette fenêtre de contexte est un sujet à part entière, qu'on décortique dans notre article sur [la limite de session et la fenêtre de contexte](/blog/limite-session-claude-gerer-fenetre-contexte).

Depuis peu, la mémoire fonctionne dans les deux sens. Claude Code écrit lui-même ce qu'il apprend d'un projet dans ses propres fichiers de mémoire, avec un index qu'il relit à chaque session. Vous nourrissez la base, l'IA la nourrit aussi. Les deux s'additionnent.

## Au-delà du fichier : ce qui fait un vrai poste de travail

Le \\\`CLAUDE.md\\\` et la mémoire sont la fondation. Une fois qu'elle tient, Claude Code se prolonge par quatre couches qui transforment l'assistant en outil de production. Vous n'avez pas besoin de tout mettre en place le premier jour, mais il vaut la peine de savoir que ça existe.

- **Les skills.** Des procédures que l'IA charge à la demande. Vous décrivez une fois comment vous faites un devis ou un audit, elle l'applique ensuite à l'identique.
- **Les connecteurs MCP.** Le pont entre l'IA et vos outils réels : votre logiciel de facturation, votre CMS, votre base de données, votre espace de fichiers. L'IA agit sur vos données, elle ne se contente plus de discuter.
- **Les sous-agents.** Pour déléguer une tâche à une IA au contexte propre, qui ne revient qu'avec sa conclusion. Utile pour explorer sans encombrer la conversation principale.
- **Les automatismes.** Des déclencheurs qui lancent une action à un moment précis, au démarrage d'une session ou après une modification, sans que vous ayez à y penser.

C'est cette pile complète qui sépare un gadget d'un collaborateur. Et elle repose entièrement sur la qualité de la fondation posée au début.

## L'effet cumulatif : jour 1 contre jour 100

La valeur de ce système ne se voit pas le premier jour. Au jour 1, vous avez quelques notes et un fichier de règles encore court. Utile, sans plus. La différence se construit dans la durée.

___IMG:configurer-claude-code-memoire-cumulative.webp___

Au jour 100, si vous avez travaillé dans cet environnement et nourri la base régulièrement, vous avez un actif que personne d'autre ne possède : une IA qui connaît vos documents, vos process, vos décisions passées et votre manière de travailler. Elle ne devine plus votre contexte, elle l'a. C'est la différence entre un outil qu'on partage avec le monde entier et un outil qui vous ressemble.

Un réflexe à garder : une revue rapide chaque mois. On vérifie que les informations sont encore à jour, on supprime ce qui est devenu obsolète. Une mémoire qu'on ne nettoie pas finit par contenir des règles qui se contredisent, exactement le problème qu'on cherchait à éviter dans le fichier.

> On fait tourner ce système tous les jours chez DKDP, sur nos projets et ceux de nos clients. Ce n'est pas une théorie, c'est notre poste de travail.

## Questions fréquentes

### Faut-il savoir coder pour configurer Claude Code ?

Non pour la partie qui compte le plus. Le fichier \\\`CLAUDE.md\\\` et la base de connaissance sont du texte simple, à la portée de n'importe qui. Il faut en revanche un minimum d'aise avec le terminal pour installer et lancer l'outil. C'est justement la marche qu'on passe avec vous en accompagnement.

### Où doit se trouver le fichier CLAUDE.md ?

À la racine de votre projet pour les règles propres à ce projet, et dans \\\`~/.claude/CLAUDE.md\\\` pour vos préférences valables partout. Claude Code remonte l'arborescence et lit les deux, en allant du plus général au plus spécifique.

### Quelle différence avec la mémoire du chat Claude classique ?

Le chat classique ne peut pas relire un dossier local à chaque conversation. Claude Code, si. Le fichier et la base vivent sur votre machine, en texte lisible et modifiable. Vous voyez ce que l'IA sait, vous le corrigez, vous en gardez le contrôle. C'est une mémoire transparente, pas une boîte noire.

### Un fichier plus long donne-t-il de meilleurs résultats ?

Non, c'est l'inverse. Au-delà d'environ 200 lignes, les règles se diluent et se contredisent, et l'IA suit moins bien. Court et précis bat long et vague, à chaque fois.

### Par où commencer concrètement ?

Lancez \\\`/init\\\`, coupez le résultat de moitié, remontez vos commandes et vos règles clés en haut du fichier. Ensuite, ajoutez une consigne chaque fois que vous vous surprenez à répéter la même chose. Le fichier se construit tout seul à l'usage.

## En bref

Une IA sans contexte repart de zéro à chaque conversation et vous fait répéter l'essentiel. Configurer Claude Code, c'est lui donner les deux choses qui lui manquent : un mode d'emploi permanent avec le \\\`CLAUDE.md\\\`, et une mémoire structurée avec une base de connaissance qui s'indexe seule. Le reste, skills, connecteurs, sous-agents, automatismes, vient se greffer sur cette fondation. Et sa valeur se compose dans le temps : plus vous l'utilisez, plus elle vous ressemble.

Si vous voulez mettre ce système en place proprement, sans y passer vos soirées, c'est le coeur de notre [formation Claude IA](/formation-entreprise/claude-ai). On peut aussi en [parler directement](/contact) et regarder ce que ça donnerait sur votre activité.`,
}

export default article
