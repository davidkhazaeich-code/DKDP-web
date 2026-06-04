# EN Locale 100% Parity — Implementation Plan

> **For agentic workers:** This plan is executed INLINE by the main agent. Subagents CANNOT Write/Edit/Bash in this harness (confirmed over 9 attempts in prior sessions, see memory `DKDP i18n v3`). Do NOT delegate file writes to subagents. Steps use checkbox (`- [ ]`) syntax for cross-session tracking — update them as you go.

**Goal:** Bring the English locale (`/en/*`) of dkdp.ch to 100% structural and content parity with the French site — same sections, same images, same graphic elements on every page — except blog articles (hub only, articles deferred per David 2026-06-04).

**Architecture:** Next.js 16 App Router, FR at root, EN under `src/app/en/`. The chosen strategy is **lang-aware shared components**: add an optional `lang?: Locale` prop (default `'fr'`, fully backward-compatible so the FR production site is untouched) to the ~13 shared section components and the realisations/glossaire wrapper components. EN pages then **reuse the exact same components** with `lang="en"`, guaranteeing identical sections/graphics. New EN-only data (glossary EN terms, city EN fields, Geneva EN page, blog hub) is added alongside FR data. Strings live in `CONTENT = { fr, en }` objects co-located in each component (matching the existing diagram pattern from commit `5b51aca`).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind, GSAP, schema.org builders in `src/lib/schema.ts` (already `lang`-aware), slug mapping in `src/i18n/slugs.ts`, dictionaries in `src/dictionaries/{fr,en}.json`.

**Backward-compat rule (CRITICAL):** Every shared component modified MUST default `lang='fr'` and render byte-identical output when `lang` is omitted. FR pages never pass `lang`. Verify FR pages are unchanged via `npm run build` + spot diff before each commit.

## PROGRESS LOG (update as you go)

- [x] **Phase 0** — slugs.ts (cities/glossary/portfolio/blog/AI-geneva mapped), Header nav localized. Commit `c3b857d`.
- [x] **Phase 1** — ALL 13 shared components lang-aware + TrustBadge + ContactForm. Commits `c3b857d`, `b7da5bc`. Typecheck clean.
- [x] **Phase 2.1** — `/en` home: 1:1 with FR via shared components lang="en". Commit `4de7fce`.
- [x] **Phase 2.3** — `/en/contact`: ContactSection + GoogleMapSection lang="en". Commit `4de7fce`.
- [x] FAQ_ITEMS_EN added to data/faq.ts. Production build GREEN.
- [x] **Phase 2.2** — `/en/about` 1:1 with FR. Commit `39c2696`.
- [x] **Phase 2.4** — `/en/sitemap` 1:1 with FR. Commit `39c2696`. Build green.
- [x] **Phase 3** — `/en/glossary` (53 terms, lang-aware components). Commit `1df3d42`. Build green.
- [x] **Phase 4** — `/en/portfolio` + detail (11 components lang-aware + en.ts overlay). Commit `1734148`.
- [x] **Phase 5** — `/en/digital-agency/[city]` (8 cities, cities-en.ts, FormationPricing lang-aware). Commit `37ffb7f`.
- [x] **Phase 6** — `/en/artificial-intelligence/geneva` (840l pillar, 1:1). Commit `0d51984`.
- [x] **Phase 7** — `/en/blog` hub (ArticleCard + NewsletterForm lang-aware, articles FR). Commit `e30b6ef`.
- [x] **Phase 8** — reciprocal hreflang on FR pages, sitemap EN routes, em-dash quality fix. Commit `07cba77`.

## ✅ COMPLETE (2026-06-04)
All phases done. EN locale at structural parity with FR. Full build green (44 /en routes). Test suite: 53 failed/142 passed = IDENTICAL to pre-session baseline c4e3d99 (zero regression; failures are pre-existing ThemeProvider/stale-copy test debt, not i18n). Commits c3b857d → 07cba77. NOT YET PUSHED to main (awaiting David's go for Vercel production deploy). rgpd-cookies root left FR-only (noindex utility, no EN inbound link; EN legal section uses /en/digital-agency/gdpr-cookies). Blog articles remain FR (David decision); EN hub links through to FR articles.

### How to resume (for next session)
Pattern is established: add `lang?: Locale` (default 'fr') to shared components, EN overlay co-located, reuse from `/en/*` pages with `lang="en"`. Build with `npm run build` (must say "Compiled successfully"), commit with the retry loop. localizedPath(frPath,'en') for all EN internal links. Schema builders take `lang:'en'`. Remaining FR sources to mirror: `src/app/realisations/*` + `src/components/realisations/*` (Phase 4), `src/lib/cities.ts` + `src/app/agence-digitale/[ville]/page.tsx` (Phase 5), `src/app/intelligence-artificielle/geneve/page.tsx` (Phase 6), `src/app/blog/page.tsx` + `ArticleCard` (Phase 7).

**Verification per phase:** `npm run build` must pass (all `/en/*` routes generated). Run from the dkdp dir. Commit with retry loop (git lock is intermittent in Nimbalyst):
```bash
for i in 1 2 3 4 5 6; do rm -f .git/index.lock; if git add -A && git commit -m "MSG"; then break; fi; sleep 1; done
```
After deploy: purge cache (memory `feedback_purge_cache_on_push`).

---

## Scope summary

| Bucket | FR source | EN target | Status |
|---|---|---|---|
| 30 service pages | various | `/en/*` | DONE (prior session) |
| Legal + pricing | 4 pages | DONE | DONE |
| **Transverse: home** | `src/app/page.tsx` | `src/app/en/page.tsx` | partial → parity |
| **Transverse: about** | `src/app/a-propos` | `src/app/en/about` | partial → parity |
| **Transverse: contact** | `src/app/contact` | `src/app/en/contact` | partial → parity |
| **Transverse: sitemap** | `src/app/plan-du-site` | `src/app/en/sitemap` | partial → parity |
| **Glossary** | `src/app/glossaire` (65 terms) | `src/app/en/glossary` | MISSING |
| **Portfolio** | `src/app/realisations` (1 case study) | `src/app/en/portfolio` | MISSING |
| **City pages** | `src/app/agence-digitale/[ville]` (8 cities) | `src/app/en/digital-agency/[city]` | MISSING |
| **Geneva AI page** | `src/app/intelligence-artificielle/geneve` | `src/app/en/artificial-intelligence/geneva` | MISSING |
| **Blog hub** | `src/app/blog` (24 articles) | `src/app/en/blog` (hub only) | MISSING |
| **rgpd-cookies root** | `src/app/rgpd-cookies` | check vs `/en/digital-agency/gdpr-cookies` | verify |

**Deferred (David 2026-06-04):** 24 blog articles stay FR. EN blog hub links to FR articles or shows them as FR. No city beyond the 8 in `cities.ts`.

**EN slug additions decided:** `/glossaire`→`/glossary`, `/realisations`→`/portfolio`, `/agence-digitale/geneve`→`/digital-agency/geneva` (+7 other cities), `/intelligence-artificielle/geneve`→`/artificial-intelligence/geneva`, `/blog`→`/blog` (shared path, EN hub at `/en/blog`).

---

## Phase 0 — i18n plumbing foundations

### Task 0.1: Extend slug map
**Files:** Modify `src/i18n/slugs.ts`

- [ ] Add to `FR_TO_EN`:
```ts
// Cities (Digital Agency)
'/agence-digitale/geneve': '/digital-agency/geneva',
'/agence-digitale/lausanne': '/digital-agency/lausanne',
'/agence-digitale/nyon': '/digital-agency/nyon',
'/agence-digitale/fribourg': '/digital-agency/fribourg',
'/agence-digitale/sion': '/digital-agency/sion',
'/agence-digitale/neuchatel': '/digital-agency/neuchatel',
'/agence-digitale/morges': '/digital-agency/morges',
'/agence-digitale/montreux': '/digital-agency/montreux',
// AI Geneva
'/intelligence-artificielle/geneve': '/artificial-intelligence/geneva',
// Content hubs
'/glossaire': '/glossary',
'/realisations': '/portfolio',
'/blog': '/blog',
```
- [ ] Verify `localizedPath`, `stripLocale`, `hasTranslation`, `EN_TO_FR` all still derive correctly (they read from `FR_TO_EN`).
- [ ] Build check + commit `feat(i18n): map cities, glossary, portfolio, blog, AI-geneva slugs`

### Task 0.2: Dictionary entries for new UI chrome
**Files:** Modify `src/dictionaries/fr.json`, `src/dictionaries/en.json`

- [ ] Add `glossary`, `portfolio`, `cityPage`, `blog` string blocks (labels reused by lang-aware components below). Keep keys identical across both files. (Exact keys are introduced per-component in later tasks; add them here as you go, then re-run build.)
- [ ] Confirm Header nav already exposes blog/glossaire links for EN (currently FR-only hrefs in `Header.tsx` lines ~90). Update those hrefs to `localizedPath('/blog', lang)` / `localizedPath('/glossaire', lang)` and the IA-geneve secondary link to `localizedPath('/intelligence-artificielle/geneve', lang)`.
- [ ] Build check + commit `feat(i18n): nav + dictionary entries for new EN pages`

---

## Phase 1 — Lang-aware shared section components (unblocks transverse pages)

For EACH component below: add `lang?: Locale` prop (default `'fr'`), extract hardcoded FR strings into a `const CONTENT = { fr: {...}, en: {...} } as const`, read `const t = CONTENT[lang]`. Data arrays (services, steps, stats, testimonials, team) get an `en` variant. **FR output must be unchanged when `lang` omitted.** Reference the diagram components from commit `5b51aca` for the established pattern.

**Components (file → key FR strings to externalize):**

- [ ] **Task 1.1** `src/components/sections/HomeHero.tsx` — H1, paragraph, CTAs.
- [ ] **Task 1.2** `src/components/sections/ProblemBlock.tsx` — PROBLEMS[3] (title+desc), "Le problème", "On résout ces trois problèmes."
- [ ] **Task 1.3** `src/components/sections/AllServices.tsx` — AGENCE/FORMATION/IA service arrays (titles, descriptions, badges Best seller/Populaire/Tendance/Nouveau), section labels. Links via `localizedPath(href, lang)`.
- [ ] **Task 1.4** `src/components/sections/ProcessSteps.tsx` — STEPS[5] (Échange/Diagnostic/Proposition/Réalisation/Résultats + desc), "Notre méthode", "Comment ça marche".
- [ ] **Task 1.5** `src/components/sections/ProofStack.tsx` — STATS[4] labels + descriptions.
- [ ] **Task 1.6** `src/components/sections/Testimonials.tsx` — TESTIMONIALS[4] (keep client names; translate quotes), "Témoignages", "Ce que disent nos clients", Réduire/Lire la suite. (Decision: keep French client quotes verbatim with EN section chrome? — translate quotes to EN for parity.)
- [ ] **Task 1.7** `src/components/sections/TeamSection.tsx` — TEAM[4] (David, Romane, Ali, Claude) roles, quotes, skills. Photos unchanged.
- [ ] **Task 1.8** `src/components/sections/FAQSection.tsx` — externalize "Questions fréquentes" label (already accepts `items`+`title` props; pass EN FAQ data + EN label).
- [ ] **Task 1.9** `src/components/sections/EstimationBanner.tsx` — "Simulateur en ligne", headings, "2 minutes", "Sans engagement", "Estimer mon projet". Link via `localizedPath`.
- [ ] **Task 1.10** `src/components/sections/CTAFinal.tsx` — "Parlons de votre projet", subtitle, "Réservez votre appel gratuit", contact labels.
- [ ] **Task 1.11** `src/components/sections/ContactSection.tsx` — INFO labels (Téléphone/Email/Adresse/Horaires), tab labels, "Envoyer un message", "Réserver un appel", form copy, availability status.
- [ ] **Task 1.12** `src/components/sections/GoogleMapSection.tsx` — "Nous trouver", description, labels, "Itinéraire Google Maps".
- [ ] **Task 1.13** `src/components/sections/LogoBanner.tsx` — default label "Ils nous font confiance" → lang-aware default ("Trusted by"). Already accepts `label` prop.

- [ ] **Verify:** build passes; open FR home/contact/about in dev — visually unchanged. Commit `refactor(i18n): make 13 shared section components lang-aware (fr default)`.

### FAQ data EN
**Files:** Modify `src/data/faq.ts` (+ `faq-agence.ts`, `faq-formation.ts`, `faq-ia.ts` if used by transverse pages)
- [ ] Export EN arrays (`FAQ_ITEMS_EN`, etc.) alongside FR. Translate items. Commit with the component task or separately.

---

## Phase 2 — Transverse pages to parity (reuse lang-aware components)

Rewrite each EN transverse page to import and render the **same** section components as its FR counterpart, passing `lang="en"`. Mirror the FR page's component order EXACTLY.

- [ ] **Task 2.1 — `src/app/en/page.tsx` (home).** Mirror `src/app/page.tsx`: HomeHero, ProblemBlock, LogoBanner, AllServices, ProcessSteps, ProofStack, Testimonials, TeamSection, FAQSection (EN items), EstimationBanner, CTAFinal — all `lang="en"`. Keep EN metadata + schema (`buildOrganization('en')` etc.). Build + commit.
- [ ] **Task 2.2 — `src/app/en/about/page.tsx`.** Mirror `src/app/a-propos/page.tsx` section-for-section: hero logo card + HeroPills, values (3 cards), LogoBanner, story + stats grid, pillars (3), full TeamSection (4 people), why-DKDP (4 reasons), CTAFinal. `buildPerson('en')`. Build + commit.
- [ ] **Task 2.3 — `src/app/en/contact/page.tsx`.** Mirror `src/app/contact/page.tsx`: HeroBg hero + ContactSection (tabs: message form + Cal.com booking) + GoogleMapSection, all `lang="en"`. Build + commit.
- [ ] **Task 2.4 — `src/app/en/sitemap/page.tsx`.** Mirror `src/app/plan-du-site/page.tsx`: color-coded groups (violet/chrome/orange/green), dot bullets, SectionReveal, all 4 service groups + legal. Add EN blog/glossary/portfolio links. (Blog articles list: link to FR articles.) Build + commit.

---

## Phase 3 — Glossary EN (`/en/glossary`)

**Files:** Create `src/app/en/glossary/page.tsx`, `_types.ts`, `_components/{LetterSection,TermCard,CategoryBadge}.tsx`; modify `src/components/sections/GlossaireSearch.tsx` (add `lang` prop).

- [ ] **Task 3.1** Copy `_types.ts` (lang-agnostic).
- [ ] **Task 3.2** Make `GlossaireSearch.tsx` lang-aware (placeholder, aria-labels, "Aucun terme trouvé" → EN).
- [ ] **Task 3.3** Create EN `_components`: LetterSection ("term/terms"), TermCard ("Learn more"), CategoryBadge ("General").
- [ ] **Task 3.4** Create `src/app/en/glossary/page.tsx`: mirror FR sections (hero, sticky search + alpha nav, letter sections, mid CTA, CTAFinal lang="en"). Translate all 65 terms (term + definition) into a `TERMS_EN` array; keep categories (IA/SEO/Web/Formation/General); remap `link` via `localizedPath(frLink, 'en')`. Metadata: title/description/canonical `/en/glossary` + hreflang. `buildFAQPage` from EN terms, `buildBreadcrumbList` EN.
- [ ] **Task 3.5** Build + commit `feat(i18n): English glossary (65 terms) at /en/glossary`.

---

## Phase 4 — Portfolio EN (`/en/portfolio` + `/en/portfolio/[slug]`)

**Files:** Create `src/app/en/portfolio/page.tsx`, `src/app/en/portfolio/[slug]/page.tsx`. Make realisations components lang-aware: `src/components/realisations/{RealisationHeader,RealisationsGrid,FilterBar,ProblemBlock,ApproachBlock,StackChips,ResultsGrid,GalleryGrid,RelatedRealisations,CinematicCTA}.tsx`.

- [ ] **Task 4.1** Add `lang?: Locale` (default `'fr'`) to each realisations component; externalize FR strings (breadcrumb, CATEGORY_LABEL, "Livré", "Visiter le site", "Lancer mon projet", "Aucune réalisation…", filter tabs Tous/Sites web/Projets IA/Sites + IA, "Le contexte", "Notre approche", "Stack", "Résultats", "Galerie", "Réalisations liées", CinematicCTA marquee + copy).
- [ ] **Task 4.2** Translate the Golden Cash case study content for EN. Decision: realisation DATA stays single-source FR by default; add optional `*_en` fields to the `Realisation` type OR a parallel `goldencash-refonte` EN content map. Simplest: add EN fields to the type (`meta.title_en?`, etc.) — but cleaner is a `lang`-keyed content object in the data file. Implement a `getRealisation(slug, lang)` that returns localized text, falling back to FR.
- [ ] **Task 4.3** Create EN hub page mirroring `src/app/realisations/page.tsx` (header, RealisationsGrid lang="en", LogoBanner, CTAFinal lang="en"). Metadata `/en/portfolio` + hreflang.
- [ ] **Task 4.4** Create EN detail page mirroring `src/app/realisations/[slug]/page.tsx` (all conditional sections lang="en"). `generateStaticParams` over realisations. Metadata per slug + hreflang to `/realisations/[slug]`.
- [ ] **Task 4.5** Build + commit `feat(i18n): English portfolio + lang-aware realisation components`.

---

## Phase 5 — City pages EN (`/en/digital-agency/[city]`, 8 cities)

**Files:** Modify `src/lib/cities.ts` (add EN fields), create `src/app/en/digital-agency/[city]/page.tsx`.

- [ ] **Task 5.1** Extend `City` type with EN fields: `name_en?` (Geneva/etc. — most stay same; Genève→Geneva, Neuchâtel→Neuchatel), `description_en`, `heroLine_en`, `localContext_en`, `economicProfile_en`, `iaUseCases_en: string[]`, `formationContext_en`. Populate for all 8 cities. (Slugs: geneva for geneve, others same slug except neuchatel.) Map FR slug → EN city slug per Task 0.1.
- [ ] **Task 5.2** Create `src/app/en/digital-agency/[city]/page.tsx`: mirror `src/app/agence-digitale/[ville]/page.tsx` section-for-section (hero, stats bar, IA & automation + IA_CAPABILITIES_EN, Formation IA + bullets, services + SERVICES_EN with localizedPath, trust + city stats, intermediate CTA, FAQ[6] templated EN, "Other cities", Testimonials/FAQSection/FormationPricing/LogoBanner/CTAFinal lang="en"). `generateStaticParams` maps EN city slugs. Schema with `lang:'en'`. Metadata + hreflang per city (EN canonical `/en/digital-agency/<slug>` ↔ FR `/agence-digitale/<slug>`).
- [ ] **Task 5.3** Build + commit `feat(i18n): English city pages (8) under /en/digital-agency`.

---

## Phase 6 — Geneva AI page EN (`/en/artificial-intelligence/geneva`)

**Files:** Create `src/app/en/artificial-intelligence/geneva/page.tsx` (bespoke 1:1, ~840 lines).

- [ ] **Task 6.1** Mirror `src/app/intelligence-artificielle/geneve/page.tsx` exactly: hero, stats bar (4), estimation CTA, ScrollSpyNav (7 anchors), Services (3 cards), Why-local (4 points + coverage map of 12 cities + office card), Technologies (9 cards), Case studies (3), Process (6 steps), Pricing (3 tiers — keep CHF + apostrophe format), Testimonials, FAQ (10), related services (4), contact, CTAFinal. All `lang="en"`. Translate all copy; keep prices identical to FR. `buildServiceWithLocalBusiness({lang:'en'})`, `buildFAQPage`, `buildBreadcrumbList`. Metadata + hreflang ↔ `/intelligence-artificielle/geneve`.
- [ ] **Task 6.2** Build + commit `feat(i18n): English AI-in-Geneva pillar page`.

---

## Phase 7 — Blog hub EN (`/en/blog`, articles deferred)

**Files:** Create `src/app/en/blog/page.tsx`, `src/app/en/blog/layout.tsx` (dark theme lock), reuse `ArticleCard` (make lang-aware) + `NewsletterForm`.

- [ ] **Task 7.1** Make `src/app/blog/_components/ArticleCard.tsx` lang-aware ("de lecture"→"read", "Lire →"→"Read →"). Make `BLOG_CATEGORIES` labels lang-aware (or pass EN labels).
- [ ] **Task 7.2** Create `src/app/en/blog/layout.tsx` (dark theme, mirrors FR blog layout).
- [ ] **Task 7.3** Create `src/app/en/blog/page.tsx`: mirror `src/app/blog/page.tsx` (hero, sticky category filters EN, featured article, 4 category grids, newsletter). Article cards link to the existing FR articles (`/blog/[slug]`) — articles remain FR for now; the hub chrome is EN. Add a small note that full articles are in French (or simply link through). Metadata `/en/blog` + hreflang ↔ `/blog`.
- [ ] **Task 7.4** Build + commit `feat(i18n): English blog hub (articles deferred, FR content)`.

---

## Phase 8 — rgpd-cookies root + global verification

- [ ] **Task 8.1** Inspect `src/app/rgpd-cookies/page.tsx`. If it duplicates `/agence-digitale/rgpd-cookies`, confirm EN equivalent exists at `/en/digital-agency/gdpr-cookies`; add hreflang/redirect as needed. If standalone, create `/en/...` mirror.
- [ ] **Task 8.2** **Sitemap:** confirm `src/app/sitemap.ts` now emits EN routes for cities/glossary/portfolio/blog/AI-geneva (auto-derived from `FR_TO_EN`; verify priorities). Add blog/portfolio EN routes if those loops are FR-only.
- [ ] **Task 8.3** **Language switcher QA:** on each new EN page, FR↔EN toggle lands on the correct counterpart (uses `FR_TO_EN`/`stripLocale`). Test glossary, portfolio, each city, AI-geneva, blog.
- [ ] **Task 8.4** **hreflang QA:** every new EN page has canonical + `fr-CH`/`en`/`x-default`. Spot-check rendered `<head>`.
- [ ] **Task 8.5** **Accents + rules:** no em dash, no emoji (SVG/Icon only), no `&` in copy, FR accents preserved in FR data. (memories: `feedback_em_dash`, `feedback_no_emoji_use_svg`, `feedback_no_ampersand`.)
- [ ] **Task 8.6** Full `npm run build`; fix any TS errors (known pre-existing: `BrowserFrame.test.tsx`, out of scope). Final commit + push. Purge cache.
- [ ] **Task 8.7** Update memory `project_dkdp_i18n_v1.md` to v4 (transverse + glossary + portfolio + cities + AI-geneva + blog hub at parity; articles deferred). Update `CLAUDE.md` if conventions changed.

---

## Self-review checklist (run before declaring done)
- [ ] Every FR page under scope has an `/en` counterpart with identical sections.
- [ ] No shared component renders differently for FR when `lang` omitted (FR regression check).
- [ ] All EN internal links use `localizedPath` (no hardcoded FR hrefs leaking into EN).
- [ ] Images/graphics reused (same `src`), not dropped.
- [ ] Prices identical FR↔EN, CHF apostrophe format.
- [ ] Build green; sitemap, hreflang, language switcher verified.

## Open decisions surfaced during execution (ask David if blocking)
- Testimonials: translate FR client quotes to EN, or keep verbatim FR with EN chrome? (plan assumes translate)
- Blog hub: link EN cards to FR articles vs. show "article in French" badge? (plan assumes link through, optional small note)
- Realisation localization mechanism: optional `*_en` fields vs. `lang`-keyed content map (plan assumes `getRealisation(slug, lang)` with FR fallback)
