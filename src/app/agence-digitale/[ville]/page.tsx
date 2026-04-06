import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ChevronRight, Globe2, Users, Building2, Phone, CheckCircle2 } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { VideoHeroBg } from '@/components/ui/VideoHeroBg'
import { ImageHeroBg } from '@/components/ui/ImageHeroBg'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildBreadcrumbList, buildFAQPage, buildWebPageWithSpeakable } from '@/lib/schema'
import { CITIES, getCity } from '@/lib/cities'
import { violet } from '@/lib/tokens'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

const V = violet.color
const VB = violet.bg
const VD = violet.border

export function generateStaticParams() {
  return CITIES.map(city => ({ ville: city.slug }))
}

type Props = { params: Promise<{ ville: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params
  const city = getCity(ville)
  if (!city) return {}

  const title = `Agence Digitale ${city.name} · Sites web, SEO & IA | DKDP`
  const description = `Agence digitale pour les entreprises de ${city.name} (${city.canton}). Creation de sites web, SEO, intelligence artificielle et formation. ${city.distance}. Devis gratuit.`

  return {
    title,
    description,
    alternates: { canonical: `https://dkdp.ch/agence-digitale/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `https://dkdp.ch/agence-digitale/${city.slug}`,
    },
  }
}

const SERVICES = [
  { label: 'Creation de site web', href: '/agence-digitale/creation-site-web', desc: 'Sites vitrines, e-commerce et applications web sur mesure.' },
  { label: 'Referencement SEO', href: '/agence-digitale/seo', desc: 'SEO local et national pour dominer Google dans votre region.' },
  { label: 'Intelligence artificielle', href: '/intelligence-artificielle', desc: 'Agents IA, automatisation et audit pour gagner en productivite.' },
  { label: 'Formation IA entreprise', href: '/formation-entreprise/ia', desc: 'Formations pratiques IA generative et prompt engineering.' },
  { label: 'Publicite Google Ads', href: '/agence-digitale/publicite-sea', desc: 'Campagnes Search et Performance Max, leads qualifies.' },
  { label: 'Consulting marketing', href: '/agence-digitale/consulting-marketing', desc: 'Strategie digitale, audit et plan d\'action sur mesure.' },
]

export default async function CityPage({ params }: Props) {
  const { ville } = await params
  const city = getCity(ville)
  if (!city) notFound()

  const faq = [
    {
      question: `Combien coute un site web a ${city.name} ?`,
      answer: `Un site vitrine professionnel pour une entreprise de ${city.name} demarre a CHF 2'500. Un site e-commerce ou une application web se situe entre CHF 5'000 et CHF 12'000. DKDP fournit un devis fixe sans surprises, quel que soit votre localisation en Suisse romande.`,
    },
    {
      question: `DKDP se deplace-t-il a ${city.name} ?`,
      answer: `Oui. Nos bureaux sont a Geneve (${city.distance}), mais nous travaillons regulierement avec des clients de ${city.name}. Les reunions peuvent se faire en personne, en visioconference, ou en hybride selon vos preferences.`,
    },
    {
      question: `Pourquoi choisir DKDP pour mon projet digital a ${city.name} ?`,
      answer: `DKDP combine 10+ ans d'experience, 700+ clients accompagnes et une expertise triple : web, IA et formation. Contrairement aux freelances, nous offrons un suivi complet et une equipe pluridisciplinaire. Notre proximite avec ${city.name} permet des echanges reguliers.`,
    },
    {
      question: `Proposez-vous du SEO local pour ${city.name} ?`,
      answer: `Absolument. Nous optimisons votre Google Business Profile, creons du contenu geo-cible pour ${city.name} et ${city.canton}, et mettons en place une strategie de netlinking local. Resultats visibles en 3 a 6 mois.`,
    },
  ]

  return (
    <main className="pt-14">
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: city.name, url: `https://dkdp.ch/agence-digitale/${city.slug}` },
      ])} />
      <SchemaOrg schema={buildFAQPage(faq)} />
      <SchemaOrg schema={buildWebPageWithSpeakable({
        name: `Agence Digitale ${city.name}`,
        url: `/agence-digitale/${city.slug}`,
        description: city.description,
      })} />

      {/* ── Hero ── */}
      {(() => {
        const heroContent = (
          <section className="pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36 min-h-[70vh] md:min-h-[75vh] flex flex-col justify-center">
            <div className="max-w-[1200px] mx-auto px-5 md:px-6 flex flex-col items-center text-center">
              <nav className="flex items-center justify-center gap-1.5 mb-5 md:mb-6" aria-label="Fil d'Ariane">
                <Link href="/agence-digitale" className="text-text-muted text-xs md:text-sm hover:text-white transition-colors">
                  Service Digital
                </Link>
                <ChevronRight size={12} className="text-text-muted" />
                <span className="text-white text-xs md:text-sm font-medium">{city.name}</span>
              </nav>
              <div className="max-w-2xl">
                <GradTag className="mb-5">
                  <MapPin size={11} className="mr-1" /> {city.name}, {city.canton}
                </GradTag>
                <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.1] mb-5">
                  Agence digitale pour les entreprises de{' '}
                  <GradText as="span">{city.name}</GradText>
                </h1>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8" data-speakable="true">
                  Sites web, SEO, intelligence artificielle et formation. DKDP, agence basee a Geneve, accompagne 700+ entreprises en Suisse romande.
                </p>
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <LiquidMetalButton href="/contact" size="lg">Demarrer un projet →</LiquidMetalButton>
                  <Link href="/tarifs" className="text-sm text-text-muted hover:text-white transition-colors px-2 py-1">
                    Voir les tarifs
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )

        if (city.videoSrc) {
          return (
            <VideoHeroBg videoSrc={city.videoSrc} overlayOpacity={0.65} blob1="rgba(124,58,237,0.10)" blob2="rgba(255,107,0,0.05)">
              {heroContent}
            </VideoHeroBg>
          )
        }

        return (
          <ImageHeroBg imageSrc={city.imageSrc!} overlayOpacity={0.55} blob1="rgba(124,58,237,0.10)" blob2="rgba(255,107,0,0.05)">
            {heroContent}
          </ImageHeroBg>
        )
      })()}

      {/* ── Stats bar ── */}
      <section className="py-10 md:py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { v: '700+', l: 'Clients accompagnes' },
              { v: '10+ ans', l: "D'experience" },
              { v: '5/5', l: 'Note Google' },
              { v: city.distance, l: `De ${city.name}` },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-white">{s.v}</p>
                  <p className="text-xs md:text-sm text-text-muted mt-1">{s.l}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pourquoi nous faire confiance ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Expertise locale</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
                Pourquoi les entreprises de {city.name} nous font confiance
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                {city.localContext}
              </p>
              <div className="space-y-5">
                {[
                  { Icon: Building2, title: 'Tissu economique', text: city.economicProfile },
                  { Icon: Users, title: 'Population', text: city.population },
                  { Icon: Globe2, title: 'Proximite', text: city.distance },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-border bg-white/[0.03]">
                      <item.Icon size={14} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-text-muted text-xs mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services card */}
            <div className="p-5 md:p-6 rounded-2xl border border-border bg-white/[0.02]">
              <h3 className="text-base md:text-lg font-semibold text-white mb-5">Ce qu'on fait pour vous a {city.name}</h3>
              <ul className="space-y-4">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-text-secondary group-hover:text-white transition-colors" />
                      <div>
                        <p className="text-white text-sm font-medium group-hover:opacity-80 transition-opacity">{s.label}</p>
                        <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Services complets ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Nos services</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Tout ce qu'il vous faut a {city.name}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-10 max-w-xl">
            De la creation de site web a la formation IA, DKDP couvre l'ensemble de vos besoins digitaux pour les entreprises de {city.name} et du canton de {city.canton}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="group p-4 md:p-5 rounded-xl border border-border bg-white/[0.02] transition-all hover:-translate-y-0.5 duration-200"
              >
                <p className="text-white font-semibold text-sm mb-1.5 group-hover:opacity-80 transition-opacity">{s.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold mt-3 text-text-secondary group-hover:text-white transition-colors">
                  En savoir plus <ChevronRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ── CTA intermediaire ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16">
          <div className="p-6 md:p-10 rounded-2xl border border-border bg-white/[0.02] text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">
              Un projet digital a {city.name} ?
            </h2>
            <p className="text-text-secondary text-sm md:text-base mb-6 max-w-md mx-auto">
              15 minutes, c'est gratuit. On vous dit honnetement si on peut vous aider et comment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LiquidMetalButton href="/contact" size="lg">Reservez un appel gratuit →</LiquidMetalButton>
              <a
                href="tel:+41799407969"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-text-secondary border border-border hover:border-white/20 hover:text-white transition-all min-h-[44px]"
              >
                <Phone size={14} /> +41 79 940 79 69
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <FAQSection items={faq} />

      {/* ── Autres villes ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Nous intervenons aussi a</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.filter(c => c.slug !== city.slug).map(c => (
            <Link
              key={c.slug}
              href={`/agence-digitale/${c.slug}`}
              className="px-3.5 py-2 rounded-lg border border-border bg-white/[0.02] text-sm text-text-secondary hover:text-white hover:border-white/20 transition-all"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Final ── */}
      <CTAFinal />
    </main>
  )
}
