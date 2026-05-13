'use client'

import { useState } from 'react'
import Link from 'next/link'
import { tools } from '@/data/tools'
import { categories } from '@/data/categories'
import ToolCard from '@/components/ToolCard'
import { useLanguage } from '@/lib/language-context'
import { localizeTool } from '@/data/tools'
import { localizeCategory } from '@/data/categories'

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { t, language } = useLanguage()

  const filtered = tools.filter((tool) => {
    const localized = localizeTool(tool, language)
    const matchSearch = localized.name.toLowerCase().includes(search.toLowerCase()) || localized.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'all' || tool.categorySlug === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('tools.title')}</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder={t('tools.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
        >
          <option value="all">{t('tools.allCategories')}</option>
          {categories.map((cat) => {
            const localized = localizeCategory(cat, language)
            return (
              <option key={cat.slug} value={cat.slug}>
                {cat.icon} {localized.name}
              </option>
            )
          })}
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          {t('tools.empty')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
