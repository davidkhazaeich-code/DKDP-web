import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { BLOG_CATEGORIES, type Article } from '@/lib/blog-data'

export function ArticleCard({ article, delay }: { article: Article; delay: number }) {
  const cat = BLOG_CATEGORIES[article.category]
  return (
    <SectionReveal delay={delay} className="h-full">
      <Link
        href={`/blog/${article.slug}`}
        className="group flex flex-col h-full rounded-[16px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
        style={{ borderColor: cat.border }}
      >
        {/* Hero image */}
        <div className="h-[200px] flex-shrink-0 relative overflow-hidden">
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span
            className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(10,10,10,0.84)',
              color: cat.color,
              border: `1px solid ${cat.border}`,
            }}
          >
            {cat.label}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3 bg-zinc-900/60">
          <p className="text-zinc-500 text-xs">
            {article.date} · {article.readTime} de lecture
          </p>
          <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2">
            {article.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed flex-1 line-clamp-2">
            {article.excerpt}
          </p>
          <span
            className="mt-1 text-[12px] font-semibold transition-opacity group-hover:opacity-70"
            style={{ color: cat.color }}
          >
            Lire &rarr;
          </span>
        </div>
      </Link>
    </SectionReveal>
  )
}
