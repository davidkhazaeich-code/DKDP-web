# InfiniteGrid Expansion + Parallax — Design Spec
Date: 2026-04-02

## Objective
Add InfiniteGrid sections to key conversion/social-proof sections across all pages, with a light parallax effect on the ambient blobs in every grid instance.

## Parallax (InfiniteGrid.tsx)
- Add `useScroll` + `useTransform` targeting `containerRef`
- `blobY = useTransform(scrollYProgress, [0, 1], [40, -40])`
- Apply `style={{ y: blobY }}` to the blobs wrapper `<motion.div>`
- Effect: blobs drift ±40px as section scrolls through viewport — subtle depth, zero UX friction
- Automatic for ALL InfiniteGrid instances (no per-page changes needed)

## Color tokens
| Pillar | accentRgb | blob1 | blob2 |
|--------|-----------|-------|-------|
| Agence Digitale | `124,58,237` | `rgba(124,58,237,0.14)` | `rgba(124,58,237,0.07)` |
| Formation | `255,140,0` | `rgba(255,107,0,0.13)` | `rgba(255,107,0,0.06)` |
| IA | `212,212,216` | `rgba(212,212,216,0.09)` | `rgba(124,58,237,0.08)` |

## Adjacency rule
Minimum 1 bare section between any two InfiniteGrid instances. Verified per page below.

## Grid additions per page

### Agence Digitale (violet)
- `agence-digitale/` → Testimonials
- `creation-site-web` → Offres
- `seo` → Offres + Témoignages (Process in between)
- `publicite-sea` → Offres only (Témoignages adjacent)
- `reseaux-sociaux` → Offres + Témoignages (Process in between)
- `creation-video` → Offres + Témoignages (Process in between)
- `consulting-marketing` → Offres + Témoignages (Process in between)
- `rgpd-cookies` → Offres + Témoignages (Process in between)

### Intelligence Artificielle (zinc/dual)
- `intelligence-artificielle/` → Services
- `agents-ia` → Témoignages (Pricing adjacent, pick one)
- `automatisation` → Témoignages (Pricing adjacent, pick one)
- `audit-conseil` → Testimonials (Pricing adjacent, pick one)
- `mise-en-place` → Testimonials (Pricing adjacent, pick one)

### Formation Entreprise (orange)
- `formation-entreprise/` → Déroulement
- `formation/ia` → Témoignages (Tarifs adjacent to ROICalc)
- `bureautique` → Tarifs (Témoignages adjacent, pick one)
- `cybersecurite` → Tarifs
- `reseaux-sociaux` → Tarifs
- `web-design` → Tarifs
- `informatique` → Tarifs
- `montage-video` → Tarifs
