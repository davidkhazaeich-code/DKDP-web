# City Pages IA/Formation SEO Optimization

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform city pages from generic service listings into SEO-rich, locally-contextualized pages that rank for "IA entreprise [ville]", "formation IA [ville]", "automatisation [ville]", and "agence digitale [ville]" queries.

**Architecture:** Enrich `cities.ts` data model with per-city IA sector data, add 3 new sections to city page template (IA use cases, formation programs, pricing), enhance FAQ with city-specific questions, add Service schema per city. All using existing design system (violet/orange/chrome tokens, SectionReveal, GradTag).

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Schema.org JSON-LD, existing DKDP design system.

---

## Task 1: Enrich City Data Model

**Files:**
- Modify: `src/lib/cities.ts`

- [ ] **Step 1: Add IA and formation fields to City type**

```typescript
export type City = {
  slug: string
  name: string
  canton: string
  description: string
  heroLine: string
  localContext: string
  distance: string
  population: string
  economicProfile: string
  videoSrc?: string
  imageSrc?: string
  // NEW FIELDS
  /** Top 3 IA use cases relevant to this city's economy */
  iaUseCases: string[]
  /** Key industries that benefit from IA/automation */
  iaIndustries: string[]
  /** Local formation angle (why training matters here) */
  formationContext: string
}
```

- [ ] **Step 2: Add data for each city**

For each of the 8 cities, add context-rich IA data based on their `economicProfile`:

- **Geneve**: International orgs, banking, fintech. IA: document automation, compliance, client onboarding.
- **Lausanne**: EPFL, startups, hospitality. IA: R&D automation, booking systems, data analysis.
- **Nyon**: Multinationals HQs, PME. IA: internal workflows, reporting, HR processes.
- **Fribourg**: Bilingual, agro, university. IA: production tracking, bilingual support, academic tools.
- **Sion**: Tourism, energy, viticulture. IA: booking optimization, energy monitoring, inventory.
- **Neuchatel**: Watchmaking, deeptech. IA: quality control, precision manufacturing, R&D.
- **Morges**: PME, commerce, viticulture. IA: e-commerce automation, stock management, CRM.
- **Montreux**: Tourism, hospitality, events. IA: reservation systems, event management, guest experience.

Each city gets 3 `iaUseCases` (short strings) and 3 `iaIndustries`, plus a `formationContext` paragraph.

- [ ] **Step 3: Commit**

```bash
git add src/lib/cities.ts
git commit -m "feat: enrich city data with IA use cases and formation context"
```

---

## Task 2: Add "IA & Automatisation" Section to City Page

**Files:**
- Modify: `src/app/agence-digitale/[ville]/page.tsx`

- [ ] **Step 1: Add IA services data constant**

After the existing SERVICES array, add:

```typescript
const IA_SERVICES = [
  { label: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia', desc: 'Agents intelligents 24h/24 pour automatiser vos processus metier.', Icon: Bot },
  { label: 'Automatisation', href: '/intelligence-artificielle/automatisation', desc: 'Workflows qui connectent vos outils et eliminent les taches manuelles.', Icon: Workflow },
  { label: 'Audit & Conseil IA', href: '/intelligence-artificielle/audit-conseil', desc: 'Identifiez les 3 actions IA a fort ROI pour votre entreprise.', Icon: BrainCircuit },
  { label: 'Integration LLM', href: '/intelligence-artificielle/mise-en-place', desc: 'ChatGPT, Claude et autres modeles integres dans votre stack existant.', Icon: Cpu },
]
```

Add imports: `Bot, Workflow, BrainCircuit, Cpu` from lucide-react.

- [ ] **Step 2: Add the IA section after "Services complets"**

New section between services and CTA intermediaire:

```tsx
{/* -- IA & Automatisation pour [ville] -- */}
<SectionReveal>
  <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
    <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: chrome.color }}>
          Intelligence artificielle
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          L'IA au service des entreprises de {city.name}
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {/* Dynamic text using city.economicProfile and iaUseCases */}
          Les entreprises de {city.name} ({city.economicProfile.split(',').slice(0,2).join(', ')}) 
          adoptent l'intelligence artificielle pour gagner en productivite. DKDP vous accompagne de l'audit a la mise en place.
        </p>
        {/* Use cases pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {city.iaUseCases.map(uc => (
            <span key={uc} className="px-3 py-1.5 rounded-lg text-xs font-medium border"
              style={{ color: chrome.color, borderColor: chrome.border, background: chrome.bg }}>
              {uc}
            </span>
          ))}
        </div>
        <LiquidMetalButton href="/intelligence-artificielle/audit-conseil" size="md">
          Audit IA gratuit →
        </LiquidMetalButton>
      </div>
      
      {/* IA services mini-grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {IA_SERVICES.map(s => (
          <Link key={s.href} href={s.href}
            className="group p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:border-white/20 duration-200"
            style={{ borderColor: chrome.border, background: chrome.bg }}>
            <s.Icon size={16} className="mb-2" style={{ color: chrome.color }} />
            <p className="text-white text-sm font-semibold mb-1">{s.label}</p>
            <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
</SectionReveal>
```

- [ ] **Step 3: Import chrome token and new icons**

Add to imports:
```typescript
import { chrome } from '@/lib/tokens'
import { Bot, Workflow, BrainCircuit, Cpu } from 'lucide-react' // add to existing
```

- [ ] **Step 4: Commit**

```bash
git add src/app/agence-digitale/[ville]/page.tsx
git commit -m "feat: add IA services section to city pages with local context"
```

---

## Task 3: Add "Formations" Section to City Page

**Files:**
- Modify: `src/app/agence-digitale/[ville]/page.tsx`

- [ ] **Step 1: Add formation programs data**

```typescript
const FORMATION_PROGRAMS = [
  { label: 'Formation IA', href: '/formation-entreprise/ia', desc: 'ChatGPT, Claude, prompt engineering et automatisation.', badge: 'Tendance' },
  { label: 'Formation Claude IA', href: '/formation-entreprise/claude-ai', desc: 'Maitriser Claude.ai, Projects et Claude Code.', badge: 'Nouveau' },
  { label: 'Cybersecurite', href: '/formation-entreprise/cybersecurite', desc: 'Sensibilisation et bonnes pratiques pour vos equipes.' },
  { label: 'Bureautique', href: '/formation-entreprise/bureautique', desc: 'Excel avance, Word, PowerPoint, Google Workspace.' },
  { label: 'Reseaux sociaux', href: '/formation-entreprise/reseaux-sociaux', desc: 'Strategie, contenu et outils pour vos reseaux.' },
  { label: 'Web design', href: '/formation-entreprise/web-design', desc: 'Canva, UI/UX et creation de visuels professionnels.' },
]
```

- [ ] **Step 2: Add formation section after IA section**

```tsx
{/* -- Formations pour [ville] -- */}
<SectionReveal>
  <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: orange.color }}>
      Formation entreprise
    </p>
    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
      Formez vos equipes a {city.name}
    </h2>
    <p className="text-text-secondary text-sm mb-4 max-w-xl">
      {city.formationContext}
    </p>
    
    {/* Pricing summary inline */}
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
        style={{ color: orange.color, borderColor: orange.border, background: orange.bg }}>
        Des CHF 150/h (1 pers.)
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
        style={{ color: orange.color, borderColor: orange.border, background: orange.bg }}>
        Demi-journee (4h) ou journee (8h)
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
        style={{ color: orange.color, borderColor: orange.border, background: orange.bg }}>
        Sur site ou en ligne
      </span>
    </div>
    
    {/* Formation cards grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {FORMATION_PROGRAMS.map(p => (
        <Link key={p.href} href={p.href}
          className="group p-4 rounded-xl border transition-all hover:-translate-y-0.5 hover:border-orange-500/40 duration-200"
          style={{ borderColor: orange.border, background: orange.bg }}>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-white text-sm font-semibold">{p.label}</p>
            {p.badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ color: orange.color, background: 'rgba(255,107,0,0.15)', border: `1px solid ${orange.border}` }}>
                {p.badge}
              </span>
            )}
          </div>
          <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
        </Link>
      ))}
    </div>
    
    <div className="mt-6 text-center">
      <Link href="/formation-entreprise"
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
        style={{ color: orange.color }}>
        Tous les programmes <ChevronRight size={14} />
      </Link>
    </div>
  </section>
</SectionReveal>
```

- [ ] **Step 3: Import orange token**

```typescript
import { violet, orange, chrome } from '@/lib/tokens'
```

- [ ] **Step 4: Commit**

```bash
git add src/app/agence-digitale/[ville]/page.tsx
git commit -m "feat: add formation programs section to city pages"
```

---

## Task 4: Enhance FAQ with City-Specific IA/Formation Questions

**Files:**
- Modify: `src/app/agence-digitale/[ville]/page.tsx`

- [ ] **Step 1: Add 4 new FAQ items per city**

Expand the `faq` array from 4 to 8 items by adding IA and formation questions that use city data dynamically:

```typescript
const faq = [
  // Existing 4 items...
  
  // NEW: IA-specific
  {
    question: `Quels secteurs a ${city.name} beneficient de l'intelligence artificielle ?`,
    answer: `A ${city.name}, les secteurs ${city.iaIndustries.join(', ')} sont les premiers a adopter l'IA. Les cas d'usage les plus demandes incluent ${city.iaUseCases.join(', ')}. DKDP propose un audit gratuit pour identifier les opportunites specifiques a votre activite.`,
  },
  {
    question: `DKDP propose-t-il des solutions d'automatisation pour les PME de ${city.name} ?`,
    answer: `Oui. Nos solutions d'automatisation sont accessibles a toutes les tailles d'entreprise. Pour les PME de ${city.name}, nous proposons des workflows sur mesure, des agents IA et l'integration de modeles comme ChatGPT ou Claude. Le retour sur investissement est visible en 1 a 3 mois.`,
  },
  // NEW: Formation-specific
  {
    question: `Quelles formations proposez-vous aux entreprises de ${city.name} ?`,
    answer: `Nous proposons 8 programmes de formation : IA generative, Claude AI, bureautique, cybersecurite, reseaux sociaux, web design, informatique et montage video. Les formations ont lieu dans vos locaux a ${city.name} ou en visioconference. Tarif : des CHF 150/h selon la taille du groupe.`,
  },
  {
    question: `Comment se deroule une formation DKDP a ${city.name} ?`,
    answer: `Un formateur se deplace dans vos locaux a ${city.name} (${city.distance}). La formation est 100% sur mesure : on travaille sur vos vrais outils et vos vrais cas. Formats : demi-journee (3h + 1h de preparation) ou journee entiere (6h + 2h de preparation). De 1 a 10 participants par session.`,
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/app/agence-digitale/[ville]/page.tsx
git commit -m "feat: add IA and formation FAQs to city pages"
```

---

## Task 5: Add Service Schema per City

**Files:**
- Modify: `src/lib/schema.ts`
- Modify: `src/app/agence-digitale/[ville]/page.tsx`

- [ ] **Step 1: Add buildCityServices schema helper**

In `src/lib/schema.ts`, add a function that generates an array of Service schemas for a given city:

```typescript
export function buildCityServices(cityName: string, citySlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Services DKDP a ${cityName}`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: `Creation de site web a ${cityName}`,
          provider: { '@type': 'Organization', name: 'DKDP' },
          areaServed: { '@type': 'City', name: cityName },
          url: `https://dkdp.ch/agence-digitale/creation-site-web`,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: `Intelligence artificielle et automatisation a ${cityName}`,
          provider: { '@type': 'Organization', name: 'DKDP' },
          areaServed: { '@type': 'City', name: cityName },
          url: `https://dkdp.ch/intelligence-artificielle`,
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: `Formation IA en entreprise a ${cityName}`,
          provider: { '@type': 'Organization', name: 'DKDP' },
          areaServed: { '@type': 'City', name: cityName },
          url: `https://dkdp.ch/formation-entreprise/ia`,
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'CHF',
            lowPrice: '150',
            highPrice: '300',
            offerCount: 4,
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          name: `Referencement SEO a ${cityName}`,
          provider: { '@type': 'Organization', name: 'DKDP' },
          areaServed: { '@type': 'City', name: cityName },
          url: `https://dkdp.ch/agence-digitale/seo`,
        },
      },
    ],
  }
}
```

- [ ] **Step 2: Add schema to city page**

In the city page, add after existing SchemaOrg tags:
```tsx
<SchemaOrg schema={buildCityServices(city.name, city.slug)} />
```

Import the new function in the page.

- [ ] **Step 3: Update metadata description to include IA/formation keywords**

```typescript
const description = `Agence digitale pour les entreprises de ${city.name} (${city.canton}). Creation de sites web, SEO, intelligence artificielle, automatisation et formation en entreprise. ${city.distance}. Devis gratuit.`
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/schema.ts src/app/agence-digitale/[ville]/page.tsx
git commit -m "feat: add Service schema and IA/formation meta to city pages"
```

---

## Task 6: Responsive Polish & UX Final Pass

**Files:**
- Modify: `src/app/agence-digitale/[ville]/page.tsx`

- [ ] **Step 1: Responsive audit and fix**

Ensure all new sections are mobile-first:
- IA section: stack vertically on mobile (`grid md:grid-cols-2` already handles this)
- Formation cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Pricing pills: `flex-wrap` with adequate `gap`
- Touch targets: all links/buttons min 44px height
- Text sizes: `text-sm` on mobile, scale up on md+
- Padding: `px-5` on mobile, `md:px-6` on desktop (consistent with existing sections)

- [ ] **Step 2: Visual consistency check**

- Section labels all use the same pattern: `text-xs font-semibold uppercase tracking-widest`
- Violet for digital services, chrome for IA, orange for formation
- Hover states: `hover:border-{color}/40` pattern on all cards
- SectionReveal wrapping each new section
- Proper border-t separators between sections

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Final commit and push**

```bash
git add -A
git commit -m "polish: responsive UX and visual consistency on city pages"
git push origin main
```

---

## Section Order (Final City Page Structure)

1. Hero (video/image + centered content)
2. Stats bar (4 metrics)
3. "Pourquoi nous faire confiance" (local context + service card)
4. "Nos services" (6 digital services grid)
5. **NEW: "IA & Automatisation"** (chrome themed, local use cases + 4 IA service cards)
6. **NEW: "Formations"** (orange themed, pricing pills + 6 formation cards)
7. CTA intermediaire (call booking)
8. Testimonials
9. FAQ (8 items: 4 existing + 2 IA + 2 formation)
10. Cross-city links
11. CTA Final

---

## SEO Impact Summary

| Metric | Before | After |
|--------|--------|-------|
| Keywords targeted per city page | ~5 (web, SEO, agence) | ~15 (+IA, automatisation, formation, LLM, audit) |
| Internal links from city pages | 6 (services only) | 16 (+4 IA + 6 formation) |
| FAQ items per page | 4 generic | 8 (4 generic + 4 local IA/formation) |
| Schema.org entities | 4 (business, breadcrumb, FAQ, page) | 5 (+ServiceList per city) |
| Formation pricing visible | No | Yes (inline badges) |
| Local IA context | None | Per-city use cases + industries |
| Meta description keywords | web, SEO, IA | web, SEO, IA, automatisation, formation |
