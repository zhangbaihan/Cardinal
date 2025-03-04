/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // This optimizes for AWS Amplify deployment
  // Set path prefixes for assets if needed
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
};

module.exports = nextConfig; 