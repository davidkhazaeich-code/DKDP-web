import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Dimensions intrinseques d'une image de `public/`, lues dans l'en-tete du
 * fichier (PNG, JPEG, WebP), cote serveur uniquement.
 *
 * next/image exige width et height pour une image « en flux » (les vignettes
 * en `fill` s'en passent). Les articles du blog declarent leurs images par
 * chemin seulement (`BlogImage`), et 44 d'entre elles sont des PNG de 500 Ko
 * a 1 Mo servis bruts (action D22 du plan SEO du 20/09/2026) : ce lecteur
 * evite d'ajouter deux champs a la main dans 37 fichiers. Cache par chemin,
 * le build lit chaque fichier une fois. `null` si le format n'est pas reconnu :
 * l'appelant retombe sur un <img> classique.
 */
const cache = new Map<string, { width: number; height: number } | null>()

export function intrinsicSize(publicPath: string): { width: number; height: number } | null {
  const hit = cache.get(publicPath)
  if (hit !== undefined) return hit
  let size: { width: number; height: number } | null = null
  try {
    const buf = readFileSync(join(process.cwd(), 'public', publicPath))
    size = png(buf) ?? webp(buf) ?? jpeg(buf)
  } catch {
    size = null
  }
  cache.set(publicPath, size)
  return size
}

function png(b: Buffer) {
  if (b.length < 24 || b.toString('ascii', 1, 4) !== 'PNG') return null
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

function webp(b: Buffer) {
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
  }
  if (chunk === 'VP8X') return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 }
  return null
}

function jpeg(b: Buffer) {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i++; continue }
    const marker = b[i + 1]
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue }
    const len = b.readUInt16BE(i + 2)
    if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) }
    }
    i += 2 + len
  }
  return null
}
