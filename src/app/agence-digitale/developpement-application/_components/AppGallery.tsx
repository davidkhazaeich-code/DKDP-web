import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'

const GALLERY = [
  {
    src: '/images/apps/dkdp-app-mobile-crm-dashboard.webp',
    alt: 'Application mobile CRM sur mesure pour PME : dashboard contacts, pipeline et KPIs, développé par DKDP Genève',
    caption: 'CRM mobile sur mesure',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-saas-web-dashboard.webp',
    alt: 'Dashboard SaaS web application pour entreprise : analytics, tableaux de bord et gestion métier, développé par DKDP Genève',
    caption: 'Web App & SaaS',
    aspect: 'landscape' as const,
  },
  {
    src: '/images/apps/dkdp-app-gestion-interventions-terrain.webp',
    alt: 'Application mobile gestion interventions terrain pour techniciens suisses : carte, assignation et checklists, DKDP',
    caption: 'Gestion interventions terrain',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-ecommerce-mobile.webp',
    alt: 'Application e-commerce mobile premium pour boutique suisse : catalogue produits, panier et suivi commande, DKDP Genève',
    caption: 'E-commerce mobile',
    aspect: 'portrait' as const,
  },
  {
    src: '/images/apps/dkdp-app-pwa-cross-platform-tablet.webp',
    alt: 'PWA progressive web app responsive sur mobile, tablette et ordinateur : interface unifiée et synchronisée, développé par DKDP',
    caption: 'PWA multi-supports',
    aspect: 'landscape' as const,
  },
]

export function AppGallery() {
  return (
    <div className="space-y-6">
      {/* Row 1: portrait + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <SectionReveal delay={0}>
          <GalleryCard item={GALLERY[0]} />
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <GalleryCard item={GALLERY[1]} />
        </SectionReveal>
      </div>

      {/* Row 2: portrait + portrait + landscape */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-6">
        <SectionReveal delay={0.15}>
          <GalleryCard item={GALLERY[2]} />
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <GalleryCard item={GALLERY[3]} />
        </SectionReveal>
        <SectionReveal delay={0.25}>
          <GalleryCard item={GALLERY[4]} />
        </SectionReveal>
      </div>
    </div>
  )
}

function GalleryCard({ item }: { item: (typeof GALLERY)[number] }) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] border border-border bg-bg-card hover:-translate-y-0.5 transition-transform duration-300">
      <div className={`relative w-full ${item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[12px] font-semibold text-white/90">{item.caption}</span>
        </div>
      </div>
    </div>
  )
}
