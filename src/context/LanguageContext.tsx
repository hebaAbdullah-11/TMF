'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'

type Locale = 'en' | 'ar'

interface LanguageContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
  format: (key: string, vars: Record<string, string | number>) => string
  dir: 'ltr' | 'rtl'
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

function getNestedValue(obj: Record<string, unknown>, keys: string[]): string {
  let result: unknown = obj
  for (const k of keys) {
    if (result === null || typeof result !== 'object') return keys.join('.')
    result = (result as Record<string, unknown>)[k]
  }
  return typeof result === 'string' ? result : keys.join('.')
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar')

  useEffect(() => {
    const saved = sessionStorage.getItem('tmf_locale') as Locale | null
    if (saved === 'en' || saved === 'ar') {
      setLocaleState(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    sessionStorage.setItem('tmf_locale', locale)
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
  }, [])

  const t = useCallback((key: string): string => {
    const keys = key.split('.')
    const dict = locale === 'ar' ? ar : en
    return getNestedValue(dict as Record<string, unknown>, keys)
  }, [locale])

  const format = useCallback((key: string, vars: Record<string, string | number>): string => {
    let str = t(key)
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v))
    }
    return str
  }, [t])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, format, dir, isRTL: locale === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
