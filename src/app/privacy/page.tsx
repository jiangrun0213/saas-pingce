export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">隐私政策</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p>最后更新日期：{new Date().toLocaleDateString('zh-CN')}</p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. 信息收集</h2>
          <p>我们收集的信息仅限于您在网站上主动提交的内容，包括但不限于：</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>您通过联系表单提交的姓名和电子邮件地址</li>
            <li>网站浏览过程中自动收集的Cookie和匿名访问数据（用于Google Analytics分析）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. 信息使用</h2>
          <p>我们收集的信息用于：</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>改进网站内容和用户体验</li>
            <li>分析流量趋势和用户行为模式</li>
            <li>展示相关广告和推荐内容</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Cookie</h2>
          <p>
            本网站使用Cookie来改善用户体验。您可以在浏览器设置中选择禁用Cookie，
            但这可能影响部分功能的正常使用。我们使用以下类型的Cookie：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>必要Cookie：保证网站正常运行</li>
            <li>分析Cookie：了解用户如何使用我们的网站</li>
            <li>广告Cookie：用于Google AdSense个性化广告（如已启用）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. 第三方服务</h2>
          <p>本网站使用以下第三方服务：</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Google AdSense - 广告展示（如已启用）</li>
            <li>Google Analytics - 流量分析</li>
            <li>Vercel - 网站托管</li>
          </ul>
          <p className="mt-2">这些服务提供商可能有自己的隐私政策，我们建议您了解其政策内容。</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. 联盟链接披露</h2>
          <p>
            本网站部分外链为联盟营销链接。如果您通过我们的链接购买产品或服务，
            我们可能会获得佣金。这不影响您支付的价格，也不影响我们的客观评测。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. 联系方式</h2>
          <p>如对隐私政策有任何疑问，请联系我们：contact@saas-xuanxing.com</p>
        </section>
      </div>
    </div>
  )
}
