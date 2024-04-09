import { Skeleton } from '@nextui-org/react'

export default function SkeletonForAll() {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full">
        <Skeleton className="flex rounded-lg h-[150px] w-full" />
      </div>
      <div className="w-full flex flex-col gap-2 px-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-2/5 rounded-lg" />
      </div>
    </div>
  )
}
