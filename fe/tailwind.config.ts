import daisyui from 'daisyui'
import { type Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{html,ts}'],
  plugins: [daisyui],
  daisyui: {
    themes: ['nord', 'dim'],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
  },
} satisfies Config
