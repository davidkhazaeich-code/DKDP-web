import type { Article } from './types'

const article: Article = {
  slug: 'figma-ou-canva-choisir-logiciel-graphique-entreprise',
  category: 'outils',
  title: 'Figma ou Canva : quel logiciel graphique choisir pour votre entreprise',
  excerpt:
    'Figma et Canva sont posés en duel alors qu\'ils ne font pas le même métier. Un seul critère suffit à trancher, et il ne porte pas sur les fonctionnalités. Ce que les deux outils sont devenus en 2026, ce qu\'ils coûtent réellement, et le choix adapté à une PME romande.',
  date: '31 août 2026',
  dateISO: '2026-08-31',
  readTime: '10 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/figma-ou-canva-logiciel-graphique-entreprise-hero.webp',
    alt: 'Figma ou Canva : deux collaborateurs d\'une PME genevoise comparent un visuel fini et une maquette filaire pour choisir leur logiciel graphique en 2026',
  },
  images: [
    {
      src: '/images/blog/figma-canva-livrable-fini-vs-specification.webp',
      alt: 'Figma ou Canva : différence entre un fichier livrable prêt à publier et un fichier de spécification destiné à être construit en code',
      caption:
        'Le même brief donne deux objets très différents. D\'un côté un visuel prêt à publier, de l\'autre un plan que quelqu\'un devra construire.',
    },
    {
      src: '/images/blog/figma-canva-gabarit-verrouille-charte-equipe.webp',
      alt: 'Charte graphique tenue par un gabarit verrouillé : plusieurs collaborateurs non graphistes produisent des visuels cohérents à partir du même modèle',
      caption:
        'La cohérence de marque ne vient pas de l\'outil, elle vient du gabarit verrouillé. C\'est le seul dispositif qui tient quand huit personnes produisent.',
    },
  ],
  tags: ['Figma', 'Canva', 'Design', 'Charte graphique', 'Outils', 'Formation', 'PME', 'Suisse romande', 'Genève', '2026'],
  seoTitle: 'Figma ou Canva : lequel choisir pour votre entreprise ?',
  seoDescription:
    'Figma ou Canva : le critère qui tranche vraiment, ce que les deux outils sont devenus en 2026, leurs coûts réels et le choix adapté à votre PME romande.',
  faq: [
    {
      question: 'Canva peut-il remplacer Figma pour créer un site web ?',
      answer:
        'Pour une page simple sans besoin d\'évolution, oui. Canva sait publier un site depuis un design. Mais vous obtenez une page hébergée chez Canva, pas un site que votre développeur pourra reprendre, optimiser et faire évoluer. Dès que le site devient un actif commercial, avec du référencement, des performances à tenir et des fonctionnalités qui s\'ajoutent, la maquette Figma reprise en code reste la bonne voie.',
    },
    {
      question: 'Figma est-il trop compliqué pour une personne non graphiste ?',
      answer:
        'Figma Design l\'est, oui, et c\'est normal : il est conçu pour concevoir des interfaces. Figma Buzz ne l\'est pas, puisqu\'il est fait pour que des personnes non graphistes remplissent des gabarits préparés par un designer. La vraie question n\'est donc pas la difficulté de Figma, mais de savoir si quelqu\'un chez vous va d\'abord construire ces gabarits.',
    },
    {
      question: 'Faut-il payer Canva quand la version gratuite existe ?',
      answer:
        'La version gratuite convient à une personne seule qui publie occasionnellement. Elle devient un problème dès qu\'une équipe produit, parce que le Brand Kit, le partage de gabarits verrouillés et le redimensionnement automatique sont dans les offres payantes. Ce sont précisément les fonctions qui garantissent la cohérence de votre charte. Les associations et organisations à but non lucratif enregistrées peuvent obtenir l\'accès gratuitement, jusqu\'à 50 utilisateurs.',
    },
    {
      question: 'Combien coûte Figma pour une équipe de dix personnes ?',
      answer:
        'Moins que ce que la plupart des gens estiment, parce que Figma ne facture pas tout le monde au même tarif. Sur le plan Professional en tarif annuel relevé le 31 août 2026, un siège Full est à 16 dollars par mois, un siège Dev à 12 dollars et un siège Collab à 3 dollars. Une équipe de dix personnes dont deux conçoivent réellement paie donc deux sièges pleins, pas dix.',
    },
    {
      question: 'Que change la gratuité d\'Affinity annoncée par Canva en 2026 ?',
      answer:
        'Elle supprime l\'argument selon lequel Canva serait réservé aux visuels simples. Affinity, la suite professionnelle de retouche photo, d\'illustration vectorielle et de mise en page rachetée par Canva, est désormais proposée gratuitement. Une PME dispose donc d\'un outil de niveau professionnel sans abonnement Adobe, à côté de Canva pour la production courante.',
    },
    {
      question: 'Peut-on utiliser les deux outils dans la même entreprise ?',
      answer:
        'C\'est la configuration la plus fréquente, et souvent la plus saine. La règle qui évite le désordre est simple : Figma sert à concevoir ce qui sera construit ou ce qui définit la marque, Canva sert à produire le quotidien. Ce qui coûte cher, ce n\'est pas de payer deux abonnements, c\'est de laisser la charte se déliter parce que personne n\'a fixé la frontière entre les deux.',
    },
  ],
  content: `Dès qu'une entreprise décide de reprendre la main sur ses visuels, la même question tombe : Figma ou Canva ? Elle est presque toujours posée comme un duel, et c'est exactement ce qui la rend impossible à trancher. Les deux outils ne font pas le même métier. Les comparer fonctionnalité par fonctionnalité revient à demander si une perceuse est meilleure qu'un tournevis.

Il existe pourtant un critère simple qui règle la question dans la plupart des cas, et il ne porte ni sur le prix ni sur la liste des fonctions. Voici lequel, ce que les deux outils sont réellement devenus en 2026 après une année où ils se sont mis à empiéter l'un sur l'autre, et comment se décide le choix dans une PME romande.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(74,222,128,0.18);background:rgba(74,222,128,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#4ade80;margin-bottom:0.9rem">LA REPONSE COURTE</div>
<div style="font-size:0.95rem;color:#e4e4e7;line-height:1.7">Prenez <strong style="color:#fff">Canva</strong> si vos fichiers sont eux-mêmes le livrable : publications, flyers, présentations, newsletters, documents imprimés. Prenez <strong style="color:#fff">Figma</strong> si vos fichiers sont un plan que quelqu'un construira ensuite : site web, application, interface produit. Si vous faites les deux, prenez les deux et posez une frontière claire entre eux. Le montant en jeu est faible, le vrai coût d'une erreur est ailleurs : dans le temps perdu et dans une charte graphique qui se délite.</div>
</div>

## Ce que les deux outils sont devenus en 2026

Beaucoup de comparatifs décrivent encore Figma comme un outil de designers et Canva comme un outil de dépannage pour non-graphistes. Cette description était juste il y a trois ans. Elle ne l'est plus, parce que les deux entreprises ont passé l'année à entrer sur le terrain de l'autre.

**Figma est allé chercher les équipes marketing.** Un siège complet ne donne plus seulement accès à Figma Design : il ouvre aussi FigJam pour les ateliers, Slides pour les présentations, Sites pour publier des pages, Make pour générer des prototypes, et surtout Buzz, pensé pour que des personnes non graphistes produisent des visuels de campagne à partir de gabarits verrouillés par un designer. C'est une réponse frontale à Canva. À la conférence Config de juin 2026, l'éditeur a encore ajouté les calques de code, un moteur d'animation natif appelé Figma Motion et un agent capable de se connecter à des outils externes comme Notion, GitHub ou Excel.

**Canva est allé chercher les professionnels.** Lors de son événement Create d'avril 2026, l'entreprise a présenté ce qu'elle appelle un système d'exploitation créatif, avec un modèle d'IA entraîné sur la structure d'un design plutôt que sur la seule image, un éditeur vidéo refondu, un module de formulaires, un module d'emailing et Canva Grow pour piloter des campagnes publicitaires. Le point le plus marquant est ailleurs : Affinity, la suite professionnelle de photo, d'illustration vectorielle et de mise en page rachetée par Canva, est désormais proposée gratuitement. L'argument du logiciel amateur ne tient plus.

Résultat : les deux catalogues se ressemblent de plus en plus. C'est précisément pour cela qu'il faut arrêter de comparer les fonctionnalités et revenir à une question de fond.

## Le critère qui tranche : que devient le fichier ?

Posez-vous une seule question. Une fois le fichier terminé, est-ce lui que votre public verra, ou est-ce un plan que quelqu'un devra construire ?

___IMG:figma-canva-livrable-fini-vs-specification.webp___

Si le fichier **est** le livrable, vous êtes sur le terrain de Canva. Un post Instagram, une affiche A3, un flyer, une présentation commerciale, une newsletter, un rapport annuel : ce qui sort de l'outil part tel quel chez le lecteur. Ce qui compte alors, c'est la vitesse de production, la disponibilité de gabarits, les formats d'export et la facilité pour une personne non formée au design.

Si le fichier est une **spécification**, vous êtes sur le terrain de Figma. Une maquette de site, un écran d'application, un parcours d'inscription : personne ne verra jamais votre fichier. Il sert de référence à un développeur qui va le reconstruire en code. Ce qui compte alors, c'est la précision des mesures, la gestion des composants réutilisables, les états interactifs, les variantes responsive et la qualité de la transmission au développement.

Cette distinction explique une frustration très courante. Une entreprise conçoit son site dans Canva parce que c'est l'outil qu'elle connaît, puis découvre au moment de le faire développer que le fichier ne dit rien de ce dont le développeur a besoin : comportement en mobile, états au survol, règles d'espacement, composants qui se répètent. Le fichier était beau, mais ce n'était pas un plan. Nous détaillons ce qui se joue au moment du passage en développement dans notre [comparatif des technologies de site web](/blog/site-web-nextjs-vs-wordpress-webflow-2026).

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:0.4rem">LE TEST EN UNE QUESTION</div>
<div style="font-size:0.8rem;color:#9CA3AF;margin-bottom:1.4rem">Une fois le fichier terminé, est-ce lui que le public verra ?</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem">
<div style="padding:1.35rem;border-radius:12px;background:rgba(255,140,0,0.06);border:1px solid rgba(255,140,0,0.18)">
<div style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:#FF8C00;margin-bottom:0.6rem">OUI, C'EST LE LIVRABLE</div>
<div style="font-size:0.84rem;color:#e4e4e7;line-height:1.65;margin-bottom:1rem">Publication réseaux sociaux, flyer, affiche, présentation, newsletter, document imprimé. Le fichier part tel quel chez le lecteur.</div>
<div style="font-size:1.1rem;font-weight:700;color:#FF8C00">Canva</div>
</div>
<div style="padding:1.35rem;border-radius:12px;background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.18)">
<div style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:#A78BFA;margin-bottom:0.6rem">NON, C'EST UN PLAN</div>
<div style="font-size:0.84rem;color:#e4e4e7;line-height:1.65;margin-bottom:1rem">Site web, application, interface produit. Le fichier sert de référence à quelqu'un qui va le construire en code.</div>
<div style="font-size:1.1rem;font-weight:700;color:#A78BFA">Figma</div>
</div>
</div>
</div>

## Le deuxième critère : qui va s'en servir

Le premier critère détermine l'outil. Le second détermine si votre charte graphique va tenir.

Dans une PME, ce ne sont presque jamais des graphistes qui produisent les visuels du quotidien. C'est l'assistante de direction qui monte le flyer de la porte ouverte, le commercial qui adapte une présentation, la personne du marketing qui publie trois fois par semaine. Chacun fait de son mieux, et au bout de six mois la marque a dérivé : trois nuances d'orange, deux polices non prévues, un logo étiré.

L'outil ne règle pas ce problème. Le gabarit verrouillé, lui, le règle.

___IMG:figma-canva-gabarit-verrouille-charte-equipe.webp___

C'est le même mécanisme des deux côtés, et il vaut la peine de le comprendre avant de choisir. Dans Canva, un Brand Kit fixe les couleurs, les polices et les logos, et des modèles d'équipe permettent de restreindre ce qui est modifiable. Dans Figma, un designer construit des gabarits dans Buzz, puis l'équipe marketing remplit les textes et remplace les images sans pouvoir casser la mise en page. Dans les deux cas, la cohérence ne vient pas du logiciel : elle vient du fait que quelqu'un a préparé le terrain en amont.

C'est la question qu'il faut vous poser avant de payer quoi que ce soit : avez-vous quelqu'un pour construire ces gabarits ? Si oui, les deux outils fonctionnent. Si non, Canva a l'avantage de fournir une bibliothèque de modèles exploitables immédiatement, là où Figma part d'une page blanche.

## Le troisième critère : ce que ça coûte vraiment

C'est ici que les deux modèles divergent le plus, et c'est le point le plus souvent mal compris.

**Figma ne facture pas tout le monde au même prix.** L'offre est découpée en trois types de sièges, et vous n'attribuez un siège complet qu'aux personnes qui conçoivent réellement. Sur le plan Professional en tarif annuel, relevé sur la [page tarifaire officielle](https://www.figma.com/pricing/) le 31 août 2026, un siège Full est à 16 dollars par mois, un siège Dev à 12 dollars, et un siège Collab, qui donne le droit de commenter et d'utiliser FigJam, Slides et Buzz, à 3 dollars. Une équipe de dix personnes dont deux conçoivent ne paie donc pas dix sièges pleins.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:0.4rem">LES TROIS SIEGES FIGMA</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-bottom:1.5rem">Plan Professional, tarif annuel en dollars par mois, relevé sur figma.com le 31 août 2026. La facturation mensuelle est plus chère.</div>
<div style="margin-bottom:1.1rem">
<div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#e4e4e7;margin-bottom:0.35rem"><span>Siège Full, conçoit et édite tout</span><span style="color:#A78BFA;font-weight:600">16 $</span></div>
<div style="height:10px;border-radius:6px;background:rgba(255,255,255,0.05);overflow:hidden"><div style="width:100%;height:100%;border-radius:6px;background:#A78BFA"></div></div>
</div>
<div style="margin-bottom:1.1rem">
<div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#e4e4e7;margin-bottom:0.35rem"><span>Siège Dev, inspecte les maquettes</span><span style="color:#D4D4D8;font-weight:600">12 $</span></div>
<div style="height:10px;border-radius:6px;background:rgba(255,255,255,0.05);overflow:hidden"><div style="width:75%;height:100%;border-radius:6px;background:#D4D4D8"></div></div>
</div>
<div style="margin-bottom:1.4rem">
<div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#e4e4e7;margin-bottom:0.35rem"><span>Siège Collab, commente et utilise Buzz</span><span style="color:#4ade80;font-weight:600">3 $</span></div>
<div style="height:10px;border-radius:6px;background:rgba(255,255,255,0.05);overflow:hidden"><div style="width:19%;height:100%;border-radius:6px;background:#4ade80"></div></div>
</div>
<div style="font-size:0.8rem;color:#9CA3AF;line-height:1.6;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,0.07)">L'erreur classique consiste à ouvrir des sièges Full à toute l'équipe. Dans la plupart des PME, deux ou trois personnes ont réellement besoin d'un siège complet.</div>
</div>

**Canva facture à l'utilisateur, au même tarif pour tous.** L'offre gratuite couvre une personne qui publie de temps en temps. L'offre Pro vise un utilisateur unique et débloque le Brand Kit, le redimensionnement automatique et la bibliothèque complète. L'offre destinée aux équipes, renommée Business, est passée à une facturation par siège en septembre 2024 : le forfait unique qui couvrait cinq personnes a disparu, et le coût d'une petite équipe a nettement augmenté. L'offre Enterprise s'obtient sur devis, avec authentification unique et gestion centralisée.

Deux précisions utiles avant de budgéter. Les tarifs Canva ont bougé plusieurs fois depuis 2024 et varient selon la région, la devise et l'engagement : vérifiez le montant applicable à la Suisse sur la page officielle plutôt que de vous fier à un comparatif. Et si vous êtes une association ou une organisation à but non lucratif enregistrée, [Canva propose son offre gratuitement](https://www.canva.com/nonprofits/eligibility-guidelines/) jusqu'à 50 utilisateurs, ce qui change complètement le calcul.

## Le comparatif, critère par critère

| Critère | Canva | Figma |
|---|---|---|
| Nature du fichier produit | Livrable fini, prêt à publier | Plan destiné à être construit |
| Prise en main sans formation | Immédiate | Difficile sur Design, simple sur Buzz |
| Modèles prêts à l'emploi | Bibliothèque très large | Peu, tout se construit |
| Cohérence de marque | Brand Kit et modèles d'équipe | Design system et gabarits Buzz |
| Transmission au développement | Non prévue | C'est sa raison d'être |
| Structure de prix | Par utilisateur, tarif unique | Par siège, trois niveaux |
| Impression et grands formats | Solide, service d'impression intégré | Non prévu |
| Interface en français | Oui | Oui, depuis octobre 2025 |
| Point fort décisif | La vitesse de production en équipe | La précision et la réutilisation |

## Les situations où la réponse ne se discute pas

Certaines configurations ne demandent aucune analyse. Si vous vous reconnaissez dans l'une d'elles, le choix est déjà fait.

- **Vous êtes une PME de service sans produit numérique.** Restaurant, cabinet, commerce, artisan, institution. Vous produisez des visuels, pas des interfaces. Canva, et rien d'autre.
- **Vous refaites votre site avec une agence ou un développeur.** La maquette doit être exploitable en développement. Figma, y compris si c'est votre prestataire qui la produit et vous la partage.
- **Vous éditez un logiciel, une application ou une plateforme.** La question ne se pose pas, Figma est le standard de fait de votre secteur.
- **Vous avez une équipe marketing de plusieurs personnes et une charte à tenir.** Canva pour la production, avec un Brand Kit correctement configuré et des modèles verrouillés. C'est le paramétrage initial qui fait la différence, pas l'abonnement.
- **Vous êtes une association reconnue.** Commencez par déposer une demande auprès du programme à but non lucratif de Canva avant d'envisager le moindre paiement.

## Le vrai piège n'est pas de mal choisir

Après plusieurs années à installer ces outils chez des clients romands, nous constatons que l'erreur coûteuse n'est presque jamais le choix du logiciel. C'est l'absence de frontière entre les deux quand une entreprise finit par utiliser les deux, ce qui arrive très souvent.

Sans règle explicite, voilà ce qui se passe : quelqu'un refait un visuel dans Canva alors que le gabarit existe dans Figma, une deuxième version de la charte apparaît, et six mois plus tard plus personne ne sait quel fichier fait référence. Le désordre ne vient pas de l'outil en trop, il vient de la règle manquante.

La frontière qui fonctionne tient en une phrase. **Figma sert à concevoir ce qui sera construit ou ce qui définit la marque. Canva sert à produire le quotidien à partir de ce qui a été défini.** Les couleurs, les polices, les logos et les gabarits descendent de l'un vers l'autre, jamais l'inverse. Une entreprise qui pose cette règle le premier jour n'a plus jamais le problème.

## Ce qui fait vraiment la différence : la mise en route

Un point que nous répétons à chaque cadrage, parce qu'il est contre-intuitif. Ce n'est pas l'outil qui produit un résultat professionnel, c'est ce que vous faites pendant les deux premières semaines.

Une entreprise qui ouvre un compte Canva sans configurer son Brand Kit obtiendra des visuels génériques qui ne ressemblent pas à sa marque. Une entreprise qui ouvre Figma sans design system produira des maquettes qu'aucun développeur ne saura interpréter proprement. Dans les deux cas, l'abonnement est payé et le bénéfice n'arrive pas. C'est la raison pour laquelle nos accompagnements commencent toujours par le paramétrage sur vos propres fichiers, avant la première heure de prise en main.

C'est aussi pour cela que nous avons construit deux programmes distincts plutôt qu'une formation graphique généraliste : la [formation Figma](/formation-entreprise/figma) pour les équipes qui conçoivent des interfaces et travaillent avec des développeurs, et la [formation Canva](/formation-entreprise/canva) pour celles qui doivent produire vite et rester dans leur charte. Les deux se donnent en présentiel à Genève et en Suisse romande, sur vos supports réels.

## Questions fréquentes

### Canva peut-il remplacer Figma pour créer un site web ?

Pour une page simple sans besoin d'évolution, oui. Canva sait publier un site depuis un design. Mais vous obtenez une page hébergée chez Canva, pas un site que votre développeur pourra reprendre, optimiser et faire évoluer. Dès que le site devient un actif commercial, avec du référencement, des performances à tenir et des fonctionnalités qui s'ajoutent, la maquette Figma reprise en code reste la bonne voie.

### Figma est-il trop compliqué pour une personne non graphiste ?

Figma Design l'est, oui, et c'est normal : il est conçu pour concevoir des interfaces. Figma Buzz ne l'est pas, puisqu'il est fait pour que des personnes non graphistes remplissent des gabarits préparés par un designer. La vraie question n'est donc pas la difficulté de Figma, mais de savoir si quelqu'un chez vous va d'abord construire ces gabarits.

### Faut-il payer Canva quand la version gratuite existe ?

La version gratuite convient à une personne seule qui publie occasionnellement. Elle devient un problème dès qu'une équipe produit, parce que le Brand Kit, le partage de gabarits verrouillés et le redimensionnement automatique sont dans les offres payantes. Ce sont précisément les fonctions qui garantissent la cohérence de votre charte. Les associations et organisations à but non lucratif enregistrées peuvent obtenir l'accès gratuitement, jusqu'à 50 utilisateurs.

### Combien coûte Figma pour une équipe de dix personnes ?

Moins que ce que la plupart des gens estiment, parce que Figma ne facture pas tout le monde au même tarif. Sur le plan Professional en tarif annuel relevé le 31 août 2026, un siège Full est à 16 dollars par mois, un siège Dev à 12 dollars et un siège Collab à 3 dollars. Une équipe de dix personnes dont deux conçoivent réellement paie donc deux sièges pleins, pas dix.

### Que change la gratuité d'Affinity annoncée par Canva en 2026 ?

Elle supprime l'argument selon lequel Canva serait réservé aux visuels simples. Affinity, la suite professionnelle de retouche photo, d'illustration vectorielle et de mise en page rachetée par Canva, est désormais proposée gratuitement. Une PME dispose donc d'un outil de niveau professionnel sans abonnement Adobe, à côté de Canva pour la production courante.

### Peut-on utiliser les deux outils dans la même entreprise ?

C'est la configuration la plus fréquente, et souvent la plus saine. La règle qui évite le désordre est simple : Figma sert à concevoir ce qui sera construit ou ce qui définit la marque, Canva sert à produire le quotidien. Ce qui coûte cher, ce n'est pas de payer deux abonnements, c'est de laisser la charte se déliter parce que personne n'a fixé la frontière entre les deux.

## En résumé

Ne choisissez pas un logiciel graphique sur sa liste de fonctions : en 2026, elles se recouvrent largement. Choisissez-le sur ce que devient le fichier une fois terminé. Livrable prêt à publier, c'est Canva. Plan destiné à être construit, c'est Figma. Puis consacrez vos deux premières semaines au paramétrage de votre marque dans l'outil retenu, parce que c'est là que se joue l'écart entre un visuel qui vous ressemble et un visuel générique.

Si vous hésitez encore, le plus rapide est souvent de faire regarder vos supports actuels et votre organisation par quelqu'un qui connaît les deux outils. Nous le faisons lors d'un premier échange, sans engagement, depuis nos bureaux des Eaux-Vives à Genève.`,
}

export default article
