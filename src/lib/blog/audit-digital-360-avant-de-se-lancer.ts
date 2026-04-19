import type { Article } from './types'

const article: Article = {
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
      alt: 'Audit digital 360 pour PME : salle de commande avec ecrans analytiques SEO, performance, UX et sécurité',
    },
    images: [
      {
        src: '/images/blog/audit-digital-radar.png',
        alt: 'Radar audit digital DKDP : 6 dimensions SEO, performance, UX, sécurité, contenu, analytics pour evaluer votre site',
        caption: "Le radar d'audit digital DKDP : 6 dimensions pour une vue complète de votre présence en ligne",
      },
      {
        src: '/images/blog/audit-digital-360-processus.png',
        alt: 'Audit digital 360 PME Suisse 2026 : radar hexagonal avec 6 dimensions SEO, performance, UX, sécurité, contenu et analytics',
        caption: 'Le processus d\'audit digital 360 : une analyse complète avant chaque refonte de site',
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

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.2);background:rgba(212,212,216,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1rem">LES 6 DIMENSIONS DE L'AUDIT DIGITAL</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
<div style="padding:1.25rem;border-radius:12px;background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.15);text-align:center">
<div style="font-size:1.5rem;margin-bottom:0.5rem">&#128269;</div>
<div style="font-size:0.85rem;font-weight:600;color:#A78BFA;margin-bottom:0.25rem">SEO</div>
<div style="font-size:0.75rem;color:#9CA3AF">Ranking, backlinks, technique, contenu</div>
</div>
<div style="padding:1.25rem;border-radius:12px;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.15);text-align:center">
<div style="font-size:1.5rem;margin-bottom:0.5rem">&#9889;</div>
<div style="font-size:0.85rem;font-weight:600;color:#4ade80;margin-bottom:0.25rem">Performance</div>
<div style="font-size:0.75rem;color:#9CA3AF">Core Web Vitals, LCP, CLS, INP</div>
</div>
<div style="padding:1.25rem;border-radius:12px;background:rgba(255,140,0,0.08);border:1px solid rgba(255,140,0,0.15);text-align:center">
<div style="font-size:1.5rem;margin-bottom:0.5rem">&#128100;</div>
<div style="font-size:0.85rem;font-weight:600;color:#FF8C00;margin-bottom:0.25rem">UX</div>
<div style="font-size:0.75rem;color:#9CA3AF">Heatmaps, parcours, CTAs, navigation</div>
</div>
<div style="padding:1.25rem;border-radius:12px;background:rgba(252,165,165,0.08);border:1px solid rgba(252,165,165,0.15);text-align:center">
<div style="font-size:1.5rem;margin-bottom:0.5rem">&#128274;</div>
<div style="font-size:0.85rem;font-weight:600;color:#fca5a5;margin-bottom:0.25rem">Sécurité</div>
<div style="font-size:0.75rem;color:#9CA3AF">SSL, CMS, headers, vulnerabilites</div>
</div>
<div style="padding:1.25rem;border-radius:12px;background:rgba(96,165,250,0.08);border:1px solid rgba(96,165,250,0.15);text-align:center">
<div style="font-size:1.5rem;margin-bottom:0.5rem">&#128221;</div>
<div style="font-size:0.85rem;font-weight:600;color:#60a5fa;margin-bottom:0.25rem">Contenu</div>
<div style="font-size:0.75rem;color:#9CA3AF">Qualite, actualite, structuré, medias</div>
</div>
<div style="padding:1.25rem;border-radius:12px;background:rgba(212,212,216,0.08);border:1px solid rgba(212,212,216,0.15);text-align:center">
<div style="font-size:1.5rem;margin-bottom:0.5rem">&#128200;</div>
<div style="font-size:0.85rem;font-weight:600;color:#D4D4D8;margin-bottom:0.25rem">Analytics</div>
<div style="font-size:0.75rem;color:#9CA3AF">GA4, tracking, conversions, attribution</div>
</div>
</div>
</div>

## Les 6 dimensions de l'audit digital

### 1. SEO (référencement naturel)

L'audit SEO couvre quatre sous-dimensions :

**Ranking et mots-clés :** Sur quels mots-clés êtes-vous positionné ? Quelles sont les opportunités de mots-clés à fort volume et faible concurrence dans votre secteur ? Des outils comme Semrush, Ahrefs ou Ubersuggest permettent de cartographier votre visibilité actuelle.

**Backlinks :** Combien de sites font des liens vers le vôtre, et lesquels ? La qualité du profil de liens entrants est un signal de confiance majeur pour Google. Un audit des backlinks révèle aussi les liens toxiques à désavouer.

**Technique :** Crawlabilité (Google peut-il accéder à toutes vos pages ?), indexation (quelles pages sont indexées et lesquelles ne le sont pas ?), sitemap XML, robots.txt, cannonical tags, pagination, structuré des URLs.

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

Auditez : la qualité et l'actualité de chaque page (est-ce que l'information est toujours exacte ?), la couverture des sujets importants pour vos clients (existe-t-il des lacunes ?), la structuré des textes (titres H1/H2/H3, listes, paragraphes courts), la présence et la qualité des images et médias.

### 6. Analytics et tracking

Avant de lancer une refonte, assurez-vous que votre base de données analytiques est fiable. Un tracking mal configuré vous prive d'insights précieux pour mesurer l'impact de votre nouveau site.

Points à vérifier : Google Analytics 4 correctement configuré avec les événements clés (soumissions de formulaires, clics sur le téléphone, téléchargements), données de conversion trackées en bout de funnel, attribution des sources de trafic, données historiques sauvegardées avant migration.

___IMG:audit-digital-radar.png___

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1rem">PROCESSUS D'AUDIT EN 5 ETAPES</div>
<div style="display:flex;flex-direction:column;gap:0.75rem">
<div style="display:flex;align-items:flex-start;gap:1rem">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(167,139,250,0.15);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#A78BFA">1</div>
<div style="flex:1;padding-top:0.25rem">
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Collecte de données</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.15rem">Configuration des outils d'analyse (GA4, Hotjar, Screaming Frog, Semrush)</div>
</div>
<div style="font-size:0.7rem;color:#71717a;padding-top:0.3rem">Jour 1</div>
</div>
<div style="margin-left:18px;border-left:2px solid rgba(167,139,250,0.15);height:12px"></div>
<div style="display:flex;align-items:flex-start;gap:1rem">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(167,139,250,0.15);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#A78BFA">2</div>
<div style="flex:1;padding-top:0.25rem">
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Analyse des 6 dimensions</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.15rem">SEO, performance, UX, sécurité, contenu, analytics : audit complet</div>
</div>
<div style="font-size:0.7rem;color:#71717a;padding-top:0.3rem">Jours 2-3</div>
</div>
<div style="margin-left:18px;border-left:2px solid rgba(167,139,250,0.15);height:12px"></div>
<div style="display:flex;align-items:flex-start;gap:1rem">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#FF8C00">3</div>
<div style="flex:1;padding-top:0.25rem">
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Scoring par dimension</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.15rem">Note de 1 a 10 pour chaque dimension, identification des zones critiques</div>
</div>
<div style="font-size:0.7rem;color:#71717a;padding-top:0.3rem">Jour 3</div>
</div>
<div style="margin-left:18px;border-left:2px solid rgba(255,140,0,0.15);height:12px"></div>
<div style="display:flex;align-items:flex-start;gap:1rem">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(255,140,0,0.15);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#FF8C00">4</div>
<div style="flex:1;padding-top:0.25rem">
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Priorisation impact/effort</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.15rem">Matrice de priorisation : actions a fort impact et faible effort en premier</div>
</div>
<div style="font-size:0.7rem;color:#71717a;padding-top:0.3rem">Jour 4</div>
</div>
<div style="margin-left:18px;border-left:2px solid rgba(74,222,128,0.15);height:12px"></div>
<div style="display:flex;align-items:flex-start;gap:1rem">
<div style="min-width:36px;height:36px;border-radius:50%;background:rgba(74,222,128,0.15);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:#4ade80">5</div>
<div style="flex:1;padding-top:0.25rem">
<div style="font-size:0.85rem;font-weight:600;color:#e4e4e7">Rapport et plan d'action</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.15rem">Document de synthese avec recommandations priorisees et planning</div>
</div>
<div style="font-size:0.7rem;color:#71717a;padding-top:0.3rem">Jour 4-5</div>
</div>
</div>
</div>

## Les outils d'audit indispensables

**SEO :** Semrush ou Ahrefs (payants, 100-200 $/mois), Screaming Frog (gratuit jusqu'à 500 URLs), Google Search Console (gratuit), Ubersuggest (freemium).

**Performance :** PageSpeed Insights (gratuit), Lighthouse dans Chrome DevTools (gratuit), WebPageTest (gratuit), GTmetrix (freemium).

**UX :** Hotjar (freemium), Microsoft Clarity (gratuit), Google Analytics 4 (gratuit).

**Sécurité :** SSL Labs (gratuit), WPScan (gratuit), SecurityHeaders.com (gratuit), Sucuri SiteCheck (gratuit).

**Contenu :** Screaming Frog pour l'audit structurel (gratuit), Google Search Console pour les pages indexées, Semrush Writing Assistant pour la qualité.

**Analytics :** Google Analytics 4 (gratuit), Google Tag Assistant (gratuit extension Chrome).

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(74,222,128,0.2);background:rgba(74,222,128,0.05)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#4ade80;margin-bottom:1rem">SCORING TYPE PAR DIMENSION</div>
<div style="display:flex;flex-direction:column;gap:0.75rem">
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem"><span style="font-size:0.85rem;color:#e4e4e7">SEO</span><span style="font-size:0.85rem;font-weight:700;color:#FF8C00">4/10</span></div>
<div style="height:8px;border-radius:4px;background:rgba(74,222,128,0.1)"><div style="width:40%;height:100%;border-radius:4px;background:#FF8C00"></div></div>
<div style="font-size:0.7rem;color:#71717a;margin-top:0.15rem">Probleme typique : 70% des pages sans trafic organique</div>
</div>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem"><span style="font-size:0.85rem;color:#e4e4e7">Performance</span><span style="font-size:0.85rem;font-weight:700;color:#fca5a5">3/10</span></div>
<div style="height:8px;border-radius:4px;background:rgba(74,222,128,0.1)"><div style="width:30%;height:100%;border-radius:4px;background:#fca5a5"></div></div>
<div style="font-size:0.7rem;color:#71717a;margin-top:0.15rem">Probleme typique : PageSpeed mobile sous 40</div>
</div>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem"><span style="font-size:0.85rem;color:#e4e4e7">UX</span><span style="font-size:0.85rem;font-weight:700;color:#FF8C00">5/10</span></div>
<div style="height:8px;border-radius:4px;background:rgba(74,222,128,0.1)"><div style="width:50%;height:100%;border-radius:4px;background:#FF8C00"></div></div>
<div style="font-size:0.7rem;color:#71717a;margin-top:0.15rem">Probleme typique : CTA absent ou générique sur les pages clés</div>
</div>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem"><span style="font-size:0.85rem;color:#e4e4e7">Sécurité</span><span style="font-size:0.85rem;font-weight:700;color:#4ade80">7/10</span></div>
<div style="height:8px;border-radius:4px;background:rgba(74,222,128,0.1)"><div style="width:70%;height:100%;border-radius:4px;background:#4ade80"></div></div>
<div style="font-size:0.7rem;color:#71717a;margin-top:0.15rem">Generalement bon : SSL present, CMS a jour</div>
</div>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem"><span style="font-size:0.85rem;color:#e4e4e7">Contenu</span><span style="font-size:0.85rem;font-weight:700;color:#FF8C00">4/10</span></div>
<div style="height:8px;border-radius:4px;background:rgba(74,222,128,0.1)"><div style="width:40%;height:100%;border-radius:4px;background:#FF8C00"></div></div>
<div style="font-size:0.7rem;color:#71717a;margin-top:0.15rem">Probleme typique : textes non mis a jour depuis 2+ ans</div>
</div>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem"><span style="font-size:0.85rem;color:#e4e4e7">Analytics</span><span style="font-size:0.85rem;font-weight:700;color:#fca5a5">2/10</span></div>
<div style="height:8px;border-radius:4px;background:rgba(74,222,128,0.1)"><div style="width:20%;height:100%;border-radius:4px;background:#fca5a5"></div></div>
<div style="font-size:0.7rem;color:#71717a;margin-top:0.15rem">Probleme typique : GA4 mal configure, pas de tracking conversions</div>
</div>
</div>
<div style="margin-top:1rem;padding-top:0.75rem;border-top:1px solid rgba(74,222,128,0.15);font-size:0.75rem;color:#71717a;text-align:center">Scores moyens constates chez nos clients PME avant refonte</div>
</div>

___IMG:audit-digital-360-processus.png___

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
  }

export default article
