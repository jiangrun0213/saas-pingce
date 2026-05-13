'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/config'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="text-2xl">🔍</span>
            <span>{SITE_CONFIG.name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition-colors">
              Alle Tools
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
              Kategorien
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-blue-600 transition-colors">
              Artikel
            </Link>
            <Link href="/compare" className="text-gray-600 hover:text-blue-600 transition-colors">
              Vergleichen
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
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

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                Alle Tools
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                Kategorien
              </Link>
              <Link href="/articles" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                Artikel
              </Link>
              <Link href="/compare" className="text-gray-600 hover:text-blue-600 px-2 py-1" onClick={() => setMenuOpen(false)}>
                Vergleichen
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
