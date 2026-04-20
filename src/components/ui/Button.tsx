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
    'font-medium rounded-xl',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'active:scale-[0.97]',
  ].join(' ')

  const variants = {
    primary: [
      'bg-gold-500 hover:bg-gold-400',
      'text-[#0b1120] font-semibold',
      'shadow-gold-md hover:shadow-gold-sm',
    ].join(' '),

    ghost: [
      'bg-transparent hover:bg-white/6',
      'text-white/60 hover:text-white',
    ].join(' '),

    outline: [
      'border border-white/15 hover:border-gold-500/50',
      'text-white/70 hover:text-gold-300',
      'bg-transparent',
    ].join(' '),
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
