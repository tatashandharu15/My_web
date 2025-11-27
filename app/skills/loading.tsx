import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-8 w-72" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 flex items-center justify-center">
              <Skeleton className="h-12 w-12 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}