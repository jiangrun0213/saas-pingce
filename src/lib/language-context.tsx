'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Language } from '@/types'
import { t as translate, tInterpolate } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('saas-vergleich-lang')
    if (stored === 'de' || stored === 'zh') {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('saas-vergleich-lang', lang)
    document.documentElement.lang = lang === 'de' ? 'de-DE' : 'zh-CN'
  }, [])

  const tFn = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      if (params) {
        return tInterpolate(key, language, params)
      }
      return translate(key, language)
    },
    [language]
  )

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'de', setLanguage, t: (key) => translate(key, 'de') }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tFn }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
