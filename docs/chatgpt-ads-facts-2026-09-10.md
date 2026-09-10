# Fiche de faits : ChatGPT Ads et OpenAI Ads Manager, état au 10 septembre 2026

Cette fiche est la SEULE source autorisée pour les faits, chiffres et dates de la page
`/agence-digitale/chatgpt-ads`, de son miroir EN, de l'article compagnon, de la FAQ, du
glossaire et du prompt du chatbot. Tout ce qui n'y figure pas ne doit pas être affirmé.
Les pages OpenAI ont été relues dans Chrome le 10 septembre 2026 (openai.com et le centre
d'aide help.openai.com bloquent les lecteurs automatiques, passer par un vrai navigateur).

## Règles d'écriture (obligatoires)

- Jamais de tiret cadratin « — » ni demi-cadratin « – » dans le texte visible. Jamais d'emoji.
- « IA » en français. Noms exacts : « ChatGPT Ads » (le canal), « Ads Manager » ou « OpenAI Ads
  Manager » (l'outil, en bêta), « OpenAI Pixel », « Conversions API », « context hints » (on
  peut écrire « indications de contexte » en explication), « Free » et « Go » (les forfaits).
- Vouvoiement. Ton DKDP : direct, concret, expert. Aucun chiffre hors de cette fiche.
- Aucun logo OpenAI ou ChatGPT dans les visuels, aucune interface reproduite au pixel.
- Ne jamais promettre un résultat chiffré (clics, coût par contact, ventes) : le canal a
  moins d'un an et OpenAI ne publie aucun benchmark. Le simulateur de la page rend une
  estimation explicitement indicative.

## Calendrier vérifié (sources OpenAI)

| Date | Fait | Source |
|---|---|---|
| 9 février 2026 | Début du test aux États-Unis, utilisateurs adultes des forfaits Free et Go | openai.com/index/testing-ads-in-chatgpt |
| 26 mars 2026 | Bilan positif du pilote (aucun impact sur les indicateurs de confiance, faible taux de rejet), extension annoncée au Canada, à l'Australie et à la Nouvelle-Zélande | même page, mise à jour du 26.03 |
| 5 mai 2026 | Ads Manager en libre-service (bêta) : inscription, paiement, budgets, enchères, pacing, annonces, rapports. Enchères CPC ajoutées au CPM. Conversions API et mesure par pixel « récemment lancées ». Partenaires agences : Dentsu, Omnicom, Publicis, WPP ; partenaires technologiques : Adobe, Criteo, Kargo, Pacvue, StackAdapt | openai.com/index/new-ways-to-buy-chatgpt-ads |
| 7 mai puis 11 août 2026 | Royaume-Uni, Mexique, Brésil, Japon, Corée du Sud | testing-ads-in-chatgpt, mises à jour |
| 18 août 2026 | Annonce de l'extension à 31 marchés européens « la semaine prochaine » (Allemagne, France, Espagne, Italie, Suède, Norvège, Danemark, Pays-Bas, Autriche cités), d'abord via l'équipe Ads Solutions d'OpenAI, les agences partenaires et les partenaires technologiques. « Des dizaines de milliers de spécialistes du marketing ont déjà diffusé des publicités sur ChatGPT » | openai.com/index/chatgpt-ads-expands-across-europe |
| 24 août 2026 | Premières annonces servies dans les 31 marchés européens, Suisse comprise (date donnée par la presse spécialisée, OpenAI dit « la semaine prochaine » le 18 août) | Search Engine Roundtable, Digiday, relevantaudience.com |
| 31 août 2026 | « L'accès en libre-service à ChatGPT Ads via Ads Manager est désormais disponible dans les 31 marchés européens ». Inscription sur ads.openai.com. Politiques publicitaires v1.5 datées du même jour | même page, mise à jour du 31.08 ; openai.com/policies/ad-policies |
| 10 septembre 2026 | La Suisse figure « Available » dans la table « Ads Manager Availability » du centre d'aide (mise à jour trois jours avant), avec 52 pays dont l'Allemagne, la France, l'Italie, l'Autriche, le Liechtenstein, la Norvège, l'Islande, le Royaume-Uni, les États-Unis | help.openai.com/en/articles/20001245 |

Six mois se sont écoulés entre le premier test américain et l'ouverture européenne.

## Qui voit les annonces

- Les annonces s'affichent pour les utilisateurs des forfaits **Free** et **Go**. Les forfaits
  Plus, Pro, Business, Enterprise et Edu n'ont pas de publicité (centre d'aide « Ads in
  ChatGPT » ; l'annonce Europe cite Plus, Pro et Enterprise).
- Aucune annonce pour les comptes identifiés comme appartenant à des moins de 18 ans (âge
  déclaré et prédiction d'âge).
- Aucune annonce dans les chats temporaires, ni dans le navigateur ChatGPT Atlas pendant le
  test.
- Les utilisateurs Free peuvent choisir une expérience « sans publicité » en échange de limites
  d'usage réduites (moins de messages, pas de génération d'images ni de recherche approfondie).
- ChatGPT est « utilisé par des centaines de millions de personnes » (formulation OpenAI). Ne
  pas écrire « un milliard d'utilisateurs hebdomadaires » sur la page : chiffre de presse, non
  repris par OpenAI dans les pages relues.

## Format

- L'annonce apparaît **sous la fin de la réponse**, clairement étiquetée comme sponsorisée et
  séparée visuellement de la réponse. Une ou plusieurs unités peuvent apparaître, une unité
  peut porter un ou plusieurs éléments d'un annonceur, ou plusieurs annonceurs.
- Chaque annonce contient : le nom de l'annonceur, le favicon (logo), un titre, un texte
  (description), une page de destination, une image.
- Les annonces n'influencent pas les réponses : « ads run on separate systems from our chat
  model », les annonceurs ne peuvent ni orienter, ni classer, ni modifier les réponses.
- L'utilisateur peut masquer une annonce, la signaler, voir pourquoi elle est affichée, ou la
  partager avec ChatGPT (« Ask ChatGPT ») ; par défaut ChatGPT ne voit pas les annonces
  affichées.
- Une annonce n'est pas une recommandation d'OpenAI.

## Sélection et enchère

- Signaux de sélection : contexte et intention de la conversation en cours, page de
  destination, titre et texte de l'annonce, **context hints** et ciblages fournis par
  l'annonceur, et, seulement si la personnalisation est activée, des signaux de l'expérience
  ChatGPT au sens large (conversations passées, mémoire, interactions avec les annonces).
- Les context hints se définissent **au niveau du groupe d'annonces** et décrivent les
  conversations, sujets ou mots-clés où l'offre peut être utile. Ce ne sont **pas des mots-clés
  en correspondance exacte** et ils ne garantissent aucune diffusion dans une conversation
  donnée.
- Enchère **au second prix pondérée par la pertinence** (« relevance-weighted, second-price
  auction »). Le classement combine pertinence et enchère.
- Ads Manager peut afficher une indication de force d'enchère (compétitive ou limitante).

## Objectifs, enchères, budgets

- Deux modes d'achat documentés dans « The Basics » : **Reach** (optimise les impressions,
  paiement au CPM) et **Clicks** (optimise les clics, paiement au clic valide). L'annonce
  Europe du 18 août ajoute que la plateforme est « allée au-delà des enchères au CPM et au CPC
  pour prendre en charge **l'optimisation des conversions** » ; le centre d'aide a un article
  « Conversion-optimized Campaigns » (facturation au clic ou à l'impression) et une stratégie
  « Maximize results ».
- L'enchère maximale se fixe au niveau du groupe d'annonces : CPM max pour Reach, CPC max pour
  Clicks. **Recommandation OpenAI pour démarrer en CPC : 3 à 5 USD par clic.**
- Budgets : budget quotidien (moyenne sur 7 jours, la dépense varie d'un jour à l'autre) ou
  budget total de campagne avec pacing ; sans date de fin, période de pacing par défaut de
  60 jours, maximum 365 jours. Le pacing ne garantit ni une dépense égale ni la dépense
  complète du budget. Des enchères basses peuvent limiter la diffusion.
- **Budget quotidien minimum : CHF 20 pour un compte facturé en francs** (table « Minimum
  Campaign Spend » de l'article « Create Campaigns », relue le 10.09.2026 ; 15 EUR, 25 USD,
  15 GBP). Le budget quotidien est une moyenne sur sept jours : la dépense d'un jour peut
  monter jusqu'au double, et la semaine ne dépasse pas sept fois le budget quotidien.
- Objectifs documentés dans « Create Campaigns » : CPM (portée), CPC (clics), oCPC
  (conversions, facturé au clic) ; oCPM (conversions, facturé à l'impression) en bêta. Une
  campagne optimisée conversions porte un seul événement standard, et ni l'objectif, ni le
  mode de facturation, ni l'événement ne se changent après création. OpenAI : « there is no
  recommended bid amount at this time » pour les campagnes conversions.
- Structure : campagne (objectif, budget, dates, pays, plateformes, audiences) → groupes
  d'annonces (enchères, context hints, multiplicateurs d'audience) → annonces (titre, texte,
  image, lien). Import en masse possible (« Bulk Upload »), campagnes depuis un flux produits
  (« Create Campaigns from Product Feeds »). Conseil OpenAI aux nouveaux comptes : démarrer en
  budget quotidien plutôt qu'en budget total.
- Facturation (article « Billing & Payment ») : postpaiement par carte de crédit, seuil de
  paiement attribué par OpenAI (débit dès que le seuil est atteint, et solde débité en fin de
  mois), empreinte temporaire de 50 ou 100 USD à l'ajout de la carte, numéro de TVA ajoutable
  dans le profil de facturation, carte et adresse dans le pays du compte. Une annonce en pause
  peut encore être diffusée jusqu'à 24 heures et reste facturable.

## Ciblage

- Géographique : ciblage par pays au niveau de la campagne ; aux États-Unis, États, DMA et
  codes postaux. La FAQ de « Create Campaigns » dit que des zones plus fines (régions, villes,
  codes postaux) existent « where available » et que « location availability may vary by
  country », à vérifier dans le sélecteur de lieux au moment de créer la campagne (catalogue
  CSV téléchargeable). **Au 10.09.2026 rien ne garantit un ciblage par ville en Suisse** :
  écrire « ciblage par ville non garanti en Suisse, la localité se joue dans la langue, le
  message, la page de destination et les context hints ». Ne pas promettre « cibler uniquement
  Genève ».
- **Audiences personnalisées** (« custom audiences », article dédié relu le 10.09.2026) :
  listes de clients ou prospects (e-mails, téléphones, versions hachées SHA-256, GAID), en
  inclusion, exclusion ou multiplicateur d'enchère (0,1x à 10x) au niveau du groupe. **Minimum
  25'000 contacts appariés pour l'inclusion et les multiplicateurs, 100'000 recommandés** ; en
  dessous de 25'000, exclusion seulement. Fichier supprimé après traitement (moins de 24 h),
  traitement en 20 à 30 minutes. Pour une PME romande, l'usage réaliste est l'exclusion des
  clients existants.
- Plateformes : application iOS, application Android, web (ordinateur et mobile). Pas de
  ciblage démographique côté annonceur.
- Retargeting et audiences similaires : non documentés, ne pas les promettre.

## Mesure

- Rapports Ads Manager (bêta) : impressions, clics, dépense, CTR, CPC moyen, CPM moyen,
  conversions. Export possible.
- Conversions : **OpenAI Pixel** (script sur le site) et **Conversions API** (côté serveur),
  intégrations avec des partenaires de mesure, dont mobiles. Les annonceurs reçoivent des
  informations **agrégées** (vues, clics, conversions), jamais de conversation.
- Les paramètres UTM ajoutés aux URL de destination sont conservés au clic et remontent dans
  GA4 ou tout outil d'analyse.
- Les pages de destination doivent être accessibles et **ne pas bloquer les robots OAI-AdsBot
  et OAI-SearchBot** (vérifier robots.txt et le pare-feu avant le lancement).

## Europe et Suisse : ce qui diffère

- « Personalized ads are not initially available in the European Economic Area (EEA) or
  Switzerland » (centre d'aide). En Suisse la sélection repose donc sur la conversation en
  cours, la localisation générale ou la langue et l'appareil, pas sur l'historique ni la
  mémoire.
- Pour utiliser Ads Manager en libre-service, **l'entité juridique qui annonce et qui est
  facturée doit être établie dans un pays listé** ; la Suisse l'est.
- Ouverture d'un compte (article « Account Setup ») : un compte OpenAI, puis nom, site web,
  logo et secteur de l'entreprise ; pays, devise et fuseau horaire **définitifs après
  création** ; vérification d'identité et d'entreprise via Persona ; revue du compte par
  OpenAI dans une file d'attente (« may take some time », aucune accélération possible) ;
  profil de facturation et **carte de crédit** ; invitation des membres de l'équipe.
- **Une agence ne peut pas créer le compte à la place du client** : « agencies creating
  advertiser accounts on a client's behalf are not supported. An agency can be invited after
  its client creates an advertiser account. » C'est le client qui ouvre le compte, DKDP est
  invité ensuite. Le compte et les données restent au client.
- Une entreprise peut avoir plusieurs comptes annonceur (marques, entités). Un « ChatGPT Ads
  Manager » dans ChatGPT permet de démarrer la configuration par la conversation pour les
  comptes éligibles.
- Support téléphonique par IA d'OpenAI dans certaines régions (centre d'aide).

## Politiques publicitaires (v1.5, 31 août 2026)

- Catégories acceptées pendant la période de test : **biens de consommation et ménagers,
  services locaux, voyages et expériences, produits numériques et éducation**.
- **Services financiers, santé et juridique : autorisés au cas par cas aux États-Unis
  seulement**, « généralement interdits » hors États-Unis. En Suisse : ne pas vendre le canal à
  une banque, un cabinet médical ou une étude d'avocats sans validation préalable d'OpenAI.
- Interdits : contenus pour adultes, alcool et tabac, jeux d'argent, contenu politique,
  substances récréatives, contrefaçons, allégations de bien-être non étayées, annonces
  individuelles d'emploi ou de logement (une plateforme d'annonces reste possible sans
  référence à une annonce précise), arnaques, sujets sensibles.
- Pas d'annonce près des conversations sensibles (santé personnelle, santé mentale,
  politique, détresse) ni des contextes à risque pour la marque.
- Les annonces doivent être véridiques, cohérentes de bout en bout (création et page de
  destination), sans imiter l'interface de ChatGPT, et utiliser uniquement des marques dont
  l'annonceur détient les droits.
- Vérification : annonceur à l'inscription, contenu et page de destination à la mise en ligne
  (systèmes automatisés avec relecture humaine selon le risque), placement à la diffusion.

## Bonnes pratiques de création (centre d'aide « Create Ads »)

- Construire pour la couverture : **plusieurs variations titre et texte par offre**, chacune
  avec un angle différent, pour multiplier les conversations où l'annonce est pertinente.
- Texte clair, précis, orienté bénéfice : la valeur pratique, pour qui, quand c'est utile,
  plutôt qu'un slogan ou un appel à l'action générique.
- Le texte complète le titre au lieu de le répéter.
- Page de destination : la page la plus pertinente (produit, collection, contenu), jamais la
  page d'accueil par défaut ; chemin fluide de l'annonce à l'action ; UTM propres à chaque
  création.
- Images simples et lisibles, alignées avec le message.
- « Suggested ad drafts » : Ads Manager peut préremplir un brouillon (image, titre, texte)
  depuis les métadonnées du site, sans générer de contenu par IA.
- Les limites de caractères ne sont pas chiffrées dans les pages OpenAI relues (« stay within
  recommended character limits ») ; un guide spécialisé cite 3 à 50 caractères pour le titre et
  100 pour le texte. Écrire « titre court, texte d'une centaine de caractères » sans chiffre
  attribué à OpenAI.

## Ce qu'on ne dit PAS

- Pas de CPM ou CPC « observés » (25 à 60 USD, 3 à 5 USD moyens) présentés comme des faits.
  Seule la recommandation OpenAI « démarrer entre 3 et 5 USD par clic » est citable.
- Pas de taux de clic moyen, pas de taux de conversion moyen, pas de chiffre d'affaires
  publicitaire d'OpenAI. OpenAI l'écrit lui-même (FAQ du 10.09.2026) : « ChatGPT Ads does not
  yet have performance benchmarks across advertisers, industries, or campaign types ». Le
  programme est en bêta, après un pilote « de février à avril ».
- Pas de « 20 % de conversations à intention commerciale », pas de « 1 milliard
  d'utilisateurs ».
- Pas de résultat client DKDP sur ChatGPT Ads : DKDP n'a pas encore de campagne à citer au
  10 septembre 2026. La page dit ce que DKDP fait, pas ce qu'elle a obtenu sur ce canal.

## Position DKDP (décisions de David, 10 septembre 2026)

- Offre : Pilote 30 jours CHF 1'200 (unique) · Gestion mensuelle CHF 450 par mois · Google Ads
  + ChatGPT Ads CHF 950 par mois. Budget média conseillé pour un pilote : CHF 600 à 1'500,
  versé directement à OpenAI. Zéro commission média. Compte au nom du client. Sans engagement,
  préavis de 30 jours.
- Posture : premiers sur le canal en Suisse romande, méthode issue de la gestion Google Ads,
  chiffres sourcés, honnêteté sur le B2B (les décideurs sont souvent sur des forfaits payants,
  donc sans annonces) et sur le ciblage national.
- **Preuve vérifiable, et la seule à citer** : DKDP a ouvert son propre compte OpenAI Ads
  Manager et posé le pixel OpenAI (`MhbGMaod48Cuvp7YJVsNgA`) et la Conversions API sur
  dkdp.ch le 10 septembre 2026 (commit `0206e72`, `src/lib/openai-ads.ts`,
  `docs/analytics-conversions.md`). On peut écrire « le même montage que sur notre propre
  site ». On n'écrit pas qu'une campagne DKDP tourne ni aucun résultat tant que ce n'est pas
  le cas.
- Le client ouvre son compte Ads Manager, DKDP est invité dessus (règle OpenAI), configure la
  mesure (OpenAI Pixel ou Conversions API, UTM, consentement cookies conforme nLPD), écrit les
  cartes et les context hints, pilote 30 jours, rend un rapport et une décision go ou no-go.

## Sources

- OpenAI, « ChatGPT Ads se déploie en Europe », 18 août 2026, mise à jour 31 août :
  https://openai.com/index/chatgpt-ads-expands-across-europe/
- OpenAI, « New ways to buy ChatGPT ads », 5 mai 2026 :
  https://openai.com/index/new-ways-to-buy-chatgpt-ads/
- OpenAI, « Testing ads in ChatGPT », 9 février 2026, mises à jour 26 mars, 7 mai, 11 août :
  https://openai.com/index/testing-ads-in-chatgpt/
- OpenAI, Politiques relatives aux annonces, v1.5 du 31 août 2026 :
  https://openai.com/policies/ad-policies/
- Centre d'aide OpenAI, « Ads in ChatGPT » : https://help.openai.com/en/articles/20001047
- Centre d'aide OpenAI, « Ads in ChatGPT: The Basics » : https://help.openai.com/en/articles/20001207
- Centre d'aide OpenAI, « Create Ads for ChatGPT Ads » : https://help.openai.com/en/articles/20001212
- Centre d'aide OpenAI, « Ads Manager Availability » : https://help.openai.com/en/articles/20001245
- Centre d'aide OpenAI, « Ads Manager Beta Account Setup » : https://help.openai.com/en/articles/20001213
- Centre d'aide OpenAI, « Budget Pacing » : https://help.openai.com/en/articles/20001515
- Centre d'aide OpenAI, « Daily Budgets » : https://help.openai.com/en/articles/20001413
- Centre d'aide OpenAI, « Billing & Payment » : https://help.openai.com/en/articles/20001216
- Centre d'aide OpenAI, « Create Campaigns for ChatGPT Ads » (table des minimums par devise) : https://help.openai.com/en/articles/20001210
- Centre d'aide OpenAI, « Conversion-optimized Campaigns » : https://help.openai.com/en/articles/20001412
- Centre d'aide OpenAI, « Set up Custom Audiences » : https://help.openai.com/en/articles/20001346
- Centre d'aide OpenAI, « Frequently asked questions » : https://help.openai.com/en/articles/20001220
- Inscription annonceurs : https://ads.openai.com
- Presse (date du 24 août, 31 pays) : https://www.seroundtable.com/chatgpt-ads-europe-41902.html ,
  https://digiday.com/marketing/openais-ads-business-hits-europe-at-the-six-month-mark/
