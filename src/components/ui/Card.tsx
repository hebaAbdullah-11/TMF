import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-navy-800 rounded-2xl border border-white/10 ${className}`}>
      {children}
    </div>
  )
}
