import { MessageSquare, FileText, BrainCircuit, Zap, Shield, BarChart2 } from 'lucide-react'
import { orange } from '@/lib/tokens'

const color = orange.color
const bg = orange.bg
const border = orange.border

const SKILLS = [
  {
    Icon: MessageSquare,
    title: 'Advanced prompting',
    desc: 'Chain-of-thought, few-shot, role-playing and meta-prompting techniques. Your instructions become precise, your results reliable.',
    span: 'md:col-span-2',
    visual: (
      <div className="mt-4 space-y-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--orange-text)' }}>{'>'}</span>
          <span className="text-text-secondary">Act as a senior HR expert. Analyse this resume...</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--green-text)' }}>{'✓'}</span>
          <span className="text-text">Structured summary in 30s instead of 15min</span>
        </div>
      </div>
    ),
  },
  {
    Icon: FileText,
    title: 'Long documents',
    desc: 'Analysis of 50-200 page reports, contracts, audits. Insight extraction in seconds.',
    span: '',
    visual: (
      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          {[80, 120, 200].map((p) => (
            <div
              key={p}
              className="w-8 h-10 rounded border flex items-center justify-center text-[8px] font-bold"
              style={{ background: 'rgba(255,107,0,0.08)', borderColor: 'rgba(255,107,0,0.2)', color: '#FF8C00' }}
            >
              {p}p
            </div>
          ))}
        </div>
        <span className="text-[10px] text-text-muted">Analysed in seconds</span>
      </div>
    ),
  },
  {
    Icon: BrainCircuit,
    title: 'ChatGPT vs Claude vs Copilot',
    desc: 'Knowing which tool to use for which task. Strengths, limits and optimal use cases of each platform.',
    span: '',
    visual: (
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { name: 'ChatGPT', pct: 85 },
          { name: 'Claude', pct: 92 },
          { name: 'Copilot', pct: 78 },
        ].map((t) => (
          <div key={t.name} className="text-center">
            <div className="h-12 rounded-md overflow-hidden flex flex-col justify-end" style={{ background: 'var(--surface-default)' }}>
              <div
                className="rounded-t-sm transition-all"
                style={{ height: `${t.pct}%`, background: `linear-gradient(to top, rgba(255,107,0,0.4), rgba(255,107,0,0.15))` }}
              />
            </div>
            <span className="text-[9px] text-text-muted mt-1 block">{t.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Zap,
    title: 'Daily automations',
    desc: 'Emails, meeting notes, summaries, translations, client replies. Repetitive tasks go from 15 minutes to 30 seconds.',
    span: '',
    visual: (
      <div className="mt-4 flex flex-col gap-1.5">
        {[
          { task: 'Complex client email', before: '15 min', after: '45s' },
          { task: 'Meeting notes', before: '25 min', after: '2 min' },
          { task: 'Report summary', before: '45 min', after: '1 min' },
        ].map((r) => (
          <div key={r.task} className="flex items-center justify-between text-[10px]">
            <span className="text-text-secondary">{r.task}</span>
            <div className="flex items-center gap-2">
              <span className="text-text-muted line-through">{r.before}</span>
              <span className="font-bold" style={{ color: '#FF8C00' }}>{r.after}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Shield,
    title: 'Privacy and best practices',
    desc: 'What you can send, what you must never share. Secure configuration of team workspaces.',
    span: '',
    visual: (
      <div className="mt-4 flex gap-2">
        <div className="flex-1 rounded-lg p-2 text-center" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)' }}>
          <span className="text-[10px] font-medium" style={{ color: 'var(--green-text)' }}>Safe to send</span>
        </div>
        <div className="flex-1 rounded-lg p-2 text-center" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)' }}>
          <span className="text-[10px] font-medium" style={{ color: 'var(--red-text)' }}>Never send</span>
        </div>
      </div>
    ),
  },
  {
    Icon: BarChart2,
    title: 'Personal templates',
    desc: 'Each participant leaves with a library of tested and validated prompts, adapted to their role and daily tasks.',
    span: 'md:col-span-2',
    visual: (
      <div className="mt-4 flex flex-wrap gap-2">
        {['Formal email', 'PDF summary', 'Data analysis', 'Creative brief', 'Meeting notes', 'Pro translation'].map((t) => (
          <span
            key={t}
            className="text-[10px] font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,107,0,0.08)', color: '#FF8C00', border: '1px solid rgba(255,107,0,0.2)' }}
          >
            {t}
          </span>
        ))}
      </div>
    ),
  },
]

export function SkillsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {SKILLS.map((s) => (
        <div
          key={s.title}
          className={`group rounded-[16px] p-6 border transition-all duration-300 hover:translate-y-[-2px] ${s.span}`}
          style={{ background: 'var(--surface-default)', borderColor: 'var(--surface-border)' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
              style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid rgba(255,107,0,0.22)` }}
            >
              <s.Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-text font-bold text-[15px] mb-1">{s.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
          {s.visual}
        </div>
      ))}
    </div>
  )
}
