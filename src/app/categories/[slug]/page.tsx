import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categories, getCategoryBySlug } from '@/data/categories'
import { tools, getToolsByCategory } from '@/data/tools'
import ToolCard from '@/components/ToolCard'
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
    title: `${cat.name}-Tools im Überblick – ${cat.description}`,
    description: `Die besten ${cat.name}-Tools im Vergleich: ${getToolsByCategory(slug).map(t => t.name).join(', ')} im Test`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryTools = getToolsByCategory(slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">Startseite</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-blue-600">Kategorien</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        </div>
        <p className="text-gray-600 mt-2">{category.description}</p>
        <p className="text-sm text-gray-400 mt-1">Insgesamt {categoryTools.length} Tools</p>
      </div>

      {categoryTools.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          Keine Tools in dieser Kategorie
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
