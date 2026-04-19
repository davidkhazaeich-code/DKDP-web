'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

const IMAGES = [
  {
    src: '/images/gallery/formation-claude-ai-atelier-groupe.webp',
    alt: 'Formation Claude IA Genève 2026 : formateur animant une session Claude AI avec un petit groupe de professionnels',
    caption: 'Session Claude.ai en petit groupe',
  },
  {
    src: '/images/gallery/formation-claude-ai-analyse-documents.webp',
    alt: 'Formation Claude IA : professionnelle analysant des documents longs avec Claude Extended Thinking en entreprise',
    caption: 'Analyse de documents avec Claude',
  },
  {
    src: '/images/gallery/formation-claude-code-dev.webp',
    alt: 'Formation Claude Code Genève : développeur utilisant l agent IA Claude Code sur son setup double écran',
    caption: 'Module Claude Code pour développeurs',
  },
  {
    src: '/images/gallery/formation-claude-projects-équipe.webp',
    alt: 'Formation Claude Projects Genève : équipe collaborant sur un espace Claude partagé lors d une session DKDP',
    caption: 'Atelier Claude Projects en équipe',
  },
  {
    src: '/images/gallery/formation-ia-salle-formation-geneve.webp',
    alt: 'Formation IA entreprise Genève 2026 : formateur présentant devant un petit groupe dans une salle moderne',
    caption: 'Session en salle, petit groupe',
  },
  {
    src: '/images/services/dkdp-formation-ia-conference-geneve.webp',
    alt: 'Formation Claude IA entreprise Genève 2026 : conférence DKDP devant un groupe de professionnels',
    caption: 'Session plénière DKDP',
  },
]

export function GalleryFormationClaudeAI() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setLightbox(i)}
            className="group relative aspect-[16/10] rounded-[12px] overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{ borderColor: 'rgba(167,139,250,0.12)', background: 'rgba(167,139,250,0.04)' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[11px] md:text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img.caption}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={28} />
          </button>

          <div className="relative w-[90vw] max-w-[1000px] aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].alt}
              fill
              className="object-contain rounded-lg"
              sizes="90vw"
              priority
            />
          </div>

          <p className="absolute bottom-8 text-white/80 text-sm font-medium">
            {IMAGES[lightbox].caption}
          </p>

          {/* Nav arrows */}
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Précédente"
            >
              &larr;
            </button>
          )}
          {lightbox < IMAGES.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Suivante"
            >
              &rarr;
            </button>
          )}
        </div>
      )}
    </>
  )
}
