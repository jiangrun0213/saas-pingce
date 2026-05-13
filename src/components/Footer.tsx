import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              SaaS-Tools vergleichen und bewerten – Finde die passende Software für dein Unternehmen.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 text-sm">Alle Tools</Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 text-sm">Kategorien</Link>
              <Link href="/compare" className="text-gray-600 hover:text-blue-600 text-sm">Vergleichen</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rechtliches</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">Über uns</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">Kontakt</Link>
              <Link href="/impressum" className="text-gray-600 hover:text-blue-600 text-sm">Impressum</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">Datenschutz</Link>
              <Link href="/disclaimer" className="text-gray-600 hover:text-blue-600 text-sm">Haftungsausschluss</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}
