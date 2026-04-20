import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main dark background — warm deep slate-blue
        bg: {
          base:    '#0b1120',
          surface: '#111827',
          raised:  '#182034',
          border:  'rgba(255,255,255,0.08)',
        },
        // Gold/amber accent
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Soft indigo tint for gradients
        indigo: {
          900: '#1e1b4b',
          950: '#0f0d2e',
        },
      },
      fontFamily: {
        sans:    ['var(--font-tajawal)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        english: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.25rem', { lineHeight: '1.15', fontWeight: '700' }],
      },
      lineHeight: {
        'relaxed-ar': '1.9',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.45s ease-out both',
        'fade-up':    'fadeUp 0.5s ease-out both',
        'spin-slow':  'spin 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold-sm': '0 0 0 1px rgba(245,158,11,0.25)',
        'gold-md': '0 4px 24px rgba(245,158,11,0.12)',
        'card':    '0 2px 16px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [typography],
}

export default config
