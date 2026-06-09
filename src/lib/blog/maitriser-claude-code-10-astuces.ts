import type { Article } from './types'

const article: Article = {
  slug: 'maitriser-claude-code-10-astuces',
  category: 'formation',
  title: 'Maîtriser Claude Code : 10 astuces qui séparent le débutant du pro',
  excerpt:
    'La plupart des équipes utilisent Claude Code à 10 % de son potentiel. La différence ne vient pas du modèle, mais de la méthode. Voici les 10 techniques qui transforment un assistant de code en vrai agent de développement.',
  date: '9 juin 2026',
  dateISO: '2026-06-09',
  readTime: '10 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/formation-claude-code-astuces-hero.webp',
    alt: 'Maîtriser Claude Code : 10 astuces niveau pro pour les équipes et PME romandes en 2026, boucle de vérification et pilotage par agent',
  },
  images: [
    {
      src: '/images/blog/formation-claude-code-potentiel-equipe.webp',
      alt: 'Formation Claude Code Genève 2026 : la plupart des équipes exploitent 10 pour cent du potentiel, la méthode débloque le reste',
      caption:
        'Le vrai écart n\'est pas entre Claude et la concurrence. Il est entre une équipe qui pilote l\'outil avec méthode et une équipe qui se contente de lui parler.',
    },
  ],
  tags: ['Claude Code', 'Formation', 'IA', 'Productivité', 'Playwright MCP', 'ultrathink', 'PME', 'Genève', '2026'],
  seoTitle: 'Maîtriser Claude Code : 10 astuces niveau pro (2026)',
  seoDescription:
    'Playwright MCP, ultrathink, CLAUDE.md, gestion du contexte, multi-sessions : les 10 techniques qui font passer Claude Code d\'un simple assistant à un vrai agent de développement. Guide pratique DKDP pour les équipes romandes.',
  content: `Claude Code, la plupart des gens l\'utilisent comme un distributeur automatique. On ouvre l\'outil, on demande une modification, on attend la réponse, on recommence. Ça marche, mais ça exploite à peine 10 % de ce que l\'outil sait faire.

Le potentiel réel apparaît quand on arrête de le traiter comme un générateur de code et qu\'on le pilote comme un agent de développement : capable de comprendre un projet, de vérifier son propre travail, de gérer plusieurs tâches et de suivre des règles. Cette bascule ne dépend pas du modèle. Elle dépend de la méthode.

Voici les 10 techniques que les équipes qui vont vite utilisent au quotidien.

___IMG:formation-claude-code-potentiel-equipe.webp___

## 1. Donner des yeux à Claude avec Playwright MCP

Sans navigateur, Claude écrit du code mais ne voit jamais le rendu final. C\'est comme demander à un développeur de construire une interface sans jamais l\'ouvrir. Le résultat peut être correct, mais il manque souvent de précision.

Avec Playwright MCP, Claude ouvre l\'application, navigue, clique, prend des captures et corrige ce qui ne va pas. Il travaille en boucle au lieu de travailler à l\'aveugle.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,140,0,0.18);background:rgba(255,140,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.2rem">La boucle de vérification visuelle</div>
<div style="display:flex;flex-wrap:wrap;gap:0.6rem;align-items:center">
<div style="flex:1;min-width:120px;padding:0.9rem;border-radius:10px;background:rgba(255,140,0,0.06);text-align:center"><div style="font-size:0.85rem;color:#e4e4e7;font-weight:700">Modifie</div><div style="font-size:0.72rem;color:#9CA3AF;margin-top:0.2rem">le code</div></div>
<div style="color:#52525b;font-size:1.1rem">→</div>
<div style="flex:1;min-width:120px;padding:0.9rem;border-radius:10px;background:rgba(255,140,0,0.06);text-align:center"><div style="font-size:0.85rem;color:#e4e4e7;font-weight:700">Ouvre</div><div style="font-size:0.72rem;color:#9CA3AF;margin-top:0.2rem">le navigateur</div></div>
<div style="color:#52525b;font-size:1.1rem">→</div>
<div style="flex:1;min-width:120px;padding:0.9rem;border-radius:10px;background:rgba(255,140,0,0.06);text-align:center"><div style="font-size:0.85rem;color:#e4e4e7;font-weight:700">Vérifie</div><div style="font-size:0.72rem;color:#9CA3AF;margin-top:0.2rem">le rendu</div></div>
<div style="color:#52525b;font-size:1.1rem">→</div>
<div style="flex:1;min-width:120px;padding:0.9rem;border-radius:10px;background:rgba(74,222,128,0.08);text-align:center"><div style="font-size:0.85rem;color:#4ade80;font-weight:700">Valide</div><div style="font-size:0.72rem;color:#9CA3AF;margin-top:0.2rem">quand c\'est bon</div></div>
</div>
</div>

C\'est décisif pour les interfaces web, les bugs CSS, les formulaires et les tableaux de bord. C\'est aussi l\'approche qu\'on utilise chez DKDP pour livrer des sites qui passent du premier coup. Claude ne devine plus le résultat, il le constate.

## 2. Forcer la réflexion avec ultrathink

Claude répond parfois trop vite, surtout sur les problèmes difficiles. Le mot-clé \\\`ultrathink\\\` lui signale qu\'il doit ralentir et raisonner en profondeur avant d\'agir.

À réserver aux vrais sujets : un bug coriace, un choix d\'architecture, une grosse refonte, l\'analyse de plusieurs options. Pour les petites tâches, c\'est inutile.

> **ultrathink.** Analyse ce bug en profondeur. Ne modifie rien pour l\'instant. Identifie les causes possibles, les fichiers concernés, les hypothèses à vérifier, puis propose un plan de correction minimal.

Le réflexe qui change tout : demander un plan avant la moindre modification. On valide le plan, ensuite seulement on exécute.

## 3. Régler les permissions selon le niveau de risque

Par défaut, Claude demande une validation avant beaucoup d\'actions. Utile au début, vite ralentissant ensuite. Le bon réglage dépend du risque réel du projet.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.15);background:rgba(212,212,216,0.03)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1.2rem">Quel mode pour quel projet</div>
<div style="display:flex;flex-direction:column;gap:0.7rem">
<div style="display:flex;gap:1rem;align-items:center;padding:0.9rem 1rem;border-radius:10px;background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.15)"><div style="font-weight:700;color:#4ade80;font-size:0.85rem;min-width:130px">Projet sensible</div><div style="font-size:0.82rem;color:#9CA3AF">Mode prudent ou \\\`auto\\\` : Claude confirme les actions qui comptent.</div></div>
<div style="display:flex;gap:1rem;align-items:center;padding:0.9rem 1rem;border-radius:10px;background:rgba(255,140,0,0.05);border:1px solid rgba(255,140,0,0.15)"><div style="font-weight:700;color:#FF8C00;font-size:0.85rem;min-width:130px">Projet perso</div><div style="font-size:0.82rem;color:#9CA3AF">Mode \\\`auto\\\` : vitesse et garde-fous combinés.</div></div>
<div style="display:flex;gap:1rem;align-items:center;padding:0.9rem 1rem;border-radius:10px;background:rgba(252,165,165,0.05);border:1px solid rgba(252,165,165,0.15)"><div style="font-weight:700;color:#fca5a5;font-size:0.85rem;min-width:130px">Prototype jetable</div><div style="font-size:0.82rem;color:#9CA3AF">\\\`bypassPermissions\\\` possible, mais jamais sans Git ni sauvegarde.</div></div>
</div>
</div>

Un prompt de sécurité simple suffit à garder le contrôle : ne modifie que les fichiers strictement nécessaires, et liste-moi tout ce que tu veux supprimer avant de le faire. La vitesse ne doit jamais remplacer le contrôle.

## 4. Tester une idée sans polluer la conversation avec /branch

Plus une conversation s\'allonge, plus chaque détour ajoute du contexte inutile. Si vous voulez explorer une alternative, vous risquez de mélanger les sujets et de perdre le fil principal.

La commande \\\`/branch\\\` crée une branche de conversation. Vous explorez une autre direction, comparez deux options d\'interface, brainstormez une idée secondaire, puis vous revenez à la session principale propre. C\'est ce qui garde Claude concentré sur l\'essentiel.

## 5. Garder un contexte propre avec /context, /compact et /clear

Le contexte est la mémoire active de Claude. Plus la session avance, plus cette mémoire se charge : ça coûte des tokens, ça ralentit, et ça peut rendre les réponses moins précises. Trois commandes gèrent le problème.

<div style="margin:2.5rem 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem">
<div style="padding:1.4rem;border-radius:12px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18)"><div style="font-weight:700;color:#A78BFA;font-size:0.9rem;margin-bottom:0.4rem">/context</div><div style="font-size:0.8rem;color:#9CA3AF;line-height:1.55">Montre ce qui consomme le contexte. À lancer dès que Claude devient confus.</div></div>
<div style="padding:1.4rem;border-radius:12px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18)"><div style="font-weight:700;color:#A78BFA;font-size:0.9rem;margin-bottom:0.4rem">/compact</div><div style="font-size:0.8rem;color:#9CA3AF;line-height:1.55">Résume la session, garde l\'essentiel. Même tâche, conversation trop lourde.</div></div>
<div style="padding:1.4rem;border-radius:12px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.18)"><div style="font-weight:700;color:#A78BFA;font-size:0.9rem;margin-bottom:0.4rem">/clear</div><div style="font-size:0.8rem;color:#9CA3AF;line-height:1.55">Repart de zéro. Nouvelle tâche sans lien avec la précédente.</div></div>
</div>

La règle tient en une ligne : \\\`/compact\\\` quand on continue, \\\`/clear\\\` quand on change de sujet, \\\`/context\\\` au moindre doute sur le poids de la session. On couvre la gestion fine de la fenêtre de contexte dans notre guide sur les [limites de session Claude](/blog/limite-session-claude-gerer-fenetre-contexte).

## 6. Revenir en arrière avec /rewind

Quand Claude part dans la mauvaise direction, le réflexe naturel est d\'empiler des messages de correction. Mauvaise idée : chaque correction ajoute du contexte et embrouille encore plus la conversation.

\\\`/rewind\\\` revient à un point précédent. Vous aviez demandé de comparer le vert et le bleu, alors que vous vouliez le vert et le rouge ? Au lieu de corriger par-dessus, vous revenez au message d\'origine, vous le reformulez proprement, et vous repartez sur une base nette. Bien plus efficace que de dire "non, ce n\'est pas ça".

## 7. Cadrer le projet avec un fichier CLAUDE.md

Le fichier \\\`CLAUDE.md\\\` est le mode d\'emploi que Claude lit en entrant dans un projet. Il contient les règles à suivre, ce qui évite de répéter les mêmes consignes à chaque session.

Un bon \\\`CLAUDE.md\\\` est court, clair et orienté action : analyser avant d\'agir, choisir la solution minimale, ne modifier que le strict nécessaire, rendre chaque changement vérifiable. L\'erreur classique est d\'écrire un pavé : plus le fichier est long, plus il consomme du contexte et plus les règles importantes se noient.

<div style="margin:2.5rem 0;padding:1.5rem 2rem;border-radius:14px;border-left:3px solid #FF8C00;background:rgba(255,140,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:0.6rem">Le squelette d\'un bon CLAUDE.md</div>
<div style="font-size:0.88rem;color:#d4d4d8;line-height:1.8">1. Réfléchir avant d\'agir : analyser le problème et repérer les fichiers concernés.<br>2. Simplicité d\'abord : la solution minimale qui résout le problème.<br>3. Changements chirurgicaux : ne toucher que le nécessaire.<br>4. Objectif vérifiable : chaque changement validé par un test, une commande ou un rendu observable.</div>
</div>

## 8. Imposer une méthode avec un plugin Superpowers

Beaucoup d\'utilisateurs demandent à Claude de construire une application directement, sans cadrage ni plan. Résultat : il part trop vite dans la mauvaise direction.

Un plugin comme Superpowers ajoute des méthodes prêtes à l\'emploi : brainstorming, clarification du besoin, création d\'un plan, exécution, debugging, code review, gestion de sous-agents. L\'intérêt n\'est pas l\'outil en lui-même, c\'est la discipline qu\'il impose : comprendre et planifier avant de construire. C\'est exactement la frontière entre un usage amateur et un usage professionnel de l\'IA.

## 9. Continuer depuis mobile avec /remote-control

La commande \\\`/remote-control\\\` permet de suivre une session Claude Code depuis un téléphone ou un navigateur. Vous lancez une tâche sur votre ordinateur, vous quittez le bureau, et vous continuez à envoyer des instructions ou à répondre à une demande d\'autorisation depuis votre mobile.

Le seul point d\'attention : ne pas fermer la session locale. Le téléphone n\'est qu\'une interface distante.

## 10. Piloter plusieurs sessions avec claude agents

La commande \\\`claude agents\\\` ouvre une vue de pilotage qui regroupe plusieurs sessions au même endroit : celles en cours, celles terminées, celles qui attendent une réponse ou une autorisation.

C\'est utile quand on mène plusieurs tâches indépendantes en parallèle, un bug par-ci, une page pricing par-là, une code review en arrière-plan. La limite est claire : plusieurs sessions consomment plus de quota et peuvent entrer en conflit si elles touchent les mêmes fichiers. À réserver aux tâches bien séparées. C\'est aussi tout l\'enjeu de l\'usage [interactif face à l\'usage programmatique](/blog/claude-code-usage-interactif-vs-programmatique) de Claude Code.

## Le workflow qui combine tout

Pris séparément, ces réglages font gagner quelques minutes. Mis bout à bout, ils transforment Claude Code en système de production.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,140,0,0.18);background:rgba(255,140,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.2rem">Le déroulé type d\'une tâche sérieuse</div>
<div style="display:flex;flex-direction:column;gap:0.6rem">
<div style="display:flex;gap:0.9rem;align-items:center;padding:0.8rem 1rem;border-radius:10px;background:rgba(255,140,0,0.05)"><div style="flex-shrink:0;width:1.8rem;height:1.8rem;border-radius:7px;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-weight:700;color:#FF8C00;font-size:0.8rem">1</div><div style="font-size:0.85rem;color:#e4e4e7"><b>/clear</b> pour partir sur une base propre</div></div>
<div style="display:flex;gap:0.9rem;align-items:center;padding:0.8rem 1rem;border-radius:10px;background:rgba(255,140,0,0.05)"><div style="flex-shrink:0;width:1.8rem;height:1.8rem;border-radius:7px;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-weight:700;color:#FF8C00;font-size:0.8rem">2</div><div style="font-size:0.85rem;color:#e4e4e7"><b>ultrathink</b> sur les tâches complexes, et demande d\'analyse avant toute modification</div></div>
<div style="display:flex;gap:0.9rem;align-items:center;padding:0.8rem 1rem;border-radius:10px;background:rgba(255,140,0,0.05)"><div style="flex-shrink:0;width:1.8rem;height:1.8rem;border-radius:7px;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-weight:700;color:#FF8C00;font-size:0.8rem">3</div><div style="font-size:0.85rem;color:#e4e4e7">Création puis <b>validation d\'un plan</b> avant d\'exécuter</div></div>
<div style="display:flex;gap:0.9rem;align-items:center;padding:0.8rem 1rem;border-radius:10px;background:rgba(255,140,0,0.05)"><div style="flex-shrink:0;width:1.8rem;height:1.8rem;border-radius:7px;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-weight:700;color:#FF8C00;font-size:0.8rem">4</div><div style="font-size:0.85rem;color:#e4e4e7">Exécution avec les <b>bonnes permissions</b>, puis vérification via <b>Playwright MCP</b></div></div>
<div style="display:flex;gap:0.9rem;align-items:center;padding:0.8rem 1rem;border-radius:10px;background:rgba(74,222,128,0.06)"><div style="flex-shrink:0;width:1.8rem;height:1.8rem;border-radius:7px;background:rgba(74,222,128,0.15);display:flex;align-items:center;justify-content:center;font-weight:700;color:#4ade80;font-size:0.8rem">5</div><div style="font-size:0.85rem;color:#e4e4e7"><b>/compact</b> si la session s\'allonge, <b>/rewind</b> si Claude dévie</div></div>
</div>
</div>

Un prompt réutilisable qui encode cette discipline :

> **ultrathink.** Je veux implémenter [fonctionnalité]. Commence par analyser le besoin. Propose un plan avant d\'agir. Ne modifie que les fichiers nécessaires. Privilégie la solution la plus simple. Vérifie le résultat avec Playwright MCP et corrige en boucle jusqu\'à un rendu conforme. Évite toute refonte hors scope.

## Ce qu\'on retient

Claude Code devient puissant quand on l\'utilise avec méthode. La différence ne vient pas de la qualité du modèle, mais de la façon de le piloter : lui donner les bons outils, garder son contexte propre, revenir en arrière quand il dévie, cadrer le projet avec un \\\`CLAUDE.md\\\`, et vérifier visuellement son travail.

C\'est là que se joue le vrai écart de productivité dans les équipes. Deux personnes avec le même abonnement obtiennent des résultats qui n\'ont rien à voir, simplement parce que l\'une connaît ces réflexes et l\'autre non. Cet écart se forme, et il se forme vite.

C\'est exactement ce qu\'on enseigne dans la [Formation Claude IA](/formation-entreprise/claude-ai) : pas une démo théorique, mais la méthode de travail concrète, sur vos vrais projets, pour que vos collaborateurs passent de l\'usage gadget à l\'usage de production. Si vous voulez d\'abord situer ce que Claude peut apporter à votre structure, le guide [Claude pour les TPE et PME romandes](/blog/claude-tpe-pme-romandes) pose les paliers d\'usage. Et pour cadrer un déploiement plus large, on en parle simplement autour d\'un café à Genève : [prenez contact](/contact).`,
}

export default article
