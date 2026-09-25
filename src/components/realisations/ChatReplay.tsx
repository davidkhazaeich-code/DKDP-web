import type { RealisationConversation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

/**
 * Conversation rejouee avec un assistant IA : un vrai echange, anonymise, en
 * texte. Montre ce que l'assistant repond et ou il renvoie, lisible par
 * Google, la ou une capture d'ecran ne le serait pas.
 */
export function ChatReplay({ conversation, lang = 'fr' }: { conversation: RealisationConversation; lang?: Locale }) {
  const en = lang === 'en'
  return (
    <section id="conversation" className="scroll-mt-[124px] border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
            {en ? 'A real conversation' : 'Une vraie conversation'}
          </h2>
          <h3 className="mt-3 text-xl leading-snug text-[var(--violet-text)]">{conversation.title}</h3>
          {conversation.intro && <p className="mt-4 text-[17px] leading-[1.7] text-text-secondary">{conversation.intro}</p>}
        </div>
        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <ol className="flex flex-col gap-3 rounded-2xl border border-border bg-bg-card p-5 md:p-6">
            {conversation.turns.map((turn, i) => {
              const visitor = turn.role === 'visiteur'
              return (
                <li key={i} className={`flex ${visitor ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-[1.55]"
                    style={
                      visitor
                        ? { background: 'var(--surface-default)', border: '1px solid var(--border)', color: 'var(--text)' }
                        : { background: 'var(--violet-bg)', border: '1px solid var(--violet-border)', color: 'var(--text)' }
                    }
                  >
                    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                      {visitor ? (en ? 'Visitor' : 'Visiteur') : en ? 'Assistant' : 'Assistant'}
                    </span>
                    {turn.text}
                  </div>
                </li>
              )
            })}
          </ol>
          {conversation.note && <p className="mt-4 text-sm leading-[1.6] text-text-muted">{conversation.note}</p>}
        </div>
      </div>
    </section>
  )
}
