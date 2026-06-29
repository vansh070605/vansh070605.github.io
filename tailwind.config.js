/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      cursor: {
        'custom': "url('/cursor-arrowhead-32.png') 0 0, default",
        'custom-pointer': "url('/cursor-arrowhead-32.png') 0 0, pointer",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        cream:   { DEFAULT: '#F8F7F4', 50: '#FDFCFA', 100: '#F8F7F4', 200: '#EDE9E1' },
        ink:     { DEFAULT: '#0D0D0D', light: '#1A1A1A', muted: '#6B6B6B', subtle: '#9A9A9A' },
        indigo:  { DEFAULT: '#4F46E5', light: '#818CF8', dark: '#3730A3' },
        rose:    { DEFAULT: '#E11D48', light: '#FB7185', dark: '#9F1239' },
        amber:   { DEFAULT: '#D97706', light: '#FCD34D', dark: '#92400E' },
        sage:    { DEFAULT: '#6B8F71', light: '#A8C5AE', dark: '#4A6650' },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        reveal: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to:   { clipPath: 'inset(0 0% 0 0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
