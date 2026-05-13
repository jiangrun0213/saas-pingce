'use client'

import Link from 'next/link'
import { Tool } from '@/types'
import { tools, localizeTool } from '@/data/tools'
import { getCategoryName } from '@/data/categories'
import AffiliateLink from '@/components/AffiliateLink'
import AdSense from '@/components/AdSense'
import { useLanguage } from '@/lib/language-context'

interface Props {
  tool: Tool
}

export default function ToolDetailClient({ tool }: Props) {
  const { t, language } = useLanguage()
  const localized = localizeTool(tool, language)
  const categoryName = getCategoryName(tool.categorySlug, language)
  const relatedTools = tools
    .filter((t) => t.categorySlug === tool.categorySlug && t.id !== tool.id)
    .slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">{t('tool.breadcrumb.home')}</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">{t('tool.breadcrumb.tools')}</Link>
        <span>/</span>
        <Link href={`/categories/${tool.categorySlug}`} className="hover:text-blue-600">{categoryName}</Link>
        <span>/</span>
        <span className="text-gray-900">{localized.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="flex items-start gap-6">
          <span className="text-5xl">{tool.logo}</span>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">{localized.name}</h1>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{categoryName}</span>
              <span className="text-sm bg-gray-50 text-gray-600 px-3 py-1 rounded-full">
                {tool.pricing === 'free' ? t('tool.pricing.free') : tool.pricing === 'freemium' ? t('tool.pricing.freemium') : t('tool.pricing.paid')}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{tool.rating}</span>
                <span className="text-gray-400">({tool.reviewCount.toLocaleString()} {t('tool.reviews')})</span>
              </div>
            </div>
            <p className="text-gray-600 mt-4 leading-relaxed">{localized.description}</p>
            <div className="flex items-center gap-3 mt-6">
              <AffiliateLink
                href={tool.affiliateUrl ?? tool.website}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
              >
                {t('tool.visit')}
              </AffiliateLink>
              <span className="text-sm text-gray-500">{t('tool.price')} {tool.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      <AdSense />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Features */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('tool.features')}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {localized.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('tool.audience')}</h2>
            <div className="flex flex-wrap gap-2">
              {localized.suitableFor.map((s) => (
                <span key={s} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-green-200 p-6">
            <h2 className="text-lg font-semibold text-green-800 mb-3">{t('tool.pros')}</h2>
            <ul className="space-y-2">
              {localized.pros.map((p) => (
                <li key={p} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">+</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-red-200 p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-3">{t('tool.cons')}</h2>
            <ul className="space-y-2">
              {localized.cons.map((c) => (
                <li key={c} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">-</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('tool.related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rt) => {
              const rtLocalized = localizeTool(rt, language)
              return (
                <Link
                  key={rt.id}
                  href={`/tools/${rt.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{rt.logo}</span>
                  <div>
                    <div className="font-medium text-gray-900">{rtLocalized.name}</div>
                    <div className="text-sm text-gray-500">★ {rt.rating}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
