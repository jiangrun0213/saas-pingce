'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { getSiteName } from '@/lib/config'
import { chinaSubCategories } from '@/data/categories'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chinaToolsOpen, setChinaToolsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="text-2xl">🔍</span>
            <span>{getSiteName(language)}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {/* China-Tools Dropdown */}
            <div className="relative group">
              <Link
                href="/china-tools"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                {t('nav.chinaTools')}
                <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="py-2">
                  {chinaSubCategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/china-tools/${sub.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <span className="mr-2">{sub.icon}</span>
                      {language === 'zh' ? sub.nameZh : sub.nameDe}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href="/china-tools"
                      className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {t('nav.chinaTools')} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('nav.tools')}
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('nav.categories')}
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('nav.articles')}
            </Link>
            <Link href="/compare" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('nav.compare')}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'de' ? 'zh' : 'de')}
              className="ml-2 px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              {t('nav.lang')}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLanguage(language === 'de' ? 'zh' : 'de')}
              className="px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-600 hover:border-blue-400 transition-colors"
            >
              {t('nav.lang')}
            </button>
            <button
              className="p-2 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              {/* China-Tools in mobile */}
              <button
                onClick={() => setChinaToolsOpen(!chinaToolsOpen)}
                className="flex items-center justify-between text-gray-600 hover:text-blue-600 px-2 py-1"
              >
                <span>{t('nav.chinaTools')}</span>
                <svg className={`w-4 h-4 transition-transform ${chinaToolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {chinaToolsOpen && (
                <div className="pl-4 flex flex-col gap-2">
                  {chinaSubCategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/china-tools/${sub.slug}`}
                      className="text-gray-500 hover:text-blue-600 px-2 py-1 text-sm"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="mr-2">{sub.icon}</span>
                      {language === 'zh' ? sub.nameZh : sub.nameDe}
                    </Link>
                  ))}
                  <Link
                    href="/china-tools"
                    className="text-blue-600 hover:text-blue-700 px-2 py-1 text-sm font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('nav.chinaTools')} →
                  </Link>
                </div>
              )}
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                {t('nav.tools')}
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                {t('nav.categories')}
              </Link>
              <Link href="/articles" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                {t('nav.articles')}
              </Link>
              <Link href="/compare" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                {t('nav.compare')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
