/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          dark: '#1a2a3a',
          DEFAULT: '#2a4a6a',
          medium: '#2a4a6a',
          light: '#4a7a9a',
          accent: '#7ab8d8',
        },
        parchment: '#f5f8fa',
        ink: '#1a1a1a',
        gold: {
          DEFAULT: '#f0c040',
          accent: '#f0c040',
        }
      },
      fontFamily: {
        detective: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'carousel-slow': 'carousel 60s linear infinite',
        'carousel-medium': 'carousel 45s linear infinite',
        'carousel-fast': 'carousel 30s linear infinite',
        'carousel-faster': 'carousel 20s linear infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-10px)' },
          '80%': { transform: 'translateX(10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
