import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paulina-primary': '#571A47',
        'paulina-accent': '#EC9A4F',
        'paulina-blue': '#06AEEF',
        'paulina-bg-purple': '#F7EEF4',
        'paulina-bg-yellow': '#FEF1D3',
      },
      fontFamily: {
        'varela': ['var(--font-varela)', 'sans-serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
