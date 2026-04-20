'use client'

import { useLanguage } from '@/context/LanguageContext'

export function LoadingScreen() {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[65vh] px-6 text-center gap-10">

      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="spinner-ring absolute inset-0" />
        {/* Inner gold dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-4 max-w-xs">
        <h2 className="text-lg font-semibold text-white leading-snug">
          {t('loading.title')}
        </h2>

        {/* Bouncing dots */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gold-400/70 dot-1" />
          <span className="w-2 h-2 rounded-full bg-gold-400/70 dot-2" />
          <span className="w-2 h-2 rounded-full bg-gold-400/70 dot-3" />
        </div>

        <p className="text-sm text-white/40 leading-relaxed italic">
          {t('loading.message')}
        </p>
      </div>
    </div>
  )
}
