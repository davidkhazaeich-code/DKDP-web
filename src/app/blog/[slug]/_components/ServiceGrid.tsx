import Link from 'next/link'
import { violet } from '@/lib/tokens'
import type { ServiceLink } from './InlineCTA'

export function ServiceGrid({ services }: { services: ServiceLink[] }) {
  return (
    <section className="mt-16 mb-4">
      <div
        className="rounded-[20px] border p-8"
        style={{ background: 'rgba(124,58,237,0.04)', borderColor: 'rgba(124,58,237,0.14)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: violet.color }}>
          Nos services
        </p>
        <h3 className="text-xl font-black text-white mb-6">
          Vous avez des questions ? On peut vous aider.
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.map(svc => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group flex flex-col gap-2 rounded-[14px] border p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: svc.bg, borderColor: svc.border }}
            >
              <span className="text-[11px] font-bold" style={{ color: svc.color }}>
                {svc.label}
              </span>
              <p className="text-zinc-400 text-xs leading-relaxed flex-1">
                {svc.desc}
              </p>
              <span
                className="text-[11px] font-semibold mt-1 group-hover:opacity-70 transition-opacity"
                style={{ color: svc.color }}
              >
                Decouvrir &rarr;
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="inline-block text-sm font-bold px-6 py-2.5 rounded-[10px] transition-opacity hover:opacity-80"
            style={{ background: violet.color, color: '#09090B' }}
          >
            Planifier un appel gratuit
          </Link>
        </div>
      </div>
    </section>
  )
}
