export type Language = 'de' | 'zh'

export interface Tool {
  id: string
  slug: string
  logo: string
  categorySlug: string
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
