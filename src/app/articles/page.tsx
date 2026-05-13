import Link from 'next/link'
import { articles } from '@/data/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikel – SaaS-Produkttests und Technologieanalyse',
  description: 'SaaS-Produkttests, Technologieanalysen und Sicherheitsforschung – bleibe auf dem neuesten Stand',
}

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Artikel</h1>
      <p className="text-gray-600 mb-10">SaaS-Produkttests, Technologieanalysen und Sicherheitsforschung</p>

      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <Link href={`/articles/${article.slug}`}>
              <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
                {article.title}
              </h2>
            </Link>
            <p className="text-gray-600 leading-relaxed">{article.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
