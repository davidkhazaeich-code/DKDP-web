import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone, Mail, Check, BrainCircuit, Cpu, Bot, Workflow,
  Globe, Search, Megaphone, BarChart2,
  GraduationCap, Shield, BookOpen,
  ChevronRight, HelpCircle,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { violet, orange, chrome, green } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))

export const metadata: Metadata = {
  title: 'Tarifs · Création de site, Formation IA, Automatisation · DKDP',
  description:
    'Tarifs transparents pour la création de site web, la formation en entreprise et l\'automatisation IA à Genève. Prix fixes, devis gratuit sous 48h, sans engagement.',
  alternates: { canonical: 'https://dkdp.ch/tarifs' },
}

/* ── Design tokens (aliases) ── */
const chromeColor = chrome.color
const chromeBg    = chrome.bg
const chromeBd    = chrome.border
const violetColor = violet.color
const violetBg    = violet.bg
const violetBd    = violet.border
const orangeColor = orange.color
const orangeBg    = orange.bg
const orangeBd    = orange.border
const greenColor  = green.color

/* ── Formation pricing ── */
const HOURLY_RATES = [
  { label: '1 personne', rate: 150 },
  { label: '2 personnes', rate: 200 },
  { label: '3-6 personnes', rate: 250 },
  { label: '6-10 personnes', rate: 300 },
]

const FORMATION_FORMATS = [
  { label: 'Demi-journée', hours: 4, detail: '3h de formation + 1h de préparation' },
  { label: 'Journée entière', hours: 8, detail: '6h de formation + 2h de préparation' },
]

/* ── IA service cards ── */
const IA_SERVICES = [
  {
    Icon: BrainCircuit,
    title: 'Audit et Conseil IA',
    href: '/intelligence-artificielle/audit-conseil',
    from: 'CHF 490',
    to: 'CHF 890',
    labelFrom: 'Standard',
    labelTo: 'Complet',
    desc: 'Analyse de votre potentiel d\'automatisation. On identifie les 3 actions à fort ROI dans votre entreprise.',
  },
  {
    Icon: Workflow,
    title: 'Automatisation métier',
    href: '/intelligence-artificielle/automatisation',
    from: 'CHF 1\'500',
    to: 'CHF 3\'500',
    labelFrom: 'Starter',
    labelTo: 'Business',
    desc: 'Workflows sans code qui connectent vos outils et éliminent les tâches manuelles. Zéro friction.',
  },
  {
    Icon: Bot,
    title: 'Agents IA sur mesure',
    href: '/intelligence-artificielle/agents-ia',
    from: 'CHF 2\'500',
    to: 'CHF 4\'900',
    labelFrom: 'Starter',
    labelTo: 'Pro',
    desc: 'Agents intelligents conçus pour votre métier. Disponibles 24h/24, sans erreur de fatigue.',
  },
  {
    Icon: Cpu,
    title: 'Intégration LLM',
    href: '/intelligence-artificielle/mise-en-place',
    from: 'CHF 3\'500',
    to: 'CHF 6\'500',
    labelFrom: 'Standard',
    labelTo: 'Avancée',
    desc: 'Intégration de ChatGPT, Claude et autres modèles dans votre stack existant, sans tout reconstruire.',
  },
]

/* ── Service Digital items ── */
const AGENCE_ITEMS = [
  {
    Icon: Globe,
    title: 'Création de site web',
    href: '/agence-digitale/creation-site-web',
    price: 'À partir de CHF 3\'500',
    note: 'selon la complexité et le nombre de pages',
  },
  {
    Icon: Search,
    title: 'Référencement SEO',
    href: '/agence-digitale/seo',
    price: 'CHF 600 / mois · ou CHF 1\'500 (unique)',
    note: 'retainer mensuel sans engagement · ou pack mise en place',
  },
  {
    Icon: Megaphone,
    title: 'Google Ads',
    href: '/agence-digitale/publicite-sea',
    price: 'À partir de CHF 400 / mois',
    note: 'frais de gestion · budget publicitaire en sus',
  },
  {
    Icon: BarChart2,
    title: 'Consulting marketing',
    href: '/agence-digitale/consulting-marketing',
    price: 'CHF 180 / heure ou forfait projet',
    note: 'devis personnalisé selon la durée et la mission',
  },
]

/* ── FAQ ── */
const FAQ = [
  {
    q: 'Comment se passe le premier appel ?',
    a: 'L\'appel découverte dure 30 minutes et est entièrement gratuit. On écoute votre besoin, on pose les bonnes questions, et on vous envoie un devis détaillé sous 48 heures. Sans pression, sans engagement.',
  },
  {
    q: 'Peut-on payer en plusieurs fois ?',
    a: 'Oui. Pour la plupart des projets, le paiement se découpe en deux versements : 50% au démarrage du projet et 50% à la livraison finale. Un échéancier adapté peut être discuté pour les projets de grande envergure.',
  },
  {
    q: 'Y a-t-il des frais cachés ?',
    a: 'Non. Le devis inclut tout ce qui est prévu dans le scope. Si des besoins supplémentaires apparaissent en cours de projet, on en discute avant toute facturation. Transparence totale.',
  },
  {
    q: 'Qu\'est-ce qui est inclus après la livraison ?',
    a: 'Cela varie selon le service et est détaillé dans chaque devis. En règle générale : une période de garantie, un support pour les ajustements mineurs, et une documentation claire. Les maintenances continues font l\'objet d\'un forfait mensuel séparé.',
  },
]

export default function TarifsPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <HeroBg
        blob1="rgba(212,212,216,0.07)"
        blob2="rgba(124,58,237,0.05)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <GradTag className="mb-6">Tarifs</GradTag>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                Des prix fixes.{' '}
                <GradText as="span">Pas de surprise.</GradText>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                Chaque projet démarre par un appel gratuit. On vous propose un devis précis avant de démarrer. Toujours.
              </p>
              <div className="flex justify-center mb-10">
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Appel gratuit 30 min
                </LiquidMetalButton>
              </div>
              {/* Trust points */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                {['Prix fixe par projet', 'Devis sous 48h', 'Pas d\'engagement'].map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-sm text-text-muted">
                    <Check size={14} style={{ color: greenColor }} />
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Philosophy banner ── */}
      <section className="py-10 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="rounded-[16px] px-8 py-7 border flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{ background: chromeBg, borderColor: chromeBd }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
                style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${chromeBd}` }}
              >
                <HelpCircle size={20} style={{ color: chromeColor }} />
              </div>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                <strong className="text-white font-semibold">Nos tarifs sont indicatifs.</strong>{' '}
                Chaque projet est unique. Après votre appel découverte (gratuit, 30 min), vous recevez un devis
                détaillé et sans engagement. Ce que vous voyez ici vous donne une idée claire de l\'ordre de grandeur.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FORMATION ENTREPRISE
      ══════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-[6px] mb-4"
                style={{ color: orangeColor, background: orangeBg, border: `1px solid ${orangeBd}` }}
              >
                Formation Entreprise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Un tarif horaire{' '}
                <span style={{ color: orangeColor }}>adapté à la taille du groupe.</span>
              </h2>
              <p className="text-text-muted text-[15px] mt-3 max-w-xl">
                Le prix dépend du nombre de participants. Le programme est conçu sur mesure pour chaque entreprise.
              </p>
            </div>
          </SectionReveal>

          {/* Hourly rate table */}
          <SectionReveal delay={0.1}>
            <div className="rounded-[16px] border overflow-hidden" style={{ borderColor: orangeBd }}>
              <div
                className="px-6 py-4"
                style={{ background: orangeBg, borderBottom: `1px solid ${orangeBd}` }}
              >
                <p className="text-white text-sm font-bold">Tarif horaire selon le groupe</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4">
                {HOURLY_RATES.map((r, i) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center justify-center px-4 py-6 text-center"
                    style={{
                      borderRight: i < 3 ? `1px solid ${orangeBd}` : undefined,
                      borderBottom: i < 2 ? `1px solid ${orangeBd}` : undefined,
                    }}
                  >
                    <p className="text-text-muted text-xs font-medium mb-2">{r.label}</p>
                    <p className="text-2xl font-bold" style={{ color: orangeColor }}>
                      CHF {r.rate}
                    </p>
                    <p className="text-text-muted text-[11px] mt-1">par heure</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Format cards */}
          <SectionReveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {FORMATION_FORMATS.map((f) => (
                <div
                  key={f.label}
                  className="rounded-[16px] border p-6"
                  style={{ background: orangeBg, borderColor: orangeBd }}
                >
                  <p className="text-white font-bold text-lg mb-1">{f.label}</p>
                  <p className="text-text-muted text-xs mb-4">{f.detail}</p>
                  <div className="space-y-2">
                    {HOURLY_RATES.map((r) => (
                      <div key={r.label} className="flex items-center justify-between">
                        <span className="text-text-secondary text-sm">{r.label}</span>
                        <span className="font-bold text-sm" style={{ color: orangeColor }}>
                          CHF {r.rate * f.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Footer */}
          <SectionReveal delay={0.2}>
            <div
              className="mt-6 rounded-[14px] border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: orangeBg, borderColor: orangeBd }}
            >
              <p className="text-text-muted text-[12.5px] leading-relaxed">
                Programme personnalisé pour chaque entreprise. Devis gratuit sous 48h.
              </p>
              <Link
                href="/formation-entreprise"
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-[8px] transition-opacity hover:opacity-80 whitespace-nowrap"
                style={{ background: orangeBg, color: orangeColor, border: `1px solid ${orangeBd}` }}
              >
                Voir les programmes <ChevronRight size={12} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTELLIGENCE ARTIFICIELLE
      ══════════════════════════════════════════════ */}
      <section className="py-24 border-y border-border bg-bg-card">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-[6px] mb-4"
                style={{ color: chromeColor, background: chromeBg, border: `1px solid ${chromeBd}` }}
              >
                Intelligence Artificielle
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Automatisation et IA{' '}
                <span style={{ color: chromeColor }}>sur mesure.</span>
              </h2>
              <p className="text-text-muted text-[15px] mt-3 max-w-xl">
                Du diagnostic à l&apos;agent IA complet. Chaque projet est dimensionné selon vos besoins réels.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {IA_SERVICES.map((svc, i) => (
              <SectionReveal key={svc.title} delay={i * 0.08}>
                <div
                  className="group flex flex-col h-full rounded-[16px] border p-7 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  {/* Icon + title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${chromeBd}` }}
                    >
                      <svc.Icon size={20} style={{ color: chromeColor }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-[16px] leading-tight">{svc.title}</h3>
                      <p className="text-text-secondary text-[13px] mt-1.5 leading-relaxed">{svc.desc}</p>
                    </div>
                  </div>

                  {/* Price range */}
                  <div
                    className="mt-auto rounded-[10px] px-4 py-3 flex items-center justify-between gap-4"
                    style={{ background: 'rgba(212,212,216,0.06)', border: `1px solid ${chromeBd}` }}
                  >
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
                        {svc.labelFrom}
                      </p>
                      <p className="text-[17px] font-bold" style={{ color: chromeColor }}>{svc.from}</p>
                    </div>
                    <div className="text-text-muted text-[20px] font-light select-none">↔</div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
                        {svc.labelTo}
                      </p>
                      <p className="text-[17px] font-bold" style={{ color: chromeColor }}>{svc.to}</p>
                    </div>
                    <Link
                      href={svc.href}
                      className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-[8px] transition-opacity hover:opacity-70"
                      style={{ background: chromeBg, border: `1px solid ${chromeBd}` }}
                      aria-label={`En savoir plus sur ${svc.title}`}
                    >
                      <ChevronRight size={14} style={{ color: chromeColor }} />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/intelligence-artificielle"
                className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: chromeColor }}
              >
                Découvrir tous nos services IA <ChevronRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AGENCE DIGITALE
      ══════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="mb-12">
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-[6px] mb-4"
                style={{ color: violetColor, background: violetBg, border: `1px solid ${violetBd}` }}
              >
                Service Digital
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-xl">
                Site web, SEO et{' '}
                <span style={{ color: violetColor }}>marketing digital.</span>
              </h2>
              <p className="text-text-muted text-[15px] mt-3 max-w-xl">
                Les tarifs reflètent la complexité et la portée du projet. Un devis gratuit vous donnera le chiffre exact.
              </p>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-4">
            {AGENCE_ITEMS.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <Link
                  href={item.href}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[14px] border px-6 py-5 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: violetBg, borderColor: violetBd }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
                      style={{ background: 'rgba(124,58,237,0.12)', border: `1px solid ${violetBd}` }}
                    >
                      <item.Icon size={20} style={{ color: violetColor }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-[15px] leading-tight">{item.title}</p>
                      <p className="text-text-muted text-[12.5px] mt-0.5">{item.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <p className="text-[15px] font-bold" style={{ color: violetColor }}>{item.price}</p>
                    <ChevronRight
                      size={16}
                      style={{ color: violetColor }}
                      className="opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div
              className="mt-6 rounded-[14px] border px-6 py-5"
              style={{ background: 'rgba(124,58,237,0.04)', borderColor: violetBd }}
            >
              <p className="text-text-muted text-[13.5px] leading-relaxed">
                <strong className="text-white font-semibold">Sites web :</strong>{' '}
                les tarifs dépendent du nombre de pages, des fonctionnalités demandées et du niveau de personnalisation graphique.
                Un site vitrine simple diffère d&apos;une plateforme e-commerce avec espace client. Devis gratuit et sans engagement.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.35}>
            <div className="mt-6 text-center">
              <Link
                href="/agence-digitale"
                className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: violetColor }}
              >
                Découvrir tous nos services digitaux <ChevronRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-24 border-t border-border bg-bg-card">
        <div className="max-w-[860px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Questions fréquentes</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Tout ce que vous devez savoir.
              </h2>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-4">
            {FAQ.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div
                  className="rounded-[16px] border px-7 py-6"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${chromeBd}` }}
                    >
                      <GraduationCap size={15} style={{ color: chromeColor }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-[15px] mb-2">{item.q}</p>
                      <p className="text-text-secondary text-[14px] leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Contact nudge */}
          <SectionReveal delay={0.35}>
            <div className="mt-10 text-center">
              <p className="text-text-muted text-[14px] mb-4">
                Une question qui n&apos;est pas dans la liste ?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+41799407969"
                  className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors"
                >
                  <Phone size={13} />
                  +41 79 940 79 69
                </a>
                <a
                  href="mailto:dk@dkdp.ch"
                  className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors"
                >
                  <Mail size={13} />
                  dk@dkdp.ch
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <CTAFinal />
    </main>
  )
}
