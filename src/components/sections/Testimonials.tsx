'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'

const TESTIMONIALS = [
  {
    quote:
      "David et Charlotte ont été mandatés par notre entreprise (Solid.ch) fin juin pour une refonte totale de notre site internet. Ils sont partis de zéro et ont mené le projet avec rapidité et professionnalisme afin d'être en mesure de nous livrer courant septembre. Je ne peux que les recommander et leur souhaiter le succès qu'ils méritent dans cette activité qu'ils maîtrisent.",
    name: 'Frédéric Alimi',
    title: 'Luxury Market Manager',
    company: 'Solid SA',
    initials: 'FA',
  },
  {
    quote:
      "Grâce à l'excellent savoir-faire de M. David Khazaei, nous profitons enfin d'un site dynamique représentant parfaitement notre société et son activité. Nous ne pouvons que remercier M. Khazaei pour son écoute, ses idées novatrices, sa parfaite maîtrise de l'outil informatique. Sa créativité et son professionnalisme ont vraiment répondu à nos attentes.",
    name: 'M. Estrada',
    title: 'Directeur Exécutif',
    company: '',
    initials: 'ME',
  },
  {
    quote:
      "S'entourer de professionnels fiables c'est essentiel, et pour ma part je les considère comme partenaires quand ils ont le niveau d'expertise que j'attends d'eux. David Khazaei fait partie des talents avec qui j'aime travailler. Sa pluridisciplinarité lui permet de s'adapter avec brio à toutes mes demandes.",
    name: 'Pierre Simonneau',
    title: 'Directeur de création',
    company: '6mono.com',
    initials: 'PS',
  },
  {
    quote:
      "Nous sommes vraiment heureux d'avoir eu une expérience de travail avec David et son équipe. David est une personne à l'écoute et traduit ce que nous avons en tête en un résultat absolument de qualité. Merci infiniment.",
    name: 'Fabrice Rossi',
    title: 'Directeur Général',
    company: '',
    initials: 'FR',
  },
] as const

export function Testimonials({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    setExpanded(false)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    setExpanded(false)
  }, [])

  const goTo = (i: number) => {
    setCurrent(i)
    setExpanded(false)
  }

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next])

  const testimonial = TESTIMONIALS[current]

  return (
    <section aria-labelledby="testimonials-heading" className={className ?? 'py-24 bg-bg-card border-y border-border'}>
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <GradTag className="mb-6">Témoignages</GradTag>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Ce que disent nos clients
            </h2>
          </div>
        </SectionReveal>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bg border border-border rounded-[16px] p-8 md:p-10"
            >
              <svg
                className="w-8 h-8 text-violet mb-6 opacity-50"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <blockquote>
                <div className="mb-8">
                  <motion.div
                    key={`quote-${current}`}
                    initial={{ height: '5.5rem' }}
                    animate={{ height: expanded ? 'auto' : '5.5rem' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-white text-lg leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-violet-light hover:opacity-80 transition-opacity"
                  >
                    {expanded ? (
                      <><ChevronUp size={13} />Réduire</>
                    ) : (
                      <><ChevronDown size={13} />Lire la suite</>
                    )}
                  </button>
                </div>
                <footer className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-violet/20 border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-violet-light">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-text-muted text-xs">
                      {testimonial.title}
                      {testimonial.company ? ` · ${testimonial.company}` : ''}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              aria-label="Témoignage précédent"
              className="w-10 h-10 rounded-full border border-border hover:border-violet transition-colors flex items-center justify-center text-text-muted hover:text-white"
            >
              <span aria-hidden="true">←</span>
            </button>

            <div role="tablist" aria-label="Navigation témoignages" className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="group relative flex items-center justify-center w-11 h-11"
                >
                  <span className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-violet w-6'
                      : 'bg-border group-hover:bg-text-muted w-2'
                  }`} />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Témoignage suivant"
              className="w-10 h-10 rounded-full border border-border hover:border-violet transition-colors flex items-center justify-center text-text-muted hover:text-white"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
