'use client'

import { useState } from 'react'
import { tools, getToolBySlug, localizeTool } from '@/data/tools'
import { getCategoryName } from '@/data/categories'
import AffiliateLink from '@/components/AffiliateLink'
import { useLanguage } from '@/lib/language-context'

type CompareTool = NonNullable<ReturnType<typeof getToolBySlug>>

export default function ComparePage() {
  const [selected1, setSelected1] = useState('notion')
  const [selected2, setSelected2] = useState('jira')
  const { t, language } = useLanguage()

  const tool1 = getToolBySlug(selected1)
  const tool2 = getToolBySlug(selected2)

  const allFeatures = tool1 && tool2
    ? Array.from(new Set([...tool1.featuresDe, ...tool2.featuresDe]))
    : []

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('compare.title')}</h1>
      <p className="text-gray-600 mb-8">{t('compare.desc')}</p>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('compare.toolA')}</label>
          <select
            value={selected1}
            onChange={(e) => setSelected1(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            {tools.map((t) => {
              const localized = localizeTool(t, language)
              return <option key={t.id} value={t.slug}>{localized.name}</option>
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('compare.toolB')}</label>
          <select
            value={selected2}
            onChange={(e) => setSelected2(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            {tools.map((t) => {
              const localized = localizeTool(t, language)
              return <option key={t.id} value={t.slug}>{localized.name}</option>
            })}
          </select>
        </div>
      </div>

      {tool1 && tool2 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-gray-200">
            <div className="p-6 bg-gray-50" />
            <div className="p-6 text-center border-l border-gray-200">
              <span className="text-3xl block mb-2">{tool1.logo}</span>
              <h3 className="font-semibold text-lg">{localizeTool(tool1, language).name}</h3>
              <div className="flex items-center justify-center gap-1 mt-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span>{tool1.rating}</span>
              </div>
            </div>
            <div className="p-6 text-center border-l border-gray-200">
              <span className="text-3xl block mb-2">{tool2.logo}</span>
              <h3 className="font-semibold text-lg">{localizeTool(tool2, language).name}</h3>
              <div className="flex items-center justify-center gap-1 mt-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span>{tool2.rating}</span>
              </div>
            </div>
          </div>

          {/* Category */}
          <CompareRow label={t('compare.label.category')} v1={getCategoryName(tool1.categorySlug, language)} v2={getCategoryName(tool2.categorySlug, language)} highlight />

          {/* Pricing */}
          <CompareRow label={t('compare.label.pricing')} v1={tool1.pricing === 'free' ? t('tool.pricing.free') : tool1.pricing === 'freemium' ? t('tool.pricing.freemium') : t('tool.pricing.paid')} v2={tool2.pricing === 'free' ? t('tool.pricing.free') : tool2.pricing === 'freemium' ? t('tool.pricing.freemium') : t('tool.pricing.paid')} />
          <CompareRow label={t('compare.label.range')} v1={tool1.priceRange} v2={tool2.priceRange} highlight />

          {/* Description */}
          <CompareRow label={t('compare.label.desc')} v1={localizeTool(tool1, language).description} v2={localizeTool(tool2, language).description} />

          {/* Features */}
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="p-4 bg-gray-50 font-medium text-sm text-gray-700">{t('compare.label.features')}</div>
            <div className="p-4 border-l border-gray-100">
              <ul className="space-y-1">
                {localizeTool(tool1, language).features.map((f) => (
                  <li key={f} className="text-sm text-gray-700 flex items-center gap-1">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-l border-gray-100">
              <ul className="space-y-1">
                {localizeTool(tool2, language).features.map((f) => (
                  <li key={f} className="text-sm text-gray-700 flex items-center gap-1">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pros */}
          <CompareRow label={t('compare.label.pros')} v1={localizeTool(tool1, language).pros.join('；')} v2={localizeTool(tool2, language).pros.join('；')} highlight />

          {/* Cons */}
          <CompareRow label={t('compare.label.cons')} v1={localizeTool(tool1, language).cons.join('；')} v2={localizeTool(tool2, language).cons.join('；')} />

          {/* Suitable For */}
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="p-4 bg-gray-50 font-medium text-sm text-gray-700">{t('compare.label.audience')}</div>
            <div className="p-4 border-l border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {localizeTool(tool1, language).suitableFor.map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-4 border-l border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {localizeTool(tool2, language).suitableFor.map((s) => (
                  <span key={s} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="p-4 bg-gray-50 font-medium text-sm text-gray-700">{t('compare.label.website')}</div>
            <div className="p-4 border-l border-gray-100 text-center">
              <AffiliateLink
                href={tool1.affiliateUrl ?? tool1.website}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
              >
                {t('compare.visit', { name: localizeTool(tool1, language).name })}
              </AffiliateLink>
            </div>
            <div className="p-4 border-l border-gray-100 text-center">
              <AffiliateLink
                href={tool2.affiliateUrl ?? tool2.website}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
              >
                {t('compare.visit', { name: localizeTool(tool2, language).name })}
              </AffiliateLink>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CompareRow({ label, v1, v2, highlight = false }: { label: string; v1: string; v2: string; highlight?: boolean }) {
  const bg = highlight ? 'bg-gray-50' : ''
  return (
    <div className={`grid grid-cols-3 border-b border-gray-100 ${bg}`}>
      <div className="p-4 bg-gray-50 font-medium text-sm text-gray-700">{label}</div>
      <div className="p-4 border-l border-gray-100 text-sm text-gray-700">{v1}</div>
      <div className="p-4 border-l border-gray-100 text-sm text-gray-700">{v2}</div>
    </div>
  )
}
