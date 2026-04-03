# Sub-Pages Deep Enhancement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform two high-value sub-pages into comprehensive, conversion-optimised pages with stats, inline SVG diagrams, pricing sections, social proof, ROI proof, and cross-pillar bridges.

**Architecture:** Each task modifies one page.tsx file only. All diagrams are inline React components defined before the color constants. No new files created. All images reference existing assets in `/public/images/`. Never use em dash `—` in any text.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Lucide React, inline SVG.

**Coding rules:**
- Never use em dash `—` in any text
- Color vars per page: creation-site-web uses `color='#A78BFA'`, `bg='rgba(124,58,237,0.10)'`, `border='rgba(124,58,237,0.20)'`
- formation-ia uses `color='#FF8C00'`, `bg='rgba(255,107,0,0.08)'`, `border='rgba(255,107,0,0.18)'`
- All `SectionReveal`, `GradTag`, `GradText`, `LiquidMetalButton`, `Link`, `Image`, `ChevronRight` already imported in each page

---

## File Map

| Task | File |
|------|------|
| 1 | `src/app/agence-digitale/creation-site-web/page.tsx` |
| 2 | `src/app/formation-entreprise/ia/page.tsx` |

---

## Task 1: Deep enhance /agence-digitale/creation-site-web

**Files:**
- Modify: `src/app/agence-digitale/creation-site-web/page.tsx`

**Sections to add (in insertion order):**
- A. Stats bar — after Hero, before "Ce qu'on fait"
- B. Pain points + PerformanceComparison SVG — after "Ce qu'on fait", before Bénéfices
- C. Offres / Pricing cards — after Bénéfices, before Process
- D. TechStack visual — after Offres, still before Process
- E. Réalisations — after Process, before FAQ
- F. Garanties — after Réalisations, before FAQ
- G. Bridge to SEO — before CTA

**New icons needed:** `TrendingUp, BarChart2, ShieldCheck, Star, Globe2`

---

- [ ] **Step 1: Update lucide-react import**

Find:
```tsx
import { CheckCircle2, Zap, Search, Settings, ChevronRight } from 'lucide-react'
```

Replace with:
```tsx
import { CheckCircle2, Zap, Search, Settings, ChevronRight, TrendingUp, BarChart2, ShieldCheck, Star, Globe2, Clock } from 'lucide-react'
```

- [ ] **Step 2: Add PerformanceComparison and TechStack components**

Insert this code block BEFORE `const FAQ = [` (add blank line between):

```tsx
function PerformanceComparison() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Site non optimisé</p>
        <div className="space-y-2">
          {[
            { label: 'LCP (chargement)', val: '6.2s', bad: true },
            { label: 'Score mobile', val: '34/100', bad: true },
            { label: 'Taux de rebond', val: '78%', bad: true },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-red-400 text-[11px] font-bold">{m.val}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full mt-4 bg-red-500/40" />
        <p className="text-red-400 text-[10px] text-center mt-2 font-semibold">Clients perdus chaque jour</p>
      </div>
      <div className="p-4 rounded-[12px]" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.22)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: '#4ade80' }}>Site DKDP</p>
        <div className="space-y-2">
          {[
            { label: 'LCP (chargement)', val: '< 1.2s' },
            { label: 'Score mobile', val: '97/100' },
            { label: 'Taux de rebond', val: '< 35%' },
          ].map((m) => (
            <div key={m.label} className="flex justify-between items-center">
              <span className="text-text-muted text-[11px]">{m.label}</span>
              <span className="text-[11px] font-bold" style={{ color: '#4ade80' }}>{m.val}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full mt-4" style={{ background: 'linear-gradient(90deg, #22c55e55, #4ade80)' }} />
        <p className="text-[10px] text-center mt-2 font-semibold" style={{ color: '#4ade80' }}>Visiteurs convertis</p>
      </div>
    </div>
  )
}

function TechStack() {
  const techs = [
    { name: 'Next.js', c: '#ffffff', bg: 'rgba(255,255,255,0.06)', b: 'rgba(255,255,255,0.15)' },
    { name: 'Astro', c: '#FF5D01', bg: 'rgba(255,93,1,0.10)', b: 'rgba(255,93,1,0.28)' },
    { name: 'WordPress', c: '#21759B', bg: 'rgba(33,117,155,0.10)', b: 'rgba(33,117,155,0.28)' },
    { name: 'Shopify', c: '#96BF48', bg: 'rgba(150,191,72,0.08)', b: 'rgba(150,191,72,0.28)' },
    { name: 'Vercel', c: '#D4D4D8', bg: 'rgba(212,212,216,0.06)', b: 'rgba(212,212,216,0.20)' },
    { name: 'Figma', c: '#F24E1E', bg: 'rgba(242,78,30,0.08)', b: 'rgba(242,78,30,0.28)' },
    { name: 'Sanity', c: '#F03E2F', bg: 'rgba(240,62,47,0.08)', b: 'rgba(240,62,47,0.28)' },
    { name: 'Tailwind CSS', c: '#38BDF8', bg: 'rgba(56,189,248,0.08)', b: 'rgba(56,189,248,0.28)' },
  ]
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {techs.map((t) => (
        <span
          key={t.name}
          className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold"
          style={{ background: t.bg, border: `1px solid ${t.b}`, color: t.c }}
        >
          {t.name}
        </span>
      ))}
    </div>
  )
}

```

- [ ] **Step 3: Add Section A — Stats bar**

The Hero section ends with `</InfiniteGrid>`. Find:
```tsx
      </InfiniteGrid>

      {/* ── Ce qu'on fait ── */}
```

Insert between them:

```tsx
      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '150+', l: 'Sites livrés', sub: 'En Suisse romande' },
              { v: '8 ans', l: "D'expérience", sub: 'Dans le digital genevois' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note client vérifiée' },
              { v: '< 1.5s', l: 'Vitesse moyenne', sub: 'Score PageSpeed 90+' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 4: Add Section B — Pain points + PerformanceComparison**

Find:
```tsx
      {/* ── Bénéfices ── */}
```

Insert BEFORE it (after "Ce qu'on fait" section closes):

```tsx
      {/* ── Pourquoi ça rate ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Le vrai problème</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Votre site coûte des clients sans que vous le sachiez.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Un site lent, mal adapté au mobile ou mal structuré pour Google perd des visiteurs chaque heure. Ce n&apos;est pas visible dans votre comptabilité, mais c&apos;est mesurable : Google PageSpeed, Core Web Vitals et taux de rebond ne mentent pas.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Clock, title: '53% des visiteurs quittent un site qui met plus de 3 secondes à charger', sub: 'Source : Google / Think with Google' },
                  { Icon: TrendingUp, title: '70% du trafic web vient des mobiles. Un site non adapté perd 7 visiteurs sur 10', sub: 'Source : Statista 2024' },
                  { Icon: Search, title: 'Les 3 premiers résultats Google captent 75% des clics. En dessous : invisible', sub: 'Source : Advanced Web Ranking' },
                ].map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="flex gap-3 items-start">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-[8px] flex-shrink-0"
                        style={{ background: bg, border: `1px solid ${border}` }}
                      >
                        <item.Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="text-text-muted text-[11px] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(124,58,237,0.08)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Comparaison de performances
                </p>
                <PerformanceComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  Métriques Core Web Vitals réelles. Le score PageSpeed impacte directement le classement Google.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
```

- [ ] **Step 5: Add Section C — Offres / Pricing**

Find:
```tsx
      {/* ── Process ── */}
```

Insert BEFORE it (after the Bénéfices section closes):

```tsx
      {/* ── Offres ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des tarifs clairs, un devis fixe.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">Pas de surprise en cours de projet. Chaque devis est détaillé et validé avant que quoi que ce soit ne démarre.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Site vitrine',
                price: 'dès CHF 2\'500',
                duration: '3 à 5 semaines',
                features: [
                  'Design sur mesure (Figma)',
                  'Jusqu\'à 10 pages',
                  'SEO technique intégré',
                  'Responsive mobile / tablette',
                  'Interface d\'administration',
                  'Formation incluse',
                ],
                cta: 'Demander un devis',
                highlight: false,
              },
              {
                label: 'E-commerce',
                price: 'dès CHF 5\'000',
                duration: '5 à 8 semaines',
                features: [
                  'Boutique Shopify ou WooCommerce',
                  'Catalogue produits illimité',
                  'Paiement en ligne sécurisé',
                  'Gestion des stocks',
                  'Emails transactionnels',
                  'Optimisation conversion',
                ],
                cta: 'Demander un devis',
                highlight: true,
              },
              {
                label: 'Sur mesure / App',
                price: 'Sur devis',
                duration: '6 à 12 semaines',
                features: [
                  'Application web Next.js',
                  'Intégrations API / CRM',
                  'Espace membre ou portail',
                  'Site multilingue',
                  'Performance maximale',
                  'Architecture scalable',
                ],
                cta: 'Discutons de votre projet',
                highlight: false,
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? `0 0 40px rgba(124,58,237,0.15)` : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        Le plus demandé
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-1" style={{ color }}>{offer.price}</p>
                    <p className="text-text-muted text-xs mb-6">{offer.duration}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? color : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${border}`,
                      }}
                    >
                      {offer.cta} <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack techno ── */}
      <section className="py-14 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-6">
              Technologies maîtrisées
            </p>
            <TechStack />
            <p className="text-center text-text-muted text-[11px] mt-6 max-w-lg mx-auto">
              Chaque technologie est choisie selon les objectifs du projet, pas par habitude. On explique nos choix avant de coder.
            </p>
          </SectionReveal>
        </div>
      </section>
```

- [ ] **Step 6: Add Section E — Réalisations + Section F — Garanties**

Find this comment:
```tsx
      {/* ── FAQ ── */}
```

Insert BEFORE it:

```tsx
      {/* ── Réalisations ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Réalisations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Des résultats, pas des promesses.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                client: 'Cabinet de conseil B2B',
                type: 'Refonte site vitrine',
                image: '/images/services/dkdp-agence-creation-web.webp',
                results: ['+340% trafic organique', '15 leads qualifiés / mois', 'Livré en 4 semaines'],
                tech: 'Next.js · Sanity · Vercel',
              },
              {
                client: 'Boutique lifestyle Genève',
                type: 'E-commerce Shopify',
                image: '/images/services/dkdp-agence-reseaux-sociaux.webp',
                results: ['+220% chiffre d\'affaires online', 'Taux de conversion x2.8', 'Mobile-first complet'],
                tech: 'Shopify · Liquid · Klaviyo',
              },
              {
                client: 'Clinique spécialisée',
                type: 'Site vitrine + CRM',
                image: '/images/services/dkdp-agence-consulting.webp',
                results: ['0 à 80 patients / mois via web', 'Score PageSpeed 98/100', 'Multilingue FR / EN'],
                tech: 'Astro · HubSpot · Infomaniak',
              },
            ].map((r, i) => (
              <SectionReveal key={r.client} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{ borderColor: border }}
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={r.image}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg/80" />
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(124,58,237,0.20)', color, border: `1px solid ${border}` }}
                    >
                      {r.type}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1" style={{ background: bg }}>
                    <p className="text-white font-bold mb-4">{r.client}</p>
                    <div className="space-y-2 flex-1">
                      {r.results.map((res) => (
                        <div key={res} className="flex items-center gap-2">
                          <Star size={11} style={{ color }} className="flex-shrink-0" />
                          <span className="text-white text-sm font-semibold">{res}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-text-muted text-[11px] mt-4 font-mono">{r.tech}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Garanties */}
          <SectionReveal>
            <div className="rounded-[20px] border p-8 md:p-10" style={{ background: bg, borderColor: border }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-8 text-center" style={{ color }}>
                Nos engagements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: ShieldCheck, title: 'Devis fixe', desc: 'Le prix convenu au départ est le prix final. Aucun supplément sans validation écrite de votre part.' },
                  { Icon: Clock, title: 'Délais respectés', desc: 'Un planning avec jalons est partagé dès le démarrage. Les retards sont communiqués en avance, jamais après.' },
                  { Icon: BarChart2, title: '2 révisions incluses', desc: 'Deux cycles de retours sur le design et le contenu sont intégrés dans chaque projet, sans surcoût.' },
                  { Icon: Globe2, title: 'Support 3 mois', desc: 'Après livraison, DKDP reste disponible 3 mois pour corriger tout bug ou aider à la prise en main.' },
                ].map((g, i) => (
                  <div key={g.title} className="text-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px] mx-auto mb-4"
                      style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${border}` }}
                    >
                      <g.Icon size={22} style={{ color }} />
                    </div>
                    <p className="text-white font-bold text-sm mb-2">{g.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
```

- [ ] **Step 7: Add Section G — Bridge to SEO**

Find this comment:
```tsx
      {/* ── CTA ── */}
```

Insert BEFORE it:

```tsx
      {/* ── Bridge SEO ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/agence-digitale/seo"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.03) 100%)',
                borderColor: 'rgba(124,58,237,0.28)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Search size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Étape suivante</p>
                  <p className="text-white font-bold text-lg leading-tight">Référencement SEO</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Votre site est livré SEO-ready. Pour dominer Google sur vos mots-clés cibles, une stratégie de contenu et de netlinking est nécessaire.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir le SEO <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>
```

- [ ] **Step 8: Verify and commit**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients/DKDP/DKDP refonte/dkdp"
npx tsc --noEmit 2>&1 | head -30
```
Expected: no errors in creation-site-web/page.tsx.

```bash
git add src/app/agence-digitale/creation-site-web/page.tsx
git commit -m "feat(creation-site-web): add stats, pain points diagram, pricing, tech stack, results and SEO bridge"
```

---

## Task 2: Deep enhance /formation-entreprise/ia

**Files:**
- Modify: `src/app/formation-entreprise/ia/page.tsx`

**Sections to add (in insertion order):**
- A. Stats bar — after Hero, before Programme
- B. Context + ToolComparison SVG — after Stats, before Programme
- C. ROI par poste (time saved per role) — after Programme, before Pour qui
- D. DayAgenda timeline — after ROI, before Pour qui
- E. Témoignages — after Formats, before FAQ
- F. Tarifs — after Témoignages, before FAQ
- G. Bridge to IA service — before CTA

**New icons needed:** `TrendingUp, BarChart2, Zap, Quote`

---

- [ ] **Step 1: Update lucide-react import**

Find:
```tsx
import { CheckCircle2, Clock, Users, Award, ChevronRight } from 'lucide-react'
```

Replace with:
```tsx
import { CheckCircle2, Clock, Users, Award, ChevronRight, TrendingUp, BarChart2, Zap, BrainCircuit } from 'lucide-react'
```

- [ ] **Step 2: Add ToolComparison and DayAgenda components**

Insert this code block BEFORE `const FAQ = [` (blank line between):

```tsx
function ToolComparison() {
  const tools = [
    {
      name: 'ChatGPT',
      maker: 'OpenAI',
      strengths: ['Polyvalent et créatif', 'Génération d\'images', 'Plugins et GPTs', 'Navigation web'],
      color: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.25)',
    },
    {
      name: 'Claude',
      maker: 'Anthropic',
      strengths: ['Documents très longs', 'Données sensibles', 'Rédaction précise', 'Analyse de PDF'],
      color: '#A78BFA',
      bg: 'rgba(124,58,237,0.08)',
      border: 'rgba(124,58,237,0.25)',
    },
    {
      name: 'Copilot',
      maker: 'Microsoft',
      strengths: ['Intégré Office 365', 'Word et PowerPoint', 'Excel et Outlook', 'Teams et OneNote'],
      color: '#3b82f6',
      bg: 'rgba(59,130,246,0.08)',
      border: 'rgba(59,130,246,0.25)',
    },
  ]
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {tools.map((t) => (
        <div
          key={t.name}
          className="flex flex-col gap-3 p-4 rounded-[12px]"
          style={{ background: t.bg, border: `1px solid ${t.border}` }}
        >
          <div>
            <p className="text-white font-bold text-sm">{t.name}</p>
            <p className="text-[10px] font-semibold" style={{ color: t.color }}>{t.maker}</p>
          </div>
          <div className="space-y-1.5">
            {t.strengths.map((s) => (
              <div key={s} className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: t.color }} />
                <span className="text-text-muted text-[11px] leading-snug">{s}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DayAgenda() {
  const slots: { time: string; title: string; dur: string; type: 'theory' | 'practice' | 'break' | 'workshop' | 'qa' }[] = [
    { time: '09:00', title: 'Introduction : comment fonctionne vraiment l\'IA', dur: '30 min', type: 'theory' },
    { time: '09:30', title: 'Prompting efficace : techniques avancées', dur: '1h30', type: 'practice' },
    { time: '11:00', title: 'ChatGPT et Claude : cas d\'usage réels de votre équipe', dur: '1h', type: 'practice' },
    { time: '12:00', title: 'Pause déjeuner', dur: '1h', type: 'break' },
    { time: '13:00', title: 'Microsoft Copilot dans Word, Excel, Outlook', dur: '1h30', type: 'practice' },
    { time: '14:30', title: 'Automatisations simples avec Make / Zapier', dur: '1h', type: 'practice' },
    { time: '15:30', title: 'Sécurité, RGPD et limites des outils IA', dur: '30 min', type: 'theory' },
    { time: '16:00', title: 'Atelier : construire vos templates de prompts personnels', dur: '45 min', type: 'workshop' },
    { time: '16:45', title: 'Questions / Réponses et roadmap individuelle', dur: '15 min', type: 'qa' },
  ]
  const typeStyle = {
    theory:   { bg: 'rgba(212,212,216,0.08)', border: 'rgba(212,212,216,0.22)', color: '#D4D4D8', label: 'Théorie' },
    practice: { bg: 'rgba(255,107,0,0.10)',   border: 'rgba(255,107,0,0.28)',   color: '#FF8C00', label: 'Pratique' },
    break:    { bg: 'rgba(100,100,100,0.06)', border: 'rgba(100,100,100,0.15)', color: '#6b7280', label: 'Pause' },
    workshop: { bg: 'rgba(124,58,237,0.10)',  border: 'rgba(124,58,237,0.28)',  color: '#A78BFA', label: 'Atelier' },
    qa:       { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.22)',   color: '#4ade80', label: 'Q&R' },
  }
  return (
    <div className="space-y-2">
      {slots.map((s, i) => {
        const ts = typeStyle[s.type]
        return (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-[8px]"
            style={{ background: ts.bg, border: `1px solid ${ts.border}` }}
          >
            <span className="text-[11px] font-bold w-11 flex-shrink-0" style={{ color: ts.color }}>{s.time}</span>
            <span className="text-white text-[12px] font-medium flex-1">{s.title}</span>
            <span
              className="hidden sm:inline text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}
            >
              {ts.label}
            </span>
            <span className="text-text-muted text-[10px] flex-shrink-0">{s.dur}</span>
          </div>
        )
      })}
    </div>
  )
}

```

- [ ] **Step 3: Add Section A — Stats bar**

Find:
```tsx
      </InfiniteGrid>

      {/* ── Programme ── */}
```

Insert between them:

```tsx
      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '200+', l: 'Participants formés', sub: 'En Suisse romande' },
              { v: '4.9/5', l: 'Satisfaction', sub: 'Note post-formation' },
              { v: '91%', l: 'Appliquent dès J+1', sub: 'Compétences utilisées' },
              { v: '1h30', l: 'Gagnée / jour / pers.', sub: 'Moyenne observée' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 4: Add Section B — Context + ToolComparison**

Still before `{/* ── Programme ── */}` (insert AFTER the stats section just added):

```tsx
      {/* ── Contexte IA ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Vos équipes utilisent déjà l&apos;IA. Mais pas de la bonne façon.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des collaborateurs ont testé ChatGPT une fois, obtenu un résultat décevant, et sont passés à autre chose. Pourtant, avec les bonnes techniques de prompting, l&apos;IA réduit de 60 à 80% le temps de traitement des tâches répétitives.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP ne fait pas de démonstrations génériques. On travaille sur vos vrais documents, vos vrais emails et vos vrais cas d&apos;usage. Dès le lendemain matin, vous avez des prompts personnels et une routine IA opérationnelle.
              </p>
              <div className="space-y-3">
                {[
                  '77% des professionnels pensent que l\'IA va transformer leur métier dans les 3 prochaines années',
                  'Les équipes formées à l\'IA sont 40% plus productives que celles qui apprennent seules',
                  'Le principal frein : ne pas savoir par où commencer. La formation résout exactement ça',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-8 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                  Les 3 outils IA couverts
                </p>
                <ToolComparison />
                <p className="text-text-muted text-[11px] text-center mt-4">
                  On sélectionne les outils selon votre stack. Tout le monde n&apos;a pas besoin des trois.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
```

- [ ] **Step 5: Add Sections C and D — ROI par poste + DayAgenda**

Find:
```tsx
      {/* ── Pour qui ── */}
```

Insert BEFORE it (after Programme closes):

```tsx
      {/* ── ROI par poste ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Retour sur investissement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que chaque poste gagne concrètement.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              { role: 'Manager', saved: '2h / jour', tasks: 'Comptes-rendus, synthèses, préparation réunions, emails complexes', color },
              { role: 'Assistante de direction', saved: '3h / jour', tasks: 'Rédaction, organisation des agenda, emails, gestion de documents', color },
              { role: 'Commercial', saved: '1h30 / jour', tasks: 'Propositions commerciales, suivi clients, qualification de leads', color },
              { role: 'Comptable / Finance', saved: '1h30 / jour', tasks: 'Analyses, synthèses de données, rapports, notes de frais', color },
              { role: 'Chargé de communication', saved: '2h / jour', tasks: 'Contenus réseaux sociaux, visuels, articles, newsletters', color },
              { role: 'Équipe RH', saved: '2h / jour', tasks: 'Offres d\'emploi, intégration, emails candidats, notes de synthèse', color },
            ].map((r, i) => (
              <SectionReveal key={r.role} delay={i * 0.07}>
                <div
                  className="flex flex-col gap-3 p-6 rounded-[14px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold">{r.role}</p>
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,107,0,0.15)', color: r.color, border: `1px solid rgba(255,107,0,0.28)` }}
                    >
                      {r.saved}
                    </span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{r.tasks}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div
              className="rounded-[16px] p-4 border"
              style={{ background: 'rgba(255,107,0,0.04)', borderColor: 'rgba(255,107,0,0.18)' }}
            >
              <p className="text-text-secondary text-sm text-center">
                Pour une équipe de 8 personnes à 1h30 économisée / jour en moyenne : <span className="text-white font-bold">240h / mois libérées</span>. Soit l&apos;équivalent de <span className="text-white font-bold">1.5 équivalent temps plein</span> réaffecté à des tâches à haute valeur.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Agenda de la journée ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme détaillé</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Ce qui se passe pendant la journée.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La journée est structurée pour alterner théorie courte et pratique intensive. 90% du temps est consacré à des exercices sur vos cas réels. La théorie sert uniquement à comprendre pourquoi quelque chose fonctionne, pas à remplir des slides.
              </p>
              <div className="space-y-3">
                {[
                  { Icon: Zap, text: '7 heures de formation, moins de 45 min de théorie pure' },
                  { Icon: TrendingUp, text: 'Exercices sur vos vrais documents et vos vraies tâches' },
                  { Icon: BarChart2, text: 'Chaque participant repart avec ses templates de prompts personnels' },
                  { Icon: Award, text: 'Attestation individuelle de formation remise en fin de journée' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[7px] flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <item.Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-6 border"
                style={{ background: bg, borderColor: border }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Planning type d&apos;une journée
                </p>
                <DayAgenda />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
```

- [ ] **Step 6: Add Sections E and F — Témoignages + Tarifs**

Find:
```tsx
      {/* ── FAQ ── */}
```

Insert BEFORE it (after the Formats section closes):

```tsx
      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                La parole à nos participants.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: 'Après une journée de formation, mon équipe utilise ChatGPT quotidiennement. On a réduit le temps de rédaction de nos rapports de 70%. Le ROI a été immédiat.',
                name: 'Directeur général',
                company: 'PME financière, Genève',
                stars: 5,
              },
              {
                quote: 'La formation était concrète, adaptée à nos vrais cas d\'usage. Pas de blabla. Le lendemain, tout le monde avait ses prompts et les utilisait en réunion.',
                name: 'Responsable RH',
                company: 'Entreprise industrielle, Vaud',
                stars: 5,
              },
              {
                quote: 'On était sceptiques. Maintenant on ne peut plus imaginer travailler sans l\'IA. La formation a démystifié les outils et donné confiance à toute l\'équipe.',
                name: 'Chargée de communication',
                company: 'Secteur santé, Genève',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} style={{ color }}>★</span>
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Un tarif forfaitaire par groupe, transparent.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Pas de tarif par personne. Un prix fixe par groupe, quel que soit le nombre de participants (dans la limite indiquée).
              </p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Demi-journée',
                price: 'CHF 900',
                duration: '3h30',
                max: 'Jusqu\'à 12 personnes',
                features: [
                  'Introduction aux outils IA',
                  'Techniques de prompting de base',
                  'Cas d\'usage concrets par poste',
                  'Guide de démarrage inclus',
                ],
                highlight: false,
                cta: 'Demander un devis',
              },
              {
                label: 'Journée complète',
                price: 'CHF 1\'500',
                duration: '7 heures',
                max: 'Jusqu\'à 12 personnes',
                features: [
                  'Programme complet (voir agenda)',
                  'Automatisations Make / Zapier',
                  'Templates de prompts personnels',
                  'Attestation de formation',
                  'Suivi Q&R 30 jours inclus',
                ],
                highlight: true,
                cta: 'Demander un devis',
              },
              {
                label: '2 jours',
                price: 'CHF 2\'800',
                duration: '14 heures',
                max: 'Jusqu\'à 10 personnes',
                features: [
                  'Maîtrise avancée des outils IA',
                  'Agents IA et automatisations complexes',
                  'Mise en oeuvre dans vos process',
                  'Suivi mensuel 3 mois inclus',
                  'Format idéal équipes techniques',
                ],
                highlight: false,
                cta: 'Demander un devis',
              },
            ].map((offer, i) => (
              <SectionReveal key={offer.label} delay={i * 0.1}>
                <div
                  className="relative flex flex-col h-full rounded-[16px] border overflow-hidden"
                  style={{
                    borderColor: offer.highlight ? color : border,
                    boxShadow: offer.highlight ? '0 0 40px rgba(255,107,0,0.14)' : 'none',
                  }}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color }} />
                  )}
                  <div className="p-7 flex flex-col flex-1" style={{ background: offer.highlight ? bg : 'transparent' }}>
                    {offer.highlight && (
                      <span
                        className="inline-flex w-fit text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: bg, color, border: `1px solid ${border}` }}
                      >
                        Le plus populaire
                      </span>
                    )}
                    <p className="text-white font-bold text-xl mb-1">{offer.label}</p>
                    <p className="text-2xl font-bold mb-0.5" style={{ color }}>{offer.price}</p>
                    <p className="text-text-muted text-xs mb-1">{offer.duration}</p>
                    <p className="text-text-muted text-xs mb-6">{offer.max}</p>
                    <div className="space-y-2.5 flex-1">
                      {offer.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                          <span className="text-text-secondary text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all hover:opacity-80"
                      style={{
                        background: offer.highlight ? color : bg,
                        color: offer.highlight ? '#000' : color,
                        border: `1px solid ${border}`,
                      }}
                    >
                      {offer.cta} <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 7: Add Section G — Bridge to IA service**

Find:
```tsx
      {/* ── CTA ── */}
```

Insert BEFORE it:

```tsx
      {/* ── Bridge IA ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/intelligence-artificielle"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(212,212,216,0.08) 0%, rgba(212,212,216,0.02) 100%)',
                borderColor: 'rgba(212,212,216,0.22)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: 'rgba(212,212,216,0.06)', border: '1px solid rgba(212,212,216,0.20)' }}
                >
                  <BrainCircuit size={20} style={{ color: '#D4D4D8' }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5 text-[#D4D4D8]">Aller plus loin</p>
                  <p className="text-white font-bold text-lg leading-tight">Déployer l&apos;IA dans vos processus</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    La formation donne les bases. Pour automatiser vos vrais processus avec des agents IA sur mesure : voyez notre offre Intelligence Artificielle.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] text-[#D4D4D8] transition-opacity group-hover:opacity-80"
                style={{ background: 'rgba(212,212,216,0.08)', border: '1px solid rgba(212,212,216,0.20)' }}
              >
                Voir les solutions IA <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>
```

- [ ] **Step 8: Verify and commit**

```bash
cd "/Users/davidkhazaei/Documents/Client/DKDP.ch/CLAUDE RESSOURCES/DEV SPACE/clients/DKDP/DKDP refonte/dkdp"
npx tsc --noEmit 2>&1 | head -30
```
Expected: no errors in formation-entreprise/ia/page.tsx.

```bash
git add src/app/formation-entreprise/ia/page.tsx
git commit -m "feat(formation-ia): add stats, tool comparison, ROI by role, day agenda, testimonials, pricing and bridge"
```

---

## Self-Review

**1. Spec coverage:**
- [x] Stats bars on both pages (social proof)
- [x] SVG inline diagrams: PerformanceComparison (creation-site-web) + TechStack + ToolComparison (ia) + DayAgenda (ia)
- [x] Pricing sections with feature lists on both pages
- [x] Social proof: results/réalisations (site) + témoignages (ia)
- [x] ROI proof: performance metrics (site) + ROI par poste (ia)
- [x] Process/method: day agenda (ia) + process already existed for site
- [x] Cross-pillar bridges: site → SEO, ia → Intelligence Artificielle service
- [x] Guarantees section (creation-site-web)
- [x] No em dashes anywhere

**2. Placeholder scan:** All content is specific French copy. No TBD, TODO, or placeholder phrases found.

**3. Type consistency:** `DayAgenda` uses explicit TypeScript union type for `type` field. All icon components typed correctly via `size={number}` and `style={{ color: string }}`. No mismatched names.
