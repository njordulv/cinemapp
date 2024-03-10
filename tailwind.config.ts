import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/theme'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/button.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        sm: '0 0 2px rgba(0,0,0,.8)',
        DEFAULT: '0 2px 4px 1px rgba(0,0,0,.8)',
        lg: '0 8px 16px 1px rgba(0,0,0,.8)',
      },
      colors: {
        background: 'var(--background)',
        blue: 'var(--blue)',
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
export default config
