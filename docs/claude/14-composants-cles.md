# Composants cles

> Section déplacée telle quelle depuis `CLAUDE.md` le 2026-09-19 (workflow `nettoyage-contexte-claude.md` du DEV SPACE). Référence lue à la demande : elle ne se charge plus à chaque session. La compléter ici, pas dans CLAUDE.md.

| Composant | Fichier | Usage |
|---|---|---|
| `LiquidMetalButton` | `components/canvas/LiquidMetalButton.tsx` | CTA principal, liquid metal effect |
| `InfiniteGrid` | `components/canvas/InfiniteGrid.tsx` | Fond hero anime, props : `accentRgb`, `blob1`, `blob2` |
| `HeroBg` | `components/ui/HeroBg.tsx` | CSS-only grid (mobile), meme props que InfiniteGrid |
| `DottedSurface` | `components/canvas/DottedSurface.tsx` | Three.js points animes (homepage hero, desktop only) |
| `GradTag` | `components/ui/GradTag.tsx` | Badge de section violet gradient |
| `GradText` | `components/ui/GradText.tsx` | Texte gradient violet, prop `as` |
| `SectionReveal` | `components/ui/SectionReveal.tsx` | Animation apparition scroll. **Desactivee sur la homepage** via `RevealDisabledProvider`. ⚠️ `delay` en **secondes** (`delay={0.08}`), le composant multiplie par 1000 : un `delay={80}` cache l'element pendant 80 s sans aucune erreur |
| `CTAFinal` | `components/sections/CTAFinal.tsx` | Section CTA de fin de page, reutilisable |
| `FAQSection` | `components/sections/FAQSection.tsx` | Accordeon FAQ, prop `items` |
| `SchemaOrg` | `components/seo/SchemaOrg.tsx` | Injection JSON-LD. Builders dans `lib/schema.ts` |
| `SmoothScrollProvider` | `components/providers/SmoothScrollProvider.tsx` | Lenis + reset scroll au changement de page + interception anchors `#` |
| `LogoBanner` / `ProofStack` | `components/sections/LogoBanner.tsx`, `ProofStack.tsx` | Bandeau « Ils nous font confiance ». Logos = silhouette blanche transparente (`.client-logo-tile`, marche mode clair + sombre). Ajouter un logo : `tools/add-client-logo.sh` + `workflows/logos-clients-bandeau-confiance.md` (DEV SPACE). `LogoBanner` = roster complet défilant, `ProofStack` = grille homepage curée |
| `ArticleCarousel` | `components/sections/ArticleCarousel.tsx` | Carrousel horizontal d'articles de blog pour une section « veille » de page service. Props : `articles`, `accentColor`, `accentBorder`, `lang`, `label`. Scroll natif + scroll-snap (swipe mobile), flèches desktop, barre de progression, masque de fondu aux bords. Lang-aware (`fr` par défaut). Alimenter avec `getArticlesByTopic()` ou `getLatestArticles()` |
| `TechWatch` | `components/sections/TechWatch.tsx` | Section « Veille technologique » de la page d'accueil, entre `ProcessSteps` et `ProofStack`. Fond de grille animé (`HeroBg`) + `ArticleCarousel` sur les 8 derniers articles. Lang-aware, montée à l'identique sur `/` et `/en` |

---

