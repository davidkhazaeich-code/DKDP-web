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

Toutes les images WebP en qualite 85, target 300 KB max (degradation par paliers de 5 jusqu'a quality 65).

## Pre-requis

- `sharp` installe via `npm install --save-dev sharp`
- Playwright deja present (dependance racine)
- Acces internet pour atteindre l'URL cible
