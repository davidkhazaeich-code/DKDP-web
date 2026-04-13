import Link from 'next/link'
import { orange } from '@/lib/tokens'
import { Users, Clock, CalendarDays } from 'lucide-react'

const OR = orange.color
const ORB = orange.bg
const ORD = orange.border

const HOURLY_RATES: { label: string; rate: number | null }[] = [
  { label: '1 personne', rate: 200 },
  { label: '2 personnes', rate: 300 },
  { label: '3-6 personnes', rate: null },
  { label: '6-10 personnes', rate: null },
]

const FORMATS = [
  { label: 'Demi-journée', work: '3h de formation', prep: '1h de préparation' },
  { label: 'Journée entière', work: '6h de formation', prep: '2h de préparation' },
]

export function FormationPricing() {
  return (
    <div>
      {/* Hourly rates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {HOURLY_RATES.map((r) => (
          <div
            key={r.label}
            className="rounded-[14px] border p-5 text-center"
            style={{ background: ORB, borderColor: ORD }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${ORD}` }}
            >
              <Users size={15} style={{ color: OR }} />
            </div>
            <p className="text-text-muted text-xs font-medium mb-1">{r.label}</p>
            {r.rate ? (
              <>
                <p className="text-xl font-bold" style={{ color: OR }}>CHF {r.rate}</p>
                <p className="text-text-muted text-[10px] mt-0.5">par heure</p>
              </>
            ) : (
              <Link
                href="/contact"
                className="text-base font-bold transition-opacity hover:opacity-80"
                style={{ color: OR }}
              >
                Sur devis
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Format cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {FORMATS.map((f) => (
          <div
            key={f.label}
            className="rounded-[14px] border p-6"
            style={{ background: ORB, borderColor: ORD }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,107,0,0.10)', border: `1px solid ${ORD}` }}
              >
                {f.label === 'Demi-journée'
                  ? <Clock size={15} style={{ color: OR }} />
                  : <CalendarDays size={15} style={{ color: OR }} />
                }
              </div>
              <div>
                <p className="text-white font-bold text-base">{f.label}</p>
                <p className="text-text-muted text-xs">{f.work} + {f.prep}</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-text-secondary text-sm">Tarif</span>
              <Link
                href="/contact"
                className="font-bold text-sm transition-opacity hover:opacity-80"
                style={{ color: OR }}
              >
                Sur devis
              </Link>
            </div>
            <p className="text-text-muted text-[10px] mt-2">
              Programme personnalise selon vos besoins.{' '}
              <Link href="/contact" className="underline hover:text-white transition-colors" style={{ color: OR }}>
                Demander un devis
              </Link>
            </p>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-text-muted text-xs mt-4 text-center leading-relaxed">
        Le programme est personnalise pour chaque entreprise.{' '}
        <Link href="/contact" className="underline hover:text-white transition-colors" style={{ color: OR }}>
          Devis gratuit sous 48h
        </Link>
      </p>
    </div>
  )
}
