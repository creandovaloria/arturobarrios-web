import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#e0ecfe',
          200: '#c7dffe',
          300: '#a4cbfd',
          400: '#79b0fb',
          500: '#2e5bff',
          600: '#1e47ff',
          700: '#1836dc',
          800: '#162ac3',
          900: '#001a4d',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#b8b8b8',
          500: '#999999',
          600: '#7a7a7a',
          700: '#5c5c5c',
          800: '#3e3e3e',
          900: '#222222',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
        paper: '#ffffff',
        surface: '#f5f5f5',
        fg: '#222222',
        'fg-muted': '#7a7a7a',
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '56px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['40px', { lineHeight: '48px', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h3': ['32px', { lineHeight: '40px', fontWeight: '700', letterSpacing: '0em' }],
        'h4': ['24px', { lineHeight: '32px', fontWeight: '600', letterSpacing: '0em' }],
        'h5': ['20px', { lineHeight: '28px', fontWeight: '600', letterSpacing: '0em' }],
        'h6': ['16px', { lineHeight: '24px', fontWeight: '600', letterSpacing: '0em' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'kicker': ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.05em' }],
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        elevation: '0 12px 24px -6px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};

export default config;
