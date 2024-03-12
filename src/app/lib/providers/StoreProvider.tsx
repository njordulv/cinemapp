'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { reduxStore } from '@/redux/store'

type Props = {
  children: ReactNode
}

export default function StoreProvider({ children }: Props) {
  return <Provider store={reduxStore}>{children}</Provider>
}
