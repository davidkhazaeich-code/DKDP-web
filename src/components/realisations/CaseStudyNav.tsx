import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { violet } from '@/lib/tokens'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Navigation collante d'une etude de cas, sous le visuel du hero. Les
 * entrees suivent les blocs reellement presents dans la realisation : une
 * etude sans bloc SEO n'affiche pas d'onglet SEO. Meme composant que les
 * pages blog et glossaire, accent violet du pilier agence.
 */
export function CaseStudyNav({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const en = lang === 'en'
  const items = [
    { label: en ? 'Context' : 'Contexte', href: '#contexte' },
    { label: en ? 'Approach' : 'Approche', href: '#approche' },
    ...(r.flow ? [{ label: en ? 'Flow' : 'Flux', href: '#flux' }] : []),
    ...(r.training ? [{ label: en ? 'Training' : 'Formation', href: '#formation' }] : []),
    ...(r.highlights?.length ? [{ label: 'Sections', href: '#sections' }] : []),
    ...(r.videos?.length || r.beforeAfter?.length ? [{ label: en ? 'In action' : 'En mouvement', href: '#en-mouvement' }] : []),
    ...(r.conversation ? [{ label: en ? 'Conversation' : 'Conversation', href: '#conversation' }] : []),
    ...(r.direction ? [{ label: en ? 'Visual direction' : 'Direction visuelle', href: '#direction' }] : []),
    ...(r.seo ? [{ label: 'SEO', href: '#seo' }] : []),
    ...(r.dataStories?.length
      ? [{ label: en ? 'Numbers' : 'Chiffres', href: '#courbes' }]
      : r.results?.length
        ? [{ label: en ? 'Results' : 'Résultats', href: '#resultats' }]
        : []),
    ...(r.gallery?.length
      ? [{ label: r.gallery.every((g) => g.document) ? (en ? 'Deliverable' : 'Livrable') : en ? 'Gallery' : 'Galerie', href: '#galerie' }]
      : []),
    ...(r.lessons?.length ? [{ label: en ? 'Lessons' : 'Leçons', href: '#lecons' }] : []),
    ...(r.faq?.length ? [{ label: en ? 'Questions' : 'Questions', href: '#questions' }] : []),
  ]
  return (
    <ScrollSpyNav
      items={items}
      cta={{ label: en ? 'Start my project' : 'Lancer mon projet', href: en ? '/en/contact' : '/contact' }}
      accentColor={violet.color}
      accentBg={violet.bg}
      accentBorder={violet.border}
    />
  )
}
