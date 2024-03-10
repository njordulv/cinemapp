import { Card, Skeleton } from '@nextui-org/react'

export default function MovieSkeleton() {
  return (
    <Card className="w-full space-y-5" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="rounded-lg h-[331px] bg-slate-800 flex items-end">
          <div className="max-w-[300px] w-full flex items-center gap-3 bg-slate-700 m-1 py-2 px-3 rounded-[14px]">
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-4/5 rounded-lg bg-slate-600" />
              <Skeleton className="h-3 w-3/5 rounded-lg bg-slate-600" />
            </div>
            <div>
              <Skeleton className="flex rounded-full w-9 h-9 bg-slate-600" />
            </div>
          </div>
        </div>
      </Skeleton>
    </Card>
  )
}
