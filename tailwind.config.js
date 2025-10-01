/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0b1020',
        'space-soft': '#0e1530',
        'space-card': '#121a36',
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(1200px_700px_at_70%_-10%,#1b2660_0%,transparent_60%),radial-gradient(900px_600px_at_-20%_10%,#0f1a3f_0%,transparent_50%),#0b1020',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

