import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from '@nextui-org/react'

type Props = {
  card?: string
  size?: string
  strokeWidth?: number
  text?: string
}

export default function VoteDisabled({ card, size, strokeWidth, text }: Props) {
  return (
    <Card
      className={`${card} p-0 border-none bg-black bg-opacity-70 rounded-full min-w-[63px]`}
    >
      <CardBody className="justify-center items-center p-0">
        <CircularProgress
          classNames={{
            svg: size,
            indicator: 'stroke-cyan-600',
            track: 'stroke-white/50',
            value: `font-semibold text-white`,
          }}
          value={0}
          strokeWidth={strokeWidth}
          showValueLabel={false}
          aria-label={`Disable rating`}
        />
        <CardFooter className="justify-center items-center pt-0 absolute top-[28%] mt-[-5%]">
          <Chip
            classNames={{
              base: 'border-1 border-white/0',
              content: 'text-white/90 text-small font-semibold',
            }}
            variant="bordered"
          >
            <span className={text}>NR</span>
          </Chip>
        </CardFooter>
      </CardBody>
    </Card>
  )
}
