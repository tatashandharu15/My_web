export const API_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function getFileSrc(url?: string): string {
  // Generic helper for images/files like project thumbnails or home section images
  // Behavior:
  // - Absolute URLs: return as-is
  // - Backend uploads path: prefix with API_URL
  // - Frontend public assets (e.g., "/placeholder.svg"): return relative path
  // - Bare filenames (e.g., "abc.png"): treat as backend upload and normalize
  if (!url) return "/placeholder.svg"
  if (url.startsWith("http://") || url.startsWith("https://")) return url

  // Normalize bare filenames to backend uploads path
  const normalized = url.startsWith("/uploads/")
    ? url
    : url.startsWith("/")
      ? url // frontend public asset or other absolute path
      : `/uploads/${url}` // bare filename -> uploaded file

  // Prefix backend uploads with API_URL, otherwise return as-is
  if (normalized.startsWith("/uploads/")) return `${API_URL}${normalized}`
  return normalized
}

export function getLogoSrc(url?: string): string {
  // Delegate to getFileSrc for consistent handling across assets
  return getFileSrc(url)
}

export async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch (e) {
    return null
  }
}