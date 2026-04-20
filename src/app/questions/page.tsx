'use client'

import { useState, useCallback } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle'
import { QuestionStep } from '@/components/QuestionStep'
import { LoadingScreen } from '@/components/LoadingScreen'
import { ResultsView } from '@/components/ResultsView'
import { useRoadmap } from '@/hooks/useRoadmap'
import { useLanguage } from '@/context/LanguageContext'
import type { UserAnswers } from '@/lib/types'

type Step = 1 | 2 | 3 | 'loading' | 'results'

export default function QuestionsPage() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<UserAnswers>({ q1: '', q2: '', q3: '' })
  const [fieldError, setFieldError] = useState<string | null>(null)
  const { t } = useLanguage()
  const { generate, reset, status, data, errorType } = useRoadmap()

  const updateAnswer = useCallback((key: keyof UserAnswers, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }))
    if (fieldError) setFieldError(null)
  }, [fieldError])

  const handleGenerate = useCallback(async () => {
    setStep('loading')
    await generate(answers)
  }, [answers, generate])

  const handleRegenerate = useCallback(async () => {
    reset()
    setStep('loading')
    await generate(answers)
  }, [answers, generate, reset])

  const handleStartOver = useCallback(() => {
    reset()
    setAnswers({ q1: '', q2: '', q3: '' })
    setFieldError(null)
    setStep(1)
  }, [reset])

  // Sync hook status → step state
  if (status === 'loading' && step !== 'loading') setStep('loading')
  if (status === 'success' && data && step === 'loading') setStep('results')
  if (status === 'error' && step === 'loading') {
    setStep(3)
    setFieldError(errorType === 'rate_limit' ? t('errors.rateLimit') : t('errors.apiError'))
  }

  const questions = [
    { key: 'q1' as const, label: t('questions.q1.label'), placeholder: t('questions.q1.placeholder') },
    { key: 'q2' as const, label: t('questions.q2.label'), placeholder: t('questions.q2.placeholder') },
    { key: 'q3' as const, label: t('questions.q3.label'), placeholder: t('questions.q3.placeholder') },
  ]

  return (
    <main className="relative min-h-screen">
      {/* Language toggle */}
      <div className="fixed top-4 end-4 z-50">
        <LanguageToggle />
      </div>

      {/* Content centred vertically */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-10">
        {step === 'loading' && <LoadingScreen />}

        {step === 'results' && data && (
          <ResultsView
            data={data}
            onRegenerate={handleRegenerate}
            onStartOver={handleStartOver}
          />
        )}

        {(step === 1 || step === 2 || step === 3) && (
          <QuestionStep
            stepNumber={step}
            totalSteps={3}
            question={questions[step - 1].label}
            placeholder={questions[step - 1].placeholder}
            value={answers[questions[step - 1].key]}
            onChange={(val) => updateAnswer(questions[step - 1].key, val)}
            onNext={step < 3 ? () => setStep((step + 1) as Step) : handleGenerate}
            onBack={step > 1 ? () => setStep((step - 1) as Step) : undefined}
            isLast={step === 3}
            error={step === 3 ? fieldError : null}
          />
        )}
      </div>
    </main>
  )
}
