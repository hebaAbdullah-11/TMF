'use client'

import { ExternalLink, Play, RotateCcw, Home } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from './ui/Button'
import type { RoadmapResponse } from '@/lib/types'

interface ResultsViewProps {
  data: RoadmapResponse
  onRegenerate: () => void
  onStartOver: () => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-5 rounded-full bg-gold-500 flex-shrink-0" />
      <h2 className="text-base font-semibold text-gold-400 tracking-wide">{children}</h2>
    </div>
  )
}

export function ResultsView({ data, onRegenerate, onStartOver }: ResultsViewProps) {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-up w-full max-w-xl mx-auto px-4 py-10 space-y-8">

      {/* Heading */}
      <div className="space-y-1 animate-fade-up">
        <p className="text-xs text-gold-400/70 uppercase tracking-widest">{t('results.heading')}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
          {data.summary.split('.')[0]}.
        </h1>
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl p-5 sm:p-6 shadow-card animate-fade-up delay-100">
        <p className="text-white/75 leading-loose text-sm sm:text-base">{data.summary}</p>
      </div>

      {/* Action steps */}
      <section className="animate-fade-up delay-200">
        <SectionTitle>{t('results.stepsHeading')}</SectionTitle>
        <ol className="space-y-3">
          {data.steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-4 items-start p-4 rounded-xl bg-white/3 border border-white/7 hover:border-white/12 transition-colors"
            >
              <span className="flex-shrink-0 w-7 h-7 mt-0.5 rounded-lg bg-gold-500/12 border border-gold-500/25 flex items-center justify-center text-gold-400 font-semibold text-xs">
                {i + 1}
              </span>
              <p className="text-white/75 leading-relaxed text-sm sm:text-base">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* YouTube */}
      {data.resources.youtube.length > 0 && (
        <section className="animate-fade-up delay-300">
          <SectionTitle>{t('results.youtubeHeading')}</SectionTitle>
          <div className="space-y-2">
            {data.resources.youtube.map((query, i) => (
              <a
                key={i}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/8 hover:border-gold-500/30 bg-white/2 hover:bg-white/4 transition-all group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Play size={13} className="text-red-400 fill-red-400" />
                </div>
                <span className="text-white/65 group-hover:text-white/90 text-sm transition-colors flex-1 leading-snug">
                  {query}
                </span>
                <ExternalLink size={13} className="text-white/25 group-hover:text-white/50 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Websites */}
      {data.resources.websites.length > 0 && (
        <section className="animate-fade-up delay-300">
          <SectionTitle>{t('results.websitesHeading')}</SectionTitle>
          <div className="space-y-2">
            {data.resources.websites.map((site, i) => (
              <a
                key={i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl border border-white/8 hover:border-gold-500/30 bg-white/2 hover:bg-white/4 transition-all group"
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-white/90 font-medium text-sm group-hover:text-gold-300 transition-colors">
                    {site.name}
                  </p>
                  <p className="text-white/45 text-xs leading-relaxed">{site.description}</p>
                </div>
                <ExternalLink size={13} className="text-white/25 group-hover:text-white/50 flex-shrink-0 mt-1 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Closing */}
      <div className="rounded-2xl p-5 sm:p-6 border border-gold-500/20 bg-gradient-to-br from-gold-500/6 via-transparent to-transparent animate-fade-up delay-300">
        <p className="text-xs font-medium text-gold-400/70 uppercase tracking-widest mb-3">
          {t('results.closingHeading')}
        </p>
        <p className="text-white/80 leading-loose text-sm sm:text-base italic">{data.closing}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-1 animate-fade-up delay-300">
        <Button variant="primary" size="md" onClick={onRegenerate}>
          <RotateCcw size={15} />
          {t('nav.regenerate')}
        </Button>
        <Button variant="ghost" size="md" onClick={onStartOver}>
          <Home size={15} />
          {t('nav.startOver')}
        </Button>
      </div>
    </div>
  )
}
