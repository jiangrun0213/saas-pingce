export interface Tool {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  categorySlug: string
  pricing: 'free' | 'freemium' | 'paid'
  priceRange: string
  website: string
  features: string[]
  pros: string[]
  cons: string[]
  rating: number
  reviewCount: number
  suitableFor: string[]
  affiliateUrl?: string
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
}
