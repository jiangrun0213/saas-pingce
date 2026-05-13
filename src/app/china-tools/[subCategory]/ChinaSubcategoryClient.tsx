'use client'

import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import { useLanguage } from '@/lib/language-context'
import type { Tool } from '@/types'
import type { ChinaSubCategory } from '@/data/categories'

export default function ChinaSubcategoryClient({ sub, tools }: { sub: ChinaSubCategory; tools: Tool[] }) {
  const { t, language } = useLanguage()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">{t('tool.breadcrumb.home')}</Link>
        <span>›</span>
        <Link href="/china-tools" className="hover:text-blue-600">{t('chinaTools.title')}</Link>
        <span>›</span>
        <span className="text-gray-900">{language === 'zh' ? sub.nameZh : sub.nameDe}</span>
      </div>

      {/* Subcategory Header */}
      <div className="flex items-center gap-4 mb-2">
        <span className="text-5xl">{sub.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{language === 'zh' ? sub.nameZh : sub.nameDe}</h1>
          <p className="text-gray-600 mt-1">{language === 'zh' ? sub.descriptionZh : sub.descriptionDe}</p>
        </div>
      </div>

      {/* Tool Count */}
      <p className="mt-8 text-sm text-gray-500">
        {t('chinaTools.count', { count: tools.length })}
      </p>

      {/* Tool Grid */}
      {tools.length === 0 ? (
        <p className="mt-12 text-center text-gray-500">{t('chinaTools.empty')}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
