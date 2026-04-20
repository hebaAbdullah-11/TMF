'use client'

import { Globe2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  const toggle = () => setLocale(locale === 'en' ? 'ar' : 'en')

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-gold-400 hover:text-gold-400 text-white/80 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      aria-label="Switch language"
    >
      <Globe2 size={16} />
      <span>{t('site.language')}</span>
    </button>
  )
}
