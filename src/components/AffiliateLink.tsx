import { AFFILIATE_CONFIG } from '@/lib/config'

interface AffiliateLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function AffiliateLink({ href, children, className = '' }: AffiliateLinkProps) {
  if (!AFFILIATE_CONFIG.enabled) {
    return <span className={className}>{children}</span>
  }

  const separator = href.includes('?') ? '&' : '?'
  const url = `${href}${separator}${AFFILIATE_CONFIG.trackParam}=${AFFILIATE_CONFIG.defaultTrackValue}`

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
    >
      {children}
    </a>
  )
}
