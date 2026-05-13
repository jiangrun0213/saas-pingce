import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/data/articles'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-blue-600">文章</Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{article.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            {article.category}
          </span>
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600">{article.excerpt}</p>
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
        {article.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">{line.replace('## ', '')}</h2>
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-semibold text-gray-800 mt-8 mb-3">{line.replace('### ', '')}</h3>
          }
          if (line.startsWith('| ')) {
            // Simple table rendering
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
          ← 返回文章列表
        </Link>
      </div>
    </div>
  )
}
