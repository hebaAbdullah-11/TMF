'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Lightbulb, Target, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from './ui/Button'

const FEATURE_ICONS = [
  { icon: Lightbulb, labelKey: 'features.creativity' },
  { icon: Target,    labelKey: 'features.goals' },
  { icon: Sparkles,  labelKey: 'features.ai' },
]

export function LandingHero() {
  const { t, isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">

      {/* Subtle warm background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 40% at 30% 20%, rgba(63,168,152,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 40% at 75% 75%, rgba(232,144,74,0.06) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full animate-fade-up">

        {/* Teal badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-600 border border-teal-200">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          {isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by Claude AI'}
        </span>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 leading-tight tracking-tight">
            {t('site.title')}
          </h1>
          <p className="text-lg font-medium text-teal-600 leading-relaxed">
            {t('site.taglineMain')}
          </p>
          <p className="text-base text-ink-500 leading-relaxed">
            {t('site.taglineSub')}
          </p>
        </div>

        {/* Feature pills — one focus per pill */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { icon: Lightbulb, label: isRTL ? 'اكتشف إبداعك' : 'Discover creativity' },
            { icon: Target,    label: isRTL ? 'حدّد هدفك' : 'Define your goal' },
            { icon: Sparkles,  label: isRTL ? 'خطة شخصية' : 'Personal roadmap' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white border border-ink-100 text-ink-500 shadow-card"
            >
              <Icon size={13} className="text-teal-500 flex-shrink-0" />
              {label}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-ink-400 leading-loose max-w-sm">
          {t('site.description')}
        </p>

        {/* CTA */}
        <Link href="/questions">
          <Button size="lg" variant="primary">
            {t('site.cta')}
            <ArrowIcon size={18} />
          </Button>
        </Link>

        {/* Reassurance note */}
        <p className="text-xs text-ink-300">
          {isRTL ? '3 أسئلة فقط · أقل من دقيقتين' : '3 questions only · Under 2 minutes'}
        </p>
      </div>
    </div>
  )
}
