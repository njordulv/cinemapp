import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from '@nextui-org/react'

type Props = {
  vote: number
}

export default function VoteAverage({ vote }: Props) {
  const voteValue = vote * 10

  return (
    <Card className="w-[40px] h-[40px] p-0 border-none bg-background absolute rounded-full top-[50%] right-[3px] mt-[-20px]">
      <CardBody className="justify-center items-center pt-[4px]">
        <CircularProgress
          classNames={{
            svg: 'w-8 h-8 drop-shadow-md',
            indicator: 'stroke-white',
            track: 'stroke-white/10',
            value:
              'text-[12px] absolute top-[7px] left-[7px] font-semibold text-white',
          }}
          value={voteValue}
          strokeWidth={2}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-white/90 text-small font-semibold',
          }}
          variant="bordered"
        ></Chip>
      </CardFooter>
    </Card>
  )
}
