'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { getSiteName } from '@/lib/config'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{getSiteName('de')}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('footer.title')}</h3>
            <div className="flex flex-col gap-2">
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 text-sm">{t('nav.tools')}</Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 text-sm">{t('nav.categories')}</Link>
              <Link href="/compare" className="text-gray-600 hover:text-blue-600 text-sm">{t('nav.compare')}</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('footer.legal')}</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.about')}</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.contact')}</Link>
              <Link href="/impressum" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.impressum')}</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.privacy')}</Link>
              <Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.disclaimer')}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {getSiteName('de')}. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
