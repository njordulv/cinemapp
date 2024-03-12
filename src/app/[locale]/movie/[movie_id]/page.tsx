import MoviePost from '@/src/app/components/UI/MoviePost'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4">
        <MoviePost />
      </div>
    </main>
  )
}
