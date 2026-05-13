'use client'

import { useLanguage } from '@/lib/language-context'

export default function ImpressumPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('page.impressum')}</h1>
      <p className="text-sm text-gray-500 mb-8">Angaben gemäß § 5 TMG</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Betreiber dieser Website</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-900 w-36">Name</td>
                  <td className="py-3 text-gray-700">Jiang Run</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-900">E-Mail</td>
                  <td className="py-3 text-gray-700">contact@saas-xuanxing.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">EU-Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a></p>
        </section>
      </div>
    </div>
  )
}
