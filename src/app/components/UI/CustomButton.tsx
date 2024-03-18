'use client'

import { extendVariants, Button } from '@nextui-org/react'

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      primary: 'bg-[var(--blue)] text-[#fff]',
      white: 'bg-[var(--pink)] text-[#fff]',
    },
    isDisabled: {
      true: 'bg-[var(--blue)] text-[#fff] opacity-50 cursor-not-allowed',
    },
    size: {
      xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
      md: 'px-unit-4 min-w-unit-18 h-unit-9 text-small gap-unit-2 rounded-small',
      xl: 'px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: 'primary',
      class: 'bg-[var(--blue)]/70 opacity-50 text-[#fff]',
    },
  ],
})
