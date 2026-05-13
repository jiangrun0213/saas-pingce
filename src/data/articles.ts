import { Article } from '@/types'
import { Language } from '@/types'

export const articles: Article[] = [
  {
    slug: 'dirtyfrag-cve-2026-43284-analysis',
    titleDe: 'DirtyFrag (CVE-2026-43284) – Kritische Linux-LPE-Sicherheitslücke: Analyse und Schutzmaßnahmen',
    titleZh: 'DirtyFrag (CVE-2026-43284) – 严重Linux本地提权漏洞：分析与防护措施',
    excerptDe: 'Die am 7. Mai 2026 enthüllte kritische Linux-Kernel-Lücke DirtyFrag betrifft alle Distributionen der letzten 9 Jahre. Eine detaillierte Analyse der Exploit-Kette, der betroffenen Systeme und der empfohlenen Sicherheitsmaßnahmen.',
    excerptZh: '2026年5月7日披露的Linux内核高危提权漏洞DirtyFrag，影响过去9年所有主流发行版。本文深入分析漏洞原理、PoC利用链并推荐最佳安全工具进行防护。',
    contentDe: `
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
    contentZh: `
## 概述

2026年5月7日，安全研究员 Hyunwoo Kim（@v4bel）公开披露了 Linux 内核中的一个高危本地提权（LPE）漏洞——**DirtyFrag**（CVE-2026-43284 / CVE-2026-43500）。该漏洞影响自 2017 年 1 月以来的所有 Linux 内核版本，覆盖9年以上，几乎影响所有主流 Linux 发行版。

### 漏洞评分

| 指标 | 值 |
|------|-----|
| CVE ID | CVE-2026-43284（ESP 变体）、CVE-2026-43500（RxRPC 变体） |
| 严重性 | **高危（Critical）** |
| CVSS 3.1 | 7.8（AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H） |
| 攻击向量 | 本地 |
| 权限要求 | 普通用户 |
| 影响 | 任意本地用户可获得 root 权限 |

---

## 漏洞原理

DirtyFrag 是一个**确定性逻辑漏洞**（非竞态条件），而非传统的内存损坏漏洞。它利用了 Linux 内核中两个独立子系统的漏洞进行串联利用。

### 1. xfrm-ESP（IPsec ESP 协议）

IPsec 的 ESP 协议在处理加密数据包时，存在一个**页面缓存写入漏洞**。攻击者可以通过精心构造的 ESP 数据包，触发内核在只读文件的内存缓存页面上进行解密操作。

### 2. RxRPC（AFS 分布式文件系统）

RxRPC 协议实现中存在类似的页面缓存处理缺陷，提供了第二条利用路径。

### 利用链

\`\`\`
splice()/sendfile() 系统调用
    ↓
将可读文件的页面缓存页注入套接字缓冲区
    ↓
内核在页面缓存上执行就地解密操作
    ↓
修改只读文件的内存缓存（如 /usr/bin/su 或 /etc/passwd）
    ↓
无需修改磁盘文件即可实现提权
\`\`\`

**关键特性：** 由于磁盘文件并未被修改，传统的基于文件完整性校验的检测工具无法发现该攻击。

---

## 影响范围

DirtyFrag 影响自 2017 年 1 月以来的所有 Linux 内核版本，具体包括受影响的主流发行版。详细列表请参考德语原文。

---

## 总结

DirtyFrag（CVE-2026-43284）是一个具有里程碑意义的 Linux 内核漏洞，其确定性利用方式使得攻击成功率极高。建议立即更新内核并部署运行时安全监控。
    `,
    date: '13.05.2026',
    categoryDe: 'Sicherheitsanalyse',
    categoryZh: '安全分析',
    categorySlug: 'security',
    readTimeDe: '8 Minuten',
    readTimeZh: '8分钟',
    tags: ['CVE-2026-43284', 'DirtyFrag', 'Linux-Sicherheit', 'LPE', 'Sicherheitsanalyse'],
  },
  {
    slug: 'ai-agent-tools-comparison-2026',
    titleDe: 'KI-Agenten-Vergleich 2026: OpenClaw vs Hermes vs AutoGPT',
    titleZh: '2026年AI Agent工具对比：OpenClaw vs Hermes vs AutoGPT',
    excerptDe: 'KI-Agenten revolutionieren die Arbeitsweise in Softwareentwicklung, Sicherheitsanalyse und Content-Erstellung. Ein detaillierter Vergleich der drei wichtigsten KI-Agenten-Frameworks: OpenClaw, Hermes Agent und AutoGPT.',
    excerptZh: 'AI Agent 正在重塑软件开发、安全分析等领域的工作流程。本文深度对比 OpenClaw、Hermes Agent、AutoGPT 三大主流 AI Agent 框架的功能、性能与适用场景。',
    contentDe: `
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

## Fazit und Empfehlung

| Anforderung | Empfehlung |
|------------|------------|
| Unternehmenssicherheit | **OpenClaw** – Sandbox + Security-Audit + Enterprise-Support |
| Komplexe Reasoning-Aufgaben | **Hermes Agent** – Stärkste Reasoning-Fähigkeiten |
| Autonome Aufgaben | **AutoGPT** – Aufgabenzerlegung und autonome Ausführung |
| Niedrigste Einstiegshürde | **AutoGPT** – Größte Community und Tutorials |
    `,
    contentZh: `
## 概述

2026年，AI Agent（智能体）已经成为软件开发、安全分析、内容创作等领域的核心生产力工具。本文将深入对比当前最热门的三大 AI Agent 框架——**OpenClaw**、**Hermes Agent** 和 **AutoGPT**，帮助你选择最适合自己需求的方案。

---

## 三大 AI Agent 概览

### OpenClaw

开源 AI Agent 框架，以其轻量化、高性能著称，特别适合企业级部署。

- **开发者**：开源社区
- **发布时间**：2025年
- **核心优势**：轻量、安全、可定制
- **适用场景**：企业自动化、安全分析、DevOps

### Hermes Agent

由 Nous Research 开发的 AI Agent 框架，以强大的推理能力和工具调用著称。

- **开发者**：Nous Research
- **发布时间**：2025年底
- **核心优势**：推理能力强、工具生态丰富
- **适用场景**：研究、复杂任务编排、代码生成

### AutoGPT

最早的自主 AI Agent 框架之一，以任务分解和自主执行为核心设计理念。

- **开发者**：Significant Gravitas
- **发布时间**：2023年
- **核心优势**：任务自主分解、互联网访问、长期记忆
- **适用场景**：自动化研究、内容生成、数据分析

---

## 总结与推荐

| 需求 | 推荐选择 |
|------|---------|
| 企业级安全部署 | **OpenClaw** — 沙箱 + 安全审计 + 企业支持 |
| 复杂推理任务 | **Hermes Agent** — 最强推理能力和工具调用 |
| 自主任务执行 | **AutoGPT** — 任务分解和自主执行最佳 |
| 入门成本最低 | **AutoGPT** — 最大社区资源和教程 |
    `,
    date: '13.05.2026',
    categoryDe: 'KI-Tools',
    categoryZh: 'AI工具',
    categorySlug: 'ai-tools',
    readTimeDe: '10 Minuten',
    readTimeZh: '10分钟',
    tags: ['KI-Agent', 'OpenClaw', 'Hermes', 'AutoGPT', 'KI-Tools-Vergleich'],
  },
  {
    slug: 'deepseek-vs-chatgpt-2026',
    titleDe: 'DeepSeek vs ChatGPT 2026: Ist das chinesische KI-Modell eine ernsthafte Alternative?',
    titleZh: 'DeepSeek vs ChatGPT 2026：中国AI模型能否成为真正的替代品？',
    excerptDe: 'DeepSeek hat den KI-Markt mit seinem extrem günstigen Preis-Leistungs-Verhältnis aufgemischt. Dieser Artikel vergleicht DeepSeek mit ChatGPT in den Bereichen Leistung, Preis, Datenschutz und deutscher Sprachunterstützung.',
    excerptZh: 'DeepSeek以其极高的性价比震撼了AI市场。本文从性能、价格、数据保护和德语支持等方面，深度对比DeepSeek与ChatGPT。',
    contentDe: `
## Warum DeepSeek?
DeepSeek hat sich seit Anfang 2026 als ernstzunehmender Konkurrent im KI-Markt etabliert. Das chinesische LLM überzeugt vor allem durch sein herausragendes Preis-Leistungs-Verhältnis – bei vielen Benchmarks liegt es auf Augenhöhe mit GPT-4, kostet aber nur einen Bruchteil.

## Leistungsvergleich
In Benchmark-Tests zeigt DeepSeek besonders bei logischen und mathematischen Aufgaben beeindruckende Leistungen. Das 1M-Token-Kontextfenster ist sogar größer als das von ChatGPT. Bei kreativen Aufgaben und deutscher Sprachqualität hat ChatGPT jedoch noch die Nase vorn.

### Bewertungstabelle
| Kriterium | DeepSeek | ChatGPT |
|-----------|----------|---------|
| Logik/Mathematik | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Kreativität | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Deutsch | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Preis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Kontextfenster | ⭐⭐⭐⭐⭐ (1M) | ⭐⭐⭐⭐ (200K) |
| DSGVO | ⚠️ Ungeprüft | ⚠️ Eingeschränkt |

## Datenschutz und DSGVO
Ein wichtiger Aspekt für deutsche Nutzer: DeepSeek ist ein chinesisches Produkt und unterliegt chinesischem Datenschutzrecht. Die DSGVO-Konformität ist nicht bestätigt. Allerdings ist das Modell als Open Source verfügbar und kann selbst gehostet werden, was DSGVO-konforme Nutzung theoretisch ermöglicht.

## Fazit
DeepSeek ist eine ernsthafte Alternative zu ChatGPT, besonders für preisbewusste Nutzer und technische Aufgaben. Für kreative Inhalte und deutsche Texte bleibt ChatGPT die bessere Wahl. Unternehmen mit DSGVO-Anforderungen sollten die Open-Source-Selbsthosting-Option von DeepSeek prüfen.
    `,
    contentZh: `
## 为什么关注DeepSeek？
DeepSeek自2026年初以来已成为AI市场的重要竞争者。这款中国大语言模型以其卓越的性价比著称——在许多基准测试中与GPT-4不相上下，但成本仅为后者的零头。

## 性能对比
在基准测试中，DeepSeek在逻辑和数学任务上表现尤为出色。其100万Token的上下文窗口甚至超过了ChatGPT。然而，在创意任务和德语质量方面，ChatGPT仍占优势。

## 数据保护
对德国用户而言，一个重要因素是DeepSeek是中国产品，受中国数据保护法管辖。DSGVO合规性未获确认。但该模型以开源形式提供，可自行托管，理论上可以实现DSGVO合规使用。

## 总结
DeepSeek是ChatGPT的重要替代品，特别适合注重成本的用户和技术性任务。对于创意内容和德语文本，ChatGPT仍是更好的选择。有DSGVO要求的企业应考虑DeepSeek的开源自托管方案。
    `,
    date: '13.05.2026',
    categoryDe: 'KI-Vergleich',
    categoryZh: 'AI对比',
    categorySlug: 'china-tools',
    readTimeDe: '7 Minuten',
    readTimeZh: '7分钟',
    tags: ['DeepSeek', 'ChatGPT', 'KI-Vergleich', 'Chinesische-KI', 'Open-Source-LLM'],
  },
  {
    slug: 'china-tools-fuer-deutsche-unternehmen',
    titleDe: 'China-Tools für deutsche Unternehmen: Ein umfassender Leitfaden',
    titleZh: '德国企业中国工具指南：全方位解读',
    excerptDe: 'Welche chinesischen SaaS-Tools sind für deutsche Unternehmen relevant? Von KI-Assistenten bis Cloud-Plattformen – ein Leitfaden für die wichtigsten China-Tools und ihre Einsatzmöglichkeiten.',
    excerptZh: '哪些中国SaaS工具对德国企业最有价值？从AI助手到云平台——本文为您梳理最重要的中国工具及其应用场景。',
    contentDe: `
## Warum China-Tools?
Chinesische Technologieunternehmen haben in den letzten Jahren leistungsfähige SaaS-Produkte entwickelt, die oft günstiger und innovativer sind als ihre westlichen Pendants. Für deutsche Unternehmen mit China-Geschäft sind diese Tools nicht nur nützlich, sondern oft unverzichtbar.

## Die wichtigsten Kategorien

### KI & AI
Chinesische KI-Modelle wie DeepSeek und Tongyi Qianwen bieten hervorragende Leistung zu einem Bruchteil der Kosten westlicher Alternativen. Besonders für chinesische Textverarbeitung sind sie oft besser geeignet.

### Kollaboration
Plattformen wie Feishu/Lark, DingTalk und WeCom sind in China allgegenwärtig. Wer mit chinesischen Partnern zusammenarbeitet, kommt an diesen Tools kaum vorbei.

### Entwicklung & Cloud
Alibaba Cloud, Tencent Cloud und Huawei Cloud bieten umfassende Cloud-Infrastruktur mit Rechenzentren weltweit – auch in Europa.

### E-Commerce
WeChat Mini Programs, Douyin und Xiaohongshu sind die zentralen Plattformen für den chinesischen E-Commerce. Deutsche Marken können hier Millionen von Kunden erreichen.

## Worauf deutsche Unternehmen achten sollten

1. **Datenschutz**: Chinesische Serverstandorte und DSGVO-Konformität prüfen
2. **Sprachunterstützung**: Die meisten China-Tools bieten keine deutsche UI
3. **Integration**: Kompatibilität mit bestehenden deutschen IT-Systemen
4. **Support**: Deutschsprachiger Support ist selten verfügbar

## Fazit
China-Tools bieten enorme Chancen für deutsche Unternehmen – aber die Auswahl sollte sorgfältig getroffen werden. Unsere Bewertungen helfen Ihnen dabei, die richtige Entscheidung zu treffen.
    `,
    contentZh: `
## 为什么要用中国工具？
中国科技公司近年来开发了功能强大的SaaS产品，通常比西方同类产品更便宜、更具创新性。对于有中国业务的德国企业来说，这些工具不仅有用，而且通常是不可或缺的。

## 主要类别

### 人工智能
DeepSeek、通义千问等中国AI模型以西方替代品零头的价格提供了出色的性能。特别是在中文处理方面，它们通常更胜一筹。

### 协同办公
飞书/Lark、钉钉和企微在中国无处不在。如果与中国合作伙伴协作，几乎无法绕过这些工具。

### 开发与云
阿里云、腾讯云和华为云提供全面的云基础设施，在全球（包括欧洲）设有数据中心。

## 总结
中国工具为德国企业带来了巨大机遇——但需要谨慎选择。我们的评测将帮助您做出正确的决策。
    `,
    date: '13.05.2026',
    categoryDe: 'China-Tools-Guide',
    categoryZh: '中国工具指南',
    categorySlug: 'china-tools',
    readTimeDe: '6 Minuten',
    readTimeZh: '6分钟',
    tags: ['China-Tools', 'SaaS-Vergleich', 'Deutscher-Markt', 'Digitalisierung'],
  },
  {
    slug: 'wechat-mini-program-einstieg',
    titleDe: 'WeChat Mini Programs für deutsche Unternehmen: Einstiegsguide 2026',
    titleZh: '德国企业微信小程序入门指南 2026',
    excerptDe: 'WeChat Mini Programs sind der Schlüssel zum chinesischen Markt. Dieser Guide erklärt, wie deutsche Unternehmen Mini Programs entwickeln, betreiben und für E-Commerce nutzen können.',
    excerptZh: '微信小程序是打开中国市场的钥匙。本指南介绍德国企业如何开发、运营小程序并将其用于电商。',
    contentDe: `
## Was sind WeChat Mini Programs?
WeChat Mini Programs sind "Apps in der App" – kleine Anwendungen, die innerhalb von WeChat laufen, ohne dass der Nutzer eine separate App installieren muss. Mit über 1,2 Milliarden monatlich aktiven WeChat-Nutzern bieten Mini Programs einen direkten Zugang zum chinesischen Markt.

## Warum deutsche Unternehmen Mini Programs brauchen

### 1. Direkter Kundenkontakt
Anders als bei einer eigenständigen App müssen chinesische Nutzer nichts herunterladen – sie öffnen das Mini Program direkt in WeChat. Das senkt die Einstiegshürde enorm.

### 2. Social Commerce
WeChat integriert Zahlungen (WeChat Pay), Teilen-Funktionen und Kundenservice direkt im Mini Program. Das ermöglicht nahtloses Social Shopping.

### 3. Kosteneffizienz
Die Entwicklung eines Mini Programs ist günstiger als eine native App und bietet dennoch umfassende Funktionen.

## Entwicklungsschritte
1. **WeChat-Konto registrieren**: Ein offizielles WeChat-Konto ist die Basis
2. **Entwicklungsumgebung einrichten**: WeChat Developer Tools verwenden
3. **Mini Program entwickeln**: HTML5-ähnliche Technologien (WXML, WXSS, JS)
4. **Testen und einreichen**: WeChats Prüfprozess durchlaufen
5. **Veröffentlichen und bewerben**: Über WeChat-Kanäle verbreiten

## Herausforderungen
- **Sprache**: Alle Inhalte müssen auf Chinesisch sein
- **Zensur**: Inhalte unterliegen chinesischer Regulierung
- **Zahlungen**: WeChat Pay erfordert chinesische Bankverbindung
- **Partnerschaft**: Ein lokaler Partner ist oft notwendig

## Fazit
WeChat Mini Programs sind für deutsche Unternehmen mit China-Ambitionen der effektivste Weg, chinesische Kunden zu erreichen. Der Einstieg erfordert Investitionen, aber der ROI kann enorm sein.
    `,
    contentZh: `
## 什么是微信小程序？
微信小程序是"应用中的应用"——在微信内运行的小型应用程序，用户无需安装独立应用。凭借超过12亿月活用户，小程序为中国市场提供了直接入口。

## 为什么德国企业需要小程序

### 1. 直接客户触达
中国用户无需下载任何东西——直接在微信中打开小程序即可使用，这大大降低了使用门槛。

## 总结
微信小程序是有中国业务的德国企业触达中国客户的最有效方式。虽然入门需要投资，但回报可能非常可观。
    `,
    date: '13.05.2026',
    categoryDe: 'E-Commerce',
    categoryZh: '电商',
    categorySlug: 'china-tools',
    readTimeDe: '8 Minuten',
    readTimeZh: '8分钟',
    tags: ['WeChat', 'Mini-Program', 'China-E-Commerce', 'Social-Commerce', 'China-Marketing'],
  },
  {
    slug: 'feishu-lark-kollaboration',
    titleDe: 'Feishu/Lark im Test: Die China-Alternative zu Slack und Teams',
    titleZh: '飞书/Lark评测：Slack和Teams的中国替代品',
    excerptDe: 'Feishu/Lark von ByteDance ist eine der leistungsfähigsten Kollaborationsplattformen Chinas. Ein ausführlicher Test der Funktionen und ein Vergleich mit Slack und Microsoft Teams.',
    excerptZh: '字节跳动旗下的飞书/Lark是中国最强大的协作平台之一。本文详细评测其功能，并与Slack和Microsoft Teams进行对比。',
    contentDe: `
## Feishu/Lark: Was ist das?
Feishu (international als Lark bekannt) ist die All-in-One-Kollaborationsplattform von ByteDance, dem Unternehmen hinter TikTok/Douyin. Sie kombiniert Instant-Messaging, Dokumentenbearbeitung, Videokonferenzen und Projektmanagement in einer nahtlosen Oberfläche.

## Was Feishu besonders macht

### 1. Mehrdimensionale Tabellen (多维表格)
Feishus Tabellenfunktion geht weit über Google Sheets oder Excel hinaus. Sie kombiniert Datenbanken, Tabellen und Projektmanagement in einem Tool – ideal für agile Teams.

### 2. Dokumentenkollaboration
Die Dokumentenbearbeitung in Feishu ist flüssiger als bei vielen Wettbewerbern. Besonders die Block-Editor-Funktion und die Integration von Live-Daten sind beeindruckend.

### 3. Integration und Ökosystem
Feishu integriert sich tief in das ByteDance-Ökosystem und bietet zahlreiche Automatisierungsmöglichkeiten.

## Vergleich mit westlichen Alternativen

| Kriterium | Feishu/Lark | Slack | Microsoft Teams |
|-----------|------------|-------|-----------------|
| Dokumente | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Tabellen | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐ |
| Messaging | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Integrationen | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| DSGVO | ⚠️ Teilweise | ✅ Ja | ✅ Ja |
| Deutsch | ❌ Nein | ✅ Ja | ✅ Ja |
| Preis | ⭐⭐⭐⭐⭐ (günstig) | ⭐⭐⭐ | ⭐⭐⭐ |

## Für wen ist Feishu geeignet?
Feishu/Lark ist ideal für Unternehmen, die mit chinesischen Partnern zusammenarbeiten. Die internationale Version Lark bietet englische Oberfläche und EU-Rechenzentren, was die DSGVO-Problematik entschärft.

## Fazit
Feishu/Lark ist technisch beeindruckend und in vielen Bereichen besser als Slack oder Teams. Für rein deutsche Teams ohne China-Bezug ist jedoch die fehlende deutsche Sprachunterstützung ein Hindernis.
    `,
    contentZh: `
## 什么是飞书/Lark？
飞书（国际版名为Lark）是字节跳动旗下的一站式协作平台，整合了即时通讯、文档协作、视频会议和项目管理功能。

## 特别之处

### 1. 多维表格
飞书的表格功能远超Google Sheets或Excel，将数据库、表格和项目管理融为一体。

## 总结
飞书/Lark技术上令人印象深刻，在许多方面优于Slack或Teams。但对于没有中国业务的纯德国团队而言，缺少德语支持是一个障碍。
    `,
    date: '14.05.2026',
    categoryDe: 'Kollaboration',
    categoryZh: '协同办公',
    categorySlug: 'china-tools',
    readTimeDe: '7 Minuten',
    readTimeZh: '7分钟',
    tags: ['Feishu', 'Lark', 'ByteDance', 'Slack-Alternative', 'Team-Kollaboration'],
  },
  {
    slug: 'chinesische-cloud-anbieter-vergleich',
    titleDe: 'Chinesische Cloud-Anbieter im Vergleich: Alibaba Cloud vs Tencent Cloud vs Huawei Cloud',
    titleZh: '中国云服务商对比：阿里云 vs 腾讯云 vs 华为云',
    excerptDe: 'Alibaba Cloud, Tencent Cloud und Huawei Cloud sind die drei größten Cloud-Plattformen Chinas. Ein detaillierter Vergleich der Dienste, Preise und Eignung für deutsche Unternehmen.',
    excerptZh: '阿里云、腾讯云和华为云是中国三大云平台。本文详细对比三者服务、价格及对德国企业的适用性。',
    contentDe: `
## Die drei chinesischen Cloud-Giganten

### Alibaba Cloud
Alibaba Cloud (Aliyun) ist mit über 30% Marktanteil der unangefochtene Marktführer in China. Das Unternehmen betreibt Rechenzentren in Frankfurt und München.

**Stärken:** Größte Dienstvielfalt, beste internationale Präsenz, EU-Rechenzentren
**Schwächen:** Komplexe Preisstruktur, Dokumentation oft nur auf Chinesisch

### Tencent Cloud
Tencent Cloud profitiert von der starken Integration in WeChat und das Tencent-Ökosystem. Besonders stark in Gaming und Media-Diensten.

**Stärken:** WeChat-Integration, Gaming-Lösungen, wettbewerbsfähige Preise
**Schwächen:** Weniger Dienste als Alibaba, international weniger etabliert

### Huawei Cloud
Huawei Cloud wächst am schnellsten und punktet mit KI- und IoT-Fähigkeiten. Die 5G-Integration ist einzigartig.

**Stärken:** KI/IoT, 5G-Integration, Edge-Computing
**Schwächen:** Politische Bedenken, geringere Akzeptanz in Westeuropa

## Vergleichstabelle für deutsche Unternehmen

| Kriterium | Alibaba Cloud | Tencent Cloud | Huawei Cloud |
|-----------|-------------|--------------|-------------|
| EU-Rechenzentren | ✅ Frankfurt | ✅ Frankfurt | ✅ Frankfurt |
| DSGVO-konform | ✅ Ja | ✅ Ja (international) | ✅ Ja (EU) |
| Deutsche UI | ✅ Ja | ❌ Nein | ❌ Nein |
| Dienstvielfalt | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| China-Konnektivität | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Preis | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## Fazit
Für deutsche Unternehmen ist Alibaba Cloud aufgrund der größten Dienstvielfalt und deutschen UI die beste Wahl. Tencent Cloud ist ideal für WeChat-Integration. Huawei Cloud überzeugt bei KI/IoT-Anwendungen. Alle drei bieten EU-Rechenzentren und DSGVO-Compliance für ihre internationalen Regionen.
    `,
    contentZh: `
## 中国三大云巨头

### 阿里云
阿里云以超过30%的市场份额稳居中国第一。在法兰克福和慕尼黑设有数据中心。

**优势：** 服务种类最丰富、国际化程度最高、欧洲数据中心
**劣势：** 定价结构复杂、文档多为中文

### 腾讯云
腾讯云受益于与微信和腾讯生态的深度整合。在游戏和媒体服务领域尤其强势。

**优势：** 微信集成、游戏解决方案、价格竞争力
**劣势：** 服务种类少于阿里云、国际知名度较低

### 华为云
华为云增长最快，以AI和物联网能力见长。5G集成独一无二。

## 总结
对德国企业而言，阿里云因服务种类最多和提供德语界面而最佳。腾讯云适合微信集成。华为云在AI/物联网应用中表现出色。三家都为国际区域提供欧洲数据中心和DSGVO合规。
    `,
    date: '14.05.2026',
    categoryDe: 'Cloud-Vergleich',
    categoryZh: '云服务对比',
    categorySlug: 'china-tools',
    readTimeDe: '9 Minuten',
    readTimeZh: '9分钟',
    tags: ['Alibaba-Cloud', 'Tencent-Cloud', 'Huawei-Cloud', 'Cloud-Vergleich', 'China-Cloud'],
  },
  {
    slug: 'china-ki-videotools-vergleich',
    titleDe: 'KI-Videotools aus China: CapCut, Kling und Jimeng im Test',
    titleZh: '中国AI视频工具评测：CapCut、可灵和即梦对比',
    excerptDe: 'China entwickelt sich zum führenden Markt für KI-gestützte Videoproduktion. Dieser Artikel vergleicht die wichtigsten chinesischen KI-Videotools – CapCut, Kling und Jimeng – und bewertet ihre Tauglichkeit für deutsche Content-Ersteller.',
    excerptZh: '中国正成为AI视频制作的领先市场。本文对比评测CapCut、可灵和即梦三大中国AI视频工具，评估其对德国内容创作者的适用性。',
    contentDe: `
## Chinesische KI-Videotools: Ein Überblick
Während westliche KI-Videotools wie Runway und Pika viel Aufmerksamkeit erhalten, hat sich in China eine ebenso beeindruckende Landschaft von KI-Videotools entwickelt. Drei Tools stechen besonders hervor.

### CapCut (剪映 / CapCut)
CapCut von ByteDance ist das weltweit am weitesten verbreitete chinesische Videobearbeitungstool. Die KI-Funktionen umfassen:
- **Auto-Captions**: Automatische Untertitel in mehreren Sprachen
- **KI-Text-zu-Video**: Textbasierte Videogenerierung
- **Motion Tracking**: Automatische Objektverfolgung
- **KI-Enhancer**: Automatische Videoqualitätsverbesserung

**Preis:** Kostenlos (Basis) / Pro-Version ab €8/Monat
**Deutsch:** ✅ Englische UI, deutsche Untertitel möglich

### Kling (可灵)
Kling von Kuaishou ist eines der fortschrittlichsten KI-Text-zu-Video-Modelle Chinas.
- **Text-zu-Video**: Erzeugt realistische Videos aus Textbeschreibungen
- **Bild-zu-Video**: Animiert Standbilder
- **Motion Brush**: Steuerung der Bewegungsrichtung im Video
- **Hohe Auflösung**: Bis zu 1080p

**Preis:** Kostenloses Kontingent / Pro ab ¥99/Monat
**Deutsch:** ❌ Nur chinesische UI

### Jimeng (即梦)
Jimeng von ByteDance ist der direkte Konkurrent zu Kling und Midjourney für Video.
- **KI-Videogenerierung**: Text- und bildbasierte Videoerstellung
- **Stilübertragung**: Anwendung künstlerischer Stile auf Videos
- **Schnelle Generierung**: In Sekunden statt Minuten

**Preis:** Kostenloses Kontingent / Nutzungsabhängig
**Deutsch:** ❌ Nur chinesische UI

## Vergleichstabelle

| Kriterium | CapCut | Kling | Jimeng |
|-----------|--------|-------|--------|
| Video-Bearbeitung | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| KI-Text-zu-Video | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Bild-zu-Video | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Deutsche UI | ✅ Teilweise | ❌ Nein | ❌ Nein |
| Preis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| International | ✅ CapCut | ❌ China-only | ❌ China-only |

## Fazit
CapCut ist der Allrounder für die Videobearbeitung und auch international gut nutzbar. Kling liefert die beste KI-Videogenerierung, ist aber nur auf Chinesisch verfügbar. Jimeng ist eine gute Alternative zu Kling mit schnellerer Generierung. Für deutsche Content-Ersteller ist CapCut der praktischste Einstieg in die chinesische KI-Videowelt.
    `,
    contentZh: `
## 中国AI视频工具概览

### CapCut（剪映）
字节跳动旗下的CapCut是全球最广泛使用的中国视频编辑工具。
- AI字幕：自动生成多语言字幕
- AI文字转视频：基于文本的视频生成
- 运动追踪：自动物体跟踪

### 可灵（Kling）
快手推出的先进AI文字转视频模型。
- 文字转视频：从文本描述生成逼真视频
- 图片转视频：将静态图像动画化
- 运动笔刷：控制视频中物体的运动方向

### 即梦（Jimeng）
字节跳动推出的AI视频生成工具。
- AI视频生成：基于文字和图片的视频创作
- 风格迁移：将艺术风格应用于视频
- 快速生成：秒级生成

## 总结
CapCut是视频编辑的全能选手，国际化程度高。可灵在AI视频生成方面表现最佳。即梦是可灵的良好替代品，生成速度更快。
    `,
    date: '14.05.2026',
    categoryDe: 'KI-Videotools',
    categoryZh: 'AI视频工具',
    categorySlug: 'china-tools',
    readTimeDe: '8 Minuten',
    readTimeZh: '8分钟',
    tags: ['CapCut', 'Kling', 'Jimeng', 'KI-Video', 'Chinesische-KI', 'Videobearbeitung'],
  },
  {
    slug: 'social-commerce-china-2026',
    titleDe: 'Social Commerce in China 2026: Douyin, Xiaohongshu und WeChat für deutsche Marken',
    titleZh: '2026年中国社交电商指南：抖音、小红书和微信助力德国品牌',
    excerptDe: 'Social Commerce ist in China der dominierende E-Commerce-Kanal. Dieser Leitfaden erklärt, wie deutsche Marken auf Douyin, Xiaohongshu und WeChat erfolgreich verkaufen können – mit konkreten Strategien und Fallbeispielen.',
    excerptZh: '社交电商在中国已成为主导性电商渠道。本指南为德国品牌详解如何在抖音、小红书和微信上成功销售，包括具体策略和案例。',
    contentDe: `
## Social Commerce in China: Ein Milliardenmarkt
Während Social Commerce in Deutschland noch in den Kinderschuhen steckt, ist er in China zum dominierenden E-Commerce-Kanal geworden. 2026 werden voraussichtlich über 50% des chinesischen E-Commerce-Umsatzes über soziale Plattformen abgewickelt.

## Die drei wichtigsten Plattformen

### 1. Douyin (抖音)
Douyin ist mit über 700 Millionen täglich aktiven Nutzern die größte Social-Commerce-Plattform Chinas.

**Erfolgsstrategien für deutsche Marken:**
- **Livestream-Shopping**: Produktpräsentation in Echtzeit mit Interaktion
- **KOL-Kooperationen**: Zusammenarbeit mit chinesischen Influencern
- **Kurzvideo-Content**: Authentische Produktvorstellungen in Kurzvideos
- **Dou+ Werbung**: Gezielte Werbeausgaben für Reichweite

**Besonderheit:** Der Algorithmus priorisiert Content-Qualität über Follower-Zahl – auch neue Marken haben Chance auf Viralität.

### 2. Xiaohongshu (小红书 / RED)
Xiaohongshu ist die einflussreichste Plattform für Produktentdeckungen, besonders bei jungen, kaufkräftigen Frauen.

**Erfolgsstrategien für deutsche Marken:**
- **Authentische Bewertungen**: Nutzer-generierte Produkttests und Reviews
- **Premium-Positionierung**: Ideal für hochwertige deutsche Produkte
- **SEO-Funktion**: Xiaohongshu fungiert als "China-Google" für Produktsuche
- **Marken-Konto**: Aufbau einer Markenpräsenz mit regelmäßigen Posts

**Fallbeispiel:** Eine deutsche Hautpflegemarke erzielte durch gezielte KOL-Kooperationen auf Xiaohongshu innerhalb von 3 Monaten einen Umsatz von über €500.000.

### 3. WeChat (微信)
WeChat ist das Fundament des chinesischen Social Commerce mit Mini Programs und WeChat Pay.

**Erfolgsstrategien für deutsche Marken:**
- **Mini Program Shop**: Eigenen Onlineshop direkt in WeChat
- **WeChat-Kanäle (视频号)**: Video-Content und Livestreaming
- **Moment-Anzeigen**: Gezielte Werbung im Newsfeed
- **Kundenbindung**: Direkter Kontakt über offizielle Konten

## Vergleich der Plattformen

| Kriterium | Douyin | Xiaohongshu | WeChat |
|-----------|--------|-------------|--------|
| Nutzerbasis | 700M+ täglich | 300M+ monatlich | 1,2 Mrd. monatlich |
| Zielgruppe | Breit (alle Altersgruppen) | Junge Frauen (20-35) | Alle |
| Content-Format | Kurzvideos, Livestream | Bilder, Text, Kurzvideos | Mini Programs, Video |
| Ideal für | Massenmarkt | Premium-/Luxusmarken | Kundenbindung |
| Einstiegshürde | Mittel | Niedrig | Hoch |
| Deutsch | Nur TikTok international | ❌ Nein | ❌ Nein |

## Praktische Tipps für den Einstieg

1. **Lokale Partner finden**: Eine chinesische Agentur oder ein lokaler Partner ist für den Einstieg fast unerlässlich
2. **Lokalisierung**: Alle Inhalte müssen professionell auf Chinesisch erstellt werden
3. **Geduld**: Social Commerce in China braucht Zeit – selten gibt es schnelle Erfolge
4. **Budget einplanen**: Content-Produktion, KOLs und Werbeausgaben erfordern Investitionen
5. **Rechtliche Prüfung**: Produktzulassung und Markenregistrierung in China klären

## Fazit
Social Commerce in China bietet deutschen Marken enorme Chancen, erfordert aber eine durchdachte Strategie und lokale Expertise. Douyin eignet sich für Reichweite, Xiaohongshu für Premium-Positionierung und WeChat für Kundenbindung. Der ideale Ansatz kombiniert alle drei Plattformen.
    `,
    contentZh: `
## 中国社交电商：千亿级市场

### 1. 抖音（Douyin）
日活用户超7亿，是中国最大的社交电商平台。

**德国品牌成功策略：**
- 直播带货：实时产品展示和互动
- KOL合作：与中国网红合作推广
- 短视频内容：真实的产品介绍短片

### 2. 小红书（Xiaohongshu）
最具影响力的产品发现平台，尤其受年轻有消费力女性欢迎。

**德国品牌策略：**
- 真实评测：用户生成的产品体验内容
- 高端定位：适合高品质德国产品
- SEO功能：小红书是中国的"产品搜索谷歌"

### 3. 微信（WeChat）
小程序和微信支付构成中国社交电商的基础。

**德国品牌策略：**
- 小程序商店：微信内直接开店
- 视频号：视频内容和直播
- 朋友圈广告：精准投放

## 总结
中国社交电商为德国品牌提供了巨大机遇，但需要深思熟虑的策略和本地化专业知识。
    `,
    date: '14.05.2026',
    categoryDe: 'E-Commerce & Social Commerce',
    categoryZh: '电商与社交电商',
    categorySlug: 'china-tools',
    readTimeDe: '10 Minuten',
    readTimeZh: '10分钟',
    tags: ['Social-Commerce', 'Douyin', 'Xiaohongshu', 'WeChat', 'China-E-Commerce', 'China-Marketing'],
  },
  {
    slug: 'china-vs-western-tools-branchen-2026',
    titleDe: 'China vs. Westen: Welche Internet-Tools setzen chinesische Unternehmen 2026 in welcher Branche ein?',
    titleZh: '中国 vs 西方：2026年中国各行业使用哪些互联网工具？中外工具选型全景对比',
    excerptDe: 'Von KI-Chatbots über Cloud-Plattformen bis hin zu Design-Tools – Chinesische Unternehmen nutzen zunehmend heimische Alternativen zu westlichen Standards. Eine branchenübergreifende Analyse der Tool-Landschaft in China 2026.',
    excerptZh: '从AI聊天机器人到云平台，从设计工具到协同办公——中国企业正在大规模拥抱国产工具替代西方标准。一篇跨行业的中国企业工具选型全景分析。',
    contentDe: `
## Einleitung

Die chinesische Internet-Tool-Landschaft hat sich in den letzten Jahren rasant entwickelt. Während westliche Unternehmen selbstverständlich Slack, Teams, AWS und Adobe nutzen, greifen chinesische Unternehmen zunehmend zu heimischen Alternativen – nicht aus Zwang, sondern weil diese oft besser auf lokale Bedürfnisse zugeschnitten sind.

Im Jahr 2026 hat sich eine faszinierende Zweiteilung entwickelt: **Jede Branche in China hat ihr eigenes ideales Tool-Ökosystem**, und die Wahl zwischen chinesischen und westlichen Lösungen hängt stark von Faktoren wie Regulierung, Internationalisierungsgrad und Teamstruktur ab.

Dieser Artikel gibt einen umfassenden Überblick darüber, welche Tools in welchen chinesischen Branchen dominieren und wo westliche Alternativen weiterhin eine Rolle spielen.

---

## 1. KI & Chatbots: Der heftigste Wettbewerb

### Die chinesischen Marktführer

Der chinesische KI-Markt ist 2026 der am intensivsten umkämpfte der Welt:

| Produkt | Unternehmen | Monatlich aktive Nutzer (MAU) | Stärke |
|---------|------------|-------------------------------|--------|
| **Doubao** | ByteDance | **> 200 Mio.** | Marktführer, tief in TikTok-Ökosphäre integriert |
| **DeepSeek** | DeepSeek | ~150 Mio. | Open-Source, global bekannt, extrem kosteneffizient |
| **Tongyi Qianwen (Qwen)** | Alibaba | ~100 Mio. | Größtes Open-Source-Modell weltweit, 50%+ Download-Anteil |
| **Yuanbao** | Tencent | ~80 Mio. | In WeChat integriert |
| **ERNIE Bot (Wenxin)** | Baidu | ~50 Mio. | Tief in Baidu-Suche integriert |

### Einsatz nach Branchen

| Branche | Bevorzugtes Tool | Begründung |
|---------|-----------------|------------|
| **E-Commerce / Marketing** | Doubao + Qwen | Content-Generierung, Produktbeschreibungen, Kundenservice |
| **Technologie / Entwicklung** | DeepSeek + Qwen | Open-Source-Modelle, API-Zugang, Code-Generierung |
| **Finanzen** | ERNIE Bot + hauseigene Modelle | Compliance, kontrollierte Umgebungen |
| **Bildung** | Doubao + DeepSeek | Kostengünstig, gut für Tutoring |

### Westliche Alternativen

ChatGPT bleibt mit ~800 Mio. MAU global führend, hat aber in China nur eine **Nischenpräsenz** (ca. 5-10% der Nutzer). Claude wird von wenigen technischen Teams genutzt, ist aber durch Zugangsbeschränkungen stark limitiert.

**Fazit:** Im KI-Bereich haben chinesische Tools die Nase vorn – 6 von 10 globalen KI-Apps stammen aus China. DeepSeek ist das einzige chinesische KI-Produkt mit echter globaler Reichweite.

---

## 2. Kollaboration & Produktivität: Der "Super-App"-Kampf

### Die Drei Großen Chinas

| Tool | MAU | Marktanteil | Primäre Branchen |
|------|-----|------------|------------------|
| **DingTalk** | ~200 Mio. | **38,5%** | Fertigung, Finanzen, Verwaltung, Großunternehmen |
| **WeCom (企业微信)** | ~150 Mio. | **32,0%** | Einzelhandel, Bildung, Kundenservice |
| **Feishu/Lark** | ~60 Mio. | **18,2%** | Technologie, Internet, Kreativwirtschaft |

### Branchenverteilung

**DingTalk** dominiert in traditionellen Branchen:
- **Fertigung & Industrie** (31,5% Digitalisierung): Integration mit MES/ERP, AR-Fernwartung
- **Finanzen & Versicherungen** (68,3%): Erfüllt ISO 27001, GB-Standards, Audit-Trails
- **Staatsunternehmen**: 79% der A-aktien-gelisteten Unternehmen nutzen DingTalk

**WeCom** ist die erste Wahl für kundenorientierte Branchen:
- **Einzelhandel**: Nahtlose Verbindung zu 1,3 Mrd. WeChat-Nutzern
- **Bildung**: Kommunikation zwischen Schulen und Eltern
- **Dienstleistung**: CRM und Kundenbetreuung über WeChat

**Feishu/Lark** wird von wissensintensiven Branchen bevorzugt:
- **Internet & Technologie**: ByteDance, Xiaomi, viele Start-ups
- **Kreativwirtschaft**: Media, Werbung, Content-Erstellung
- **Produktentwicklung**: Agile Teams, die asynchrone Dokumentation bevorzugen

### Westliche Alternativen in China

Slack und Microsoft Teams haben in China **keine nennenswerte Marktdurchdringung** (<5%), hauptsächlich wegen:
- Datenlokalisierungsgesetzen (PIPL, DSGVO-ähnlich)
- Blockierung von ausländischen Diensten in einigen Netzwerken
- Fehlender Integration mit lokalen Diensten (WeChat, chinesische Kalender)

> **Hybrid-Muster**: Internationale Unternehmen in China nutzen oft Feishu für interne Zusammenarbeit + WeCom für Kundenkommunikation + Teams/Slack für die globale Konzernkommunikation.

---

## 3. Cloud-Plattformen: Alibaba vs. AWS vs. der Rest

### Marktstruktur 2025-2026

| Anbieter | China-Marktanteil | Primäre Kunden |
|----------|------------------|----------------|
| **Alibaba Cloud** | **~33%** (Marktführer) | E-Commerce, Finanzen, KI-Startups |
| **Huawei Cloud** | ~14% | Staatsunternehmen, Fertigung, Telekommunikation |
| **Tencent Cloud** | ~9% | Gaming, Social, Unterhaltung |
| **Volcengine (ByteDance)** | ~6% | KI, Media, kurze Videos |
| **China Telecom/Mobile** | ~22% (zusammen) | Regierung, Bildung, Gesundheitswesen |

### Branchen-Präferenzen

| Branche | Erste Wahl | Begründung |
|---------|-----------|------------|
| **E-Commerce** | **Alibaba Cloud** | Native Integration mit Taobao/Tmall, 37% Marktanteil in Q3 2025 |
| **KI/ML-Startups** | **Alibaba Cloud + Volcengine** | Qwen-Modelle + günstige GPU-Instanzen |
| **Staatsunternehmen** | **Huawei Cloud + Telecom Cloud** | Lokalisierung, Sicherheitszertifizierung |
| **Spiele** | **Tencent Cloud** | Gaming-optimierte Infrastruktur |
| **Fintech** | **Alibaba Cloud + Huawei Cloud** | Compliance, Verschlüsselung nach GB-Standard |

### AWS in China

AWS hat in China **weniger als 1% Marktanteil** im Inlandsmarkt. Die Nutzung beschränkt sich auf:
- Chinesische Unternehmen mit starkem Auslandsgeschäft
- Ausländische Unternehmen, die ihre globale Infrastruktur nach China erweitern
- Spezifische globale Dienste, die lokale Anbieter nicht abdecken

**Interessante Entwicklung**: Alibaba Cloud wächst mit **27% YoY** schneller als AWS (23%), obwohl AWS global sechsmal so groß ist.

---

## 4. Design & Video: CapCut erobert die Welt

### Chinesische Tools dominieren Kurzvideos

| Tool | Unternehmen | Nutzerbasis | Stärke |
|------|------------|------------|--------|
| **CapCut (剪映)** | ByteDance | >500 Mio. MAU (global) | Kostenlos, KI-Features, Vorlagen |
| **Jimeng (即梦)** | ByteDance | >50 Mio. | KI-Videogenerierung |
| **Gaoding (稿定设计)** | Gaoding | >100 Mio. | Design-Vorlagen für E-Commerce |

### Branchenverteilung

| Branche | Primäres Tool | Begründung |
|---------|--------------|------------|
| **E-Commerce / Dropshipping** | **CapCut + Gaoding** | Kostengünstig, massenhafte Content-Produktion |
| **Social Media Marketing** | **CapCut** | Optimiert für Douyin/TikTok-Algorithmus |
| **Werbeagenturen** | **CapCut + Adobe Premiere** | Hybrid-Workflow für unterschiedliche Anforderungen |
| **Film / TV-Produktion** | **Adobe Premiere + DaVinci** | Professionelle Farbkorrektur, Mehrspur-Bearbeitung |

**CapCut** hat Adobe Premiere Pro in China beim Marktanteil überholt – hauptsächlich wegen des **Nullpreises**, der KI-Features (automatische Untertitel, Hintergrundentfernung) und der nahtlosen TikTok-Integration.

**Adobe** behält jedoch eine starke Stellung in professionellen Studios und Agenturen, die auf Farbkorrektur, Multi-Track-Bearbeitung und das Plugin-Ökosystem angewiesen sind.

---

## 5. Zahlungsdienste: Zwei Ökosysteme, die sich kaum überschneiden

### China

| Dienst | Nutzer | Marktposition |
|--------|--------|--------------|
| **WeChat Pay** | >1 Mrd. | Dominant im Inland (90%+ der Nutzer) |
| **Alipay** | >700 Mio. | Zweitgrößter, stark im E-Commerce |
| **UnionPay** | Universell | Backbone des Finanzsystems |

### Westliche Alternativen in China

PayPal wird in China praktisch nicht für Inlandstransaktionen genutzt. Die Nutzung beschränkt sich auf:
- **Cross-Border E-Commerce** (AliExpress, Shein) – wichtigster Anwendungsfall
- **Internationale SaaS-Abonnements** (wenn chinesische Karten nicht akzeptiert werden)
- **Freiberufler mit internationalen Kunden**

---

## 6. Entwicklung & DevOps: GitHub hat Konkurrenz bekommen

### Chinesische Entwicklungsplattformen

| Plattform | Nutzer | Besonderheit |
|-----------|--------|-------------|
| **Gitee** | >10 Mio. Entwickler | Größte GitHub-Alternative in China |
| **CODING (Tencent)** | >5 Mio. | DevOps-Plattform |
| **Alibaba Cloud DevOps** | Integration mit Cloud-Diensten | CI/CD + Deployment |

| **GitHub** | ~30 Mio. chinesische Nutzer | Trotz Blockierungsrisiko weit verbreitet |

### Branchenmuster

- **Start-ups & Technologieunternehmen**: GitHub als Hauptplattform + Gitee als Mirror
- **Staatsunternehmen & Finanzen**: Gitee (Code darf öffentliche Repos nicht verlassen)
- **Ausländische Unternehmen in China**: GitHub Enterprise

---

## 7. Zusammenfassung: Tool-Wahl nach Branche

| Branche | Chinesische Tools (First Choice) | Westliche Alternativen (Nischen) |
|---------|----------------------------------|----------------------------------|
| **E-Commerce / Retail** | DingTalk, WeCom, Alibaba Cloud, CapCut | Salesforce (global), Adobe (Premium) |
| **Technologie / Internet** | Feishu, DeepSeek, Alibaba Cloud, GitHub | Slack (internationale Teams), AWS (global) |
| **Finanzen / Versicherung** | DingTalk, Huawei Cloud, hauseigene KI | Bloomberg-Terminal, AWS (Ausland) |
| **Fertigung / Industrie** | DingTalk, Huawei Cloud, Gitee | SAP, Siemens (historisch) |
| **Bildung** | WeCom, Doubao, Tencent Cloud | Google Workspace (eingeschränkt) |
| **Media / Werbung** | Feishu, CapCut, Volcengine | Adobe Creative Cloud, Slack |

---

## 8. Drei wichtige Trends für 2026

### Trend 1: Von der "Notlösung" zur "First Choice"
Noch vor fünf Jahren galten chinesische Tools als Notlösung. Heute werden sie von vielen Unternehmen **aktiv bevorzugt** – wegen besserer Lokalisierung, niedrigerer Kosten und tieferer Integration in das chinesische Internet-Ökosystem.

### Trend 2: Hybrid-Nutzung wird zum Standard
Kaum ein Unternehmen nutzt ausschließlich chinesische oder westliche Tools. Der typische Tech-Konzern in China arbeitet mit **Feishu intern + WeCom für Kunden + GitHub für Code + Alibaba Cloud für Infrastruktur + gelegentlich Slack für internationale Partner**.

### Trend 3: Chinesische Tools gehen global
DeepSeek, CapCut, Alibaba Cloud und Qwen gewinnen weltweit Marktanteile. Für deutsche Unternehmen bedeutet das: **Die Auseinandersetzung mit chinesischen Tools wird zunehmend relevant – nicht nur für den China-Markt, sondern auch für die eigene Wettbewerbsfähigkeit.**

---

## Fazit

Die chinesische Internet-Tool-Landschaft 2026 ist keine "abgeschottete Parallelwelt" mehr, sondern ein **dynamisches, hochkompetitives Ökosystem**, das in vielen Bereichen Weltklasse-Niveau erreicht hat. Für deutsche Unternehmen, die in China Geschäfte machen oder von chinesischer Technologie lernen wollen, lohnt sich ein genauer Blick auf die hier vorgestellten Tools.

Der Schlüssel zum Erfolg liegt nicht in der Entscheidung für ein "rein chinesisches" oder "rein westliches" Tool-Ökosystem, sondern in der **intelligenten Kombination** beider Welten – je nach Branche, Teamstruktur und Zielmarkt.
    `,
    contentZh: `
## 引言

中国的互联网工具生态在近年来经历了爆炸式发展。当西方企业理所当然地使用 Slack、Teams、AWS 和 Adobe 时，中国企业正在大规模转向本土替代品——这不是被迫之举，而是因为这些工具往往更好地适应本地需求。

到 2026 年，一个有趣的双轨格局已经形成：**中国的每个行业都有自己的理想工具生态**，选择中国还是西方方案，很大程度上取决于行业监管、国际化程度和团队结构。

本文全面分析中国各行业使用哪些工具，以及西方替代品在哪些场景下仍占有一席之地。

---

## 1. AI 与聊天机器人：最激烈的战场

### 中国市场的领跑者

2026年中国AI市场是全球竞争最激烈的：

| 产品 | 公司 | 月活用户 | 优势 |
|------|------|---------|------|
| **豆包** | 字节跳动 | **> 2亿** | 市场第一，深度融入抖音生态 |
| **DeepSeek** | DeepSeek | ~1.5亿 | 开源，全球知名，极致性价比 |
| **通义千问** | 阿里巴巴 | ~1亿 | 全球最大开源模型，占50%+下载量 |
| **元宝** | 腾讯 | ~8000万 | 集成到微信生态 |
| **文心一言** | 百度 | ~5000万 | 深度接入百度搜索 |

### 行业分布

| 行业 | 首选工具 | 原因 |
|------|---------|------|
| **电商/营销** | 豆包 + 通义千问 | 内容生成、商品文案、客服 |
| **科技/开发** | DeepSeek + 通义千问 | 开源模型、API调用、代码生成 |
| **金融** | 文心一言 + 自研模型 | 合规要求，可控环境 |
| **教育** | 豆包 + DeepSeek | 成本低，适合辅导场景 |

### 西方替代品处境

ChatGPT 全球仍有约 8 亿月活，但在中国仅占 **5-10% 的渗透率**。Claude 被少数技术团队使用，但访问限制极大制约了其普及。

**结论：** AI 领域中国工具全面领先——全球 Top 10 AI 应用中 6 个来自中国。DeepSeek 是唯一具备真正全球影响力的中国 AI 产品。

---

## 2. 协同办公与生产力："超级App"之争

### 中国三大平台

| 工具 | 月活 | 市场份额 | 主要行业 |
|------|------|---------|---------|
| **钉钉** | ~2亿 | **38.5%** | 制造、金融、政务、大型企业 |
| **企业微信** | ~1.5亿 | **32.0%** | 零售、教育、客服 |
| **飞书** | ~6000万 | **18.2%** | 科技、互联网、创意行业 |

### 行业分布详解

**钉钉** 主导传统行业：
- **制造业**（数字化率31.5%）：与MES/ERP集成、AR远程维护
- **金融保险**（渗透率68.3%）：满足等保三级、国密算法
- **央企国企**：A股上市公司79%使用钉钉

**企业微信** 是客户触达的首选：
- **零售**：无缝连接13亿微信用户
- **教育**：家校沟通
- **服务业**：CRM与客户运营

**飞书** 被知识型行业偏爱：
- **互联网/科技**：字节跳动、小米、大量创业公司
- **创意行业**：媒体、广告、内容创作
- **产品研发**：推崇异步文档协作的敏捷团队

### 西方替代品在华的窘境

Slack 和 Teams 在中国 **市场份额极低（<5%）**，主要原因：
- 数据本地化法规（PIPL）
- 部分网络环境对境外服务不友好
- 缺乏与本地服务的集成（微信、中国日历、审批流）

> **混合模式**：在华外企常见做法是飞书内部协作 + 企业微信客户沟通 + Teams/Slack 全球沟通。

---

## 3. 云平台：阿里云 vs AWS vs 其他

### 市场格局 2025-2026

| 厂商 | 中国市场份额 | 主要客户 |
|------|------------|---------|
| **阿里云** | **~33%**（市场第一） | 电商、金融、AI创业公司 |
| **华为云** | ~14% | 央企、制造、通信 |
| **腾讯云** | ~9% | 游戏、社交、娱乐 |
| **火山引擎** | ~6% | AI、媒体、短视频 |
| **天翼云/移动云** | ~22%（合计） | 政府、教育、医疗 |

### 行业选型

| 行业 | 首选 | 原因 |
|------|------|------|
| **电商** | **阿里云** | 与淘宝/天猫深度打通，Q3 2025 份额36% |
| **AI/ML创业** | **阿里云 + 火山引擎** | Qwen模型 + 廉价GPU实例 |
| **央企** | **华为云 + 电信云** | 信创、安全认证 |
| **游戏** | **腾讯云** | 游戏优化基础设施 |
| **金融科技** | **阿里云 + 华为云** | 合规、国密算法 |

### AWS 在中国的处境

AWS 在中国国内市场 **份额不足 1%**，应用场景仅限于：
- 有强劲海外业务的中国企业
- 在华外企扩展基础设施
- 特定全球服务无法被替代的场景

**有趣的发展：** 阿里云增速（27%）已超越 AWS（23%），尽管 AWS 全球规模是阿里云的 6 倍。

---

## 4. 设计与视频：剪映征服全球

### 中国工具主导短视频

| 工具 | 公司 | 用户规模 | 优势 |
|------|------|---------|------|
| **剪映 / CapCut** | 字节跳动 | >5亿（全球） | 免费、AI功能、海量模板 |
| **即梦** | 字节跳动 | >5000万 | AI视频生成 |
| **稿定设计** | 稿定 | >1亿 | 电商设计模板 |

### 行业分布

| 行业 | 首选工具 | 原因 |
|------|---------|------|
| **电商/跨境电商** | **剪映 + 稿定** | 低成本、海量内容生产 |
| **社交媒体营销** | **剪映** | 针对抖音/算法优化 |
| **广告公司** | **剪映 + Adobe Premiere** | 混合工作流 |
| **影视制作** | **Adobe Premiere + DaVinci** | 专业调色、多轨道编辑 |

**剪映** 在中国已超越 Adobe Premiere Pro 的市场份额——主要得益于 **免费 + AI功能（自动字幕、去背景）+ 抖音无缝集成**。

但 Adobe 在专业影视和广告公司中仍保有强大地位，这些领域需要专业调色、多轨道编辑和插件生态。

---

## 5. 支付：两个几乎不重叠的生态

### 中国

| 服务 | 用户 | 市场地位 |
|------|------|---------|
| **微信支付** | >10亿 | 国内绝对主导（90%+用户首选） |
| **支付宝** | >7亿 | 第二，电商场景强势 |
| **银联** | 全覆盖 | 金融系统基建 |

### 西方替代品在华的处境

PayPal 在中国几乎不用于国内交易，应用场景仅限：
- **跨境电商**（AliExpress、Shein）——最重要的场景
- **国际SaaS订阅**（中国卡无法支付时）
- **接国际客户的自由职业者**

---

## 6. 开发与DevOps：GitHub 遇到对手

### 中国开发平台

| 平台 | 用户 | 特点 |
|------|------|------|
| **Gitee** | >1000万开发者 | 中国最大GitHub替代品 |
| **CODING（腾讯）** | >500万 | DevOps一体化平台 |
| **阿里云DevOps** | 与云服务集成 | CI/CD + 部署 |

| **GitHub** | ~3000万中国用户 | 虽有访问风险但广泛使用 |

### 行业模式

- **创业公司 & 科技企业**：GitHub为主 + Gitee镜像
- **央企 & 金融**：Gitee（代码不能离开境内Repo）
- **在华外企**：GitHub Enterprise

---

## 7. 按行业汇总：工具选型速查表

| 行业 | 中国工具（首选） | 西方替代品（小众场景） |
|------|-----------------|----------------------|
| **电商/零售** | 钉钉/企微、阿里云、剪映 | Salesforce（全球）、Adobe（高端） |
| **科技/互联网** | 飞书、DeepSeek、阿里云、GitHub | Slack（国际团队）、AWS（出海） |
| **金融/保险** | 钉钉、华为云、自研AI | Bloomberg终端、AWS（海外） |
| **制造/工业** | 钉钉、华为云、Gitee | SAP、西门子（历史遗留） |
| **教育** | 企微、豆包、腾讯云 | Google Workspace（受限） |
| **媒体/广告** | 飞书、剪映、火山引擎 | Adobe Creative Cloud、Slack |

---

## 8. 2026年三大趋势

### 趋势一：从"退而求其次"到"首选"
五年前中国工具常被视为"没有选择的选择"。如今大量企业**主动优先选择**国产工具——因为更好的本地化、更低的成本和更深的本土生态集成。

### 趋势二：混合使用成为标配
几乎没有企业只用纯中国或纯西方工具。典型科技公司的工作方式是：**飞书对内 + 企微对外 + GitHub写代码 + 阿里云托管 + 偶尔用Slack和海外伙伴沟通**。

### 趋势三：中国工具走向全球
DeepSeek、CapCut、阿里云和通义千问正在全球范围内攻城略地。对德国企业而言这意味着：**了解和评估中国工具不再是"中国业务"的选修课，而是保持自身竞争力的必修课。**

---

## 结语

2026年的中国互联网工具生态已不再是"封闭的平行世界"，而是一个**充满活力、高度竞争、在许多领域达到世界一流水平**的生态系统。对于在中国有业务或有兴趣了解中国技术的德国企业而言，深入了解本文介绍的工具将带来实实在在的竞争优势。

成功的关键不在于选择"纯中国"或"纯西方"的工具生态，而在于**根据行业、团队结构和目标市场**，智慧地结合两个世界的优势。
    `,
    date: '13.05.2026',
    categoryDe: 'China-Tools im Vergleich',
    categoryZh: '中国工具对比',
    categorySlug: 'china-tools',
    readTimeDe: '15 Minuten',
    readTimeZh: '15分钟',
    tags: ['China-Tools', 'Chinese-vs-Western', 'Industry-Comparison', 'Digital-Transformation', 'China-Tech-Landscape', 'Tool-Selection', 'AI', 'Cloud', 'Collaboration'],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function localizeArticle(article: Article, lang: Language) {
  return {
    slug: article.slug,
    date: article.date,
    categorySlug: article.categorySlug,
    tags: article.tags,
    title: lang === 'zh' ? article.titleZh : article.titleDe,
    excerpt: lang === 'zh' ? article.excerptZh : article.excerptDe,
    content: lang === 'zh' ? article.contentZh : article.contentDe,
    category: lang === 'zh' ? article.categoryZh : article.categoryDe,
    readTime: lang === 'zh' ? article.readTimeZh : article.readTimeDe,
  }
}
