import type { Article } from './types'

const article: Article = {
  slug: 'chatbot-ia-pme-guide-2026',
  category: 'ia',
  title: "Chatbot IA pour PME : comment ça marche, et pour qui ça a vraiment du sens",
  excerpt:
    "\"Chatbot IA\", tout le monde en parle, peu savent ce que ça veut dire concrètement pour une PME. Ce guide explique comment fonctionne un chatbot grounded (entraîné uniquement sur le contenu de l'entreprise), pour qui ça a vraiment du sens, quand une simple FAQ suffit, et ce que ça coûte réellement à Genève en 2026.",
  date: '7 septembre 2026',
  dateISO: '2026-09-07',
  readTime: '8 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/chatbot-ia-pme-widget-conversation.png',
    alt: "Chatbot IA pour PME à Genève 2026 : widget de conversation intégré sur le site web d'une entreprise, vu depuis un poste de travail",
  },
  images: [
    {
      src: '/images/blog/chatbot-ia-pme-grounded-vs-generique.png',
      alt: "Chatbot IA grounded pour PME : comparaison entre un chatbot générique qui invente des réponses et un chatbot grounded DKDP qui répond uniquement depuis le contenu de l'entreprise, Genève 2026",
      caption: "Un chatbot générique invente, un chatbot grounded répond depuis le contenu réel de l'entreprise, ou redirige vers un humain.",
    },
  ],
  tags: ['chatbot IA', 'PME', 'Genève', 'IA grounded', 'expérience client', 'automatisation'],
  seoTitle: 'Chatbot IA pour PME à Genève en 2026 : le guide complet',
  seoDescription:
    "Chatbot IA pour PME : comment ça fonctionne réellement, quand ça a du sens (et quand non), combien ça coûte. Guide concret avec cas réel, pour les entreprises de Genève.",
  content: `## Le malentendu sur "chatbot IA"

Dès qu'on prononce "chatbot IA", la plupart des dirigeants imaginent la même chose : une fenêtre de discussion qui branche un assistant généraliste type ChatGPT sur leur site, capable de répondre à peu près à tout. C'est exactement le produit qu'il ne faut pas installer sur un site d'entreprise.

Un modèle de langage généraliste ne connaît ni votre catalogue, ni vos prix, ni vos délais, ni vos exceptions. Posez-lui une question précise sur votre offre et il improvise une réponse plausible, parfois fausse, toujours engageante pour votre entreprise si un visiteur s'y fie. Pour un usage personnel, l'erreur est sans conséquence. Sur le site d'une PME qui reçoit des demandes de devis, c'est un risque commercial, parfois même juridique.

Un chatbot IA bien construit n'est pas ce produit-là. C'est un assistant entraîné exclusivement sur le contenu de l'entreprise qui l'installe, qui répond dans les limites de ce qu'on lui a réellement appris, et qui dit "je ne sais pas" plutôt que d'inventer.

## Le principe qui change tout : le "grounded only"

"Grounded" veut dire ancré. L'agent ne parle que de ce qui existe dans sa base de connaissances, construite à partir des pages du site, des PDF (fiches produits, conditions générales, brochures) et de la FAQ déjà existante. Rien d'autre n'entre dans son périmètre de réponse, et surtout aucune connaissance générale piochée ailleurs sur internet.

Si un visiteur pose une question hors sujet, ou une question dont la réponse n'est écrite nulle part sur le site, l'agent le dit et redirige vers un formulaire, un email ou un numéro de téléphone. Il ne comble jamais le vide par une réponse inventée, même plausible.

___IMG:chatbot-ia-pme-grounded-vs-generique.png___

La différence se voit surtout dans la durée. Un chatbot généraliste impressionne à la démonstration puis génère des malentendus au premier cas limite. Un chatbot grounded est moins spectaculaire au premier essai, il refuse plus souvent de répondre, mais il ne raconte jamais à un client autre chose que ce que l'entreprise propose réellement.

## Comment on le construit, concrètement

Trois étapes suffisent à construire un chatbot grounded, et elles se retrouvent toutes dans le résultat final.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.15);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.5rem">COMMENT ON CONSTRUIT UN CHATBOT GROUNDED</div>
<div style="display:flex;flex-direction:column;gap:1rem">
<div style="display:flex;gap:1rem;align-items:flex-start;padding:1.25rem;border-radius:12px;background:rgba(212,212,216,0.05);border:1px solid rgba(212,212,216,0.14)">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(212,212,216,0.14);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#D4D4D8">1</div>
<div>
<div style="font-size:0.85rem;font-weight:700;color:#ffffff;margin-bottom:0.35rem">On indexe le contenu existant, rien d'autre</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.6">Un crawler parcourt les pages du site, les PDF et la FAQ existante. Aucune information externe n'entre dans la base de connaissances.</div>
</div>
</div>
<div style="display:flex;gap:1rem;align-items:flex-start;padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.14)">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(167,139,250,0.16);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#A78BFA">2</div>
<div>
<div style="font-size:0.85rem;font-weight:700;color:#ffffff;margin-bottom:0.35rem">On écrit un system prompt sur mesure</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.6">Des règles explicites : ce que l'agent peut affirmer, ce qu'il doit reformuler, et surtout ce qu'il redirige vers un humain.</div>
</div>
</div>
<div style="display:flex;gap:1rem;align-items:flex-start;padding:1.25rem;border-radius:12px;background:rgba(255,140,0,0.05);border:1px solid rgba(255,140,0,0.14)">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(255,140,0,0.16);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#FF8C00">3</div>
<div>
<div style="font-size:0.85rem;font-weight:700;color:#ffffff;margin-bottom:0.35rem">On intègre le widget et on surveille</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.6">Quelques lignes de code sur le site, un tableau de bord des conversations, et un créneau mensuel pour ajuster le périmètre.</div>
</div>
</div>
</div>
</div>

Le tout tient dans un widget web léger, qui s'installe en quelques lignes de code quel que soit le système utilisé pour le site : WordPress, Webflow, Next.js ou Astro. Aucune refonte n'est nécessaire pour l'accueillir. Compter 2 semaines entre l'atelier de cadrage et la mise en ligne pour un périmètre de questions fréquentes, 4 à 5 semaines si le chatbot doit être connecté à vos outils métier.

## Pour qui ça a vraiment du sens

Un chatbot IA grounded devient rentable dans des situations précises, pas systématiquement.

| Un chatbot IA a du sens quand... | Une FAQ statique suffit quand... |
|---|---|
| Le catalogue croise plusieurs familles de produits ou services et plusieurs profils de clients | Le site présente une activité simple, sur moins d'une dizaine de pages |
| Une personne passe plusieurs heures par semaine à répondre aux mêmes questions par email ou téléphone | Les questions fréquentes tiennent sur un seul écran, sans branchement complexe |
| L'objectif est de filtrer les demandes avant un premier appel ou rendez-vous | Le volume de contact est faible et chaque demande mérite d'emblée une réponse personnalisée |

L'exemple le plus concret chez DKDP est Solid Solutions en Identification, spécialiste genevois de l'identification et du contrôle d'accès. Leur catalogue croise 7 familles de solutions et 5 secteurs d'activité différents, un nombre de combinaisons qu'une page de texte ou un menu déroulant explique mal. Depuis la mise en ligne de l'agent en avril 2026, un visiteur identifie en 2 ou 3 échanges la solution pertinente pour son secteur, là où l'ancien parcours demandait de tout lire pour deviner ce qui s'appliquait à son cas.

Si votre catalogue ressemble à ça, le sujet mérite au moins une discussion de 15 minutes, gratuite et sans engagement.

## Quand c'est clairement too much

L'inverse est tout aussi vrai, et le dire franchement fait partie du métier. En dessous d'une dizaine de pages, une FAQ statique bien écrite répond à la majorité des questions sans coût récurrent ni maintenance d'une base de connaissances. Ajouter un chatbot IA dans ce cas revient à motoriser un vélo pour descendre une rue plate.

Deux autres signaux doivent alerter avant de se lancer. Si on vous propose un agent "qui peut tout faire", méfiez-vous : un agent grounded, par construction, refuse plus qu'il n'improvise, c'est précisément ce qui en fait la qualité. Et si personne dans l'entreprise n'a le temps de mettre à jour le contenu source (nouveaux tarifs, nouveau catalogue, nouveaux horaires), l'agent continuera de répondre avec les anciennes informations sans le signaler. Ce n'est pas un bug, c'est la conséquence directe du principe grounded : il ne sait que ce qu'on lui a montré, à la date où on le lui a montré.

Un doute sur votre propre cas ? Mieux vaut le dire franchement en 15 minutes plutôt que de payer pour un outil surdimensionné.

## Chatbot IA ou agent IA : ce n'est pas le même outil

Un chatbot IA grounded répond à des questions et qualifie une demande. Un agent IA va plus loin : il exécute des actions dans les outils métier (CRM, agenda, emails) de façon autonome, sans intervention humaine à chaque étape. Si le besoin est de faire répondre le site aux visiteurs, la réponse est ici. Si le besoin est d'automatiser des tâches dans les systèmes internes, la page [agents IA](/intelligence-artificielle/agents-ia) est le bon point de départ, et [cet article détaille la différence](/blog/agents-ia-sur-mesure-cas-usage-2026) avec trois cas d'usage concrets.

## Combien ça coûte pour une PME à Genève

Le montant dépend de trois facteurs : le nombre de pages et de documents à indexer, la nécessité ou non de connecter le chatbot à un CRM pour capter des leads qualifiés, et le nombre de langues à couvrir (chaque langue supplémentaire ajoute sa propre base de connaissances).

Deux repères concrets. Un chatbot Essentiel, qui répond aux questions fréquentes à partir du contenu du site, démarre à CHF 2'900 et se déploie en 2 semaines. Les formules connectées à vos outils métier (CRM type HubSpot ou Pipedrive, agenda, ERP type Bexio) se situent entre CHF 5'500 et CHF 12'000, avec 4 à 5 semaines de déploiement, le temps de brancher et de tester chaque intégration. La maintenance mensuelle démarre à CHF 250. Le détail par formule est sur notre page [chatbot IA](/intelligence-artificielle/chatbot-ia#offres).

Un point mérite d'être clarifié d'emblée : le tarif mensuel ne couvre pas un coût brut d'intelligence artificielle qui resterait à la charge du client au-delà d'un certain volume. Une limite de débit est posée dès le départ pour éviter toute facture surprise. Le montant mensuel couvre la maintenance, le monitoring des conversations et les ajustements de périmètre, pas la consommation du modèle.

## La meilleure démo, c'est la nôtre

Le chatbot que vous pouvez ouvrir sur ce site est construit exactement sur ce principe. Il connaît les pages de service, les tarifs, les articles de blog, rien d'autre. Demandez-lui quelque chose qui sort de ce périmètre, il vous le dira et vous renverra vers le formulaire de contact plutôt que d'inventer une réponse. C'est la meilleure démonstration possible, parce que c'est celle que nous utilisons nous-mêmes tous les jours.

## Ce qu'il faut retenir

Un chatbot IA n'est pas un gadget à poser sur n'importe quel site pour paraître à jour. C'est un outil qui a du sens quand le contenu est trop riche pour qu'un visiteur le parcoure seul, et qui n'en a pas quand une page bien écrite suffirait. Entre les deux, la question à se poser n'est pas "est-ce que l'IA peut le faire", mais "est-ce que ça vaut la peine de la construire et de la maintenir, vu le volume de visiteurs et la complexité réelle de l'offre".

En cas de doute, le plus simple est d'en discuter 15 minutes, gratuitement et sans engagement : nous vous dirons franchement si un chatbot IA grounded a du sens pour votre site, ou si une FAQ bien pensée suffira. [Contactez-nous](/contact) pour en parler.

## Questions fréquentes

**Qu'est-ce qu'un chatbot IA "grounded" ?**
Un chatbot grounded est un assistant IA entraîné exclusivement sur le contenu propre à une entreprise (ses pages web, ses PDF, sa FAQ). Contrairement à un assistant généraliste connecté à un site, il n'invente jamais de réponse hors de ce périmètre : si la question sort de ce qu'il a appris, il le dit et redirige vers un formulaire, un email ou un numéro de téléphone.

**Pour quel type d'entreprise un chatbot IA a-t-il vraiment du sens ?**
Un chatbot IA devient rentable quand le catalogue de produits ou services est complexe à expliquer, quand un volume important de questions récurrentes occupe déjà du temps humain par email ou téléphone, ou quand l'objectif est de qualifier une demande avant un premier rendez-vous. Solid Solutions en Identification, avec 7 familles de solutions croisées à 5 secteurs d'activité, en est un exemple concret chez DKDP.

**Mon site fait moins de 10 pages, un chatbot IA a-t-il un intérêt ?**
Rarement. En dessous d'une dizaine de pages, une FAQ statique bien rédigée répond à la majorité des questions sans coût récurrent ni maintenance de base de connaissances. Un chatbot IA devient pertinent quand le contenu est trop volumineux ou trop ramifié pour qu'un visiteur le parcoure seul, pas pour remplacer une page qui tient déjà l'information en un coup d'œil.

**Combien coûte un chatbot IA pour une PME à Genève ?**
Le montant dépend du nombre de pages à indexer, du périmètre de réponses et du besoin ou non de connecter le chatbot à vos outils métier. Un chatbot Essentiel, qui répond aux questions fréquentes à partir du contenu du site, démarre à CHF 2'900 et se déploie en 2 semaines. Les formules connectées à un CRM, un agenda ou un ERP se situent entre CHF 5'500 et CHF 12'000, pour 4 à 5 semaines de déploiement. La maintenance mensuelle démarre à CHF 250 et couvre le monitoring des conversations et les ajustements de périmètre.`,
  faq: [
    {
      question: 'Qu\'est-ce qu\'un chatbot IA "grounded" ?',
      answer:
        "Un chatbot grounded est un assistant IA entraîné exclusivement sur le contenu propre à une entreprise (ses pages web, ses PDF, sa FAQ). Contrairement à un assistant généraliste connecté à un site, il n'invente jamais de réponse hors de ce périmètre : si la question sort de ce qu'il a appris, il le dit et redirige vers un formulaire, un email ou un numéro de téléphone.",
    },
    {
      question: 'Pour quel type d\'entreprise un chatbot IA a-t-il vraiment du sens ?',
      answer:
        "Un chatbot IA devient rentable quand le catalogue de produits ou services est complexe à expliquer, quand un volume important de questions récurrentes occupe déjà du temps humain par email ou téléphone, ou quand l'objectif est de qualifier une demande avant un premier rendez-vous. Solid Solutions en Identification, avec 7 familles de solutions croisées à 5 secteurs d'activité, en est un exemple concret chez DKDP.",
    },
    {
      question: 'Mon site fait moins de 10 pages, un chatbot IA a-t-il un intérêt ?',
      answer:
        "Rarement. En dessous d'une dizaine de pages, une FAQ statique bien rédigée répond à la majorité des questions sans coût récurrent ni maintenance de base de connaissances. Un chatbot IA devient pertinent quand le contenu est trop volumineux ou trop ramifié pour qu'un visiteur le parcoure seul, pas pour remplacer une page qui tient déjà l'information en un coup d'œil.",
    },
    {
      question: 'Combien coûte un chatbot IA pour une PME à Genève ?',
      answer:
        "Le montant dépend du nombre de pages à indexer, du périmètre de réponses et du besoin ou non de connecter le chatbot à vos outils métier. Un chatbot Essentiel, qui répond aux questions fréquentes à partir du contenu du site, démarre à CHF 2'900 et se déploie en 2 semaines. Les formules connectées à un CRM, un agenda ou un ERP se situent entre CHF 5'500 et CHF 12'000, pour 4 à 5 semaines de déploiement. La maintenance mensuelle démarre à CHF 250 et couvre le monitoring des conversations et les ajustements de périmètre.",
    },
  ],
}

export default article
