/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://github.com/efdevcon/api',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
