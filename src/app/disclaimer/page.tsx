import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '免责声明 - 使用条款',
  description: 'SaaS选型宝的免责声明与使用条款，包括信息准确性、AI生成内容、联盟链接披露、版权声明等',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">免责声明 & 使用条款</h1>
      <p className="text-sm text-gray-500 mb-8">最后更新日期：2026年5月13日</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 信息准确性</h2>
          <p>
            本网站致力于提供准确、最新的SaaS产品信息，但**不保证信息的完全性、准确性和及时性**。
            各工具的定价、功能、规格可能由提供商随时更改，恕不另行通知。
            用户在做出购买或签约决策前，应通过各工具的官方网站或免费试用获取最新信息。
          </p>
          <p className="mt-2">
            因使用本网站信息而产生的任何损失或损害，本网站运营者概不负责。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. AI生成内容</h2>
          <p>
            本网站部分内容可能使用AI技术辅助生成。我们努力确保内容的准确性，
            但AI生成的内容可能存在解读或表述上的偏差。对于涉及购买、签约等重大决策的信息，
            建议通过官方渠道或免费试用进行直接确认。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 外部链接与联盟营销</h2>
          <p>
            本网站包含指向第三方网站的外部链接。我们对链接网站的内容、安全性或隐私实践不承担任何责任。
          </p>
          <p className="mt-2">
            本网站部分链接为**联盟营销链接（Affiliate Links）**，使用 \`rel="sponsored"\` 属性标识。
            如果您通过这些链接购买产品或服务，我们可能会获得推广佣金。这不影响您支付的价格，
            也不会影响我们对产品的客观评价。联盟链接的存在与否不影响工具的排名或评分。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 版权声明</h2>
          <p>
            本网站登载的文字、图片、数据等内容，其著作权归本网站运营者所有，未经许可禁止转载、复制。
          </p>
          <p className="mt-2">
            各工具的标识、商标、logo等归属于各自的权利人，本网站仅在引用范围内使用。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 禁止行为</h2>
          <p>使用本网站时，禁止以下行为：</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>未经授权的转载、复制或再发布网站内容</li>
            <li>对本网站进行非法访问或攻击</li>
            <li>使用爬虫、脚本等方式批量采集数据</li>
            <li>干扰网站正常运营的行为</li>
            <li>违反法律法规或公序良俗的使用行为</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 适用法律</h2>
          <p>本使用条款适用中华人民共和国法律，并按其解释。如发生争议，应首先通过友好协商解决。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 联系方式</h2>
          <p>如对本免责声明或使用条款有任何疑问，请通过以下方式联系我们：</p>
          <p className="mt-1">邮箱：<a href="mailto:contact@saas-xuanxing.com" className="text-blue-600 hover:underline">contact@saas-xuanxing.com</a></p>
        </section>
      </div>
    </div>
  )
}
