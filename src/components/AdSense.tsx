import { ADSENSE_CONFIG } from '@/lib/config'

export default function AdSense() {
  if (!ADSENSE_CONFIG.enabled) return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CONFIG.clientId}
      data-ad-slot="xxxxxxxxxx"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
