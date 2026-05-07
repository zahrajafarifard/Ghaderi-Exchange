/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  images: {
    remotePatterns: [
      {
        // protocol: "http",
        protocol: "https",
        // hostname: "localhost",
        hostname: "api.ghaderi-ex.ir",
        // port: "4000",
      },
    ],
  },
}

module.exports = nextConfig
