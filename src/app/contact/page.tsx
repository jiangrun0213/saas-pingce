import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Hast du Fragen, Anregungen oder möchtest du mit uns zusammenarbeiten? Wir freuen uns auf deine Nachricht.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Kontakt</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Hast du Fragen, Anregungen oder möchtest du mit uns zusammenarbeiten?
          Wir antworten in der Regel innerhalb von 1–2 Werktagen.
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">E-Mail</h2>
              <a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline text-lg">
                contact@saas-xuanxing.com
              </a>
              <p className="text-sm text-gray-500 mt-1">Antwort innerhalb von 24 Stunden an Werktagen</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🤝</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Kooperation und Gastbeiträge</h2>
              <p>SaaS-Anbieter können uns gerne kontaktieren, um Produktinformationen einzureichen. Auch Gastbeiträge sind willkommen.</p>
              <p className="mt-1">Sende bitte eine Gliederung deines Beitrags an: <a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline">contact@saas-xuanxing.com</a></p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🔗</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Affiliate-Partnerschaft</h2>
              <p>SaaS-Anbieter, die an unserem Affiliate-Programm teilnehmen möchten, senden bitte eine E-Mail mit dem Betreff &quot;Affiliate-Partnerschaft&quot;.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
