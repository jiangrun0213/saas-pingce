'use client'

import Link from 'next/link'
import { useState } from 'react'
import { tools } from '@/data/tools'
import { chinaSubCategories } from '@/data/categories'
import ToolCard from '@/components/ToolCard'
import { useLanguage } from '@/lib/language-context'

export default function ChinaToolsPage() {
  const { t, language } = useLanguage()
  const [activeSub, setActiveSub] = useState('all')

  const chinaTools = tools.filter((t) => t.categorySlug === 'china-tools')
  const filtered = activeSub === 'all' ? chinaTools : chinaTools.filter((t) => t.subCategory === activeSub)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">{t('chinaTools.title')}</h1>
      <p className="mt-2 text-gray-600 max-w-2xl">{t('chinaTools.subtitle')}</p>

      {/* Subcategory Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveSub('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSub === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {t('tools.allCategories')}
        </button>
        {chinaSubCategories.map((sub) => (
          <button
            key={sub.slug}
            type="button"
            onClick={() => setActiveSub(sub.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSub === sub.slug ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {sub.icon} {language === 'zh' ? sub.nameZh : sub.nameDe}
          </button>
        ))}
      </div>

      {/* Tool Count */}
      <p className="mt-6 text-sm text-gray-500">
        {t('chinaTools.count', { count: filtered.length })}
      </p>

      {/* Tool Grid */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-gray-500">{t('chinaTools.empty')}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
