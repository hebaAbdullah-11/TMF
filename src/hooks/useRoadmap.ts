'use client'

import { useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import type { RoadmapResponse, UserAnswers } from '@/lib/types'

type Status = 'idle' | 'loading' | 'success' | 'error'
type ErrorType = 'api_error' | 'rate_limit' | null

export function useRoadmap() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<RoadmapResponse | null>(null)
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const { locale } = useLanguage()

  const generate = useCallback(async (answers: UserAnswers) => {
    setStatus('loading')
    setErrorType(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, locale }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setErrorType(err.error === 'rate_limit' ? 'rate_limit' : 'api_error')
        setStatus('error')
        return
      }

      const json: RoadmapResponse = await res.json()
      setData(json)
      setStatus('success')
    } catch {
      setErrorType('api_error')
      setStatus('error')
    }
  }, [locale])

  const reset = useCallback(() => {
    setStatus('idle')
    setData(null)
    setErrorType(null)
  }, [])

  return { generate, reset, status, data, errorType }
}
