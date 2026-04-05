import type { Article } from './types'

const article: Article = {
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
      alt: 'Core Web Vitals 2026 : dashboard performance web avec jauges LCP, CLS et INP pour optimisation SEO',
    },
    images: [
      {
        src: '/images/blog/core-web-vitals-metrics.png',
        alt: 'Metriques Core Web Vitals expliquees : LCP temps de chargement, CLS stabilite visuelle, INP reactivite',
        caption: 'LCP, CLS, INP : les trois signaux qui définissent l\'expérience utilisateur selon Google',
      },
    ],
    tags: ['SEO', 'performance', 'Core Web Vitals', 'LCP', 'INP', 'CLS', 'Next.js'],
    seoTitle: 'Core Web Vitals 2026 : LCP, INP, CLS pour le SEO · DKDP',
    seoDescription:
      'Guide complet Core Web Vitals 2026 : comprendre LCP, CLS et INP, les mesurer avec PageSpeed Insights et les optimiser sur WordPress, Shopify et Next.js.',
    content: `## Pourquoi les Core Web Vitals impactent directement votre SEO

Depuis que Google a officialisé les Core Web Vitals comme signaux de ranking en 2021, la performance technique de votre site n'est plus seulement une question d'expérience utilisateur : c'est un facteur de positionnement direct. En 2026, avec des algorithmes toujours plus sophistiqués, les sites rapides et stables ont un avantage concurrentiel mesurable sur les SERPs.

Mais l'impact va au-delà du SEO. Un site qui charge en 4 secondes au lieu de 2 perd en moyenne 20 % de ses visiteurs avant même que la page soit visible (source : Google/SOASTA, 2017). Pour une PME qui dépend de son site pour générer des leads, chaque dixième de seconde gagné se traduit en conversions supplémentaires.

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
  }

export default article
