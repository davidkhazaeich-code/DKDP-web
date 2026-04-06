import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ChevronRight, Globe2, Users, Building2, Phone } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildBreadcrumbList, buildFAQPage, buildWebPageWithSpeakable } from '@/lib/schema'
import { CITIES, getCity } from '@/lib/cities'
import { violet } from '@/lib/tokens'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))

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
    <>
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
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <HeroBg accentRgb="124,58,237" blob1="rgba(124,58,237,0.18)" blob2="rgba(255,107,0,0.08)" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-28 md:py-36">
          <GradTag>
            <MapPin size={11} className="mr-1" /> {city.name}, {city.canton}
          </GradTag>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4 mb-6 max-w-3xl">
            <GradText>{city.heroLine}</GradText>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-8 leading-relaxed" data-speakable="true">
            Sites web, SEO, intelligence artificielle et formation pour les entreprises de {city.name}.
            Agence DKDP basee a Geneve, 700+ clients en Suisse romande.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: V }}>
              Demarrer un projet <ChevronRight size={14} />
            </Link>
            <Link href="/tarifs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-text-secondary border border-border hover:border-white/20 transition-all">
              Voir les tarifs
            </Link>
          </div>

          {/* Proof rail */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border">
            <div>
              <p className="text-2xl font-bold text-white">700+</p>
              <p className="text-text-muted text-xs">clients accompagnes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">5/5</p>
              <p className="text-text-muted text-xs">note Google</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10+</p>
              <p className="text-text-muted text-xs">ans d'experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{city.distance}</p>
              <p className="text-text-muted text-xs">de {city.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contexte local ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Pourquoi les entreprises de <GradText>{city.name}</GradText> nous font confiance
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {city.localContext}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Building2 size={16} style={{ color: V }} />
                  <span>{city.economicProfile}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Users size={16} style={{ color: V }} />
                  <span>{city.population}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Globe2 size={16} style={{ color: V }} />
                  <span>{city.distance}</span>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-border" style={{ background: 'rgba(124,58,237,0.04)' }}>
              <h3 className="text-lg font-semibold mb-4">Ce qu'on fait pour les entreprises de {city.name}</h3>
              <ul className="space-y-4">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-start gap-3">
                      <ChevronRight size={14} className="mt-1 flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: V }} />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Nos services pour {city.name}
          </h2>
          <p className="text-text-secondary mb-10 max-w-2xl">
            De la creation de site web a la formation IA, DKDP couvre l'ensemble de vos besoins digitaux. Tous nos services sont disponibles pour les entreprises de {city.name} et du canton de {city.canton}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <Link key={s.href} href={s.href} className="group p-5 rounded-xl border border-border hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-white font-semibold text-sm mb-2 group-hover:opacity-80 transition-opacity">{s.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ── CTA intermédiaire ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="p-8 md:p-12 rounded-2xl border border-border text-center" style={{ background: 'rgba(124,58,237,0.06)' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Un projet digital a {city.name} ?
            </h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              15 minutes, c'est gratuit. On vous dit honnetement si on peut vous aider et comment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: V }}>
                Reservez un appel gratuit <ChevronRight size={14} />
              </Link>
              <a href="tel:+41799407969" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-text-secondary border border-border hover:border-white/20 transition-all">
                <Phone size={14} /> +41 79 940 79 69
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── FAQ ── */}
      <FAQSection items={faq} />

      {/* ── CTA Final ── */}
      <CTAFinal />
    </>
  )
}
