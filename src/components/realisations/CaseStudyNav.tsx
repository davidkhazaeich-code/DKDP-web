import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Navigation collante d'une etude de cas, sous la capture du hero. Les
 * entrees suivent les blocs reellement presents dans la realisation : une
 * etude sans bloc SEO n'affiche pas d'onglet SEO. Meme composant que les
 * pages blog et glossaire, accent violet du pilier agence.
 */
export function CaseStudyNav({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const en = lang === 'en'
  const L = {
    context: en ? 'Context' : 'Contexte',
    approach: en ? 'Approach' : 'Approche',
    sections: en ? 'Sections' : 'Sections',
    direction: en ? 'Visual direction' : 'Direction visuelle',
    seo: 'SEO',
    results: en ? 'Results' : 'Résultats',
    gallery: en ? 'Gallery' : 'Galerie',
    cta: en ? 'Start my project' : 'Lancer mon projet',
  }
  const items = [
    { label: L.context, href: '#contexte' },
    { label: L.approach, href: '#approche' },
    ...(r.highlights?.length ? [{ label: L.sections, href: '#sections' }] : []),
    ...(r.direction ? [{ label: L.direction, href: '#direction' }] : []),
    ...(r.seo ? [{ label: L.seo, href: '#seo' }] : []),
    ...(r.results?.length ? [{ label: L.results, href: '#resultats' }] : []),
    ...(r.gallery?.length ? [{ label: L.gallery, href: '#galerie' }] : []),
  ]
  return (
    <ScrollSpyNav
      items={items}
      cta={{ label: L.cta, href: en ? '/en/contact' : '/contact' }}
      accentColor={violet.color}
      accentBg={violet.bg}
      accentBorder={violet.border}
    />
  )
}
