'use client'

import { useLanguage } from '@/lib/language-context'

export default function DisclaimerPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('page.disclaimer')}</h1>
      <p className="text-sm text-gray-500 mb-8">Letzte Aktualisierung: 13. Mai 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Richtigkeit der Informationen</h2>
          <p>Diese Website bemüht sich, korrekte und aktuelle Informationen über SaaS-Produkte bereitzustellen, übernimmt jedoch keine Gewähr für Vollständigkeit, Richtigkeit und Aktualität der bereitgestellten Inhalte.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. KI-generierte Inhalte</h2>
          <p>Ein Teil der Inhalte auf dieser Website wird mithilfe von KI-Technologie erstellt. Für wichtige Entscheidungen empfehlen wir die direkte Überprüfung über offizielle Kanäle.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Externe Links und Affiliate-Marketing</h2>
          <p>Diese Website enthält Links zu externen Websites Dritter. Einige Links sind Affiliate-Links (Partnerlinks), gekennzeichnet mit <code>rel=&quot;sponsored&quot;</code>. Wenn du über diese Links ein Produkt erwirbst, erhalten wir möglicherweise eine Provision.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Urheberrecht</h2>
          <p>Alle auf dieser Website veröffentlichten Texte, Grafiken und Daten sind urheberrechtlich geschützt.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Anwendbares Recht</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Kontakt</h2>
          <p>E-Mail: <a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline">contact@saas-xuanxing.com</a></p>
        </section>
      </div>
    </div>
  )
}
