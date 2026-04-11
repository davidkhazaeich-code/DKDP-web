import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ShieldCheck, AlertTriangle, Clock, Users, Award, Star, Lock, Eye, Wifi, Monitor, Settings, Cpu, BookOpen } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { SchemaOrg } from '@/components/seo/SchemaOrg'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))
const FormationPricing = dynamic(() => import('@/components/sections/FormationPricing').then(m => ({ default: m.FormationPricing })))
import { buildCourse, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { orange } from '@/lib/tokens'
import { ITProblemsComparison } from './_components/ITProblemsComparison'

export const metadata: Metadata = {
  title: 'Formation Informatique Entreprise Genève · DKDP',
  description:
    'Formation informatique pour PME à Genève. Windows, emails, réseau, outils collaboratifs. Tous niveaux, en présentiel. Réduisez les tickets IT de 40%.',
  alternates: { canonical: 'https://dkdp.ch/formation-entreprise/informatique' },
}

const FAQ = [
  {
    question: 'À quoi sert une formation informatique générale en entreprise ?',
    answer:
      'Beaucoup d\'employés utilisent leur ordinateur depuis des années sans maîtriser les bases qui font vraiment gagner du temps : raccourcis clavier, organisation des fichiers, outils de collaboration, sauvegardes automatiques. Une demi-journée de formation peut faire économiser 30 minutes par jour et par personne.',
  },
  {
    question: 'La formation couvre-t-elle Windows et Mac ?',
    answer:
      'Oui. DKDP adapte la formation à votre environnement informatique : Windows 10/11, macOS, ou les deux si votre équipe est mixte. On part toujours de ce que vos collaborateurs utilisent réellement.',
  },
  {
    question: 'Peut-on former des collaborateurs avec des niveaux très différents ?',
    answer:
      'Oui, avec un peu d\'organisation. Pour des groupes avec des niveaux très hétérogènes, DKDP recommande de séparer en deux groupes (débutant et intermédiaire) ou de définir un socle commun et des modules optionnels pour les plus avancés.',
  },
  {
    question: 'La formation aborde-t-elle les outils cloud (Google Drive, OneDrive) ?',
    answer:
      'Oui. L\'utilisation efficace du cloud est un module central : synchronisation, partage de fichiers, collaboration en temps réel, gestion des permissions. On couvre Google Workspace ou Microsoft 365 selon votre environnement.',
  },
  {
    question: 'La formation inclut-elle des conseils sur l\'organisation numérique ?',
    answer:
      'Oui. Un module complet est dédié à l\'organisation numérique : structure de dossiers, nommage des fichiers, gestion des emails (tri, archivage, filtres automatiques), et outils de gestion des tâches.',
  },
  {
    question: 'Combien coûte une formation informatique pour une équipe ?',
    answer:
      'Nos formations sont facturées à l\'heure selon la taille du groupe : CHF 150/h pour 1 personne, CHF 200/h pour 2 personnes, CHF 250/h pour 3 à 6 personnes et CHF 300/h pour 6 à 10 personnes. La demi-journée (4h) ou la journée entière (8h) incluent la préparation sur mesure.',
  },
]

const MODULES = [
  'Windows 10/11 : navigation, personnalisation et optimisation',
  'Gestion des fichiers et dossiers (organisation efficace)',
  'Sécurité de base : mots de passe forts, mises à jour, antivirus',
  'Emails professionnels (Outlook) : organisation et règles automatiques',
  'Connexion et partage réseau (Wi-Fi, imprimantes, VPN)',
  'Sauvegardes automatiques (OneDrive, cloud)',
  'Navigateurs web et outils de productivité en ligne',
  'Introduction aux outils collaboratifs (Teams, Google Workspace)',
]

const color = orange.color, bg = orange.bg, border = orange.border

const steps = [
  { Icon: Monitor, title: 'Diagnostic de groupe', desc: 'Évaluation du niveau réel de chaque participant. Programme ajusté selon les lacunes identifiées.' },
  { Icon: Settings, title: 'Pratique guidée', desc: 'Exercices sur les machines des participants. On résout les problèmes réels rencontrés au quotidien.' },
  { Icon: Cpu, title: 'Cas du quotidien', desc: 'Simulation de pannes courantes et procédures de dépannage simples. Autonomie immédiate.' },
  { Icon: Award, title: 'Suivi & attestation', desc: 'Guide de référence numérique livré. Attestation individuelle. Support réponses 30 jours post-formation.' },
]

export default function FormationInformatiquePage() {
  return (
    <main>
      <SchemaOrg schema={buildCourse({ name: 'Formation Informatique Entreprise Genève', url: '/formation-entreprise/informatique', description: 'Formation informatique pour PME à Genève. Windows, emails, réseau, outils collaboratifs. Tous niveaux, en présentiel.' })} />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Formation Entreprise', url: 'https://dkdp.ch/formation-entreprise' },
        { name: 'Informatique', url: 'https://dkdp.ch/formation-entreprise/informatique' },
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
              <span className="text-sm" style={{ color }}>Informatique</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Compétences numériques · Tous niveaux · Genève</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Vos équipes maîtrisent leur outil informatique,{' '}
                  <GradText as="span" style={{ backgroundImage: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>enfin.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
                  DKDP forme vos collaborateurs à utiliser Windows, les emails, le réseau et les outils collaboratifs en autonomie complète. Tous niveaux, en présentiel à Genève.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-8">
                  <LiquidMetalButton href="/contact?service=formation" size="lg">Demander un devis →</LiquidMetalButton>
                  <Link href="#programme" className="text-sm text-text-muted hover:text-white transition-colors">
                    Voir le programme ↓
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(255,107,0,0.18)' }}>
                  <Image
                    src="/images/services/dkdp-formation-informatique.webp"
                    alt="Formation informatique en entreprise à Genève"
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
              { v: '-40%', l: 'Tickets IT réduits', sub: 'Après formation des équipes' },
              { v: '2h/sem', l: 'Gagnées', sub: 'Par collaborateur formé' },
              { v: '95%', l: 'Autonomie', sub: 'Sur tâches informatiques courantes' },
              { v: '15 ans', l: "D'expérience IT", sub: 'Genève et Suisse romande' },
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

      {/* ── Pourquoi maintenant ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Pourquoi maintenant</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Vos équipes perdent des heures sur des problèmes évitables.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Imprimante bloquée, fichier introuvable, boîte mail saturée, réseau qui ne répond pas : ces petits problèmes du quotidien coûtent cher en productivité. Et chaque appel au support IT mobilise deux personnes au lieu d&apos;une.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                DKDP forme vos équipes sur leurs machines réelles, avec leurs vrais problèmes. Résultat : une autonomie immédiate, moins de tickets IT, et des collaborateurs qui gagnent en confiance et en efficacité dès le lendemain de la formation.
              </p>
              <div className="space-y-3">
                {[
                  'Les équipes formées réduisent leurs tickets IT de 40% en moyenne',
                  'Chaque collaborateur formé gagne 2 heures par semaine sur des tâches courantes',
                  '95% des participants se déclarent autonomes sur les tâches informatiques après la formation',
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
                <ITProblemsComparison />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Programme</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Les bases qui font vraiment gagner du temps.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                La plupart des formations informatiques passent trop de temps sur la théorie. DKDP se concentre sur les gestes quotidiens qui font la différence : comment trouver un fichier en 5 secondes, partager un document sans créer 4 versions, ou trier 100 emails en 10 minutes.
              </p>
              <p className="text-text-secondary leading-relaxed">
                La formation est adaptée à votre environnement (Windows, Mac, Google Workspace, Microsoft 365) et au niveau réel de vos équipes. On commence là où vous en êtes.
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
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Profils</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Pour qui est cette formation ?
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {[
              'Nouveaux arrivants en entreprise',
              'Employés peu à l\'aise avec l\'informatique',
              'Travailleurs seniors en reconversion',
              'Secrétaires et assistantes',
              'PME sans équipe IT dédiée',
              'Toute personne souhaitant gagner en autonomie informatique',
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
      <section className="py-24 bg-bg-card border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Déroulement</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Comment se passe la formation ?
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

      {/* ── Témoignages ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Ce qu&apos;ils en disent</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                La parole à nos participants.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                quote: 'Nos employés appelaient le support IT 15 fois par semaine pour des problèmes basiques. Après la formation, c\'est 4 fois. Et ce sont de vrais problèmes.',
                name: 'Responsable IT',
                company: 'PME 60 personnes, Genève',
                stars: 5,
              },
              {
                quote: 'On a formé nos 8 assistantes administratives. Elles gèrent maintenant leurs sauvegardes, leur réseau et leurs emails en autonomie complète.',
                name: 'DRH',
                company: 'Cabinet médical, Lausanne',
                stars: 5,
              },
              {
                quote: 'À 58 ans, j\'avais honte de poser des questions basiques à mes collègues. La formation de DKDP m\'a rendu autonome sans me juger.',
                name: 'Participant',
                company: 'Secteur public, Genève',
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
        <section className="py-24 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Un tarif horaire adapté à votre groupe.
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
      <FAQSection items={FAQ} title="Vos questions sur la formation informatique" />

      {/* ── Bridge ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <Link
              href="/formation-entreprise/cybersecurite"
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
                  <ShieldCheck size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>Formation complémentaire</p>
                  <p className="text-white font-bold text-lg leading-tight">Formation Cybersécurité Entreprise</p>
                  <p className="text-text-muted text-[12.5px] mt-1 max-w-md">
                    Vous êtes autonomes sur l&apos;informatique. Pour protéger votre entreprise des cybermenaces, découvrez notre formation cybersécurité.
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
