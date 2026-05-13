import { Language } from '@/types'

export const SITE_CONFIG = {
  nameDe: 'SaaS-Vergleich',
  nameZh: 'SaaS选型对比平台',
  descriptionDe: 'SaaS-Tools vergleichen und bewerten – Finde die passende Software für dein Unternehmen',
  descriptionZh: '比较和评价SaaS工具 – 为你的企业找到合适的软件',
  url: 'https://saas.jiangrun0213.org',
  locale: 'de-DE',
}

export const ADSENSE_CONFIG = {
  enabled: false,
  clientId: 'ca-pub-xxxxxxxxxxxxxxxx',
}

export const AFFILIATE_CONFIG = {
  enabled: true,
  trackParam: 'ref',
  defaultTrackValue: 'saas-vergleich',
}

export function getSiteName(lang: Language): string {
  return lang === 'zh' ? SITE_CONFIG.nameZh : SITE_CONFIG.nameDe
}

export function getSiteDescription(lang: Language): string {
  return lang === 'zh' ? SITE_CONFIG.descriptionZh : SITE_CONFIG.descriptionDe
}
