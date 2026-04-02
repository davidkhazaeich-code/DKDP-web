import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Monitor, FileSpreadsheet, Bot, Share2,
  User, Briefcase, UserSearch, GraduationCap,
  Users, Video, CalendarCheck, MessageSquare,
  ChevronRight, Star,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FAQSection } from '@/components/sections/FAQSection'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCourse } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Formation Particuliers Genève · Informatique, IA, Digital · DKDP',
  description:
    'Formation informatique et IA pour particuliers à Genève. Cours privés ou petits groupes. Débutants acceptés. Excel, internet, IA, réseaux sociaux.',
  alternates: { canonical: 'https://dkdp.ch/formation-particuliers' },
}

const color  = '#FF8C00'
const bg     = 'rgba(255,107,0,0.08)'
const border = 'rgba(255,107,0,0.18)'
const green  = '#4ade80'

// ── Inline visual: target audience grid ─────────────────────────────────────

const PUBLICS = [
  {
    Icon: Briefcase,
    title: 'Actif en reconversion',
    desc: 'Apprendre de nouveaux outils numériques pour changer de poste.',
  },
  {
    Icon: User,
    title: 'Retraité ou senior',
    desc: 'Maîtriser internet, email, smartphone et les outils du quotidien.',
  },
  {
    Icon: UserSearch,
    title: 'Freelance / Indépendant',
    desc: "Gagner en efficacité avec l'IA et les outils numériques.",
  },
  {
    Icon: GraduationCap,
    title: "Demandeur d'emploi",
    desc: 'Renforcer son profil avec des compétences digitales valorisables.',
  },
]

function PublicsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {PUBLICS.map((p, i) => (
        <div
          key={p.title}
          className="flex flex-col gap-2.5 p-4 rounded-[14px] border"
          style={{ background: bg, borderColor: border }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[8px]"
            style={{ background: 'rgba(255,107,0,0.12)', border: `1px solid ${border}` }}
          >
            <p.Icon size={16} style={{ color }} aria-hidden="true" />
          </div>
          <p className="text-white font-semibold text-sm leading-tight">{p.title}</p>
          <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  )
}

// ── Formations disponibles ───────────────────────────────────────────────────

const FORMATIONS = [
  {
    Icon: Monitor,
    title: 'Informatique de base',
    pour: 'Débutants, seniors, personnes peu à l\'aise avec l\'ordinateur',
    contenu: 'Windows / Mac, navigation internet, emails, gestion des fichiers, sécurité de base',
    niveau: 'Débutant',
    prix: 'CHF 90/h',
  },
  {
    Icon: FileSpreadsheet,
    title: 'Bureautique (Excel, Word)',
    pour: 'Actifs, personnes en reconversion, demandeurs d\'emploi',
    contenu: 'Excel (formules, TCD), Word professionnel, Outlook, gestion des documents',
    niveau: 'Débutant à Intermédiaire',
    prix: 'CHF 90/h',
  },
  {
    Icon: Bot,
    title: 'Intelligence Artificielle',
    pour: 'Curieux, freelances, professionnels voulant gagner du temps',
    contenu: 'ChatGPT, Claude, Copilot, prompting efficace, cas d\'usage concrets au quotidien',
    niveau: 'Tous niveaux',
    prix: 'CHF 90/h',
    highlight: true,
  },
  {
    Icon: Share2,
    title: 'Réseaux sociaux et création de contenu',
    pour: 'Indépendants, créateurs, personnes voulant développer leur image en ligne',
    contenu: 'Instagram, LinkedIn, Canva, stratégie de contenu, planification et visuels',
    niveau: 'Débutant à Intermédiaire',
    prix: 'CHF 90/h',
  },
]

// ── Formats ──────────────────────────────────────────────────────────────────

const FORMATS = [
  {
    Icon: User,
    title: 'Cours privé',
    sub: '1 personne',
    desc: 'Entièrement à votre rythme, programme 100% adapté à vos objectifs. Chez vous ou en ligne.',
    prix: 'CHF 90/h',
  },
  {
    Icon: Users,
    title: 'Petit groupe',
    sub: '2 à 4 personnes',
    desc: 'Format économique, ambiance conviviale, progression plus rapide grâce à l\'émulation.',
    prix: 'CHF 60/h par pers.',
  },
  {
    Icon: Video,
    title: 'En ligne (visio)',
    sub: 'Tous formats',
    desc: 'Même qualité qu\'en présentiel, depuis chez vous. Disponible pour tous les formats.',
    prix: 'Même tarif',
  },
]

// ── Étapes du déroulement ────────────────────────────────────────────────────

const STEPS = [
  {
    Icon: CalendarCheck,
    n: '01',
    title: 'Premier appel',
    desc: '15 minutes, gratuit. On évalue votre niveau et vos objectifs pour préparer le meilleur programme.',
  },
  {
    Icon: FileSpreadsheet,
    n: '02',
    title: 'Programme personnalisé',
    desc: 'On prépare un plan de cours adapté à votre profil, à votre rythme et à vos besoins concrets.',
  },
  {
    Icon: GraduationCap,
    n: '03',
    title: 'Cours réguliers',
    desc: '1 à 2 fois par semaine selon votre disponibilité. On avance à votre rythme, sans pression.',
  },
  {
    Icon: MessageSquare,
    n: '04',
    title: 'Suivi et progression',
    desc: 'Exercices entre les séances, support par message, et bilan régulier pour mesurer vos progrès.',
  },
]

// ── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'Je suis débutant complet, est-ce que ça pose un problème ?',
    answer:
      'Absolument pas. La majorité de nos participants individuels débutent de zéro. Le premier cours sert justement à évaluer votre niveau de départ et à ajuster le programme en conséquence. On avance à votre rythme, sans jamais vous mettre en difficulté.',
  },
  {
    question: 'Les cours se déroulent où ?',
    answer:
      'Selon votre préférence. On peut venir chez vous à Genève et dans la région, vous venir dans un espace de travail neutre, ou se retrouver en visio. La plupart de nos participants préfèrent le cours à domicile ou en ligne pour plus de confort.',
  },
  {
    question: "Combien de cours faut-il pour apprendre Excel ?",
    answer:
      "Cela dépend de votre niveau de départ et de vos objectifs. Pour maîtriser les bases (formules simples, mise en forme, filtres), 3 à 4 séances suffisent généralement. Pour les fonctions avancées comme les tableaux croisés dynamiques ou les macros, comptez 6 à 8 séances. On fixe les jalons avec vous dès le début.",
  },
  {
    question: 'Proposez-vous des cours en ligne ?',
    answer:
      'Oui, tous nos cours sont disponibles en visio via Zoom ou Teams. La qualité est identique au présentiel : on partage l\'écran, on travaille sur vos fichiers en temps réel, et vous posez vos questions comme en face à face. Aucun déplacement nécessaire.',
  },
  {
    question: "Y a-t-il un engagement sur le nombre de cours ?",
    answer:
      "Non. On ne vous demande aucun abonnement ni forfait minimum. Vous réservez séance par séance selon vos disponibilités. Si vous souhaitez néanmoins un bloc de 5 ou 10 séances pour un tarif légèrement préférentiel, c'est aussi possible. On en discute lors du premier appel.",
  },
]

// ── Témoignages ──────────────────────────────────────────────────────────────

const TEMOIGNAGES = [
  {
    name: 'Michèle R.',
    role: 'Retraitée, 68 ans',
    text:
      'J\'avais peur de l\'ordinateur depuis des années. Après 4 séances avec David, je navigue sur internet, je gère mes emails et je suis même sur WhatsApp avec mes petits-enfants. Patient, clair, jamais condescendant. Je recommande les yeux fermés.',
  },
  {
    name: 'Karim B.',
    role: 'Graphiste freelance',
    text:
      'La formation IA a complètement changé ma façon de travailler. En deux séances, j\'ai appris à utiliser ChatGPT pour mes briefs clients, Claude pour rédiger mes propositions et Midjourney pour mes moodboards. Je gagne facilement 5 heures par semaine.',
  },
]

// ── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 'Max 4', label: 'Personnes par groupe', sub: 'Attention personnalisée garantie' },
  { value: '1h30', label: "Durée d'un cours individuel standard", sub: 'Flexible selon vos besoins' },
  { value: '100%', label: 'Recommandent à leur entourage', sub: 'Satisfaction de nos participants' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FormationParticuliersPage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildCourse({
          name: 'Formation Informatique et IA pour Particuliers',
          url: '/formation-particuliers',
          description:
            'Cours privés ou en petits groupes pour particuliers à Genève. Informatique de base, Excel, IA, réseaux sociaux. Débutants acceptés.',
        })}
      />

      {/* ── Hero ── */}
      <InfiniteGrid
        accentRgb="255,140,0"
        blob1="rgba(255,107,0,0.09)"
        blob2="rgba(212,212,216,0.06)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <GradTag className="mb-6">Formation Particuliers</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Apprenez à votre{' '}
                  <GradText as="span">rythme, à votre niveau.</GradText>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  Cours privés ou petits groupes (max 4 personnes), adaptés à votre profil.
                  Débutants et confirmés bienvenus.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Réserver un premier cours
                  </LiquidMetalButton>
                  <Link
                    href="#formations"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Voir les formations ↓
                  </Link>
                </div>
              </div>

              {/* Right column: PublicsGrid in a card */}
              <SectionReveal delay={0.15}>
                <div
                  className="hidden lg:block rounded-2xl p-6 border"
                  style={{ background: 'rgba(255,107,0,0.05)', borderColor: border, boxShadow: '0 0 60px rgba(255,107,0,0.10)' }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-5"
                    style={{ color }}
                  >
                    Pour qui ?
                  </p>
                  <PublicsGrid />
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </InfiniteGrid>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {STATS.map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-1 text-white" style={{ color }}>
                    {s.value}
                  </p>
                  <p className="text-white text-sm font-medium">{s.label}</p>
                  <p className="text-text-muted text-xs mt-1">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formations disponibles ── */}
      <section id="formations" className="py-24 bg-bg-card border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-14">
              <GradTag className="mb-4">Nos formations</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-2xl">
                4 thématiques, toutes adaptées à votre niveau.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FORMATIONS.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.08}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-6 transition-all duration-200"
                  style={{
                    background: f.highlight
                      ? 'linear-gradient(135deg, rgba(255,107,0,0.12) 0%, rgba(255,107,0,0.04) 100%)'
                      : bg,
                    borderColor: f.highlight ? 'rgba(255,107,0,0.35)' : border,
                    boxShadow: f.highlight ? '0 0 40px rgba(255,107,0,0.08)' : 'none',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{ background: 'rgba(255,107,0,0.12)', border: `1px solid ${border}` }}
                    >
                      <f.Icon size={20} style={{ color }} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      {f.highlight && (
                        <p
                          className="text-[10px] font-bold uppercase tracking-widest mb-1"
                          style={{ color }}
                        >
                          Tendance
                        </p>
                      )}
                      <h3 className="text-white font-bold text-lg leading-tight">{f.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                        Pour qui
                      </p>
                      <p className="text-text-secondary text-sm">{f.pour}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                        Au programme
                      </p>
                      <p className="text-text-secondary text-sm">{f.contenu}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: border }}>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,107,0,0.12)', color, border: `1px solid rgba(255,107,0,0.25)` }}
                    >
                      {f.niveau}
                    </span>
                    <span className="text-white font-bold text-sm">{f.prix}</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2}>
            <div
              className="mt-8 rounded-[14px] p-5 border text-center"
              style={{ background: 'rgba(255,107,0,0.04)', borderColor: 'rgba(255,107,0,0.18)' }}
            >
              <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mx-auto">
                Vous ne savez pas quelle formation vous convient ? Pas de souci. Le premier appel de 15 minutes est gratuit et sans engagement : on évalue ensemble votre niveau et vos besoins avant de vous proposer quoi que ce soit.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Formats ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Formats disponibles</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Le format qui vous convient.
              </h2>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-5">
            {FORMATS.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.08}>
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-[16px] border"
                  style={{ background: bg, borderColor: border }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] flex-shrink-0"
                    style={{ background: 'rgba(255,107,0,0.12)', border: `1px solid ${border}` }}
                  >
                    <f.Icon size={22} style={{ color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg">{f.title}</h3>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,107,0,0.12)', color, border: `1px solid rgba(255,107,0,0.22)` }}
                      >
                        {f.sub}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-white font-bold text-lg" style={{ color }}>{f.prix}</p>
                    <p className="text-text-muted text-xs">par séance</p>
                  </div>
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
                Du premier appel à la progression en 4 étapes.
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 h-px top-[52px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(255,107,0,0.20) 5%, rgba(255,107,0,0.60) 25%, #FF8C00 50%, rgba(255,107,0,0.60) 75%, rgba(255,107,0,0.20) 95%, transparent)',
              }}
            />

            <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => (
                <SectionReveal key={step.n} delay={i * 0.1}>
                  <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                    <span
                      className="absolute top-4 right-4 text-[11px] font-bold"
                      style={{ color: `${color}55` }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <step.Icon size={22} style={{ color }} aria-hidden="true" />
                    </div>
                    <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm flex-1">{step.desc}</p>
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
              <GradTag className="mb-4">Témoignages</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce qu&apos;ils en disent.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEMOIGNAGES.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 p-7 rounded-[16px] border h-full"
                  style={{ background: bg, borderColor: border }}
                >
                  {/* Stars */}
                  <div className="flex gap-1" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={14} style={{ color, fill: color }} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: border }}>
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0 text-sm font-bold"
                      style={{ background: 'rgba(255,107,0,0.15)', color }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t.name}</p>
                      <p className="text-text-muted text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Vos questions sur la formation pour particuliers"
      />

      {/* ── Bridge to corporate ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[16px] border p-7"
              style={{ background: bg, borderColor: border }}
            >
              <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                Vous êtes une entreprise ? Découvrez nos formations corporate pour équipes.
                Programmes sur mesure, en présentiel ou à distance, pour des équipes qui progressent vraiment.
              </p>
              <Link
                href="/formation-entreprise"
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-opacity hover:opacity-80"
                style={{ background: 'rgba(255,107,0,0.15)', color, border: `1px solid rgba(255,107,0,0.28)` }}
              >
                Formations entreprise <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <CTAFinal />
    </main>
  )
}
