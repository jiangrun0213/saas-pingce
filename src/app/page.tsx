'use client'

import Link from 'next/link'
import { tools } from '@/data/tools'
import { categories } from '@/data/categories'
import { chinaSubCategories } from '@/data/categories'
import { articles } from '@/data/articles'
import ToolCard from '@/components/ToolCard'
import CategoryGrid from '@/components/CategoryGrid'
import AdSense from '@/components/AdSense'
import { useLanguage } from '@/lib/language-context'
import { localizeArticle } from '@/data/articles'

export default function HomePage() {
  const { t, language } = useLanguage()
  const chinaTools = tools.filter((t) => t.categorySlug === 'china-tools')
  const featuredChinaTools = chinaTools
    .filter((t) => t.rating >= 4.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <div>
      {/* China-Tools Hero */}
      <section className="bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {t('home.chinaHero.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.chinaHero.subtitle')}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/china-tools"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              {t('home.chinaHero.cta')}
            </Link>
            <Link
              href="/tools"
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition-colors"
            >
              {t('home.chinaHero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      <AdSense />

      {/* Bewertungsdimensionen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.dimensions.title')}</h2>
          <p className="mt-2 text-gray-600">{t('home.dimensions.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-all">
            <div className="text-3xl mb-3">🗣️</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('review.dimLanguage')}</h3>
            <p className="text-sm text-gray-600">{language === 'zh' ? '评估界面、文档和客服的德语支持程度' : 'Bewertung der deutschen Sprachunterstützung in UI, Dokumentation und Kundenservice.'}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-all">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('review.dimFeatures')}</h3>
            <p className="text-sm text-gray-600">{language === 'zh' ? '功能完整度及与西方替代品的对比' : 'Umfang und Qualität der Funktionen im Vergleich zu westlichen Alternativen.'}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-all">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('review.dimPrivacy')}</h3>
            <p className="text-sm text-gray-600">{language === 'zh' ? 'DSGVO合规性、服务器位置和数据保护实践' : 'DSGVO-Konformität, Serverstandorte und Datenschutzpraktiken.'}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-all">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('review.dimValue')}</h3>
            <p className="text-sm text-gray-600">{language === 'zh' ? '性价比及与德国替代品的成本对比' : 'Preis-Leistungs-Verhältnis, Kosten im Vergleich zu deutschen Alternativen.'}</p>
          </div>
        </div>
      </section>

      {/* Empfohlene China-Tools */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('home.featuredChina')}</h2>
            <Link href="/china-tools" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t('home.showAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChinaTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Kategorien-Navigation für China-Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('home.chinaSubtitle', { categories: chinaSubCategories.length })}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {chinaSubCategories.map((sub) => {
            const count = chinaTools.filter((t) => t.subCategory === sub.slug).length
            return (
              <Link
                key={sub.slug}
                href={`/china-tools/${sub.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="text-3xl mb-2">{sub.icon}</div>
                <div className="font-medium text-sm text-gray-900">{language === 'zh' ? sub.nameZh : sub.nameDe}</div>
                <div className="text-xs text-gray-500 mt-1">{count} Tools</div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Neueste Artikel */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('home.latest')}</h2>
            <Link href="/articles" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t('home.showAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((article) => {
              const localized = localizeArticle(article, language)
              return (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{localized.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{localized.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{localized.excerpt}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Alle Kategorien */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('home.categories')}</h2>
        <CategoryGrid />
      </section>
    </div>
  )
}
