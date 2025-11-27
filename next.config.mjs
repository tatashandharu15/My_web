/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
let remoteHost = 'localhost'
let remoteProtocol = 'http'
let remotePort = '8000'
try {
  const u = new URL(apiUrl)
  remoteHost = u.hostname
  remoteProtocol = u.protocol.replace(':', '')
  remotePort = u.port || (u.protocol === 'https:' ? '443' : '80')
} catch {}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: remoteProtocol, hostname: remoteHost, port: remotePort, pathname: '/uploads/**' },
    ],
  },
}

export default nextConfig
