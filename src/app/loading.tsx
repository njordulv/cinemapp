import { Spinner } from '@nextui-org/react'

export default function loading() {
  return (
    <main className="flex flex-col items-center place-content-center min-h-96">
      <Spinner color="white" className="text-white">
        Loading...
      </Spinner>
    </main>
  )
}
