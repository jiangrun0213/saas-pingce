'use client'

import Link from 'next/link'
import { articles } from '@/data/articles'
import { useLanguage } from '@/lib/language-context'
import { localizeArticle } from '@/data/articles'

export default function ArticlesClient() {
  const { t, language } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('articles.title')}</h1>
      <p className="text-gray-600 mb-10">{t('articles.desc')}</p>

      <div className="space-y-8">
        {articles.map((article) => {
          const localized = localizeArticle(article, language)
          return (
            <article key={article.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {localized.category}
                </span>
                <span>{article.date}</span>
                <span>{localized.readTime}</span>
              </div>
              <Link href={`/articles/${article.slug}`}>
                <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
                  {localized.title}
                </h2>
              </Link>
              <p className="text-gray-600 leading-relaxed">{localized.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
