import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b px-8 py-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
