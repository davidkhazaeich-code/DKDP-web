# Page ChatGPT Ads + article : plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publier sur dkdp.ch une page service « ChatGPT Ads » (FR + EN) complète, visuelle, référencée sur « Suisse romande » et « Genève », reliée à tout le site, puis un article de blog compagnon.

**Architecture:** Une page Next.js App Router par langue (`src/app/agence-digitale/chatgpt-ads/page.tsx`, `src/app/en/digital-agency/chatgpt-ads/page.tsx`) qui importe des composants bilingues (`lang` prop) depuis `src/app/agence-digitale/chatgpt-ads/_components/`. La logique de calcul du simulateur vit dans `src/lib/chatgpt-ads/estimate.ts` (pure, testée). Les faits produit viennent d'une fiche unique `docs/chatgpt-ads-facts-2026-09-10.md`. Le maillage passe par les points d'accroche existants du site (routes, slugs, dictionnaires, header, footer, hub, plan du site, tarifs, villes, glossaire, chatbot).

**Tech Stack:** Next.js App Router, TypeScript, Tailwind, framer-motion (`m` de `framer-motion` déjà utilisé), lucide-react, vitest, Playwright (tools), Gemini via `DEV SPACE/tools/gemini_image.py`.

**Spec:** `docs/superpowers/specs/2026-09-10-chatgpt-ads-page-design.md`

## Global Constraints

- Jamais de em dash `—` ni de tiret demi-cadratin dans le texte visible. Jamais d'emoji. Jamais « annulable », « reconnue » (attestation), « caler » (dire « fixer »).
- « IA » en français, jamais « AI » hors noms propres (Claude AI, ChatGPT).
- Année courante 2026. Première mention « ChatGPT Ads », puis « ChatGPT Ads » ou « les annonces ChatGPT ». « Ads Manager » (OpenAI Ads Manager) pour l'outil. Jamais de logo OpenAI ou ChatGPT dans les visuels, jamais d'interface qui imite ChatGPT au pixel près (maquette générique).
- Aucun chiffre hors fiche `docs/chatgpt-ads-facts-2026-09-10.md`. Aucun résultat client ChatGPT Ads inventé. Les prix DKDP sont ceux de la spec.
- Couleurs via `import { violet, green, orange, chrome } from '@/lib/tokens'`, jamais de rgba brut nouveau. Pilier agence = violet.
- Liens textuels : `text-text-secondary hover:text-text transition-colors` (nav) ou `underline hover:text-text transition-colors` (inline). Jamais `text-text-primary`.
- Zones à fond sombre en dur : échelle blanche (`text-white/70`), pas les tokens de texte.
- Nombres rendus côté serveur : `formatSwissInt` / `formatSwissChf` de `src/lib/format.ts`, jamais `toLocaleString`.
- `SectionReveal` : `delay` en secondes (`delay={0.08}`).
- Server Components par défaut ; `'use client'` seulement pour `ChatMockHero` et `BudgetSimulator`.
- Fichiers > 400 lignes : composants dans `_components/`. Page FR visée < 700 lignes.
- Nouvelle page avec miroir EN = `ROUTES` **et** `src/i18n/slugs.ts`.
- Titles mesurés en pixels (< 600 px), descriptions < 160 caractères.
- Images : WebP/JPEG compressés, noms SEO, alt commençant par le mot-clé, jamais de nom générique.
- Git : `git pull --ff-only` avant chaque commit (un robot commite la base du chatbot sur `main`). Commits atomiques par tâche, push final sur `main` après QA complète.

---

### Task 0: Fiche de faits ChatGPT Ads

**Files:**
- Create: `docs/chatgpt-ads-facts-2026-09-10.md`

**Interfaces:**
- Produces: la seule source de faits pour la page, l'article, la FAQ, le glossaire et le prompt du chatbot.

- [ ] **Step 1: Rédiger la fiche** à partir des pages OpenAI relues dans Chrome le 10.09.2026 (annonce Europe du 18.08 mise à jour le 31.08, « New ways to buy » du 05.05, « Testing ads » du 09.02 mis à jour 26.03 / 07.05 / 11.08, centre d'aide « Ads in ChatGPT », « The Basics », « Create Ads », politiques v1.5 du 31.08) et des articles du centre d'aide (« Ads Manager Availability », « Account Setup », « Daily Budgets », « Billing », « Custom Audiences », « Create Campaigns », « Create Ad Groups », « Conversion-optimized Campaigns », « FAQ »). Sections : règles d'écriture · calendrier · qui voit les annonces · format · sélection et enchère · objectifs et enchères · ciblage · mesure · Europe et Suisse · politiques et secteurs · bonnes pratiques créa · sources. Chaque fait porte sa source.
- [ ] **Step 2: Marquer explicitement** ce qui vient de sources secondaires (liste des 31 pays, date du 24 août, minimum quotidien, limites de caractères) et ce qui reste à ne pas affirmer (CPM observés, CTR moyens).

### Task 1: Fonction d'estimation du simulateur (TDD)

**Files:**
- Create: `src/lib/chatgpt-ads/estimate.ts`
- Test: `src/lib/chatgpt-ads/__tests__/estimate.test.ts`

**Interfaces:**
- Produces: `estimateCampaign(input: EstimateInput): EstimateResult` et `EstimateInput = { budgetChf: number; cpcLowChf: number; cpcHighChf: number; conversionRate: number }`, `EstimateResult = { clicksLow: number; clicksHigh: number; leadsLow: number; leadsHigh: number; costPerLeadLow: number; costPerLeadHigh: number }` (entiers pour clics et leads, arrondis ; coût par lead arrondi au franc ; tout à 0 si budget ≤ 0 ; `clicksLow` = budget / cpcHigh, `clicksHigh` = budget / cpcLow ; `leadsLow` = floor(clicksLow × taux), `leadsHigh` = floor(clicksHigh × taux) ; coût par lead = budget / leads, `Infinity` évité : 0 si leads = 0).

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { describe, it, expect } from 'vitest'
import { estimateCampaign } from '../estimate'

describe('estimateCampaign', () => {
  it('borne les clics par le CPC haut et le CPC bas', () => {
    const r = estimateCampaign({ budgetChf: 1000, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })
    expect(r.clicksLow).toBe(250)
    expect(r.clicksHigh).toBe(400)
  })
  it('déduit les contacts et le coût par contact', () => {
    const r = estimateCampaign({ budgetChf: 1000, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })
    expect(r.leadsLow).toBe(7)
    expect(r.leadsHigh).toBe(12)
    expect(r.costPerLeadLow).toBe(83)
    expect(r.costPerLeadHigh).toBe(143)
  })
  it('rend des zéros sans planter quand le budget est nul ou négatif', () => {
    const r = estimateCampaign({ budgetChf: 0, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.03 })
    expect(r).toEqual({ clicksLow: 0, clicksHigh: 0, leadsLow: 0, leadsHigh: 0, costPerLeadLow: 0, costPerLeadHigh: 0 })
  })
  it('ne divise jamais par zéro quand aucun contact ne sort', () => {
    const r = estimateCampaign({ budgetChf: 50, cpcLowChf: 2.5, cpcHighChf: 4, conversionRate: 0.01 })
    expect(r.leadsLow).toBe(0)
    expect(r.costPerLeadHigh).toBe(0)
  })
})
```

- [ ] **Step 2: Lancer** `npx vitest run src/lib/chatgpt-ads` → échec « Cannot find module '../estimate' ».
- [ ] **Step 3: Implémenter** `estimate.ts` (fonction pure, `Math.floor` pour clics et leads, `Math.round` pour le coût par lead, garde sur budget ≤ 0 et CPC ≤ 0).
- [ ] **Step 4: Lancer** `npx vitest run src/lib/chatgpt-ads` → 4 tests verts.
- [ ] **Step 5: Commit** `feat(chatgpt-ads): fonction d'estimation du simulateur de budget`.

### Task 2: Routes, slugs, dictionnaires, header, footer (maillage structurel)

**Files:**
- Modify: `src/lib/routes.ts:67` (ajouter après `publicite-sea`)
- Modify: `src/i18n/slugs.ts` (bloc « Agence digitale - services », après `publicite-sea`)
- Modify: `src/dictionaries/fr.json` et `src/dictionaries/en.json` : `nav.agenceMain` (insérer en index 5) et `footer.agenceLinks` (insérer en index 6)
- Modify: `src/components/layout/Header.tsx:41-51` (nouvelle ligne index 5, décaler 5→6, 6→7, 7→8, 8→9)
- Modify: `src/components/layout/Footer.tsx:29-38` (nouvelle ligne index 6, décaler 6→7 … 9→10)
- Test: `src/lib/__tests__/routes.test.ts` (ajouter un `it`)

**Interfaces:**
- Produces: URL FR `/agence-digitale/chatgpt-ads`, EN `/en/digital-agency/chatgpt-ads` résolue par `localizedPath()`.

- [ ] **Step 1: Test qui échoue** dans `routes.test.ts`, bloc « Miroir FR / EN » :

```ts
  it('expose la page ChatGPT Ads dans les deux langues', () => {
    expect(ROUTES.some((r) => r.url === '/agence-digitale/chatgpt-ads')).toBe(true)
    expect(FR_TO_EN['/agence-digitale/chatgpt-ads']).toBe('/digital-agency/chatgpt-ads')
  })
```

- [ ] **Step 2: Lancer** `npx vitest run src/lib/__tests__/routes.test.ts` → échec.
- [ ] **Step 3: routes.ts** : `{ url: '/agence-digitale/chatgpt-ads', priority: 0.85, changeFrequency: 'weekly', lastModified: '2026-09-10' },` ; **slugs.ts** : `'/agence-digitale/chatgpt-ads': '/digital-agency/chatgpt-ads',`.
- [ ] **Step 4: Dictionnaires.** FR `nav.agenceMain[5]` = `{ "title": "ChatGPT Ads", "description": "Publicité dans ChatGPT, nouveau canal 2026 en Suisse." }` ; EN = `{ "title": "ChatGPT Ads", "description": "Advertising inside ChatGPT, new 2026 channel in Switzerland." }`. FR `footer.agenceLinks[6]` = `"ChatGPT Ads"`, EN idem. Vérifier avec `python3 -c "import json; d=json.load(open('src/dictionaries/fr.json')); print(len(d['nav']['agenceMain']), d['footer']['agenceLinks'])"`.
- [ ] **Step 5: Header.tsx** : insérer `{ title: t.agenceMain[5].title, description: t.agenceMain[5].description, href: lp('/agence-digitale/chatgpt-ads'), icon: Sparkles },` (importer `Sparkles` de lucide-react si absent) et décaler les indices suivants. **Footer.tsx** : insérer `{ label: t.agenceLinks[6], href: lp('/agence-digitale/chatgpt-ads') },` et décaler.
- [ ] **Step 6: Lancer** `npx vitest run src/lib/__tests__/routes.test.ts src/components/layout` → verts (même nombre d'échecs préexistants qu'à la baseline, voir scratchpad `vitest-baseline.txt`).
- [ ] **Step 7: Commit** `feat(chatgpt-ads): route, slug EN, entrées de menu et de footer`.

### Task 3: Composants de la page (bilingues)

**Files:**
- Create dans `src/app/agence-digitale/chatgpt-ads/_components/` : `ChatMockHero.tsx` (client), `HowItWorks.tsx`, `RolloutTimeline.tsx`, `PlanVisibilityGrid.tsx`, `ChannelComparison.tsx`, `BudgetSimulator.tsx` (client), `SectorsGrid.tsx`, `MethodSteps.tsx`, `PricingGrid.tsx`, `ExpertBlock.tsx`, `ComplianceTiles.tsx`, `RomandieCoverage.tsx`, `copy.ts` (FAQ FR/EN et chaînes partagées)

**Interfaces:**
- Consumes: `estimateCampaign` (Task 1), `formatSwissInt`/`formatSwissChf`, tokens, `Locale` de `@/i18n/config`, `CITIES` de `@/lib/cities` et `CITIES_EN` de `@/lib/cities-en` pour `RomandieCoverage`.
- Produces: chaque composant exporte une fonction nommée avec `{ lang }: { lang: Locale }` (défaut `'fr'`). `copy.ts` exporte `FAQ: Record<Locale, { question: string; answer: string }[]>` (10 entrées par langue, texte identique à ce que `FAQSection` affiche, car `buildFAQPage` le balise).

- [ ] **Step 1: `ChatMockHero`** : `'use client'`, `m` + `AnimatePresence` de framer-motion, séquence sur 9 s en boucle : message utilisateur (« Je cherche un cours de yoga le soir à Genève, plutôt Eaux-Vives »), réponse en 3 puces qui s'écrivent, puis carte « Sponsorisé » (favicon rond violet, nom « Studio Ancre · Eaux-Vives », titre « Cours du soir dès 19h, séance d'essai », texte, bouton flèche) qui apparaît avec un `layout` fade. Respecter `prefers-reduced-motion` (`useReducedMotion` → état final statique). Fond `rgba(0,0,0,0.6)`, bordure `violet.border`, échelle blanche. Étiquette « Maquette illustrative, interface générique » en `text-[10px] text-white/45`. Deux chips flottantes (desktop) : « Annonce sous la réponse, séparée et étiquetée » et « Conversation jamais transmise à l'annonceur ».
- [ ] **Step 2: `HowItWorks`** : 3 colonnes numérotées (01 La question, 02 La réponse de ChatGPT, 03 La carte sponsorisée), flèches SVG entre les colonnes en desktop, sous chaque colonne 2 lignes de texte. Encart « Ce que contient la carte » : nom de l'annonceur, favicon, titre, texte, image, page de destination (source fiche).
- [ ] **Step 3: `RolloutTimeline`** : liste horizontale scrollable en mobile (`overflow-x-auto`, `snap-x`), 7 jalons, le jalon « 24 août 2026 · Suisse » et « 31 août 2026 · Ads Manager libre-service » en accent violet.
- [ ] **Step 4: `PlanVisibilityGrid`** : tableau 2 colonnes (Forfait / Annonces ?) 6 lignes : Free (oui, sauf option sans publicité à limites réduites), Go (oui), Plus (jamais), Pro (jamais), Business, Enterprise, Edu (jamais), Moins de 18 ans, chats temporaires, navigateur Atlas (jamais). Coche verte `green.color` / moins `text-text-muted`. Note B2B sous le tableau.
- [ ] **Step 5: `ChannelComparison`** : tableau 3 colonnes (Critère / Google Ads / ChatGPT Ads), 8 lignes (déclencheur, format, ciblage, enchères, mesure, personnalisation en Suisse, maturité, ce que DKDP recommande), `overflow-x-auto`, en-tête collant. Colonne ChatGPT en fond `violet.bg`.
- [ ] **Step 6: `BudgetSimulator`** : `'use client'`, `useState` budget (300 à 5'000, pas 100, défaut 1'000), CPC supposé (min 2 à max 6 CHF, deux curseurs, défaut 2.5 à 4), taux de conversion (1 à 6 %, défaut 3). Affiche clics estimés (fourchette), contacts estimés, coût par contact, via `estimateCampaign`. Nombres via `formatSwissInt`. Bandeau « Estimation indicative, pas une promesse » + rappel « OpenAI recommande un CPC de départ de 3 à 5 USD ». `aria-label` sur chaque `input[type=range]`, valeurs lisibles sans JS grâce à un rendu initial calculé avec les défauts. CTA « Cadrer mon pilote » vers `/contact?service=service-digital` (le tracking des liens contact est automatique).
- [ ] **Step 7: `SectorsGrid`** : 2 blocs : « Ça marche » (4 cartes : commerce et e-commerce ; services locaux ; hôtellerie, restauration, tourisme ; formation et produits numériques, chacune avec un exemple romand fictif sans nom d'entreprise) et « Pas encore, ou sur validation » (finance, santé, juridique : hors États-Unis généralement interdits ; alcool, jeux d'argent, politique, annonces individuelles d'emploi ou de logement : interdits) + carte « B2B : à tester avec prudence ».
- [ ] **Step 8: `MethodSteps`** : 5 étapes (01 Cadrage et éligibilité, 02 Compte et mesure, 03 Cartes et context hints, 04 Pilote de 30 jours, 05 Décision et montée en charge), même grille que la page Google Ads (`md:grid-cols-5`).
- [ ] **Step 9: `PricingGrid`** : 3 offres, la première `highlight` : Pilote 30 jours CHF 1'200 (unique) · Gestion mensuelle CHF 450 / mois · Google Ads + ChatGPT Ads CHF 950 / mois, listes de 5 à 6 points, bouton « Demander un devis » vers `/contact?service=service-digital`. Sous la grille : « Budget média conseillé pour un pilote : CHF 600 à 1'500, versé directement à OpenAI. Zéro commission. Compte à votre nom. Sans engagement, préavis de 30 jours. »
- [ ] **Step 10: `ExpertBlock`** : photo `/images/team/david-khazaei.png` (même traitement que `DavidCard`), titre « Qui pilote vos campagnes », 3 phrases (David gère les campagnes Google Ads et YouTube de PME romandes et d'événements internationaux à Genève ; un seul interlocuteur ; accès complet au compte), lien `/a-propos`.
- [ ] **Step 11: `ComplianceTiles`** : 4 tuiles (la conversation n'est jamais transmise · pas d'annonce près des sujets sensibles · le pixel OpenAI est un traceur, donc consentement cookies, lien `/agence-digitale/rgpd-cookies` · pas de personnalisation en Suisse au lancement).
- [ ] **Step 12: `RomandieCoverage`** : H3 « ChatGPT Ads à Genève, Lausanne et dans toute la Suisse romande », paragraphe honnête sur le ciblage national, grille des 8 villes (`CITIES` / `CITIES_EN`, lien vers `/agence-digitale/<slug>` localisé), ligne sur la Suisse alémanique (cartes en allemand).
- [ ] **Step 13: `copy.ts`** : FAQ FR/EN 10 questions (budget minimum, coût de la gestion, qui voit les annonces, disponible en Suisse depuis quand, différence avec Google Ads, secteurs acceptés, cibler seulement Genève, compte au nom de l'entreprise, mesurer les résultats, délai de lancement) avec réponses de 2 à 4 phrases, chiffres de la fiche uniquement.
- [ ] **Step 14: Vérifier** `npx tsc --noEmit -p .` (ou `npm run build` plus tard) sans erreur sur `_components/`.
- [ ] **Step 15: Commit** `feat(chatgpt-ads): composants bilingues de la page`.

### Task 4: Page FR

**Files:**
- Create: `src/app/agence-digitale/chatgpt-ads/page.tsx`

**Interfaces:**
- Consumes: tous les composants de Task 3, `FAQ.fr` de `copy.ts`, `HeroBg`, `GradTag`, `GradText`, `SectionReveal`, `LiquidMetalButton`, `HeroPills`, `ScrollSpyNav`, `LogoBanner`, `FAQSection`, `CTAFinal`, `ArticleCarousel`, `getArticlesByTopic`, `CHATGPT_TOPIC`, `buildServiceWithLocalBusiness`, `buildFAQPage`, `buildBreadcrumbList`.

- [ ] **Step 1: Metadata** : `title: 'Agence ChatGPT Ads Genève & Suisse romande | DKDP'`, `description` (< 160 car.) : « Publicité dans ChatGPT pour les PME romandes : compte Ads Manager, cartes sponsorisées, pilote de 30 jours, suivi des conversions. Agence à Genève, zéro commission média. », `alternates` (canonical FR, `fr-CH`, `en`, `x-default`), `openGraph.images` `/images/og/chatgpt-ads.png` 1376×768.
- [ ] **Step 2: Schémas** : `buildServiceWithLocalBusiness({ name: 'Publicité ChatGPT Ads Suisse romande', url: '/agence-digitale/chatgpt-ads', description, serviceType: 'Publicité ChatGPT Ads', priceFrom: 1200, priceSpecDescription: 'Pilote de 30 jours dès CHF 1\'200, gestion mensuelle dès CHF 450' })`, `buildFAQPage(FAQ.fr)`, `buildBreadcrumbList` (Accueil › Agence Digitale › ChatGPT Ads).
- [ ] **Step 3: Sections** dans l'ordre de la spec, ids `fonctionnement`, `deploiement`, `audience`, `comparatif`, `simulateur`, `pour-qui`, `methode`, `tarifs`, `expert`, `conformite`, `zone`, `faq`, chacune `scroll-mt-[124px]`. Hero identique en structure à `publicite-sea` (H1 = `grad-tag`, accroche `<p>` avec 2 `GradText`, intro, `HeroPills`, CTA). Bandeau 4 chiffres. Passerelles Google Ads (`/agence-digitale/publicite-sea`) et SEO (`/agence-digitale/seo`) avant `CTAFinal`.
- [ ] **Step 4: Lancer** `npm run dev`, ouvrir `http://localhost:3000/agence-digitale/chatgpt-ads` dans le Browser pane, vérifier console vide, toutes les ancres de `ScrollSpyNav` résolues, mode clair et sombre (`resize_window` `colorScheme`), 390 px et 1440 px.
- [ ] **Step 5: Commit** `feat(chatgpt-ads): page FR /agence-digitale/chatgpt-ads`.

### Task 5: Page EN

**Files:**
- Create: `src/app/en/digital-agency/chatgpt-ads/page.tsx`

- [ ] **Step 1:** Même squelette que la page FR, `lang="en"` sur chaque composant, `FAQ.en`, `buildServiceWithLocalBusiness({ ..., lang: 'en' })`, `LogoBanner lang="en"`, `FAQSection lang="en"`, `CTAFinal lang="en"`, `ArticleCarousel lang="en"`, liens via `localizedPath(frPath, 'en')`. `title: 'ChatGPT Ads agency Geneva & Switzerland | DKDP'`, `openGraph.locale: 'en_US'`, `alternateLocale: ['fr_CH']`.
- [ ] **Step 2:** Vérifier `/en/digital-agency/chatgpt-ads` dans le Browser pane comme en Task 4.
- [ ] **Step 3: Commit** `feat(chatgpt-ads): page EN /en/digital-agency/chatgpt-ads`.

### Task 6: Maillage de contenu (hub, plan du site, tarifs, villes, Google Ads, glossaire, chatbot)

**Files:**
- Modify: `src/app/agence-digitale/page.tsx` (`SERVICES`, après la carte Publicité Google Ads) et `src/app/en/digital-agency/page.tsx`
- Modify: `src/app/plan-du-site/page.tsx:54` et `src/app/en/sitemap/page.tsx:57`
- Modify: `src/app/tarifs/page.tsx:~133` et `src/app/en/pricing/page.tsx:~116`
- Modify: `src/app/agence-digitale/[ville]/page.tsx:72` et `src/app/en/digital-agency/[city]/page.tsx:72`
- Modify: `src/app/agence-digitale/publicite-sea/page.tsx:661` et `src/app/en/digital-agency/google-ads/page.tsx:830` (passerelle « Nouveau canal » avant la passerelle SEO)
- Modify: `src/app/glossaire/page.tsx` (terme `ChatGPT Ads`, category `'SEO'`, ordre alphabétique) et `src/app/en/glossary/page.tsx`
- Modify: `src/lib/chat-system-prompt.ts:73` (ligne « Publicité dans ChatGPT, ChatGPT Ads, Ads Manager OpenAI → [ChatGPT Ads](/agence-digitale/chatgpt-ads) »)

- [ ] **Step 1:** Hub FR : `{ Icon: Sparkles, title: 'ChatGPT Ads', href: '/agence-digitale/chatgpt-ads', description: 'Publicité dans ChatGPT : cartes sponsorisées sous les réponses, pilote de 30 jours, suivi des conversions.', badge: 'Nouveau', image: '/images/services/dkdp-agence-chatgpt-ads.webp' }` ; EN équivalent avec `badge: 'New'`.
- [ ] **Step 2:** Plan du site FR `{ label: 'Publicité ChatGPT Ads', href: '/agence-digitale/chatgpt-ads' }`, EN `{ label: 'ChatGPT Ads', href: lp('/agence-digitale/chatgpt-ads') }`.
- [ ] **Step 3:** Tarifs FR `{ Icon: Sparkles, title: 'ChatGPT Ads', href: '/agence-digitale/chatgpt-ads', price: 'Pilote CHF 1\'200 · puis CHF 450 / mois', note: 'frais de gestion · budget publicitaire en sus, sans commission' }`, EN équivalent.
- [ ] **Step 4:** Villes FR `{ label: 'Publicité ChatGPT Ads', href: '/agence-digitale/chatgpt-ads', desc: 'Annonces dans ChatGPT, nouveau canal ouvert aux entreprises suisses depuis août 2026.' }`, EN équivalent.
- [ ] **Step 5:** Passerelle sur la page Google Ads FR/EN (copie du bloc « Étape suivante » avec `Sparkles`, texte « Nouveau canal : ChatGPT Ads »).
- [ ] **Step 6:** Glossaire FR : `{ term: 'ChatGPT Ads', category: 'SEO', definition: 'Publicité dans ChatGPT. Une carte sponsorisée (nom, titre, texte, image, lien) s\'affiche sous la réponse pour les utilisateurs des forfaits Free et Go, sans influencer la réponse. Ouvert aux entreprises suisses en libre-service via Ads Manager depuis le 31 août 2026, enchères au CPM ou au CPC.' }` ; EN équivalent.
- [ ] **Step 7:** Prompt du chatbot : nouvelle ligne dans « Visibilité ».
- [ ] **Step 8:** `npx vitest run` → même baseline. `npm run build` → OK.
- [ ] **Step 9: Commit** `feat(chatgpt-ads): maillage interne (hub, plan du site, tarifs, villes, Google Ads, glossaire, chatbot)`.

### Task 7: Images et OG

**Files:**
- Create: `public/images/services/dkdp-agence-chatgpt-ads.webp` (1200 px de large, 16:9), `public/images/services/dkdp-chatgpt-ads-secteurs-pme-romandes.webp`, `public/images/services/dkdp-chatgpt-ads-suisse-romande-villes.webp`
- Modify: `tools/og-generator/generate.mjs` (`PAGES` : `{ file: 'chatgpt-ads.png', pillar: 'agence', label: 'ChatGPT Ads · Genève', title: 'Publicité dans ChatGPT', subtitle: 'Cartes sponsorisées · Pilote 30 jours · Suisse romande', size: 'smaller' }`)
- Create: `public/images/og/chatgpt-ads.png`

- [ ] **Step 1:** Prompts en anglais, mode illustration, pilier agence, exclusions permanentes (pas de logo, pas de texte dans l'image, pas de fond clair, pas de robot). Générer avec `python3 "DEV SPACE/tools/gemini_image.py" --prompt-file … --out … --aspect 16:9 --model gemini-3-pro-image --resize-width 1600`. Relire chaque image (Gemini incruste des libellés si on ne l'interdit pas en toutes lettres).
- [ ] **Step 2:** Convertir en WebP (`cwebp -q 82` ou PIL), vérifier < 250 Ko.
- [ ] **Step 3:** `node tools/og-generator/generate.mjs chatgpt-ads.png` (ne rend que ce fichier).
- [ ] **Step 4: Commit** `feat(chatgpt-ads): visuels de la page et image OG`.

### Task 8: QA complète

- [ ] **Step 1:** `npm run build` sans erreur ; `npx vitest run` avec le même nombre d'échecs préexistants que la baseline.
- [ ] **Step 2:** `npx next start -p 3100` puis `node tools/check-serp-width.mjs http://localhost:3100 chatgpt-ads` : les 2 titles < 600 px, descriptions < 160 caractères.
- [ ] **Step 3:** `node tools/audit-white-links.mjs` : aucune nouvelle violation.
- [ ] **Step 4:** Captures Playwright des 2 pages (desktop 1440, mobile 390, clair et sombre) dans le scratchpad, relecture visuelle : hero, simulateur, tableaux (pas de débordement horizontal du body), FAQ.
- [ ] **Step 5:** Lecture du HTML rendu : un seul `<h1>`, JSON-LD parsable (`python3 -c` sur les blocs `application/ld+json`), `hreflang` présents, ancres de `ScrollSpyNav` existantes.
- [ ] **Step 6:** Relecture texte : `grep -n "—\|–" src/app/agence-digitale/chatgpt-ads src/app/en/digital-agency/chatgpt-ads` vide ; humanizer sur les blocs de copie longs.

### Task 9: Déploiement de la page

- [ ] **Step 1:** `git pull --ff-only`, `git add` des fichiers de la page (pas les `_thumb.jpeg` étrangers du blog déjà présents en `??`), commit, `git push origin main`.
- [ ] **Step 2:** Attendre le déploiement Vercel (~60 s), `curl -sI https://dkdp.ch/agence-digitale/chatgpt-ads` et `/en/digital-agency/chatgpt-ads` en 200, `node tools/check-hydration.mjs https://dkdp.ch /agence-digitale/chatgpt-ads /en/digital-agency/chatgpt-ads`.
- [ ] **Step 3:** `gh workflow run update-chat-kb.yml` pour que le chatbot recrawle la page.

### Task 10: Article compagnon

**Files:**
- Create: `src/lib/blog/chatgpt-ads-suisse-romande-guide-2026.ts`
- Modify: `src/lib/blog/index.ts` (import `a36`, ajouter en tête de `ARTICLES` ; `FEATURED_SLUG` reste l'article Astra, décision à laisser à David)
- Create: `public/images/blog/chatgpt-ads-suisse-romande-hero.webp`, `public/images/blog/chatgpt-ads-carte-sponsorisee-sous-reponse.webp`, `public/images/blog/chatgpt-ads-eligibilite-secteurs-suisse.webp`
- Test: `src/lib/blog/__tests__/topic.test.ts` (ajouter un `it` : l'article ChatGPT Ads remonte dans `CHATGPT_TOPIC`)

- [ ] **Step 1: Test qui échoue** : `expect(getArticlesByTopic(CHATGPT_TOPIC, ARTICLES.length).map(a => a.slug)).toContain('chatgpt-ads-suisse-romande-guide-2026')`.
- [ ] **Step 2: Article** (category `seo`, ~2'500 mots, date 10 septembre 2026, `readTime` calculé à 200 mots/min) : titre « ChatGPT Ads en Suisse romande : le guide 2026 pour les PME (prix, formats, éligibilité) », sections H2 : ce qu'est ChatGPT Ads · la chronologie · qui voit les annonces · le format de la carte · comment l'annonce est choisie (context hints, enchère) · objectifs et enchères (Reach, Clicks, Conversions) · ce qui change en Suisse et dans l'EEE (pas de personnalisation, entité vérifiée) · les secteurs acceptés et refusés · ouvrir un compte Ads Manager pas à pas · écrire des cartes qui marchent · mesurer (pixel, Conversions API, UTM, consentement) · Google Ads ou ChatGPT Ads · GEO ou ChatGPT Ads · un pilote de 30 jours à Genève, budget et attentes · questions fréquentes (6). 1 diagramme HTML codé (frise ou grille forfaits) + 2 images `___IMG:___`. `faq` rempli mot pour mot. Liens internes : page ChatGPT Ads, Google Ads, SEO, article Astra, article nLPD, article SEO vs Google Ads. Tags : `['ChatGPT Ads', 'OpenAI', 'Publicité', 'Ads Manager', 'PME', 'Genève', 'Suisse romande', '2026']`.
- [ ] **Step 3:** Images Gemini (hero 16:9 photo éditoriale mode 1 ou illustration mode 3, deux schémas mode 2 sans texte incrusté), WebP.
- [ ] **Step 4:** `npx vitest run src/lib/blog` verts, `npm run build`, aperçu `/blog/chatgpt-ads-suisse-romande-guide-2026` dans le Browser pane (tableaux dans la colonne, images chargées).
- [ ] **Step 5: Commit + push** `content(blog): guide ChatGPT Ads en Suisse romande 2026`, puis vérification en prod et `gh workflow run update-chat-kb.yml`.

### Task 11: Documentation et mémoire

- [ ] **Step 1:** `CLAUDE.md` du projet dkdp : section « Nommage : ChatGPT Ads » (noms exacts FR/EN par contexte, fiche de faits, contenu périssable : calendrier, secteurs, politiques v1.5, prix DKDP).
- [ ] **Step 2:** DEV SPACE `CLAUDE.md` : ligne DKDP du tableau clients (page + article du 10.09.2026).
- [ ] **Step 3:** DEV SPACE `services/chatgpt-ads.md` (fiche service : pitch, positioning, pricing, deliverables, workflow, anti-cas, marges) + ligne dans `services/README.md`.
- [ ] **Step 4:** Memory : `project_dkdp_chatgpt_ads_page_2026_09.md` (type project, décisions, pièges), pointeur dans `MEMORY.md` (section DKDP) et dans `hub_dkdp.md`.
