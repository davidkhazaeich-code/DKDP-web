import type { Article } from './types'

const article: Article = {
  slug: 'choisir-consultant-agence-ia-geneve',
  category: 'ia',
  title: 'Comment choisir un consultant ou une agence IA pour votre PME à Genève',
  excerpt:
    'Depuis que l\'IA est partout, tout le monde à Genève vend du conseil en intelligence artificielle : agences généralistes, freelances reconvertis, anciens développeurs web. Un chatbot générique n\'est pourtant pas un système sur mesure. Voici les signaux concrets, vérifiables en un seul appel, pour distinguer un vrai consultant IA d\'un revendeur de template.',
  date: '7 septembre 2026',
  dateISO: '2026-09-07',
  readTime: '9 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/choisir-agence-ia-geneve-entretien-conseil.png',
    alt: 'Agence IA Genève : entretien entre un dirigeant de PME et un consultant en intelligence artificielle pour évaluer un projet',
  },
  images: [
    {
      src: '/images/blog/consultant-ia-geneve-grille-evaluation-radar.png',
      alt: 'Consultant IA Genève : grille d\'évaluation radar des critères clés pour choisir un prestataire IA en 2026',
      caption: 'La grille d\'évaluation radar pour comparer objectivement plusieurs consultants ou agences IA',
    },
    {
      src: '/images/blog/consultant-ia-geneve-signaux-alarme-bons-signes.png',
      alt: 'Signaux d\'alarme consultant IA : checklist visuelle des bons réflexes avant de choisir une agence IA pour sa PME',
      caption: 'Les signaux à repérer avant de signer avec un consultant ou une agence IA',
    },
  ],
  tags: ['consultant IA', 'agence IA', 'Genève', 'PME', 'intelligence artificielle', 'sélection prestataire'],
  seoTitle: 'Choisir un consultant IA à Genève : le guide pour PME',
  seoDescription:
    'Comment choisir un consultant ou une agence IA à Genève pour votre PME ? Signaux d\'alarme à repérer, bonnes questions à poser, et grille objective avant de signer.',
  faq: [
    {
      question: 'Combien coûte un projet avec un consultant ou une agence IA à Genève ?',
      answer:
        'Les tarifs varient énormément selon le périmètre. Sur le marché genevois, un audit ou un diagnostic initial se situe souvent entre CHF 500 et CHF 1\'000. Une automatisation ciblée sur un processus précis va de CHF 1\'500 à CHF 4\'000. Un agent IA sur mesure ou une intégration plus large avec plusieurs outils connectés peut monter à CHF 5\'000 et au-delà selon la complexité. Méfiez-vous autant des forfaits "tout compris" très bas que des devis à cinq chiffres qui ne détaillent pas ce qu\'ils couvrent.',
    },
    {
      question: 'Faut-il obligatoirement choisir un prestataire suisse pour un projet IA ?',
      answer:
        'Non, mais c\'est un vrai avantage sur ce sujet précis, plus que pour un site web classique. La question de l\'hébergement des données et de la conformité à la nLPD se pose différemment selon où votre prestataire opère et où il héberge ses systèmes. Un interlocuteur basé en Suisse romande, disponible dans votre langue et dans votre fuseau horaire, facilite aussi le suivi dans la durée et la compréhension du contexte réglementaire local.',
    },
    {
      question: 'Quels sont les signaux d\'alarme d\'un mauvais consultant IA ?',
      answer:
        'Les principaux : une solution identique proposée à chaque client sans adaptation réelle, aucune question sur vos données ou leur hébergement avant de parler d\'outils, un prix ou un périmètre flous, l\'absence de plan de maintenance après la livraison, et un interlocuteur qui ne dit jamais non à une demande, même quand elle n\'est pas pertinente pour votre situation.',
    },
    {
      question: 'Quelle est la différence entre un consultant IA indépendant et une agence ?',
      answer:
        'Un consultant indépendant offre souvent plus de flexibilité et des tarifs plus légers, mais dépend d\'une seule personne pour la disponibilité et la continuité. Une agence réunit plusieurs compétences (technique, conduite du changement, formation), ce qui aide sur des projets qui touchent plusieurs équipes ou qui doivent survivre au départ d\'une personne. Pour un test isolé sur un seul processus, un indépendant peut suffire. Pour un déploiement à l\'échelle de l\'entreprise, une agence structure mieux la durée.',
    },
  ],
  content: `## Le problème : tout le monde vend de l'intelligence artificielle

Il y a trois ans, chercher un consultant IA à Genève revenait à chercher une aiguille dans une botte de foin. Il n'y avait presque personne. Aujourd'hui, c'est l'inverse : agences digitales généralistes, freelances reconvertis, anciens développeurs web, consultants marketing d'hier, tout le monde a ajouté une page "Intelligence artificielle" ou "Automatisation" à son site.

Le problème, c'est que le ticket d'entrée est devenu très bas. Brancher un abonnement à un modèle de langage sur un site web, habiller un script d'automatisation avec le mot "agent IA", ça se fait en quelques jours. Rien n'empêche quiconque de le présenter comme un projet sur mesure, même quand ce n'est qu'un gabarit recyclé d'un client à l'autre.

Pour un dirigeant de PME sans formation technique, la différence ne se voit pas sur un site web ni dans un premier email commercial. Elle se voit dans la façon dont le prestataire mène la conversation, dans les questions qu'il pose (ou qu'il ne pose pas), et dans ce qu'il accepte de vous dire clairement, y compris quand la réponse ne l'arrange pas commercialement.

Si vous cherchez plutôt une agence généraliste pour un site web ou une stratégie de visibilité, notre guide sur [comment choisir une agence digitale à Genève](/blog/choisir-agence-digitale-geneve) couvre les mêmes réflexes appliqués à ce métier-là. Ici, on se concentre sur un profil plus récent et plus flou : celui qui vend spécifiquement du conseil ou de la mise en œuvre en intelligence artificielle.

Voici les signaux qui comptent, dans l'ordre où ils apparaissent généralement dans une conversation avec un prestataire.

## Signal d'alarme n°1 : la même solution, pour tout le monde

Si dès le premier échange, avant même d'avoir décrit votre activité en détail, on vous propose déjà "un agent IA" ou "un chatbot" avec une liste de bénéfices qui pourrait s'appliquer à n'importe quelle entreprise (disponible 24h/24, répond à toutes les questions clients, opérationnel en 48 heures), c'est un signal à prendre au sérieux.

Un système utile s'appuie sur vos documents, votre façon de travailler, vos cas particuliers, vos exceptions. Il ne peut pas être pensé avant d'avoir vu tout ça. Une question simple à poser directement : "Qu'est-ce qui serait différent, dans ce que vous me proposez, par rapport à votre dernier client ?" Si la réponse reste générale, vous avez affaire à un produit standard avec votre logo dessus.

## Signal d'alarme n°2 : personne ne parle de vos données avant de parler d'outils

Avant même de discuter du choix entre tel ou tel outil, un prestataire sérieux doit vous poser des questions sur vos données : lesquelles sont sensibles, où seront-elles stockées, qui peut y accéder, sont-elles utilisées pour entraîner un modèle, que devient une donnée client ou une donnée financière une fois entrée dans le système.

En Suisse, la nLPD s'applique à toute entreprise qui traite des données personnelles, indépendamment de sa taille. Vous n'avez pas besoin d'être juriste pour juger les réponses : [ce que la nLPD change concrètement quand on déploie ChatGPT ou Claude](/blog/protection-donnees-ia-nlpd-pme-suisse) tient en quelques principes, et un prestataire qui les maîtrise se repère en deux minutes. Si celui d'en face commence directement par "vous préférez tel ou tel modèle ?" sans avoir posé une seule question de ce type, l'ordre des priorités est inversé. La conversation sur la gouvernance et la confidentialité doit précéder celle sur les outils, jamais la suivre.

## Signal d'alarme n°3 : un prix flou, et plus personne après la livraison

Un devis qui reste vague sur ce qui est inclus, ce qui sera facturé en supplément, et surtout ce qui se passe après la mise en production, est un signal d'alarme classique. Un système d'IA n'est pas un site vitrine qu'on livre puis qu'on oublie. Les modèles évoluent, vos process changent, un prompt calibré sur votre catalogue de l'an dernier peut se mettre à raconter n'importe quoi sur celui de cette année.

Demandez explicitement qui met à jour le système dans six mois, à quel coût, et ce qui se passe si un fournisseur d'IA change ses conditions ou ses tarifs entre-temps. Un prestataire honnête sait répondre à cette question avant même que vous ayez à la poser. C'est aussi pour ça que la transparence sur les prix compte : un prestataire qui affiche sa grille tarifaire noir sur blanc (la nôtre est publique sur notre [page tarifs](/tarifs)) vous donne un vrai point de comparaison avant même le premier appel.

___IMG:consultant-ia-geneve-grille-evaluation-radar.png___

## Bon signe n°1 : il s'intéresse à vos outils et à vos process avant de proposer quoi que ce soit

À l'inverse, un bon signe se reconnaît vite : la première vraie réunion ressemble à un interrogatoire sur votre quotidien, pas à une démonstration. Quel logiciel de gestion utilisez-vous aujourd'hui, comment une demande client circule-t-elle entre la première prise de contact et sa résolution, où est-ce que ça bloque, qui fait quoi.

Un prestataire qui pose ces questions avec précision, en citant vos outils par leur nom et pas de façon générique, prépare une proposition qui parlera de votre entreprise, pas d'une capacité abstraite de l'intelligence artificielle. À l'inverse, celui qui ne demande jamais comment vous travaillez aujourd'hui ne pourra proposer qu'un produit sur étagère, quel que soit le vocabulaire employé pour le présenter.

## Bon signe n°2 : il peut montrer un résultat précis, chiffré

Demandez un exemple réel, avec des chiffres réels : un volume de demandes traitées, un temps gagné mesuré, un taux d'erreur qui a baissé. Pas "on fait gagner du temps à nos clients" en général, mais un cas concret, si possible dans un secteur ou une taille d'entreprise comparable à la vôtre.

La confidentialité n'empêche rien : un prestataire peut très bien décrire un résultat précis sans révéler le nom du client, en arrondissant les chiffres si nécessaire. Ce qui doit alerter, c'est l'absence totale de détails vérifiables, pas la discrétion sur l'identité du client.

## Bon signe n°3 : il vous dit quand ça ne vaut pas le coup

Le signal le plus fiable de tous : un prestataire qui vous dit, à un moment de la conversation, que ce que vous demandez n'est pas la bonne priorité. Que votre volume est trop faible pour justifier l'investissement. Que vos données ne sont pas encore assez propres pour qu'un système soit fiable. Qu'un tableau bien construit réglerait le problème dix fois moins cher qu'un projet IA.

Un interlocuteur qui dit oui à tout ce que vous proposez optimise la vente, pas votre résultat. Celui qui prend le risque de vous perdre en disant non au bon moment est celui qui construit une relation de confiance.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1.25rem">SIGNAL D'ALARME VS BON SIGNE</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
<div>
<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#fca5a5;margin-bottom:0.75rem">A fuir</div>
<div style="display:flex;flex-direction:column;gap:0.5rem">
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#fca5a5;flex-shrink:0">✕</span> Le même "agent IA" proposé à tous ses clients
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#fca5a5;flex-shrink:0">✕</span> Aucune question sur vos données avant de parler d'outils
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#fca5a5;flex-shrink:0">✕</span> Prix et périmètre flous, rien d'écrit noir sur blanc
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#fca5a5;flex-shrink:0">✕</span> Aucun plan de maintenance après la livraison
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#fca5a5;flex-shrink:0">✕</span> Dit oui à chaque demande, sans jamais nuancer
</div>
</div>
</div>
<div>
<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#4ade80;margin-bottom:0.75rem">Bon signe</div>
<div style="display:flex;flex-direction:column;gap:0.5rem">
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#4ade80;flex-shrink:0">✓</span> Questions précises sur vos outils et vos process actuels
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#4ade80;flex-shrink:0">✓</span> Aborde la confidentialité et l'hébergement des données d'emblée
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#4ade80;flex-shrink:0">✓</span> Devis détaillé : inclus, exclus, échéances
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#4ade80;flex-shrink:0">✓</span> Plan de suivi et de mise à jour clair
</div>
<div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.82rem;color:#e4e4e7">
<span style="color:#4ade80;flex-shrink:0">✓</span> Vous dit quand un projet n'est pas la bonne priorité
</div>
</div>
</div>
</div>
</div>

___IMG:consultant-ia-geneve-signaux-alarme-bons-signes.png___

## Les questions à poser dès le premier appel

Cinq questions suffisent pour faire apparaître la plupart des signaux ci-dessus, sans avoir besoin de compétences techniques pour juger les réponses.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,140,0,0.2);background:rgba(255,140,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.25rem">5 QUESTIONS A POSER AU PREMIER APPEL</div>
<div style="display:flex;flex-direction:column;gap:0.5rem">
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,140,0,0.15);border:1px solid rgba(255,140,0,0.3);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#FF8C00;flex-shrink:0">1</div>
<div style="flex:1;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.03)">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Où seront hébergées mes données, et qui peut y accéder ?</div>
</div>
</div>
<div style="width:1px;height:16px;background:rgba(255,140,0,0.2);margin-left:20px"></div>
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,140,0,0.15);border:1px solid rgba(255,140,0,0.3);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#FF8C00;flex-shrink:0">2</div>
<div style="flex:1;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.03)">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Montrez-moi un résultat concret, avec des chiffres, sur un projet comparable</div>
</div>
</div>
<div style="width:1px;height:16px;background:rgba(255,140,0,0.2);margin-left:20px"></div>
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,140,0,0.15);border:1px solid rgba(255,140,0,0.3);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#FF8C00;flex-shrink:0">3</div>
<div style="flex:1;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.03)">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Qu'est-ce qui est inclus dans ce prix, et qu'est-ce qui sera facturé en plus ?</div>
</div>
</div>
<div style="width:1px;height:16px;background:rgba(255,140,0,0.2);margin-left:20px"></div>
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,140,0,0.15);border:1px solid rgba(255,140,0,0.3);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#FF8C00;flex-shrink:0">4</div>
<div style="flex:1;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.03)">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Qui met à jour le système dans six mois, et à quel coût ?</div>
</div>
</div>
<div style="width:1px;height:16px;background:rgba(255,140,0,0.2);margin-left:20px"></div>
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,140,0,0.15);border:1px solid rgba(255,140,0,0.3);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;color:#FF8C00;flex-shrink:0">5</div>
<div style="flex:1;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.03)">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Dans mon cas précis, qu'est-ce qui ne vaut PAS la peine d'être automatisé ?</div>
</div>
</div>
</div>
</div>

## Conclusion : appliquez cette grille, y compris avec nous

Cette grille n'appartient à personne. Elle marche pour n'importe quel prestataire IA, en Suisse romande ou ailleurs, et elle marche aussi pour DKDP. Si vous nous rencontrez, posez-nous exactement ces cinq questions. On vous répondra avec la même franchise qu'on attend de n'importe qui d'autre : si votre projet correspond à ce qu'on sait bien faire, on vous le dira, et si ce n'est pas le cas, on vous le dira aussi, quitte à vous orienter ailleurs.

Pour voir concrètement qui est derrière DKDP, ce qu'on fait et ce qu'on évite de promettre, notre page [À propos](/a-propos) présente l'équipe et la méthode. Et si après cette lecture vous voulez un avis extérieur sur votre projet IA, même si la réponse est qu'on n'est pas les bons pour vous, un [échange de 30 minutes](/contact) ne coûte rien et n'engage à rien.

## Questions fréquentes

**Combien coûte un projet avec un consultant ou une agence IA à Genève ?**
Les tarifs varient énormément selon le périmètre. Sur le marché genevois, un audit ou un diagnostic initial se situe souvent entre CHF 500 et CHF 1'000. Une automatisation ciblée sur un processus précis va de CHF 1'500 à CHF 4'000. Un agent IA sur mesure ou une intégration plus large avec plusieurs outils connectés peut monter à CHF 5'000 et au-delà selon la complexité. Méfiez-vous autant des forfaits "tout compris" très bas que des devis à cinq chiffres qui ne détaillent pas ce qu'ils couvrent.

**Faut-il obligatoirement choisir un prestataire suisse pour un projet IA ?**
Non, mais c'est un vrai avantage sur ce sujet précis, plus que pour un site web classique. La question de l'hébergement des données et de la conformité à la nLPD se pose différemment selon où votre prestataire opère et où il héberge ses systèmes. Un interlocuteur basé en Suisse romande, disponible dans votre langue et dans votre fuseau horaire, facilite aussi le suivi dans la durée et la compréhension du contexte réglementaire local.

**Quels sont les signaux d'alarme d'un mauvais consultant IA ?**
Les principaux : une solution identique proposée à chaque client sans adaptation réelle, aucune question sur vos données ou leur hébergement avant de parler d'outils, un prix ou un périmètre flous, l'absence de plan de maintenance après la livraison, et un interlocuteur qui ne dit jamais non à une demande, même quand elle n'est pas pertinente pour votre situation.

**Quelle est la différence entre un consultant IA indépendant et une agence ?**
Un consultant indépendant offre souvent plus de flexibilité et des tarifs plus légers, mais dépend d'une seule personne pour la disponibilité et la continuité. Une agence réunit plusieurs compétences (technique, conduite du changement, formation), ce qui aide sur des projets qui touchent plusieurs équipes ou qui doivent survivre au départ d'une personne. Pour un test isolé sur un seul processus, un indépendant peut suffire. Pour un déploiement à l'échelle de l'entreprise, une agence structure mieux la durée.`,
}

export default article
