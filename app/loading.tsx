import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <div className="mx-auto w-64">
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="mx-auto w-96">
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-card overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}