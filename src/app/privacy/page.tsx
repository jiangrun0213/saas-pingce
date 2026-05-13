import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung gemäß DSGVO – Informationen zur Verarbeitung personenbezogener Daten auf SaaS-Vergleich',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Datenschutzerklärung</h1>
      <p className="text-sm text-gray-500 mb-8">Letzte Aktualisierung: 13. Mai 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Datenschutz auf einen Blick</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst. Ausführliche Informationen zum Thema Datenschutz entnimmst du unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Datenerfassung auf dieser Website</h3>
          <p><strong>Wer ist verantwortlich für die Datenerfassung?</strong></p>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten findest du im <a href="/impressum" className="text-blue-600 hover:underline">Impressum</a>.</p>

          <p className="mt-3"><strong>Wie erfassen wir deine Daten?</strong></p>
          <p>Deine Daten werden zum einen dadurch erhoben, dass du sie uns mitteilst. Hierbei kann es sich z. B. um Daten handeln, die du in unser Kontaktformular eingibst.</p>
          <p className="mt-1">Andere Daten werden automatisch oder nach deiner Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald du diese Website betrittst.</p>

          <p className="mt-3"><strong>Wofür nutzen wir deine Daten?</strong></p>
          <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse deines Nutzerverhaltens verwendet werden.</p>

          <p className="mt-3"><strong>Welche Rechte hast du bezüglich deiner Daten?</strong></p>
          <p>Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck deiner gespeicherten personenbezogenen Daten zu erhalten. Du hast außerdem ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wenn du uns eine Einwilligung zur Datenverarbeitung erteilt hast, kannst du diese Einwilligung jederzeit für die Zukunft widerrufen. Du hast außerdem das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen. Des Weiteren steht dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Hosting</h2>
          <p>
            Diese Website wird bei <strong>Vercel Inc.</strong> gehostet. Vercel ist ein Dienst der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel verarbeitet personenbezogene Daten (z. B. IP-Adressen) nur im Rahmen der Bereitstellung der Hosting-Dienstleistung.
          </p>
          <p className="mt-2">
            Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unseres Angebots).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Datenschutz</h3>
          <p>
            Der Betreiber dieser Seite nimmt den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Hinweis zur verantwortlichen Stelle</h3>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2">
            <p>Jiang Run</p>
            <p>[Adresse – noch einzutragen]</p>
            <p className="mt-1">E-Mail: contact@saas-xuanxing.com</p>
          </div>
          <p className="mt-2">
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Widerruf deiner Einwilligung zur Datenverarbeitung</h3>
          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit deiner ausdrücklichen Einwilligung möglich. Du kannst eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Beschwerderecht bei der Aufsichtsbehörde</h3>
          <p>
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Recht auf Datenübertragbarkeit</h3>
          <p>
            Du hast das Recht, Daten, die wir auf Grundlage deiner Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an dich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern du die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangst, erfolgt dies nur, soweit es technisch machbar ist.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Datenerfassung auf dieser Website</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Cookies</h3>
          <p>
            Diese Website verwendet keine Cookies für Analyse- oder Tracking-Zwecke. Technisch notwendige Cookies (z. B. Session-Cookies, die für den grundlegenden Betrieb der Website erforderlich sind) können jedoch zum Einsatz kommen. Diese Cookies werden ohne deine ausdrückliche Einwilligung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten (Vercel) erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch übermittelt. Dies sind:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p className="mt-2">
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Kontaktaufnahme</h3>
          <p>
            Bei Kontaktaufnahme mit uns (z. B. per E-Mail) werden deine Angaben zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.
          </p>
          <p className="mt-1">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern deine Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Affiliate-Links (Partnerlinks)</h2>
          <p>
            Auf dieser Website verwenden wir Affiliate-Links. Wenn du auf einen Affiliate-Link klickst und anschließend einen Kauf tätigst, erhalten wir eine Provision. Dabei wird ggf. die Tatsache, dass du auf einen Affiliate-Link geklickt hast, an den jeweiligen Partner übermittelt. Dies dient der Abrechnung der Provision und ist erforderlich, um die Partnerprogramme betreiben zu können.
          </p>
          <p className="mt-2">
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der wirtschaftlichen Betriebsführung der Website).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. SSL-/TLS-Verschlüsselung</h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die du an uns als Seitenbetreiber sendest, eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in deiner Browserzeile.
          </p>
          <p className="mt-2">
            Wenn die SSL-/TLS-Verschlüsselung aktiviert ist, können die Daten, die du an uns übermittelst, nicht von Dritten mitgelesen werden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für deinen erneuten Besuch gilt dann die neue Datenschutzerklärung.
          </p>
        </section>
      </div>
    </div>
  )
}
