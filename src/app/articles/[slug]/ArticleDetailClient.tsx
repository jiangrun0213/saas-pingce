'use client'

import Link from 'next/link'
import { Article } from '@/types'
import { useLanguage } from '@/lib/language-context'
import { localizeArticle } from '@/data/articles'

interface Props {
  article: Article
}

export default function ArticleDetailClient({ article }: Props) {
  const { t, language } = useLanguage()
  const localized = localizeArticle(article, language)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">{t('tool.breadcrumb.home')}</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-blue-600">{t('articles.title')}</Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{localized.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            {localized.category}
          </span>
          <span>{article.date}</span>
          <span>{localized.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {localized.title}
        </h1>
        <p className="text-lg text-gray-600">{localized.excerpt}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none">
        {localized.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">{line.replace('## ', '')}</h2>
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-semibold text-gray-800 mt-8 mb-3">{line.replace('### ', '')}</h3>
          }
          if (line.startsWith('| ')) {
            const cells = line.split('|').filter(Boolean).map(c => c.trim())
            if (line.includes('---')) return null
            return (
              <div key={i} className="flex border-b border-gray-200 py-2 text-sm">
                {cells.map((c, j) => (
                  <div key={j} className={`flex-1 px-2 ${j === 0 ? 'font-medium text-gray-700' : 'text-gray-600'}`}>{c}</div>
                ))}
              </div>
            )
          }
          if (line.startsWith('|')) return null
          if (line.startsWith('---')) return null
          if (line.startsWith('```')) return null
          if (line.startsWith('- ')) {
            return <li key={i} className="text-gray-700 ml-6 list-disc">{line.replace('- ', '')}</li>
          }
          if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
            return <li key={i} className="text-gray-700 ml-6 list-decimal">{line.replace(/^\d+\. /, '')}</li>
          }
          if (line.startsWith('> ⚠️')) {
            return <div key={i} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 text-sm text-yellow-800 rounded">{line.replace('> ⚠️ ', '')}</div>
          }
          if (line.trim() === '') {
            return <div key={i} className="h-4" />
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="font-semibold text-gray-800">{line.replace(/\*\*/g, '')}</p>
          }
          return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
        })}
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
          {t('articles.back')}
        </Link>
      </div>
    </div>
  )
}
