'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/* Photos reelles de sessions de formation IA DKDP (dossier gallery), les memes
   que sur les pages IA et Claude. Alts reecrits pour la formation ChatGPT. */
const IMAGES = [
  {
    src: '/images/gallery/formation-ia-entreprise-geneve-structure-prompt.webp',
    fr: { alt: 'Formation ChatGPT Genève : atelier DKDP sur la structure d\'une demande, rôle, contexte et format, en petit groupe', caption: 'Atelier : structurer une demande' },
    en: { alt: 'ChatGPT training Geneva: DKDP workshop on how to structure a request, role, context and format, in a small group', caption: 'Workshop: structuring a request' },
  },
  {
    src: '/images/gallery/formation-ia-entreprise-geneve-animation-atelier.webp',
    fr: { alt: 'Formation ChatGPT en entreprise Genève : formateur DKDP animant un atelier pratique autour de la table de réunion', caption: 'Atelier pratique en équipe' },
    en: { alt: 'Corporate ChatGPT training Geneva: DKDP trainer leading a hands-on workshop around the meeting table', caption: 'Hands-on team workshop' },
  },
  {
    src: '/images/gallery/formation-ia-entreprise-geneve-session-equipe.webp',
    fr: { alt: 'Formation ChatGPT Genève 2026 : équipe travaillant sur ses propres cas d\'usage pendant une session DKDP', caption: 'Travail sur vos cas réels' },
    en: { alt: 'ChatGPT training Geneva 2026: team working on its own use cases during a DKDP session', caption: 'Working on your real cases' },
  },
  {
    src: '/images/gallery/formation-ia-entreprise-geneve-atelier-paperboard.webp',
    fr: { alt: 'Formation ChatGPT entreprise Genève : cadrage des tâches à confier à ChatGPT Work au paperboard pendant une session DKDP', caption: 'Cadrage des missions à confier à Work' },
    en: { alt: 'Corporate ChatGPT training Geneva: scoping the tasks to hand to ChatGPT Work on the flip chart during a DKDP session', caption: 'Scoping the missions for Work' },
  },
  {
    src: '/images/gallery/formation-ia-workshop-table-vue-dessus.webp',
    fr: { alt: 'Formation ChatGPT Genève : vue aérienne d\'une table d\'atelier avec laptops, carnets et post-its lors d\'une session DKDP', caption: 'Atelier collaboratif' },
    en: { alt: 'ChatGPT training Geneva: overhead view of a workshop table with laptops, notebooks and sticky notes during a DKDP session', caption: 'Collaborative workshop' },
  },
  {
    src: '/images/gallery/formation-ia-participante-focus.webp',
    fr: { alt: 'Formation ChatGPT Genève : participante concentrée prenant en main ChatGPT sur son laptop lors d\'une formation DKDP', caption: 'Prise en main de ChatGPT' },
    en: { alt: 'ChatGPT training Geneva: focused participant getting to grips with ChatGPT on her laptop during a DKDP session', caption: 'Getting started with ChatGPT' },
  },
  {
    src: '/images/gallery/formation-ia-salle-formation-geneve.webp',
    fr: { alt: 'Formation ChatGPT entreprise Genève 2026 : formateur DKDP présentant devant un petit groupe dans une salle moderne', caption: 'Session en salle, petit groupe' },
    en: { alt: 'Corporate ChatGPT training Geneva 2026: DKDP trainer presenting to a small group in a modern room', caption: 'Classroom session, small group' },
  },
  {
    src: '/images/gallery/formation-ia-collaboration-laptop.webp',
    fr: { alt: 'Formation ChatGPT Genève : exercice pratique en duo sur laptop pendant un atelier DKDP', caption: 'Exercice pratique en duo' },
    en: { alt: 'ChatGPT training Geneva: hands-on exercise in pairs on a laptop during a DKDP workshop', caption: 'Hands-on exercise in pairs' },
  },
]

const COPY = {
  fr: { close: 'Fermer', prev: 'Précédente', next: 'Suivante' },
  en: { close: 'Close', prev: 'Previous', next: 'Next' },
} as const

export function GalleryFormationChatGpt({ lang = 'fr' }: { lang?: Locale }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const t = COPY[lang]

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setLightbox(i)}
            className="group relative aspect-[16/10] rounded-[12px] overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{ borderColor: 'rgba(255,140,0,0.14)', background: 'rgba(255,140,0,0.04)' }}
          >
            <Image
              src={img.src}
              alt={img[lang].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[11px] md:text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img[lang].caption}
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
            aria-label={t.close}
          >
            <X size={28} />
          </button>

          <div className="relative w-[90vw] max-w-[1000px] aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox][lang].alt}
              fill
              className="object-contain rounded-lg"
              sizes="90vw"
              priority
            />
          </div>

          <p className="absolute bottom-8 text-white/80 text-sm font-medium">
            {IMAGES[lightbox][lang].caption}
          </p>

          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label={t.prev}
            >
              &larr;
            </button>
          )}
          {lightbox < IMAGES.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label={t.next}
            >
              &rarr;
            </button>
          )}
        </div>
      )}
    </>
  )
}
