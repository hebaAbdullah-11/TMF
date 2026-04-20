import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
}

export function Card({ children, className = '', glass = false }: CardProps) {
  const base = glass
    ? 'glass rounded-2xl shadow-card'
    : 'rounded-2xl border border-white/8 bg-white/3 shadow-card'

  return (
    <div className={`${base} ${className}`}>
      {children}
    </div>
  )
}
