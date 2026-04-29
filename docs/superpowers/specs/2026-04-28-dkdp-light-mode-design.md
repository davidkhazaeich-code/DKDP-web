# DKDP — Light mode design spec

**Date** : 2026-04-28
**Auteur** : David + Claude (brainstorming)
**Statut** : draft, en attente review utilisateur
**Effort estimé** : 12-18h, 4 phases, 2 jours

---

## 1. Objectif

Ajouter un mode clair (light mode) au site DKDP.ch (Next.js App Router) actuellement entièrement dark. Le résultat doit être visuellement irréprochable, sans casser les images, le logo, les animations, les couleurs signature de la marque, ni les performances.

---

## 2. Décisions de cadrage validées

| Sujet | Décision | Rationale |
|-------|----------|-----------|
| Trigger | **Toggle manuel uniquement**, default = dark, persistance `localStorage` | Pas de surprise utilisateur, contrôle total. Pas de respect `prefers-color-scheme` |
| Portée | **Toutes les pages sauf articles blog** (`/blog/[slug]`) | Évite refactor des 10+ articles avec diagrammes HTML hardcodés. Le toggle reste cliquable et change le state global, mais les articles verrouillent leur apparence en dark via `data-theme="dark"` local |
| Ton du light | **Warm off-white** (#FAFAF7 → #F5F4F0) | Style premium agence (Apple, Stripe, Linear). Orange/violet de la marque ressortent magnifiquement |
| Effets canvas | **Adapter les couleurs en light** (DottedSurface, InfiniteGrid, LiquidMetal) | Préserve l'identité visuelle DKDP en light. Coût minime via mutation de materials/uniforms Three.js |
| CTA en light | **LiquidMetalButton reste sombre** (#1A1A18) | Pattern Stripe/Linear/Apple : CTA = "spot of darkness" sur fond cream. Contraste max, liquid metal garde sa magie |

---

## 3. Architecture des design tokens

### 3.1 — Refactor `globals.css` en CSS vars dual-theme

```css
:root,
[data-theme="dark"] {
  /* Surfaces */
  --bg:              #0A0A0A;
  --bg-card:         #141414;
  --bg-card-hover:   #1A1A1A;
  --border:          #1E1E1E;
  --border-strong:   #2A2A2A;
  --divider:         rgba(255,255,255,0.06);

  /* Text */
  --text:            #FFFFFF;
  --text-secondary:  #9CA3AF;
  --text-muted:      #71717A;

  /* Accents (identiques entre dark/light) */
  --orange:          #FF6B00;
  --orange-light:    #FF8C00;
  --violet:          #7C3AED;
  --violet-light:    #A78BFA;

  /* Tokens piliers (alpha-compositing) */
  --violet-bg:       rgba(124, 58, 237, 0.10);
  --violet-border:   rgba(124, 58, 237, 0.25);
  --orange-bg:       rgba(255, 107, 0, 0.08);
  --orange-border:  rgba(255, 107, 0, 0.20);
  --chrome-bg:       rgba(212, 212, 216, 0.08);
  --chrome-border:   rgba(212, 212, 216, 0.18);
  --gray-bg:         rgba(156, 163, 175, 0.08);
  --gray-border:     rgba(156, 163, 175, 0.18);
  --green-bg:        rgba(74, 222, 128, 0.08);
  --green-border:    rgba(74, 222, 128, 0.22);
  --blue-bg:         rgba(96, 165, 250, 0.08);
  --blue-border:     rgba(96, 165, 250, 0.22);
  --pink-bg:         rgba(244, 114, 182, 0.08);
  --pink-border:     rgba(244, 114, 182, 0.22);
  --teal-bg:         rgba(45, 212, 191, 0.08);
  --teal-border:     rgba(45, 212, 191, 0.22);
  --amber-bg:        rgba(251, 191, 36, 0.07);
  --amber-border:    rgba(251, 191, 36, 0.22);
  --red-bg:          rgba(239, 68, 68, 0.08);
  --red-border:      rgba(239, 68, 68, 0.22);

  /* Surfaces neutres */
  --surface-subtle:  rgba(255, 255, 255, 0.02);
  --surface-default: rgba(255, 255, 255, 0.04);
  --surface-border:  rgba(255, 255, 255, 0.07);

  /* Filter pour SVG monochromes */
  --logo-filter:     invert(1) brightness(1);
}

[data-theme="light"] {
  /* Surfaces — warm off-white */
  --bg:              #FAFAF7;
  --bg-card:         #FFFFFF;
  --bg-card-hover:   #F5F4F0;
  --border:          #E8E6DF;
  --border-strong:   #D4D2CB;
  --divider:         rgba(10, 10, 10, 0.08);

  /* Text — gris-noir chaud, pas noir pur */
  --text:            #1A1A18;
  --text-secondary:  #5A5A57;
  --text-muted:      #6E6E6A;

  /* Accents — mêmes hex */
  --orange:          #FF6B00;
  --orange-light:    #FF8C00;
  --violet:          #7C3AED;
  --violet-light:    #A78BFA;

  /* Tokens piliers — alpha rebalancée pour fond clair */
  --violet-bg:       rgba(124, 58, 237, 0.07);
  --violet-border:   rgba(124, 58, 237, 0.20);
  --orange-bg:       rgba(255, 107, 0, 0.06);
  --orange-border:   rgba(255, 107, 0, 0.22);
  --chrome-bg:       rgba(80, 80, 80, 0.05);
  --chrome-border:   rgba(80, 80, 80, 0.18);
  --gray-bg:         rgba(80, 80, 80, 0.05);
  --gray-border:     rgba(80, 80, 80, 0.18);
  --green-bg:        rgba(34, 150, 80, 0.06);
  --green-border:    rgba(34, 150, 80, 0.22);
  --blue-bg:         rgba(50, 110, 200, 0.06);
  --blue-border:     rgba(50, 110, 200, 0.22);
  --pink-bg:         rgba(220, 80, 150, 0.06);
  --pink-border:     rgba(220, 80, 150, 0.22);
  --teal-bg:         rgba(20, 170, 150, 0.06);
  --teal-border:     rgba(20, 170, 150, 0.22);
  --amber-bg:        rgba(220, 150, 30, 0.06);
  --amber-border:    rgba(220, 150, 30, 0.22);
  --red-bg:          rgba(220, 50, 50, 0.06);
  --red-border:      rgba(220, 50, 50, 0.22);

  /* Surfaces neutres — alpha sur noir */
  --surface-subtle:  rgba(10, 10, 10, 0.02);
  --surface-default: rgba(10, 10, 10, 0.03);
  --surface-border:  rgba(10, 10, 10, 0.08);

  /* Filter pour SVG monochromes */
  --logo-filter:     none;
}

/* Bridge Tailwind v4 @theme avec les vars */
@theme {
  --color-bg:              var(--bg);
  --color-bg-card:         var(--bg-card);
  --color-border:          var(--border);
  --color-orange:          var(--orange);
  --color-orange-light:    var(--orange-light);
  --color-violet:          var(--violet);
  --color-violet-light:    var(--violet-light);
  --color-text-secondary:  var(--text-secondary);
  --color-text-muted:      var(--text-muted);
}

/* Logo swap — defaults to dark */
.light-only { display: none; }
[data-theme="light"] .light-only { display: block; }
[data-theme="light"] .dark-only  { display: none; }

/* Body bg/text driven by vars (was hardcoded #0A0A0A / #fff) */
html { background: var(--bg); color: var(--text); }
```

### 3.2 — Refactor `tokens.ts`

```ts
export const violet = {
  color:  'var(--violet-light)',
  bg:     'var(--violet-bg)',
  border: 'var(--violet-border)',
  glow:   'rgba(124,58,237,0.15)',  // glow inchangé (utilisé pour box-shadow)
} as const

// Idem pour orange, chrome, gray, green, blue, pink, teal, amber, red, surface
```

L'API publique (`import { violet } from '@/lib/tokens'`) reste identique. Les composants existants ne changent pas.

### 3.3 — Helper pour Three.js / canvas

```ts
// Pour les composants WebGL qui ont besoin d'une string hex pure (pas une CSS var)
export const themeColors = (theme: 'dark' | 'light') => ({
  bg:          theme === 'dark' ? '#0A0A0A' : '#FAFAF7',
  text:        theme === 'dark' ? '#FFFFFF' : '#1A1A18',
  pointTint:   theme === 'dark' ? '#FFFFFF' : '#1A1A18',
  orangeAlpha: theme === 'dark' ? 'rgba(255,107,0,0.40)' : 'rgba(255,107,0,0.22)',
  violetAlpha: theme === 'dark' ? 'rgba(124,58,237,0.30)' : 'rgba(124,58,237,0.18)',
})
```

---

## 4. Composant `<DkdpLogo>` thème-aware

**Fichier** : `src/components/ui/DkdpLogo.tsx` (nouveau)

```tsx
import Image from 'next/image'

interface DkdpLogoProps {
  variant?: 'full' | 'simple'
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function DkdpLogo({
  variant = 'full',
  width = 108,
  height = 36,
  priority = false,
  className = '',
}: DkdpLogoProps) {
  const dark  = variant === 'simple' ? 'dkdp_simple_blanc.png' : 'dkdp_blanc-croped.png'
  const light = variant === 'simple' ? 'dkdp_simple_noir.png'  : 'dkdp_noir-croped.png'

  return (
    <>
      <Image src={`/images/logo/${dark}`}  alt="DKDP" width={width} height={height} priority={priority}
             className={`block dark-only ${className}`} />
      <Image src={`/images/logo/${light}`} alt="DKDP" width={width} height={height} priority={priority}
             className={`block light-only ${className}`} />
    </>
  )
}
```

**Asset à créer** : `public/images/logo/dkdp_noir-croped.png` (recadrage de `dkdp_noir.png` aux mêmes proportions 108×36 que `dkdp_blanc-croped.png`).

**Migrations** :
- `src/components/layout/Header.tsx:593` → `<DkdpLogo width={108} height={36} priority />`
- `src/components/layout/Footer.tsx:132,208` → `<DkdpLogo />` avec dimensions adaptées
- `src/app/a-propos/page.tsx:253` → `<DkdpLogo />`
- `src/components/ui/ChatWidget.tsx:872` → **inchangé** (widget reste sur fond sombre par design)
- `src/lib/schema.ts` (5 refs) → **inchangé** (metadata SEO)
- `src/lib/estimation/generate-pdf.ts:43` → **inchangé** (PDF server-side)

---

## 5. Anti-FOUC + ThemeProvider + ThemeToggle

### 5.1 — Inline script anti-FOUC dans `layout.tsx`

Premier élément du `<head>`, AVANT GTM, AVANT tout autre script :

```tsx
<head>
  <script
    id="theme-init"
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var t=localStorage.getItem('dkdp-theme');var d=document.documentElement;if(t==='light'){d.setAttribute('data-theme','light');d.style.colorScheme='light';}else{d.setAttribute('data-theme','dark');d.style.colorScheme='dark';}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`
    }}
  />
  {/* puis GTM, dns-prefetch, meta, etc. */}
</head>
```

~280 octets minifié. Synchrone, s'exécute avant le premier paint.

### 5.2 — `ThemeProvider`

**Pattern important** : pour éviter l'hydration mismatch, on initialise `theme` à `'dark'` en SSR ET en first client render. On lit le DOM uniquement dans un `useEffect` post-mount, qui synchronise le state au theme réellement appliqué. On expose un flag `mounted` pour que `<ThemeToggle>` puisse rendre un placeholder pendant la première frame (évite le flicker d'icône).

`src/components/providers/ThemeProvider.tsx` :

```tsx
'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  mounted: boolean   // false avant useEffect post-mount, true ensuite
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  document.documentElement.style.colorScheme = t
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t === 'dark' ? '#0A0A0A' : '#FAFAF7')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Init = 'dark' aussi bien en SSR qu'en first client render → match hydration
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // Post-mount : lire le DOM (déjà set par l'inline script anti-FOUC), sync le state
  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark'
    setTheme(current)
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    try { localStorage.setItem('dkdp-theme', next) } catch {}
  }, [theme])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'dkdp-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue)
        applyTheme(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle, mounted }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

**Important pour `layout.tsx`** : ajouter `suppressHydrationWarning` sur le `<html>` car l'inline script anti-FOUC mute le `data-theme` AVANT React, ce qui fait diverger le DOM client du HTML SSR :

```tsx
<html lang="fr-CH" className={inter.variable} suppressHydrationWarning>
```

Cette directive React 19 supprime le warning de mismatch UNIQUEMENT pour les attributs du `<html>`, pas pour ses descendants. C'est le pattern utilisé par `next-themes` et tous les sites avec light/dark toggle.

### 5.3 — `ThemeToggle`

`src/components/ui/ThemeToggle.tsx` :

```tsx
'use client'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from '@/components/providers/ThemeProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${className}`}
      style={{
        background: 'var(--surface-default)',
        borderColor: 'var(--surface-border)',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Avant mount : aucun icon visible (évite flicker d'hydratation).
          Après mount : crossfade entre Sun et Moon selon le theme réel. */}
      <SunIcon
        width={16} height={16}
        className="absolute transition-all duration-300"
        style={{
          opacity:   mounted ? (isDark ? 0 : 1) : 0,
          transform: mounted && !isDark ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
        }}
      />
      <MoonIcon
        width={16} height={16}
        className="absolute transition-all duration-300"
        style={{
          opacity:   mounted ? (isDark ? 1 : 0) : 0,
          transform: mounted && isDark ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0.5)',
        }}
      />
    </button>
  )
}
```

**Pourquoi le `mounted` flag** : avant le post-mount `useEffect`, le state React est forcé à `'dark'` (pour matcher SSR). Si on rendait l'icône directement, on verrait Moon pendant 1 frame avant le flip vers Sun pour les users en light. Le `mounted` flag rend les deux icônes invisibles pendant cette frame (~16 ms), imperceptible. Le bouton lui-même reste visible (cercle bordé) donc pas de layout shift.

### 5.4 — Modifications `layout.tsx`

```tsx
// Import
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Remplacer
<body className="bg-bg text-white font-sans antialiased">
// Par
<body className="font-sans antialiased" style={{ background: 'var(--bg)', color: 'var(--text)' }}>

// Ajouter suppressHydrationWarning sur <html> (mute le warning React du data-theme/colorScheme appliqué par l'inline script anti-FOUC)
<html lang="fr-CH" className={inter.variable} suppressHydrationWarning>

// Wrap tree
<MotionProvider>
  <ThemeProvider>
    <SmoothScrollProvider>
      {/* ... */}
    </SmoothScrollProvider>
  </ThemeProvider>
</MotionProvider>

// Simplifier viewport.themeColor (default = dark, mis à jour dynamiquement par toggle)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0A0A',
}
```

### 5.5 — Placement du `ThemeToggle`

- **Desktop Header** : à droite, juste avant le CTA "Devis gratuit"
- **Mobile Header** : visible always, format compact 32×32px, à gauche du burger

---

## 6. Adaptation des effets canvas

### 6.1 — Hook `useThemeColors`

`src/hooks/useThemeColors.ts` :

```ts
'use client'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

export interface ThemeColors {
  bg: string
  text: string
  orange: string
  violet: string
  orangeAlpha: string
  violetAlpha: string
  pointTint: string
}

const PALETTES: Record<'dark' | 'light', ThemeColors> = {
  dark: {
    bg: '#0A0A0A', text: '#FFFFFF',
    orange: '#FF6B00', violet: '#7C3AED',
    orangeAlpha: 'rgba(255,107,0,0.40)',
    violetAlpha: 'rgba(124,58,237,0.30)',
    pointTint: '#FFFFFF',
  },
  light: {
    bg: '#FAFAF7', text: '#1A1A18',
    orange: '#FF6B00', violet: '#7C3AED',
    orangeAlpha: 'rgba(255,107,0,0.22)',
    violetAlpha: 'rgba(124,58,237,0.18)',
    pointTint: '#1A1A18',
  },
}

export function useThemeColors() {
  const { theme } = useTheme()
  const [colors, setColors] = useState<ThemeColors>(PALETTES[theme])
  useEffect(() => { setColors(PALETTES[theme]) }, [theme])
  return colors
}
```

### 6.2 — `DottedSurface` (Three.js, homepage hero)

Conserver les textures de points (canvas 2D blanches). Muter `material.color` au switch :

```tsx
const colors = useThemeColors()
const materialsRef = useRef<THREE.PointsMaterial[]>([])

// Dans l'init Three.js, stocker chaque material créé dans materialsRef.current
// Effet dédié au switch :
useEffect(() => {
  const tint = new THREE.Color(colors.pointTint)
  materialsRef.current.forEach(mat => mat.color = tint)
}, [colors.pointTint])
```

Coût switch : ~2 ms.

### 6.3 — `InfiniteGrid` (canvas 2D, tous les heros)

```tsx
const colors = useThemeColors()
const colorsRef = useRef(colors)
useEffect(() => { colorsRef.current = colors }, [colors])

// Dans le draw loop :
ctx.fillStyle = colorsRef.current.bg
const grad = ctx.createRadialGradient(...)
grad.addColorStop(0, colorsRef.current.orangeAlpha)
grad.addColorStop(1, 'transparent')
```

Couleur de grille : à passer en CSS var dédiée `--grid-line` (rgba blanche en dark, rgba noire en light).

Coût switch : 0 ms (pick up au prochain RAF).

### 6.4 — `LiquidMetalButton` (shader, tous les CTA)

**Décision** : le bouton **reste sombre** en light mode. Le shader liquid metal continue avec orange/violet sur base sombre.

**Approche en 2 temps lors de l'implémentation :**

1. **Lire d'abord** `src/components/canvas/LiquidMetalButton.tsx` (263 lignes) pour identifier les uniforms réels exposés par le shader (les noms `uColorA`, `uBgTint`, etc. sont à valider, pas à inventer).

2. **Selon le shader actuel, deux scénarios :**

   **Scénario A — le shader est déjà paramétré par couleurs** (uniforms du genre `uColor1`, `uColor2`, `uBg`, etc.) : on les mute via `useThemeColors()`. Pattern :
   ```tsx
   const colors = useThemeColors()
   useEffect(() => {
     if (!uniformsRef.current) return
     // Adapter aux noms RÉELS du shader, à confirmer après lecture du fichier
     uniformsRef.current.<uniform-color-1>.value.set(colors.orange)
     uniformsRef.current.<uniform-color-2>.value.set(colors.violet)
   }, [colors])
   ```

   **Scénario B — le shader a des couleurs hardcodées dans le GLSL** : alors le bouton **reste 100% inchangé** en light mode (pas de risque de casser le rendu). C'est cohérent avec la décision "CTA reste sombre" — le bouton ne change littéralement rien au switch.

**Reco par défaut, sans avoir lu le shader** : Scénario B. **Ne rien toucher** au LiquidMetalButton. Le bouton reste sombre avec ses couleurs orange/violet baked-in. Aucune régression possible. Si plus tard on veut affiner, on passe en Scénario A après avoir mappé les uniforms.

### 6.5 — `ParticleWaves` (~403 lignes)

Composant Three.js similaire à DottedSurface. Procédure de Phase 3 :

1. Identifier les usages : `grep -rn "ParticleWaves" src/`
2. Lire le composant pour repérer les couleurs baked-in (textures, materials, scene background, uniforms)
3. Appliquer le même pattern que DottedSurface :
   - Stocker les materials créés dans une `useRef`
   - Effet dédié sur `colors.pointTint` (ou équivalent) pour muter `material.color`
   - Si scene a un `scene.background` opaque, le passer en `transparent: true` pour hériter du CSS parent
4. Tester FPS au switch (cible : pas de drop visible, < 5 ms de coût)

---

## 7. Stratégie des assets

### 7.1 — Logos tiers SVG

**Audit one-shot** via script Python `tools/audit-svg-logos.py` qui parse chaque SVG dans `public/images/logos/` et identifie les monochromes (un seul `<path>` sans `fill` ou avec `fill="black"|"currentColor"`).

Sortie : `MONOCHROME_LOGOS` set inclus dans `AppLogos.tsx`.

`AppLogos.tsx` :

```tsx
const isMonochrome = MONOCHROME_LOGOS.has(logo.file)
<Image
  src={`/images/logos/${logo.file}`}
  style={isMonochrome ? { filter: 'var(--logo-filter)' } : undefined}
  // ...
/>
```

CSS vars (déjà définies en Section 3.1) :
- `[data-theme="dark"] { --logo-filter: invert(1) brightness(1); }`
- `[data-theme="light"] { --logo-filter: none; }`

### 7.2 — Images hero blog & réalisations

**Pattern** : conserver les images hero générées (style dark/tech) telles quelles, les wrapper dans `<BrowserFrame>` qui justifie le contraste comme une feature ("device frame" pattern Apple/Linear).

Aucune image à régénérer.

### 7.3 — Logos clients (Howden, IMRO, Polomarco...)

PNG/AVIF/WebP en couleurs réelles et transparents. Marchent sur les deux thèmes par construction. **Aucune action**.

### 7.4 — OG image, favicon, msapplication-TileColor

Restent **dark** (identité de marque, servis aux crawlers et OS, pas affectés par le toggle utilisateur).

---

## 8. Cas particulier du blog

**Décision** : les pages `/blog/[slug]` restent **forcées en dark**, indépendamment du toggle.

### 8.1 — Implémentation

```tsx
// src/app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <article data-theme="dark" data-blog-article className="...">
      {/* contenu inchangé, diagrammes HTML hardcodés gardent leur cohérence */}
    </article>
  )
}
```

Le sélecteur CSS `[data-theme="dark"]` sur l'article override automatiquement les vars de l'`<html>`. Native CSS, zéro hack.

### 8.1.1 — Rendu attendu (UX)

Quand toggle = light + user sur `/blog/[slug]` :
- Body et chrome (Header, Footer) restent en **cream** (suivent le `data-theme="light"` de `<html>`)
- L'article central a un fond **dark** (forcé par `data-theme="dark"` local)
- Le résultat : un article "encadré" par le chrome cream, comme une zone de lecture immersive type Notion ou Substack en mode clair

C'est **intentionnel** et signal visuel implicite "cette zone est en lecture optimisée". Pas un bug.

**Choix alternatif rejeté** : forcer aussi `<body>` et `<Header>`/`<Footer>` en dark sur les pages blog. Plus complexe (sélecteurs scope-up impossibles en CSS pur, devrait passer par un effet JS qui mute `<html>`), et casserait l'expérience du toggle qui semble inactif. Rejeté.

### 8.2 — Toggle UI sur `/blog/[slug]`

**Reste visible mais avec tooltip** "Le mode clair est désactivé sur les articles". Le toggle change quand même le state global (autres pages héritent). Plus transparent qu'une disparition mystérieuse.

### 8.3 — Listing `/blog` (non-article)

Reste **theme-aware** (cards d'articles = composants standards).

### 8.4 — Workflow blog futur

**Aucune modification**. Les nouvelles articles continuent d'avoir leurs `<div style="background:rgba(...);color:#e4e4e7">` en dur sans contrainte. Le verrou `data-theme="dark"` est appliqué au layout de la page article, transparent pour le contenu.

---

## 9. Plan d'exécution (4 phases)

### Phase 1 — Fondations (4-6h)

- Refactor `globals.css` en CSS vars dual-theme (Section 3.1)
- Refactor `src/lib/tokens.ts` pour pointer sur les vars (Section 3.2)
- Helper `themeColors()` pour Three.js (Section 3.3)
- Créer `ThemeProvider` (Section 5.2)
- Créer `applyTheme()` helper interne
- Inline script anti-FOUC dans `layout.tsx` (Section 5.1)
- Modifier `<body>` et wrap tree avec `<ThemeProvider>` (Section 5.4)
- Simplifier `viewport.themeColor`

**Validation** : toggle en console marche au refresh, pas de flash, perf identique.

### Phase 2 — Logo + Header/Footer (1-2h)

- Créer composant `<DkdpLogo>` (Section 4)
- Générer `dkdp_noir-croped.png` (script Python `tools/crop-logo-noir.py` ou recadrage manuel via macOS Preview)
- Migrer `Header.tsx`, `Footer.tsx` (×2), `a-propos/page.tsx`
- Créer `<ThemeToggle>` (Section 5.3)
- Placer le toggle dans `Header.tsx` (desktop + mobile)

**Validation** : logo flip propre sans layout shift, toggle visible et accessible.

### Phase 3 — Effets canvas (4-6h)

- Implémenter hook `useThemeColors` (Section 6.1)
- Adapter `DottedSurface` (Section 6.2)
- Adapter `InfiniteGrid` (Section 6.3)
- Adapter `LiquidMetalButton` (Section 6.4) — **bouton reste sombre**
- Adapter `ParticleWaves` (Section 6.5)

**Validation** : passer chaque page avec hero canvas, toggle 5x sans glitch, mesure FPS conservé.

### Phase 4 — Audit & finitions (3-4h)

- Audit logos tiers : script `tools/audit-svg-logos.py`, output `MONOCHROME_LOGOS` dans `AppLogos.tsx` (Section 7.1)
- Adapter `AppLogos.tsx` avec `--logo-filter`
- Lock blog en `data-theme="dark"` (Section 8)
- Audit visuel page par page (~30 pages) en light
- Greps systématiques pour les couleurs hardcodées :
  ```bash
  # Fonds neutres dark (à passer en var(--bg-card) ou var(--bg))
  grep -rn "bg-\[#0[Aa]\|bg-\[#14\|bg-\[#1[Ee]\|bg-\[#1[Aa]\|bg-\[#22\|bg-\[#0[Bb]" src/

  # Backgrounds blancs translucides (à passer en var(--surface-*))
  grep -rn "background:.*rgba(255,\s*255,\s*255" src/
  grep -rn "borderColor:.*rgba(255,\s*255,\s*255" src/

  # Textes blancs en dur (à passer en var(--text))
  grep -rn "text-white\|color:.*#[Ff][Ff][Ff]" src/

  # Textes noirs en dur (à passer en var(--text))
  grep -rn "color:.*#0[Aa]\|color:.*#000" src/
  ```

**Critère d'inclusion** : ne fixer QUE les couleurs **neutres de surface ou de texte** (#0A, #14, #1E, #fff, #000, rgba blanches/noires). **Les couleurs de marque restent hardcodées** (orange `#FF6B00`/`#FF8C00`, violet `#7C3AED`/`#A78BFA`, accents pillars `#A78BFA`/`#D4D4D8`/`#9CA3AF`/`#4ade80`/`#60a5fa`/`#f472b6`/`#2dd4bf`/`#fbbf24`) car les tokens piliers ont déjà leur version `_bg/_border` thème-aware via les CSS vars.

**Exemples concrets de violations attendues :**
- `Header.tsx` subnav : `bg-[#0A0A0A]/85` → `style={{background:'color-mix(in srgb, var(--bg) 85%, transparent)'}}`
- `AppLogos.tsx` : `background: 'rgba(255,255,255,0.04)'` → `background: 'var(--surface-default)'`
- `AppLogos.tsx` : `color: '#e4e4e7'` → `color: 'var(--text-secondary)'` (avec ajustement de la valeur de `--text-secondary` si besoin)

**Cas spécial — diagrammes inline dans pages services** : si on trouve du `<div style="background:rgba(...);color:#e4e4e7">` dans des pages NON-blog (ex: pages claude-ai, services-detail), ces blocs doivent être adaptés en CSS vars. Ils ne sont **pas couverts** par le verrou `data-theme="dark"` qui ne s'applique qu'aux articles blog.
- Tests Lighthouse light + dark

---

## 10. Critères de réussite (gates)

Pas de merge sur `main` tant que :

1. Toggle marche au refresh (state persisté `localStorage`)
2. **Aucun flash blanc/noir** au load, sur Safari + Chrome + Firefox + iOS
3. Lighthouse perf ≥ 95 en dark ET en light (homepage)
4. Lighthouse a11y ≥ 95 en dark ET en light (contraste WCAG AA min)
5. Toutes les pages marketing testées visuellement en light : pas de texte invisible, pas d'élément qui dépasse, pas de hardcode oublié
6. Articles blog restent en dark même quand toggle est en light
7. Sync entre 2 onglets ouverts marche (storage event)
8. Test mode privé Safari : toggle marche pendant la session, reset au refresh (degraded acceptable)
9. Test `prefers-reduced-motion` : transitions désactivées
10. Bouton toggle accessible clavier (focus visible, Enter/Space)

---

## 11. Risques connus + rollback

### 11.1 — Risques connus

| Risque | Probabilité | Mitigation |
|--------|-------------|------------|
| Flash micro-court avant exécution du script anti-FOUC | Faible | `:root` standalone = dark default, donc HTML statique ressemble déjà à dark |
| Next.js écrase `theme-color` meta tag après hydration | Faible | Test runtime en Phase 1, fallback : injection 100% JS si nécessaire |
| Hardcoded colors oubliés dans pages denses (claude-ai, services) | Moyen | Greps exhaustifs en Phase 4 + audit visuel page par page |
| Régression FPS sur DottedSurface au switch | Faible | Mutation `material.color` testée à ~2 ms, pas de rebuild de scène |
| Logos tiers SVG colorés mal détectés par audit | Faible | Audit one-shot avec review humaine des résultats avant intégration |

### 11.2 — Rollback strategy

- **Rollback partiel** : commit qui force `applyTheme('dark')` au mount du `ThemeProvider`. Désactive le toggle sans toucher au CSS. Le site reste en dark, comme avant.
- **Rollback complet** : revert du PR principal.

L'archi (CSS vars + toggle isolé) rend le rollback **safe et trivial**.

---

## 12. Bilan technique

| Métrique | Valeur attendue |
|----------|-----------------|
| Effort total | 12-18h (1.5-2 jours) |
| Bundle size delta | +2.5 KB gzip (anti-FOUC ~280B + ThemeProvider ~1KB + ThemeToggle ~600B + Radix icons ~600B) |
| LCP impact | 0 ms |
| INP impact | 0 ms en navigation, ~80-150 ms one-time au switch (GPU repaint, attendu) |
| CLS impact | 0 |
| Lighthouse | inchangé (95+ attendu sur les deux thèmes) |
| Régressions visuelles | aucune attendue (CSS vars + `:root` defaults éprouvé) |
| Charge maintenance future | minimale (composants nouveaux ne touchent à rien d'existant) |

---

## 13. Hors-scope explicitement

- Light mode sur les articles blog `/blog/[slug]` (verrou dark)
- Régénération des images hero existantes en versions light
- Détection automatique `prefers-color-scheme` (toggle manuel uniquement)
- A/B testing du default (light vs dark) — décision figée à dark par défaut
- Light mode sur le widget chat (reste sombre par design)
- Modification du PDF de devis (server-side, déjà en noir)
- Modification de l'OG image, favicon, schema JSON-LD logos

---

## 14. Suivi

- Lien plan d'implémentation : *à créer post-validation*
- Branche : `feature/light-mode` (à partir de `main`)
- PR : à ouvrir une fois Phase 4 validée
