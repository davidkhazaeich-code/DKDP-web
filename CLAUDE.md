@AGENTS.md

# DKDP.ch : Conventions du projet Next.js

Site vitrine de l'agence DKDP. Stack : **Next.js App Router · TypeScript · Tailwind CSS · Framer Motion · Lenis · Radix UI**. Deploye sur Vercel via GitHub (branche `main` = production automatique).

---

> **Fichier court par construction** (cible < 200 lignes, doc Claude Code) : les références détaillées sont dans `docs/claude/` (table en fin de fichier), à lire quand le sujet est touché. Ne pas réécrire ici une section déplacée : compléter son fichier dans `docs/claude/`. Scindé le 2026-09-19, original dans `_archive/nettoyage-contexte-2026-09-19/` du DEV SPACE.

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

## Nommage : Formation Claude

| Contexte | Nom exact |
|---|---|
| Page `/formation-entreprise/claude-ai` (titre, H1, metadata, breadcrumb) | **Formation Claude IA** |
| Page listing `/formation-entreprise` (card titre) | **Formation Claude IA** |
| Mega menu Header (FORMATION_MAIN + IA_SECONDARY) | **Formation Claude** |
| Descriptions mega menu | Mentionner Claude.ai, Projects Cowork et Claude Code |

---

## Noms de modeles IA : la source unique

`docs/astra-facts-2026-09-10.md` (fiche sourcee) et la memory
`project_ai_models_current`. En septembre 2026 : **ChatGPT Astra (GPT-6)**
(premiere mention d'une page « ChatGPT Astra (GPT-6) », puis « Astra » ;
« GPT-6 Astra » en contexte API ou agents), **Claude Fable 5.1** dans les
comparatifs et les formations, **Claude Opus 5** / **Sonnet 5** dans les stacks
d'agents, **Gemini 3.8**, **Copilot propulse par GPT-6 Astra**.

**Ne plus ecrire** GPT-4o, GPT-5, GPT-5.3, GPT-5.5, ChatGPT-5, o3, GPT Operator,
DALL-E 3, Claude Opus 4.7, Sonnet 4.6, « Gemini 3 » seul, hors articles de blog
dates (qui portent un encart « Mise a jour, septembre 2026 » en tete).
Controle :

```bash
grep -rn --exclude-dir=blog -E "GPT-?4o|GPT-?5(\.[0-9])?\b|ChatGPT-5|Opus 4\.7|Sonnet 4\.6" src/app src/components src/data src/lib/cities.ts src/lib/cities-en.ts
# seules occurrences legitimes : GPT-5.6 (Sol, Terra, Luna) et GPTBot dans robots.ts
```

---

## Titres et descriptions : mesurer en PIXELS

`node tools/check-serp-width.mjs [base] [filtres...] [--tout]` mesure les
`<title>` (Arial 20px, Google coupe vers 600px) et les descriptions (Arial 14px,
~920px) de tout le sitemap, sur la prod par defaut ou sur un `next start` local.
Meme recette que `cours-informatique/site-v2/tools/check-serp-width.mjs`.

Au 10.09.2026, **17 des 41 pages formation et IA etaient coupees** (les titles
EN « Geneva & French-speaking Switzerland | … | DKDP » en tete, jusqu'a 794px)
et **34 descriptions depassaient 160 caracteres**. Les pages touchees par la
passe Astra ont ete ramenees sous 600px ; le reste est un chantier ouvert (voir
memory `project_chatgpt_astra_pages_2026_09`). Un title se mesure, il ne se
compte pas : 52 caracteres en majuscules sont plus larges que 60 en minuscules.

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

## Documentation de référence (`docs/claude/`, lue à la demande)

| Sujet | Fichier | Lire quand |
|---|---|---|
| Blog : workflow de publication | `docs/claude/03-blog-workflow-de-publication.md` | Quand David fournit du contenu (lien YouTube, transcript, topic, texte brut) pour un article : |
| Nommage : Formation Figma | `docs/claude/05-nommage-formation-figma.md` | /formation-entreprise/web-design a ete renommee /formation-entreprise/figma |
| Nommage : Formation ChatGPT (ajoutee le 2026-09-10) | `docs/claude/06-nommage-formation-chatgpt.md` | Page /formation-entreprise/chatgpt (miroir /en/corporate-training/chatgpt), |
| Nommage : ChatGPT Ads (page service ajoutee le 2026-09-10) | `docs/claude/07-nommage-chatgpt-ads.md` | Page /agence-digitale/chatgpt-ads (miroir /en/digital-agency/chatgpt-ads), |
| Couleur des liens : gris au repos, plein au survol | `docs/claude/11-couleur-des-liens-gris-au-repos-plein-au-survol.md` | Regle unique pour tout lien textuel du site (listes de navigation, mega menu, footer, plan |
| Nombres : jamais `toLocaleString` dans un composant rendu cote serveur | `docs/claude/12-nombres-jamais-tolocalestring-dans-un-composant-rendu-cote-s.md` | Source unique : src/lib/format.ts (formatSwissInt, formatSwissChf). |
| Composants cles | `docs/claude/14-composants-cles.md` |  |
| Fichiers importants | `docs/claude/17-fichiers-importants.md` |  |
| Analytics et conversions (GA4 + Google Ads + ChatGPT Ads) | `docs/claude/21-analytics-et-conversions.md` | Source de verite : src/lib/analytics.ts. Doc complete : docs/analytics-conversions.md. |
