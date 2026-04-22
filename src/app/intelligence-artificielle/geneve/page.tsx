import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  CheckCircle2,
  ChevronRight,
  Bot,
  MessageSquare,
  Workflow,
  Search,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Building2,
  Star,
  Zap,
  BrainCircuit,
  Award,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet as violetToken, green as greenToken } from '@/lib/tokens'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))

export const metadata: Metadata = {
  title: 'Agence IA à Genève | Agents, chatbots, automatisation | DKDP',
  description:
    "Agence IA à Genève : agents sur mesure, chatbots Claude Opus 4.7 ou GPT-5, automatisation n8n. 700+ PME romandes accompagnées depuis 2015. Eaux-Vives. Devis 48 h. Tél 079 940 79 69.",
  alternates: {
    canonical: 'https://dkdp.ch/intelligence-artificielle/geneve',
    languages: {
      'fr-CH': 'https://dkdp.ch/intelligence-artificielle/geneve',
      'x-default': 'https://dkdp.ch/intelligence-artificielle/geneve',
    },
  },
  openGraph: {
    url: 'https://dkdp.ch/intelligence-artificielle/geneve',
    title: 'Agence IA à Genève | Agents, chatbots, automatisation | DKDP',
    description:
      "Agence IA locale à Genève (Eaux-Vives). Agents IA Claude, chatbots GPT-5, automatisation n8n. 700+ PME romandes accompagnées. Audit IA gratuit en 30 minutes.",
    type: 'website',
    locale: 'fr_CH',
    siteName: 'DKDP',
    images: [{ url: '/images/og/ia-geneve.png', width: 1376, height: 768, alt: "Agence IA à Genève : DKDP aux Eaux-Vives, agents, chatbots et automatisation pour PME romandes" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agence IA à Genève | DKDP',
    description: "Agence IA Genève (Eaux-Vives) : agents, chatbots, automatisation. 700+ PME romandes accompagnées. Devis 48 h.",
  },
  keywords: [
    'agence IA Genève',
    'agence intelligence artificielle Genève',
    'consultant IA Genève',
    'IA PME Genève',
    'agents IA Genève',
    'chatbot IA Genève',
    'automatisation IA Genève',
    'DKDP',
  ],
}

const V = violetToken.color
const C = chrome.color
const G = greenToken.color
const color = C
const bg = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'

const FAQ = [
  {
    question: "Qu'est-ce qu'une agence IA à Genève fait concrètement ?",
    answer:
      "Une agence IA comme DKDP conçoit, développe et déploie des solutions d'intelligence artificielle sur mesure pour les PME : agents autonomes (qualification commerciale, support client, analyse de données), chatbots propulsés par Claude Opus 4.7, GPT-5 ou Gemini 3, automatisations n8n/Make/Zapier qui connectent vos outils métier (Bexio, HubSpot, Google Workspace). On intervient de l'audit initial à la mise en production, avec formation des équipes. DKDP est basée aux Eaux-Vives à Genève et accompagne des PME en Suisse romande depuis 2015.",
  },
  {
    question: "Combien coûte un projet IA pour PME à Genève ?",
    answer:
      "Les tarifs DKDP 2026 à Genève : Audit IA simple (CHF 890), Prototype d'agent ou chatbot (CHF 2 500 à 2 900, 2 semaines), Projet complet (dès CHF 4 900 pour un agent Pro multi-canal, dès CHF 12 000 pour un agent RAG multi-agents). Formation IA entreprise facturée à l'heure : CHF 200/h pour 1 personne, CHF 300/h pour 2, sur devis dès 3 participants. Un devis fixe est fourni en 48 heures après l'audit.",
  },
  {
    question: "Mes données restent-elles en Suisse ?",
    answer:
      "Oui si vous le demandez. Pour les secteurs régulés (fiduciaire, médical, juridique, banque privée, RH) DKDP déploie les solutions IA sur serveur Suisse : Infomaniak (Genève, Winterthur), Exoscale, ou on-premise sur votre propre infrastructure. Les modèles IA souverains (Infomaniak Euria, Swisscom Swiss AI Assistant, Mistral auto-hébergé) garantissent que les données ne quittent jamais le territoire. Conformité nLPD 2023 et secret professionnel par défaut. Un DPA est signé systématiquement avant tout démarrage.",
  },
  {
    question: "Faut-il former mes employés à l'IA ?",
    answer:
      "Oui, et c'est souvent le premier pas le plus rentable. DKDP propose des formations IA en entreprise à Genève (1 jour, en présentiel ou en ligne) qui rendent vos équipes autonomes sur ChatGPT, Claude et Microsoft Copilot. 100 % des participants sont opérationnels dès le lendemain et gagnent en moyenne 8 heures par semaine. Pour en savoir plus, voir la page dédiée formation IA entreprise.",
  },
  {
    question: "Claude, ChatGPT ou Gemini pour ma PME ?",
    answer:
      "Dépend du cas d'usage. Claude Opus 4.7 (Anthropic) pour le raisonnement long, l'analyse de documents métier, les agents qui manipulent des outils. GPT-5 (OpenAI) pour les agents multimodaux (texte, image, voix) et les intégrations larges. Gemini 3 (Google) si vous êtes déjà 100 % Google Workspace. Pour les données sensibles, on propose aussi Infomaniak Euria ou Mistral Large 2 auto-hébergés. On compare ces modèles en détail dans notre guide ChatGPT, Claude, Copilot : lequel choisir pour votre PME en 2026.",
  },
  {
    question: "Quelle est la différence entre agent IA, chatbot et automatisation ?",
    answer:
      "Un chatbot répond à des questions dans une conversation (site, WhatsApp). Un agent IA prend des décisions autonomes et exécute des actions dans vos outils (CRM, ERP, calendrier). Une automatisation est un workflow sans interaction directe (email déclenche action dans Bexio). Dans la pratique, les trois se combinent : un chatbot qui qualifie un lead, un agent qui enrichit le CRM, une automatisation qui envoie un email de bienvenue. DKDP déploie les trois selon votre besoin, souvent combinés.",
  },
  {
    question: "Combien de temps pour voir un ROI sur un projet IA ?",
    answer:
      "Les ROI observés chez DKDP 2024-2026 : un agent commercial ou un chatbot de support rentabilise le projet en 2 à 4 mois sur une PME de 5 à 30 collaborateurs. Une automatisation simple (facturation, relances) est rentable en moins de 30 jours. Une formation IA entreprise est rentable dès le premier mois (8 heures par semaine gagnées par personne, soit environ CHF 1 600 de productivité par collaborateur par mois aux tarifs PME Genève). On livre une projection ROI chiffrée lors de l'audit initial gratuit.",
  },
  {
    question: "L'IA va-t-elle remplacer des emplois dans mon entreprise ?",
    answer:
      "Non, sauf si c'est votre objectif explicite, ce qui est rare. L'IA DKDP est conçue pour libérer votre équipe des tâches répétitives à faible valeur (saisie, relances manuelles, tri d'emails, reporting) et les laisser se concentrer sur ce qui compte : relation client, stratégie, créativité. Sur nos déploiements, aucun licenciement n'a été lié à l'IA. À l'inverse, plusieurs clients ont recruté grâce à la croissance générée par l'IA. Pour approfondir, lisez IA ou consultant humain : ce que l'un fait mieux.",
  },
  {
    question: "Êtes-vous conformes à la nLPD Suisse ?",
    answer:
      "Oui. DKDP applique systématiquement la nLPD 2023 sur tous les projets : DPA signé, registre des traitements, chiffrement des données sensibles, hébergement Suisse possible pour les cas critiques, politique de conservation des données personnalisée, droit d'accès et de suppression implémentés dans nos solutions. On travaille régulièrement avec des fiduciaires, cabinets médicaux et études d'avocats genevois, qui ont les exigences les plus strictes.",
  },
  {
    question: "Peut-on rencontrer l'équipe en personne à Genève ?",
    answer:
      "Oui. DKDP est basée à la Rue du 31 Décembre 36 dans le quartier des Eaux-Vives à Genève. On propose des rendez-vous découverte gratuits de 30 minutes, en visio ou en présentiel. Pour les projets supérieurs à CHF 5 000, le kick-off se fait systématiquement en présentiel à Genève, Lausanne ou chez vous. Tél : 079 940 79 69.",
  },
]

export default function IAGenevePage() {
  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: 'Agence IA à Genève',
          url: '/intelligence-artificielle/geneve',
          description:
            "Agence IA à Genève spécialisée pour les PME romandes depuis 2015. Conception et déploiement d'agents IA sur mesure (Claude Opus 4.7, GPT-5, Gemini 3), chatbots intelligents connectés à WhatsApp Business et au CRM, automatisation n8n/Make/Zapier des processus métier. Conforme nLPD 2023 et RGPD. Hébergement Suisse disponible (Infomaniak). 700+ clients accompagnés. Basée aux Eaux-Vives (Rue du 31 Décembre 36, 1207 Genève).",
          serviceType: "Agence d'intelligence artificielle",
          priceFrom: 890,
          priceSpecDescription: 'À partir de CHF 890 pour un audit IA 360° avec rapport et roadmap',
        })}
      />
      <SchemaOrg schema={buildFAQPage(FAQ)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Intelligence Artificielle', url: 'https://dkdp.ch/intelligence-artificielle' },
          { name: 'IA à Genève', url: 'https://dkdp.ch/intelligence-artificielle/geneve' },
        ])}
      />

      {/* ── Hero ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.08)" accentRgb="212,212,216">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/intelligence-artificielle" className="text-text-muted text-sm hover:text-white transition-colors">
                Intelligence Artificielle
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color }}>IA à Genève</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">Agence IA à Genève</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-white mb-6">
                  Agence IA à Genève : <GradText as="span">agents, chatbots, automatisation</GradText> pour PME romandes.
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
                  700+ PME romandes accompagnées depuis 2015. Basée aux Eaux-Vives à Genève. Technologies Claude Opus 4.7, GPT-5, n8n. Conforme nLPD 2023, hébergement Suisse possible.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Audit IA gratuit 30 min
                  </LiquidMetalButton>
                  <Link
                    href="#services"
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    Voir les services →
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-8">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color }} />
                    <span className="text-text-muted text-xs">Rue du 31 Décembre 36, 1207 Eaux-Vives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color }} />
                    <a href="tel:+41799407969" className="text-text-muted text-xs hover:text-white transition-colors">
                      +41 79 940 79 69
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,212,216,0.10)' }}
                >
                  <Image
                    src="/images/og/ia-geneve.png"
                    alt="Agence IA à Genève DKDP : David Khazaei dans les locaux des Eaux-Vives avec équipe PME"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { v: '10 h/sem', l: 'Gain moyen par collaborateur', sub: 'Après formation IA + automatisation' },
              { v: '-40 %', l: 'Coûts support client', sub: 'Avec chatbot IA' },
              { v: '+60 %', l: 'Leads qualifiés', sub: 'Avec agent commercial' },
              { v: '2 sem.', l: 'De la maquette au production', sub: 'Pour un premier prototype' },
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

      {/* ── Estimation CTA (lead-gen haute intention) ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            href="/agence-digitale/creation-site-web/estimation"
            className="group relative block overflow-hidden rounded-[20px] border transition-all hover:-translate-y-0.5 duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(212,212,216,0.14) 0%, rgba(212,212,216,0.04) 100%)',
              borderColor: 'rgba(212,212,216,0.30)',
              boxShadow: '0 0 50px rgba(212,212,216,0.08)',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color }}>
                  Budget et délai en 2 minutes
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-2">
                  Estimez votre projet IA ou digital à Genève.
                </h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-xl">
                  Estimateur en ligne gratuit : agent IA, chatbot, automatisation, site web. Réponse chiffrée immédiate, sans e-mail obligatoire.
                </p>
              </div>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm shrink-0 transition-transform group-hover:translate-x-1"
                style={{ background: color, color: '#09090B' }}
              >
                Obtenir mon estimation
                <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Subnav ── */}
      <ScrollSpyNav
        items={[
          { label: 'Services', href: '#services' },
          { label: 'Pourquoi local', href: '#pourquoi-local' },
          { label: 'Technologies', href: '#technologies' },
          { label: 'Cas clients', href: '#cas-clients' },
          { label: 'Processus', href: '#processus' },
          { label: 'Tarifs', href: '#tarifs' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Audit IA gratuit', href: '/contact?service=ia-geneve' }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── 3 services IA les plus demandés à Genève ── */}
      <section id="services" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Services</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                Les 3 services IA les plus demandés à Genève en 2026.
              </h2>
              <p className="text-text-secondary text-sm max-w-2xl mx-auto">
                Issu de 700 audits réalisés sur les PME romandes depuis 2015.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Bot,
                title: 'Agents IA sur mesure',
                accent: violetToken.color,
                accentBg: 'rgba(167,139,250,0.08)',
                accentBorder: 'rgba(167,139,250,0.20)',
                desc: "Des employés virtuels qui qualifient vos leads, répondent à vos clients et analysent vos données. Propulsés par Claude Opus 4.7 ou GPT-5, connectés à votre stack (HubSpot, Bexio, Salesforce).",
                examples: "Agent commercial Fiduciaire Eaux-Vives : +40 % de gain de temps sur la qualification leads.",
                href: '/intelligence-artificielle/agents-ia',
                cta: "Voir les agents IA",
              },
              {
                Icon: MessageSquare,
                title: 'Chatbots intelligents',
                accent: G,
                accentBg: 'rgba(74,222,128,0.06)',
                accentBorder: 'rgba(74,222,128,0.20)',
                desc: "Chatbots IA sur site web, WhatsApp Business ou Messenger. Support 24/7, qualification leads, prise de rendez-vous. RAG sur votre base documentaire privée.",
                examples: "Cabinet médical Plainpalais : -60 % d'appels de tri, meilleur NPS patient.",
                href: '/intelligence-artificielle/chatbot-ia',
                cta: 'Voir les chatbots',
              },
              {
                Icon: Workflow,
                title: 'Automatisation des processus',
                accent: C,
                accentBg: bg,
                accentBorder: border,
                desc: "Workflows n8n (auto-hébergé Suisse), Make et Zapier qui connectent Bexio, Abacus, Google Workspace, Slack. Automatisations conformes nLPD 2023.",
                examples: "E-commerce Carouge : 40 h/mois libérées sur la facturation et le SAV.",
                href: '/intelligence-artificielle/automatisation',
                cta: "Voir l'automatisation",
              },
            ].map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="flex flex-col h-full rounded-[16px] border p-7 transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: s.accentBg, borderColor: s.accentBorder }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[10px] mb-5"
                    style={{ background: s.accentBg, border: `1px solid ${s.accentBorder}` }}
                  >
                    <s.Icon size={22} style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <p className="text-text-muted text-xs italic leading-relaxed mb-4">{s.examples}</p>
                  <p
                    className="text-sm font-semibold inline-flex items-center gap-1.5"
                    style={{ color: s.accent }}
                  >
                    {s.cta} <ChevronRight size={14} />
                  </p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pourquoi une agence IA locale à Genève ── */}
      <section id="pourquoi-local" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">Proximité</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Pourquoi choisir une agence IA locale à Genève ?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Les acteurs IA français (OpenClassrooms, grands intégrateurs parisiens) dominent le SEO générique mais ne comprennent ni le tissu PME romand ni les contraintes Suisse. DKDP, basée aux Eaux-Vives depuis 2015, propose une proximité physique, une compréhension réglementaire et une facturation locale qu&apos;aucun prestataire hors-Suisse ne peut égaler.
              </p>
              <div className="space-y-4">
                {[
                  { k: 'Proximité physique', v: "Rendez-vous en personne aux Eaux-Vives, déplacements sur Lausanne, Nyon, Fribourg. Kick-off systématique en présentiel au-delà de CHF 5 000." },
                  { k: 'Conformité nLPD 2023 et RGPD', v: "Hébergement Suisse (Infomaniak, Exoscale) maîtrisé. DPA signé systématiquement. Expérience concrète avec fiduciaires, cabinets médicaux et études d'avocats genevois." },
                  { k: 'Tissu PME romand', v: "700+ PME accompagnées depuis 2015. On connaît Bexio, Abacus, Twint, PostFinance, les spécificités des cantons et les habitudes d'achat romandes." },
                  { k: 'Facturation en CHF', v: "Pas de frais de change, pas d'IVA surprise sur facturation française. Paiement par virement bancaire Suisse ou Twint business." },
                ].map((row) => (
                  <div key={row.k}>
                    <p className="text-white font-semibold text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 size={13} style={{ color }} />
                      {row.k}
                    </p>
                    <p className="text-text-secondary text-xs leading-relaxed pl-6">{row.v}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div
                className="rounded-[20px] p-7 border"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest mb-5 text-center" style={{ color }}>
                  Zones couvertes
                </p>
                <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs">
                  {[
                    'Genève', 'Lausanne', 'Nyon', 'Morges',
                    'Fribourg', 'Neuchâtel', 'Sion', 'Montreux',
                    'Carouge', 'Meyrin', 'Onex', 'Vernier',
                  ].map((city) => (
                    <div
                      key={city}
                      className="px-3 py-2 rounded-md border text-text-secondary flex items-center gap-2"
                      style={{ background: 'rgba(212,212,216,0.04)', borderColor: border }}
                    >
                      <MapPin size={11} style={{ color }} />
                      {city}
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-[12px] p-4 border"
                  style={{ background: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.20)' }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: V }}>
                    Bureaux DKDP
                  </p>
                  <p className="text-white text-sm font-semibold mb-1">Rue du 31 Décembre 36</p>
                  <p className="text-text-secondary text-xs">1207 Genève, Eaux-Vives</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={11} className="text-text-muted" />
                    <p className="text-text-muted text-xs">Lun-Ven 9h-18h</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Technologies IA déployées à Genève ── */}
      <section id="technologies" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Stack 2026</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                Technologies IA que nous déployons à Genève.
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-sm">
                Les meilleures briques du marché 2026, choisies selon votre cas d&apos;usage, budget et contraintes de souveraineté.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Claude Opus 4.7', provider: 'Anthropic', pitch: 'Raisonnement long, analyse de documents, manipulation d\'outils.', accent: V, accentBg: 'rgba(167,139,250,0.08)', accentBorder: 'rgba(167,139,250,0.20)' },
              { name: 'GPT-5 / GPT-5.3', provider: 'OpenAI', pitch: 'Multimodal : texte, image, voix. Large écosystème d\'intégrations.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'Gemini 3', provider: 'Google', pitch: 'Intégration native Google Workspace et agents longue mémoire.', accent: '#60a5fa', accentBg: 'rgba(96,165,250,0.08)', accentBorder: 'rgba(96,165,250,0.22)' },
              { name: 'Mistral Large 2', provider: 'Mistral / Open-source', pitch: 'Open-source performant, auto-hébergeable en Suisse.', accent: '#fbbf24', accentBg: 'rgba(251,191,36,0.08)', accentBorder: 'rgba(251,191,36,0.22)' },
              { name: 'Llama 4', provider: 'Meta / Open-source', pitch: 'Modèles open-source pour souveraineté totale.', accent: '#fbbf24', accentBg: 'rgba(251,191,36,0.08)', accentBorder: 'rgba(251,191,36,0.22)' },
              { name: 'LangChain / LangGraph', provider: 'Orchestration', pitch: 'Chaînes d\'agents complexes, routage, validation, escalade.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'n8n / Make / Zapier', provider: 'Automatisation', pitch: 'Connecte Bexio, Salesforce, HubSpot, Google Workspace, WhatsApp.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'Pinecone / Weaviate / Qdrant', provider: 'Vector DB (RAG)', pitch: 'Alimentent vos agents avec votre base documentaire privée.', accent: C, accentBg: bg, accentBorder: border },
              { name: 'Infomaniak Euria / Swisscom', provider: 'IA souveraine Suisse', pitch: 'Hébergées 100 % Suisse. nLPD 2023 par défaut.', accent: G, accentBg: 'rgba(74,222,128,0.06)', accentBorder: 'rgba(74,222,128,0.20)' },
            ].map((t) => (
              <SectionReveal key={t.name}>
                <div
                  className="flex flex-col gap-2 p-5 rounded-[12px] border h-full"
                  style={{ background: t.accentBg, borderColor: t.accentBorder }}
                >
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: t.accent }}>
                    {t.provider}
                  </p>
                  <p className="text-text-muted text-xs leading-relaxed">{t.pitch}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-xs text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              Pour comparer en détail les modèles grand public, lisez{' '}
              <Link href="/blog/chatgpt-claude-copilot-lequel-choisir-pme-2026" className="underline hover:text-white transition-colors">
                ChatGPT, Claude ou Copilot : lequel choisir pour votre PME en 2026
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Cas clients IA à Genève ── */}
      <section id="cas-clients" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Résultats locaux</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                Cas clients IA à Genève : résultats réels.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                secteur: 'Fiduciaire',
                quartier: 'Eaux-Vives',
                stack: 'Agent commercial Claude Opus 4.7 + HubSpot + Bexio via n8n',
                resultat: "+40 % gain temps commercial, 18 h/sem libérées, qualification leads 100 % automatisée",
              },
              {
                secteur: 'Cabinet médical',
                quartier: 'Plainpalais',
                stack: 'Chatbot Infomaniak Euria (souverain Suisse) + WhatsApp Business',
                resultat: '-60 % appels de tri, prise RDV 24/7, meilleur NPS patient (+22 points)',
              },
              {
                secteur: 'E-commerce romand',
                quartier: 'Carouge',
                stack: 'Agent support GPT-5 multilingue + Notion RAG + Zendesk',
                resultat: '+35 % NPS client, traitement 24/7, 70 % des tickets niveau 1 automatisés',
              },
            ].map((c) => (
              <SectionReveal key={c.secteur}>
                <div
                  className="flex flex-col h-full rounded-[16px] border p-7"
                  style={{ background: bg, borderColor: border }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={14} style={{ color }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
                      {c.secteur}
                    </p>
                  </div>
                  <p className="text-white font-semibold mb-3">{c.quartier}</p>
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Stack déployée</p>
                    <p className="text-text-secondary text-xs leading-relaxed">{c.stack}</p>
                  </div>
                  <div className="pt-4 border-t" style={{ borderColor: border }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color }}>Résultat</p>
                    <p className="text-white text-sm leading-relaxed font-medium">{c.resultat}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-xs text-center mt-8 max-w-2xl mx-auto">
              Les noms exacts des clients sont anonymisés par défaut. Des références nominatives peuvent être partagées lors d&apos;un rendez-vous découverte sur demande explicite.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Processus ── */}
      <section id="processus" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Processus</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto">
                De l&apos;audit IA à la mise en production, en 6 étapes.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Search, n: '01', title: 'Audit IA 360°', desc: "Visio ou présentiel (Eaux-Vives). 30 min gratuits pour cartographier vos cas d'usage IA prioritaires." },
              { Icon: MapPin, n: '02', title: 'Roadmap 12 mois', desc: 'Plan détaillé, ROI estimé, priorités trimestrielles. Choix techno justifiés par votre stack et vos contraintes.' },
              { Icon: Zap, n: '03', title: 'Prototype 2 semaines', desc: "Premier agent/chatbot/workflow livré rapidement, testable en conditions réelles avant engagement projet complet." },
              { Icon: BrainCircuit, n: '04', title: 'Déploiement production', desc: "Passage en production avec validation humaine parallèle. Staging, tests, monitoring, bascule propre." },
              { Icon: Award, n: '05', title: 'Formation équipes', desc: "Formation IA entreprise en présentiel à Genève ou en ligne. Vos équipes autonomes dès J+1." },
              { Icon: ShieldCheck, n: '06', title: 'Support continu', desc: '3 mois de suivi inclus. Au-delà, maintenance mensuelle optionnelle dès CHF 250/mois.' },
            ].map((step, i) => (
              <SectionReveal key={step.n} delay={i * 0.05}>
                <div
                  className="flex flex-col gap-3 p-6 rounded-[14px] border h-full relative"
                  style={{ background: bg, borderColor: border }}
                >
                  <span className="absolute top-4 right-4 text-[11px] font-bold" style={{ color: `${color}60` }}>
                    {step.n}
                  </span>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[8px]"
                    style={{ background: 'rgba(212,212,216,0.10)', border: `1px solid ${border}` }}
                  >
                    <step.Icon size={17} style={{ color }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <section id="tarifs" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Tarifs</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] max-w-3xl mx-auto mb-4">
                Tarifs IA à Genève pour PME romandes.
              </h2>
              <p className="text-text-secondary text-sm max-w-xl mx-auto">
                Prix fixes, devis en 48 heures après l&apos;audit. Facturation CHF, TVA Suisse.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Audit IA 360°',
                price: 'CHF 890',
                delay: "Rapport en 5 jours",
                features: [
                  "Cartographie de vos 3 cas d'usage IA prioritaires",
                  "Estimation ROI chiffrée par cas",
                  "Recommandations techno personnalisées",
                  "Plan de déploiement 12 mois",
                  "Session de restitution 1h30",
                ],
                highlighted: false,
              },
              {
                name: 'Prototype IA',
                price: 'Dès CHF 2 500',
                delay: '2 semaines',
                features: [
                  'Un agent, chatbot ou workflow livré',
                  "Intégration à 1 outil existant",
                  'Testable en conditions réelles',
                  'Décision go/no-go projet complet',
                  "1 mois de suivi inclus",
                ],
                highlighted: true,
              },
              {
                name: 'Projet IA complet',
                price: 'Sur devis',
                delay: '4 à 12 semaines',
                features: [
                  'Agents ou chatbots multi-canaux',
                  'Automatisations n8n avancées',
                  'Formation équipes incluse',
                  "3 mois de support continu",
                  'Monitoring et amélioration',
                ],
                highlighted: false,
              },
            ].map((p) => (
              <SectionReveal key={p.name}>
                <div
                  className="flex flex-col h-full rounded-[20px] border p-7 relative"
                  style={{
                    background: p.highlighted ? 'linear-gradient(135deg, rgba(212,212,216,0.12) 0%, rgba(212,212,216,0.04) 100%)' : bg,
                    borderColor: p.highlighted ? 'rgba(212,212,216,0.32)' : border,
                    boxShadow: p.highlighted ? '0 0 50px rgba(212,212,216,0.10)' : undefined,
                  }}
                >
                  {p.highlighted && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(212,212,216,0.16)', color, border: `1px solid ${border}` }}
                    >
                      Recommandé
                    </span>
                  )}
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color }}>
                    {p.name}
                  </p>
                  <p className="text-3xl font-bold text-white mb-1 mt-2">{p.price}</p>
                  <p className="text-text-muted text-xs mb-6">{p.delay}</p>
                  <div className="flex flex-col gap-2.5 flex-1 mb-6">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color }} />
                        <span className="text-text-secondary text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    Planifier un appel
                  </LiquidMetalButton>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-text-muted text-xs text-center mt-8 max-w-2xl mx-auto">
              Formation IA entreprise facturée séparément : CHF 200/h pour 1 personne, CHF 300/h pour 2. Pour 3 à 10 personnes ou journée entière, voir la{' '}
              <Link href="/formation-entreprise/ia" className="underline hover:text-white transition-colors">
                page Formation IA entreprise
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <Testimonials accentRgb="212,212,216" />

      {/* ── FAQ ── */}
      <div id="faq" className="scroll-mt-[124px]">
        <FAQSection items={FAQ} title="Questions fréquentes sur l'IA à Genève" />
      </div>

      {/* ── Services liés ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">
              Compléter votre démarche IA à Genève
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { href: '/intelligence-artificielle/agents-ia', label: 'Agents IA', desc: "Claude, GPT-5, LangChain" },
              { href: '/intelligence-artificielle/chatbot-ia', label: 'Chatbots IA', desc: "Claude, WhatsApp, RAG" },
              { href: '/intelligence-artificielle/automatisation', label: 'Automatisation', desc: 'n8n, Make, Zapier' },
              { href: '/formation-entreprise/ia', label: 'Formation IA entreprise', desc: 'Une journée, 100 % opérationnels' },
            ].map((link) => (
              <SectionReveal key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-[14px] p-5 border transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: bg, borderColor: border }}
                >
                  <div>
                    <p className="text-white font-semibold text-sm">{link.label}</p>
                    <p className="text-text-muted text-xs mt-0.5">{link.desc}</p>
                  </div>
                  <ChevronRight size={16} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color }} />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact local ── */}
      <section className="py-24 bg-bg-card border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <SectionReveal>
              <GradTag className="mb-4">Rencontrons-nous</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                Rencontrons-nous aux Eaux-Vives.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Pour un audit IA gratuit de 30 minutes, on se voit en visio ou dans nos bureaux du 36 Rue du 31 Décembre. À proximité de la gare des Eaux-Vives, 5 min à pied depuis le centre-ville de Genève.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={16} style={{ color }} />
                  <p className="text-text-secondary text-sm">Rue du 31 Décembre 36, 1207 Genève (Eaux-Vives)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color }} />
                  <a href="tel:+41799407969" className="text-text-secondary text-sm hover:text-white transition-colors">
                    +41 79 940 79 69
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color }} />
                  <p className="text-text-secondary text-sm">Lundi à vendredi, 9h à 18h</p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div
                className="rounded-[20px] p-8 border text-center"
                style={{ background: bg, borderColor: border, boxShadow: '0 0 50px rgba(212,212,216,0.06)' }}
              >
                <Star size={28} className="mx-auto mb-4" style={{ color }} />
                <p className="text-3xl font-bold text-white mb-2">5,0 / 5,0</p>
                <p className="text-text-secondary text-sm mb-4">18 avis Google vérifiés</p>
                <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                  Planifier un audit IA
                </LiquidMetalButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <CTAFinal accentRgb="212,212,216" />
    </main>
  )
}
