import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 grid md:grid-cols-4 gap-4">
              <Skeleton className="h-24 w-full md:col-span-1" />
              <div className="md:col-span-3 space-y-3">
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}