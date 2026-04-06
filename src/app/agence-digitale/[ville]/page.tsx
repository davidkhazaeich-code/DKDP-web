import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ChevronRight, Globe2, Users, Building2, Phone, CheckCircle2, Star, Clock } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
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
  { label: 'Creation de site web', href: '/agence-digitale/creation-site-web', desc: 'Sites vitrines, e-commerce et applications web sur mesure. Next.js, Astro ou WordPress selon vos besoins.' },
  { label: 'Referencement SEO', href: '/agence-digitale/seo', desc: 'SEO local et national pour vous positionner dans les premiers resultats Google dans votre region.' },
  { label: 'Intelligence artificielle', href: '/intelligence-artificielle', desc: 'Agents IA, automatisation de workflows et audit IA pour gagner en productivite.' },
  { label: 'Formation IA entreprise', href: '/formation-entreprise/ia', desc: 'Formations pratiques pour vos equipes : IA generative, prompt engineering, outils concrets.' },
  { label: 'Publicite Google Ads', href: '/agence-digitale/publicite-sea', desc: 'Campagnes Search et Performance Max pour generer des leads qualifies.' },
  { label: 'Consulting marketing', href: '/agence-digitale/consulting-marketing', desc: 'Strategie digitale, audit de presence en ligne et plan d\'action sur mesure.' },
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
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(255,107,0,0.07)">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color: V }}>{city.name}</span>
            </div>

            <div className="max-w-3xl">
              <GradTag className="mb-6">
                <MapPin size={11} className="mr-1" /> Agence digitale · {city.name}, {city.canton}
              </GradTag>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                <GradText as="span">{city.heroLine}</GradText>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4" data-speakable="true">
                Sites web, SEO, intelligence artificielle et formation pour les entreprises de {city.name}.
                DKDP, agence basee a Geneve, 700+ clients en Suisse romande.
              </p>
              <div className="flex flex-wrap gap-4 items-center mt-8">
                <LiquidMetalButton href="/contact" size="lg">Demarrer un projet →</LiquidMetalButton>
                <Link href="/tarifs" className="text-sm text-text-muted hover:text-white transition-colors">
                  Voir les tarifs ↓
                </Link>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Stats bar ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '700+', l: 'Clients accompagnes', sub: 'En Suisse romande' },
              { v: '10+ ans', l: "D'experience", sub: 'Depuis 2015 a Geneve' },
              { v: '5/5', l: 'Note Google', sub: '18 avis verifies' },
              { v: city.distance, l: `De ${city.name}`, sub: 'Reunions en personne ou visio' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{s.v}</p>
                  <p className="text-sm text-text-secondary mt-1">{s.l}</p>
                  <p className="text-xs text-text-muted mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pourquoi nous faire confiance ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <GradTag className="mb-4">Expertise locale</GradTag>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Pourquoi les entreprises de <GradText as="span">{city.name}</GradText> nous font confiance
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                {city.localContext}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: VB, border: `1px solid ${VD}` }}>
                    <Building2 size={14} style={{ color: V }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Tissu economique</p>
                    <p className="text-text-muted text-xs mt-0.5">{city.economicProfile}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: VB, border: `1px solid ${VD}` }}>
                    <Users size={14} style={{ color: V }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Population</p>
                    <p className="text-text-muted text-xs mt-0.5">{city.population}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: VB, border: `1px solid ${VD}` }}>
                    <Globe2 size={14} style={{ color: V }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Proximite</p>
                    <p className="text-text-muted text-xs mt-0.5">{city.distance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avantages card */}
            <div className="p-6 rounded-2xl border" style={{ borderColor: VD, background: 'rgba(124,58,237,0.04)' }}>
              <h3 className="text-lg font-semibold mb-5">Ce qu'on fait pour les entreprises de {city.name}</h3>
              <ul className="space-y-4">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-start gap-3">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 transition-colors" style={{ color: V }} />
                      <div>
                        <p className="text-white font-medium text-sm group-hover:opacity-80 transition-opacity">{s.label}</p>
                        <p className="text-text-muted text-xs mt-0.5">{s.desc}</p>
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
        <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-border">
          <GradTag className="mb-4">Nos services</GradTag>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Tout ce qu'il vous faut a {city.name}
          </h2>
          <p className="text-text-secondary mb-10 max-w-2xl">
            De la creation de site web a la formation IA, DKDP couvre l'ensemble de vos besoins digitaux. Tous nos services sont disponibles pour les entreprises de {city.name} et du canton de {city.canton}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="group p-5 rounded-xl border transition-all hover:scale-[1.02]"
                style={{ borderColor: VD, background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-white font-semibold text-sm mb-2 group-hover:opacity-80 transition-opacity">{s.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold mt-3 transition-transform group-hover:translate-x-1" style={{ color: V }}>
                  En savoir plus <ChevronRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ── CTA intermediaire ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="p-8 md:p-12 rounded-2xl border text-center" style={{ borderColor: VD, background: 'rgba(124,58,237,0.06)' }}>
            <GradTag className="mb-4">Parlons de votre projet</GradTag>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Un projet digital a {city.name} ?
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              15 minutes, c'est gratuit. On vous dit honnetement si on peut vous aider et comment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LiquidMetalButton href="/contact" size="lg">Reservez un appel gratuit →</LiquidMetalButton>
              <a href="tel:+41799407969" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-text-secondary border border-border hover:border-white/20 transition-all">
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

      {/* ── CTA Final ── */}
      <CTAFinal />
    </main>
  )
}
