'use client'

import { ExternalLink, Play, RotateCcw, RefreshCw } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import type { RoadmapResponse } from '@/lib/types'

interface ResultsViewProps {
  data: RoadmapResponse
  onRegenerate: () => void
  onStartOver: () => void
}

export function ResultsView({ data, onRegenerate, onStartOver }: ResultsViewProps) {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        {t('results.heading')}
      </h1>

      {/* Summary */}
      <Card className="p-6">
        <p className="text-white/85 leading-relaxed text-base">{data.summary}</p>
      </Card>

      {/* Action steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gold-400">{t('results.stepsHeading')}</h2>
        <ol className="space-y-3">
          {data.steps.map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 font-semibold text-sm">
                {i + 1}
              </span>
              <p className="text-white/85 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* YouTube resources */}
      {data.resources.youtube.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gold-400">{t('results.youtubeHeading')}</h2>
          <div className="grid gap-3">
            {data.resources.youtube.map((query, i) => (
              <a
                key={i}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-navy-800 rounded-xl border border-white/10 hover:border-gold-500/40 transition-colors group"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center">
                  <Play size={16} className="text-red-400 fill-red-400" />
                </div>
                <span className="text-white/80 group-hover:text-white text-sm transition-colors">{query}</span>
                <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 ms-auto flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Website resources */}
      {data.resources.websites.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gold-400">{t('results.websitesHeading')}</h2>
          <div className="grid gap-3">
            {data.resources.websites.map((site, i) => (
              <a
                key={i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-navy-800 rounded-xl border border-white/10 hover:border-gold-500/40 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium group-hover:text-gold-400 transition-colors">{site.name}</p>
                  <p className="text-white/50 text-sm mt-0.5 leading-relaxed">{site.description}</p>
                </div>
                <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Closing message */}
      <Card className="p-6 border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent">
        <h2 className="text-sm font-semibold text-gold-400 uppercase tracking-widest mb-3">
          {t('results.closingHeading')}
        </h2>
        <p className="text-white/90 leading-relaxed text-base italic">{data.closing}</p>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button variant="primary" onClick={onRegenerate} className="gap-2">
          <RotateCcw size={16} />
          {t('nav.regenerate')}
        </Button>
        <Button variant="outline" onClick={onStartOver} className="gap-2">
          <RefreshCw size={16} />
          {t('nav.startOver')}
        </Button>
      </div>
    </div>
  )
}
