import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, AlertTriangle, Clock, Users, Award, Star, Lock, Eye, Wifi, Monitor, Settings, Cpu, BookOpen, XCircle } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
const FormationTrainer = dynamic(() => import('@/components/sections/FormationTrainer').then(m => ({ default: m.FormationTrainer })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { ThreatLevelChart } from './_components/ThreatLevelChart'

export const metadata: Metadata = {
  title: 'Formation Cybersécurité Entreprise Genève · DKDP',
  description:
    'Formation cybersécurité pour PME et entreprises en Suisse romande. Phishing, ransomware, social engineering. Simulations réelles, bonnes pratiques et plan d\'urgence. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/cybersecurite' },
  openGraph: {
    images: [{ url: '/images/og/formation-cybersecurite.png', width: 1376, height: 768, alt: 'Formation cybersécurité entreprise Genève DKDP' }],
  },
}

const FAQ = [
  {
    question: 'Pourquoi former ses employés à la cybersécurité ?',
    answer:
      '95% des incidents de cybersécurité impliquent une erreur humaine. Un clic sur un lien de phishing, un mot de passe partagé, un fichier téléchargé depuis une source inconnue : ce sont les vraies portes d\'entrée des attaques. Former vos équipes est la mesure la plus rentable contre les cyberattaques.',
  },
  {
    question: 'Que couvre la formation cybersécurité de DKDP ?',
    answer:
      'La formation couvre : la reconnaissance des tentatives de phishing et d\'hameçonnage, la création et gestion de mots de passe sécurisés, l\'utilisation sécurisée des emails et des outils cloud, les obligations RGPD des employés, les bonnes pratiques sur les appareils mobiles, et la procédure à suivre en cas d\'incident.',
  },
  {
    question: 'Combien de temps dure la formation cybersécurité ?',
    answer:
      'Un atelier de sensibilisation dure 3h30 (demi-journée). Une formation complète couvre une journée entière (7 heures). Pour les équipes qui souhaitent un audit complet de leurs pratiques et systèmes, un format sur 2 jours est disponible.',
  },
  {
    question: 'La formation inclut-elle des simulations d\'attaque (phishing simulé) ?',
    answer:
      'Sur demande, DKDP peut organiser un exercice de phishing simulé avant la formation pour évaluer le niveau de vigilance de vos équipes. Cet exercice anonyme sert de base concrète pour la formation et rend les risques immédiatement tangibles.',
  },
  {
    question: 'La formation est-elle adaptée aux non-techniciens ?',
    answer:
      'Absolument. La formation cybersécurité DKDP est conçue pour les employés sans background technique. On utilise des exemples concrets et des mises en situation réelles pour rendre les risques compréhensibles par tous.',
  },
  {
    question: 'La cybersécurité concerne-t-elle les PME ou seulement les grandes entreprises ?',
    answer:
      'Les PME sont en réalité plus ciblées que les grandes entreprises, car elles ont moins de protections. En Suisse, plus de 60% des cyberattaques visent des entreprises de moins de 250 employés. Une formation de quelques heures peut éviter des pertes de dizaines de milliers de francs.',
  },
]

const MODULES = [
  'Comprendre les cybermenaces actuelles (phishing, ransomware, social engineering)',
  'Reconnaître un email frauduleux et un lien suspect',
  'Créer et gérer des mots de passe solides (gestionnaire de mots de passe)',
  'Authentification à deux facteurs (2FA) : mise en place pratique',
  'Navigation sécurisée et Wi-Fi public',
  'Sauvegardes et récupération des données',
  'Bonnes pratiques sur appareils mobiles professionnels',
  'Procédure d\'urgence en cas d\'incident de sécurité',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  { Icon: Eye, title: 'Prise de conscience', desc: 'Cas réels d\'attaques sur des PME suisses présentés avec impact chiffré. On rend concret ce qui semble abstrait.' },
  { Icon: AlertTriangle, title: 'Simulations d\'attaques', desc: 'Exercices de détection de phishing et de social engineering. Chaque participant identifie les pièges en temps réel.' },
  { Icon: Lock, title: 'Bonnes pratiques', desc: 'Mise en place pratique : 2FA sur les outils critiques, gestionnaire de mots de passe, procédure de sauvegarde.' },
  { Icon: ShieldCheck, title: 'Plan d\'urgence', desc: 'Procédures à suivre en cas d\'incident. Chaque participant repart avec une fiche réflexe personnalisée.' },
]

export default function FormationCybersecuritePage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Formation Cybersécurité en entreprise Genève', url: '/formation-entreprise/cybersecurite', description: 'Formation cybersécurité pour PME à Genève. Phishing, ransomware, social engineering et bonnes pratiques pour équipes non-techniques.', duration: 'PT3H30M', teaches: ['Phishing', 'Ransomware', 'Mots de passe', 'RGPD', 'Plan urgence cyber'], prerequisites: 'Aucun prérequis technique', priceFrom: 200, ratingValue: '4.9', ratingCount: 500 })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Cybersécurité', url: 'https://dkdp.ch/formation-entreprise/cybersecurite' },
      ])} />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/formation-entreprise" className="text-text-muted text-sm hover:text-white transition-colors">
                Formation Entreprise
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>Cybersécurité</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Formation cybersécurité en entreprise à Genève</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-white mb-6">
                  Un clic mal placé coûte <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>plus cher</GradText> qu&apos;une journée de formation.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos équipes à reconnaître et éviter les cybermenaces : phishing, ransomware, social engineering. Formation pratique avec simulations réelles, pour PME et entreprises à Genève et en Suisse romande.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=formation" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
                <p className="text-text-muted text-xs mt-6">Programme mis à jour : avril 2026</p>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-cybersecurite.webp"
                    alt="Formation cybersécurité en entreprise à Genève"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '90%', l: 'Failles humaines', sub: 'Phishing et social engineering' },
              { v: '1/2', l: 'PME attaquées/an', sub: 'En Suisse (Rapport NCSC 2024)' },
              { v: 'CHF 200k', l: 'Coût moyen incident', sub: 'Pour une PME suisse' },
              { v: '0%', l: 'Clics phishing', sub: 'Nos participants après formation' },
            ].map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color }}>{s.v}</p>
                  <p className="text-white text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Pourquoi maintenant', href: '#pourquoi' },
          { label: 'Programme', href: '#programme' },
          { label: 'Profils', href: '#profils' },
          { label: 'Déroulement', href: '#deroulement' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Prendre contact', href: '/contact' }}
        accentColor="#FF8C00"
        accentBg="rgba(255,107,0,0.12)"
        accentBorder="rgba(255,107,0,0.25)"
      />

      {/* ── Pourquoi maintenant ── */}
      <section id="pourquoi" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pourquoi la cybersécurité est urgente pour les PME suisses
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Contrairement aux grandes entreprises, les PME disposent de peu de protections et sont perçues comme des cibles faciles. Une seule erreur humaine suffit : un clic sur un lien de phishing, un mot de passe réutilisé, un email usurpant l&apos;identité d&apos;un dirigeant.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP ne fait pas de théorie abstraite. On présente des cas réels survenus en Suisse, on simule les attaques, et on donne à chaque participant les réflexes concrets pour y faire face. En une demi-journée, vos équipes deviennent votre première ligne de défense. Découvrez les <Link href="/blog/cybersecurite-pme-erreurs-courantes" className="underline hover:text-white transition-colors">8 erreurs de cybersécurité les plus courantes en PME</Link>.
              </p>
              <div className="space-y-3">
                {[
                  '90% des cyberattaques commencent par une erreur humaine, pas une faille technique',
                  'Une PME suisse sur deux est victime d\'une cyberattaque chaque année (NCSC 2024)',
                  'Le coût moyen d\'un incident de sécurité pour une PME est de CHF 200\'000',
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div
                className="rounded-[20px] p-5 md:p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(255,107,0,0.07)' }}
              >
                <ThreatLevelChart />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Programme de la formation cybersécurité
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La cybersécurité n&apos;est pas réservée aux techniciens. DKDP explique les risques concrets auxquels vos employés font face chaque jour : emails frauduleux, mots de passe faibles, connexions non sécurisées. On rend les menaces tangibles avec des exemples réels d&apos;incidents survenus en Suisse.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Chaque module se conclut par des règles simples à appliquer immédiatement. Pas de jargon technique : de la prévention concrète, mémorable et actionnable.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="space-y-3">
                {MODULES.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Pour qui ── */}
      <section id="profils" className="scroll-mt-[124px] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profils</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Pour qui est la formation cybersécurité en entreprise ?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {[
              'Tout collaborateur de l\'entreprise',
              'Équipes administratives',
              'Personnel travaillant à distance',
              'RH et services sensibles',
              'Direction et dirigeants',
              'PME sans politique de sécurité',
              'Secteurs réglementés (santé, finance, droit)',
              'Nouveaux arrivants en entreprise',
            ].map((role, i) => (
              <SectionReveal key={role} delay={i * 0.07}>
                <div
                  className="flex items-center justify-center text-center p-4 rounded-[12px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  <p className="text-white font-medium text-sm">{role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Déroulement ── */}
      <section id="deroulement" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Déroulement de la formation cybersécurité
              </h2>
            </div>
          </SectionReveal>
          <div className="relative">
            <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.20) 5%, rgba(255,140,0,0.70) 25%, #FF8C00 50%, rgba(255,140,0,0.70) 75%, rgba(255,140,0,0.20) 95%, transparent)' }} />
            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <SectionReveal key={s.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-3 p-7 bg-bg-card border border-border rounded-[16px] h-full">
                    <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <s.Icon size={20} style={{ color }} />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FormationTrainer accentColor='#FF8C00' />

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Retours après la formation cybersécurité
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: 'On a été victimes d\'un ransomware. Depuis la formation DKDP, notre équipe reconnaît les signaux d\'alerte. On a déjoué 2 tentatives de phishing depuis.',
                name: 'Marc D., Directeur',
                company: 'PME logistique, Genève',
                stars: 5,
              },
              {
                quote: 'La simulation de phishing a été révélatrice : 6 personnes sur 10 avaient cliqué sur le lien. Après la formation : 0 sur 10. La différence est nette.',
                name: 'Nicolas R., Responsable IT',
                company: 'Entreprise 80 personnes, Vaud',
                stars: 5,
              },
              {
                quote: 'On pensait que ça n\'arrivait qu\'aux grandes entreprises. La formation nous a montré que les PME sont les cibles préférées des hackers.',
                name: 'Sandra M., Fondatrice',
                company: 'Cabinet de conseil, Genève',
                stars: 5,
              },
            ].map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={12} style={{ color }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${border}` }}>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <HeroBg blob1="rgba(255,107,0,0.13)" blob2="rgba(255,107,0,0.06)" accentRgb="255,140,0">
        <section id="tarifs" className="scroll-mt-[124px] py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Tarifs de la formation cybersécurité
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm">
                Le prix dépend du nombre de participants. Demi-journée (4h) ou journée entière (8h).
              </p>
            </div>
          </SectionReveal>
          <FormationPricing />
        </div>
      </section>
      </HeroBg>

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Vos questions sur la formation cybersécurité" />
      </div>

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/formation-entreprise/informatique"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] p-6 md:p-8 border transition-all hover:-translate-y-0.5 duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.07) 0%, rgba(255,107,0,0.02) 100%)',
                borderColor: border,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Monitor size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Formation complémentaire</p>
                  <p className="text-white font-bold text-lg leading-tight">Formation Informatique Entreprise</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vos équipes gèrent les menaces. Pour qu&apos;elles soient aussi autonomes sur leur environnement informatique quotidien, découvrez notre formation informatique.
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                style={{ background: bg, color, border: `1px solid ${border}` }}
              >
                Voir la formation <ChevronRight size={12} />
              </span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTAFinal accentRgb="255,140,0" />
    </main>
  )
}
