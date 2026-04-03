export type Category = 'IA' | 'SEO' | 'Web' | 'Formation' | 'General'

export interface Term {
  term: string
  category: Category
  definition: string
  link?: string
}
