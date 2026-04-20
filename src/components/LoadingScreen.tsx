'use client'

import { Compass } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LoadingScreen() {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-10">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center animate-pulse">
          <Compass size={36} className="text-gold-400" />
        </div>
        <div className="absolute inset-0 rounded-full border border-gold-500/20 animate-ping" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          {t('loading.title')}
        </h2>

        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 dot-1" />
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 dot-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 dot-3" />
        </div>

        <p className="text-white/50 text-sm italic max-w-xs mx-auto leading-relaxed">
          {t('loading.message')}
        </p>
      </div>
    </div>
  )
}
