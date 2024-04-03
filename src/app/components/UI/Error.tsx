interface Props {
  errorText: string
}

const Error: React.FC<Props> = ({ errorText }) => {
  return (
    <main className="flex flex-col items-center w-full min-h-[640px] max-w-[1170px] m-auto px-4 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        <span className="text-red">Error:&nbsp;</span>
        {errorText}
      </h1>
    </main>
  )
}

export default Error
