'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from './ui/Button'

export function LandingHero() {
  const { t, isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">

      {/* ── Ambient background glows ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 50% 0%,   rgba(99,102,241,0.13) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 80% 80%,  rgba(245,158,11,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 30% at 20% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-7 max-w-xl w-full animate-fade-up">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/25 text-gold-400 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          {isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          {t('site.title')}
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-medium text-white/75 leading-relaxed max-w-md">
          <span className="text-gold-400">{t('site.taglineMain')}</span>
          {' '}
          {t('site.taglineSub')}
        </p>

        {/* Divider */}
        <div className="w-10 h-px bg-gold-500/40" />

        {/* Description */}
        <p className="text-sm sm:text-base text-white/50 leading-loose max-w-sm">
          {t('site.description')}
        </p>

        {/* CTA */}
        <Link href="/questions" className="mt-2">
          <Button size="lg" variant="primary">
            {t('site.cta')}
            <ArrowIcon size={18} />
          </Button>
        </Link>
      </div>

      {/* ── Bottom fade ───────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28"
        style={{ background: 'linear-gradient(to top, #0b1120, transparent)' }}
      />
    </div>
  )
}
