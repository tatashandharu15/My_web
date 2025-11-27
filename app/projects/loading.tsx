import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-card overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}