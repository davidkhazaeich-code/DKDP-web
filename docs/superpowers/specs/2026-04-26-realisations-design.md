# Realisations DKDP : showcase des vrais projets clients

**Date** : 26 avril 2026
**Projet** : DKDP.ch (Next.js App Router)
**Status** : Spec valide, en attente de plan d'implementation
**Supersede** : [2026-04-06-portfolio-showcase-design.md](./2026-04-06-portfolio-showcase-design.md)

---

## 1. Contexte et objectif

DKDP.ch est l'agence digitale de David Khazaei. Le composant `FeaturedProject.tsx` actuel sur la home affiche une etude de cas Solid SA en placeholder (texte hardcode, `<ImagePlaceholder>` sans image). Aucune page `/realisations` n'existe (l'ancien site avait `/nos-realisations/[slug]`, redirige aujourd'hui vers `/`).

Objectif : construire une section dediee qui presente les **vrais** projets clients livres (sites web, projets IA), avec un format de case study impactant et un workflow de production rapide pour qu'une nouvelle realisation se publie en une conversation.

**Criteres de succes** :

- Une page hub `/realisations` indexable, avec filtres categorie et tag
- Des pages detail `/realisations/[slug]` riches (probleme, solution, stack, resultats, captures)
- Une signature visuelle reconnaissable (`BrowserFrame` Mac dark avec scroll auto au hover)
- Un pipeline de production : `David donne URL` → `Claude capture screenshots` → `Claude ecrit le fichier TS` → `commit + push` → live en 60s
- SEO complet (metadata, canonical, schema.org, sitemap dynamique)
- Aucune dependance live (iframe, scrap a la volee) : tout est statique au build

**Hors scope** :

- Sites demo fictifs (abandonne, voir spec superseded)
- CMS externe (Sanity, Notion) : pas necessaire pour le volume cible (10-30 entrees)
- Apps mobile en device frame : la `AppGallery` existante sur `/agence-digitale/developpement-application` reste separee
- Filtrage par client / secteur : YAGNI, deux categories suffisent

---

## 2. Architecture URL

### Routes ajoutees dans `src/lib/routes.ts`

```ts
{ url: '/realisations', priority: 0.80, changeFrequency: 'monthly' },
```

Les pages detail `/realisations/[slug]` ne sont **pas** declarees statiquement dans `ROUTES`. Elles sont injectees dynamiquement dans `src/app/sitemap.ts` a partir de `REALISATIONS[]`, exactement comme les articles blog le font deja.

### Redirects

Aucune modification. Les anciennes redirections `/nos-realisations` et `/nos-realisations/:slug` continuent de pointer vers `/`. Les anciens slugs n'ont plus de jus SEO et ne correspondent pas un-a-un aux nouvelles realisations.

---

## 3. Modele de donnees

### Fichier : `src/lib/realisations/types.ts`

```ts
export type RealisationCategory = 'site-web' | 'projet-ia' | 'site-web-ia'
export type RealisationStatus = 'live' | 'archived' | 'private'
export type StackColor = 'violet' | 'orange' | 'chrome' | 'green' | 'blue' | 'pink' | 'teal' | 'amber'

export interface RealisationClient {
  name: string                  // "Golden Cash" ou alias generique si NDA
  logo?: string                 // chemin /images/clients/<file>
  sector: string                // "Metaux precieux", "Formation", "Cabinet d'avocats"
  location?: string             // "Geneve", "Suisse romande"
  anonymized?: boolean          // true masque le logo, garde un nom generique
}

export interface RealisationMeta {
  title: string                 // "Refonte complete + tarifs DTI live"
  excerpt: string               // 140-160 caracteres pour cards et metadescription
  dateISO: string               // "2026-03-15" pour le tri grille
  status: RealisationStatus
}

export interface RealisationHero {
  desktopFull: string           // /images/realisations/<slug>/desktop.webp (fullpage)
  mobileFull?: string           // /images/realisations/<slug>/mobile.webp
  browserUrl: string            // "goldencash.ch" affiche dans la barre fake
}

export interface RealisationApproach {
  title: string                 // "Hybride API + cache 10s"
  body: string                  // 1-3 paragraphes
  bullets?: string[]            // points cles, optionnels
}

export interface RealisationStackChip {
  label: string                 // "Astro 5"
  color: StackColor             // mappe a tokens.ts
}

export interface RealisationResult {
  metric: string                // "Lighthouse"
  value: string                 // "100/100"
  label: string                 // "Performance mobile"
}

export interface RealisationTestimonial {
  quote: string
  author: string                // nom complet
  role: string                  // poste + societe
  avatar?: string               // optionnel
}

export interface RealisationGalleryItem {
  src: string
  alt: string
  caption?: string
}

export interface Realisation {
  slug: string                  // "<client-kebab>-<projet-kebab>"
  client: RealisationClient
  meta: RealisationMeta
  category: RealisationCategory
  tags: string[]                // libres : "Refonte", "SEO local", "Chatbot", etc.
  hero: RealisationHero
  problem: { title: string; body: string }
  approach: RealisationApproach
  stack?: RealisationStackChip[]
  results?: RealisationResult[]
  testimonial?: RealisationTestimonial
  gallery?: RealisationGalleryItem[]
  liveUrl?: string              // si absent, badge "Captures uniquement"
}
```

### Convention de slug

Format strict : `<client-kebab>-<projet-kebab>`. Minuscules, kebab-case, sans accents.

Exemples :

- `goldencash-refonte`
- `cours-informatique-creation`
- `solid-ch-chatbot`
- `mkr-camp-brand-site`

Validation a executer dans un test d'integrite (`__tests__/index.test.ts`) :

```ts
expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)+$/)
```

### Fichier : `src/lib/realisations/index.ts`

```ts
import goldencash from './goldencash-refonte'
import coursInfo from './cours-informatique-creation'
// ... 1 import par realisation

import type { Realisation, RealisationCategory } from './types'

export const REALISATIONS: Realisation[] = [
  goldencash,
  coursInfo,
  // ... plus recente en premier (tri manuel) ou tri auto par dateISO desc
].sort((a, b) => b.meta.dateISO.localeCompare(a.meta.dateISO))

export const FEATURED_SLUGS: string[] = [
  'goldencash-refonte',
  'cours-informatique-creation',
  'solid-ch-chatbot',
]

export function getRealisation(slug: string): Realisation | null {
  return REALISATIONS.find(r => r.slug === slug) ?? null
}

export function getByCategory(category: RealisationCategory): Realisation[] {
  return REALISATIONS.filter(r => r.category === category)
}

export function getByTag(tag: string): Realisation[] {
  return REALISATIONS.filter(r => r.tags.includes(tag))
}

/**
 * Score = 2 * sameCategoryBoost + 1 * tagOverlap.
 * Les realisations privees ou archivees sont exclues.
 */
export function getRelated(slug: string, limit = 3): Realisation[] {
  const current = getRealisation(slug)
  if (!current) return []
  return REALISATIONS
    .filter(r => r.slug !== slug && r.meta.status === 'live')
    .map(r => {
      const sameCat = r.category === current.category ? 2 : 0
      const overlap = r.tags.filter(t => current.tags.includes(t)).length
      return { r, score: sameCat + overlap }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ r }) => r)
}
```

### Fichier exemple : `src/lib/realisations/goldencash-refonte.ts`

Squelette type, `default export`, identique au pattern blog :

```ts
import type { Realisation } from './types'

const realisation: Realisation = {
  slug: 'goldencash-refonte',
  client: {
    name: 'Golden Cash',
    logo: '/images/clients/goldencash.avif',
    sector: 'Metaux precieux',
    location: 'Geneve',
  },
  meta: {
    title: 'Refonte Astro avec tarifs DTI temps reel',
    excerpt: 'Site vitrine Astro SSG avec API hybride XMLCharts plus FXCM, dashboard admin de bascule en 10 secondes.',
    dateISO: '2026-04-15',
    status: 'live',
  },
  category: 'site-web',
  tags: ['Refonte', 'Astro', 'API live', 'Dashboard admin'],
  hero: {
    desktopFull: '/images/realisations/goldencash-refonte/desktop.webp',
    mobileFull: '/images/realisations/goldencash-refonte/mobile.webp',
    browserUrl: 'goldencash.ch',
  },
  problem: {
    title: 'Le contexte',
    body: '...',
  },
  approach: {
    title: 'Notre approche',
    body: '...',
    bullets: [...],
  },
  stack: [
    { label: 'Astro 5', color: 'orange' },
    { label: 'Tailwind 4', color: 'teal' },
    { label: 'PHP API', color: 'violet' },
  ],
  results: [
    { metric: 'Lighthouse', value: '100/100', label: 'Performance' },
    { metric: 'Latence DTI', value: '< 10s', label: 'Bascule API' },
  ],
  liveUrl: 'https://goldencash.ch',
}

export default realisation
```

---

## 4. Composant signature : `BrowserFrame`

### Fichier : `src/components/realisations/BrowserFrame.tsx`

C'est la piece centrale qui donne sa signature visuelle a la section.

### Anatomie

```
┌──────────────────────────────────────────┐
│  ●  ●  ●    🔒  goldencash.ch       ⋯   │  ← chrome 36px, bg #1B1B1F
├──────────────────────────────────────────┤
│                                          │
│   [image fullpage du site]               │  ← viewport visible 360-560px
│   translateY(0) → translateY(-(H - V))   │
│                                          │
└──────────────────────────────────────────┘
```

### Props

```ts
type BrowserFrameProps = {
  src: string                       // capture fullpage WebP
  alt: string
  browserUrl: string                // affiche dans la barre fake
  variant?: 'card' | 'hero'         // card pour grille, hero pour page detail
  trigger?: 'hover' | 'visible'     // hover desktop, visible mobile
  scrollDuration?: number           // secondes, default = computed depuis hauteur
  className?: string
}
```

### Comportement d'animation

- **Desktop hover** (`trigger='hover'`) : a partir du moment ou la souris entre dans la card, l'image translate de `0` a `-(imageHeight - viewportHeight)` en `scrollDuration` secondes, pause 800ms en bas, retour fluide. Loop infini tant que la souris est presente. Au mouseleave, retour a `0` en 600ms.
- **Mobile / touch** (`trigger='visible'`) : IntersectionObserver declenche **un seul** cycle complet quand la card est a 60% visible. Pas de loop infini (drain batterie).
- **`prefers-reduced-motion: reduce`** : aucune animation, image figee sur le top. Une icone hint `↕` apparait subtilement au hover/focus pour signaler que l'image continue plus bas.
- Implementation en CSS keyframes (pas Framer Motion) : `transform: translateY()` + `will-change: transform`, GPU accelere, bundle JS minimal.

### Variants

| Variant | Aspect ratio container | Usage |
|---------|------------------------|-------|
| `card`  | `aspect-[16/10]` fixe  | Grille `/realisations`, FeaturedRealisations home, blocs services |
| `hero`  | `aspect-[16/9]` desktop, `aspect-[4/5]` mobile | Page detail, en haut sous le header |

### Resilience

- **Image manquante** (404 ou src vide) : fallback en gradient violet vers noir avec initiale du client en gros, label "Capture indisponible" discret.
- **URL trop longue** : tronquee au milieu avec ellipsis (`goldencash.ch/produits...`).
- **Image trop courte** (`imageHeight < viewportHeight * 1.5`) : autoscroll desactive, image affichee fixe (un site one-page n'a pas besoin d'autoscroll).

### Tests Vitest

`BrowserFrame.test.tsx` :

- Render avec props minimaux, presence des trois dots
- Variant `card` vs `hero` : aspect ratio applique
- `prefers-reduced-motion` mock : pas de classe d'animation
- `src` vide : fallback gradient affiche, alt fourni
- `browserUrl` long : tronque
- `trigger='visible'` : IO mock, animation declenchee une fois

---

## 5. Page hub : `/realisations`

### Fichier : `src/app/realisations/page.tsx`

### Structure verticale

1. **Hero compact** (Server Component)
   - `<GradTag>Realisations</GradTag>`
   - H1 : "Etudes de cas client"
   - Sous-titre : "Sites livres et systemes IA deployes pour PME suisses, avec contexte, solution et resultats."
   - 3 stats inline : `{REALISATIONS.length} projets`, `{uniqueSectors} secteurs`, `5 annees`
   - Pas de `InfiniteGrid` ni `DottedSurface` ici (sobriete, le hero des cards porte la richesse visuelle)

2. **Filter bar sticky** (Client Component minimal)
   - `top-[66px]`, `z-30`, `bg-[#0A0A0A]/85`, `backdrop-blur-2xl`, ligne 56px
   - Tabs categorie : "Tous · Sites web · Projets IA · Sites + IA"
   - Tag chips secondaires (top 6 derives auto de `REALISATIONS[].tags`, frequence desc)
   - URL state via `?cat=site-web&tag=refonte` avec `useSearchParams` et `useRouter().replace`
   - Bouton "Reinitialiser" si filtre actif

3. **Grille** (Server Component avec donnees, Client si filtres actifs)
   - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - `max-w-[1200px] mx-auto px-6`
   - Cards triees par `meta.dateISO` desc
   - Animation stagger `<SectionReveal delay={i * 0.05}>` sur chaque card (premier ecran uniquement)

4. **Empty state** (si filtre = 0 resultats)
   - Texte "Aucune realisation pour ce filtre."
   - Bouton "Reinitialiser les filtres"

5. **CTAFinal** (composant partage existant)

### Composant : `ProjectCard.tsx`

Layout :

```
┌──────────────────────────────────────┐
│  <BrowserFrame variant="card" />     │
│                                      │
└──────────────────────────────────────┘
   [logo 24px]  ↳ Secteur · Ville

   Titre du projet (2 lignes max)
   Excerpt 1 ligne tronque

   ▸ tag1  ▸ tag2  ▸ tag3       +metric phare
```

Props :

```ts
type ProjectCardProps = {
  realisation: Realisation
  featuredMetric?: 'first' | { metric: string; value: string }
}
```

Comportement :

- Wrappe dans un `<Link href="/realisations/[slug]">` complet (toute la card cliquable)
- Hover : translate Y `-2px`, ombre violet subtile, BrowserFrame autoscroll declenche
- Si `client.anonymized=true` : logo masque, chip `Initiale + couleur token`
- Si `liveUrl=undefined` : badge "Captures uniquement" en bas droite
- `featuredMetric` : par defaut, prend le premier de `results[]`. Si pas de results, badge categorie a la place.

### Metadata

```ts
export const metadata: Metadata = {
  title: 'Realisations DKDP : nos sites web et projets IA livres | Geneve',
  description: 'Etudes de cas client DKDP : sites web, refontes, chatbots IA, automatisations. PME suisses, resultats mesures, captures et retours d\'experience.',
  alternates: { canonical: 'https://dkdp.ch/realisations' },
  openGraph: {
    title: 'Realisations DKDP',
    description: 'Sites web et projets IA livres pour PME suisses.',
    url: 'https://dkdp.ch/realisations',
    images: [{ url: '/og-realisations.png', width: 1200, height: 630, alt: 'Realisations DKDP' }],
  },
}
```

### Schema.org

`buildRealisationsCollection({ items: REALISATIONS })` retourne :

```json
{
  "@type": "CollectionPage",
  "name": "Realisations DKDP",
  "url": "https://dkdp.ch/realisations",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": "https://dkdp.ch/realisations/<slug>" },
      ...
    ]
  }
}
```

---

## 6. Page detail : `/realisations/[slug]`

### Fichier : `src/app/realisations/[slug]/page.tsx`

Pattern strictement aligne sur `app/blog/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`, `notFound()` si slug inconnu).

### Structure verticale (10 sections)

| # | Section | Composant | Conditionnel |
|---|---------|-----------|--------------|
| 1 | Breadcrumb | `<Breadcrumb />` | Toujours |
| 2 | Header | `<RealisationHeader />` | Toujours |
| 3 | Hero `BrowserFrame` | `<BrowserFrame variant="hero" />` | Toujours |
| 4 | "Le contexte" | `<ProblemBlock />` | Toujours |
| 5 | "Notre approche" | `<ApproachBlock />` | Toujours |
| 6 | "Stack" | `<StackChips />` | Si `stack` defini |
| 7 | "Resultats" | `<ResultsGrid />` | Si `results` defini |
| 8 | "Galerie" | `<GalleryGrid />` | Si `gallery` defini |
| 9 | Temoignage | `<TestimonialQuote />` | Si `testimonial` defini |
| 10 | Realisations liees | `<RelatedRealisations />` | Si `getRelated()` retourne au moins 1 |
| 11 | CTAFinal | `<CTAFinal />` | Toujours |

### Detail header

```
[Breadcrumb] Accueil > Realisations > Goldencash

[GradTag categorie]
Goldencash : Refonte Astro avec tarifs DTI temps reel
[Excerpt]
[Secteur · Ville · Date] [tags]

[Bouton "Visiter le site" si liveUrl]  [Bouton "Lancer mon projet"]
```

### Detail metadata et SEO

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const r = getRealisation(params.slug)
  if (!r) return { title: 'Realisation introuvable' }
  const isPrivate = r.meta.status === 'private'
  return {
    title: `${r.client.name} : ${r.meta.title} | Realisations DKDP`,
    description: r.meta.excerpt,
    alternates: { canonical: `https://dkdp.ch/realisations/${r.slug}` },
    openGraph: {
      title: `${r.client.name} : ${r.meta.title}`,
      description: r.meta.excerpt,
      url: `https://dkdp.ch/realisations/${r.slug}`,
      images: [{
        url: `/images/realisations/${r.slug}/og.png`,
        width: 1200,
        height: 630,
        alt: r.meta.title,
      }],
    },
    robots: isPrivate ? { index: false, follow: true } : undefined,
  }
}

export async function generateStaticParams() {
  return REALISATIONS
    .filter(r => r.meta.status !== 'private')
    .map(r => ({ slug: r.slug }))
}
```

### Schema.org JSON-LD

Trois injections via `<SchemaOrg>` :

1. `buildBreadcrumbList(...)` (existant)
2. `buildRealisationPage(realisation)` (nouveau builder) qui retourne `WebPage` + `mentions: Organization{ name, url: liveUrl }` + `about: { '@type':'CreativeWork', genre: category }`
3. Si `testimonial` : un objet `Review` minimal sans rating, `author` + `reviewBody`

### Comportement des sections

- **`StackChips`** : chips arrondis avec `bg`, `border`, `color` lus depuis `tokens.ts` selon le `color` de chaque chip. `Astro 5 → orange`, `Next.js → violet`, etc.
- **`ResultsGrid`** : grille 1 col mobile, 2 cols tablet, 3 cols desktop. Chaque tile a `value` en `text-3xl font-bold` avec gradient violet, `metric` au-dessus en `text-xs uppercase tracking-wide`, `label` en dessous en `text-text-secondary`.
- **`GalleryGrid`** : `grid grid-cols-1 md:grid-cols-2 gap-4`. Images `loading="lazy"` en WebP. Caption inline sous l'image, italic, `text-text-muted`.
- **`TestimonialQuote`** : layout dramatique, `<blockquote>` avec `border-l-4 border-violet/40`, citation en `text-2xl italic`, attribution en dessous avec avatar 40px optionnel.
- **`RelatedRealisations`** : 3 `<ProjectCard>` en grille 1/2/3 cols, dans un wrapper avec separateur top.

### Article archive : `status='archived'`

`getRealisation()` retourne quand meme la donnee, mais la page route effectue `redirect('/realisations')` au top du Server Component. Pas de 404, juste pas accessible directement.

### Article prive : `status='private'`

Page accessible (utile pour partager le lien a un prospect), mais :

- Exclue de `generateStaticParams()` (donc 404 par defaut sauf si on regenere a la volee)
- Exclue du sitemap dans `app/sitemap.ts`
- `robots: noindex, follow`

Decision : pour l'instant on traite `private` comme "non genere statiquement" donc pas accessible. Si plus tard on veut des liens partageables, on regenerera differemment. YAGNI maintenant.

---

## 7. Cross-linking : home, services, header

### Home : remplacement de `FeaturedProject`

Fichier `src/components/sections/FeaturedProject.tsx` est supprime, remplace par :

`src/components/realisations/FeaturedRealisations.tsx` :

- Pulle les 3 a 6 slugs definis dans `FEATURED_SLUGS`
- Layout : titre de section "Etudes de cas recentes" + sous-titre + grille 1/2/3 cols de `<ProjectCard>` + lien "Voir toutes les realisations" en bas a droite
- Animation `SectionReveal` (active sur la home grace a la position dans `RevealDisabledProvider` ? a verifier ; sinon wrapper local)

`src/app/page.tsx` modifie :

```diff
- const FeaturedProject = dynamic(() => import('@/components/sections/FeaturedProject').then(...))
+ const FeaturedRealisations = dynamic(() => import('@/components/realisations/FeaturedRealisations').then(...))

  ...
- <FeaturedProject />
+ <FeaturedRealisations />
```

### Pages services

`src/app/agence-digitale/creation-site-web/page.tsx` : ajouter avant CTAFinal un bloc :

```tsx
<RealisationsForCategory category="site-web" limit={3} title="Sites web crees pour des PME suisses" />
```

`src/app/intelligence-artificielle/chatbot-ia/page.tsx` : idem avec `category="projet-ia"` et `tag="Chatbot"`.

`RealisationsForCategory.tsx` est un nouveau composant qui pulle filtre et limite, layout 3 cards.

### Header mega menu

`src/components/layout/Header.tsx` : ajouter une entree dans `AGENCE_SECONDARY` :

```ts
{
  label: 'Realisations',
  href: '/realisations',
  description: 'Cas clients et etudes de cas',
  accent: 'violet',
}
```

Position : apres "Estimation site web", avant "RGPD cookies".

---

## 8. Pipeline de production : "tu me donnes une URL, je fais une realisation"

C'est le workflow operationnel qui doit permettre, en une conversation, de produire une realisation complete a partir d'un projet existant dans `clients Claude/<client>/`.

### Etapes (ordre strict)

1. **Lecture du projet local**
   `Read` la racine du projet client dans `clients Claude/<client>/` (README.md, CLAUDE.md s'il existe). Recuperer la stack, les copywriting, les decisions architecturales. Verifier en memoire (`MEMORY.md`) s'il y a un memory project pour ce client.

2. **Confirmation de l'URL live et du slug**
   Demander a David :
   - URL live (deduite si possible du README ou CLAUDE.md du client)
   - Slug propose (auto-genere `<client>-<projet>` valide regex)
   - Categorie (`site-web`, `projet-ia`, `site-web-ia`)

3. **Capture des screenshots** via le script `tools/realisations/capture.mjs` :
   - Desktop fullpage 1440x900 viewport → `desktop.webp` (ratio reel, hauteur fullpage)
   - Mobile fullpage 390x844 viewport → `mobile.webp`
   - Capture viewport top 1200x630 → `og.png` (pour Open Graph)
   - Optimisation `sharp` : WebP qualite 85, target sub-300KB par image, dimensions explicites
   - Output : `public/images/realisations/<slug>/`

   Le script est documente en section 9.

4. **Demande des champs non-deductibles** via `AskUserQuestion` (en un seul tour) :
   - Probleme initial du client (1-2 phrases libre)
   - 2 a 4 metrics concrets (Lighthouse, trafic, leads, conversions, latence...)
   - Temoignage si dispo (sinon skip)
   - Tags secondaires libres (3-5)
   - `liveUrl` confirmee
   - Anonymisation oui/non

5. **Generation du fichier TS** `src/lib/realisations/<slug>.ts` :
   - Default export, type `Realisation`
   - Champs deduits du projet (stack en lisant `package.json`, location en lisant memory)
   - Champs renseignes par David
   - Excerpt genere puis valide par David

6. **Mise a jour de l'index** `src/lib/realisations/index.ts` :
   - Ajout de l'import en tete (alphabetique)
   - Ajout au tableau `REALISATIONS`
   - Optionnellement, ajout au `FEATURED_SLUGS` (demande a David)

7. **Verification et deploiement** :
   - `npm run build` pour valider le typage et le rendu
   - `npx vitest run --grep realisations` pour les tests d'integrite
   - Commit avec message `feat(realisations): add <slug>`
   - `git push origin main` (DKDP : push direct, voir feedback memory)
   - Vercel auto-deploy, live en ~60s
   - Confirmer l'URL live `https://dkdp.ch/realisations/<slug>`

---

## 9. Outil de capture : `tools/realisations/capture.mjs`

### Specification

Script Node ESM utilisant Playwright (deja dans `dkdp/node_modules` via dependances). Argument CLI :

```bash
node tools/realisations/capture.mjs --url https://goldencash.ch --slug goldencash-refonte
```

### Comportement

1. Cree le dossier `public/images/realisations/<slug>/` si absent
2. Lance Chromium headless
3. Pour chaque viewport (desktop 1440x900, mobile 390x844) :
   - Navigue vers l'URL
   - Attend `networkidle`
   - Scroll progressif pour declencher les lazy-loads
   - `page.screenshot({ fullPage: true, type: 'png' })`
4. Pour la capture OG :
   - Viewport 1200x800
   - Capture du viewport (pas fullpage)
   - Crop a 1200x630
5. Optimise chaque image via `sharp` :
   - PNG → WebP qualite 85
   - Si > 300KB, baisser quality par paliers de 5 jusqu'a < 300KB ou quality 65 (plancher)
   - Conserve aussi `og.png` non converti (les crawlers OG preferent PNG/JPG)
6. Logs : taille avant/apres pour chaque fichier
7. Code de sortie 0 si toutes les captures reussies, 1 sinon

### Edge cases gerees

- Page distante `> 30000ms` : timeout, code 1, message clair
- Lazy-load infini (scroll-trigger) : limit a 5 scrolls + max 8000px de hauteur
- Erreur de certificat : `--ignore-certificate-errors` autorise via flag CLI
- Site protege par auth basique : flag `--auth user:pass`

---

## 10. Composants a creer et fichiers a modifier

### Nouveaux fichiers (15)

```
src/components/realisations/
  BrowserFrame.tsx
  ProjectCard.tsx
  RealisationsGrid.tsx
  FilterBar.tsx
  RealisationHeader.tsx
  ProblemBlock.tsx
  ApproachBlock.tsx
  StackChips.tsx
  ResultsGrid.tsx
  GalleryGrid.tsx
  TestimonialQuote.tsx
  RelatedRealisations.tsx
  FeaturedRealisations.tsx
  RealisationsForCategory.tsx
  __tests__/
    BrowserFrame.test.tsx
    ProjectCard.test.tsx
    FilterBar.test.tsx

src/lib/realisations/
  types.ts
  index.ts
  goldencash-refonte.ts                  (premier projet, en parallele)
  __tests__/
    index.test.ts                         (integrite, getRelated, slug regex)

src/app/realisations/
  page.tsx
  [slug]/
    page.tsx

tools/realisations/
  capture.mjs
  README.md                               (usage)

public/images/realisations/
  goldencash-refonte/                     (cree par capture.mjs)
```

### Fichiers a modifier (7)

| Fichier | Modification |
|---------|--------------|
| `src/lib/routes.ts` | Ajout `{ url: '/realisations', priority: 0.80, changeFrequency: 'monthly' }` |
| `src/app/sitemap.ts` | Injection dynamique des slugs `live` depuis `REALISATIONS[]` |
| `src/lib/schema.ts` | Ajout `buildRealisationsCollection`, `buildRealisationPage` |
| `src/app/page.tsx` | Remplacement `FeaturedProject` par `FeaturedRealisations` |
| `src/components/layout/Header.tsx` | Ajout entree "Realisations" dans `AGENCE_SECONDARY` |
| `src/app/agence-digitale/creation-site-web/page.tsx` | Ajout `<RealisationsForCategory category="site-web" />` avant CTAFinal |
| `src/app/intelligence-artificielle/chatbot-ia/page.tsx` | Ajout `<RealisationsForCategory category="projet-ia" tag="Chatbot" />` avant CTAFinal |

### Fichiers a supprimer (2)

| Fichier | Raison |
|---------|--------|
| `src/components/sections/FeaturedProject.tsx` | Remplace par `FeaturedRealisations` |
| `src/components/sections/__tests__/FeaturedProject.test.tsx` | Reecrit pour `FeaturedRealisations` |

---

## 10b. Budget d'images par realisation (minimum requis)

Chaque case study doit illustrer ses blocs, pas seulement empiler du texte. Budget plancher par realisation :

| # | Image | Source | Usage | Format |
|---|-------|--------|-------|--------|
| 1 | `desktop.webp` | capture fullpage 1440x900 viewport | `BrowserFrame variant="hero"` page detail + `BrowserFrame variant="card"` toutes les grilles | WebP, fullpage |
| 2 | `mobile.webp` | capture fullpage 390x844 viewport | Section galerie + comparatif responsive | WebP, fullpage |
| 3 | `og.png` | viewport top 1200x800 cropped 1200x630 | Open Graph metadata, Twitter card | PNG |
| 4 | `section-hero.webp` | capture viewport top 1440x900 (close-up sans scroll) | Hero secondaire si besoin, OG fallback | WebP, viewport |
| 5 | `section-1.webp` | capture viewport a 33% de scroll | `GalleryGrid` legende auto "Section produits" / "Tarifs" / etc | WebP, viewport |
| 6 | `section-2.webp` | capture viewport a 66% de scroll | `GalleryGrid` legende auto | WebP, viewport |
| 7 | `section-3.webp` | capture viewport a 90% de scroll | `GalleryGrid` legende auto | WebP, viewport |
| 8 | `mobile-section-1.webp` | capture mobile a 50% de scroll | `GalleryGrid` colonne mobile | WebP, viewport |

Total minimum : **8 images** par realisation. Ratio cible : 6 desktop + 2 mobile.

**Captures complementaires manuelles** que David peut ajouter pour des cas riches (refonte avec avant/apres, dashboard admin, app metier) :

- `before-after.webp` : montage avant/apres pour les refontes
- `admin-dashboard.webp` : capture du back-office si pertinent
- `chatbot-conversation.png` : extrait conversation IA pour les realisations chatbot
- `analytics-evolution.webp` : graphique courbe trafic/conversions

Ces captures complementaires alimentent `gallery[]` avec des `caption` explicites.

### Illustrations non-screenshot pour les blocs textuels

Certains blocs gagnent a etre illustres meme si le site n'est pas le sujet visuel direct :

- **`ProblemBlock`** : si la realisation est une refonte, capture du **vieux site** ou maquette schematique du probleme (genre wireframe rapide). Champ optionnel `problem.illustration: { src, alt, caption? }` ajoute au type.
- **`ApproachBlock`** : possibilite d'inclure un diagramme HTML inline (meme pattern que les articles blog : `<div>` avec design tokens, dark theme). Champ optionnel `approach.diagramHtml?: string` ajoute au type.
- **`ResultsGrid`** : option d'inclure une mini-courbe SVG sous le grand chiffre pour les metrics de type "trafic", "conversions". Implementation : SVG inline genere depuis un tableau de valeurs si `result.trend?: number[]` defini.
- **`StackChips`** : si la stack est riche (5+ tech), grouper visuellement par categorie (Front, Back, Infra, IA) avec un titre par groupe.

### Type augmente pour ces illustrations

```ts
export interface ProblemBlock {
  title: string
  body: string
  illustration?: { src: string; alt: string; caption?: string }   // nouveau
}

export interface RealisationApproach {
  title: string
  body: string
  bullets?: string[]
  diagramHtml?: string                                             // nouveau, HTML inline pass-through
}

export interface RealisationResult {
  metric: string
  value: string
  label: string
  trend?: number[]                                                 // nouveau, mini-sparkline SVG
}
```

### Capture.mjs : extension multi-section

Le script `tools/realisations/capture.mjs` (section 9) est etendu pour produire **par defaut** les 8 images du budget minimum. Arguments CLI etendus :

```bash
node tools/realisations/capture.mjs \
  --url https://goldencash.ch \
  --slug goldencash-refonte \
  --sections 0.33,0.66,0.90 \      # positions de scroll en pourcentage
  --mobile-sections 0.50           # idem pour mobile
```

Defaults : `--sections 0.33,0.66,0.90` et `--mobile-sections 0.50`. Override possible si le site a des sections specifiques a capturer (par selector CSS, ajout futur via `--selectors hero,pricing,contact`).

---

## 10c. UX et lisibilite : regles transversales

L'utilisation reelle (lecture de cas client par un prospect) impose des contraintes plus strictes que les pages services. Regles a appliquer sur toutes les pages de la section.

### Typographie

| Element | Tailwind | Justification |
|---------|----------|--------------|
| H1 page detail | `text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05]` | Titre ouvrant qui doit accrocher, gros mais pas ecrase |
| H2 section | `text-2xl md:text-3xl tracking-[-0.015em] leading-tight` | Marque les blocs sans concurrencer le H1 |
| H3 sous-section | `text-xl tracking-tight` | Pour `approach.bullets` titres ou stack groupes |
| Body | `text-[17px] md:text-lg leading-[1.7] text-text-secondary` | 17px desktop, line-height 1.7 (vs 1.5 par defaut) pour lecture longue |
| Excerpt card | `text-sm leading-relaxed text-text-muted` | Plus dense, format card |
| Quote temoignage | `text-2xl md:text-3xl italic leading-snug` | Volumineux, italique pour respiration |

### Largeur de ligne et grilles

- **Texte courant** : `max-w-[68ch] mx-auto` sur tous les blocs `ProblemBlock`, `ApproachBlock` et descriptions. 68 caracteres = sweet spot lecture (50-75ch recommande).
- **Bullets** : `max-w-[60ch]` pour eviter les listes trop larges.
- **GalleryGrid** : 1 col mobile, 2 cols desktop. Pas de 3 cols (les captures perdent leur lisibilite).
- **ResultsGrid** : 2 cols mobile possible si `value` court (chiffres), 3 cols desktop max.

### Espacement vertical (rythme de page)

- Entre sections majeures : `py-20 md:py-28` (80-112px). Donne de l'air, evite l'effet sur-charge.
- Entre h2 et premier paragraphe : `mt-6` (24px).
- Entre paragraphes : `mt-4` (16px).
- Entre bloc texte et image suivante : `mt-12` (48px).
- `gap` dans les grilles : `gap-6 md:gap-8`.

### Anti-fatigue : alternance texte / visuel

Sur la page detail, **jamais plus de deux sections texte d'affilee sans break visuel**. Sequence canonique :

```
Header                          (visuel : BrowserFrame hero)
ProblemBlock                    (texte, max-w-68ch)
[break : illustration optionnelle ou carte numerotee "01 → 02 → 03"]
ApproachBlock                   (texte, max-w-68ch, eventuellement diagramme)
StackChips                      (visuel : chips colores)
ResultsGrid                     (visuel : tiles avec sparklines optionnels)
GalleryGrid                     (visuel : 2-6 captures)
TestimonialQuote                (texte format quote, contraste fort)
RelatedRealisations             (visuel : 3 ProjectCards)
CTAFinal                        (CTA, fond different)
```

### Contrastes et couleurs (rappel tokens DKDP)

- Fond principal : `#09090B` (presque noir, jamais black pur)
- Cards : `bg-bg-card` (`#13131C` ou equivalent token)
- Texte primary : `text-text-primary` (proche `#FAFAFA`)
- Texte secondary : `text-text-secondary` (`#9CA3AF`)
- Texte muted : `text-text-muted` (`#71717A`)
- Accents : violet (defaut realisations), orange (formation), chrome (IA)
- **Aucune section avec fond noir pur** ou charcoal aggressif (rappel feedback global memory `feedback_no_black_bg.md`)

### Animations

- `SectionReveal` actif sur la page hub et la page detail (anime au scroll). Pas de `RevealDisabledProvider`.
- Stagger entre cards de la grille : `delay={i * 0.05}` jusqu'a 8 cards (cap pour eviter les delais trop longs).
- `BrowserFrame` autoscroll sur hover en desktop, IO sur mobile (un seul cycle).
- Transition entre filtres : fade + reorder, 200ms.

### Navigation interne page detail

Sur la page detail, ajouter une **subnav sticky** (pattern existant DKDP) avec ancres vers les sections principales :

```
[Le contexte]  [Notre approche]  [Resultats]  [Galerie]  [Temoignage]
```

Sticky a `top-[66px]`, `z-30`, `bg-[#0A0A0A]/85`, `backdrop-blur-2xl`. Lenis offset `-124` deja configure globalement.

### Mobile

- Page detail : `<BrowserFrame variant="hero">` passe en aspect 4:5 (vu plus haut, rappel)
- Subnav : scroll horizontal avec snap si trop d'ancres
- `GalleryGrid` : 1 col, captions inline en `text-xs`
- `ResultsGrid` : 1 col single column, value en `text-3xl` au lieu de `text-4xl`
- Padding lateral : `px-5` (20px) sur mobile, `px-6` (24px) tablet+

### Tests UX a executer manuellement avant prod

- [ ] Lecture d'une page detail entiere sur mobile sans zoom : confortable
- [ ] Subnav sticky ne masque jamais le contenu cible apres clic sur ancre
- [ ] BrowserFrame autoscroll declenche correctement, ne bloque pas le scroll de la page
- [ ] Filtres URL state : recharger la page avec `?cat=projet-ia` rend bien la grille filtree
- [ ] Empty state lisible et avec CTA actif
- [ ] Responsive 5 breakpoints (320, 480, 768, 1024, 1440)

---

## 11. Edge cases consolides

| Scenario | Comportement |
|----------|--------------|
| Pas de logo client | Chip avec initiale + couleur token deterministe par slug |
| `liveUrl` absent | Badge "Captures uniquement", CTA "Visiter le site" cache |
| `client.anonymized: true` | Logo masque, name reste, OG image generique site-wide |
| `meta.status: 'private'` | Exclue du sitemap et de `generateStaticParams`, donc 404 par defaut |
| `meta.status: 'archived'` | `redirect('/realisations')` au top du Server Component |
| Image manquante au runtime | Fallback gradient violet-noir + initiale client |
| `prefers-reduced-motion` | `BrowserFrame` statique, autoscroll desactive, hint icone au hover |
| `REALISATIONS` vide | Empty state sur `/realisations` avec "Bientot en ligne" + lien contact |
| Slug inexistant | `notFound()` Next.js, page 404 existante |
| Filtre = 0 resultat | Empty state avec bouton "Reinitialiser" |
| URL trop longue dans `BrowserFrame` | Tronquee au milieu avec ellipsis |
| Image trop courte (< 1.5x viewport) | Autoscroll desactive automatiquement |

---

## 12. Tests

Couverture Vitest cible :

- 80% sur les helpers `src/lib/realisations/index.ts`
- 60% sur les composants visuels purs
- Integrity test sur `REALISATIONS[]` : tout slug match `^[a-z0-9]+(-[a-z0-9]+)+$`, tout `dateISO` parse en `Date` valide, toute `liveUrl` est `https://`, etc.

Fichiers de tests detailles dans la section 10.

---

## 13. SEO et schema.org : nouveaux builders

A ajouter dans `src/lib/schema.ts` :

```ts
export function buildRealisationsCollection(input: {
  items: Realisation[]
}): WithContext<CollectionPage>

export function buildRealisationPage(input: {
  realisation: Realisation
}): WithContext<WebPage>
```

Le builder `buildRealisationPage` injecte `mentions: Organization{ name: client.name, url: liveUrl }` et `about: CreativeWork{ genre: category }`. Si `testimonial`, ajoute aussi un `Review` lie via `subjectOf`.

---

## 14. Phasage propose pour l'implementation

Le plan d'implementation detaille decoupe ce decoupage :

| Phase | Livrable | Dependances |
|-------|----------|-------------|
| 1 | Fondations data : `types.ts`, `index.ts`, premiere realisation `goldencash-refonte.ts`, tests d'integrite | Aucune |
| 2 | `BrowserFrame` + tests + mockup HTML pour validation visuelle | Phase 1 |
| 3 | Page hub `/realisations` + `ProjectCard` + `FilterBar` + sitemap + schema | Phases 1, 2 |
| 4 | Page detail `/realisations/[slug]` + tous les blocs + schema | Phases 1, 2 |
| 5 | Outil de capture `tools/realisations/capture.mjs` + 1er test sur Goldencash | Phase 1 (utilisation du slug) |
| 6 | Cross-linking : `FeaturedRealisations` home, `RealisationsForCategory` services, Header mega menu | Phases 3, 4 |
| 7 | Migration definitive : suppression `FeaturedProject`, deploiement final, validation prod | Phase 6 |

Phases 3, 4 et 5 peuvent etre parallelisees si on veut accelerer.

---

## 15. Risques identifies

| Risque | Mitigation |
|--------|------------|
| Capture screenshots trop lourdes (> 1MB par image) | `sharp` pipeline avec quality stepdown, plancher 65 |
| Site distant change apres capture (le screenshot devient obsolete) | Acceptable : on documente la date de livraison dans `meta.dateISO`, le visiteur clique "Visiter le site" pour le live |
| Animation `BrowserFrame` saccadee sur mobile bas de gamme | `trigger='visible'` avec un seul cycle, `prefers-reduced-motion` respecte, `will-change` cible |
| Layout shift au load | Aspect ratio fixe sur `BrowserFrame`, dimensions explicites sur tous les `<img>` |
| Spam de URL `?cat=...&tag=...` indexe par Google | `<link rel="canonical" href="/realisations">` sur toutes les variantes filtrees |
| Conflit avec l'ancien `FeaturedProject` test snapshot | Test reecrit en phase 7, ancien fichier supprime atomique avec le nouveau commit |

---

## 16. Decisions tranchees (pour eviter les revisites)

- **Une seule signature visuelle** : `BrowserFrame` Mac dark. Pas de variantes "device frame tilted" ni "iframe live".
- **Pas de pagination** tant que `REALISATIONS.length < 24`.
- **Pas de filtre par client / secteur** : `category` + `tags` suffisent.
- **Pas de CMS externe** : 1 fichier TS par realisation, calque sur le pattern blog.
- **Pas de transition scroll-jacked storytelling** sur la page detail. Le `BrowserFrame` autoscroll suffit comme effet wow.
- **Pas de comparaison avant/apres** integree systematiquement. Si un projet le merite (refonte), on l'ajoute dans `gallery[]` avec un layout dedie a la main.
- **Pas de pagebleed cross-realisation** (genre carrousel infini de logos). La home a deja `LogoBanner`.

---

## 17. Verification de fin de spec

Avant validation par David :

- [x] Toutes les decisions tranchees ont une justification
- [x] Aucun "TBD" ou "TODO" laisse dans les sections
- [x] Le type `Realisation` couvre les cas NDA, prive, archive, sans liveUrl
- [x] Le pipeline d'ajout est concret et a un tool dedie
- [x] Les composants a creer/modifier/supprimer sont listes exhaustivement
- [x] Le SEO est adresse (canonical, schema, sitemap, robots)
- [x] Les edge cases sont consolides en un tableau
- [x] Le phasage est compatible avec une implementation par sous-agents paralleles (phases 3, 4, 5)
- [x] L'ancien spec `2026-04-06-portfolio-showcase-design.md` est superseded explicitement

---

## 18. Apres validation

Une fois ce spec approuve par David, passer a la skill `writing-plans` pour produire le plan d'implementation detaille (un plan executable par sous-agents independants si possible, sinon sequentiel).
