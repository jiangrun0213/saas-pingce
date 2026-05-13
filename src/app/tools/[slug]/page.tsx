import { notFound } from 'next/navigation'
import { tools, getToolBySlug } from '@/data/tools'
import ToolDetailClient from './ToolDetailClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}
  return {
    title: `${tool.nameDe} im Test – Funktionen, Preise und Bewertung`,
    description: `${tool.nameDe} im Test: ${tool.descriptionDe.slice(0, 100)}`,
  }
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()
  return <ToolDetailClient tool={tool} />
}
