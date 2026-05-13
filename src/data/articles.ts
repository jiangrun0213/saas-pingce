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
