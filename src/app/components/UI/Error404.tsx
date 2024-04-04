import { useRouter } from 'next/navigation'
import { Image, Button } from '@nextui-org/react'

const Error404 = () => {
  const router = useRouter()

  return (
    <>
      <Image
        className="object-cover mt-[-70px] md:mt-0"
        width={550}
        height={688}
        shadow="none"
        src={'/404.png'}
        fallbackSrc={'/no-image.svg'}
        alt={'404'}
      />

      <div className="flex flex-col items-start gap-6">
        <h1 className="flex self-start font-medium text-5xl">404</h1>
        <h2 className="flex self-start font-medium text-3xl">
          Looks like we took a wrong turn... <br />
          again!
        </h2>
        <Button
          color="default"
          variant="bordered"
          size="lg"
          onClick={() => router.push('/')}
        >
          Go Back
        </Button>
      </div>
    </>
  )
}

export default Error404
