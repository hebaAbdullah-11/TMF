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

  const handleNext = () => {
    if (isValid) onNext()
  }

  const BackIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto px-4 py-8 space-y-8">
      <ProgressBar current={stepNumber} total={totalSteps} />

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-snug">
          {question}
        </h2>

        <div className="space-y-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={5}
            className="w-full bg-navy-800 border border-white/15 hover:border-white/30 focus:border-gold-500 focus:outline-none rounded-xl px-5 py-4 text-white placeholder-white/30 resize-none transition-colors duration-200 text-base leading-relaxed"
          />
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          {value.trim().length > 0 && value.trim().length < 10 && (
            <p className="text-white/40 text-sm">{t('errors.minLength')}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {onBack ? (
          <Button variant="ghost" onClick={onBack} className="gap-1">
            <BackIcon size={18} />
            {t('nav.back')}
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isValid}
          size={isLast ? 'lg' : 'md'}
          className={isLast ? 'gap-2' : ''}
        >
          {isLast ? (
            <>
              <Sparkles size={18} />
              {t('nav.generate')}
            </>
          ) : (
            <>
              {t('nav.next')}
              <NextIcon size={18} />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
