/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        'page-bg': '#FAF8F7',
        'border-light': '#E5E2D7',
        'text-primary': '#1A1A1A',
        'text-secondary': '#444444',
        'text-tertiary': '#7D7D7D',
        'accent-blue': '#003A5C',
        'meta-brown': '#7D5A2F',
      },
      fontFamily: {
        'serif': ['"Source Serif 4"', 'Georgia', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
        'page': '1440px',
      },
      spacing: {
        'content-x': '120px',
        'section-y': '80px',
      },
    },
  },
  plugins: [],
}
