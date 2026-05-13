export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  categorySlug: string
  readTime: string
  tags: string[]
}

export const articles: Article[] = [
  {
    slug: 'dirtyfrag-cve-2026-43284-analysis',
    title: 'DirtyFrag (CVE-2026-43284) – Kritische Linux-LPE-Sicherheitslücke: Analyse und Schutzmaßnahmen',
    excerpt: 'Die am 7. Mai 2026 enthüllte kritische Linux-Kernel-Lücke DirtyFrag betrifft alle Distributionen der letzten 9 Jahre. Eine detaillierte Analyse der Exploit-Kette, der betroffenen Systeme und der empfohlenen Sicherheitsmaßnahmen.',
    date: '13.05.2026',
    category: 'Sicherheitsanalyse',
    categorySlug: 'security',
    readTime: '8 Minuten',
    tags: ['CVE-2026-43284', 'DirtyFrag', 'Linux-Sicherheit', 'LPE', 'Sicherheitsanalyse'],
    content: `
## Übersicht

Am 7. Mai 2026 veröffentlichte der Sicherheitsforscher Hyunwoo Kim (@v4bel) Details zu einer kritischen lokalen Privilegienausweitung (LPE) im Linux-Kernel – **DirtyFrag** (CVE-2026-43284 / CVE-2026-43500). Der Fehler betrifft alle Linux-Kernel seit Januar 2017, also über 9 Jahre hinweg, und nahezu alle gängigen Linux-Distributionen.

### Schwachstellenbewertung

| Metrik | Wert |
|--------|------|
| CVE-ID | CVE-2026-43284 (ESP-Variante), CVE-2026-43500 (RxRPC-Variante) |
| Schweregrad | **Kritisch (Critical)** |
| CVSS 3.1 | 7.8 (AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H) |
| Angriffsvektor | Lokal |
| Erforderliche Berechtigungen | Normaler Benutzer |
| Auswirkung | Jeder lokale Benutzer kann Root-Rechte erlangen |

---

## Technische Grundlagen

DirtyFrag ist ein **deterministischer Logikfehler** (keine Race Condition) und keine herkömmliche Speicherverletzung. Er verknüpft Schwachstellen in zwei unabhängigen Kernel-Subsystemen:

### 1. xfrm-ESP (IPsec ESP Protocol)

Das ESP-Protokoll von IPsec weist bei der Entschlüsselung von Datenpaketen eine **Schreibschwachstelle im Page Cache** auf. Angreifer können durch speziell präparierte ESP-Pakete eine Entschlüsselungsoperation auf schreibgeschützten Speicherseiten auslösen.

### 2. RxRPC (AFS Distributed File System)

Die Implementierung des RxRPC-Protokolls enthält einen ähnlichen Fehler bei der Page-Cache-Verarbeitung, der einen zweiten Angriffspfad bietet.

### Angriffskette

\`\`\`
splice()/sendfile() Systemaufrufe
    ↓
Seiten einer schreibgeschützten Datei werden in den Socket-Puffer eingeschleust
    ↓
Kernel führt In-Place-Entschlüsselung im Page Cache durch
    ↓
Schreibgeschützte Dateien werden im Speicher modifiziert (z. B. /usr/bin/su oder /etc/passwd)
    ↓
Privilegienausweitung ohne Änderung der Festplattendaten
\`\`\`

**Wesentliches Merkmal:** Da die Festplattendatei nicht verändert wird, können herkömmliche Dateiintegritätsprüfungen den Angriff nicht erkennen.

---

## Betroffene Systeme

DirtyFrag betrifft alle Linux-Kernel seit Januar 2017 (Commit \`cac2661c53f3\`):

| Distribution | Betroffene Versionen |
|-------------|---------------------|
| Red Hat Enterprise Linux | 7, 8, 9, 10 |
| OpenShift Container Platform | 4.x |
| AlmaLinux | 8, 9, 10 |
| CloudLinux | Alle Versionen |
| SUSE Linux Enterprise Server | 15 |
| Ubuntu | 20.04 LTS, 22.04 LTS, 24.04 LTS |
| Debian | 11, 12, 13 |
| CentOS | 7, 8, 9 |
| QNAP NAS | Betroffene Geräte |

---

## PoC-Analyse

Der veröffentlichte PoC-Exploitcode demonstriert folgende Angriffsschritte:

1. **Vorbereitung**: Identifikation der Ziel-Datei (z. B. \`/etc/passwd\` oder \`/usr/bin/su\`)
2. **Auslösung**: Einschleusen der Page-Cache-Seiten in den ESP-Verarbeitungsablauf mittels \`splice()\`
3. **Ausnutzung**: Modifikation des Page-Cache-Inhalts durch die Nebenwirkungen der IPsec-ESP-Entschlüsselung
4. **Privilegienausweitung**: z. B. Entfernen des Root-Passworts in \`/etc/passwd\` oder Ersetzen der \`su\`-Binärdatei

> ⚠️ Der PoC-Code wurde auf GitHub und anderen Plattformen verbreitet. Aktive Ausnutzung ist bereits in großem Umfang zu beobachten.

---

## Temporäre Schutzmaßnahmen

Bis ein Kernel-Update eingespielt werden kann, sollten die betroffenen Kernel-Module deaktiviert werden:

\`\`\`bash
# Betroffene Module deaktivieren
sudo sh -c "printf 'install esp4 /bin/false\\ninstall esp6 /bin/false\\ninstall rxrpc /bin/false\\n' > /etc/modprobe.d/dirtyfrag.conf"

# Bereits geladene Module entfernen
sudo rmmod esp4 esp6 rxrpc 2>/dev/null

# Page Cache leeren
echo 3 | sudo tee /proc/sys/vm/drop_caches
\`\`\`

> ⚠️ Achtung: Dieser Eingriff deaktiviert IPsec-ESP-Tunnel und das AFS-Dateisystem. Bitte prüfen Sie die Auswirkungen auf Ihren Geschäftsbetrieb.

---

## Patch-Status

| Hersteller | Status | Referenz |
|-----------|--------|----------|
| Linux Kernel Upstream | ✅ Behoben (Commit \`f4c50a4034e6\`) | [kernel.org](https://git.kernel.org) |
| Red Hat | ✅ RHSA-2026:16328 veröffentlicht | [Red Hat Security](https://access.redhat.com/security/vulnerabilities/RHSB-2026-003) |
| AlmaLinux | ✅ Patch verfügbar | [AlmaLinux Blog](https://almalinux.org/ja/blog/2026-05-07-dirty-frag/) |
| SUSE | ✅ SUSE-SU-2026:1778-1 veröffentlicht | [SUSE Security](https://www.suse.com/support/security/) |
| CloudLinux | ✅ Patch veröffentlicht | [CloudLinux Blog](https://blog.cloudlinux.com/dirty-frag-mitigation-and-kernel-update) |
| Ubuntu | 🔄 In Überprüfung | [Ubuntu Security](https://ubuntu.com/security) |
| Debian | 🔄 In Überprüfung | [Debian Security](https://www.debian.org/security/) |

---

## Empfohlene Sicherheitstools

Für die Erkennung und den Schutz vor solchen kritischen Schwachstellen empfehlen wir:

### 1. Schwachstellen-Scanner

| Tool | Typ | Begründung | Preis |
|------|-----|-----------|-------|
| **Snyk** | Open-Source-Sicherheitsscan | Container- und Abhängigkeitsscans, DirtyFrag-Erkennung aktualisiert | Kostenlos - anpassbar |
| **Tenable Nessus** | Schwachstellen-Scanner | DirtyFrag-Erkennungs-Plugin (ID 313681) verfügbar | ab €3.300/Jahr |
| **Qualys VMDR** | Schwachstellen-Management | Echtzeit-Erkennung, skalierbar | Nach Vermögenswerten |
| **OpenVAS / Greenbone** | Open-Source-Scanner | Kostenlose Schwachstellenscans | Kostenlos |

### 2. Laufzeit-Sicherheitsüberwachung

| Tool | Typ | Empfehlung |
|------|-----|------------|
| **Falco** | Runtime Security | Erkennt anomale splice()-Systemaufrufe |
| **Wazuh** | EDR/XDR | Open-Source-Endpoint-Erkennung mit anpassbaren DirtyFrag-Regeln |
| **Sysdig** | Container Security | Erkennt anomale Kernel-Aufrufe in Container-Umgebungen |

---

## Fazit

DirtyFrag (CVE-2026-43284) ist eine der schwerwiegendsten Linux-Kernel-Lücken der letzten Jahre. Die deterministische Ausnutzung (ohne Race Condition) führt zu einer sehr hohen Erfolgswahrscheinlichkeit, und der Page-Cache-basierte Angriff umgeht herkömmliche Dateiintegritätsprüfungen.

Für Unternehmen und Privatanwender empfehlen wir folgende sofortige Maßnahmen:

1. **Notfall-Mitigation**: Falls kein Kernel-Update sofort möglich ist, deaktivieren Sie die Module esp4/esp6/rxrpc
2. **Kernel-Update**: Aktualisieren Sie so schnell wie möglich auf eine gepatchte Kernel-Version
3. **Schwachstellen-Scan**: Führen Sie einen vollständigen Scan mit den oben genannten Tools durch
4. **Dauerhafte Überwachung**: Implementieren Sie Runtime-Sicherheitsmonitoring zur Erkennung verdächtiger Aktivitäten
    `,
  },
  {
    slug: 'ai-agent-tools-comparison-2026',
    title: 'KI-Agenten-Vergleich 2026: OpenClaw vs Hermes vs AutoGPT',
    excerpt: 'KI-Agenten revolutionieren die Arbeitsweise in Softwareentwicklung, Sicherheitsanalyse und Content-Erstellung. Ein detaillierter Vergleich der drei wichtigsten KI-Agenten-Frameworks: OpenClaw, Hermes Agent und AutoGPT.',
    date: '13.05.2026',
    category: 'KI-Tools',
    categorySlug: 'ai-tools',
    readTime: '10 Minuten',
    tags: ['KI-Agent', 'OpenClaw', 'Hermes', 'AutoGPT', 'KI-Tools-Vergleich'],
    content: `
## Übersicht

Im Jahr 2026 sind KI-Agenten zu einem zentralen Produktivitätstool in der Softwareentwicklung, Sicherheitsanalyse und Content-Erstellung geworden. Dieser Artikel vergleicht die drei wichtigsten KI-Agenten-Frameworks – **OpenClaw**, **Hermes Agent** und **AutoGPT** – um Ihnen bei der Auswahl der richtigen Lösung zu helfen.

---

## Die drei KI-Agenten im Überblick

### OpenClaw

Open-Source-KI-Agenten-Framework, bekannt für seine Leichtgewichtigkeit und hohe Leistung, ideal für Unternehmensbereitstellungen.

- **Entwickler**: Open-Source-Community
- **Veröffentlicht**: 2025
- **Kernstärke**: Leicht, sicher, anpassbar
- **Einsatzbereiche**: Unternehmensautomatisierung, Sicherheitsanalyse, DevOps

### Hermes Agent

KI-Agenten-Framework von Nous Research, bekannt für seine starken Reasoning-Fähigkeiten und Tool-Nutzung.

- **Entwickler**: Nous Research
- **Veröffentlicht**: Ende 2025
- **Kernstärke**: Hervorragende Reasoning-Fähigkeiten, reichhaltiges Tool-Ökosystem
- **Einsatzbereiche**: Forschung, komplexe Aufgaben, Code-Generierung

### AutoGPT

Eines der ersten autonomen KI-Agenten-Frameworks, das auf Aufgabenzerlegung und autonomer Ausführung basiert.

- **Entwickler**: Significant Gravitas
- **Veröffentlicht**: 2023
- **Kernstärke**: Autonome Aufgabenzerlegung, Internetzugriff, Langzeitspeicher
- **Einsatzbereiche**: Automatisierte Recherche, Content-Erstellung, Datenanalyse

---

## Funktionsvergleich

| Kategorie | OpenClaw | Hermes Agent | AutoGPT |
|-----------|---------|-------------|---------|
| **Lizenz** | Apache 2.0 | Apache 2.0 | MIT |
| **Basis-Modell** | Multi-Modell (Claude/GPT/Llama) | Eigene Hermes-Serie | GPT-4 |
| **Tool-Nutzung** | ✅ Nativer Support | ✅ Umfangreiche Tool-Bibliothek | ✅ Plugin-System |
| **Multi-Agent** | ✅ Unterstützt | ✅ Unterstützt | ❌ Einzel-Agent |
| **Code-Sandbox** | ✅ Integrierte Sandbox | ✅ Pfadprüfung | ❌ Keine Sandbox |
| **Langzeitspeicher** | ✅ Vektordatenbank | ✅ Mehrere Backends | ✅ Vektorspeicher |
| **Internetsuche** | ✅ Integriert | ✅ Unterstützt | ✅ Unterstützt |
| **Enterprise** | ✅ Vollständig | ⚠️ Eingeschränkt | ❌ Experimentell |
| **Deutsch** | ✅ Gut | ⚠️ Mittel | ⚠️ Mittel |
| **Sicherheitsaudit** | ✅ Integriert | ⚠️ Basisschutz | ❌ Begrenzt |

---

## Preisvergleich

| Tool | Preismodell | Preisspanne | Zielgruppe |
|------|-----------|------------|------------|
| **OpenClaw** | Open-Source + Enterprise | Kostenlos bis €499/Monat | Einzelpersonen bis Enterprise |
| **Hermes Agent** | Open-Source + API-Abrechnung | Kostenlos bis €0,03/Aufruf | Einzelpersonen bis Teams |
| **AutoGPT** | Open-Source + OpenAI-API-Kosten | Kostenlos (eigener API-Key erforderlich) | Einzelpersonen und kleine Teams |

---

## Einsatzszenarien

### Szenario 1: Sicherheitsanalyse

Dies ist derzeit eines der wichtigsten Einsatzgebiete für KI-Agenten. Bei der Analyse von Schwachstellen wie DirtyFrag (CVE-2026-43284) können KI-Agenten die Effizienz erheblich steigern:

- **OpenClaw** ⭐ Empfohlen – Integrierte Code-Sandbox und Sicherheitsanalyse-Toolchain
- **Hermes Agent** – Starke Reasoning-Fähigkeiten, Sicherheitstools müssen selbst integriert werden
- **AutoGPT** – Geeignet für Informationssammlung, aber begrenzte Code-Analyse-Funktionen

### Szenario 2: Softwareentwicklung und Code-Review

- **OpenClaw** – CI/CD-Integration, starke Teamfähigkeiten
- **Hermes Agent** ⭐ Empfohlen – Herausragende Code-Verständnis- und Generierungsfähigkeiten
- **AutoGPT** – Geeignet für schnelles Prototyping, aber inkonsistente Code-Qualität

### Szenario 3: Content-Erstellung und SEO

- **OpenClaw** – Batch-Content-Produktion + SEO-Optimierung
- **Hermes Agent** – Hochwertige Langtext-Produktion
- **AutoGPT** ⭐ Empfohlen – Autonome Recherche + automatisierte Schreib-Workflows

---

## Fazit und Empfehlung

| Anforderung | Empfehlung |
|------------|------------|
| Unternehmenssicherheit | **OpenClaw** – Sandbox + Security-Audit + Enterprise-Support |
| Komplexe Reasoning-Aufgaben | **Hermes Agent** – Stärkste Reasoning-Fähigkeiten |
| Autonome Aufgaben | **AutoGPT** – Aufgabenzerlegung und autonome Ausführung |
| Deutsche Sprachunterstützung | **OpenClaw** – Beste Deutsch-Unterstützung |
| Niedrigste Einstiegshürde | **AutoGPT** – Größte Community und Tutorials |

Wenn Sie in den Bereichen Sicherheitsanalyse, DevOps oder Unternehmensautomatisierung tätig sind, ist **OpenClaw** die beste Wahl. Für komplexe Code-Generierung und Reasoning-Aufgaben ist **Hermes Agent** die richtige Lösung. Für Einzelpersonen und Content-Ersteller bietet **AutoGPT** den einfachsten Einstieg.
    `,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
