import { Card, CardFooter, Image, Button } from '@nextui-org/react'

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path?: string
  image?: string
}

export default function MovieCard({ title, image }: Movie) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        src={image}
        width={500}
      />
      <CardFooter className="p-3 h-auto flex items-center color-inherit subpixel-antialiased bg-background/10 backdrop-blur-[2px] backdrop-saturate-150 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{title}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Read more
        </Button>
      </CardFooter>
    </Card>
  )
}
