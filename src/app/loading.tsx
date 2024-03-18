import { Spinner } from '@nextui-org/react'

export default function loading() {
  return (
    <main className="flex flex-col items-center place-content-center min-h-[640px]">
      <Spinner color="default" size="lg" />
    </main>
  )
}
