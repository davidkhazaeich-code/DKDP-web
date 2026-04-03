// =============================================================================
// blog-data.ts
// Fichier de données centralisé pour tous les articles du blog DKDP
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CategoryKey = 'ia' | 'seo' | 'formation' | 'outils'

export interface BlogImage {
  src: string
  alt: string
  caption?: string
}

export interface Article {
  slug: string
  category: CategoryKey
  title: string
  excerpt: string
  date: string
  dateISO: string
  readTime: string
  author: string
  heroImage: BlogImage
  images: BlogImage[]
  content: string
  tags: string[]
  seoTitle: string
  seoDescription: string
}

// ---------------------------------------------------------------------------
// Catégories
// ---------------------------------------------------------------------------

export const BLOG_CATEGORIES: Record<CategoryKey, { label: string; color: string; bg: string; border: string }> = {
  ia: {
    label: 'Intelligence Artificielle',
    color: '#D4D4D8',
    bg: 'rgba(212,212,216,0.08)',
    border: 'rgba(212,212,216,0.16)',
  },
  seo: {
    label: 'SEO & Visibilité',
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.20)',
  },
  formation: {
    label: 'Formation',
    color: '#FF8C00',
    bg: 'rgba(255,107,0,0.08)',
    border: 'rgba(255,107,0,0.18)',
  },
  outils: {
    label: 'Outils & Productivité',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.08)',
    border: 'rgba(74,222,128,0.18)',
  },
}

// ---------------------------------------------------------------------------
// Article en vedette
// ---------------------------------------------------------------------------

export const FEATURED_SLUG = 'chatgpt-claude-copilot-lequel-choisir-pme-2026'

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

export const ARTICLES: Article[] = [
  // =========================================================================
  // Article 1 : ChatGPT vs Claude vs Copilot
  // =========================================================================
  {
    slug: 'chatgpt-claude-copilot-lequel-choisir-pme-2026',
    category: 'ia',
    title: 'ChatGPT, Claude, Copilot : lequel choisir pour votre PME en 2026 ?',
    excerpt:
      'ChatGPT, Claude et Microsoft Copilot dominent le marché des assistants IA, mais leurs forces sont très différentes. Voici comment choisir l\'outil qui correspond vraiment aux besoins de votre PME, sans gaspiller votre budget.',
    date: '12 mars 2026',
    dateISO: '2026-03-12',
    readTime: '7 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/chatgpt-claude-copilot-hero.png',
      alt: 'Trois intelligences artificielles représentées par des orbes de lumière connectés dans un espace sombre',
    },
    images: [
      {
        src: '/images/blog/chatgpt-claude-copilot-comparison.png',
        alt: 'Radar comparatif des trois assistants IA selon 6 critères',
        caption: 'Comparatif radar : vitesse, précision, coût, confidentialité, créativité, intégrations',
      },
    ],
    tags: ['IA', 'ChatGPT', 'Claude', 'Copilot', 'PME', 'productivité'],
    seoTitle: 'ChatGPT, Claude ou Copilot : lequel pour votre PME ?',
    seoDescription:
      'Comparatif complet ChatGPT vs Claude vs Microsoft Copilot pour les PME suisses en 2026. Prix, forces, limites et recommandations par cas d\'usage.',
    content: `## Pourquoi ce choix est stratégique pour votre PME

Le marché des assistants IA s'est densifié à une vitesse vertigineuse. En 2026, trois acteurs dominent clairement les usages professionnels : ChatGPT d'OpenAI, Claude d'Anthropic et Microsoft Copilot. Mais derrière ces noms familiers se cachent des philosophies de produit radicalement différentes.

Pour une PME, choisir le mauvais outil, c'est payer un abonnement sous-utilisé, former des équipes sur une plateforme inadaptée, et perdre six mois de productivité potentielle. Les budgets sont limités, les décisions doivent être fondées sur des faits, pas sur le battage médiatique.

Ce guide compare les trois assistants sur les critères qui comptent vraiment pour les équipes de 5 à 50 personnes : le coût réel, les capacités concrètes, les limites honnêtes, et les cas d'usage où chacun excelle vraiment.

## ChatGPT (OpenAI) : le vétéran polyvalent

ChatGPT reste la référence grand public et professionnelle. La version GPT-4o, incluse dans ChatGPT Plus à 20 $/mois, offre un équilibre remarquable entre vitesse et qualité. Son atout principal : la polyvalence. Rédaction marketing, analyse de données, génération de code, résumés de réunion, traduction, brainstorming... ChatGPT s'adapte à presque tous les cas d'usage sans friction.

**Points forts :** Interface intuitive, mémoire conversationnelle, plugins et GPTs personnalisables, API bien documentée, support image et audio natif.

**Limites :** Les réponses longues peuvent manquer de cohérence structurelle. La gestion des consignes complexes est moins rigoureuse que Claude. Les données envoyées peuvent être utilisées pour l'entraînement (sauf désactivation explicite).

**Cas d'usage idéaux :** Création de contenu varié, support client automatisé, génération de premières versions de documents, assistance au code, brainstorming créatif.

**Prix :** Gratuit (GPT-4o limité), ChatGPT Plus à 20 $/mois, ChatGPT Team à 25 $/mois/utilisateur, API pay-as-you-go.

## Claude (Anthropic) : le rédacteur de précision

Claude s'est imposé comme la référence pour les tâches à haute valeur intellectuelle. Là où ChatGPT brille par sa polyvalence, Claude excelle dans la profondeur et la fiabilité. Sa fenêtre de contexte étendue (jusqu'à 200 000 tokens sur Claude 3.5) lui permet d'analyser des documents entiers, des contrats longs, ou des bases de code volumineuses sans perdre le fil.

**Points forts :** Respect très strict des consignes, raisonnement structuré de haute qualité, idéal pour la rédaction longue et précise, politique de confidentialité solide (Anthropic s'engage à ne pas entraîner ses modèles sur vos données sans consentement explicite), excellent pour les textes juridiques, techniques et analytiques.

**Limites :** Moins de plugins tiers que ChatGPT, interface plus sobre, pas encore de génération d'image native intégrée.

**Cas d'usage idéaux :** Rédaction de contenus sensibles ou juridiques, analyse de documents volumineux, création de prompts systèmes complexes, production éditoriale à fort volume, support technique documenté.

**Prix :** Gratuit (Claude Sonnet limité), Claude Pro à 20 $/mois, Claude Team à 25 $/mois/utilisateur, API pay-as-you-go.

___IMG:chatgpt-claude-copilot-comparison.png___

## Microsoft Copilot : l'intégré à l'écosystème Office

Microsoft Copilot n'est pas un assistant IA parmi d'autres : c'est l'IA directement intégrée dans Word, Excel, PowerPoint, Teams, Outlook et SharePoint. Si votre PME utilise Microsoft 365, Copilot peut transformer radicalement votre productivité sans changer vos outils.

**Points forts :** Intégration native à l'écosystème M365, accès en temps réel à vos fichiers SharePoint et OneDrive, génération de slides PowerPoint à partir d'un prompt, résumés automatiques de réunions Teams, brouillons d'emails contextuels dans Outlook, analyse de tableurs Excel avec langage naturel.

**Limites :** Moins créatif et nuancé que ChatGPT ou Claude pour la production de contenu pur. Nécessite Microsoft 365 Business Premium ou un add-on Copilot (30 $/utilisateur/mois). Performances variables selon la qualité de vos données internes.

**Cas d'usage idéaux :** Automatisation des tâches bureautiques répétitives, résumés de réunions et de threads email, génération de rapports à partir de données Excel, onboarding via documents SharePoint.

**Prix :** Microsoft 365 Copilot à 30 $/mois/utilisateur (en plus de la licence M365 existante).

## Tableau comparatif rapide

| Critère | ChatGPT Plus | Claude Pro | Microsoft Copilot |
|---|---|---|---|
| Prix/mois | 20 $ | 20 $ | 30 $ + M365 |
| Contexte (tokens) | 128 000 | 200 000 | 128 000 |
| Intégrations | Plugins, API | API | M365 natif |
| Confidentialité | Moyenne | Solide | Bonne (RGPD) |
| Points forts | Polyvalence | Précision/long | Écosystème Office |
| Génération image | Oui (DALL-E) | Non natif | Oui (Designer) |

## Notre recommandation pour les PME suisses

Le choix n'est pas binaire. La stratégie la plus efficace pour une PME suisse en 2026 dépend de deux facteurs : votre écosystème existant et vos cas d'usage dominants.

**Si votre équipe utilise Microsoft 365 au quotidien**, Copilot est le choix le plus rentable. Le retour sur investissement est immédiat sur la productivité bureautique, et vos collaborateurs n'ont pas besoin d'apprendre un nouvel outil.

**Si vous produisez beaucoup de contenu écrit** (articles, rapports, contenus marketing, documentation), Claude Pro est l'investissement le plus intelligent. La qualité rédactionnelle et la fiabilité des instructions complexes sont sans égal.

**Si vous cherchez la polyvalence maximale** pour une équipe aux usages variés, ChatGPT reste le choix le plus sûr. Son écosystème de plugins et sa communauté d'utilisateurs en font le standard de facto.

Une approche hybride est aussi viable : ChatGPT pour les usages créatifs et variés, Claude pour les projets éditoriaux importants. Le coût reste raisonnable (40 $/mois) pour un gain de productivité significatif.

## Conclusion

Il n'existe pas de meilleur outil universel : il existe l'outil le mieux aligné sur vos besoins. Avant de souscrire, listez vos cinq cas d'usage prioritaires et évaluez lequel des trois assistants les couvre le mieux. La plupart des plateformes offrent une version gratuite ou un essai : profitez-en pour tester concrètement avant de déployer à toute l'équipe.`,
  },

  // =========================================================================
  // Article 2 : SEO local Genève
  // =========================================================================
  {
    slug: 'seo-local-geneve-2026',
    category: 'seo',
    title: 'SEO local à Genève : le guide complet pour dominer Google Maps en 2026',
    excerpt:
      'Vous avez un commerce ou une agence à Genève et vous n\'apparaissez pas dans le top 3 de Google Maps ? Ce guide vous explique exactement comment corriger ça, étape par étape, sans budget publicitaire.',
    date: '5 mars 2026',
    dateISO: '2026-03-05',
    readTime: '9 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/seo-local-geneve-hero.png',
      alt: 'Vue aérienne de Genève avec des épingles de localisation violettes et une grille numérique superposée',
    },
    images: [
      {
        src: '/images/blog/seo-local-geneve-funnel.png',
        alt: 'Entonnoir de marketing local : sensibilisation, considération, conversion',
        caption: 'L\'entonnoir SEO local : de la découverte à la conversion',
      },
    ],
    tags: ['SEO', 'Genève', 'Google Maps', 'SEO local', 'GMB', 'PME'],
    seoTitle: 'SEO local Genève 2026 : dominer Google Maps · DKDP',
    seoDescription:
      'Guide complet pour optimiser votre référencement local à Genève en 2026. Google Business Profile, avis clients, NAP, contenu local : toutes les stratégies.',
    content: `## Pourquoi le SEO local est différent du SEO classique

Quand un Genevois cherche "plombier Genève" ou "restaurant Carouge", Google ne lui montre pas les sites les mieux optimisés au niveau mondial. Il lui montre les entreprises locales les plus pertinentes, les plus proches et les plus fiables pour lui, maintenant, dans sa zone géographique.

C'est la logique du SEO local : capter l'intention d'achat de proximité. Et cette logique a ses propres règles, différentes du SEO traditionnel. Une fiche Google Business Profile mal remplie peut vous coûter des dizaines de clients par mois, même si votre site est techniquement parfait.

En 2026, avec la montée de la recherche vocale et des résultats "zero-click" (où Google répond directement sans que l'utilisateur clique sur un lien), votre présence locale n'a jamais été aussi décisive.

## Google Business Profile : la base incontournable

Votre fiche Google Business Profile (anciennement Google My Business) est la pierre angulaire de votre SEO local. C'est elle qui apparaît dans le Pack Local (les 3 fiches en haut des résultats) et sur Google Maps.

**Étape 1 : Vérification.** Si votre fiche n'est pas encore vérifiée, c'est votre priorité absolue. Google envoie un code postal ou propose une vérification vidéo. Sans vérification, vous n'existez pas localement.

**Étape 2 : Catégories.** Choisissez la catégorie principale la plus précise possible. "Agence de communication" est moins puissant que "Agence de marketing digital". Ajoutez des catégories secondaires pertinentes.

**Étape 3 : Horaires et informations.** Remplissez absolument tous les champs : horaires d'ouverture (incluant jours fériés), numéro de téléphone local (pas de numéro surtaxé), site web, description de 750 caractères avec vos mots-clés cibles naturellement intégrés.

**Étape 4 : Photos.** Les fiches avec photos reçoivent 42 % plus de demandes d'itinéraire. Ajoutez des photos de votre local, de votre équipe, de vos prestations. Visez au minimum 10 photos de qualité.

## Les signaux de ranking local en 2026

L'algorithme de Google Maps évalue trois dimensions principales pour classer les résultats locaux.

**Proximité.** La distance entre le chercheur et votre établissement. Vous ne contrôlez pas ce facteur, mais vous pouvez l'étendre en ciblant des zones géographiques spécifiques dans votre contenu (Genève, Carouge, Lancy, Meyrin, Vernier, Nyon...).

**Pertinence.** À quel point votre fiche correspond-elle à ce que cherche l'utilisateur ? Plus vos catégories, votre description et vos publications Google sont alignées avec les recherches de vos clients, plus vous êtes jugé pertinent.

**Notoriété.** Google évalue votre popularité globale : nombre et qualité des avis, mentions dans des médias ou annuaires locaux, nombre de backlinks depuis des sites genevois ou suisses.

___IMG:seo-local-geneve-funnel.png___

## NAP : Nom, Adresse, Téléphone, la cohérence absolue

NAP est l'acronyme de Name, Address, Phone Number. C'est un signal de confiance fondamental pour Google. Si votre nom d'entreprise est "DKDP Sàrl" sur votre fiche Google mais "DKDP" sur votre site et "DKDP.ch" sur un annuaire, Google perçoit une incohérence et pénalise votre ranking.

**La règle d'or :** votre NAP doit être identique, au caractère près, sur chaque plateforme où vous êtes référencé : votre site web, Google Business Profile, Yelp, TripAdvisor, pages jaunes suisses (local.ch, search.ch), annuaires de votre secteur, réseaux sociaux.

Faites un audit de vos citations actuelles. Des outils comme BrightLocal ou Moz Local permettent de détecter les incohérences. Corrigez-les une par une, en commençant par les plateformes à fort trafic.

## Les avis clients : votre levier le plus puissant

Les avis Google sont probablement le facteur de ranking local le plus actionnable. Une fiche avec 50 avis à 4,6 étoiles battra presque toujours une fiche avec 10 avis à 4,9 étoiles.

**Comment obtenir plus d'avis :** Le moyen le plus efficace est simplement de demander. Envoyez un email post-prestation avec un lien direct vers votre fiche Google (utilisez le "Place ID Finder" de Google pour obtenir un lien de dépôt d'avis direct). Formez vos équipes à mentionner les avis naturellement.

**Comment répondre aux avis :** Répondez à tous les avis, positifs comme négatifs, sous 48 heures. Pour les positifs, personnalisez votre réponse (ne copiez-collez pas la même phrase). Pour les négatifs, restez professionnel, proposez une solution hors ligne, ne cherchez jamais à vous justifier publiquement de manière défensive.

**Les avis négatifs :** Ne les ignorez jamais. Une bonne réponse à un avis négatif peut convaincre un prospect hésitant que vous êtes une entreprise sérieuse et attentive.

## Contenu local : parlez de Genève, Carouge, Nyon...

Si vous servez plusieurs zones géographiques autour de Genève, créez des pages de destination dédiées par zone. Une agence web basée à Genève qui crée une page "/creation-site-web-carouge" et "/creation-site-web-nyon" capte une intention de recherche hyperlocale très peu concurrencée.

Ces pages doivent être réellement utiles : mentionnez des spécificités locales, des projets réalisés dans cette zone, des témoignages de clients de la région. Ne créez pas des pages vides juste pour les mots-clés.

Utilisez également les publications Google Business Profile pour relayer vos actualités locales, promotions et événements. C'est un signal de fraîcheur que Google valorise.

## Checklist SEO local Genève 2026

- Fiche Google Business Profile vérifiée et complète à 100 %
- Catégorie principale précise et catégories secondaires ajoutées
- Minimum 10 photos de qualité uploadées
- NAP identique sur tous les annuaires et votre site
- Au moins 20 avis Google avec une note supérieure à 4,0
- Réponses à tous les avis (positifs et négatifs)
- Au moins une publication Google par semaine
- Pages locales dédiées pour chaque zone géographique cible
- Balise title et meta description avec mention géographique sur chaque page clé
- Données structurées LocalBusiness (Schema.org) sur votre site

## Conclusion

Le SEO local à Genève n'est pas une question de budget publicitaire, mais de rigueur et de régularité. Une fiche Google Business Profile soignée, une cohérence NAP irréprochable, et une stratégie d'avis clients systématique peuvent transformer votre visibilité locale en 3 à 6 mois. Commencez par l'audit de votre situation actuelle, puis attaquez les points les plus impactants en premier.`,
  },

  // =========================================================================
  // Article 3 : Automatiser les tâches répétitives
  // =========================================================================
  {
    slug: 'automatiser-taches-repetitives-pme',
    category: 'outils',
    title: 'Automatiser les tâches répétitives : les 7 workflows que toute PME devrait mettre en place',
    excerpt:
      'Chaque semaine, vos équipes perdent des heures sur des tâches répétitives que des outils comme Make ou Zapier pourraient gérer automatiquement. Voici les 7 automatisations les plus rentables pour une PME.',
    date: '26 février 2026',
    dateISO: '2026-02-26',
    readTime: '8 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/automatiser-taches-hero.png',
      alt: "Visualisation abstraite d'un workflow automatisé avec des noeuds connectés par des flux de données violets",
    },
    images: [
      {
        src: '/images/blog/automatiser-taches-workflow.png',
        alt: "Diagramme circulaire d'un processus d'automatisation en 6 étapes",
        caption: "Le cycle d'automatisation en 6 étapes : identifier, modéliser, configurer, tester, déployer, mesurer",
      },
    ],
    tags: ['automatisation', 'workflow', 'no-code', 'productivité', 'Zapier', 'Make'],
    seoTitle: '7 automatisations PME : Make, Zapier, n8n · DKDP',
    seoDescription:
      'Découvrez les 7 workflows à automatiser en priorité pour votre PME. Leads, rapports, facturation, réseaux sociaux : économisez 10h par semaine avec Make et Zapier.',
    content: `## Pourquoi l'automatisation n'est plus réservée aux grandes entreprises

Il y a cinq ans, automatiser des processus métier demandait des développeurs, des budgets conséquents et des mois d'intégration. En 2026, des outils no-code comme Make, Zapier ou n8n permettent à n'importe quelle PME de connecter ses applications et d'automatiser des workflows complexes en quelques heures, sans écrire une seule ligne de code.

Le gain est réel et mesurable. Une PME de 10 personnes qui automatise ses processus les plus chronophages peut récupérer entre 5 et 15 heures de travail hebdomadaire, soit l'équivalent d'un mi-temps. Ce n'est pas de la théorie : c'est ce que nos clients constatent régulièrement dans les trois premiers mois.

## Les outils : Make (ex-Integromat), Zapier, n8n

Avant de lancer vos premières automatisations, voici un rapide positionnement des trois principaux acteurs.

**Make (ex-Integromat)** est le choix des équipes qui veulent de la puissance avec une interface visuelle intuitive. Son modèle de prix basé sur les opérations (et non le nombre de Zaps) le rend très compétitif pour les workflows à fort volume. Idéal pour les PME avec des processus complexes et ramifiés.

**Zapier** reste la référence en termes de catalogue d'intégrations (plus de 6 000 apps). Sa prise en main est la plus rapide, mais son prix peut grimper vite pour les workflows fréquents. Parfait pour les équipes qui veulent aller vite sur des cas d'usage simples.

**n8n** est la solution open-source. Elle peut être hébergée sur vos propres serveurs, ce qui en fait le choix préféré des entreprises soucieuses de la confidentialité de leurs données. La courbe d'apprentissage est un peu plus prononcée, mais les possibilités sont quasi illimitées.

___IMG:automatiser-taches-workflow.png___

## Les 7 workflows à automatiser en priorité

### 1. Traitement des leads entrants

**Déclencheur :** soumission d'un formulaire de contact (Typeform, HubSpot Forms, Gravity Forms).
**Automatisation :** création de la fiche contact dans votre CRM, envoi d'un email de bienvenue personnalisé, notification Slack à l'équipe commerciale, ajout dans une séquence email si qualifié.
**Gain estimé :** 20-30 minutes par lead traité manuellement.

### 2. Rapport hebdomadaire automatique

**Déclencheur :** cron job tous les lundis à 8h.
**Automatisation :** récupération des données Google Analytics, consolidation dans Google Sheets, génération d'un résumé via IA (ChatGPT API), envoi par email à la direction.
**Gain estimé :** 1h à 2h par semaine.

### 3. Publication réseaux sociaux planifiée

**Déclencheur :** nouveau contenu ajouté dans Notion ou Airtable avec le statut "Prêt".
**Automatisation :** extraction du contenu, reformatage selon le réseau (LinkedIn, Instagram), envoi à Buffer ou Later pour publication à l'heure programmée, archivage dans un log de publication.
**Gain estimé :** 45 minutes par publication.

### 4. Relance clients automatique

**Déclencheur :** devis envoyé sans réponse après J+3.
**Automatisation :** envoi automatique d'un premier rappel à J+3, second rappel à J+7 avec une question ouverte, escalade vers le commercial à J+14 avec alerte Slack.
**Gain estimé :** 30 % d'augmentation du taux de relance traité.

### 5. Facturation automatique

**Déclencheur :** paiement confirmé dans Stripe.
**Automatisation :** création de la facture dans votre outil comptable (Abacus, Bexio, QuickBooks), génération du PDF, envoi au client par email, mise à jour du statut dans le CRM, enregistrement dans Google Drive.
**Gain estimé :** 15-20 minutes par facture.

### 6. Veille concurrentielle

**Déclencheur :** nouvelles publications RSS de sources définies (blogs concurrents, Google Alerts).
**Automatisation :** filtrage par mots-clés, envoi des articles pertinents dans un canal Slack dédié, archivage dans Notion avec résumé automatique via IA.
**Gain estimé :** 30 minutes de veille manuelle par jour.

### 7. Onboarding nouveaux employés

**Déclencheur :** ajout d'un nouveau profil dans votre outil RH.
**Automatisation :** création des comptes (Google Workspace, Slack, Notion), envoi du livret d'accueil par email, création des tâches d'onboarding dans le gestionnaire de projet, invitation au canal Slack dédié, rappel au manager après J+7.
**Gain estimé :** 2-3 heures par recrutement.

## Par où commencer : la méthode en 3 étapes

**Étape 1 : Identifier.** Demandez à chaque membre de l'équipe de noter les tâches répétitives qu'il effectue chaque semaine, avec le temps passé. Les candidats à l'automatisation sont toujours les mêmes : copier-coller de données entre applications, envois d'emails de suivi, mise à jour de tableaux, génération de rapports.

**Étape 2 : Choisir votre premier outil.** Si vous débutez, commencez par Zapier. La courbe d'apprentissage est la plus douce et les résultats sont immédiats. Une fois à l'aise, migrez les workflows complexes vers Make.

**Étape 3 : Construire le premier workflow.** Choisissez le workflow le plus simple et le plus impactant de votre liste. Documentez chaque étape manuellement avant de l'automatiser. Un bon workflow automatisé est d'abord un bon processus manuel.

## Combien de temps pour rentabiliser ?

Pour une PME qui investit 500 CHF/mois en abonnements et 10 heures de configuration initiale, le retour sur investissement est typiquement atteint en 4 à 8 semaines. Si le coût horaire moyen de votre équipe est de 60 CHF, et que vous récupérez 8 heures/semaine, vous dégagez 480 CHF de valeur chaque semaine. Le ROI annuel dépasse facilement 20x.

## Conclusion

L'automatisation n'est pas un projet IT. C'est une décision stratégique qui libère vos équipes des tâches à faible valeur ajoutée pour les concentrer sur ce qui compte vraiment : la relation client, l'innovation, et la croissance. Commencez petit, mesurez, puis accélérez.`,
  },

  // =========================================================================
  // Article 4 : Core Web Vitals
  // =========================================================================
  {
    slug: 'core-web-vitals-2026-guide-complet',
    category: 'seo',
    title: 'Core Web Vitals 2026 : le guide complet pour un site ultra-rapide',
    excerpt:
      'LCP, CLS, INP : ces trois métriques déterminent votre positionnement Google et l\'expérience de vos visiteurs. Ce guide explique comment les comprendre, les mesurer et les optimiser sur n\'importe quelle plateforme.',
    date: '19 février 2026',
    dateISO: '2026-02-19',
    readTime: '10 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/core-web-vitals-hero.png',
      alt: 'Dashboard de performance web avec trois jauges circulaires indiquant LCP, CLS et INP au vert',
    },
    images: [
      {
        src: '/images/blog/core-web-vitals-metrics.png',
        alt: 'Visualisation des trois métriques Core Web Vitals : LCP, CLS et INP',
        caption: 'LCP, CLS, INP : les trois signaux qui définissent l\'expérience utilisateur selon Google',
      },
    ],
    tags: ['SEO', 'performance', 'Core Web Vitals', 'LCP', 'INP', 'CLS', 'Next.js'],
    seoTitle: 'Core Web Vitals 2026 : LCP, INP, CLS pour le SEO · DKDP',
    seoDescription:
      'Guide complet Core Web Vitals 2026 : comprendre LCP, CLS et INP, les mesurer avec PageSpeed Insights et les optimiser sur WordPress, Shopify et Next.js.',
    content: `## Pourquoi les Core Web Vitals impactent directement votre SEO

Depuis que Google a officialisé les Core Web Vitals comme signaux de ranking en 2021, la performance technique de votre site n'est plus seulement une question d'expérience utilisateur : c'est un facteur de positionnement direct. En 2026, avec des algorithmes toujours plus sophistiqués, les sites rapides et stables ont un avantage concurrentiel mesurable sur les SERPs.

Mais l'impact va au-delà du SEO. Un site qui charge en 4 secondes au lieu de 2 perd en moyenne 20 % de ses visiteurs avant même que la page soit visible. Pour une PME qui dépend de son site pour générer des leads, chaque dixième de seconde gagné se traduit en conversions supplémentaires.

Voici ce que vous devez savoir sur les trois métriques qui définissent l'expérience utilisateur selon Google.

## LCP (Largest Contentful Paint) : la vitesse perçue

**Définition :** Le LCP mesure le temps écoulé entre le début du chargement de la page et l'affichage de l'élément visible le plus grand (image héro, bloc de texte principal, vidéo).

**Seuils :**
- Bon : inférieur à 2,5 secondes
- A améliorer : entre 2,5 et 4 secondes
- Mauvais : supérieur à 4 secondes

**Causes courantes d'un LCP élevé :** serveur lent (TTFB trop long), images non optimisées (formats JPEG au lieu de WebP/AVIF, pas de lazy loading intelligent, pas de preload sur l'image héro), CSS bloquant le rendu, polices web chargées sans \`font-display: swap\`.

**Corrections prioritaires :** passer votre image héro en WebP ou AVIF, ajouter \`<link rel="preload">\` pour l'image above-the-fold, utiliser un CDN, activer la compression Brotli sur votre serveur, optimiser votre TTFB via le cache.

___IMG:core-web-vitals-metrics.png___

## CLS (Cumulative Layout Shift) : la stabilité visuelle

**Définition :** Le CLS mesure la somme des décalages visuels inattendus qui se produisent pendant le chargement. Quand un bouton saute de 100px parce qu'une publicité s'est chargée au-dessus, c'est du CLS.

**Seuils :**
- Bon : inférieur à 0,1
- A améliorer : entre 0,1 et 0,25
- Mauvais : supérieur à 0,25

**Causes courantes :** images sans attributs \`width\` et \`height\` définis en HTML, polices web qui remplacent les polices système (FOUT), publicités, embeds ou iframes sans espace réservé, éléments injectés dynamiquement above-the-fold.

**Corrections prioritaires :** ajouter systématiquement les attributs width et height sur toutes les balises img, définir des dimensions fixes pour les espaces publicitaires, utiliser font-display: optional pour les polices non critiques, réserver l'espace des éléments dynamiques avec min-height.

## INP (Interaction to Next Paint) : la réactivité

**Définition :** L'INP mesure la latence de toutes les interactions utilisateur pendant la durée de vie de la page (clics, pressions de touches, taps). Il a remplacé le FID (First Input Delay) en mars 2024 car il est beaucoup plus représentatif de la réactivité réelle d'une page.

**Seuils :**
- Bon : inférieur à 200 ms
- A améliorer : entre 200 et 500 ms
- Mauvais : supérieur à 500 ms

**Causes courantes :** JavaScript long et bloquant le thread principal, gestionnaires d'événements lourds, animations CSS non optimisées, trop de calculs synchrones au moment d'une interaction.

**Corrections prioritaires :** découpez les tâches JavaScript longues (setTimeout, scheduler.postTask), différez le chargement des scripts non critiques, utilisez les Web Workers pour les calculs lourds, préférez les animations CSS aux animations JavaScript.

## Comment mesurer vos Core Web Vitals

**PageSpeed Insights** (pagespeed.web.dev) est votre premier outil. Il combine les données de terrain réelles (CrUX, données Chrome UX Report) et les mesures de laboratoire (Lighthouse). Testez à la fois en mode mobile et desktop.

**Lighthouse** intégré dans Chrome DevTools vous donne des mesures en temps réel avec des recommandations contextuelles. Idéal pour les tests en développement.

**Google Search Console** (rapport "Expérience" > "Core Web Vitals") vous donne une vision globale de votre site : quelles URL sont en "Mauvais", "A améliorer" ou "Bon" sur l'ensemble du traffic réel.

**Chrome UX Report** (via BigQuery ou l'extension CrUX) vous permet d'analyser les données de terrain de n'importe quel site.

## Les quick wins par type de site

**WordPress :** installez WP Rocket ou Perfmatters pour le cache et la minification, Imagify pour la compression d'images en WebP, et désactivez les scripts inutiles page par page. Évitez les constructeurs de pages (Elementor, Divi) qui génèrent des douzaines de requêtes CSS/JS supplémentaires.

**Shopify :** passez à un thème rapide (Dawn, Prestige), compressez toutes vos images produits, désactivez les apps Shopify inutilisées (chacune peut ajouter 200-500ms de JS), et utilisez le système de chargement différé natif de Shopify.

**Next.js :** utilisez systématiquement next/image pour l'optimisation automatique des images, next/font pour le chargement optimisé des polices, activez la génération statique (SSG) quand c'est possible, et monitorez avec Vercel Analytics pour les données de terrain réelles.

## Tableau des seuils 2026

| Métrique | Bon | A améliorer | Mauvais |
|---|---|---|---|
| LCP | < 2,5 s | 2,5 s à 4 s | > 4 s |
| CLS | < 0,1 | 0,1 à 0,25 | > 0,25 |
| INP | < 200 ms | 200 ms à 500 ms | > 500 ms |

## Conclusion

Les Core Web Vitals ne sont pas une contrainte technique abstraite : ils sont la traduction chiffrée de ce que ressentent vos visiteurs quand ils arrivent sur votre site. Un site rapide, stable et réactif convertit mieux, rank mieux, et fidélise mieux. Commencez par mesurer votre situation réelle dans Search Console, identifiez les 3 URL les plus visitées en "Mauvais", et appliquez les corrections prioritaires. Les résultats sont souvent visibles en quelques semaines.`,
  },

  // =========================================================================
  // Article 5 : Formation IA en entreprise
  // =========================================================================
  {
    slug: 'formation-ia-collaborateurs-roi',
    category: 'formation',
    title: "Former ses collaborateurs à l'IA : comment calculer le ROI et convaincre sa direction",
    excerpt:
      "L'IA est disponible, mais vos équipes ne savent pas vraiment s'en servir. Voici comment structurer un programme de formation IA efficace, calculer son retour sur investissement et convaincre votre direction de l'approuver.",
    date: '12 février 2026',
    dateISO: '2026-02-12',
    readTime: '8 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/formation-ia-roi-hero.png',
      alt: "Équipe en formation devant des interfaces d'intelligence artificielle dans un bureau moderne éclairé en violet",
    },
    images: [
      {
        src: '/images/blog/formation-ia-roi-curve.png',
        alt: 'Courbe de ROI montrant la progression de la productivité après une formation IA',
        caption: 'Courbe ROI type : plateau initial, puis gain exponentiel à partir du 3e mois',
      },
    ],
    tags: ['formation', 'IA', 'ROI', 'entreprise', 'management', 'productivité'],
    seoTitle: 'Formation IA entreprise : calculer le ROI en 2026 · DKDP',
    seoDescription:
      "Comment calculer le ROI d'une formation IA pour vos équipes et convaincre votre direction d'investir. Méthode, chiffres, erreurs à éviter et structure de programme.",
    content: `## Le problème : l'IA est là, les équipes ne savent pas l'utiliser

Vos collaborateurs ont entendu parler de ChatGPT, de Claude, de Copilot. Certains les utilisent en dilettante, pour des usages personnels ou des tâches simples. Mais dans la grande majorité des PME suisses, l'IA n'est pas encore intégrée dans les processus de travail de façon systématique et maîtrisée.

Le résultat : vous payez des abonnements IA sous-exploités, vos concurrents gagnent du terrain sur la productivité, et vos équipes développent un rapport ambigu avec ces outils, entre fascination et méfiance.

La formation IA n'est pas une option confortable. C'est une nécessité opérationnelle.

## Pourquoi la formation IA n'est pas une dépense mais un investissement

La résistance classique des directions financières est de traiter la formation comme un coût. C'est une erreur de cadrage. Une formation IA bien conçue génère un retour sur investissement mesurable, souvent supérieur à 500 % sur 12 mois.

Pour comprendre pourquoi, pensez aux tâches que vos collaborateurs répètent chaque semaine : rédiger des emails, synthétiser des rapports, préparer des présentations, répondre à des questions clients, traduire des documents. Ces tâches représentent souvent 30 à 40 % du temps de travail effectif. L'IA peut en automatiser ou accélérer une large portion, souvent de 60 à 80 %.

## Calculer le ROI d'une formation IA : la méthode

La formule de base est simple :

> **(Heures gagnées par mois x Coût horaire moyen x 12) - Coût de la formation = ROI annuel**

Prenons un exemple concret pour une PME de 10 personnes.

- Coût horaire moyen de l'équipe : 65 CHF
- Heures gagnées par personne et par mois après formation : 6 heures
- Heures gagnées totales par mois : 60 heures
- Valeur mensuelle récupérée : 60 x 65 = 3 900 CHF
- Valeur annuelle : 3 900 x 12 = 46 800 CHF
- Coût de la formation (programme sur 2 jours + suivi 3 mois) : 4 500 CHF

**ROI annuel : 46 800 - 4 500 = 42 300 CHF, soit un ROI de 940 %.**

Ces chiffres sont conservateurs. Les PME qui forment leurs équipes de façon rigoureuse et assurent un suivi post-formation constatent souvent des gains de 8 à 12 heures par personne et par mois.

___IMG:formation-ia-roi-curve.png___

## Les 3 erreurs classiques dans la formation IA en entreprise

### 1. Former tout le monde pareil

Un comptable et un responsable marketing n'ont pas les mêmes besoins en matière d'IA. Former tout le monde avec le même contenu générique génère de la frustration et un faible taux d'adoption. La formation doit être contextualisée par métier et par cas d'usage concret.

### 2. Former une fois et ne jamais relancer

Une journée de formation sans suivi produit des résultats décevants. Les comportements changent dans la durée, pas en une journée. Un programme efficace inclut obligatoirement des sessions de suivi à 30 et 90 jours, des "office hours" pour répondre aux questions pratiques, et des partages de bonnes pratiques entre pairs.

### 3. Se concentrer sur l'outil plutôt que sur le cas d'usage

"Voici comment utiliser ChatGPT" est une mauvaise formation IA. "Voici comment réduire de 70 % le temps de rédaction de vos rapports mensuels" est une excellente formation IA. La différence : l'une enseigne un outil, l'autre résout un problème réel.

## Comment structurer un programme de formation IA efficace

**Phase 1 : Audit des usages (semaine 1-2)**
Avant toute formation, cartographiez les tâches répétitives de chaque département. Identifiez les 5 cas d'usage à fort ROI. Ce diagnostic vous permettra de personnaliser la formation et de mesurer l'impact réel.

**Phase 2 : Formation par métier (jour 1-2)**
Sessions de 3 à 4 heures par groupe métier (commercial, marketing, RH, finance, direction). Contenu : principes fondamentaux du prompting, 5 cas d'usage concrets pratiqués en live, exercices avec leurs propres documents et situations réelles.

**Phase 3 : Suivi et coaching (mois 1-3)**
Sessions mensuelles de 1 heure en groupe pour partager les avancées et débloquer les obstacles. Accès à un canal de support (Slack ou Teams) pour les questions quotidiennes. Revue des KPI à 90 jours.

## Comment convaincre la direction

**L'argument financier :** utilisez la formule ROI ci-dessus avec les chiffres réels de votre entreprise. Présentez un cas conservateur, un cas médian, et un cas optimiste.

**Le risque de l'inaction :** vos concurrents forment déjà leurs équipes. Dans 18 mois, l'écart de productivité sera visible et difficile à combler. La question n'est pas "est-ce qu'on investit ?" mais "quand ?"

**Le benchmark concurrentiel :** une étude McKinsey de 2025 indique que les entreprises qui ont formé plus de 50 % de leurs effectifs à l'IA ont constaté une augmentation de 23 % de leur productivité globale en 18 mois.

## Conclusion

Former ses collaborateurs à l'IA n'est pas un projet RH périphérique. C'est un levier de compétitivité direct, avec un ROI mesurable et rapide. La clé : partir des cas d'usage réels, personnaliser par métier, et assurer un suivi dans la durée. L'IA ne remplace pas vos équipes, elle leur donne un avantage décisif sur ceux qui ne savent pas s'en servir.`,
  },

  // =========================================================================
  // Article 6 : Pourquoi votre site ne convertit pas
  // =========================================================================
  {
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
      alt: "Écran d'ordinateur affichant une heatmap de site web avec des zones chaudes en orange et rouge",
    },
    images: [
      {
        src: '/images/blog/site-web-convertit-ux.png',
        alt: "Diagramme d'entonnoir de conversion UX avec les points de friction identifiés",
        caption: "L'entonnoir de conversion : chaque étape peut être un point de fuite",
      },
    ],
    tags: ['UX', 'conversion', 'site web', 'heatmap', 'CRO', 'PME'],
    seoTitle: 'Site vitrine qui ne convertit pas : 7 causes · DKDP',
    seoDescription:
      'Votre site reçoit du trafic mais peu de leads ? Découvrez les 7 raisons les plus fréquentes et un plan d\'action concret en 30 jours pour améliorer votre taux de conversion.',
    content: `## Le vrai problème : votre site informe mais ne convainc pas

La plupart des PME qui se plaignent de leur site web pensent avoir un problème de SEO. "Si on avait plus de trafic, on aurait plus de clients." Dans la majorité des cas, ce diagnostic est faux.

Le vrai problème est en aval : votre site reçoit du trafic, mais ce trafic ne se transforme pas en contacts, en appels, en ventes. C'est un problème de conversion, pas de visibilité. Et le bon nouvelles, c'est que la conversion est bien plus rapide à améliorer que le SEO.

Un taux de conversion typique pour un site vitrine de PME se situe entre 1 et 3 %. Si le vôtre est en dessous de 0,5 %, vous avez un problème structurel à résoudre avant d'investir un centime supplémentaire en publicité ou en SEO.

## Les 7 raisons les plus fréquentes

### 1. Pas de proposition de valeur claire above the fold

La première chose que voit un visiteur sur votre site doit répondre à une question : "Qu'est-ce que vous faites et pourquoi devrais-je rester ?" Si votre titre de héro est "Bienvenue chez nous" ou le nom de votre entreprise seul, vous perdez 60 % de vos visiteurs avant qu'ils aient scrollé.

La proposition de valeur idéale : un titre qui dit ce que vous faites, pour qui, et ce qui vous différencie. Exemple : "Création de sites web pour les PME suisses qui veulent générer des leads, pas juste exister."

### 2. CTA vague ou absent

"En savoir plus" n'est pas un appel à l'action. "Contactez-nous" est mieux mais générique. "Obtenez votre audit gratuit en 48h" est un CTA. La différence : il dit ce que le visiteur va recevoir, pas juste ce qu'il doit faire.

Vérifiez que chaque page de votre site a au moins un CTA clair, visible, et orienté bénéfice pour le visiteur.

### 3. Temps de chargement supérieur à 3 secondes

Au-delà de 3 secondes, vous perdez en moyenne 40 % de vos visiteurs mobiles. Testez votre site sur PageSpeed Insights maintenant. Si votre score mobile est inférieur à 70, corrigez ça avant tout.

### 4. Pas de preuve sociale

Un visiteur qui arrive sur votre site ne vous connaît pas. Il n'a aucune raison de vous faire confiance par défaut. Les éléments qui brisent cette barrière : témoignages clients réels (avec photo et nom), logos de clients reconnaissables, chiffres concrets ("127 projets livrés", "4,8/5 sur 64 avis Google"), certifications, mentions presse.

### 5. Formulaire trop long ou trop intrusif

Chaque champ supplémentaire dans votre formulaire de contact réduit votre taux de conversion. La règle : demandez uniquement ce dont vous avez besoin pour répondre. Nom, email, sujet du projet. Pas de téléphone obligatoire, pas de SIRET, pas de questions à rallonge. Vous obtiendrez les détails lors de l'échange.

### 6. Navigation confuse

Plus votre menu a d'options, moins vos visiteurs savent où aller. Le paradoxe du choix s'applique aussi aux sites web. Un menu idéal pour un site vitrine PME : 5 à 6 items maximum, avec un CTA visible en fin de header. Simplifiez, regroupez, supprimez.

### 7. Site non optimisé mobile

En 2026, plus de 60 % du trafic web provient du mobile. Si votre site est conçu pour desktop et "adapté" au mobile comme une réflexion secondaire, vous offrez une expérience dégradée à la majorité de vos visiteurs. Testez votre site sur votre téléphone, comme un vrai utilisateur.

___IMG:site-web-convertit-ux.png___

## Comment diagnostiquer avec des outils gratuits

**Hotjar (plan gratuit)** : installez les heatmaps sur vos pages principales. Vous verrez exactement où les visiteurs cliquent, jusqu'où ils scrollent, et où ils abandonnent. C'est le diagnostic le plus révélateur que vous puissiez faire.

**Google Analytics 4** : analysez le taux d'engagement par page, le taux de rebond, et les parcours de navigation. Les pages avec un taux de rebond supérieur à 80 % sont vos priorités immédiates.

**PageSpeed Insights** : testez chaque page importante de votre site sur mobile. Les recommandations sont directement actionnables.

## Le plan d'action en 30 jours

**Semaine 1 : Audit complet.** Installez Hotjar. Analysez Google Analytics. Testez toutes vos pages clés sur mobile et PageSpeed Insights. Listez les 10 problèmes les plus impactants.

**Semaine 2 : Quick wins.** Reécrivez vos CTA, clarifiez votre proposition de valeur en héro, ajoutez au moins 3 témoignages clients avec photo, allégez votre formulaire. Ces changements ne prennent pas plus de 2 jours.

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
  },

  // =========================================================================
  // Article 7 : No-code / Low-code
  // =========================================================================
  {
    slug: 'no-code-low-code-pme-suisse',
    category: 'outils',
    title: 'No-code et low-code : les outils qui remplacent un développeur pour votre PME suisse',
    excerpt:
      'En 2026, créer une application, un site ou un workflow automatisé ne demande plus forcément de développeur. Le no-code et le low-code ont atteint une maturité qui change la donne pour les PME suisses.',
    date: '29 janvier 2026',
    dateISO: '2026-01-29',
    readTime: '8 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/no-code-low-code-hero.png',
      alt: 'Interface de programmation visuelle avec des blocs colorés connectés par des courbes dans un espace sombre',
    },
    images: [
      {
        src: '/images/blog/no-code-low-code-ecosystem.png',
        alt: "Carte de l'écosystème no-code avec des noeuds représentant différents outils",
        caption: "L'écosystème no-code/low-code : du site web à l'automatisation, un outil pour chaque besoin",
      },
    ],
    tags: ['no-code', 'low-code', 'Webflow', 'Bubble', 'Airtable', 'PME', 'outils'],
    seoTitle: 'No-code et low-code pour PME suisses : top outils 2026',
    seoDescription:
      'Tour d\'horizon des outils no-code et low-code pour les PME suisses en 2026. Sites, apps métier, automatisations, bases de données : lequel choisir et quand garder un développeur.',
    content: `## La révolution silencieuse : construire sans coder

En 2019, "no-code" était encore un terme de niche, réservé aux early adopters et aux startups en manque de budget développeur. En 2026, c'est une réalité opérationnelle pour des millions d'entreprises dans le monde. Des plateformes comme Webflow, Bubble, Airtable et Make ont atteint un niveau de maturité qui leur permet de couvrir 80 % des besoins numériques d'une PME standard.

Pour les PME suisses, l'enjeu est considérable. Le coût d'un développeur senior en Suisse romande dépasse facilement 120 000 CHF par an. Le no-code ne remplace pas tout, mais il déplace significativement le curseur de ce qui nécessite réellement du code sur mesure.

## No-code vs Low-code : la vraie différence

Le **no-code** s'adresse aux non-développeurs. Tout se fait via des interfaces visuelles : glisser-déposer, formulaires de configuration, sélection d'actions prédéfinies. Aucune compétence technique n'est requise.

Le **low-code** offre la même base visuelle mais permet d'injecter du code personnalisé aux points critiques. Il cible les "citizen developers" : des profils semi-techniques qui comprennent la logique applicative mais ne maîtrisent pas un langage de programmation complet.

En pratique, la frontière est floue. La plupart des outils se positionnent quelque part sur ce spectre, et vous n'avez pas besoin de choisir un camp : choisissez l'outil qui résout votre problème.

## Les 5 catégories d'outils et leurs champions

### 1. Sites web et landing pages

**Webflow** est la référence pour les sites marketing haut de gamme. Son éditeur visuel produit du code HTML/CSS propre, il est compatible avec les bonnes pratiques SEO, et son CMS permet de gérer du contenu sans friction. Idéal pour les agences et les entreprises qui veulent un site professionnel sans développeur.

**Framer** monte en puissance pour les sites d'une seule page et les portfolios avec des interactions avancées. Sa courbe d'apprentissage est douce et les résultats visuels sont impressionnants.

**Squarespace et Wix** restent valides pour les PME avec des besoins simples et des budgets serrés, mais leur flexibilité est limitée dès qu'on sort des templates standards.

### 2. Applications métier

**Bubble** est la plateforme no-code la plus puissante pour créer de vraies applications web : gestion de réservations, marketplace, portail client, outil interne. Il a une courbe d'apprentissage réelle mais les possibilités sont étendues.

**Glide** transforme des Google Sheets ou Airtable en applications mobiles en quelques heures. Parfait pour les apps internes (suivi de terrain, inventaire, checklist).

**AppGyver (SAP Build Apps)** cible les entreprises qui veulent des apps mobiles natives sans développement iOS/Android.

### 3. Automatisations

**Make** et **Zapier** sont traités en détail dans notre article sur l'automatisation des tâches répétitives. **n8n** complète la liste pour les équipes qui veulent un contrôle total et l'hébergement on-premise.

### 4. Bases de données et CRM

**Airtable** est à mi-chemin entre tableur et base de données relationnelle. Idéal pour gérer des projets complexes, des catalogues produits, des pipelines de vente ou des processus RH avec des vues multiples (grille, kanban, calendrier, galerie).

**Notion** excelle pour la gestion de connaissance et les wikis d'équipe. Son modèle de base de données est plus simple qu'Airtable mais suffisant pour la majorité des PME.

**Monday.com** se positionne sur la gestion de projet et les workflows d'équipe avec une interface très accessible.

### 5. Formulaires et onboarding

**Typeform** est la référence pour les formulaires conversationnels avec un taux de complétion nettement supérieur aux formulaires classiques. Idéal pour les questionnaires de qualification, les enquêtes de satisfaction.

**Tally** est une alternative gratuite (jusqu'à un certain volume) avec une interface épurée et une intégration facile à Notion et Airtable.

**Paperform** combine formulaire et page de destination avec des capacités de paiement intégrées.

___IMG:no-code-low-code-ecosystem.png___

## Ce que le no-code ne peut PAS faire (honnêteté)

Le no-code a des limites réelles qu'il faut reconnaître pour ne pas se retrouver bloqué au mauvais moment.

**Performance :** les applications Bubble ou les sites Webflow complexes ne rivaliseront jamais avec du code optimisé sur mesure. Pour des applications à très forte charge (dizaines de milliers d'utilisateurs simultanés), le no-code atteint ses limites.

**Personnalisation avancée :** certains designs ou comportements très spécifiques sont impossibles à implémenter en no-code pur. Si votre différenciation concurrentielle repose sur une expérience utilisateur unique et très personnalisée, le code sur mesure reste nécessaire.

**Données sensibles :** pour les applications qui traitent des données médicales, financières ou RH avec des exigences de conformité strictes (LPD, RGPD, HIPAA), l'hébergement sur des plateformes no-code tierces peut poser problème. n8n auto-hébergé et des solutions low-code sur infrastructure privée sont alors plus adaptées.

**Scalabilité :** les coûts des plateformes no-code peuvent croître rapidement avec le volume d'utilisateurs ou d'opérations. Calculez toujours le coût à l'échelle que vous visez dans 24 mois, pas seulement aujourd'hui.

## Quand garder un développeur malgré tout

Malgré la puissance du no-code, certains cas d'usage nécessitent du développement sur mesure : intégrations avec des systèmes legacy complexes (ERP anciens, logiciels métier spécifiques à votre secteur), algorithmes propriétaires (moteur de recommandation, calcul de prix dynamique), applications mobiles natives avec accès aux fonctionnalités hardware (Bluetooth, NFC, capteurs), exigences de performance ou de sécurité très élevées.

Dans ces cas, le bon arbitrage n'est pas "no-code ou développement" mais "no-code pour le reste, développement sur mesure pour les différenciateurs".

## Budget comparatif : no-code vs développement sur mesure

| Projet | No-code | Développement sur mesure |
|---|---|---|
| Site vitrine PME | 3 000 à 8 000 CHF | 8 000 à 25 000 CHF |
| Application interne simple | 2 000 à 5 000 CHF | 15 000 à 40 000 CHF |
| Automatisation 10 workflows | 500 à 2 000 CHF | 5 000 à 15 000 CHF |
| CRM sur mesure | 1 500 à 4 000 CHF | 20 000 à 60 000 CHF |

*Les fourchettes no-code incluent la configuration initiale et la première année d'abonnement.*

## Conclusion

Le no-code et le low-code ne suppriment pas le besoin de réflexion stratégique, de design, ou d'expertise métier. Ils suppriment la barrière technique entre votre idée et son implémentation. Pour une PME suisse en 2026, la question n'est plus "est-ce qu'on peut se permettre de construire ça ?", mais "quel est le bon outil pour construire ça au bon coût ?"`,
  },

  // =========================================================================
  // Article 8 : Cybersécurité PME
  // =========================================================================
  {
    slug: 'cybersecurite-pme-erreurs-courantes',
    category: 'formation',
    title: "Cybersécurité pour PME : les 8 erreurs qui vous exposent (et comment les corriger ce mois-ci)",
    excerpt:
      '60 % des cyberattaques ciblent les PME, et la moitié des entreprises touchées ne s\'en remettent pas. Voici les 8 erreurs de sécurité les plus courantes et un plan d\'action minimal pour vous protéger rapidement.',
    date: '22 janvier 2026',
    dateISO: '2026-01-22',
    readTime: '9 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/cybersecurite-pme-hero.png',
      alt: 'Bouclier numérique géant en lumière violette repoussant des menaces informatiques dans un environnement sombre',
    },
    images: [
      {
        src: '/images/blog/cybersecurite-pme-risques.png',
        alt: 'Matrice de risques cybersécurité avec des cellules colorées du vert au rouge',
        caption: 'Matrice de risques : probabilité vs impact. Les zones rouges demandent une action immédiate',
      },
    ],
    tags: ['cybersécurité', 'PME', 'sécurité', 'RGPD', 'phishing', 'mots de passe'],
    seoTitle: 'Cybersécurité PME 2026 : 8 erreurs à corriger · DKDP',
    seoDescription:
      '60 % des cyberattaques visent les PME. Découvrez les 8 erreurs de sécurité les plus fréquentes et un plan d\'action concret pour renforcer votre protection ce mois-ci.',
    content: `## La réalité : les PME sont la cible principale des cyberattaques

Le mythe persiste : "les hackers ne s'intéressent qu'aux grandes entreprises." C'est l'inverse. En 2025, 60 % des cyberattaques documentées ciblaient des PME de moins de 250 employés. La raison est simple : les PME ont des données de valeur (données clients, bancaires, propriété intellectuelle) mais des défenses bien plus faibles que les grandes structures.

Le coût moyen d'une cyberattaque pour une PME suisse est estimé entre 50 000 et 250 000 CHF, en comptant la récupération des données, l'arrêt d'activité, les frais juridiques et les amendes potentielles liées à la LPD (Loi sur la Protection des Données). 43 % des PME touchées déposent le bilan dans les 6 mois suivant une attaque majeure.

Ce n'est pas pour vous faire peur. C'est pour ancrer la décision de sécuriser votre infrastructure dans la réalité économique.

## Les 8 erreurs qui vous exposent

### 1. Mots de passe faibles et partagés

"Password123" ou le nom de votre entreprise suivi de l'année : ces mots de passe sont cracqués en quelques secondes par des outils automatisés. Le problème aggravant : le partage de mots de passe entre collègues, sans traçabilité.

**Solution :** déployez un gestionnaire de mots de passe d'entreprise (1Password Teams, Bitwarden Business, Dashlane for Business). Chaque collaborateur a son propre compte sécurisé, les accès partagés sont contrôlés, et les mots de passe sont générés aléatoirement (20+ caractères).

### 2. Pas d'authentification à deux facteurs

L'authentification à deux facteurs (2FA) bloque 99,9 % des attaques automatisées sur les comptes, même si le mot de passe est compromis. Et pourtant, la majorité des PME ne l'ont pas activée sur leurs services critiques.

**Solution :** activez le 2FA sur tous les services sensibles en priorité : Microsoft 365 / Google Workspace, accès VPN, comptabilité en ligne, banking. Utilisez une app d'authentification (Authy, Google Authenticator, Microsoft Authenticator) plutôt que les SMS.

### 3. Logiciels non mis à jour

Les mises à jour de sécurité corrigent des vulnérabilités connues et documentées. Un système non mis à jour est une porte ouverte à des attaques qui exploitent des failles déjà répertoriées. Cela concerne Windows, macOS, mais aussi WordPress, ses plugins, et tout logiciel métier.

**Solution :** activez les mises à jour automatiques là où c'est possible. Pour WordPress, utilisez un outil de monitoring (ManageWP, MainWP) qui centralise les mises à jour de tous vos sites.

### 4. Emails non sécurisés

Sans SPF, DKIM et DMARC configurés sur votre domaine email, n'importe qui peut envoyer des emails en se faisant passer pour vous. C'est la base technique de l'usurpation d'identité par email, qui expose vos clients et partenaires.

**Solution :** demandez à votre hébergeur ou à votre développeur de vérifier et configurer SPF, DKIM et DMARC sur votre domaine. C'est une configuration DNS qui prend une heure et qui protège votre réputation d'expéditeur.

### 5. Pas de sauvegarde testée régulièrement

Avoir une sauvegarde ne suffit pas : encore faut-il avoir testé sa restauration. Des dizaines de PME ont découvert que leurs sauvegardes étaient corrompues ou incomplètes au moment où elles en avaient besoin.

**Solution :** règle du 3-2-1 : 3 copies de vos données, sur 2 supports différents, dont 1 hors site (cloud). Testez la restauration d'un fichier depuis votre sauvegarde au moins une fois par trimestre.

### 6. Accès trop larges aux employés

Le principe du moindre privilège est simple : chaque collaborateur ne doit avoir accès qu'aux données et systèmes dont il a réellement besoin pour son travail. Or, dans la plupart des PME, tout le monde a accès à tout "par facilité".

**Solution :** auditez vos accès. Révoquez les accès des anciens collaborateurs (immédiatement au départ). Créez des groupes d'accès par rôle plutôt que des accès individuels ad hoc.

### 7. Wifi d'entreprise non sécurisé

Un réseau Wifi d'entreprise avec un mot de passe partagé à toute l'équipe et aux visiteurs est une faille béante. Toute personne sur le réseau peut potentiellement intercepter le trafic non chiffré ou attaquer d'autres appareils connectés.

**Solution :** séparez votre réseau Wifi en deux : un réseau privé (employés, appareils de travail) avec WPA3 et un mot de passe complexe, et un réseau invités isolé pour les visiteurs et appareils personnels.

### 8. Pas de formation phishing pour les équipes

91 % des cyberattaques réussies commencent par un email de phishing. Vos collaborateurs sont la dernière ligne de défense, et ils doivent être formés à reconnaître les tentatives de manipulation.

**Solution :** organisez au minimum une formation annuelle sur les signaux de phishing. Des outils comme KnowBe4 ou Proofpoint permettent d'envoyer de faux emails de phishing pour tester et former vos équipes sans risque réel.

___IMG:cybersecurite-pme-risques.png___

## Le plan d'action minimal en 30 jours

**Semaines 1-2 : Authentification.** Déployez un gestionnaire de mots de passe. Activez le 2FA sur tous les services critiques. Révoquez les accès des anciens collaborateurs.

**Semaine 3 : Sauvegardes.** Auditez votre stratégie de sauvegarde actuelle. Mettez en place la règle 3-2-1. Testez une restauration.

**Semaine 4 : Formation équipe.** Organisez une session de 1h sur le phishing et les bonnes pratiques de sécurité. Configurez SPF/DKIM/DMARC. Séparez vos réseaux Wifi.

## Outils recommandés

| Outil | Usage | Prix |
|---|---|---|
| 1Password Teams | Gestionnaire de mots de passe | 5 $/utilisateur/mois |
| Bitwarden Business | Gestionnaire de mots de passe (open-source) | 3 $/utilisateur/mois |
| Authy | Authentification 2FA | Gratuit |
| Backblaze B2 | Sauvegarde cloud | 6 $/To/mois |
| Malwarebytes for Teams | Protection endpoints | 4 $/appareil/mois |
| KnowBe4 | Formation phishing | Sur devis |
| Have I Been Pwned | Vérification de fuite de données | Gratuit |

## Conclusion

La cybersécurité n'est pas un projet réservé aux DSI des grandes entreprises. C'est un ensemble de bonnes pratiques accessibles à toute PME, souvent à faible coût. Les 8 points couverts dans cet article constituent le socle minimal. Commencez ce mois-ci par les deux premières priorités : gestionnaire de mots de passe et 2FA. Ces deux mesures seules réduisent votre surface d'attaque de façon drastique.`,
  },

  // =========================================================================
  // Article 9 : Audit digital 360
  // =========================================================================
  {
    slug: 'audit-digital-360-avant-de-se-lancer',
    category: 'outils',
    title: "L'audit digital 360 : tout ce qu'il faut analyser avant de refaire son site web",
    excerpt:
      'Refaire son site web sans audit préalable, c\'est construire sur des fondations inconnues. Voici les 6 dimensions à analyser en profondeur avant de lancer votre refonte, avec la checklist complète des 20 points à valider.',
    date: '15 janvier 2026',
    dateISO: '2026-01-15',
    readTime: '11 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/audit-digital-hero.png',
      alt: 'Salle de commande numérique avec des écrans analytiques affichant des données et visualisations en lumière violette',
    },
    images: [
      {
        src: '/images/blog/audit-digital-radar.png',
        alt: "Graphique radar hexagonal pour l'audit digital avec 6 axes : SEO, Performance, UX, Sécurité, Contenu, Analytics",
        caption: "Le radar d'audit digital DKDP : 6 dimensions pour une vue complète de votre présence en ligne",
      },
    ],
    tags: ['audit digital', 'SEO', 'UX', 'refonte web', 'stratégie', 'PME'],
    seoTitle: 'Audit digital 360 avant refonte web : les 6 dimensions',
    seoDescription:
      'Avant de refaire votre site, réalisez un audit digital 360. SEO, performance, UX, sécurité, contenu, analytics : les 6 dimensions et 20 points de contrôle indispensables.',
    content: `## Pourquoi refaire un site sans audit préalable est une erreur coûteuse

Chaque année, des centaines de PME investissent entre 10 000 et 50 000 CHF dans une refonte de site web, pour réaliser six mois plus tard que les mêmes problèmes subsistent. Trafic stagnant, taux de conversion décevant, positionnement Google inchangé.

Pourquoi ? Parce qu'elles ont refait le design sans comprendre ce qui ne fonctionnait pas sur l'ancien site. La refonte était une réponse esthétique à un problème stratégique.

Un audit digital 360 effectué avant toute refonte change radicalement ce résultat. Il révèle ce qui fonctionne et doit être préservé, ce qui est cassé et doit être corrigé, et ce qui manque et doit être construit. C'est la fondation sur laquelle votre nouveau site sera conçu.

## Les 6 dimensions de l'audit digital

### 1. SEO (référencement naturel)

L'audit SEO couvre quatre sous-dimensions :

**Ranking et mots-clés :** Sur quels mots-clés êtes-vous positionné ? Quelles sont les opportunités de mots-clés à fort volume et faible concurrence dans votre secteur ? Des outils comme Semrush, Ahrefs ou Ubersuggest permettent de cartographier votre visibilité actuelle.

**Backlinks :** Combien de sites font des liens vers le vôtre, et lesquels ? La qualité du profil de liens entrants est un signal de confiance majeur pour Google. Un audit des backlinks révèle aussi les liens toxiques à désavouer.

**Technique :** Crawlabilité (Google peut-il accéder à toutes vos pages ?), indexation (quelles pages sont indexées et lesquelles ne le sont pas ?), sitemap XML, robots.txt, cannonical tags, pagination, structure des URLs.

**Contenu :** Duplicate content, thin content (pages avec trop peu de contenu), pages orphelines (non liées depuis le site), optimisation des balises title et meta description.

### 2. Performance (Core Web Vitals)

La performance technique de votre site est à la fois un facteur SEO et un facteur de conversion. Mesurez vos Core Web Vitals (LCP, CLS, INP) avec PageSpeed Insights sur les 10 pages les plus visitées de votre site, en mobile et desktop.

Identifiez les goulots d'étranglement : images non optimisées, JavaScript bloquant, CSS inutilisé, serveur lent (TTFB élevé), absence de CDN. Chaque point de performance gagné se traduit en trafic conservé et en conversions supplémentaires.

### 3. UX (expérience utilisateur)

L'audit UX répond à une question fondamentale : est-ce que votre site aide vraiment vos visiteurs à trouver ce qu'ils cherchent et à passer à l'action ?

Outils à utiliser : Hotjar ou Microsoft Clarity pour les heatmaps (où cliquent les utilisateurs) et les enregistrements de sessions (comment se comportent-ils réellement). Google Analytics pour les parcours de navigation, les pages de sortie, et les taux de rebond par page.

Points à évaluer : clarté de la proposition de valeur above-the-fold, hiérarchie de l'information, présence et pertinence des CTAs, fluidité du parcours vers la conversion, cohérence de la navigation.

### 4. Sécurité

Un site web non sécurisé expose vos visiteurs et votre réputation. L'audit de sécurité couvre : certificat SSL valide et à jour, version de CMS à jour (WordPress, Drupal, etc.), plugins et thèmes à jour, configuration des headers de sécurité HTTP (HSTS, CSP, X-Frame-Options), scan de vulnérabilités avec des outils comme WPScan (WordPress) ou OWASP ZAP.

### 5. Contenu

Le contenu est souvent le parent pauvre des audits digitaux. Pourtant, un contenu obsolète, mal structuré ou non aligné sur l'intention de recherche de vos cibles peut ruiner tous vos efforts SEO.

Auditez : la qualité et l'actualité de chaque page (est-ce que l'information est toujours exacte ?), la couverture des sujets importants pour vos clients (existe-t-il des lacunes ?), la structure des textes (titres H1/H2/H3, listes, paragraphes courts), la présence et la qualité des images et médias.

### 6. Analytics et tracking

Avant de lancer une refonte, assurez-vous que votre base de données analytiques est fiable. Un tracking mal configuré vous prive d'insights précieux pour mesurer l'impact de votre nouveau site.

Points à vérifier : Google Analytics 4 correctement configuré avec les événements clés (soumissions de formulaires, clics sur le téléphone, téléchargements), données de conversion trackées en bout de funnel, attribution des sources de trafic, données historiques sauvegardées avant migration.

___IMG:audit-digital-radar.png___

## Les outils d'audit indispensables

**SEO :** Semrush ou Ahrefs (payants, 100-200 $/mois), Screaming Frog (gratuit jusqu'à 500 URLs), Google Search Console (gratuit), Ubersuggest (freemium).

**Performance :** PageSpeed Insights (gratuit), Lighthouse dans Chrome DevTools (gratuit), WebPageTest (gratuit), GTmetrix (freemium).

**UX :** Hotjar (freemium), Microsoft Clarity (gratuit), Google Analytics 4 (gratuit).

**Sécurité :** SSL Labs (gratuit), WPScan (gratuit), SecurityHeaders.com (gratuit), Sucuri SiteCheck (gratuit).

**Contenu :** Screaming Frog pour l'audit structurel (gratuit), Google Search Console pour les pages indexées, Semrush Writing Assistant pour la qualité.

**Analytics :** Google Analytics 4 (gratuit), Google Tag Assistant (gratuit extension Chrome).

## Comment prioriser les axes à traiter

Une fois l'audit réalisé, vous disposez d'une liste de problèmes à corriger. Comment décider par où commencer ? La matrice impact/effort.

Tracez un repère avec "Impact sur les objectifs business" en ordonnée et "Effort de correction" en abscisse. Positionnez chaque problème identifié. Les actions à fort impact et faible effort sont vos priorités absolues. Les actions à fort impact et fort effort constituent votre feuille de route. Les actions à faible impact peuvent être reportées ou abandonnées.

## La checklist de l'audit digital complet

- Positions Google sur les 20 mots-clés principaux documentées
- Volume de trafic mensuel par source analysé (organique, direct, social, payant)
- Profil de backlinks audité, liens toxiques identifiés
- Core Web Vitals mesurés sur mobile et desktop (10 pages clés)
- Score PageSpeed supérieur à 70 sur mobile vérifié
- Taux de rebond par page analysé dans GA4
- Heatmaps installées sur les 5 pages les plus visitées
- CTAs identifiés et évalués sur chaque page clé
- Certificat SSL valide confirmé
- Version du CMS et des plugins à jour vérifiée
- Headers de sécurité HTTP configurés
- Scan de vulnérabilités réalisé
- Toutes les pages auditées pour la qualité et l'actualité du contenu
- Duplicate content détecté et documenté
- Balises title et meta description optimisées sur les pages clés
- Google Analytics 4 correctement configuré (événements, objectifs)
- Données de conversion trackées de bout en bout
- Sitemap XML à jour et soumis dans Search Console
- Robots.txt vérifié
- Sauvegarde complète du site actuel effectuée avant tout changement

## Ce que révèle généralement un audit chez nos clients

Sans nommer de clients, les audits que nous réalisons révèlent systématiquement les mêmes patterns : une majorité des pages du site ne reçoivent aucun trafic organique (souvent 70 à 80 % des pages), le formulaire de contact sur mobile est source de frictions majeures (champs non adaptés, bouton trop petit), les balises title sont soit absentes soit dupliquées sur plusieurs pages, et le tracking Analytics est incomplet ou mal configuré (les conversions ne sont pas mesurées).

Ces problèmes, une fois identifiés, guident entièrement la stratégie de refonte. Vous ne redesignez plus pour le plaisir : vous corrigez des problèmes documentés avec des impacts mesurables.

## Conclusion : l'audit comme fondation de votre stratégie digitale

Un audit digital 360 ne se fait pas en une heure. Pour un site de 50 à 200 pages, comptez 2 à 4 jours de travail approfondi. Mais c'est un investissement qui change la trajectoire de votre refonte.

Avec un audit solide, votre brief d'agence est précis, vos priorités sont fondées sur des données réelles, et votre nouveau site a une base stratégique, pas juste esthétique. C'est ce qui fait la différence entre un site web qui génère de la valeur et un site web qui existe juste pour exister.`,
  },

  // =========================================================================
  // Article 10 : Combien coûte un site web à Genève en 2026
  // =========================================================================
  {
    slug: 'cout-site-web-geneve-2026',
    category: 'seo',
    title: 'Combien coûte un site web à Genève en 2026 ? Tarifs, fourchettes et pièges à éviter',
    excerpt:
      'Entre 500 CHF et 50\'000 CHF : les écarts de prix pour un site web à Genève sont immenses. Ce guide vous explique ce qui justifie ces différences, les fourchettes réalistes selon votre projet, et comment éviter les mauvaises surprises.',
    date: '2 avril 2026',
    dateISO: '2026-04-02',
    readTime: '7 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/cout-site-web-geneve-hero.png',
      alt: 'Tableau de bord avec budgets et graphiques pour un projet web à Genève',
    },
    images: [
      {
        src: '/images/blog/cout-site-web-geneve-tableau.png',
        alt: 'Tableau comparatif des prix selon le type de site web à Genève',
        caption: 'Fourchettes de prix pour les principaux types de sites web en Suisse romande (2026)',
      },
    ],
    tags: ['création site web', 'prix', 'Genève', 'PME', 'budget', 'agence digitale'],
    seoTitle: 'Prix d\'un site web à Genève en 2026 : tarifs et fourchettes',
    seoDescription:
      'Combien coûte un site web à Genève en 2026 ? Découvrez les fourchettes de prix réalistes selon le type de projet, ce qui justifie les écarts, et comment éviter les mauvaises surprises.',
    content: `## Pourquoi les prix varient autant : de 500 à 50\'000 CHF

C\'est la première question que posent les PME genevoises quand elles cherchent à créer ou refaire leur site web. Et la réponse est souvent décevante : "ça dépend." Mais "ça dépend de quoi" précisément ?

La réalité, c\'est que le marché genevois est particulièrement fragmenté. Vous pouvez obtenir un site Wix en quelques heures pour 30 CHF/mois, ou commander un projet custom à une agence pour 25\'000 CHF, et les deux peuvent être "adaptés à votre situation" selon l\'interlocuteur. La clé est de comprendre ce que vous achetez réellement dans chaque cas.

## Les fourchettes réalistes par type de projet

| Type de site | Fourchette CHF | Délai typique | Pour qui |
|---|---|---|---|
| Site DIY (Wix, Squarespace) | 0 - 500/an | 1-3 jours | Indépendant, micro-activité |
| Site vitrine template (agence) | 2\'500 - 6\'000 | 3-6 semaines | PME avec besoins standards |
| Site vitrine custom | 6\'000 - 15\'000 | 6-12 semaines | PME exigeante, secteur concurrentiel |
| Site e-commerce Shopify/WooCommerce | 5\'000 - 20\'000 | 8-16 semaines | Commerce en ligne, boutique |
| Site sur-mesure full-stack | 15\'000 - 50\'000+ | 3-6 mois | Plateforme, fonctionnalités complexes |

Ces fourchettes incluent le design, le développement et le lancement. Elles n\'incluent généralement pas l\'hébergement annuel (200-600 CHF/an), le SEO, la maintenance ou la création de contenu.

## Ce qui compose réellement un devis

Quand une agence genevoise vous soumet un devis, voici ce que cachent les lignes :

**Design UX/UI (20-30% du budget)** : pas juste "faire joli". Cela inclut l\'analyse de votre audience, les wireframes, la charte graphique adaptée au digital, les maquettes desktop et mobile, et plusieurs allers-retours de validation.

**Développement (30-40%)** : intégration des maquettes, développement des fonctionnalités (formulaires, CMS, e-commerce, API tierces), tests multi-navigateurs et multi-appareils, optimisation des performances.

**SEO on-page (10-15%)** : structure de URL, balises title et meta, balisage sémantique H1/H2, optimisation des images, Core Web Vitals. C\'est ici que beaucoup de projets économisent à tort — un site invisible sur Google ne sert à rien.

**Gestion de projet et communication (15-20%)** : réunions de cadrage, suivi, recettes, formation à l\'utilisation du CMS. Ce temps est réel et nécessaire.

**Contenu et médias (variable)** : si l\'agence prend en charge la rédaction et les photos, ajoutez 1\'000 à 5\'000 CHF selon le volume.

## Les offres low-cost : ce qu\'on ne vous dit pas

Un site vitrine "complet" à 990 CHF existe. Mais voici ce qu\'il implique systématiquement : un template acheté 29 CHF personnalisé en quelques heures, aucun travail SEO, des performances médiocres (temps de chargement > 4 secondes), et une maintenance à vos frais dès le lendemain.

Ce n\'est pas nécessairement une escroquerie. Mais c\'est un produit différent d\'un site web stratégique. Le problème, c\'est que les deux sont vendus sous le même nom.

Le vrai coût d\'un site low-cost à 12 mois : 990 CHF initiaux + 300 CHF d\'hébergement + 1\'500 CHF de corrections + zéro clients via Google = bilan négatif.

## Les 5 questions à poser avant de signer

1. **Est-ce que le SEO on-page est inclus ?** (title, meta, structure sémantique, Core Web Vitals)
2. **Qui héberge le site et à quel prix après livraison ?**
3. **Puis-je modifier le contenu moi-même sans frais ?** (accès CMS)
4. **Qu\'est-ce qui n\'est pas inclus dans ce devis ?** (la question la plus révélatrice)
5. **Avez-vous des références clients dans mon secteur d\'activité à Genève ?**

## Ce qu\'on pratique chez DKDP

Après 700+ projets en Suisse romande, notre constat est clair : les PME qui investissent entre 6\'000 et 12\'000 CHF dans un site bien conçu récupèrent cet investissement en moins d\'un an si le SEO est correctement adressé.

Le site n\'est pas une dépense — c\'est un commercial qui travaille 24h/24. La question n\'est pas "combien ça coûte" mais "quel retour puis-je en attendre si c\'est bien fait."

## Conclusion

À Genève en 2026, un site vitrine professionnel bien référencé coûte entre 5\'000 et 12\'000 CHF pour une PME standard. En dessous, attendez-vous à des compromis importants sur le SEO, les performances ou la personnalisation. Au-dessus, vous payez la complexité fonctionnelle ou un positionnement premium.

La meilleure démarche : demandez 3 devis détaillés, comparez ligne par ligne, et choisissez l\'agence qui vous explique clairement ce qui est inclus — et ce qui ne l\'est pas.`,
  },

  // =========================================================================
  // Article 11 : Comment choisir son agence digitale à Genève
  // =========================================================================
  {
    slug: 'choisir-agence-digitale-geneve',
    category: 'seo',
    title: 'Comment choisir son agence digitale à Genève : 6 critères qui font vraiment la différence',
    excerpt:
      'Genève compte plusieurs dizaines d\'agences digitales. Mais entre les généralistes, les boutiques spécialisées et les freelances offshore, comment identifier le bon partenaire pour votre PME ? Voici 6 critères concrets pour faire le bon choix.',
    date: '1 avril 2026',
    dateISO: '2026-04-01',
    readTime: '6 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/choisir-agence-digitale-geneve-hero.png',
      alt: 'Réunion entre un client PME et une équipe d\'agence digitale à Genève',
    },
    images: [
      {
        src: '/images/blog/choisir-agence-digitale-geneve-criteres.png',
        alt: 'Checklist illustrée pour évaluer une agence digitale à Genève',
        caption: 'Les 6 critères clés pour choisir une agence digitale à Genève',
      },
    ],
    tags: ['agence digitale', 'Genève', 'PME', 'sélection prestataire', 'marketing digital'],
    seoTitle: 'Choisir son agence digitale à Genève : 6 critères clés',
    seoDescription:
      'Comment choisir la bonne agence digitale à Genève pour votre PME ? Découvrez les 6 critères concrets : spécialisation, références locales, transparence, SEO, et red flags à éviter.',
    content: `## Le problème : trop d\'agences, pas assez de clarté

Il y a une dizaine d\'années, une PME genevoise avait 5 ou 6 agences digitales à comparer. Aujourd\'hui, le marché s\'est multiplié : agences généralistes, boutiques spécialisées SEO, développeurs freelances qui proposent aussi du marketing, prestataires basés en France ou en Roumanie avec des équipes de vente locales...

Le résultat ? Un appel d\'offres moyen reçoit entre 6 et 12 propositions très disparates. Et le prix ne suffit pas à les différencier : une agence moins chère peut livrer un meilleur résultat qu\'une agence premium si le projet est bien adapté à son modèle.

Voici les 6 critères qui permettent de filtrer efficacement.

## Critère 1 : La spécialisation vs la généralité

Une agence "full-service" qui fait du web, du SEO, de la pub, des réseaux sociaux, de la vidéo et de l\'IA peut être excellente... ou médiocre dans tout. Demandez : **quels sont vos 3 services où vous obtenez les meilleurs résultats clients ?**

Si la réponse couvre tout sans prioriser, c\'est un signal. Les meilleures agences ont des expertises profondes dans 2 ou 3 domaines, et le font savoir.

## Critère 2 : Les références locales et sectorielles

Avoir fait 50 sites web est différent d\'avoir fait 5 sites web pour des PME dans votre secteur à Genève. Demandez des exemples concrets : **un site similaire au vôtre, avec des résultats mesurables avant/après**.

Une agence sérieuse peut vous montrer l\'évolution du trafic organique d\'un client, son taux de conversion, ses positions sur Google. Si elle ne peut pas — ou ne veut pas — partager ces données, posez-vous la question.

## Critère 3 : La transparence sur la sous-traitance

Beaucoup d\'agences genevoises vendent en local et développent à l\'étranger. Ce n\'est pas forcément un problème, mais c\'est un fait que certaines cachent. Demandez directement : **qui développe le site ? Qui rédige le contenu SEO ? Ces personnes sont-elles en Suisse ?**

La sous-traitance offshore peut fonctionner si elle est bien gérée. Mais si l\'agence la dissimule, c\'est un problème de confiance qui se répercutera sur toute la relation.

## Critère 4 : La vision SEO dès le départ

Un site web sans SEO est une brochure papier digitale. L\'agence que vous choisissez doit intégrer le référencement naturel dans sa réflexion dès la phase de stratégie, pas comme une option à cocher en fin de projet.

Testez-la : demandez-lui comment elle structure les URL, comment elle gère les balises title, comment elle optimise les Core Web Vitals. Si elle change de sujet ou répond "on fait le SEO après", passez votre chemin.

## Critère 5 : Le suivi et la relation post-livraison

Beaucoup de PME se retrouvent seules après la livraison de leur site. L\'agence a encaissé le projet, et les emails restent sans réponse. Demandez : **qui est mon interlocuteur après la mise en ligne ? Quelle est votre politique de maintenance et de support ?**

Exigez un contrat de maintenance clair ou a minima une garantie sur les bugs pendant 3 mois. Un site web doit évoluer — l\'agence qui le comprend est celle qui construit une relation, pas qui vend un produit.

## Critère 6 : La compréhension de votre marché

Une agence qui vous demande "quels sont vos objectifs business" avant de vous parler de technologie est une bonne agence. Celle qui parle immédiatement de WordPress, de template ou de nombre de pages sans vous avoir écouté... est une agence produit, pas une agence stratégique.

La bonne agence pose des questions sur vos clients, vos concurrents, votre processus de vente, ce qui vous différencie. Parce que c\'est de là que vient un site web qui convertit.

## Les red flags à fuir

- Garantie de résultats SEO en 30 jours (impossible)
- Devis en 10 minutes sans brief sérieux
- Portfolio sans résultats chiffrés
- Contrat sans clause de résiliation claire
- Hébergement "propriétaire" sans accès pour vous (vous perdez votre site si vous partez)

## Conclusion

Choisir une agence digitale à Genève, c\'est choisir un partenaire de croissance, pas un fournisseur de pages web. Prenez le temps du brief, comparez les réponses à vos vraies questions, et méfiez-vous autant du moins-disant que du trop-prometteur.

Chez DKDP, chaque projet commence par un appel de 30 minutes sans engagement pour comprendre votre situation réelle. Parce qu\'un bon site web commence par une bonne conversation.`,
  },

  // =========================================================================
  // Article 12 : SEO vs Google Ads à Genève
  // =========================================================================
  {
    slug: 'seo-vs-google-ads-geneve',
    category: 'seo',
    title: 'SEO ou Google Ads à Genève : que choisir pour votre PME en 2026 ?',
    excerpt:
      'SEO ou Google Ads : c\'est la question que se posent la plupart des PME genevoises quand elles veulent gagner en visibilité sur Google. Les deux ont leur logique, leurs coûts et leurs délais. Voici comment choisir selon votre situation réelle.',
    date: '31 mars 2026',
    dateISO: '2026-03-31',
    readTime: '6 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/seo-vs-google-ads-geneve-hero.png',
      alt: 'Comparaison visuelle entre résultats organiques SEO et annonces Google Ads sur une page de recherche',
    },
    images: [
      {
        src: '/images/blog/seo-vs-google-ads-geneve-tableau.png',
        alt: 'Tableau de comparaison SEO vs Google Ads sur 8 critères clés pour PME à Genève',
        caption: 'SEO vs Google Ads : comparatif sur 8 dimensions pour les PME de Suisse romande',
      },
    ],
    tags: ['SEO', 'Google Ads', 'référencement', 'Genève', 'PME', 'visibilité'],
    seoTitle: 'SEO vs Google Ads à Genève : que choisir pour votre PME ?',
    seoDescription:
      'SEO ou Google Ads pour votre PME à Genève ? Comparatif complet en 2026 : coûts, délais, ROI, et recommandations selon votre secteur et vos objectifs.',
    content: `## La vraie question : vitesse ou durabilité ?

Quand une PME genevoise veut apparaître sur Google, elle a deux grandes options : payer pour apparaître immédiatement (Google Ads) ou investir pour apparaître durablement (SEO). Les deux fonctionnent. Mais pas pour les mêmes raisons, pas dans les mêmes délais, et pas pour les mêmes budgets.

La plupart des conseils en ligne caricaturent la comparaison : "le SEO c\'est gratuit, les Ads c\'est payant" (faux), ou "les Ads donnent des résultats immédiats, le SEO prend du temps" (vrai mais incomplet). La réalité est plus nuancée — et beaucoup plus utile à comprendre pour prendre la bonne décision.

## Comparatif : SEO vs Google Ads sur 8 dimensions

| Critère | SEO | Google Ads |
|---|---|---|
| Délai avant premiers résultats | 3-6 mois | 24-48h |
| Coût au clic | 0 (trafic organique) | 1-8 CHF/clic à Genève |
| Budget mensuel minimal utile | 800-1\'500 CHF (prestation) | 500-1\'000 CHF (régie + budget) |
| Durabilité des résultats | Long terme (>2 ans) | Arrête à la fin du budget |
| Contrôle précis du ciblage | Non | Oui (mots-clés, horaires, zones) |
| Visibilité sur requêtes locales | Excellent | Excellent |
| Notoriété de marque | Fort | Modéré |
| ROI à 24 mois | Très élevé | Dépend du secteur |

## Quand choisir le SEO

Le SEO est le choix stratégique pour les PME qui s\'inscrivent dans la durée. Si votre activité sera la même dans 3 ans, que vous avez 6 mois devant vous avant d\'avoir besoin de résultats, et que vous êtes prêts à produire du contenu de qualité, le SEO offre le meilleur ROI à long terme.

À Genève, les requêtes locales comme "agence web Genève", "avocat droit du travail Genève" ou "plombier 1207" sont souvent moins compétitives qu\'on ne le pense. Une stratégie SEO locale bien menée peut placer une PME dans le top 5 en 4 à 6 mois sur ces requêtes.

Le SEO est indispensable si : vous avez un site avec du contenu (blog, fiches services, FAQ), votre secteur génère des recherches régulières sur Google, et vous voulez réduire votre dépendance aux plateformes payantes à terme.

## Quand choisir Google Ads

Google Ads est l\'outil de précision pour les PME qui ont besoin de résultats rapides, qui testent un nouveau marché, ou dont l\'activité est saisonnière.

**Exemples concrets :** un cabinet dentaire qui ouvre à Carouge et veut des patients dès le premier mois, une PME qui lance un service pendant la saison fiscale, ou une boutique qui a du stock à écouler avant une date limite.

Google Ads est aussi efficace pour tester la pertinence d\'un positionnement marketing avant d\'investir dans du contenu SEO. Si 1\'000 clics sur une requête ne génèrent aucun appel, repensez votre offre avant d\'en faire le pilier de votre stratégie SEO.

## La combinaison idéale pour une PME genevoise

La vraie réponse n\'est pas "l\'un ou l\'autre" — c\'est une question de phase :

**Phase 1 (0-6 mois)** : Google Ads pour générer des leads immédiatement pendant que le SEO se construit. Budget : 500-800 CHF/mois en régie + prestation agence.

**Phase 2 (6-18 mois)** : réduction progressive des Ads sur les mots-clés où le SEO prend le dessus. Le budget Ads se concentre sur les requêtes à forte intention d\'achat.

**Phase 3 (18 mois+)** : le SEO couvre les requêtes organiques. Les Ads restent actifs en remarketing et sur les requêtes concurrentielles les plus rentables.

Cette approche permet de ne jamais être "dark" sur Google pendant la phase de construction organique, tout en réduisant progressivement la dépendance aux clics payants.

## Budget réaliste à Genève

Pour une PME standard (10-50 employés, secteur de services, zone Genève + Suisse romande) :

- **SEO seul** : 1\'200-2\'000 CHF/mois pour une agence locale, avec résultats tangibles à partir de 4-6 mois
- **Google Ads seul** : 800-1\'500 CHF/mois (régie incluse), résultats immédiats mais arrêt à la fin du budget
- **Combiné** : 1\'500-2\'500 CHF/mois les 6 premiers mois, avec réduction progressive des Ads ensuite

## Conclusion

En 2026, les PME genevoises qui performent le mieux sur Google utilisent les deux leviers de façon complémentaire. Le SEO construit votre présence long terme. Les Ads testent, accélèrent et comblent les lacunes de visibilité. Choisir l\'un en excluant l\'autre, c\'est se priver de la moitié du potentiel.

Si vous devez prioriser avec un budget limité : commencez par le SEO si vous avez 6+ mois devant vous, et par les Ads si vous avez besoin de clients dans les 30 prochains jours.`,
  },

  // =========================================================================
  // Article 13 : Refonte site web quand et pourquoi
  // =========================================================================
  {
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
      alt: 'Comparaison côte-à-côte d\'un ancien site web et d\'un nouveau site web moderne sur tablette',
    },
    images: [
      {
        src: '/images/blog/refonte-site-web-checklist.png',
        alt: 'Checklist illustrée des 7 signaux indiquant qu\'une refonte de site est nécessaire',
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

En 2026, plus de 60 % des visites d\'un site PME viennent du mobile. Si votre site met plus de 3 secondes à afficher son contenu principal sur un iPhone, vous perdez la moitié de vos visiteurs avant même qu\'ils aient lu votre premier titre.

Testez avec Google PageSpeed Insights. Un score mobile inférieur à 60/100 est un signal sérieux. Inférieur à 40/100, c\'est un problème structurel que seule une refonte résoudra.

## Signal 2 : Votre taux de rebond dépasse 75 %

Un taux de rebond élevé signifie que les visiteurs arrivent et repartent immédiatement. Sur un site de services B2B, un taux de rebond sain se situe entre 40 et 60 %. Au-delà de 75 %, votre site ne parvient pas à convaincre les visiteurs de rester — problème de design, de lisibilité ou de pertinence du contenu.

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
  },

  // =========================================================================
  // Article 14 : Formation IA entreprise Genève 2026
  // =========================================================================
  {
    slug: 'formation-ia-entreprise-geneve-2026',
    category: 'formation',
    title: 'Formation IA pour entreprises à Genève en 2026 : ce qui a vraiment changé',
    excerpt:
      'La demande de formation IA explose dans les entreprises genevoises. Mais les besoins ont évolué : en 2026, il ne s\'agit plus d\'initier les équipes à l\'IA, mais de les former aux usages métier spécifiques qui génèrent des gains de productivité réels. Ce guide fait le point.',
    date: '29 mars 2026',
    dateISO: '2026-03-29',
    readTime: '6 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/formation-ia-entreprise-geneve-hero.png',
      alt: 'Séance de formation IA en entreprise à Genève avec participants sur ordinateurs portables',
    },
    images: [
      {
        src: '/images/blog/formation-ia-entreprise-geneve-usages.png',
        alt: 'Tableau des usages IA par département : marketing, RH, finance, commercial',
        caption: 'Les usages IA à fort ROI par département pour les PME de Genève',
      },
    ],
    tags: ['formation IA', 'entreprise', 'Genève', 'productivité', 'PME', 'ChatGPT', 'upskilling'],
    seoTitle: 'Formation IA entreprise à Genève en 2026 : usages et ROI',
    seoDescription:
      'Formation IA pour vos équipes à Genève en 2026 : quels usages prioriser, quels formats choisir, quel ROI attendre ? Guide complet pour les PME de Suisse romande.',
    content: `## Ce qui a changé depuis 2024

En 2024, former ses équipes à l\'IA signifiait surtout initier : expliquer ce qu\'est ChatGPT, montrer comment poser une question, démystifier. C\'était utile — et souvent suffisant pour débloquer les premiers gains de productivité.

En 2026, la situation a radicalement évolué. La plupart des cadres et gestionnaires genevois ont déjà utilisé un outil IA. Mais l\'utilisation reste superficielle : on génère du texte, on résume des documents, on reformule des emails. Le potentiel réel — automatisation de flux, analyse de données complexes, intégration dans les outils métier — reste largement inexploité.

La demande que nous recevons chez DKDP a changé de nature : les entreprises ne cherchent plus de l\'initiation. Elles cherchent de l\'application concrète et du ROI mesurable.

## Ce que vos équipes savent déjà faire (et ce qu\'elles ne savent pas encore)

| Compétence | Niveau moyen 2026 | Potentiel non exploité |
|---|---|---|
| Rédiger avec ChatGPT | Intermédiaire | Prompting avancé, templates métier |
| Résumer des documents | Basique | Analyse comparative, extraction structurée |
| Générer des images | Basique | Charte graphique, cohérence visuelle |
| Automatiser des tâches | Très faible | Workflows Make/n8n, connexions API |
| Analyser des données avec l\'IA | Très faible | SQL naturel, dashboards automatisés |
| Former des modèles custom | Quasi nul | GPTs métier, fine-tuning |

Ce tableau illustre où se trouve la vraie valeur : pas dans l\'utilisation basique que vos équipes maîtrisent déjà, mais dans les couches supérieures d\'application.

## Les 4 formats de formation adaptés aux PME genevoises

**Format 1 : Workshop d\'une journée (le plus demandé)**
6-7 heures de formation par groupe métier (max 12 personnes). Contenu 100 % appliqué sur les vrais outils et documents de votre entreprise. Résultat : chaque participant repart avec 5 cas d\'usage opérationnels immédiatement.

Coût moyen à Genève : 1\'500-3\'000 CHF pour le groupe.

**Format 2 : Programme sur 3 mois**
Idéal pour les transformations profondes. 4 demi-journées réparties sur 3 mois + accès à un slack de support + revue mensuelle des KPI. Le format qui produit les changements d\'habitudes durables.

**Format 3 : Formation de formateurs**
Former 2-3 référents internes qui diffuseront ensuite dans leurs équipes. Économique pour les organisations de 50+ personnes. Requiert des profils avec de l\'appétence technologique.

**Format 4 : Audit + coaching dirigeant**
Pour les CEO et directeurs : comprendre les implications stratégiques de l\'IA pour leur secteur, identifier les opportunités d\'automatisation à fort impact, et construire une feuille de route réaliste.

## Les usages à prioriser en 2026 selon votre secteur

**Services professionnels (avocats, fiduciaires, consultants) :**
Rédaction et synthèse de documents contractuels, extraction d\'informations de fichiers volumineux, préparation de présentations clients, veille réglementaire automatisée.

**Marketing et communication :**
Génération de variantes de contenus, analyse de performance des campagnes, création de personas, traitement des feedbacks clients, production de briefs créatifs.

**RH et recrutement :**
Rédaction de fiches de poste, présélection de CVs, onboarding documentaire, FAQ interne automatisée, analyse des feedbacks collaborateurs.

**Finance et comptabilité :**
Classification automatique des factures, génération de rapports, extraction de données de documents PDF, alertes sur anomalies.

## Comment mesurer le ROI de votre formation IA

La formule de base : **heures économisées par semaine × coût horaire moyen × 52 semaines**.

Si une formation d\'une journée (2\'000 CHF) permet à 10 collaborateurs d\'économiser chacun 2 heures par semaine, et que leur coût horaire moyen est 60 CHF :
10 × 2 × 60 × 52 = **62\'400 CHF d\'économies annuelles** pour un investissement de 2\'000 CHF.

Ce calcul est conservateur. Dans la pratique, les gains vont au-delà du temps : meilleure qualité des livrables, réduction des erreurs, délais plus courts, avantage concurrentiel.

## Ce qui distingue une bonne formation IA d\'une mauvaise

Une bonne formation IA part des cas d\'usage réels de vos équipes, pas d\'une présentation générique sur "les 5 tendances IA de 2026". Elle utilise vos propres documents et processus comme matière première. Elle mesure les résultats 30 et 90 jours après.

Une mauvaise formation IA est une conférence de 3 heures sur ChatGPT sans pratique, avec un support Keynote de 80 slides que personne ne relira.

## Conclusion

En 2026, la question n\'est plus "est-ce qu\'on forme nos équipes à l\'IA" mais "quels usages on priorise et comment on mesure l\'impact". Les PME genevoises qui prennent de l\'avance maintenant se dotent d\'un levier de productivité que leurs concurrents mettront 18 mois à rattraper.

DKDP propose des formations IA sur-mesure pour les équipes de PME à Genève et en Suisse romande. Chaque programme est construit autour de vos outils, vos métiers et vos objectifs mesurables.`,
  },

  // =========================================================================
  // Article 15 : Automatiser ses tâches avec l'IA
  // =========================================================================
  {
    slug: 'automatiser-taches-repetitives-ia-pme',
    category: 'ia',
    title: 'Comment automatiser vos tâches répétitives avec l\'IA : guide pratique pour les PME',
    excerpt:
      'Saisie de données, rapports hebdomadaires, réponses aux emails standards, tri de documents... Ces tâches occupent en moyenne 28 % du temps de vos équipes. L\'IA peut en automatiser une grande partie. Voici comment démarrer sans se perdre.',
    date: '28 mars 2026',
    dateISO: '2026-03-28',
    readTime: '7 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/automatiser-taches-ia-hero.png',
      alt: 'Schéma d\'un workflow automatisé connectant emails, CRM et documents via l\'IA',
    },
    images: [
      {
        src: '/images/blog/automatiser-taches-ia-workflow.png',
        alt: 'Exemple de workflow Make.com automatisant le traitement des demandes clients',
        caption: 'Exemple de workflow : demande client reçue par email → qualification IA → CRM → notification équipe',
      },
    ],
    tags: ['automatisation', 'IA', 'PME', 'productivité', 'Make', 'n8n', 'workflow'],
    seoTitle: 'Automatiser ses tâches avec l\'IA : guide pratique PME 2026',
    seoDescription:
      'Comment automatiser les tâches répétitives de votre PME avec l\'IA en 2026 ? Outils, méthode, exemples concrets et ROI. Guide pratique pour les entreprises de Suisse romande.',
    content: `## Le coût caché des tâches répétitives

Une étude McKinsey de 2025 révèle que les travailleurs du savoir passent en moyenne 28 % de leur temps sur des tâches qui pourraient être automatisées ou semi-automatisées grâce à l\'IA. Pour une PME de 15 personnes avec un coût salarial moyen de 80\'000 CHF/an, c\'est 336\'000 CHF par an de valeur créée sur des tâches à faible valeur ajoutée.

L\'automatisation IA ne signifie pas remplacer des postes. Elle signifie libérer du temps humain pour les tâches qui nécessitent réellement le jugement, la créativité et la relation : vendre, innover, conseiller, créer.

## Les 10 tâches les plus faciles à automatiser aujourd\'hui

### Catégorie A : Automatisable à 80-100 % sans intervention humaine

1. **Tri et catégorisation d\'emails** : les emails entrants classés par priorité et type en moins de 5 secondes
2. **Extraction de données de documents PDF** : factures, contrats, formulaires — vers Excel ou CRM directement
3. **Génération de comptes-rendus de réunion** : à partir de la transcription audio (Whisper + IA)
4. **Rapports hebdomadaires standardisés** : agrégation de données + narration automatique
5. **Réponses aux FAQ clients** : chatbot entraîné sur votre documentation

### Catégorie B : Automatisable à 60-80 % avec validation humaine

6. **Rédaction de premiers drafts d\'emails commerciaux** : à partir d\'un template + données CRM
7. **Qualification de leads entrants** : scoring automatique selon critères définis
8. **Traduction et adaptation de contenus** : blog, fiches produits, supports de présentation
9. **Création de résumés exécutifs** : de rapports longs, d\'articles, de propositions commerciales
10. **Mise à jour de bases de données** : enrichissement automatique depuis LinkedIn, email ou web

## Les outils sans code pour PME

**Make (ex-Integromat)** : le plus accessible pour des non-développeurs. Connecte vos outils (Gmail, Sheets, Notion, CRM, Slack) en workflows visuels. Tarif : à partir de 9 CHF/mois. Parfait pour 80 % des automatisations PME.

**n8n** : plus puissant que Make, open-source, hébergeable chez vous. Idéal si vous avez un développeur interne ou une agence pour l\'implémenter. Aucun coût par opération.

**Zapier** : l\'original. Simple, bien documenté, mais plus cher que Make pour les gros volumes.

**Claude API / GPT-4o API** : pour les tâches qui nécessitent du raisonnement complexe (analyse de contrats, classification avancée, génération de contenu personnalisé). À intégrer dans vos workflows Make/n8n.

## Méthode pour démarrer : les 4 étapes

**Étape 1 : Cartographier vos tâches répétitives (1 journée)**
Demandez à chaque membre de l\'équipe de noter pendant une semaine toutes les tâches qu\'ils répètent plus d\'une fois par semaine. Vous obtiendrez une liste de 20 à 40 candidats à l\'automatisation.

**Étape 2 : Prioriser par ROI (2 heures)**
Pour chaque tâche candidate, estimez : fréquence × temps par occurrence × coût horaire. Les tâches qui représentent plus de 2h/semaine pour l\'équipe sont vos priorités absolues.

**Étape 3 : Prototype sur une seule tâche (1-2 semaines)**
Ne cherchez pas à tout automatiser d\'un coup. Choisissez la tâche la plus simple et la plus impactante. Construisez le workflow, testez, ajustez. L\'objectif est de réussir un premier cas avant d\'en lancer d\'autres.

**Étape 4 : Documenter et dupliquer**
Une fois le premier workflow stable, documentez-le (inputs, outputs, cas d\'erreur). Utilisez-le comme modèle pour les automatisations suivantes.

## Exemple concret : traitement des demandes clients entrantes

**Situation initiale :** une PME B2B reçoit 30 demandes par email par semaine. Une assistante passe 45 minutes par jour à lire, catégoriser, répondre aux FAQ, et transférer les demandes complexes aux bons commerciaux.

**Après automatisation avec Make + Claude API :**
- Chaque email entrant est analysé par l\'IA en 3 secondes
- Les FAQ sont répondues automatiquement (50 % des emails)
- Les 50 % restants sont catégorisés (priorité, type) et assignés au bon commercial dans le CRM
- L\'assistante reçoit un résumé quotidien des demandes nécessitant une attention humaine

**Résultat :** 45 minutes/jour → 10 minutes/jour. Gain annuel : environ 200 heures, soit 14\'000 CHF au coût chargé.

**Coût d\'implémentation :** 2\'500 CHF (une fois). **ROI en 3 mois.**

## Les erreurs à éviter

**Automatiser avant de standardiser.** Si votre processus est flou, l\'automatisation le rendra juste plus rapide d\'être flou. Documentez d\'abord le processus idéal, puis automatisez.

**Oublier la gestion d\'erreurs.** Tout workflow automatisé doit prévoir ce qui se passe quand les données sont incomplètes ou inattendues. Prévoyez toujours une "sortie humaine".

**Tout automatiser d\'un coup.** Le volume de changements simultanés génère confusion et résistance. Un workflow par mois, mesuré et validé, est plus efficace que 10 workflows lancés en même temps.

## Conclusion

L\'automatisation IA n\'est pas réservée aux grandes entreprises avec des équipes IT. En 2026, les outils no-code comme Make permettent à n\'importe quelle PME de Genève de récupérer des dizaines d\'heures par mois en quelques semaines d\'implémentation. Le retour sur investissement est rapide, mesurable, et libère vos équipes pour ce qui compte vraiment.`,
  },

  // =========================================================================
  // Article 16 : Créer un site web PME Suisse romande
  // =========================================================================
  {
    slug: 'creer-site-web-pme-suisse-romande',
    category: 'seo',
    title: 'Créer un site web pour votre PME en Suisse romande : les 5 étapes d\'un projet réussi',
    excerpt:
      'Créer un site web professionnel en Suisse romande implique des spécificités locales que beaucoup d\'agences internationales ignorent : multilinguisme potentiel, confiance helvetique, standards de qualité, hébergement et RGPD suisse. Voici comment naviguer ces 5 étapes sans fausse route.',
    date: '27 mars 2026',
    dateISO: '2026-03-27',
    readTime: '6 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/creer-site-web-pme-suisse-romande-hero.png',
      alt: 'Équipe genevoise travaillant sur la conception d\'un site web PME autour d\'une table avec maquettes',
    },
    images: [
      {
        src: '/images/blog/creer-site-web-pme-suisse-romande-etapes.png',
        alt: 'Diagramme des 5 étapes de création d\'un site web pour PME en Suisse romande',
        caption: 'Les 5 étapes d\'un projet web réussi pour les PME de Suisse romande',
      },
    ],
    tags: ['création site web', 'Suisse romande', 'PME', 'Genève', 'web', 'projet web'],
    seoTitle: 'Créer un site web PME en Suisse romande : 5 étapes clés',
    seoDescription:
      'Comment créer un site web professionnel pour votre PME en Suisse romande ? Les 5 étapes clés, spécificités helvetiques, budget réaliste et erreurs à éviter. Guide DKDP.',
    content: `## Les spécificités suisses que votre site doit respecter

Créer un site web pour une PME en Suisse romande n\'est pas exactement comme en France ou en Belgique. Le marché genevois et romand a ses propres codes, ses propres attentes de qualité, et ses propres contraintes légales.

**La confiance avant le pitch.** Le consommateur helvétique est plus exigeant sur la crédibilité que sur la créativité. Un design sobre, des mentions légales complètes, des adresses physiques visibles et des certifications professionnelles affichées comptent plus qu\'un effet wow visuel.

**Le multilinguisme potentiel.** Même si votre activité est franco-suisse, si vous visez des clients à Berne ou Zurich, une version allemande sera nécessaire. Prévoyez la structure dès le départ — rétrospectivement, c\'est toujours plus coûteux.

**La LPD (Loi sur la Protection des Données).** Depuis 2023, la Suisse a renforcé sa réglementation sur les données personnelles. Votre site doit disposer d\'une politique de confidentialité complète, d\'un bandeau cookies conforme, et d\'un formulaire de contact qui respecte les droits des utilisateurs.

**L\'hébergement en Suisse.** Pour les clients sensibles (fiduciaires, avocats, secteur médical), l\'hébergement des données sur des serveurs suisses est souvent une exigence non négociable. Prévoyez ce point dès le choix de votre stack technique.

## Étape 1 : Définir les objectifs business (avant le design)

La première erreur que commettent les PME est de commencer par "à quoi doit ressembler le site". La bonne question est "qu\'est-ce que ce site doit accomplir pour mon business dans les 12 prochains mois ?"

Objectifs courants : générer X demandes de devis par mois, positionner la marque sur des requêtes locales, recruter des profils ciblés, réduire le temps de support client avec une FAQ complète.

Chaque objectif implique des choix de design, de contenu et de fonctionnalités différents. Sans objectifs clairs, vous obtiendrez un site joli et inutile.

## Étape 2 : Définir l\'architecture et les pages prioritaires

Un site PME efficace n\'a pas besoin de 30 pages. Il a besoin des bonnes pages, bien structurées. Pour une PME de services, la structure minimale est :

- **Accueil** : proposition de valeur + preuves sociales + CTA
- **Services** : une page par service principal (pas une seule page "Nos services")
- **À propos** : qui vous êtes, votre histoire, vos valeurs, photos de l\'équipe
- **Références / Réalisations** : cas clients avec résultats
- **Blog** : 8-12 articles de fond sur vos sujets d\'expertise (SEO)
- **Contact** : formulaire court, téléphone, adresse, Google Maps

L\'architecture des URL doit être pensée dès le départ pour le SEO : \`/services/nom-du-service\` plutôt que \`/page-2\`.

## Étape 3 : Choisir la bonne technologie

Le choix de la technologie doit dépendre de vos besoins réels, pas des préférences de votre prestataire. En 2026, les options principales pour une PME :

**WordPress + Gutenberg** : idéal pour les PME qui ont besoin d\'autonomie éditoriale totale. Écosystème immense, maintenance à prévoir.

**Webflow** : excellent pour les PME qui veulent un design haut de gamme sans développement custom. Hébergement inclus, pas de maintenance technique.

**Next.js / Astro** : pour les PME qui prioritisent les performances et le SEO. Nécessite une agence technique compétente.

**Shopify** : pour le e-commerce. La référence en Suisse romande pour les boutiques en ligne.

Méfiez-vous des solutions propriétaires "maison" proposées par certaines agences : si vous changez de prestataire, vous perdez votre site.

## Étape 4 : La production de contenu — l\'étape sous-estimée

80 % des retards dans les projets web viennent du contenu : textes qui n\'arrivent pas, photos non disponibles, vidéos pas encore tournées. Le contenu doit être planifié et produit en parallèle du développement, pas après.

Prévoyez un chef de projet côté client qui coordonne la collecte de contenu. Si vous n\'avez pas de ressource interne, budgétez la rédaction web (800-1\'500 CHF pour 5-8 pages de qualité).

Pour les photos, évitez les banques d\'images génériques. Des photos de vos locaux, de votre équipe et de vos réalisations convertissent 3 à 5 fois mieux que des stock photos.

## Étape 5 : Le lancement et les 90 premiers jours

Un site lancé n\'est pas un site terminé. Les 90 premiers jours sont critiques pour :

- Soumettre le sitemap dans Google Search Console et surveiller l\'indexation
- Corriger les premiers bugs signalés par les utilisateurs réels
- Analyser les heatmaps (Hotjar, Microsoft Clarity) pour identifier les points de friction
- Publier 2-3 articles de blog pour signaler l\'activité éditoriale à Google
- Demander des avis Google à vos premiers clients via le site

Le référencement local démarre avec la cohérence NAP (nom, adresse, téléphone) : votre fiche Google Business Profile, votre site et toute autre mention en ligne doivent être identiques.

## Budget réaliste pour une PME romande

Pour un site vitrine professionnel avec CMS, SEO on-page, 6-8 pages de contenu et formation à l\'administration :
- **Entrée de gamme** (template + customisation) : 4\'500-7\'000 CHF
- **Milieu de gamme** (design semi-custom + développement) : 8\'000-14\'000 CHF
- **Haut de gamme** (full-custom, animations, performances LCP < 1s) : 15\'000-25\'000 CHF

Ajoutez l\'hébergement (300-600 CHF/an), le nom de domaine (20-40 CHF/an), et la maintenance annuelle (500-1\'500 CHF/an).

## Conclusion

Un site web pour une PME en Suisse romande est un investissement à 3-5 ans. Prenez le temps du brief, choisissez un prestataire local qui comprend votre marché, et n\'économisez pas sur le SEO et le contenu — c\'est là que se joue votre retour sur investissement.`,
  },

  // =========================================================================
  // Article 17 : IA ou consultant humain pour PME
  // =========================================================================
  {
    slug: 'ia-ou-consultant-humain-pme',
    category: 'ia',
    title: 'IA ou consultant humain pour votre PME : ce que l\'un fait mieux que l\'autre',
    excerpt:
      'Face à un problème stratégique ou opérationnel, faut-il appeler un consultant ou demander à l\'IA ? La question se pose de plus en plus dans les PME. La réponse honnête : les deux ont des forces irremplaçables — et des limites réelles.',
    date: '26 mars 2026',
    dateISO: '2026-03-26',
    readTime: '5 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/ia-ou-consultant-humain-hero.png',
      alt: 'Illustration symbolique : interface IA face à un consultant humain en réunion d\'entreprise',
    },
    images: [
      {
        src: '/images/blog/ia-ou-consultant-humain-tableau.png',
        alt: 'Tableau comparatif IA vs consultant humain sur 10 dimensions pour PME',
        caption: 'IA vs consultant humain : forces et limites respectives pour les PME',
      },
    ],
    tags: ['IA', 'consultant', 'PME', 'stratégie', 'productivité', 'Genève', 'décision'],
    seoTitle: 'IA ou consultant humain pour votre PME : comparatif honnête',
    seoDescription:
      'Faut-il faire appel à l\'IA ou à un consultant humain pour votre PME ? Comparatif honnête des forces et limites de chacun, avec cas d\'usage concrets pour les entreprises de Suisse romande.',
    content: `## La vraie question n\'est pas "lequel choisir"

Quand une PME genevoise se demande "est-ce que j\'utilise l\'IA ou est-ce que j\'engage un consultant", la prémisse est souvent fausse. Ce n\'est pas une décision binaire. La vraie question est : pour quel type de problème, à quel moment, avec quel budget ?

L\'IA et le conseil humain ont des anatomies de valeur radicalement différentes. Les comprendre permet de combiner les deux intelligemment — et d\'éviter de payer cher pour des choses que l\'IA ferait en 3 minutes, ou d\'attendre 3 minutes pour des décisions qui nécessitent une vraie expertise humaine.

## Ce que l\'IA fait mieux que le consultant

**La vitesse d\'exécution.** Générer un premier draft de stratégie marketing, analyser 200 avis clients, résumer un rapport de 50 pages, traduire une proposition commerciale en 3 langues : l\'IA le fait en quelques minutes. Un consultant facture 2-4 heures pour produire les mêmes livrables.

**La disponibilité.** L\'IA est disponible à 3h du matin, le week-end, pendant les vacances. Pour les décisions opérationnelles urgentes, cette disponibilité est précieuse.

**La scalabilité.** Une fois un prompt ou un workflow IA bien configuré, il produit le même résultat pour 1 document ou 10\'000. Le consultant, lui, est limité par son temps.

**Le coût marginal quasi nul.** Après l\'abonnement mensuel (20-200 CHF), chaque usage supplémentaire ne coûte rien. Le conseil humain se facture à l\'heure ou au projet.

**L\'absence de biais de complaisance.** L\'IA ne vous dit pas ce que vous voulez entendre pour préserver la relation commerciale. Elle analyse et répond sur la base des données fournies — même si la réponse est inconfortable.

## Ce que le consultant humain fait mieux que l\'IA

**La connaissance contextuelle profonde.** Un bon consultant a travaillé avec 50 entreprises similaires à la vôtre. Il reconnaît les patterns que les données ne montrent pas encore. "Je vois ça souvent dans les PME B2B qui passent de 10 à 30 employés" — cette phrase vaut de l\'or, et l\'IA ne peut pas la prononcer de façon crédible.

**La responsabilité.** Si un consultant vous recommande une stratégie qui échoue, vous pouvez demander des comptes. L\'IA n\'a pas de responsabilité. Dans les décisions à fort enjeu (restructuration, acquisition, pivot stratégique), cette responsabilité partagée a une valeur réelle.

**La gestion des parties prenantes.** Un consultant peut animer un comité de direction, gérer les résistances au changement, faciliter des conflits internes. L\'IA peut vous préparer un argumentaire, mais elle ne peut pas être dans la salle.

**La connaissance du tissu local.** À Genève, connaître les bons avocats, les bons banquiers, les bonnes ressources institutionnelles (CCIG, DéveloppementPME, etc.) est une valeur qui ne s\'automatise pas.

**Le jugement sur l\'information incomplète.** En affaires, on décide rarement avec toutes les données. Un consultant expérimenté sait quand il a assez d\'information pour agir. L\'IA, face à l\'ambiguïté, produit une réponse qui peut sembler confiante mais qui est statistiquement interpolée.

## Le modèle hybride : la pratique des PME qui avancent le plus vite

Les PME genevoises qui tirent le meilleur parti de l\'IA ne l\'utilisent pas pour remplacer le conseil humain. Elles l\'utilisent pour rendre le conseil humain plus efficace.

**Avant une session de consulting :** utiliser l\'IA pour préparer un brief structuré, analyser les données disponibles, générer 5 hypothèses à valider. Le consultant arrive avec un contexte riche, la session va plus loin.

**Pendant l\'implémentation :** l\'IA exécute les tâches opérationnelles (rédaction, analyse, suivi), pendant que le consultant se concentre sur les décisions et ajustements stratégiques.

**Pour le suivi :** l\'IA génère des tableaux de bord automatiques et des alertes. Le consultant intervient quand les indicateurs sortent des seuils normaux.

Ce modèle réduit les coûts de consulting de 30 à 50 % tout en augmentant la profondeur des interventions.

## Cas d\'usage : quand appeler qui

| Situation | IA | Consultant |
|---|---|---|
| Rédiger un plan marketing | 80 % IA, 20 % relecture | Inutile si profil marketing interne |
| Choisir entre deux marchés | IA pour les données | Consultant pour le jugement final |
| Restructurer une équipe | IA pour les benchmarks | Consultant essentiel |
| Améliorer les fiches produits SEO | 100 % IA | Inutile |
| Lever des fonds ou vendre | IA pour les documents | Consultant indispensable |
| Former les équipes à l\'IA | IA pour le contenu | Formateur humain pour l\'animation |

## Conclusion

En 2026, la question "IA ou consultant ?" est aussi pertinente que "voiture ou transport en commun ?" Les deux ont leur utilité selon le contexte. La compétence clé pour un dirigeant de PME est de savoir instantanément quel outil convient à quel problème — et de ne pas payer les deux pour la même chose.

Ce que l\'IA ne remplacera pas dans les 5 prochaines années : le jugement humain dans les décisions ambiguës à fort enjeu, la gestion des relations et des conflits, et la responsabilité assumée face aux résultats.`,
  },
]

// ---------------------------------------------------------------------------
// Fonctions utilitaires
// ---------------------------------------------------------------------------

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const article = getArticle(slug)
  if (!article) return ARTICLES.slice(0, count)
  return ARTICLES.filter((a) => a.slug !== slug)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, count)
}
