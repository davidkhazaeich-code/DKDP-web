import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Monitor, Smartphone, FileSpreadsheet, Bot, Share2,
  Palette, Shield, Code,
  User, Briefcase, UserSearch, GraduationCap,
  CalendarCheck, MessageSquare,
  ChevronRight, Star, ExternalLink, MapPin, Phone,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FAQSection } from '@/components/sections/FAQSection'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCourse, buildBreadcrumbList } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Formation Informatique Particuliers Genève · DKDP',
  description:
    "Cours d'informatique à domicile pour particuliers à Genève. 463+ clients satisfaits, 4.6/5 étoiles. Excel, IA, smartphone, cybersécurité. CHF 140/h, sans engagement.",
  alternates: { canonical: 'https://dkdp.ch/formation-particuliers' },
}

const accent          = '#FF8C00'
const cardBg          = 'rgba(18,18,24,0.85)'
const cardBorder      = 'rgba(212,212,216,0.10)'
const highlightBg     = 'rgba(255,107,0,0.07)'
const highlightBorder = 'rgba(255,107,0,0.22)'

// ── Thématiques ───────────────────────────────────────────────────────────────

const TOPICS = [
  {
    Icon: Monitor,
    title: 'Informatique de base',
    desc: "Prise en main Mac ou PC, navigation internet, gestion des fichiers et emails. Idéal pour débutants et seniors.",
    tags: ['Mac & PC', 'Internet', 'Emails'],
    href: 'https://cours-informatique.ch/cours-informatique/ordinateur/',
  },
  {
    Icon: Smartphone,
    title: 'Smartphone',
    desc: "iPhone et Android : applications, photos, WhatsApp, paramètres, synchronisation et sécurité mobile.",
    tags: ['iPhone', 'Android', 'Applications'],
    href: 'https://cours-informatique.ch/cours-informatique/smartphone-iphone-android/',
  },
  {
    Icon: FileSpreadsheet,
    title: 'Bureautique',
    desc: "Word, Excel, PowerPoint, Outlook, Notion. Des formules simples aux tableaux croisés dynamiques.",
    tags: ['Excel', 'Word', 'PowerPoint', 'Outlook'],
    href: 'https://cours-informatique.ch/cours-informatique/bureautique-word-excel/',
  },
  {
    Icon: Bot,
    title: 'Intelligence Artificielle',
    desc: "ChatGPT, Claude, Copilot, Midjourney. Prompting efficace, génération d'images et automatisation du quotidien.",
    tags: ['ChatGPT', 'Claude', 'Prompting'],
    href: 'https://cours-informatique.ch/formation-intelligence-artificielle-ai/',
    highlight: true,
  },
  {
    Icon: Share2,
    title: 'Réseaux sociaux',
    desc: "LinkedIn, Instagram, TikTok, Facebook. Créer du contenu, développer sa présence et planifier ses publications.",
    tags: ['LinkedIn', 'Instagram', 'TikTok'],
    href: 'https://cours-informatique.ch/cours-informatique/formation-reseaux-sociaux-linkedin-instagram-tiktok/',
  },
  {
    Icon: Palette,
    title: 'Canva & Montage vidéo',
    desc: "Créer visuels, CV, flyers et présentations avec Canva. Montage vidéo avec CapCut, iMovie et Premiere.",
    tags: ['Canva', 'CapCut', 'iMovie'],
    href: 'https://cours-informatique.ch/canva/',
  },
  {
    Icon: Shield,
    title: 'Cybersécurité',
    desc: "Reconnaître les arnaques en ligne, gérer ses mots de passe et protéger ses données personnelles.",
    tags: ['Phishing', 'Mots de passe', 'Données'],
    href: 'https://cours-informatique.ch/formation-cybersecurite/',
  },
  {
    Icon: Code,
    title: 'Web & Développement',
    desc: "WordPress, Figma, Elementor. Python, HTML/CSS, JavaScript pour aller plus loin dans le numérique.",
    tags: ['WordPress', 'Python', 'HTML/CSS'],
    href: 'https://cours-informatique.ch/cours-informatique/formation-developpement-web/',
  },
]

// ── Pour qui ──────────────────────────────────────────────────────────────────

const PUBLICS = [
  { Icon: User,          title: 'Retraité ou senior',       desc: "Maîtriser internet, email, smartphone et les outils du quotidien." },
  { Icon: Briefcase,     title: 'Actif en reconversion',    desc: "Apprendre de nouveaux outils numériques pour changer de poste." },
  { Icon: GraduationCap, title: "Demandeur d'emploi",       desc: "Renforcer son profil avec des compétences digitales valorisables." },
  { Icon: UserSearch,    title: 'Freelance / Indépendant',  desc: "Gagner du temps avec l'IA et les outils numériques." },
]

// ── Modalités ─────────────────────────────────────────────────────────────────

const MODALITES = [
  {
    Icon: MapPin,
    title: 'À domicile ou en ligne',
    desc: "Le formateur se déplace chez vous à Genève, ou en visio. Déplacement gratuit dans le quartier des Eaux-Vives.",
  },
  {
    Icon: User,
    title: 'Cours 100% personnalisés',
    desc: "Programme adapté à votre niveau, votre rythme et vos objectifs. Jamais de cours standardisé.",
  },
  {
    Icon: CalendarCheck,
    title: 'Sans engagement',
    desc: "Cours immédiat, séance par séance, sans abonnement ni forfait minimum. Flexibilité totale.",
  },
  {
    Icon: MessageSquare,
    title: 'Financement possible',
    desc: "Chômage, aide sociale, assurance invalidité. L'équipe vous guide sur les démarches.",
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Je suis débutant complet, est-ce que ça pose un problème ?",
    answer:
      "Absolument pas. La majorité des participants débutent de zéro. Le premier cours sert à évaluer votre niveau de départ et à adapter le programme. On avance à votre rythme, sans jamais vous mettre en difficulté.",
  },
  {
    question: "Les cours se déroulent où ?",
    answer:
      "Le formateur se déplace directement chez vous à Genève. Le déplacement est gratuit pour les résidents des Eaux-Vives, et de 20 à 100 CHF pour le reste du canton selon la distance. Les cours sont également disponibles en visio.",
  },
  {
    question: "Quel est le tarif exact ?",
    answer:
      "CHF 140 par heure, sans frais cachés. Les frais de déplacement s'appliquent uniquement hors Eaux-Vives (20 à 100 CHF selon la distance). Paiement par virement bancaire, cash ou QR facture suisse.",
  },
  {
    question: "Y a-t-il un engagement sur le nombre de cours ?",
    answer:
      "Non. Aucun abonnement ni forfait minimum. Vous réservez séance par séance selon vos disponibilités. Un bloc de plusieurs séances à tarif préférentiel est possible, à discuter lors du premier contact.",
  },
  {
    question: "La formation peut-elle être financée ?",
    answer:
      "Oui. Des financements existent via l'assurance chômage, l'aide sociale ou l'assurance invalidité. L'équipe vous accompagne dans les démarches.",
  },
  {
    question: "Proposez-vous des cours en ligne ?",
    answer:
      "Oui, tous les cours sont disponibles en visio via Zoom ou Teams. Partage d'écran, travail sur vos fichiers en temps réel, même qualité qu'en présentiel, sans déplacement.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FormationParticuliersPage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildCourse({
          name: 'Formation Informatique pour Particuliers · cours-informatique.ch',
          url: '/formation-particuliers',
          description:
            "Cours d'informatique à domicile pour particuliers à Genève. 463+ clients satisfaits. Excel, IA, smartphone, cybersécurité. CHF 140/h, sans engagement.",
        })}
      />
      <SchemaOrg schema={buildBreadcrumbList([{ name: 'Accueil', url: '/' }, { name: 'Formation Particuliers', url: '/formation-particuliers' }])} />

      {/* ── Hero ── */}
      <InfiniteGrid
        accentRgb="255,140,0"
        blob1="rgba(255,107,0,0.07)"
        blob2="rgba(212,212,216,0.05)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left */}
              <div>
                <GradTag className="mb-6">Formation Particuliers</GradTag>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                  Apprenez l&apos;informatique{' '}
                  <GradText as="span">à domicile, à Genève.</GradText>
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed mb-4">
                  Via{' '}
                  <a
                    href="https://cours-informatique.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-75"
                    style={{ color: accent }}
                  >
                    cours-informatique.ch
                  </a>
                  , notre plateforme dédiée aux particuliers : cours privés personnalisés, à domicile ou en ligne, sans engagement.
                </p>

                {/* Social proof */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="flex gap-0.5" aria-label="4.6 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} style={{ color: accent, fill: accent }} aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-white font-semibold text-sm">4.6/5</span>
                  <span className="text-text-muted text-sm">· 463+ Genevois satisfaits</span>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="https://cours-informatique.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] font-semibold text-sm text-white transition-opacity hover:opacity-85"
                    style={{ background: accent }}
                  >
                    Visiter cours-informatique.ch <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <a
                    href="tel:+41799407969"
                    className="flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors"
                  >
                    <Phone size={13} aria-hidden="true" />
                    +41 79 940 79 69
                  </a>
                </div>
              </div>

              {/* Right: info card */}
              <SectionReveal delay={0.15}>
                <div
                  className="hidden lg:flex flex-col gap-5 rounded-2xl p-7 border"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                        Notre plateforme dédiée
                      </p>
                      <p className="text-white font-bold text-xl">cours-informatique.ch</p>
                    </div>
                    <Image
                      src="/images/partners/ci-mascot-thumbs.svg"
                      alt="Mascotte cours-informatique.ch"
                      width={120}
                      height={120}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: '463+',    lbl: 'clients satisfaits' },
                      { val: '4.6/5',   lbl: 'note moyenne' },
                      { val: '140 CHF', lbl: 'par heure' },
                      { val: 'Lun–Sam', lbl: '8h00 – 19h00' },
                    ].map(({ val, lbl }) => (
                      <div key={lbl}>
                        <p className="font-bold text-lg text-white leading-tight">{val}</p>
                        <p className="text-text-muted text-xs">{lbl}</p>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-muted text-xs">
                      <MapPin size={12} style={{ color: accent }} aria-hidden="true" />
                      36 Rue du 31 Décembre, 1207 Genève (Eaux-Vives)
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-xs">
                      <Phone size={12} style={{ color: accent }} aria-hidden="true" />
                      +41 79 940 79 69 · Lun–Sam 8h–19h
                    </div>
                  </div>
                </div>
              </SectionReveal>

            </div>
          </div>
        </section>
      </InfiniteGrid>

      {/* ── Stats ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { value: '463+',    label: 'Clients satisfaits',   sub: 'à Genève et en Suisse romande' },
              { value: '4.6/5',   label: 'Note moyenne',          sub: 'sur Trustindex' },
              { value: '140 CHF', label: 'Par heure',             sub: 'sans frais cachés' },
              { value: 'Lun–Sam', label: '8h – 19h',              sub: 'disponibles 6 jours sur 7' },
            ].map((s) => (
              <SectionReveal key={s.label}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-white text-sm font-medium">{s.label}</p>
                  <p className="text-text-muted text-xs mt-1">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pour qui ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Pour qui ?</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Des cours pour tout le monde, vraiment.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                cours-informatique.ch s&apos;adresse à toute personne souhaitant progresser,
                quel que soit son niveau. Pas de prérequis, pas de jugement.
                Le programme est entièrement adapté à chaque profil.
              </p>
              <p
                className="text-sm italic text-text-muted"
                style={{ borderLeft: '2px solid rgba(255,107,0,0.30)', paddingLeft: '1rem' }}
              >
                &ldquo;Apprendre, s&apos;entraîner, progresser, s&apos;amuser.&rdquo;
                <span className="block mt-1 not-italic font-semibold text-text-secondary">
                  Philosophie cours-informatique.ch
                </span>
              </p>
            </SectionReveal>

            <div className="grid grid-cols-2 gap-3">
              {PUBLICS.map((p) => (
                <SectionReveal key={p.title}>
                  <div
                    className="flex flex-col gap-2.5 p-4 rounded-[14px] border h-full"
                    style={{ background: cardBg, borderColor: cardBorder }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                      style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.18)` }}
                    >
                      <p.Icon size={16} style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <p className="text-white font-semibold text-sm leading-tight">{p.title}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Thématiques ── */}
      <section id="formations" className="py-24 bg-bg-card border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Thématiques</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                8 sujets, chacun disponible à Genève.
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                Cliquez sur une thématique pour découvrir le détail du cours sur cours-informatique.ch.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((t, i) => (
              <SectionReveal key={t.title} delay={i * 0.05}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full rounded-[16px] border p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: t.highlight ? highlightBg : cardBg,
                    borderColor: t.highlight ? highlightBorder : cardBorder,
                  }}
                >
                  {t.highlight && (
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                      Tendance 2026
                    </p>
                  )}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] mb-3"
                    style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.15)` }}
                  >
                    <t.Icon size={18} style={{ color: accent }} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{t.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed flex-1">{t.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-3 mb-3">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(212,212,216,0.07)',
                          color: '#A1A1AA',
                          border: '1px solid rgba(212,212,216,0.12)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold mt-auto transition-gap"
                    style={{ color: accent }}
                  >
                    Voir ce cours <ExternalLink size={11} aria-hidden="true" />
                  </span>
                </a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarif & Modalités ── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <SectionReveal>
              <GradTag className="mb-4">Tarif</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                CHF 140 de l&apos;heure,<br />sans surprise.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Un tarif unique et transparent. Le déplacement est gratuit aux Eaux-Vives,
                de 20 à 100 CHF pour le reste du canton de Genève.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Cours à domicile ou en ligne (Zoom / Teams)',
                  'Déplacement gratuit aux Eaux-Vives, 1207 Genève',
                  'Sans engagement, séance par séance',
                  'Paiement par virement, cash ou QR facture suisse',
                  'Financement possible (chômage, aide sociale, AI)',
                  'Lundi au samedi, 8h à 19h',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div
                      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.18)`, color: accent }}
                    >
                      ✓
                    </div>
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="flex flex-col gap-3">
                {MODALITES.map((m) => (
                  <div
                    key={m.title}
                    className="flex gap-4 p-5 rounded-[14px] border"
                    style={{ background: cardBg, borderColor: cardBorder }}
                  >
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px]"
                      style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.15)` }}
                    >
                      <m.Icon size={16} style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{m.title}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Vos questions sur la formation pour particuliers"
      />

      {/* ── Bridge vers entreprise ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[16px] border p-7"
              style={{ background: cardBg, borderColor: cardBorder }}
            >
              <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                Vous êtes une entreprise ? Découvrez nos formations corporate pour équipes.
                Programmes sur mesure, en présentiel ou à distance.
              </p>
              <Link
                href="/formation-entreprise"
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-opacity hover:opacity-80"
                style={{ background: 'rgba(255,107,0,0.12)', color: accent, border: `1px solid rgba(255,107,0,0.22)` }}
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
