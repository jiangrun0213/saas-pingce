import { Category } from '@/types'

export const categories: Category[] = [
  {
    slug: 'project-management',
    name: '项目管理',
    description: '项目协作与任务管理工具，帮助团队高效推进项目进度',
    icon: '📋',
  },
  {
    slug: 'collaboration',
    name: '协同办公',
    description: '团队沟通与文档协作平台，提升企业内部协作效率',
    icon: '🤝',
  },
  {
    slug: 'ai',
    name: 'AI / 人工智能',
    description: 'AI驱动的智能工具，涵盖大语言模型、图像生成等前沿技术',
    icon: '🤖',
  },
  {
    slug: 'crm',
    name: '客户管理 CRM',
    description: '客户关系管理系统，帮助企业管理销售线索和客户数据',
    icon: '👥',
  },
  {
    slug: 'development',
    name: '代码开发',
    description: '开发工具与平台，涵盖代码托管、CI/CD、项目管理',
    icon: '💻',
  },
  {
    slug: 'analytics',
    name: '数据分析',
    description: '商业智能与数据分析工具，驱动数据驱动决策',
    icon: '📊',
  },
  {
    slug: 'marketing',
    name: '市场营销',
    description: '数字营销工具，助力SEO、邮件营销和社交媒体运营',
    icon: '📢',
  },
  {
    slug: 'hr',
    name: '人力资源',
    description: 'HR管理与招聘系统，覆盖人才管理全生命周期',
    icon: '👤',
  },
  {
    slug: 'finance',
    name: '财务管理',
    description: '企业财务与会计解决方案，优化资金管理流程',
    icon: '💰',
  },
  {
    slug: 'design',
    name: '设计创意',
    description: 'UI/UX设计与创意工具，赋能设计团队高效产出',
    icon: '🎨',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug
}
