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
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between text-xs font-medium text-ink-300">
        <span>{format('progress.step', { current, total })}</span>
        <span className="tabular-nums">{pct}%</span>
      </div>

      {/* Segmented dots — one per step, ADHD-friendly */}
      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex-1 relative h-2 rounded-full overflow-hidden bg-ink-100">
            <div
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
              style={{ transform: i < current ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
