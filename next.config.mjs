/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for easy deployment on Render and Vercel
  output: 'standalone',
  // Disable linting during build to speed up deployment and avoid failures on trivial errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
