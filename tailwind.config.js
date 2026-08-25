/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#2F8F6E',
          hover:   '#27785B',
          tint:    '#E8F4EE',
        },
        ink:   '#111827',
        muted: '#6B7280',
        line:  '#E5E7EB',
        paper: '#F4EFE6',
      },
      boxShadow: {
        mockup: '0 24px 60px -12px rgba(17, 24, 39, 0.18), 0 8px 24px -8px rgba(17, 24, 39, 0.10)',
        card:   '0 8px 30px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};