/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        chalkboard: '#2B3A2F',
        paper: '#F7F3E8',
        tomato: '#E85D4C',
        mustard: '#F2C94C',
        carrot: '#E67E22',
        avocado: '#8BC47B',
        sky: '#6FB3D2',
        eggplant: '#7D5A8C',
        stone: '#B8A99A',
        'mustard-dark': '#B38600',
        'avocado-dark': '#4A7C3A',
        'sky-dark': '#3A7A99',
        'stone-dark': '#6B5E52',
      },
      fontFamily: {
        display: ['LXGW WenKai', 'KaiTi', 'STKaiti', 'serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'pop-in': 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'wiggle': 'wiggle 0.4s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.6) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
