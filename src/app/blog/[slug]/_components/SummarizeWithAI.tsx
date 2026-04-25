type Props = {
  articleUrl: string
}

const PROMPT_FR = (url: string) =>
  `Résume-moi cet article en français en quelques points clés : ${url}`

function buildLinks(articleUrl: string) {
  const prompt = PROMPT_FR(articleUrl)
  const q = encodeURIComponent(prompt)
  return [
    {
      name: 'ChatGPT',
      href: `https://chatgpt.com/?q=${q}&hints=search`,
      logo: '/images/logos/ai/openai.svg',
      bg: '#10A37F',
    },
    {
      name: 'Claude',
      href: `https://claude.ai/new?q=${q}`,
      logo: '/images/logos/ai/claude.svg',
      bg: '#D97706',
    },
    {
      name: 'Gemini',
      href: `https://gemini.google.com/app?q=${q}`,
      logo: '/images/logos/ai/googlegemini.svg',
      bg: '#1F6FEB',
    },
    {
      name: 'Perplexity',
      href: `https://www.perplexity.ai/?q=${q}`,
      logo: '/images/logos/ai/perplexity.svg',
      bg: '#22B8CD',
    },
  ]
}

export function SummarizeWithAI({ articleUrl }: Props) {
  const links = buildLinks(articleUrl)
  return (
    <section
      aria-label="Résumer cet article avec une IA"
      className="mb-10 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-5 py-4 sm:px-6 sm:py-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400">
            Lecture rapide
          </span>
          <span className="text-sm text-zinc-300">
            Résumez cet article avec une IA
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Résumer avec ${link.name}`}
              aria-label={`Résumer cet article avec ${link.name}`}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-700/70 bg-zinc-950/60 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800/80 hover:text-white"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: link.bg }}
              >
                <img
                  src={link.logo}
                  alt=""
                  width={12}
                  height={12}
                  className="h-3 w-3"
                  aria-hidden="true"
                />
              </span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
