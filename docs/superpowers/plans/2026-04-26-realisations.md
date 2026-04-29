# Realisations DKDP : plan d'implementation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a real client showcase section for DKDP.ch with a hub page `/realisations`, detail pages `/realisations/[slug]`, a signature `BrowserFrame` component, a Playwright-based screenshot pipeline, and cross-linking from home, services, and Header mega menu.

**Architecture:** Next.js 16 App Router with Server Components by default, file-based data layer (1 TS file per realisation, mirrors blog pattern), `BrowserFrame` with CSS-only auto-scroll animation. No CMS, no iframe, fully static at build.

**Tech Stack:** Next.js 16.2.1, React 19.2.4, TypeScript, Tailwind 4, Vitest 4.1.2, Playwright 1.59.1 (already installed), `sharp` (to add), Framer Motion 12 (animations utilitaires), `schema-dts` for JSON-LD types.

**Source spec:** [docs/superpowers/specs/2026-04-26-realisations-design.md](../specs/2026-04-26-realisations-design.md)

---

## Pre-flight (read first, do not skip)

Before writing any code, the executing engineer MUST :

1. Read `node_modules/next/dist/docs/` for Next 16 conventions on `generateStaticParams`, `generateMetadata`, `redirect`, `notFound`, dynamic route params shape (`Promise<{ slug: string }>` in Next 16). Per `AGENTS.md`, this Next is NOT the Next you know.
2. Read `src/components/sections/FeaturedProject.tsx` (will be deleted) and `src/lib/blog/index.ts` (the pattern to mirror).
3. Read `src/lib/tokens.ts` for color tokens.
4. Read `src/lib/schema.ts` for builder patterns.
5. Read `src/app/blog/[slug]/page.tsx` for the dynamic route blueprint.
6. Confirm `npm install` is current and `npm run build` passes on `main`.

---

## File structure (locked-in decomposition)

### New files

```
src/lib/realisations/
  types.ts                          # all interfaces, slug regex
  index.ts                          # REALISATIONS, helpers
  goldencash-refonte.ts             # first realisation (Phase 1)
  __tests__/
    index.test.ts                   # integrity, getRelated, slug regex

src/components/realisations/
  BrowserFrame.tsx                  # signature visual component
  ProjectCard.tsx                   # grid card
  RealisationsGrid.tsx              # client wrapper for filter URL state
  FilterBar.tsx                     # tabs + chips
  RealisationHeader.tsx             # detail page header
  RealisationSubnav.tsx             # sticky anchors detail page
  ProblemBlock.tsx                  # detail section
  ApproachBlock.tsx                 # detail section + diagramHtml support
  StackChips.tsx                    # detail section
  ResultsGrid.tsx                   # detail tiles + sparklines
  GalleryGrid.tsx                   # detail captures
  TestimonialQuote.tsx              # detail section
  RelatedRealisations.tsx           # detail bottom
  FeaturedRealisations.tsx          # home replacement of FeaturedProject
  RealisationsForCategory.tsx       # services pages embed
  __tests__/
    BrowserFrame.test.tsx
    ProjectCard.test.tsx
    FilterBar.test.tsx
    ResultsGrid.test.tsx

src/app/realisations/
  page.tsx                          # hub
  [slug]/
    page.tsx                        # detail

tools/realisations/
  capture.mjs                       # Playwright + sharp pipeline
  README.md                         # usage

public/images/realisations/
  goldencash-refonte/               # populated by capture.mjs
```

### Modified files

```
src/lib/routes.ts                                            # +1 entry
src/app/sitemap.ts                                           # inject realisations slugs
src/lib/schema.ts                                            # +2 builders
src/app/page.tsx                                             # FeaturedProject -> FeaturedRealisations
src/components/layout/Header.tsx                             # mega menu Agence > Realisations
src/app/agence-digitale/creation-site-web/page.tsx           # embed RealisationsForCategory
src/app/intelligence-artificielle/chatbot-ia/page.tsx        # embed RealisationsForCategory
package.json                                                 # +sharp devDep
```

### Deleted files

```
src/components/sections/FeaturedProject.tsx
src/components/sections/__tests__/FeaturedProject.test.tsx
```

---

## Phase 1 : Data foundations

### Task 1 : Type system

**Files:**
- Create: `src/lib/realisations/types.ts`

- [ ] **Step 1.1 : Write the failing test for slug regex**

Create `src/lib/realisations/__tests__/types.test.ts` :

```ts
import { describe, it, expect } from 'vitest'
import { SLUG_REGEX } from '../types'

describe('SLUG_REGEX', () => {
  it('accepts valid kebab slugs with at least two parts', () => {
    expect(SLUG_REGEX.test('goldencash-refonte')).toBe(true)
    expect(SLUG_REGEX.test('cours-informatique-creation')).toBe(true)
    expect(SLUG_REGEX.test('mkr-camp-brand-site')).toBe(true)
  })

  it('rejects single-segment, accents, uppercase, or trailing dash', () => {
    expect(SLUG_REGEX.test('goldencash')).toBe(false)
    expect(SLUG_REGEX.test('GoldenCash-refonte')).toBe(false)
    expect(SLUG_REGEX.test('refonte-goldencash-')).toBe(false)
    expect(SLUG_REGEX.test('cafe-latte')).toBe(true)
    expect(SLUG_REGEX.test('café-latté')).toBe(false)
  })
})
```

- [ ] **Step 1.2 : Run test, expect fail**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients Claude/DKDP/DKDP refonte/dkdp"
npx vitest run src/lib/realisations/__tests__/types.test.ts
```

Expected : FAIL with `Cannot find module '../types'`.

- [ ] **Step 1.3 : Create `types.ts`**

```ts
/**
 * Source de verite des realisations DKDP.
 * Pattern aligne sur src/lib/blog/types.ts
 */

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)+$/

export type RealisationCategory = 'site-web' | 'projet-ia' | 'site-web-ia'
export type RealisationStatus = 'live' | 'archived' | 'private'
export type StackColor =
  | 'violet' | 'orange' | 'chrome' | 'green'
  | 'blue' | 'pink' | 'teal' | 'amber'

export interface RealisationClient {
  name: string
  logo?: string
  sector: string
  location?: string
  anonymized?: boolean
}

export interface RealisationMeta {
  title: string
  excerpt: string
  dateISO: string
  status: RealisationStatus
}

export interface RealisationHero {
  desktopFull: string
  mobileFull?: string
  browserUrl: string
}

export interface RealisationProblem {
  title: string
  body: string
  illustration?: { src: string; alt: string; caption?: string }
}

export interface RealisationApproach {
  title: string
  body: string
  bullets?: string[]
  diagramHtml?: string
}

export interface RealisationStackChip {
  label: string
  color: StackColor
}

export interface RealisationResult {
  metric: string
  value: string
  label: string
  trend?: number[]
}

export interface RealisationTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface RealisationGalleryItem {
  src: string
  alt: string
  caption?: string
}

export interface Realisation {
  slug: string
  client: RealisationClient
  meta: RealisationMeta
  category: RealisationCategory
  tags: string[]
  hero: RealisationHero
  problem: RealisationProblem
  approach: RealisationApproach
  stack?: RealisationStackChip[]
  results?: RealisationResult[]
  testimonial?: RealisationTestimonial
  gallery?: RealisationGalleryItem[]
  liveUrl?: string
}
```

- [ ] **Step 1.4 : Run test, expect pass**

```bash
npx vitest run src/lib/realisations/__tests__/types.test.ts
```

Expected : PASS, 2 tests.

- [ ] **Step 1.5 : Commit**

```bash
git add src/lib/realisations/types.ts src/lib/realisations/__tests__/types.test.ts
git commit -m "feat(realisations): add type system and slug regex"
```

---

### Task 2 : Index helpers

**Files:**
- Create: `src/lib/realisations/index.ts`
- Test: `src/lib/realisations/__tests__/index.test.ts`

- [ ] **Step 2.1 : Write the failing test**

```ts
// src/lib/realisations/__tests__/index.test.ts
import { describe, it, expect } from 'vitest'
import {
  REALISATIONS,
  getRealisation,
  getByCategory,
  getByTag,
  getRelated,
} from '../index'
import { SLUG_REGEX } from '../types'

describe('REALISATIONS integrity', () => {
  it('every slug matches SLUG_REGEX', () => {
    for (const r of REALISATIONS) {
      expect(SLUG_REGEX.test(r.slug)).toBe(true)
    }
  })

  it('every dateISO parses to a valid Date', () => {
    for (const r of REALISATIONS) {
      const d = new Date(r.meta.dateISO)
      expect(Number.isNaN(d.getTime())).toBe(false)
    }
  })

  it('every liveUrl when present is https', () => {
    for (const r of REALISATIONS) {
      if (r.liveUrl) {
        expect(r.liveUrl.startsWith('https://')).toBe(true)
      }
    }
  })

  it('slugs are unique', () => {
    const slugs = REALISATIONS.map(r => r.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('helpers', () => {
  it('getRealisation returns null for unknown slug', () => {
    expect(getRealisation('does-not-exist')).toBeNull()
  })

  it('getByCategory returns only matching items', () => {
    const items = getByCategory('site-web')
    expect(items.every(r => r.category === 'site-web')).toBe(true)
  })

  it('getByTag returns only items containing tag', () => {
    const items = getByTag('Refonte')
    expect(items.every(r => r.tags.includes('Refonte'))).toBe(true)
  })

  it('getRelated excludes self and private/archived', () => {
    if (REALISATIONS.length === 0) return
    const slug = REALISATIONS[0].slug
    const related = getRelated(slug, 5)
    expect(related.find(r => r.slug === slug)).toBeUndefined()
    expect(related.every(r => r.meta.status === 'live')).toBe(true)
  })
})
```

- [ ] **Step 2.2 : Run test, expect fail**

```bash
npx vitest run src/lib/realisations/__tests__/index.test.ts
```

Expected : FAIL with `Cannot find module '../index'`.

- [ ] **Step 2.3 : Create `index.ts` with empty array (for now)**

```ts
import type { Realisation, RealisationCategory } from './types'

export const REALISATIONS: Realisation[] = []

export const FEATURED_SLUGS: string[] = []

export function getRealisation(slug: string): Realisation | null {
  return REALISATIONS.find(r => r.slug === slug) ?? null
}

export function getByCategory(category: RealisationCategory): Realisation[] {
  return REALISATIONS.filter(r => r.category === category)
}

export function getByTag(tag: string): Realisation[] {
  return REALISATIONS.filter(r => r.tags.includes(tag))
}

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

export type { Realisation, RealisationCategory } from './types'
```

- [ ] **Step 2.4 : Run test, expect pass**

```bash
npx vitest run src/lib/realisations/__tests__/index.test.ts
```

Expected : PASS, 8 tests (REALISATIONS empty so iterate-tests pass trivially; helpers safe on empty).

- [ ] **Step 2.5 : Commit**

```bash
git add src/lib/realisations/index.ts src/lib/realisations/__tests__/index.test.ts
git commit -m "feat(realisations): add index with helpers and integrity tests"
```

---

### Task 3 : Add `/realisations` to routes.ts

**Files:**
- Modify: `src/lib/routes.ts`

- [ ] **Step 3.1 : Add route entry**

Insert in `ROUTES` after the `/blog` entry, before `/glossaire` :

```ts
  // ─── Realisations ─────────────────────────────────────────────────────────
  { url: '/realisations', priority: 0.80, changeFrequency: 'monthly' },
```

- [ ] **Step 3.2 : Verify no test regression**

```bash
npx vitest run
```

Expected : all existing tests pass, no new failures.

- [ ] **Step 3.3 : Commit**

```bash
git add src/lib/routes.ts
git commit -m "feat(routes): add /realisations to source of truth"
```

---

### Task 4 : Sitemap dynamic injection

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 4.1 : Read current sitemap.ts**

Open `src/app/sitemap.ts` to see how blog articles are injected (the same pattern is reused).

- [ ] **Step 4.2 : Add realisations injection**

After the existing blog loop, add :

```ts
import { REALISATIONS } from '@/lib/realisations'

// ... existing code ...

// Inject realisation detail pages (live only, exclude private and archived)
for (const r of REALISATIONS) {
  if (r.meta.status !== 'live') continue
  entries.push({
    url: `${SITE_URL}/realisations/${r.slug}`,
    lastModified: new Date(r.meta.dateISO),
    changeFrequency: 'monthly',
    priority: 0.70,
  })
}
```

(adapter le nom de la variable `entries` selon le code existant)

- [ ] **Step 4.3 : Verify build**

```bash
npm run build
```

Expected : build succeeds, no TS errors.

- [ ] **Step 4.4 : Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(sitemap): inject realisation detail pages dynamically"
```

---

## Phase 2 : `BrowserFrame` signature component

### Task 5 : `BrowserFrame` skeleton with chrome

**Files:**
- Create: `src/components/realisations/BrowserFrame.tsx`
- Test: `src/components/realisations/__tests__/BrowserFrame.test.tsx`

- [ ] **Step 5.1 : Write the failing test**

```tsx
// src/components/realisations/__tests__/BrowserFrame.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserFrame } from '../BrowserFrame'

describe('BrowserFrame', () => {
  it('renders the three traffic-light dots', () => {
    const { container } = render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com"
      />
    )
    const dots = container.querySelectorAll('[data-browser-dot]')
    expect(dots.length).toBe(3)
  })

  it('renders the browser URL in the address bar', () => {
    render(
      <BrowserFrame src="/test.webp" alt="Test" browserUrl="goldencash.ch" />
    )
    expect(screen.getByText('goldencash.ch')).toBeInTheDocument()
  })

  it('truncates long URLs with ellipsis', () => {
    render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com/this/is/a/very/long/path/that/should/be/truncated"
      />
    )
    const urlEl = screen.getByTestId('browser-url')
    expect(urlEl.textContent).toContain('...')
  })

  it('renders fallback when src is empty', () => {
    render(<BrowserFrame src="" alt="Goldencash" browserUrl="goldencash.ch" />)
    expect(screen.getByText(/Capture indisponible/i)).toBeInTheDocument()
  })

  it('applies card aspect ratio by default', () => {
    const { container } = render(
      <BrowserFrame src="/test.webp" alt="Test" browserUrl="example.com" />
    )
    const frame = container.querySelector('[data-browser-frame]')
    expect(frame?.className).toContain('aspect-[16/10]')
  })

  it('applies hero variant aspect ratio when variant=hero', () => {
    const { container } = render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com"
        variant="hero"
      />
    )
    const frame = container.querySelector('[data-browser-frame]')
    expect(frame?.className).toContain('aspect-[16/9]')
  })
})
```

- [ ] **Step 5.2 : Run test, expect fail**

```bash
npx vitest run src/components/realisations/__tests__/BrowserFrame.test.tsx
```

Expected : FAIL `Cannot find module '../BrowserFrame'`.

- [ ] **Step 5.3 : Implement minimal `BrowserFrame.tsx`**

```tsx
'use client'
import { useId } from 'react'
import { clsx } from 'clsx'

export type BrowserFrameProps = {
  src: string
  alt: string
  browserUrl: string
  variant?: 'card' | 'hero'
  trigger?: 'hover' | 'visible'
  scrollDuration?: number
  className?: string
}

const MAX_URL = 32

function truncateUrl(url: string): string {
  if (url.length <= MAX_URL) return url
  const head = url.slice(0, 18)
  const tail = url.slice(-10)
  return `${head}...${tail}`
}

export function BrowserFrame({
  src,
  alt,
  browserUrl,
  variant = 'card',
  className,
}: BrowserFrameProps) {
  const headingId = useId()
  const aspectClass =
    variant === 'hero'
      ? 'aspect-[4/5] md:aspect-[16/9]'
      : 'aspect-[16/10]'

  return (
    <div
      data-browser-frame
      className={clsx(
        'relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0E0E10]',
        aspectClass,
        className,
      )}
      aria-labelledby={headingId}
    >
      {/* Chrome bar */}
      <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-[#1B1B1F] px-3">
        <div className="flex gap-1.5">
          <span data-browser-dot className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span data-browser-dot className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span data-browser-dot className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div
          data-testid="browser-url"
          className="ml-2 flex-1 truncate rounded-md bg-[#0E0E10]/60 px-3 py-1 text-[11px] font-mono text-white/60"
        >
          🔒 {truncateUrl(browserUrl)}
        </div>
      </div>

      {/* Viewport */}
      <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
        {src ? (
          <img
            id={headingId}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block w-full select-none"
          />
        ) : (
          <FallbackPlaceholder label={alt} />
        )}
      </div>
    </div>
  )
}

function FallbackPlaceholder({ label }: { label: string }) {
  const initial = label.trim()[0]?.toUpperCase() ?? '?'
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1029] to-[#0A0A0F]">
      <span className="text-6xl font-bold text-violet-300/60">{initial}</span>
      <span className="mt-2 text-xs text-white/40">Capture indisponible</span>
    </div>
  )
}
```

- [ ] **Step 5.4 : Run test, expect pass**

```bash
npx vitest run src/components/realisations/__tests__/BrowserFrame.test.tsx
```

Expected : PASS, 6 tests.

- [ ] **Step 5.5 : Commit**

```bash
git add src/components/realisations/BrowserFrame.tsx src/components/realisations/__tests__/BrowserFrame.test.tsx
git commit -m "feat(realisations): add BrowserFrame skeleton with chrome and fallback"
```

---

### Task 6 : `BrowserFrame` auto-scroll animation

**Files:**
- Modify: `src/components/realisations/BrowserFrame.tsx`

- [ ] **Step 6.1 : Add scroll animation logic**

Replace the viewport `<img>` block with an animated container :

```tsx
{src ? (
  <div
    className={clsx(
      'absolute inset-x-0 top-0',
      'group-hover:[animation:browserScroll_var(--scroll-duration,12s)_ease-in-out_infinite]',
      'motion-reduce:!animate-none',
    )}
    style={{ '--scroll-duration': `${scrollDuration ?? 12}s` } as React.CSSProperties}
  >
    <img
      id={headingId}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="block w-full select-none"
    />
  </div>
) : (
  <FallbackPlaceholder label={alt} />
)}
```

Wrap the outer `<div data-browser-frame>` with the `group` class so `group-hover:` resolves on hover :

```tsx
<div
  data-browser-frame
  className={clsx(
    'group relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0E0E10]',
    aspectClass,
    className,
  )}
  ...
>
```

- [ ] **Step 6.2 : Add the keyframes in `src/app/globals.css`**

Append at the end of the file (or in the `@layer utilities` block) :

```css
@keyframes browserScroll {
  0%   { transform: translateY(0); }
  10%  { transform: translateY(0); }
  50%  { transform: translateY(calc(-100% + 100vh)); }
  60%  { transform: translateY(calc(-100% + 100vh)); }
  100% { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  [data-browser-frame] [class*="browserScroll"] {
    animation: none !important;
  }
}
```

Note : `100vh` est un fallback, dans le contenu reel on utilisera plutot un calcul base sur la hauteur viewport du frame. Si le LCP en souffre, remplacer par un `--frame-h` en CSS variable et passer la hauteur reelle. A reevaluer apres premiere mise en prod.

- [ ] **Step 6.3 : Run test**

```bash
npx vitest run src/components/realisations/__tests__/BrowserFrame.test.tsx
```

Expected : 6 tests passent toujours (les tests ne verifient pas l'animation specifiquement).

- [ ] **Step 6.4 : Visual smoke test**

```bash
npm run dev
```

Ouvrir une page brouillon (a creer en step 6.5 ou tester via Storybook ad-hoc), survoler la card, verifier que l'image scroll. Tester avec `prefers-reduced-motion` actif (DevTools rendering tab) : pas de scroll.

- [ ] **Step 6.5 : Add a temporary test page (will be removed in Task 18)**

Create `src/app/realisations/_dev/page.tsx` :

```tsx
import { BrowserFrame } from '@/components/realisations/BrowserFrame'

export default function DevPage() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-12 p-12">
      <h1 className="text-3xl font-bold text-white">BrowserFrame dev preview</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <BrowserFrame
          src="/images/blog/seo-local-geneve-2026-hero.png"
          alt="Test image fullpage"
          browserUrl="example.ch"
          variant="card"
        />
        <BrowserFrame
          src=""
          alt="Goldencash"
          browserUrl="goldencash.ch"
          variant="hero"
        />
      </div>
    </div>
  )
}
```

Visit `http://localhost:3000/realisations/_dev` in the browser.

- [ ] **Step 6.6 : Commit**

```bash
git add src/components/realisations/BrowserFrame.tsx src/app/globals.css src/app/realisations/_dev/page.tsx
git commit -m "feat(BrowserFrame): add CSS-only auto-scroll animation on hover with reduced-motion support"
```

---

### Task 7 : `BrowserFrame` mobile IO trigger and image-too-short guard

**Files:**
- Modify: `src/components/realisations/BrowserFrame.tsx`

- [ ] **Step 7.1 : Detect mobile via media query and switch trigger**

Add inside `BrowserFrame` :

```tsx
import { useEffect, useRef, useState } from 'react'

// ... inside component
const ref = useRef<HTMLDivElement>(null)
const [shouldAutoscroll, setShouldAutoscroll] = useState(false)

useEffect(() => {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches
  if (!isCoarse || trigger !== 'visible') return

  const node = ref.current
  if (!node) return

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.6) {
          setShouldAutoscroll(true)
          io.disconnect()
        }
      })
    },
    { threshold: 0.6 },
  )
  io.observe(node)
  return () => io.disconnect()
}, [trigger])
```

Apply via class :

```tsx
<div
  ref={ref}
  data-browser-frame
  className={clsx(
    'group ...',
    shouldAutoscroll && 'browser-frame-autoscroll',
  )}
>
```

Update CSS to support both triggers :

```css
.browser-frame-autoscroll [class*="browserScroll"],
[data-browser-frame]:hover [class*="browserScroll"] {
  animation: browserScroll var(--scroll-duration, 12s) ease-in-out infinite;
}
```

- [ ] **Step 7.2 : Run test**

```bash
npx vitest run src/components/realisations/__tests__/BrowserFrame.test.tsx
```

Expected : PASS.

- [ ] **Step 7.3 : Commit**

```bash
git add src/components/realisations/BrowserFrame.tsx src/app/globals.css
git commit -m "feat(BrowserFrame): mobile autoscroll via IntersectionObserver"
```

---

## Phase 3 : Hub page `/realisations`

### Task 8 : `ProjectCard`

**Files:**
- Create: `src/components/realisations/ProjectCard.tsx`
- Test: `src/components/realisations/__tests__/ProjectCard.test.tsx`

- [ ] **Step 8.1 : Write failing test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../ProjectCard'
import type { Realisation } from '@/lib/realisations/types'

const baseRealisation: Realisation = {
  slug: 'test-projet',
  client: { name: 'Test Client', sector: 'Test sector' },
  meta: {
    title: 'Refonte test',
    excerpt: 'Excerpt court',
    dateISO: '2026-01-01',
    status: 'live',
  },
  category: 'site-web',
  tags: ['Refonte'],
  hero: { desktopFull: '/test.webp', browserUrl: 'test.ch' },
  problem: { title: 'P', body: 'B' },
  approach: { title: 'A', body: 'B' },
  liveUrl: 'https://test.ch',
}

describe('ProjectCard', () => {
  it('links to /realisations/[slug]', () => {
    render(<ProjectCard realisation={baseRealisation} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/realisations/test-projet')
  })

  it('shows client name and sector', () => {
    render(<ProjectCard realisation={baseRealisation} />)
    expect(screen.getByText('Test Client')).toBeInTheDocument()
    expect(screen.getByText(/Test sector/)).toBeInTheDocument()
  })

  it('shows "Captures uniquement" when liveUrl is undefined', () => {
    render(
      <ProjectCard realisation={{ ...baseRealisation, liveUrl: undefined }} />
    )
    expect(screen.getByText(/Captures uniquement/i)).toBeInTheDocument()
  })

  it('renders initials chip when client has no logo', () => {
    render(<ProjectCard realisation={baseRealisation} />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('hides client name when anonymized but shows generic chip', () => {
    render(
      <ProjectCard
        realisation={{
          ...baseRealisation,
          client: { ...baseRealisation.client, anonymized: true, name: 'Cabinet juridique' },
        }}
      />
    )
    expect(screen.getByText('Cabinet juridique')).toBeInTheDocument()
  })
})
```

- [ ] **Step 8.2 : Run, expect fail**

```bash
npx vitest run src/components/realisations/__tests__/ProjectCard.test.tsx
```

- [ ] **Step 8.3 : Implement `ProjectCard.tsx`**

```tsx
import Link from 'next/link'
import { BrowserFrame } from './BrowserFrame'
import type { Realisation } from '@/lib/realisations/types'

export type ProjectCardProps = {
  realisation: Realisation
}

export function ProjectCard({ realisation: r }: ProjectCardProps) {
  const featuredMetric = r.results?.[0]
  const initial = r.client.name.trim()[0]?.toUpperCase() ?? '?'

  return (
    <Link
      href={`/realisations/${r.slug}`}
      className="group block rounded-2xl bg-bg-card transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    >
      <BrowserFrame
        src={r.hero.desktopFull}
        alt={`${r.client.name} : ${r.meta.title}`}
        browserUrl={r.hero.browserUrl}
        variant="card"
        trigger="hover"
      />

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          {r.client.logo && !r.client.anonymized ? (
            <img
              src={r.client.logo}
              alt={r.client.name}
              className="h-6 w-auto opacity-80"
            />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15 text-xs font-bold text-violet-300">
              {initial}
            </span>
          )}
          <span className="text-xs text-text-muted">
            {r.client.name} · {r.client.sector}
            {r.client.location ? ` · ${r.client.location}` : ''}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-text-primary">
          {r.meta.title}
        </h3>

        <p className="line-clamp-1 text-sm text-text-secondary">{r.meta.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {r.tags.slice(0, 3).map(t => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          {featuredMetric ? (
            <span className="text-xs font-semibold text-violet-300">
              {featuredMetric.value}
            </span>
          ) : !r.liveUrl ? (
            <span className="text-[10px] uppercase tracking-wide text-text-muted">
              Captures uniquement
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 8.4 : Run test, expect pass**

```bash
npx vitest run src/components/realisations/__tests__/ProjectCard.test.tsx
```

- [ ] **Step 8.5 : Commit**

```bash
git add src/components/realisations/ProjectCard.tsx src/components/realisations/__tests__/ProjectCard.test.tsx
git commit -m "feat(realisations): add ProjectCard with logo fallback and metric badge"
```

---

### Task 9 : `FilterBar`

**Files:**
- Create: `src/components/realisations/FilterBar.tsx`
- Test: `src/components/realisations/__tests__/FilterBar.test.tsx`

- [ ] **Step 9.1 : Write failing test**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterBar } from '../FilterBar'

describe('FilterBar', () => {
  it('renders the four category tabs', () => {
    render(
      <FilterBar
        category="all"
        availableTags={['Refonte', 'Chatbot']}
        activeTag={null}
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Tous' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sites web' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Projets IA' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sites + IA' })).toBeInTheDocument()
  })

  it('calls onChange with new category when a tab is clicked', () => {
    const onChange = vi.fn()
    render(
      <FilterBar
        category="all"
        availableTags={[]}
        activeTag={null}
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Sites web' }))
    expect(onChange).toHaveBeenCalledWith({ category: 'site-web', tag: null })
  })

  it('renders available tag chips', () => {
    render(
      <FilterBar
        category="all"
        availableTags={['Refonte', 'SEO local']}
        activeTag={null}
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Refonte' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SEO local' })).toBeInTheDocument()
  })

  it('shows reset button when filters are active', () => {
    render(
      <FilterBar
        category="site-web"
        availableTags={[]}
        activeTag="Refonte"
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: /Reinitialiser/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 9.2 : Run, expect fail**

```bash
npx vitest run src/components/realisations/__tests__/FilterBar.test.tsx
```

- [ ] **Step 9.3 : Implement `FilterBar.tsx`**

```tsx
'use client'
import { clsx } from 'clsx'

export type FilterValue = {
  category: 'all' | 'site-web' | 'projet-ia' | 'site-web-ia'
  tag: string | null
}

export type FilterBarProps = {
  category: FilterValue['category']
  activeTag: string | null
  availableTags: string[]
  onChange: (next: FilterValue) => void
}

const CATEGORY_TABS: { key: FilterValue['category']; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'site-web', label: 'Sites web' },
  { key: 'projet-ia', label: 'Projets IA' },
  { key: 'site-web-ia', label: 'Sites + IA' },
]

export function FilterBar({
  category,
  activeTag,
  availableTags,
  onChange,
}: FilterBarProps) {
  const hasFilters = category !== 'all' || activeTag !== null

  return (
    <div className="sticky top-[66px] z-30 -mx-6 border-b border-white/5 bg-[#0A0A0A]/85 px-6 py-3 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2">
        <div className="flex gap-1.5" role="tablist">
          {CATEGORY_TABS.map(t => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={category === t.key}
              onClick={() => onChange({ category: t.key, tag: activeTag })}
              className={clsx(
                'rounded-full px-3 py-1.5 text-sm font-medium transition',
                category === t.key
                  ? 'bg-violet-500/20 text-violet-200'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          {availableTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                onChange({ category, tag: activeTag === tag ? null : tag })
              }
              className={clsx(
                'rounded-full border px-2.5 py-1 text-xs uppercase tracking-wide transition',
                activeTag === tag
                  ? 'border-violet-400/50 bg-violet-500/10 text-violet-200'
                  : 'border-white/10 text-text-muted hover:border-white/20 hover:text-text-secondary',
              )}
            >
              {tag}
            </button>
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={() => onChange({ category: 'all', tag: null })}
              className="rounded-full px-2.5 py-1 text-xs text-text-muted underline-offset-2 hover:text-text-primary hover:underline"
            >
              Reinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 9.4 : Run test, expect pass**

```bash
npx vitest run src/components/realisations/__tests__/FilterBar.test.tsx
```

- [ ] **Step 9.5 : Commit**

```bash
git add src/components/realisations/FilterBar.tsx src/components/realisations/__tests__/FilterBar.test.tsx
git commit -m "feat(realisations): add FilterBar with category tabs and tag chips"
```

---

### Task 10 : `RealisationsGrid` with URL state

**Files:**
- Create: `src/components/realisations/RealisationsGrid.tsx`

- [ ] **Step 10.1 : Implement client component reading and writing search params**

```tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ProjectCard } from './ProjectCard'
import { FilterBar, type FilterValue } from './FilterBar'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { Realisation } from '@/lib/realisations/types'

type Props = { items: Realisation[] }

export function RealisationsGrid({ items }: Props) {
  const router = useRouter()
  const params = useSearchParams()

  const category = (params.get('cat') ?? 'all') as FilterValue['category']
  const tag = params.get('tag')

  const availableTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of items) for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t]) => t)
  }, [items])

  const filtered = useMemo(() => {
    return items.filter(r => {
      if (category !== 'all' && r.category !== category) return false
      if (tag && !r.tags.includes(tag)) return false
      return true
    })
  }, [items, category, tag])

  function setFilter(next: FilterValue) {
    const sp = new URLSearchParams()
    if (next.category !== 'all') sp.set('cat', next.category)
    if (next.tag) sp.set('tag', next.tag)
    const qs = sp.toString()
    router.replace(`/realisations${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  return (
    <>
      <FilterBar
        category={category}
        activeTag={tag}
        availableTags={availableTags}
        onChange={setFilter}
      />

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg text-text-secondary">
              Aucune realisation pour ce filtre.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:bg-white/5"
              onClick={() => setFilter({ category: 'all', tag: null })}
            >
              Reinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <SectionReveal key={r.slug} delay={Math.min(i, 7) * 0.05}>
                <ProjectCard realisation={r} />
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 10.2 : Verify build**

```bash
npm run build
```

- [ ] **Step 10.3 : Commit**

```bash
git add src/components/realisations/RealisationsGrid.tsx
git commit -m "feat(realisations): add RealisationsGrid with URL-state filters"
```

---

### Task 11 : Hub page `/realisations`

**Files:**
- Create: `src/app/realisations/page.tsx`

- [ ] **Step 11.1 : Implement page**

```tsx
import type { Metadata } from 'next'
import { RealisationsGrid } from '@/components/realisations/RealisationsGrid'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildRealisationsCollection } from '@/lib/schema'
import { REALISATIONS } from '@/lib/realisations'

export const metadata: Metadata = {
  title: 'Realisations DKDP : nos sites web et projets IA livres | Geneve',
  description:
    'Etudes de cas client DKDP : sites web, refontes, chatbots IA, automatisations. PME suisses, resultats mesures, captures et retours d\'experience.',
  alternates: { canonical: 'https://dkdp.ch/realisations' },
  openGraph: {
    title: 'Realisations DKDP',
    description: 'Sites web et projets IA livres pour PME suisses.',
    url: 'https://dkdp.ch/realisations',
    images: [{ url: '/og-realisations.png', width: 1200, height: 630, alt: 'Realisations DKDP' }],
  },
}

export default function RealisationsHubPage() {
  const liveItems = REALISATIONS.filter(r => r.meta.status === 'live')
  const sectorsCount = new Set(liveItems.map(r => r.client.sector)).size

  return (
    <>
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch/' },
        { name: 'Realisations', url: 'https://dkdp.ch/realisations' },
      ])} />
      <SchemaOrg schema={buildRealisationsCollection({ items: liveItems })} />

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <GradTag>Realisations</GradTag>
          <h1 className="mt-6 text-4xl tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
            <GradText as="span">Etudes de cas client</GradText>
          </h1>
          <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">
            Sites livres et systemes IA deployes pour des PME suisses. Chaque
            realisation documente le contexte initial, l'approche retenue et les
            resultats mesures.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-text-muted">
            <span><b className="text-violet-300">{liveItems.length}</b> projets</span>
            <span><b className="text-violet-300">{sectorsCount}</b> secteurs</span>
            <span><b className="text-violet-300">5</b> annees</span>
          </div>
        </div>
      </section>

      <RealisationsGrid items={liveItems} />

      <CTAFinal />
    </>
  )
}
```

- [ ] **Step 11.2 : Add `buildRealisationsCollection` to `src/lib/schema.ts`**

```ts
import type { Realisation } from './realisations/types'

const SITE = 'https://dkdp.ch'

export function buildRealisationsCollection(input: { items: Realisation[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Realisations DKDP',
    url: `${SITE}/realisations`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE}/realisations/${r.slug}`,
        name: `${r.client.name} : ${r.meta.title}`,
      })),
    },
  } as const
}
```

- [ ] **Step 11.3 : Build**

```bash
npm run build
```

Expected : page builds successfully, prerender for `/realisations` is generated.

- [ ] **Step 11.4 : Commit**

```bash
git add src/app/realisations/page.tsx src/lib/schema.ts
git commit -m "feat(realisations): hub page /realisations with hero, grid and CollectionPage schema"
```

---

## Phase 4 : Detail page `/realisations/[slug]`

### Task 12 : Detail blocks (sub-components)

**Files:**
- Create: 6 files in `src/components/realisations/`

- [ ] **Step 12.1 : Create `RealisationHeader.tsx`**

```tsx
import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import type { Realisation } from '@/lib/realisations/types'

const CATEGORY_LABEL: Record<Realisation['category'], string> = {
  'site-web': 'Site web',
  'projet-ia': 'Projet IA',
  'site-web-ia': 'Site + IA',
}

export function RealisationHeader({ r }: { r: Realisation }) {
  return (
    <header className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-primary">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/realisations" className="hover:text-text-primary">Realisations</Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{r.client.name}</span>
      </nav>

      <GradTag>{CATEGORY_LABEL[r.category]}</GradTag>

      <h1 className="mt-6 text-4xl tracking-[-0.02em] leading-[1.05] text-white md:text-5xl lg:text-6xl">
        {r.client.name} : {r.meta.title}
      </h1>

      <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">
        {r.meta.excerpt}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-text-muted">
        <span>{r.client.sector}</span>
        {r.client.location && <><span>·</span><span>{r.client.location}</span></>}
        <span>·</span>
        <span>Livre {new Date(r.meta.dateISO).toLocaleDateString('fr-CH', { month: 'long', year: 'numeric' })}</span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {r.liveUrl && (
          <a
            href={r.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Visiter le site →
          </a>
        )}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          Lancer mon projet
        </Link>
      </div>
    </header>
  )
}
```

- [ ] **Step 12.2 : Create `ProblemBlock.tsx`**

```tsx
import type { Realisation } from '@/lib/realisations/types'

export function ProblemBlock({ problem }: { problem: Realisation['problem'] }) {
  return (
    <section id="contexte" className="scroll-mt-[124px] py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Le contexte
        </h2>
        <h3 className="mt-3 text-xl text-violet-300">{problem.title}</h3>
        <p className="mt-6 text-[17px] leading-[1.7] text-text-secondary md:text-lg">
          {problem.body}
        </p>
        {problem.illustration && (
          <figure className="mt-12">
            <img
              src={problem.illustration.src}
              alt={problem.illustration.alt}
              loading="lazy"
              className="rounded-xl border border-white/10"
            />
            {problem.illustration.caption && (
              <figcaption className="mt-3 text-sm italic text-text-muted">
                {problem.illustration.caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 12.3 : Create `ApproachBlock.tsx`**

```tsx
import type { Realisation } from '@/lib/realisations/types'

export function ApproachBlock({ approach }: { approach: Realisation['approach'] }) {
  return (
    <section id="approche" className="scroll-mt-[124px] border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Notre approche
        </h2>
        <h3 className="mt-3 text-xl text-violet-300">{approach.title}</h3>
        <p className="mt-6 text-[17px] leading-[1.7] text-text-secondary md:text-lg">
          {approach.body}
        </p>
        {approach.bullets && approach.bullets.length > 0 && (
          <ul className="mt-8 space-y-3">
            {approach.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[17px] leading-[1.7] text-text-secondary">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {approach.diagramHtml && (
          <div
            className="mt-12"
            // pass-through HTML diagram, content controlled in TS file
            dangerouslySetInnerHTML={{ __html: approach.diagramHtml }}
          />
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 12.4 : Create `StackChips.tsx`**

```tsx
import { clsx } from 'clsx'
import type { RealisationStackChip, StackColor } from '@/lib/realisations/types'

const COLOR_CLASSES: Record<StackColor, string> = {
  violet: 'border-violet-500/40 bg-violet-500/10 text-violet-200',
  orange: 'border-orange-500/40 bg-orange-500/10 text-orange-200',
  chrome: 'border-zinc-500/40 bg-zinc-500/10 text-zinc-200',
  green:  'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  blue:   'border-sky-500/40 bg-sky-500/10 text-sky-200',
  pink:   'border-pink-500/40 bg-pink-500/10 text-pink-200',
  teal:   'border-teal-500/40 bg-teal-500/10 text-teal-200',
  amber:  'border-amber-500/40 bg-amber-500/10 text-amber-200',
}

export function StackChips({ chips }: { chips: RealisationStackChip[] }) {
  return (
    <section id="stack" className="scroll-mt-[124px] py-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-sm uppercase tracking-wide text-text-muted">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span
              key={i}
              className={clsx(
                'rounded-full border px-3 py-1 text-sm',
                COLOR_CLASSES[c.color],
              )}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12.5 : Create `ResultsGrid.tsx`**

```tsx
import type { RealisationResult } from '@/lib/realisations/types'

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const w = 80
  const h = 24
  const stepX = w / (values.length - 1)
  const path = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * stepX).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`)
    .join(' ')
  return (
    <svg width={w} height={h} className="mt-2 text-violet-400">
      <path d={path} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function ResultsGrid({ results }: { results: RealisationResult[] }) {
  return (
    <section id="resultats" className="scroll-mt-[124px] border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Resultats</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-bg-card p-6">
              <span className="text-xs uppercase tracking-wide text-text-muted">{r.metric}</span>
              <p className="mt-2 text-3xl font-bold text-violet-300 md:text-4xl">{r.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{r.label}</p>
              {r.trend && <Sparkline values={r.trend} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12.6 : Create `GalleryGrid.tsx`**

```tsx
import type { RealisationGalleryItem } from '@/lib/realisations/types'

export function GalleryGrid({ items }: { items: RealisationGalleryItem[] }) {
  return (
    <section id="galerie" className="scroll-mt-[124px] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Galerie</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((g, i) => (
            <figure key={i}>
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="rounded-xl border border-white/10"
              />
              {g.caption && (
                <figcaption className="mt-3 text-sm italic text-text-muted">
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12.7 : Create `TestimonialQuote.tsx`**

```tsx
import type { RealisationTestimonial } from '@/lib/realisations/types'

export function TestimonialQuote({ t }: { t: RealisationTestimonial }) {
  return (
    <section id="temoignage" className="scroll-mt-[124px] border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <blockquote className="border-l-4 border-violet-400/60 pl-6">
          <p className="text-2xl italic leading-snug text-white md:text-3xl">
            « {t.quote} »
          </p>
        </blockquote>
        <div className="mt-6 flex items-center gap-3">
          {t.avatar && (
            <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full" />
          )}
          <div>
            <p className="text-sm font-semibold text-white">{t.author}</p>
            <p className="text-xs text-text-muted">{t.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12.8 : Create `RelatedRealisations.tsx`**

```tsx
import { ProjectCard } from './ProjectCard'
import type { Realisation } from '@/lib/realisations/types'

export function RelatedRealisations({ items }: { items: Realisation[] }) {
  if (items.length === 0) return null
  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Realisations liees
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(r => (
            <ProjectCard key={r.slug} realisation={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12.9 : Commit**

```bash
git add src/components/realisations/RealisationHeader.tsx \
        src/components/realisations/ProblemBlock.tsx \
        src/components/realisations/ApproachBlock.tsx \
        src/components/realisations/StackChips.tsx \
        src/components/realisations/ResultsGrid.tsx \
        src/components/realisations/GalleryGrid.tsx \
        src/components/realisations/TestimonialQuote.tsx \
        src/components/realisations/RelatedRealisations.tsx
git commit -m "feat(realisations): add 8 detail page sub-components"
```

---

### Task 13 : Detail page `/realisations/[slug]`

**Files:**
- Create: `src/app/realisations/[slug]/page.tsx`
- Modify: `src/lib/schema.ts`

- [ ] **Step 13.1 : Add `buildRealisationPage` to `src/lib/schema.ts`**

Append :

```ts
export function buildRealisationPage(input: { realisation: Realisation }) {
  const r = input.realisation
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${r.client.name} : ${r.meta.title}`,
    url: `${SITE}/realisations/${r.slug}`,
    description: r.meta.excerpt,
    datePublished: r.meta.dateISO,
    about: {
      '@type': 'CreativeWork',
      genre: r.category,
    },
    mentions: {
      '@type': 'Organization',
      name: r.client.name,
      ...(r.liveUrl ? { url: r.liveUrl } : {}),
    },
  } as const
}
```

- [ ] **Step 13.2 : Implement detail page**

In Next 16, `params` est `Promise<{ slug: string }>`. Verifier le pattern dans `node_modules/next/dist/docs/`.

```tsx
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BrowserFrame } from '@/components/realisations/BrowserFrame'
import { RealisationHeader } from '@/components/realisations/RealisationHeader'
import { ProblemBlock } from '@/components/realisations/ProblemBlock'
import { ApproachBlock } from '@/components/realisations/ApproachBlock'
import { StackChips } from '@/components/realisations/StackChips'
import { ResultsGrid } from '@/components/realisations/ResultsGrid'
import { GalleryGrid } from '@/components/realisations/GalleryGrid'
import { TestimonialQuote } from '@/components/realisations/TestimonialQuote'
import { RelatedRealisations } from '@/components/realisations/RelatedRealisations'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildRealisationPage } from '@/lib/schema'
import { REALISATIONS, getRealisation, getRelated } from '@/lib/realisations'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return REALISATIONS
    .filter(r => r.meta.status !== 'private')
    .map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) return { title: 'Realisation introuvable' }
  return {
    title: `${r.client.name} : ${r.meta.title} | Realisations DKDP`,
    description: r.meta.excerpt,
    alternates: { canonical: `https://dkdp.ch/realisations/${r.slug}` },
    openGraph: {
      title: `${r.client.name} : ${r.meta.title}`,
      description: r.meta.excerpt,
      url: `https://dkdp.ch/realisations/${r.slug}`,
      images: [{ url: `/images/realisations/${r.slug}/og.png`, width: 1200, height: 630, alt: r.meta.title }],
    },
    robots: r.meta.status === 'private' ? { index: false, follow: true } : undefined,
  }
}

export default async function RealisationDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) notFound()
  if (r.meta.status === 'archived') redirect('/realisations')

  const related = getRelated(slug, 3)

  return (
    <>
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch/' },
        { name: 'Realisations', url: 'https://dkdp.ch/realisations' },
        { name: r.client.name, url: `https://dkdp.ch/realisations/${r.slug}` },
      ])} />
      <SchemaOrg schema={buildRealisationPage({ realisation: r })} />

      <RealisationHeader r={r} />

      <div className="mx-auto mt-12 max-w-[1200px] px-6">
        <BrowserFrame
          src={r.hero.desktopFull}
          alt={`${r.client.name} : ${r.meta.title}`}
          browserUrl={r.hero.browserUrl}
          variant="hero"
          trigger="visible"
        />
      </div>

      <ProblemBlock problem={r.problem} />
      <ApproachBlock approach={r.approach} />
      {r.stack && <StackChips chips={r.stack} />}
      {r.results && <ResultsGrid results={r.results} />}
      {r.gallery && <GalleryGrid items={r.gallery} />}
      {r.testimonial && <TestimonialQuote t={r.testimonial} />}
      <RelatedRealisations items={related} />
      <CTAFinal />
    </>
  )
}
```

- [ ] **Step 13.3 : Build**

```bash
npm run build
```

Expected : build succeeds, but no detail page actually prerenders (REALISATIONS is empty until a real entry is added in Task 14).

- [ ] **Step 13.4 : Commit**

```bash
git add src/app/realisations/[slug]/page.tsx src/lib/schema.ts
git commit -m "feat(realisations): detail page with SEO, schema and conditional sections"
```

---

## Phase 5 : Capture pipeline

### Task 14 : `tools/realisations/capture.mjs`

**Files:**
- Modify: `package.json` (add `sharp`)
- Create: `tools/realisations/capture.mjs`
- Create: `tools/realisations/README.md`

- [ ] **Step 14.1 : Install `sharp`**

```bash
npm install --save-dev sharp@^0.34.0
```

- [ ] **Step 14.2 : Implement capture script**

```js
// tools/realisations/capture.mjs
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]])
    return acc
  }, [])
)

const url = args.url
const slug = args.slug
const sectionsArg = args.sections ?? '0.33,0.66,0.90'
const mobileSectionsArg = args['mobile-sections'] ?? '0.50'

if (!url || !slug) {
  console.error('Usage : node tools/realisations/capture.mjs --url <URL> --slug <SLUG> [--sections 0.33,0.66,0.90] [--mobile-sections 0.50]')
  process.exit(2)
}

const sections = sectionsArg.split(',').map(Number)
const mobileSections = mobileSectionsArg.split(',').map(Number)

const outDir = path.resolve(`public/images/realisations/${slug}`)
await mkdir(outDir, { recursive: true })

async function toWebp(pngBuffer, outFile, maxBytes = 300_000) {
  let quality = 85
  while (quality >= 65) {
    const out = await sharp(pngBuffer).webp({ quality }).toBuffer()
    if (out.length <= maxBytes || quality === 65) {
      await writeFile(outFile, out)
      console.log(` ${path.basename(outFile)} : ${(out.length / 1024).toFixed(0)} KB (q=${quality})`)
      return
    }
    quality -= 5
  }
}

async function captureViewport(page, position) {
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewportH = await page.evaluate(() => window.innerHeight)
  const targetY = Math.max(0, Math.min(totalH - viewportH, totalH * position))
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), targetY)
  await page.waitForTimeout(400)
  return page.screenshot({ fullPage: false, type: 'png' })
}

const browser = await chromium.launch()

// Desktop captures
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  // Trigger lazy-loads
  for (let y = 0; y < 8000; y += 1000) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y)
    await page.waitForTimeout(150)
  }

  // Fullpage desktop
  const desktopFull = await page.screenshot({ fullPage: true, type: 'png' })
  await toWebp(desktopFull, path.join(outDir, 'desktop.webp'))

  // OG (top viewport, cropped 1200x630)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.setViewportSize({ width: 1200, height: 800 })
  const ogPng = await page.screenshot({ fullPage: false, type: 'png' })
  const ogCropped = await sharp(ogPng).resize(1200, 630, { fit: 'cover', position: 'top' }).png().toBuffer()
  await writeFile(path.join(outDir, 'og.png'), ogCropped)
  console.log(` og.png : ${(ogCropped.length / 1024).toFixed(0)} KB`)

  // Section captures
  await page.setViewportSize({ width: 1440, height: 900 })
  for (let i = 0; i < sections.length; i++) {
    const buf = await captureViewport(page, sections[i])
    await toWebp(buf, path.join(outDir, `section-${i + 1}.webp`))
  }

  await context.close()
}

// Mobile captures
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  for (let y = 0; y < 8000; y += 1000) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y)
    await page.waitForTimeout(150)
  }

  const mobileFull = await page.screenshot({ fullPage: true, type: 'png' })
  await toWebp(mobileFull, path.join(outDir, 'mobile.webp'))

  for (let i = 0; i < mobileSections.length; i++) {
    const buf = await captureViewport(page, mobileSections[i])
    await toWebp(buf, path.join(outDir, `mobile-section-${i + 1}.webp`))
  }

  await context.close()
}

await browser.close()
console.log(`✓ Capture terminee : public/images/realisations/${slug}/`)
```

- [ ] **Step 14.3 : Add usage README**

```md
<!-- tools/realisations/README.md -->
# Capture screenshots pour realisations

Script Playwright + sharp qui produit le budget d'images standard pour une realisation DKDP.

## Usage

```bash
node tools/realisations/capture.mjs --url https://goldencash.ch --slug goldencash-refonte
```

### Options

- `--sections 0.25,0.50,0.75` : positions de scroll (en pourcentage de la hauteur fullpage) pour les captures desktop. Defaut : `0.33,0.66,0.90`.
- `--mobile-sections 0.50` : idem pour mobile. Defaut : `0.50`.

## Sortie

```
public/images/realisations/<slug>/
  desktop.webp           # fullpage 1440x900 viewport
  mobile.webp            # fullpage 390x844 viewport
  og.png                 # 1200x630 OG image
  section-1.webp         # viewport @ scroll 33%
  section-2.webp         # viewport @ scroll 66%
  section-3.webp         # viewport @ scroll 90%
  mobile-section-1.webp  # viewport mobile @ scroll 50%
```

Toutes les images en WebP qualite 85, target 300 KB max (degradation par paliers de 5 jusqu'a quality 65).
```

- [ ] **Step 14.4 : Test on Goldencash**

```bash
node tools/realisations/capture.mjs --url https://goldencash.ch --slug goldencash-refonte
ls -lh public/images/realisations/goldencash-refonte/
```

Expected : 8 fichiers, chacun < 300 KB.

- [ ] **Step 14.5 : Commit**

```bash
git add package.json package-lock.json tools/realisations/capture.mjs tools/realisations/README.md public/images/realisations/goldencash-refonte/
git commit -m "feat(realisations): capture script with multi-section screenshots and sharp pipeline"
```

---

### Task 15 : First real realisation : `goldencash-refonte`

**Files:**
- Create: `src/lib/realisations/goldencash-refonte.ts`
- Modify: `src/lib/realisations/index.ts`

- [ ] **Step 15.1 : Get content from David**

Avant d'ecrire le fichier, demander a David via `AskUserQuestion` :

- Probleme initial Goldencash en 2-3 phrases
- 3 metrics concrets (Lighthouse, latence DTI, autres)
- Temoignage si dispo
- 3-5 tags secondaires pertinents
- Confirmation `liveUrl: https://goldencash.ch`

(Cette etape ne genere pas de code, c'est une coordination utilisateur.)

- [ ] **Step 15.2 : Write `goldencash-refonte.ts`**

Exemple type a remplir avec les reponses de David :

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
    title: 'A REMPLIR avec David',
    body: 'A REMPLIR avec David',
  },
  approach: {
    title: 'Hybride API + cache 10s',
    body: 'A REMPLIR avec David',
    bullets: [
      'API XMLCharts en source primaire',
      'FXCM en fallback automatique',
      'Cache 10 secondes pour limiter les couts',
      'Dashboard admin pour bascule manuelle',
    ],
  },
  stack: [
    { label: 'Astro 5', color: 'orange' },
    { label: 'Tailwind 4', color: 'teal' },
    { label: 'PHP API', color: 'violet' },
  ],
  results: [
    { metric: 'Lighthouse', value: '100/100', label: 'Performance mobile' },
    { metric: 'Latence DTI', value: '< 10s', label: 'Bascule API' },
  ],
  gallery: [
    { src: '/images/realisations/goldencash-refonte/section-1.webp', alt: 'Section produits', caption: 'Catalogue metaux precieux avec tarifs live' },
    { src: '/images/realisations/goldencash-refonte/section-2.webp', alt: 'Tableau de bord admin', caption: 'Bascule API XMLCharts vers FXCM' },
    { src: '/images/realisations/goldencash-refonte/mobile-section-1.webp', alt: 'Vue mobile', caption: 'Responsive iOS' },
  ],
  liveUrl: 'https://goldencash.ch',
}

export default realisation
```

⚠️ Les champs `problem.body` et eventuellement `approach.body` seront completes avec les reponses de David, jamais avec une placeholder qui passerait en prod.

- [ ] **Step 15.3 : Add to index**

In `src/lib/realisations/index.ts`, modifier en haut :

```ts
import goldencash from './goldencash-refonte'

export const REALISATIONS: Realisation[] = [
  goldencash,
].sort((a, b) => b.meta.dateISO.localeCompare(a.meta.dateISO))

export const FEATURED_SLUGS: string[] = ['goldencash-refonte']
```

- [ ] **Step 15.4 : Run integrity tests**

```bash
npx vitest run src/lib/realisations
```

Expected : tous les tests passent.

- [ ] **Step 15.5 : Build and visit detail page locally**

```bash
npm run build
npm run dev
```

Visiter `http://localhost:3000/realisations/goldencash-refonte` et `http://localhost:3000/realisations`.

- [ ] **Step 15.6 : Commit**

```bash
git add src/lib/realisations/goldencash-refonte.ts src/lib/realisations/index.ts
git commit -m "feat(realisations): first real entry goldencash-refonte"
```

---

## Phase 6 : Cross-linking

### Task 16 : `FeaturedRealisations` for home

**Files:**
- Create: `src/components/realisations/FeaturedRealisations.tsx`

- [ ] **Step 16.1 : Implement**

```tsx
import Link from 'next/link'
import { ProjectCard } from './ProjectCard'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { REALISATIONS, FEATURED_SLUGS } from '@/lib/realisations'

export function FeaturedRealisations() {
  const items = FEATURED_SLUGS
    .map(slug => REALISATIONS.find(r => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r) && r.meta.status === 'live')
    .slice(0, 6)

  if (items.length === 0) return null

  return (
    <section className="border-y border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <GradTag>Realisations</GradTag>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Etudes de cas recentes
            </h2>
          </div>
          <Link
            href="/realisations"
            className="hidden text-sm text-text-secondary hover:text-text-primary md:inline"
          >
            Voir toutes les realisations →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <SectionReveal key={r.slug} delay={Math.min(i, 5) * 0.05}>
              <ProjectCard realisation={r} />
            </SectionReveal>
          ))}
        </div>

        <Link
          href="/realisations"
          className="mt-8 block text-center text-sm text-text-secondary hover:text-text-primary md:hidden"
        >
          Voir toutes les realisations →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 16.2 : Replace `FeaturedProject` in `src/app/page.tsx`**

```diff
- const FeaturedProject = dynamic(() => import('@/components/sections/FeaturedProject').then(m => ({ default: m.FeaturedProject })))
+ const FeaturedRealisations = dynamic(() => import('@/components/realisations/FeaturedRealisations').then(m => ({ default: m.FeaturedRealisations })))

  ...
- <FeaturedProject />
+ <FeaturedRealisations />
```

- [ ] **Step 16.3 : Build**

```bash
npm run build
```

- [ ] **Step 16.4 : Commit**

```bash
git add src/components/realisations/FeaturedRealisations.tsx src/app/page.tsx
git commit -m "feat(realisations): replace FeaturedProject with FeaturedRealisations on home"
```

---

### Task 17 : `RealisationsForCategory` for service pages

**Files:**
- Create: `src/components/realisations/RealisationsForCategory.tsx`
- Modify: 2 service pages

- [ ] **Step 17.1 : Implement**

```tsx
import { ProjectCard } from './ProjectCard'
import { GradTag } from '@/components/ui/GradTag'
import { REALISATIONS } from '@/lib/realisations'
import type { RealisationCategory } from '@/lib/realisations/types'
import Link from 'next/link'

type Props = {
  category: RealisationCategory
  tag?: string
  title: string
  limit?: number
}

export function RealisationsForCategory({
  category,
  tag,
  title,
  limit = 3,
}: Props) {
  const items = REALISATIONS
    .filter(r => r.meta.status === 'live')
    .filter(r => r.category === category || r.category === 'site-web-ia')
    .filter(r => !tag || r.tags.includes(tag))
    .slice(0, limit)

  if (items.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <GradTag>Realisations recentes</GradTag>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(r => <ProjectCard key={r.slug} realisation={r} />)}
        </div>
        <div className="mt-8">
          <Link href="/realisations" className="text-sm text-text-secondary hover:text-text-primary">
            Voir toutes les realisations →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 17.2 : Embed in `src/app/agence-digitale/creation-site-web/page.tsx`**

Avant `<CTAFinal />`, ajouter :

```tsx
import { RealisationsForCategory } from '@/components/realisations/RealisationsForCategory'

// ... in JSX
<RealisationsForCategory
  category="site-web"
  title="Sites web crees pour des PME suisses"
/>
```

- [ ] **Step 17.3 : Embed in `src/app/intelligence-artificielle/chatbot-ia/page.tsx`**

```tsx
<RealisationsForCategory
  category="projet-ia"
  tag="Chatbot"
  title="Chatbots IA livres recemment"
/>
```

- [ ] **Step 17.4 : Build**

```bash
npm run build
```

- [ ] **Step 17.5 : Commit**

```bash
git add src/components/realisations/RealisationsForCategory.tsx \
        src/app/agence-digitale/creation-site-web/page.tsx \
        src/app/intelligence-artificielle/chatbot-ia/page.tsx
git commit -m "feat(realisations): embed cross-link blocks on services pages"
```

---

### Task 18 : Header mega menu + cleanup dev page

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Delete: `src/app/realisations/_dev/page.tsx`

- [ ] **Step 18.1 : Add `Realisations` to `AGENCE_SECONDARY` array**

In `Header.tsx`, find `AGENCE_SECONDARY` and add :

```ts
{
  label: 'Realisations',
  href: '/realisations',
  description: 'Cas clients et etudes de cas',
  accent: 'violet',
},
```

Position : apres "Estimation" si presente, ou en derniere position du tableau.

- [ ] **Step 18.2 : Remove temporary dev page**

```bash
rm -rf "src/app/realisations/_dev"
```

- [ ] **Step 18.3 : Build**

```bash
npm run build
```

- [ ] **Step 18.4 : Commit**

```bash
git add src/components/layout/Header.tsx
git rm -rf src/app/realisations/_dev
git commit -m "feat(header): add Realisations entry to mega menu and remove dev preview"
```

---

## Phase 7 : Migration et validation finale

### Task 19 : Delete legacy `FeaturedProject`

**Files:**
- Delete: `src/components/sections/FeaturedProject.tsx`
- Delete: `src/components/sections/__tests__/FeaturedProject.test.tsx`

- [ ] **Step 19.1 : Verify no remaining references**

```bash
grep -rn "FeaturedProject" src/
```

Expected : seul resultat = la suppression dans `app/page.tsx` (deja appliquee). Si d'autres references existent, les remplacer ou les supprimer.

- [ ] **Step 19.2 : Delete files**

```bash
rm src/components/sections/FeaturedProject.tsx
rm src/components/sections/__tests__/FeaturedProject.test.tsx
```

- [ ] **Step 19.3 : Run tests**

```bash
npx vitest run
```

Expected : tous les tests passent, aucun test FeaturedProject orphelin.

- [ ] **Step 19.4 : Build**

```bash
npm run build
```

- [ ] **Step 19.5 : Commit**

```bash
git add -A
git commit -m "chore(realisations): remove deprecated FeaturedProject component"
```

---

### Task 20 : End-to-end validation

**Files:** none, validation only.

- [ ] **Step 20.1 : Local smoke test**

```bash
npm run dev
```

Tester manuellement chaque parcours :

1. `http://localhost:3000/` : `FeaturedRealisations` apparait avec la card Goldencash, scroll auto au hover de la card, lien "Voir toutes les realisations" fonctionne
2. `http://localhost:3000/realisations` : hero, filter bar, grille, card Goldencash. Cliquer sur les filtres (cat=site-web, tag=Refonte), verifier URL state et reset
3. `http://localhost:3000/realisations/goldencash-refonte` : header, BrowserFrame hero qui autoscroll quand visible, ProblemBlock, ApproachBlock, StackChips, ResultsGrid, GalleryGrid (3 captures), pas de testimonial (absent), pas de Related (un seul item), CTAFinal
4. `http://localhost:3000/realisations?cat=projet-ia` : empty state visible
5. `http://localhost:3000/agence-digitale/creation-site-web` : bloc `RealisationsForCategory` visible avant CTAFinal
6. `http://localhost:3000/intelligence-artificielle/chatbot-ia` : pas de bloc visible (Goldencash n'a pas tag Chatbot, ce qui est attendu)
7. Header > Agence > Realisations : lien fonctionne
8. Capture devtools : verifier qu'on a `noindex` sur aucune page (sauf si status `private`)
9. Capture devtools > rendering > prefers-reduced-motion : recharger, BrowserFrame ne scroll plus
10. Lighthouse mobile sur `/realisations` : score > 90 cible

- [ ] **Step 20.2 : Verify schema.org**

Coller `https://dkdp.ch/realisations` (apres deploy) dans https://validator.schema.org : `CollectionPage` + `BreadcrumbList` valides.

Coller `https://dkdp.ch/realisations/goldencash-refonte` : `WebPage` + `BreadcrumbList` valides.

- [ ] **Step 20.3 : Verify sitemap**

```bash
curl http://localhost:3000/sitemap.xml | grep realisations
```

Expected : 2 entrees (`/realisations` et `/realisations/goldencash-refonte`).

- [ ] **Step 20.4 : Push to production**

DKDP : push direct sur main. Vercel auto-deploy.

```bash
git push origin main
```

Wait ~60s, then verify `https://dkdp.ch/realisations` and `https://dkdp.ch/realisations/goldencash-refonte` live.

- [ ] **Step 20.5 : Purge Vercel cache (DKDP rule from memory)**

Trigger via Vercel dashboard or via deployment API. Required after every push per `feedback_purge_cache_on_push.md`.

- [ ] **Step 20.6 : Done**

No commit (validation only).

---

## Self-review checklist

| Spec section | Plan task(s) | Covered |
|--------------|--------------|---------|
| 2. Routes | Task 3, 4 | ✓ |
| 3. Modele de donnees | Task 1, 2 | ✓ |
| 4. BrowserFrame | Task 5, 6, 7 | ✓ |
| 5. Page hub | Task 8, 9, 10, 11 | ✓ |
| 6. Page detail | Task 12, 13 | ✓ |
| 7. Cross-linking | Task 16, 17, 18 | ✓ |
| 8. Pipeline workflow | Task 14, 15 | ✓ |
| 9. Capture script | Task 14 | ✓ |
| 10. Composants | All phase 2-6 | ✓ |
| 10b. Budget images | Task 14 | ✓ (8 images output) |
| 10c. UX et lisibilite | Task 11, 12 (typo, max-w-68ch, py-20+) | ✓ |
| 11. Edge cases | Task 5, 8, 11, 13 | ✓ |
| 12. Tests | Tasks 1, 2, 5, 8, 9 (TDD) | ✓ |
| 13. Schema builders | Task 11, 13 | ✓ |
| 14. Phasage | Tasks 1-19 | ✓ |
| 15. Risques | Mitigations integrees | ✓ |
| 16. Decisions tranchees | Respectees | ✓ |

---

## Notes finales

- DKDP push direct sur `main` per `feedback_dkdp_push_main.md`
- Toujours purger cache Vercel apres push per `feedback_purge_cache_on_push.md`
- Pas de em-dash, pas de `&`, accents FR per global feedback
- Annee = 2026
- Lenis offset `-124` configure globalement, donc les ancres `#contexte`, `#approche`, `#resultats`, `#galerie`, `#temoignage` fonctionnent automatiquement

Le plan complet couvre 20 tasks reparties en 7 phases. Les phases 3, 4 et 5 peuvent etre parallelisees par sous-agents si on prefere accelerer.
