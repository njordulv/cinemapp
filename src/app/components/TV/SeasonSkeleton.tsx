import React from 'react'
import { Skeleton } from '@nextui-org/react'

export default function SeasonSkeleton() {
  return (
    <div className="w-full grid lg:grid-cols-[3fr_9fr] gap-5 bg-default-50 p-3 rounded-xl">
      <Skeleton className="rounded-lg">
        <div className="w-[270px] h-[151px] rounded-lg bg-default-300"></div>
      </Skeleton>

      <div className="w-full flex flex-col gap-4 relative">
        <Skeleton className="w-5 rounded-lg absolute right-2 top-1">
          <div className="h-7 w-5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/6 rounded-lg">
          <div className="h-7 w-3/6 rounded-lg bg-default-200"></div>
        </Skeleton>
        <div className="h-5 w-2/6 rounded-lg flex gap-2">
          <Skeleton className="w-1/6 rounded-lg">
            <div className="h-5 w-1/6 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/6 rounded-lg">
            <div className="h-5 w-2/6 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <Skeleton className="w-1/6 rounded-lg">
          <div className="h-5 w-1/6 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/6 rounded-lg">
          <div className="h-4 w-4/6 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  )
}
