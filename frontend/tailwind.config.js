/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary:   { DEFAULT: '#6C63FF', dark: '#4B44CC', light: '#9B95FF' },
        accent:    { DEFAULT: '#00F5A0', dark: '#00C87F' },
        surface:   { DEFAULT: '#0F0F1A', card: '#16162A', border: '#2A2A4A' },
        text:      { primary: '#F0F0FF', secondary: '#9090B8', muted: '#5A5A7A' },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, #6C63FF22 0px, transparent 50%), radial-gradient(at 80% 0%, #00F5A022 0px, transparent 50%), radial-gradient(at 0% 50%, #6C63FF11 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float:    { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
