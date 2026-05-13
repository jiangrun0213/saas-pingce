import { notFound } from 'next/navigation'
import { chinaSubCategories } from '@/data/categories'
import { tools } from '@/data/tools'
import ChinaSubcategoryClient from './ChinaSubcategoryClient'
import type { Metadata } from 'next'
import type { ChinaSubCategory } from '@/data/categories'

export function generateStaticParams() {
  return chinaSubCategories.map((sub) => ({ subCategory: sub.slug }))
}

export function generateMetadata({ params }: { params: { subCategory: string } }): Metadata {
  const sub = chinaSubCategories.find((s) => s.slug === params.subCategory)
  if (!sub) return { title: 'China-Tools' }
  return {
    title: `${sub.nameDe} – China-Tools für Deutschland`,
    description: sub.descriptionDe,
  }
}

export default function Page({ params }: { params: { subCategory: string } }) {
  const sub = chinaSubCategories.find((s) => s.slug === params.subCategory)
  if (!sub) notFound()

  const chinaTools = tools.filter((t) => t.categorySlug === 'china-tools')
  const filteredTools = chinaTools.filter((t) => t.subCategory === params.subCategory)

  return <ChinaSubcategoryClient sub={sub} tools={filteredTools} />
}
