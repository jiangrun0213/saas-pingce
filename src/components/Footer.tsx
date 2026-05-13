import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              国内领先的SaaS产品选型对比平台，帮助企业找到最适合的软件工具。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速导航</h3>
            <div className="flex flex-col gap-2">
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 text-sm">全部工具</Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 text-sm">分类浏览</Link>
              <Link href="/compare" className="text-gray-600 hover:text-blue-600 text-sm">工具对比</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">关于</h3>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">隐私政策</Link>
              <span className="text-gray-400 text-sm">联系：contact@saas-xuanxing.com</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
