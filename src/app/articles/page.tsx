import ArticlesClient from './ArticlesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikel – SaaS-Produkttests und Technologieanalyse',
  description: 'SaaS-Produkttests, Technologieanalysen und Sicherheitsforschung – bleibe auf dem neuesten Stand',
}

export default function ArticlesPage() {
  return <ArticlesClient />
}
