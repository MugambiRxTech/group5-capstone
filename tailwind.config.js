/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        atmosphere: {
          night: '#0f172a',
          day: '#e0f2fe',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in': 'slideIn 0.6s ease-out backwards',
        'modal-slide-up': 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'drift-stars': 'driftStars 120s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        modalSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        driftStars: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '700px 220px' },
        },
      },
    },
  },
  plugins: [],
}
