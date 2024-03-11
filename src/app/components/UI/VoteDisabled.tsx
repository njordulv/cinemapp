import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from '@nextui-org/react'

export default function VoteDisabled() {
  return (
    <Card className="w-[40px] h-[40px] p-0 border-none bg-black bg-opacity-70 absolute rounded-full top-[50%] right-[3px] mt-[-20px]">
      <CardBody className="justify-center items-center">
        <CircularProgress
          classNames={{
            svg: 'w-8 h-8 drop-shadow-md',
            indicator: 'stroke-cyan-500',
            track: 'stroke-white/50',
            value: 'font-semibold text-white',
          }}
          value={0}
          strokeWidth={2}
          showValueLabel={false}
          aria-label={`Disable rating`}
        />
        <CardFooter className="justify-center items-center pt-0 absolute top-[6px]">
          <Chip
            classNames={{
              base: 'border-1 border-white/0',
              content: 'text-white/90 text-small font-semibold text-[12px]',
            }}
            variant="bordered"
          >
            NR
          </Chip>
        </CardFooter>
      </CardBody>
    </Card>
  )
}
