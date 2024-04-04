import Error404 from '@/components/UI/Error404'

export default function Page404() {
  return (
    <main className="flex flex-col items-center w-full max-w-[1170px] m-auto px-4 pt-10 pb-0">
      <div className="flex md:grid md:grid-cols-[7fr_5fr] md:gap-9 gap-0 justify-between items-center flex-col-reverse md:flex-row">
        <Error404 />
      </div>
    </main>
  )
}
