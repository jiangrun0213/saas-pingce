'use client'

import { useLanguage } from '@/lib/language-context'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('page.about')}</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Über SaaS-Vergleich</h2>
          <p>SaaS-Vergleich ist eine Plattform zur Informationssammlung und Bewertung von SaaS-Produkten. Wir helfen Unternehmen und Einzelpersonen, die Unterschiede und Besonderheiten verschiedener Software-Tools zu verstehen.</p>
          <p className="mt-2">Auf unserer Plattform findest du Produkte aus den Bereichen Projektmanagement, Zusammenarbeit, KI, CRM, Entwicklung, Datenanalyse, Marketing, Personal, Finanzen und Design – mit detaillierten Vergleichsmöglichkeiten.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Datenquellen und Methodik</h2>
          <p>Unsere Informationen stammen aus folgenden Quellen:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Offizielle Websites der Tools mit Preis- und Funktionsangaben</li>
            <li>Produktdokumentation und Helpcenter</li>
            <li>Nutzerbewertungen und Community-Feedback</li>
            <li>Branchenberichte und Tests von Drittanbietern</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Redaktionsrichtlinien</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Objektiv und neutral</strong> – Datenbasierte Vergleiche ohne Bevorzugung bestimmter Tools</li>
            <li><strong>Präzise und zuverlässig</strong> – Informationen aus offiziellen Quellen, regelmäßig aktualisiert</li>
            <li><strong>Umfassend</strong> – Abdeckung von etablierten Tools, neuen Produkten und Nischenlösungen</li>
            <li><strong>Transparent</strong> – Kennzeichnung von KI-gestützten Inhalten und Affiliate-Links</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">KI-Technologie</h2>
          <p>Wir nutzen KI-Technologie zur Unterstützung der Inhaltserstellung. KI-generierte Inhalte werden vor der Veröffentlichung manuell geprüft.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Werbetreibende und Affiliate-Marketing</h2>
          <p>Diese Website nutzt Affiliate-Marketing und Werbung zur Deckung der Betriebskosten. Die Höhe der Provision hat keinen Einfluss auf die Bewertung oder Platzierung der Tools.</p>
        </section>
      </div>
    </div>
  )
}
