/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cs-green': {
          50: 'var(--cs-green-50)',
          100: 'var(--cs-green-100)',
          200: 'var(--cs-green-200)',
          300: 'var(--cs-green-300)',
          400: 'var(--cs-green-400)',
          500: 'var(--cs-green-500)',
          600: 'var(--cs-green-600)',
          700: 'var(--cs-green-700)',
          800: 'var(--cs-green-800)',
          900: 'var(--cs-green-900)',
          950: 'var(--cs-green-950)',
        },
        'cs-ink': {
          0: 'var(--cs-ink-0)',
          50: 'var(--cs-ink-50)',
          100: 'var(--cs-ink-100)',
          200: 'var(--cs-ink-200)',
          300: 'var(--cs-ink-300)',
          400: 'var(--cs-ink-400)',
          500: 'var(--cs-ink-500)',
          600: 'var(--cs-ink-600)',
          700: 'var(--cs-ink-700)',
          800: 'var(--cs-ink-800)',
          900: 'var(--cs-ink-900)',
          1000: 'var(--cs-ink-1000)',
        },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Oswald', 'Impact', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-green-sm': 'var(--glow-green-sm)',
        'glow-green-md': 'var(--glow-green-md)',
        'glow-green-lg': 'var(--glow-green-lg)',
      },
      borderRadius: {
        'xs': '4px',
        'pill': '999px',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
