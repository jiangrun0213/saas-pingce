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
    title: 'DirtyFrag (CVE-2026-43284) 漏洞深度分析：影响范围、利用原理与修复方案',
    excerpt: '2026年5月7日披露的Linux内核高危提权漏洞DirtyFrag，影响过去9年所有主流发行版。本文深入分析漏洞原理、PoC利用链，并推荐最佳安全工具进行防护。',
    date: '2026-05-13',
    category: '安全分析',
    categorySlug: 'security',
    readTime: '8分钟',
    tags: ['CVE-2026-43284', 'DirtyFrag', 'Linux安全', '提权漏洞', '漏洞分析'],
    content: `
## 概述

2026年5月7日，安全研究员 Hyunwoo Kim（@v4bel）公开披露了 Linux 内核中的一个高危本地提权（LPE）漏洞——**DirtyFrag**（CVE-2026-43284 / CVE-2026-43500）。该漏洞影响自 2017 年 1 月以来的所有 Linux 内核版本，覆盖 9 年以上，几乎影响所有主流 Linux 发行版。

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

DirtyFrag 是一个**确定性逻辑漏洞**（非竞态条件），而非传统的内存损坏漏洞。它利用了 Linux 内核中两个独立子系统的漏洞进行串联利用：

### 1. xfrm-ESP（IPsec ESP 协议）

IPsec 的 ESP（Encapsulating Security Payload）协议在处理加密数据包时，存在一个**页面缓存写入漏洞**。攻击者可以通过精心构造的 ESP 数据包，触发内核在只读文件的内存缓存页面上进行解密操作。

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

DirtyFrag 影响自 2017 年 1 月（commit \`cac2661c53f3\`）以来的所有 Linux 内核版本，具体包括：

| 发行版 | 受影响版本 |
|--------|-----------|
| Red Hat Enterprise Linux | 7、8、9、10 |
| OpenShift Container Platform | 4.x |
| AlmaLinux | 8、9、10 |
| CloudLinux | 所有版本 |
| SUSE Linux Enterprise Server | 15 |
| Ubuntu | 20.04 LTS、22.04 LTS、24.04 LTS |
| Debian | 11、12、13 |
| CentOS | 7、8、9 |
| QNAP NAS | 受影响设备 |

---

## PoC 分析

公开的 PoC 利用代码展示了以下攻击步骤：

1. **准备阶段**：确定目标只读文件（如 \`/etc/passwd\` 或 \`/usr/bin/su\`）
2. **触发阶段**：通过 \`splice()\` 系统调用将目标文件的页面缓存注入 ESP 处理流程
3. **利用阶段**：利用 IPsec ESP 解密的副作用修改页面缓存内容
4. **提权阶段**：如修改 \`/etc/passwd\` 删除 root 密码，或替换 \`su\` 二进制文件

> ⚠️ PoC 代码已在 GitHub 等多个平台传播，活跃利用已在大规模发生中。

---

## 临时缓解措施

在系统内核更新之前，可以通过禁用受影响的内核模块进行临时缓解：

\`\`\`bash
# 禁用受影响模块
sudo sh -c "printf 'install esp4 /bin/false\\ninstall esp6 /bin/false\\ninstall rxrpc /bin/false\\n' > /etc/modprobe.d/dirtyfrag.conf"

# 卸载已加载的模块
sudo rmmod esp4 esp6 rxrpc 2>/dev/null

# 清除页面缓存
echo 3 | sudo tee /proc/sys/vm/drop_caches
\`\`\`

> ⚠️ 注意：此操作会禁用 IPsec ESP 隧道和 AFS 分布式文件系统，请评估对业务的影响。

---

## 漏洞修复状态

| 厂商 | 修复状态 | 参考链接 |
|------|---------|---------|
| Linux 内核上游 | ✅ 已修复（commit \`f4c50a4034e6\`） | [kernel.org](https://git.kernel.org) |
| Red Hat | ✅ 已发布 RHSA-2026:16328 | [Red Hat 安全中心](https://access.redhat.com/security/vulnerabilities/RHSB-2026-003) |
| AlmaLinux | ✅ 测试版补丁可用 | [AlmaLinux 公告](https://almalinux.org/ja/blog/2026-05-07-dirty-frag/) |
| SUSE | ✅ 已发布 SUSE-SU-2026:1778-1 | [SUSE 安全公告](https://www.suse.com/support/security/) |
| CloudLinux | ✅ 补丁已发布 | [CloudLinux 博客](https://blog.cloudlinux.com/dirty-frag-mitigation-and-kernel-update) |
| Ubuntu | 🔄 补丁审核中 | [Ubuntu 安全公告](https://ubuntu.com/security) |
| Debian | 🔄 补丁审核中 | [Debian 安全公告](https://www.debian.org/security/) |

---

## 安全工具推荐

针对此类高危漏洞，推荐使用以下安全工具进行检测和防护：

### 1. 漏洞扫描工具

| 工具 | 类型 | 推荐理由 | 价格 |
|------|------|---------|------|
| **Snyk** | 开源安全扫描 | 支持容器镜像和依赖扫描，DirtyFrag 检测规则已更新 | 免费 - 可定制 |
| **Tenable Nessus** | 漏洞扫描 | 已发布 DirtyFrag 检测插件（ID 313681） | $3,565/年起 |
| **Qualys VMDR** | 漏洞管理 | 实时漏洞检测，支持大规模部署 | 按资产计费 |
| **OpenVAS / Greenbone** | 开源扫描 | 免费的开源漏洞扫描方案 | 免费 |

### 2. 运行时安全检测

| 工具 | 类型 | 推荐理由 |
|------|------|---------|
| **Falco** | 运行时安全 | 检测异常的 splice() 系统调用行为 |
| **Wazuh** | EDR/XDR | 开源端点检测，可自定义 DirtyFrag 检测规则 |
| **Sysdig** | 容器安全 | 检测容器环境中的异常内核调用 |

---

## 总结

DirtyFrag（CVE-2026-43284）是一个具有里程碑意义的 Linux 内核漏洞——它是过去几年中最严重的本地提权漏洞之一。其确定性利用方式（无需竞态条件）使得攻击成功率极高，且基于页面缓存的攻击方式能够绕过传统文件完整性检测。

对于企业和个人用户，建议立即采取以下行动：

1. **紧急缓解**：如果无法立即更新内核，先禁用 esp4/esp6/rxrpc 模块
2. **内核更新**：尽快更新到已修复的内核版本
3. **漏洞扫描**：使用上述安全工具对系统进行全面扫描
4. **持续监控**：部署运行时安全监控工具，检测可疑行为
    `,
  },
  {
    slug: 'ai-agent-tools-comparison-2026',
    title: '2026年AI Agent工具对比：OpenClaw vs Hermes vs AutoGPT',
    excerpt: 'AI Agent 正在重塑软件开发、安全分析等领域的 workflow。本文深度对比 OpenClaw、Hermes Agent、AutoGPT 三大主流 AI Agent 框架的功能、性能与适用场景。',
    date: '2026-05-13',
    category: 'AI工具',
    categorySlug: 'ai-tools',
    readTime: '10分钟',
    tags: ['AI Agent', 'OpenClaw', 'Hermes', 'AutoGPT', 'AI工具对比'],
    content: `
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

## 功能对比

| 维度 | OpenClaw | Hermes Agent | AutoGPT |
|------|---------|-------------|---------|
| **开源协议** | Apache 2.0 | Apache 2.0 | MIT |
| **基础模型** | 多模型支持（Claude/GPT/Llama） | 自研 Hermes 系列 | GPT-4 |
| **工具调用** | ✅ 原生支持 | ✅ 丰富工具库 | ✅ 插件系统 |
| **多Agent协作** | ✅ 支持 | ✅ 支持 | ❌ 单Agent |
| **代码执行沙箱** | ✅ 内置沙箱 | ✅ 安全路径检查 | ❌ 无沙箱 |
| **长期记忆** | ✅ 向量数据库 | ✅ 多种存储后端 | ✅ 向量存储 |
| **Web搜索** | ✅ 内置 | ✅ 支持 | ✅ 支持 |
| **企业级部署** | ✅ 完善 | ⚠️ 社区版有限 | ❌ 实验性 |
| **中文支持** | ✅ 优秀 | ⚠️ 一般 | ⚠️ 一般 |
| **安全审计** | ✅ 内置 | ⚠️ 基础 | ❌ 有限 |

---

## 定价对比

| 工具 | 定价模式 | 价格范围 | 适合规模 |
|------|---------|---------|---------|
| **OpenClaw** | 开源免费 + 企业版 | 免费 - $499/月 | 个人到企业 |
| **Hermes Agent** | 开源免费 + API 按量 | 免费 - $0.03/次调用 | 个人到团队 |
| **AutoGPT** | 开源免费 + OpenAI API 成本 | 免费（需自备API Key） | 个人和小型团队 |

---

## 适用场景分析

### 场景一：安全漏洞分析

这是当前最热门的 AI Agent 应用场景之一。DirtyFrag（CVE-2026-43284）等高危漏洞的 PoC 分析工作，AI Agent 可以大幅提升效率：

- **OpenClaw** ⭐ 推荐 — 内置代码沙箱和安全分析工具链，适合安全分析场景
- **Hermes Agent** — 推理能力强，但安全工具链需自行集成
- **AutoGPT** — 适合信息收集，但代码分析和验证能力有限

### 场景二：软件开发与代码审查

- **OpenClaw** — 支持 CI/CD 集成，团队协作能力强
- **Hermes Agent** ⭐ 推荐 — 代码理解和生成能力突出
- **AutoGPT** — 适合原型快速开发，但生产级代码质量不稳定

### 场景三：内容创作与SEO

- **OpenClaw** — 批量内容生产能力 + SEO 优化
- **Hermes Agent** — 长文写作品质高
- **AutoGPT** ⭐ 推荐 — 自主研究 + 写作流程自动化

---

## 总结与推荐

| 需求 | 推荐选择 |
|------|---------|
| 企业级安全部署 | **OpenClaw** — 沙箱 + 安全审计 + 企业支持 |
| 复杂推理任务 | **Hermes Agent** — 最强推理能力和工具调用 |
| 自主任务执行 | **AutoGPT** — 任务分解和自主执行最佳 |
| 中文场景 | **OpenClaw** — 中文支持最好 |
| 入门成本最低 | **AutoGPT** — 最大社区资源和教程 |

如果你从事安全分析、DevOps 或需要企业级部署，**OpenClaw** 是最佳选择。如果你需要强大的代码生成和推理能力，**Hermes Agent** 值得关注。对于个人用户和内容创作者，**AutoGPT** 的上手成本最低。
    `,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
