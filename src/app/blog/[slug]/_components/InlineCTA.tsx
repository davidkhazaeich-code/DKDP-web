import Link from 'next/link'

export interface ServiceLink {
  label: string
  href: string
  desc: string
  color: string
  bg: string
  border: string
}

export function InlineCTA({ service }: { service: ServiceLink }) {
  return (
    <aside
      className="my-10 rounded-[16px] border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      style={{ background: service.bg, borderColor: service.border }}
    >
      {/* Icon dot */}
      <div
        className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: service.border }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke={service.color} strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="text-[10px] font-bold uppercase tracking-widest mb-1 block"
          style={{ color: service.color }}
        >
          Service DKDP
        </span>
        <p className="text-white font-semibold text-sm mb-1">{service.label}</p>
        <p className="text-zinc-400 text-xs leading-relaxed">{service.desc}</p>
      </div>
      <Link
        href={service.href}
        className="shrink-0 text-xs font-bold px-4 py-2 rounded-[8px] transition-opacity hover:opacity-80 whitespace-nowrap"
        style={{ background: service.color, color: '#09090B' }}
      >
        En savoir plus
      </Link>
    </aside>
  )
}
