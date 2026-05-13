export type Language = 'de' | 'zh'

export interface RatingDimension {
  labelDe: string
  labelZh: string
  score: number // 1-10
}

export interface GermanSupport {
  interface: boolean
  docs: boolean
  support: boolean
  descriptionDe: string
  descriptionZh: string
}

export interface ToolReview {
  reviewDe: string
  reviewZh?: string
  ratingDimensions: RatingDimension[]
  germanSupport: GermanSupport
  dsgvoStatus: 'vollständig' | 'teilweise' | 'ungeprüft' | 'nicht zutreffend'
  dsgvoNotesDe: string
  dsgvoNotesZh?: string
  germanAlternatives: string[] // tool slugs
  bestForDe: string[]
  bestForZh: string[]
}

export interface Tool {
  id: string
  slug: string
  logo: string
  categorySlug: string
  subCategory?: string
  pricing: 'free' | 'freemium' | 'paid'
  priceRange: string
  website: string
  rating: number
  reviewCount: number
  affiliateUrl?: string
  nameDe: string
  nameZh: string
  descriptionDe: string
  descriptionZh: string
  featuresDe: string[]
  featuresZh: string[]
  prosDe: string[]
  prosZh: string[]
  consDe: string[]
  consZh: string[]
  suitableForDe: string[]
  suitableForZh: string[]
  review?: ToolReview
}

export interface Category {
  slug: string
  icon: string
  nameDe: string
  nameZh: string
  descriptionDe: string
  descriptionZh: string
}

export interface Article {
  slug: string
  date: string
  categorySlug: string
  tags: string[]
  titleDe: string
  titleZh: string
  excerptDe: string
  excerptZh: string
  contentDe: string
  contentZh: string
  categoryDe: string
  categoryZh: string
  readTimeDe: string
  readTimeZh: string
}
