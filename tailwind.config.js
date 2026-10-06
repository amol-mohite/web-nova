/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        slate: '#64748B',
        'slate-light': '#94A3B8',
        'slate-soft': '#E2E8F0',
        'slate-bg': '#F1F5F9',
        coral: '#3B82F6',
        orange: '#FFA202',
        aqua: '#93D7D6',
        primary: '#3B82F6',
        'primary-light': '#60A5FA',
        'primary-soft': '#EFF6FF',
        teal: '#239FA9',
        'teal-light': '#5BC5CD',
        'teal-soft': '#E8F4F5',
        mint: '#4AE5AB',
        'pale-blue': '#D1EBFA',
        'blue-soft': '#EFF6FC',
        'blue-accent': '#3B82F6',
        ink: '#1E293B',
        'ink-soft': '#64748B',
        'ink-light': '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-slower': 'floatSlow 8s ease-in-out infinite',
        'scale-in': 'scaleIn 0.35s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
