/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#040A0F',
        navy:    '#0D1B2A',
        arctic:  '#E8EDF2',
        brass:   '#C8A96E',
        signal:  '#00B4D8',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        code:    ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)',   opacity: '0.5' },
          '50%':       { transform: 'translateY(8px)', opacity: '1'   },
        },
      },
      animation: {
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
