import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Globe2, Users, Building2, Phone, CheckCircle2, Bot, Zap, BrainCircuit, GraduationCap, Sparkles, Workflow } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { VideoHeroBg } from '@/components/ui/VideoHeroBg'
import { ImageHeroBg } from '@/components/ui/ImageHeroBg'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildBreadcrumbList, buildFAQPage, buildWebPageWithSpeakable, buildService, buildCourse } from '@/lib/schema'
import { CITIES, getCity } from '@/lib/cities'
import { violet, chrome, orange } from '@/lib/tokens'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))

const V = violet.color, VB = violet.bg, VD = violet.border
const CH = chrome.color, CHB = chrome.bg, CHD = chrome.border
const OR = orange.color, ORB = orange.bg, ORD = orange.border

export function generateStaticParams() {
  return CITIES.map(city => ({ ville: city.slug }))
}

type Props = { params: Promise<{ ville: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params
  const city = getCity(ville)
  if (!city) return {}

  const title = `Intelligence artificielle & Agent IA a ${city.name} | Agence digitale DKDP`
  const description = `Agence IA a ${city.name} (${city.canton}) : agents IA, automatisation, formation IA entreprise et creation de sites web. DKDP accompagne les PME de ${city.name} dans leur transformation digitale. Devis gratuit.`

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
  { label: 'Intelligence artificielle', href: '/intelligence-artificielle', desc: 'Agents IA, automatisation et audit pour gagner en productivite.' },
  { label: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia', desc: 'Deploiement d\'agents IA autonomes pour vos processus metier.' },
  { label: 'Formation IA entreprise', href: '/formation-entreprise/ia', desc: 'Formations pratiques IA generative, Claude AI et prompt engineering.' },
  { label: 'Creation de site web', href: '/agence-digitale/creation-site-web', desc: 'Sites vitrines, e-commerce et applications web sur mesure.' },
  { label: 'Referencement SEO', href: '/agence-digitale/seo', desc: 'SEO local et national pour dominer Google dans votre region.' },
  { label: 'Publicite Google Ads', href: '/agence-digitale/publicite-sea', desc: 'Campagnes Search et Performance Max, leads qualifies.' },
]

const IA_CAPABILITIES = [
  { Icon: Bot, title: 'Agents IA autonomes', desc: 'Des agents intelligents qui executent des taches complexes : tri d\'emails, generation de rapports, qualification de leads, service client 24/7.' },
  { Icon: Workflow, title: 'Automatisation des processus', desc: 'Connexion de vos outils (CRM, ERP, email, comptabilite) avec des workflows IA qui eliminent les taches repetitives.' },
  { Icon: BrainCircuit, title: 'IA generative sur mesure', desc: 'Solutions personnalisees de generation de contenu, d\'analyse de documents et de prise de decision assistee par IA.' },
  { Icon: Sparkles, title: 'Audit & strategie IA', desc: 'Identification des opportunites d\'automatisation dans votre entreprise. ROI mesurable des la premiere semaine.' },
]

export default async function CityPage({ params }: Props) {
  const { ville } = await params
  const city = getCity(ville)
  if (!city) notFound()

  const faq = [
    {
      question: `Comment l'intelligence artificielle peut aider mon entreprise a ${city.name} ?`,
      answer: `L'IA permet aux entreprises de ${city.name} d'automatiser les taches repetitives, d'ameliorer le service client avec des chatbots intelligents, de generer du contenu marketing et d'analyser des donnees complexes. DKDP deploie des agents IA sur mesure adaptes au tissu economique de ${city.name} (${city.economicProfile}).`,
    },
    {
      question: `Qu'est-ce qu'un agent IA et comment le deployer a ${city.name} ?`,
      answer: `Un agent IA est un programme autonome capable d'executer des taches complexes : repondre aux clients, trier des emails, generer des rapports, qualifier des leads. DKDP deploie des agents IA pour les entreprises de ${city.name}, avec une integration complete dans vos outils existants (CRM, ERP, email). Mise en place en 2 a 4 semaines.`,
    },
    {
      question: `Proposez-vous des formations IA a ${city.name} ?`,
      answer: `Oui. DKDP propose des formations IA sur site a ${city.name} ou en visioconference. Tarifs : CHF 150/h (1 personne) a CHF 300/h (6-10 personnes). Formats demi-journee (4h) ou journee entiere (8h). ${city.formationContext}`,
    },
    {
      question: `Combien coute un projet d'automatisation IA a ${city.name} ?`,
      answer: `Un audit IA demarre a CHF 500. Un agent IA simple (chatbot, tri d'emails) se situe entre CHF 2'000 et CHF 5'000. Une solution d'automatisation complete (CRM, workflows, reporting) entre CHF 5'000 et CHF 15'000. DKDP fournit un devis fixe avec ROI estime avant de demarrer.`,
    },
    {
      question: `DKDP se deplace-t-il a ${city.name} pour les formations et projets IA ?`,
      answer: `Oui. Nos bureaux sont a Geneve (${city.distance}), mais nous intervenons regulierement a ${city.name} pour les formations sur site et les ateliers IA. Les reunions projet peuvent se faire en personne, en visioconference, ou en hybride.`,
    },
    {
      question: `Pourquoi choisir DKDP comme agence IA a ${city.name} ?`,
      answer: `DKDP combine expertise technique (web, IA, automatisation) et 10+ ans d'experience avec 700+ clients en Suisse romande. Contrairement aux pure players IA, nous integrons l'intelligence artificielle dans une strategie digitale globale (site web, SEO, formation). Notre proximite avec ${city.name} permet un accompagnement regulier.`,
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
        name: `Intelligence artificielle & Agent IA a ${city.name}`,
        url: `/agence-digitale/${city.slug}`,
        description: `Agence IA a ${city.name} : agents IA, automatisation, formation IA entreprise et solutions digitales pour PME.`,
      })} />
      <SchemaOrg schema={buildService({
        name: `Agent IA & Automatisation a ${city.name}`,
        url: `/agence-digitale/${city.slug}`,
        description: `Deploiement d'agents IA et automatisation des processus pour les entreprises de ${city.name}. Chatbots, workflows intelligents, IA generative.`,
      })} />
      <SchemaOrg schema={buildCourse({
        name: `Formation IA entreprise a ${city.name}`,
        url: `/agence-digitale/${city.slug}`,
        description: `Formation intelligence artificielle pour les entreprises de ${city.name}. Claude AI, ChatGPT, prompt engineering et automatisation. Sur site ou en visioconference.`,
      })} />

      {/* ── Hero ── */}
      {(() => {
        const heroContent = (
          <section className="pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36 min-h-[70vh] md:min-h-[75vh] flex flex-col justify-center">
            <div className="max-w-[1200px] mx-auto px-5 md:px-6 flex flex-col items-center text-center">
              <nav className="flex items-center justify-center gap-1.5 mb-5 md:mb-6" aria-label="Fil d'Ariane">
                <Link href="/agence-digitale" className="text-text-muted text-xs md:text-sm hover:text-white transition-colors">
                  Agence Digitale
                </Link>
                <ChevronRight size={12} className="text-text-muted" />
                <span className="text-white text-xs md:text-sm font-medium">{city.name}</span>
              </nav>
              <div className="max-w-2xl">
                <GradTag className="mb-5">
                  IA, Automatisation & Formation a {city.name}
                </GradTag>
                <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.1] mb-5">
                  Intelligence artificielle et agents IA pour les entreprises de{' '}
                  <GradText as="span">{city.name}</GradText>
                </h1>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8" data-speakable="true">
                  Agents IA, automatisation des processus, formation IA et solutions digitales. DKDP accompagne les PME de {city.name} dans leur transformation par l'intelligence artificielle.
                </p>
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <LiquidMetalButton href="/contact" size="lg">Audit IA gratuit →</LiquidMetalButton>
                  <Link href="/intelligence-artificielle" className="text-sm text-text-muted hover:text-white transition-colors px-2 py-1">
                    Nos services IA
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
                  <p className="text-xl md:text-2xl font-bold" style={{ color: V }}>{s.v}</p>
                  <p className="text-xs md:text-sm text-text-muted mt-1">{s.l}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section IA & Automatisation ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: CH }}>Intelligence artificielle</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Agents IA et automatisation pour {city.name}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-10 max-w-2xl">
            DKDP deploie des agents IA et des solutions d'automatisation pour les entreprises de {city.name}. Du chatbot intelligent a l'automatisation complete de vos workflows, nous transformons vos processus metier.
          </p>

          {/* IA capabilities grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10">
            {IA_CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="p-5 md:p-6 rounded-xl border transition-all hover:-translate-y-0.5 duration-200"
                style={{ background: CHB, borderColor: CHD }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,212,216,0.08)', border: `1px solid ${CHD}` }}
                  >
                    <cap.Icon size={18} style={{ color: CH }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1.5">{cap.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* City-specific IA use cases */}
          <div className="p-5 md:p-6 rounded-2xl border" style={{ background: CHB, borderColor: CHD }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: CH }}>
              Cas d'usage IA a {city.name}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {city.iaUseCases.map((useCase) => (
                <div key={useCase} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: CH }} />
                  <p className="text-text-secondary text-sm leading-relaxed">{useCase}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t" style={{ borderColor: CHD }}>
              <p className="text-text-muted text-xs mb-3">Tissu economique : {city.economicProfile}</p>
              <Link
                href="/intelligence-artificielle"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: CH }}
              >
                Decouvrir nos solutions IA <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Section Formation IA ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: OR }}>Formation IA</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
                Formation intelligence artificielle a {city.name}
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                {city.formationContext}
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { Icon: GraduationCap, text: 'Claude AI, ChatGPT, Gemini, GitHub Copilot' },
                  { Icon: Zap, text: 'Prompt engineering et automatisation' },
                  { Icon: Users, text: 'De 1 a 10 personnes, sur site ou en visio' },
                  { Icon: Building2, text: 'Programme personnalise par entreprise' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${ORD}`, background: ORB }}>
                      <item.Icon size={13} style={{ color: OR }} />
                    </div>
                    <p className="text-text-secondary text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/formation-entreprise/ia"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: OR }}
              >
                Voir toutes nos formations <ChevronRight size={12} />
              </Link>
            </div>

            {/* Pricing */}
            <div>
              <FormationPricing />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Services complets ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: V }}>Nos services</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Solutions digitales completes a {city.name}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-10 max-w-xl">
            De l'agent IA a la creation de site web, DKDP couvre l'ensemble de vos besoins digitaux pour les entreprises de {city.name} et du canton de {city.canton}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="group p-4 md:p-5 rounded-xl border border-border bg-white/[0.02] transition-all hover:-translate-y-0.5 hover:border-violet-500/40 duration-200"
              >
                <p className="text-white font-semibold text-sm mb-1.5 group-hover:opacity-80 transition-opacity">{s.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold mt-3 text-text-secondary group-hover:text-violet-400 transition-colors">
                  En savoir plus <ChevronRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ── Pourquoi nous faire confiance ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-20 border-t border-border">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: V }}>Expertise locale</p>
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
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${VD}`, background: VB }}>
                      <item.Icon size={14} style={{ color: V }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-text-muted text-xs mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key services for this city */}
            <div className="p-5 md:p-6 rounded-2xl border border-violet-500/20 bg-white/[0.02]">
              <h3 className="text-base md:text-lg font-semibold text-white mb-5">Ce qu'on fait pour vous a {city.name}</h3>
              <ul className="space-y-4">
                {SERVICES.slice(0, 4).map(s => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-start gap-3">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 transition-colors" style={{ color: V }} />
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

      {/* ── CTA intermediaire ── */}
      <SectionReveal>
        <section className="max-w-[1200px] mx-auto px-5 md:px-6 py-12 md:py-16">
          <div className="p-6 md:p-10 rounded-2xl border border-border bg-white/[0.02] text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">
              Pret a automatiser votre entreprise a {city.name} ?
            </h2>
            <p className="text-text-secondary text-sm md:text-base mb-6 max-w-md mx-auto">
              15 minutes d'audit IA gratuit. On identifie vos opportunites d'automatisation et le ROI potentiel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LiquidMetalButton href="/contact" size="lg">Audit IA gratuit →</LiquidMetalButton>
              <a
                href="tel:+41799407969"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-text-secondary border border-border hover:border-violet-500/40 hover:text-white transition-all min-h-[44px]"
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
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: V }}>IA et automatisation aussi a</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.filter(c => c.slug !== city.slug).map(c => (
            <Link
              key={c.slug}
              href={`/agence-digitale/${c.slug}`}
              className="px-3.5 py-2 rounded-lg border border-border bg-white/[0.02] text-sm text-text-secondary hover:text-white hover:border-violet-500/40 transition-all"
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
