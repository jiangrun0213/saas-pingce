import Link from 'next/link'
import { tools } from '@/data/tools'
import { categories } from '@/data/categories'
import { articles } from '@/data/articles'
import ToolCard from '@/components/ToolCard'
import CategoryGrid from '@/components/CategoryGrid'
import AdSense from '@/components/AdSense'

export default function HomePage() {
  const featuredTools = tools.filter((t) => t.rating >= 4.5)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Finde die richtige
            <span className="text-blue-600"> SaaS-Lösung</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {categories.length} Kategorien, {tools.length} SaaS-Produkte – unabhängige Vergleiche und Bewertungen für bessere Software-Entscheidungen
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/tools"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Alle Tools durchsuchen
            </Link>
            <Link
              href="/articles"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Artikel lesen
            </Link>
          </div>
        </div>
      </section>

      <AdSense />

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Neueste Artikel</h2>
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Alle anzeigen →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{article.category}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Nach Kategorien durchsuchen</h2>
        <CategoryGrid />
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Empfohlene Tools</h2>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Alle anzeigen →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  )
}
