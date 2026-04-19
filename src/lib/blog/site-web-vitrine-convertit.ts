import type { Article } from './types'

const article: Article = {
    slug: 'site-web-vitrine-convertit',
    category: 'outils',
    title: 'Pourquoi votre site vitrine ne convertit pas (et comment y remédier en 30 jours)',
    excerpt:
      'Votre site reçoit du trafic mais génère peu de contacts ? Ce n\'est presque jamais un problème de visibilité. C\'est un problème de conversion. Voici les 7 causes les plus fréquentes et un plan d\'action en 30 jours.',
    date: '5 février 2026',
    dateISO: '2026-02-05',
    readTime: '7 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/site-web-convertit-hero.png',
      alt: 'Site web qui convertit : heatmap UX montrant les zones chaudes de clic et points de conversion pour PME',
    },
    images: [
      {
        src: '/images/blog/site-web-convertit-ux.png',
        alt: 'Entonnoir de conversion UX site web PME : visiteurs, leads, clients avec points de friction identifies',
        caption: "L'entonnoir de conversion : chaque étape peut être un point de fuite",
      },
      {
        src: '/images/blog/site-web-vitrine-elements-conversion.png',
        alt: 'Site web vitrine conversion PME Suisse 2026 : entonnoir de conversion visiteurs vers clients avec elements UX optimises',
        caption: 'L\'entonnoir de conversion web : transformer les visiteurs en clients grâce aux bons éléments UX',
      },
    ],
    tags: ['UX', 'conversion', 'site web', 'heatmap', 'CRO', 'PME'],
    seoTitle: 'Site vitrine qui ne convertit pas : 7 causes · DKDP',
    seoDescription:
      'Votre site reçoit du trafic mais peu de leads ? Découvrez les 7 raisons les plus fréquentes et un plan d\'action concret en 30 jours pour améliorer votre taux de conversion.',
    content: `## Le vrai problème : votre site informe mais ne convainc pas

La plupart des PME qui se plaignent de leur site web pensent avoir un problème de SEO. "Si on avait plus de trafic, on aurait plus de clients." Dans la majorité des cas, ce diagnostic est faux.

Le vrai problème est en aval : votre site reçoit du trafic, mais ce trafic ne se transforme pas en contacts, en appels, en ventes. C'est un problème de conversion, pas de visibilité. Et la bonne nouvelle, c'est que la conversion est bien plus rapide à améliorer que le SEO.

Un taux de conversion typique pour un site vitrine de PME se situe entre 1 et 3 % (source : Unbounce Conversion Benchmark Report, 2024). Si le vôtre est en dessous de 0,5 %, vous avez un problème structurel à résoudre avant d'investir un centime supplémentaire en publicité ou en SEO.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(74,222,128,0.2);background:rgba(74,222,128,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#4ade80;margin-bottom:1rem">ANATOMIE D'UNE PAGE QUI CONVERTIT</div>
<div style="display:flex;flex-direction:column;gap:0.5rem">
<div style="padding:1rem;border-radius:12px;background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.15);display:flex;align-items:center;gap:1rem">
<div style="min-width:40px;text-align:center;font-size:0.7rem;font-weight:700;color:#A78BFA;text-transform:uppercase">Hero</div>
<div style="flex:1">
<div style="font-size:0.85rem;color:#e4e4e7">Proposition de valeur claire + CTA principal</div>
<div style="font-size:0.75rem;color:#9CA3AF">Repond a : "Qu'est-ce que vous faites et pourquoi rester ?"</div>
</div>
<div style="font-size:0.75rem;color:#4ade80;font-weight:600">Critique</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(255,140,0,0.08);border:1px solid rgba(255,140,0,0.15);display:flex;align-items:center;gap:1rem">
<div style="min-width:40px;text-align:center;font-size:0.7rem;font-weight:700;color:#FF8C00;text-transform:uppercase">Trust</div>
<div style="flex:1">
<div style="font-size:0.85rem;color:#e4e4e7">Logos clients + temoignages + chiffres concrets</div>
<div style="font-size:0.75rem;color:#9CA3AF">Brise la barriere de confiance du visiteur inconnu</div>
</div>
<div style="font-size:0.75rem;color:#FF8C00;font-weight:600">Important</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.15);display:flex;align-items:center;gap:1rem">
<div style="min-width:40px;text-align:center;font-size:0.7rem;font-weight:700;color:#60a5fa;text-transform:uppercase">Offre</div>
<div style="flex:1">
<div style="font-size:0.85rem;color:#e4e4e7">Services/produits avec benefices clairs</div>
<div style="font-size:0.75rem;color:#9CA3AF">Ce que vous faites, pour qui, et ce que le client gagne</div>
</div>
<div style="font-size:0.75rem;color:#60a5fa;font-weight:600">Important</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.15);display:flex;align-items:center;gap:1rem">
<div style="min-width:40px;text-align:center;font-size:0.7rem;font-weight:700;color:#4ade80;text-transform:uppercase">CTA</div>
<div style="flex:1">
<div style="font-size:0.85rem;color:#e4e4e7">Appel a l'action oriente benefice</div>
<div style="font-size:0.75rem;color:#9CA3AF">"Obtenez votre audit gratuit" > "Contactez-nous"</div>
</div>
<div style="font-size:0.75rem;color:#4ade80;font-weight:600">Critique</div>
</div>
<div style="padding:1rem;border-radius:12px;background:rgba(212,212,216,0.08);border:1px solid rgba(212,212,216,0.15);display:flex;align-items:center;gap:1rem">
<div style="min-width:40px;text-align:center;font-size:0.7rem;font-weight:700;color:#D4D4D8;text-transform:uppercase">Form</div>
<div style="flex:1">
<div style="font-size:0.85rem;color:#e4e4e7">Formulaire minimal (3-4 champs max)</div>
<div style="font-size:0.75rem;color:#9CA3AF">Chaque champ supplementaire reduit le taux de completion</div>
</div>
<div style="font-size:0.75rem;color:#D4D4D8;font-weight:600">Critique</div>
</div>
</div>
</div>

## Les 7 raisons les plus fréquentes

### 1. Pas de proposition de valeur claire above the fold

La première chose que voit un visiteur sur votre site doit répondre à une question : "Qu'est-ce que vous faites et pourquoi devrais-je rester ?" Si votre titre de héro est "Bienvenue chez nous" ou le nom de votre entreprise seul, vous perdez 60 % de vos visiteurs avant qu'ils aient scrollé (source : Nielsen Norman Group).

La proposition de valeur idéale : un titre qui dit ce que vous faites, pour qui, et ce qui vous différencie. Exemple : "Création de sites web pour les PME suisses qui veulent générer des leads, pas juste exister."

### 2. CTA vague ou absent

"En savoir plus" n'est pas un appel à l'action. "Contactez-nous" est mieux mais générique. "Obtenez votre audit gratuit en 48h" est un CTA. La différence : il dit ce que le visiteur va recevoir, pas juste ce qu'il doit faire.

Vérifiez que chaque page de votre site a au moins un CTA clair, visible, et orienté bénéfice pour le visiteur.

### 3. Temps de chargement supérieur à 3 secondes

Au-delà de 3 secondes, vous perdez en moyenne 40 % de vos visiteurs mobiles (source : Think with Google, 2018). Testez votre site sur PageSpeed Insights maintenant. Si votre score mobile est inférieur à 70, corrigez ça avant tout.

### 4. Pas de preuve sociale

Un visiteur qui arrive sur votre site ne vous connaît pas. Il n'a aucune raison de vous faire confiance par défaut. Les éléments qui brisent cette barrière : témoignages clients réels (avec photo et nom), logos de clients reconnaissables, chiffres concrets ("127 projets livrés", "4,8/5 sur 64 avis Google"), certifications, mentions presse.

### 5. Formulaire trop long ou trop intrusif

Chaque champ supplémentaire dans votre formulaire de contact réduit votre taux de conversion. La règle : demandez uniquement ce dont vous avez besoin pour répondre. Nom, email, sujet du projet. Pas de téléphone obligatoire, pas de SIRET, pas de questions à rallonge. Vous obtiendrez les détails lors de l'échange.

### 6. Navigation confuse

Plus votre menu a d'options, moins vos visiteurs savent où aller. Le paradoxe du choix s'applique aussi aux sites web. Un menu idéal pour un site vitrine PME : 5 à 6 items maximum, avec un CTA visible en fin de header. Simplifiez, regroupez, supprimez.

### 7. Site non optimisé mobile

En 2026, plus de 60 % du trafic web provient du mobile (source : StatCounter GlobalStats). Si votre site est conçu pour desktop et "adapté" au mobile comme une réflexion secondaire, vous offrez une expérience dégradée à la majorité de vos visiteurs. Testez votre site sur votre téléphone, comme un vrai utilisateur.

___IMG:site-web-convertit-ux.png___

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1rem">CHECKLIST UX CONVERSION</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">Proposition de valeur claire en hero</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">CTA oriente benefice sur chaque page</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">PageSpeed mobile > 70</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">3+ temoignages clients avec photo</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">Formulaire 3-4 champs max</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">Menu 5-6 items maximum</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">expérience mobile testee manuellement</div>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:rgba(167,139,250,0.05);border-radius:8px">
<div style="min-width:18px;height:18px;border-radius:4px;border:2px solid #A78BFA;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#A78BFA">&#10003;</div>
<div style="font-size:0.8rem;color:#e4e4e7">Heatmaps installees (Hotjar/Clarity)</div>
</div>
</div>
</div>

## Comment diagnostiquer avec des outils gratuits

**Hotjar (plan gratuit)** : installez les heatmaps sur vos pages principales. Vous verrez exactement où les visiteurs cliquent, jusqu'où ils scrollent, et où ils abandonnent. C'est le diagnostic le plus révélateur que vous puissiez faire.

**Google Analytics 4** : analysez le taux d'engagement par page, le taux de rebond, et les parcours de navigation. Les pages avec un taux de rebond supérieur à 80 % sont vos priorités immédiates.

**PageSpeed Insights** : testez chaque page importante de votre site sur mobile. Les recommandations sont directement actionnables.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(255,140,0,0.2);background:rgba(255,140,0,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#FF8C00;margin-bottom:1rem">ENTONNOIR DE CONVERSION AVEC TAUX MOYENS</div>
<div style="display:flex;flex-direction:column;align-items:center;gap:0.25rem">
<div style="width:100%;padding:0.75rem;background:rgba(212,212,216,0.08);border-radius:8px;text-align:center">
<div style="font-size:0.85rem;color:#e4e4e7">Visiteurs du site</div>
<div style="font-size:0.75rem;color:#71717a">100% du trafic</div>
</div>
<div style="font-size:0.7rem;color:#fca5a5">&#8595; 40-60% abandonnent (hero faible, chargement lent)</div>
<div style="width:80%;padding:0.75rem;background:rgba(167,139,250,0.08);border-radius:8px;text-align:center">
<div style="font-size:0.85rem;color:#e4e4e7">Visiteurs engages</div>
<div style="font-size:0.75rem;color:#71717a">40-60% scrollent et explorent</div>
</div>
<div style="font-size:0.7rem;color:#fca5a5">&#8595; 70-85% partent sans action (CTA faible, pas de confiance)</div>
<div style="width:55%;padding:0.75rem;background:rgba(255,140,0,0.08);border-radius:8px;text-align:center">
<div style="font-size:0.85rem;color:#e4e4e7">Clics sur CTA</div>
<div style="font-size:0.75rem;color:#71717a">5-15% cliquent sur un CTA</div>
</div>
<div style="font-size:0.7rem;color:#fca5a5">&#8595; 30-50% abandonnent le formulaire</div>
<div style="width:35%;padding:0.75rem;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:8px;text-align:center">
<div style="font-size:0.85rem;font-weight:600;color:#4ade80">Leads convertis</div>
<div style="font-size:0.75rem;color:#71717a">1-3% du trafic initial</div>
</div>
</div>
<div style="margin-top:1rem;padding-top:0.75rem;border-top:1px solid rgba(255,140,0,0.15);font-size:0.75rem;color:#71717a;text-align:center">Chaque point de friction corrige ameliore le taux final de facon cumulative</div>
</div>

___IMG:site-web-vitrine-elements-conversion.png___

## Le plan d'action en 30 jours

**Semaine 1 : Audit complet.** Installez Hotjar. Analysez Google Analytics. Testez toutes vos pages clés sur mobile et PageSpeed Insights. Listez les 10 problèmes les plus impactants.

**Semaine 2 : Quick wins.** Réécrivez vos CTA, clarifiez votre proposition de valeur en héro, ajoutez au moins 3 témoignages clients avec photo, allégez votre formulaire. Ces changements ne prennent pas plus de 2 jours.

**Semaine 3 : Test de la page d'accueil.** Créez une version alternative de votre page d'accueil avec les améliorations de la semaine 2. Utilisez Google Optimize (ou demandez à votre développeur) pour un A/B test simple.

**Semaine 4 : Mesure et itération.** Analysez les résultats. Calculez votre nouveau taux de conversion. Documentez ce qui a fonctionné. Priorisez les optimisations suivantes.

## Benchmark : qu'est-ce qu'un bon taux de conversion pour une PME suisse ?

| Secteur | Taux de conversion moyen | Bon taux |
|---|---|---|
| Services B2B | 1,5 % | 3 à 5 % |
| Commerce local | 2 % | 4 à 6 % |
| Services informatiques | 1,8 % | 3 à 4 % |
| Conseil / formation | 2,5 % | 5 à 8 % |

## Conclusion

Avant d'investir dans plus de trafic, assurez-vous d'abord que votre site sait convertir le trafic qu'il a déjà. Un taux de conversion doublé vaut autant qu'un trafic doublé, avec un coût infiniment plus faible. Commencez par l'audit, identifiez vos 3 quick wins, implémentez, mesurez. Répétez.`,
  }

export default article
