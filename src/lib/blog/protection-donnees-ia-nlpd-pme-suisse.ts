import type { Article } from './types'

const article: Article = {
  slug: 'protection-donnees-ia-nlpd-pme-suisse',
  category: 'ia',
  title: "Protection des données et IA en Suisse : ce qu'une PME doit savoir avant de déployer ChatGPT ou Claude",
  excerpt:
    "La nLPD encadre les données personnelles en entreprise depuis 2023, et l'IA générative remet cette question sur la table de toutes les PME. Ce que change vraiment un compte Entreprise, où vont vos données, et une checklist pour cette semaine.",
  date: '7 septembre 2026',
  dateISO: '2026-09-07',
  readTime: '10 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/protection-donnees-ia-nlpd-suisse-entreprise.png',
    alt: 'Protection des données IA en Suisse 2026 : gouvernance et flux de données maîtrisés avant déploiement en entreprise',
  },
  images: [
    {
      src: '/images/blog/hebergement-donnees-ia-suisse-residence-entreprise.png',
      alt: 'Hébergement des données IA en Suisse : schéma de flux entre traitement documenté et non maîtrisé pour une PME',
      caption:
        "Où vont vos données une fois entrées dans l'outil ? La question à poser avant de choisir un fournisseur IA, pas après.",
    },
  ],
  tags: ['nLPD', 'Protection des données', 'RGPD', 'IA', 'PME', 'Claude', 'ChatGPT', 'Genève'],
  seoTitle: 'nLPD et IA en entreprise : le guide PME · DKDP',
  seoDescription:
    "La nLPD encadre l'usage de l'IA en entreprise depuis 2023. Ce qui change avec ChatGPT ou Claude en version Entreprise, où vont vos données, et une checklist pour PME suisses.",
  content: `## Une question qui revient dans nos échanges avec les PME

Chez DKDP, cette question ne vient presque jamais du service juridique. Elle vient d'une comptable qui a collé un bilan client dans ChatGPT pour le reformuler, d'une responsable RH qui a fait relire une lettre sensible par Claude, ou d'une chargée de projet associatif qui a résumé un dossier de bénéficiaire avec l'IA du bureau. Dans nos échanges avec des clients de la finance, du secteur juridique élargi, de la santé ou du monde associatif, la même interrogation revient : qu'est-ce qui se passe réellement avec ces données une fois tapées dans une fenêtre de chat ?

Une précision avant d'aller plus loin. DKDP est une agence digitale et de formation, pas un cabinet d'avocats. Ce qui suit est un éclairage pratique pour orienter vos décisions au quotidien, pas un avis juridique engageant. Pour trancher une situation précise, en particulier si vous traitez des données de santé, des données bancaires de tiers ou des dossiers de mineurs, un conseil juridique spécialisé reste nécessaire.

Cet article répond à une question posée en langage simple : que dit la nLPD, qu'est-ce que ça change concrètement d'utiliser ChatGPT ou Claude en version gratuite plutôt qu'en version Entreprise, et que peut faire une PME cette semaine sans tout bloquer ni tout ignorer.

## La nLPD en clair, et ce qui la distingue du RGPD

La nouvelle loi fédérale sur la protection des données (nLPD) est en vigueur depuis le 1er septembre 2023. Elle remplace l'ancienne loi de 1992 et s'inspire largement du RGPD européen, sans en être une copie. Voici ce qui compte de savoir sans se noyer dans le détail juridique.

**Le périmètre n'est pas identique.** La nLPD protège les données de personnes physiques en lien avec la Suisse, et uniquement les personnes physiques depuis 2023 (l'ancienne loi couvrait aussi les personnes morales). Concrètement, si votre PME traite des données de clients ou d'employés en Suisse, la nLPD s'applique, que votre outil IA soit hébergé à Genève ou à San Francisco.

**L'autorité de contrôle n'est pas la même, et elle n'a pas les mêmes pouvoirs.** En Suisse, c'est le Préposé fédéral à la protection des données et à la transparence (PFPDT) qui supervise l'application de la loi. Point souvent ignoré : le PFPDT enquête, recommande et rend des décisions contraignantes, mais il n'inflige pas d'amendes lui-même. S'il constate une infraction pénale, il transmet le dossier au ministère public, et ce sont les autorités pénales cantonales qui sanctionnent.

**Le régime de sanctions fonctionne différemment, et c'est le point le plus mal compris.** Le RGPD peut infliger des amendes administratives directement à l'entreprise, jusqu'à 4 % de son chiffre d'affaires mondial. La nLPD prévoit plutôt des sanctions pénales, généralement engagées sur dénonciation, qui visent la personne physique responsable du traitement au sein de l'entreprise, souvent un dirigeant, avec des montants qui peuvent atteindre 250'000 CHF. Deux nuances comptent ici, et elles jouent en votre faveur : seule l'infraction intentionnelle est punissable, la négligence simple ne l'est pas, et c'est un juge pénal cantonal qui tranche, pas une autorité administrative qui envoie une facture. Ce n'est donc pas "l'entreprise risque une amende" comme avec le RGPD, c'est plus personnel, une raison de plus pour qu'un dirigeant de PME s'y intéresse directement.

**Le droit à l'oubli existe, sous une forme plus étroite.** La nLPD donne aux personnes concernées un droit d'accès, de rectification, et dans certaines conditions un droit à la suppression de données inexactes ou disproportionnées. Ce n'est pas un droit à l'effacement aussi large et systématisé que celui popularisé par le RGPD. En pratique, la bonne question pour une PME n'est pas de comparer les textes ligne par ligne, mais de savoir répondre simplement le jour où quelqu'un demande ce qu'il advient de ses données, y compris celles passées par un outil IA.

## Le vrai enjeu avec l'IA : ce qui part dans la fenêtre de chat

Le scénario le plus courant : une personne de votre équipe a un compte ChatGPT ou Claude personnel, gratuit ou payant à titre individuel. Elle l'utilise pour aller plus vite : reformuler un email, résumer un contrat, préparer une note. Un jour, machinalement, elle y colle un extrait de bilan client, un dossier RH nominatif ou un compte-rendu médical. Ce n'est pas de la négligence, c'est devenu un réflexe de productivité, au même titre que copier-coller dans Word il y a quinze ans.

Le risque réel n'est pas celui qu'on imagine le plus souvent, un concurrent qui "récupérerait" vos données. Il est plus terre à terre : combien de temps ces données sont-elles conservées, sont-elles susceptibles d'entraîner de futurs modèles, qui chez le fournisseur peut techniquement y accéder dans le cadre d'une revue de sécurité, et votre entreprise a-t-elle seulement un contrat qui encadre tout ça. Sur un compte personnel, personne dans l'entreprise ne le sait, et aucun contrat ne s'applique.

Ce que change réellement un abonnement Équipe ou Entreprise, ce n'est pas la qualité des réponses de l'IA, c'est la gouvernance autour de son usage :

- **Sur les comptes gratuits ou personnels** (ChatGPT Free, Plus et Pro, Claude Free, Pro et Max), les réglages par défaut ont évolué ces dernières années, et pas dans le sens qu'on croit souvent. Chez OpenAI, les comptes personnels peuvent voir leurs échanges utilisés pour l'entraînement des modèles par défaut, sauf désactivation individuelle dans les réglages (Paramètres, Contrôles des données). Chez Anthropic, depuis une mise à jour de politique fin août 2025, les comptes personnels Claude ont ce même réglage activé par défaut, et l'écart de conservation est net : cinq ans si l'option reste active, contre trente jours si elle est désactivée. Rien de scandaleux, c'est un choix de politique de confidentialité assumé pour une offre grand public, mais c'est un défaut que la personne qui a collé le dossier client n'a probablement jamais vu ni discuté avec vous.
- **Même refuser l'entraînement ne couvre pas tout, et c'est nouveau.** Dans la politique de confidentialité d'Anthropic en vigueur depuis juillet 2026, une conversation signalée pour revue de sécurité peut être utilisée pour améliorer les modèles même si l'utilisateur a désactivé l'option. C'est une exception étroite et compréhensible du point de vue de la sécurité des modèles, mais elle a une conséquence pratique : sur un compte grand public, désactiver le réglage réduit le risque, il ne le supprime pas. C'est exactement le genre de nuance qui distingue un usage personnel toléré d'un usage d'entreprise gouverné.
- **Sur les comptes Équipe ou Entreprise** (ChatGPT Team/Business/Enterprise, Claude Team/Enterprise), les données ne servent pas à l'entraînement par défaut, un contrat encadre le traitement (le fameux DPA, data processing agreement), et l'entreprise dispose d'outils d'administration : contrôle des accès, journaux d'audit, gestion de la conservation des données. C'est un changement de nature, pas seulement un changement de prix.

La question qu'un dirigeant de PME devrait poser à son équipe n'est donc pas "a-t-on le droit d'utiliser l'IA", la réponse est presque toujours oui. La bonne question est : "sur quel compte, avec quels réglages, et qui le sait dans l'entreprise ?" C'est une question de gouvernance interne, pas une question d'interdiction.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1rem">CE QUI PART DANS UN PROMPT : OÙ ÇA DEVRAIT ALLER</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem">
<div style="padding:1.25rem;border-radius:12px;background:rgba(212,212,216,0.06);border:1px solid rgba(212,212,216,0.16)">
<div style="font-size:0.8rem;font-weight:700;color:#D4D4D8;margin-bottom:0.9rem">Compte grand public, non gouverné</div>
<div style="display:flex;flex-direction:column;gap:0.55rem">
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#D4D4D8;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Question générale ou brainstorming sans donnée identifiable</span></div>
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#D4D4D8;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Relecture d'un texte déjà destiné à être publié</span></div>
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#D4D4D8;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Apprentissage et exploration personnelle d'un outil</span></div>
</div>
</div>
<div style="padding:1.25rem;border-radius:12px;background:rgba(252,165,165,0.06);border:1px solid rgba(252,165,165,0.18)">
<div style="font-size:0.8rem;font-weight:700;color:#fca5a5;margin-bottom:0.9rem">À garder sur un compte gouverné (Équipe / Entreprise)</div>
<div style="display:flex;flex-direction:column;gap:0.55rem">
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#fca5a5;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Noms, coordonnées ou dossiers de clients identifiés</span></div>
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#fca5a5;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Données de santé ou données bancaires de tiers</span></div>
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#fca5a5;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Contrats, chiffres ou documents non publics</span></div>
<div style="display:flex;align-items:flex-start;gap:0.5rem"><span style="margin-top:0.45rem;width:5px;height:5px;border-radius:50%;background:#fca5a5;flex-shrink:0"></span><span style="font-size:0.82rem;color:#e4e4e7;line-height:1.5">Dossiers RH nominatifs : candidatures, évaluations, salaires</span></div>
</div>
</div>
</div>
</div>

## L'hébergement compte aussi : où vont vos données

Il y a une deuxième question, moins visible mais tout aussi réelle : une fois que la donnée quitte votre ordinateur, dans quel pays est-elle traitée et stockée ? Pour une PME qui vend des services locaux, la question peut sembler abstraite. Pour un cabinet qui manipule des dossiers de santé, un acteur financier ou une association qui suit des bénéficiaires vulnérables, elle ne l'est pas.

La nLPD encadre le transfert de données personnelles hors de Suisse : il reste possible, mais suppose que le pays de destination offre un niveau de protection jugé adéquat, ou que des garanties contractuelles spécifiques soient mises en place. C'est le Conseil fédéral qui tient la liste des pays considérés comme adéquats. Un exemple utile pour comprendre la mécanique : les États-Unis n'y figurent pas de façon générale, mais depuis septembre 2024, les entreprises américaines spécifiquement certifiées dans le cadre du Swiss-U.S. Data Privacy Framework y sont assimilées. Autrement dit, "mes données peuvent-elles aller aux États-Unis" n'a pas de réponse universelle, elle dépend du fournisseur précis et de sa certification, pas seulement de sa nationalité. Et la conséquence est très concrète : vers une entreprise américaine certifiée, le transfert se fait sans garantie supplémentaire ; vers une entreprise non certifiée, il faut toujours des clauses contractuelles types et une analyse d'impact du transfert. La liste des organisations certifiées est publique et consultable en ligne, ce qui rend la vérification rapide. C'est une nuance qui vaut la peine d'être vérifiée fournisseur par fournisseur, plutôt que d'être supposée réglée ou, à l'inverse, bloquante.

___IMG:hebergement-donnees-ia-suisse-residence-entreprise.png___

C'est une des raisons pour lesquelles, pour certains clients dont l'activité touche à des données sensibles, nous mettons en place des architectures IA hébergées en Suisse, ou au minimum des configurations où l'on documente précisément où circulent les données. Ce type de [mise en place](/intelligence-artificielle/mise-en-place) réduit une catégorie de risque réelle. Ce n'est pas pour autant un certificat de conformité : la conformité nLPD dépend de l'ensemble de vos traitements de données, pas seulement de l'endroit où vit le serveur. Méfiez-vous d'un prestataire qui promettrait l'inverse, c'est d'ailleurs l'un des [signaux à repérer avant de choisir un consultant IA](/blog/choisir-consultant-agence-ia-geneve).

## La checklist pratique : ce que vous pouvez faire cette semaine

Rien de ce qui précède ne justifie d'interdire l'IA générative dans votre entreprise, ni d'attendre un cadre juridique parfait qui n'existera jamais. Ce qui fait la différence, c'est de passer d'un usage individuel et invisible à un usage connu et cadré, même de façon minimale. Voici quatre actions réalistes pour une PME, sans consultant ni comité de pilotage.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.2);background:rgba(212,212,216,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1rem">CHECKLIST GOUVERNANCE IA : CETTE SEMAINE</div>
<div style="display:flex;flex-direction:column;gap:0.75rem">
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.85rem 1rem;background:rgba(124,58,237,0.05);border-radius:8px">
<div style="min-width:22px;height:22px;border-radius:6px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#A78BFA;flex-shrink:0;margin-top:0.1rem">1</div>
<div>
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7;margin-bottom:0.2rem">Savoir quel palier votre équipe utilise réellement</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.5">Compte personnel gratuit, compte payant à titre individuel, ou compte d'entreprise Équipe/Enterprise : ce sont trois régimes de données différents.</div>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.85rem 1rem;background:rgba(124,58,237,0.05);border-radius:8px">
<div style="min-width:22px;height:22px;border-radius:6px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#A78BFA;flex-shrink:0;margin-top:0.1rem">2</div>
<div>
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7;margin-bottom:0.2rem">Lister par écrit les catégories de données interdites en prompt</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.5">Données de santé, données bancaires de tiers, contrats non publics, dossiers RH nominatifs : une liste courte suffit pour commencer.</div>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.85rem 1rem;background:rgba(124,58,237,0.05);border-radius:8px">
<div style="min-width:22px;height:22px;border-radius:6px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#A78BFA;flex-shrink:0;margin-top:0.1rem">3</div>
<div>
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7;margin-bottom:0.2rem">Nommer une personne responsable du sujet</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.5">Pas forcément un poste dédié ni un DPO formel. Un point de contact clair, connu de l'équipe, suffit pour démarrer.</div>
</div>
</div>
<div style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.85rem 1rem;background:rgba(124,58,237,0.05);border-radius:8px">
<div style="min-width:22px;height:22px;border-radius:6px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#A78BFA;flex-shrink:0;margin-top:0.1rem">4</div>
<div>
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7;margin-bottom:0.2rem">Mettre ces règles par écrit, même sur une seule page</div>
<div style="font-size:0.78rem;color:#9CA3AF;line-height:1.5">Une note interne courte vaut mieux qu'une politique de 40 pages que personne ne lit. L'objectif est qu'elle existe et qu'elle soit connue.</div>
</div>
</div>
</div>
</div>

Aucune de ces quatre actions ne demande un budget conséquent ni plusieurs mois. La quatrième, mettre les règles par écrit, a probablement le plus d'effet pour le moins d'effort : elle transforme une pratique informelle en une règle que chacun peut invoquer, nouvelle recrue comprise.

## Conclusion : une question de gouvernance, pas d'interdiction

La nLPD n'a pas été écrite en pensant à ChatGPT ou à Claude, elle est plus large que ça. Mais elle s'applique pleinement au moment où votre équipe colle des données personnelles dans un outil IA, qu'il s'agisse d'un compte gratuit ou d'un abonnement Entreprise. La différence entre les deux n'est pas cosmétique : c'est la différence entre un usage individuel non documenté et un usage d'entreprise gouverné, avec un contrat, des contrôles d'accès, et une personne qui sait répondre si la question se pose.

C'est pour cette raison que notre [formation entreprise à l'IA](/formation-entreprise/ia) intègre un module dédié à la sécurité, la confidentialité et les limites des outils IA, aux côtés du prompting et des cas d'usage concrets. Ce n'est pas un module ajouté pour cocher une case, c'est une question qui revient systématiquement dans nos échanges clients.

Si vous voulez d'abord une photographie précise de vos usages actuels avant de décider quoi que ce soit, un [audit conseil IA](/intelligence-artificielle/audit-conseil) permet de partir de faits plutôt que de suppositions sur qui utilise quoi, où, et avec quelles données. Et si une question se pose sur votre situation particulière, [contactez-nous](/contact), nous répondons directement, sans jargon.

## Questions fréquentes

**La nLPD s'applique-t-elle si mon IA est hébergée à l'étranger ?**
Oui, dans la très grande majorité des cas. La nLPD s'applique en fonction des personnes dont vous traitez les données, des personnes en lien avec la Suisse, pas en fonction du lieu d'hébergement de l'outil utilisé. Le lieu d'hébergement du fournisseur ne change rien à votre obligation de traiter les données correctement. Cela ajoute en revanche une question supplémentaire, celle du transfert de données à l'étranger, qui suppose que le pays ou le fournisseur de destination offre des garanties reconnues comme adéquates. En cas de doute sur un fournisseur précis, mieux vaut vérifier sa documentation de confidentialité ou demander un avis spécialisé que de supposer que tout va bien.

**ChatGPT gratuit peut-il servir pour du travail confidentiel ?**
Nous le déconseillons pour toute donnée que vous ne voudriez pas voir sortir de l'entreprise : données de clients identifiés, dossiers RH nominatifs, informations financières non publiques, données de santé. Les comptes gratuits et personnels payants, chez OpenAI comme chez Anthropic, restent des outils individuels, avec des réglages contrôlés par la personne utilisatrice, sans visibilité ni contrat au niveau de l'entreprise. Pour du travail réellement confidentiel, un abonnement Équipe ou Entreprise change la donne : pas d'entraînement sur vos données par défaut, et un contrat qui encadre le traitement. Pour un usage ponctuel et non sensible, reformuler un texte déjà public ou faire un brainstorming général, un compte grand public reste raisonnable.

**Qu'est-ce qui change avec un abonnement Enterprise ?**
Trois choses concrètes. D'abord la donnée : sur les offres Entreprise de ChatGPT comme de Claude, vos échanges ne servent pas à entraîner de futurs modèles par défaut, contrairement aux comptes grand public. Ensuite le contrat : l'entreprise dispose d'un accord qui encadre le traitement des données, ce qu'un compte personnel n'a jamais. Enfin la gouvernance : contrôle des accès par utilisateur, journaux d'audit, gestion centralisée de la conservation des données, et souvent des options de résidence des données. Ce n'est pas seulement plus cher, c'est un régime différent, pensé pour qu'une entreprise sache répondre si la question se pose.

**Que risque une PME en cas de manquement ?**
C'est ici qu'il faut être précis plutôt qu'alarmiste. Contrairement au RGPD, qui peut sanctionner directement l'entreprise par une amende administrative, la nLPD prévoit des sanctions pénales qui visent en priorité la personne physique responsable du traitement au sein de l'entreprise, généralement à la suite d'une dénonciation, avec des montants qui peuvent atteindre 250'000 CHF. Deux nuances importantes : seule l'infraction intentionnelle est punissable, la négligence simple ne l'est pas, et c'est une autorité pénale cantonale qui prononce la sanction, pas le PFPDT, qui enquête et rend des décisions mais n'inflige pas d'amendes. Dans la pratique, le scénario le plus fréquent pour une PME n'est pas une sanction pénale mais une perte de confiance d'un client qui découvre que son dossier est passé par un outil qu'il n'imaginait pas. Le régime de sanctions exact dépend fortement des faits, une évaluation par un juriste reste recommandée si un incident survient.`,
  faq: [
    {
      question: 'La nLPD s\'applique-t-elle si mon IA est hébergée à l\'étranger ?',
      answer:
        "Oui, dans la très grande majorité des cas. La nLPD s'applique en fonction des personnes dont vous traitez les données, des personnes en lien avec la Suisse, pas en fonction du lieu d'hébergement de l'outil utilisé. Le lieu d'hébergement du fournisseur ne change rien à votre obligation de traiter les données correctement. Cela ajoute en revanche une question supplémentaire, celle du transfert de données à l'étranger, qui suppose que le pays ou le fournisseur de destination offre des garanties reconnues comme adéquates. En cas de doute sur un fournisseur précis, mieux vaut vérifier sa documentation de confidentialité ou demander un avis spécialisé que de supposer que tout va bien.",
    },
    {
      question: 'ChatGPT gratuit peut-il servir pour du travail confidentiel ?',
      answer:
        "Nous le déconseillons pour toute donnée que vous ne voudriez pas voir sortir de l'entreprise : données de clients identifiés, dossiers RH nominatifs, informations financières non publiques, données de santé. Les comptes gratuits et personnels payants, chez OpenAI comme chez Anthropic, restent des outils individuels, avec des réglages contrôlés par la personne utilisatrice, sans visibilité ni contrat au niveau de l'entreprise. Pour du travail réellement confidentiel, un abonnement Équipe ou Entreprise change la donne : pas d'entraînement sur vos données par défaut, et un contrat qui encadre le traitement. Pour un usage ponctuel et non sensible, reformuler un texte déjà public ou faire un brainstorming général, un compte grand public reste raisonnable.",
    },
    {
      question: "Qu'est-ce qui change avec un abonnement Enterprise ?",
      answer:
        "Trois choses concrètes. D'abord la donnée : sur les offres Entreprise de ChatGPT comme de Claude, vos échanges ne servent pas à entraîner de futurs modèles par défaut, contrairement aux comptes grand public. Ensuite le contrat : l'entreprise dispose d'un accord qui encadre le traitement des données, ce qu'un compte personnel n'a jamais. Enfin la gouvernance : contrôle des accès par utilisateur, journaux d'audit, gestion centralisée de la conservation des données, et souvent des options de résidence des données. Ce n'est pas seulement plus cher, c'est un régime différent, pensé pour qu'une entreprise sache répondre si la question se pose.",
    },
    {
      question: 'Que risque une PME en cas de manquement ?',
      answer:
        "C'est ici qu'il faut être précis plutôt qu'alarmiste. Contrairement au RGPD, qui peut sanctionner directement l'entreprise par une amende administrative, la nLPD prévoit des sanctions pénales qui visent en priorité la personne physique responsable du traitement au sein de l'entreprise, généralement à la suite d'une dénonciation, avec des montants qui peuvent atteindre 250'000 CHF. Deux nuances importantes : seule l'infraction intentionnelle est punissable, la négligence simple ne l'est pas, et c'est une autorité pénale cantonale qui prononce la sanction, pas le PFPDT, qui enquête et rend des décisions mais n'inflige pas d'amendes. Dans la pratique, le scénario le plus fréquent pour une PME n'est pas une sanction pénale mais une perte de confiance d'un client qui découvre que son dossier est passé par un outil qu'il n'imaginait pas. Le régime de sanctions exact dépend fortement des faits, une évaluation par un juriste reste recommandée si un incident survient.",
    },
  ],
}

export default article
