'use client'

import { Globe2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <button
      onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
      aria-label="Switch language"
      className="
        inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
        text-sm font-medium text-white/60
        border border-white/10
        hover:border-gold-500/40 hover:text-gold-400
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50
      "
    >
      <Globe2 size={15} />
      <span>{t('site.language')}</span>
    </button>
  )
}
