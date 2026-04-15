import { SectionReveal } from '@/components/ui/SectionReveal'
import { ParallaxImage } from '@/components/ui/ParallaxImage'

const GALLERY = [
  {
    src: '/images/apps/dkdp-app-fitness-tracking-mobile.webp',
    alt: 'Application mobile fitness et santé sur iPhone : suivi activité, fréquence cardiaque et statistiques, développée par DKDP Genève',
    caption: 'App mobile santé',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-saas-project-management.webp',
    alt: 'Dashboard SaaS gestion de projet sur MacBook : kanban, suivi équipe et tableaux de bord, développé par DKDP Genève',
    caption: 'SaaS gestion de projet',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-food-delivery-mobile.webp',
    alt: 'Application livraison de repas sur iPhone : menu restaurant, suivi commande en temps réel, développée par DKDP',
    caption: 'App livraison mobile',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-fintech-banking-mobile.webp',
    alt: 'Application fintech bancaire sur iPhone : solde, historique transactions et virements, développée par DKDP Genève',
    caption: 'App fintech',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-ecommerce-fashion-ipad.webp',
    alt: 'Application e-commerce mode luxe sur iPad : catalogue produits et navigation élégante, développée par DKDP Genève',
    caption: 'E-commerce mode',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-immobilier-responsive.webp',
    alt: 'Application immobilière responsive MacBook et iPhone : carte annonces, fiches biens et contact agent, développée par DKDP',
    caption: 'App immobilier responsive',
    aspect: 'landscape' as const,
  },
]

export function AppGallery() {
  return (
    <div className="space-y-4">
      {/* Row 1: portrait + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
        <SectionReveal delay={0}>
          <GalleryCard item={GALLERY[0]} />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <GalleryCard item={GALLERY[1]} />
        </SectionReveal>
      </div>

      {/* Row 2: landscape + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionReveal delay={0.12}>
          <GalleryCard item={GALLERY[2]} />
        </SectionReveal>
        <SectionReveal delay={0.16}>
          <GalleryCard item={GALLERY[4]} />
        </SectionReveal>
      </div>

      {/* Row 3: portrait + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
        <SectionReveal delay={0.2}>
          <GalleryCard item={GALLERY[3]} />
        </SectionReveal>
        <SectionReveal delay={0.24}>
          <GalleryCard item={GALLERY[5]} />
        </SectionReveal>
      </div>
    </div>
  )
}

function GalleryCard({ item }: { item: (typeof GALLERY)[number] }) {
  const aspectClass = item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'

  return (
    <div className="group relative rounded-[14px] border border-border bg-bg-card overflow-hidden hover:-translate-y-0.5 transition-transform duration-300">
      {/* Parallax image — overflow handled by parent */}
      <ParallaxImage
        src={item.src}
        alt={item.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`w-full ${aspectClass}`}
        strength={10}
      />

      {/* Hover overlay + caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <span className="text-[12px] font-semibold text-white/90 tracking-wide">{item.caption}</span>
      </div>
    </div>
  )
}
