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
        // Warm cream backgrounds — ADHD-friendly, reduces eye strain
        cream: {
          50:  '#fefcf9',
          100: '#f5f1ea',
          200: '#ece7de',
          300: '#ddd7cc',
        },
        // Calming teal — primary accent
        teal: {
          50:  '#f0f9f6',
          100: '#daf2ec',
          400: '#5bbdad',
          500: '#3fa898',
          600: '#2d8e80',
        },
        // Warm peach — secondary accent, used sparingly
        peach: {
          50:  '#fef6ee',
          100: '#fde8d1',
          400: '#f0a870',
          500: '#e8904a',
          600: '#cf7534',
        },
        // Ink — text colors (warm dark, never pure black)
        ink: {
          100: '#e8e4de',
          200: '#ccc7bf',
          300: '#a09890',
          500: '#6b6460',
          700: '#46403a',
          900: '#2c2825',
        },
      },
      fontFamily: {
        sans:    ['var(--font-tajawal)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        english: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':     '0 2px 12px rgba(44,40,37,0.08), 0 1px 3px rgba(44,40,37,0.06)',
        'card-lg':  '0 8px 32px rgba(44,40,37,0.10), 0 2px 8px rgba(44,40,37,0.06)',
        'teal-sm':  '0 4px 16px rgba(63,168,152,0.18)',
        'teal-md':  '0 6px 24px rgba(63,168,152,0.22)',
      },
      animation: {
        'fade-up':    'fadeUp 0.45s ease-out both',
        'fade-in':    'fadeIn 0.35s ease-out both',
        'bounce-dot': 'bounceDot 1.4s ease-in-out infinite',
        'spin-slow':  'spin 1s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'scale(0.55)', opacity: '0.3' },
          '40%':           { transform: 'scale(1)',    opacity: '1' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
