import { Category } from '@/types'

export const categories: Category[] = [
  {
    slug: 'project-management',
    name: 'Projektmanagement',
    description: 'Projektmanagement-Tools für effiziente Aufgabenverwaltung und Team-Kollaboration',
    icon: '📋',
  },
  {
    slug: 'collaboration',
    name: 'Zusammenarbeit',
    description: 'Teamkommunikation und Dokumentenkollaboration für moderne Arbeitsabläufe',
    icon: '🤝',
  },
  {
    slug: 'ai',
    name: 'KI / Künstliche Intelligenz',
    description: 'KI-gestützte Tools für Textgenerierung, Bildbearbeitung und intelligente Automatisierung',
    icon: '🤖',
  },
  {
    slug: 'crm',
    name: 'CRM / Kundenmanagement',
    description: 'Customer-Relationship-Management-Systeme für Vertrieb und Kundenbetreuung',
    icon: '👥',
  },
  {
    slug: 'development',
    name: 'Entwicklung',
    description: 'Entwickler-Tools für Code-Hosting, CI/CD und Software-Projektmanagement',
    icon: '💻',
  },
  {
    slug: 'analytics',
    name: 'Datenanalyse',
    description: 'Business-Intelligence und Datenanalyse-Tools für datengestützte Entscheidungen',
    icon: '📊',
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    description: 'Digitale Marketing-Tools für SEO, E-Mail-Marketing und Social-Media-Management',
    icon: '📢',
  },
  {
    slug: 'hr',
    name: 'Personal / HR',
    description: 'HR-Management und Recruiting-Systeme für den gesamten Mitarbeiterlebenszyklus',
    icon: '👤',
  },
  {
    slug: 'finance',
    name: 'Finanzen',
    description: 'Buchhaltungs- und Finanzlösungen für optimierte Unternehmensfinanzen',
    icon: '💰',
  },
  {
    slug: 'design',
    name: 'Design',
    description: 'UI/UX-Design und Kreativtools für produktive Designteams',
    icon: '🎨',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug
}
