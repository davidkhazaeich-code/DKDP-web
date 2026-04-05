import type { Article } from './types'

const article: Article = {
    slug: 'refonte-site-web-quand-pourquoi',
    category: 'outils',
    title: 'Refonte de site web : 7 signaux qui indiquent qu\'il est temps de se lancer',
    excerpt:
      'Votre site web a 4 ou 5 ans et vous sentez qu\'il "vieillit". Mais est-ce vraiment le moment d\'investir dans une refonte ? Voici les 7 signaux objectifs qui indiquent que oui — et ceux qui peuvent encore attendre.',
    date: '30 mars 2026',
    dateISO: '2026-03-30',
    readTime: '5 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/refonte-site-web-hero.png',
      alt: 'Refonte site web avant apres : comparaison ancien design et nouveau site moderne responsive pour PME',
    },
    images: [
      {
        src: '/images/blog/refonte-site-web-checklist.png',
        alt: 'Checklist refonte site web : 7 signaux que votre site a besoin d\'une refonte, design obsolete, lenteur, SEO',
        caption: 'Les 7 indicateurs objectifs qui justifient une refonte de site web',
      },
    ],
    tags: ['refonte site web', 'PME', 'UX', 'performance', 'Genève', 'stratégie web'],
    seoTitle: 'Refonte site web : 7 signaux pour savoir si c\'est le moment',
    seoDescription:
      'Votre site web a besoin d\'une refonte ? Découvrez les 7 signaux objectifs qui indiquent qu\'il est temps d\'agir, et comment distinguer refonte, redesign et simple optimisation.',
    content: `## Refonte ou optimisation : comprendre la différence

Il existe une confusion fréquente entre trois niveaux d\'intervention sur un site web :

- **L\'optimisation** : améliorer la vitesse, corriger des bugs, ajuster des textes. Durée : quelques jours.
- **Le redesign** : changer l\'apparence sans toucher à la structure technique. Durée : 3-6 semaines.
- **La refonte** : reconstruire le site de zéro — nouvelle architecture, nouvelle technologie, nouveau contenu. Durée : 2-4 mois.

Une refonte est un investissement lourd (5\'000 à 20\'000 CHF pour une PME). Elle se justifie quand les problèmes sont structurels, pas cosmétiques. Voici les 7 signaux qui font la différence.

## Signal 1 : Votre site est plus lent que 3 secondes sur mobile

En 2026, plus de 60 % des visites d\'un site PME viennent du mobile (source : StatCounter GlobalStats). Si votre site met plus de 3 secondes à afficher son contenu principal sur un iPhone, vous perdez la moitié de vos visiteurs avant même qu\'ils aient lu votre premier titre.

Testez avec Google PageSpeed Insights. Un score mobile inférieur à 60/100 est un signal sérieux. Inférieur à 40/100, c\'est un problème structurel que seule une refonte résoudra.

## Signal 2 : Votre taux de rebond dépasse 75 %

Un taux de rebond élevé signifie que les visiteurs arrivent et repartent immédiatement. Sur un site de services B2B, un taux de rebond sain se situe entre 40 et 60 % (source : CXL Institute). Au-delà de 75 %, votre site ne parvient pas à convaincre les visiteurs de rester — problème de design, de lisibilité ou de pertinence du contenu.

Analysez dans Google Analytics 4 le rebond par page et par source de trafic. Si le problème est généralisé, c\'est structurel.

## Signal 3 : Votre site n\'est pas géré par votre équipe

Si modifier le texte d\'un bouton ou ajouter une photo nécessite d\'appeler votre prestataire ou de manipuler du code, vous avez un problème d\'autonomie. Un CMS moderne (WordPress, Sanity, Webflow) doit permettre à n\'importe quel membre de votre équipe de gérer le contenu sans compétences techniques.

L\'absence d\'autonomie éditoriale coûte en temps et en réactivité — surtout pour les offres, les actualités, et les promotions.

## Signal 4 : Votre site ne génère pas de leads qualifiés

Un site vitrine a un job : transformer les visiteurs en contacts commerciaux. Si votre formulaire de contact reçoit moins d\'un message par semaine pour 500 visites mensuelles, le problème n\'est pas le volume de trafic — c\'est le taux de conversion.

Les causes peuvent être multiples : pas d\'appel à l\'action clair, formulaire trop long, proposition de valeur floue, pas de preuve sociale. Une refonte bien conduite traite tous ces points simultanément.

## Signal 5 : Votre site n\'apparaît pas sur les requêtes locales

Tapez votre secteur d\'activité + "Genève" sur Google. Si votre site n\'apparaît pas dans les 10 premiers résultats, vous manquez du trafic qualifié chaque jour. Et si votre site a plus de 4 ans, il a probablement été construit sans considération SEO sérieuse.

Repartir d\'une base technique saine (structure URL, balisage sémantique, vitesse, mobile-first) est souvent plus efficace que d\'essayer de corriger un socle fragile.

## Signal 6 : Votre design date visuellement de plus de 4 ans

Le web évolue vite visuellement. Un site qui semblait moderne en 2020 peut communiquer "vieillissement" et "manque de sérieux" en 2026 — même si le contenu est excellent. La confiance se construit en quelques secondes : une première impression visuelle datée pénalise votre conversion avant même que le visiteur ait lu une ligne.

## Signal 7 : Votre stack technique crée des problèmes de sécurité

Un WordPress non mis à jour, un plugin obsolète avec des vulnérabilités connues, ou un hébergeur qui ne supporte plus HTTPS correctement : les risques de sécurité augmentent avec l\'âge de la stack. Une refonte est l\'occasion de partir sur une base moderne, maintenue et sécurisée.

## Refonte ou optimisation : la règle des 3 signaux

Si vous identifiez **3 signaux ou plus** parmi les 7 ci-dessus, une refonte est justifiée. Si vous en avez 1 ou 2, commencez par des optimisations ciblées — plus rapides et moins coûteuses.

La refonte n\'est pas une fin en soi. C\'est un investissement stratégique que l\'on fait quand l\'existant est un frein à la croissance, pas quand on veut juste "changer l\'apparence".

## Conclusion

Une bonne refonte ne se décide pas sur un coup de tête ou parce que le design "vieillit". Elle se justifie par des données : trafic, conversion, performance, positionnement SEO. Prenez le temps d\'auditer ces indicateurs avant de lancer un projet.

Chez DKDP, chaque projet de refonte commence par un audit de l\'existant. Parce qu\'on ne construit pas quelque chose de mieux sans comprendre ce qui ne fonctionne pas dans l\'actuel.`,
  }

export default article
