import type { Article } from './types'

const article: Article = {
  slug: 'deepseek-open-source-donnees-pme',
  category: 'ia',
  title: 'DeepSeek : ce que l\'open source change vraiment pour vos données',
  excerpt:
    'On vous a vendu DeepSeek comme l\'IA chinoise qui écrase tout le monde. Le vrai enseignement est ailleurs, et il est beaucoup plus utile : le modèle étant ouvert, vous pouvez le faire tourner ailleurs que chez son éditeur. Donc vous gardez la main sur vos données. Décryptage des chiffres, des capacités réelles et des limites.',
  date: '20 juillet 2026',
  dateISO: '2026-07-20',
  readTime: '9 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/deepseek-open-source-donnees-pme-hero.webp',
    alt: 'DeepSeek open source et protection des données : poste de travail d\'une PME à Genève utilisant un modèle IA en 2026',
  },
  images: [
    {
      src: '/images/blog/deepseek-v4-cout-tokens-comparaison.webp',
      alt: 'DeepSeek V4 comparaison de coût par million de tokens face à GPT-5.5 et Opus 4.7 pour une PME suisse en 2026',
      caption:
        'À l\'entrée, DeepSeek V4-Pro se situe autour de 1,74 dollar par million de tokens. Pour un usage à gros volume, l\'écart avec les modèles américains de pointe change la nature de la facture.',
    },
    {
      src: '/images/blog/deepseek-open-weights-hebergement-donnees.webp',
      alt: 'DeepSeek open weights : trois options d\'hébergement du modèle et le droit applicable aux données d\'une entreprise suisse',
      caption:
        'Un modèle ouvert n\'a pas une seule porte d\'entrée. Le même modèle hébergé ailleurs, c\'est le même résultat mais un autre droit applicable à vos données.',
    },
  ],
  tags: ['DeepSeek', 'Open source', 'Open weights', 'Protection des données', 'IA', 'Coût IA', 'Souveraineté numérique', 'PME', 'Genève', '2026'],
  seoTitle: 'DeepSeek V4 : open source, coûts et données, le vrai enjeu 2026',
  seoDescription:
    'DeepSeek V4 est-elle vraiment meilleure que ChatGPT et Claude ? Ce que disent les chiffres, où partent vos données et comment garder le contrôle. Analyse DKDP.',
  content: `Une vidéo tourne beaucoup en ce moment : un labo chinois aurait résolu le plus gros problème de l'IA, ses modèles seraient presque aussi puissants que les meilleurs américains, et le tout serait gratuit. La vidéo se termine, sans surprise, par la promotion d'une formation payante.

Le fond est pourtant plus solide que la moyenne du contenu de ce genre. Les faits techniques tiennent la route, et l'auteur a l'honnêteté de dire que DeepSeek n'est pas meilleure que ChatGPT ou Claude. Mais l'information réellement réutilisable n'est pas celle qui sert de titre. Ce n'est pas "DeepSeek écrase tout". C'est ceci : comme le modèle est publié en open weights, vous pouvez le faire tourner ailleurs que chez son éditeur, donc vous gardez la main sur vos données. Le reste, c'est du contexte. Utile, mais du contexte.

## Ce que DeepSeek a réellement fait

DeepSeek n'est pas un géant de la tech. C'est un petit laboratoire chinois né d'un fonds d'investissement, avec peu d'effectifs, peu de capital, et un handicap de départ : les restrictions américaines le privent des puces les plus puissantes. Sa première sortie remarquée, il y a un peu plus d'un an, a déclenché une correction boursière massive sur les valeurs liées à l'IA. La question posée au marché était brutale : si un labo sans moyens y arrive presque, pourquoi les autres dépensent-ils des milliards ?

La réponse technique tient en une idée. Un modèle classique mobilise toute sa puissance pour chaque question posée. DeepSeek ne réveille que les quelques spécialistes utiles à la question et laisse le reste en sommeil. C'est ce qu'on appelle une architecture Mixture-of-Experts : la puissance d'un très gros modèle, la vitesse et le coût d'un petit. L'idée n'est pas d'eux, mais ils l'ont poussée plus loin que les autres, et surtout ils publient presque tout : le modèle téléchargeable et des dizaines de papiers de recherche. Ce qu'ils gardent secret, c'est la recette d'entraînement exacte et les données.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.16);background:rgba(212,212,216,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1.25rem">DEEPSEEK V4 EN QUATRE CHIFFRES</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:210px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:1.5rem;color:#D4D4D8;font-weight:700;margin-bottom:0.4rem">1 600 Md</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Paramètres au total sur la version Pro, dont seulement 49 milliards activés par token traité.</div>
</div>
<div style="flex:1;min-width:210px;padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.16)">
<div style="font-size:1.5rem;color:#A78BFA;font-weight:700;margin-bottom:0.4rem">1 million</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Tokens de fenêtre de contexte, soit environ 750 000 mots tenus en mémoire dans une même conversation.</div>
</div>
<div style="flex:1;min-width:210px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:1.5rem;color:#4ade80;font-weight:700;margin-bottom:0.4rem">Licence MIT</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Série publiée en open weights le 24 avril 2026, en deux versions, Pro et Flash. Tout le monde peut la récupérer et l'héberger.</div>
</div>
<div style="flex:1;min-width:210px;padding:1.25rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08)">
<div style="font-size:1.5rem;color:#FF8C00;font-weight:700;margin-bottom:0.4rem">3 à 6 mois</div>
<div style="font-size:0.82rem;color:#9CA3AF;line-height:1.6">Le retard que DeepSeek reconnaît elle-même, dans son propre rapport, face aux meilleurs modèles fermés.</div>
</div>
</div>
</div>

L'effet en boule de neige est réel. Les concurrents doivent soit s'aligner, soit justifier des prix bien supérieurs. D'autres laboratoires chinois ont ouvert leurs modèles à leur tour. Et les modèles chinois coûtent aujourd'hui quatre à dix fois moins cher que leurs équivalents américains. C'est une logique de challenger classique : rendre la technologie quasi gratuite pour effacer l'avance des leaders.

## Ce qui est solide, ce qui est gonflé

Le titre "a résolu le plus gros problème de l'IA" est du clic. DeepSeek n'a rien résolu seule, elle a accéléré une tendance open weights déjà en cours, et elle admet elle-même qu'elle suit les modèles de pointe plutôt qu'elle ne les précède.

Le chiffre du "vingt fois moins cher" mérite le même traitement. La somme qui a fait le tour des rédactions ne concernait que le calcul final d'entraînement, hors recherche, salaires et amortissement du matériel. La comparer au coût total d'un GPT-4 est trompeur. L'ordre de grandeur reste néanmoins crédible : un modèle de pointe entraîné pour environ 294 000 dollars, ça n'a rien à voir avec les budgets annoncés en face.

Enfin, "elle dépasse les modèles américains sur certains tests" est vrai, mais il faut préciser lesquels. C'est surtout le code. Elle est en tête sur LiveCodeBench, son ELO Codeforces dépasse celui de GPT-5.5, et elle est à égalité statistique avec Opus 4.7 sur SWE-bench Verified. Sur le raisonnement le plus difficile et l'analyse de gros dossiers, elle reste derrière. La bonne formulation est donc "ça dépend de la tâche", pas "elle est supérieure".

___IMG:deepseek-v4-cout-tokens-comparaison.webp___

Là où l'écart est indiscutable, c'est le prix. Pour un développeur ou une équipe qui consomme beaucoup, passer sur ce type de modèle peut diviser la facture par dix. C'est ce point, et pas la performance brute, qui explique la pression exercée sur tout le marché. Si le sujet du choix d'un modèle vous intéresse, on a comparé les modèles de pointe en conditions réelles dans notre article sur [GPT-5.5 face à Claude Opus](/blog/gpt-5-5-vs-claude-opus-4-7-tests-pratiques-2026).

## Le seul vrai enseignement : vous choisissez où tourne le modèle

Voici le point à retenir, et il est rarement expliqué correctement.

Sur le site officiel de DeepSeek, vos données partent bien en Chine. C'est écrit noir sur blanc dans leur politique de confidentialité : messages, fichiers, historique, adresse de connexion. L'outil a d'ailleurs été interdit sur les appareils des administrations aux États-Unis et en Australie, et retiré des magasins d'applications en Italie. Pour une fiduciaire genevoise, un cabinet médical ou une régie qui manipule des données de tiers, c'est rédhibitoire.

Sauf qu'un modèle ouvert n'a pas une seule porte d'entrée. Comme les poids sont publics, n'importe quel hébergeur peut proposer exactement le même modèle. Vous pouvez l'utiliser chez un grand cloud américain, ou chez un hébergeur européen. Le résultat est identique, mais vos données ne relèvent plus du droit chinois.

___IMG:deepseek-open-weights-hebergement-donnees.webp___

C'est un avantage que les modèles fermés n'offriront jamais. Avec ChatGPT ou Claude, il n'existe qu'un fournisseur, et vous acceptez ses conditions ou vous n'utilisez pas l'outil. Corollaire souvent oublié : même si DeepSeek fermait boutique demain, le modèle publié resterait utilisable. Vous n'êtes pas enfermé chez un éditeur.

> Sur nos projets clients, la question n'est jamais "quel est le meilleur modèle du monde". C'est "où vont les données, sous quel droit, et qui peut y accéder". Le reste se négocie.

Attention à une confusion fréquente au passage. Open source ne signifie pas "je le fais tourner sur mon ordinateur portable". Avec 1 600 milliards de paramètres à héberger, même si une fraction seulement s'active à chaque question, il faut du matériel professionnel à plusieurs dizaines de milliers de francs. Open source veut dire que le modèle est public et que n'importe qui peut le récupérer et le proposer. Ce n'est pas la même chose que gratuit et local.

## L'angle que personne ne mentionne : le mode expert coûte cher

Un dernier point, absent de la vidéo, et qui vaut pour tous les modèles récents, pas seulement DeepSeek. Les modes dits expert ou raisonnement génèrent une chaîne de réflexion interne avant de répondre. Ça aide beaucoup sur les problèmes à plusieurs étapes. Ça nuit sur les tâches simples, avec des baisses de précision mesurées de l'ordre de 2 à 4 % sur du rappel factuel de base, parce que le modèle surréfléchit une question qui n'en demandait pas tant.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.25rem">QUEL MODE POUR QUELLE TÂCHE</div>
<div style="display:flex;flex-wrap:wrap;gap:1rem">
<div style="flex:1;min-width:240px;padding:1.25rem;border-radius:12px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15)">
<div style="font-size:0.9rem;color:#4ade80;font-weight:700;margin-bottom:0.75rem">Mode rapide</div>
<div style="font-size:0.82rem;color:#e4e4e7;line-height:1.6">Reformuler un email, traduire, résumer, extraire une information d'un document, répondre à une question factuelle. Plus rapide, moins cher, et souvent plus juste.</div>
</div>
<div style="flex:1;min-width:240px;padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.15)">
<div style="font-size:0.9rem;color:#A78BFA;font-weight:700;margin-bottom:0.75rem">Mode expert</div>
<div style="font-size:0.82rem;color:#e4e4e7;line-height:1.6">Problème à plusieurs étapes, calcul, analyse contradictoire, code non trivial, arbitrage entre plusieurs options. Là, la réflexion interne se paie mais elle rapporte.</div>
</div>
</div>
</div>

Le réflexe à prendre est simple : le mode expert n'est pas le mode par défaut, c'est un outil pour les questions difficiles. Sur une demande banale, il est plus lent, plus cher, et parfois moins précis.

## Ce que ça change concrètement pour une PME romande

Trois situations, trois réponses différentes.

Pour l'usage quotidien, écrire, traduire, apprendre, sans données sensibles, un compte gratuit sur un modèle ouvert fait très bien l'affaire. Ça ne remplace pas l'outil sur lequel votre équipe est déjà formée, et le vrai coût n'a jamais été la licence mais la capacité à s'en servir. C'est d'ailleurs le sujet de notre comparatif [ChatGPT, Claude ou Copilot pour une PME](/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026).

Pour le développement à gros volume, l'arbitrage est purement économique, et l'écart de prix est trop important pour être ignoré. Détail technique utile : l'API de DeepSeek parle à la fois le format OpenAI et le format Anthropic, ce qui lui permet de se brancher dans des outils comme Claude Code sans passerelle intermédiaire. L'agent tourne sur votre machine, mais le modèle, lui, tourne dans le cloud. C'est exactement la distinction qu'on détaille dans notre article sur [l'usage interactif et programmatique de Claude Code](/blog/claude-code-usage-interactif-vs-programmatique).

Pour les données sensibles, réfléchissez à deux fois avant de coller quoi que ce soit sur un site officiel, quel qu'il soit. C'est là que l'hébergement choisi devient la vraie décision, avant même le choix du modèle.

## Questions fréquentes

### DeepSeek est-elle meilleure que ChatGPT ou Claude ?

Non, pas globalement. Elle est à égalité sur beaucoup de tâches et elle passe devant sur le code, mais les meilleurs modèles fermés gardent une avance sur les tâches les plus difficiles. DeepSeek reconnaît elle-même un retard de trois à six mois.

### Mes données partent-elles vraiment en Chine ?

Sur le site et l'application officiels, oui : messages, fichiers, historique et adresse de connexion, comme indiqué dans leur politique de confidentialité. Si vous passez par un hébergeur américain ou européen qui propose le même modèle, non.

### Puis-je faire tourner DeepSeek sur mon ordinateur ?

Pas la version complète. 1 600 milliards de paramètres demandent du matériel professionnel à plusieurs dizaines de milliers de francs. Des versions allégées existent, mais elles ne délivrent pas les mêmes performances. Open source veut dire public, pas portable.

### Est-ce vraiment gratuit ?

L'interface grand public l'est. Dès que vous branchez le modèle dans vos propres outils, vous basculez sur une facturation à l'usage, très inférieure à celle des modèles américains de pointe mais pas nulle. Et si vous l'hébergez vous-même, vous payez l'infrastructure.

### Faut-il changer d'outil dans mon entreprise ?

Rarement pour la seule raison du prix. Le coût de la licence est marginal face au temps que votre équipe passe à mal utiliser un outil. Changez si vous avez une contrainte de volume ou une contrainte de localisation des données. Sinon, formez d'abord.

## En bref

DeepSeek n'a pas résolu le plus gros problème de l'IA, elle a accéléré un mouvement déjà lancé : celui de modèles très capables, publiés ouvertement, à un coût qui rend les tarifs de pointe difficiles à justifier. Sur la performance, la réponse honnête est "ça dépend de la tâche". Sur le prix, l'écart est réel. Sur les données, tout se joue sur un point : un modèle ouvert peut tourner ailleurs que chez son éditeur, et c'est vous qui choisissez où.

L'IA puissante se banalise. La vraie question n'est plus d'y accéder, c'est de savoir quoi en faire et dans quel cadre. Si vous voulez poser ce cadre proprement pour votre équipe, c'est le sujet de notre [formation Claude IA](/formation-entreprise/claude-ai). On peut aussi en [parler de vive voix](/contact) et regarder ce que ça donne sur votre activité.`,
}

export default article
