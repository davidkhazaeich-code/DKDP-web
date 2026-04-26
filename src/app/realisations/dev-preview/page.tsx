import type { Metadata } from 'next'
import { BrowserFrame } from '@/components/realisations/BrowserFrame'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// TODO : delete in Bundle G (Task 18 of the realisations plan)

export default function DevPage() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-12 p-12">
      <h1 className="text-3xl font-bold text-white">BrowserFrame dev preview</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <BrowserFrame
          src="/images/blog/seo-local-geneve-2026-hero.png"
          alt="Test image fullpage"
          browserUrl="example.ch"
          variant="card"
        />
        <BrowserFrame
          src=""
          alt="Goldencash"
          browserUrl="goldencash.ch"
          variant="hero"
        />
      </div>
    </div>
  )
}
