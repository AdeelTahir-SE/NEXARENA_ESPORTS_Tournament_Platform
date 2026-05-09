import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0F',
          surface: '#12121A',
          elevated: '#1A1A26',
        },
        border: {
          DEFAULT: '#2A2A3D',
          accent: '#4A4A6A',
        },
        primary: {
          DEFAULT: '#7C3AED',
          hover: '#6D28D9',
          light: '#A78BFA',
          glow: 'rgba(124, 58, 237, 0.3)',
        },
        accent: {
          cyan: '#06B6D4',
          cyan_glow: 'rgba(6, 182, 212, 0.25)',
          gold: '#F59E0B',
          silver: '#9CA3AF',
          bronze: '#B45309',
        },
        text: {
          primary: '#F1F0FF',
          secondary: '#9B99B8',
          muted: '#5C5A78',
          inverse: '#0A0A0F',
        },
        status: {
          live: '#10B981',
          upcoming: '#06B6D4',
          completed: '#5C5A78',
          cancelled: '#EF4444',
        },
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        hero: ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        h1: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['1.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        body: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        score: ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        timer: ['1.125rem', { lineHeight: '1.2', fontWeight: '400' }],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-gold': '0 0 16px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'pulse-live': 'pulse-live 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.2s ease-out',
        'glow-in': 'glow-in 0.3s ease-out forwards',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-in': {
          from: { boxShadow: '0 0 0px rgba(124, 58, 237, 0)' },
          to: { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
