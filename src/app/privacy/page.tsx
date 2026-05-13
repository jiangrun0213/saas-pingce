'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('page.privacy')}</h1>
      <p className="text-sm text-gray-500 mb-8">Letzte Aktualisierung: 13. Mai 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Datenschutz auf einen Blick</h2>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst.</p>
          <p className="mt-2">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten findest du im <Link href="/impressum" className="text-blue-600 hover:underline">Impressum</Link>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Hosting</h2>
          <p>Diese Website wird bei <strong>Vercel Inc.</strong> gehostet. Vercel verarbeitet personenbezogene Daten (z. B. IP-Adressen) nur im Rahmen der Bereitstellung der Hosting-Dienstleistung.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Datenerfassung auf dieser Website</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Cookies</h3>
          <p>Diese Website verwendet keine Cookies für Analyse- oder Tracking-Zwecke. Technisch notwendige Cookies können jedoch zum Einsatz kommen.</p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Server-Log-Dateien</h3>
          <p>Der Provider der Seiten (Vercel) erhebt und speichert automatisch Informationen in Server-Log-Dateien, die dein Browser automatisch übermittelt. Dies sind Browsertyp, Betriebssystem, Referrer URL, Hostname, Uhrzeit und anonymisierte IP-Adresse.</p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Kontaktaufnahme</h3>
          <p>Bei Kontaktaufnahme mit uns (z. B. per E-Mail) werden deine Angaben zur Bearbeitung der Anfrage gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Ihre Rechte</h2>
          <p>Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten. Dir steht außerdem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. SSL-/TLS-Verschlüsselung</h2>
          <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung.</p>
        </section>
      </div>
    </div>
  )
}
