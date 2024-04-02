import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/theme'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        mainBg:
          'linear-gradient(0deg, rgba(27,60,89,1) 0%, rgba(84,108,140,1) 23%, rgba(66,91,140,1) 41%, rgba(166,86,123,1) 66%, rgba(191,90,117,1) 85%);',
      },
      textShadow: {
        sm: '1px 1px 0 rgba(0,0,0,.65)',
        DEFAULT: '0 2px 4px 1px rgba(0,0,0,.8)',
        lg: '0 8px 16px 1px rgba(0,0,0,.8)',
      },
      dropShadow: {
        DEFAULT: '0px 0px 4px rgba(0,0,0,.65)',
      },
      colors: {
        background: 'var(--background)',
        special: 'var(--special)',
        red: 'var(--red)',
        yellow: 'var(--yellow)',
        blue: 'var(--blue)',
        blueDark: 'var(--blue-dark)',
        pink: 'var(--pink)',
        dark: 'var(--dark)',
        darker: 'var(--darker)',
        green: 'var(--green)',
        soft: 'var(--soft)',
        grey: 'var(--grey)',
        transp: 'var(--transparent)',
        transpLight: 'var(--transparentLight)',
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
