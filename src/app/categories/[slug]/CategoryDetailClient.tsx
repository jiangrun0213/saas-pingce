'use client'

import Link from 'next/link'
import { Category, Tool } from '@/types'
import { tools, getToolsByCategory, localizeTool } from '@/data/tools'
import ToolCard from '@/components/ToolCard'
import { useLanguage } from '@/lib/language-context'
import { localizeCategory } from '@/data/categories'

interface Props {
  category: Category
  categoryTools: Tool[]
}

export default function CategoryDetailClient({ category, categoryTools }: Props) {
  const { t, language } = useLanguage()
  const localized = localizeCategory(category, language)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">{t('tool.breadcrumb.home')}</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-blue-600">{t('categories.breadcrumb')}</Link>
        <span>/</span>
        <span className="text-gray-900">{localized.name}</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{localized.name}</h1>
        </div>
        <p className="text-gray-600 mt-2">{localized.description}</p>
        <p className="text-sm text-gray-400 mt-1">{t('categories.total', { count: categoryTools.length })}</p>
      </div>

      {categoryTools.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          {t('categories.empty')}
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
