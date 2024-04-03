import { Card, Skeleton } from '@nextui-org/react'

export default function SkeletonBox() {
  return (
    <Card className="w-full space-y-2 p-2 bg-default-200" radius="lg">
      <Skeleton className="rounded-lg opacity-20">
        <div className="h-[258px] rounded-lg"></div>
      </Skeleton>
      <div className="w-full flex items-center gap-3">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg opacity-20" />
          <Skeleton className="h-3 w-4/5 rounded-lg opacity-20" />
        </div>
        <div>
          <Skeleton className="flex rounded-full w-9 h-9 opacity-20" />
        </div>
      </div>
    </Card>
  )
}
