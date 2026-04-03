@AGENTS.md

# DKDP.ch — Conventions du projet Next.js

Site vitrine de l'agence DKDP. Stack : **Next.js App Router · TypeScript · Tailwind CSS · Framer Motion · Lenis · Radix UI**. Déployé sur Vercel via GitHub (branche `main` = production automatique).

---

## Règles absolues

- **Jamais de em dash** `—` dans le texte visible (headings, paragraphes, labels, badges, FAQ). Utiliser une virgule, un deux-points ou un point selon le contexte.
- **IA en français** = "IA" (pas "AI"), sauf noms propres : Claude AI, ChatGPT, GitHub Copilot.
- **Année courante = 2026.** Vérifier via le contexte système avant d'écrire une date, un copyright ou "en 2025/2024".
- **Lire avant d'éditer.** Toujours `Read` un fichier avant tout `Edit` ou `Write`.
- **Server vs Client.** Les pages sont des Server Components par défaut. N'ajouter `'use client'` que si hooks React ou event handlers directs sont nécessaires.

---

## Nommage — Formation Claude

| Contexte | Nom exact |
|---|---|
| Page `/formation-entreprise/claude-ai` (titre, H1, metadata, breadcrumb) | **Formation Claude IA** |
| Page listing `/formation-entreprise` (card titre) | **Formation Claude IA** |
| Mega menu Header (FORMATION_MAIN + IA_SECONDARY) | **Formation Claude** |
| Descriptions méga menu | Mentionner Claude.ai, Projects Cowork et Claude Code |

---

## Design tokens

Source unique : **`src/lib/tokens.ts`**

```
violet  → #A78BFA  (agence, Claude)
orange  → #FF8C00  (formation)
chrome  → #D4D4D8  (IA)
gray    → #9CA3AF  (À propos)
green   → #4ade80  (Claude Code)
blue    → #60a5fa  (Commercial)
pink    → #f472b6  (RH)
teal    → #2dd4bf  (Finance)
amber   → #fbbf24  (Juridique)
```

Chaque token expose `{ color, bg, border, glow? }`.

**Usage recommandé dans les pages denses :**
```ts
import { violet, orange, chrome } from '@/lib/tokens'
// alias courts si la page en a beaucoup :
const V = violet.color, VB = violet.bg, VD = violet.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border
```

Ne jamais copier-coller des `rgba()` bruts dans une nouvelle page. Importer depuis tokens.ts.

---

## Structure type d'une page service

```
InfiniteGrid (hero avec blobs + grille animée)
  └── H1, GradTag, GradText, trust signals, CTA LiquidMetalButton

Stats bar (py-12, border-b)

Subnav sticky (top-14, z-30, backdrop-blur)

Sections contenu (SectionReveal autour de chaque bloc)
  └── Titre h2, paragraphe intro, composants visuels

Testimonials (composant partagé)

FAQSection ou <details> accordéon

CTAFinal (composant partagé, toujours en dernier)
```

---

## Composants clés

| Composant | Fichier | Usage |
|---|---|---|
| `LiquidMetalButton` | `components/canvas/LiquidMetalButton.tsx` | CTA principal, liquid metal effect |
| `InfiniteGrid` | `components/canvas/InfiniteGrid.tsx` | Fond hero animé, props : `accentRgb`, `blob1`, `blob2` |
| `GradTag` | `components/ui/GradTag.tsx` | Badge de section violet gradient |
| `GradText` | `components/ui/GradText.tsx` | Texte gradient violet, prop `as` |
| `SectionReveal` | `components/ui/SectionReveal.tsx` | Animation apparition scroll. **Désactivée sur la homepage** via `RevealDisabledProvider` |
| `CTAFinal` | `components/sections/CTAFinal.tsx` | Section CTA de fin de page, réutilisable |
| `FAQSection` | `components/sections/FAQSection.tsx` | Accordéon FAQ, prop `items` |
| `SchemaOrg` | `components/seo/SchemaOrg.tsx` | Injection JSON-LD. Builders dans `lib/schema.ts` |
| `SmoothScrollProvider` | `components/providers/SmoothScrollProvider.tsx` | Lenis + reset scroll au changement de page + interception anchors `#` |

---

## Scroll et navigation

- **Lenis** gère le smooth scroll global.
- Changement de page → `lenis.scrollTo(0, { immediate: true })` (pas d'animation).
- Liens ancres `href="#section"` → interceptés par Lenis avec `offset: -80`.
- Le subnav sticky est à `top-14` (hauteur du Header) et `z-30`.

---

## Taille des fichiers et composants

Claude lit **~750 lignes** en une seule passe (limite 10 000 tokens).

**Règles :**
- Pages > 600 lignes : utiliser `offset` + `limit` pour lire par blocs.
- Pages > 400 lignes : extraire les composants internes dans un dossier `_components/` au même niveau que `page.tsx`.
- Exemple : `app/formation-entreprise/claude-ai/_components/AgendaRow.tsx`

**Pages actuellement refactorisées :**
- `formation-entreprise/claude-ai/` : composants dans `_components/` (ClaudeProductCard, AgendaRow, CapabilityCard, UseCaseCard)

---

## Fichiers importants à connaître

| Fichier | Rôle |
|---|---|
| `src/lib/tokens.ts` | Palette couleurs et tokens |
| `src/lib/schema.ts` | Builders JSON-LD (buildService, buildCourse, buildFAQPage, buildBreadcrumbList) |
| `src/lib/blog-data.ts` | Données articles blog (1 800+ lignes, lire par sections) |
| `src/components/layout/Header.tsx` | Mega menu complet, données nav dans les consts en haut du fichier |
| `src/components/providers/SmoothScrollProvider.tsx` | Lenis config |
| `src/components/ui/SectionReveal.tsx` | Animation + `RevealDisabledProvider` |
| `src/app/page.tsx` | Homepage (57 lignes, wrappée dans `RevealDisabledProvider`) |

---

## Header — mega menu

Les données sont en haut de `Header.tsx` sous forme de tableaux :
- `AGENCE_MAIN / AGENCE_SECONDARY`
- `IA_MAIN / IA_SECONDARY`
- `FORMATION_MAIN / FORMATION_SECONDARY`
- `APROPOS_MAIN / APROPOS_SECONDARY`

Couleurs par pilier dans `PILLAR_ACCENT` (aussi dans `src/lib/tokens.ts` sous `PILLAR`).

---

## SEO

- `metadata` export en haut de chaque page (`title`, `description`, `alternates.canonical`).
- Schema JSON-LD via `<SchemaOrg schema={...} />` avec les builders de `lib/schema.ts`.
- Breadcrumb : toujours inclure `buildBreadcrumbList` sur les pages profondes.
- Pas de `<h1>` généré automatiquement, toujours explicite dans le JSX.

---

## Workflow SEO automatique

**Source de vérité : `src/lib/routes.ts`**

A chaque modification d'URL, appliquer ce protocole :

| Action | Dans routes.ts |
|--------|----------------|
| Nouvelle page créée | Ajouter dans `ROUTES` avec `url`, `priority`, `changeFrequency` |
| Page supprimée | Retirer de `ROUTES`, ajouter `{ source: ancienneUrl, destination: '/', permanent: true }` dans `REDIRECTS` |
| URL renommée | Mettre a jour l'url dans `ROUTES`, ajouter `{ source: ancienneUrl, destination: nouvelleUrl, permanent: true }` dans `REDIRECTS` |

Le sitemap (`app/sitemap.ts`) et les redirections (`next.config.mjs`) se mettent a jour automatiquement.

---

## Git et déploiement

- Branche `main` → déploiement Vercel automatique.
- Remote GitHub : `davidkhazaeich-code/DKDP-web`.
- Ne jamais force-push sur `main` sans confirmation explicite.
