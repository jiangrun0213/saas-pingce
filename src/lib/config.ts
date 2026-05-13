import { Language } from '@/types'

export const SITE_CONFIG = {
  nameDe: 'China-Tools für Deutschland',
  nameZh: '面向德国的中国工具推荐',
  descriptionDe: 'Chinesische SaaS-Tools entdecken und vergleichen – Professionelle Bewertungen von KI, Kollaboration, Entwicklung und mehr für den deutschen Markt',
  descriptionZh: '发现和比较中国SaaS工具 – 为德国市场提供AI、协作、开发等领域的专业评测',
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
