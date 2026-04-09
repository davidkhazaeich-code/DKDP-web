@AGENTS.md

# DKDP.ch : Conventions du projet Next.js

Site vitrine de l'agence DKDP. Stack : **Next.js App Router · TypeScript · Tailwind CSS · Framer Motion · Lenis · Radix UI**. Deploye sur Vercel via GitHub (branche `main` = production automatique).

---

## Quick-start (nouvelle conversation)

```bash
# Chemin absolu du projet (ATTENTION : espace dans "clients Claude")
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp"

# Commandes courantes
npm run dev          # Dev server (localhost:3000)
npm run build        # Build production
npx vitest run       # Tests (120+ tests)
git push origin main # Deploy (Vercel auto-deploy)
```

**Git remote** : `git@github.com:davidkhazaeich-code/DKDP-web.git` (SSH)

> Le dossier parent s'appelle `clients Claude/` avec un **espace**. Toujours utiliser des guillemets dans les commandes shell.

---

## Regles absolues

- **Jamais de em dash** `—` dans le texte visible (headings, paragraphes, labels, badges, FAQ). Utiliser une virgule, un deux-points ou un point selon le contexte.
- **IA en francais** = "IA" (pas "AI"), sauf noms propres : Claude AI, ChatGPT, GitHub Copilot.
- **Annee courante = 2026.** Verifier via le contexte systeme avant d'ecrire une date, un copyright ou "en 2025/2024".
- **Lire avant d'editer.** Toujours `Read` un fichier avant tout `Edit` ou `Write`.
- **Server vs Client.** Les pages sont des Server Components par defaut. N'ajouter `'use client'` que si hooks React ou event handlers directs sont necessaires.

---

## Blog : workflow de publication

Quand David fournit du contenu (lien YouTube, transcript, topic, texte brut) pour un article :

1. **Redaction** : Reecrire/creer un article complet au ton DKDP, SEO-optimise, avec maillage interne vers les pages services et formation
2. **Image hero** : Generer avec Nanobanana (MCP tool `mcp__nanobanana__generate_image`), style dark/tech/pro, ratio 16:9
3. **Diagrammes et visuels inline** :
   - **Diagrammes HTML codes** : Inserer des blocs `<div>` directement dans le `content` markdown. Le renderer les passe tel quel (pass-through). Utiliser les design tokens du site (violet `#A78BFA`, orange `#FF8C00`, chrome `#D4D4D8`, vert `#4ade80`, rouge `#fca5a5`). Types utiles : grilles de cards, barres de progression, comparaisons avant/apres, timelines, heatmaps d'attention, etapes numerotees.
   - **Schemas Nanobanana** : Generer 1-3 images explicatives par article (courbes, infographies, diagrammes visuels). Les ajouter dans `images[]` avec alt + caption, et les placer dans le contenu via le marqueur `___IMG:filename.png___`.
   - **Regle** : chaque article doit avoir au minimum 1 diagramme HTML code ET 1 image Nanobanana, en plus de l'image hero.
   - **SEO images** :
     - **Noms de fichiers** : toujours descriptifs avec mots-cles, format `mot-cle-principal-description.png` (ex: `seo-local-geneve-funnel.png`, `formation-ia-roi-curve.png`). Jamais de noms generiques (`image1.png`, `hero.png`).
     - **Alt texts** : commencer par le mot-cle cible de l'article, inclure contexte geo (Geneve, Suisse, PME) et annee si pertinent. Format : `"Mot-cle principal : description concise et riche semantiquement"`. Ex: `"Formation IA entreprise Geneve 2026 : seance pratique avec collaborateurs sur outils IA"`.
4. **Publication** : Creer un nouveau fichier `src/lib/blog/<slug>.ts` (default export), ajouter l'import dans `src/lib/blog/index.ts`, placer les images dans `public/images/blog/`, mettre a jour `FEATURED_SLUG` dans index.ts si pertinent
5. **Deploy** : Commit + push sur `main` → auto-deploy Vercel
6. **Confirmation** : Donner l'URL live `https://dkdp.ch/blog/<slug>`

**Fichiers blog cles :**

| Fichier | Role |
|---|---|
| `src/lib/blog/` | **1 fichier par article** (default export). Types dans `types.ts`, assemblage dans `index.ts` |
| `src/lib/blog/index.ts` | Re-exporte ARTICLES[], BLOG_CATEGORIES, FEATURED_SLUG, getArticle(), getRelatedArticles() |
| `src/app/blog/[slug]/page.tsx` | Page article individuelle, markdown custom avec marqueurs `___IMG:filename___` + blocs HTML pass-through (`<div>`) |
| `public/images/blog/` | Images hero, schemas et inline des articles |

**Structure d'un fichier article (`src/lib/blog/<slug>.ts`) :**
```ts
import type { Article } from './types'

const article: Article = {
  slug: 'mon-article',
  title: 'Titre SEO',
  excerpt: 'Description courte pour les cards et meta',
  date: '5 avril 2026',
  dateISO: '2026-04-05',
  readTime: '8 min',
  category: 'ia' | 'seo' | 'formation' | 'outils',
  heroImage: { src: '/images/blog/mon-article-hero.png', alt: '...' },
  images: [
    { src: '/images/blog/mon-article-schema.png', alt: '...', caption: '...' },
  ],
  content: `...markdown + HTML diagrams + ___IMG:filename___ markers...`,
}

export default article
```
```

**Conventions pour les diagrammes HTML :**
- Wrapper principal : `<div style="margin:2.5rem 0;padding:2rem;border-radius:16px;border:1px solid rgba(...);background:rgba(...)">` 
- Titre du diagramme : `<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:...;margin-bottom:1rem">TITRE</div>`
- Utiliser `display:grid` ou `display:flex` pour les layouts
- Texte principal en `#e4e4e7`, secondaire en `#9CA3AF`, muted en `#71717a`
- Toujours dark theme, coherent avec le fond `#09090B` du site

---

## Nommage : Formation Claude

| Contexte | Nom exact |
|---|---|
| Page `/formation-entreprise/claude-ai` (titre, H1, metadata, breadcrumb) | **Formation Claude IA** |
| Page listing `/formation-entreprise` (card titre) | **Formation Claude IA** |
| Mega menu Header (FORMATION_MAIN + IA_SECONDARY) | **Formation Claude** |
| Descriptions mega menu | Mentionner Claude.ai, Projects Cowork et Claude Code |

---

## Design tokens

Source unique : **`src/lib/tokens.ts`**

```
violet  → #A78BFA  (agence, Claude)
orange  → #FF8C00  (formation)
chrome  → #D4D4D8  (IA)
gray    → #9CA3AF  (A propos)
green   → #4ade80  (Claude Code)
blue    → #60a5fa  (Commercial)
pink    → #f472b6  (RH)
teal    → #2dd4bf  (Finance)
amber   → #fbbf24  (Juridique)
```

Chaque token expose `{ color, bg, border, glow? }`.

**Usage recommande dans les pages denses :**
```ts
import { violet, orange, chrome } from '@/lib/tokens'
const V = violet.color, VB = violet.bg, VD = violet.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border
```

Ne jamais copier-coller des `rgba()` bruts dans une nouvelle page. Importer depuis tokens.ts.

---

## Structure type d'une page service

```
InfiniteGrid (hero avec blobs + grille animee)
  └── H1, GradTag, GradText, trust signals, CTA LiquidMetalButton

Stats bar (py-12, border-b)

Subnav sticky (top-[66px], z-30, backdrop-blur-2xl, bg-[#0A0A0A]/85)

Sections contenu (SectionReveal autour de chaque bloc)
  └── Titre h2, paragraphe intro, composants visuels

Testimonials (composant partage)

FAQSection ou <details> accordeon

CTAFinal (composant partage, toujours en dernier)
```

---

## Composants cles

| Composant | Fichier | Usage |
|---|---|---|
| `LiquidMetalButton` | `components/canvas/LiquidMetalButton.tsx` | CTA principal, liquid metal effect |
| `InfiniteGrid` | `components/canvas/InfiniteGrid.tsx` | Fond hero anime, props : `accentRgb`, `blob1`, `blob2` |
| `HeroBg` | `components/ui/HeroBg.tsx` | CSS-only grid (mobile), meme props que InfiniteGrid |
| `DottedSurface` | `components/canvas/DottedSurface.tsx` | Three.js points animes (homepage hero, desktop only) |
| `GradTag` | `components/ui/GradTag.tsx` | Badge de section violet gradient |
| `GradText` | `components/ui/GradText.tsx` | Texte gradient violet, prop `as` |
| `SectionReveal` | `components/ui/SectionReveal.tsx` | Animation apparition scroll. **Desactivee sur la homepage** via `RevealDisabledProvider` |
| `CTAFinal` | `components/sections/CTAFinal.tsx` | Section CTA de fin de page, reutilisable |
| `FAQSection` | `components/sections/FAQSection.tsx` | Accordeon FAQ, prop `items` |
| `SchemaOrg` | `components/seo/SchemaOrg.tsx` | Injection JSON-LD. Builders dans `lib/schema.ts` |
| `SmoothScrollProvider` | `components/providers/SmoothScrollProvider.tsx` | Lenis + reset scroll au changement de page + interception anchors `#` |

---

## Scroll et navigation

- **Header flottant** : `fixed top-0` avec inner container `max-w-[1200px] mt-2 h-14 rounded-2xl` = **66px** total du haut.
- **Lenis** gere le smooth scroll global.
- Changement de page → `lenis.scrollTo(0, { immediate: true })` (pas d'animation).
- Liens ancres `href="#section"` → interceptes par Lenis avec `offset: -124` (header 66px + subnav ~58px).
- Le subnav sticky est a `top-[66px]` et `z-30` avec `bg-[#0A0A0A]/85 backdrop-blur-2xl`.
- Sections avec ancres utilisent `scroll-mt-[124px]`.
- **Important** : `globals.css` utilise `overflow-x: clip` (pas `hidden`) sur html/body pour ne pas casser `position: sticky` sur mobile.

---

## Taille des fichiers et composants

Claude lit **~750 lignes** en une seule passe (limite 10 000 tokens).

**Regles :**
- Pages > 600 lignes : utiliser `offset` + `limit` pour lire par blocs.
- Pages > 400 lignes : extraire les composants internes dans un dossier `_components/` au meme niveau que `page.tsx`.
- Exemple : `app/formation-entreprise/claude-ai/_components/AgendaRow.tsx`

**Pages actuellement refactorisees :**
- `formation-entreprise/claude-ai/` : composants dans `_components/` (ClaudeProductCard, AgendaRow, CapabilityCard, UseCaseCard)

---

## Fichiers importants

| Fichier | Role |
|---|---|
| `src/lib/tokens.ts` | Palette couleurs et tokens |
| `src/lib/routes.ts` | Source de verite URLs, sitemap, redirections |
| `src/lib/schema.ts` | Builders JSON-LD (buildService, buildCourse, buildFAQPage, buildBreadcrumbList) |
| `src/lib/blog/` | Articles blog (1 fichier par article, index.ts pour l'assemblage) |
| `src/components/layout/Header.tsx` | Mega menu complet, donnees nav dans les consts en haut du fichier |
| `src/components/providers/SmoothScrollProvider.tsx` | Lenis config |
| `src/components/ui/SectionReveal.tsx` | Animation + `RevealDisabledProvider` |
| `src/app/page.tsx` | Homepage (57 lignes, wrappee dans `RevealDisabledProvider`) |

---

## Header : mega menu

Les donnees sont en haut de `Header.tsx` sous forme de tableaux :
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
- Pas de `<h1>` genere automatiquement, toujours explicite dans le JSX.

---

## Workflow SEO automatique

**Source de verite : `src/lib/routes.ts`**

A chaque modification d'URL, appliquer ce protocole :

| Action | Dans routes.ts |
|--------|----------------|
| Nouvelle page creee | Ajouter dans `ROUTES` avec `url`, `priority`, `changeFrequency` |
| Page supprimee | Retirer de `ROUTES`, ajouter redirect vers `/` dans `REDIRECTS` |
| URL renommee | Mettre a jour l'url dans `ROUTES`, ajouter redirect ancien→nouveau dans `REDIRECTS` |

Le sitemap (`app/sitemap.ts`) et les redirections (`next.config.mjs`) se mettent a jour automatiquement.

---

## Git et deploiement

- **Remote** : `git@github.com:davidkhazaeich-code/DKDP-web.git` (SSH)
- **Branche** : `main` → deploiement Vercel automatique
- Ne jamais force-push sur `main` sans confirmation explicite
- Apres push, le site est live sur `https://dkdp.ch` en ~60s
