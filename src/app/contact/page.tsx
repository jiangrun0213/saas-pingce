import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '联系我们',
  description: '如有任何问题、建议或合作意向，欢迎通过邮件联系我们',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">联系我们</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          如有任何问题、建议或合作意向，欢迎通过以下方式联系我们。
          我们会在 1-2 个工作日内回复。
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">电子邮件</h2>
              <a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline text-lg">
                contact@saas-xuanxing.com
              </a>
              <p className="text-sm text-gray-500 mt-1">工作日 24 小时内回复</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🤝</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">合作与投稿</h2>
              <p>欢迎SaaS厂商联系我们提交产品信息，也欢迎投稿合作。</p>
              <p className="mt-1">投稿请发送文章大纲至：<a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline">contact@saas-xuanxing.com</a></p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🔗</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">联盟合作</h2>
              <p>SaaS厂商如希望加入我们的联盟推广计划，请发送邮件并注明"联盟合作"。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
