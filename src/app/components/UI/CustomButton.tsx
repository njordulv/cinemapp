'use client'

import { extendVariants, Button } from '@nextui-org/react'

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      blue: 'bg-[#5873a3] text-[#fff]',
    },
    isDisabled: {
      true: 'bg-[#5873a3] text-[#fff] opacity-50 cursor-not-allowed',
    },
    size: {
      xs: 'px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small',
      md: 'px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small',
      xl: 'px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium',
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'xl',
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: 'blue',
      class: 'bg-[#5873a3]/70 opacity-50 text-[#fff]',
    },
  ],
})
