'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { FAQ_ITEMS } from '@/data/faq'
import type { Locale } from '@/i18n/config'

type FAQItemType = { question: string; answer: string }

/**
 * La reponse est TOUJOURS dans le DOM, repliee a hauteur 0 quand l'item est
 * ferme (21/09/2026, plan SEO, action D14). Avant, elle n'etait montee qu'au
 * clic : le HTML servi ne contenait aucune reponse hors JSON-LD, donc rien a
 * citer pour un crawler qui n'execute pas le JS (ChatGPT, Perplexity, Claude).
 * L'animation est la meme, seule la strategie de montage change.
 */
function FAQItem({ item, index }: { item: FAQItemType; index: number }) {
  const [open, setOpen] = useState(false)
  const answerId = `faq-answer-${index}`

  return (
    <SectionReveal delay={index * 0.07}>
      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-start justify-between gap-4 py-5 text-left group"
          aria-expanded={open}
          aria-controls={answerId}
        >
          <span className="text-text font-medium text-base leading-snug group-hover:text-violet-light transition-colors duration-150">
            {item.question}
          </span>
          <span
            className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-violet-light group-hover:text-violet-light transition-all duration-150"
            aria-hidden="true"
          >
            {open ? <Minus size={13} /> : <Plus size={13} />}
          </span>
        </button>

        <m.div
          id={answerId}
          initial={false}
          animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
          aria-hidden={!open}
        >
          <p className="text-text-secondary text-sm leading-relaxed pb-6 max-w-3xl">
            {item.answer}
          </p>
        </m.div>
      </div>
    </SectionReveal>
  )
}

export function FAQSection({
  items = FAQ_ITEMS,
  title = "Ce qu'on nous demande souvent",
  lang = 'fr',
}: {
  items?: FAQItemType[]
  title?: string
  lang?: Locale
}) {
  return (
    <section aria-labelledby="faq-heading" className="py-14 sm:py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-16">
            <GradTag className="mb-4 sm:mb-6">{lang === 'en' ? 'FAQ' : 'Questions fréquentes'}</GradTag>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              {title}
            </h2>
          </div>
        </SectionReveal>

        <div className="max-w-3xl mx-auto border-t border-border">
          {items.map((item, i) => (
            <FAQItem key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
