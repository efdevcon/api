/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://github.com/efdevcon/og-generator',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
