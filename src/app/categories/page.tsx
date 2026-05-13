'use client'

import Link from 'next/link'
import { categories } from '@/data/categories'
import { tools } from '@/data/tools'
import { useLanguage } from '@/lib/language-context'
import { localizeCategory } from '@/data/categories'

export default function CategoriesPage() {
  const { t, language } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('categories.title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = tools.filter((t) => t.categorySlug === cat.slug).length
          const localized = localizeCategory(cat, language)
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{localized.name}</h2>
                  <p className="text-sm text-gray-500">{t('categories.count', { count })}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{localized.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
