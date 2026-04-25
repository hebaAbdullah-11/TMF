'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-2xl',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'active:scale-[0.97]',
  ].join(' ')

  const variants = {
    primary: 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-sm hover:shadow-teal-md',
    ghost:   'bg-transparent hover:bg-ink-900/6 text-ink-500 hover:text-ink-900',
    outline: 'border-2 border-ink-200 hover:border-teal-400 text-ink-700 hover:text-teal-600 bg-white',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
