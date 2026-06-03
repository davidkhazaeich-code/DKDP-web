import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About DKDP · Senior Digital Team in Geneva | DKDP',
  description:
    'DKDP is a senior digital team based in Eaux-Vives, Geneva. Web, AI, training. 700+ Swiss clients, 5 years of practice, no middlemen. Meet the people who ship.',
  alternates: {
    canonical: 'https://dkdp.ch/en/about',
    languages: {
      'fr-CH': 'https://dkdp.ch/a-propos',
      en: 'https://dkdp.ch/en/about',
      'x-default': 'https://dkdp.ch/a-propos',
    },
  },
  openGraph: {
    title: 'About DKDP · Senior Digital Team in Geneva',
    description: 'A small senior team that ships in plain sight. Web, AI, training.',
    url: 'https://dkdp.ch/en/about',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
  },
}

export default function EnAboutPage() {
  return (
    <>
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'About', url: '/en/about' },
        ])}
      />

      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <GradTag>About</GradTag>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.08] mt-4 mb-5">
            A small senior team <br className="hidden sm:inline" />
            <GradText as="span">that ships in plain sight.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            DKDP is a Geneva-based digital studio. We design websites, deploy AI and train teams,
            all under one roof, by the same senior people you talked to in the first meeting.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-y border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <GradTag>Founder</GradTag>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3 mb-4">David Khazaei</h2>
            <p className="text-text-secondary text-base leading-relaxed mb-3">
              Founder of DKDP. Background in computer science and product design. Over 700 SMB
              projects shipped across French-speaking Switzerland since 2020, with a strong
              focus on web craft, AI deployments and corporate training.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              I work hands-on with every client. No account manager between you and me, no
              relay race, no offshore subcontracting.
            </p>
          </div>
          <div>
            <GradTag>Partner</GradTag>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3 mb-4">Romane</h2>
            <p className="text-text-secondary text-base leading-relaxed mb-3">
              Lead trainer on corporate AI rollouts. Four years of experience training executive
              teams and operations staff at Lilly Switzerland, Geneve Sports, BURRI, IRU and others.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              Romane co-builds every training agenda with the client, runs the sessions on-site or remote,
              and stays reachable by email for two weeks of follow-up Q&amp;A.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <GradTag>How we work</GradTag>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3 mb-3">
              Principles that shape every project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Fixed scope, fixed price', text: 'The number you sign is the number you pay. No surprise change requests.' },
              { title: 'Weekly demos, not slides', text: 'Every Friday you see what shipped. No theatre, no hidden progress.' },
              { title: 'You own everything', text: 'Code, designs, prompts, credentials. We do not lock you in.' },
              { title: 'Reachable post-launch', text: 'Need a small tweak in 8 months? Send a message. Still on the other end.' },
            ].map((p) => (
              <div key={p.title} className="rounded-xl p-5 border border-border" style={{ background: 'var(--bg-card)' }}>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full mb-3" style={{ background: 'rgba(167,139,250,0.15)' }}>
                  <Check size={14} style={{ color: '#A78BFA' }} />
                </span>
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-border text-center" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Let&apos;s meet</h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">
            30-minute call, no pitch deck. Tell us what you are trying to ship and we will tell you what it takes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LiquidMetalButton href="/en/contact" size="lg">Book a call <ArrowRight size={16} /></LiquidMetalButton>
            <Link href="/en/pricing" className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-text-secondary hover:text-text">
              View pricing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
