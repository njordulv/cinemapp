import React from 'react'
import { Card, Skeleton } from '@nextui-org/react'

export default function SkeletonForTab() {
  return (
    <Card className="w-full" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[225px] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  )
}
