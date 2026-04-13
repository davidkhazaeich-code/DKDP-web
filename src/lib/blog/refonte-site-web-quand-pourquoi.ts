import type { Article } from './types'

const article: Article = {
    slug: 'refonte-site-web-quand-pourquoi',
    category: 'outils',
    title: 'Refonte de site web : 7 signaux qui indiquent qu\'il est temps de se lancer',
    excerpt:
      'Votre site web a 4 ou 5 ans et vous sentez qu\'il "vieillit". Mais est-ce vraiment le moment d\'investir dans une refonte ? Voici les 7 signaux objectifs qui indiquent que oui, et ceux qui peuvent encore attendre.',
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
      {
        src: '/images/blog/refonte-site-web-signaux-alerte.png',
        alt: 'Refonte site web Geneve 2026 : transformation avant apres d\'un site obsolete vers un design moderne et performant',
        caption: 'La refonte transforme un site vieillissant en outil de conversion performant',
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
- **La refonte** : reconstruire le site de zéro, nouvelle architecture, nouvelle technologie, nouveau contenu. Durée : 2-4 mois.

Une refonte est un investissement lourd (5\'000 à 20\'000 CHF pour une PME). Elle se justifie quand les problèmes sont structurels, pas cosmétiques. Voici les 7 signaux qui font la différence.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.25rem">LES 7 SIGNAUX D'ALERTE</div>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem">
<div style="padding:1rem;border-radius:12px;background:rgba(252,165,165,0.06);border:1px solid rgba(252,165,165,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(252,165,165,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fca5a5">1</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Lenteur mobile > 3s</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">PageSpeed < 60/100 = problème structurel</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(252,165,165,0.06);border:1px solid rgba(252,165,165,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(252,165,165,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fca5a5">2</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Taux de rebond > 75%</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">Visiteurs qui repartent immédiatement</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(255,140,0,0.06);border:1px solid rgba(255,140,0,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#FF8C00">3</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Pas d\'autonomie CMS</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">Chaque modif nécessite un prestataire</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(255,140,0,0.06);border:1px solid rgba(255,140,0,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#FF8C00">4</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Pas de leads qualifiés</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">< 1 contact/sem pour 500 visites/mois</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(167,139,250,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#A78BFA">5</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Invisible sur Google local</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">Absent du top 10 sur vos requêtes clés</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(167,139,250,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#A78BFA">6</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Design daté (> 4 ans)</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">Première impression visuelle négative</div>
</div>
<div style="grid-column:1/-1;padding:1rem;border-radius:12px;background:rgba(212,212,216,0.06);border:1px solid rgba(212,212,216,0.15)">
<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
<div style="width:24px;height:24px;border-radius:50%;background:rgba(212,212,216,0.15);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#D4D4D8">7</div>
<div style="font-size:0.82rem;color:#e4e4e7;font-weight:600">Stack technique = risque sécurité</div>
</div>
<div style="font-size:0.73rem;color:#9CA3AF">WordPress obsolète, plugins vulnérables, HTTPS défaillant</div>
</div>
</div>
<div style="margin-top:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15)">
<div style="font-size:0.8rem;color:#4ade80;font-weight:600">Règle : 3 signaux ou plus = refonte justifiée. 1-2 = optimisations ciblées.</div>
</div>
</div>

## Signal 1 : Votre site est plus lent que 3 secondes sur mobile

En 2026, plus de 60 % des visites d\'un site PME viennent du mobile (source : StatCounter GlobalStats). Si votre site met plus de 3 secondes à afficher son contenu principal sur un iPhone, vous perdez la moitié de vos visiteurs avant même qu\'ils aient lu votre premier titre.

Testez avec Google PageSpeed Insights. Un score mobile inférieur à 60/100 est un signal sérieux. Inférieur à 40/100, c\'est un problème structurel que seule une refonte résoudra.

## Signal 2 : Votre taux de rebond dépasse 75 %

Un taux de rebond élevé signifie que les visiteurs arrivent et repartent immédiatement. Sur un site de services B2B, un taux de rebond sain se situe entre 40 et 60 % (source : CXL Institute). Au-delà de 75 %, votre site ne parvient pas à convaincre les visiteurs de rester, que ce soit un problème de design, de lisibilité ou de pertinence du contenu.

Analysez dans Google Analytics 4 le rebond par page et par source de trafic. Si le problème est généralisé, c\'est structurel.

___IMG:refonte-site-web-signaux-alerte.png___

## Signal 3 : Votre site n\'est pas géré par votre équipe

Si modifier le texte d\'un bouton ou ajouter une photo nécessite d\'appeler votre prestataire ou de manipuler du code, vous avez un problème d\'autonomie. Un CMS moderne (WordPress, Sanity, Webflow) doit permettre à n\'importe quel membre de votre équipe de gérer le contenu sans compétences techniques.

L\'absence d\'autonomie éditoriale coûte en temps et en réactivité, surtout pour les offres, les actualités, et les promotions.

## Signal 4 : Votre site ne génère pas de leads qualifiés

Un site vitrine a un job : transformer les visiteurs en contacts commerciaux. Si votre formulaire de contact reçoit moins d\'un message par semaine pour 500 visites mensuelles, le problème n\'est pas le volume de trafic, c\'est le taux de conversion.

Les causes peuvent être multiples : pas d\'appel à l\'action clair, formulaire trop long, proposition de valeur floue, pas de preuve sociale. Une refonte bien conduite traite tous ces points simultanément.

## Signal 5 : Votre site n\'apparaît pas sur les requêtes locales

Tapez votre secteur d\'activité + "Genève" sur Google. Si votre site n\'apparaît pas dans les 10 premiers résultats, vous manquez du trafic qualifié chaque jour. Et si votre site a plus de 4 ans, il a probablement été construit sans considération SEO sérieuse.

Repartir d\'une base technique saine (structure URL, balisage sémantique, vitesse, mobile-first) est souvent plus efficace que d\'essayer de corriger un socle fragile.

## Signal 6 : Votre design date visuellement de plus de 4 ans

Le web évolue vite visuellement. Un site qui semblait moderne en 2020 peut communiquer "vieillissement" et "manque de sérieux" en 2026, même si le contenu est excellent. La confiance se construit en quelques secondes : une première impression visuelle datée pénalise votre conversion avant même que le visiteur ait lu une ligne.

## Signal 7 : Votre stack technique crée des problèmes de sécurité

Un WordPress non mis à jour, un plugin obsolète avec des vulnérabilités connues, ou un hébergeur qui ne supporte plus HTTPS correctement : les risques de sécurité augmentent avec l\'âge de la stack. Une refonte est l\'occasion de partir sur une base moderne, maintenue et sécurisée.

## Timeline type d\'une refonte

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,140,0,0.2);background:rgba(255,140,0,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1.25rem">TIMELINE PROJET DE REFONTE</div>
<div style="display:flex;flex-direction:column;gap:0.5rem">
<div style="display:flex;align-items:stretch;gap:1rem">
<div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0">
<div style="width:12px;height:12px;border-radius:50%;background:#FF8C00;flex-shrink:0"></div>
<div style="width:2px;flex:1;background:rgba(255,140,0,0.3)"></div>
</div>
<div style="flex:1;padding-bottom:1.25rem">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Semaines 1-2 : Audit et brief</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:4px">Analyse de l\'existant, objectifs, benchmark concurrents</div>
</div>
</div>
<div style="display:flex;align-items:stretch;gap:1rem">
<div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0">
<div style="width:12px;height:12px;border-radius:50%;background:#A78BFA;flex-shrink:0"></div>
<div style="width:2px;flex:1;background:rgba(167,139,250,0.3)"></div>
</div>
<div style="flex:1;padding-bottom:1.25rem">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Semaines 3-5 : Design UX/UI</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:4px">Wireframes, maquettes, validation client</div>
</div>
</div>
<div style="display:flex;align-items:stretch;gap:1rem">
<div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0">
<div style="width:12px;height:12px;border-radius:50%;background:#D4D4D8;flex-shrink:0"></div>
<div style="width:2px;flex:1;background:rgba(212,212,216,0.3)"></div>
</div>
<div style="flex:1;padding-bottom:1.25rem">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Semaines 5-10 : Développement</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:4px">Intégration, fonctionnalités, contenu, SEO on-page</div>
</div>
</div>
<div style="display:flex;align-items:stretch;gap:1rem">
<div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0">
<div style="width:12px;height:12px;border-radius:50%;background:#4ade80;flex-shrink:0"></div>
<div style="width:2px;flex:1;background:rgba(74,222,128,0.3)"></div>
</div>
<div style="flex:1;padding-bottom:1.25rem">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Semaines 11-12 : Tests et lancement</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:4px">QA, recette client, migration, mise en ligne</div>
</div>
</div>
<div style="display:flex;align-items:stretch;gap:1rem">
<div style="display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0">
<div style="width:12px;height:12px;border-radius:50%;background:#60a5fa;flex-shrink:0"></div>
</div>
<div style="flex:1">
<div style="font-size:0.85rem;color:#e4e4e7;font-weight:600">Semaines 13-24 : Optimisation post-lancement</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:4px">Analytics, ajustements UX, contenu SEO, montée en puissance</div>
</div>
</div>
</div>
</div>

## ROI attendu d\'une refonte bien conduite

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(74,222,128,0.2);background:rgba(74,222,128,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#4ade80;margin-bottom:1.25rem">ROI MESURABLE A 12 MOIS</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
<div style="text-align:center;padding:1rem;border-radius:12px;background:rgba(74,222,128,0.08)">
<div style="font-size:1.5rem;font-weight:700;color:#4ade80">+40-80%</div>
<div style="font-size:0.8rem;color:#e4e4e7;margin-top:0.25rem">Trafic organique</div>
<div style="font-size:0.7rem;color:#9CA3AF;margin-top:0.25rem">SEO technique + contenu optimisé</div>
</div>
<div style="text-align:center;padding:1rem;border-radius:12px;background:rgba(167,139,250,0.08)">
<div style="font-size:1.5rem;font-weight:700;color:#A78BFA">x2-3</div>
<div style="font-size:0.8rem;color:#e4e4e7;margin-top:0.25rem">Taux de conversion</div>
<div style="font-size:0.7rem;color:#9CA3AF;margin-top:0.25rem">UX repensée, CTA optimisés</div>
</div>
<div style="text-align:center;padding:1rem;border-radius:12px;background:rgba(255,140,0,0.08)">
<div style="font-size:1.5rem;font-weight:700;color:#FF8C00">-50%</div>
<div style="font-size:0.8rem;color:#e4e4e7;margin-top:0.25rem">Taux de rebond</div>
<div style="font-size:0.7rem;color:#9CA3AF;margin-top:0.25rem">Vitesse, design, pertinence</div>
</div>
</div>
<div style="margin-top:1rem;font-size:0.75rem;color:#71717a">Moyennes constatées sur les refontes DKDP en Suisse romande (2024-2026)</div>
</div>

___IMG:refonte-site-web-checklist.png___

## Refonte ou optimisation : la règle des 3 signaux

Si vous identifiez **3 signaux ou plus** parmi les 7 ci-dessus, une refonte est justifiée. Si vous en avez 1 ou 2, commencez par des optimisations ciblées, plus rapides et moins coûteuses.

La refonte n\'est pas une fin en soi. C\'est un investissement stratégique que l\'on fait quand l\'existant est un frein à la croissance, pas quand on veut juste "changer l\'apparence".

## Conclusion

Une bonne refonte ne se décide pas sur un coup de tête ou parce que le design "vieillit". Elle se justifie par des données : trafic, conversion, performance, positionnement SEO. Prenez le temps d\'auditer ces indicateurs avant de lancer un projet.

Chez DKDP, chaque projet de refonte commence par un audit de l\'existant. Parce qu\'on ne construit pas quelque chose de mieux sans comprendre ce qui ne fonctionne pas dans l\'actuel.

## Questions fréquentes

**Combien coûte une refonte de site web pour une PME à Genève ?**
Une refonte complète pour une PME genevoise coûte entre CHF 5 000 et CHF 20 000 selon la complexité. Un site vitrine de 5 à 10 pages avec un CMS se situe entre CHF 5 000 et CHF 8 000. Un site avec fonctionnalités avancées ou e-commerce dépasse CHF 10 000. DKDP propose des refontes à partir de CHF 5 000 avec audit de l\'existant inclus.

**Combien de temps prend une refonte de site web ?**
Une refonte complète prend entre 2 et 4 mois en moyenne. Un site vitrine standard est livré en 6 à 10 semaines. Un site avec CMS personnalisé ou e-commerce demande 3 à 5 mois. La phase d\'audit et de brief représente 2 semaines, le design 2 à 3 semaines, le développement 4 à 6 semaines, puis les tests et le lancement.

**Dois-je garder mon domaine et mes contenus existants lors d'une refonte ?**
Oui, dans la quasi-totalité des cas. Votre domaine et vos contenus existants ont une valeur SEO accumulée. La refonte doit préserver les URLs existantes (ou mettre en place des redirections 301 rigoureuses) et réutiliser le contenu qui performe déjà. Perdre ces acquis SEO par une mauvaise migration peut coûter des mois de trafic organique.

**Quelle technologie choisir pour un nouveau site PME : WordPress, Next.js ou Webflow ?**
Cela dépend de vos besoins. WordPress convient si votre équipe veut gérer beaucoup de contenu sans compétences techniques. Next.js est idéal pour les performances maximales et le SEO avancé (score PageSpeed supérieur à 95). Webflow est un bon compromis design et autonomie. DKDP développe en Next.js et Astro pour les performances, avec une interface de gestion de contenu adaptée à votre équipe.

**Comment mesurer si ma refonte a été un succès ?**
Les indicateurs à suivre 3 et 6 mois après le lancement : trafic organique (Google Search Console), taux de conversion (formulaires, appels), taux de rebond et scores PageSpeed Mobile. Une refonte bien conduite génère en moyenne +40 à +80 % de trafic organique et multiplie par 2 à 3 le taux de conversion dans les 12 mois.

**Peut-on éviter une refonte avec des optimisations ponctuelles ?**
Souvent oui, si vous identifiez 1 ou 2 signaux d\'alerte seulement. Des optimisations ciblées (amélioration de la vitesse, refonte du formulaire de contact, ajout d\'un blog) peuvent suffire. La règle des 3 signaux s\'applique : 3 problèmes structurels ou plus, et la refonte devient l\'option la plus rentable à long terme.`,
  }

export default article
