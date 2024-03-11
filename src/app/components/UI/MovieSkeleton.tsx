import { Card, Skeleton } from '@nextui-org/react'
import { BsFillFileImageFill } from 'react-icons/bs'

export default function MovieSkeleton() {
  return (
    <Card className="w-full space-y-2 p-2 opacity-35" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[271px] rounded-lg">
          <BsFillFileImageFill size={108} />
        </div>
      </Skeleton>
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
        <div>
          <Skeleton className="flex rounded-full w-9 h-9" />
        </div>
      </div>
    </Card>
  )
}
