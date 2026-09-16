import type { Article } from './types'

/**
 * Article de positionnement de l'offre « journée d'équipe hors les murs »
 * de DKDP : on garde le format du team building (lieu, table, temps passé
 * ensemble) et on remplace l'activité par la construction d'outils IA pour
 * son propre service. Texte de base de David du 16 septembre 2026, enrichi
 * d'un déroulé type, d'exemples de ce qu'un groupe construit et d'une FAQ.
 * Aucun prix : le format s'ajuste à l'équipe, le cadrage se fait en appel.
 */
const article: Article = {
  slug: 'team-building-ia-journee-cohesion-equipe',
  category: 'formation',
  title: "Journée de cohésion d'équipe : et si on construisait ses propres outils IA ?",
  excerpt:
    "Un team building classique laisse des photos et une anecdote. En gardant le lieu, la table et le temps passé ensemble, mais en remplaçant l'activité par la construction d'outils IA pour son propre service, l'équipe rentre avec quelque chose qui tourne le lundi matin.",
  date: '16 septembre 2026',
  dateISO: '2026-09-16',
  readTime: '9 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/team-building-ia-journee-cohesion-equipe-hero.webp',
    alt: "Team building IA en Suisse romande : équipe de six collaborateurs qui construisent leurs outils d'intelligence artificielle autour d'une table en bois dans un chalet, 2026",
  },
  images: [
    {
      src: '/images/blog/team-building-ia-presentation-outils-fin-de-journee.webp',
      alt: "Journée de cohésion d'équipe IA : un participant présente à ses collègues l'outil que son groupe a construit dans la journée, salle de séminaire en chalet, Suisse romande",
      caption:
        "Fin de journée : chaque groupe montre aux autres ce qu'il a construit. C'est le moment où l'exercice de cohésion et le travail réel se rejoignent.",
    },
    {
      src: '/images/blog/team-building-ia-effet-dans-le-temps-classique-vs-outils.webp',
      alt: "Team building classique ou journée outils IA : courbe de l'effet sur le travail de l'équipe du jour J à trois mois, l'un retombe en trois semaines, l'autre se maintient",
      caption:
        "Ce que produit la journée, trois semaines et trois mois plus tard. Le format classique retombe vite, l'outil construit continue de servir.",
    },
  ],
  tags: ['Team building', 'Formation IA', 'Cohésion d\'équipe', 'Séminaire', 'PME', 'Suisse romande', '2026'],
  seoTitle: "Team building IA : une journée d'équipe qui laisse des outils",
  seoDescription:
    "Même journée, même lieu, même budget qu'un team building, mais l'équipe construit ses outils IA et rentre avec quelque chose qui tourne le lundi matin.",
  faq: [
    {
      question: "Faut-il déjà connaître l'IA pour participer ?",
      answer:
        "Non, et c'est même ce qui rend l'exercice égalitaire. La matinée pose les bases pour tout le monde, puis chaque groupe avance à son rythme avec un formateur qui passe de table en table. Les personnes qui utilisent déjà ChatGPT ou Claude ne s'ennuient pas : elles découvrent en général qu'elles s'en servaient comme d'un moteur de recherche, et la journée leur fait construire quelque chose de plus solide.",
    },
    {
      question: 'Que construit une équipe en une journée, concrètement ?',
      answer:
        "Des outils modestes et utiles : un assistant qui rédige les réponses aux demandes récurrentes dans le ton de l'entreprise, un modèle qui transforme les notes d'une réunion en compte rendu structuré, une aide à la préparation d'offres à partir des anciennes, un relecteur qui vérifie qu'un document respecte la charte maison. Rien de spectaculaire. Des choses qui font gagner une heure par semaine à quelqu'un, et qui tournent dès le lendemain.",
    },
    {
      question: 'Sur quel outil travaille-t-on ?',
      answer:
        "Sur celui que l'entreprise utilise déjà ou compte déployer : Claude, ChatGPT ou Copilot. Ce qui se construit dans la journée repose sur des mécanismes communs aux trois (instructions, contexte, exemples, espaces de travail partagés), donc le choix de l'outil ne change pas la méthode. Il se tranche au cadrage.",
    },
    {
      question: 'Et la confidentialité de nos données ?',
      answer:
        "Elle se règle avant la journée, pas pendant. Au cadrage, on fixe ensemble ce qui peut entrer dans l'outil et ce qui n'y entre pas, on vérifie les réglages de l'abonnement de l'entreprise, et on choisit les cas de travail en conséquence. Les équipes travaillent sur des documents réels, mais pas sur n'importe lesquels.",
    },
    {
      question: 'Quelle taille d\'équipe et quel format ?',
      answer:
        "De cinq à une trentaine de personnes, réparties en groupes de trois ou quatre. Le format va de la demi-journée au séjour de deux jours : une demi-journée suffit pour une petite équipe qui veut un premier outil, une journée entière est le format qui marche le mieux, deux jours permettent d'aller jusqu'à l'automatisation. Le lieu est en Suisse romande, on s'occupe de l'organisation avec nos partenaires.",
    },
  ],
  content: `Chaque année, la même séquence. On bloque une journée dans les agendas, on trouve un lieu, on prévoit une activité, on mange bien, tout le monde rentre content. Trois semaines plus tard, il reste des photos sur le groupe WhatsApp et une bonne anecdote.

Ce n'est pas un reproche fait au team building. Ça fonctionne, sur le moment, et sortir des murs ensemble a une vraie valeur. Le problème est ailleurs : on demande à cette journée de produire un effet qui ne survit pas au retour au bureau, parce que rien de ce qui s'y est passé n'a de prolongement dans le travail du lendemain.

## Et si la journée d'équipe produisait quelque chose

Notre proposition tient en une phrase. On garde tout ce qui marche dans une journée d'équipe, le fait de sortir, le lieu, la table, le temps passé ensemble autrement. Et on remplace l'activité par une tâche commune qui laisse une trace : construire, en équipe, des outils d'intelligence artificielle pour son propre service.

Pas une démonstration. Pas une conférence sur l'IA avec des slides et un buffet à midi. Les équipes se répartissent en petits groupes, chaque groupe prend une tâche qui lui coûte du temps chaque semaine, et repart avec quelque chose qui fonctionne. En fin de journée, chacun présente aux autres ce qu'il a construit.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,107,0,0.18);background:rgba(255,107,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.2rem">Ce qui change, ce qui ne change pas</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem">
<div style="padding:1.2rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)">
<div style="font-size:0.72rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.8rem">Journée d'équipe classique</div>
<div style="font-size:0.85rem;color:#e4e4e7;line-height:1.7">Une case dans l'agenda<br>Un lieu hors des murs<br>Une table, un repas<br>Une activité de cohésion<br><span style="color:#71717a">Ce qu'il reste : des photos, une anecdote</span></div>
</div>
<div style="padding:1.2rem;border-radius:12px;border:1px solid rgba(255,140,0,0.4);background:rgba(255,107,0,0.08)">
<div style="font-size:0.72rem;font-weight:700;color:#FF8C00;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.8rem">Journée outils IA</div>
<div style="font-size:0.85rem;color:#e4e4e7;line-height:1.7">La même case dans l'agenda<br>Le même lieu hors des murs<br>La même table, le même repas<br><strong style="color:#FF8C00">Une tâche commune : construire ses outils</strong><br><span style="color:#FF8C00">Ce qu'il reste : des outils qui tournent, un pack métier, une liste de choses qu'on ne refait plus à la main</span></div>
</div>
</div>
</div>

## Pourquoi l'IA se prête bien à cet exercice

Parce que le niveau de départ est le même pour tout le monde. Sur ce sujet, il n'y a pas dans l'équipe celui qui sait et celle qui subit. La hiérarchie se neutralise : le stagiaire trouve une idée que le directeur n'avait pas eue, et c'est visible par tous. Peu d'activités de cohésion produisent ça naturellement.

Parce que le résultat est visible dans l'heure. On voit l'outil marcher, ou ne pas marcher, et on recommence. Cette boucle courte est ce qui rend l'exercice prenant, et ce qui ressemble le plus à un jeu sans jamais en être un.

Parce que ça se construit à plusieurs. Une personne connaît le processus métier, une autre formule, une troisième teste et trouve ce qui casse. C'est exactement la répartition qu'on cherche à provoquer dans un exercice de cohésion, sauf qu'ici elle porte sur le travail réel.

Et parce que les questions qu'on n'ose pas poser au bureau se posent dans un chalet. Le « je n'ai jamais vraiment compris à quoi ça sert » sort après le café, pas en salle de réunion devant tout le comité.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,107,0,0.18);background:rgba(255,107,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.2rem">Quatre raisons qui tiennent à la nature du sujet</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.9rem">
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:1.4rem;font-weight:700;color:#FF8C00;margin-bottom:0.4rem">01</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Même point de départ</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Personne ne sait vraiment, donc la hiérarchie se neutralise</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:1.4rem;font-weight:700;color:#FF8C00;margin-bottom:0.4rem">02</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Résultat dans l'heure</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">L'outil marche ou ne marche pas, on voit, on recommence</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:1.4rem;font-weight:700;color:#FF8C00;margin-bottom:0.4rem">03</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Ça se construit à plusieurs</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Le métier, la formulation, le test : trois rôles qui se répartissent seuls</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:1.4rem;font-weight:700;color:#FF8C00;margin-bottom:0.4rem">04</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Les vraies questions sortent</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Après le café, loin du comité, on ose dire qu'on n'a pas compris</div></div>
</div>
</div>

## Pourquoi ça fonctionne mieux hors des murs

Une formation dans les locaux de l'entreprise se fait dévorer par l'entreprise. Les gens sortent prendre un appel, une réunion coupe l'après-midi, les notifications tournent en arrière-plan. L'apprentissage de l'IA demande du temps d'essai et d'erreur. C'est précisément ce qui ne supporte pas d'être interrompu.

Un lieu en dehors règle ce problème sans avoir à l'interdire. Et il change autre chose : on n'est plus en formation, on est en séminaire. Le mot n'est pas anodin pour les gens qui redoutent d'être mis en difficulté devant leurs collègues.

C'est aussi ce qui distingue cette journée d'une [formation IA en entreprise](/formation-entreprise/ia) classique. Le contenu de fond est proche, la mécanique est différente : là où une formation avance sur un programme, la journée avance sur ce que chaque groupe a décidé de construire.

## À quoi ressemble la journée

Le déroulé ci-dessous est celui d'une journée entière. Il se compresse en demi-journée pour une petite équipe qui veut un premier outil, et s'étire sur deux jours quand on veut aller jusqu'à l'automatisation.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,107,0,0.18);background:rgba(255,107,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.2rem">Déroulé d'une journée type</div>
<div style="display:flex;flex-direction:column;gap:0.6rem">
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.8rem;font-weight:700;color:#FF8C00">9h00</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">Arrivée, café, cadre</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">Ce qu'on va construire, ce qu'on ne mettra pas dans l'outil, et pourquoi personne n'est en retard sur le sujet</div></div></div>
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.8rem;font-weight:700;color:#FF8C00">9h30</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">Les bases, tous ensemble</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">Comment l'outil raisonne, ce qu'il fait bien, ce qu'il rate, comment lui donner du contexte. Une heure et demie, avec les mains sur le clavier</div></div></div>
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.8rem;font-weight:700;color:#FF8C00">11h00</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">Chaque groupe choisit sa tâche</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">Une tâche qui coûte du temps chaque semaine, réaliste pour l'après-midi. Le formateur aide à trancher</div></div></div>
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.8rem;font-weight:700;color:#9CA3AF">12h30</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">La table</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">On garde ce qui fait la journée d'équipe</div></div></div>
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,140,0,0.4);background:rgba(255,107,0,0.08)"><div style="font-size:0.8rem;font-weight:700;color:#FF8C00">14h00</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">Construction</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">Chaque groupe construit son outil sur ses documents réels. Essai, erreur, correction. Le formateur passe de table en table</div></div></div>
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.8rem;font-weight:700;color:#FF8C00">16h30</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">Présentations</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">Chaque groupe montre son outil aux autres, en cinq minutes, sur un cas réel</div></div></div>
<div style="display:grid;grid-template-columns:72px 1fr;gap:1rem;align-items:start;padding:0.9rem 1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.8rem;font-weight:700;color:#FF8C00">17h15</div><div><div style="font-size:0.88rem;color:#e4e4e7;font-weight:600">Ce qu'on emporte</div><div style="font-size:0.78rem;color:#9CA3AF;margin-top:0.25rem;line-height:1.45">Les outils, le pack participant adapté au métier, et la liste de ce que l'équipe ne refera plus à la main</div></div></div>
</div>
</div>

___IMG:team-building-ia-presentation-outils-fin-de-journee.webp___

## Ce que les équipes construisent, concrètement

Le mot « outil » peut faire peur. Il ne s'agit pas de développer un logiciel. Il s'agit de configurer un assistant, dans l'outil que l'entreprise utilise déjà (Claude, ChatGPT ou Copilot), pour qu'il fasse bien une tâche précise, dans le ton et avec les règles de la maison. Ce qu'un groupe de trois personnes construit en un après-midi ressemble à ça :

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,107,0,0.18);background:rgba(255,107,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.2rem">Exemples d'outils construits en un après-midi</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0.9rem">
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">Service client, administration</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Réponses aux demandes récurrentes</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">L'assistant connaît les dix questions qui reviennent, le ton de l'entreprise et ce qu'il ne doit jamais promettre</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">Direction, chefs de projet</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Des notes de réunion au compte rendu</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Le modèle de PV de la maison, les décisions séparées des discussions, les actions avec un responsable</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">Vente</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Préparation d'offres</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">À partir des anciennes offres, un premier jet structuré qu'on corrige au lieu de partir d'une page blanche</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">Communication, RH</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Relecteur de charte</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Un document entre, il ressort avec ce qui s'écarte du ton, du vocabulaire ou des mentions obligatoires</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">Finance, achats</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Tri et préparation des pièces</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Lecture de factures, extraction des données utiles, préparation pour la fiduciaire, qui garde la main</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">Tout service</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">La base de connaissances du service</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.45">Les procédures, les cas particuliers et les réponses maison, interrogeables par tout le monde, nouveau collègue compris</div></div>
</div>
</div>

Aucun de ces outils n'est spectaculaire. Chacun fait gagner une heure par semaine à quelqu'un, et c'est ce qui compte : une heure par semaine par personne, sur une équipe de quinze, c'est la journée qui se rembourse avant la fin du mois. Les groupes qui veulent aller plus loin, vers de vraies [automatisations connectées aux outils de l'entreprise](/blog/automatiser-taches-repetitives-ia-pme), le font en phase 2 : ce n'est pas l'objet de la journée, mais la journée sert à repérer où ça vaut la peine.

## Ce qu'il reste le lundi matin

Les outils construits pendant la journée, qui tournent et qui appartiennent à l'entreprise. Le pack remis aux participants, adapté à leur métier. Et une liste de choses que l'équipe ne refera plus à la main.

C'est la seule différence réelle avec une journée d'équipe classique, mais elle change la nature de la dépense. On ne finance plus un moment, on finance un moment et ce qu'il produit.

___IMG:team-building-ia-effet-dans-le-temps-classique-vs-outils.webp___

Il y a un effet moins visible, qui compte autant. Les outils ont été construits par les gens qui les utilisent, pas livrés par un prestataire. Quand l'un d'eux déraille, quelqu'un dans l'équipe sait pourquoi et sait le corriger. C'est ce qui fait la différence entre un outil qu'on garde et un outil qu'on abandonne au premier accroc, et c'est la raison pour laquelle nous ne construisons jamais les outils à la place des participants. Le [retour sur investissement d'une formation IA](/blog/formation-ia-collaborateurs-roi) se joue là, dans ce que les gens continuent d'utiliser sans nous.

## Comment ça s'organise

En Suisse romande, dans un chalet ou un autre lieu qui sorte du cadre habituel. Nous nous occupons de l'organisation avec nos partenaires : le lieu, la table, l'intendance. De votre côté, il s'agit de bloquer la date et de venir.

Le format s'ajuste à la taille de l'équipe et au temps disponible, de la demi-journée au séjour de deux jours. Le contenu, lui, se construit sur vos cas réels, pas sur des exemples génériques. C'est ce qui fait qu'une équipe repart avec des outils utilisables plutôt qu'avec des idées.

Deux points se règlent au cadrage, avant la journée. Le premier est l'outil : Claude, ChatGPT ou Copilot, selon ce que l'entreprise utilise déjà ou compte déployer. Le second est la confidentialité : ce qui peut entrer dans l'outil, ce qui n'y entre pas, et les réglages de l'abonnement de l'entreprise à vérifier. Les équipes travaillent sur des documents réels, mais pas sur n'importe lesquels.

## Le vrai arbitrage

Même case dans l'agenda. Même journée passée ensemble. Budget comparable à celui d'une journée d'équipe organisée dans les règles.

La question n'est donc pas de savoir s'il faut faire un team building cette année. C'est de savoir ce que vous voulez qu'il en reste en février.

Nous proposons un [cadrage de 30 minutes](/contact), sans engagement, pour définir le format et regarder ce que votre équipe aurait intérêt à construire ce jour-là.

## Questions fréquentes

### Faut-il déjà connaître l'IA pour participer ?

Non, et c'est même ce qui rend l'exercice égalitaire. La matinée pose les bases pour tout le monde, puis chaque groupe avance à son rythme avec un formateur qui passe de table en table. Les personnes qui utilisent déjà ChatGPT ou Claude ne s'ennuient pas : elles découvrent en général qu'elles s'en servaient comme d'un moteur de recherche, et la journée leur fait construire quelque chose de plus solide.

### Que construit une équipe en une journée, concrètement ?

Des outils modestes et utiles : un assistant qui rédige les réponses aux demandes récurrentes dans le ton de l'entreprise, un modèle qui transforme les notes d'une réunion en compte rendu structuré, une aide à la préparation d'offres à partir des anciennes, un relecteur qui vérifie qu'un document respecte la charte maison. Rien de spectaculaire. Des choses qui font gagner une heure par semaine à quelqu'un, et qui tournent dès le lendemain.

### Sur quel outil travaille-t-on ?

Sur celui que l'entreprise utilise déjà ou compte déployer : Claude, ChatGPT ou Copilot. Ce qui se construit dans la journée repose sur des mécanismes communs aux trois (instructions, contexte, exemples, espaces de travail partagés), donc le choix de l'outil ne change pas la méthode. Il se tranche au cadrage.

### Et la confidentialité de nos données ?

Elle se règle avant la journée, pas pendant. Au cadrage, on fixe ensemble ce qui peut entrer dans l'outil et ce qui n'y entre pas, on vérifie les réglages de l'abonnement de l'entreprise, et on choisit les cas de travail en conséquence. Les équipes travaillent sur des documents réels, mais pas sur n'importe lesquels.

### Quelle taille d'équipe et quel format ?

De cinq à une trentaine de personnes, réparties en groupes de trois ou quatre. Le format va de la demi-journée au séjour de deux jours : une demi-journée suffit pour une petite équipe qui veut un premier outil, une journée entière est le format qui marche le mieux, deux jours permettent d'aller jusqu'à l'automatisation. Le lieu est en Suisse romande, on s'occupe de l'organisation avec nos partenaires.

## Ce qu'il faut retenir

Un team building fonctionne sur le moment et ne laisse rien derrière lui, parce que rien de ce qui s'y passe n'a de prolongement dans le travail. En gardant le lieu, la table et le temps passé ensemble, mais en remplaçant l'activité par la construction d'outils IA pour son propre service, la journée garde tout ce qui fait sa valeur de cohésion et produit en plus quelque chose qui tourne le lundi matin. L'IA s'y prête parce que tout le monde part du même point, que le résultat se voit dans l'heure et que ça se construit à plusieurs. Hors des murs, parce que l'essai et l'erreur ne supportent pas d'être interrompus. Et ce qu'il reste, ce sont des outils construits par ceux qui les utilisent, donc des outils qu'on garde.`,
}

export default article
