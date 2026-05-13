import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Haftungsausschluss – Nutzungsbedingungen',
  description: 'Haftungsausschluss und Nutzungsbedingungen von SaaS-Vergleich – Informationen zu KI-Inhalten, Affiliate-Links und Urheberrecht',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Haftungsausschluss & Nutzungsbedingungen</h1>
      <p className="text-sm text-gray-500 mb-8">Letzte Aktualisierung: 13. Mai 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Richtigkeit der Informationen</h2>
          <p>
            Diese Website bemüht sich, korrekte und aktuelle Informationen über SaaS-Produkte bereitzustellen, übernimmt jedoch **keine Gewähr für Vollständigkeit, Richtigkeit und Aktualität** der bereitgestellten Inhalte. Preise, Funktionen und Spezifikationen der einzelnen Tools können sich jederzeit ändern.
          </p>
          <p className="mt-2">
            Vor Kauf- oder Vertragsentscheidungen sollten die aktuellen Informationen direkt auf der offiziellen Website des jeweiligen Anbieters oder durch eine kostenlose Testversion eingeholt werden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. KI-generierte Inhalte</h2>
          <p>
            Ein Teil der Inhalte auf dieser Website wird mithilfe von KI-Technologie erstellt. Wir bemühen uns um größtmögliche Genauigkeit, jedoch können KI-generierte Inhalte gelegentlich Abweichungen oder Fehlinterpretationen enthalten. Für wichtige Entscheidungen empfehlen wir die direkte Überprüfung über offizielle Kanäle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Externe Links und Affiliate-Marketing</h2>
          <p>
            Diese Website enthält Links zu externen Websites Dritter. Wir übernehmen keine Verantwortung für den Inhalt, die Sicherheit oder die Datenschutzpraktiken dieser Websites.
          </p>
          <p className="mt-2">
            Einige Links auf dieser Website sind **Affiliate-Links (Partnerlinks)**, gekennzeichnet mit dem Attribut <code>rel="sponsored"</code>. Wenn du über diese Links ein Produkt oder eine Dienstleistung erwirbst, erhalten wir möglicherweise eine Provision. Dies hat keinen Einfluss auf den Kaufpreis und auch nicht auf unsere objektive Bewertung der Produkte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Urheberrecht</h2>
          <p>
            Alle auf dieser Website veröffentlichten Texte, Grafiken und Daten sind urheberrechtlich geschützt. Eine Vervielfältigung oder Weiterverwendung bedarf der vorherigen schriftlichen Zustimmung des Betreibers.
          </p>
          <p className="mt-2">
            Die Logos, Marken und Produktbezeichnungen der einzelnen Tools sind Eigentum ihrer jeweiligen Inhaber und werden auf dieser Website nur im Rahmen des Zitatrechts verwendet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Verbotene Nutzung</h2>
          <p>Bei der Nutzung dieser Website ist Folgendes untersagt:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Unberechtigte Vervielfältigung oder Weiterverbreitung von Website-Inhalten</li>
            <li>Rechtswidriger Zugriff oder Angriffe auf die Website</li>
            <li>Massendatenextraktion durch Crawler oder Skripte</li>
            <li>Beeinträchtigung des normalen Website-Betriebs</li>
            <li>Nutzung unter Verstoß gegen geltendes Recht</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Anwendbares Recht</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Kontakt</h2>
          <p>Bei Fragen zu diesem Haftungsausschluss oder den Nutzungsbedingungen kontaktiere uns bitte:</p>
          <p className="mt-1">E-Mail: <a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline">contact@saas-xuanxing.com</a></p>
        </section>
      </div>
    </div>
  )
}
