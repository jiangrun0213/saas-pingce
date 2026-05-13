import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Über SaaS-Vergleich – Unabhängige SaaS-Vergleiche und Bewertungen für bessere Software-Entscheidungen',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Über uns</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Über SaaS-Vergleich</h2>
          <p>
            SaaS-Vergleich ist eine Plattform zur Informationssammlung und Bewertung von SaaS-Produkten. Wir helfen Unternehmen und Einzelpersonen, die Unterschiede und Besonderheiten verschiedener Software-Tools zu verstehen.
          </p>
          <p className="mt-2">
            Auf unserer Plattform findest du Produkte aus den Bereichen Projektmanagement, Zusammenarbeit, KI, CRM, Entwicklung, Datenanalyse, Marketing, Personal, Finanzen und Design – mit detaillierten Vergleichsmöglichkeiten.
          </p>
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
          <p className="mt-2">
            Preisinformationen werden regelmäßig aktualisiert. Alle Datenquellen sind transparent und nachvollziehbar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Redaktionsrichtlinien</h2>
          <p>Unsere Inhalte folgen diesen Grundsätzen:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Objektiv und neutral</strong> – Datenbasierte Vergleiche ohne Bevorzugung bestimmter Tools</li>
            <li><strong>Präzise und zuverlässig</strong> – Informationen aus offiziellen Quellen, regelmäßig aktualisiert</li>
            <li><strong>Umfassend</strong> – Abdeckung von etablierten Tools, neuen Produkten und Nischenlösungen</li>
            <li><strong>Transparent</strong> – Kennzeichnung von KI-gestützten Inhalten und Affiliate-Links</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">KI-Technologie</h2>
          <p>
            Wir nutzen KI-Technologie zur Unterstützung der Inhaltserstellung, einschließlich:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Generierung deutscher Inhalte aus offiziellen Dokumentationen und englischsprachigen Quellen</li>
            <li>Extraktion und Strukturierung von Vergleichspunkten zwischen Tools</li>
            <li>Zusammenstellung von FAQ, Vor- und Nachteilen</li>
          </ul>
          <p className="mt-2">
            KI-generierte Inhalte werden vor der Veröffentlichung manuell geprüft, um die inhaltliche Richtigkeit sicherzustellen. Jeder Artikel enthält Quellenangaben.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Werbetreibende und Affiliate-Marketing</h2>
          <p>
            Diese Website nutzt Affiliate-Marketing und Werbung zur Deckung der Betriebskosten. Affiliate-Links sind mit dem Attribut <code>rel="sponsored"</code> gekennzeichnet. Die Höhe der Provision hat keinen Einfluss auf die Bewertung oder Platzierung der Tools. Wenn du über unsere Affiliate-Links ein Produkt kaufst, erhalten wir möglicherweise eine Provision – der Preis für dich ändert sich dadurch nicht.
          </p>
        </section>
      </div>
    </div>
  )
}
