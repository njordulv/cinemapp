import Movies from '@/components/Movies'

export default function Home() {
  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        Popular Movies
      </h1>
      <Movies />
    </main>
  )
}
