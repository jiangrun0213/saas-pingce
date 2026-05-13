import { Category, Language } from '@/types'

export const categories: Category[] = [
  {
    slug: 'project-management',
    nameDe: 'Projektmanagement',
    nameZh: '项目管理',
    descriptionDe: 'Projektmanagement-Tools für effiziente Aufgabenverwaltung und Team-Kollaboration',
    descriptionZh: '高效任务管理和团队协作的项目管理工具',
    icon: '📋',
  },
  {
    slug: 'collaboration',
    nameDe: 'Zusammenarbeit',
    nameZh: '协同办公',
    descriptionDe: 'Teamkommunikation und Dokumentenkollaboration für moderne Arbeitsabläufe',
    descriptionZh: '现代工作流程的团队沟通和文档协作工具',
    icon: '🤝',
  },
  {
    slug: 'ai',
    nameDe: 'KI / Künstliche Intelligenz',
    nameZh: '人工智能',
    descriptionDe: 'KI-gestützte Tools für Textgenerierung, Bildbearbeitung und intelligente Automatisierung',
    descriptionZh: 'AI驱动的文本生成、图像处理和智能自动化工具',
    icon: '🤖',
  },
  {
    slug: 'crm',
    nameDe: 'CRM / Kundenmanagement',
    nameZh: '客户管理',
    descriptionDe: 'Customer-Relationship-Management-Systeme für Vertrieb und Kundenbetreuung',
    descriptionZh: '用于销售和客户服务的客户关系管理系统',
    icon: '👥',
  },
  {
    slug: 'development',
    nameDe: 'Entwicklung',
    nameZh: '开发工具',
    descriptionDe: 'Entwickler-Tools für Code-Hosting, CI/CD und Software-Projektmanagement',
    descriptionZh: '代码托管、CI/CD和软件项目管理的开发者工具',
    icon: '💻',
  },
  {
    slug: 'analytics',
    nameDe: 'Datenanalyse',
    nameZh: '数据分析',
    descriptionDe: 'Business-Intelligence und Datenanalyse-Tools für datengestützte Entscheidungen',
    descriptionZh: '用于数据驱动决策的商业智能和数据分析工具',
    icon: '📊',
  },
  {
    slug: 'marketing',
    nameDe: 'Marketing',
    nameZh: '市场营销',
    descriptionDe: 'Digitale Marketing-Tools für SEO, E-Mail-Marketing und Social-Media-Management',
    descriptionZh: '用于SEO、电子邮件营销和社交媒体管理的数字营销工具',
    icon: '📢',
  },
  {
    slug: 'hr',
    nameDe: 'Personal / HR',
    nameZh: '人力资源',
    descriptionDe: 'HR-Management und Recruiting-Systeme für den gesamten Mitarbeiterlebenszyklus',
    descriptionZh: '涵盖员工全生命周期的人力资源管理和招聘系统',
    icon: '👤',
  },
  {
    slug: 'finance',
    nameDe: 'Finanzen',
    nameZh: '财务管理',
    descriptionDe: 'Buchhaltungs- und Finanzlösungen für optimierte Unternehmensfinanzen',
    descriptionZh: '优化企业财务的会计和财务解决方案',
    icon: '💰',
  },
  {
    slug: 'design',
    nameDe: 'Design',
    nameZh: '设计',
    descriptionDe: 'UI/UX-Design und Kreativtools für produktive Designteams',
    descriptionZh: '高效设计团队的UI/UX设计和创意工具',
    icon: '🎨',
  },
  {
    slug: 'china-tools',
    nameDe: 'China-Tools / 中国工具',
    nameZh: '中国工具 / China-Tools',
    descriptionDe: 'Beliebte chinesische SaaS-Tools für Zusammenarbeit, KI und Wissensmanagement – unverzichtbar für die Arbeit mit chinesischen Partnern',
    descriptionZh: '流行的中国协作、AI和知识管理工具 – 与中国合作伙伴合作的必备工具',
    icon: '🇨🇳',
  },
]

export interface ChinaSubCategory {
  slug: string
  nameDe: string
  nameZh: string
  icon: string
  descriptionDe: string
  descriptionZh: string
}

export const chinaSubCategories: ChinaSubCategory[] = [
  {
    slug: 'ai',
    nameDe: 'KI & AI',
    nameZh: '人工智能',
    icon: '🤖',
    descriptionDe: 'Chinesische KI-Plattformen und Large Language Models für Textgenerierung, Code und mehr',
    descriptionZh: '中国AI平台和大语言模型，支持文本生成、代码编写等',
  },
  {
    slug: 'collaboration',
    nameDe: 'Kollaboration & Produktivität',
    nameZh: '协同办公与生产力',
    icon: '🤝',
    descriptionDe: 'Chinesische Kollaborationsplattformen und Produktivitäts-Tools für Teams und Unternehmen',
    descriptionZh: '中国协作平台和生产力工具，适用于团队和企业',
  },
  {
    slug: 'development',
    nameDe: 'Entwicklung & DevOps',
    nameZh: '开发与DevOps',
    icon: '💻',
    descriptionDe: 'Chinesische Cloud-Plattformen, Developer-Tools und DevOps-Lösungen',
    descriptionZh: '中国云平台、开发工具和DevOps解决方案',
  },
  {
    slug: 'ecommerce',
    nameDe: 'E-Commerce & Marketing',
    nameZh: '电商与营销',
    icon: '🛒',
    descriptionDe: 'Chinesische E-Commerce- und Marketing-Plattformen für den Handel mit China',
    descriptionZh: '中国电商和营销平台，助力对华贸易',
  },
  {
    slug: 'design',
    nameDe: 'Design & Kreativität',
    nameZh: '设计与创意',
    icon: '🎨',
    descriptionDe: 'Chinesische Design- und Kreativitäts-Tools für visuelle Content-Erstellung',
    descriptionZh: '中国设计和创意工具，用于视觉内容创作',
  },
  {
    slug: 'productivity',
    nameDe: 'Produktivitäts-Tools',
    nameZh: '效率工具',
    icon: '⚡',
    descriptionDe: 'Weitere chinesische Produktivitäts-Tools für Fernzugriff, Cloud-Sync und mehr',
    descriptionZh: '其他中国效率工具，远程访问、云同步等',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryName(slug: string, lang?: Language): string {
  const cat = getCategoryBySlug(slug)
  if (!cat) return slug
  if (lang === 'zh') return cat.nameZh
  return cat.nameDe
}

export function localizeCategory(cat: Category, lang: Language): { slug: string; icon: string; name: string; description: string } {
  return {
    slug: cat.slug,
    icon: cat.icon,
    name: lang === 'zh' ? cat.nameZh : cat.nameDe,
    description: lang === 'zh' ? cat.descriptionZh : cat.descriptionDe,
  }
}
