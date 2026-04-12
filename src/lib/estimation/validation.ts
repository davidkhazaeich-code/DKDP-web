import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  company: z.string().max(200).default(''),
  email: z.string().email(),
  phone: z.string().max(30).default(''),
  message: z.string().max(2000).optional().default(''),
  budget: z.string().max(50).optional().default(''),
  timeline: z.string().max(50).optional().default(''),
  currentSiteUrl: z.string().url().max(500).optional().or(z.literal('')).default(''),
  productCount: z.string().max(20).optional().default(''),
  businessDescription: z.string().max(1000).optional().default(''),
  launchDate: z.string().max(20).optional().default(''),
  locationCount: z.string().max(10).optional().default(''),
  appDescription: z.string().max(2000).optional().default(''),
})

export const estimationRequestSchema = z.object({
  situation: z.enum(['new', 'redesign']),
  siteType: z.enum(['vitrine', 'ecommerce', 'landing', 'webapp']),
  sector: z.enum([
    'restaurant', 'health', 'legal', 'real-estate', 'retail',
    'services', 'tech', 'artisan', 'training', 'other',
  ]),
  logo: z.enum(['existing', 'create', 'modernize']).nullable(),
  branding: z.enum(['existing', 'create', 'modernize']).nullable(),
  strategy: z.array(z.enum(['positioning', 'market-study', 'content-strategy'])),
  pages: z.enum(['1-5', '6-10', '11-20', '20+', 'unsure']),
  languages: z.enum(['1', '2', '3+']),
  designLevel: z.enum(['template', 'custom', 'premium']),
  copywriting: z.enum(['provided', 'basic', 'professional']).nullable(),
  visuals: z.enum(['provided', 'stock', 'ai', 'shooting']).nullable(),
  features: z.array(z.enum([
    'blog-setup', 'blog-management', 'form', 'booking',
    'members', 'chatbot', 'payment', 'newsletter', 'gallery', 'extra-pages',
  ])),
  seo: z.array(z.enum(['advanced-oneshot', 'monthly'])),
  acquisition: z.array(z.enum(['sea', 'social', 'funnel'])),
  automation: z.array(z.enum(['crm', 'email-marketing', 'workflows', 'dashboard'])),
  services: z.array(z.enum(['maintenance', 'training', 'rgpd', 'video', 'rush'])),
  contact: contactSchema,
  estimatedTotal: z.object({ min: z.number(), max: z.number() }),
  estimatedMonthly: z.object({ min: z.number(), max: z.number() }),
  estimatedWeeks: z.object({ min: z.number(), max: z.number() }),
})
