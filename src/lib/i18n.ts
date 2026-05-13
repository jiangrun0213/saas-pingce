import { Language } from '@/types'

type TranslationMap = Record<string, Record<Language, string>>

export const translations: TranslationMap = {
  // Navbar
  'nav.tools': { de: 'Alle Tools', zh: '所有工具' },
  'nav.categories': { de: 'Kategorien', zh: '分类浏览' },
  'nav.chinaTools': { de: 'China-Tools', zh: '中国工具' },
  'nav.chinaSub.ai': { de: 'KI & AI', zh: '人工智能' },
  'nav.chinaSub.collaboration': { de: 'Kollaboration & Produktivität', zh: '协同办公与生产力' },
  'nav.chinaSub.development': { de: 'Entwicklung & DevOps', zh: '开发与DevOps' },
  'nav.chinaSub.ecommerce': { de: 'E-Commerce & Marketing', zh: '电商与营销' },
  'nav.chinaSub.design': { de: 'Design & Kreativität', zh: '设计与创意' },
  'nav.chinaSub.productivity': { de: 'Produktivitäts-Tools', zh: '效率工具' },
  'nav.articles': { de: 'Artikel', zh: '文章' },
  'nav.compare': { de: 'Vergleichen', zh: '工具对比' },
  'nav.lang': { de: '中文', zh: 'DE' },

  // Footer
  'footer.title': { de: 'Navigation', zh: '导航' },
  'footer.legal': { de: 'Rechtliches', zh: '法律信息' },
  'footer.about': { de: 'Über uns', zh: '关于我们' },
  'footer.contact': { de: 'Kontakt', zh: '联系我们' },
  'footer.impressum': { de: 'Impressum', zh: '版本说明' },
  'footer.privacy': { de: 'Datenschutz', zh: '隐私政策' },
  'footer.disclaimer': { de: 'Haftungsausschluss', zh: '免责声明' },
  'footer.copyright': { de: 'Alle Rechte vorbehalten', zh: '保留所有权利' },
  'footer.tagline': { de: 'Chinesische SaaS-Tools für den deutschen Markt – Professionelle Bewertungen und Vergleiche.', zh: '面向德国市场的中国SaaS工具 – 专业评测与对比。' },

  // Homepage
  'home.hero.title': { de: 'Finde die richtige SaaS-Lösung', zh: '找到合适的SaaS解决方案' },
  'home.hero.subtitle': { de: '{categories} Kategorien, {tools} SaaS-Produkte – unabhängige Vergleiche und Bewertungen für bessere Software-Entscheidungen', zh: '{categories}个分类，{tools}款SaaS产品 – 独立对比和评价，做出更明智的软件选择' },
  'home.hero.browse': { de: 'Alle Tools durchsuchen', zh: '浏览所有工具' },
  'home.hero.articles': { de: 'Artikel lesen', zh: '阅读文章' },
  'home.latest': { de: 'Neueste Artikel', zh: '最新文章' },
  'home.showAll': { de: 'Alle anzeigen →', zh: '查看全部 →' },
  'home.categories': { de: 'Nach Kategorien durchsuchen', zh: '按分类浏览' },
  'home.featured': { de: 'Empfohlene Tools', zh: '推荐工具' },

  // Tools list
  'tools.title': { de: 'Alle Tools', zh: '所有工具' },
  'tools.search': { de: 'Tool-Namen, Suchbegriffe...', zh: '工具名称、关键词...' },
  'tools.allCategories': { de: 'Alle Kategorien', zh: '全部分类' },
  'tools.empty': { de: 'Keine passenden Tools gefunden. Versuche andere Suchbegriffe.', zh: '未找到匹配的工具，试试其他关键词。' },

  // Tool detail
  'tool.breadcrumb.home': { de: 'Startseite', zh: '首页' },
  'tool.breadcrumb.tools': { de: 'Alle Tools', zh: '所有工具' },
  'tool.pricing.free': { de: 'Kostenlos', zh: '免费' },
  'tool.pricing.freemium': { de: 'Freemium', zh: '免费增值' },
  'tool.pricing.paid': { de: 'Bezahlt', zh: '付费' },
  'tool.reviews': { de: 'Bewertungen', zh: '条评价' },
  'tool.visit': { de: 'Zur Website', zh: '访问官网' },
  'tool.price': { de: 'Preis:', zh: '价格：' },
  'tool.features': { de: 'Kernfunktionen', zh: '核心功能' },
  'tool.audience': { de: 'Zielgruppe', zh: '适用对象' },
  'tool.pros': { de: '👍 Vorteile', zh: '👍 优点' },
  'tool.cons': { de: '👎 Nachteile', zh: '👎 缺点' },
  'tool.related': { de: 'Ähnliche Tools', zh: '同类工具推荐' },

  // Categories
  'categories.title': { de: 'Kategorien', zh: '分类浏览' },
  'categories.count': { de: '{count} Tools', zh: '{count} 款工具' },
  'categories.total': { de: 'Insgesamt {count} Tools', zh: '共 {count} 款工具' },
  'categories.empty': { de: 'Keine Tools in dieser Kategorie', zh: '该分类暂无工具收录' },
  'categories.breadcrumb': { de: 'Kategorien', zh: '分类浏览' },

  // Compare page
  'compare.title': { de: 'Tool-Vergleich', zh: '工具对比' },
  'compare.desc': { de: 'Wähle zwei SaaS-Tools für einen detaillierten Vergleich – für bessere Entscheidungen.', zh: '选择两个SaaS工具进行多维度对比，帮助做出更好的选择决策。' },
  'compare.toolA': { de: 'Tool A', zh: '工具 A' },
  'compare.toolB': { de: 'Tool B', zh: '工具 B' },
  'compare.label.category': { de: 'Kategorie', zh: '分类' },
  'compare.label.pricing': { de: 'Preismodell', zh: '定价模式' },
  'compare.label.range': { de: 'Preisspanne', zh: '价格范围' },
  'compare.label.desc': { de: 'Beschreibung', zh: '描述' },
  'compare.label.features': { de: 'Kernfunktionen', zh: '核心功能' },
  'compare.label.pros': { de: '👍 Vorteile', zh: '👍 优点' },
  'compare.label.cons': { de: '👎 Nachteile', zh: '👎 缺点' },
  'compare.label.audience': { de: 'Zielgruppe', zh: '适用对象' },
  'compare.label.website': { de: 'Website', zh: '官网' },
  'compare.visit': { de: 'Zu {name}', zh: '访问 {name}' },

  // Articles
  'articles.title': { de: 'Artikel', zh: '文章' },
  'articles.desc': { de: 'SaaS-Produkttests, Technologieanalysen und Sicherheitsforschung', zh: 'SaaS产品评测、技术分析和安全漏洞解读' },
  'articles.back': { de: '← Zurück zur Artikelliste', zh: '← 返回文章列表' },

  // China-Tools
  'chinaTools.title': { de: 'China-Tools', zh: '中国工具' },
  'chinaTools.subtitle': { de: 'Von KI bis Kollaboration – entdecke die besten chinesischen Tools für dein Unternehmen', zh: '从AI到协同办公 – 发现最适合你企业的中国工具' },
  'chinaTools.count': { de: '{count} Tools', zh: '{count} 款工具' },
  'chinaTools.empty': { de: 'Keine Tools in dieser Kategorie', zh: '该分类暂无工具' },
  'chinaTools.breadcrumb': { de: 'China-Tools', zh: '中国工具' },

  // Review
  'review.title': { de: '评测', zh: '评测' },
  'review.rating': { de: 'Bewertungsdimensionen', zh: '评分维度' },
  'review.dimLanguage': { de: 'Sprachunterstützung', zh: '德语支持度' },
  'review.dimFeatures': { de: 'Funktionsumfang', zh: '功能完整度' },
  'review.dimPrivacy': { de: 'Datenschutz (DSGVO)', zh: '数据合规' },
  'review.dimValue': { de: 'Preis-Leistung', zh: '性价比' },
  'review.interface': { de: 'Oberfläche', zh: '界面' },
  'review.docs': { de: 'Dokumentation', zh: '文档' },
  'review.support': { de: 'Kundenservice', zh: '客服' },
  'review.dsgvoStatus': { de: 'DSGVO-Status', zh: 'DSGVO状态' },
  'review.dsgvoFull': { de: 'Vollständig konform', zh: '完全合规' },
  'review.dsgvoPartial': { de: 'Teilweise konform', zh: '部分合规' },
  'review.dsgvoUnchecked': { de: 'Nicht geprüft', zh: '未经检验' },
  'review.dsgvoNa': { de: 'Nicht zutreffend', zh: '不适用' },
  'review.germanAlternatives': { de: 'Deutsche Alternativen', zh: '德国替代品' },
  'review.bestFor': { de: 'Am besten geeignet für', zh: '最适用于' },
  'review.fullReview': { de: 'Ausführliche Bewertung', zh: '详细评测' },

  // Homepage (new)
  'home.chinaHero.title': { de: 'China-Tools für dein Unternehmen', zh: '为中国工具赋能你的企业' },
  'home.chinaHero.subtitle': { de: 'Von KI-Assistenten bis Cloud-Plattformen – professionelle Bewertungen chinesischer SaaS-Lösungen speziell für den deutschen Markt', zh: '从AI助手到云平台 – 专为德国市场提供的中国SaaS解决方案专业评测' },
  'home.chinaHero.cta': { de: 'China-Tools entdecken', zh: '发现中国工具' },
  'home.chinaHero.ctaSecondary': { de: 'Alle Tools durchsuchen', zh: '浏览所有工具' },
  'home.dimensions.title': { de: 'So bewerten wir', zh: '我们的评测维度' },
  'home.dimensions.subtitle': { de: 'Jedes Tool wird nach 4 Kriterien bewertet – speziell für den deutschen Markt', zh: '每款工具从4个维度评分 – 专为德国市场定制' },
  'home.featuredChina': { de: 'Ausgewählte China-Tools', zh: '精选中国工具' },
  'home.chinaSubtitle': { de: 'Durchstöbere {categories} Kategorien chinesischer Tools', zh: '浏览 {categories} 个中国工具分类' },

  // Static page titles
  'page.about': { de: 'Über uns', zh: '关于我们' },
  'page.contact': { de: 'Kontakt', zh: '联系我们' },
  'page.disclaimer': { de: 'Haftungsausschluss & Nutzungsbedingungen', zh: '免责声明与使用条款' },
  'page.impressum': { de: 'Impressum', zh: '版本说明' },
  'page.privacy': { de: 'Datenschutzerklärung', zh: '隐私政策' },

  // ToolCard
  'toolcard.reviews': { de: '({count} Bewertungen)', zh: '({count} 条评价)' },
}

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? translations[key]?.de ?? key
}

export function tInterpolate(key: string, lang: Language, params: Record<string, string | number>): string {
  let text = t(key, lang)
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, String(v))
  }
  return text
}
