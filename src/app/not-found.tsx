import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { InfiniteGrid } from '@/components/canvas/InfiniteGrid'

export default function NotFound() {
  return (
    <InfiniteGrid>
      <main className="pt-14 min-h-[80vh] flex items-center">
        <div className="max-w-[600px] mx-auto px-6 text-center py-24">
          <GradTag className="mb-6">404</GradTag>
          <h1 className="text-5xl md:text-6xl font-bold tracking-[-0.03em] mb-6">
            Cette page n&apos;existe pas.
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md mx-auto">
            Vous avez suivi un lien incorrect ou cette page a été déplacée. Pas de panique.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <LiquidMetalButton href="/" size="lg">
              Retour à l&apos;accueil
            </LiquidMetalButton>
            <Link
              href="/contact"
              className="text-sm text-text-muted hover:text-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
    </InfiniteGrid>
  )
}
