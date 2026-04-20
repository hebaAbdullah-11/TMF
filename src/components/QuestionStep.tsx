'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ProgressBar } from './ProgressBar'
import { Button } from './ui/Button'
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'

interface QuestionStepProps {
  stepNumber: number
  totalSteps: number
  question: string
  placeholder: string
  value: string
  onChange: (val: string) => void
  onNext: () => void
  onBack?: () => void
  isLast: boolean
  error: string | null
}

export function QuestionStep({
  stepNumber,
  totalSteps,
  question,
  placeholder,
  value,
  onChange,
  onNext,
  onBack,
  isLast,
  error,
}: QuestionStepProps) {
  const { t, isRTL } = useLanguage()
  const isValid = value.trim().length >= 10

  const BackIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <div className="animate-fade-up w-full max-w-xl mx-auto px-4 py-10 space-y-8">

      <ProgressBar current={stepNumber} total={totalSteps} />

      {/* Question card */}
      <div className="glass rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">

        <h2 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
          {question}
        </h2>

        <div className="space-y-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={5}
            className="
              w-full min-h-[130px] resize-none
              bg-white/4 border border-white/10
              hover:border-white/20 focus:border-gold-500/60
              focus:outline-none focus:ring-0
              rounded-xl px-4 py-3.5
              text-white placeholder-white/25
              text-base leading-relaxed
              transition-colors duration-200
            "
          />

          {/* Validation hints */}
          {error && (
            <p className="text-red-400/90 text-sm ps-1">{error}</p>
          )}
          {!error && value.trim().length > 0 && value.trim().length < 10 && (
            <p className="text-white/35 text-sm ps-1">{t('errors.minLength')}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <BackIcon size={16} />
              {t('nav.back')}
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="primary"
            size={isLast ? 'lg' : 'md'}
            onClick={() => isValid && onNext()}
            disabled={!isValid}
          >
            {isLast ? (
              <>
                <Sparkles size={16} />
                {t('nav.generate')}
              </>
            ) : (
              <>
                {t('nav.next')}
                <NextIcon size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
