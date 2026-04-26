'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GradText } from '@/components/ui/GradText'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'

const MARQUEE_ITEMS = [
  'Sites web sur mesure',
  'Intelligence Artificielle',
  'Formation entreprise',
  'SEO local Geneve',
  'Refonte UX',
  'Apps metier',
]

function MarqueeRow() {
  return (
    <div className="flex items-center gap-12 px-6 whitespace-nowrap">
      {MARQUEE_ITEMS.flatMap((item, i) => [
        <span
          key={`${i}-text`}
          className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-muted"
        >
          {item}
        </span>,
        <span key={`${i}-dot`} className="text-violet-400/60">
          ✦
        </span>,
      ])}
    </div>
  )
}

export function CinematicCTA() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  })

  const giantTextY = useTransform(scrollYProgress, [0, 1], ['10vh', '-5vh'])
  const giantTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0.6]
  )

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden bg-[#09090B] py-24 md:py-32 lg:py-40"
      aria-labelledby="cinematic-cta-heading"
    >
      {/* Aurora breathing glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(167,139,250,0.18) 0%, rgba(255,140,0,0.08) 40%, transparent 70%)',
          animation: 'cinematicBreath 8s ease-in-out infinite alternate',
        }}
      />

      {/* Subtle grid background, masked top and bottom */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      {/* Diagonal marquee */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-12 -rotate-2 scale-110 overflow-hidden border-y border-white/5 bg-[#09090B]/60 py-3 backdrop-blur-md"
      >
        <div
          className="flex w-max"
          style={{ animation: 'cinematicMarquee 40s linear infinite' }}
        >
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      {/* Giant background text with scroll-driven parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: giantTextY, opacity: giantTextOpacity }}
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap"
      >
        <span
          className="block text-[26vw] font-black leading-[0.75] tracking-[-0.05em]"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            backgroundImage:
              'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 60%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          PROJET
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6 text-center mt-16 md:mt-24">
        <h2
          id="cinematic-cta-heading"
          className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Parlons de{' '}
          <GradText as="span">votre projet</GradText>
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-text-secondary md:text-xl">
          15 minutes, c&apos;est gratuit, et on vous dit honnêtement si on peut vous aider, et comment.
        </p>

        <div className="mt-10">
          <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
            Reservez votre appel gratuit<span aria-hidden="true"> →</span>
          </LiquidMetalButton>
        </div>

        {/* Glass pills for phone and email */}
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row">
          <a
            href="tel:+41799407969"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm text-text-secondary backdrop-blur-md transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 2.5C2 2.5 3 1 4.5 1c.5 0 1 .5 1.5 1.5S7 4 7 4s-.5.5-1 1c.5 1 1.5 2 2.5 2.5.5-.5 1-1 1-1s1 .5 2 1 1.5 1 1.5 1.5C13 10.5 12 12 12 12c-4 1-9.5-4.5-10-9.5z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            +41 79 940 79 69
          </a>
          <a
            href="mailto:dk@dkdp.ch"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm text-text-secondary backdrop-blur-md transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="2.5"
                width="12"
                height="9"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M1 4l6 4 6-4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            dk@dkdp.ch
          </a>
        </div>

        <p className="mt-8 text-sm text-text-muted">
          Sans engagement · Reponse sous 24h · Eaux-Vives, Geneve ou en visio
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes cinematicBreath {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1;   }
        }
        @keyframes cinematicMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-labelledby="cinematic-cta-heading"] .cinematic-aurora {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
