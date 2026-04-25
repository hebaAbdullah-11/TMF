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
        text-sm font-medium text-ink-500
        bg-white border border-ink-100 shadow-card
        hover:border-teal-300 hover:text-teal-600
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40
      "
    >
      <Globe2 size={15} />
      <span>{t('site.language')}</span>
    </button>
  )
}
