import type { Metadata } from 'next'
import Script from 'next/script'
import { SITE_CONFIG, ADSENSE_CONFIG } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.nameDe} - SaaS-Vergleich und Bewertung`,
    template: `%s | ${SITE_CONFIG.nameDe}`,
  },
  description: SITE_CONFIG.descriptionDe,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de-DE" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>

        {ADSENSE_CONFIG.enabled && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.clientId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  )
}
