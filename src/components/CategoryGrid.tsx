import Link from 'next/link'
import { categories } from '@/data/categories'
import { tools } from '@/data/tools'

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {categories.map((cat) => {
        const count = tools.filter((t) => t.categorySlug === cat.slug).length
        return (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="flex flex-col items-center gap-2 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all text-center"
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="font-medium text-gray-900 text-sm">{cat.name}</span>
            <span className="text-xs text-gray-400">{count} Tools</span>
          </Link>
        )
      })}
    </div>
  )
}
