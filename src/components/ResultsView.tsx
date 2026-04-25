'use client'

import { ExternalLink, Play, RotateCcw, Home, Clock, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import type { RoadmapResponse, RoadmapStep } from '@/lib/types'

interface ResultsViewProps {
  data: RoadmapResponse
  onRegenerate: () => void
  onStartOver: () => void
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold text-ink-400 uppercase tracking-widest mb-4">
      {children}
    </h2>
  )
}

function StepCard({ step, index, isRTL }: { step: RoadmapStep; index: number; isRTL: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden animate-fade-up"
         style={{ animationDelay: `${index * 80}ms` }}>

      {/* Step header */}
      <div className="flex items-start gap-4 p-5">
        {/* Step number badge */}
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
          <span className="text-teal-600 font-bold text-sm tabular-nums">{index + 1}</span>
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="font-bold text-ink-900 text-base leading-snug">{step.title}</h3>
            {/* Duration pill */}
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream-200 text-ink-500 text-xs font-medium">
              <Clock size={11} />
              {step.duration}
            </span>
          </div>
          <p className="text-sm text-ink-500 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Micro-actions — the key ADHD-friendly feature */}
      {step.micro_actions.length > 0 && (
        <div className="border-t border-ink-100 bg-cream-100/60 px-5 py-4 space-y-2">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">
            {isRTL ? 'ابدأ الآن' : 'Start now'}
          </p>
          {step.micro_actions.map((action, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-teal-300 mt-0.5" />
              <span className="text-sm text-ink-700 leading-relaxed">{action}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ResultsView({ data, onRegenerate, onStartOver }: ResultsViewProps) {
  const { t, isRTL } = useLanguage()

  return (
    <div className="animate-fade-in w-full max-w-xl mx-auto px-4 py-10 space-y-10">

      {/* Summary */}
      <Card variant="teal" className="p-6">
        <p className="text-ink-800 leading-loose text-base">{data.summary}</p>
      </Card>

      {/* Action steps */}
      <section>
        <SectionHeading>{t('results.stepsHeading')}</SectionHeading>
        <div className="space-y-3">
          {data.steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} isRTL={isRTL} />
          ))}
        </div>
      </section>

      {/* YouTube */}
      {data.resources.youtube.length > 0 && (
        <section>
          <SectionHeading>{t('results.youtubeHeading')}</SectionHeading>
          <div className="space-y-2">
            {data.resources.youtube.map((query, i) => (
              <a
                key={i}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ink-100 hover:border-teal-300 hover:shadow-card transition-all group"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <Play size={13} className="text-red-400 fill-red-400" />
                </div>
                <span className="flex-1 text-sm text-ink-600 group-hover:text-ink-900 transition-colors leading-snug">
                  {query}
                </span>
                <ExternalLink size={13} className="text-ink-200 group-hover:text-teal-400 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Websites */}
      {data.resources.websites.length > 0 && (
        <section>
          <SectionHeading>{t('results.websitesHeading')}</SectionHeading>
          <div className="space-y-2">
            {data.resources.websites.map((site, i) => (
              <a
                key={i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-ink-100 hover:border-teal-300 hover:shadow-card transition-all group"
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm font-semibold text-ink-900 group-hover:text-teal-600 transition-colors">
                    {site.name}
                  </p>
                  <p className="text-xs text-ink-400 leading-relaxed">{site.description}</p>
                </div>
                <ExternalLink size={13} className="text-ink-200 group-hover:text-teal-400 flex-shrink-0 mt-1 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Closing */}
      <Card variant="peach" className="p-6">
        <p className="text-xs font-bold text-peach-600 uppercase tracking-widest mb-3">
          {t('results.closingHeading')}
        </p>
        <p className="text-ink-800 leading-loose text-base">{data.closing}</p>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="md" onClick={onRegenerate}>
          <RotateCcw size={15} />
          {t('nav.regenerate')}
        </Button>
        <Button variant="outline" size="md" onClick={onStartOver}>
          <Home size={15} />
          {t('nav.startOver')}
        </Button>
      </div>
    </div>
  )
}
