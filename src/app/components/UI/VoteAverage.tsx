import { CircularProgress, Card, CardBody } from '@nextui-org/react'

type Props = {
  vote: number
  card?: string
  size?: string
  strokeWidth?: number
  text?: string
}

export default function VoteAverage({
  vote,
  card,
  size,
  strokeWidth,
  text,
}: Props) {
  const voteValue = vote * 10

  return (
    <Card
      className={`${card} p-0 border-none bg-black bg-opacity-70 rounded-full tracking-[-0.5px]`}
    >
      <CardBody className="justify-center items-center p-0">
        <CircularProgress
          classNames={{
            svg: size,
            indicator: 'stroke-cyan-600',
            track: 'stroke-white/30',
            value: `${text} font-semibold text-white letter-spacing-[-1px]`,
          }}
          value={voteValue}
          strokeWidth={strokeWidth}
          showValueLabel={true}
          aria-label={`Rating: ${voteValue}%`}
        />
      </CardBody>
    </Card>
  )
}
