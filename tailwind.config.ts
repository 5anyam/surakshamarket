/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      darkMode: 'class',
      extend: {
        backgroundImage: {
          'product': "url('/product-bg.jpg')",
        },
        fontFamily: {
          f:    ['Fredoka', 'sans-serif'],
          sora: ['Sora', 'sans-serif'],
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          accent: '#2563eb',
        },
        keyframes: {
          slide: {
            '0%':   { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        },
        animation: {
          slide: 'slide 20s linear infinite',
        },
      },
    },
    plugins: ['@tailwindcss/typography'],
  }
