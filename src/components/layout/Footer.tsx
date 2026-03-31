import Link from 'next/link'
import Image from 'next/image'

const PILLAR_LINKS = [
  { label: 'Agence Digitale', href: '/agence-digitale' },
  { label: 'Intelligence Artificielle', href: '/intelligence-artificielle' },
  { label: 'Formation Entreprise', href: '/formation-entreprise' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },
]

const SERVICE_LINKS = [
  { label: 'Création de site web', href: '/agence-digitale/creation-site-web' },
  { label: 'Référencement SEO', href: '/agence-digitale/seo' },
  { label: 'Google Ads', href: '/agence-digitale/publicite-sea' },
  { label: 'Agents IA', href: '/intelligence-artificielle/agents-ia' },
  { label: 'Automatisation', href: '/intelligence-artificielle/automatisation' },
  { label: 'Formation IA', href: '/formation-entreprise/ia' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-card mt-32">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <Image
              src="/images/logo/dkdp_blanc-croped.png"
              alt="DKDP"
              width={80}
              height={26}
              className="mb-4"
            />
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Agence digitale en Suisse romande.<br />
              IA · Formation · Web
            </p>
            <address className="not-italic text-text-muted text-xs leading-relaxed">
              36 Rue du 31 Décembre<br />
              1207 Genève, Suisse<br />
              Lun–Ven 09:00–18:00
            </address>
          </div>

          {/* Piliers */}
          <div>
            <p className="text-violet-light font-semibold text-xs uppercase tracking-[0.12em] mb-4">Piliers</p>
            <ul className="space-y-2">
              {PILLAR_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-text-secondary hover:text-white text-sm transition-colors hover-grad-text">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-violet-light font-semibold text-xs uppercase tracking-[0.12em] mb-4">Liens utiles</p>
            <ul className="space-y-2">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-text-secondary hover:text-white text-sm transition-colors hover-grad-text">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <p className="text-violet-light font-semibold text-xs uppercase tracking-[0.12em] mb-4">Parlons projet</p>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              15 minutes, gratuit et sans engagement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-[22px] py-[11px] bg-white text-black text-[13px] font-semibold rounded-[8px] hover:bg-gray-100 transition-all duration-[150ms] hover:-translate-y-px"
            >
              Réservez un appel →
            </Link>
            <div className="mt-6 space-y-1">
              <a href="tel:+41799407969" className="block text-text-muted hover:text-white text-xs transition-colors">
                +41 79 940 79 69
              </a>
              <a href="mailto:dk@dkdp.ch" className="block text-text-muted hover:text-white text-xs transition-colors">
                dk@dkdp.ch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            Copyright {year} dkdp.ch · Tous droits réservés
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/mentions-legales" className="text-text-muted hover:text-white text-xs transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-text-muted hover:text-white text-xs transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/rgpd-cookies" className="text-text-muted hover:text-white text-xs transition-colors">
              RGPD & Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
