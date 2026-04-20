'use client'

import { useLanguage } from '@/context/LanguageContext'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const { format } = useLanguage()

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < current ? 'bg-gold-500' : 'bg-white/15'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-white/50 text-end">
        {format('progress.step', { current, total })}
      </p>
    </div>
  )
}
