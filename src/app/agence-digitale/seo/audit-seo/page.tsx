import type { Metadata } from 'next'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import dynamic from 'next/dynamic'
import { HeroBg } from '@/components/ui/HeroBg'
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { violet as violetToken, chrome as chromeToken, orange as orangeToken, green as greenToken } from '@/lib/tokens'
import { AuditHeroForm } from '@/components/sections/AuditHeroForm'

export const metadata: Metadata = {
  title: 'Audit SEO gratuit · DKDP Genève',
  description:
    'Recevez une analyse complète de votre SEO en 48h : mots-clés, positionnement, backlinks, erreurs techniques, contenu. Gratuit pour les PME de Suisse romande.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/seo/audit-seo' },
  openGraph: {
    title: 'Audit SEO gratuit · DKDP Genève',
    description:
      'Analyse complète de votre SEO : mots-clés, positionnement, backlinks, SEO technique, contenu. Résultats sous 48h.',
    url: 'https://dkdp.ch/agence-digitale/seo/audit-seo',
    type: 'website',
  },
}

// Design tokens
const violet   = violetToken.color
const violetBg = violetToken.bg
const violetBd = violetToken.border
const chrome   = chromeToken.color
const chromeBg = chromeToken.bg
const chromeBd = chromeToken.border
const orange   = orangeToken.color
const green    = greenToken.color

// Schema JSON-LD
const schemas = [
  buildService({
    name: 'Audit SEO gratuit',
    url: '/agence-digitale/seo/audit-seo',
    description:
      'Analyse complète de votre positionnement SEO : mots-clés, backlinks, SEO technique, contenu. Rapport sous 48h pour PME de Suisse romande.',
  }),
  buildBreadcrumbList([
    { name: 'Accueil', url: 'https://dkdp.ch' },
    { name: 'Agence digitale', url: 'https://dkdp.ch/agence-digitale' },
    { name: 'Référencement SEO', url: 'https://dkdp.ch/agence-digitale/seo' },
    { name: 'Audit SEO', url: 'https://dkdp.ch/agence-digitale/seo/audit-seo' },
  ]),
  buildFAQPage([
    {
      question: "L'audit SEO est-il vraiment gratuit ?",
      answer: "Oui, entièrement et sans conditions. Aucune carte bancaire requise. On offre cet audit pour vous permettre de découvrir notre expertise SEO et d'identifier pourquoi votre site n'est pas visible sur Google. Si vous souhaitez qu'on travaille sur votre référencement, on vous envoie un devis, rien ne vous y oblige.",
    },
    {
      question: "Qu'est-ce qu'un audit SEO et pourquoi en avoir un ?",
      answer: "Un audit SEO est une analyse complète de votre positionnement dans les moteurs de recherche. Il couvre vos mots-clés cibles, votre profil de backlinks, les erreurs techniques qui bloquent votre indexation, la qualité de votre contenu et votre visibilité locale. Sans audit, vous ne savez pas pourquoi vous n'apparaissez pas sur Google ni comment y remédier efficacement.",
    },
    {
      question: "Pourquoi mon site n'apparaît pas sur Google ?",
      answer: "Les causes les plus fréquentes sont : un SEO technique déficient (pages non indexées, balises mal configurées, Core Web Vitals insuffisants), un manque de contenu optimisé sur les bons mots-clés, une faible autorité de domaine due à peu de backlinks de qualité, ou une présence Google My Business absente. Notre audit identifie précisément laquelle s'applique à votre cas.",
    },
    {
      question: "Combien de temps faut-il pour voir des résultats SEO après l'audit ?",
      answer: "L'audit vous est remis sous 48h ouvrées. Concernant les résultats après mise en oeuvre des recommandations : les corrections techniques sont visibles sur Google en 2 à 6 semaines. Les améliorations de positionnement sur des mots-clés locaux genevois apparaissent généralement entre 6 et 12 semaines. La construction de l'autorité via les backlinks est un travail de fond sur 3 à 6 mois.",
    },
    {
      question: "Que contient le rapport d'audit SEO ?",
      answer: "Le rapport couvre six dimensions : mots-clés cibles et positionnements actuels, SEO technique (crawl, indexation, données structurées), profil de backlinks et opportunités de netlinking, qualité et structuré du contenu, SEO local et Google My Business, et présence GEO dans les IA (Google AI Overviews, ChatGPT, Perplexity). Chaque point est noté et accompagné de recommandations priorisées.",
    },
    {
      question: "Quelle est la différence entre l'audit SEO et l'audit de site ?",
      answer: "L'audit SEO se concentre exclusivement sur votre référencement organique : positionnement, mots-clés, backlinks, contenu et visibilité IA. L'audit de site couvre plus largement votre site web : performance, sécurité, accessibilité, UX et conversion en plus du SEO on-page. Les deux sont complémentaires, on propose aussi un audit de site gratuit dédié.",
    },
    {
      question: "Mon site doit-il être basé en Suisse pour bénéficier de l'audit ?",
      answer: "Non. On audite des sites suisses, français et belges. Notre spécialité reste le contexte SEO local de Suisse romande : concurrence sur les requêtes genevoises, stratégie multilingue (FR/DE/IT), comportements de recherche locaux et visibilité Google Maps pour les commerces et prestataires de service.",
    },
    {
      question: "Que se passe-t-il après l'audit SEO ?",
      answer: "Rien, si vous ne souhaitez pas continuer. Vous recevez votre rapport, il vous appartient entièrement. Si vous voulez qu'on travaille sur votre SEO, on vous envoie un plan d'action chiffré et priorisé. Nos clients SEO observent en moyenne +240% de trafic organique à 6 mois. Mais la décision et le timing restent entièrement les vôtrès.",
    },
  ]),
]

// Data
const ANALYSIS_POINTS = [
  {
    title: 'Mots-clés & positionnement',
    desc: 'Requêtes cibles, positions actuelles, opportunités locales Suisse romande, analyse concurrentielle sur vos marchés.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.5 8.5h4M8.5 6.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'SEO technique',
    desc: 'Crawl, indexation, Core Web Vitals, sitemap, robots.txt, données structurées et erreurs bloquantes.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Backlinks & autorité',
    desc: 'Profil de liens entrants, Domain Authority, liens toxiques à désavouer, opportunités de netlinking.',
    accent: orange,
    accentBg: 'rgba(255,140,0,0.08)',
    accentBd: 'rgba(255,140,0,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8 12l-3 3a2.828 2.828 0 104 4l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8l3-3a2.828 2.828 0 10-4-4L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 11.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Contenu & structuré',
    desc: "Balises H, densité de mots-clés, duplicate content, longueur des pages et opportunités d'optimisation éditoriale.",
    accent: chrome,
    accentBg: chromeBg,
    accentBd: chromeBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5h12M4 8h8M4 11h10M4 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'SEO local & GEO',
    desc: 'Google My Business, cohérence NAP, citations locales, visibilité Genève et Suisse romande.',
    accent: violet,
    accentBg: violetBg,
    accentBd: violetBd,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="10" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'GEO & IA Search',
    desc: 'Présence dans Google AI Overviews, ChatGPT, Perplexity. Optimisation des passages pour la recherche générative.',
    accent: green,
    accentBg: 'rgba(74,222,128,0.08)',
    accentBd: 'rgba(74,222,128,0.20)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Vous entrez votre URL',
    desc: '30 secondes, pas de connexion requise, pas d&apos;outil à installer.',
  },
  {
    n: '02',
    title: 'On analyse votre SEO',
    desc: 'Nos experts SEO examinent les 6 dimensions en détail, avec des outils pro et un regard humain.',
  },
  {
    n: '03',
    title: 'Vous recevez le rapport',
    desc: 'PDF détaillé avec priorités et recommandations concrètes pour améliorer votre positionnement, sous 48h.',
  },
]

const STATS = [
  { value: '300+', label: 'sites audités en Suisse romande' },
  { value: '87%', label: 'des sites ont un problème technique bloquant' },
  { value: '48h', label: 'délai de livraison maximum garanti' },
]

const FAQ_ITEMS = [
  {
    q: "L'audit SEO est-il vraiment gratuit ?",
    a: "Oui, entièrement et sans conditions. Aucune carte bancaire requise, aucun abonnement ne démarre automatiquement. On offre cet audit pour vous permettre de découvrir notre expertise SEO et d'identifier concrètement pourquoi votre site n'est pas visible sur Google. Si vous souhaitez qu'on travaille sur votre référencement, on vous envoie un devis, rien ne vous y oblige.",
  },
  {
    q: "Qu'est-ce qu'un audit SEO et pourquoi en avoir un ?",
    a: "Un audit SEO est une analyse complète de votre positionnement dans les moteurs de recherche. Il couvre vos mots-clés cibles, votre profil de backlinks, les erreurs techniques qui bloquent votre indexation, la qualité de votre contenu et votre visibilité locale. Sans audit, vous ne savez pas pourquoi vous n'apparaissez pas sur Google ni comment y remédier efficacement.",
  },
  {
    q: "Pourquoi mon site n'apparaît pas sur Google ?",
    a: "Les causes les plus fréquentes sont : un SEO technique déficient (pages non indexées, balises mal configurées, Core Web Vitals insuffisants), un manque de contenu optimisé sur les bons mots-clés, une faible autorité de domaine due à peu de backlinks de qualité, ou une présence Google My Business absente. Notre audit identifie précisément laquelle s'applique à votre cas.",
  },
  {
    q: "Combien de temps faut-il pour voir des résultats SEO après l'audit ?",
    a: "L'audit vous est remis sous 48h ouvrées. Concernant les résultats après mise en oeuvre des recommandations : les corrections techniques sont visibles sur Google en 2 à 6 semaines. Les améliorations de positionnement sur des mots-clés locaux genevois apparaissent entre 6 et 12 semaines. La construction de l'autorité via les backlinks est un travail de fond sur 3 à 6 mois.",
  },
  {
    q: "Que contient le rapport d'audit SEO ?",
    a: "Le rapport couvre six dimensions : mots-clés cibles et positionnements actuels, SEO technique (crawl, indexation, données structurées), profil de backlinks et opportunités de netlinking, qualité et structuré du contenu, SEO local et Google My Business, et présence GEO dans les IA (Google AI Overviews, ChatGPT, Perplexity). Chaque point est noté et accompagné de recommandations priorisées.",
  },
  {
    q: "Quelle est la différence entre l'audit SEO et l'audit de site ?",
    a: "L'audit SEO se concentre exclusivement sur votre référencement organique : positionnement, mots-clés, backlinks, contenu et visibilité IA. L'audit de site couvre plus largement votre site web : performance, sécurité, accessibilité, UX et conversion en plus du SEO on-page. Les deux sont complémentaires, on propose aussi un audit de site gratuit dédié.",
  },
  {
    q: "Mon site doit-il être basé en Suisse pour bénéficier de l'audit ?",
    a: "Non. On audite des sites suisses, français et belges. Notre spécialité reste le contexte SEO local de Suisse romande : concurrence sur les requêtes genevoises, stratégie multilingue (FR/DE/IT), comportements de recherche locaux et visibilité Google Maps pour les commerces et prestataires de service.",
  },
  {
    q: "Que se passe-t-il après l'audit SEO ?",
    a: "Rien, si vous ne souhaitez pas continuer. Vous recevez votre rapport, il vous appartient entièrement. Si vous voulez qu'on travaille sur votre SEO, on vous envoie un plan d'action chiffré et priorisé. Nos clients SEO observent en moyenne +240% de trafic organique à 6 mois. Mais la décision et le timing restent entièrement les vôtrès.",
  },
]

// Page
export default function AuditSEOPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <SchemaOrg key={i} schema={s} />
      ))}

      {/* Section 1 : Hero + Formulaire */}
      <HeroBg>
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
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: text */}
              <SectionReveal>
                <GradTag className="mb-6">Audit SEO gratuit</GradTag>

                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-[-0.03em] text-white mb-6 leading-[1.08]"
                >
                  Votre SEO freine votre croissance.{' '}
                  <GradText as="span">Découvrez pourquoi.</GradText>
                </h1>

                <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Entrez l&apos;URL de votre site. On analyse votre positionnement SEO, vos mots-clés, vos backlinks, les erreurs techniques et votre contenu. Rapport détaillé envoyé par email sous 48h. Gratuit, sans engagement.
                </p>

                {/* Trust badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: violetBg,
                    border: `1px solid ${violetBd}`,
                    color: violet,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: violet }}
                    aria-hidden="true"
                  />
                  Analyse réalisée par des experts SEO · Pas un robot · 100% humain
                </div>
              </SectionReveal>

              {/* Right: form card */}
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
                    className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-[-0.02em]"
                  >
                    Analysez votre SEO gratuitement
                  </h2>
                  <p className="text-zinc-400 text-sm mb-8">
                    Résultats envoyés par email sous 48h ouvrées.
                  </p>

                  <AuditHeroForm buttonLabel="Recevoir mon audit SEO gratuit" />
                </div>
              </SectionReveal>

            </div>
          </div>
        </section>
      </HeroBg>

      {/* Section 3 : Ce qu'on analyse */}
      <section aria-labelledby="analysis-heading" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="text-center mb-14">
              <GradTag className="mb-4">Rapport complet</GradTag>
              <h2
                id="analysis-heading"
                className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]"
              >
                Ce qu&apos;on analyse sur votre SEO
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

      {/* Section 4 : Comment ca marché */}
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
                  <p
                    className="text-zinc-400 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.desc }}
                  />

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

      {/* Section 5 : Stats + Temoignage */}
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

          {/* Temoignage */}
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
                L&apos;audit SEO DKDP a révélé qu&apos;on était absent sur nos 8 mots-clés principaux. 4 mois plus tard, on est en première page sur 6.
              </blockquote>
              <figcaption className="text-zinc-500 text-sm">
                Directeur commercial, PME genevoise
              </figcaption>
            </figure>
          </SectionReveal>
        </div>
      </section>

      {/* Section 6 : FAQ */}
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
                Tout savoir sur l&apos;audit SEO gratuit pour les PME de Suisse romande.
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

      {/* CTAFinal */}
      <CTAFinal />
    </>
  )
}
