import Layout from '@/components/TV/Layout'

export default function Page() {
  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        TV Shows Airing Today
      </h1>
      <Layout type="tv" end="airing_today" />
    </main>
  )
}
