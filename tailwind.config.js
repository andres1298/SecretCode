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
          dark: '#2d3a2d',
          DEFAULT: '#4a5d4a',
          medium: '#4a5d4a',
          light: '#6b7f6b',
          accent: '#8fa88f',
        },
        parchment: '#f4f1e8',
        ink: '#1a1a1a',
        gold: {
          DEFAULT: '#c4a962',
          accent: '#c4a962',
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
