/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'homedecorindonesia.com'
      },
      {
        protocol: 'https',
        hostname: 'www.homedecorindonesia.com'
      }
    ]
  }
};

export default nextConfig;
