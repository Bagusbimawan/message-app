import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        wa: {
          bg: 'var(--wa-bg)',
          panel: 'var(--wa-panel)',
          primary: 'var(--wa-primary)',
          primaryDark: 'var(--wa-primary-dark)',
          header: 'var(--wa-header)',
          border: 'var(--wa-border)',
          bubbleIn: 'var(--wa-bubble-in)',
          bubbleOut: 'var(--wa-bubble-out)',
          text: 'var(--wa-text)',
          textMuted: 'var(--wa-text-muted)',
          hover: 'var(--wa-hover)',
          nav: 'var(--wa-nav)',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        bubble: {
          sent: '#dcf8c6',
          received: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease both',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
        'typing-dot': 'typingBounce 1.2s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        typingBounce: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-6px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
