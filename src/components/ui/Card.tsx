import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'teal' | 'peach'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default:  'bg-white border border-ink-100 shadow-card',
    elevated: 'bg-white border border-ink-100 shadow-card-lg',
    teal:     'bg-teal-50 border border-teal-100',
    peach:    'bg-peach-50 border border-peach-100',
  }

  return (
    <div className={`rounded-2xl ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}
