import Link from 'next/link'
import { tools } from '@/data/tools'
import { categories } from '@/data/categories'
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
            找到最适合你的
            <span className="text-blue-600"> SaaS 工具</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            覆盖 {categories.length} 个分类，{tools.length} 款SaaS产品，客观评测对比，帮你做出更明智的选型决策
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/tools"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              浏览全部工具
            </Link>
            <Link
              href="/compare"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition-colors"
            >
              对比工具
            </Link>
          </div>
        </div>
      </section>

      <AdSense />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">按分类浏览</h2>
        <CategoryGrid />
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">推荐工具</h2>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            查看全部 →
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
