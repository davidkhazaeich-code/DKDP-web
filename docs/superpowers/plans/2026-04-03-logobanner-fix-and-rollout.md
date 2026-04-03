# LogoBanner Fix & Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger le marquee de logos (bugs mobile) et l'ajouter dans les 4 pages piliers + À propos avec un label configurable.

**Architecture:** Modification du composant `LogoBanner` (Server Component) + fix CSS dans `globals.css` + import dans 4 pages. Aucun nouveau composant créé, aucune dépendance ajoutée.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, CSS animations

---

## Files

- Modify: `src/components/sections/LogoBanner.tsx` — unifie hauteurs, ajoute prop `label`, réduit duplications ×2
- Modify: `src/app/globals.css` — fix `translateX(-50%)`
- Modify: `src/components/sections/__tests__/LogoBanner.test.tsx` — mise à jour tests (×2, prop label, fallback)
- Modify: `src/app/agence-digitale/page.tsx` — import + insertion `LogoBanner`
- Modify: `src/app/intelligence-artificielle/page.tsx` — import + insertion `LogoBanner`
- Modify: `src/app/formation-entreprise/page.tsx` — import + insertion `LogoBanner`
- Modify: `src/app/a-propos/page.tsx` — import + insertion `LogoBanner`

---

## Task 1: Fix CSS animation keyframe

**Files:**
- Modify: `src/app/globals.css:274-284`

- [ ] **Step 1 : Corriger le keyframe**

Dans `globals.css`, remplacer le bloc logo-scroll par :

```css
/* Logo scroll animation - seamless infinite marquee */
@keyframes logo-scroll {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}

.logo-scroll {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: logo-scroll 28s linear infinite;
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/globals.css
git commit -m "fix(logobanner): translateX(-50%) for exact 2x loop"
```

---

## Task 2: Mettre à jour les tests

**Files:**
- Modify: `src/components/sections/__tests__/LogoBanner.test.tsx`

- [ ] **Step 1 : Mettre à jour les tests avant de toucher le composant**

Remplacer le contenu de `LogoBanner.test.tsx` par :

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LogoBanner } from '../LogoBanner'

describe('LogoBanner', () => {
  it('renders default label when no label prop passed', () => {
    render(<LogoBanner />)
    expect(screen.getByText(/ils nous font confiance/i)).toBeInTheDocument()
  })

  it('renders custom label when label prop is provided', () => {
    render(<LogoBanner label="700+ clients accompagnés" />)
    expect(screen.getByText(/700\+ clients accompagnés/i)).toBeInTheDocument()
  })

  it('renders SwissLife logo', () => {
    render(<LogoBanner />)
    expect(screen.getAllByAltText(/swisslife/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Howden logo', () => {
    render(<LogoBanner />)
    expect(screen.getAllByAltText(/howden/i).length).toBeGreaterThanOrEqual(1)
  })

  it('duplicates logos for seamless 2x loop', () => {
    render(<LogoBanner />)
    // 14 logos × 2 = 28 img elements
    const allLogos = screen.getAllByRole('img')
    expect(allLogos.length).toBe(28)
  })
})
```

- [ ] **Step 2 : Vérifier que les tests échouent (red)**

```bash
cd "clients/DKDP/DKDP refonte/dkdp" && npx vitest run src/components/sections/__tests__/LogoBanner.test.tsx
```

Expected: FAIL — les tests "default label", "custom label" et "28 img elements" échouent.

---

## Task 3: Corriger le composant LogoBanner

**Files:**
- Modify: `src/components/sections/LogoBanner.tsx`

- [ ] **Step 1 : Réécrire le composant**

Remplacer le contenu de `LogoBanner.tsx` par :

```tsx
import Image from 'next/image'

const LOGOS = [
  { name: 'SwissLife',            file: 'swisslife.webp',           width: 120, height: 40 },
  { name: 'Fondation Hans Wilsdorf', file: 'fondation-hans-wilsdorf.webp', width: 130, height: 40 },
  { name: 'Howden',               file: 'howden.avif',              width: 100, height: 40 },
  { name: 'OCAS',                 file: 'ocas.avif',                width: 80,  height: 40 },
  { name: 'Swiss Mutual Trust',   file: 'swiss-mutual-trust.avif',  width: 130, height: 40 },
  { name: 'WellWays',             file: 'wellways.avif',            width: 100, height: 40 },
  { name: 'Strike',               file: 'strike.avif',              width: 80,  height: 40 },
  { name: 'Intown',               file: 'intown.avif',              width: 90,  height: 40 },
  { name: 'IMRO',                 file: 'imro.avif',                width: 80,  height: 40 },
  { name: 'AVS',                  file: 'avs.avif',                 width: 60,  height: 40 },
  { name: 'Concorde',             file: 'concorde.avif',            width: 110, height: 40 },
  { name: 'Sketchiz',             file: 'sketchiz.avif',            width: 100, height: 40 },
  { name: 'Swiss Medishop',       file: 'swiss-medishop.avif',      width: 120, height: 40 },
  { name: 'Polomarco',            file: 'polomarco.png',            width: 100, height: 40 },
]

interface LogoBannerProps {
  label?: string
}

export function LogoBanner({ label = 'Ils nous font confiance' }: LogoBannerProps) {
  return (
    <section className="py-14 border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center">
        <p className="text-text-muted text-xs uppercase tracking-[0.12em] font-semibold">
          {label}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling strip — duplicated ×2, loop resets at -50% */}
        <div className="logo-scroll items-center gap-12">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 grayscale opacity-40 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={`/images/clients/${logo.file}`}
                alt={logo.name}
                width={Math.round(logo.width * 2.7)}
                height={108}
                className="object-contain h-[48px] w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2 : Vérifier que les tests passent (green)**

```bash
npx vitest run src/components/sections/__tests__/LogoBanner.test.tsx
```

Expected: PASS — 5 tests passent.

- [ ] **Step 3 : Commit**

```bash
git add src/components/sections/LogoBanner.tsx src/components/sections/__tests__/LogoBanner.test.tsx
git commit -m "fix(logobanner): uniform height, 2x duplication, label prop, overflow-hidden on wrapper"
```

---

## Task 4: Ajouter LogoBanner dans agence-digitale

**Files:**
- Modify: `src/app/agence-digitale/page.tsx`

- [ ] **Step 1 : Ajouter l'import**

Dans `agence-digitale/page.tsx`, après la ligne `import { CTAFinal } from '@/components/sections/CTAFinal'`, ajouter :

```tsx
import { LogoBanner } from '@/components/sections/LogoBanner'
```

- [ ] **Step 2 : Insérer le composant**

Localiser le commentaire `{/* ── Stats ── */}` (autour de la ligne 154). Insérer juste avant :

```tsx
      <LogoBanner label="Ils nous font confiance" />

      {/* ── Stats ── */}
```

- [ ] **Step 3 : Commit**

```bash
git add src/app/agence-digitale/page.tsx
git commit -m "feat(agence-digitale): add LogoBanner after hero"
```

---

## Task 5: Ajouter LogoBanner dans intelligence-artificielle

**Files:**
- Modify: `src/app/intelligence-artificielle/page.tsx`

- [ ] **Step 1 : Ajouter l'import**

Dans `intelligence-artificielle/page.tsx`, après la ligne `import { CTAFinal } from '@/components/sections/CTAFinal'` (ou import équivalent), ajouter :

```tsx
import { LogoBanner } from '@/components/sections/LogoBanner'
```

- [ ] **Step 2 : Insérer le composant**

Localiser le commentaire `{/* ── Stats ── */}` (autour de la ligne 134). Insérer juste avant :

```tsx
      <LogoBanner label="Entreprises qui nous font confiance" />

      {/* ── Stats ── */}
```

- [ ] **Step 3 : Commit**

```bash
git add src/app/intelligence-artificielle/page.tsx
git commit -m "feat(intelligence-artificielle): add LogoBanner after hero"
```

---

## Task 6: Ajouter LogoBanner dans formation-entreprise

**Files:**
- Modify: `src/app/formation-entreprise/page.tsx`

- [ ] **Step 1 : Ajouter l'import**

Dans `formation-entreprise/page.tsx`, après la ligne `import { CTAFinal } from '@/components/sections/CTAFinal'` (ou import équivalent), ajouter :

```tsx
import { LogoBanner } from '@/components/sections/LogoBanner'
```

- [ ] **Step 2 : Insérer le composant**

Localiser le commentaire `{/* ── Stats ── */}` (autour de la ligne 158). Insérer juste avant :

```tsx
      <LogoBanner label="Équipes déjà formées" />

      {/* ── Stats ── */}
```

- [ ] **Step 3 : Commit**

```bash
git add src/app/formation-entreprise/page.tsx
git commit -m "feat(formation-entreprise): add LogoBanner after hero"
```

---

## Task 7: Ajouter LogoBanner dans a-propos

**Files:**
- Modify: `src/app/a-propos/page.tsx`

- [ ] **Step 1 : Ajouter l'import**

Dans `a-propos/page.tsx`, après la ligne `import { CTAFinal } from '@/components/sections/CTAFinal'` (ou import équivalent), ajouter :

```tsx
import { LogoBanner } from '@/components/sections/LogoBanner'
```

- [ ] **Step 2 : Insérer le composant**

Localiser le commentaire `{/* ── Approche / 3 valeurs ── */}` (autour de la ligne 285). Insérer juste avant :

```tsx
      <LogoBanner label="700+ clients accompagnés" />

      {/* ── Approche / 3 valeurs ── */}
```

- [ ] **Step 3 : Commit**

```bash
git add src/app/a-propos/page.tsx
git commit -m "feat(a-propos): add LogoBanner after hero"
```

---

## Task 8: Vérification finale

- [ ] **Step 1 : Lancer la suite de tests complète**

```bash
npx vitest run
```

Expected: tous les tests passent, aucune régression.

- [ ] **Step 2 : Build de production**

```bash
npm run build
```

Expected: build sans erreur ni warning TypeScript.

- [ ] **Step 3 : Push**

```bash
git push
```
