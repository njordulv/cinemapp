import { Image, Button, Link } from '@nextui-org/react'

const Error404 = () => {
  return (
    <>
      <Image
        className="object-cover mt-[-70px] md:mt-0"
        width={550}
        height={688}
        shadow="none"
        src={'/404.png'}
        alt={'404'}
      />

      <div className="flex flex-col items-start gap-6">
        <h1 className="flex self-start font-medium text-5xl">404</h1>
        <h2 className="flex self-start font-medium text-3xl">
          Looks like we took a wrong turn... <br />
          again!
        </h2>
        <Button color="default" variant="bordered" size="lg" as={Link} href="/">
          Go Back
        </Button>
      </div>
    </>
  )
}

export default Error404
