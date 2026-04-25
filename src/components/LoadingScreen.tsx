'use client'

import { Brain } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LoadingScreen() {
  const { t, isRTL } = useLanguage()

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[65vh] px-6 text-center gap-10">

      {/* Animated icon */}
      <div className="relative">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-60 scale-110" />
        {/* Icon container */}
        <div className="relative w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center shadow-card">
          <Brain size={32} className="text-teal-500" />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-5 max-w-xs">
        <h2 className="text-lg font-bold text-ink-900 leading-snug">
          {t('loading.title')}
        </h2>

        {/* Bouncing dots */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 dot-1" />
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 dot-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 dot-3" />
        </div>

        <p className="text-sm text-ink-400 leading-loose italic">
          {t('loading.message')}
        </p>
      </div>
    </div>
  )
}
