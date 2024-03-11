import { Spinner } from '@nextui-org/react'

export default function loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Spinner label="Loading..." color="default" />
    </main>
  )
}
