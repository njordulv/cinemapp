import { Card, Skeleton } from '@nextui-org/react'

export default function SkeletonBox() {
  return (
    <Card className="w-full bg-grey" radius="lg">
      <Skeleton className="rounded-lg rounded-b-none">
        <div className="h-[240px] rounded-lg"></div>
      </Skeleton>
      <div className="w-full flex items-center gap-3 px-2 py-3">
        <Skeleton className="h-4 w-3/5 rounded-lg" />
      </div>
      <div className="w-full flex items-center gap-3 px-2 pb-2">
        <div className="w-full flex flex-wrap gap-1">
          <Skeleton className="h-6 w-1/5 rounded-xl" />
          <Skeleton className="h-6 w-3/5 rounded-xl" />
          <Skeleton className="h-6 w-2/5 rounded-xl" />
        </div>
      </div>
    </Card>
  )
}
