import { notFound } from 'next/navigation'
import { categories, getCategoryBySlug } from '@/data/categories'
import { tools, getToolsByCategory } from '@/data/tools'
import CategoryDetailClient from './CategoryDetailClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) return {}
  return {
    title: `${cat.nameDe}-Tools im Überblick – ${cat.descriptionDe}`,
    description: `Die besten ${cat.nameDe}-Tools im Vergleich: ${getToolsByCategory(slug).map(t => t.nameDe).join(', ')} im Test`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()
  const categoryTools = getToolsByCategory(slug)
  return <CategoryDetailClient category={category} categoryTools={categoryTools} />
}
