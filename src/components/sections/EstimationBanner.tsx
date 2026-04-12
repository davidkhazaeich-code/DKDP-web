import Link from 'next/link'
import { Calculator, ChevronRight, Clock, Shield } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function EstimationBanner() {
  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <SectionReveal>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-10 lg:p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 50%, rgba(255,140,0,0.06) 100%)',
              border: '1px solid rgba(124,58,237,0.18)',
            }}
          >
            {/* Subtle grid background */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage: 'linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
                  >
                    <Calculator size={20} className="text-violet-400" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-400">
                    Simulateur en ligne
                  </p>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">
                  Estimez le cout de votre site web
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed max-w-xl mb-5">
                  Configurez votre projet en quelques clics et recevez une estimation transparente.
                  Site vitrine, e-commerce ou sur mesure.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-violet-400/70" />
                    2 minutes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield size={13} className="text-violet-400/70" />
                    Sans engagement
                  </span>
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex-shrink-0">
                <Link
                  href="/agence-digitale/creation-site-web/estimation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                    boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                  }}
                >
                  Estimer mon projet
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
