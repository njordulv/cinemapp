import { Spinner } from '@nextui-org/react'

export default function Loader() {
  return (
    <main className="flex flex-col items-center place-content-center w-full min-h-[640px] max-w-[1170px] m-auto px-6 py-10">
      <Spinner color="default" size="lg" />
    </main>
  )
}
