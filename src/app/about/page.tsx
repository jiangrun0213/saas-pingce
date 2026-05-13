import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们',
  description: 'SaaS选型宝的关于页面，介绍网站的定位、数据来源和编辑方针',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">关于我们</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">关于 SaaS选型宝</h2>
          <p>
            SaaS选型宝是一个SaaS产品信息整理与评测网站，致力于帮助企业和个人了解不同软件工具的特点与差异。
          </p>
          <p className="mt-2">
            平台上收录了覆盖项目管理、协同办公、AI人工智能、CRM、开发工具、数据分析、
            市场营销、人力资源、财务管理、设计创意等10+分类的SaaS产品，并提供多维度的对比评测。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">数据来源与研究方法</h2>
          <p>我们的信息收集和验证来自以下渠道：</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>各工具官方网站的定价和功能页面</li>
            <li>产品文档和帮助中心</li>
            <li>用户评价和社区反馈</li>
            <li>行业报告和第三方评测</li>
          </ul>
          <p className="mt-2">
            定价信息定期更新，并在各页面标注更新日期。数据来源透明可追溯。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">编辑方针</h2>
          <p>我们的内容遵循以下原则：</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>客观中立</strong> — 基于数据的客观比较，不偏袒特定工具</li>
            <li><strong>准确可靠</strong> — 数据来自官方渠道，定期更新维护</li>
            <li><strong>全面覆盖</strong> — 涵盖主流工具、新兴产品和垂直领域的替代方案</li>
            <li><strong>透明公开</strong> — 明确标注AI辅助生成内容和联盟链接</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">AI技术使用</h2>
          <p>
            我们使用AI技术辅助内容创作，具体应用包括：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>从官方文档和英文评测中生成中文内容</li>
            <li>提取和结构化工具之间的对比要点</li>
            <li>整理常见问题、优缺点分析</li>
          </ul>
          <p className="mt-2">
            AI生成的内容在发布前经过人工核对，确保事实准确性。每篇文章均标注了信息来源。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">运营者信息</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-900 w-32">网站名称</td>
                  <td className="py-3 text-gray-700">SaaS选型宝 (saas-xuanxing.com)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-900">运营类型</td>
                  <td className="py-3 text-gray-700">个人运营</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-900">上线时间</td>
                  <td className="py-3 text-gray-700">2026年5月</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-gray-900">联系邮箱</td>
                  <td className="py-3 text-gray-700">contact@saas-xuanxing.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">广告与联盟营销</h2>
          <p>
            本网站通过联盟营销（Affiliate Marketing）和广告来维持运营成本。联盟链接使用 \`rel="sponsored"\` 属性标识。
            联盟报酬的有无不影响工具的评测和排名。对于通过联盟链接购买的行为，我们可能会获得推广佣金，
            但不会影响您的购买价格。
          </p>
        </section>
      </div>
    </div>
  )
}
