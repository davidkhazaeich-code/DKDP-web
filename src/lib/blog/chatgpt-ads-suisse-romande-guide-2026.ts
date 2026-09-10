import type { Article } from './types'

/**
 * Guide ChatGPT Ads pour les PME romandes, publié le 10 septembre 2026, dix
 * jours après l'ouverture de l'Ads Manager aux entreprises suisses. Faits,
 * dates et chiffres : `docs/chatgpt-ads-facts-2026-09-10.md` (pages OpenAI
 * relues le même jour). Aucun résultat de campagne n'est cité : OpenAI ne
 * publie pas de benchmark et DKDP n'en a pas encore.
 */
const article: Article = {
  slug: 'chatgpt-ads-suisse-romande-guide-2026',
  category: 'seo',
  title: 'ChatGPT Ads en Suisse romande : le guide 2026 pour les PME (prix, formats, éligibilité)',
  excerpt:
    "Depuis le 24 août 2026, ChatGPT affiche des annonces en Suisse, et les entreprises suisses peuvent ouvrir un compte Ads Manager depuis le 31 août. Qui voit les annonces, ce que coûte une campagne, quels secteurs sont acceptés, et comment lancer un pilote de 30 jours depuis Genève.",
  date: '10 septembre 2026',
  dateISO: '2026-09-10',
  readTime: '16 min',
  author: 'David Khazaei',
  heroImage: {
    src: '/images/blog/chatgpt-ads-suisse-romande-hero.webp',
    alt: 'ChatGPT Ads Suisse romande 2026 : commerçante genevoise qui consulte les résultats de sa campagne publicitaire ChatGPT sur son téléphone, dans sa boutique de la vieille ville',
  },
  images: [
    {
      src: '/images/blog/chatgpt-ads-carte-sponsorisee-sous-reponse.webp',
      alt: 'ChatGPT Ads : schéma de la carte sponsorisée affichée sous la réponse de ChatGPT sur mobile, avec les trois signaux mesurés, impression, clic et conversion, 2026',
      caption:
        'La seule place possible : sous la fin de la réponse, séparée, étiquetée. Une impression, un clic, une conversion sur votre site, c\'est tout ce que l\'annonceur voit.',
    },
    {
      src: '/images/blog/chatgpt-ads-eligibilite-secteurs-suisse.webp',
      alt: 'ChatGPT Ads Suisse : grille des secteurs acceptés en violet et des secteurs interdits ou soumis à validation en orange, selon les politiques publicitaires OpenAI du 31 août 2026',
      caption:
        'Huit familles de secteurs entrent, quatre restent à la porte ou attendent une validation manuelle. Hors États-Unis, la finance, la santé et le juridique en font partie.',
    },
  ],
  tags: ['ChatGPT Ads', 'OpenAI', 'Publicité', 'Ads Manager', 'PME', 'Genève', 'Suisse romande', '2026'],
  seoTitle: 'ChatGPT Ads en Suisse romande : guide 2026 pour les PME',
  seoDescription:
    "ChatGPT Ads en Suisse depuis le 31 août 2026 : qui voit les annonces, prix, secteurs acceptés, mesure et pilote de 30 jours à Genève.",
  faq: [
    {
      question: 'Combien coûte une campagne ChatGPT Ads en Suisse ?',
      answer:
        "Le budget média se règle directement à OpenAI, avec un minimum de CHF 20 par jour pour un compte facturé en francs et des enchères au clic qu'OpenAI recommande de démarrer entre 3 et 5 USD. La gestion se paie à part : chez DKDP, un pilote de 30 jours coûte CHF 1'200, puis la gestion mensuelle CHF 450, sans commission sur le budget.",
    },
    {
      question: 'Qui voit les publicités dans ChatGPT ?',
      answer:
        "Seulement les utilisateurs des forfaits Free et Go. Les abonnés Plus, Pro, Business, Enterprise et Edu n'en voient jamais, les comptes de moins de 18 ans non plus, et les chats temporaires restent sans annonce.",
    },
    {
      question: 'ChatGPT Ads remplace-t-il Google Ads ?',
      answer:
        "Non. Google Ads répond à une demande déjà formulée en mots-clés, avec un ciblage fin et vingt ans de benchmarks. ChatGPT Ads répond à une demande qui se construit dans une conversation, avec un seul format, un ciblage national et aucun benchmark public. Les deux se complètent, et la plupart des PME romandes ont intérêt à garder Google en socle.",
    },
    {
      question: 'Quels secteurs ne peuvent pas faire de publicité dans ChatGPT ?',
      answer:
        "Alcool, tabac, jeux d'argent, contenu politique, substances récréatives, contrefaçons, allégations de bien-être non étayées, annonces individuelles d'emploi ou de logement. Les services financiers, de santé et juridiques ne sont autorisés qu'au cas par cas aux États-Unis et sont généralement interdits ailleurs, Suisse comprise.",
    },
    {
      question: 'Peut-on cibler uniquement Genève avec ChatGPT Ads ?',
      answer:
        "Pas de façon garantie. Ads Manager cible par pays, et les zones plus fines ne sont documentées par OpenAI que pour les États-Unis. Pour toucher Genève, on écrit des cartes en français qui nomment la ville ou le quartier, on renvoie vers une page locale, et on décrit dans les indications de contexte ce que demandent les clients genevois.",
    },
    {
      question: 'Le référencement dans les réponses de ChatGPT suffit-il, sans payer ?',
      answer:
        "Être cité dans une réponse (ce qu'on appelle le GEO) et acheter une carte sponsorisée sont deux choses distinctes. La citation dépend de la qualité et de la clarté de vos pages, elle ne se commande pas et ne se mesure pas au clic. La carte sponsorisée se déclenche à la demande, se mesure au franc près, et s'arrête quand on arrête de payer. Les deux se cumulent.",
    },
  ],
  content: `Le 24 août 2026, ChatGPT a commencé à afficher des annonces en Suisse. Une semaine plus tard, le 31 août, OpenAI ouvrait son Ads Manager en libre-service aux entreprises de 31 marchés européens, Suisse comprise. Pour une PME romande, c'est la première fois qu'un canal publicitaire neuf s'ouvre à cette échelle depuis les réseaux sociaux, et il s'ouvre avec peu de concurrents.

Ce guide reprend ce qu'OpenAI a publié, page par page, au 10 septembre 2026 : qui voit les annonces, à quoi ressemble une carte sponsorisée, comment elle est choisie, ce que ça coûte, ce qui change en Suisse, quels secteurs sont acceptés, comment mesurer, et comment lancer un pilote sans se tromper de budget. Aucun chiffre de performance n'y figure, pour une raison simple : OpenAI n'en publie pas encore, et personne en Suisse romande n'a le recul pour en donner.

## ChatGPT Ads, c'est quoi exactement ?

Une annonce ChatGPT est une **carte sponsorisée** qui apparaît sous la fin d'une réponse. Elle contient six éléments : le nom de l'annonceur, son favicon, un titre, un texte de description, une image et un lien vers une page de destination. Elle est étiquetée comme sponsorisée et séparée visuellement de la réponse.

Trois règles d'OpenAI structurent tout le reste :

- **Les annonces n'influencent pas les réponses.** Elles tournent sur un système séparé du modèle, et les annonceurs ne peuvent ni orienter, ni classer, ni modifier ce que ChatGPT écrit.
- **Les conversations ne sont jamais transmises aux annonceurs.** L'annonceur reçoit des chiffres agrégés (impressions, clics, conversions), jamais un échange, un historique ou une mémoire.
- **Une annonce n'est pas une recommandation.** L'utilisateur peut la masquer, la signaler, demander pourquoi elle lui est montrée, ou la partager avec ChatGPT pour lui poser des questions dessus.

Il n'existe pour l'instant qu'un seul format. Pas de vidéo, pas de formulaire dans ChatGPT : le clic mène sur votre site, et c'est là que la conversion se joue. Ce point compte plus qu'il n'y paraît, on y revient dans la partie sur la mesure.

## Sept mois de déploiement : les dates qui comptent pour la Suisse

OpenAI a avancé par paliers, en publiant à chaque étape ce qu'il constatait. Voici la chronologie telle qu'elle ressort de ses annonces.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(124,58,237,0.20);background:rgba(124,58,237,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.2rem">Du test américain à l'ouverture suisse</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:0.9rem">
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#A78BFA;margin-bottom:0.35rem">9 février 2026</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Test aux États-Unis</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.4">Forfaits Free et Go, adultes seulement</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#A78BFA;margin-bottom:0.35rem">26 mars 2026</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Canada, Australie, Nouvelle-Zélande</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.4">Aucun impact mesuré sur la confiance des utilisateurs</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#A78BFA;margin-bottom:0.35rem">5 mai 2026</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Ads Manager en libre-service</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.4">Enchères au clic, Conversions API, pixel</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02)"><div style="font-size:0.72rem;font-weight:700;color:#A78BFA;margin-bottom:0.35rem">Mai à août 2026</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Royaume-Uni, Mexique, Brésil, Japon, Corée</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.4">Cinq marchés de plus</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(255,140,0,0.35);background:rgba(255,107,0,0.06)"><div style="font-size:0.72rem;font-weight:700;color:#FF8C00;margin-bottom:0.35rem">24 août 2026</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Premières annonces en Suisse</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.4">31 marchés européens, via l'équipe OpenAI et les agences partenaires</div></div>
<div style="padding:1rem;border-radius:12px;border:1px solid rgba(124,58,237,0.45);background:rgba(124,58,237,0.12)"><div style="font-size:0.72rem;font-weight:700;color:#A78BFA;margin-bottom:0.35rem">31 août 2026</div><div style="font-size:0.85rem;color:#e4e4e7;font-weight:600;line-height:1.3">Les entreprises suisses entrent</div><div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.35rem;line-height:1.4">Ads Manager ouvert dans les 31 marchés, Suisse listée comme disponible</div></div>
</div>
</div>

Deux détails de cette chronologie sont utiles pour décider. D'abord, OpenAI parle encore de **bêta** : ses propres pages annoncent que les formats, l'inventaire et les outils vont bouger, et que la dépense peut fluctuer d'un jour à l'autre. Ensuite, le passage de « via des agences partenaires » à « en libre-service » en treize jours signifie que le canal est pensé pour les PME, pas seulement pour les grands comptes. Une PME genevoise peut ouvrir son compte elle-même, sans passer par Publicis ou WPP.

## Qui voit les annonces, et qui ne les verra jamais

C'est le point que la plupart des articles enjambent, et c'est pourtant celui qui décide si le canal vaut un franc pour votre activité.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(124,58,237,0.20);background:rgba(124,58,237,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1.2rem">Annonces par forfait ChatGPT, septembre 2026</div>
<div style="display:flex;flex-direction:column;gap:0.6rem">
<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.18)"><span style="color:#e4e4e7;font-size:0.9rem;font-weight:600">Free</span><span style="color:#4ade80;font-size:0.8rem;font-weight:700">Oui, sauf option « sans publicité » à limites réduites</span></div>
<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.18)"><span style="color:#e4e4e7;font-size:0.9rem;font-weight:600">Go (8 USD par mois)</span><span style="color:#4ade80;font-size:0.8rem;font-weight:700">Oui</span></div>
<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08)"><span style="color:#e4e4e7;font-size:0.9rem;font-weight:600">Plus, Pro</span><span style="color:#71717a;font-size:0.8rem;font-weight:700">Jamais</span></div>
<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08)"><span style="color:#e4e4e7;font-size:0.9rem;font-weight:600">Business, Enterprise, Edu</span><span style="color:#71717a;font-size:0.8rem;font-weight:700">Jamais</span></div>
<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:0.75rem 1rem;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08)"><span style="color:#e4e4e7;font-size:0.9rem;font-weight:600">Moins de 18 ans, chats temporaires, navigateur Atlas</span><span style="color:#71717a;font-size:0.8rem;font-weight:700">Jamais</span></div>
</div>
</div>

Concrètement, une boutique, un restaurant, un studio de sport, une école de langues ou un site e-commerce parle à une audience très large : la majorité des gens utilisent ChatGPT gratuitement. À l'inverse, une société qui vend à des directeurs financiers, des DRH ou des responsables informatiques vise des personnes qui sont souvent sur Plus, Business ou Enterprise, donc dans un ChatGPT sans annonces. Le canal n'est pas fermé au B2B, les indépendants et les petites structures y sont, mais il faut le tester en sachant ce qu'on mesure.

___IMG:chatgpt-ads-carte-sponsorisee-sous-reponse.webp___

## Comment ChatGPT choisit l'annonce : des indications de contexte, pas des mots-clés

Sur Google, on achète des mots-clés. Sur ChatGPT, on décrit des situations. Au niveau du groupe d'annonces, l'annonceur fournit des **context hints**, des indications de contexte : les conversations, les sujets ou les mots où son offre peut être utile. OpenAI précise que ce ne sont pas des mots-clés en correspondance exacte et qu'ils ne garantissent aucune diffusion dans une conversation donnée.

Le système de sélection combine plusieurs signaux : le contexte et l'intention de la conversation en cours, la page de destination, le titre et le texte de l'annonce, les indications de contexte, les ciblages choisis, et, seulement si la personnalisation est activée, des signaux de l'expérience ChatGPT au sens large. Puis une **enchère au second prix pondérée par la pertinence** départage les annonces éligibles. Traduction pour une PME : une carte bien écrite et une page de destination qui correspond vraiment à la demande pèsent autant que l'enchère.

En Suisse, ce mécanisme a une particularité qu'on détaille plus bas : au lancement, la personnalisation n'est pas disponible. Seule la conversation en cours compte.

## Combien ça coûte : objectifs, enchères et budget minimum

Une campagne ChatGPT Ads a deux coûts distincts, et il faut les séparer dès le départ.

**Le budget média**, versé à OpenAI. Trois objectifs existent : Reach (facturé aux mille impressions), Clicks (facturé au clic valide) et Conversions, en deux variantes, facturée au clic (oCPC) ou à l'impression (oCPM, encore en bêta). L'enchère maximale se fixe au niveau du groupe d'annonces. Pour démarrer au clic, **OpenAI recommande une enchère de 3 à 5 USD**. Pour les campagnes optimisées conversions, OpenAI écrit noir sur blanc qu'il n'y a pas d'enchère recommandée à ce stade.

Le budget se règle en montant quotidien ou en total de campagne. Pour un compte facturé en francs, **le budget quotidien minimum est de CHF 20**. Le budget quotidien est une moyenne sur sept jours : un jour donné peut dépenser jusqu'au double, et la semaine ne dépasse jamais sept fois le montant. OpenAI conseille aux nouveaux comptes de démarrer en budget quotidien plutôt qu'en budget total, pour observer la diffusion avant de s'engager.

Deux points de facturation à connaître avant d'ouvrir un compte : le paiement se fait **par carte de crédit, après diffusion**, selon un seuil de paiement attribué par OpenAI (le solde restant est débité en fin de mois), et une annonce mise en pause peut encore être diffusée jusqu'à 24 heures, ces coûts restant dus.

**La gestion**, si vous la confiez à une agence. C'est le poste que vous contrôlez. Chez DKDP, un [pilote ChatGPT Ads de 30 jours](/agence-digitale/chatgpt-ads#tarifs) coûte CHF 1'200, puis la gestion mensuelle CHF 450, sans commission sur le budget média, avec un compte qui reste au nom du client.

Ce qu'on ne peut pas vous dire, et que personne ne peut vous dire honnêtement en septembre 2026 : combien coûtera un clic dans votre secteur en Suisse. OpenAI l'écrit dans sa propre FAQ, la plateforme n'a pas encore de benchmarks par annonceur, par secteur ou par type de campagne. C'est précisément la raison d'être d'un pilote.

## Ce qui change en Suisse et en Europe

Quatre différences avec le marché américain, toutes documentées par OpenAI.

**Pas de personnalisation au lancement.** OpenAI indique que les annonces personnalisées ne sont pas disponibles initialement dans l'Espace économique européen et en Suisse. L'historique des conversations et la mémoire ne servent donc pas à choisir une annonce : seuls comptent le sujet de la conversation en cours, une localisation générale ou la langue, et l'appareil. Pour l'annonceur, cela signifie que la carte doit être bonne à la première lecture, sans compter sur un retargeting.

**Une entité juridique du pays.** Pour utiliser Ads Manager en libre-service, l'entité qui annonce et qui est facturée doit être établie dans un pays listé comme disponible. La Suisse l'est. Le pays, la devise et le fuseau horaire choisis à la création du compte sont définitifs, et la carte de paiement doit correspondre à ce pays.

**Le client crée son compte, pas l'agence.** OpenAI l'écrit sans ambiguïté : une agence ne peut pas créer un compte annonceur pour le compte de son client. Le client ouvre le compte avec un compte OpenAI, renseigne son entreprise, passe une vérification d'identité, ajoute une carte, puis invite l'agence comme membre. La revue du compte par OpenAI se fait dans une file d'attente que personne ne peut accélérer. Bonne nouvelle pour la PME : le compte, les données et l'historique lui appartiennent, quoi qu'il arrive à la relation avec son prestataire.

**Un ciblage par pays.** Ads Manager cible par pays au niveau de la campagne. Les zones plus fines (régions, villes, codes postaux) ne sont documentées que pour les États-Unis, et OpenAI précise que leur disponibilité varie selon les pays. Au 10 septembre 2026, rien ne garantit un ciblage « Genève » ou « Vaud ». On peut en revanche cibler la plateforme (application iOS, Android ou web) et importer des listes de clients, avec un seuil de 25'000 contacts appariés pour les utiliser en inclusion, ce qui réserve cet usage aux grandes bases. Pour une PME romande, l'usage réaliste des listes est l'exclusion de ses clients existants.

## Secteurs acceptés, secteurs interdits

Les politiques publicitaires d'OpenAI (version 1.5, datée du 31 août 2026) sont claires sur ce qui entre et ce qui reste dehors pendant la période de test.

___IMG:chatgpt-ads-eligibilite-secteurs-suisse.webp___

**Acceptés en priorité** : les biens de consommation et ménagers, les services locaux, les voyages et expériences, les produits numériques et l'éducation. C'est le cœur de cible d'une agence à Genève : commerces, restaurants, hôtels, artisans, studios, écoles, logiciels et formations.

**Sur validation manuelle, aux États-Unis seulement** : les services financiers, la santé et le juridique. Hors États-Unis, OpenAI les déclare généralement interdits. Une banque privée, une clinique ou une étude d'avocats genevoise ne peut pas compter sur ce canal sans validation préalable, et ce n'est pas une question de budget.

**Interdits** : alcool et tabac, jeux d'argent, contenu politique, substances récréatives, contrefaçons, allégations de bien-être non étayées, annonces individuelles d'emploi ou de logement. Une plateforme d'annonces immobilières ou d'offres d'emploi reste possible tant que l'annonce ne renvoie pas vers une offre précise.

À cela s'ajoute la règle du placement : aucune annonce n'apparaît près d'une conversation sensible (santé personnelle, santé mentale, politique, détresse) ni dans un contexte à risque pour la marque. Votre carte ne s'affichera jamais à côté d'un échange où elle ferait tache.

## Écrire des cartes qui marchent

OpenAI publie ses bonnes pratiques, et elles vont à l'encontre de deux réflexes venus de Google Ads.

Premier réflexe à désapprendre : une annonce parfaite. OpenAI recommande de **construire pour la couverture** : plusieurs variations de titre et de texte par offre, chacune avec un angle différent, pour multiplier les conversations où l'annonce peut être pertinente. Six à huit cartes par offre est un bon point de départ.

Deuxième réflexe : le slogan. OpenAI demande un texte **orienté bénéfice** : la valeur pratique, pour qui, quand c'est utile. « Pilates du soir dès 18h45, séance d'essai offerte, à cinq minutes de la gare des Eaux-Vives » bat « Retrouvez votre équilibre » à tous les coups, parce que la première phrase répond à une conversation réelle. Même logique pour une pizzeria (« table pour six ce soir, réservation en ligne »), un concept store (« livré en 24 h à Lausanne, emballage cadeau offert ») ou une entreprise de nettoyage de bureaux (« devis après visite sous 48 h ») : la carte répond à la question telle qu'elle a été posée.

Trois autres règles, plus techniques :

- **Le titre annonce, le texte complète.** Pas de répétition entre les deux.
- **La page de destination est la plus précise possible** : la page produit, la page de la prestation, jamais la page d'accueil par défaut. Elle doit rester accessible aux robots OAI-AdsBot et OAI-SearchBot, sinon l'annonce est refusée.
- **Les images sont simples et lisibles**, alignées sur le message. Un visuel abstrait ou chargé n'aide pas.

Pour une PME de Suisse romande, on ajoute une règle locale : **écrire en français, nommer la ville ou le quartier, et prévoir un groupe d'annonces en allemand** si l'activité s'étend outre-Sarine. Le ciblage étant national, la langue et le message font le travail que le ciblage géographique ne fait pas.

## Mesurer : pixel, Conversions API, UTM, et le consentement nLPD

Ads Manager rapporte les impressions, les clics, la dépense, le taux de clic, le CPC moyen, le CPM moyen et les conversions. Pour que la dernière colonne se remplisse, il faut installer une mesure, et OpenAI propose deux voies complémentaires.

**L'OpenAI Pixel**, un script sur votre site, qui remonte les événements depuis le navigateur du visiteur : page vue, contact envoyé, achat. **La Conversions API**, côté serveur, qui envoie les mêmes événements depuis votre serveur, avec un identifiant commun pour que rien ne soit compté deux fois. Le pixel porte le contexte du clic publicitaire, donc l'attribution ; l'API résiste aux bloqueurs de publicité et aux onglets fermés trop vite. Les deux ensemble donnent la mesure la plus fiable. C'est le montage que DKDP a posé sur son propre site le 10 septembre 2026.

À cela s'ajoutent les **paramètres UTM** dans l'URL de chaque carte : ils sont conservés au clic et permettent de retrouver le trafic ChatGPT dans GA4, à côté de Google et des réseaux sociaux.

Un point que les guides oublient : **le pixel dépose un cookie**. C'est un traceur au sens de la nLPD et du RGPD, il passe donc par votre bandeau de consentement, comme le pixel Meta ou la balise Google Ads. Si votre gestion des cookies n'est pas en ordre, c'est le moment de la revoir, [nous avons une page dédiée à ce sujet](/agence-digitale/rgpd-cookies). Pour aller plus loin sur les données et l'IA, notre article sur [la protection des données à l'ère de l'IA pour les PME suisses](/blog/protection-donnees-ia-nlpd-pme-suisse) pose le cadre.

## Google Ads ou ChatGPT Ads ?

La question revient à chaque cadrage, et la réponse tient en une phrase : Google capte une demande déjà formulée, ChatGPT capte une demande qui se construit.

Sur Google, la personne tape « physiothérapeute Carouge » : elle sait ce qu'elle veut, l'annonce n'a qu'à être là. Sur ChatGPT, elle écrit « j'ai mal au dos depuis que je télétravaille, qu'est-ce que je devrais faire » : elle explore, compare, hésite, et la carte sponsorisée arrive au moment où une option se dessine. Les deux moments existent dans le parcours du même client, à des étapes différentes.

En pratique, pour une PME romande, Google Ads reste le socle, parce que le ciblage est fin, la mesure est mature et les benchmarks existent. ChatGPT Ads s'ajoute par-dessus, en pilote d'abord, pour capter ce que Google ne voit pas. Notre comparatif [SEO ou Google Ads à Genève](/blog/seo-vs-google-ads-geneve) pose déjà cette logique de complémentarité ; ChatGPT Ads y ajoute une troisième couche.

## Et le GEO ? Être cité gratuitement dans les réponses

Il existe une autre façon d'apparaître dans ChatGPT : être **cité dans la réponse elle-même**, quand le modèle s'appuie sur votre site pour répondre. C'est le champ du GEO, l'optimisation pour les moteurs génératifs, que nous traitons dans notre [service SEO et visibilité dans les IA](/agence-digitale/seo).

Les deux ne se confondent pas. La citation dépend de la qualité, de la clarté et de la structure de vos pages ; elle ne se commande pas, ne se mesure pas au clic, et met des mois à se construire. La carte sponsorisée se déclenche à la demande, se mesure au franc près, et s'arrête quand on arrête de payer. Une PME sérieuse travaille les deux : la citation pour la présence durable, l'annonce pour l'accélération mesurable. Et une page de destination écrite pour être citée par une IA est aussi, par construction, une bonne page de destination pour une carte sponsorisée.

## Un pilote de 30 jours depuis Genève : budget, attentes, décision

Voici comment DKDP aborde un premier mois sur ChatGPT Ads, avec les règles qu'on vient de voir.

1. **Cadrage et éligibilité.** Votre secteur est-il accepté ? Votre page de destination est-elle précise, rapide, ouverte aux robots d'OpenAI ? Quel événement compte comme une conversion : un formulaire, un appel, une réservation ?
2. **Compte et mesure.** Vous créez le compte Ads Manager à votre nom, nous sommes invités dessus. Pixel et Conversions API, UTM, bandeau de consentement vérifié.
3. **Cartes et indications de contexte.** Six à huit cartes par offre, en français, chacune avec un angle. Un groupe d'annonces en allemand si nécessaire.
4. **Trente jours en objectif Clicks**, enchère de départ entre 3 et 5 USD, ajustements chaque semaine, budget média entre CHF 600 et 1'500 pour le mois.
5. **Rapport et décision.** Ce qui a été dépensé, cliqué, converti, et le coût par contact. Go, no-go, ou go avec un autre budget.

Trente jours suffisent pour savoir si le canal parle à vos clients, pas pour bâtir une machine. C'est le bon ordre : d'abord la preuve, ensuite la montée en charge, jamais l'inverse. Le détail des formules et un simulateur de budget sont sur notre [page ChatGPT Ads pour Genève et la Suisse romande](/agence-digitale/chatgpt-ads).

## Questions fréquentes

**Combien coûte une campagne ChatGPT Ads en Suisse ?**
Le budget média se règle directement à OpenAI, avec un minimum de CHF 20 par jour pour un compte facturé en francs et des enchères au clic qu'OpenAI recommande de démarrer entre 3 et 5 USD. La gestion se paie à part : chez DKDP, un pilote de 30 jours coûte CHF 1'200, puis la gestion mensuelle CHF 450, sans commission sur le budget.

**Qui voit les publicités dans ChatGPT ?**
Seulement les utilisateurs des forfaits Free et Go. Les abonnés Plus, Pro, Business, Enterprise et Edu n'en voient jamais, les comptes de moins de 18 ans non plus, et les chats temporaires restent sans annonce.

**ChatGPT Ads remplace-t-il Google Ads ?**
Non. Google Ads répond à une demande déjà formulée en mots-clés, avec un ciblage fin et vingt ans de benchmarks. ChatGPT Ads répond à une demande qui se construit dans une conversation, avec un seul format, un ciblage national et aucun benchmark public. Les deux se complètent, et la plupart des PME romandes ont intérêt à garder Google en socle.

**Quels secteurs ne peuvent pas faire de publicité dans ChatGPT ?**
Alcool, tabac, jeux d'argent, contenu politique, substances récréatives, contrefaçons, allégations de bien-être non étayées, annonces individuelles d'emploi ou de logement. Les services financiers, de santé et juridiques ne sont autorisés qu'au cas par cas aux États-Unis et sont généralement interdits ailleurs, Suisse comprise.

**Peut-on cibler uniquement Genève avec ChatGPT Ads ?**
Pas de façon garantie. Ads Manager cible par pays, et les zones plus fines ne sont documentées par OpenAI que pour les États-Unis. Pour toucher Genève, on écrit des cartes en français qui nomment la ville ou le quartier, on renvoie vers une page locale, et on décrit dans les indications de contexte ce que demandent les clients genevois.

**Le référencement dans les réponses de ChatGPT suffit-il, sans payer ?**
Être cité dans une réponse (ce qu'on appelle le GEO) et acheter une carte sponsorisée sont deux choses distinctes. La citation dépend de la qualité et de la clarté de vos pages, elle ne se commande pas et ne se mesure pas au clic. La carte sponsorisée se déclenche à la demande, se mesure au franc près, et s'arrête quand on arrête de payer. Les deux se cumulent.

## Ce qu'il faut retenir

ChatGPT Ads est ouvert aux PME suisses depuis le 31 août 2026, avec un format unique, une audience limitée aux forfaits gratuits et Go, un ciblage national, un budget d'entrée à CHF 20 par jour et une mesure sérieuse par pixel et API. Le canal est jeune, sans benchmark, et c'est justement ce qui le rend intéressant pour qui teste maintenant, avec un budget borné et une mesure propre.

Si votre activité vend au grand public en Suisse romande, un pilote de 30 jours répond à la seule question qui compte : est-ce que vos clients sont dans ces conversations, et combien coûte le fait d'y être. Pour en parler, [lancez un pilote ChatGPT Ads avec DKDP](/agence-digitale/chatgpt-ads), ou lisez d'abord [ce que ChatGPT Astra (GPT-6) change pour les PME romandes](/blog/chatgpt-astra-gpt-6-pme-romandes-2026) : c'est la même plateforme, vue du côté de l'utilisateur.`,
}

export default article
