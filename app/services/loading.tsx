import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}