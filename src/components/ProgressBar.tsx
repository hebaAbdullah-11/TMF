'use client'

import { useLanguage } from '@/context/LanguageContext'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const { format } = useLanguage()
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full space-y-3">
      {/* Label */}
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>{format('progress.step', { current, total })}</span>
        <span>{pct}%</span>
      </div>

      {/* Track */}
      <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
