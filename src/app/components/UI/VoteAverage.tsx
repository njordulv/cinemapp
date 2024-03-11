import { CircularProgress, Card, CardBody } from '@nextui-org/react'

type Props = {
  vote: number
}

export default function VoteAverage({ vote }: Props) {
  const voteValue = vote * 10

  return (
    <Card className="w-[40px] h-[40px] p-0 border-none bg-black bg-opacity-70 absolute rounded-full top-[50%] right-[3px] mt-[-20px]">
      <CardBody className="justify-center items-center">
        <CircularProgress
          classNames={{
            svg: 'w-8 h-8 drop-shadow-md',
            indicator: 'stroke-cyan-500',
            track: 'stroke-white/30',
            value: 'text-[12px] font-semibold text-white',
          }}
          value={voteValue}
          strokeWidth={2}
          showValueLabel={true}
          aria-label={`Rating: ${voteValue}%`}
        />
      </CardBody>
    </Card>
  )
}
