'use client'

import { Lightbulb, Award, Target, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ProgressBar } from './ProgressBar'
import { Button } from './ui/Button'

// Each question gets its own icon and accent color to aid focus
const QUESTION_META = {
  1: { Icon: Lightbulb, color: 'text-peach-500',  bg: 'bg-peach-50',  border: 'border-peach-200' },
  2: { Icon: Award,     color: 'text-teal-500',   bg: 'bg-teal-50',   border: 'border-teal-200'  },
  3: { Icon: Target,    color: 'text-ink-500',    bg: 'bg-ink-100/60', border: 'border-ink-200'  },
} as const

interface QuestionStepProps {
  stepNumber: 1 | 2 | 3
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
  const { Icon, color, bg, border } = QUESTION_META[stepNumber]

  const BackIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <div className="animate-fade-up w-full max-w-xl mx-auto px-4 py-10 space-y-6">

      <ProgressBar current={stepNumber} total={totalSteps} />

      {/* Question card */}
      <div className="bg-white rounded-3xl border border-ink-100 shadow-card-lg p-6 sm:p-8 space-y-6">

        {/* Question icon — gives each step a distinct visual identity */}
        <div className={`w-14 h-14 rounded-2xl ${bg} ${border} border flex items-center justify-center`}>
          <Icon size={26} className={color} />
        </div>

        {/* Question text */}
        <h2 className="text-xl sm:text-2xl font-bold text-ink-900 leading-snug">
          {question}
        </h2>

        {/* Textarea */}
        <div className="space-y-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={5}
            className="
              w-full min-h-[130px] resize-none
              bg-cream-100 border border-ink-100
              hover:border-teal-300 focus:border-teal-400
              focus:outline-none focus:ring-2 focus:ring-teal-400/20
              rounded-2xl px-4 py-3.5
              text-ink-900 placeholder-ink-300
              text-base leading-relaxed
              transition-all duration-200
            "
          />

          {/* Inline hints — non-alarming text, not red */}
          {error && (
            <p className="text-peach-600 text-sm ps-1 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-peach-500 flex-shrink-0" />
              {error}
            </p>
          )}
          {!error && value.trim().length > 0 && value.trim().length < 10 && (
            <p className="text-ink-300 text-sm ps-1">{t('errors.minLength')}</p>
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
