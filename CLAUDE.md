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

> **Effet de bord voulu** : la section « Veille et actualité » des pages `/formation-entreprise/claude-ai` et `/en/corporate-training/claude-ai` est alimentee par `getArticlesByTopic(CLAUDE_TOPIC, 12)`, recalcule a chaque rendu. Tout article touchant **un seul** des mots de `CLAUDE_TOPIC` (`claude`, `anthropic`, `opus`, `sonnet`, `haiku`, `mcp`, `agent ia`, `agentic`) dans son **slug, son titre ou ses tags** remonte automatiquement en tete du carrousel. Le compteur d'articles et la date de derniere publication se mettent a jour seuls. Rien a editer sur la page.
>
> **Les `tags` sont le levier de controle.** Un article Claude dont ni le slug ni le titre ne portent un mot du sujet doit avoir le tag qui va bien, sinon il reste invisible dans la section. Quand Anthropic sort un nom de produit ou de modele inedit, **elargir `CLAUDE_TOPIC` dans `src/lib/blog/topics.ts`**, pas les pages.
>
> **La page d'accueil aussi** : la section « Veille technologique » de `/` et `/en` (composant `TechWatch`, entre la methode et le bandeau de confiance) liste les **8 derniers articles tous sujets confondus** via `getLatestArticles()`. Toute publication y remonte en tete sans condition de mot-cle.
>
> Garde-fou : `src/lib/blog/__tests__/topic.test.ts` echoue si un article dont le slug ou le titre parle de Claude n'atterrit pas dans la section. Si ce test casse apres une publication, ajouter le mot manquant a `CLAUDE_TOPIC` plutot que d'ajuster le test.

**Fichiers blog cles :**

| Fichier | Role |
|---|---|
| `src/lib/blog/` | **1 fichier par article** (default export). Types dans `types.ts`, assemblage dans `index.ts` |
| `src/lib/blog/index.ts` | Re-exporte ARTICLES[], BLOG_CATEGORIES, FEATURED_SLUG, getArticle(), getRelatedArticles(). **Fichier d'assemblage : il bouge a chaque publication, ne pas y poser de logique de page** |
| `src/lib/blog/topics.ts` | Selections d'articles pour les sections de page : CLAUDE_TOPIC, getArticlesByTopic(), countArticlesByTopic(), getLatestArticles(). Volontairement separe de `index.ts` pour que redaction et developpement ne se marchent pas dessus |
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
  // Optionnel mais recommande : reprise MOT POUR MOT des Q/R de la section
  // « Questions frequentes » du contenu. Declenche un schema FAQPage en plus
  // du BlogPosting (rich results Google + citabilite moteurs IA).
  faq: [{ question: '...', answer: '...' }],
  content: `...markdown + HTML diagrams + ___IMG:filename___ markers...`,
}

export default article
```
```

> **Champ `faq`** : Google exige que la reponse balisee soit **visible sur la page**. Ne jamais baliser une Q/R absente du corps de l'article, et repercuter toute reformulation du texte dans le champ. Sans `faq`, la page n'emet que BlogPosting et BreadcrumbList, comme avant.

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

## Nommage : Formation Figma

`/formation-entreprise/web-design` a ete renommee `/formation-entreprise/figma`
le 2026-08-31 (miroir EN `/en/corporate-training/figma`), avec 301 dans
`REDIRECTS`. La page portait deja Figma du title jusqu'a la FAQ et ressortait sur
les requetes Figma, mais son URL disait « web design ». Une seconde page aurait
cannibalise la premiere sur un marche romand trop etroit pour deux : on a
renomme, pas duplique.

| Contexte | Nom exact |
|---|---|
| Page, H1, metadata, breadcrumb | **Formation Figma** |
| Mega menu, footer, hub, plan du site | **Formation Figma** (EN : **Figma training**) |
| Nom du formateur | **Aucun.** Le bloc `FigmaTrainer` decrit le profil requis et annonce que le profil detaille est transmis au calage des dates |

Le web design, l'UX/UI et la conception de maquettes n'ont pas disparu : ils sont
devenus des sections de cette page (vocabulaire wireframe / maquette / prototype /
design system, comparatif d'outils, cas d'usage). Ne pas recreer de page web design.

**Composants partages** dans `src/components/formation/figma/`, tous bilingues via
une prop `lang` (pattern `FormationTrainer`, pas de duplication FR/EN comme sur les
pages `ia` et `canva`) : `FigmaPillars`, `DesignVocabulary`, `FigmaToolComparison`,
`FigmaLevels`, `FigmaUseCases`, `IntraVsCatalogue`, `FigmaTrainer`.

> **Le bloc `FormationTrainer` partage n'est volontairement PAS monte sur cette
> page.** Il presente David, Romane et Ali, dont les competences affichees sont
> l'IA, le SEO, le developpement et la bureautique. Aucun n'est praticien de Figma,
> et les afficher sous la promesse « formes par des praticiens » serait un faux
> signal, precisement ce qu'un prospect exigeant verifie.

**Faits produit verifies le 2026-08-31**, a re-verifier avant de les reecrire :
plan gratuit Figma = fichiers illimites en brouillon personnel mais **3 fichiers
partages de 3 pages**, historique 30 jours ; **interface en francais depuis le
15 octobre 2025** ; Adobe XD en maintenance, plus vendu separement. Les anciens
chiffres non sources de la page (« 70% de temps gagne », « handoff divise par 3 »)
ont ete retires : depuis la mise a jour E-E-A-T de decembre 2025, un chiffre rond
sans source est un signal negatif et n'est pas repris par les moteurs IA.

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

## Couleur des liens : gris au repos, plein au survol

**Regle unique pour tout lien textuel du site** (listes de navigation, mega menu, footer, plan
du site, liens en ligne dans un paragraphe, navigation alphabetique du glossaire) :

```jsx
className="text-text-secondary hover:text-text transition-colors"   // liens de navigation
className="text-text-muted hover:text-text transition-colors"       // liens secondaires (footer, villes, legal)
className="underline hover:text-text transition-colors"             // lien en ligne dans un paragraphe
```

`--text` vaut `#FFFFFF` en sombre et `#1A1A18` en clair : la meme paire de classes donne
gris → blanc en mode sombre et gris → noir en mode clair. Rien a dupliquer par theme.

**Ne jamais** poser `text-text` ou `text-white` comme etat de repos d'un lien : c'est ce qui
faisait cohabiter des liens blancs et des liens gris sur la meme page (corrige le 2026-08-24).
`hover:text-white` est un bug de mode clair (blanc sur creme), toujours `hover:text-text`.

**Exceptions assumees** (ce ne sont pas des liens textuels, on n'y touche pas) :

| Cas | Pourquoi |
|---|---|
| Titre `h3` / `p` d'une carte cliquable (services, villes, tarifs, blog) | C'est un titre, pas un libelle de lien. Il reste en `text-text` |
| Bouton CTA a fond plein (`EstimationBanner`, boutons violets/oranges) | Texte blanc sur fond colore, cf. regle boutons colores |
| Valeurs de la carte contact (`GoogleMapSection`) | `tel:` et `mailto:` sont des valeurs de donnees alignees sur les lignes non cliquables |
| Icone LinkedIn des formateurs | `hover:text-[#0A66C2]` = couleur de marque, volontaire |

**Verification** : `node tools/audit-white-links.mjs` liste les liens qui violent la regle
(couleur pleine au repos, survol mort, survol vers autre chose que `--text`). Les cartes et
boutons sont masques par defaut, `--all` les affiche. `node tools/audit-link-colors.mjs [url]`
fait la meme chose en live sur les deux themes via Playwright.

> `text-text-primary` **n'existe pas** dans le systeme de tokens (`@theme` n'expose que
> `--color-text`, `--color-text-secondary`, `--color-text-muted`). Toute classe
> `text-text-primary` / `hover:text-text-primary` est silencieusement ignoree par Tailwind :
> c'est un survol mort. Utiliser `text-text`.

### Zones volontairement sombres dans les deux themes

Une section qui pose son propre fond sombre en dur ne doit **pas** utiliser les tokens de
texte : `--text` devient `#1A1A18` en mode clair, donc du texte quasi noir sur un fond noir.
Dans ces zones, utiliser l'echelle blanche (`text-white`, `text-white/70`, `text-white/45`)
et faire le survol vers `hover:text-white`.

| Zone | Fond en dur |
|---|---|
| `CinematicCTA` (bas des pages Realisations) | `bg-[#09090B]` |
| `BrowserFrame` (mockup de navigateur) | `bg-[#0E0E10]` et `bg-[#1B1B1F]` |
| Hero des pages villes | photo + voile sombre (`ImageHeroBg` / `VideoHeroBg`) |

Partout ailleurs dans `components/realisations/`, les tokens s'appliquent normalement : le
module a ete migre en mode clair le 2026-08-24 (titres, bordures de section, cartes).

---

## Nombres : jamais `toLocaleString` dans un composant rendu cote serveur

**Source unique : `src/lib/format.ts`** (`formatSwissInt`, `formatSwissChf`).

Le separateur de milliers de `fr-CH` depend de la version d'ICU embarquee dans le moteur :

```
Node 24 local (ICU 78) et Chrome  ->  "1 050"  (U+202F, espace fine insecable)
runtime Node de Vercel            ->  "1'050"  (U+0027, apostrophe)
```

Le serveur et le client rendent donc deux textes differents pour le meme nombre. React leve
**l'erreur #418** a l'hydratation, abandonne, et re-rend la racine depuis le HTML serveur.
Effet de bord : **`data-theme` pose par le script anti-FOUC disparait de `<html>`** et la page
repasse en sombre alors que l'utilisateur a choisi le mode clair.

C'est ce qui bloquait le mode clair sur les 6 pages portant un calculateur ROI
(`/intelligence-artificielle`, `/formation-entreprise/ia`, `/formation-entreprise/claude-ai`
et leurs miroirs EN). **Non reproductible en local** : Node 24 et Chrome sont d'accord, il
faut le runtime de Vercel pour voir l'ecart. Diagnostic : ecouter `pageerror` sur la prod et
comparer `data-theme` juste apres `domcontentloaded` puis 4 s plus tard.

```ts
import { formatSwissInt } from '@/lib/format'
formatSwissInt(1050)   // "1'050", sans Intl, identique serveur et client
```

Regle : tout nombre affiche au rendu serveur passe par `src/lib/format.ts`. Test de
non-regression dans `src/lib/__tests__/format.test.ts`.

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
| `LogoBanner` / `ProofStack` | `components/sections/LogoBanner.tsx`, `ProofStack.tsx` | Bandeau « Ils nous font confiance ». Logos = silhouette blanche transparente (`.client-logo-tile`, marche mode clair + sombre). Ajouter un logo : `tools/add-client-logo.sh` + `workflows/logos-clients-bandeau-confiance.md` (DEV SPACE). `LogoBanner` = roster complet défilant, `ProofStack` = grille homepage curée |
| `ArticleCarousel` | `components/sections/ArticleCarousel.tsx` | Carrousel horizontal d'articles de blog pour une section « veille » de page service. Props : `articles`, `accentColor`, `accentBorder`, `lang`, `label`. Scroll natif + scroll-snap (swipe mobile), flèches desktop, barre de progression, masque de fondu aux bords. Lang-aware (`fr` par défaut). Alimenter avec `getArticlesByTopic()` ou `getLatestArticles()` |
| `TechWatch` | `components/sections/TechWatch.tsx` | Section « Veille technologique » de la page d'accueil, entre `ProcessSteps` et `ProofStack`. Fond de grille animé (`HeroBg`) + `ArticleCarousel` sur les 8 derniers articles. Lang-aware, montée à l'identique sur `/` et `/en` |

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

## Analytics et conversions (GA4 + Google Ads)

**Source de verite : `src/lib/analytics.ts`.** Doc complete : `docs/analytics-conversions.md`.

- Tout evenement de conversion passe par `trackEvent()` (ou un helper `trackLead`,
  `trackPhoneClick`, `trackBookingComplete`...). Il envoie a la fois a GA4 (`gtag`)
  et au dataLayer GTM. **Ne jamais rappeler `window.gtag` / `dataLayer.push` en dur**
  dans un composant : importer le helper.
- Nouveau formulaire ? Appeler `trackLead({ form_type: '...', form_location: '...' })`
  au moment du succes (apres `res.ok`).
- Liens `tel:` / `mailto:` / WhatsApp et CTA Cal `[data-cal-link]` sont captes
  automatiquement par `components/providers/ConversionTracker.tsx` (monte dans le
  layout). Rien a faire pour un nouveau lien.
- Reservation Cal confirmee = `book_appointment`, branchee dans `CalProvider.tsx`
  via `bookingSuccessfulV2` (namespace `planifier-un-appel`).
- **CSP** : les domaines Google sont autorises dans `next.config.ts`
  (`script-src` + `connect-src` + `frame-src`). Toute nouvelle source Google
  (script ou collecte) doit y etre ajoutee, sinon le navigateur la bloque et
  l'evenement n'atteint jamais GA4.
- Tags en place : GA4 `G-SCXF5R826D` (gtag direct) + `G-65NPKH6CXN` (via GTM) +
  Google Ads `AW-395809057` (via GTM). Cote GA4/Ads, marquer les Key events et
  importer les conversions : voir `docs/analytics-conversions.md`.

---

## Git et deploiement

- **Remote** : `git@github.com:davidkhazaeich-code/DKDP-web.git` (SSH)
- **Branche** : `main` → deploiement Vercel automatique
- Ne jamais force-push sur `main` sans confirmation explicite
- Apres push, le site est live sur `https://dkdp.ch` en ~60s
