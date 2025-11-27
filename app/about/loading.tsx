import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-6 pt-24 pb-16">
      <div className="max-w-5xl mx-auto space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}