import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { orange } from '@/lib/tokens'

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const PRINCIPALS = [
  {
    name: 'David K.',
    role: 'DKDP founder, lead AI trainer',
    bio: '10 years training Swiss teams on digital and AI tools. 700+ clients supported, from SMEs to large organisations.',
    image: '/images/team/david-portrait.png',
    skills: ['ChatGPT and Claude', 'AI automation', 'Digital strategy'],
    linkedin: 'https://www.linkedin.com/in/davidkhazaei/',
    stat: '700+ clients',
  },
  {
    name: 'Romane D.',
    role: 'AI, SEO and UX expert, trainer',
    bio: 'Specialist in applied AI and UX design. A natural teaching style that makes every concept immediately applicable day to day.',
    image: '/images/team/romane-portrait.png',
    skills: ['Artificial intelligence', 'SEO and GEO', 'Creative AI tools'],
    linkedin: 'https://www.linkedin.com/in/romane-degeorges/',
    stat: 'AI and SEO',
  },
  {
    name: 'Claude',
    role: 'Anthropic AI assistant, co-trainer',
    bio: 'The most advanced AI on the market, used live during every session. Participants learn to master Claude in their real business context.',
    image: '/images/team/claude-formation.png',
    skills: ['Writing and summarising', 'Document analysis', 'Code and automation'],
    linkedin: null,
    stat: 'Anthropic',
  },
]

const SUPPORT = {
  name: 'Ali K.',
  role: 'Development and IT trainer',
  bio: 'Passionate developer and trainer. A structured approach so each participant leaves with solid, directly applicable foundations.',
  image: '/images/team/ali-khazaei.png',
  skills: ['Web development', 'Python', 'Advanced office tools'],
}

const { color, border } = orange

export function FormateursSection() {
  return (
    <section id="formateurs" className="scroll-mt-[124px] py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Header ── */}
        <SectionReveal>
          <div className="text-center mb-14">
            <GradTag className="mb-4">Your trainers</GradTag>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Trained by practitioners, not theorists.
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Our trainers use the tools they teach every single day.
              More than 500 professionals trained in French-speaking Switzerland since 2015.
            </p>
          </div>
        </SectionReveal>

        {/* ── David + Romane + Claude, large portrait cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {PRINCIPALS.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.12}>
              <div
                className="group relative rounded-[20px] border overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--surface-default)',
                  borderColor: 'var(--surface-border)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{ boxShadow: '0 0 50px rgba(255,107,0,0.07), inset 0 1px 0 rgba(255,107,0,0.08)' }}
                />

                {/* ── Portrait photo ── */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#181818]">
                  <Image
                    src={t.image}
                    alt={`${t.name}, DKDP trainer Geneva`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Bottom gradient to tie photo and content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/10 to-transparent" />

                  {/* Floating stat badge */}
                  <div
                    className="absolute top-4 right-4 z-20 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(10,10,10,0.65)',
                      color,
                      border: `1px solid rgba(255,107,0,0.35)`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {t.stat}
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="relative z-20 p-5 md:p-6">
                  {/* Name + LinkedIn */}
                  <div className="flex items-center justify-between gap-3 mb-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-text font-bold text-[17px] leading-tight">{t.name}</h3>
                      <BadgeCheck size={15} style={{ color }} className="flex-shrink-0" />
                    </div>
                    {t.linkedin && (
                      <Link
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-[#0A66C2] transition-colors flex-shrink-0"
                        aria-label={`${t.name} on LinkedIn`}
                      >
                        <LinkedinIcon size={15} />
                      </Link>
                    )}
                  </div>

                  {/* Role */}
                  <p className="text-xs font-medium mb-3" style={{ color }}>{t.role}</p>

                  {/* Bio */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{t.bio}</p>

                  {/* Skills */}
                  <div
                    className="flex flex-wrap gap-2 pt-4"
                    style={{ borderTop: '1px solid var(--surface-border)' }}
                  >
                    {t.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md"
                        style={{
                          background: 'var(--surface-default)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--surface-border)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* ── Ali, secondary horizontal card ── */}
        <SectionReveal delay={0.22}>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-[16px] border"
            style={{
              background: 'var(--surface-default)',
              borderColor: 'var(--surface-border)',
            }}
          >
            {/* Circular avatar */}
            <div
              className="relative w-[68px] h-[68px] rounded-full overflow-hidden flex-shrink-0"
              style={{ background: '#ddd8d0', border: `2px solid ${border}` }}
            >
              <Image
                src={SUPPORT.image}
                alt={`${SUPPORT.name}, DKDP trainer`}
                fill
                className="object-cover object-top"
                sizes="68px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-text font-bold text-sm">{SUPPORT.name}</p>
                <BadgeCheck size={13} style={{ color }} />
              </div>
              <p className="text-xs mb-2" style={{ color }}>{SUPPORT.role}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{SUPPORT.bio}</p>
            </div>

            {/* Skills in column on sm+ */}
            <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-end shrink-0">
              {SUPPORT.skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap"
                  style={{
                    background: 'var(--surface-default)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--surface-border)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
