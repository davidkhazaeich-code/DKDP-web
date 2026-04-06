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
      {
        src: '/images/blog/core-web-vitals-dashboard-metriques.png',
        alt: 'Core Web Vitals 2026 : dashboard interactif avec jauges LCP CLS INP et seuils de performance pour SEO Google',
        caption: 'Dashboard Core Web Vitals : visualiser vos métriques pour prioriser les optimisations',
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

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(167,139,250,0.2);background:rgba(167,139,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#A78BFA;margin-bottom:1rem">SEUILS CORE WEB VITALS 2026</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
<div style="border-radius:12px;overflow:hidden;border:1px solid rgba(167,139,250,0.15)">
<div style="background:rgba(167,139,250,0.1);padding:1rem;text-align:center">
<div style="font-size:1.2rem;font-weight:800;color:#A78BFA">LCP</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.25rem">Largest Contentful Paint</div>
</div>
<div style="padding:0.75rem;display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(74,222,128,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#4ade80;font-weight:600">Bon</span>
<span style="font-size:0.8rem;color:#4ade80">< 2,5 s</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(251,191,36,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#fbbf24;font-weight:600">Moyen</span>
<span style="font-size:0.8rem;color:#fbbf24">2,5 - 4 s</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(252,165,165,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#fca5a5;font-weight:600">Mauvais</span>
<span style="font-size:0.8rem;color:#fca5a5">> 4 s</span>
</div>
</div>
</div>
<div style="border-radius:12px;overflow:hidden;border:1px solid rgba(255,140,0,0.15)">
<div style="background:rgba(255,140,0,0.1);padding:1rem;text-align:center">
<div style="font-size:1.2rem;font-weight:800;color:#FF8C00">CLS</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.25rem">Cumulative Layout Shift</div>
</div>
<div style="padding:0.75rem;display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(74,222,128,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#4ade80;font-weight:600">Bon</span>
<span style="font-size:0.8rem;color:#4ade80">< 0,1</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(251,191,36,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#fbbf24;font-weight:600">Moyen</span>
<span style="font-size:0.8rem;color:#fbbf24">0,1 - 0,25</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(252,165,165,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#fca5a5;font-weight:600">Mauvais</span>
<span style="font-size:0.8rem;color:#fca5a5">> 0,25</span>
</div>
</div>
</div>
<div style="border-radius:12px;overflow:hidden;border:1px solid rgba(74,222,128,0.15)">
<div style="background:rgba(74,222,128,0.1);padding:1rem;text-align:center">
<div style="font-size:1.2rem;font-weight:800;color:#4ade80">INP</div>
<div style="font-size:0.75rem;color:#9CA3AF;margin-top:0.25rem">Interaction to Next Paint</div>
</div>
<div style="padding:0.75rem;display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(74,222,128,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#4ade80;font-weight:600">Bon</span>
<span style="font-size:0.8rem;color:#4ade80">< 200 ms</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(251,191,36,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#fbbf24;font-weight:600">Moyen</span>
<span style="font-size:0.8rem;color:#fbbf24">200 - 500 ms</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.6rem;background:rgba(252,165,165,0.1);border-radius:6px">
<span style="font-size:0.8rem;color:#fca5a5;font-weight:600">Mauvais</span>
<span style="font-size:0.8rem;color:#fca5a5">> 500 ms</span>
</div>
</div>
</div>
</div>
</div>

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

___IMG:core-web-vitals-dashboard-metriques.png___

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(96,165,250,0.2);background:rgba(96,165,250,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#60a5fa;margin-bottom:1rem">IMPACT DES CORE WEB VITALS SUR LE RANKING</div>
<div style="display:flex;flex-direction:column;gap:0.75rem">
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:140px;flex-shrink:0;font-size:0.85rem;color:#e4e4e7;font-weight:600">3 métriques "Bon"</div>
<div style="flex:1;position:relative;height:32px">
<div style="position:absolute;inset:0;background:rgba(74,222,128,0.08);border-radius:8px"></div>
<div style="position:absolute;top:0;left:0;bottom:0;width:95%;background:linear-gradient(90deg,rgba(74,222,128,0.35),rgba(74,222,128,0.15));border-radius:8px;display:flex;align-items:center;justify-content:flex-end;padding-right:0.75rem">
<span style="font-size:0.78rem;color:#4ade80;font-weight:700">Boost SEO maximal</span>
</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:140px;flex-shrink:0;font-size:0.85rem;color:#e4e4e7;font-weight:600">2 métriques "Bon"</div>
<div style="flex:1;position:relative;height:32px">
<div style="position:absolute;inset:0;background:rgba(251,191,36,0.08);border-radius:8px"></div>
<div style="position:absolute;top:0;left:0;bottom:0;width:65%;background:linear-gradient(90deg,rgba(251,191,36,0.3),rgba(251,191,36,0.1));border-radius:8px;display:flex;align-items:center;justify-content:flex-end;padding-right:0.75rem">
<span style="font-size:0.78rem;color:#fbbf24;font-weight:700">Impact partiel</span>
</div>
</div>
</div>
<div style="display:flex;align-items:center;gap:1rem">
<div style="width:140px;flex-shrink:0;font-size:0.85rem;color:#e4e4e7;font-weight:600">1 ou 0 "Bon"</div>
<div style="flex:1;position:relative;height:32px">
<div style="position:absolute;inset:0;background:rgba(252,165,165,0.08);border-radius:8px"></div>
<div style="position:absolute;top:0;left:0;bottom:0;width:25%;background:linear-gradient(90deg,rgba(252,165,165,0.3),rgba(252,165,165,0.1));border-radius:8px;display:flex;align-items:center;justify-content:flex-end;padding-right:0.75rem">
<span style="font-size:0.78rem;color:#fca5a5;font-weight:700">Pénalité</span>
</div>
</div>
</div>
</div>
<div style="margin-top:1rem;font-size:0.78rem;color:#71717a">Les 3 métriques doivent être dans le vert pour obtenir le boost complet. Une seule métrique en rouge suffit à perdre l'avantage.</div>
</div>

## Comment mesurer vos Core Web Vitals

**PageSpeed Insights** (pagespeed.web.dev) est votre premier outil. Il combine les données de terrain réelles (CrUX, données Chrome UX Report) et les mesures de laboratoire (Lighthouse). Testez à la fois en mode mobile et desktop.

**Lighthouse** intégré dans Chrome DevTools vous donne des mesures en temps réel avec des recommandations contextuelles. Idéal pour les tests en développement.

**Google Search Console** (rapport "Expérience" > "Core Web Vitals") vous donne une vision globale de votre site : quelles URL sont en "Mauvais", "A améliorer" ou "Bon" sur l'ensemble du traffic réel.

**Chrome UX Report** (via BigQuery ou l'extension CrUX) vous permet d'analyser les données de terrain de n'importe quel site.

## Les quick wins par type de site

**WordPress :** installez WP Rocket ou Perfmatters pour le cache et la minification, Imagify pour la compression d'images en WebP, et désactivez les scripts inutiles page par page. Évitez les constructeurs de pages (Elementor, Divi) qui génèrent des douzaines de requêtes CSS/JS supplémentaires.

**Shopify :** passez à un thème rapide (Dawn, Prestige), compressez toutes vos images produits, désactivez les apps Shopify inutilisées (chacune peut ajouter 200-500ms de JS), et utilisez le système de chargement différé natif de Shopify.

**Next.js :** utilisez systématiquement next/image pour l'optimisation automatique des images, next/font pour le chargement optimisé des polices, activez la génération statique (SSG) quand c'est possible, et monitorez avec Vercel Analytics pour les données de terrain réelles.

<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(212,212,216,0.2);background:rgba(212,212,216,0.04)">
<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#D4D4D8;margin-bottom:1rem">CHECKLIST OPTIMISATION CORE WEB VITALS</div>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem">
<div style="background:rgba(167,139,250,0.06);border:1px solid rgba(167,139,250,0.15);border-radius:10px;padding:1rem">
<div style="font-size:0.8rem;font-weight:700;color:#A78BFA;margin-bottom:0.75rem">LCP : Vitesse</div>
<div style="display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Images héro en WebP/AVIF</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Preload image above-the-fold</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">CDN + compression Brotli</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">font-display: swap</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">TTFB < 800ms (cache serveur)</span></div>
</div>
</div>
<div style="background:rgba(255,140,0,0.06);border:1px solid rgba(255,140,0,0.15);border-radius:10px;padding:1rem">
<div style="font-size:0.8rem;font-weight:700;color:#FF8C00;margin-bottom:0.75rem">CLS : Stabilité</div>
<div style="display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">width + height sur toutes les img</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Espace réservé pour embeds</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">font-display: optional (non critique)</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">min-height sur éléments dynamiques</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Pas d'injection above-the-fold</span></div>
</div>
</div>
<div style="background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);border-radius:10px;padding:1rem">
<div style="font-size:0.8rem;font-weight:700;color:#4ade80;margin-bottom:0.75rem">INP : Réactivité</div>
<div style="display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Découper les tâches JS longues</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Différer scripts non critiques</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Web Workers pour calculs lourds</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Animations CSS > animations JS</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">scheduler.postTask pour les callbacks</span></div>
</div>
</div>
<div style="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.15);border-radius:10px;padding:1rem">
<div style="font-size:0.8rem;font-weight:700;color:#60a5fa;margin-bottom:0.75rem">Outils de mesure</div>
<div style="display:flex;flex-direction:column;gap:0.4rem">
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">PageSpeed Insights (terrain + labo)</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Lighthouse (Chrome DevTools)</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Search Console (rapport global)</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Chrome UX Report (BigQuery)</span></div>
<div style="display:flex;align-items:flex-start;gap:0.4rem"><span style="color:#4ade80;font-size:0.85rem;line-height:1.3">✓</span><span style="font-size:0.8rem;color:#9CA3AF">Vercel Analytics (Next.js)</span></div>
</div>
</div>
</div>
</div>

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
