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

      {/* Review Section (for China-Tools) */}
      {localized.review && (
        <div className="space-y-6 mb-8">
          {/* Rating Dimensions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('review.title')}</h2>
            <div className="space-y-4">
              {localized.review.ratingDimensions.map((dim) => {
                const pct = (dim.score / 10) * 100
                const barColor = dim.score >= 7 ? 'bg-green-500' : dim.score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                return (
                  <div key={dim.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{dim.label}</span>
                      <span className="text-gray-500">{dim.score}/10</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* German Support */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('review.interface')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">{localized.review.germanSupport.interface ? '✅' : '❌'}</span>
                <span className="text-gray-700">{t('review.interface')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">{localized.review.germanSupport.docs ? '✅' : '❌'}</span>
                <span className="text-gray-700">{t('review.docs')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">{localized.review.germanSupport.support ? '✅' : '❌'}</span>
                <span className="text-gray-700">{t('review.support')}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{localized.review.germanSupport.description}</p>
          </div>

          {/* DSGVO Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('review.dsgvoStatus')}</h2>
            <div className="flex items-center gap-3 mb-3">
              {(() => {
                const statusColors: Record<string, string> = {
                  'vollständig': 'bg-green-100 text-green-800 border-green-300',
                  'teilweise': 'bg-yellow-100 text-yellow-800 border-yellow-300',
                  'ungeprüft': 'bg-gray-100 text-gray-800 border-gray-300',
                  'nicht zutreffend': 'bg-blue-100 text-blue-800 border-blue-300',
                }
                const statusKey = tool.review!.dsgvoStatus
                const colorClass = statusColors[statusKey] || 'bg-gray-100 text-gray-800'
                const labelKey = `review.dsgvo${statusKey === 'vollständig' ? 'Full' : statusKey === 'teilweise' ? 'Partial' : statusKey === 'ungeprüft' ? 'Unchecked' : 'Na'}`
                return (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
                    {t(labelKey)}
                  </span>
                )
              })()}
            </div>
            <p className="text-sm text-gray-600">{localized.review.dsgvoNotes}</p>
          </div>

          {/* Full Review Text */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('review.fullReview')}</h2>
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {localized.review.review}
            </div>
          </div>

          {/* German Alternatives */}
          {localized.review.germanAlternatives.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('review.germanAlternatives')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {localized.review.germanAlternatives.map((altSlug) => {
                  const altTool = tools.find((t) => t.slug === altSlug)
                  if (!altTool) return null
                  const altLocalized = localizeTool(altTool, language)
                  return (
                    <Link
                      key={altSlug}
                      href={`/tools/${altSlug}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl">{altTool.logo}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{altLocalized.name}</div>
                        <div className="text-xs text-gray-500">★ {altTool.rating}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Best For */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('review.bestFor')}</h2>
            <div className="flex flex-wrap gap-2">
              {localized.review.bestFor.map((item) => (
                <span key={item} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

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
