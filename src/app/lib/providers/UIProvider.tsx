'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/system'

type Props = {
  children: ReactNode
}

export default function UIProvider({ children }: Props) {
  return <NextUIProvider>{children}</NextUIProvider>
}
