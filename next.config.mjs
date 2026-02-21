/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/webinar',
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paulinaodmatematyki.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
