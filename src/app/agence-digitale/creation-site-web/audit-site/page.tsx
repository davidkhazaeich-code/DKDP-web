import type { Metadata } from 'next'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet as violetToken, chrome as chromeToken, orange as orangeToken, green as greenToken } from '@/lib/tokens'
import { AuditHeroForm } from '@/components/sections/AuditHeroForm'

export const metadata: Metadata = {
  title: 'Audit de site internet gratuit · Genève & Suisse romande · DKDP',
  description:
    'Recevez une analyse complète de votre site web en 48h : performance, SEO, UX, sécurité, accessibilité. Gratuit pour les PME de Suisse romande.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/creation-site-web/audit-site' },
  openGraph: {
    title: 'Audit de site internet gratuit · DKDP Genève',
    description:
      'Analyse complète de votre site web : performance, SEO, UX, mobile, sécurité. Résultats sous 48h.',
    url: 'https://dkdp.ch/agence-digitale/creation-site-web/audit-site',
    type: 'website',
  },
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const violet   = violetToken.color
const violetBg = violetToken.bg
const violetBd = violetToken.border
const chrome   = chromeToken.color
const chromeBg = chromeToken.bg
const chromeBd = chromeToken.border
const orange   = orangeToken.color
const green    = greenToken.color

// ─── Schema JSON-LD ───────────────────────────────────────────────────────────
const schemas = [
  buildService({
    name: 'Audit de site internet gratuit',
    url: '/agence-digitale/creation-site-web/audit-site',
    description:
      'Analyse complète de votre site web : performance, SEO, UX, mobile, sécurité. Rapport sous 48h pour PME de Suisse romande.',
  }),
  buildBreadcrumbList([
    { name: 'Accueil', url: 'https://dkdp.ch' },
    { name: 'Agence digitale', url: 'https://dkdp.ch/agence-digitale' },
    { name: 'Création de site web', url: 'https://dkdp.ch/agence-digitale/creation-site-web' },
    { name: 'Audit de site', url: 'https://dkdp.ch/agence-digitale/creation-site-web/audit-site' },
  ]),
  buildFAQPage([
    {
      question: "L'audit de site internet est-il vraiment gratuit ?",
      answer: "Oui, entièrement et sans conditions. Aucune carte bancaire n'est requise. On réalise cet audit gratuitement pour identifier les freins de votre site. Si vous souhaitez qu'on corrige les problèmes, on vous envoie un devis, mais rien ne vous y oblige.",
    },
    {
      question: "Qu'est-ce qu'un audit de site internet ?",
      answer: "Un audit de site internet est une analyse complète de votre site web sur six dimensions : performance technique, SEO on-page, expérience mobile, sécurité, accessibilité et UX/conversion. Il identifie les problèmes qui freinent votre visibilité sur Google et les classe par priorité d'impact.",
    },
    {
      question: "Combien de temps faut-il pour recevoir les résultats ?",
      answer: "Votre rapport est envoyé sous 48 heures ouvrées maximum. En pratique, la plupart des rapports arrivent dès le lendemain. Vous recevez un PDF détaillé avec les problèmes identifiés, leur niveau de gravité et les recommandations concrètes classées par priorité.",
    },
    {
      question: "Que contient exactement le rapport d'audit de site ?",
      answer: "Le rapport couvre six points : performance et Core Web Vitals (LCP, CLS, INP), SEO technique (balises, sitemap, indexation), compatibilité mobile, sécurité HTTPS, accessibilité WCAG, et UX/conversion. Chaque point est noté, expliqué et accompagné d'une recommandation actionnable.",
    },
    {
      question: "Mon site doit-il être hébergé en Suisse ?",
      answer: "Non. On audite des sites suisses, français et belges sans restriction. Notre expertise est particulièrement forte sur les PME de Suisse romande et les exigences légales suisses (LPD, RGPD).",
    },
    {
      question: "Quelle est la différence entre un audit de site et un audit SEO ?",
      answer: "L'audit de site couvre l'ensemble du site web : performance, sécurité, UX, mobile et SEO on-page. L'audit SEO se concentre exclusivement sur le positionnement organique : mots-clés, backlinks, contenu et présence dans les IA. Les deux sont complémentaires.",
    },
    {
      question: "Qui réalise l'audit ?",
      answer: "Des experts DKDP, pas un outil automatisé. Chaque audit est analysé manuellement par notre équipe. On utilise des outils professionnels (PageSpeed Insights, Screaming Frog, Lighthouse) mais le rapport final est relu et enrichi par un expert qui connaît votre secteur.",
    },
    {
      question: "Que se passe-t-il si je veux aller plus loin après l'audit ?",
      answer: "Si les problèmes identifiés vous motivent à agir, on vous envoie un devis détaillé et chiffré. La décision vous appartient entièrement. Il n'y a aucune pression commerciale, aucun appel non sollicité. Certains clients corrigent eux-mêmes les problèmes grâce au rapport.",
    },
  ]),
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const ANALYSIS_POINTS = [
  {
    title: 'Performance & Vitesse',
    desc: 'Core Web Vitals (LCP, CLS, INP), temps de chargement, score PageSpeed mobile et desktop.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'SEO Technique',
    desc: 'Balises meta, structure des titres, sitemap, robots.txt, données structurées, indexation Google.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Expérience mobile',
    desc: 'Responsive design, touch targets, lisibilité sur smartphone, test sur vrais appareils.',
    accent: chrome,
    accentBg: chromeBg,
    accentBd: chromeBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="6" y="2" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="15.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Sécurité',
    desc: 'HTTPS, certificat SSL, headers de sécurité, formulaires, vulnérabilités courantes.',
    accent: orange,
    accentBg: 'rgba(255,140,0,0.08)',
    accentBd: 'rgba(255,140,0,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L3 5.5V9c0 4.418 3.134 7.95 7 9 3.866-1.05 7-4.582 7-9V5.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Accessibilité',
    desc: 'Contrastes WCAG, balises alt, navigation clavier, ARIA, lisibilité pour tous.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 7h8M10 9v5M8 18l2-4 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'UX & Conversion',
    desc: 'Clarté de la proposition de valeur, CTA, parcours utilisateur, formulaires, confiance.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 4h12v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Vous entrez votre URL',
    desc: '30 secondes, pas de connexion requise, pas de plugin à installer.',
  },
  {
    n: '02',
    title: 'On analyse votre site',
    desc: 'Nos experts examinent les 6 dimensions en détail, manuellement.',
  },
  {
    n: '03',
    title: 'Vous recevez le rapport',
    desc: 'PDF détaillé avec priorités et recommandations concrètes, sous 48h.',
  },
]

const STATS = [
  { value: '500+', label: 'sites analysés en Suisse romande' },
  { value: '94%', label: 'des sites ont au moins 3 problèmes critiques identifiés' },
  { value: '48h', label: 'délai de livraison maximum garanti' },
]

const FAQ_ITEMS = [
  {
    q: "L'audit de site internet est-il vraiment gratuit ?",
    a: "Oui, entièrement et sans conditions. Aucune carte bancaire n'est requise, aucun abonnement ne démarre automatiquement. On réalise cet audit gratuitement pour vous permettre de découvrir notre méthode et identifier concrètement les freins de votre site. Si vous souhaitez qu'on corrige les problèmes, on vous envoie un devis, mais rien ne vous y oblige.",
  },
  {
    q: "Qu'est-ce qu'un audit de site internet ?",
    a: "Un audit de site internet est une analyse complète et structurée de votre site web sur six dimensions : performance technique, SEO on-page, expérience mobile, sécurité, accessibilité et UX/conversion. Il identifie les problèmes qui freinent votre visibilité sur Google, ralentissent vos pages ou font fuir vos visiteurs, et les classe par priorité d'impact.",
  },
  {
    q: "Combien de temps faut-il pour recevoir les résultats ?",
    a: "Votre rapport est envoyé sous 48 heures ouvrées maximum. En pratique, la plupart des rapports arrivent dès le lendemain de la demande. Vous recevez un PDF détaillé avec les problèmes identifiés, leur niveau de gravité et les recommandations concrètes à mettre en place, classées par priorité.",
  },
  {
    q: "Que contient exactement le rapport d'audit de site ?",
    a: "Le rapport couvre six points : performance et Core Web Vitals (LCP, CLS, INP), SEO technique (balises, sitemap, indexation), compatibilité et expérience mobile, sécurité (HTTPS, headers, formulaires), accessibilité WCAG, et UX/conversion (CTAs, parcours utilisateur). Chaque point est noté, expliqué et accompagné d'une recommandation actionnable.",
  },
  {
    q: "Mon site doit-il être hébergé en Suisse ?",
    a: "Non. On audite des sites suisses, français et belges sans restriction géographique. Cela dit, notre expertise est particulièrement forte sur les PME de Suisse romande : on connaît le contexte concurrentiel local, les habitudes des internautes genevois et les exigences légales suisses (LPD, RGPD).",
  },
  {
    q: "Quelle est la différence entre un audit de site et un audit SEO ?",
    a: "L'audit de site couvre l'ensemble de votre site web : performance, sécurité, UX, mobile et SEO on-page. L'audit SEO se concentre exclusivement sur votre positionnement organique : mots-clés, backlinks, structure éditoriale, SEO local et présence dans les IA. Les deux sont complémentaires, on propose aussi un audit SEO gratuit dédié.",
  },
  {
    q: "Qui réalise l'audit ?",
    a: "Des experts DKDP, pas un outil automatisé. Chaque audit est analysé manuellement par notre équipe technique. On utilise des outils professionnels (PageSpeed Insights, Screaming Frog, Lighthouse) mais le rapport final est relu, interprété et enrichi par un expert qui connaît votre secteur.",
  },
  {
    q: "Que se passe-t-il si je veux aller plus loin après l'audit ?",
    a: "Si les problèmes identifiés vous motivent à agir, on vous envoie un devis détaillé et chiffré pour les corriger. La décision vous appartient entièrement. Il n'y a aucune pression commerciale, aucun appel non sollicité. Certains clients corrigent eux-mêmes les problèmes grâce au rapport.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AuditSitePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <SchemaOrg key={i} schema={s} />
      ))}

      {/* ── Hero + Formulaire ─────────────────────────────────────────────── */}
      <InfiniteGrid>
        <section
          aria-labelledby="hero-heading"
          className="relative pt-44 pb-40 px-6"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* ── Gauche : texte ── */}
              <SectionReveal>
                <GradTag className="mb-6">Audit site internet gratuit</GradTag>

                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-[-0.03em] text-white mb-6 leading-[1.08]"
                >
                  Votre site mérite mieux.{' '}
                  <GradText as="span">Découvrez pourquoi en 48h.</GradText>
                </h1>

                <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Entrez l&apos;URL de votre site. On analyse tout : performance, SEO technique,
                  UX, mobile, sécurité. Rapport détaillé envoyé par email sous 48h.
                  Gratuit, sans engagement.
                </p>

                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: violetBg,
                    border: `1px solid ${violetBd}`,
                    color: violet,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: violet }}
                    aria-hidden="true"
                  />
                  Analyse réalisée par des experts · Pas un robot · 100% humain
                </div>
              </SectionReveal>

              {/* ── Droite : formulaire ── */}
              <SectionReveal delay={0.15}>
                <div
                  className="rounded-[24px] p-8 md:p-10"
                  style={{
                    background: 'rgba(18,18,21,0.75)',
                    border: '1px solid rgba(39,39,42,1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 60px rgba(124,58,237,0.10), 0 24px 64px rgba(0,0,0,0.40)',
                  }}
                >
                  <h2
                    id="form-heading"
                    className="text-2xl font-bold text-white mb-2 tracking-[-0.02em]"
                  >
                    Analysez votre site gratuitement
                  </h2>
                  <p className="text-zinc-400 text-sm mb-8">
                    Résultats envoyés par email sous 48h ouvrées.
                  </p>

                  <AuditHeroForm buttonLabel="Recevoir mon audit gratuit" />
                </div>
              </SectionReveal>

            </div>
          </div>
        </section>
      </InfiniteGrid>

      {/* ── Section 3 : Ce qu'on analyse ─────────────────────────────────── */}
      <section aria-labelledby="analysis-heading" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Rapport complet</GradTag>
              <h2
                id="analysis-heading"
                className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]"
              >
                Ce qu&apos;on analyse sur votre site
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANALYSIS_POINTS.map((point, i) => (
              <SectionReveal key={point.title} delay={i * 0.07}>
                <div
                  className="rounded-[16px] border p-6 h-full"
                  style={{
                    background: 'rgba(24,24,27,0.40)',
                    borderColor: 'rgba(39,39,42,1)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
                    style={{
                      background: point.accentBg,
                      border: `1px solid ${point.accentBd}`,
                      color: point.accent,
                    }}
                  >
                    {point.icon}
                  </div>

                  <h3 className="text-white font-bold text-base mb-2">
                    {point.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 : Comment ça marche ────────────────────────────────── */}
      <section aria-labelledby="process-heading" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Simple &amp; rapide</GradTag>
              <h2
                id="process-heading"
                className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]"
              >
                3 étapes, 48 heures
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <SectionReveal key={step.n} delay={i * 0.1}>
                <div
                  className="relative rounded-[16px] border p-8"
                  style={{
                    background: chromeBg,
                    borderColor: chromeBd,
                  }}
                >
                  {/* Large step number */}
                  <p
                    className="text-7xl font-black mb-4 leading-none select-none"
                    style={{ color: violet, opacity: 0.18 }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </p>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connector arrow between steps (not after last) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full"
                      style={{ background: '#18181b', border: `1px solid ${chromeBd}` }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke={chrome} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 : Stats + Témoignage ────────────────────────────────── */}
      <section aria-label="Chiffres et témoignage" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Stats */}
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-[16px] border p-8 text-center"
                  style={{ background: violetBg, borderColor: violetBd }}
                >
                  <p
                    className="text-4xl font-black mb-2 tracking-[-0.03em]"
                    style={{ color: violet }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-zinc-400 text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Témoignage */}
          <SectionReveal delay={0.1}>
            <figure
              className="rounded-[20px] border p-8 md:p-10 max-w-2xl mx-auto text-center"
              style={{
                background: chromeBg,
                borderColor: chromeBd,
              }}
            >
              {/* Quote mark */}
              <span
                className="block text-5xl font-serif leading-none mb-4 select-none"
                style={{ color: violet, opacity: 0.5 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="text-white text-base md:text-lg leading-relaxed font-medium mb-6">
                L&apos;audit DKDP a mis le doigt sur 5 problèmes qu&apos;on avait depuis des années sans le savoir. En 3 semaines on a tout corrigé.
              </blockquote>
              <figcaption className="text-zinc-500 text-sm">
                Responsable marketing, PME genevoise
              </figcaption>
            </figure>
          </SectionReveal>
        </div>
      </section>

      {/* ── Section 6 : FAQ ───────────────────────────────────────────────── */}
      <section aria-labelledby="faq-heading" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <GradTag className="mb-4">Questions fréquentes</GradTag>
              <h2
                id="faq-heading"
                className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] mb-4"
              >
                Tout ce que vous voulez savoir
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl mx-auto">
                Tout savoir sur l&apos;audit de site internet gratuit en Suisse romande.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.04}>
                <details
                  className="group rounded-[14px] border overflow-hidden"
                  style={{ background: chromeBg, borderColor: chromeBd }}
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none [list-style:none] [&::marker]:hidden [&::-webkit-details-marker]:hidden hover:bg-white/[0.03] transition-colors duration-150">
                    <h3 className="text-white font-semibold text-[15px] leading-snug text-left">
                      {item.q}
                    </h3>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="flex-shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div
                    className="px-6 pb-6 border-t"
                    style={{ borderColor: chromeBd }}
                  >
                    <p className="text-zinc-400 text-sm leading-relaxed pt-4">
                      {item.a}
                    </p>
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAFinal ─────────────────────────────────────────────────────── */}
      <CTAFinal />
    </>
  )
}
