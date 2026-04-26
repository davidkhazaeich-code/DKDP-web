import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import type { Realisation } from '@/lib/realisations/types'

const CATEGORY_LABEL: Record<Realisation['category'], string> = {
  'site-web': 'Site web',
  'projet-ia': 'Projet IA',
  'site-web-ia': 'Site + IA',
}

export function RealisationHeader({ r }: { r: Realisation }) {
  return (
    <header className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-text-muted">
        <Link href="/" className="hover:text-text-primary">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/realisations" className="hover:text-text-primary">Realisations</Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{r.client.name}</span>
      </nav>

      <GradTag>{CATEGORY_LABEL[r.category]}</GradTag>

      <h1 className="mt-6 text-4xl tracking-[-0.02em] leading-[1.05] text-white md:text-5xl lg:text-6xl">
        {r.client.name} : {r.meta.title}
      </h1>

      <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">
        {r.meta.excerpt}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-text-muted">
        <span>{r.client.sector}</span>
        {r.client.location && (
          <>
            <span>·</span>
            <span>{r.client.location}</span>
          </>
        )}
        <span>·</span>
        <span>
          Livre{' '}
          {new Date(r.meta.dateISO).toLocaleDateString('fr-CH', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {r.liveUrl && (
          <a
            href={r.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Visiter le site →
          </a>
        )}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          Lancer mon projet
        </Link>
      </div>
    </header>
  )
}
