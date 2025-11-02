// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
  keyframes: {
    waveScroll: {
      '0%': {
        maskPosition: '0% 50%',
        WebkitMaskPosition: '0% 50%',
      },
      '100%': {
        maskPosition: '100% 50%',
        WebkitMaskPosition: '100% 50%',
      },
    },
  },
},
  },
  plugins: [],
}

export default config
