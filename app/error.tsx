"use client"

import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border bg-card p-8 text-center">
        <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-2xl">!</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Terjadi kesalahan</h1>
        <p className="text-sm text-muted-foreground mb-6">{error.message || "Silakan coba lagi."}</p>
        <div className="flex justify-center">
          <Button onClick={reset} className="rounded-full px-6">Retry</Button>
        </div>
      </div>
    </div>
  )
}