import Link from 'next/link'
import { categories } from '@/data/categories'
import { tools } from '@/data/tools'

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">分类浏览</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = tools.filter((t) => t.categorySlug === cat.slug).length
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{cat.name}</h2>
                  <p className="text-sm text-gray-500">{count} 款工具</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{cat.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
