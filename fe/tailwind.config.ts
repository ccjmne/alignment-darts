import { type Config } from 'tailwindcss'

export default {
  darkMode: 'media',
  content: ['./index.html', './fe/src/**/*.{html,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
