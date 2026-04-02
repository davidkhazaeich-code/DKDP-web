'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'

type AccentKey = 'violet' | 'chrome' | 'orange' | 'green'

const ACCENT_MAP: Record<AccentKey, { color: string; bg: string; bd: string }> = {
  violet: { color: '#A78BFA', bg: 'rgba(124,58,237,0.10)', bd: 'rgba(124,58,237,0.20)' },
  chrome: { color: '#D4D4D8', bg: 'rgba(212,212,216,0.06)', bd: 'rgba(212,212,216,0.14)' },
  orange: { color: '#FF8C00', bg: 'rgba(255,107,0,0.08)', bd: 'rgba(255,107,0,0.18)' },
  green:  { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', bd: 'rgba(74,222,128,0.20)' },
}

function SvgSearch() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg> }
function SvgDoc()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> }
function SvgPen()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> }
function SvgCode()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> }
function SvgCheck()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> }
function SvgRocket() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg> }

function StepIcon({ icon, c }: { icon: string; c: string }) {
  const icons: Record<string, JSX.Element> = { search: <SvgSearch />, doc: <SvgDoc />, pen: <SvgPen />, code: <SvgCode />, check: <SvgCheck />, rocket: <SvgRocket /> }
  return <span style={{ color: c }}>{icons[icon] ?? null}</span>
}

interface Step {
  num: number
  title: string
  week: string
  duration: string
  accent: AccentKey
  desc: string
  deliverables: string
  icon: string
}

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })

  // Glow that trails the progress head
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <>
      {/* ── Desktop ── */}
      <div ref={containerRef} className="hidden lg:block relative">

        {/* Track line (faint background) */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Animated progress line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden rounded-full" aria-hidden="true">
          <motion.div
            className="w-full origin-top"
            style={{
              scaleY: scrollYProgress,
              height: '100%',
              background: 'linear-gradient(to bottom, #A78BFA 0%, #ffffff 50%, #FF8C00 100%)',
              boxShadow: '0 0 8px 2px rgba(167,139,250,0.5)',
            }}
          />
        </div>

        {/* Glow dot at the progress head */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full pointer-events-none z-20"
          style={{
            top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            opacity: glowOpacity,
            background: '#A78BFA',
            boxShadow: '0 0 12px 4px rgba(167,139,250,0.7)',
            marginTop: '-6px',
          }}
        />

        <div className="flex flex-col gap-12">
          {steps.map((step) => {
            const acc = ACCENT_MAP[step.accent]
            const isLeft = step.num % 2 !== 0
            return (
              <SectionReveal key={step.num} delay={(step.num - 1) * 0.07}>
                <div className="relative grid grid-cols-2 gap-0 items-center">
                  {/* Step number circle */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full z-10 font-black text-base"
                    style={{
                      background: '#0e0e0e',
                      border: `2px solid ${acc.color}`,
                      color: acc.color,
                      boxShadow: `0 0 0 4px #0e0e0e, 0 0 16px ${acc.bg}`,
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Left column */}
                  <div className="pr-16">
                    {isLeft ? (
                      <div className="rounded-[16px] p-6 border bg-bg-card/60 transition-all duration-300 hover:-translate-y-0.5" style={{ borderColor: acc.bd }}>
                        <div className="flex items-start justify-end gap-3 mb-4">
                          <div className="flex-1 text-right">
                            <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-semibold text-text-muted" style={{ background: 'rgba(39,39,42,1)' }}>{step.duration}</span>
                            <h3 className="text-white font-bold text-lg">{step.title}</h3>
                            <p className="text-xs font-semibold mt-0.5" style={{ color: acc.color }}>{step.week}</p>
                          </div>
                          <div className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0" style={{ background: acc.bg, border: `1px solid ${acc.bd}` }}>
                            <StepIcon icon={step.icon} c={acc.color} />
                          </div>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed mb-4 text-right">{step.desc}</p>
                        <div className="rounded-[10px] px-3 py-2 text-right" style={{ background: acc.bg, border: `1px solid ${acc.bd}` }}>
                          <p className="text-xs font-semibold mb-0.5" style={{ color: acc.color }}>Livrables</p>
                          <p className="text-text-muted text-xs">{step.deliverables}</p>
                        </div>
                      </div>
                    ) : <div />}
                  </div>

                  {/* Right column */}
                  <div className="pl-16">
                    {!isLeft ? (
                      <div className="rounded-[16px] p-6 border bg-bg-card/60 transition-all duration-300 hover:-translate-y-0.5" style={{ borderColor: acc.bd }}>
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0" style={{ background: acc.bg, border: `1px solid ${acc.bd}` }}>
                            <StepIcon icon={step.icon} c={acc.color} />
                          </div>
                          <div>
                            <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-semibold text-text-muted" style={{ background: 'rgba(39,39,42,1)' }}>{step.duration}</span>
                            <h3 className="text-white font-bold text-lg">{step.title}</h3>
                            <p className="text-xs font-semibold mt-0.5" style={{ color: acc.color }}>{step.week}</p>
                          </div>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed mb-4">{step.desc}</p>
                        <div className="rounded-[10px] px-3 py-2" style={{ background: acc.bg, border: `1px solid ${acc.bd}` }}>
                          <p className="text-xs font-semibold mb-0.5" style={{ color: acc.color }}>Livrables</p>
                          <p className="text-text-muted text-xs">{step.deliverables}</p>
                        </div>
                      </div>
                    ) : <div />}
                  </div>
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-5">
        {steps.map((step) => {
          const acc = ACCENT_MAP[step.accent]
          return (
            <SectionReveal key={step.num} delay={(step.num - 1) * 0.07}>
              <div className="rounded-[16px] p-5 border bg-bg-card/60 pl-6" style={{ borderColor: acc.bd, borderLeft: `3px solid ${acc.color}` }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full font-black text-sm flex-shrink-0" style={{ background: acc.bg, border: `1px solid ${acc.color}`, color: acc.color }}>
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-bold text-base">{step.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold text-text-muted" style={{ background: 'rgba(39,39,42,1)' }}>{step.duration}</span>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: acc.color }}>{step.week}</p>
                  </div>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-3">{step.desc}</p>
                <div className="rounded-[10px] px-3 py-2" style={{ background: acc.bg, border: `1px solid ${acc.bd}` }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: acc.color }}>Livrables</p>
                  <p className="text-text-muted text-xs">{step.deliverables}</p>
                </div>
              </div>
            </SectionReveal>
          )
        })}
      </div>
    </>
  )
}
