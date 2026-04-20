'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from './ui/Button'

export function LandingHero() {
  const { t, isRTL } = useLanguage()

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-24 text-center min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.18) 0%, rgba(15,23,42,0) 70%)',
        }}
      />

      {/* Gold accent line */}
      <div className="relative z-10 w-12 h-0.5 bg-gold-500 rounded-full mb-8" />

      <div className="relative z-10 space-y-6 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          {t('site.title')}
        </h1>

        <div className="space-y-1">
          <p className="text-lg sm:text-xl font-medium text-gold-400">
            {t('site.taglineMain')}
          </p>
          <p className="text-lg sm:text-xl font-medium text-white/70">
            {t('site.taglineSub')}
          </p>
        </div>

        <div className="w-16 h-px bg-gold-500/30 mx-auto" />

        <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-lg mx-auto">
          {t('site.description')}
        </p>

        <div className="pt-4">
          <Link href="/questions">
            <Button size="lg" variant="primary" className="gap-2 text-navy-900 font-semibold">
              {t('site.cta')}
              <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-navy-900 to-transparent" />
    </div>
  )
}
