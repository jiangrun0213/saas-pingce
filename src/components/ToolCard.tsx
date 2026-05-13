import Link from 'next/link'
import { Tool } from '@/types'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0">{tool.logo}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-lg truncate">{tool.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{tool.priceRange}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-sm font-medium text-gray-700">{tool.rating}</span>
            <span className="text-xs text-gray-400">({tool.reviewCount.toLocaleString()} Bewertungen)</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{tool.description}</p>
        </div>
      </div>
    </Link>
  )
}
