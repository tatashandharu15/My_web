import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border bg-card p-8 text-center">
        <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xl">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Halaman tidak ditemukan</h1>
        <p className="text-sm text-muted-foreground mb-6">Halaman yang Anda cari tidak tersedia.</p>
        <div className="flex justify-center">
          <Button asChild className="rounded-full px-6">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}