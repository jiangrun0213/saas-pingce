import { notFound } from 'next/navigation'
import { articles, getArticleBySlug } from '@/data/articles'
import ArticleDetailClient from './ArticleDetailClient'
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
    title: article.titleDe,
    description: article.excerptDe,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()
  return <ArticleDetailClient article={article} />
}
