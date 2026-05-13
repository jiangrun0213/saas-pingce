'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { getSiteName } from '@/lib/config'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
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
