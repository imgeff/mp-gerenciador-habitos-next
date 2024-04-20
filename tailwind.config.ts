import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-dosis)'],
      },
      colors: {
        emerald: {
          primary: '#45EDAD',
          secondary: '#3AC993',
          third: '#2FA175',
        },
        red: {
          primary: '#F85858',
        },
      },
      screens: {
        xs: '320px',
      },
      animation: {
        'pulse-fast': 'pulse 1s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
